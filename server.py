"""
GoshaTurboTech (GTT) — Hardened High-Performance FastAPI Server
Powers the live Atelier Hub, SQLite WAL database sync, multipart media uploads,
PBKDF2 auth, SQLite-backed sessions/rate-limiting, and strict 404 stealth gateway.
"""

import os
import re
import hmac
import json
import time
import base64
import asyncio
import hashlib
import secrets
from datetime import datetime
from pathlib import Path
from typing import Optional, Dict, Any, List

from fastapi import FastAPI, Request, Response, HTTPException, status, Depends
from fastapi.responses import FileResponse, JSONResponse, HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

import database

BASE_DIR = Path(__file__).resolve().parent


# ================= ENVIRONMENT & .ENV LOADER =================
def load_env_file():
    env_path = BASE_DIR / ".env"
    if not env_path.exists():
        return
    try:
        from dotenv import load_dotenv
        load_dotenv(env_path, override=False)
        return
    except ImportError:
        pass
    try:
        for line in env_path.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            k, v = line.split("=", 1)
            k = k.strip()
            v = v.strip().strip("'\"")
            if k and k not in os.environ:
                os.environ[k] = v
    except Exception as e:
        print("[GTT ENV] Fallback .env load error:", e)


load_env_file()

GTT_ENV = os.environ.get("GTT_ENV", "development").strip().lower()
IS_PROD = GTT_ENV == "production"
GTT_HOST = os.environ.get("GTT_HOST", "127.0.0.1").strip()
GTT_PORT = int(os.environ.get("GTT_PORT", "8000"))
GTT_BEHIND_PROXY = os.environ.get("GTT_BEHIND_PROXY", "false").strip().lower() in ("true", "1", "yes")
GTT_TRUSTED_PROXIES = {
    ip.strip() for ip in os.environ.get("GTT_TRUSTED_PROXIES", "127.0.0.1,::1,localhost").split(",") if ip.strip()
}

_raw_admin_path = "/" + os.environ.get("GTT_ADMIN_PATH", "/admin").strip("/")
GTT_ADMIN_PATH = _raw_admin_path if len(_raw_admin_path) > 1 else "/admin"

GTT_SECRET_KEY = os.environ.get("GTT_SECRET_KEY", "").strip()
if not GTT_SECRET_KEY or GTT_SECRET_KEY.startswith("CHANGE_ME"):
    database.init_db()
    saved_secret = database.get_setting("runtime_hmac_secret", "")
    if not saved_secret:
        saved_secret = secrets.token_urlsafe(36)
        with database.get_db() as conn:
            conn.execute(
                "INSERT OR IGNORE INTO settings (key, value) VALUES ('runtime_hmac_secret', ?)",
                (saved_secret,),
            )
            conn.commit()
        saved_secret = database.get_setting("runtime_hmac_secret", saved_secret)
    GTT_SECRET_KEY = saved_secret
else:
    database.init_db()


def load_server_limits() -> Dict[str, Any]:
    cfg = {
        "ADMIN_USERNAME": os.environ.get("GTT_ADMIN_USERNAME", "gosha").strip().lower() or "gosha",
        "MAX_LOGIN_ATTEMPTS": int(os.environ.get("GTT_MAX_LOGIN_ATTEMPTS", "5")),
        "LOCKOUT_MINUTES": int(os.environ.get("GTT_LOCKOUT_MINUTES", "15")),
        "MAX_GATE_FAILS": int(os.environ.get("GTT_MAX_GATE_FAILS", "12")),
        "GATE_LOCKOUT_MINUTES": int(os.environ.get("GTT_GATE_LOCKOUT_MINUTES", "30")),
    }
    config_path = BASE_DIR / "gtt_config.json"
    if config_path.exists():
        try:
            raw = json.loads(config_path.read_text(encoding="utf-8"))
            for key in ("MAX_LOGIN_ATTEMPTS", "LOCKOUT_MINUTES", "MAX_GATE_FAILS", "GATE_LOCKOUT_MINUTES"):
                if key in raw and isinstance(raw[key], int):
                    cfg[key] = raw[key]
        except Exception as e:
            print("[GTT CONFIG] Error reading gtt_config.json:", e)
    return cfg


SERVER_LIMITS = load_server_limits()


def get_local_ip() -> str:
    import socket
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "127.0.0.1"


def get_allowed_cors_origins() -> List[str]:
    raw = os.environ.get("GTT_CORS_ALLOWED_ORIGINS", "").strip()
    origins = [o.strip().rstrip("/") for o in raw.split(",") if o.strip() and o.strip() != "*"]
    if not IS_PROD:
        dev_defaults = [
            f"http://localhost:{GTT_PORT}",
            f"http://127.0.0.1:{GTT_PORT}",
            "http://localhost:8000",
            "http://127.0.0.1:8000",
        ]
        lip = get_local_ip()
        if lip and lip != "127.0.0.1":
            dev_defaults.append(f"http://{lip}:{GTT_PORT}")
        for o in dev_defaults:
            if o not in origins:
                origins.append(o)
    if not origins:
        origins = ["https://goshaturbotech.ru", "https://www.goshaturbotech.ru"]
    return origins


