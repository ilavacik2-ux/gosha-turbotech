"""
GoshaTurboTech (GTT) - SQLite Database Engine
Direct SQLite3 persistence for Cars, Team, Records, Gallery, Media and Settings.
Zero third-party vendor lock-in. 100% autonomous.
"""

import sqlite3
import json
import os
from typing import List, Dict, Any, Optional

DB_PATH = os.path.join(os.path.dirname(__file__), "gtt_database.db")

def get_connection():
    conn = sqlite3.connect(DB_PATH, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL;")
    conn.execute("PRAGMA synchronous=NORMAL;")
    conn.execute("PRAGMA temp_store=MEMORY;")
    conn.execute("PRAGMA cache_size=-64000;")  # 64MB cache
    return conn

def init_db():
    conn = get_connection()
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
        sort_order INTEGER DEFAULT 0
    )
    """)

    # 2. Team Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS team (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        role TEXT NOT NULL,
        status TEXT NOT NULL,
        photo TEXT,
        social TEXT,
        sort_order INTEGER DEFAULT 0
    )
    """)
    for col in ["photo", "social"]:
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
    for col in ["img"]:
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

    # 8. Persistent Admin Sessions
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS admin_sessions (
        token TEXT PRIMARY KEY,
        username TEXT NOT NULL,
        expires_at REAL NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    # 9. Partners Table
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

    # 10. Moto Division Table (Superbikes)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS moto (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        code TEXT NOT NULL,
        desc TEXT,
        bullets TEXT,
        img TEXT,
        sort_order INTEGER DEFAULT 0,
        is_active INTEGER DEFAULT 1
    )
    """)

    conn.commit()

    # Seed default data if cars table is empty
    cursor.execute("SELECT COUNT(*) FROM cars")
    if cursor.fetchone()[0] == 0:
        seed_initial_data(cursor)
        conn.commit()

    # Seed default partners if table is empty
    cursor.execute("SELECT COUNT(*) FROM partners")
    if cursor.fetchone()[0] == 0:
        seed_default_partners(cursor)
        conn.commit()

    # Seed default moto if table is empty
    cursor.execute("SELECT COUNT(*) FROM moto")
    if cursor.fetchone()[0] == 0:
        seed_default_moto(cursor)
        conn.commit()

    # Seed default admin password if not exists
    cursor.execute("SELECT value FROM settings WHERE key = 'admin_password'")
    if not cursor.fetchone():
        cursor.execute("INSERT INTO settings (key, value) VALUES ('admin_password', 'gtt71')")
        cursor.execute("INSERT INTO settings (key, value) VALUES ('secret_url_token', 'gtt_atelier_2026')")
        conn.commit()

    conn.close()

def seed_initial_data(cursor):
    default_projects = [
        {
                "id": "draco_promod",
                "brand": "NISSAN & DRACO",
                "type": "gtr",
                "name_ru": "GT-R R35 DRACO PRO-MOD GTT #300",
                "name_en": "GT-R R35 DRACO PRO-MOD GTT #300",
                "tag_ru": "РЕКОРД RDRC 7.694 СЕК • ПИЛОТ Р. АРЕФЬЕВ #300",
                "tag_en": "RDRC RECORD 7.694 SEC • PILOT R. AREFYEV #300",
                "hp": "3,000+ HP",
                "quarter_mile": "7.694 сек",
                "top_speed": "323.88 км/ч",
                "badge_ru": "Белый Рекордный GT-R #300",
                "badge_en": "White Record GT-R #300",
                "img": "assets/cars/gtr_draco_promod_front.jpg",
                "fallback_img": "assets/cars/gtr_draco_wrap_detail.jpg",
                "object_position": "center 64%",
                "video_src": "assets/videos/draco_gtr_action.mp4",
                "video_title": "Nissan GT-R Draco Pro-Mod 3000+ HP — боевой рекордный заезд RDRC",
                "desc_ru": "Легендарный белый флагман дрэг-стрипа RDRC под управлением Руслана Арефьева (борт №300). Официальное время 7.694 сек со скоростью 304.44 км/ч на 1/4 мили (RDRC этап 5, заезд №537) и 323.88 км/ч на 1/2 мили. Специально построенное трубчатое шасси и свыше 3000 л.с.",
                "desc_en": "Legendary white flagship of the RDRC drag strip piloted by Ruslan Arefyev (race car #300). Official verified time 7.694 sec at 304.44 km/h on the 1/4 mile (RDRC Stage 5, pass #537) and 323.88 km/h on the 1/2 mile.",
                "specs": {
                        "engine": "4.3L Billet VR38 Race Block GTT / Draco Spec",
                        "turbos": "Dual Precision 88mm Pro-Mod Turbochargers",
                        "fuel": "Methanol M1 Injected + Dual Billet Fuel Rails",
                        "ecu": "Motec M150 Standalone Pro Drag System",
                        "chassis": "Full Chrome-Moly Tube Chassis & Carbon Body"
                },
                "sort_order": 1
        },
        {
                "id": "r8_rokot",
                "brand": "AUDI & GTT",
                "type": "audi",
                "name_ru": "AUDI R8 V10 PLUS TWIN TURBO «ROKOT» GTT",
                "name_en": "AUDI R8 V10 PLUS TWIN TURBO «ROKOT» GTT",
                "tag_ru": "РЕКОРД РОССИИ ДЛЯ AUDI • 7.877 СЕК",
                "tag_en": "RUSSIAN RECORD FOR AUDI • 7.877 SEC",
                "hp": "1,600+ HP",
                "quarter_mile": "7.877 сек",
                "top_speed": "350+ км/ч",
                "badge_ru": "Рекорд России для Audi 7.877s",
                "badge_en": "Russia Audi Record 7.877s",
                "img": "assets/cars/audi_r8_tsmr_launch.jpg",
                "fallback_img": "https://static.tildacdn.com/tild3162-3462-4064-b931-313636663133/audi_r8-min.png",
                "object_position": "center 75%",
                "video_src": "assets/videos/gtr_launch_pass.mp4",
                "video_title": "AUDI R8 V10 PLUS TWIN TURBO «ROKOT» GTT",
                "desc_ru": "Боевая Audi R8 «ROKOT» от GoshaTurboTech под управлением Эдуарда Саркисяна и Руслана Арефьева. Абсолютный национальный рекорд России для марки Audi на 1/4 мили (7.877 сек). Первый и единственный автомобиль марки Audi в стране, выехавший из 8 секунд!",
                "desc_en": "Competition Audi R8 «ROKOT» by GoshaTurboTech piloted by Eduard Sarkisyan and Ruslan Arefyev. Absolute Russian National Record for Audi on the 1/4 mile (7.877 sec). The first and only Audi in Russia to conquer the 7-second barrier!",
                "specs": {
                        "engine": "5.2L FSI V10 Twin Turbo Mid-Engine GTT Stage 3",
                        "turbos": "Mirror Twin Turbo Kit with Air-to-Water Intercooling",
                        "cooling": "CSF Triple Billet Heat Exchangers",
                        "ecu": "Syvecs S12 Standalone Motorsport Setup",
                        "clutch": "GTT Upgraded Billet 9-Plate Dual Clutch"
                },
                "sort_order": 2
        },
        {
                "id": "bezzubik",
                "brand": "LAMBORGHINI & GTT",
                "type": "lambo",
                "name_ru": "HURACAN TWIN TURBO GTT-BEZZUBIK",
                "name_en": "HURACAN TWIN TURBO GTT-BEZZUBIK",
                "tag_ru": "РЕКОРД ЕВРОПЫ 353 КМ/Ч • RACE 1000",
                "tag_en": "EUROPE RECORD 353 KM/H • RACE 1000",
                "hp": "1,500+ HP",
                "quarter_mile": "8.054 сек",
                "top_speed": "353.02 км/ч",
                "badge_ru": "Рекорд Европы 353 км/ч",
                "badge_en": "Race 1000 Europe Record",
                "img": "assets/photos/huracan_rdrc_stage_line.jpg",
                "fallback_img": "assets/cars/huracan_green_grey_rdrc.jpg",
                "object_position": "center 65%",
                "video_src": "",
                "video_title": "",
                "desc_ru": "Культовый европейский триумфатор Race 1000 в Германии и звезда RDRC. Официальный рекорд Европы со скоростью 353.02 км/ч на дистанции 804 метра и лучший квотер 8.054 сек. Построен и настроен в ателье GoshaTurboTech.",
                "desc_en": "Iconic European champion of Race 1000 in Germany and RDRC superstar. Official European record with 353.02 km/h on 804m distance and 8.054 sec best 1/4 mile. Built and tuned by GoshaTurboTech.",
                "specs": {
                        "engine": "5.2L V10 FSI Twin Turbo GTT Stage 3",
                        "turbos": "Precision Dual Mirror V-Band Turbos",
                        "exhaust": "GTT Inconel Custom Straight System",
                        "ecu": "Syvecs Dual-CAN Motorsport Management",
                        "fuel": "100 RON Daily / Ethanol E85 Race Map"
                },
                "sort_order": 3
        },
        {
                "id": "gtr_kurdalagon",
                "brand": "NISSAN & GTT",
                "type": "gtr",
                "name_ru": "GT-R R35 GTT «KURDALAGON»",
                "name_en": "GT-R R35 GTT «KURDALAGON»",
                "tag_ru": "РЕКОРД БЫКОВО 26.10.2026 • 7.766 СЕК",
                "tag_en": "BYKOVO RECORD 26.10.2026 • 7.766 SEC",
                "hp": "1,650+ HP",
                "quarter_mile": "7.766 сек",
                "top_speed": "300.00 км/ч",
                "badge_ru": "Рекорд трек-дня 7.766s",
                "badge_en": "Track-Day Record 7.766s",
                "img": "https://static.tildacdn.com/tild3032-3266-4139-a563-653561393961/gtr-min.png",
                "fallback_img": "assets/cars/gtr_red_front_rdrc.jpg",
                "object_position": "center center",
                "video_src": "",
                "video_title": "",
                "desc_ru": "Боевой болид Nissan GT-R R35 «Курдалагон» — имя древнего осетинского бога-кузнеца. 26 октября 2026 года на трек-дне в Быково установил новый личный рекорд команды: 7.766 сек на 402 метра со скоростью на выходе 300.00 км/ч.",
                "desc_en": "Mythical Kurdalagon GT-R named after the ancient blacksmith deity. Set a brand new personal best of 7.766 sec at 300.00 km/h on October 26, 2026 at Bykovo Drag Track.",
                "specs": {
                        "engine": "4.1L Billet VR38 Race Assembly GTT Spec",
                        "turbos": "Dual Precision 7275 Billet Gen2",
                        "fuel": "VP Racing Ethanol M5",
                        "ecu": "Motec M150 Standalone Drag Management",
                        "chassis": "Drag Parachute & Weld Racing Beadlocks"
                },
                "sort_order": 4
        },
        {
                "id": "porsche_911_imba",
                "brand": "PORSCHE & GTT",
                "type": "porsche",
                "name_ru": "PORSCHE 911 TURBO S (992) GTT-IMBA",
                "name_en": "PORSCHE 911 TURBO S (992) GTT-IMBA",
                "tag_ru": "РЕКОРД RDRC 992 • 9.167 СЕК • М. КУТЫЧКИНА",
                "tag_en": "RDRC 992 RECORD • 9.167 SEC • M. KUTYCHKINA",
                "hp": "1,050+ HP",
                "quarter_mile": "9.167 сек",
                "top_speed": "345+ км/ч",
                "badge_ru": "Рекорд RDRC 992 • 9.167s",
                "badge_en": "RDRC 992 Record • 9.167s",
                "img": "https://static.tildacdn.com/tild6539-3534-4834-b938-323035363066/7R204787_.jpg",
                "fallback_img": "assets/cars/gtr_rdrc_red_panamera.jpg",
                "object_position": "center 55%",
                "video_src": "assets/videos/dodge_srt_pass.mp4",
                "video_title": "Porsche 911 Turbo S IMBA — заезд RDRC 9.167 сек",
                "desc_ru": "Официальный рекордсмен RDRC среди Porsche поколения 992 под управлением Марии Кутычкиной. Подтвержденное время 9.167 сек со скоростью 236.92 км/ч на 1/4 мили (RDRC 2025, заезд 528). Кастомный интеркулер GTT и метаноловый впрыск.",
                "desc_en": "Official RDRC record holder among Porsche 992 generation piloted by Maria Kutychkina. Verified time 9.167 sec at 236.92 km/h on 1/4 mile (RDRC 2025, pass 528). Custom GTT intercoolers and direct port methanol injection.",
                "specs": {
                        "engine": "3.8L Twin-Turbo Boxer-6 GTT Spec",
                        "turbos": "GTT Billet High-Flow Turbos",
                        "fuel": "100 RON + Methanol Injection",
                        "ecu": "Syvecs S7 Plus Standalone Porsche Kit"
                },
                "sort_order": 5
        },
        {
                "id": "gtr_lucifer",
                "brand": "NISSAN & GTT",
                "type": "gtr",
                "name_ru": "GT-R R35 «LUCIFER» GTT #71 CHAMPION",
                "name_en": "GT-R R35 «LUCIFER» GTT #71 CHAMPION",
                "tag_ru": "ЧЕМПИОН RDRC • ПИЛОТ ГОША ПЕРЦХЕЛИЯ #71",
                "tag_en": "RDRC CHAMPION • PILOT GOSHA PERTSKHELIYA #71",
                "hp": "1,850+ HP",
                "quarter_mile": "8.400 сек",
                "top_speed": "343.67 км/ч",
                "badge_ru": "Боевой Огненный Болид Гоши #71",
                "badge_en": "Gosha Fire Drag Weapon #71",
                "img": "assets/cars/gtr_lucifer_solo.jpg",
                "fallback_img": "assets/cars/gtr_lucifer_full.jpg",
                "object_position": "center 46%",
                "video_src": "assets/videos/gosha_na_svoem_lucifer_web.mp4",
                "video_title": "Гоша на своей // GT-R Lucifer RDRC",
                "desc_ru": "Победоносный огненный болид Гоши Перцхелия, борт №71. Личный драг-монстр в культовой ливрее адского пламени — триумфатор и победитель чемпионата России RDRC (лучшее время 8.400 сек / 1/2 мили 13.690 с / 343.67 км/ч).",
                "desc_en": "Victorious hellfire-liveried race weapon piloted by Gosha Pertskheliya himself (race car #71). Built in the GoshaTurboTech skunkworks — champion and winner of Russian Drag Racing Championship (RDRC) finals.",
                "specs": {
                        "engine": "4.1L Billet Stroker VR38DETT GTT Race Spec",
                        "turbos": "Dual Precision 7675 Gen2 Pro Mod Billet Turbos",
                        "fuel": "VP Racing Ethanol M5 / Dual In-Tank 1700cc Injection",
                        "ecu": "Motec M150 Drag AWD Management + GTT Flame Map",
                        "chassis": "Full Drag Suspension, Parachute System & Weld Beadlocks"
                },
                "sort_order": 6
        },
        {
                "id": "bmw_m5",
                "brand": "BMW M-POWER",
                "type": "bmw",
                "name_ru": "BMW M5 G90 COMPETITION GTT-STAGE 3",
                "name_en": "BMW M5 G90 COMPETITION GTT-STAGE 3",
                "tag_ru": "RDRC ДРЭГ-КИЛЛЕР • БОЛИД GTT G90",
                "tag_en": "RDRC DRAG WEAPON • GTT G90 BULLET",
                "hp": "1,050+ HP",
                "quarter_mile": "9.420 сек",
                "top_speed": "340+ км/ч",
                "badge_ru": "Боевая BMW G90 Гоши Турботех",
                "badge_en": "GoshaTurboTech Race BMW G90",
                "img": "assets/cars/bmw_m5_rdrc_race.jpg",
                "fallback_img": "assets/cars/bmw_m5_paddock_front.jpg",
                "object_position": "center center",
                "video_src": "assets/videos/r8_acceleration.mp4",
                "video_title": "BMW M5 G90 Competition GTT — боевой разгон",
                "desc_ru": "Заряженная боевая BMW M5 поколения G90 от GoshaTurboTech, выступающая в чемпионате России по дрэг-рейсингу RDRC. Полный привод M xDrive, гибридные турбины GTT и усиленная поршневая группа.",
                "desc_en": "Competition BMW M5 G90 built by GoshaTurboTech competing in RDRC. M xDrive AWD system, custom GTT hybrid billet turbos, and reinforced engine internals.",
                "specs": {
                        "engine": "4.4L V8 TwinPower Turbo Hybrid Powertrain GTT Spec",
                        "turbos": "GTT Custom Billet Hybrid Turbos",
                        "fuel": "100 RON + Methanol Direct Port Injected",
                        "ecu": "GTT Custom Dual ECU & 8HP Transmission Flash",
                        "exhaust": "Inconel Catless Downpipes + Full Titanium System"
                },
                "sort_order": 7
        },
        {
                "id": "dodge_demon",
                "brand": "DODGE SRT",
                "type": "other",
                "name_ru": "DODGE CHALLENGER SRT DEMON GTT",
                "name_en": "DODGE CHALLENGER SRT DEMON GTT",
                "tag_ru": "RDRC БЕРНАУТ КИНГ • 9.748 СЕК",
                "tag_en": "RDRC BURNOUT KING • 9.748 SEC",
                "hp": "1,200+ HP",
                "quarter_mile": "9.748 сек",
                "top_speed": "330+ км/ч",
                "badge_ru": "SRT Demon 1200+ HP",
                "badge_en": "SRT Demon 1200+ HP",
                "img": "assets/cars/dodge_burnout_sunset.jpg",
                "fallback_img": "assets/cars/challenger_srt_gtt.jpg",
                "object_position": "center 70%",
                "video_src": "assets/videos/dodge_challenger_action.mp4",
                "video_title": "Dodge Challenger SRT Demon GTT — дымный бернаут RDRC",
                "desc_ru": "Черный компрессорный монстр Dodge Challenger SRT Demon от GoshaTurboTech под управлением И. Кардана и М. Шония. Подтвержденное время 9.748 сек со скоростью 233.24 км/ч на 1/4 мили RDRC 2026.",
                "desc_en": "Supercharged black Dodge Challenger SRT Demon built by GoshaTurboTech, piloted by I. Kardan and M. Shoniya. Verified 9.748 sec at 233.24 km/h on RDRC 2026.",
                "specs": {
                        "engine": "6.2L Supercharged HEMI V8 Built by GTT",
                        "blower": "Whipple 3.8L Gen 5 Supercharger Kit",
                        "fuel": "Triple Fore Innovations Fuel Pumps + 1700cc Injectors",
                        "driveshaft": "QA1 Carbon Fiber Driveshaft + GTT 9-inch Rear End",
                        "tires": "Mickey Thompson ET Street R Drag Radials"
                },
                "sort_order": 8
        },
        {
                "id": "dodge_demon_170",
                "brand": "DODGE SRT",
                "type": "other",
                "name_ru": "DODGE CHALLENGER SRT DEMON 170 GTT",
                "name_en": "DODGE CHALLENGER SRT DEMON 170 GTT",
                "tag_ru": "ЗАВОДСКОЙ ВЫХОД НА ВИЛЛИ • 1025 HP",
                "tag_en": "FACTORY WHEELIE DRAG MONSTER • 1025 HP",
                "hp": "1,025+ HP",
                "quarter_mile": "9.150 сек",
                "top_speed": "335+ км/ч",
                "badge_ru": "Demon 170 Crate",
                "badge_en": "Demon 170 Crate",
                "img": "assets/cars/challenger_burnout_close.jpg",
                "fallback_img": "assets/cars/dodge_srt_front.jpg",
                "object_position": "center center",
                "video_src": "",
                "video_title": "",
                "desc_ru": "Финальный коллекционный шедевр эпохи HEMI — Demon 170. Калибровка датчиков этанола flex-fuel, усиленный карданный вал и разгон с отрывом передних колес от стрипа.",
                "desc_en": "The pinnacle of the HEMI era — Demon 170. Flex-fuel ethanol auto-tuning, reinforced drivetrain and wheelie-popping launches on VHT prepped tracks.",
                "specs": {
                        "engine": "6.2L Supercharged D170 HEMI Crate Engine",
                        "blower": "3.0L High-Helix Whipple Supercharger",
                        "fuel": "Ethanol E85 Flex Fuel Auto-Calibration",
                        "chassis": "Transbrake Pro Drag Launch System"
                },
                "sort_order": 9
        },
        {
                "id": "audi_zlayazaya",
                "brand": "AUDI & GTT",
                "type": "audi",
                "name_ru": "AUDI R8 V10 PLUS TWIN TURBO «ZLAYAZAYA»",
                "name_en": "AUDI R8 V10 PLUS TWIN TURBO «ZLAYAZAYA»",
                "tag_ru": "RDRC БОЕВОЙ БОЛИД • ПИЛОТ Р. АРЕФЬЕВ",
                "tag_en": "RDRC WEAPON • PILOT R. AREFYEV",
                "hp": "1,200+ HP",
                "quarter_mile": "10.060 сек",
                "top_speed": "340+ км/ч",
                "badge_ru": "R8 «Злая Зая» GTT",
                "badge_en": "R8 «ZlayaZaya» GTT",
                "img": "assets/cars/audi_r8_tsmr_launch.jpg",
                "fallback_img": "https://static.tildacdn.com/tild3162-3462-4064-b931-313636663133/audi_r8-min.png",
                "object_position": "center 70%",
                "video_src": "assets/videos/r8_launch_action.mp4",
                "video_title": "Audi R8 «Злая Зая» — боевой выезд RDRC",
                "desc_ru": "Культовая Audi R8 «Злая Зая» Руслана Арефьева (борт №6303). Призер этапов чемпионата RDRC, стабильный запуск на полном приводе quattro и двухтурбинный пакет GTT.",
                "desc_en": "Renowned Audi R8 ZlayaZaya piloted by Ruslan Arefyev (#6303). RDRC podium finisher with custom twin turbo package and relentless quattro AWD launches.",
                "specs": {
                        "engine": "5.2L V10 FSI Reinforced Internals GTT",
                        "turbos": "Dual Mirror Precision Turbos",
                        "fuel": "Direct Port Fuel Injected 100 RON",
                        "ecu": "Syvecs Powertrain Management"
                },
                "sort_order": 10
        },
        {
                "id": "tonystark",
                "brand": "AUDI & ЦМРБАНК",
                "type": "audi",
                "name_ru": "R8 V10 PLUS TWIN TURBO TONY STARK / RDRC",
                "name_en": "R8 V10 PLUS TWIN TURBO TONY STARK / RDRC",
                "tag_ru": "ПОКОРИТЕЛЬ БАЙКАЛА & RDRC • 8.948 СЕК",
                "tag_en": "BAIKAL ICE & RDRC FIGHTER • 8.948 SEC",
                "hp": "1,400+ HP",
                "quarter_mile": "8.948 сек",
                "top_speed": "350+ км/ч",
                "badge_ru": "Tony Stark 1400+ HP",
                "badge_en": "Tony Stark 1400+ HP",
                "img": "https://static.tildacdn.com/tild3162-3462-4064-b931-313636663133/audi_r8-min.png",
                "fallback_img": "assets/cars/audi_r8_tsmr_launch.jpg",
                "object_position": "center center",
                "video_src": "assets/videos/dodge_srt_pass.mp4",
                "video_title": "Audi R8 V10 Twin Turbo Tony Stark — боевой заезд",
                "desc_ru": "Боевая Audi R8 V10 Twin Turbo под эгидой ЦМРБанк и GTT на треке RDRC. Официальное время 8.948 сек со скоростью 247.68 км/ч на Record Days 2023 и 287.19 км/ч на 1/2 мили.",
                "desc_en": "Race Audi R8 V10 Twin Turbo backed by CMRBank and GTT on the RDRC strip. Record Days 2023 8.948 sec pass at 247.68 km/h.",
                "specs": {
                        "engine": "5.2L FSI V10 Twin Turbo Mid-Engine",
                        "turbos": "Mirror Twin Turbo Kit with Air-to-Water Intercooling",
                        "cooling": "CSF Triple Billet Heat Exchangers",
                        "ecu": "Syvecs S12 Standalone Motorsport Setup"
                },
                "sort_order": 11
        },
        {
                "id": "zelenka",
                "brand": "LAMBORGHINI",
                "type": "lambo",
                "name_ru": "HURACAN TWIN TURBO «ЗЕЛЕНКА» GTT",
                "name_en": "HURACAN TWIN TURBO «ZELENKA» GTT",
                "tag_ru": "КУЛЬТОВЫЙ 1500+ СИЛЬНЫЙ БОЛИД RDRC",
                "tag_en": "CULT 1500+ HP RDRC CHAMPIONSHIP BULLET",
                "hp": "1,500+ HP",
                "quarter_mile": "8.373 сек",
                "top_speed": "355+ км/ч",
                "badge_ru": "Легендарная «Зеленка» GTT",
                "badge_en": "Legendary «Zelenka» GTT",
                "img": "assets/photos/huracan_zelenka_gtt.jpg",
                "fallback_img": "assets/cars/huracan_green_grey_rdrc.jpg",
                "object_position": "center 45%",
                "video_src": "assets/videos/r8_launch_action.mp4",
                "video_title": "Lamborghini Huracan Twin Turbo «Зеленка» GTT — боевой заезд RDRC",
                "desc_ru": "Знаменитая ядовито-зеленая Lamborghini Huracan Twin Turbo «Зеленка» — легенда паддока RDRC и уличных дуэлей. Кастомный твин-турбо кит от GoshaTurboTech, задние бедлоки и выстрел за 8 секунд (1/2 мили 14.041 с / 327.86 км/ч).",
                "desc_en": "The legendary acid-green Lamborghini Huracan Twin Turbo «Zelenka» — racing icon of the RDRC paddock. Built by GoshaTurboTech with custom mirror turbos, rear beadlock drag wheels and low 8-second passes.",
                "specs": {
                        "engine": "5.2L V10 FSI GTT Built Engine",
                        "turbos": "Precision Mirror Dual Ball-Bearing Turbos",
                        "fuel": "Dual Billet Fuel Rails + 100 RON / E85 Maps",
                        "trans": "GTT Upgraded Billet Dual Clutch 10-Plate",
                        "wheels": "Weld Racing Rear Beadlocks with Mickey Thompson ET"
                },
                "sort_order": 12
        },
        {
                "id": "lambo_maxpain",
                "brand": "LAMBORGHINI & GTT",
                "type": "lambo",
                "name_ru": "HURACAN PERFORMANTE TT GTT-MAXPAIN",
                "name_en": "HURACAN PERFORMANTE TT GTT-MAXPAIN",
                "tag_ru": "FORGED COMPOSITES • 1600+ HP TWIN TURBO",
                "tag_en": "FORGED COMPOSITES • 1600+ HP TWIN TURBO",
                "hp": "1,600+ HP",
                "quarter_mile": "8.150 сек",
                "top_speed": "360+ км/ч",
                "badge_ru": "GTT-MAXPAIN Performante",
                "badge_en": "GTT-MAXPAIN Performante",
                "img": "assets/cars/huracan_green_grey_rdrc.jpg",
                "fallback_img": "assets/cars/huracan_rdrc_duo.jpg",
                "object_position": "center center",
                "video_src": "",
                "video_title": "",
                "desc_ru": "Безупречный Huracan Performante в заводском кованом карбоне Forged Composites с установленным биллетовым твин-турбо китом GTT. Чудовищная отдача 1600+ л.с. и активная аэродинамика ALA.",
                "desc_en": "Forged Composites masterpiece Lamborghini Huracan Performante empowered by bespoke GTT 1600+ HP twin turbo system and calibrated ALA active aero.",
                "specs": {
                        "engine": "5.2L V10 FSI GTT Billet Rods & Pistons",
                        "turbos": "Mirror Twin Billet Precision Turbos Gen2",
                        "clutch": "GTT Dual-Clutch Billet 10-Plate Basket",
                        "ecu": "Syvecs S12 Standalone Motorsport Management"
                },
                "sort_order": 13
        },
        {
                "id": "lambo_spyder_800",
                "brand": "LAMBORGHINI & GTT",
                "type": "lambo",
                "name_ru": "HURACAN SPYDER GTT-800 STAGE 2",
                "name_en": "HURACAN SPYDER GTT-800 STAGE 2",
                "tag_ru": "ЧЕМПИОНАТ ПФО 2 МЕСТО • 9.988 СЕК",
                "tag_en": "PFO CHAMPIONSHIP PODIUM • 9.988 SEC",
                "hp": "850+ HP",
                "quarter_mile": "9.988 сек",
                "top_speed": "335+ км/ч",
                "badge_ru": "Spyder GTT-800",
                "badge_en": "Spyder GTT-800",
                "img": "https://static.tildacdn.com/tild3732-3733-4537-b636-393237373362/IMG_9941-min.png",
                "fallback_img": "assets/cars/huracan_green_bezzubik_side.jpg",
                "object_position": "center center",
                "video_src": "",
                "video_title": "",
                "desc_ru": "Открытый родстер Huracan Spyder с доработанной выхлопной трассой Inconel и пакетом GTT Stage 2. Официальное 2-е место на Чемпионате ПФО с результатом 9.988 сек на 402 метра.",
                "desc_en": "Atmospheric open-top roadster tuned with Inconel race exhaust and GTT Stage 2 package. PFO Championship podium with 9.988 sec quarter mile pass.",
                "specs": {
                        "engine": "5.2L V10 Naturally Aspirated GTT Tune",
                        "exhaust": "Inconel Valvetronic Full System Handcrafted",
                        "intake": "Carbon Ram-Air Box",
                        "ecu": "GTT Dual ECU Custom Calibration"
                },
                "sort_order": 14
        },
        {
                "id": "moses",
                "brand": "NISSAN",
                "type": "gtr",
                "name_ru": "GT-R R35 GTT-1800 «MOSES» #712",
                "name_en": "GT-R R35 GTT-1800 «MOSES» #712",
                "tag_ru": "РЕКОРД ЕВРОПЫ UNLIM 500+ КРИТ • 7.810 СЕК",
                "tag_en": "UNLIM 500+ CRETE EUROPE RECORD • 7.810 SEC",
                "hp": "1,800+ HP",
                "quarter_mile": "7.526 сек",
                "top_speed": "360+ км/ч",
                "badge_ru": "Легендарный Moses #712",
                "badge_en": "Legendary Moses #712",
                "img": "https://static.tildacdn.com/tild3834-3466-4637-b632-636439343565/GTR-MOSES-min.png",
                "fallback_img": "assets/cars/gtr_draco_connections.jpg",
                "object_position": "center center",
                "video_src": "",
                "video_title": "",
                "desc_ru": "Культовый белый Nissan GT-R R35 «MOSES» борт №712. Европейский рекорд времени на Unlim 500+ Greece (остров Крит) — 7.810 сек / 287.65 км/ч и личный рекорд 7.526 сек со скоростью 304.36 км/ч в ОАЭ. 3-й результат в мире на момент постройки.",
                "desc_en": "Iconic white Nissan GT-R R35 MOSES #712. European record holder at Unlim 500+ Greece (Crete) with 7.810 sec pass and personal best 7.526 sec at 304.36 km/h in UAE tests.",
                "specs": {
                        "engine": "4.1L Billet Stroker VR38DETT GTT Spec",
                        "turbos": "Dual Precision Ball-Bearing Race Turbos",
                        "fuel": "VP Racing C16 / 100 RON Dual Fuel Map",
                        "ecu": "Motec M1 + Custom GTT Drag AWD Logic",
                        "trans": "GTT Billet PPG Sequential Dog-Box"
                },
                "sort_order": 15
        },
        {
                "id": "gtr_korzhik",
                "brand": "NISSAN & GTT",
                "type": "gtr",
                "name_ru": "GT-R R35 GTT «KORZHIK» #712",
                "name_en": "GT-R R35 GTT «KORZHIK» #712",
                "tag_ru": "РЕКОРД РОССИИ 334 КМ/Ч • Н. КОРЖОВ",
                "tag_en": "RUSSIAN RECORD 334 KM/H • N. KORZHOV",
                "hp": "1,600+ HP",
                "quarter_mile": "8.602 сек",
                "top_speed": "334.41 км/ч",
                "badge_ru": "Рекорд России 334 км/ч",
                "badge_en": "Russian Record 334 km/h",
                "img": "https://static.tildacdn.com/tild3365-3636-4135-b136-623937643037/korzhik2-min.png",
                "fallback_img": "assets/cars/gtr_red_chrome_rdrc.jpg",
                "object_position": "center center",
                "video_src": "",
                "video_title": "",
                "desc_ru": "Боевой болид Николая Коржова. Рекорд России на Московской миле (1/2 мили: 13.435 сек со скоростью 334.41 км/ч) и 8.602 сек на 402 метра. Вице-чемпион абсолютного зачета Чемпионата SMP RDRC в классе FSL.",
                "desc_en": "Competition build piloted by Nikolay Korzhov. Russian Record at Moscow Mile (1/2 mile: 13.435 sec at 334.41 km/h) and 8.602 sec 1/4 mile. Vice-champion of SMP RDRC FSL class.",
                "specs": {
                        "engine": "4.0L Forged VR38 GTT Spec",
                        "turbos": "Precision Gen2 Billet Race Turbos",
                        "fuel": "VP Racing Ethanol Map",
                        "transmission": "Dodson Promax Heavy Duty Clutch"
                },
                "sort_order": 16
        },
        {
                "id": "gtr_baloo",
                "brand": "NISSAN & GTT",
                "type": "gtr",
                "name_ru": "GT-R R35 GTT «BALOO»",
                "name_en": "GT-R R35 GTT «BALOO»",
                "tag_ru": "МОСКОВСКАЯ МИЛЯ • 8.875 СЕК • 322 КМ/Ч",
                "tag_en": "MOSCOW MILE • 8.875 SEC • 322 KM/H",
                "hp": "1,450+ HP",
                "quarter_mile": "8.875 сек",
                "top_speed": "322.00 км/ч",
                "badge_ru": "GT-R Baloo GTT",
                "badge_en": "GT-R Baloo GTT",
                "img": "assets/cars/gtr_red_strip_sunset.jpg",
                "fallback_img": "assets/cars/gtr_draco_connections.jpg",
                "object_position": "center 60%",
                "video_src": "",
                "video_title": "",
                "desc_ru": "Уникальный проект «Baloo» с мощнейшим средним диапазоном оборотов и полным приводом. Личные показатели команды: 8.875 сек на 402 м со скоростью 262.39 км/ч и 13.726 сек на 1/2 мили со скоростью 322.00 км/ч.",
                "desc_en": "Unique Baloo build optimized for high mid-range torque and lethal AWD traction. Official team records: 8.875 sec at 262.39 km/h on 1/4 mile and 13.726 sec at 322.00 km/h on 1/2 mile.",
                "specs": {
                        "engine": "3.8L VR38 Reinforced GTT Block",
                        "turbos": "Garrett G30 Billet Turbos",
                        "cooling": "GTT Dual Radiator Pack",
                        "fuel": "Dual In-Tank Fuel Rail"
                },
                "sort_order": 17
        },
        {
                "id": "gtr_blue_888",
                "brand": "NISSAN",
                "type": "gtr",
                "name_ru": "GT-R R35 MIDNIGHT BLUE GTT #888",
                "name_en": "GT-R R35 MIDNIGHT BLUE GTT #888",
                "tag_ru": "RDRC ЧЕМПИОНАТ РОССИИ • БОРТ #888",
                "tag_en": "RDRC RUSSIAN CHAMPIONSHIP • CAR #888",
                "hp": "1,550+ HP",
                "quarter_mile": "8.120 сек",
                "top_speed": "348+ км/ч",
                "badge_ru": "Синий GT-R #888",
                "badge_en": "Blue GT-R #888",
                "img": "assets/photos/gtr_blue_888_rdrc.jpg",
                "fallback_img": "assets/cars/gtr_blue_rdrc_888.jpg",
                "object_position": "center 45%",
                "video_src": "assets/videos/gtr_blue_888_pass_web.mp4",
                "video_title": "Nissan GT-R #888 Midnight Blue GTT — боевой заезд RDRC",
                "desc_ru": "Знаменитый синий Nissan GT-R R35 со стартовым номером #888, постоянный участник и призер этапов Чемпионата России RDRC. Калибровка лаунч-контроля GTT и кованый 3.8L VR38.",
                "desc_en": "The renowned Midnight Blue Nissan GT-R R35 carrying race #888, competing consistently on RDRC stages. Calibrated GTT launch control algorithms and bulletproof forged 3.8L VR38.",
                "specs": {
                        "engine": "3.8L Forged VR38DETT GTT Spec",
                        "turbos": "Dual Garrett G30-900 Turbochargers",
                        "cooling": "ETS 4-inch Race Intercooler Kit",
                        "ecu": "Syvecs S6+ ECU with GTT Drag Launch Strategy",
                        "trans": "Dodson Pro-Max 8-Plate Drag Clutch"
                },
                "sort_order": 18
        },
        {
                "id": "gtr_red",
                "brand": "NISSAN",
                "type": "gtr",
                "name_ru": "GT-R R35 RED CHROME GTT PRO-MOD",
                "name_en": "GT-R R35 RED CHROME GTT PRO-MOD",
                "tag_ru": "RDRC ЧЕМПИОНАТ РОССИИ • КРАСНЫЙ ХРОМ",
                "tag_en": "RDRC RUSSIAN CHAMPIONSHIP • RED CHROME",
                "hp": "1,650+ HP",
                "quarter_mile": "7.950 сек",
                "top_speed": "350+ км/ч",
                "badge_ru": "Красный Хром RDRC",
                "badge_en": "Red Chrome RDRC",
                "img": "assets/cars/gtr_red_front_rdrc.jpg",
                "fallback_img": "assets/cars/gtr_red_chrome_rdrc.jpg",
                "object_position": "center 62%",
                "video_src": "assets/videos/gtr_red_g35_action_web.mp4",
                "video_title": "Nissan GT-R GTT Red Chrome G35 — боевой заезд RDRC",
                "desc_ru": "Один из самых ярких Nissan GT-R в российском дрэг-рейсинге под управлением Гоши Перцхелия. Кастомный хром-дизайн, усиленная подвеска и боевая трансмиссия GTT.",
                "desc_en": "One of the most striking Nissan GT-R cars in Russian drag racing piloted by Gosha Pertskheliya. Custom red chrome livery, reinforced suspension and bulletproof GTT race transmission.",
                "specs": {
                        "engine": "3.8L VR38DETT Custom GTT Billet Assembly",
                        "turbos": "Garrett G35-1050 Turbochargers",
                        "cooling": "Front Mount Massive Intercooler Core",
                        "ecu": "Syvecs S8 ECU with Launch & Traction Control"
                },
                "sort_order": 19
        },
        {
                "id": "gtr_rocket",
                "brand": "NISSAN & GTT",
                "type": "gtr",
                "name_ru": "GT-R R35 GTT «ROCKET»",
                "name_en": "GT-R R35 GTT «ROCKET»",
                "tag_ru": "СПЕЦПРОЕКТ GTT • КАРБОНОВЫЙ БОДИКИТ",
                "tag_en": "GTT ATELIER SPEC • FULL CARBON AERO",
                "hp": "1,500+ HP",
                "quarter_mile": "8.350 сек",
                "top_speed": "345+ км/ч",
                "badge_ru": "GTT Rocket Spec",
                "badge_en": "GTT Rocket Spec",
                "img": "assets/cars/gtr_draco_arefyev_wheel.jpg",
                "fallback_img": "assets/cars/gtr_draco_promod_front.jpg",
                "object_position": "center center",
                "video_src": "",
                "video_title": "",
                "desc_ru": "Экстремальный проект Nissan GT-R R35 «Rocket» лаборатории GoshaTurboTech. Двухтурбинный наддув, титановый прямой выхлоп и облегченная гоночная конфигурация кузова.",
                "desc_en": "Extreme project Nissan GT-R R35 Rocket by GoshaTurboTech skunkworks. Twin turbo package, titanium straight pipes and ultra-lightweight race setup.",
                "specs": {
                        "engine": "3.8L VR38DETT Built by GTT",
                        "turbos": "Dual Precision High-Boost Turbos",
                        "ecu": "Motec M1 Drag Calibration",
                        "fuel": "100 RON + Ethanol Map"
                },
                "sort_order": 20
        },
        {
                "id": "gtr_alpha12x",
                "brand": "NISSAN & GTT",
                "type": "gtr",
                "name_ru": "GT-R R35 GTT ALPHA12X SPEC",
                "name_en": "GT-R R35 GTT ALPHA12X SPEC",
                "tag_ru": "КУЛЬТОВАЯ АЛЬФА GTT • 1500 HP",
                "tag_en": "CULT ALPHA GTT • 1500 HP",
                "hp": "1,500+ HP",
                "quarter_mile": "8.250 сек",
                "top_speed": "350+ км/ч",
                "badge_ru": "Alpha 12X GTT",
                "badge_en": "Alpha 12X GTT",
                "img": "assets/cars/gtr_draco_connections.jpg",
                "fallback_img": "assets/cars/gtr_red_front_rdrc.jpg",
                "object_position": "center center",
                "video_src": "",
                "video_title": "",
                "desc_ru": "Проект на базе культового пакета Alpha 12X, доработанный инженерами GTT. Кастомное охлаждение, усиленная трансмиссия GR6 и индивидуальная прошивка блока управления.",
                "desc_en": "Build based on the legendary Alpha 12X package, heavily refined by GTT engineers. Upgraded GR6 transmission and bespoke engine management.",
                "specs": {
                        "engine": "4.0L Stroker VR38 GTT Spec",
                        "turbos": "AMS Alpha 12X Turbo Kit",
                        "transmission": "ShepTrans Stage 4 GR6",
                        "ecu": "Syvecs S8 Dual ECU"
                },
                "sort_order": 21
        },
        {
                "id": "gtr_fifa",
                "brand": "NISSAN & GTT",
                "type": "gtr",
                "name_ru": "GT-R R35 GTT «FIFA» #10",
                "name_en": "GT-R R35 GTT «FIFA» #10",
                "tag_ru": "ИМЕННОЙ БОЛИД • LUXURY & DRAG",
                "tag_en": "BESPOKE BUILD • LUXURY & DRAG",
                "hp": "1,450+ HP",
                "quarter_mile": "8.450 сек",
                "top_speed": "340+ км/ч",
                "badge_ru": "GT-R FIFA #10",
                "badge_en": "GT-R FIFA #10",
                "img": "assets/cars/gtr_red_tail_rdrc.jpg",
                "fallback_img": "assets/cars/gtr_lucifer_solo.jpg",
                "object_position": "center center",
                "video_src": "",
                "video_title": "",
                "desc_ru": "Именной болид «FIFA», созданный в ателье GoshaTurboTech. Сочетает комфортный салон и бескомпромиссные характеристики разгона из 8.5 секунд на квотере.",
                "desc_en": "Bespoke FIFA build crafted by GoshaTurboTech atelier, pairing premium cockpit refinement with sub-8.5 quarter-mile violence.",
                "specs": {
                        "engine": "4.1L Billet Stroker VR38 GTT",
                        "turbos": "Precision Gen2 Turbochargers",
                        "transmission": "Dodson Motorsport Billet Gearset",
                        "ecu": "Motec M150"
                },
                "sort_order": 22
        },
        {
                "id": "porsche_991_1200",
                "brand": "PORSCHE & GTT",
                "type": "porsche",
                "name_ru": "PORSCHE 911 TURBO (991.1) GTT-1200",
                "name_en": "PORSCHE 911 TURBO (991.1) GTT-1200",
                "tag_ru": "РЕКОРД РОССИИ/ЕВРОПЫ • А. САГАЛ",
                "tag_en": "RUSSIA/EUROPE RECORD • A. SAGAL",
                "hp": "1,200+ HP",
                "quarter_mile": "9.086 сек",
                "top_speed": "312.77 км/ч",
                "badge_ru": "991.1 GTT-1200",
                "badge_en": "991.1 GTT-1200",
                "img": "https://static.tildacdn.com/tild3537-3330-4137-a166-303730623266/IMG_9940-min.png",
                "fallback_img": "assets/cars/gtr_rdrc_red_panamera.jpg",
                "object_position": "center center",
                "video_src": "",
                "video_title": "",
                "desc_ru": "Безумный 991.1 Turbo Алексея Сагала. Официальный рекорд России/Европы на RDRC RacePark: 9.086 сек со скоростью 259.64 км/ч на 402 м и 14.186 сек со скоростью 312.77 км/ч на 1/2 мили.",
                "desc_en": "Savage 991.1 Turbo piloted by Alexey Sagal. Official Russia/Europe Record at RDRC RacePark: 9.086 sec at 259.64 km/h on 1/4 mile and 14.186 sec at 312.77 km/h on 1/2 mile.",
                "specs": {
                        "engine": "3.8L Twin-Turbo Boxer-6 Built Internals",
                        "turbos": "GTT Dual Billet High-Flow Turbos",
                        "transmission": "Reinforced PDK Dual-Clutch Pack",
                        "fuel": "Methanol Direct Port Injection"
                },
                "sort_order": 23
        },
        {
                "id": "porsche_991_felix",
                "brand": "PORSCHE & GTT",
                "type": "porsche",
                "name_ru": "PORSCHE 911 TURBO S (991.2) FELIX FERRO",
                "name_en": "PORSCHE 911 TURBO S (991.2) FELIX FERRO",
                "tag_ru": "FELIX FERRO EDITION • 9.601 СЕК",
                "tag_en": "FELIX FERRO EDITION • 9.601 SEC",
                "hp": "950+ HP",
                "quarter_mile": "9.601 сек",
                "top_speed": "232.40 км/ч",
                "badge_ru": "Felix Ferro Edition",
                "badge_en": "Felix Ferro Edition",
                "img": "assets/cars/gtr_rdrc_red_panamera.jpg",
                "fallback_img": "https://static.tildacdn.com/tild6539-3534-4834-b938-323035363066/7R204787_.jpg",
                "object_position": "center center",
                "video_src": "",
                "video_title": "",
                "desc_ru": "Лимитированная инженерная серия Felix Ferro Edition. Индивидуальный аэродинамический пакет, облегченные кованые диски и настройка блока управления Syvecs. 9.601 сек на квотере.",
                "desc_en": "Exclusive Felix Ferro Edition bespoke engineering build. Lightweight aero package, forged monoblocks and Syvecs ECU calibration. 9.601 sec quarter mile.",
                "specs": {
                        "engine": "3.8L Twin-Turbo Boxer-6 GTT RS Spec",
                        "turbos": "Billet Hybrid Turbos Gen2",
                        "exhaust": "Titanium Valved System Handcrafted",
                        "ecu": "Syvecs S7 Standalone Engine Management"
                },
                "sort_order": 24
        },
        {
                "id": "porsche_991_900",
                "brand": "PORSCHE & GTT",
                "type": "porsche",
                "name_ru": "PORSCHE 911 TURBO S (991.2) GTT-900",
                "name_en": "PORSCHE 911 TURBO S (991.2) GTT-900",
                "tag_ru": "GTT STAGE 2+ • 900 HP НА 100 БЕНЗИНЕ",
                "tag_en": "GTT STAGE 2+ • 900 HP PUMP FUEL",
                "hp": "900+ HP",
                "quarter_mile": "9.450 сек",
                "top_speed": "335+ км/ч",
                "badge_ru": "GTT-900 Stage 2+",
                "badge_en": "GTT-900 Stage 2+",
                "img": "https://static.tildacdn.com/tild6238-6431-4433-a262-383434366339/7R8205127.jpg",
                "fallback_img": "assets/cars/gtr_rdrc_red_panamera.jpg",
                "object_position": "center 50%",
                "video_src": "",
                "video_title": "",
                "desc_ru": "Идеальный баланс повседневного суперкара и рекордного темпа. 900 сил на товарном 100-м бензине с ресурсом заводского мотора.",
                "desc_en": "The quintessential balance of daily driveability and track dominance. 900 reliable horsepower on pump 100 RON gasoline.",
                "specs": {
                        "engine": "3.8L Boxer-6 Twin-Turbo GTT Stage 2",
                        "turbos": "Upgraded High-Efficiency Turbos",
                        "intercoolers": "CSF High-Capacity Charge Coolers",
                        "ecu": "Custom GTT ECU & TCU Map"
                },
                "sort_order": 25
        },
        {
                "id": "porsche_992_puncher",
                "brand": "PORSCHE & GTT",
                "type": "porsche",
                "name_ru": "PORSCHE 911 TURBO S (992) GTT «PUNCHER»",
                "name_en": "PORSCHE 911 TURBO S (992) GTT «PUNCHER»",
                "tag_ru": "МИРОВОЙ РЕКОРД В КАТЕГОРИИ • 9.303 СЕК",
                "tag_en": "WORLD CATEGORY RECORD • 9.303 SEC",
                "hp": "1,000+ HP",
                "quarter_mile": "9.303 сек",
                "top_speed": "276.92 км/ч",
                "badge_ru": "Puncher 992 GTT",
                "badge_en": "Puncher 992 GTT",
                "img": "https://static.tildacdn.com/tild6238-6431-4433-a262-383434366339/7R8205127.jpg",
                "fallback_img": "assets/cars/gtr_rdrc_red_panamera.jpg",
                "object_position": "center 50%",
                "video_src": "",
                "video_title": "",
                "desc_ru": "Культовый Porsche 992 Turbo S «Puncher» Сергея Никитина. Мировой рекорд в категории на UNLIM FEST 2021: 9.303 сек со скоростью 235.83 км/ч на 1/4 мили и 14.778 сек со скоростью 276.92 км/ч на 1/2 мили.",
                "desc_en": "Iconic Porsche 992 Turbo S Puncher driven by Sergey Nikitin. World Category Record at UNLIM FEST 2021: 9.303 sec at 235.83 km/h on 1/4 mile and 14.778 sec at 276.92 km/h on 1/2 mile.",
                "specs": {
                        "engine": "3.8L Boxer-6 992 GTT Spec",
                        "turbos": "Billet Precision Mirror Turbos",
                        "intercooling": "High-Flow Core Package",
                        "fuel": "Methanol Multi-Port System"
                },
                "sort_order": 26
        },
        {
                "id": "bmw_m7_gtt",
                "brand": "BMW M-POWER",
                "type": "bmw",
                "name_ru": "BMW M7 GTT EXECUTIVE TWIN TURBO",
                "name_en": "BMW M7 GTT EXECUTIVE TWIN TURBO",
                "tag_ru": "EXECUTIVE FLAGSHIP • 900 HP V12",
                "tag_en": "EXECUTIVE FLAGSHIP • 900 HP V12",
                "hp": "900+ HP",
                "quarter_mile": "10.200 сек",
                "top_speed": "330+ км/ч",
                "badge_ru": "M7 Executive GTT",
                "badge_en": "M7 Executive GTT",
                "img": "assets/cars/bmw_m5_paddock_front.jpg",
                "fallback_img": "assets/cars/bmw_m5_rdrc_race.jpg",
                "object_position": "center center",
                "video_src": "",
                "video_title": "",
                "desc_ru": "Представительский флагман BMW 7 серии в глубокой доработке GoshaTurboTech. Двухтурбинный V8/V12, бесшумный акустический комфорт в салоне и ураганная динамика на скоростных прямых.",
                "desc_en": "Executive flagship 7-series heavily enhanced by GoshaTurboTech. Twin-turbocharged powertrain offering silent luxury alongside autobahn supremacy.",
                "specs": {
                        "engine": "4.4L V8 TwinPower Turbo GTT Stage 2",
                        "turbos": "Billet Hybrid Turbochargers",
                        "exhaust": "Bespoke Stainless Valvetronic System",
                        "transmission": "ZF 8HP Reinforced Calibration"
                },
                "sort_order": 27
        },
        {
                "id": "mercedes_e63",
                "brand": "MERCEDES-AMG & GTT",
                "type": "other",
                "name_ru": "MERCEDES-AMG E63S 4MATIC+ GTT-950",
                "name_en": "MERCEDES-AMG E63S 4MATIC+ GTT-950",
                "tag_ru": "RDRC 2026 • 9.880 СЕК • ПИЛОТ В. ЩЕД",
                "tag_en": "RDRC 2026 • 9.880 SEC • PILOT V. SHCHED",
                "hp": "950+ HP",
                "quarter_mile": "9.880 сек",
                "top_speed": "335+ км/ч",
                "badge_ru": "E63S GTT-950",
                "badge_en": "E63S GTT-950",
                "img": "assets/photos/team_pilot_paddock.jpg",
                "fallback_img": "assets/cars/dodge_srt_front.jpg",
                "object_position": "center center",
                "video_src": "",
                "video_title": "",
                "desc_ru": "Беспощадный бизнес-седан с 4.0L V8 Biturbo, форсированный до 950 л.с. Пилот В. Щед на RDRC 2026 показал подтвержденное время 9.880 сек со скоростью 234.91 км/ч на 1/4 мили.",
                "desc_en": "Savage executive sedan boasting 950 horsepower from 4.0L V8 Biturbo. Piloted by V. Shched on RDRC 2026 with verified 9.880 sec pass at 234.91 km/h.",
                "specs": {
                        "engine": "4.0L V8 Biturbo M177 Built by GTT",
                        "turbos": "Billet Upgraded Stage 3 Turbos",
                        "downpipes": "Inconel Catless Thermal-Wrapped Pipes",
                        "transmission": "AMG SPEEDSHIFT MCT 9G Flashed"
                },
                "sort_order": 28
        },
        {
                "id": "volga_kgb",
                "brand": "ГАЗ & GTT",
                "type": "other",
                "name_ru": "ВОЛГА ГАЗ-24 КГБ V8 GTT SLEEPER",
                "name_en": "VOLGA GAZ-24 KGB V8 GTT SLEEPER",
                "tag_ru": "ЛЕГЕНДАРНЫЙ СЛИПЕР • V8 TWIN TURBO",
                "tag_en": "LEGENDARY SLEEPER • V8 TWIN TURBO",
                "hp": "1,050+ HP",
                "quarter_mile": "9.420 сек",
                "top_speed": "340+ км/ч",
                "badge_ru": "Волга КГБ V8",
                "badge_en": "Volga KGB V8",
                "img": "assets/cars/volga_kgb_v8_sleeper.jpg",
                "fallback_img": "assets/cars/volga_kgb_v8_sleeper.jpg",
                "object_position": "center center",
                "video_src": "",
                "video_title": "",
                "desc_ru": "Легендарный советский проект в кузове ГАЗ-24 «Догонялка». Внешне аутентичный хромированный силуэт спецслужб, внутри — современный турбированный V8 и кастомное спортивное шасси.",
                "desc_en": "Legendary Soviet KGB interceptor GAZ-24 sleeper. Factory classic exterior concealing modern twin-turbo V8 and motorsport chassis.",
                "specs": {
                        "engine": "V8 Twin Turbo Restomod Powertrain",
                        "chassis": "Bespoke Independent Suspension & Wilwood Brakes",
                        "transmission": "Reinforced 6-Speed Manual",
                        "interior": "Restored Factory Soviet Cockpit"
                },
                "sort_order": 29
        },
        {
                "id": "ferrari_512tr",
                "brand": "FERRARI & GTT",
                "type": "other",
                "name_ru": "FERRARI 512 TR GTT HERITAGE CLASSIC",
                "name_en": "FERRARI 512 TR GTT HERITAGE CLASSIC",
                "tag_ru": "ИТАЛЬЯНСКАЯ ИКОНА • FLAT-12 ENGINE",
                "tag_en": "ITALIAN ICON • FLAT-12 ENGINE",
                "hp": "550+ HP",
                "quarter_mile": "10.800 сек",
                "top_speed": "315+ км/ч",
                "badge_ru": "Ferrari 512 TR",
                "badge_en": "Ferrari 512 TR",
                "img": "assets/cars/gtt_classified_car.svg",
                "fallback_img": "assets/cars/gtt_classified_car.svg",
                "object_position": "center center",
                "video_src": "",
                "video_title": "",
                "desc_ru": "Итальянская икона с 12-цилиндровым оппозитным двигателем Flat-12. Комплексная механическая доработка в цехах GTT, индивидуальный титановый выпуск и филигранная калибровка впрыска.",
                "desc_en": "Italian legend powered by Flat-12 engine. Complete mechanical overhaul by GTT, bespoke titanium exhaust and precision injection mapping.",
                "specs": {
                        "engine": "4.9L Flat-12 Naturally Aspirated Maranello",
                        "exhaust": "Handmade Titanium Valved Exhaust",
                        "clutch": "GTT Heavy Duty Multi-Plate Clutch",
                        "brakes": "Brembo Racing High-Friction Setup"
                },
                "sort_order": 30
        },
        {
                "id": "tesla_plaid",
                "brand": "TESLA & GTT",
                "type": "other",
                "name_ru": "TESLA MODEL S PLAID GTT DYNAMICS SPEC",
                "name_en": "TESLA MODEL S PLAID GTT DYNAMICS SPEC",
                "tag_ru": "ЭЛЕКТРО-ГИПЕРКАР • 1020 HP • 9.230 СЕК",
                "tag_en": "ELECTRIC HYPERCAR • 1020 HP • 9.230 SEC",
                "hp": "1,020+ HP",
                "quarter_mile": "9.230 сек",
                "top_speed": "322+ км/ч",
                "badge_ru": "Tesla Plaid GTT",
                "badge_en": "Tesla Plaid GTT",
                "img": "assets/cars/gtt_classified_car.svg",
                "fallback_img": "assets/cars/gtt_classified_car.svg",
                "object_position": "center center",
                "video_src": "",
                "video_title": "",
                "desc_ru": "Трековый проект на базе трехмоторного седана Tesla Model S Plaid. Спортивная карбон-керамическая тормозная система GTT, оптимизация охлаждения инверторов и аэродинамический сплиттер.",
                "desc_en": "Track project based on tri-motor Tesla Model S Plaid. GTT carbon-ceramic braking package, inverter thermal optimization and high-downforce aero.",
                "specs": {
                        "engine": "Tri-Motor Carbon-Sleeved Electric Powertrain",
                        "power": "1,020 HP / 1,420 Nm Instant Torque",
                        "brakes": "GTT Carbon Ceramic 410mm Track Rotors",
                        "suspension": "Lowered Active Air Suspension Calibration"
                },
                "sort_order": 31
        },
        {
                "id": "xiaomi_su7",
                "brand": "XIAOMI & GTT",
                "type": "other",
                "name_ru": "XIAOMI SU7 ULTRA GTT RACE SPEC",
                "name_en": "XIAOMI SU7 ULTRA GTT RACE SPEC",
                "tag_ru": "RDRC СУПЕРКУБОК 2026 • 9.130 СЕК",
                "tag_en": "RDRC SUPERCUP 2026 • 9.130 SEC",
                "hp": "1,548 HP",
                "quarter_mile": "9.130 сек",
                "top_speed": "350+ км/ч",
                "badge_ru": "SU7 Ultra 9.130s",
                "badge_en": "SU7 Ultra 9.130s",
                "img": "assets/cars/gtt_classified_car.svg",
                "fallback_img": "assets/cars/gtt_classified_car.svg",
                "object_position": "center center",
                "video_src": "",
                "video_title": "",
                "desc_ru": "Сенсационный электрический гиперседан Xiaomi SU7 Ultra под управлением В. Щед в зачете GoshaTurboTech. Официальный результат на Суперкубке RDRC 2026: 9.130 сек со скоростью 249.31 км/ч на 1/4 мили (3/8 мили: 11.769 с / 287.31 км/ч).",
                "desc_en": "Sensational Xiaomi SU7 Ultra hyper-sedan piloted by V. Shched for GoshaTurboTech. Official RDRC Supercup 2026 pass: 9.130 sec at 249.31 km/h on 1/4 mile.",
                "specs": {
                        "engine": "Triple V8s Electric Hyper-Motor System",
                        "power": "1,548 HP / 0-100 km/h in 1.97 sec",
                        "brakes": "Carbon Ceramic 6-Piston AP Racing",
                        "aero": "Carbon Rear Wing Generating 285 kg Downforce"
                },
                "sort_order": 32
        },
        {
                "id": "zeekr_zevs",
                "brand": "ZEEKR & GTT",
                "type": "other",
                "name_ru": "ZEEKR 007 PERFORMANCE ZEVS GTT",
                "name_en": "ZEEKR 007 PERFORMANCE ZEVS GTT",
                "tag_ru": "RDRC 2026 • 11.317 СЕК • К. АВДЕЙКО",
                "tag_en": "RDRC 2026 • 11.317 SEC • K. AVDEYKO",
                "hp": "646 HP",
                "quarter_mile": "11.317 сек",
                "top_speed": "210+ км/ч",
                "badge_ru": "Zeekr ZEVS",
                "badge_en": "Zeekr ZEVS",
                "img": "assets/cars/gtt_classified_car.svg",
                "fallback_img": "assets/cars/gtt_classified_car.svg",
                "object_position": "center center",
                "video_src": "",
                "video_title": "",
                "desc_ru": "Zeekr 007 Performance «ZEVS» команды GoshaTurboTech под управлением Кирилла Авдейко и Сергея Савченко. Зафиксированное время на этапе RDRC 2026: 11.317 сек со скоростью 204.31 км/ч.",
                "desc_en": "Zeekr 007 Performance ZEVS competing for GoshaTurboTech under K. Avdeyko and S. Savchenko. Official RDRC 2026 best pass: 11.317 sec at 204.31 km/h.",
                "specs": {
                        "engine": "Dual Silicon Carbide Electric Motors",
                        "power": "646 HP Silicon Carbide AWD",
                        "battery": "800V Golden Battery Technology",
                        "chassis": "CCD Electromagnetic Active Suspension"
                },
                "sort_order": 33
        },
        {
                "id": "lambo_nera",
                "brand": "LAMBORGHINI & GTT",
                "type": "lambo",
                "name_ru": "GALLARDO NERA TWIN TURBO GTT",
                "name_en": "GALLARDO NERA TWIN TURBO GTT",
                "tag_ru": "МИРОВОЙ РЕКОРД 1 МИЛЯ • 409.55 КМ/Ч",
                "tag_en": "WORLD 1-MILE RECORD • 409.55 KM/H",
                "hp": "1,800+ HP",
                "quarter_mile": "8.500 сек",
                "top_speed": "409.55 км/ч",
                "badge_ru": "Мировой Рекорд 409 км/ч",
                "badge_en": "World Record 409 km/h",
                "img": "assets/photos/huracan_zelenka_gtt.jpg",
                "fallback_img": "assets/photos/huracan_rdrc_stage_line.jpg",
                "object_position": "center center",
                "video_src": "",
                "video_title": "",
                "desc_ru": "Исторический мировой рекорд скорости на дистанции 1 миля на аэродроме Крит (Греция): 20.845 сек со скоростью 409.55 км/ч! Легендарный проект, принесший GoshaTurboTech всемирную славу в суперкар-сообществе.",
                "desc_en": "Historic World Record on 1 Mile distance at Crete airfield (Greece): 20.845 sec at 409.55 km/h! The legendary build that cemented GoshaTurboTech on the global motorsport stage.",
                "specs": {
                        "engine": "5.0L V10 Billet Internals GTT Spec",
                        "turbos": "Dual Precision High-Flow Turbochargers",
                        "fuel": "VP Racing C16 Race Gasoline",
                        "aero": "High-Speed Salt-Flat Style Rear Wing"
                },
                "sort_order": 34
        },
        {
                "id": "audi_gyurza",
                "brand": "AUDI & GTT",
                "type": "audi",
                "name_ru": "AUDI R8 V10 PLUS TT «GYURZA» БАЙКАЛ",
                "name_en": "AUDI R8 V10 PLUS TT «GYURZA» BAIKAL",
                "tag_ru": "РЕКОРД РОССИИ НА ЛЬДУ БАЙКАЛА • 124 КМ/Ч",
                "tag_en": "BAIKAL ICE SPEED RECORD • 124 KM/H",
                "hp": "1,350+ HP",
                "quarter_mile": "9.100 сек",
                "top_speed": "345+ км/ч",
                "badge_ru": "Рекорд льда Байкала",
                "badge_en": "Baikal Ice Record",
                "img": "https://static.tildacdn.com/tild6631-3236-4965-a162-626231376136/maxresdefault.jpg",
                "fallback_img": "assets/cars/audi_r8_tsmr_launch.jpg",
                "object_position": "center 60%",
                "video_src": "",
                "video_title": "",
                "desc_ru": "Подготовленный в лаборатории GTT совместно с Kiwamaru болид Audi R8 V10 Plus Twin Turbo «Гюрза». Официальный рекорд России на Днях скорости на льду озера Байкал: средняя скорость 124 км/ч на дистанции 1 км с места по голому льду.",
                "desc_en": "Engineered by GTT alongside Kiwamaru. Official Russian record at Speed Days on Lake Baikal ice: 124 km/h average speed across 1 km from standing start on bare ice.",
                "specs": {
                        "engine": "5.2L V10 FSI Twin Turbo Winter Spec",
                        "turbos": "Custom Fast-Spool Billet Turbochargers",
                        "tires": "Studded Competition Ice Rally Rubber",
                        "ecu": "GTT Ice-Traction Electronic Calibration"
                },
                "sort_order": 35
        }
]

    for idx, car in enumerate(default_projects):
        cursor.execute("""
        INSERT OR REPLACE INTO cars (
            id, brand, type, name_ru, name_en, tag_ru, tag_en, hp, quarter_mile, top_speed,
            badge_ru, badge_en, img, fallback_img, video_src, video_title, desc_ru, desc_en, specs_json, sort_order
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            car["id"], car["brand"], car["type"], car["name_ru"], car.get("name_en", car["name_ru"]),
            car.get("tag_ru", ""), car.get("tag_en", ""), car["hp"], car.get("quarter_mile", ""), car.get("top_speed", ""),
            car.get("badge_ru", ""), car.get("badge_en", ""), car["img"], car.get("fallback_img", car["img"]),
            car.get("video_src", ""), car.get("video_title", ""), car.get("desc_ru", ""), car.get("desc_en", ""),
            json.dumps(car.get("specs", {})), idx + 1
        ))

    default_team = [
        {"id": "m1", "name": "Гоша", "role": "Основатель & Главный конструктор GTT", "status": "active", "photo": "https://static.tildacdn.com/tild3630-6231-4439-b763-373662653964/ncse4W-BrwAKR5pHQvkX.jpg"},
        {"id": "m2", "name": "Эдик", "role": "Технический директор ателье", "status": "active", "photo": "https://static.tildacdn.com/tild6237-6430-4338-a236-626231306234/photo.jpg"},
        {"id": "m3", "name": "Дмитрий", "role": "Администратор проектов", "status": "atelier", "photo": "https://static.tildacdn.com/tild6538-3832-4431-b761-636265323064/896A0858.jpg"},
        {"id": "m4", "name": "Мария", "role": "Делопроизводитель & Менеджер рекордов", "status": "atelier", "photo": "https://static.tildacdn.com/tild3132-6639-4537-b432-323633653738/7R209573.jpg"},
        {"id": "m5", "name": "Павел", "role": "Делопроизводитель & Логист команды", "status": "atelier", "photo": "https://static.tildacdn.com/tild3933-6664-4738-b164-626565346535/7R203219.jpg"},
        {"id": "m6", "name": "Георгий", "role": "Инженер-электрик & Калибровщик Motec/Syvecs", "status": "active", "photo": "https://static.tildacdn.com/tild3561-3862-4562-b734-363034623936/photo.jpg"},
        {"id": "m7", "name": "Рустам", "role": "Моторист высшей квалификации", "status": "active", "photo": "https://static.tildacdn.com/tild6263-3266-4433-b264-626239376166/7R209460.jpg"},
        {"id": "m8", "name": "Никита", "role": "Гоночный механик паддока", "status": "paddock", "photo": "https://static.tildacdn.com/tild3965-3435-4135-b437-386634613361/7R203125_2.jpg"},
        {"id": "m9", "name": "Иван", "role": "Гоночный механик паддока", "status": "paddock", "photo": "https://static.tildacdn.com/tild3737-3661-4365-b831-383634343036/7R203122_2.jpg"},
        {"id": "m10", "name": "Алексей", "role": "Гоночный механик паддока", "status": "paddock", "photo": "https://static.tildacdn.com/tild6639-3931-4563-a462-303263313765/7R209470.jpg"},
        {"id": "m11", "name": "Фазик", "role": "Механик сборочного цеха", "status": "atelier", "photo": "https://static.tildacdn.com/tild6464-3435-4433-b162-616263636632/7R209475.jpg"},
        {"id": "m12", "name": "Степан", "role": "Механик сборочного цеха", "status": "atelier", "photo": "https://static.tildacdn.com/tild3632-6234-4637-b431-653731376638/7R200607.jpg"},
        {"id": "m13", "name": "Алексей", "role": "Механик ходовой части", "status": "atelier", "photo": "https://static.tildacdn.com/tild6166-6166-4539-b731-363937393131/7R200882.jpg"},
        {"id": "m14", "name": "Роман", "role": "Сварщик-фабрикатор титана и инконеля", "status": "active", "photo": "https://static.tildacdn.com/tild6537-6137-4239-a630-323765383839/7R201446.jpg"},
        {"id": "m15", "name": "Евгений", "role": "Диагност электронных систем", "status": "active", "photo": "https://static.tildacdn.com/tild3961-3566-4536-b334-636632383732/7R201128.jpg"}
    ]
    for idx, member in enumerate(default_team):
        cursor.execute("INSERT OR REPLACE INTO team (id, name, role, status, photo, sort_order) VALUES (?, ?, ?, ?, ?, ?)",
                       (member["id"], member["name"], member["role"], member["status"], member.get("photo"), idx + 1))

    default_records = [
        {"id": "rec_moses", "year": "2016 • Абсолютный рекорд GTT", "car": "NISSAN GT-R R35 GTT-1800 «MOSES»", "telemetry": "1/4 мили: 7.526 сек • 304.36 км/ч", "desc": "Легендарные тесты в ОАЭ и UNLIM 500+ Greece. 7.526 сек со скоростью 304.36 км/ч — быстрейший результат на 402 м за всю историю ателье GoshaTurboTech.", "img": "https://static.tildacdn.com/tild3834-3466-4637-b632-636439343565/GTR-MOSES-min.png"},
        {"id": "rec_draco", "year": "2024 • Рекорд RDRC Pro-Mod", "car": "NISSAN GT-R R35 DRACO PRO-MOD #300", "telemetry": "1/4 мили: 7.694 сек • 304.44 км/ч", "desc": "Пилот Руслан Арефьев на этапе RDRC 2024 (заезд №537). Подтвержденный протокол DragDB. Скорость на выходе 1/2 мили превысила 323.88 км/ч.", "img": "assets/cars/gtr_draco_promod_front.jpg"},
        {"id": "rec_kurdalagon", "year": "26.10.2026 • Рекорд Быково", "car": "NISSAN GT-R R35 «КУРДАЛАГОН»", "telemetry": "1/4 мили: 7.766 сек • 300.00 км/ч", "desc": "Свежайший подтвержденный рекорд команды GoshaTurboTech, зафиксированный на трек-дне в Быково в конце октября 2026 года.", "img": "https://static.tildacdn.com/tild3032-3266-4139-a563-653561393961/gtr-min.png"},
        {"id": "rec_rokot", "year": "2026 • Рекорд России для Audi", "car": "AUDI R8 V10 PLUS TWIN TURBO «ROKOT»", "telemetry": "1/4 мили: 7.877 сек • Суперкубок RDRC", "desc": "Эдуард Саркисян и Руслан Арефьев на болиде ателье GoshaTurboTech впервые в истории России вывели Audi из рубежа 8 секунд.", "img": "assets/cars/audi_r8_tsmr_launch.jpg"},
        {"id": "rec_bezzubik", "year": "Рекорд Европы • Race 1000", "car": "LAMBORGHINI HURACAN TT BEZZUBIK", "telemetry": "1/2 мили: 353.02 км/ч • 1/4 мили: 8.054 сек", "desc": "Официальный рекорд Европы на дистанции 804 м среди полноприводных суперкаров в Германии (353.02 км/ч) и 8.054 сек на 402 м. Легенда GTT.", "img": "assets/photos/huracan_rdrc_stage_line.jpg"},
        {"id": "rec_zelenka", "year": "ОАЭ & Германия • 344.60 км/ч", "car": "LAMBORGHINI HURACAN TWIN TURBO «ЗЕЛЕНКА»", "telemetry": "1/4 мили: 8.373 сек • 1000 м: 344.60 км/ч", "desc": "8.373 сек со скоростью 275.26 км/ч на 1/4 мили в ОАЭ и 344.60 км/ч на 1000 м в Германии (Rolling 50 1000). Культовый проект GoshaTurboTech.", "img": "assets/photos/huracan_zelenka_gtt.jpg"},
        {"id": "rec_lucifer", "year": "RDRC 2026 • 1-е место в классе", "car": "NISSAN GT-R R35 «LUCIFER» GTT #71", "telemetry": "1/4 мили: 8.400 сек • 1/2 мили: 343.67 км/ч", "desc": "Флагманский болид Гоши Перцхелии. 8.400 сек в ОАЭ, победный заезд 8.551 сек на RDRC 2026 и 343.67 км/ч на Unlim 500+.", "img": "assets/cars/gtr_lucifer_solo.jpg"},
        {"id": "rec_korzhik", "year": "Рекорд России • Московская миля", "car": "NISSAN GT-R R35 GTT «KORZHIK» #712", "telemetry": "1/2 мили: 13.435 сек • 334.41 км/ч", "desc": "Пилот Николай Коржов. 8.602 сек на 402 м и официальный рекорд России на 1/2 мили — 13.435 сек со скоростью 334.41 км/ч.", "img": "https://static.tildacdn.com/tild3365-3636-4135-b136-623937643037/korzhik2-min.png"},
        {"id": "rec_hulk", "year": "Суперкубок RDRC 2026", "car": "LAMBORGHINI HURACAN LP610-4 «HULK»", "telemetry": "1/4 мили: 8.951 сек • 3/8 мили: 291.14 км/ч", "desc": "Пилот Эдуард Саркисян в зачете GoshaTurboTech. 8.951 сек со скоростью 257.14 км/ч на 1/4 мили (3/8 мили: 11.561 с / 291.14 км/ч).", "img": "assets/cars/huracan_green_grey_rdrc.jpg"},
        {"id": "rec_tonystark", "year": "Record Days 2023", "car": "AUDI R8 V10 PLUS TT «TONY STARK»", "telemetry": "1/4 мили: 8.948 сек • 247.68 км/ч", "desc": "Стабильный выезд из 9 секунд на трек-днях Record Days (8.948 сек) и 15.403 сек со скоростью 287.19 км/ч на 1/2 мили.", "img": "https://static.tildacdn.com/tild3162-3462-4064-b931-313636663133/audi_r8-min.png"},
        {"id": "rec_gtt1200", "year": "Рекорд России/Европы • RDRC RacePark", "car": "PORSCHE 911 TURBO (991.1) GTT-1200", "telemetry": "1/4 мили: 9.086 сек • 259.64 км/ч", "desc": "Пилот Алексей Сагал. Рекорд России и Европы для кузова 991.1 (9.086 с), скорость на 1/2 мили — 312.77 км/ч.", "img": "https://static.tildacdn.com/tild3537-3330-4137-a166-303730623266/IMG_9940-min.png"},
        {"id": "rec_su7", "year": "2026 • Суперкубок RDRC", "car": "XIAOMI SU7 ULTRA GTT RACE SPEC", "telemetry": "1/4 мили: 9.130 сек • 3/8 мили: 287.31 км/ч", "desc": "Пилот В. Щед в зачете GoshaTurboTech на Суперкубке RDRC 2026 показал сенсационные 9.130 сек со скоростью 249.31 км/ч.", "img": "assets/cars/bmw_m5_rdrc_race.jpg"},
        {"id": "rec_imba", "year": "2022–2025 • Мировой рекорд RDRC", "car": "PORSCHE 911 TURBO S (992) GTT-IMBA", "telemetry": "1/4 мили: 9.167 сек • RDRC 2025", "desc": "Пилот Мария Кутычкина. Мировой рекорд 9.252 сек со скоростью 231.80 км/ч на заводских турбинах, улучшенный на RDRC 2025 до 9.167 сек.", "img": "https://static.tildacdn.com/tild6539-3534-4834-b938-323035363066/7R204787_.jpg"},
        {"id": "rec_puncher", "year": "2021 • Мировой ориентир UNLIM FEST", "car": "PORSCHE 911 TURBO S (992) PUNCHER", "telemetry": "1/4 мили: 9.303 сек • 235.83 км/ч", "desc": "Мировой ориентир для дорожных Porsche 992 на Unlim Fest (9.303 сек) и 1/2 мили за 14.778 сек со скоростью 276.92 км/ч.", "img": "https://static.tildacdn.com/tild6238-6431-4433-a262-383434366339/7R8205127.jpg"},
        {"id": "rec_gyurza", "year": "2022 • Абсолютный рекорд льда", "car": "AUDI R8 V10 PLUS TT «GYURZA»", "telemetry": "1 км с места на льду: 124.00 км/ч", "desc": "Дни скорости на льду озера Байкал совместно с Kiwamaru. Абсолютный триумфатор ледовых заездов с места в истории России.", "img": "https://static.tildacdn.com/tild6631-3236-4965-a162-626231376136/maxresdefault.jpg"},
        {"id": "rec_gallardo", "year": "Мировой рекорд • 1 миля (1609 м)", "car": "LAMBORGHINI GALLARDO NERA TWIN TURBO", "telemetry": "1 миля: 409.55 км/ч • 20.845 сек", "desc": "Аэродром Крит, Греция. Легендарная Черная Галлардо Гоши Перцхелии — первый болид из России, покоривший планку 400+ км/ч на 1 милю.", "img": "assets/photos/huracan_zelenka_gtt.jpg"}
    ]
    for idx, rec in enumerate(default_records):
        cursor.execute("INSERT OR REPLACE INTO records (id, year, car, telemetry, desc, img, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)",
                       (rec["id"], rec["year"], rec["car"], rec["telemetry"], rec["desc"], rec.get("img", ""), idx + 1))

    default_gallery = [
        {"id": "gal_1", "tag": "RDRC CHAMPION", "title": "Huracan TT «Зеленка» GTT", "img": "assets/photos/huracan_zelenka_gtt.jpg"},
        {"id": "gal_2", "tag": "BURNOUT SMOKE", "title": "Dodge Demon", "img": "assets/cars/dodge_burnout_sunset.jpg"},
        {"id": "gal_3", "tag": "3000+ HP PRO-MOD", "title": "Nissan GT-R R35 Draco Dragster", "img": "assets/cars/gtr_draco_promod_front.jpg"},
        {"id": "gal_4", "tag": "1400+ HP V10 TT", "title": "Audi R8 V10 Plus TT «Rokot»", "img": "assets/cars/audi_r8_tsmr_launch.jpg"},
        {"id": "gal_5", "tag": "CHAMPIONSHIP WINNER", "title": "Nissan GT-R R35 Lucifer", "img": "assets/cars/gtr_lucifer_solo.jpg"},
        {"id": "gal_6", "tag": "AERODYNAMICS", "title": "Red Chrome Nissan GT-R R35", "img": "assets/cars/gtr_red_front_rdrc.jpg"},
        {"id": "gal_7", "tag": "MIDNIGHT BLUE", "title": "Nissan GT-R R35 #888 Sunset Pass", "img": "assets/photos/gtr_blue_888_rdrc.jpg"},
        {"id": "gal_8", "tag": "CHIEF MOTORSPORT ENGINEER", "title": "Гоша Перцхелия на стрипе RDRC", "img": "assets/photos/gosha_on_track.jpg"},
        {"id": "gal_9", "tag": "ATELIER GARAGE", "title": "Бокс GTT: Паддок команды & Nissan GT-R", "img": "assets/cars/bmw_m5_paddock_front.jpg"},
        {"id": "gal_10", "tag": "TWIN TURBO V8", "title": "BMW M5 G90 Stage 2 GTT", "img": "assets/cars/bmw_m5_rdrc_race.jpg"},
        {"id": "gal_11", "tag": "TWIN TURBO V10", "title": "Huracan Twin Turbo «Зеленка» GTT", "img": "assets/cars/huracan_green_bezzubik_track.jpg"},
        {"id": "gal_12", "tag": "BILLET MOTORSPORT", "title": "VR38 Billet & Дрэг-подвеска", "img": "assets/cars/gtr_draco_connections.jpg"},
        {"id": "gal_13", "tag": "PARC FERMÉ", "title": "Пилот Саркисян & Draco GTT", "img": "assets/photos/pilot_draco_sarkisyan.jpg"},
        {"id": "gal_14", "tag": "STAGING LINE", "title": "GT-R Lucifer на прогреве", "img": "assets/cars/gtr_lucifer_front.jpg"},
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
        {"id": "med_3", "title": "Красный хромированный GT-R Pro-Mod", "type": "mp4", "url": "assets/videos/gtr_red_g35_action_web.mp4", "car": "GT-R Red Chrome"},
        {"id": "med_4", "title": "Дымный бернаут Dodge Hellcat RDRC", "type": "mp4", "url": "assets/videos/dodge_challenger_action.mp4", "car": "Dodge Challenger SRT"},
        {"id": "med_5", "title": "Huracan «Зеленка» Twin Turbo прогрев", "type": "mp4", "url": "assets/videos/r8_launch_action.mp4", "car": "Huracan Зеленка"}
    ]
    for idx, med in enumerate(default_media):
        cursor.execute("INSERT OR REPLACE INTO media (id, title, type, url, car, sort_order) VALUES (?, ?, ?, ?, ?, ?)",
                       (med["id"], med["title"], med["type"], med["url"], med["car"], idx + 1))

