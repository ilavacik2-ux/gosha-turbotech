"""
GoshaTurboTech (GTT) - SQLite Database Engine
Direct SQLite3 persistence for Cars, Team, Records, Gallery, Media, Settings,
PBKDF2 Auth, Gateway Tokens, Rate Limiting and Sessions.
Zero third-party vendor lock-in. 100% autonomous.
"""

import sqlite3
import json
import os
import time
import hmac
import hashlib
import secrets
from contextlib import contextmanager
from typing import List, Dict, Any, Optional, Tuple

DB_PATH = os.path.join(os.path.dirname(__file__), "gtt_database.db")


def get_connection():
    conn = sqlite3.connect(DB_PATH, check_same_thread=False, timeout=15.0)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL;")
    conn.execute("PRAGMA synchronous=NORMAL;")
    conn.execute("PRAGMA temp_store=MEMORY;")
    conn.execute("PRAGMA cache_size=-64000;") # 64MB cache
    return conn


@contextmanager
def get_db():
    conn = get_connection()
    try:
        yield conn
    finally:
        conn.close()


# ==============================================================================
# CRYPTO & PASSWORD HASHING UTILITIES (PBKDF2-HMAC-SHA256)
# ==============================================================================

def hash_password(password: str, iterations: int = 310000) -> str:
    salt = secrets.token_bytes(16)
    dk = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, iterations)
    return f"pbkdf2_sha256${iterations}${salt.hex()}${dk.hex()}"


def verify_password(password: str, stored_hash: str) -> bool:
    try:
        parts = stored_hash.split("$")
        if len(parts) != 4 or parts[0] != "pbkdf2_sha256":
            return False
        iterations = int(parts[1])
        salt = bytes.fromhex(parts[2])
        expected_dk = bytes.fromhex(parts[3])
        actual_dk = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, iterations)
        return hmac.compare_digest(actual_dk, expected_dk)
    except Exception:
        return False


def hash_token(raw_token: str) -> str:
    return hashlib.sha256(raw_token.encode("utf-8")).hexdigest()