ALLOWED_CORS_ORIGINS = get_allowed_cors_origins()
PRIVATE_ADMIN_DIR = BASE_DIR / "private_admin"

GATE_COOKIE_NAME = "gtt_gate"
SESSION_COOKIE_NAME = "gtt_session"
SESSION_LIFETIME_SECONDS = 12 * 3600

PUBLIC_SETTING_KEYS = {"hero_telemetry", "garage_stats"}
PUBLIC_DATA_FILES = {
    "cars.json",
    "team.json",
    "records.json",
    "gallery.json",
    "moto.json",
    "moto_banners.json",
    "partners.json",
    "hero_telemetry.json",
}

NOT_FOUND_HTML = """<!doctype html>
<html lang="ru"><head><meta charset="utf-8"><meta name="robots" content="noindex,nofollow">
<title>404 Not Found</title>
<style>body{font-family:system-ui,-apple-system,sans-serif;background:#070709;color:#eef2f7;display:grid;place-items:center;min-height:100vh;margin:0}main{text-align:center;padding:24px}h1{font-size:48px;margin:0 0 8px;font-weight:700;color:#ea5b0c}p{margin:0;color:#8892b0}</style>
</head><body><main><h1>404</h1><p>Страница не найдена</p></main></body></html>"""


def not_found_response() -> HTMLResponse:
    return HTMLResponse(
        content=NOT_FOUND_HTML,
        status_code=404,
        headers={
            "X-Robots-Tag": "noindex, nofollow",
            "Cache-Control": "no-store, no-cache, must-revalidate",
        },
    )


# ================= IP, GATEWAY & SESSION HELPERS =================

def get_client_ip(request: Request) -> str:
    if not request:
        return "unknown"
    peer_ip = request.client.host if request.client else "unknown"
    if GTT_BEHIND_PROXY and peer_ip in GTT_TRUSTED_PROXIES:
        real_ip = (request.headers.get("x-real-ip") or "").strip()
        if real_ip:
            return real_ip
    return peer_ip


def is_request_secure(request: Request) -> bool:
    if request.url.scheme == "https":
        return True
    return False


def sign_gate_cookie(ttl_seconds: int = 43200) -> str:
    exp = int(time.time()) + ttl_seconds
    nonce = secrets.token_hex(8)
    payload = f"gtt_staff|{exp}|{nonce}"
    sig = hmac.new(GTT_SECRET_KEY.encode("utf-8"), f"{payload}|{database.get_gateway_token()}".encode("utf-8"), hashlib.sha256).hexdigest()
    return f"{payload}|{sig}"


def verify_gate_cookie(cookie_val: Optional[str]) -> bool:
    if not cookie_val:
        return False
    parts = cookie_val.split("|")
    if len(parts) != 4:
        return False
    role, exp_s, nonce, sig = parts
    if role != "gtt_staff":
        return False
    try:
        exp = int(exp_s)
    except ValueError:
        return False
    if exp < int(time.time()):
        return False
    payload = f"{role}|{exp_s}|{nonce}"
    expected_sig = hmac.new(GTT_SECRET_KEY.encode("utf-8"), f"{payload}|{database.get_gateway_token()}".encode("utf-8"), hashlib.sha256).hexdigest()
    return hmac.compare_digest(sig.encode("utf-8"), expected_sig.encode("ascii"))


def resolve_gate_from_request(request: Request) -> bool:
    header_tok = (request.headers.get("x-gateway-token") or "").strip()
    if header_tok and database.verify_gateway_token(header_tok):
        return True
    return verify_gate_cookie(request.cookies.get(GATE_COOKIE_NAME))


def _extract_session_token(request: Request) -> str:
    auth_header = (request.headers.get("authorization") or "").strip()
    if auth_header.lower().startswith("bearer "):
        return auth_header[7:].strip()
    x_tok = (request.headers.get("x-admin-token") or "").strip()
    if x_tok:
        return x_tok
    return (request.cookies.get(SESSION_COOKIE_NAME) or "").strip()


def verify_admin_session(request: Request) -> Dict[str, Any]:
    token = _extract_session_token(request)
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Требуется авторизация администратора GTT",
        )
    db_session = database.get_session(token)
    if db_session:
        database.touch_session(token, SESSION_LIFETIME_SECONDS)
        db_session["raw_token"] = token
        return db_session
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Сессия инженера истекла или недействительна. Выполните вход повторно.",
    )


# ================= APP & PURE ASGI SECURITY SHIELD =================

app = FastAPI(
    title="GoshaTurboTech Atelier Hub API",
    version="5.0.0",
    docs_url=None,
    redoc_url=None,
    openapi_url=None,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=[
        "Content-Type",
        "Authorization",
        "X-Gateway-Token",
        "X-Admin-Token",
        "X-Requested-With",
        "Accept",
        "Origin",
        "Cache-Control",
    ],
    max_age=600,
)