# ================= CRUD FUNCTIONS =================

# --- Cars ---
def get_all_cars() -> List[Dict[str, Any]]:
    conn = get_connection()
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
        cars.append(car)
    conn.close()
    return cars

def get_car_by_id(car_id: str) -> Optional[Dict[str, Any]]:
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM cars WHERE id = ?", (car_id,))
    row = cursor.fetchone()
    conn.close()
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
    return car

def upsert_car(car_data: Dict[str, Any]) -> Dict[str, Any]:
    conn = get_connection()
    cursor = conn.cursor()
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
    conn.commit()
    conn.close()
    return get_car_by_id(car_data["id"])

# ================= PERSISTENT SESSIONS =================
def create_session(token: str, username: str, lifetime_seconds: float = 7 * 86400) -> str:
    now = time.time()
    expires_at = now + lifetime_seconds
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
    INSERT INTO admin_sessions (token, username, expires_at)
    VALUES (?, ?, ?)
    ON CONFLICT(token) DO UPDATE SET expires_at=excluded.expires_at
    """, (token, username, expires_at))
    conn.commit()
    conn.close()
    return token

def get_session(token: str) -> Optional[Dict[str, Any]]:
    if not token:
        return None
    now = time.time()
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT token, username, expires_at FROM admin_sessions WHERE token = ?", (token,))
    row = cursor.fetchone()
    conn.close()
    if row:
        if row[2] > now:
            return {"token": row[0], "username": row[1], "expires_at": row[2]}
        else:
            delete_session(token)
    return None

def touch_session(token: str, lifetime_seconds: float = 7 * 86400):
    now = time.time()
    expires_at = now + lifetime_seconds
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE admin_sessions SET expires_at = ? WHERE token = ?", (expires_at, token))
    conn.commit()
    conn.close()

def delete_session(token: str):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM admin_sessions WHERE token = ?", (token,))
    conn.commit()
    conn.close()

def clean_expired_db_sessions():
    now = time.time()
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM admin_sessions WHERE expires_at < ?", (now,))
    conn.commit()
    conn.close()

def delete_car(car_id: str) -> bool:
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM cars WHERE id = ?", (car_id,))
    deleted = cursor.rowcount > 0
    conn.commit()
    conn.close()
    return deleted

def reorder_featured_cars(featured_ids: List[str]) -> bool:
    if not featured_ids or len(featured_ids) < 1:
        return False
    conn = get_connection()
    cursor = conn.cursor()
    try:
        for idx, car_id in enumerate(featured_ids):
            cursor.execute("UPDATE cars SET sort_order = ? WHERE id = ?", (idx + 1, car_id))
        placeholders = ','.join('?' for _ in featured_ids)
        cursor.execute(f"SELECT id FROM cars WHERE id NOT IN ({placeholders}) ORDER BY sort_order ASC, rowid ASC", featured_ids)
        remaining = cursor.fetchall()
        for idx, r in enumerate(remaining):
            cursor.execute("UPDATE cars SET sort_order = ? WHERE id = ?", (len(featured_ids) + 1 + idx, r[0]))
        conn.commit()
        conn.close()
        return True
    except Exception as e:
        conn.rollback()
        conn.close()
        print(f"[GTT DB Error] Reorder featured: {e}")
        return False

# --- Team ---
def get_all_team() -> List[Dict[str, Any]]:
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM team ORDER BY sort_order ASC, rowid ASC")
    rows = [dict(r) for r in cursor.fetchall()]
    conn.close()
    return rows

def upsert_team_member(member: Dict[str, Any]) -> Dict[str, Any]:
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
    INSERT INTO team (id, name, role, status, photo, social)
    VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
        name=excluded.name,
        role=excluded.role,
        status=excluded.status,
        photo=COALESCE(excluded.photo, team.photo),
        social=COALESCE(excluded.social, team.social)
    """, (
        member["id"], 
        member["name"], 
        member["role"], 
        member.get("status", "active"),
        member.get("photo"),
        member.get("social")
    ))
    conn.commit()
    conn.close()
    return member

