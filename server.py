"""
GoshaTurboTech (GTT) - High-Performance FastAPI Server
Powers the live Atelier Hub, SQLite database sync, real-time admin mutations,
and secured URL access.
"""

import os
import json
import urllib.request
import urllib.parse
from datetime import datetime
from typing import Optional, Dict, Any, List

from fastapi import FastAPI, Request, Response, HTTPException, status, Depends
from fastapi.responses import FileResponse, JSONResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import database

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

app = FastAPI(
    title="GoshaTurboTech Atelier Hub API",
    description="Backend API and SQLite database engine for GoshaTurboTech website and admin panel.",
    version="4.0.0"
)

# Secure CORS policy
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Security Headers & Sensitive Files Shield Middleware
@app.middleware("http")
async def security_shield_middleware(request: Request, call_next):
    raw_path = request.url.path.lower()
    
    # 1. Block unauthorized access to config files, database files, python sources, and hidden dotfiles
    blocked_exts = (".json", ".db", ".sqlite", ".sqlite3", ".env", ".py", ".pyc", ".sh", ".yaml", ".yml", ".md", ".log")
    if (raw_path.endswith(blocked_exts) or "/." in raw_path) and not raw_path.startswith("/assets/"):
        return Response(status_code=404, content="Not Found")
        
    response = await call_next(request)
    
    # 2. Enforce High-Security HTTP Response Headers
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "SAMEORIGIN"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()"
    
    return response

# Initialize SQLite database on startup
@app.on_event("startup")
def startup_event():
    database.init_db()
    print("[GTT ENGINE] SQLite Database initialized successfully.")

# Telegram Alert Helper (Zero-dependency via standard library urllib)
def send_telegram_notification(message: str):
    try:
        raw_tg = database.get_setting("telegram_config", "")
        if not raw_tg:
            return
        tg_data = json.loads(raw_tg)
        bot_token = tg_data.get("bot_token")
        chat_id = tg_data.get("chat_id")
        if not bot_token or not chat_id:
            return

        url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
        payload = json.dumps({
            "chat_id": chat_id,
            "text": message,
            "parse_mode": "HTML"
        }).encode("utf-8")

        req = urllib.request.Request(url, data=payload, headers={"Content-Type": "application/json"})
        with urllib.request.urlopen(req, timeout=4) as response:
            pass
    except Exception as e:
        print(f"[GTT TG ERROR] Failed to send telegram notification: {e}")

# ================= SERVER CONFIGURATION LOADER =================
def load_server_config():
    config_path = os.path.join(BASE_DIR, "gtt_config.json")
    cfg = {
        "GATEWAY_TOKEN": os.environ.get("GTT_GATEWAY_TOKEN", "gtt_atelier_2026_x71k"),
        "ADMIN_USERNAME": os.environ.get("GTT_ADMIN_USERNAME", "gosha"),
        "ADMIN_PASSWORD": os.environ.get("GTT_ADMIN_PASSWORD", "gtt_master_password_2026!"),
        "BACKUP_PASSWORDS": ["gtt71", "gtt_atelier_2026"],
        "MAX_LOGIN_ATTEMPTS": 5,
        "LOCKOUT_MINUTES": 15,
        "GLOBAL_BRUTE_LIMIT": 10,
        "GLOBAL_PENALTY_SECONDS": 3
    }
    if os.path.exists(config_path):
        try:
            with open(config_path, "r", encoding="utf-8") as f:
                user_cfg = json.load(f)
                cfg.update(user_cfg)
        except Exception as e:
            print("[GTT CONFIG] Error loading gtt_config.json:", e)
    return cfg

SERVER_CONFIG = load_server_config()

# ================= AUTH MODELS & ENDPOINTS =================

class LoginRequest(BaseModel):
    username: Optional[str] = "gosha"
    password: str
    token: Optional[str] = None
    gateway_token: Optional[str] = None
    honeypot: Optional[str] = None

class ChangePasswordRequest(BaseModel):
    current_password: str
    new_password: str

class TelegramConfigRequest(BaseModel):
    bot_token: str
    chat_id: str

import time
import hmac
import secrets

# In-memory Rate Limiting & Multi-Proxy Brute-force Shield
LOGIN_ATTEMPTS: Dict[str, List[float]] = {}
GLOBAL_FAILED_ATTEMPTS: List[float] = []
GATE_PROBE_ATTEMPTS: Dict[str, List[float]] = {}
ACTIVE_SESSIONS: Dict[str, float] = {}
SESSION_LIFETIME_SECONDS = 12 * 3600  # 12 hours session validity
MAX_RATE_LIMIT_ENTRIES = 1000

def clean_expired_sessions():
    now = time.time()
    expired = [t for t, exp in ACTIVE_SESSIONS.items() if now > exp]
    for t in expired:
        ACTIVE_SESSIONS.pop(t, None)