BLOCKED_PREFIXES = (
    "/private_admin",
    "/deploy",
    "/venv",
    "/фото",
    "/полезная информация",
    "/wp-admin",
    "/wp-login",
    "/administrator",
    "/phpmyadmin",
    "/gtt_config",
    "/server.py",
    "/database.py",
    "/requirements.txt",
    "/admin.html",
    "/admine",
    "/gtt71",
    "/gtt-hub",
    "/staff-gate",
)
BLOCKED_EXTENSIONS = (
    ".db", ".db-wal", ".db-shm", ".sqlite", ".sqlite3",
    ".env", ".py", ".pyc", ".sh", ".yaml", ".yml", ".md", ".log", ".bak", ".example",
)


class SecurityShieldMiddleware:
    """Pure ASGI shield supporting Safari 206 video streaming and strict 404 cloaking."""

    def __init__(self, asgi_app):
        self.app = asgi_app

    async def __call__(self, scope, receive, send):
        if scope["type"] != "http":
            await self.app(scope, receive, send)
            return

        raw_path = scope.get("path", "")
        lower_path = raw_path.lower()
        method = scope.get("method", "GET").upper()

        # Block sensitive directories, hidden dotfiles, and system file extensions everywhere
        is_blocked = (
            "/." in lower_path
            or any(lower_path.endswith(ext) for ext in BLOCKED_EXTENSIONS)
            or any(lower_path == p or lower_path.startswith(p + "/") for p in BLOCKED_PREFIXES)
        )
        if not is_blocked and lower_path.endswith(".json") and not lower_path.startswith("/data/"):
            is_blocked = True
        if not is_blocked and lower_path.startswith("/data/"):
            fname = lower_path[6:]
            if "/" in fname or fname not in PUBLIC_DATA_FILES:
                is_blocked = True

        if is_blocked:
            resp = not_found_response()
            await resp(scope, receive, send)
            return

        # Cloak /api/auth/* before Pydantic parsing so unauthenticated probes get 404 (not 422)
        if method != "OPTIONS" and lower_path.startswith("/api/auth/"):
            headers = {k.decode("latin-1").lower(): v.decode("latin-1") for k, v in scope.get("headers", [])}
            cookies_raw = headers.get("cookie", "")
            has_gate_hdr = bool(headers.get("x-gateway-token", "").strip())
            has_auth = bool(headers.get("authorization", "").strip() or headers.get("x-admin-token", "").strip())
            has_cookies = (GATE_COOKIE_NAME in cookies_raw) or (SESSION_COOKIE_NAME in cookies_raw)
            if not (has_gate_hdr or has_auth or has_cookies):
                resp = not_found_response()
                await resp(scope, receive, send)
                return

        async def send_wrapper(message):
            if message["type"] == "http.response.start":
                hdrs = list(message.get("headers", []))
                hdrs.extend([
                    (b"x-content-type-options", b"nosniff"),
                    (b"x-frame-options", b"SAMEORIGIN"),
                    (b"referrer-policy", b"no-referrer" if lower_path.startswith((GTT_ADMIN_PATH.lower(), "/_gtt_assets", "/api/auth/")) else b"strict-origin-when-cross-origin"),
                    (b"permissions-policy", b"camera=(), microphone=(), geolocation=()"),
                ])
                if lower_path.startswith(GTT_ADMIN_PATH.lower()) or lower_path.startswith("/_gtt_assets") or lower_path.startswith("/api/auth"):
                    hdrs.extend([
                        (b"x-robots-tag", b"noindex, nofollow"),
                        (b"cache-control", b"no-store, no-cache, must-revalidate"),
                    ])
                elif lower_path.endswith((".css", ".js", ".html")) or lower_path in ("", "/"):
                    hdrs.append((b"cache-control", b"no-cache, must-revalidate"))
                message["headers"] = hdrs
            await send(message)

        await self.app(scope, receive, send_wrapper)


app.add_middleware(SecurityShieldMiddleware)


# ================= STEALTH ADMIN GATEWAY & ASSETS =================

@app.get(GTT_ADMIN_PATH)
@app.get(f"{GTT_ADMIN_PATH}/")
async def serve_secret_admin(request: Request, token: Optional[str] = None):
    ip = get_client_ip(request)
    gate_rl_key = f"gate:{ip}"
    is_locked, _ = database.check_rate_limit(gate_rl_key)
    if is_locked:
        return not_found_response()

    used_url_token = False
    ok = False
    if token is not None:
        ok = database.verify_gateway_token(token.strip())
        if not ok:
            database.record_rate_limit_fail(
                gate_rl_key,
                SERVER_LIMITS["MAX_GATE_FAILS"],
                SERVER_LIMITS["GATE_LOCKOUT_MINUTES"],
            )
            return not_found_response()
        database.clear_rate_limit(gate_rl_key)
        used_url_token = True
    else:
        ok = verify_gate_cookie(request.cookies.get(GATE_COOKIE_NAME))

    if not ok:
        return not_found_response()

    admin_html_path = PRIVATE_ADMIN_DIR / "admin.html"
    if not admin_html_path.is_file():
        return not_found_response()

    if used_url_token:
        resp = RedirectResponse(GTT_ADMIN_PATH, status_code=303)
        resp.set_cookie(
            key=GATE_COOKIE_NAME,
            value=sign_gate_cookie(ttl_seconds=43200),
            max_age=43200,
            httponly=True,
            samesite="lax",
            secure=is_request_secure(request),
            path="/",
        )
        return resp
    return HTMLResponse(admin_html_path.read_text(encoding="utf-8"))