def delete_team_member(member_id: str) -> bool:
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM team WHERE id = ?", (member_id,))
    deleted = cursor.rowcount > 0
    conn.commit()
    conn.close()
    return deleted

# --- Records ---
def get_all_records() -> List[Dict[str, Any]]:
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM records ORDER BY sort_order ASC, rowid ASC")
    rows = [dict(r) for r in cursor.fetchall()]
    conn.close()
    return rows

def upsert_record(record: Dict[str, Any]) -> Dict[str, Any]:
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
    INSERT INTO records (id, year, car, telemetry, desc, img)
    VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
        year=excluded.year,
        car=excluded.car,
        telemetry=excluded.telemetry,
        desc=excluded.desc,
        img=excluded.img
    """, (record["id"], record["year"], record["car"], record["telemetry"], record.get("desc", ""), record.get("img", "")))
    conn.commit()
    conn.close()
    return record

def delete_record(record_id: str) -> bool:
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM records WHERE id = ?", (record_id,))
    deleted = cursor.rowcount > 0
    conn.commit()
    conn.close()
    return deleted

# --- Gallery ---
def get_all_gallery() -> List[Dict[str, Any]]:
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM gallery ORDER BY sort_order ASC, rowid ASC")
    rows = [dict(r) for r in cursor.fetchall()]
    conn.close()
    return rows

def upsert_gallery(item: Dict[str, Any]) -> Dict[str, Any]:
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
    INSERT INTO gallery (id, tag, title, img)
    VALUES (?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
        tag=excluded.tag,
        title=excluded.title,
        img=excluded.img
    """, (item["id"], item["tag"], item["title"], item["img"]))
    conn.commit()
    conn.close()
    return item

