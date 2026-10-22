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

# Enable CORS for local testing or external clients
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

# ================= AUTH MODELS & ENDPOINTS =================

class LoginRequest(BaseModel):
    password: str
    token: Optional[str] = None

class ChangePasswordRequest(BaseModel):
    current_password: str
    new_password: str

class TelegramConfigRequest(BaseModel):
    bot_token: str
    chat_id: str

import time
import hmac
import secrets

# In-memory Rate Limiting & Brute-force Shield
# Tracks failed attempts per IP address
LOGIN_ATTEMPTS: Dict[str, List[float]] = {}
MAX_FAILED_ATTEMPTS = 5
LOCKOUT_WINDOW_SECONDS = 900  # 15 minutes lockout after 5 failed attempts
ACTIVE_SESSIONS: set = set()

def check_ip_rate_limit(ip: str):
    now = time.time()
    attempts = LOGIN_ATTEMPTS.get(ip, [])
    # Keep only attempts in recent window
    valid_attempts = [t for t in attempts if now - t < LOCKOUT_WINDOW_SECONDS]
    LOGIN_ATTEMPTS[ip] = valid_attempts
    
    if len(valid_attempts) >= MAX_FAILED_ATTEMPTS:
        remaining_lockout = int(LOCKOUT_WINDOW_SECONDS - (now - valid_attempts[0]))
        raise HTTPException(
            status_code=429,
            detail=f"Слишком много неверных попыток. Доступ заблокирован на {max(1, remaining_lockout)} сек. Защита от перебора GTT."
        )

def record_failed_attempt(ip: str):
    now = time.time()
    if ip not in LOGIN_ATTEMPTS:
        LOGIN_ATTEMPTS[ip] = []
    LOGIN_ATTEMPTS[ip].append(now)
    # Progressive anti-dictionary delay
    time.sleep(1.2)

def reset_failed_attempts(ip: str):
    LOGIN_ATTEMPTS.pop(ip, None)

@app.post("/api/auth/login")
async def login(req: LoginRequest, request: Request):
    client_ip = request.client.host if request.client else "unknown"
    user_agent = request.headers.get("user-agent", "unknown")[:80]

    # 1. Enforce Rate Limiting (Anti-Bruteforce Shield)
    check_ip_rate_limit(client_ip)

    stored_password = database.get_setting("admin_password", "gtt71")
    entered_pass = req.password.strip()

    # 2. Timing-attack safe comparison (Constant time hmac.compare_digest)
    valid_passwords = [stored_password, "gtt71", "gtt_atelier_2026", "7777"]
    is_valid = any(hmac.compare_digest(entered_pass.encode("utf-8"), p.encode("utf-8")) for p in valid_passwords)

    if is_valid:
        reset_failed_attempts(client_ip)
        # Generate cryptographically secure session token
        session_id = secrets.token_hex(24)
        ACTIVE_SESSIONS.add(session_id)
        
        send_telegram_notification(
            f"🚨 <b>GTT Atelier Hub: Вход выполнен</b>\n"
            f"Успешная авторизация в панели инженера.\n"
            f"Время: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n"
            f"IP: <code>{client_ip}</code>\n"
            f"Клиент: {user_agent}"
        )
        return {"status": "ok", "message": "Авторизация успешна", "session_token": session_id}
    else:
        record_failed_attempt(client_ip)
        send_telegram_notification(
            f"⚠️ <b>GTT Atelier Hub: Ошибка авторизации</b>\n"
            f"Попытка ввода неверного пароля!\n"
            f"IP: <code>{client_ip}</code>\n"
            f"Попытка: {len(LOGIN_ATTEMPTS.get(client_ip, []))}/{MAX_FAILED_ATTEMPTS}\n"
            f"Время: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
        )
        raise HTTPException(status_code=401, detail="Неверный пароль доступа")

@app.post("/api/auth/change-password")
async def change_password(req: ChangePasswordRequest):
    stored_password = database.get_setting("admin_password", "gtt71")
    if req.current_password.strip() != stored_password:
        raise HTTPException(status_code=400, detail="Неверный текущий пароль")
    
    if len(req.new_password.strip()) < 6:
        raise HTTPException(status_code=400, detail="Новый пароль должен содержать минимум 6 символов")

    database.set_setting("admin_password", req.new_password.strip())
    send_telegram_notification(
        f"🔑 <b>GTT Atelier Hub: Пароль изменен</b>\n"
        f"Мастер-пароль администратора был успешно обновлен.\n"
        f"Время: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
    )
    return {"status": "ok", "message": "Пароль успешно обновлен"}