@app.get("/_gtt_assets/{filename}")
async def serve_private_admin_asset(filename: str, request: Request):
    if not (resolve_gate_from_request(request) or database.get_session(_extract_session_token(request))):
        return not_found_response()
    if filename not in ("admin.css", "admin.js"):
        return not_found_response()
    fpath = PRIVATE_ADMIN_DIR / filename
    if not fpath.is_file():
        return not_found_response()
    media_type = "text/css; charset=utf-8" if filename.endswith(".css") else "application/javascript; charset=utf-8"
    return Response(
        content=fpath.read_bytes(),
        media_type=media_type,
        headers={
            "X-Robots-Tag": "noindex, nofollow",
            "Cache-Control": "no-store, no-cache, must-revalidate",
        },
    )


# ================= AUTH MODELS & ENDPOINTS =================

class LoginRequest(BaseModel):
    username: Optional[str] = "gosha"
    password: str = Field(..., min_length=1, max_length=256)
    token: Optional[str] = None
    gateway_token: Optional[str] = None
    honeypot: Optional[str] = ""


class ChangePasswordRequest(BaseModel):
    current_password: str = Field(..., min_length=1, max_length=256)
    new_password: str = Field(..., min_length=8, max_length=256)


@app.get("/api/auth/gate-status")
async def auth_gate_status(request: Request):
    if not resolve_gate_from_request(request):
        return not_found_response()
    return {"gateActive": True, "adminPath": GTT_ADMIN_PATH}