def delete_gallery(item_id: str) -> bool:
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM gallery WHERE id = ?", (item_id,))
    deleted = cursor.rowcount > 0
    conn.commit()
    conn.close()
    return deleted

# --- Media ---
def get_all_media() -> List[Dict[str, Any]]:
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM media ORDER BY sort_order ASC, rowid ASC")
    rows = [dict(r) for r in cursor.fetchall()]
    conn.close()
    return rows

def upsert_media(item: Dict[str, Any]) -> Dict[str, Any]:
    conn = get_connection()
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
    conn.close()
    return item

def delete_media(item_id: str) -> bool:
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM media WHERE id = ?", (item_id,))
    deleted = cursor.rowcount > 0
    conn.commit()
    conn.close()
    return deleted

# --- Settings ---
def get_setting(key: str, default: str = "") -> str:
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT value FROM settings WHERE key = ?", (key,))
    row = cursor.fetchone()
    conn.close()
    return row[0] if row else default

def set_setting(key: str, value: str):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value", (key, value))
    conn.commit()
    conn.close()

# --- Traffic Analytics ---
def record_traffic(device: str, source: str, page: str, is_new: bool = True):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
    INSERT INTO traffic_logs (device, source, page, is_new_session)
    VALUES (?, ?, ?, ?)
    """, (device, source, page, 1 if is_new else 0))
    conn.commit()
    conn.close()

def get_traffic_summary() -> Dict[str, Any]:
    conn = get_connection()
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
    conn.close()

    return {
        "totalViews": total_views,
        "uniqueVisitors": unique_visitors,
        "todayViews": today_views,
        "log": logs
    }

def reset_traffic():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM traffic_logs")
    conn.commit()
    conn.close()

# --- Technical & Motorsport Partners ---
DEFAULT_PARTNERS = [
    {
        "id": "vp_racing",
        "name": "VP Racing Fuels",
        "category": "Топливо и метанол",
        "desc": "Мировой эталон спортивного топлива, гоночного кислородного бензина и чистого метанола M1 для рекордных заездов RDRC.",
        "logo": "assets/photos/partners_banner.png",
        "link": "https://vpracingfuels.com",
        "sort_order": 1,
        "is_active": 1
    },
    {
        "id": "motul",
        "name": "Motul Motorsport",
        "category": "Смазочные материалы",
        "desc": "Синтетические моторные масла Motul 300V Motorsport Line с технологией Ester Core, защищающие 2000+ сильные моторы GTT при пиковых нагрузках.",
        "logo": "assets/photos/partners_banner.png",
        "link": "https://www.motul.com",
        "sort_order": 2,
        "is_active": 1
    },
    {
        "id": "syvecs",
        "name": "Syvecs Powertrain Control",
        "category": "Электроника и ЭБУ",
        "desc": "Высокотехнологичные блоки управления двигателем (ECU), полноприводной трансмиссией (AWD Controller) и алгоритмами лаунч-контроля.",
        "logo": "assets/photos/partners_banner.png",
        "link": "https://www.syvecs.com",
        "sort_order": 3,
        "is_active": 1
    },
    {
        "id": "motec",
        "name": "MoTeC Systems",
        "category": "Электроника и ЭБУ",
        "desc": "Золотой стандарт мирового автоспорта: управляющие процессоры M1, цветные цифровые приборные панели C1212 и прецизионные логгеры телеметрии.",
        "logo": "assets/photos/partners_banner.png",
        "link": "https://www.motec.com.au",
        "sort_order": 4,
        "is_active": 1
    },
    {
        "id": "precision_turbo",
        "name": "Precision Turbo & Engine",
        "category": "Турбосистемы",
        "desc": "Специализированные гоночные турбокомпрессоры сверхвысокого наддува серии Pro Mod и GEN2 CEA, обеспечивающие отдачу до 3,500+ л.с.",
        "logo": "assets/photos/partners_banner.png",
        "link": "https://www.precisionturbo.net",
        "sort_order": 5,
        "is_active": 1
    },
    {
        "id": "ppg_gearboxes",
        "name": "PPG (Pfitzner Gearboxes)",
        "category": "Трансмиссия",
        "desc": "Усиленные прямозубые кулачковые и секвентальные ряды передач, выдерживающие колоссальный крутящий момент и агрессивные переключения.",
        "logo": "assets/photos/partners_banner.png",
        "link": "https://www.ppgearbox.com.au",
        "sort_order": 6,
        "is_active": 1
    },
    {
        "id": "redline_oil",
        "name": "Red Line Synthetic Oil",
        "category": "Смазочные материалы",
        "desc": "Специализированные трансмиссионные жидкости ShockProof и гоночные присадки для дифференциалов повышенного трения и раздаточных коробок.",
        "logo": "assets/photos/partners_banner.png",
        "link": "https://www.redlineoil.com",
        "sort_order": 8,
        "is_active": 1
    },
    {
        "id": "bell_intercoolers",
        "name": "Bell Intercoolers",
        "category": "Охлаждение",
        "desc": "Высокоэффективные теплообменники и кастомные интеркулерные ядра с минимальным сопротивлением для мощных турбосистем.",
        "logo": "assets/photos/partners_banner.png",
        "link": "https://www.bellintercoolers.com",
        "sort_order": 9,
        "is_active": 1
    },
    {
        "id": "plazmaman",
        "name": "Plazmaman Pro Billet",
        "category": "Впуск и охлаждение",
        "desc": "Фрезерованные из алюминиевого монолита впускные коллекторы и интеркулеры для экстремальных моторов VR38DETT и V10 Twin Turbo.",
        "logo": "assets/photos/partners_banner.png",
        "link": "https://plazmaman.com",
        "sort_order": 10,
        "is_active": 1
    },
    {
        "id": "t1_race",
        "name": "T1 Race Development",
        "category": "Топливные системы",
        "desc": "Прецизионные компоненты топливной магистрали, высокодебитные форсунки, регуляторы давления и крепления для дрэг-рейсинга.",
        "logo": "assets/photos/partners_banner.png",
        "link": "https://t1racedevelopment.com",
        "sort_order": 11,
        "is_active": 1
    },
    {
        "id": "rdrc_dragtimes",
        "name": "RDRC / Dragtimes",
        "category": "Автоспорт и трассы",
        "desc": "Главный гоночный промоутер Чемпионата России по дрэг-рейсингу и организатор всероссийских заездов на автодроме RDRC Racepark Быково.",
        "logo": "assets/photos/partners_banner.png",
        "link": "https://rdrc.ru",
        "sort_order": 12,
        "is_active": 1
    },
    {
        "id": "deikin_exhaust",
        "name": "Deikin Exhaust",
        "category": "Выхлопные системы",
        "desc": "Индивидуальное проектирование и ручная аргонная TIG-сварка спортивных выхлопных систем из титана Grade 5 и жаропрочного Inconel.",
        "logo": "assets/photos/partners_banner.png",
        "link": "https://goshaturbotech.ru",
        "sort_order": 13,
        "is_active": 1
    },
    {
        "id": "toys_detailing",
        "name": "Toys Detailing",
        "category": "Детейлинг и стиль",
        "desc": "Премиальный детейлинг, бронирование кузовов полиуретановой пленкой и керамические защитные составы для гоночных суперкаров.",
        "logo": "assets/photos/partners_banner.png",
        "link": "https://toysdetailing.ru",
        "sort_order": 14,
        "is_active": 1
    },
    {
        "id": "felix_ferro",
        "name": "Felix Ferro",
        "category": "Интерьер и стиль",
        "desc": "Эксклюзивные ювелирные элементы, кованый карбон, золотое напыление и премиальная отделка интерьера для уникальных проектов ателье.",
        "logo": "assets/photos/partners_banner.png",
        "link": "https://felixferro.com",
        "sort_order": 15,
        "is_active": 1
    },
    {
        "id": "dsc_off",
        "name": "DSC OFF",
        "category": "Медиа и хроника",
        "desc": "Автоспортивный медиа-проект Гурама Инцкирвели, подробно освещающий постройку и боевые заезды быстрейших суперкаров GTT.",
        "logo": "assets/photos/partners_banner.png",
        "link": "https://youtube.com/@dscoff",
        "sort_order": 16,
        "is_active": 1
    }
]

def seed_default_partners(cursor):
    for p in DEFAULT_PARTNERS:
        cursor.execute("""
        INSERT OR IGNORE INTO partners (id, name, category, desc, logo, link, sort_order, is_active)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
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
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM partners ORDER BY sort_order ASC, rowid ASC")
    rows = [dict(r) for r in cursor.fetchall()]
    conn.close()
    return rows