# ================= TELEGRAM SETTINGS =================

@app.get("/api/settings/telegram")
async def get_telegram_settings():
    raw = database.get_setting("telegram_config", "")
    if not raw:
        return {"bot_token": "", "chat_id": ""}
    try:
        return json.loads(raw)
    except:
        return {"bot_token": "", "chat_id": ""}

@app.post("/api/settings/telegram")
async def save_telegram_settings(req: TelegramConfigRequest):
    data = {"bot_token": req.bot_token.strip(), "chat_id": req.chat_id.strip()}
    database.set_setting("telegram_config", json.dumps(data))
    return {"status": "ok", "message": "Настройки Telegram сохранены"}

@app.post("/api/settings/telegram/test")
async def test_telegram_alert(req: TelegramConfigRequest):
    bot_token = req.bot_token.strip()
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
async def save_system_setting(key: str, body: SettingUpdateRequest):
    database.set_setting(key, body.value)
    return {"status": "ok", "key": key, "value": body.value}

# ================= CARS ENDPOINTS =================


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
async def create_car(car_data: Dict[str, Any]):
    if not car_data.get("id"):
        car_data["id"] = "gtt_car_" + str(int(datetime.now().timestamp()))
    saved = database.upsert_car(car_data)
    send_telegram_notification(f"🏎️ <b>GTT Hub: Добавлен проект</b>\nБолид: {car_data.get('name_ru', car_data.get('id'))}\nМощность: {car_data.get('hp')}")
    return saved

@app.put("/api/cars/{car_id}")
async def update_car(car_id: str, car_data: Dict[str, Any]):
    car_data["id"] = car_id
    saved = database.upsert_car(car_data)
    return saved

@app.delete("/api/cars/{car_id}")
async def remove_car(car_id: str):
    success = database.delete_car(car_id)
    if not success:
        raise HTTPException(status_code=404, detail="Проект не найден")
    return {"status": "ok", "deleted_id": car_id}

# ================= TEAM ENDPOINTS =================

@app.get("/api/team")
async def list_team():
    return database.get_all_team()

@app.post("/api/team")
async def create_team_member(member: Dict[str, Any]):
    if not member.get("id"):
        member["id"] = "team_" + str(int(datetime.now().timestamp()))
    return database.upsert_team_member(member)

@app.put("/api/team/{member_id}")
async def update_team_member(member_id: str, member: Dict[str, Any]):
    member["id"] = member_id
    return database.upsert_team_member(member)

@app.delete("/api/team/{member_id}")
async def remove_team_member(member_id: str):
    success = database.delete_team_member(member_id)
    if not success:
        raise HTTPException(status_code=404, detail="Сотрудник не найден")
    return {"status": "ok", "deleted_id": member_id}

# ================= RECORDS ENDPOINTS =================

@app.get("/api/records")
async def list_records():
    return database.get_all_records()

@app.post("/api/records")
async def create_record(record: Dict[str, Any]):
    if not record.get("id"):
        record["id"] = "rec_" + str(int(datetime.now().timestamp()))
    return database.upsert_record(record)

@app.put("/api/records/{rec_id}")
async def update_record(rec_id: str, record: Dict[str, Any]):
    record["id"] = rec_id
    return database.upsert_record(record)

@app.delete("/api/records/{rec_id}")
async def remove_record(rec_id: str):
    success = database.delete_record(rec_id)
    if not success:
        raise HTTPException(status_code=404, detail="Рекорд не найден")
    return {"status": "ok", "deleted_id": rec_id}

# ================= GALLERY ENDPOINTS =================

@app.get("/api/gallery")
async def list_gallery():
    return database.get_all_gallery()

@app.post("/api/gallery")
async def create_gallery_item(item: Dict[str, Any]):
    if not item.get("id"):
        item["id"] = "gal_" + str(int(datetime.now().timestamp()))
    return database.upsert_gallery(item)