@app.post("/api/auth/login")
async def login(req: LoginRequest, request: Request, response: Response):
    client_ip = get_client_ip(request)
    gate_rl_key = f"gate:{client_ip}"
    if not verify_gate_cookie(request.cookies.get(GATE_COOKIE_NAME)):
        if database.check_rate_limit(gate_rl_key)[0]:
            return not_found_response()
        supplied_gate = (request.headers.get("x-gateway-token") or req.gateway_token or req.token or "").strip()
        if not database.verify_gateway_token(supplied_gate):
            database.record_rate_limit_fail(
                gate_rl_key, SERVER_LIMITS["MAX_GATE_FAILS"], SERVER_LIMITS["GATE_LOCKOUT_MINUTES"]
            )
            return not_found_response()


    # Honeypot check
    if (req.honeypot or "").strip():
        database.record_rate_limit_fail(f"login:{client_ip}", 1, SERVER_LIMITS["LOCKOUT_MINUTES"] * 2)
        await asyncio.sleep(0.5)
        raise HTTPException(status_code=403, detail="Запрос отклонён системой защиты")

    # Persistent SQLite IP Rate Limit
    rl_key = f"login:{client_ip}"
    is_locked, remain_sec = database.check_rate_limit(rl_key)
    if is_locked:
        mins = max(1, (remain_sec + 59) // 60)
        raise HTTPException(
            status_code=429,
            detail=f"Слишком много неверных попыток. IP заблокирован на {mins} мин.",
        )

    expected_user = SERVER_LIMITS["ADMIN_USERNAME"]
    entered_user = (req.username or "").strip().lower()
    user_valid = bool(entered_user) and hmac.compare_digest(entered_user.encode("utf-8"), expected_user.encode("utf-8"))
    pass_valid = database.verify_admin_password(req.password)

    if user_valid and pass_valid:
        database.clear_rate_limit(rl_key)
        session_id = secrets.token_urlsafe(32)
        database.create_session(session_id, entered_user, SESSION_LIFETIME_SECONDS)

        response.set_cookie(
            key=SESSION_COOKIE_NAME,
            value=session_id,
            max_age=SESSION_LIFETIME_SECONDS,
            httponly=True,
            samesite="lax",
            secure=is_request_secure(request),
            path="/",
        )
        return {
            "status": "ok",
            "message": "Авторизация успешна",
            "session_token": session_id,
            "username": entered_user,
        }

    fails, lock_sec = database.record_rate_limit_fail(
        rl_key,
        SERVER_LIMITS["MAX_LOGIN_ATTEMPTS"],
        SERVER_LIMITS["LOCKOUT_MINUTES"],
    )
    await asyncio.sleep(0.5)
    if lock_sec > 0:
        raise HTTPException(
            status_code=429,
            detail=f"Превышен лимит попыток. Вход заблокирован на {SERVER_LIMITS['LOCKOUT_MINUTES']} мин.",
        )
    left = max(0, SERVER_LIMITS["MAX_LOGIN_ATTEMPTS"] - fails)
    raise HTTPException(status_code=401, detail=f"Неверный логин или пароль. Осталось попыток: {left}")


@app.post("/api/auth/logout")
async def logout(request: Request, response: Response):
    token = _extract_session_token(request)
    if token:
        database.delete_session(token)
    response.delete_cookie(SESSION_COOKIE_NAME, path="/")
    return {"status": "ok", "message": "Сессия успешно завершена"}


@app.get("/api/auth/verify")
async def verify_session_endpoint(session: Dict[str, Any] = Depends(verify_admin_session)):
    return {"status": "ok", "valid": True, "username": session.get("username", "gosha")}


@app.post("/api/auth/change-password")
async def change_password(req: ChangePasswordRequest, session: Dict[str, Any] = Depends(verify_admin_session)):
    if not database.verify_admin_password(req.current_password):
        raise HTTPException(status_code=400, detail="Неверный текущий пароль")
    new_pass = req.new_password.strip()
    if len(new_pass) < 8:
        raise HTTPException(status_code=400, detail="Новый пароль должен содержать минимум 8 символов")

    database.update_admin_password(new_pass)
    return {"status": "ok", "message": "Пароль успешно обновлен"}


@app.get("/api/auth/gateway-info")
async def get_gateway_info(request: Request, session: Dict[str, Any] = Depends(verify_admin_session)):
    tok = database.get_gateway_token()
    base = str(request.base_url).rstrip("/")
    return {
        "adminPath": GTT_ADMIN_PATH,
        "gatewayToken": tok,
        "adminUrl": f"{base}{GTT_ADMIN_PATH}?token={tok}",
    }


@app.post("/api/auth/rotate-token")
async def rotate_gateway_token_endpoint(request: Request, session: Dict[str, Any] = Depends(verify_admin_session)):
    new_tok = database.rotate_gateway_token()
    base = str(request.base_url).rstrip("/")
    return {
        "status": "ok",
        "token": new_tok,
        "adminUrl": f"{base}{GTT_ADMIN_PATH}?token={new_tok}",
    }


@app.post("/api/auth/revoke-all-sessions")
async def revoke_all_sessions_endpoint(response: Response, session: Dict[str, Any] = Depends(verify_admin_session)):
    database.revoke_all_sessions()
    response.delete_cookie(SESSION_COOKIE_NAME, path="/")
    return {"status": "ok"}


# ================= STRICTLY WHITELISTED PUBLIC/ADMIN SETTINGS =================

@app.get("/api/settings/{key}")
async def get_system_setting(key: str, request: Request):
    if key in {"telegram", "telegram_config"}:
        return not_found_response()
    if key not in PUBLIC_SETTING_KEYS:
        # Never expose sensitive internal keys via generic settings endpoint
        if key in ("admin_password", "admin_password_hash", "gateway_token", "runtime_hmac_secret", "secret_url_token"):
            raise HTTPException(status_code=404, detail="Страница не найдена")
        verify_admin_session(request)
    val = database.get_setting(key, "")
    return {"key": key, "value": val}


@app.post("/api/settings/{key}")
async def save_system_setting(key: str, request: Request, session: Dict[str, Any] = Depends(verify_admin_session)):
    if key in {"telegram", "telegram_config"}:
        return not_found_response()
    if key in ("admin_password", "admin_password_hash", "gateway_token", "runtime_hmac_secret", "secret_url_token", "sessions_hashed_v1", "gateway_token_db_v2"):
        raise HTTPException(status_code=403, detail="Защищённый системный параметр")
    try:
        body = await request.json()
    except Exception:
        body = {}
    val = body["value"] if isinstance(body, dict) and "value" in body else body
    if not isinstance(val, str):
        val = json.dumps(val, ensure_ascii=False)
    database.set_setting(key, val)
    return {"status": "ok", "key": key, "value": val}


# ================= CARS ENDPOINTS =================

class FeaturedSlotsRequest(BaseModel):
    featured_ids: List[str]


class CarReorderRequest(BaseModel):
    car_ids: List[str]


@app.post("/api/cars/reorder")
async def reorder_all_cars_endpoint(req: CarReorderRequest, session: Dict[str, Any] = Depends(verify_admin_session)):
    if not database.reorder_all_cars(req.car_ids):
        raise HTTPException(status_code=400, detail="Ошибка переупорядочивания болидов")
    return {"status": "ok", "count": len(req.car_ids)}


@app.post("/api/cars/featured")
async def set_featured_cars(req: FeaturedSlotsRequest, session: Dict[str, Any] = Depends(verify_admin_session)):
    if not database.reorder_featured_cars(req.featured_ids):
        raise HTTPException(status_code=400, detail="Ошибка сохранения порядка болидов")
    return {"status": "ok", "featured_ids": req.featured_ids}


@app.get("/api/cars")
async def list_cars():
    return database.get_all_cars()


@app.get("/api/cars/{car_id}")
async def get_car(car_id: str):
    car = database.get_car_by_id(car_id)
    if not car:
        raise HTTPException(status_code=404, detail="Автомобиль не найден")
    return car


@app.post("/api/cars")
async def create_car(car_data: Dict[str, Any], session: Dict[str, Any] = Depends(verify_admin_session)):
    if not car_data.get("id"):
        car_data["id"] = "gtt_car_" + str(int(datetime.now().timestamp()))
    saved = database.upsert_car(car_data)
    return saved


@app.put("/api/cars/{car_id}")
async def update_car(car_id: str, car_data: Dict[str, Any], session: Dict[str, Any] = Depends(verify_admin_session)):
    car_data["id"] = car_id
    return database.upsert_car(car_data)


@app.delete("/api/cars/{car_id}")
async def remove_car(car_id: str, session: Dict[str, Any] = Depends(verify_admin_session)):
    if not database.delete_car(car_id):
        raise HTTPException(status_code=404, detail="Проект не найден")
    return {"status": "ok", "deleted_id": car_id}


# ================= TEAM ENDPOINTS =================

@app.get("/api/team")
async def list_team():
    return database.get_all_team()


@app.post("/api/team")
async def create_team_member(member: Dict[str, Any], session: Dict[str, Any] = Depends(verify_admin_session)):
    if not member.get("id"):
        member["id"] = "team_" + str(int(datetime.now().timestamp()))
    return database.upsert_team_member(member)


@app.put("/api/team/{member_id}")
async def update_team_member(member_id: str, member: Dict[str, Any], session: Dict[str, Any] = Depends(verify_admin_session)):
    member["id"] = member_id
    return database.upsert_team_member(member)


@app.delete("/api/team/{member_id}")
async def remove_team_member(member_id: str, session: Dict[str, Any] = Depends(verify_admin_session)):
    if not database.delete_team_member(member_id):
        raise HTTPException(status_code=404, detail="Сотрудник не найден")
    return {"status": "ok", "deleted_id": member_id}


# ================= RECORDS ENDPOINTS =================

@app.get("/api/records")
async def list_records():
    return database.get_all_records()


@app.post("/api/records")
async def create_record(record: Dict[str, Any], session: Dict[str, Any] = Depends(verify_admin_session)):
    if not record.get("id"):
        record["id"] = "rec_" + str(int(datetime.now().timestamp()))
    return database.upsert_record(record)


@app.put("/api/records/{rec_id}")
async def update_record(rec_id: str, record: Dict[str, Any], session: Dict[str, Any] = Depends(verify_admin_session)):
    record["id"] = rec_id
    return database.upsert_record(record)


@app.delete("/api/records/{rec_id}")
async def remove_record(rec_id: str, session: Dict[str, Any] = Depends(verify_admin_session)):
    if not database.delete_record(rec_id):
        raise HTTPException(status_code=404, detail="Рекорд не найден")
    return {"status": "ok", "deleted_id": rec_id}


# ================= GALLERY ENDPOINTS =================

@app.get("/api/gallery")
async def list_gallery():
    return database.get_all_gallery()


@app.post("/api/gallery")
async def create_gallery_item(item: Dict[str, Any], session: Dict[str, Any] = Depends(verify_admin_session)):
    if not item.get("id"):
        item["id"] = "gal_" + str(int(datetime.now().timestamp()))
    return database.upsert_gallery(item)


@app.put("/api/gallery/{gal_id}")
async def update_gallery_item(gal_id: str, item: Dict[str, Any], session: Dict[str, Any] = Depends(verify_admin_session)):
    item["id"] = gal_id
    return database.upsert_gallery(item)


@app.delete("/api/gallery/{gal_id}")
async def remove_gallery_item(gal_id: str, session: Dict[str, Any] = Depends(verify_admin_session)):
    if not database.delete_gallery(gal_id):
        raise HTTPException(status_code=404, detail="Кадр не найден")
    return {"status": "ok", "deleted_id": gal_id}


# ================= MEDIA ENDPOINTS =================

@app.get("/api/media")
async def list_media():
    return database.get_all_media()


@app.post("/api/media")
async def create_media_item(item: Dict[str, Any], session: Dict[str, Any] = Depends(verify_admin_session)):
    if not item.get("id"):
        item["id"] = "med_" + str(int(datetime.now().timestamp()))
    return database.upsert_media(item)


@app.put("/api/media/{med_id}")
async def update_media_item(med_id: str, item: Dict[str, Any], session: Dict[str, Any] = Depends(verify_admin_session)):
    item["id"] = med_id
    return database.upsert_media(item)


@app.delete("/api/media/{med_id}")
async def remove_media_item(med_id: str, session: Dict[str, Any] = Depends(verify_admin_session)):
    if not database.delete_media(med_id):
        raise HTTPException(status_code=404, detail="Медиа не найдено")
    return {"status": "ok", "deleted_id": med_id}


# ================= PARTNERS & SPONSORS ENDPOINTS =================

@app.get("/api/partners")
async def list_partners():
    return database.get_all_partners()


@app.post("/api/partners")
async def create_partner_item(item: Dict[str, Any], session: Dict[str, Any] = Depends(verify_admin_session)):
    if not item.get("id"):
        item["id"] = "prt_" + str(int(datetime.now().timestamp()))
    res = database.upsert_partner(item)
    return res


@app.put("/api/partners/{partner_id}")
async def update_partner_item(partner_id: str, item: Dict[str, Any], session: Dict[str, Any] = Depends(verify_admin_session)):
    item["id"] = partner_id
    res = database.upsert_partner(item)
    return res


@app.delete("/api/partners/{partner_id}")
async def remove_partner_item(partner_id: str, session: Dict[str, Any] = Depends(verify_admin_session)):
    if not database.delete_partner(partner_id):
        raise HTTPException(status_code=404, detail="Партнер не найден")
    return {"status": "ok", "deleted_id": partner_id}


# ================= MOTO DIVISION ENDPOINTS =================

@app.get("/api/moto")
async def list_moto():
    return database.get_all_moto()


@app.post("/api/moto")
async def create_moto_item(item: Dict[str, Any], session: Dict[str, Any] = Depends(verify_admin_session)):
    if not item.get("id"):
        item["id"] = "moto_" + str(int(datetime.now().timestamp()))
    res = database.upsert_moto(item)
    return res


@app.put("/api/moto/{moto_id}")
async def update_moto_item(moto_id: str, item: Dict[str, Any], session: Dict[str, Any] = Depends(verify_admin_session)):
    item["id"] = moto_id
    res = database.upsert_moto(item)
    return res


@app.delete("/api/moto/{moto_id}")
async def remove_moto_item(moto_id: str, session: Dict[str, Any] = Depends(verify_admin_session)):
    if not database.delete_moto(moto_id):
        raise HTTPException(status_code=404, detail="Мотопроект не найден")
    return {"status": "ok", "deleted_id": moto_id}


@app.get("/api/moto/banners")
async def get_moto_banners():
    raw = database.get_setting("moto_banners", "")
    if raw:
        try:
            return json.loads(raw)
        except Exception:
            pass
    return {
        "banner1": {
            "img": "assets/moto/bmw_m1000rr_cafe.jpg",
            "badge": "FLAGSHIP // BMW M1000RR GOSHATURBOTECH",
            "object_position": "center 50%",
        },
        "banner2": {
            "img": "assets/moto/gtt_superbikes_trio_night.jpg",
            "badge": "GTT MOTORSPORT FLEET",
            "object_position": "center 50%",
        },
    }


@app.post("/api/moto/banners")
async def save_moto_banners(payload: Dict[str, Any], session: Dict[str, Any] = Depends(verify_admin_session)):
    database.set_setting("moto_banners", json.dumps(payload, ensure_ascii=False))
    return {"status": "ok", "banners": payload}


# ================= TRAFFIC TELEMETRY =================

@app.get("/api/traffic")
async def get_traffic(session: Dict[str, Any] = Depends(verify_admin_session)):
    return database.get_traffic_summary()


@app.post("/api/traffic/visit")
async def log_visit(data: Dict[str, Any]):
    device = str(data.get("device", "Unknown"))[:64]
    source = str(data.get("source", "Прямой переход"))[:128]
    page = str(data.get("page", "index.html"))[:128]
    is_new = bool(data.get("isNewSession", True))
    database.record_traffic(device, source, page, is_new)
    return {"status": "ok"}


@app.post("/api/traffic/reset")
async def reset_traffic(session: Dict[str, Any] = Depends(verify_admin_session)):
    database.reset_traffic()
    return {"status": "ok", "message": "Счетчик трафика сброшен"}


# ================= MEDIA & IMAGE UPLOAD (MULTIPART + JSON COMPAT) =================

def validate_file_content(file_bytes: bytes, ext: str) -> bool:
    if len(file_bytes) < 4:
        return False
    ext = ext.lower()
    if ext in (".jpg", ".jpeg"):
        return file_bytes[:3] == b"\xff\xd8\xff"
    if ext == ".png":
        return file_bytes[:8] == b"\x89PNG\r\n\x1a\n"
    if ext == ".gif":
        return file_bytes[:6] in (b"GIF87a", b"GIF89a")
    if ext == ".webp":
        return len(file_bytes) >= 12 and file_bytes[:4] == b"RIFF" and file_bytes[8:12] == b"WEBP"
    if ext == ".avif":
        return b"ftypavif" in file_bytes[:32] or b"ftypavis" in file_bytes[:32]
    if ext in (".mp4", ".m4v"):
        return b"ftyp" in file_bytes[:32] or b"moov" in file_bytes[:32]
    if ext == ".mov":
        return b"ftyp" in file_bytes[:32] or b"moov" in file_bytes[:32] or b"wide" in file_bytes[:32]
    if ext == ".webm":
        return file_bytes[:4] == b"\x1a\x45\xdf\xa3"
    return False


@app.post("/api/upload")
async def upload_file(request: Request, session: Dict[str, Any] = Depends(verify_admin_session)):
    content_type = (request.headers.get("content-type") or "").lower()
    filename = "file_upload"
    folder: Optional[str] = None
    file_bytes = b""

    if "multipart/form-data" in content_type:
        form = await request.form()
        upload_item = form.get("file")
        if upload_item is None or not hasattr(upload_item, "read"):
            raise HTTPException(status_code=400, detail="Файл не передан")
        filename = getattr(upload_item, "filename", None) or "file_upload"
        folder = str(form.get("folder") or "") or None
        file_bytes = await upload_item.read()
    else:
        try:
            body = await request.json()
        except Exception:
            raise HTTPException(status_code=400, detail="Некорректный формат загрузки")
        filename = str(body.get("filename") or "file_upload")
        folder = body.get("folder")
        data_str = str(body.get("data") or "")
        if len(data_str) > 90 * 1024 * 1024:
            raise HTTPException(status_code=413, detail="Размер файла превышает допустимый лимит (макс. 60 МБ)")
        if "," in data_str:
            data_str = data_str.split(",", 1)[1]
        try:
            file_bytes = base64.b64decode(data_str)
        except Exception:
            raise HTTPException(status_code=400, detail="Некорректные данные base64")

    if not file_bytes:
        raise HTTPException(status_code=400, detail="Пустой файл")

    file_size = len(file_bytes)
    original_name = os.path.basename(filename)
    base_name, ext = os.path.splitext(original_name)
    ext = ext.lower()

    video_exts = {".mp4", ".mov", ".webm", ".m4v"}
    image_exts = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"}

    if ext in video_exts:
        if file_size > 60 * 1024 * 1024:
            raise HTTPException(status_code=413, detail="Видеофайл превышает лимит в 60 МБ")
        subfolder = folder or "videos"
    elif ext in image_exts:
        if file_size > 15 * 1024 * 1024:
            raise HTTPException(status_code=413, detail="Изображение превышает лимит в 15 МБ")
        subfolder = folder or "cars"
    else:
        raise HTTPException(
            status_code=400,
            detail="Недопустимый формат файла. Разрешены только JPG, PNG, WebP, GIF, AVIF, MP4, MOV, WebM",
        )

    if not validate_file_content(file_bytes, ext):
        raise HTTPException(
            status_code=400,
            detail="Заголовок файла (magic bytes) не соответствует расширению. Файл отклонен.",
        )

    allowed_folders = {"cars", "videos", "team", "records", "gallery", "media", "photos", "partners", "moto"}
    clean_subfolder = re.sub(r"[^a-zA-Z0-9_\-]", "", subfolder or "cars")
    if clean_subfolder not in allowed_folders:
        clean_subfolder = "cars"

    clean_base = re.sub(r"[^a-zA-Z0-9_\-]", "_", base_name)[:40] or "gtt"
    final_filename = f"{clean_base}_{int(time.time())}_{secrets.token_hex(4)}{ext}"

    target_dir = (BASE_DIR / "assets" / clean_subfolder).resolve()
    target_dir.mkdir(parents=True, exist_ok=True)
    target_path = target_dir / final_filename
    target_path.write_bytes(file_bytes)

    relative_url = f"assets/{clean_subfolder}/{final_filename}"
    return {
        "status": "ok",
        "filename": final_filename,
        "url": relative_url,
        "size": file_size,
    }


# ================= BACKUP & FACTORY DEFAULTS =================

@app.get("/api/backup/export")
async def export_all_data(session: Dict[str, Any] = Depends(verify_admin_session)):
    return {
        "cars": database.get_all_cars(),
        "team": database.get_all_team(),
        "records": database.get_all_records(),
        "gallery": database.get_all_gallery(),
        "media": database.get_all_media(),
        "partners": database.get_all_partners(),
        "moto": database.get_all_moto(),
        "exported_at": datetime.now().isoformat(),
    }


@app.post("/api/admin/restore-defaults")
@app.post("/api/factory-reset")
async def restore_factory_defaults_endpoint(session: Dict[str, Any] = Depends(verify_admin_session)):
    database.restore_factory_defaults()
    return {"status": "ok", "message": "Заводская база GoshaTurboTech восстановлена в SQLite"}


# ================= PUBLIC STATIC FILE SERVING =================

app.mount("/css", StaticFiles(directory=str(BASE_DIR / "css")), name="css")
app.mount("/js", StaticFiles(directory=str(BASE_DIR / "js")), name="js")
app.mount("/assets", StaticFiles(directory=str(BASE_DIR / "assets")), name="assets")
app.mount("/data", StaticFiles(directory=str(BASE_DIR / "data")), name="data")


@app.api_route("/", methods=["GET", "HEAD"])
@app.api_route("/index.html", methods=["GET", "HEAD"])
async def serve_index():
    return FileResponse(BASE_DIR / "index.html", media_type="text/html; charset=utf-8")


@app.api_route("/favicon.ico", methods=["GET", "HEAD"])
async def serve_favicon():
    return FileResponse(BASE_DIR / "favicon.ico")


@app.api_route("/{other_path:path}", methods=["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"])
async def catch_all_404(other_path: str):
    return not_found_response()


if __name__ == "__main__":
    import uvicorn

    local_ip = get_local_ip()

    print("\n" + "=" * 68)
    print(f"  GOSHA TURBOTECH — STEALTH ATELIER SERVER ({'PRODUCTION' if IS_PROD else 'DEVELOPMENT'})")
    print("=" * 68)
    print(f"  Storefront   : http://{GTT_HOST}:{GTT_PORT}/")
    if GTT_HOST == "0.0.0.0":
        print(f"  LAN Access   : http://{local_ip}:{GTT_PORT}/")
    print("=" * 68 + "\n")

    uvicorn.run(
        "server:app",
        host=GTT_HOST,
        port=GTT_PORT,
        reload=not IS_PROD,
        access_log=False,
        proxy_headers=GTT_BEHIND_PROXY,
        forwarded_allow_ips=",".join(GTT_TRUSTED_PROXIES) if GTT_BEHIND_PROXY else "127.0.0.1",
        reload_excludes=[
            "assets/*",
            "data/*",
            "*.db*",
            "*.sqlite*",
            "*.json",
            "*.log",
            ".env",
            "venv/*",
        ],
    )