def get_partner(partner_id: str) -> Optional[Dict[str, Any]]:
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM partners WHERE id = ?", (partner_id,))
    row = cursor.fetchone()
    conn.close()
    return dict(row) if row else None

def upsert_partner(item: Dict[str, Any]) -> Dict[str, Any]:
    conn = get_connection()
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
        item.get("logo", "assets/photos/partners_banner.png"),
        item.get("link", "#"),
        int(item.get("sort_order", 0)),
        int(item.get("is_active", 1))
    ))
    conn.commit()
    conn.close()
    return item

def delete_partner(partner_id: str) -> bool:
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM partners WHERE id = ?", (partner_id,))
    deleted = cursor.rowcount > 0
    conn.commit()
    conn.close()
    return deleted

# ================= MOTO DIVISION METHODS =================

def seed_default_moto(cursor):
    default_moto = [
        {
            "id": "moto_1",
            "title": "Superbike Stage 1 / 2",
            "code": "SUPERBIKE // STAGE 2",
            "desc": "Программное раскрытие потенциала литровых спортбайков BMW S1000RR / M1000RR, Ducati Panigale V4, Yamaha R1. Индивидуальные карты зажигания, снятие ограничителей и калибровка квикшифтера на диностенде.",
            "bullets": "Индивидуальная калибровка на диностенде\nОптимизация Wheelie & Launch Control\nКалибровка электронного дросселя без задержек",
            "img": "assets/photos/partners_banner.png",
            "sort_order": 1,
            "is_active": 1
        },
        {
            "id": "moto_2",
            "title": "Титановый выпуск GTT Moto",
            "code": "TITANIUM // EXH",
            "desc": "Ручная аргоновая сварка титана и инконеля для мотоциклов. Экстремальное снижение веса, породистый акустический звук и прибавка крутящего момента во всем диапазоне.",
            "bullets": "Ультралегкие коллекторы из сплава Titan-Gr5\nКастомная фрезеровка насадок\nОгненные отстрелы и сочный басовитый тон",
            "img": "assets/photos/partners_banner.png",
            "sort_order": 2,
            "is_active": 1
        },
        {
            "id": "moto_3",
            "title": "Bespoke кастомизация",
            "code": "BESPOKE // CNC",
            "desc": "Полный цикл доработки премиальной мототехники: кованые сверхлегкие диски, сухое сцепление, карбоновое оперение и комплексное предсезонное ТО.",
            "bullets": "Сухой автоклавный карбон 3K/12K\nТормозные системы Brembo Racing / GP4\nИндивидуальный дизайн и покраска",
            "img": "assets/photos/partners_banner.png",
            "sort_order": 3,
            "is_active": 1
        }
    ]
    for m in default_moto:
        cursor.execute("""
        INSERT OR REPLACE INTO moto (id, title, code, desc, bullets, img, sort_order, is_active)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            m["id"],
            m["title"],
            m["code"],
            m["desc"],
            m["bullets"],
            m["img"],
            m["sort_order"],
            m["is_active"]
        ))

def get_all_moto() -> List[Dict[str, Any]]:
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM moto ORDER BY sort_order ASC, rowid ASC")
    rows = [dict(r) for r in cursor.fetchall()]
    conn.close()
    return rows

def get_moto(moto_id: str) -> Optional[Dict[str, Any]]:
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM moto WHERE id = ?", (moto_id,))
    row = cursor.fetchone()
    conn.close()
    return dict(row) if row else None

def upsert_moto(item: Dict[str, Any]) -> Dict[str, Any]:
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
    INSERT INTO moto (id, title, code, desc, bullets, img, sort_order, is_active)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
        title=excluded.title,
        code=excluded.code,
        desc=excluded.desc,
        bullets=excluded.bullets,
        img=excluded.img,
        sort_order=excluded.sort_order,
        is_active=excluded.is_active
    """, (
        item["id"],
        item["title"],
        item.get("code", "GTT MOTO"),
        item.get("desc", ""),
        item.get("bullets", ""),
        item.get("img", ""),
        int(item.get("sort_order", 0)),
        int(item.get("is_active", 1))
    ))
    conn.commit()
    conn.close()
    return item

def delete_moto(moto_id: str) -> bool:
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM moto WHERE id = ?", (moto_id,))
    deleted = cursor.rowcount > 0
    conn.commit()
    conn.close()
    return deleted