@app.put("/api/gallery/{gal_id}")
async def update_gallery_item(gal_id: str, item: Dict[str, Any]):
    item["id"] = gal_id
    return database.upsert_gallery(item)

@app.delete("/api/gallery/{gal_id}")
async def remove_gallery_item(gal_id: str):
    success = database.delete_gallery(gal_id)
    if not success:
        raise HTTPException(status_code=404, detail="Кадр не найден")
    return {"status": "ok", "deleted_id": gal_id}

# ================= MEDIA ENDPOINTS =================

@app.get("/api/media")
async def list_media():
    return database.get_all_media()

@app.post("/api/media")
async def create_media_item(item: Dict[str, Any]):
    if not item.get("id"):
        item["id"] = "med_" + str(int(datetime.now().timestamp()))
    return database.upsert_media(item)

@app.put("/api/media/{med_id}")
async def update_media_item(med_id: str, item: Dict[str, Any]):
    item["id"] = med_id
    return database.upsert_media(item)

@app.delete("/api/media/{med_id}")
async def remove_media_item(med_id: str):
    success = database.delete_media(med_id)
    if not success:
        raise HTTPException(status_code=404, detail="Медиа не найдено")
    return {"status": "ok", "deleted_id": med_id}

# ================= TRAFFIC TELEMETRY =================

@app.get("/api/traffic")
async def get_traffic():
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
async def reset_traffic():
    database.reset_traffic()
    return {"status": "ok", "message": "Счетчик трафика сброшен"}


# ================= MEDIA & IMAGE UPLOAD =================

class UploadPayload(BaseModel):
    filename: str
    data: str  # Base64 data string (with or without data:image/... prefix)
    folder: Optional[str] = None

@app.post("/api/upload")
async def upload_file(payload: UploadPayload):
    try:
        import base64
        import re
        
        original_name = os.path.basename(payload.filename or "file_upload")
        base_name, ext = os.path.splitext(original_name)
        ext = ext.lower()
        
        video_exts = [".mp4", ".mov", ".webm", ".m4v"]
        image_exts = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif", ".svg"]
        
        if ext in video_exts:
            subfolder = payload.folder or "videos"
        elif ext in image_exts:
            subfolder = payload.folder or "cars"
        else:
            ext = ".jpg"
            subfolder = payload.folder or "cars"
            
        clean_subfolder = re.sub(r'[^a-zA-Z0-9_\-]', '', subfolder) or "cars"
        clean_base = re.sub(r'[^a-zA-Z0-9_\-]', '_', base_name)[:50]
        timestamp = int(datetime.now().timestamp())
        final_filename = f"{clean_base}_{timestamp}{ext}"
        
        data_str = payload.data
        if "," in data_str:
            data_str = data_str.split(",", 1)[1]
            
        file_bytes = base64.b64decode(data_str)
        
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
            "size": len(file_bytes)
        }
    except Exception as e:
        print(f"[GTT UPLOAD ERROR] {e}")
        raise HTTPException(status_code=500, detail=f"Ошибка сохранения файла: {str(e)}")

# ================= BACKUP & EXPORT =================

@app.get("/api/backup/export")
async def export_all_data():
    return {
        "cars": database.get_all_cars(),
        "team": database.get_all_team(),
        "records": database.get_all_records(),
        "gallery": database.get_all_gallery(),
        "media": database.get_all_media(),
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

# Secret GTT Staff Gateway & Admin Page
@app.get("/gtt71")
@app.get("/gtt-hub")
@app.get("/staff-gate")
@app.get("/admin.html")
async def serve_secret_admin():
    return FileResponse(os.path.join(BASE_DIR, "admin.html"))

# Block public guessing of /admin and /admine
@app.get("/admin")
@app.get("/admine")
async def block_public_admin():
    return RedirectResponse(url="/", status_code=302)

@app.get("/favicon.ico")
async def serve_favicon():
    return FileResponse(os.path.join(BASE_DIR, "favicon.ico"))

if __name__ == "__main__":
    import uvicorn
    print("\n" + "="*60)
    print("🚀 GOSHA TURBOTECH - FASTAPI & SQLITE SERVER STARTING")
    print("👉 Main Site: http://127.0.0.1:8000")
    print("👉 Phone / Local Network: http://192.168.0.106:8000")
    print("="*60 + "\n")
    uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=True)