def init_db():
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("PRAGMA journal_mode=WAL;")
        cursor.execute("PRAGMA synchronous=NORMAL;")

 # 1. Cars Table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS cars (
            id TEXT PRIMARY KEY,
            brand TEXT NOT NULL,
            type TEXT NOT NULL,
            name_ru TEXT NOT NULL,
            name_en TEXT,
            tag_ru TEXT,
            tag_en TEXT,
            hp TEXT NOT NULL,
            quarter_mile TEXT,
            top_speed TEXT,
            badge_ru TEXT,
            badge_en TEXT,
            img TEXT NOT NULL,
            fallback_img TEXT,
            is_photo INTEGER DEFAULT 1,
            object_position TEXT DEFAULT 'center center',
            video_src TEXT,
            video_title TEXT,
            desc_ru TEXT,
            desc_en TEXT,
            specs_json TEXT,
            sort_order INTEGER DEFAULT 0,
            is_featured INTEGER DEFAULT 0,
            category TEXT DEFAULT 'race',
            is_published INTEGER DEFAULT 1,
            completeness INTEGER DEFAULT 100
        )
        """)
        for col, col_def in [
            ("is_featured", "INTEGER DEFAULT 0"),
            ("category", "TEXT DEFAULT 'race'"),
            ("is_published", "INTEGER DEFAULT 1"),
            ("completeness", "INTEGER DEFAULT 100")
        ]:
            try:
                cursor.execute(f"ALTER TABLE cars ADD COLUMN {col} {col_def}")
            except Exception:
                pass

 # 2. Team Table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS team (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            role TEXT NOT NULL,
            status TEXT NOT NULL,
            photo TEXT,
            social TEXT,
            sort_order INTEGER DEFAULT 0,
            name_en TEXT DEFAULT '',
            role_en TEXT DEFAULT '',
            dept TEXT DEFAULT '',
            object_position TEXT DEFAULT 'center 20%'
        )
        """)
        for col in ["photo", "social", "name_en", "role_en", "dept", "object_position"]:
            try:
                cursor.execute(f"ALTER TABLE team ADD COLUMN {col} TEXT")
            except Exception:
                pass

 # 3. Records Table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS records (
            id TEXT PRIMARY KEY,
            year TEXT NOT NULL,
            car TEXT NOT NULL,
            telemetry TEXT NOT NULL,
            desc TEXT NOT NULL,
            img TEXT,
            sort_order INTEGER DEFAULT 0
        )
        """)
        for col in ["img", "object_position"]:
            try:
                cursor.execute(f"ALTER TABLE records ADD COLUMN {col} TEXT")
            except Exception:
                pass

 # 4. Gallery Table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS gallery (
            id TEXT PRIMARY KEY,
            tag TEXT NOT NULL,
            title TEXT NOT NULL,
            img TEXT NOT NULL,
            sort_order INTEGER DEFAULT 0
        )
        """)
        for col in ["object_position"]:
            try:
                cursor.execute(f"ALTER TABLE gallery ADD COLUMN {col} TEXT")
            except Exception:
                pass

 # 5. Media Table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS media (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            type TEXT NOT NULL,
            url TEXT NOT NULL,
            car TEXT NOT NULL,
            sort_order INTEGER DEFAULT 0
        )
        """)

 # 6. Settings Table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS settings (
            key TEXT PRIMARY KEY,
            value TEXT NOT NULL
        )
        """)

 # 7. Traffic Analytics Log
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS traffic_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            device TEXT,
            source TEXT,
            page TEXT,
            is_new_session INTEGER DEFAULT 1,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        """)

 # 8. Persistent Admin Sessions (stores token SHA-256 hash)
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS admin_sessions (
            token TEXT PRIMARY KEY,
            username TEXT NOT NULL,
            expires_at REAL NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        """)

 # 9. Rate Limits (persistent multi-worker anti-bruteforce)
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS rate_limits (
            key TEXT PRIMARY KEY,
            fails INTEGER DEFAULT 0,
            lockout_until REAL DEFAULT 0,
            updated_at REAL DEFAULT 0
        )
        """)

 # 10. Partners Table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS partners (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            desc TEXT,
            logo TEXT,
            link TEXT,
            sort_order INTEGER DEFAULT 0,
            is_active INTEGER DEFAULT 1
        )
        """)

 # 11. Moto Division Table (Superbikes)
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS moto (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            code TEXT NOT NULL,
            desc TEXT,
            bullets TEXT,
            img TEXT,
            sort_order INTEGER DEFAULT 0,
            is_active INTEGER DEFAULT 1,
            object_position TEXT DEFAULT 'center 50%'
        )
        """)
        for col in ["object_position"]:
            try:
                cursor.execute(f"ALTER TABLE moto ADD COLUMN {col} TEXT")
            except Exception:
                pass

        conn.commit()

 # Seed default data if cars table is empty
        cursor.execute("SELECT COUNT(*) FROM cars")
        if cursor.fetchone()[0] == 0:
            seed_initial_data(cursor)
            conn.commit()

 # Seed default partners ONLY if table is empty (preserve admin edits across restarts)
        cursor.execute("SELECT COUNT(*) FROM partners")
        if cursor.fetchone()[0] == 0:
            seed_default_partners(cursor)
            conn.commit()

 # Seed default moto if table is empty
        cursor.execute("SELECT COUNT(*) FROM moto")
        if cursor.fetchone()[0] == 0:
            seed_default_moto(cursor)
            conn.commit()

 # Security migration: remove legacy weak plaintext admin_password / secret_url_token
        legacy_weak = {"gtt71", "gtt", "71", "admin", "gtt_atelier_2026", "gtt_master_password_2026!", ""}
        cursor.execute("SELECT value FROM settings WHERE key = 'admin_password_hash'")
        has_hash = cursor.fetchone()
        if not has_hash:
            env_pass = os.environ.get("GTT_ADMIN_PASSWORD", "").strip()
            cursor.execute("SELECT value FROM settings WHERE key = 'admin_password'")
            legacy_row = cursor.fetchone()
            legacy_pass = (legacy_row[0] or "").strip() if legacy_row else ""
            if env_pass and not env_pass.startswith("CHANGE_ME") and env_pass not in legacy_weak:
                chosen_pass = env_pass
            elif legacy_pass and legacy_pass not in legacy_weak and len(legacy_pass) >= 8:
                chosen_pass = legacy_pass
            else:
                chosen_pass = "GTT!" + secrets.token_urlsafe(12)
            cursor.execute(
                "INSERT OR IGNORE INTO settings (key, value) VALUES ('admin_password_hash', ?)",
                (hash_password(chosen_pass),),
            )
        cursor.execute("DELETE FROM settings WHERE key IN ('admin_password', 'secret_url_token')")
        cursor.execute("DELETE FROM settings WHERE key IN ('telegram_config', 'telegram')")

 # Seed gateway token if missing
        env_gate = os.environ.get("GTT_GATEWAY_TOKEN", "").strip()
        legacy_gates = {"", "gtt_atelier_2026", "gtt_atelier_2026_x71k", "gtt_secret_atelier_2026_unlim"}
        configured_gate = len(env_gate) >= 12 and not env_gate.startswith("CHANGE_ME") and env_gate not in legacy_gates
        cursor.execute("SELECT value FROM settings WHERE key = 'gateway_token_db_v2'")
        if not cursor.fetchone():
            if configured_gate:
                cursor.execute("INSERT OR REPLACE INTO settings (key, value) VALUES ('gateway_token', ?)", (env_gate,))
            cursor.execute("INSERT INTO settings (key, value) VALUES ('gateway_token_db_v2', '1')")
        cursor.execute(
            "INSERT OR IGNORE INTO settings (key, value) VALUES ('gateway_token', ?)",
            ("gtt_" + secrets.token_urlsafe(24),),
        )

 # Purge legacy unhashed sessions (64-char hex raw tokens from before hashing migration)
 # Keep only hashed sessions or clean stale ones on first upgrade
        cursor.execute("SELECT value FROM settings WHERE key = 'sessions_hashed_v1'")
        if not cursor.fetchone():
            cursor.execute("DELETE FROM admin_sessions")
            cursor.execute("INSERT OR IGNORE INTO settings (key, value) VALUES ('sessions_hashed_v1', '1')")

        conn.commit()


def seed_initial_data(cursor):
    default_projects = [       {       'badge_en': 'White Record GT-R #300',
                'badge_ru': 'Белый Рекордный GT-R #300',
                'brand': 'NISSAN & DRACO',
                'desc_en': 'Legendary white flagship of the RDRC drag strip piloted by Ruslan Arefyev (race car #300). '
                           'Official verified time 7.694 sec at 304.44 km/h on the 1/4 mile (RDRC Stage 5, pass #537) '
                           'and 323.88 km/h on the 1/2 mile.',
                'desc_ru': 'Легендарный белый флагман дрэг-стрипа RDRC под управлением Руслана Арефьева (борт №300). '
                           'Официальное время 7.694 сек со скоростью 304.44 км/ч на 1/4 мили (RDRC этап 5, заезд №537) '
                           'и 323.88 км/ч на 1/2 мили. Специально построенное трубчатое шасси и свыше 3000 л.с.',
                'fallback_img': 'assets/cars/gtr_draco_wrap_detail.jpg',
                'hp': '3,000+ HP',
                'id': 'draco_promod',
                'img': 'assets/cars/gtr_draco_promod_front.jpg',
                'name_en': 'GT-R R35 DRACO GTT #300',
                'name_ru': 'GT-R R35 DRACO GTT #300',
                'object_position': 'center 64%',
                'quarter_mile': '7.694 сек',
                'sort_order': 1,
                'specs': {       'chassis': 'Full Chrome-Moly Tube Chassis & Carbon Body',
                                 'ecu': 'Motec M150 Standalone Pro Drag System',
                                 'engine': '4.3L Billet VR38 Race Block GTT / Draco Spec',
                                 'fuel': 'Methanol M1 Injected + Dual Billet Fuel Rails',
                                 'turbos': 'Dual Precision 88mm Pro-Mod Turbochargers'},
                'tag_en': 'RDRC RECORD 7.694 SEC • PILOT R. AREFYEV #300',
                'tag_ru': 'РЕКОРД RDRC 7.694 СЕК • ПИЛОТ Р. АРЕФЬЕВ #300',
                'top_speed': '304.44 км/ч',
                'type': 'gtr',
                'video_src': 'assets/videos/draco_gtr_action.mp4',
                'video_title': 'Nissan GT-R Draco 3000+ HP — боевой рекордный заезд RDRC'},
        {       'badge_en': 'Russia Audi Record 7.877s',
                'badge_ru': 'Рекорд России для Audi 7.877s',
                'brand': 'AUDI & GTT',
                'desc_en': 'Competition Audi R8 «ROKOT» by GoshaTurboTech piloted by Eduard Sarkisyan and Ruslan '
                           'Arefyev. Absolute Russian National Record for Audi on the 1/4 mile (7.877 sec). The first '
                           'and only Audi in Russia to conquer the 7-second barrier!',
                'desc_ru': 'Боевая Audi R8 «ROKOT» от GoshaTurboTech под управлением Эдуарда Саркисяна и Руслана '
                           'Арефьева. Абсолютный национальный рекорд России для марки Audi на 1/4 мили (7.877 сек). '
                           'Первый и единственный автомобиль марки Audi в стране, выехавший из 8 секунд!',
                'fallback_img': 'assets/archive_tilda/audi_r8_tonystark.png',
                'hp': '1,600+ HP',
                'id': 'r8_rokot',
                'img': 'assets/cars/audi_r8_tsmr_launch.jpg',
                'name_en': 'AUDI R8 V10 PLUS TWIN TURBO «ROKOT» GTT',
                'name_ru': 'AUDI R8 V10 PLUS TWIN TURBO «ROKOT» GTT',
                'object_position': 'center 75%',
                'quarter_mile': '7.877 сек',
                'sort_order': 2,
                'specs': {       'clutch': 'GTT Upgraded Billet 9-Plate Dual Clutch',
                                 'cooling': 'CSF Triple Billet Heat Exchangers',
                                 'ecu': 'Syvecs S12 Standalone Motorsport Setup',
                                 'engine': '5.2L FSI V10 Twin Turbo Mid-Engine GTT Stage 3',
                                 'turbos': 'Mirror Twin Turbo Kit with Air-to-Water Intercooling'},
                'tag_en': 'RUSSIAN RECORD FOR AUDI • 7.877 SEC',
                'tag_ru': 'РЕКОРД РОССИИ ДЛЯ AUDI • 7.877 СЕК',
                'top_speed': '288.35 км/ч',
                'type': 'audi',
                'video_src': 'assets/videos/r8_rokot_action.mp4',
                'video_title': 'AUDI R8 V10 PLUS TWIN TURBO «ROKOT» GTT'},
        {       'badge_en': 'Race 1000 Europe Record',
                'badge_ru': 'Рекорд Европы 353 км/ч',
                'brand': 'LAMBORGHINI & GTT',
                'desc_en': 'Iconic European champion of Race 1000 in Germany and RDRC superstar. Official European '
                           'record with 353.02 km/h on 804m distance and 8.054 sec best 1/4 mile. Built and tuned by '
                           'GoshaTurboTech.',
                'desc_ru': 'Культовый европейский триумфатор Race 1000 в Германии и звезда RDRC. Официальный рекорд '
                           'Европы со скоростью 353.02 км/ч на дистанции 804 метра и лучший квотер 8.054 сек. Построен '
                           'и настроен в ателье GoshaTurboTech.',
                'fallback_img': 'assets/archive_tilda/huracan_bezzubik.webp',
                'hp': '1,500+ HP',
                'id': 'bezzubik',
                'img': 'assets/archive_tilda/huracan_bezzubik.webp',
                'name_en': 'HURACAN TWIN TURBO GTT-BEZZUBIK',
                'name_ru': 'HURACAN TWIN TURBO GTT-BEZZUBIK',
                'object_position': 'center 65%',
                'quarter_mile': '8.054 сек',
                'sort_order': 3,
                'specs': {       'ecu': 'Syvecs Dual-CAN Motorsport Management',
                                 'engine': '5.2L V10 FSI Twin Turbo GTT Stage 3',
                                 'exhaust': 'GTT Inconel Custom Straight System',
                                 'fuel': '100 RON Daily / Ethanol E85 Race Map',
                                 'turbos': 'Precision Dual Mirror V-Band Turbos'},
                'tag_en': 'EUROPE RECORD 353 KM/H • RACE 1000',
                'tag_ru': 'РЕКОРД ЕВРОПЫ 353 КМ/Ч • RACE 1000',
                'top_speed': '283.46 км/ч',
                'type': 'lambo',
                'video_src': '',
                'video_title': ''},
        {       'badge_en': 'Track-Day Record 7.766s',
                'badge_ru': 'Рекорд трек-дня 7.766s',
                'brand': 'NISSAN & GTT',
                'desc_en': 'Mythical Kurdalagon GT-R named after the ancient blacksmith deity. Set a brand new '
                           'personal best of 7.766 sec at 300.00 km/h on October 26, 2026 at Bykovo Drag Track.',
                'desc_ru': 'Боевой болид Nissan GT-R R35 «Kurdalagon» — имя древнего осетинского бога-кузнеца. 26 '
                           'октября 2026 года на трек-дне в Быково установил новый личный рекорд команды: 7.766 сек на '
                           '402 метра со скоростью на выходе 300.00 км/ч.',
                'fallback_img': 'assets/cars/gtr_kurdalagon_white.jpg',
                'hp': '1,650+ HP',
                'id': 'gtr_kurdalagon',
                'img': 'assets/cars/gtr_kurdalagon_white.jpg',
                'name_en': 'GT-R R35 GTT «KURDALAGON»',
                'name_ru': 'GT-R R35 GTT «KURDALAGON»',
                'object_position': 'center 65%',
                'quarter_mile': '7.766 сек',
                'sort_order': 4,
                'specs': {       'chassis': 'Drag Parachute & Weld Racing Beadlocks',
                                 'ecu': 'Motec M150 Standalone Drag Management',
                                 'engine': '4.1L Billet VR38 Race Assembly GTT Spec',
                                 'fuel': 'VP Racing Ethanol M5',
                                 'turbos': 'Dual Precision 7275 Billet Gen2'},
                'tag_en': 'BYKOVO RECORD 26.10.2026 • 7.766 SEC',
                'tag_ru': 'РЕКОРД БЫКОВО 26.10.2026 • 7.766 СЕК',
                'top_speed': '300.00 км/ч',
                'type': 'gtr',
                'video_src': 'assets/videos/gtr_kurdalagon_action.mp4',
                'video_title': 'GT-R R35 GTT «KURDALAGON»'},
        {       'badge_en': 'RDRC 992 Record • 9.167s',
                'badge_ru': 'Рекорд RDRC 992 • 9.167s',
                'brand': 'PORSCHE & GTT',
                'desc_en': 'Official RDRC record holder among Porsche 992 generation piloted by Maria Kutychkina. '
                           'Verified time 9.167 sec at 236.92 km/h on 1/4 mile (RDRC 2025, pass 528). Custom GTT'
                           'intercoolers and direct port methanol injection.',
                'desc_ru': 'Официальный рекордсмен RDRC среди Porsche поколения 992 под управлением Марии Кутычкиной. '
                           'Подтвержденное время 9.167 сек со скоростью 236.92 км/ч на 1/4 мили (RDRC 2025, заезд '
                           '528). Кастомный интеркулер GTT и метаноловый впрыск.',
                'fallback_img': 'assets/cars/gtr_rdrc_red_panamera.jpg',
                'hp': '1,050+ HP',
                'id': 'porsche_911_imba',
                'img': 'assets/cars/porsche_992_imba_silver.jpg',
                'name_en': 'PORSCHE 911 TURBO S (992) GTT-IMBA',
                'name_ru': 'PORSCHE 911 TURBO S (992) GTT-IMBA',
                'object_position': 'center 64%',
                'quarter_mile': '9.167 сек',
                'sort_order': 5,
                'specs': {       'ecu': 'Syvecs S7 Plus Standalone Porsche Kit',
                                 'engine': '3.8L Twin-Turbo Boxer-6 GTT Spec',
                                 'fuel': '100 RON + Methanol Injection',
                                 'turbos': 'GTT Billet High-Flow Turbos'},
                'tag_en': 'RDRC 992 RECORD • 9.167 SEC • M. KUTYCHKINA',
                'tag_ru': 'РЕКОРД RDRC 992 • 9.167 СЕК • М. КУТЫЧКИНА',
                'top_speed': '236.92 км/ч',
                'type': 'porsche',
                'video_src': 'assets/videos/dodge_srt_pass.mp4',
                'video_title': 'Porsche 911 Turbo S IMBA — заезд RDRC 9.167 сек'},
        {       'badge_en': 'Gosha Fire Drag Weapon #71',
                'badge_ru': 'Боевой Огненный Болид Гоши #71',
                'brand': 'NISSAN & GTT',
                'desc_en': 'Victorious hellfire-liveried race weapon piloted by Gosha Pertskheliya himself (race car '
                           '#71). Built in the GoshaTurboTech skunkworks — champion and winner of Russian Drag Racing '
                           'Championship (RDRC) finals.',
                'desc_ru': 'Победоносный огненный болид Гоши Перцхелия, борт №71. Личный драг-монстр в культовой '
                           'ливрее адского пламени — триумфатор и победитель чемпионата России RDRC (лучшее время '
                           '8.400 сек / 1/2 мили 13.690 с / 343.67 км/ч).',
                'fallback_img': 'assets/cars/gtr_lucifer_full.jpg',
                'hp': '1,850+ HP',
                'id': 'gtr_lucifer',
                'img': 'assets/cars/gtr_lucifer_solo.jpg',
                'name_en': 'GT-R R35 «LUCIFER» GTT #71',
                'name_ru': 'GT-R R35 «LUCIFER» GTT #71',
                'object_position': 'center 46%',
                'quarter_mile': '8.400 сек',
                'sort_order': 6,
                'specs': {       'chassis': 'Full Drag Suspension, Parachute System & Weld Beadlocks',
                                 'ecu': 'Motec M150 Drag AWD Management + GTT Flame Map',
                                 'engine': '4.1L Billet Stroker VR38DETT GTT Race Spec',
                                 'fuel': 'VP Racing Ethanol M5 / Dual In-Tank 1700cc Injection',
                                 'turbos': 'Dual Precision 7675 Gen2 Pro Mod Billet Turbos'},
                'tag_en': 'RDRC CHAMPION • PILOT GOSHA PERTSKHELIYA #71',
                'tag_ru': 'ЧЕМПИОН RDRC • ПИЛОТ ГОША ПЕРЦХЕЛИЯ #71',
                'top_speed': '262.00 км/ч',
                'type': 'gtr',
                'video_src': 'assets/videos/gosha_na_svoem_lucifer_web.mp4',
                'video_title': 'Гоша на своей // GT-R Lucifer RDRC'},
        {       'badge_en': 'GoshaTurboTech Race BMW G90',
                'badge_ru': 'Боевая BMW G90 Гоши Турботех',
                'brand': 'BMW M-POWER',
                'desc_en': 'Competition BMW M5 G90 built by GoshaTurboTech competing in RDRC. M xDrive AWD system, '
                           'custom GTT hybrid billet turbos, and reinforced engine internals.',
                'desc_ru': 'Заряженная боевая BMW M5 поколения G90 от GoshaTurboTech, выступающая в чемпионате России '
                           'по дрэг-рейсингу RDRC. Полный привод M xDrive, гибридные турбины GTT и усиленная поршневая '
                           'группа.',
                'fallback_img': 'assets/cars/bmw_m5_paddock_front.jpg',
                'hp': '1,050+ HP',
                'id': 'bmw_m5',
                'img': 'assets/cars/bmw_m5_rdrc_race.jpg',
                'name_en': 'BMW M5 G90 COMPETITION GTT-STAGE 3',
                'name_ru': 'BMW M5 G90 COMPETITION GTT-STAGE 3',
                'object_position': 'center 54%',
                'quarter_mile': '10.212 сек',
                'sort_order': 7,
                'specs': {       'ecu': 'GTT Custom Dual ECU & 8HP Transmission Flash',
                                 'engine': '4.4L V8 TwinPower Turbo Hybrid Powertrain GTT Spec',
                                 'exhaust': 'Inconel Catless Downpipes + Full Titanium System',
                                 'fuel': '100 RON + Methanol Direct Port Injected',
                                 'turbos': 'GTT Custom Billet Hybrid Turbos'},
                'tag_en': 'RDRC DRAG WEAPON • GTT G90 BULLET',
                'tag_ru': 'RDRC ДРЭГ-КИЛЛЕР • БОЛИД GTT G90',
                'top_speed': '224.37 км/ч',
                'type': 'bmw',
                'video_src': 'assets/videos/r8_acceleration.mp4',
                'video_title': 'BMW M5 G90 Competition GTT — боевой разгон'},
        {'badge_en': 'SRT Demon 1200+ HP',
         'badge_ru': 'SRT Demon 1200+ HP',
         'brand': 'DODGE SRT',
         'desc_en': 'Dodge Challenger SRT Demon.',
         'desc_ru': 'Dodge Challenger SRT Demon.',
         'fallback_img': 'assets/cars/challenger_srt_gtt.jpg',
         'hp': '1,200+ HP',
         'id': 'dodge_demon',
         'img': 'assets/cars/dodge_burnout_sunset.jpg',
         'name_en': 'DODGE CHALLENGER SRT DEMON GTT',
         'name_ru': 'DODGE CHALLENGER SRT DEMON GTT',
         'object_position': 'center 70%',
         'quarter_mile': '9.891 сек',
         'sort_order': 8,
         'specs': {'blower': 'Whipple 3.8L Gen 5 Supercharger Kit',
                   'driveshaft': 'QA1 Carbon Fiber Driveshaft + GTT 9-inch Rear End',
                   'engine': '6.2L Supercharged HEMI V8 Built by GTT',
                   'fuel': 'Triple Fore Innovations Fuel Pumps + 1700cc Injectors',
                   'tires': 'Mickey Thompson ET Street R Drag Radials'},
         'tag_en': '',
         'tag_ru': '',
         'top_speed': '231.36 км/ч',
         'type': 'other',
         'video_src': 'assets/videos/dodge_challenger_action.mp4',
         'video_title': 'Dodge Challenger SRT Demon GTT — дымный бернаут RDRC'},
        {       'badge_en': 'Demon 170 Crate',
                'badge_ru': 'Demon 170 Crate',
                'brand': 'DODGE SRT',
                'desc_en': 'The pinnacle of the HEMI era — Demon 170. Flex-fuel ethanol auto-tuning, reinforced '
                           'drivetrain and wheelie-popping launches on VHT prepped tracks.',
                'desc_ru': 'Финальный коллекционный шедевр эпохи HEMI — Demon 170. Калибровка датчиков этанола '
                           'flex-fuel, усиленный карданный вал и разгон с отрывом передних колес от стрипа.',
                'fallback_img': 'assets/cars/dodge_srt_front.jpg',
                'hp': '1,025+ HP',
                'id': 'dodge_demon_170',
                'img': 'assets/cars/challenger_burnout_close.jpg',
                'name_en': 'DODGE CHALLENGER SRT DEMON 170 GTT',
                'name_ru': 'DODGE CHALLENGER SRT DEMON 170 GTT',
                'object_position': 'center center',
                'quarter_mile': '9.150 сек',
                'sort_order': 9,
                'specs': {       'blower': '3.0L High-Helix Whipple Supercharger',
                                 'chassis': 'Transbrake Pro Drag Launch System',
                                 'engine': '6.2L Supercharged D170 HEMI Crate Engine',
                                 'fuel': 'Ethanol E85 Flex Fuel Auto-Calibration'},
                'tag_en': 'FACTORY WHEELIE DRAG MONSTER • 1025 HP',
                'tag_ru': 'ЗАВОДСКОЙ ВЫХОД НА ВИЛЛИ • 1025 HP',
                'top_speed': '335+ км/ч',
                'type': 'other',
                'video_src': '',
                'video_title': ''},
        {       'badge_en': 'R8 «ZlayaZaya» GTT',
                'badge_ru': 'R8 «Злая Зая» GTT',
                'brand': 'AUDI & GTT',
                'desc_en': 'Renowned Audi R8 ZlayaZaya piloted by Ruslan Arefyev (#6303). RDRC podium finisher with '
                           'custom twin turbo package and relentless quattro AWD launches.',
                'desc_ru': 'Культовая Audi R8 «Злая Зая» Руслана Арефьева (борт №6303). Призер этапов чемпионата RDRC, '
                           'стабильный запуск на полном приводе quattro и двухтурбинный пакет GTT.',
                'fallback_img': 'assets/archive_tilda/audi_r8_tonystark.png',
                'hp': '1,200+ HP',
                'id': 'audi_zlayazaya',
                'img': 'assets/cars/audi_r8_zlayazaya_launch.jpg',
                'name_en': 'AUDI R8 V10 PLUS TWIN TURBO «ZLAYAZAYA»',
                'name_ru': 'AUDI R8 V10 PLUS TWIN TURBO «ZLAYAZAYA»',
                'object_position': 'center 70%',
                'quarter_mile': '9.048 сек',
                'sort_order': 10,
                'specs': {       'ecu': 'Syvecs Powertrain Management',
                                 'engine': '5.2L V10 FSI Reinforced Internals GTT',
                                 'fuel': 'Direct Port Fuel Injected 100 RON',
                                 'turbos': 'Dual Mirror Precision Turbos'},
                'tag_en': 'RDRC WEAPON • PILOT R. AREFYEV',
                'tag_ru': 'RDRC БОЕВОЙ БОЛИД • ПИЛОТ Р. АРЕФЬЕВ',
                'top_speed': '237.39 км/ч',
                'type': 'audi',
                'video_src': 'assets/videos/r8_launch_action.mp4',
                'video_title': 'Audi R8 «Злая Зая» — боевой выезд RDRC'},
        {       'badge_en': 'Legendary «Zelenka» GTT',
                'badge_ru': 'Легендарная «Зеленка» GTT',
                'brand': 'LAMBORGHINI',
                'desc_en': 'The legendary acid-green Lamborghini Huracan Twin Turbo «Zelenka» — racing icon of the '
                           'RDRC paddock. Built by GoshaTurboTech with custom mirror turbos, rear beadlock drag wheels '
                           'and low 8-second passes.',
                'desc_ru': 'Знаменитая ядовито-зеленая Lamborghini Huracan Twin Turbo «Зеленка» — легенда паддока RDRC '
                           'и уличных дуэлей. Кастомный твин-турбо кит от GoshaTurboTech, задние бедлоки и выстрел за '
                           '8 секунд (1/2 мили 14.041 с / 327.86 км/ч).',
                'fallback_img': 'assets/cars/huracan_green_grey_rdrc.jpg',
                'hp': '1,500+ HP',
                'id': 'zelenka',
                'img': 'assets/photos/huracan_zelenka_gtt.jpg',
                'name_en': 'HURACAN TWIN TURBO «ZELENKA» GTT',
                'name_ru': 'HURACAN TWIN TURBO «ЗЕЛЕНКА» GTT',
                'object_position': 'center 45%',
                'quarter_mile': '8.373 сек',
                'sort_order': 11,
                'specs': {       'engine': '5.2L V10 FSI GTT Built Engine',
                                 'fuel': 'Dual Billet Fuel Rails + 100 RON / E85 Maps',
                                 'trans': 'GTT Upgraded Billet Dual Clutch 10-Plate',
                                 'turbos': 'Precision Mirror Dual Ball-Bearing Turbos',
                                 'wheels': 'Weld Racing Rear Beadlocks with Mickey Thompson ET'},
                'tag_en': 'CULT 1500+ HP RDRC CHAMPIONSHIP BULLET',
                'tag_ru': 'КУЛЬТОВЫЙ 1500+ СИЛЬНЫЙ БОЛИД RDRC',
                'top_speed': '275.26 км/ч',
                'type': 'lambo',
                'video_src': 'assets/videos/r8_launch_action.mp4',
                'video_title': 'Lamborghini Huracan Twin Turbo «Зеленка» GTT — боевой заезд RDRC'},
        {       'badge_en': 'GTT-MAXPAIN Performante',
                'badge_ru': 'GTT-MAXPAIN Performante',
                'brand': 'LAMBORGHINI & GTT',
                'desc_en': 'Forged Composites masterpiece Lamborghini Huracan Performante empowered by bespoke GTT'
                           '1600+ HP twin turbo system and calibrated ALA active aero.',
                'desc_ru': 'Безупречный Huracan Performante в заводском кованом карбоне Forged Composites с '
                           'установленным биллетовым твин-турбо китом GTT. Чудовищная отдача 1600+ л.с. и активная '
                           'аэродинамика ALA.',
                'fallback_img': 'assets/cars/huracan_rdrc_duo.jpg',
                'hp': '1,600+ HP',
                'id': 'lambo_maxpain',
                'img': 'assets/cars/huracan_maxpain_purple.jpg',
                'name_en': 'HURACAN PERFORMANTE TT GTT-MAXPAIN',
                'name_ru': 'HURACAN PERFORMANTE TT GTT-MAXPAIN',
                'object_position': 'center center',
                'quarter_mile': '8.150 сек',
                'sort_order': 12,
                'specs': {       'clutch': 'GTT Dual-Clutch Billet 10-Plate Basket',
                                 'ecu': 'Syvecs S12 Standalone Motorsport Management',
                                 'engine': '5.2L V10 FSI GTT Billet Rods & Pistons',
                                 'turbos': 'Mirror Twin Billet Precision Turbos Gen2'},
                'tag_en': 'FORGED COMPOSITES • 1600+ HP TWIN TURBO',
                'tag_ru': 'FORGED COMPOSITES • 1600+ HP TWIN TURBO',
                'top_speed': '360+ км/ч',
                'type': 'lambo',
                'video_src': '',
                'video_title': ''},
        {       'badge_en': 'Spyder GTT-800',
                'badge_ru': 'Spyder GTT-800',
                'brand': 'LAMBORGHINI & GTT',
                'desc_en': 'Atmospheric open-top roadster tuned with Inconel race exhaust and GTT Stage 2 package. PFO '
                           'Championship podium with 9.988 sec quarter mile pass.',
                'desc_ru': 'Открытый родстер Huracan Spyder с доработанной выхлопной трассой Inconel и пакетом GTT'
                           'Stage 2. Официальное 2-е место на Чемпионате ПФО с результатом 9.988 сек на 402 метра.',
                'fallback_img': 'assets/cars/huracan_green_bezzubik_side.jpg',
                'hp': '850+ HP',
                'id': 'lambo_spyder_800',
                'img': 'assets/cars/huracan_spyder_orange.jpg',
                'name_en': 'HURACAN SPYDER GTT-800 STAGE 2',
                'name_ru': 'HURACAN SPYDER GTT-800 STAGE 2',
                'object_position': 'center center',
                'quarter_mile': '9.988 сек',
                'sort_order': 13,
                'specs': {       'ecu': 'GTT Dual ECU Custom Calibration',
                                 'engine': '5.2L V10 Naturally Aspirated GTT Tune',
                                 'exhaust': 'Inconel Valvetronic Full System Handcrafted',
                                 'intake': 'Carbon Ram-Air Box'},
                'tag_en': 'PFO CHAMPIONSHIP PODIUM • 9.988 SEC',
                'tag_ru': 'ЧЕМПИОНАТ ПФО 2 МЕСТО • 9.988 СЕК',
                'top_speed': '222.35 км/ч',
                'type': 'lambo',
                'video_src': '',
                'video_title': ''},
        {       'badge_en': 'Legendary Moses #712',
                'badge_ru': 'Легендарный Moses #712',
                'brand': 'NISSAN',
                'desc_en': 'Iconic white Nissan GT-R R35 MOSES #712. European record holder at Unlim 500+ Greece '
                           '(Crete) with 7.810 sec pass and personal best 7.526 sec at 304.36 km/h in UAE tests.',
                'desc_ru': 'Культовый белый Nissan GT-R R35 «MOSES» борт №712. Европейский рекорд времени на Unlim '
                           '500+ Greece (остров Крит) — 7.810 сек / 287.65 км/ч и личный рекорд 7.526 сек со скоростью '
                           '304.36 км/ч в ОАЭ. 3-й результат в мире на момент постройки.',
                'fallback_img': 'assets/cars/gtr_draco_connections.jpg',
                'hp': '1,800+ HP',
                'id': 'moses',
                'img': 'assets/cars/gtr_moses.png',
                'name_en': 'GT-R R35 GTT-1800 «MOSES» #712',
                'name_ru': 'GT-R R35 GTT-1800 «MOSES» #712',
                'object_position': 'center center',
                'quarter_mile': '7.526 сек',
                'sort_order': 14,
                'specs': {       'ecu': 'Motec M1 + Custom GTT Drag AWD Logic',
                                 'engine': '4.1L Billet Stroker VR38DETT GTT Spec',
                                 'fuel': 'VP Racing C16 / 100 RON Dual Fuel Map',
                                 'trans': 'GTT Billet PPG Sequential Dog-Box',
                                 'turbos': 'Dual Precision Ball-Bearing Race Turbos'},
                'tag_en': 'UNLIM 500+ CRETE EUROPE RECORD • 7.810 SEC',
                'tag_ru': 'РЕКОРД ЕВРОПЫ UNLIM 500+ КРИТ • 7.810 СЕК',
                'top_speed': '304.36 км/ч',
                'type': 'gtr',
                'video_src': '',
                'video_title': ''},
        {       'badge_en': 'Russian Record 334 km/h',
                'badge_ru': 'Рекорд России 334 км/ч',
                'brand': 'NISSAN & GTT',
                'desc_en': 'Competition build piloted by Nikolay Korzhov. Russian Record at Moscow Mile (1/2 mile: '
                           '13.435 sec at 334.41 km/h) and 8.602 sec 1/4 mile. Vice-champion of SMP RDRC FSL class.',
                'desc_ru': 'Боевой болид Николая Коржова. Рекорд России на Московской миле (1/2 мили: 13.435 сек со '
                           'скоростью 334.41 км/ч) и 8.602 сек на 402 метра. Вице-чемпион абсолютного зачета '
                           'Чемпионата SMP RDRC в классе FSL.',
                'fallback_img': 'assets/cars/gtr_korzhik_712.jpg',
                'hp': '1,600+ HP',
                'id': 'gtr_korzhik',
                'img': 'assets/cars/gtr_korzhik_712.jpg',
                'name_en': 'GT-R R35 GTT «KORZHIK» #712',
                'name_ru': 'GT-R R35 GTT «KORZHIK» #712',
                'object_position': 'center center',
                'quarter_mile': '8.602 сек',
                'sort_order': 15,
                'specs': {       'engine': '4.0L Forged VR38 GTT Spec',
                                 'fuel': 'VP Racing Ethanol Map',
                                 'transmission': 'Dodson Promax Heavy Duty Clutch',
                                 'turbos': 'Precision Gen2 Billet Race Turbos'},
                'tag_en': 'RUSSIAN RECORD 334 KM/H • N. KORZHOV',
                'tag_ru': 'РЕКОРД РОССИИ 334 КМ/Ч • Н. КОРЖОВ',
                'top_speed': '275.43 км/ч',
                'type': 'gtr',
                'video_src': '',
                'video_title': ''},
        {       'badge_en': 'GT-R Baloo GTT',
                'badge_ru': 'GT-R Baloo GTT',
                'brand': 'NISSAN & GTT',
                'desc_en': 'Unique Baloo build optimized for high mid-range torque and lethal AWD traction. Official '
                           'team records: 8.875 sec at 262.39 km/h on 1/4 mile and 13.726 sec at 322.00 km/h on 1/2 '
                           'mile.',
                'desc_ru': 'Уникальный проект «Baloo» с мощнейшим средним диапазоном оборотов и полным приводом. '
                           'Личные показатели команды: 8.875 сек на 402 м со скоростью 262.39 км/ч и 13.726 сек на 1/2 '
                           'мили со скоростью 322.00 км/ч.',
                'fallback_img': 'assets/archive_tilda/nissan_gtr_baloo.webp',
                'hp': '1,450+ HP',
                'id': 'gtr_baloo',
                'img': 'assets/archive_tilda/nissan_gtr_baloo.webp',
                'name_en': 'GT-R R35 GTT «BALOO»',
                'name_ru': 'GT-R R35 GTT «BALOO»',
                'object_position': 'center 50%',
                'quarter_mile': '8.875 сек',
                'sort_order': 16,
                'specs': {       'cooling': 'GTT Dual Radiator Pack',
                                 'engine': '3.8L VR38 Reinforced GTT Block',
                                 'fuel': 'Dual In-Tank Fuel Rail',
                                 'turbos': 'Garrett G30 Billet Turbos'},
                'tag_en': 'MOSCOW MILE • 8.875 SEC • 322 KM/H',
                'tag_ru': 'МОСКОВСКАЯ МИЛЯ • 8.875 СЕК • 322 КМ/Ч',
                'top_speed': '262.39 км/ч',
                'type': 'gtr',
                'video_src': '',
                'video_title': ''},
        {       'badge_en': 'Blue GT-R #888',
                'badge_ru': 'Синий GT-R #888',
                'brand': 'NISSAN',
                'desc_en': 'The renowned Midnight Blue Nissan GT-R R35 carrying race #888, competing consistently on '
                           'RDRC stages. Calibrated GTT launch control algorithms and bulletproof forged 3.8L VR38.',
                'desc_ru': 'Знаменитый синий Nissan GT-R R35 со стартовым номером #888, постоянный участник и призер '
                           'этапов Чемпионата России RDRC. Калибровка лаунч-контроля GTT и кованый 3.8L VR38.',
                'fallback_img': 'assets/cars/gtr_blue_rdrc_888.jpg',
                'hp': '1,550+ HP',
                'id': 'gtr_blue_888',
                'img': 'assets/photos/gtr_blue_888_rdrc.jpg',
                'name_en': 'GT-R R35 MIDNIGHT BLUE GTT #888',
                'name_ru': 'GT-R R35 MIDNIGHT BLUE GTT #888',
                'object_position': 'center 45%',
                'quarter_mile': '8.120 сек',
                'sort_order': 17,
                'specs': {       'cooling': 'ETS 4-inch Race Intercooler Kit',
                                 'ecu': 'Syvecs S6+ ECU with GTT Drag Launch Strategy',
                                 'engine': '3.8L Forged VR38DETT GTT Spec',
                                 'trans': 'Dodson Pro-Max 8-Plate Drag Clutch',
                                 'turbos': 'Dual Garrett G30-900 Turbochargers'},
                'tag_en': 'RDRC RUSSIAN CHAMPIONSHIP • CAR #888',
                'tag_ru': 'RDRC ЧЕМПИОНАТ РОССИИ • БОРТ #888',
                'top_speed': '348+ км/ч',
                'type': 'gtr',
                'video_src': 'assets/videos/gtr_blue_888_pass_web.mp4',
                'video_title': 'Nissan GT-R #888 Midnight Blue GTT — боевой заезд RDRC'},
        {       'badge_en': 'GTT Rocket Spec',
                'badge_ru': 'GTT Rocket Spec',
                'brand': 'NISSAN & GTT',
                'desc_en': 'Extreme project Nissan GT-R R35 Rocket by GoshaTurboTech skunkworks. Twin turbo package, '
                           'titanium straight pipes and ultra-lightweight race setup.',
                'desc_ru': 'Экстремальный проект Nissan GT-R R35 «Rocket» лаборатории GoshaTurboTech. Двухтурбинный '
                           'наддув, титановый прямой выхлоп и облегченная гоночная конфигурация кузова.',
                'fallback_img': 'assets/cars/gtr_rocket_grey.jpg',
                'hp': '1,500+ HP',
                'id': 'gtr_rocket',
                'img': 'assets/cars/gtr_rocket_card.jpg',
                'name_en': 'GT-R R35 GTT «ROCKET»',
                'name_ru': 'GT-R R35 GTT «ROCKET»',
                'object_position': 'center 50%',
                'quarter_mile': '8.350 сек',
                'sort_order': 19,
                'specs': {       'ecu': 'Motec M1 Drag Calibration',
                                 'engine': '3.8L VR38DETT Built by GTT',
                                 'fuel': '100 RON + Ethanol Map',
                                 'turbos': 'Dual Precision High-Boost Turbos'},
                'tag_en': 'GTT ATELIER SPEC • FULL CARBON AERO',
                'tag_ru': 'СПЕЦПРОЕКТ GTT • КАРБОНОВЫЙ БОДИКИТ',
                'top_speed': '345+ км/ч',
                'type': 'gtr',
                'video_src': '',
                'video_title': ''},
        {       'badge_en': 'Alpha 12X GTT',
                'badge_ru': 'Alpha 12X GTT',
                'brand': 'NISSAN & GTT',
                'desc_en': 'Build based on the legendary Alpha 12X package, heavily refined by GTT engineers. Upgraded '
                           'GR6 transmission and bespoke engine management.',
                'desc_ru': 'Проект на базе культового пакета Alpha 12X, доработанный инженерами GTT. Кастомное '
                           'охлаждение, усиленная трансмиссия GR6 и индивидуальная прошивка блока управления.',
                'fallback_img': 'assets/cars/gtr_alpha12x_launch.jpg',
                'hp': '1,500+ HP',
                'id': 'gtr_alpha12x',
                'img': 'assets/cars/gtr_alpha12x_launch.jpg',
                'name_en': 'GT-R R35 GTT ALPHA12X',
                'name_ru': 'GT-R R35 GTT ALPHA12X',
                'object_position': 'center center',
                'quarter_mile': '8.250 сек',
                'sort_order': 20,
                'specs': {       'ecu': 'Syvecs S8 Dual ECU',
                                 'engine': '4.0L Stroker VR38 GTT Spec',
                                 'transmission': 'ShepTrans Stage 4 GR6',
                                 'turbos': 'AMS Alpha 12X Turbo Kit'},
                'tag_en': 'CULT ALPHA GTT • 1500 HP',
                'tag_ru': 'КУЛЬТОВАЯ АЛЬФА GTT • 1500 HP',
                'top_speed': '350+ км/ч',
                'type': 'gtr',
                'video_src': '',
                'video_title': ''},
        {       'badge_en': '991.1 GTT-1200',
                'badge_ru': '991.1 GTT-1200',
                'brand': 'PORSCHE & GTT',
                'desc_en': 'Savage 991.1 Turbo piloted by Alexey Sagal. Official Russia/Europe Record at RDRC '
                           'RacePark: 9.086 sec at 259.64 km/h on 1/4 mile and 14.186 sec at 312.77 km/h on 1/2 mile.',
                'desc_ru': 'Безумный 991.1 Turbo Алексея Сагала. Официальный рекорд России/Европы на RDRC RacePark: '
                           '9.086 сек со скоростью 259.64 км/ч на 402 м и 14.186 сек со скоростью 312.77 км/ч на 1/2 '
                           'мили.',
                'fallback_img': 'assets/cars/gtr_rdrc_red_panamera.jpg',
                'hp': '1,200+ HP',
                'id': 'porsche_991_1200',
                'img': 'assets/cars/porsche_991_1200_white.jpg',
                'name_en': 'PORSCHE 911 TURBO (991.1) GTT-1200',
                'name_ru': 'PORSCHE 911 TURBO (991.1) GTT-1200',
                'object_position': 'center center',
                'quarter_mile': '9.086 сек',
                'sort_order': 21,
                'specs': {       'engine': '3.8L Twin-Turbo Boxer-6 Built Internals',
                                 'fuel': 'Methanol Direct Port Injection',
                                 'transmission': 'Reinforced PDK Dual-Clutch Pack',
                                 'turbos': 'GTT Dual Billet High-Flow Turbos'},
                'tag_en': 'RUSSIA/EUROPE RECORD • A. SAGAL',
                'tag_ru': 'РЕКОРД РОССИИ/ЕВРОПЫ • А. САГАЛ',
                'top_speed': '259.64 км/ч',
                'type': 'porsche',
                'video_src': '',
                'video_title': ''},
        {       'badge_en': 'Felix Ferro Edition',
                'badge_ru': 'Felix Ferro Edition',
                'brand': 'PORSCHE & GTT',
                'desc_en': 'Exclusive Felix Ferro Edition bespoke engineering build. Lightweight aero package, forged '
                           'monoblocks and Syvecs ECU calibration. 9.601 sec quarter mile.',
                'desc_ru': 'Лимитированная инженерная серия Felix Ferro Edition. Индивидуальный аэродинамический '
                           'пакет, облегченные кованые диски и настройка блока управления Syvecs. 9.601 сек на '
                           'квотере.',
                'fallback_img': 'assets/archive_tilda/porsche_992_imba.jpg',
                'hp': '950+ HP',
                'id': 'porsche_991_felix',
                'img': 'assets/cars/porsche_991_felix_grey.jpg',
                'name_en': 'PORSCHE 911 TURBO S (991.2) FELIX FERRO',
                'name_ru': 'PORSCHE 911 TURBO S (991.2) FELIX FERRO',
                'object_position': 'center center',
                'quarter_mile': '9.601 сек',
                'sort_order': 22,
                'specs': {       'ecu': 'Syvecs S7 Standalone Engine Management',
                                 'engine': '3.8L Twin-Turbo Boxer-6 GTT RS Spec',
                                 'exhaust': 'Titanium Valved System Handcrafted',
                                 'turbos': 'Billet Hybrid Turbos Gen2'},
                'tag_en': 'FELIX FERRO EDITION • 9.601 SEC',
                'tag_ru': 'FELIX FERRO EDITION • 9.601 СЕК',
                'top_speed': '232.40 км/ч',
                'type': 'porsche',
                'video_src': '',
                'video_title': ''},
        {       'badge_en': 'M7 Executive GTT',
                'badge_ru': 'M7 Executive GTT',
                'brand': 'BMW M-POWER',
                'desc_en': 'Executive flagship 7-series heavily enhanced by GoshaTurboTech. Twin-turbocharged '
                           'powertrain offering silent luxury alongside autobahn supremacy.',
                'desc_ru': 'Представительский флагман BMW 7 серии в глубокой доработке GoshaTurboTech. Двухтурбинный '
                           'V8/V12, бесшумный акустический комфорт в салоне и ураганная динамика на скоростных прямых.',
                'fallback_img': 'assets/cars/bmw_m5_rdrc_race.jpg',
                'hp': '900+ HP',
                'id': 'bmw_m7_gtt',
                'img': 'assets/cars/bmw_m7_gtt_blue.jpg',
                'name_en': 'BMW M7 GTT',
                'name_ru': 'BMW M7 GTT',
                'object_position': 'center 82%',
                'quarter_mile': '11.945 сек',
                'sort_order': 23,
                'specs': {       'engine': '4.4L V8 TwinPower Turbo GTT Stage 2',
                                 'exhaust': 'Bespoke Stainless Valvetronic System',
                                 'transmission': 'ZF 8HP Reinforced Calibration',
                                 'turbos': 'Billet Hybrid Turbochargers'},
                'tag_en': 'EXECUTIVE FLAGSHIP • 900 HP V12',
                'tag_ru': 'EXECUTIVE FLAGSHIP • 900 HP V12',
                'top_speed': '190.47 км/ч',
                'type': 'bmw',
                'video_src': '',
                'video_title': ''},
        {'badge_en': 'Volga «KGB»',
         'badge_ru': 'Волга «КГБ»',
         'brand': 'ГАЗ & GTT',
         'desc_en': 'GAZ-24 with a 2JZ-GTE engine and a stripped interior with a roll cage.',
         'desc_ru': 'ГАЗ-24 с двигателем 2JZ-GTE и пустым салоном с каркасом безопасности.',
         'fallback_img': 'assets/cars/volga_kgb_v8_workshop.jpg',
         'hp': '',
         'id': 'volga_kgb',
         'img': 'assets/cars/volga_kgb_v8_workshop.jpg',
         'is_photo': 1,
         'name_en': 'VOLGA GAZ-24 «KGB» GTT',
         'name_ru': 'ВОЛГА ГАЗ-24 «КГБ» GTT',
         'object_position': 'center center',
         'quarter_mile': '',
         'sort_order': 24,
         'specs': {'engine': '2JZ-GTE', 'interior': 'Пустой салон с каркасом безопасности'},
         'tag_en': '2JZ-GTE',
         'tag_ru': '2JZ-GTE',
         'top_speed': '',
         'type': 'other',
         'video_src': '',
         'video_title': ''},
        {       'badge_en': 'Ferrari 512 TR',
                'badge_ru': 'Ferrari 512 TR',
                'brand': 'FERRARI & GTT',
                'desc_en': 'Ferrari 512 TR',
                'desc_ru': 'Ferrari 512 TR',
                'fallback_img': 'assets/cars/ferrari_512tr_dyno_red.jpg',
                'hp': '',
                'id': 'ferrari_512tr',
                'img': 'assets/cars/ferrari_512tr_dyno_red.jpg',
                'is_photo': 1,
                'name_en': 'FERRARI 512 TR GTT',
                'name_ru': 'FERRARI 512 TR GTT',
                'object_position': 'center center',
                'quarter_mile': '',
                'sort_order': 25,
                'specs': {},
                'tag_en': '',
                'tag_ru': '',
                'top_speed': '',
                'type': 'other',
                'video_src': '',
                'video_title': ''},
        {       'badge_en': 'GTT-900 Stage 2+',
                'badge_ru': 'GTT-900 Stage 2+',
                'brand': 'PORSCHE & GTT',
                'desc_en': 'The quintessential balance of daily driveability and track dominance. 900 reliable '
                           'horsepower on pump 100 RON gasoline.',
                'desc_ru': 'Идеальный баланс повседневного суперкара и рекордного темпа. 900 сил на товарном 100-м '
                           'бензине с ресурсом заводского мотора.',
                'fallback_img': 'assets/cars/gtt_classified_car.svg',
                'hp': '—',
                'id': 'porsche_991_900',
                'img': 'assets/cars/gtt_classified_car.svg',
                'is_photo': 0,
                'name_en': 'PORSCHE 911 TURBO S (991.2) GTT-900',
                'name_ru': 'PORSCHE 911 TURBO S (991.2) GTT-900',
                'object_position': 'center 50%',
                'quarter_mile': '—',
                'sort_order': 27,
                'specs': {       'ecu': 'Custom GTT ECU & TCU Map',
                                 'engine': '3.8L Boxer-6 Twin-Turbo GTT Stage 2',
                                 'intercoolers': 'CSF High-Capacity Charge Coolers',
                                 'turbos': 'Upgraded High-Efficiency Turbos'},
                'tag_en': 'GTT STAGE 2+ • 900 HP PUMP FUEL',
                'tag_ru': 'GTT STAGE 2+ • 900 HP НА 100 БЕНЗИНЕ',
                'top_speed': '—',
                'type': 'porsche',
                'video_src': '',
                'video_title': ''},
        {       'badge_en': 'Puncher 992 GTT',
                'badge_ru': 'Puncher 992 GTT',
                'brand': 'PORSCHE & GTT',
                'desc_en': 'Iconic Porsche 992 Turbo S Puncher driven by Sergey Nikitin. World Category Record at '
                           'UNLIM FEST 2021: 9.303 sec at 235.83 km/h on 1/4 mile and 14.778 sec at 276.92 km/h on 1/2 '
                           'mile.',
                'desc_ru': 'Культовый Porsche 992 Turbo S «Puncher» Сергея Никитина. Мировой рекорд в категории на '
                           'UNLIM FEST 2021: 9.303 сек со скоростью 235.83 км/ч на 1/4 мили и 14.778 сек со скоростью '
                           '276.92 км/ч на 1/2 мили.',
                'fallback_img': 'assets/cars/porsche_992_puncher.jpg',
                'hp': '—',
                'id': 'porsche_992_puncher',
                'img': 'assets/cars/porsche_992_puncher.jpg',
                'is_photo': 1,
                'name_en': 'PORSCHE 911 TURBO S (992) GTT «PUNCHER»',
                'name_ru': 'PORSCHE 911 TURBO S (992) GTT «PUNCHER»',
                'object_position': 'center 50%',
                'quarter_mile': '9.303 сек',
                'sort_order': 28,
                'specs': {       'engine': '3.8L Boxer-6 992 GTT Spec',
                                 'fuel': 'Methanol Multi-Port System',
                                 'intercooling': 'High-Flow Core Package',
                                 'turbos': 'Billet Precision Mirror Turbos'},
                'tag_en': 'WORLD CATEGORY RECORD • 9.303 SEC',
                'tag_ru': 'МИРОВОЙ РЕКОРД В КАТЕГОРИИ • 9.303 СЕК',
                'top_speed': '235.83 км/ч',
                'type': 'porsche',
                'video_src': '',
                'video_title': ''},
        {       'badge_en': 'E63S GTT-950',
                'badge_ru': 'E63S GTT-950',
                'brand': 'MERCEDES-AMG & GTT',
                'desc_en': 'Savage executive sedan boasting 950 horsepower from 4.0L V8 Biturbo. Piloted by V. Shched '
                           'on RDRC 2026 with verified 9.880 sec pass at 234.91 km/h.',
                'desc_ru': 'Беспощадный бизнес-седан с 4.0L V8 Biturbo, форсированный до 950 л.с. Пилот В. Щед на RDRC '
                           '2026 показал подтвержденное время 9.880 сек со скоростью 234.91 км/ч на 1/4 мили.',
                'fallback_img': 'assets/cars/gtt_classified_car.svg',
                'hp': '—',
                'id': 'mercedes_e63',
                'img': 'assets/cars/gtt_classified_car.svg',
                'is_photo': 0,
                'name_en': 'MERCEDES-AMG E63S 4MATIC+ GTT-950',
                'name_ru': 'MERCEDES-AMG E63S 4MATIC+ GTT-950',
                'object_position': 'center center',
                'quarter_mile': '—',
                'sort_order': 29,
                'specs': {       'downpipes': 'Inconel Catless Thermal-Wrapped Pipes',
                                 'engine': '4.0L V8 Biturbo M177 Built by GTT',
                                 'transmission': 'AMG SPEEDSHIFT MCT 9G Flashed',
                                 'turbos': 'Billet Upgraded Stage 3 Turbos'},
                'tag_en': 'RDRC 2026 • 9.880 SEC • PILOT V. SHCHED',
                'tag_ru': 'RDRC 2026 • 9.880 СЕК • ПИЛОТ В. ЩЕД',
                'top_speed': '—',
                'type': 'other',
                'video_src': '',
                'video_title': ''},
        {       'badge_en': 'Tesla Plaid GTT',
                'badge_ru': 'Tesla Plaid GTT',
                'brand': 'TESLA & GTT',
                'desc_en': 'Tesla Model S Plaid',
                'desc_ru': 'Tesla Model S Plaid',
                'fallback_img': 'assets/cars/tesla_model_s_plaid.jpg',
                'hp': '',
                'id': 'tesla_plaid',
                'img': 'assets/cars/tesla_model_s_plaid.jpg',
                'is_photo': 1,
                'name_en': 'TESLA MODEL S PLAID GTT',
                'name_ru': 'TESLA MODEL S PLAID GTT',
                'object_position': 'center center',
                'quarter_mile': '',
                'sort_order': 30,
                'specs': {},
                'tag_en': '',
                'tag_ru': '',
                'top_speed': '',
                'type': 'other',
                'video_src': '',
                'video_title': ''},
        {       'badge_en': 'Tony Stark 1400+ HP',
                'badge_ru': 'Tony Stark 1400+ HP',
                'brand': 'AUDI & ЦМРБАНК',
                'desc_en': 'Race Audi R8 V10 Twin Turbo backed by CMRBank and GTT on the RDRC strip. Record Days 2023 '
                           '8.948 sec pass at 247.68 km/h.',
                'desc_ru': 'Боевая Audi R8 V10 Twin Turbo под эгидой ЦМРБанк и GTT на треке RDRC. Официальное время '
                           '8.948 сек со скоростью 247.68 км/ч на Record Days 2023 и 287.19 км/ч на 1/2 мили.',
                'fallback_img': 'assets/cars/audi_r8_tonystark_rdrc.jpg',
                'hp': '—',
                'id': 'tonystark',
                'img': 'assets/cars/audi_r8_tonystark_rdrc.jpg',
                'is_photo': 0,
                'name_en': 'R8 V10 PLUS TWIN TURBO TONY STARK / RDRC',
                'name_ru': 'R8 V10 PLUS TWIN TURBO TONY STARK / RDRC',
                'object_position': 'center center',
                'quarter_mile': '8.948 сек',
                'sort_order': 31,
                'specs': {       'cooling': 'CSF Triple Billet Heat Exchangers',
                                 'ecu': 'Syvecs S12 Standalone Motorsport Setup',
                                 'engine': '5.2L FSI V10 Twin Turbo Mid-Engine',
                                 'turbos': 'Mirror Twin Turbo Kit with Air-to-Water Intercooling'},
                'tag_en': 'BAIKAL ICE & RDRC FIGHTER • 8.948 SEC',
                'tag_ru': 'ПОКОРИТЕЛЬ БАЙКАЛА & RDRC • 8.948 СЕК',
                'top_speed': '247.68 км/ч',
                'type': 'audi',
                'video_src': 'assets/videos/dodge_srt_pass.mp4',
                'video_title': 'Audi R8 V10 Twin Turbo Tony Stark — боевой заезд'},
        {
            'id': 'street_bmw_m3_g80',
            'brand': 'BMW & GTT',
            'type': 'bmw',
            'name_ru': 'BMW M3 G80',
            'name_en': 'BMW M3 G80',
            'tag_ru': 'ГРАЖДАНСКИЙ ТЮНИНГ GTT',
            'tag_en': 'GTT STREET DIVISION',
            'hp': '750+ HP',
            'quarter_mile': '10.2 сек',
            'top_speed': '320+ км/ч',
            'badge_ru': 'Гошина М3',
            'badge_en': 'Gosha Personal Car',
            'img': 'assets/cars/gtt_classified_car.svg',
            'fallback_img': 'assets/cars/gtt_classified_car.svg',
            'desc_ru': 'Личный гражданский проект Гоши Перцхелия. Комплексный тюнинг двигателя S58, титановый выхлоп GTT, индивидуальная калибровка блока управления и спортивная подвеска.',
            'desc_en': 'Personal street project of Gosha Pertskheliya. S58 twin-turbo tuning, custom titanium exhaust and ECU calibration.',
            'specs': {'engine': '3.0L Twin-Turbo S58 GTT Stage 2', 'exhaust': 'GTT Custom Titanium Exhaust', 'ecu': 'Custom ECU Calibration'},
            'sort_order': 101,
            'category': 'street',
            'is_published': 1,
            'video_src': '',
            'video_title': ''
        },
        {
            'id': 'street_bentley_continental_gt',
            'brand': 'BENTLEY & GTT',
            'type': 'other',
            'name_ru': 'BENTLEY CONTINENTAL GT GTT',
            'name_en': 'BENTLEY CONTINENTAL GT GTT',
            'tag_ru': 'ГРАЖДАНСКИЙ ТЮНИНГ GTT',
            'tag_en': 'GTT STREET DIVISION',
            'hp': '800+ HP',
            'quarter_mile': '10.5 сек',
            'top_speed': '335+ км/ч',
            'badge_ru': 'Bentley GT',
            'badge_en': 'Luxury Grand Tourer',
            'img': 'assets/cars/gtt_classified_car.svg',
            'fallback_img': 'assets/cars/gtt_classified_car.svg',
            'desc_ru': 'Премиальный гран-туризмо Continental GT. Индивидуальная настройка W12 / V8 Twin-Turbo, доработка охлаждения и выхлопной системы под заказ-наряд клиента.',
            'desc_en': 'Premium Grand Tourer Continental GT tuned by GTT skunkworks.',
            'specs': {'engine': 'Twin-Turbo W12 / V8 GTT Spec', 'tuning': 'Stage 2 Performance Kit'},
            'sort_order': 102,
            'category': 'street',
            'is_published': 1,
            'video_src': '',
            'video_title': ''
        },
        {
            'id': 'street_porsche_gt3rs_mcqueen',
            'brand': 'PORSCHE & GTT',
            'type': 'porsche',
            'name_ru': 'PORSCHE 911 GT3 RS «МАККУИН»',
            'name_en': 'PORSCHE 911 GT3 RS «MCQUEEN»',
            'tag_ru': 'ГРАЖДАНСКИЙ ТЮНИНГ GTT',
            'tag_en': 'GTT STREET DIVISION',
            'hp': '525+ HP',
            'quarter_mile': '10.8 сек',
            'top_speed': '300+ км/ч',
            'badge_ru': 'GT3 RS «Маккуин»',
            'badge_en': 'Track-Day Spec McQueen',
            'img': 'assets/cars/gtt_classified_car.svg',
            'fallback_img': 'assets/cars/gtt_classified_car.svg',
            'desc_ru': 'Атмосферный трековый шедевр Porsche 911 GT3 RS в эксклюзивной стилистике «Молния Маккуин». Высокоточные настройки шасси, выхлопная трасса Inconel и трековая телеметрия.',
            'desc_en': 'Naturally aspirated track weapon 911 GT3 RS in iconic McQueen livery.',
            'specs': {'engine': '4.0L Flat-6 Naturally Aspirated', 'exhaust': 'Inconel Race System'},
            'sort_order': 103,
            'category': 'street',
            'is_published': 1,
            'video_src': '',
            'video_title': ''
        }
    ]

    for idx, car in enumerate(default_projects):
        cursor.execute("""
        INSERT OR REPLACE INTO cars (
            id, brand, type, name_ru, name_en, tag_ru, tag_en, hp, quarter_mile, top_speed,
            badge_ru, badge_en, img, fallback_img, video_src, video_title, desc_ru, desc_en, specs_json, sort_order, category, is_published
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            car["id"], car["brand"], car["type"], car["name_ru"], car.get("name_en", car["name_ru"]),
            car.get("tag_ru", ""), car.get("tag_en", ""), car["hp"], car.get("quarter_mile", ""), car.get("top_speed", ""),
            car.get("badge_ru", ""), car.get("badge_en", ""), car["img"], car.get("fallback_img", car["img"]),
            car.get("video_src", ""), car.get("video_title", ""), car.get("desc_ru", ""), car.get("desc_en", ""),
            json.dumps(car.get("specs", {})), idx + 1, car.get("category", "race"), car.get("is_published", 1)
        ))

    team_json_path = os.path.join(os.path.dirname(__file__), "data", "team.json")
    if os.path.exists(team_json_path):
        try:
            with open(team_json_path, "r", encoding="utf-8") as f:
                default_team = json.load(f)
        except Exception:
            default_team = []
    else:
        default_team = []

    if not default_team:
        default_team = [
            {"id": "m_gosha", "name": "Гоша Перцхелия", "role": "Основатель & Главный конструктор GTT", "status": "active", "photo": "assets/archive_tilda/team_gosha.jpg", "social": "@goshaturbotech"},
            {"id": "m_pertskheliya_givi", "name": "Гиви Перцхелия", "role": "Босс", "status": "active", "photo": "", "social": None},
            {"id": "m_pertskheliya_mikhail", "name": "Михаил Перцхелия", "role": "Исполнительный директор", "status": "active", "photo": "", "social": None},
            {"id": "m_sarkisyan", "name": "Эдуард Саркисян", "role": "Технический директор", "status": "active", "photo": "assets/archive_tilda/team_edik.jpg", "social": None},
            {"id": "m_pertskheliya_zurab", "name": "Зураб Перцхелия", "role": "Помощник руководителя", "status": "active", "photo": "", "social": None},
            {"id": "m_pashchenko", "name": "Даниил Пащенко", "role": "Руководитель Медиа отдела", "status": "active", "photo": "", "social": None},
            {"id": "m_gurov", "name": "Дмитрий Гуров", "role": "Инженер-проектировщик", "status": "atelier", "photo": "", "social": None},
            {"id": "m_shevtsov", "name": "Георгий Шевцов", "role": "Ст. Электрик", "status": "active", "photo": "assets/archive_tilda/team_georgy.jpg", "social": None},
            {"id": "m_nikolaev", "name": "Артем Николаев", "role": "Мл. Электрик", "status": "atelier", "photo": "", "social": None},
            {"id": "m_labkovich", "name": "Евгений Лабкович", "role": "Диагност", "status": "active", "photo": "assets/archive_tilda/team_evgeny.jpg", "social": None},
            {"id": "m_stotsky", "name": "Сергей Стоцкий", "role": "Моторист-агрегатчик", "status": "active", "photo": "", "social": None},
            {"id": "m_turdibaev", "name": "Рустам Турдибаев", "role": "Моторист-агрегатчик", "status": "active", "photo": "", "social": None},
            {"id": "m_mazhnunov", "name": "Солехджон Мажнунов", "role": "Помощник моториста", "status": "atelier", "photo": "", "social": None},
            {"id": "m_petrushin", "name": "Павел Петрушин", "role": "Помощник моториста", "status": "atelier", "photo": "", "social": None},
            {"id": "m_mamsurov", "name": "Ксанти Мамсуров", "role": "Сварщик-фабрикатор", "status": "active", "photo": "", "social": None},
            {"id": "m_fetkulin", "name": "Роман Феткулин", "role": "Сварщик-фабрикатор", "status": "active", "photo": "assets/archive_tilda/team_roman.jpg", "social": None},
            {"id": "m_bagdasaryan", "name": "Микаел Багдасарян", "role": "Механик", "status": "paddock", "photo": "", "social": None},
            {"id": "m_burnashov", "name": "Эрик Бурнашов", "role": "Механик", "status": "paddock", "photo": "", "social": None},
            {"id": "m_ivanov", "name": "Никита Иванов", "role": "Механик", "status": "paddock", "photo": "assets/archive_tilda/team_nikita.jpg", "social": None},
            {"id": "m_mazhorov", "name": "Иван Мажоров", "role": "Механик", "status": "paddock", "photo": "assets/archive_tilda/team_ivan.jpg", "social": None},
            {"id": "m_malofeev", "name": "Алексей Малофеев", "role": "Механик", "status": "paddock", "photo": "", "social": None},
            {"id": "m_marin", "name": "Вадим Марин", "role": "Механик", "status": "atelier", "photo": "", "social": None},
            {"id": "m_osipov", "name": "Артем Осипов", "role": "Механик", "status": "atelier", "photo": "", "social": None},
            {"id": "m_ponomarev", "name": "Николай Пономарев", "role": "Механик", "status": "atelier", "photo": "", "social": None},
            {"id": "m_sergeev", "name": "Андрей Сергеев", "role": "Механик", "status": "atelier", "photo": "", "social": None},
            {"id": "m_shinkarenko", "name": "Степан Шинкаренко", "role": "Механик", "status": "atelier", "photo": "assets/archive_tilda/team_stepan.jpg", "social": None},
            {"id": "m_yakovlev", "name": "Алексей Яковлев", "role": "Мото-механик", "status": "atelier", "photo": "", "social": None},
            {"id": "m_barankin", "name": "Дмитрий Баранкин", "role": "Менеджер по закупкам", "status": "atelier", "photo": "", "social": None},
            {"id": "m_gazaryan", "name": "Павел Газарьян", "role": "Менеджер по закупкам", "status": "atelier", "photo": "", "social": None},
            {"id": "m_gusarov", "name": "Илья Гусаров", "role": "Заведующий складом", "status": "atelier", "photo": "", "social": None},
            {"id": "m_zolotareva", "name": "Мария Золотарева", "role": "Делопроизводитель", "status": "atelier", "photo": "assets/archive_tilda/team_maria.jpg", "social": None},
            {"id": "m_kopyl", "name": "Ульяна Копыл", "role": "Контент-Мейкер", "status": "atelier", "photo": "", "social": None},
            {"id": "m_babyakin", "name": "Никита Бабякин", "role": "Специалист по хозяйственному обеспечению", "status": "atelier", "photo": "", "social": None}
        ]
    for idx, member in enumerate(default_team):
        cursor.execute("INSERT OR REPLACE INTO team (id, name, role, status, photo, social, sort_order, name_en, role_en, dept, object_position) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                       (member["id"], member["name"], member["role"], member["status"], member.get("photo", ""), member.get("social"), member.get("sort_order", idx + 1), member.get("name_en", ""), member.get("role_en", ""), member.get("dept", ""), member.get("object_position", "center 20%")))

    default_records = [
        {'id': 'rec_moses', 'year': '2016 • Абсолютный рекорд GTT', 'car': 'NISSAN GT-R R35 GTT-1800 «MOSES»', 'telemetry': '7.526 сек • 304.36 км/ч', 'desc': '', 'img': 'assets/archive_tilda/gtr_moses.png', 'object_position': 'center 50%', 'sort_order': 1},
        {'id': 'rec_draco', 'year': '2024 • Рекорд RDRC', 'car': 'NISSAN GT-R R35 «DRACO» #300', 'telemetry': '7.694 сек • 304.44 км/ч', 'desc': '', 'img': 'assets/cars/gtr_draco_promod_front.jpg', 'object_position': None, 'sort_order': 2},
        {'id': 'rec_kurdalagon', 'year': '26.10.2026 • Рекорд Быково', 'car': 'NISSAN GT-R R35 «KURDALAGON»', 'telemetry': '7.766 сек • 300.00 км/ч', 'desc': '', 'img': 'assets/cars/gtr_kurdalagon_white.jpg', 'object_position': 'center 65%', 'sort_order': 3},
        {'id': 'rec_rokot', 'year': '2026 • Рекорд России для Audi', 'car': 'AUDI R8 V10 PLUS TWIN TURBO «ROKOT»', 'telemetry': '7.877 сек • 288.35 км/ч', 'desc': '', 'img': 'assets/cars/audi_r8_tsmr_launch.jpg', 'object_position': None, 'sort_order': 4},
        {'id': 'rec_bezzubik', 'year': 'Рекорд Европы • Race 1000', 'car': 'LAMBORGHINI HURACAN TT BEZZUBIK', 'telemetry': '8.054 сек • 283.46 км/ч', 'desc': '', 'img': 'assets/archive_tilda/huracan_bezzubik.webp', 'object_position': None, 'sort_order': 5},
        {'id': 'rec_zelenka', 'year': 'ОАЭ & Германия • 344.60 км/ч', 'car': 'LAMBORGHINI HURACAN TWIN TURBO «ЗЕЛЕНКА»', 'telemetry': '8.373 сек • 275.26 км/ч', 'desc': '', 'img': 'assets/photos/huracan_zelenka_gtt.jpg', 'object_position': None, 'sort_order': 6},
        {'id': 'rec_lucifer', 'year': 'RDRC 2026 • 1-е место в классе', 'car': 'NISSAN GT-R R35 «LUCIFER» GTT #71', 'telemetry': '8.400 сек • 262.00 км/ч', 'desc': '', 'img': 'assets/cars/gtr_lucifer_solo.jpg', 'object_position': None, 'sort_order': 7},
        {'id': 'rec_korzhik', 'year': 'Рекорд России • Московская миля', 'car': 'NISSAN GT-R R35 GTT «KORZHIK» #712', 'telemetry': '8.602 сек • 275.43 км/ч', 'desc': '', 'img': 'assets/cars/gtr_korzhik_712.jpg', 'object_position': None, 'sort_order': 8},
        {'id': 'rec_projects_05', 'year': '', 'car': 'Nissan GT-R R35 «BALOO»', 'telemetry': '8.875 сек • 262.39 км/ч', 'desc': '', 'img': 'assets/archive_tilda/nissan_gtr_baloo.webp', 'object_position': None, 'sort_order': 9},
        {'id': 'rec_gyurza', 'year': '2022 • Абсолютный рекорд льда', 'car': 'AUDI R8 V10 PLUS TT «GYURZA»', 'telemetry': '8.948 сек • 247.68 км/ч', 'desc': '', 'img': 'assets/archive_tilda/audi_r8_gyurza_ice.jpg', 'object_position': None, 'sort_order': 11},
        {'id': 'rec_tonystark', 'year': 'Record Days 2023', 'car': 'AUDI R8 V10 PLUS TT «TONY STARK»', 'telemetry': '8.948 сек • 247.68 км/ч', 'desc': '', 'img': 'assets/cars/audi_r8_tonystark_rdrc.jpg', 'object_position': None, 'sort_order': 12},
        {'id': 'rec_projects_51', 'year': '', 'car': 'Audi R8 V10 Plus «Злая Зая / ZlaяZaя»', 'telemetry': '9.048 сек • 237.39 км/ч', 'desc': '', 'img': 'assets/cars/audi_r8_zlayazaya_launch.jpg', 'object_position': None, 'sort_order': 13},
        {'id': 'rec_gtt1200', 'year': 'Рекорд России/Европы • RDRC RacePark', 'car': 'PORSCHE 911 TURBO (991.1) GTT-1200', 'telemetry': '9.086 сек • 259.64 км/ч', 'desc': '', 'img': 'assets/cars/porsche_991_1200_white.jpg', 'object_position': None, 'sort_order': 14},
        {'id': 'rec_projects_41', 'year': '', 'car': 'Porsche 911 Turbo Перцхелия', 'telemetry': '9.086 сек • 259.64 км/ч', 'desc': '', 'img': '', 'object_position': None, 'sort_order': 15},
        {'id': 'rec_su7', 'year': '2026 • Суперкубок RDRC', 'car': 'XIAOMI SU7 ULTRA', 'telemetry': '9.130 сек • 249.31 км/ч', 'desc': '', 'img': '', 'object_position': None, 'sort_order': 16},
        {'id': 'rec_imba', 'year': '2022–2025 • Мировой рекорд RDRC', 'car': 'PORSCHE 911 TURBO S (992) GTT-IMBA', 'telemetry': '9.167 сек • 236.92 км/ч', 'desc': '', 'img': 'assets/cars/porsche_992_imba_silver.jpg', 'object_position': None, 'sort_order': 17},
        {'id': 'rec_projects_18', 'year': '', 'car': 'Nissan GT-R R35 / RPE-3000', 'telemetry': '9.199 сек • 241.37 км/ч', 'desc': '', 'img': '', 'object_position': None, 'sort_order': 18},
        {'id': 'rec_puncher', 'year': '2021 • Мировой ориентир UNLIM FEST', 'car': 'PORSCHE 911 TURBO S (992) PUNCHER', 'telemetry': '9.303 сек • 235.83 км/ч', 'desc': '', 'img': 'assets/archive_tilda/porsche_992_puncher.jpg', 'object_position': None, 'sort_order': 19},
        {'id': 'rec_projects_03', 'year': '', 'car': 'Porsche 911 Turbo S (992) Инцкирвели', 'telemetry': '9.355 сек • 231.73 км/ч', 'desc': '', 'img': '', 'object_position': None, 'sort_order': 20},
        {'id': 'rec_projects_23', 'year': '', 'car': 'Porsche 911 Turbo S (992) «GTT-STAGE 2»', 'telemetry': '9.431 сек • 231.88 км/ч', 'desc': '', 'img': '', 'object_position': None, 'sort_order': 21},
        {'id': 'rec_projects_09', 'year': '', 'car': 'Dodge Challenger SRT Demon', 'telemetry': '9.533 сек • 257.23 км/ч', 'desc': '', 'img': '', 'object_position': None, 'sort_order': 22},
        {'id': 'rec_projects_28', 'year': '', 'car': 'Lamborghini Huracán Performante Кардан', 'telemetry': '9.555 сек • 235.14 км/ч', 'desc': '', 'img': '', 'object_position': None, 'sort_order': 23},
        {'id': 'rec_projects_15', 'year': '', 'car': 'Porsche 911 RS «FELIX FERRO EDITION»', 'telemetry': '9.601 сек • 232.40 км/ч', 'desc': '', 'img': '', 'object_position': None, 'sort_order': 24},
        {'id': 'rec_projects_20', 'year': '', 'car': 'Nissan GT-R Тарэтов', 'telemetry': '9.712 сек • 229.45 км/ч', 'desc': '', 'img': '', 'object_position': None, 'sort_order': 25},
        {'id': 'rec_projects_14', 'year': '', 'car': 'Mercedes-Benz E63 S', 'telemetry': '9.785 сек • 237.81 км/ч', 'desc': '', 'img': '', 'object_position': None, 'sort_order': 26},
        {'id': 'rec_projects_12', 'year': '', 'car': 'Dodge Challenger SRT Demon «Demon Мегон»', 'telemetry': '9.891 сек • 231.36 км/ч', 'desc': '', 'img': 'assets/cars/dodge_burnout_sunset.jpg', 'object_position': None, 'sort_order': 27},
        {'id': 'rec_projects_40', 'year': '', 'car': 'Audi R8 V10 Plus «OCTO GTT800»', 'telemetry': '9.952 сек • 220.25 км/ч', 'desc': '', 'img': '', 'object_position': None, 'sort_order': 28},
        {'id': 'rec_projects_22', 'year': '', 'car': 'Lamborghini Huracan Spyder «GTT-800 SPYDER»', 'telemetry': '9.988 сек • 222.35 км/ч', 'desc': '', 'img': 'assets/cars/huracan_spyder_orange.jpg', 'object_position': None, 'sort_order': 29},
        {'id': 'rec_projects_35', 'year': '', 'car': 'BMW M5 G90', 'telemetry': '10.212 сек • 224.37 км/ч', 'desc': '', 'img': 'assets/cars/bmw_m5_rdrc_race.jpg', 'object_position': None, 'sort_order': 30},
        {'id': 'rec_projects_34', 'year': '', 'car': 'BMW M5 CS', 'telemetry': '10.291 сек • 214.80 км/ч', 'desc': '', 'img': '', 'object_position': None, 'sort_order': 31},
        {'id': 'rec_projects_07', 'year': '', 'car': 'BMW M3 Никитин', 'telemetry': '10.410 сек • 214.54 км/ч', 'desc': '', 'img': '', 'object_position': None, 'sort_order': 32},
        {'id': 'rec_projects_33', 'year': '', 'car': 'BMW M5', 'telemetry': '10.518 сек • 217.59 км/ч', 'desc': '', 'img': '', 'object_position': None, 'sort_order': 33},
        {'id': 'rec_projects_02', 'year': '', 'car': 'Zeekr 007 Performance ZEVS', 'telemetry': '10.521 сек • 205.07 км/ч', 'desc': '', 'img': '', 'object_position': None, 'sort_order': 34},
        {'id': 'rec_projects_04', 'year': '', 'car': 'Zeekr 9X Hyper', 'telemetry': '10.610 сек • 211.52 км/ч', 'desc': '', 'img': '', 'object_position': None, 'sort_order': 35},
        {'id': 'rec_projects_10', 'year': '', 'car': 'Audi RS Q8 «DAMBIOUS GTT700»', 'telemetry': '10.899 сек • 201.34 км/ч', 'desc': '', 'img': '', 'object_position': None, 'sort_order': 36},
        {'id': 'rec_projects_24', 'year': '', 'car': 'Nissan GT-R R35 «GTT600»', 'telemetry': '11.112 сек • 199.50 км/ч', 'desc': '', 'img': '', 'object_position': None, 'sort_order': 37},
        {'id': 'rec_projects_19', 'year': '', 'car': 'Nissan GT-R Авдейко', 'telemetry': '11.372 сек • 205.13 км/ч', 'desc': '', 'img': '', 'object_position': None, 'sort_order': 38},
        {'id': 'rec_projects_08', 'year': '', 'car': 'BMW M4 Саркисян', 'telemetry': '11.438 сек • 195.28 км/ч', 'desc': '', 'img': '', 'object_position': None, 'sort_order': 39},
        {'id': 'rec_projects_16', 'year': '', 'car': 'Mercedes-Benz G63 AMG', 'telemetry': '11.648 сек • 186.58 км/ч', 'desc': '', 'img': '', 'object_position': None, 'sort_order': 40},
        {'id': 'rec_projects_17', 'year': '', 'car': 'Mercedes-Benz GLA45 AMG Перцхелия', 'telemetry': '11.768 сек • 186.48 км/ч', 'desc': '', 'img': '', 'object_position': None, 'sort_order': 41},
        {'id': 'rec_projects_47', 'year': '', 'car': 'Lamborghini Urus', 'telemetry': '11.856 сек • 191.74 км/ч', 'desc': '', 'img': '', 'object_position': None, 'sort_order': 42},
        {'id': 'rec_projects_48', 'year': '', 'car': 'Zeekr X', 'telemetry': '11.886 сек • 181.22 км/ч', 'desc': '', 'img': '', 'object_position': None, 'sort_order': 43},
        {'id': 'rec_projects_36', 'year': '', 'car': 'BMW M7', 'telemetry': '11.945 сек • 190.47 км/ч', 'desc': '', 'img': '', 'object_position': None, 'sort_order': 44},
        {'id': 'rec_projects_50', 'year': '', 'car': 'Волга КГБ', 'telemetry': '13.318 сек • 189.02 км/ч', 'desc': '', 'img': '', 'object_position': None, 'sort_order': 45},
        {'id': 'rec_gallardo', 'year': 'Мировой рекорд • 1 миля (1609 м)', 'car': 'LAMBORGHINI GALLARDO NERA TWIN TURBO', 'telemetry': '20.845 сек • 409.55 км/ч', 'desc': '', 'img': 'assets/archive_tilda/lamborghini_gallardo_nera.webp', 'object_position': None, 'sort_order': 46},
    ]
    for rec in default_records:
        cursor.execute(
            "INSERT OR REPLACE INTO records (id, year, car, telemetry, desc, img, sort_order, object_position) "
            "VALUES (:id, :year, :car, :telemetry, :desc, :img, :sort_order, :object_position)",
            rec,
        )

    default_gallery = [
        {"id": "gal_1", "tag": "RDRC CHAMPION", "title": "Huracan TT «Зеленка» GTT", "img": "assets/photos/huracan_zelenka_gtt.jpg"},
        {"id": "gal_2", "tag": "BURNOUT SMOKE", "title": "Dodge Demon", "img": "assets/cars/dodge_burnout_sunset.jpg"},
        {"id": "gal_3", "tag": "3000+ HP", "title": "Nissan GT-R R35 «Draco»", "img": "assets/cars/gtr_draco_promod_front.jpg"},
        {"id": "gal_4", "tag": "1400+ HP V10 TT", "title": "Audi R8 V10 Plus TT «Rokot»", "img": "assets/cars/audi_r8_tsmr_launch.jpg"},
        {"id": "gal_5", "tag": "CHAMPIONSHIP WINNER", "title": "Nissan GT-R R35 Lucifer", "img": "assets/cars/gtr_lucifer_solo.jpg"},
        {"id": "gal_7", "tag": "MIDNIGHT BLUE", "title": "Nissan GT-R R35 #888 Sunset Pass", "img": "assets/photos/gtr_blue_888_rdrc.jpg"},
        {"id": "gal_8", "tag": "CHIEF MOTORSPORT ENGINEER", "title": "Гоша Перцхелия на стрипе RDRC", "img": "assets/photos/gosha_on_track.jpg"},
        {"id": "gal_9", "tag": "ATELIER GARAGE", "title": "Бокс GTT: Паддок команды & Nissan GT-R", "img": "assets/cars/bmw_m5_paddock_front.jpg"},
        {"id": "gal_10", "tag": "TWIN TURBO V8", "title": "BMW M5 G90 GTT", "img": "assets/cars/bmw_m5_rdrc_race.jpg"},
        {"id": "gal_11", "tag": "TWIN TURBO V10", "title": "Huracan Twin Turbo «Зеленка» GTT", "img": "assets/cars/huracan_green_bezzubik_track.jpg"},
        {"id": "gal_12", "tag": "BILLET MOTORSPORT", "title": "VR38 Billet & Дрэг-подвеска", "img": "assets/cars/gtr_draco_connections.jpg"},
        {"id": "gal_13", "tag": "PARC FERMÉ", "title": "Пилот Саркисян & Draco GTT", "img": "assets/photos/pilot_draco_sarkisyan.jpg"},
        {"id": "gal_15", "tag": "RDRC BURNOUT", "title": "Challenger SRT // Облако дыма", "img": "assets/gallery/rdrc_challenger_burnout.jpg"},
        {"id": "gal_16", "tag": "1500+ HP V10 TT", "title": "Huracan TT на стартовом створе", "img": "assets/gallery/rdrc_lamborghini_green_front.jpg"},
        {"id": "gal_17", "tag": "TITANIUM CRAFT", "title": "GT-R R35 // GTT Titanium Exhaust", "img": "assets/gallery/rdrc_gtr_rear_exhaust.jpg"},
        {"id": "gal_18", "tag": "GTT MOTORSPORT BOX", "title": "Паддок GTT: BMW M5 G90 & GT-R", "img": "assets/gallery/rdrc_paddock_bmw_m5_gtr.jpg"},
        {"id": "gal_19", "tag": "TWIN V10 ARSENAL", "title": "Пара Lamborghini Huracan TT GTT", "img": "assets/gallery/rdrc_lamborghinis_pair_paddock.jpg"}
    ]
    for idx, gal in enumerate(default_gallery):
        cursor.execute("INSERT OR REPLACE INTO gallery (id, tag, title, img, sort_order) VALUES (?, ?, ?, ?, ?)",
                       (gal["id"], gal["tag"], gal["title"], gal["img"], idx + 1))

    default_media = [
        {"id": "med_1", "title": "Гоша на своем боевом GT-R Lucifer RDRC", "type": "mp4", "url": "assets/videos/gosha_na_svoem_lucifer_web.mp4", "car": "GT-R Lucifer"},
        {"id": "med_2", "title": "Боевой синий GT-R #888 заезд RDRC", "type": "mp4", "url": "assets/videos/gtr_blue_888_pass_web.mp4", "car": "GT-R Blue 888"},
        {"id": "med_4", "title": "Дымный бернаут Dodge Hellcat RDRC", "type": "mp4", "url": "assets/videos/dodge_challenger_action.mp4", "car": "Dodge Challenger SRT"},
        {"id": "med_5", "title": "Huracan «Зеленка» Twin Turbo прогрев", "type": "mp4", "url": "assets/videos/r8_launch_action.mp4", "car": "Huracan Зеленка"}
    ]
    for idx, med in enumerate(default_media):
        cursor.execute("INSERT OR REPLACE INTO media (id, title, type, url, car, sort_order) VALUES (?, ?, ?, ?, ?, ?)",
                       (med["id"], med["title"], med["type"], med["url"], med["car"], idx + 1))

# ================= CRUD FUNCTIONS =================

# --- Cars ---
def get_all_cars() -> List[Dict[str, Any]]:
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM cars ORDER BY (CASE WHEN hp = '?' OR img IS NULL OR img = '' THEN 1 ELSE 0 END) ASC, sort_order ASC, rowid ASC")
        rows = cursor.fetchall()
        cars = []
        for r in rows:
            car = dict(r)
            if car.get("specs_json"):
                try:
                    car["specs"] = json.loads(car["specs_json"])
                except:
                    car["specs"] = {}
            else:
                car["specs"] = {}
 # Provide camelCase aliases for JS frontend compatibility
            car["nameRu"] = car.get("name_ru")
            car["nameEn"] = car.get("name_en")
            car["quarterMile"] = car.get("quarter_mile")
            car["topSpeed"] = car.get("top_speed")
            car["videoSrc"] = car.get("video_src")
            car["videoTitle"] = car.get("video_title")
            car["descRu"] = car.get("desc_ru")
            car["descEn"] = car.get("desc_en")
            car["fallbackImg"] = car.get("fallback_img")
            car["isPhoto"] = bool(car.get("is_photo", 1))
            car["objectPosition"] = car.get("object_position", "center center")
            car["isFeatured"] = bool(car.get("is_featured", 0))
            car["is_featured"] = int(car.get("is_featured", 0))
            car["category"] = car.get("category", "race") or "race"
            car["isPublished"] = bool(car.get("is_published", 1))
            car["is_published"] = int(car.get("is_published", 1))
            car["completeness"] = int(car.get("completeness", 100) or 100)
            cars.append(car)
    return cars

def get_car_by_id(car_id: str) -> Optional[Dict[str, Any]]:
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM cars WHERE id = ?", (car_id,))
        row = cursor.fetchone()
    if not row:
        return None
    car = dict(row)
    try:
        car["specs"] = json.loads(car.get("specs_json", "{}"))
    except:
        car["specs"] = {}
    car["nameRu"] = car.get("name_ru")
    car["nameEn"] = car.get("name_en")
    car["quarterMile"] = car.get("quarter_mile")
    car["topSpeed"] = car.get("top_speed")
    car["videoSrc"] = car.get("video_src")
    car["videoTitle"] = car.get("video_title")
    car["descRu"] = car.get("desc_ru")
    car["descEn"] = car.get("desc_en")
    car["fallbackImg"] = car.get("fallback_img")
    car["isPhoto"] = bool(car.get("is_photo", 1))
    car["objectPosition"] = car.get("object_position", "center center")
    car["isFeatured"] = bool(car.get("is_featured", 0))
    car["is_featured"] = int(car.get("is_featured", 0))
    car["category"] = car.get("category", "race") or "race"
    car["isPublished"] = bool(car.get("is_published", 1))
    car["is_published"] = int(car.get("is_published", 1))
    car["completeness"] = int(car.get("completeness", 100) or 100)
    return car

def calculate_car_completeness(car_data: Dict[str, Any]) -> int:
    score = 0
 # Name (20%)
    name = (car_data.get("name_ru") or car_data.get("nameRu") or "").strip()
    if name: score += 20
 # Brand (10%)
    brand = (car_data.get("brand") or "").strip()
    if brand: score += 10
 # Image (30%) - must not be placeholder or empty
    img = (car_data.get("img") or "").strip()
    if img and not "classified" in img and not img.endswith(".svg"):
        score += 30
    elif img:
        score += 10
 # Specs: hp (15%)
    hp = (car_data.get("hp") or "").strip()
    if hp and hp != "?": score += 15
 # Technical specs object / items (15%)
    specs = car_data.get("specs") or {}
    if isinstance(specs, str):
        try: specs = json.loads(specs)
        except: specs = {}
    if specs and len(specs) >= 2: score += 15
    elif specs and len(specs) >= 1: score += 8
 # Description (10%)
    desc = (car_data.get("desc_ru") or car_data.get("descRu") or "").strip()
    if desc: score += 10
    return min(100, score)

def upsert_car(car_data: Dict[str, Any]) -> Dict[str, Any]:
    with get_db() as conn:
        cursor = conn.cursor()

 # If updating an existing car, merge with existing fields to prevent overwriting with blanks
        cursor.execute("SELECT * FROM cars WHERE id = ?", (car_data.get("id", ""),))
        existing_row = cursor.fetchone()
        if existing_row:
            existing = dict(existing_row)
            for k, v in existing.items():
                if k not in car_data:
                    car_data[k] = v

        specs = car_data.get("specs", {})
        if isinstance(specs, str):
            specs_json = specs
        else:
            specs_json = json.dumps(specs)
    
        is_photo_val = 1
        if "is_photo" in car_data:
            is_photo_val = 1 if car_data["is_photo"] else 0
        elif "isPhoto" in car_data:
            is_photo_val = 1 if car_data["isPhoto"] else 0

        obj_pos = car_data.get("object_position", car_data.get("objectPosition", "center center"))
        if not obj_pos:
            obj_pos = "center center"

        cursor.execute("""
        INSERT INTO cars (
            id, brand, type, name_ru, name_en, tag_ru, tag_en, hp, quarter_mile, top_speed,
            badge_ru, badge_en, img, fallback_img, is_photo, object_position, video_src, video_title, desc_ru, desc_en, specs_json
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
            brand=excluded.brand,
            type=excluded.type,
            name_ru=excluded.name_ru,
            name_en=excluded.name_en,
            tag_ru=excluded.tag_ru,
            tag_en=excluded.tag_en,
            hp=excluded.hp,
            quarter_mile=excluded.quarter_mile,
            top_speed=excluded.top_speed,
            badge_ru=excluded.badge_ru,
            badge_en=excluded.badge_en,
            img=excluded.img,
            fallback_img=excluded.fallback_img,
            is_photo=excluded.is_photo,
            object_position=excluded.object_position,
            video_src=excluded.video_src,
            video_title=excluded.video_title,
            desc_ru=excluded.desc_ru,
            desc_en=excluded.desc_en,
            specs_json=excluded.specs_json
        """, (
            car_data["id"],
            car_data.get("brand", ""),
            car_data.get("type", "other"),
            car_data.get("name_ru", car_data.get("nameRu", "")),
            car_data.get("name_en", car_data.get("nameEn", car_data.get("name_ru", ""))),
            car_data.get("tag_ru", "RDRC БОЛИД"),
            car_data.get("tag_en", "RDRC CAR"),
            car_data.get("hp", ""),
            car_data.get("quarter_mile", car_data.get("quarterMile", "")),
            car_data.get("top_speed", car_data.get("topSpeed", "")),
            car_data.get("badge_ru", "GTT Spec"),
            car_data.get("badge_en", "GTT Spec"),
            car_data.get("img", ""),
            car_data.get("fallback_img", car_data.get("fallbackImg", car_data.get("img", ""))),
            is_photo_val,
            obj_pos,
            car_data.get("video_src", car_data.get("videoSrc", "")),
            car_data.get("video_title", car_data.get("videoTitle", "")),
            car_data.get("desc_ru", car_data.get("descRu", "")),
            car_data.get("desc_en", car_data.get("descEn", "")),
            specs_json
        ))
        if "is_featured" in car_data or "isFeatured" in car_data:
            feat_raw = car_data.get("is_featured", car_data.get("isFeatured", 0))
            feat_val = 1 if (feat_raw == 1 or feat_raw is True or feat_raw == '1') else 0
            cursor.execute("UPDATE cars SET is_featured = ? WHERE id = ?", (feat_val, car_data["id"]))
        if "category" in car_data:
            cat_val = str(car_data["category"]).strip().lower()
            if cat_val not in ("race", "street"): cat_val = "race"
            cursor.execute("UPDATE cars SET category = ? WHERE id = ?", (cat_val, car_data["id"]))
        if "is_published" in car_data or "isPublished" in car_data:
            pub_raw = car_data.get("is_published", car_data.get("isPublished", 1))
            pub_val = 1 if (pub_raw == 1 or pub_raw is True or pub_raw == '1' or pub_raw == 'true') else 0
            cursor.execute("UPDATE cars SET is_published = ? WHERE id = ?", (pub_val, car_data["id"]))
    
 # Calculate and store completeness score
        score = calculate_car_completeness(car_data)
        cursor.execute("UPDATE cars SET completeness = ? WHERE id = ?", (score, car_data["id"]))

        if "sort_order" in car_data or "sortOrder" in car_data:
            try:
                so_val = int(car_data.get("sort_order", car_data.get("sortOrder", 0)) or 0)
                cursor.execute("UPDATE cars SET sort_order = ? WHERE id = ?", (so_val, car_data["id"]))
            except Exception:
                pass
        conn.commit()
    try:
        sync_all_json_caches()
    except Exception:
        pass
    return get_car_by_id(car_data["id"])

# ================= PERSISTENT SESSIONS (HASHED) =================
def create_session(token: str, username: str, lifetime_seconds: float = 12 * 3600) -> str:
    now = time.time()
    expires_at = now + lifetime_seconds
    thash = hash_token(token)
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM admin_sessions WHERE expires_at < ?", (now,))
        cursor.execute("""
        INSERT INTO admin_sessions (token, username, expires_at)
        VALUES (?, ?, ?)
        ON CONFLICT(token) DO UPDATE SET expires_at=excluded.expires_at
        """, (thash, username, expires_at))
        conn.commit()
    return token


def get_session(token: str) -> Optional[Dict[str, Any]]:
    if not token or len(token) < 20:
        return None
    now = time.time()
    thash = hash_token(token)
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT token, username, expires_at FROM admin_sessions WHERE token = ?", (thash,))
        row = cursor.fetchone()
        if row:
            if row[2] > now:
                return {"token_hash": row[0], "username": row[1], "expires_at": row[2]}
            cursor.execute("DELETE FROM admin_sessions WHERE token = ?", (thash,))
            conn.commit()
    return None


def touch_session(token: str, lifetime_seconds: float = 12 * 3600):
    if not token:
        return
    now = time.time()
    expires_at = now + lifetime_seconds
    thash = hash_token(token)
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("UPDATE admin_sessions SET expires_at = ? WHERE token = ?", (expires_at, thash))
        conn.commit()


def delete_session(token: str):
    if not token:
        return
    thash = hash_token(token)
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM admin_sessions WHERE token = ?", (thash,))
        conn.commit()


def clean_expired_db_sessions():
    now = time.time()
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM admin_sessions WHERE expires_at < ?", (now,))
        conn.commit()


def revoke_all_sessions():
    with get_db() as conn:
        conn.execute("DELETE FROM admin_sessions")
        conn.commit()

def delete_car(car_id: str) -> bool:
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM cars WHERE id = ?", (car_id,))
        deleted = cursor.rowcount > 0
        conn.commit()
    try:
        sync_all_json_caches()
    except Exception:
        pass
    return deleted

def reorder_featured_cars(featured_ids: List[str]) -> bool:
    if not featured_ids or len(featured_ids) < 1:
        return False
    try:
        with get_db() as conn:
            cursor = conn.cursor()
            cursor.execute("UPDATE cars SET is_featured = 0")
            for idx, car_id in enumerate(featured_ids):
                cursor.execute("UPDATE cars SET sort_order = ?, is_featured = 1 WHERE id = ?", (idx + 1, car_id))
            placeholders = ','.join('?' for _ in featured_ids)
            cursor.execute(f"SELECT id FROM cars WHERE id NOT IN ({placeholders}) ORDER BY sort_order ASC, rowid ASC", featured_ids)
            remaining = cursor.fetchall()
            for idx, r in enumerate(remaining):
                cursor.execute("UPDATE cars SET sort_order = ?, is_featured = 0 WHERE id = ?", (len(featured_ids) + 1 + idx, r[0]))
            conn.commit()
    except Exception as e:
        print(f"[GTT DB Error] Reorder featured: {e}")
        return False
    try:
        sync_all_json_caches()
    except Exception:
        pass
    return True


def reorder_all_cars(car_ids: List[str]) -> bool:
    if not car_ids or len(car_ids) < 1:
        return False
    try:
        with get_db() as conn:
            cursor = conn.cursor()
            for idx, car_id in enumerate(car_ids):
                cursor.execute("UPDATE cars SET sort_order = ? WHERE id = ?", (idx + 1, car_id))
            conn.commit()
    except Exception as e:
        print(f"[GTT DB Error] Reorder all cars: {e}")
        return False
    try:
        sync_all_json_caches()
    except Exception:
        pass
    return True

# --- Team ---
def get_all_team() -> List[Dict[str, Any]]:
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM team ORDER BY sort_order ASC, rowid ASC")
        rows = []
        for r in cursor.fetchall():
            d = dict(r)
            if not d.get("object_position"):
                d["object_position"] = "center 20%"
            d["objectPosition"] = d["object_position"]
            rows.append(d)
    return rows

def upsert_team_member(member: Dict[str, Any]) -> Dict[str, Any]:
    with get_db() as conn:
        cursor = conn.cursor()
        obj_pos = member.get("object_position") or member.get("objectPosition") or "center 20%"
        cursor.execute("""
        INSERT INTO team (id, name, role, status, photo, social, sort_order, name_en, role_en, dept, object_position)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
            name=excluded.name,
            role=excluded.role,
            status=excluded.status,
            photo=excluded.photo,
            social=excluded.social,
            sort_order=COALESCE(excluded.sort_order, team.sort_order),
            name_en=COALESCE(excluded.name_en, team.name_en),
            role_en=COALESCE(excluded.role_en, team.role_en),
            dept=COALESCE(excluded.dept, team.dept),
            object_position=COALESCE(excluded.object_position, team.object_position)
        """, (
            member["id"],
            member["name"],
            member["role"],
            member.get("status", "active"),
            member.get("photo", "") if member.get("photo") is not None else "",
            member.get("social", "") if member.get("social") is not None else "",
            member.get("sort_order"),
            member.get("name_en", ""),
            member.get("role_en", ""),
            member.get("dept", ""),
            obj_pos
        ))
        conn.commit()
    member["object_position"] = obj_pos
    member["objectPosition"] = obj_pos
    try:
        sync_all_json_caches()
    except Exception:
        pass
    return member

def delete_team_member(member_id: str) -> bool:
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM team WHERE id = ?", (member_id,))
        deleted = cursor.rowcount > 0
        conn.commit()
    try:
        sync_all_json_caches()
    except Exception:
        pass
    return deleted

# --- Records ---
def get_all_records() -> List[Dict[str, Any]]:
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM records ORDER BY sort_order ASC, rowid ASC")
        rows = [dict(r) for r in cursor.fetchall()]
    return rows

def upsert_record(record: Dict[str, Any]) -> Dict[str, Any]:
    with get_db() as conn:
        cursor = conn.cursor()
        obj_pos = record.get("object_position", record.get("objectPosition", "center center"))
        cursor.execute("""
        INSERT INTO records (id, year, car, telemetry, desc, img, object_position)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
            year=excluded.year,
            car=excluded.car,
            telemetry=excluded.telemetry,
            desc=excluded.desc,
            img=excluded.img,
            object_position=excluded.object_position
        """, (record["id"], record["year"], record["car"], record["telemetry"], record.get("desc", ""), record.get("img", ""), obj_pos))
        conn.commit()
    try:
        sync_all_json_caches()
    except Exception:
        pass
    return record

def delete_record(record_id: str) -> bool:
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM records WHERE id = ?", (record_id,))
        deleted = cursor.rowcount > 0
        conn.commit()
    try:
        sync_all_json_caches()
    except Exception:
        pass
    return deleted

# --- Gallery ---
def get_all_gallery() -> List[Dict[str, Any]]:
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM gallery ORDER BY sort_order ASC, rowid ASC")
        rows = [dict(r) for r in cursor.fetchall()]
    return rows

def upsert_gallery(item: Dict[str, Any]) -> Dict[str, Any]:
    with get_db() as conn:
        cursor = conn.cursor()
        obj_pos = item.get("object_position") or item.get("objectPosition") or "center 50%"
        cursor.execute("""
        INSERT INTO gallery (id, tag, title, img, object_position)
        VALUES (?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
            tag=excluded.tag,
            title=excluded.title,
            img=excluded.img,
            object_position=excluded.object_position
        """, (item["id"], item["tag"], item["title"], item["img"], obj_pos))
        conn.commit()
    try:
        sync_all_json_caches()
    except Exception:
        pass
    item["object_position"] = obj_pos
    return item

def delete_gallery(item_id: str) -> bool:
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM gallery WHERE id = ?", (item_id,))
        deleted = cursor.rowcount > 0
        conn.commit()
    try:
        sync_all_json_caches()
    except Exception:
        pass
    return deleted

# --- Media ---
def get_all_media() -> List[Dict[str, Any]]:
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM media ORDER BY sort_order ASC, rowid ASC")
        rows = [dict(r) for r in cursor.fetchall()]
    return rows

def upsert_media(item: Dict[str, Any]) -> Dict[str, Any]:
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("""
        INSERT INTO media (id, title, type, url, car)
        VALUES (?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
            title=excluded.title,
            type=excluded.type,
            url=excluded.url,
            car=excluded.car
        """, (item["id"], item["title"], item["type"], item["url"], item["car"]))
        conn.commit()
    try:
        sync_all_json_caches()
    except Exception:
        pass
    return item

def delete_media(item_id: str) -> bool:
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM media WHERE id = ?", (item_id,))
        deleted = cursor.rowcount > 0
        conn.commit()
    try:
        sync_all_json_caches()
    except Exception:
        pass
    return deleted

# --- Settings ---
def get_setting(key: str, default: str = "") -> str:
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT value FROM settings WHERE key = ?", (key,))
        row = cursor.fetchone()
    return row[0] if row else default

def set_setting(key: str, value: str):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value", (key, value))
        conn.commit()
    try:
        sync_all_json_caches()
    except Exception:
        pass

# --- Traffic Analytics ---
def record_traffic(device: str, source: str, page: str, is_new: bool = True):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("""
        INSERT INTO traffic_logs (device, source, page, is_new_session)
        VALUES (?, ?, ?, ?)
        """, (device, source, page, 1 if is_new else 0))
        conn.commit()

def get_traffic_summary() -> Dict[str, Any]:
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT COUNT(*) FROM traffic_logs")
        total_views = cursor.fetchone()[0]

        cursor.execute("SELECT COUNT(*) FROM traffic_logs WHERE is_new_session = 1")
        unique_visitors = cursor.fetchone()[0]

        cursor.execute("SELECT COUNT(*) FROM traffic_logs WHERE date(created_at) = date('now')")
        today_views = cursor.fetchone()[0]

        cursor.execute("""
        SELECT id, strftime('%H:%M:%S', created_at) as time,
               strftime('%d.%m.%Y', created_at) as date,
               device, source, page, is_new_session
        FROM traffic_logs ORDER BY id DESC LIMIT 25
        """)
        logs = [dict(r) for r in cursor.fetchall()]

    return {
        "totalViews": total_views,
        "uniqueVisitors": unique_visitors,
        "todayViews": today_views,
        "log": logs
    }

def reset_traffic():
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM traffic_logs")
        conn.commit()

# --- Technical & Motorsport Partners ---
DEFAULT_PARTNERS = [
    {
        "id": "rog",
        "name": "Republic of Gamers",
        "category": "Телеметрия & Электроника",
        "desc": "Высокопроизводительные аппаратные комплексы, ноутбуки и системы сбора телеметрии для настройки гоночных болидов на треке и стенде.",
        "logo": "assets/partners/rog.png",
        "link": "https://rog.asus.com",
        "sort_order": 1,
        "is_active": 1
    },
    {
        "id": "toys_detailing",
        "name": "Toys Detailing",
        "category": "Детейлинг & Защита",
        "desc": "Премиальный детейлинг, керамические покрытия, полировка и защитные антигравийные пленки для шоу-каров и гоночных болидов GTT.",
        "logo": "assets/partners/toys_detailing.png",
        "link": "https://toysdetailing.ru",
        "sort_order": 2,
        "is_active": 1
    },
    {
        "id": "felix_ferro",
        "name": "Felix Ferro",
        "category": "Интерьер & Стиль",
        "desc": "Эксклюзивные кастомные аксессуары, ювелирные ключи зажигания и титановые эмблемы ручной работы для флагманских проектов GoshaTurboTech.",
        "logo": "assets/partners/felix_ferro.png",
        "link": "https://felixferro.com",
        "sort_order": 3,
        "is_active": 1
    },
    {
        "id": "vp_racing",
        "name": "VP Racing Fuels",
        "category": "Топливо & Метанол",
        "desc": "Мировой эталон спортивного топлива, гоночного кислородного бензина и чистого метанола M1 для рекордных заездов RDRC.",
        "logo": "assets/partners/vp_racing.png",
        "link": "https://vpracingfuels.com",
        "sort_order": 4,
        "is_active": 1
    },
    {
        "id": "je_pistons",
        "name": "JE Pistons",
        "category": "Кованая поршневая",
        "desc": "Сверхпрочные кованые гоночные поршни для экстремального давления наддува и мощностей свыше 2,000+ л.с. в моторах VR38DETT и V10.",
        "logo": "assets/partners/je_pistons.png",
        "link": "https://jepistons.com",
        "sort_order": 5,
        "is_active": 1
    },
    {
        "id": "link_ecu",
        "name": "Link Engine Management",
        "category": "Электроника & ЭБУ",
        "desc": "Спортивные блоки управления двигателем (ECU), даталоггеры и цифровые приборные панели для абсолютного контроля над силовой установкой.",
        "logo": "assets/partners/link_ecu.png",
        "link": "https://linkecu.com",
        "sort_order": 6,
        "is_active": 1
    },
    {
        "id": "mainline_dyno",
        "name": "Mainline DynoLog",
        "category": "Диностенды & Замеры",
        "desc": "Профессиональные колесные и ступичные мощностные стенды высокой точности для калибровки и снятия графиков болидов до 3000 л.с.",
        "logo": "assets/partners/mainline_dyno.png",
        "link": "https://mainlinedyno.com.au",
        "sort_order": 7,
        "is_active": 1
    },
    {
        "id": "redline_oil",
        "name": "Red Line Synthetic Oil",
        "category": "Смазочные материалы",
        "desc": "Специализированные трансмиссионные жидкости ShockProof и гоночные присадки для дифференциалов повышенного трения и раздаточных коробок.",
        "logo": "assets/partners/redline_oil.png",
        "link": "https://redlineoil.com",
        "sort_order": 8,
        "is_active": 1
    },
    {
        "id": "syvecs",
        "name": "Syvecs Powertrain Control",
        "category": "Электроника & ЭБУ",
        "desc": "Топовые блоки управления двигателем (ECU), полноприводной трансмиссией (AWD Controller) и прецизионными алгоритмами лаунч-контроля.",
        "logo": "assets/partners/syvecs.png",
        "link": "https://syvecs.com",
        "sort_order": 9,
        "is_active": 1
    },
    {
        "id": "plazmaman",
        "name": "Plazmaman Pro Billet",
        "category": "Впуск & Охлаждение",
        "desc": "Фрезерованные из авиационного алюминиевого монолита впускные коллекторы и интеркулеры для экстремальных моторов VR38DETT и V10.",
        "logo": "assets/partners/plazmaman.png",
        "link": "https://plazmaman.com",
        "sort_order": 10,
        "is_active": 1
    },
    {
        "id": "ppg_gearboxes",
        "name": "PPG (Pfitzner Gearboxes)",
        "category": "Трансмиссия & КПП",
        "desc": "Усиленные прямозубые кулачковые и секвентальные ряды передач, выдерживающие колоссальный крутящий момент и агрессивные переключения.",
        "logo": "assets/partners/ppg_gearboxes.png",
        "link": "https://ppgearbox.com.au",
        "sort_order": 11,
        "is_active": 1
    },
    {
        "id": "ticon_titanium",
        "name": "Ticon Titanium",
        "category": "Титановые компоненты",
        "desc": "Высококлассные титановые трубы, конусы, фланцы и отводы для создания сверхлегких термостойких выхлопных систем GoshaTurboTech.",
        "logo": "assets/partners/ticon_titanium.png",
        "link": "https://ticontitanium.com",
        "sort_order": 12,
        "is_active": 1
    },
    {
        "id": "cobb_tuning",
        "name": "COBB Tuning",
        "category": "Калибровка & Софт",
        "desc": "Программно-аппаратные комплексы Accessport для быстрой смены карт калибровки, перепрошивки блоков управления и скоростного логирования.",
        "logo": "assets/partners/cobb_tuning.png",
        "link": "https://cobbtuning.com",
        "sort_order": 13,
        "is_active": 1
    },
    {
        "id": "bell_intercoolers",
        "name": "Bell Intercoolers",
        "category": "Охлаждение & Впуск",
        "desc": "Высокоэффективные теплообменники и кастомные интеркулерные ядра с минимальным сопротивлением для мощных турбосистем.",
        "logo": "assets/partners/bell_intercoolers.png",
        "link": "https://bellintercoolers.com",
        "sort_order": 14,
        "is_active": 1
    },
    {
        "id": "armytrix",
        "name": "Armytrix",
        "category": "Выхлопные системы",
        "desc": "Премиальные регулируемые титановые и нержавеющие выхлопные системы Valvetronic с дистанционным управлением звуком через приложение.",
        "logo": "assets/partners/armytrix.png",
        "link": "https://armytrix.com",
        "sort_order": 15,
        "is_active": 1
    },
    {
        "id": "ecutek",
        "name": "Ecutek Technology",
        "category": "Электроника & ЭБУ",
        "desc": "Передовое программное обеспечение для глубокой инженерной калибровки заводских блоков управления Nissan GT-R, BMW и суперкаров.",
        "logo": "assets/partners/ecutek.png",
        "link": "https://ecutek.com",
        "sort_order": 16,
        "is_active": 1
    },
    {
        "id": "precision_turbo",
        "name": "Precision Turbo & Engine",
        "category": "Турбосистемы",
        "desc": "Специализированные гоночные турбокомпрессоры сверхвысокого наддува серии Pro Mod и GEN2 CEA, обеспечивающие отдачу до 3,500+ л.с.",
        "logo": "assets/partners/precision_turbo.png",
        "link": "https://precisionturbo.net",
        "sort_order": 17,
        "is_active": 1
    },
    {
        "id": "motec",
        "name": "MoTeC Systems",
        "category": "Электроника & ЭБУ",
        "desc": "Золотой стандарт мирового автоспорта: управляющие процессоры M1, цветные цифровые дисплеи C1212 и прецизионные логгеры телеметрии.",
        "logo": "assets/partners/motec.png",
        "link": "https://motec.com.au",
        "sort_order": 18,
        "is_active": 1
    },
    {
        "id": "motul",
        "name": "Motul Motorsport",
        "category": "Смазочные материалы",
        "desc": "Синтетические моторные масла Motul 300V Motorsport Line с технологией Ester Core, защищающие 2000+ сильные моторы GTT при пиковых нагрузках.",
        "logo": "assets/partners/motul.png",
        "link": "https://motul.com",
        "sort_order": 19,
        "is_active": 1
    },
    {
        "id": "injector_dynamics",
        "name": "Injector Dynamics",
        "category": "Топливные форсунки",
        "desc": "Прецизионные спортивные топливные форсунки с динамическим подбором баланса подачи для абсолютной стабильности топливовоздушной смеси.",
        "logo": "assets/partners/injector_dynamics.png",
        "link": "https://injectordynamics.com",
        "sort_order": 20,
        "is_active": 1
    },
    {
        "id": "dodson_motorsport",
        "name": "Dodson Motorsport",
        "category": "Сцепления & Трансмиссия",
        "desc": "Усиленные многодисковые сцепления, шестерни и гидравлика для роботизированных коробок передач GR6 (GT-R) и DL800 (R8/Huracan).",
        "logo": "assets/partners/dodson_motorsport.png",
        "link": "https://dodsonmotorsport.com",
        "sort_order": 21,
        "is_active": 1
    },
    {
        "id": "t1_race",
        "name": "T1 Race Development",
        "category": "Топливные системы",
        "desc": "Прецизионные компоненты топливной магистрали, вентиляции картера и силовые инженерные узлы для быстрейших суперкаров мира.",
        "logo": "assets/partners/t1_race.png",
        "link": "https://t1racedevelopment.com",
        "sort_order": 22,
        "is_active": 1
    },
    {
        "id": "csf_radiators",
        "name": "CSF Radiators",
        "category": "Охлаждение & Радиаторы",
        "desc": "Высокопроизводительные цельноалюминиевые радиаторы охлаждения ДВС, масляные радиаторы и теплообменники для экстремальных нагрузок.",
        "logo": "assets/partners/csf_radiators.png",
        "link": "https://csfradiators.com",
        "sort_order": 23,
        "is_active": 1
    },
    {
        "id": "dragtimes",
        "name": "Dragtimes",
        "category": "Медиа & Суперкары",
        "desc": "Крупнейшее медиа-сообщество суперкаров и дрэг-рейсинга, организатор всероссийских заездов на 1/2 мили и хронометража рекордов.",
        "logo": "assets/partners/dragtimes.png",
        "link": "https://dragtimes.ru",
        "sort_order": 24,
        "is_active": 1
    },
    {
        "id": "rdrc_racepark",
        "name": "RDRC Racepark",
        "category": "Автоспорт & Трассы",
        "desc": "Главный дрэг-стрип страны и организатор Чемпионата России по дрэг-рейсингу RDRC в Быково, где GTT ставит официальные рекорды скорости.",
        "logo": "assets/partners/rdrc_racepark.png",
        "link": "https://rdrc.ru",
        "sort_order": 25,
        "is_active": 1
    },
    {
        "id": "dsc_off",
        "name": "DSC OFF",
        "category": "Медиа & Хроника",
        "desc": "Автоспортивный медиа-проект Гурама Инцкирвели, подробно освещающий постройку и боевые заезды быстрейших суперкаров GoshaTurboTech.",
        "logo": "assets/partners/dsc_off.png",
        "link": "https://youtube.com/@dscoff",
        "sort_order": 26,
        "is_active": 1
    },
    {
        "id": "pride_jfc",
        "name": "Pride JFC",
        "category": "Автоспорт & Стиль",
        "desc": "Официальный партнерский клуб и спортивная лига, разделяющая философию бескомпромиссной борьбы за первенство и победы.",
        "logo": "assets/partners/pride_jfc.png",
        "link": "https://goshaturbotech.ru",
        "sort_order": 27,
        "is_active": 1
    },
    {
        "id": "deikin_exhaust",
        "name": "Deikin Exhaust",
        "category": "Выхлопные системы",
        "desc": "Индивидуальное проектирование и ручная аргонная TIG-сварка спортивных выхлопных систем из титана Grade 5 и жаропрочного Inconel.",
        "logo": "assets/partners/deikin_exhaust.png",
        "link": "https://goshaturbotech.ru",
        "sort_order": 28,
        "is_active": 1
    },
    {
        "id": "ams_performance",
        "name": "AMS Performance",
        "category": "Турбосистемы & Alpha Packages",
        "desc": "Легендарный мировой разработчик рекордных турбо-китов Alpha для Nissan GT-R R35, Audi R8 V10 и Lamborghini Huracan со статусом мировых рекордов 1/4 мили.",
        "logo": "assets/partners/ams_performance.png",
        "link": "https://www.amsperformance.com/",
        "sort_order": 29,
        "is_active": 1
    },
    {
        "id": "real_street",
        "name": "Real Street Performance",
        "category": "Компоненты ДВС & Автоспорт",
        "desc": "Американский инженерный центр и дистрибьютор топовых компонентов ЦПГ, кованых шатунов, коленвалов и клапанных механизмов для 1500+ л.с. моторов.",
        "logo": "assets/partners/real_street.png",
        "link": "https://www.realstreetperformance.com/",
        "sort_order": 30,
        "is_active": 1
    },
    {
        "id": "high_horse",
        "name": "High Horse Performance",
        "category": "HEMI & Дрэг-Тюнинг",
        "desc": "Мировой лидер в подготовке и постройке рекордных двигателей Dodge HEMI Gen III, компрессорных пакетов Hellcat/Demon и трансмиссий для дрэг-рейсинга.",
        "logo": "assets/partners/high_horse.png",
        "link": "https://highhorseperformance.com/",
        "sort_order": 31,
        "is_active": 1
    },
    {
        "id": "platinum_racing",
        "name": "Platinum Racing Products",
        "category": "Billet-инженерия & Зажигание",
        "desc": "Австралийский производитель прецизионных фрезерованных billet-компонентов из авиационного алюминия, триггерных комплектов R35 coil kit и масляных систем.",
        "logo": "assets/partners/platinum_racing.png",
        "link": "https://platinumracingproducts.com/",
        "sort_order": 32,
        "is_active": 1
    }
]

def seed_default_partners(cursor):
    for p in DEFAULT_PARTNERS:
        cursor.execute("""
        INSERT INTO partners (id, name, category, desc, logo, link, sort_order, is_active)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
            name = excluded.name,
            desc = excluded.desc,
            logo = excluded.logo,
            link = excluded.link,
            category = excluded.category,
            sort_order = excluded.sort_order,
            is_active = excluded.is_active
        """, (
            p["id"],
            p["name"],
            p["category"],
            p["desc"],
            p["logo"],
            p["link"],
            p["sort_order"],
            p["is_active"]
        ))

def get_all_partners() -> List[Dict[str, Any]]:
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM partners ORDER BY sort_order ASC, rowid ASC")
        rows = [dict(r) for r in cursor.fetchall()]
    return rows

def get_partner(partner_id: str) -> Optional[Dict[str, Any]]:
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM partners WHERE id = ?", (partner_id,))
        row = cursor.fetchone()
    return dict(row) if row else None

def upsert_partner(item: Dict[str, Any]) -> Dict[str, Any]:
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("""
        INSERT INTO partners (id, name, category, desc, logo, link, sort_order, is_active)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
            name=excluded.name,
            category=excluded.category,
            desc=excluded.desc,
            logo=excluded.logo,
            link=excluded.link,
            sort_order=excluded.sort_order,
            is_active=excluded.is_active
        """, (
            item["id"],
            item["name"],
            item.get("category", "Технические партнеры"),
            item.get("desc", ""),
            item.get("logo", ""),
            item.get("link", "#"),
            int(item.get("sort_order", 0)),
            int(item.get("is_active", 1))
        ))
        conn.commit()
    try:
        sync_all_json_caches()
    except Exception:
        pass
    return item

def delete_partner(partner_id: str) -> bool:
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM partners WHERE id = ?", (partner_id,))
        deleted = cursor.rowcount > 0
        conn.commit()
    try:
        sync_all_json_caches()
    except Exception:
        pass
    return deleted

# ================= MOTO DIVISION METHODS =================

def seed_default_moto(cursor):
    default_moto = [
        {
            "id": "moto_bmw_m1000rr",
            "title": "BMW M 1000 RR",
            "code": "BMW MOTORSPORT // M-PERFORMANCE",
            "desc": "Флагманский супербайк литрового класса. 4-цилиндровый двигатель BMW ShiftCam, титановая выпускная трасса Akrapovič, карбоновые аэродинамические винглеты M-Winglets и комплексная трековая калибровка блока управления.",
            "bullets": "212 л.с. // 14 500 об/мин\nКарбоновые винглеты M-Winglets\nСухой вес 170 кг",
            "img": "",
            "sort_order": 1,
            "is_active": 1
        },
        {
            "id": "moto_ducati_v4s",
            "title": "Ducati Panigale V4 S",
            "code": "BORGO PANIGALE // DESMOSEDICI",
            "desc": "Итальянский трековый шедевр с мотором Desmosedici Stradale V4 1103 см³. Активная электронная подвеска Öhlins Smart EC 2.0, сухое сцепление STM EVO и титановый спортивный выпуск.",
            "bullets": "215.5 л.с. // 13 000 об/мин\nПодвеска Öhlins Smart EC 2.0\nСухое гоночное сцепление",
            "img": "",
            "sort_order": 2,
            "is_active": 1
        },
        {
            "id": "moto_mv_superveloce_800",
            "title": "MV Agusta Superveloce 800",
            "code": "SCHIRANNA // NEO-RETRO RACER",
            "desc": "Эксклюзивный нео-классический спортбайк. Трехцилиндровый двигатель с противовращающимся коленвалом, фирменный выпуск SC-Project, кастомные фрезерованные детали и утонченная аэродинамика.",
            "bullets": "147 л.с. // 13 000 об/мин\n3-цилиндровый мотор с обратным вращением коленвала\nКастомный выпуск SC-Project",
            "img": "",
            "sort_order": 3,
            "is_active": 1
        },
        {
            "id": "moto_mv_superveloce_1000",
            "title": "MV Agusta Superveloce 1000 Serie Oro",
            "code": "LIMITED EDITION // HYPERBIKE",
            "desc": "Лимитированный коллекционный гипербайк Schiranna. 4-цилиндровый мотор мощностью 208 л.с., титановый 4-ствольный выхлоп Arrow, карбоновый аэропакет с активными крыльями и титановые клапаны.",
            "bullets": "208 л.с. // 13 200 об/мин\n4-ствольный титановый выхлоп Arrow\nОграниченный тираж Serie Oro",
            "img": "",
            "sort_order": 4,
            "is_active": 1
        },
        {
            "id": "moto_kawasaki_zx10r",
            "title": "Kawasaki Ninja ZX-10R",
            "code": "WSBK CHAMPION // NINJA",
            "desc": "Многократный триумфатор мирового супербайка WSBK. Высокооборотистый рядный 4-цилиндровый мотор, аэродинамические винглеты в переднем обтекателе, вилка Showa BFF и гоночная калибровка ланч-контроля.",
            "bullets": "203 л.с. (213 л.с. с Ram-Air)\nИнтегрированные винглеты\nГоночная вилка Showa BFF",
            "img": "",
            "sort_order": 5,
            "is_active": 1
        },
        {
            "id": "moto_honda_cbr1000rrr",
            "title": "Honda CBR1000RR-R Fireblade SP",
            "code": "HRC RACING // TRIPLE-R",
            "desc": "Бескомпромиссный болид с технологиями MotoGP. Диаметр цилиндров и ход поршня как у RC213V-S, титановый глушитель Akrapovič, подвеска Öhlins Smart-EC и прижимные аэродинамические крылья HRC.",
            "bullets": "217 л.с. // 14 500 об/мин\nДНК формульного болида RC213V-S\nЭлектронная подвеска Öhlins Smart-EC",
            "img": "",
            "sort_order": 6,
            "is_active": 1
        },
        {
            "id": "moto_yamaha_r1m",
            "title": "Yamaha YZF-R1M",
            "code": "FACTORY RACING // CROSSPLANE CP4",
            "desc": "Заводская спецверсия с крестообразным коленвалом Crossplane CP4. Полный кузов из сухого автоклавного карбона, электронная подвеска Öhlins ERS NPX и телеметрия гоночного трека Y-TRAC.",
            "bullets": "200 л.с. // 13 500 об/мин\nКрестообразный коленвал Crossplane CP4\nКузов из сухого карбона",
            "img": "",
            "sort_order": 7,
            "is_active": 1
        },
        {
            "id": "moto_suzuki_gsxr1000r",
            "title": "Suzuki GSX-R1000R",
            "code": "LEGENDARY GIXER // SR-VVT",
            "desc": "Легендарный литровый «Джиксер» в топовой модификации R. Система изменения фаз газораспределения Suzuki Racing VVT из MotoGP, вилка Showa BFF, двусторонний квикшифтер и тормоза Brembo Monobloc.",
            "bullets": "202 л.с. // 13 200 об/мин\nСистема изменения фаз SR-VVT MotoGP\nТормозные моноблоки Brembo",
            "img": "",
            "sort_order": 8,
            "is_active": 1
        }
    ]
    for m in default_moto:
        cursor.execute("""
        INSERT OR REPLACE INTO moto (id, title, code, desc, bullets, img, sort_order, is_active, object_position)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            m["id"],
            m["title"],
            m["code"],
            m["desc"],
            m["bullets"],
            m["img"],
            m["sort_order"],
            m["is_active"],
            m.get("object_position", "center 50%")
        ))

def get_all_moto() -> List[Dict[str, Any]]:
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM moto ORDER BY sort_order ASC, rowid ASC")
        rows = []
        for r in cursor.fetchall():
            d = dict(r)
            if not d.get("object_position"):
                d["object_position"] = "center 50%"
            d["objectPosition"] = d["object_position"]
            rows.append(d)
    return rows

def get_moto(moto_id: str) -> Optional[Dict[str, Any]]:
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM moto WHERE id = ?", (moto_id,))
        row = cursor.fetchone()
    if row:
        d = dict(row)
        if not d.get("object_position"):
            d["object_position"] = "center 50%"
        d["objectPosition"] = d["object_position"]
        return d
    return None

def upsert_moto(item: Dict[str, Any]) -> Dict[str, Any]:
    with get_db() as conn:
        cursor = conn.cursor()
        obj_pos = item.get("object_position") or item.get("objectPosition") or "center 50%"
        cursor.execute("""
        INSERT INTO moto (id, title, code, desc, bullets, img, sort_order, is_active, object_position)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
            title=excluded.title,
            code=excluded.code,
            desc=excluded.desc,
            bullets=excluded.bullets,
            img=excluded.img,
            sort_order=excluded.sort_order,
            is_active=excluded.is_active,
            object_position=COALESCE(excluded.object_position, moto.object_position)
        """, (
            item["id"],
            item["title"],
            item.get("code", "GTT MOTO"),
            item.get("desc", ""),
            item.get("bullets", ""),
            item.get("img", ""),
            int(item.get("sort_order", 0)),
            int(item.get("is_active", 1)),
            obj_pos
        ))
        conn.commit()
    item["object_position"] = obj_pos
    item["objectPosition"] = obj_pos
    try:
        sync_all_json_caches()
    except Exception:
        pass
    return item

def delete_moto(moto_id: str) -> bool:
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM moto WHERE id = ?", (moto_id,))
        deleted = cursor.rowcount > 0
        conn.commit()
    try:
        sync_all_json_caches()
    except Exception:
        pass
    return deleted

# ==============================================================================
# AUTOMATIC JSON CACHE SYNCHRONIZATION FOR GITHUB PAGES PARITY
# ==============================================================================
DATA_DIR = os.path.join(os.path.dirname(__file__), "data")

def sync_all_json_caches():
    """Synchronize all SQLite tables into static JSON fallbacks in data/ directory.
    Guarantees seamless parity between local SQLite database and static GitHub Pages hosting."""
    try:
        os.makedirs(DATA_DIR, exist_ok=True)
 # 1. Cars
        cars = get_all_cars()
        with open(os.path.join(DATA_DIR, "cars.json"), "w", encoding="utf-8") as f:
            json.dump(cars, f, ensure_ascii=False, indent=2)
 # 2. Team
        team = get_all_team()
        with open(os.path.join(DATA_DIR, "team.json"), "w", encoding="utf-8") as f:
            json.dump(team, f, ensure_ascii=False, indent=2)
 # 3. Records
        records = get_all_records()
        with open(os.path.join(DATA_DIR, "records.json"), "w", encoding="utf-8") as f:
            json.dump(records, f, ensure_ascii=False, indent=2)
 # 4. Gallery
        gallery = get_all_gallery()
        with open(os.path.join(DATA_DIR, "gallery.json"), "w", encoding="utf-8") as f:
            json.dump(gallery, f, ensure_ascii=False, indent=2)
 # 5. Moto
        moto = get_all_moto()
        with open(os.path.join(DATA_DIR, "moto.json"), "w", encoding="utf-8") as f:
            json.dump(moto, f, ensure_ascii=False, indent=2)
 # 6. Partners
        partners = get_all_partners()
        with open(os.path.join(DATA_DIR, "partners.json"), "w", encoding="utf-8") as f:
            json.dump(partners, f, ensure_ascii=False, indent=2)
 # 7. Moto banners
        mb = get_setting("moto_banners", "[]")
        try:
            mb_parsed = json.loads(mb)
        except Exception:
            mb_parsed = []
        with open(os.path.join(DATA_DIR, "moto_banners.json"), "w", encoding="utf-8") as f:
            json.dump(mb_parsed, f, ensure_ascii=False, indent=2)
 # 8. Hero Telemetry
        ht = get_setting("hero_telemetry", "{}")
        try:
            ht_parsed = json.loads(ht)
        except Exception:
            ht_parsed = {}
        with open(os.path.join(DATA_DIR, "hero_telemetry.json"), "w", encoding="utf-8") as f:
            json.dump(ht_parsed, f, ensure_ascii=False, indent=2)
    except Exception as e:
        print(f"[GTT DB Sync] Warning during JSON cache sync: {e}")


# ==============================================================================
# AUTHENTICATION, GATEWAY TOKENS & PERSISTENT RATE LIMITING
# ==============================================================================

def get_gateway_token() -> str:
    return get_setting("gateway_token", "")


def verify_gateway_token(candidate: str) -> bool:
    if not candidate or len(candidate) < 12:
        return False
    expected = get_gateway_token()
    if not expected:
        return False
    return hmac.compare_digest(candidate.strip().encode("utf-8"), expected.encode("utf-8"))


def rotate_gateway_token() -> str:
    new_tok = "gtt_" + secrets.token_urlsafe(24)
    with get_db() as conn:
        conn.execute("UPDATE settings SET value = ? WHERE key = 'gateway_token'", (new_tok,))
        conn.execute("DELETE FROM admin_sessions")
        conn.commit()
    return new_tok


def verify_admin_password(password: str) -> bool:
    if not password:
        return False
    stored = get_setting("admin_password_hash", "")
    if stored:
        return verify_password(password, stored)
    return False


def update_admin_password(new_password: str):
    set_setting("admin_password_hash", hash_password(new_password))


def check_rate_limit(key: str) -> Tuple[bool, int]:
    now = time.time()
    with get_db() as conn:
        row = conn.execute(
            "SELECT fails, lockout_until FROM rate_limits WHERE key = ?",
            (key,),
        ).fetchone()
        if not row:
            return (False, 0)
        lock_until = float(row["lockout_until"] or 0)
        if lock_until > now:
            return (True, int(lock_until - now))
    return (False, 0)


def record_rate_limit_fail(key: str, max_fails: int, lockout_minutes: int) -> Tuple[int, int]:
    now = time.time()
    with get_db() as conn:
        conn.execute("BEGIN IMMEDIATE")
        row = conn.execute(
            "SELECT fails, lockout_until, updated_at FROM rate_limits WHERE key = ?",
            (key,),
        ).fetchone()
        fails = 0
        if row:
            prev_lock = float(row["lockout_until"] or 0)
            if prev_lock > now:
                return (int(row["fails"]), max(1, int(prev_lock - now)))
            updated_at = float(row["updated_at"] or 0)
            if not prev_lock and (now - updated_at) < (lockout_minutes * 60):
                fails = int(row["fails"])
        fails += 1
        lock_until = 0.0
        lock_sec = 0
        if fails >= max_fails:
            lock_sec = lockout_minutes * 60
            lock_until = now + lock_sec
        conn.execute(
            """
            INSERT INTO rate_limits (key, fails, lockout_until, updated_at)
            VALUES (?, ?, ?, ?)
            ON CONFLICT(key) DO UPDATE SET
                fails=excluded.fails,
                lockout_until=excluded.lockout_until,
                updated_at=excluded.updated_at
            """,
            (key, fails, lock_until, now),
        )
        conn.commit()
    return (fails, lock_sec)


def clear_rate_limit(key: str):
    with get_db() as conn:
        conn.execute("DELETE FROM rate_limits WHERE key = ?", (key,))
        conn.commit()


def restore_factory_defaults():
    """Restore default cars, team, records, gallery, media, partners, and moto in SQLite."""
    with get_db() as conn:
        cursor = conn.cursor()
        seed_initial_data(cursor)
        seed_default_partners(cursor)
        seed_default_moto(cursor)
        conn.commit()
    sync_all_json_caches()

