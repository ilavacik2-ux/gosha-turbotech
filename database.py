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
    return conn

def init_db():
    conn = get_connection()
    cursor = conn.cursor()

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
        sort_order INTEGER DEFAULT 0
    )
    """)

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

    conn.commit()

    # Seed default data if cars table is empty
    cursor.execute("SELECT COUNT(*) FROM cars")
    if cursor.fetchone()[0] == 0:
        seed_initial_data(cursor)
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
            "id": "gtr_lucifer",
            "brand": "NISSAN & GTT",
            "type": "gtr",
            "name_ru": "GT-R R35 «LUCIFER» GTT #71 CHAMPION",
            "name_en": "GT-R R35 «LUCIFER» GTT #71 CHAMPION",
            "tag_ru": "ЧЕМПИОН RDRC • ПИЛОТ ГОША ПЕРЦХЕЛИЯ #71",
            "tag_en": "RDRC CHAMPION • PILOT GOSHA PERTSKHELIYA #71",
            "hp": "1,850+ HP",
            "quarter_mile": "7.620 сек",
            "top_speed": "355+ км/ч",
            "badge_ru": "Боевой Огненный Болид Гоши #71",
            "badge_en": "Gosha Fire Drag Weapon #71",
            "img": "assets/cars/gtr_lucifer_solo.jpg",
            "fallback_img": "assets/cars/gtr_lucifer_full.jpg",
            "video_src": "assets/videos/gosha_na_svoem_lucifer_web.mp4",
            "video_title": "Гоша на своей // GT-R Lucifer RDRC",
            "desc_ru": "Победоносный огненный болид Гоши Перцхелия, борт №71. Построенный в лаборатории GoshaTurboTech драг-монстр в культовой ливрее адского пламени — триумфатор и победитель финалов чемпионата России RDRC.",
            "desc_en": "Victorious hellfire-liveried race weapon piloted by Gosha Pertskheliya himself (race car #71). Built in the GoshaTurboTech skunkworks — champion and winner of Russian Drag Racing Championship (RDRC) finals.",
            "specs": {
                "engine": "4.1L Billet Stroker VR38DETT GTT Race Spec",
                "turbos": "Dual Precision 7675 Gen2 Pro Mod Billet Turbos",
                "fuel": "VP Racing Ethanol M5 / Dual In-Tank 1700cc Injection",
                "ecu": "Motec M150 Drag AWD Management + GTT Flame Map",
                "chassis": "Full Drag Suspension, Parachute System & Weld Beadlocks"
            },
            "sort_order": 1
        },
        {
            "id": "draco_promod",
            "brand": "NISSAN & DRACO",
            "type": "gtr",
            "name_ru": "GT-R R35 DRACO PRO-MOD GTT 3000+ HP",
            "name_en": "GT-R R35 DRACO PRO-MOD GTT 3000+ HP",
            "tag_ru": "RDRC PRO-MOD RECORD • ПИЛОТ Р. АРЕФЬЕВ",
            "tag_en": "RDRC PRO-MOD RECORD • PILOT R. AREFYEV",
            "hp": "3,000+ HP",
            "quarter_mile": "6.850 сек",
            "top_speed": "380+ км/ч",
            "badge_ru": "Болид RDRC Pro-Mod 3000+ HP",
            "badge_en": "RDRC Pro-Mod 3000+ HP Weapon",
            "img": "assets/cars/gtr_draco_promod_front.jpg",
            "fallback_img": "assets/cars/gtr_draco_wrap_detail.jpg",
            "video_src": "assets/videos/draco_gtr_action.mp4",
            "video_title": "Nissan GT-R Draco Pro-Mod 3000+ HP — боевой заезд RDRC",
            "desc_ru": "Легендарный флагман и абсолютный монстр дрэг-стрипа RDRC под управлением Романа Арефьева. Трубчатое шасси, гигантские турбины и более 3000 л.с.",
            "desc_en": "Legendary flagship and absolute ruler of the RDRC drag strip piloted by Roman Arefyev. Bespoke chrome-moly tube chassis, massive twin pro-mod turbochargers and over 3,000 brake horsepower.",
            "specs": {
                "engine": "4.3L Billet VR38 Race Block GTT / Draco Spec",
                "turbos": "Dual Precision 88mm Pro-Mod Turbochargers",
                "fuel": "Methanol M1 Injected + Dual Billet Fuel Rails",
                "ecu": "Motec M150 Standalone Pro Drag System",
                "chassis": "Full Chrome-Moly Tube Chassis & Carbon Body"
            },
            "sort_order": 2
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
            "fallback_img": "assets/cars/bmw_m5_rdrc_race.jpg",
            "video_src": "assets/videos/r8_acceleration.mp4",
            "video_title": "BMW M5 G90 Competition GTT — боевой разгон",
            "desc_ru": "Заряженная боевая BMW M5 поколения G90 от GoshaTurboTech, выступающая в чемпионате России по дрэг-рейсингу RDRC.",
            "desc_en": "Competition BMW M5 G90 built by GoshaTurboTech competing in RDRC. M xDrive AWD system, custom GTT hybrid billet turbos.",
            "specs": {
                "engine": "4.4L V8 TwinPower Turbo Hybrid Powertrain GTT Spec",
                "turbos": "GTT Custom Billet Hybrid Turbos",
                "fuel": "100 RON + Methanol Direct Port Injected",
                "ecu": "GTT Custom Dual ECU & 8HP Transmission Flash",
                "exhaust": "Inconel Catless Downpipes + Full Titanium System"
            },
            "sort_order": 3
        },
        {
            "id": "moses",
            "brand": "NISSAN",
            "type": "gtr",
            "name_ru": "GT-R R35 GTT-MOSES «КОРЖИК» #712",
            "name_en": "GT-R R35 GTT-MOSES «KORZHIK» #712",
            "tag_ru": "ЛЕГЕНДА UNLIM 500+ & RDRC • БОРТ #712",
            "tag_en": "UNLIM 500+ & RDRC LEGEND • RACING #712",
            "hp": "1,800+ HP",
            "quarter_mile": "7.810 сек",
            "top_speed": "360+ км/ч",
            "badge_ru": "Легендарный Белый GT-R #712",
            "badge_en": "Legendary White GT-R #712",
            "img": "https://static.tildacdn.com/tild3032-3266-4139-a563-653561393961/gtr-min.png",
            "fallback_img": "assets/cars/gtr_red_chrome_rdrc.jpg",
            "video_src": "",
            "video_title": "",
            "desc_ru": "Культовый белый Nissan GT-R R35 борт №712 под управлением Николая Коржова — символ побед GoshaTurboTech в России и Европе.",
            "desc_en": "Iconic white Nissan GT-R R35 #712 driven by Nikolay Korzhov — emblem of GoshaTurboTech victories across Europe and Russia.",
            "specs": {
                "engine": "4.1L Billet Stroker VR38DETT GTT Spec",
                "turbos": "Dual Precision Ball-Bearing Race Turbos",
                "fuel": "VP Racing C16 / 100 RON Dual Fuel Map",
                "ecu": "Motec M1 + Custom GTT Drag AWD Logic",
                "trans": "GTT Billet PPG Sequential Dog-Box"
            },
            "sort_order": 4
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
            "quarter_mile": "8.180 сек",
            "top_speed": "355+ км/ч",
            "badge_ru": "Легендарная «Зеленка» GTT",
            "badge_en": "Legendary «Zelenka» GTT",
            "img": "assets/photos/huracan_zelenka_gtt.jpg",
            "fallback_img": "assets/cars/huracan_green_grey_rdrc.jpg",
            "video_src": "assets/videos/r8_launch_action.mp4",
            "video_title": "Lamborghini Huracan Twin Turbo «Зеленка» GTT — боевой заезд RDRC",
            "desc_ru": "Знаменитая ядовито-зеленая Lamborghini Huracan Twin Turbo «Зеленка» — легенда паддока RDRC и уличных дуэлей.",
            "desc_en": "The legendary acid-green Lamborghini Huracan Twin Turbo «Zelenka» — racing icon of the RDRC paddock.",
            "specs": {
                "engine": "5.2L V10 FSI GTT Built Engine",
                "turbos": "Precision Mirror Dual Ball-Bearing Turbos",
                "fuel": "Dual Billet Fuel Rails + 100 RON / E85 Maps",
                "trans": "GTT Upgraded Billet Dual Clutch 10-Plate",
                "wheels": "Weld Racing Rear Beadlocks with Mickey Thompson ET"
            },
            "sort_order": 5
        },
        {
            "id": "tonystark",
            "brand": "AUDI & ЦМРБАНК",
            "type": "audi",
            "name_ru": "R8 V10 PLUS TWIN TURBO TONY STARK / RDRC",
            "name_en": "R8 V10 PLUS TWIN TURBO TONY STARK / RDRC",
            "tag_ru": "РЕКОРД БАЙКАЛА & RDRC СТРИТ-КИЛЛЕР",
            "tag_en": "BAIKAL ICE RECORD & RDRC STREET WEAPON",
            "hp": "1,400+ HP",
            "quarter_mile": "8.450 сек",
            "top_speed": "350+ км/ч",
            "badge_ru": "V10 Twin Turbo Flagship",
            "badge_en": "V10 Twin Turbo Flagship",
            "img": "assets/cars/audi_r8_tsmr_launch.jpg",
            "fallback_img": "https://static.tildacdn.com/tild3162-3462-4064-b931-313636663133/audi_r8-min.png",
            "video_src": "assets/videos/dodge_srt_pass.mp4",
            "video_title": "Audi R8 V10 Twin Turbo GTT — боевой заезд",
            "desc_ru": "Боевая Audi R8 V10 Twin Turbo под эгидой ЦМРБанк и GTT на треке RDRC. Покоритель байкальского льда.",
            "desc_en": "Race Audi R8 V10 Twin Turbo backed by CMRBank and GTT on the RDRC strip. Record setter on Lake Baikal ice.",
            "specs": {
                "engine": "5.2L FSI V10 Twin Turbo Mid-Engine",
                "turbos": "Mirror Twin Turbo Kit with Air-to-Water Intercooling",
                "cooling": "CSF Triple Billet Heat Exchangers",
                "ecu": "Syvecs S12 Standalone Motorsport Setup",
                "clutch": "GTT Upgraded Billet 9-Plate Dual Clutch"
            },
            "sort_order": 6
        },
        {
            "id": "dodge_srt",
            "brand": "DODGE SRT",
            "type": "other",
            "name_ru": "CHALLENGER SRT HELLCAT GTT-MONSTER",
            "name_en": "CHALLENGER SRT HELLCAT GTT-MONSTER",
            "tag_ru": "RDRC BURNOUT KING • 1,200+ HP",
            "tag_en": "RDRC BURNOUT KING • 1,200+ HP",
            "hp": "1,200+ HP",
            "quarter_mile": "8.890 сек",
            "top_speed": "330+ км/ч",
            "badge_ru": "Американский маслкар GTT",
            "badge_en": "GTT American Muscle Monster",
            "img": "assets/cars/dodge_burnout_sunset.jpg",
            "fallback_img": "assets/cars/challenger_srt_gtt.jpg",
            "video_src": "assets/videos/dodge_challenger_action.mp4",
            "video_title": "Dodge Challenger SRT Hellcat GTT — дымный бернаут RDRC",
            "desc_ru": "Черный компрессорный монстр Dodge Challenger SRT от GoshaTurboTech под управлением Гончарова.",
            "desc_en": "Supercharged black Dodge Challenger SRT built by GoshaTurboTech, dominating RDRC straight lines.",
            "specs": {
                "engine": "6.2L Supercharged HEMI V8 Built by GTT",
                "blower": "Whipple 3.8L Gen 5 Supercharger Kit",
                "fuel": "Triple Fore Innovations Fuel Pumps + 1700cc Injectors",
                "driveshaft": "QA1 Carbon Fiber Driveshaft + GTT 9-inch Rear End",
                "tires": "Mickey Thompson ET Street R Drag Radials"
            },
            "sort_order": 7
        },
        {
            "id": "bezzubik",
            "brand": "LAMBORGHINI",
            "type": "lambo",
            "name_ru": "HURACAN TWIN TURBO GTT-BEZZUBIK",
            "name_en": "HURACAN TWIN TURBO GTT-BEZZUBIK",
            "tag_ru": "РЕКОРД ЕВРОПЫ 353 КМ/Ч • RDRC STAGE",
            "tag_en": "EUROPE RECORD 353 KM/H • RDRC STAGE",
            "hp": "1,500+ HP",
            "quarter_mile": "8.200 сек",
            "top_speed": "353 км/ч",
            "badge_ru": "Race 1000 Champion",
            "badge_en": "Race 1000 Champion",
            "img": "assets/photos/huracan_rdrc_stage_line.jpg",
            "fallback_img": "assets/cars/huracan_green_grey_rdrc.jpg",
            "video_src": "assets/videos/hero_burnout_action.mp4",
            "video_title": "Lamborghini Huracan «Беззубик» GTT — рекорд Европы",
            "desc_ru": "Европейский триумфатор Race 1000 и обладатель рекорда Европы на дистанции 804 метра в Германии.",
            "desc_en": "European champion of Race 1000 in Germany and RDRC star. 353 km/h on 804m distance.",
            "specs": {
                "engine": "5.2L V10 FSI Twin Turbo GTT Stage 3",
                "turbos": "Precision Dual Mirror V-Band Turbos",
                "exhaust": "GTT Inconel Custom Straight System",
                "ecu": "Syvecs Dual-CAN Motorsport Management",
                "fuel": "100 RON Daily / Ethanol E85 Race Map"
            },
            "sort_order": 8
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
            "video_src": "assets/videos/gtr_blue_888_pass_web.mp4",
            "video_title": "Nissan GT-R #888 Midnight Blue GTT — боевой заезд RDRC",
            "desc_ru": "Синий драг-болид борт №888, построенный в GoshaTurboTech для стабильных низких 8 секунд и выходов в 7 секунд.",
            "desc_en": "The renowned Midnight Blue Nissan GT-R R35 carrying race #888, competing consistently on RDRC stages.",
            "specs": {
                "engine": "3.8L Forged VR38DETT GTT Spec",
                "turbos": "Dual Garrett G30-900 Turbochargers",
                "cooling": "ETS 4-inch Race Intercooler Kit",
                "ecu": "Syvecs S6+ ECU with GTT Drag Launch Strategy",
                "trans": "Dodson Pro-Max 8-Plate Drag Clutch"
            },
            "sort_order": 9
        },
        {
            "id": "gtr_red",
            "brand": "NISSAN",
            "type": "gtr",
            "name_ru": "GT-R R35 RED CHROME GTT PRO-MOD",
            "name_en": "GT-R R35 RED CHROME GTT PRO-MOD",
            "tag_ru": "RDRC ЧЕМПИОНАТ РОССИИ",
            "tag_en": "RDRC RUSSIAN CHAMPIONSHIP",
            "hp": "1,650+ HP",
            "quarter_mile": "7.950 сек",
            "top_speed": "350+ км/ч",
            "badge_ru": "Красный Хром RDRC",
            "badge_en": "Red Chrome RDRC",
            "img": "assets/cars/gtr_red_front_rdrc.jpg",
            "fallback_img": "assets/cars/gtr_red_chrome_rdrc.jpg",
            "video_src": "assets/videos/gtr_red_g35_action_web.mp4",
            "video_title": "Nissan GT-R GTT Red Chrome G35 — боевой заезд RDRC",
            "desc_ru": "Красный хромированный болид GTT с расширением кузова и аэродинамическим оперением.",
            "desc_en": "One of the most striking Nissan GT-R cars in Russian drag racing. Custom red chrome livery.",
            "specs": {
                "engine": "3.8L VR38DETT Custom GTT Billet Assembly",
                "turbos": "Garrett G35-1050 Turbochargers",
                "cooling": "Front Mount Massive Intercooler Core",
                "ecu": "Syvecs S8 ECU with Launch & Traction Control"
            },
            "sort_order": 10
        },
        {
            "id": "bmw_m4",
            "brand": "BMW M-POWER",
            "type": "bmw",
            "name_ru": "BMW M4 G82 COMPETITION GTT-850",
            "name_en": "BMW M4 G82 COMPETITION GTT-850",
            "tag_ru": "GTT TRACK & STREET SPEC • 850 HP",
            "tag_en": "GTT TRACK & STREET SPEC • 850 HP",
            "hp": "850+ HP",
            "quarter_mile": "10.150 сек",
            "top_speed": "325+ км/ч",
            "badge_ru": "Track & Street Spec",
            "badge_en": "Track & Street Spec",
            "img": "assets/cars/bmw_m4_g82_gtt.jpg",
            "fallback_img": "assets/cars/bmw_m4_g82_gtt.jpg",
            "video_src": "",
            "video_title": "",
            "desc_ru": "Кастомный проект на базе BMW M4 G82. Доработанные турбокомпрессоры S58, впуск Eventuri, титановый выхлоп ручной работы и калибровка блока управления.",
            "desc_en": "Custom build based on BMW M4 G82. Upgraded S58 turbos, Eventuri intake, bespoke titanium exhaust and custom ECU calibration.",
            "specs": {
                "engine": "3.0L S58 Twin-Turbo Inline-6",
                "turbos": "Pure Turbos Stage 2+ Billet Core",
                "cooling": "CSF Radiator & Charge Cooler Pack",
                "ecu": "Custom Bootmod3 GTT Calibration"
            },
            "sort_order": 11
        },
        {
            "id": "porsche_911_gtt",
            "brand": "PORSCHE",
            "type": "porsche",
            "name_ru": "PORSCHE 911 TURBO S (992) GTT-IMBA",
            "name_en": "PORSCHE 911 TURBO S (992) GTT-IMBA",
            "tag_ru": "МИРОВОЙ РЕКОРД RDRC • 9.252 СЕК",
            "tag_en": "WORLD RECORD RDRC • 9.252 SEC",
            "hp": "1,050+ HP",
            "quarter_mile": "9.252 сек",
            "top_speed": "345+ км/ч",
            "badge_ru": "Мировой Рекорд RDRC",
            "badge_en": "World Record RDRC",
            "img": "assets/cars/gtr_rdrc_red_panamera.jpg",
            "fallback_img": "assets/cars/gtr_rdrc_red_panamera.jpg",
            "video_src": "",
            "video_title": "",
            "desc_ru": "Официально подтвержденный рекордсмен RDRC среди Porsche 992. Кастомный интеркулер, метаноловый впрыск и экстремальный запуск с лаунча.",
            "desc_en": "Officially verified RDRC record holder among Porsche 992 generation. Custom intercoolers, direct port methanol and ferocious launch control.",
            "specs": {
                "engine": "3.8L Twin-Turbo Boxer-6 GTT Spec",
                "turbos": "GTT Billet High-Flow Turbos",
                "fuel": "100 RON + Methanol Injection",
                "ecu": "Syvecs S7 Plus Standalone Porsche Kit"
            },
            "sort_order": 12
        }
    ]

    for car in default_projects:
        cursor.execute("""
        INSERT INTO cars (
            id, brand, type, name_ru, name_en, tag_ru, tag_en, hp, quarter_mile, top_speed,
            badge_ru, badge_en, img, fallback_img, video_src, video_title, desc_ru, desc_en, specs_json, sort_order
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            car["id"], car["brand"], car["type"], car["name_ru"], car.get("name_en", car["name_ru"]),
            car.get("tag_ru", ""), car.get("tag_en", ""), car["hp"], car.get("quarter_mile", ""), car.get("top_speed", ""),
            car.get("badge_ru", ""), car.get("badge_en", ""), car["img"], car.get("fallback_img", car["img"]),
            car.get("video_src", ""), car.get("video_title", ""), car.get("desc_ru", ""), car.get("desc_en", ""),
            json.dumps(car.get("specs", {})), car.get("sort_order", 0)
        ))

    default_team = [
        {"id": "m1", "name": "Гоша", "role": "Основатель & Главный конструктор GTT", "status": "active"},
        {"id": "m2", "name": "Эдик", "role": "Технический директор ателье", "status": "active"},
        {"id": "m3", "name": "Дмитрий", "role": "Администратор проектов", "status": "atelier"},
        {"id": "m4", "name": "Мария", "role": "Делопроизводитель & Менеджер рекордов", "status": "atelier"},
        {"id": "m5", "name": "Павел", "role": "Делопроизводитель & Логист команды", "status": "atelier"},
        {"id": "m6", "name": "Георгий", "role": "Инженер-электрик & Калибровщик Motec/Syvecs", "status": "active"},
        {"id": "m7", "name": "Рустам", "role": "Моторист высшей квалификации", "status": "active"},
        {"id": "m8", "name": "Никита", "role": "Гоночный механик паддока", "status": "paddock"},
        {"id": "m9", "name": "Иван", "role": "Гоночный механик паддока", "status": "paddock"},
        {"id": "m10", "name": "Алексей", "role": "Гоночный механик паддока", "status": "paddock"},
        {"id": "m11", "name": "Фазик", "role": "Механик сборочного цеха", "status": "atelier"},
        {"id": "m12", "name": "Степан", "role": "Механик сборочного цеха", "status": "atelier"},
        {"id": "m13", "name": "Алексей", "role": "Механик ходовой части", "status": "atelier"},
        {"id": "m14", "name": "Роман", "role": "Сварщик-фабрикатор титана и инконеля", "status": "active"},
        {"id": "m15", "name": "Евгений", "role": "Диагност электронных систем", "status": "active"}
    ]
    for idx, member in enumerate(default_team):
        cursor.execute("INSERT INTO team (id, name, role, status, sort_order) VALUES (?, ?, ?, ?, ?)",
                       (member["id"], member["name"], member["role"], member["status"], idx + 1))

    default_records = [
        {"id": "rec_1", "year": "2022 • Мировой рекорд", "car": "PORSCHE 911 TURBO S (992) GTT-IMBA", "telemetry": "1/4 мили: 9.252 сек • 231.80 км/ч", "desc": "Официально подтвержденный рекорд RDRC для кузова 992 на заводских турбинах."},
        {"id": "rec_2", "year": "2022 • Абсолютный рекорд льда", "car": "AUDI R8 V10 PLUS TT «GYURZA»", "telemetry": "1 км с места на льду: 124 км/ч средняя скорость", "desc": "Дни скорости на льду озера Байкал совместно с Kiwamaru."},
        {"id": "rec_3", "year": "2021 • Мировой ориентир", "car": "PORSCHE 911 TURBO S GTT STAGE 2", "telemetry": "1/4 мили: 9.303 сек • 235.83 км/ч", "desc": "Триумф на фестивале Unlim Fest. Пилот Сергей Никитин."},
        {"id": "rec_4", "year": "2019 • Рекорд России SMP RDRC", "car": "NISSAN GT-R R35 GTT-KORZHIK", "telemetry": "1/2 мили: 13.435 сек • 334.41 км/ч", "desc": "Николай Коржов, 2-е место в абсолютном зачете SMP RDRC FSL."},
        {"id": "rec_5", "year": "2017 • Рекорд Европы", "car": "LAMBORGHINI HURACAN TT BEZZUBIK", "telemetry": "1/2 мили (804 м): 353 км/ч", "desc": "Race 1000 Германия. Рекорд на 804 метра среди полноприводных суперкаров."},
        {"id": "rec_6", "year": "2014 • Рекорд Европы", "car": "NISSAN GT-R R35 GTT-1800 MOSES", "telemetry": "1/4 мили: 7.810 сек • 287.65 км/ч", "desc": "UNLIM 500+ Greece (Остров Крит). 3-й результат в мире на тот момент."}
    ]
    for idx, rec in enumerate(default_records):
        cursor.execute("INSERT INTO records (id, year, car, telemetry, desc, sort_order) VALUES (?, ?, ?, ?, ?, ?)",
                       (rec["id"], rec["year"], rec["car"], rec["telemetry"], rec["desc"], idx + 1))

    default_gallery = [
        {"id": "gal_1", "tag": "RDRC CHAMPION", "title": "Huracan TT «Зеленка» GTT", "img": "assets/photos/huracan_zelenka_gtt.jpg"},
        {"id": "gal_2", "tag": "BURNOUT SMOKE", "title": "Dodge Challenger SRT Hellcat", "img": "assets/cars/dodge_burnout_sunset.jpg"},
        {"id": "gal_3", "tag": "3000+ HP PRO-MOD", "title": "Nissan GT-R Draco Dragster", "img": "assets/cars/gtr_draco_promod_front.jpg"},
        {"id": "gal_4", "tag": "1400+ HP V10 TT", "title": "Audi R8 V10 Plus CMRBank", "img": "assets/cars/audi_r8_tsmr_launch.jpg"},
        {"id": "gal_5", "tag": "CHAMPIONSHIP WINNER", "title": "GTR Lucifer // Gosha RDRC", "img": "assets/cars/gtr_lucifer_solo.jpg"},
        {"id": "gal_6", "tag": "AERODYNAMICS", "title": "Red Chrome Nissan GT-R Pro-Mod", "img": "assets/cars/gtr_red_front_rdrc.jpg"},
        {"id": "gal_7", "tag": "MIDNIGHT BLUE", "title": "Nissan GT-R R35 #888 Sunset Pass", "img": "assets/photos/gtr_blue_888_rdrc.jpg"},
        {"id": "gal_8", "tag": "CHIEF MOTORSPORT ENGINEER", "title": "Гоша Перцхелия на стрипе RDRC", "img": "assets/photos/gosha_on_track.jpg"},
        {"id": "gal_9", "tag": "ATELIER GARAGE", "title": "Бокс GTT: BMW M4 G82 & GT-R", "img": "assets/cars/bmw_m4_g82_gtt.jpg"},
        {"id": "gal_10", "tag": "TWIN TURBO V8", "title": "BMW M5 G90 Stage 2 GTT", "img": "assets/cars/bmw_m5_rdrc_race.jpg"},
        {"id": "gal_11", "tag": "BEZZUBIK TT", "title": "Huracan Twin Turbo «Беззубик»", "img": "assets/cars/huracan_green_bezzubik_track.jpg"}
    ]
    for idx, gal in enumerate(default_gallery):
        cursor.execute("INSERT INTO gallery (id, tag, title, img, sort_order) VALUES (?, ?, ?, ?, ?)",
                       (gal["id"], gal["tag"], gal["title"], gal["img"], idx + 1))

    default_media = [
        {"id": "med_1", "title": "Гоша на своем боевом GT-R Lucifer RDRC", "type": "mp4", "url": "assets/videos/gosha_na_svoem_lucifer_web.mp4", "car": "GT-R Lucifer"},
        {"id": "med_2", "title": "Боевой синий GT-R #888 заезд RDRC", "type": "mp4", "url": "assets/videos/gtr_blue_888_pass_web.mp4", "car": "GT-R Blue 888"},
        {"id": "med_3", "title": "Красный хромированный GT-R Pro-Mod", "type": "mp4", "url": "assets/videos/gtr_red_g35_action_web.mp4", "car": "GT-R Red Chrome"},
        {"id": "med_4", "title": "Дымный бернаут Dodge Hellcat RDRC", "type": "mp4", "url": "assets/videos/dodge_challenger_action.mp4", "car": "Dodge Challenger SRT"},
        {"id": "med_5", "title": "Huracan «Зеленка» Twin Turbo прогрев", "type": "mp4", "url": "assets/videos/r8_launch_action.mp4", "car": "Huracan Зеленка"}
    ]
    for idx, med in enumerate(default_media):
        cursor.execute("INSERT INTO media (id, title, type, url, car, sort_order) VALUES (?, ?, ?, ?, ?, ?)",
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
    specs_json = json.dumps(car_data.get("specs", {}))
    
    cursor.execute("""
    INSERT INTO cars (
        id, brand, type, name_ru, name_en, tag_ru, tag_en, hp, quarter_mile, top_speed,
        badge_ru, badge_en, img, fallback_img, video_src, video_title, desc_ru, desc_en, specs_json
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
        brand=excluded.brand,
        type=excluded.type,
        name_ru=excluded.name_ru,
        name_en=excluded.name_en,
        hp=excluded.hp,
        quarter_mile=excluded.quarter_mile,
        top_speed=excluded.top_speed,
        img=excluded.img,
        video_src=excluded.video_src,
        desc_ru=excluded.desc_ru,
        specs_json=excluded.specs_json
    """, (
        car_data["id"],
        car_data.get("brand", ""),
        car_data.get("type", "other"),
        car_data.get("name_ru", car_data.get("nameRu", "")),
        car_data.get("name_en", car_data.get("nameEn", car_data.get("name_ru", ""))),
        car_data.get("tag_ru", ""),
        car_data.get("tag_en", ""),
        car_data.get("hp", ""),
        car_data.get("quarter_mile", car_data.get("quarterMile", "")),
        car_data.get("top_speed", car_data.get("topSpeed", "")),
        car_data.get("badge_ru", ""),
        car_data.get("badge_en", ""),
        car_data.get("img", ""),
        car_data.get("fallback_img", car_data.get("img", "")),
        car_data.get("video_src", car_data.get("videoSrc", "")),
        car_data.get("video_title", ""),
        car_data.get("desc_ru", car_data.get("descRu", "")),
        car_data.get("desc_en", ""),
        specs_json
    ))
    conn.commit()
    conn.close()
    return get_car_by_id(car_data["id"])

def delete_car(car_id: str) -> bool:
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM cars WHERE id = ?", (car_id,))
    deleted = cursor.rowcount > 0
    conn.commit()
    conn.close()
    return deleted

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
    INSERT INTO records (id, year, car, telemetry, desc)
    VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
        year=excluded.year,
        car=excluded.car,
        telemetry=excluded.telemetry,
        desc=excluded.desc
    """, (record["id"], record["year"], record["car"], record["telemetry"], record["desc"]))
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