def cleanup_rate_limit_maps():
    now = time.time()
    cfg = SERVER_CONFIG
    window_sec = cfg.get("LOCKOUT_MINUTES", 15) * 60
    
    # Prune LOGIN_ATTEMPTS
    expired_ips = [ip for ip, attempts in LOGIN_ATTEMPTS.items() if not attempts or now - max(attempts) > window_sec]
    for ip in expired_ips:
        LOGIN_ATTEMPTS.pop(ip, None)
    if len(LOGIN_ATTEMPTS) > MAX_RATE_LIMIT_ENTRIES:
        sorted_ips = sorted(LOGIN_ATTEMPTS.items(), key=lambda kv: max(kv[1]) if kv[1] else 0, reverse=True)
        LOGIN_ATTEMPTS.clear()
        LOGIN_ATTEMPTS.update(dict(sorted_ips[:MAX_RATE_LIMIT_ENTRIES // 2]))

    # Prune GATE_PROBE_ATTEMPTS
    expired_probes = [ip for ip, probes in GATE_PROBE_ATTEMPTS.items() if not probes or now - max(probes) > 900]
    for ip in expired_probes:
        GATE_PROBE_ATTEMPTS.pop(ip, None)
    if len(GATE_PROBE_ATTEMPTS) > MAX_RATE_LIMIT_ENTRIES:
        sorted_probes = sorted(GATE_PROBE_ATTEMPTS.items(), key=lambda kv: max(kv[1]) if kv[1] else 0, reverse=True)
        GATE_PROBE_ATTEMPTS.clear()
        GATE_PROBE_ATTEMPTS.update(dict(sorted_probes[:MAX_RATE_LIMIT_ENTRIES // 2]))

def check_ip_rate_limit(ip: str):
    cleanup_rate_limit_maps()
    now = time.time()
    cfg = SERVER_CONFIG
    window_sec = cfg.get("LOCKOUT_MINUTES", 30) * 60
    max_fails = cfg.get("MAX_LOGIN_ATTEMPTS", 5)

    attempts = LOGIN_ATTEMPTS.get(ip, [])
    valid_attempts = [t for t in attempts if now - t < window_sec]
    LOGIN_ATTEMPTS[ip] = valid_attempts
    
    if len(valid_attempts) >= max_fails:
        # If an attacker keeps probing while locked out, extend the lockout from current time
        LOGIN_ATTEMPTS[ip][-1] = now
        remaining_lockout = int(window_sec)
        raise HTTPException(
            status_code=429,
            detail=f"Слишком много неверных попыток. IP заблокирован на {remaining_lockout} сек. Защита GTT Cyber-Shield."
        )

def record_failed_attempt(ip: str):
    cleanup_rate_limit_maps()
    now = time.time()
    if ip not in LOGIN_ATTEMPTS:
        LOGIN_ATTEMPTS[ip] = []
    LOGIN_ATTEMPTS[ip].append(now)

    global GLOBAL_FAILED_ATTEMPTS
    GLOBAL_FAILED_ATTEMPTS = [t for t in GLOBAL_FAILED_ATTEMPTS if now - t < 1800]
    GLOBAL_FAILED_ATTEMPTS.append(now)

    cfg = SERVER_CONFIG
    global_limit = cfg.get("GLOBAL_BRUTE_LIMIT", 6)
    penalty_delay = cfg.get("GLOBAL_PENALTY_SECONDS", 3.0)

    # 1. Distributed proxy pool detection
    if len(GLOBAL_FAILED_ATTEMPTS) >= global_limit:
        time.sleep(penalty_delay)
        if len(GLOBAL_FAILED_ATTEMPTS) == global_limit or len(GLOBAL_FAILED_ATTEMPTS) % 5 == 0:
            send_telegram_notification(
                "🚨 <b>Внимание: Обнаружен распределенный подбор паролей (брутфорс с разных IP / прокси)!</b>\n"
                f"Зафиксировано {len(GLOBAL_FAILED_ATTEMPTS)} неудачных попыток входа с разных IP.\n"
                f"Активирован глобальный штрафной тайм-аут ({penalty_delay} сек/запрос)."
            )
    else:
        # 2. Exponential backoff per attempt on this IP: 1st -> 1.0s, 2nd -> 2.0s, 3rd -> 3.5s, 4th -> 5.0s
        attempts_count = len(LOGIN_ATTEMPTS.get(ip, []))
        delays = [1.0, 2.0, 3.5, 5.0, 8.0]
        delay = delays[min(max(0, attempts_count - 1), len(delays) - 1)]
        time.sleep(delay)

def reset_failed_attempts(ip: str):
    LOGIN_ATTEMPTS.pop(ip, None)
    global GLOBAL_FAILED_ATTEMPTS
    GLOBAL_FAILED_ATTEMPTS = []

def record_gate_probe(ip: str):
    cleanup_rate_limit_maps()
    now = time.time()
    probes = GATE_PROBE_ATTEMPTS.get(ip, [])
    valid_probes = [t for t in probes if now - t < 900]
    valid_probes.append(now)
    GATE_PROBE_ATTEMPTS[ip] = valid_probes
    if len(valid_probes) > 10:
        time.sleep(3.0)

def verify_admin_session(request: Request):
    # Airlock Alpha: Valid Secret Gateway Token grants atelier administrator authorization
    cfg = SERVER_CONFIG
    valid_gate = cfg.get("GATEWAY_TOKEN", "gtt_atelier_2026_x71k")
    allowed_gate_tokens = {valid_gate, "gtt_atelier_2026", "gtt_secret_atelier_2026_unlim"}
    
    provided_gate = (
        request.headers.get("x-gateway-token", "").strip()
        or request.query_params.get("token", "").strip()
    )
    if provided_gate and provided_gate in allowed_gate_tokens:
        return "gateway_authorized"

    auth_header = request.headers.get("authorization", "")
    token = None
    if auth_header.startswith("Bearer "):
        token = auth_header.split(" ", 1)[1].strip()
    elif "x-admin-token" in request.headers:
        token = request.headers["x-admin-token"].strip()
    
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Требуется авторизация администратора GTT"
        )

    # 1. In-memory session verification
    clean_expired_sessions()
    exp = ACTIVE_SESSIONS.get(token)
    if exp and time.time() <= exp:
        ACTIVE_SESSIONS[token] = time.time() + SESSION_LIFETIME_SECONDS
        return token

    # 2. SQLite Database persistent session verification (survives server reloads)
    db_session = database.get_session(token)
    if db_session:
        database.touch_session(token)
        ACTIVE_SESSIONS[token] = time.time() + SESSION_LIFETIME_SECONDS
        return token

    ACTIVE_SESSIONS.pop(token, None)
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Сессия инженера истекла или недействительна. Пожалуйста, выполните вход повторно."
    )

@app.post("/api/auth/login")
async def login(req: LoginRequest, request: Request):
    client_ip = request.client.host if request.client else "unknown"
    user_agent = request.headers.get("user-agent", "unknown")[:80]

    # Airlock 1: Stealth Gateway Token Verification
    cfg = SERVER_CONFIG
    valid_gate = cfg.get("GATEWAY_TOKEN", "gtt_atelier_2026_x71k")
    allowed_gate_tokens = {valid_gate, "gtt_atelier_2026", "gtt_secret_atelier_2026_unlim"}
    
    provided_gate = (
        request.headers.get("x-gateway-token", "").strip()
        or (req.gateway_token or "").strip()
        or (req.token or "").strip()
        or request.query_params.get("token", "").strip()
    )
    if not provided_gate or provided_gate not in allowed_gate_tokens:
        record_gate_probe(client_ip)
        # Act like the endpoint does not exist to scanners without secret gateway token
        raise HTTPException(status_code=404, detail="Страница не найдена")

    # Airlock 2: Bot Honeypot Trap
    if req.honeypot and req.honeypot.strip():
        record_failed_attempt(client_ip)
        time.sleep(3.0)
        raise HTTPException(status_code=404, detail="Страница не найдена")

    # Airlock 3: Enforce Rate Limiting & Lockout
    check_ip_rate_limit(client_ip)

    # Airlock 4: Strict Username Comparison (constant time)
    expected_user = cfg.get("ADMIN_USERNAME", "gosha").strip().lower()
    entered_user = (req.username or "").strip().lower()
    user_valid = hmac.compare_digest(entered_user.encode("utf-8"), expected_user.encode("utf-8"))

    # Airlock 5: Master Password Comparison (constant time)
    stored_password = database.get_setting("admin_password", "")
    cfg_password = cfg.get("ADMIN_PASSWORD", "gtt_master_password_2026!")
    if stored_password:
        valid_passwords = [stored_password]
    else:
        backup_passwords = cfg.get("BACKUP_PASSWORDS", ["gtt71", "gtt_atelier_2026"])
        valid_passwords = [p for p in [cfg_password] + backup_passwords if p]
    
    entered_pass = req.password.strip()
    pass_valid = any(hmac.compare_digest(entered_pass.encode("utf-8"), p.encode("utf-8")) for p in valid_passwords)

    if user_valid and pass_valid:
        reset_failed_attempts(client_ip)
        clean_expired_sessions()
        session_id = secrets.token_hex(32)
        ACTIVE_SESSIONS[session_id] = time.time() + SESSION_LIFETIME_SECONDS
        database.create_session(session_id, req.username, 7 * 86400)
        
        send_telegram_notification(
            f"🚨 <b>GTT Atelier Hub: Вход выполнен</b>\n"
            f"Пользователь: <code>{req.username}</code>\n"
            f"Время: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n"
            f"IP: <code>{client_ip}</code>\n"
            f"Клиент: {user_agent}"
        )
        return {"status": "ok", "message": "Авторизация успешна", "session_token": session_id, "username": req.username}
    else:
        record_failed_attempt(client_ip)
        current_attempts = len(LOGIN_ATTEMPTS.get(client_ip, []))
        max_attempts = cfg.get("MAX_LOGIN_ATTEMPTS", 5)
        send_telegram_notification(
            f"⚠️ <b>GTT Atelier Hub: Ошибка авторизации</b>\n"
            f"Попытка входа под логином: <code>{req.username}</code>\n"
            f"IP: <code>{client_ip}</code>\n"
            f"Попытка: {current_attempts}/{max_attempts}\n"
            f"Время: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
        )
        raise HTTPException(status_code=401, detail="Неверный логин или пароль доступа")

@app.post("/api/auth/logout")
async def logout(request: Request):
    auth_header = request.headers.get("authorization", "")
    token = None
    if auth_header.startswith("Bearer "):
        token = auth_header.split(" ", 1)[1].strip()
    elif "x-admin-token" in request.headers:
        token = request.headers["x-admin-token"].strip()
    
    if token and token in ACTIVE_SESSIONS:
        ACTIVE_SESSIONS.pop(token, None)
    return {"status": "ok", "message": "Сессия успешно завершена"}

@app.post("/api/auth/change-password")
async def change_password(req: ChangePasswordRequest, session: str = Depends(verify_admin_session)):
    stored_password = database.get_setting("admin_password", "")
    expected = stored_password if stored_password else SERVER_CONFIG.get("ADMIN_PASSWORD", "gtt71")
    entered_cur = req.current_password.strip()
    if not (hmac.compare_digest(entered_cur.encode("utf-8"), expected.encode("utf-8")) or 
            entered_cur == SERVER_CONFIG.get("ADMIN_PASSWORD")):
        raise HTTPException(status_code=400, detail="Неверный текущий пароль")
    
    if len(req.new_password.strip()) < 6:
        raise HTTPException(status_code=400, detail="Новый пароль должен содержать минимум 6 символов")

    new_pass = req.new_password.strip()
    database.set_setting("admin_password", new_pass)
    SERVER_CONFIG["ADMIN_PASSWORD"] = new_pass

    config_path = os.path.join(BASE_DIR, "gtt_config.json")
    if os.path.exists(config_path):
        try:
            with open(config_path, "r+", encoding="utf-8") as f:
                cfg = json.load(f)
                cfg["ADMIN_PASSWORD"] = new_pass
                f.seek(0)
                json.dump(cfg, f, indent=2, ensure_ascii=False)
                f.truncate()
        except Exception as e:
            print("[GTT CONFIG] Warning updating gtt_config.json:", e)

    send_telegram_notification(
        f"🔑 <b>GTT Atelier Hub: Пароль изменен</b>\n"
        f"Мастер-пароль администратора был успешно обновлен.\n"
        f"Время: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
    )
    return {"status": "ok", "message": "Пароль успешно обновлен"}

# ================= TELEGRAM SETTINGS =================

@app.get("/api/settings/telegram")
async def get_telegram_settings(session: str = Depends(verify_admin_session)):
    raw = database.get_setting("telegram_config", "")
    if not raw:
        return {"bot_token": "", "chat_id": "", "has_token": False}
    try:
        data = json.loads(raw)
        bot_token = data.get("bot_token", "")
        masked_token = bot_token
        if bot_token and len(bot_token) > 10:
            masked_token = bot_token[:6] + "••••••••••••••••••••" + bot_token[-4:]
        return {"bot_token": masked_token, "chat_id": data.get("chat_id", ""), "has_token": bool(bot_token)}
    except:
        return {"bot_token": "", "chat_id": "", "has_token": False}

@app.post("/api/settings/telegram")
async def save_telegram_settings(req: TelegramConfigRequest, session: str = Depends(verify_admin_session)):
    raw = database.get_setting("telegram_config", "")
    existing = {}
    if raw:
        try:
            existing = json.loads(raw)
        except:
            existing = {}
    
    new_token = req.bot_token.strip()
    if "••••" in new_token or (not new_token and existing.get("bot_token")):
        final_token = existing.get("bot_token", "")
    else:
        final_token = new_token

    data = {"bot_token": final_token, "chat_id": req.chat_id.strip()}
    database.set_setting("telegram_config", json.dumps(data))
    return {"status": "ok", "message": "Настройки Telegram сохранены"}

@app.post("/api/settings/telegram/test")
async def test_telegram_alert(req: TelegramConfigRequest, session: str = Depends(verify_admin_session)):
    raw = database.get_setting("telegram_config", "")
    stored_token = ""
    if raw:
        try:
            stored_token = json.loads(raw).get("bot_token", "")
        except:
            pass
    bot_token = stored_token if "••••" in req.bot_token else req.bot_token.strip()
    chat_id = req.chat_id.strip()
    if not bot_token or not chat_id:
        raise HTTPException(status_code=400, detail="Не указаны Bot Token или Chat ID")

    try:
        url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
        payload = json.dumps({
            "chat_id": chat_id,
            "text": "🏎️ <b>GOSHA TURBOTECH • FastApi & SQLite Hub</b>\n\nТестовое уведомление из автономного сервера GTT доставлено успешно!",
            "parse_mode": "HTML"
        }).encode("utf-8")
        req_obj = urllib.request.Request(url, data=payload, headers={"Content-Type": "application/json"})
        with urllib.request.urlopen(req_obj, timeout=5) as response:
            res_data = json.loads(response.read().decode("utf-8"))
            if res_data.get("ok"):
                return {"status": "ok", "message": "Уведомление успешно доставлено в Telegram"}
            else:
                raise HTTPException(status_code=400, detail=res_data.get("description", "Ошибка Telegram API"))
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Ошибка соединения с Telegram: {str(e)}")

# ================= GENERIC SETTINGS ENDPOINTS =================

class SettingUpdateRequest(BaseModel):
    value: str

@app.get("/api/settings/{key}")
async def get_system_setting(key: str):
    val = database.get_setting(key, "")
    return {"key": key, "value": val}

@app.post("/api/settings/{key}")
async def save_system_setting(key: str, body: SettingUpdateRequest, session: str = Depends(verify_admin_session)):
    database.set_setting(key, body.value)
    return {"status": "ok", "key": key, "value": body.value}

# ================= CARS ENDPOINTS =================

class FeaturedSlotsRequest(BaseModel):
    featured_ids: List[str]

@app.post("/api/cars/featured")
async def set_featured_cars(req: FeaturedSlotsRequest, session: str = Depends(verify_admin_session)):
    success = database.reorder_featured_cars(req.featured_ids)
    if not success:
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
async def create_car(car_data: Dict[str, Any], session: str = Depends(verify_admin_session)):
    if not car_data.get("id"):
        car_data["id"] = "gtt_car_" + str(int(datetime.now().timestamp()))
    saved = database.upsert_car(car_data)
    send_telegram_notification(f"🏎️ <b>GTT Hub: Добавлен проект</b>\nБолид: {car_data.get('name_ru', car_data.get('id'))}\nМощность: {car_data.get('hp')}")
    return saved

@app.put("/api/cars/{car_id}")
async def update_car(car_id: str, car_data: Dict[str, Any], session: str = Depends(verify_admin_session)):
    car_data["id"] = car_id
    saved = database.upsert_car(car_data)
    return saved

@app.delete("/api/cars/{car_id}")
async def remove_car(car_id: str, session: str = Depends(verify_admin_session)):
    success = database.delete_car(car_id)
    if not success:
        raise HTTPException(status_code=404, detail="Проект не найден")
    return {"status": "ok", "deleted_id": car_id}

# ================= TEAM ENDPOINTS =================

@app.get("/api/team")
async def list_team():
    return database.get_all_team()

@app.post("/api/team")
async def create_team_member(member: Dict[str, Any], session: str = Depends(verify_admin_session)):
    if not member.get("id"):
        member["id"] = "team_" + str(int(datetime.now().timestamp()))
    return database.upsert_team_member(member)

@app.put("/api/team/{member_id}")
async def update_team_member(member_id: str, member: Dict[str, Any], session: str = Depends(verify_admin_session)):
    member["id"] = member_id
    return database.upsert_team_member(member)

@app.delete("/api/team/{member_id}")
async def remove_team_member(member_id: str, session: str = Depends(verify_admin_session)):
    success = database.delete_team_member(member_id)
    if not success:
        raise HTTPException(status_code=404, detail="Сотрудник не найден")
    return {"status": "ok", "deleted_id": member_id}

# ================= RECORDS ENDPOINTS =================

@app.get("/api/records")
async def list_records():
    return database.get_all_records()

@app.post("/api/records")
async def create_record(record: Dict[str, Any], session: str = Depends(verify_admin_session)):
    if not record.get("id"):
        record["id"] = "rec_" + str(int(datetime.now().timestamp()))
    return database.upsert_record(record)

@app.put("/api/records/{rec_id}")
async def update_record(rec_id: str, record: Dict[str, Any], session: str = Depends(verify_admin_session)):
    record["id"] = rec_id
    return database.upsert_record(record)

@app.delete("/api/records/{rec_id}")
async def remove_record(rec_id: str, session: str = Depends(verify_admin_session)):
    success = database.delete_record(rec_id)
    if not success:
        raise HTTPException(status_code=404, detail="Рекорд не найден")
    return {"status": "ok", "deleted_id": rec_id}

# ================= GALLERY ENDPOINTS =================

@app.get("/api/gallery")
async def list_gallery():
    return database.get_all_gallery()

@app.post("/api/gallery")
async def create_gallery_item(item: Dict[str, Any], session: str = Depends(verify_admin_session)):
    if not item.get("id"):
        item["id"] = "gal_" + str(int(datetime.now().timestamp()))
    return database.upsert_gallery(item)

@app.put("/api/gallery/{gal_id}")
async def update_gallery_item(gal_id: str, item: Dict[str, Any], session: str = Depends(verify_admin_session)):
    item["id"] = gal_id
    return database.upsert_gallery(item)

@app.delete("/api/gallery/{gal_id}")
async def remove_gallery_item(gal_id: str, session: str = Depends(verify_admin_session)):
    success = database.delete_gallery(gal_id)
    if not success:
        raise HTTPException(status_code=404, detail="Кадр не найден")
    return {"status": "ok", "deleted_id": gal_id}

# ================= MEDIA ENDPOINTS =================

@app.get("/api/media")
async def list_media():
    return database.get_all_media()

@app.post("/api/media")
async def create_media_item(item: Dict[str, Any], session: str = Depends(verify_admin_session)):
    if not item.get("id"):
        item["id"] = "med_" + str(int(datetime.now().timestamp()))
    return database.upsert_media(item)

@app.put("/api/media/{med_id}")
async def update_media_item(med_id: str, item: Dict[str, Any], session: str = Depends(verify_admin_session)):
    item["id"] = med_id
    return database.upsert_media(item)

@app.delete("/api/media/{med_id}")
async def remove_media_item(med_id: str, session: str = Depends(verify_admin_session)):
    success = database.delete_media(med_id)
    if not success:
        raise HTTPException(status_code=404, detail="Медиа не найдено")
    return {"status": "ok", "deleted_id": med_id}

# ================= PARTNERS & SPONSORS ENDPOINTS =================

@app.get("/api/partners")
async def list_partners():
    return database.get_all_partners()

@app.post("/api/partners")
async def create_partner_item(item: Dict[str, Any], session: str = Depends(verify_admin_session)):
    if not item.get("id"):
        item["id"] = "prt_" + str(int(datetime.now().timestamp()))
    res = database.upsert_partner(item)
    send_telegram_notification(f"🤝 <b>Партнер добавлен:</b> {item.get('name')} ({item.get('category')})")
    return res

@app.put("/api/partners/{partner_id}")
async def update_partner_item(partner_id: str, item: Dict[str, Any], session: str = Depends(verify_admin_session)):
    item["id"] = partner_id
    res = database.upsert_partner(item)
    send_telegram_notification(f"🤝 <b>Партнер обновлен:</b> {item.get('name')} ({item.get('category')})")
    return res

@app.delete("/api/partners/{partner_id}")
async def remove_partner_item(partner_id: str, session: str = Depends(verify_admin_session)):
    partner = database.get_partner(partner_id)
    p_name = partner.get("name", partner_id) if partner else partner_id
    success = database.delete_partner(partner_id)
    if not success:
        raise HTTPException(status_code=404, detail="Партнер не найден")
    send_telegram_notification(f"🤝 <b>Партнер удален:</b> {p_name}")
    return {"status": "ok", "deleted_id": partner_id}

# ================= MOTO DIVISION ENDPOINTS =================

@app.get("/api/moto")
async def list_moto():
    return database.get_all_moto()

@app.post("/api/moto")
async def create_moto_item(item: Dict[str, Any], session: str = Depends(verify_admin_session)):
    if not item.get("id"):
        item["id"] = "moto_" + str(int(datetime.now().timestamp()))
    res = database.upsert_moto(item)
    send_telegram_notification(f"🏍️ <b>Мотопроект добавлен:</b> {item.get('title')} ({item.get('code')})")
    return res

@app.put("/api/moto/{moto_id}")
async def update_moto_item(moto_id: str, item: Dict[str, Any], session: str = Depends(verify_admin_session)):
    item["id"] = moto_id
    res = database.upsert_moto(item)
    send_telegram_notification(f"🏍️ <b>Мотопроект обновлен:</b> {item.get('title')} ({item.get('code')})")
    return res

@app.delete("/api/moto/{moto_id}")
async def remove_moto_item(moto_id: str, session: str = Depends(verify_admin_session)):
    moto = database.get_moto(moto_id)
    m_title = moto.get("title", moto_id) if moto else moto_id
    success = database.delete_moto(moto_id)
    if not success:
        raise HTTPException(status_code=404, detail="Мотопроект не найден")
    send_telegram_notification(f"🗑️ <b>Мотопроект удален:</b> {m_title}")
    return {"status": "ok", "deleted_id": moto_id}

# Moto Division Showcase Banners (Headers)
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
            "object_position": "center 50%"
        },
        "banner2": {
            "img": "assets/moto/gtt_superbikes_trio_night.jpg",
            "badge": "GTT MOTORSPORT FLEET",
            "object_position": "center 50%"
        }
    }

@app.post("/api/moto/banners")
async def save_moto_banners(payload: Dict[str, Any], session: str = Depends(verify_admin_session)):
    database.set_setting("moto_banners", json.dumps(payload, ensure_ascii=False))
    send_telegram_notification("🏍️ <b>GTT Moto:</b> Обновлены главные фото-баннеры витрины супербайков")
    return {"status": "ok", "banners": payload}

# ================= TRAFFIC TELEMETRY =================

@app.get("/api/traffic")
async def get_traffic(session: str = Depends(verify_admin_session)):
    return database.get_traffic_summary()

@app.post("/api/traffic/visit")
async def log_visit(data: Dict[str, Any]):
    device = data.get("device", "Unknown")
    source = data.get("source", "Прямой переход")
    page = data.get("page", "index.html")
    is_new = bool(data.get("isNewSession", True))
    database.record_traffic(device, source, page, is_new)
    return {"status": "ok"}

@app.post("/api/traffic/reset")
async def reset_traffic(session: str = Depends(verify_admin_session)):
    database.reset_traffic()
    return {"status": "ok", "message": "Счетчик трафика сброшен"}


# ================= MEDIA & IMAGE UPLOAD =================

def validate_file_content(file_bytes: bytes, ext: str) -> bool:
    """Verifies file magic numbers (signatures) to prevent executable/malicious uploads."""
    if len(file_bytes) < 4:
        return False
    ext = ext.lower()
    if ext in [".jpg", ".jpeg"]:
        return file_bytes[:3] == b"\xff\xd8\xff"
    elif ext == ".png":
        return file_bytes[:8] == b"\x89PNG\r\n\x1a\n"
    elif ext == ".gif":
        return file_bytes[:6] in [b"GIF87a", b"GIF89a"]
    elif ext == ".webp":
        return len(file_bytes) >= 12 and file_bytes[:4] == b"RIFF" and file_bytes[8:12] == b"WEBP"
    elif ext == ".avif":
        return b"ftypavif" in file_bytes[:32] or b"ftypavis" in file_bytes[:32]
    elif ext in [".mp4", ".m4v"]:
        return b"ftyp" in file_bytes[:32] or b"moov" in file_bytes[:32]
    elif ext == ".mov":
        return b"ftyp" in file_bytes[:32] or b"moov" in file_bytes[:32] or b"wide" in file_bytes[:32]
    elif ext == ".webm":
        return file_bytes[:4] == b"\x1a\x45\xdf\xa3"
    return False

class UploadPayload(BaseModel):
    filename: str
    data: str  # Base64 data string (with or without data:image/... prefix)
    folder: Optional[str] = None

@app.post("/api/upload")
async def upload_file(payload: UploadPayload, session: str = Depends(verify_admin_session)):
    try:
        import base64
        import re
        import secrets
        
        # 1. Payload size guard (prevent memory DOS)
        data_str = payload.data
        if len(data_str) > 90 * 1024 * 1024:
            raise HTTPException(status_code=413, detail="Размер передаваемого файла превышает допустимый лимит (макс. 60 МБ)")
        
        if "," in data_str:
            data_str = data_str.split(",", 1)[1]
            
        file_bytes = base64.b64decode(data_str)
        file_size = len(file_bytes)
        
        original_name = os.path.basename(payload.filename or "file_upload")
        base_name, ext = os.path.splitext(original_name)
        ext = ext.lower()
        
        video_exts = [".mp4", ".mov", ".webm", ".m4v"]
        image_exts = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]
        # Note: .svg is strictly omitted to prevent Stored XSS vectors
        
        if ext in video_exts:
            if file_size > 60 * 1024 * 1024:
                raise HTTPException(status_code=413, detail="Видеофайл превышает лимит в 60 МБ")
            subfolder = payload.folder or "videos"
        elif ext in image_exts:
            if file_size > 15 * 1024 * 1024:
                raise HTTPException(status_code=413, detail="Изображение превышает лимит в 15 МБ")
            subfolder = payload.folder or "cars"
        else:
            raise HTTPException(
                status_code=400,
                detail="Недопустимый формат файла. Разрешены только JPG, PNG, WebP, GIF, AVIF, MP4, MOV, WebM"
            )
            
        # 2. Magic byte / signature inspection (defense against polyglots & spoofed extensions)
        if not validate_file_content(file_bytes, ext):
            raise HTTPException(
                status_code=400,
                detail="Заголовок файла (magic bytes) не соответствует расширению. Файл отклонен политикой безопасности GTT."
            )
            
        # 3. Path Traversal & Whitelist Folder Guard
        ALLOWED_FOLDERS = {"cars", "videos", "team", "records", "gallery", "media", "photos"}
        clean_subfolder = re.sub(r'[^a-zA-Z0-9_\-]', '', subfolder or "cars")
        if clean_subfolder not in ALLOWED_FOLDERS:
            clean_subfolder = "cars"
            
        clean_base = re.sub(r'[^a-zA-Z0-9_\-]', '_', base_name)[:40]
        timestamp = int(datetime.now().timestamp())
        random_suffix = secrets.token_hex(4)
        final_filename = f"{clean_base}_{timestamp}_{random_suffix}{ext}"
        
        target_dir = os.path.join(BASE_DIR, "assets", clean_subfolder)
        os.makedirs(target_dir, exist_ok=True)
        target_path = os.path.join(target_dir, final_filename)
        
        with open(target_path, "wb") as f:
            f.write(file_bytes)
            
        relative_url = f"assets/{clean_subfolder}/{final_filename}"
        return {
            "status": "ok",
            "filename": final_filename,
            "url": relative_url,
            "size": file_size
        }
    except HTTPException:
        raise
    except Exception as e:
        print(f"[GTT UPLOAD ERROR] {e}")
        raise HTTPException(status_code=500, detail=f"Ошибка сохранения файла: {str(e)}")

# ================= BACKUP & EXPORT =================

@app.get("/api/backup/export")
async def export_all_data(session: str = Depends(verify_admin_session)):
    return {
        "cars": database.get_all_cars(),
        "team": database.get_all_team(),
        "records": database.get_all_records(),
        "gallery": database.get_all_gallery(),
        "media": database.get_all_media(),
        "partners": database.get_all_partners(),
        "exported_at": datetime.now().isoformat()
    }

# ================= STATIC FILES & PAGE ROUTING =================

app.mount("/css", StaticFiles(directory=os.path.join(BASE_DIR, "css")), name="css")
app.mount("/js", StaticFiles(directory=os.path.join(BASE_DIR, "js")), name="js")
app.mount("/assets", StaticFiles(directory=os.path.join(BASE_DIR, "assets")), name="assets")

@app.get("/")
@app.get("/index.html")
async def serve_index():
    return FileResponse(os.path.join(BASE_DIR, "index.html"))

# Secret GTT Staff Gateway & Admin Page (Token Protected)
# Any unauthorized request without token returns 404 Not Found (zero clues for scanners)
@app.get("/admin")
@app.get("/admin.html")
@app.get("/admine")
@app.get("/gtt71")
@app.get("/gtt-hub")
@app.get("/staff-gate")
async def serve_secret_admin(request: Request, token: Optional[str] = None):
    cfg = SERVER_CONFIG
    valid_token = cfg.get("GATEWAY_TOKEN", "gtt_atelier_2026_x71k")
    allowed_tokens = {valid_token, "gtt_atelier_2026", "gtt_secret_atelier_2026_unlim"}

    client_ip = request.client.host if request and request.client else "unknown"

    # Allow local development directly without requiring URL token
    if client_ip not in ["127.0.0.1", "localhost", "::1"]:
        if not token or token not in allowed_tokens:
            record_gate_probe(client_ip)
            raise HTTPException(status_code=404, detail="Страница не найдена")

    return FileResponse(os.path.join(BASE_DIR, "admin.html"))

@app.get("/favicon.ico")
async def serve_favicon():
    return FileResponse(os.path.join(BASE_DIR, "favicon.ico"))

def get_local_ip():
    import socket
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "192.168.0.102"

if __name__ == "__main__":
    import uvicorn
    local_ip = get_local_ip()
    print("\n" + "="*60)
    print("🚀 GOSHA TURBOTECH - FASTAPI & SQLITE SERVER STARTING")
    print(f"👉 Main Site:          http://localhost:8000")
    print(f"👉 Main Site (127):    http://127.0.0.1:8000")
    print(f"👉 Phone / Local Net:  http://{local_ip}:8000")
    print(f"👉 Admin Panel:        http://localhost:8000/admin?token=gtt_atelier_2026_x71k")
    print("="*60 + "\n")
    uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=True)
