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

    # Seed or update default partners
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
                'name_en': 'GT-R R35 DRACO PRO-MOD GTT #300',
                'name_ru': 'GT-R R35 DRACO PRO-MOD GTT #300',
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
                'top_speed': '323.88 км/ч',
                'type': 'gtr',
                'video_src': 'assets/videos/draco_gtr_action.mp4',
                'video_title': 'Nissan GT-R Draco Pro-Mod 3000+ HP — боевой рекордный заезд RDRC'},
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
                'top_speed': '350+ км/ч',
                'type': 'audi',
                'video_src': 'assets/videos/gtr_launch_pass.mp4',
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
                'fallback_img': 'assets/cars/huracan_green_grey_rdrc.jpg',
                'hp': '1,500+ HP',
                'id': 'bezzubik',
                'img': 'assets/photos/huracan_rdrc_stage_line.jpg',
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
                'top_speed': '353.02 км/ч',
                'type': 'lambo',
                'video_src': '',
                'video_title': ''},
        {       'badge_en': 'Track-Day Record 7.766s',
                'badge_ru': 'Рекорд трек-дня 7.766s',
                'brand': 'NISSAN & GTT',
                'desc_en': 'Mythical Kurdalagon GT-R named after the ancient blacksmith deity. Set a brand new '
                           'personal best of 7.766 sec at 300.00 km/h on October 26, 2026 at Bykovo Drag Track.',
                'desc_ru': 'Боевой болид Nissan GT-R R35 «Курдалагон» — имя древнего осетинского бога-кузнеца. 26 '
                           'октября 2026 года на трек-дне в Быково установил новый личный рекорд команды: 7.766 сек на '
                           '402 метра со скоростью на выходе 300.00 км/ч.',
                'fallback_img': 'assets/cars/gtr_red_front_rdrc.jpg',
                'hp': '1,650+ HP',
                'id': 'gtr_kurdalagon',
                'img': 'assets/cars/___________1793144311_27df8e5d.jpg',
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
                'video_src': '',
                'video_title': ''},
        {       'badge_en': 'RDRC 992 Record • 9.167s',
                'badge_ru': 'Рекорд RDRC 992 • 9.167s',
                'brand': 'PORSCHE & GTT',
                'desc_en': 'Official RDRC record holder among Porsche 992 generation piloted by Maria Kutychkina. '
                           'Verified time 9.167 sec at 236.92 km/h on 1/4 mile (RDRC 2025, pass 528). Custom GTT '
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
                'top_speed': '345+ км/ч',
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
                'name_en': 'GT-R R35 «LUCIFER» GTT #71 CHAMPION',
                'name_ru': 'GT-R R35 «LUCIFER» GTT #71 CHAMPION',
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
                'top_speed': '343.67 км/ч',
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
                'quarter_mile': '9.420 сек',
                'sort_order': 7,
                'specs': {       'ecu': 'GTT Custom Dual ECU & 8HP Transmission Flash',
                                 'engine': '4.4L V8 TwinPower Turbo Hybrid Powertrain GTT Spec',
                                 'exhaust': 'Inconel Catless Downpipes + Full Titanium System',
                                 'fuel': '100 RON + Methanol Direct Port Injected',
                                 'turbos': 'GTT Custom Billet Hybrid Turbos'},
                'tag_en': 'RDRC DRAG WEAPON • GTT G90 BULLET',
                'tag_ru': 'RDRC ДРЭГ-КИЛЛЕР • БОЛИД GTT G90',
                'top_speed': '340+ км/ч',
                'type': 'bmw',
                'video_src': 'assets/videos/r8_acceleration.mp4',
                'video_title': 'BMW M5 G90 Competition GTT — боевой разгон'},
        {       'badge_en': 'SRT Demon 1200+ HP',
                'badge_ru': 'SRT Demon 1200+ HP',
                'brand': 'DODGE SRT',
                'desc_en': 'Supercharged black Dodge Challenger SRT Demon built by GoshaTurboTech, piloted by I. '
                           'Kardan and M. Shoniya. Verified 9.748 sec at 233.24 km/h on RDRC 2026.',
                'desc_ru': 'Черный компрессорный монстр Dodge Challenger SRT Demon от GoshaTurboTech под управлением '
                           'И. Кардана и М. Шония. Подтвержденное время 9.748 сек со скоростью 233.24 км/ч на 1/4 мили '
                           'RDRC 2026.',
                'fallback_img': 'assets/cars/challenger_srt_gtt.jpg',
                'hp': '1,200+ HP',
                'id': 'dodge_demon',
                'img': 'assets/cars/dodge_burnout_sunset.jpg',
                'name_en': 'DODGE CHALLENGER SRT DEMON GTT',
                'name_ru': 'DODGE CHALLENGER SRT DEMON GTT',
                'object_position': 'center 70%',
                'quarter_mile': '9.748 сек',
                'sort_order': 8,
                'specs': {       'blower': 'Whipple 3.8L Gen 5 Supercharger Kit',
                                 'driveshaft': 'QA1 Carbon Fiber Driveshaft + GTT 9-inch Rear End',
                                 'engine': '6.2L Supercharged HEMI V8 Built by GTT',
                                 'fuel': 'Triple Fore Innovations Fuel Pumps + 1700cc Injectors',
                                 'tires': 'Mickey Thompson ET Street R Drag Radials'},
                'tag_en': 'RDRC BURNOUT KING • 9.748 SEC',
                'tag_ru': 'RDRC БЕРНАУТ КИНГ • 9.748 СЕК',
                'top_speed': '330+ км/ч',
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
                'quarter_mile': '10.060 сек',
                'sort_order': 10,
                'specs': {       'ecu': 'Syvecs Powertrain Management',
                                 'engine': '5.2L V10 FSI Reinforced Internals GTT',
                                 'fuel': 'Direct Port Fuel Injected 100 RON',
                                 'turbos': 'Dual Mirror Precision Turbos'},
                'tag_en': 'RDRC WEAPON • PILOT R. AREFYEV',
                'tag_ru': 'RDRC БОЕВОЙ БОЛИД • ПИЛОТ Р. АРЕФЬЕВ',
                'top_speed': '340+ км/ч',
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
                'top_speed': '355+ км/ч',
                'type': 'lambo',
                'video_src': 'assets/videos/r8_launch_action.mp4',
                'video_title': 'Lamborghini Huracan Twin Turbo «Зеленка» GTT — боевой заезд RDRC'},
        {       'badge_en': 'GTT-MAXPAIN Performante',
                'badge_ru': 'GTT-MAXPAIN Performante',
                'brand': 'LAMBORGHINI & GTT',
                'desc_en': 'Forged Composites masterpiece Lamborghini Huracan Performante empowered by bespoke GTT '
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
                'desc_ru': 'Открытый родстер Huracan Spyder с доработанной выхлопной трассой Inconel и пакетом GTT '
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
                'top_speed': '335+ км/ч',
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
                'img': 'assets/archive_tilda/gtr_moses.png',
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
                'top_speed': '360+ км/ч',
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
                'fallback_img': 'assets/cars/gtr_red_chrome_rdrc.jpg',
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
                'top_speed': '334.41 км/ч',
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
                'fallback_img': 'assets/cars/gtr_draco_connections.jpg',
                'hp': '1,450+ HP',
                'id': 'gtr_baloo',
                'img': 'assets/cars/gtr_red_strip_sunset.jpg',
                'name_en': 'GT-R R35 GTT «BALOO»',
                'name_ru': 'GT-R R35 GTT «BALOO»',
                'object_position': 'center 60%',
                'quarter_mile': '8.875 сек',
                'sort_order': 16,
                'specs': {       'cooling': 'GTT Dual Radiator Pack',
                                 'engine': '3.8L VR38 Reinforced GTT Block',
                                 'fuel': 'Dual In-Tank Fuel Rail',
                                 'turbos': 'Garrett G30 Billet Turbos'},
                'tag_en': 'MOSCOW MILE • 8.875 SEC • 322 KM/H',
                'tag_ru': 'МОСКОВСКАЯ МИЛЯ • 8.875 СЕК • 322 КМ/Ч',
                'top_speed': '322.00 км/ч',
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
        {       'badge_en': 'Red Chrome RDRC',
                'badge_ru': 'Красный Хром RDRC',
                'brand': 'NISSAN',
                'desc_en': 'One of the most striking Nissan GT-R cars in Russian drag racing piloted by Gosha '
                           'Pertskheliya. Custom red chrome livery, reinforced suspension and bulletproof GTT race '
                           'transmission.',
                'desc_ru': 'Один из самых ярких Nissan GT-R в российском дрэг-рейсинге под управлением Гоши Перцхелия. '
                           'Кастомный хром-дизайн, усиленная подвеска и боевая трансмиссия GTT.',
                'fallback_img': 'assets/cars/gtr_red_chrome_rdrc.jpg',
                'hp': '1,650+ HP',
                'id': 'gtr_red',
                'img': 'assets/cars/gtr_red_front_rdrc.jpg',
                'name_en': 'GT-R R35 RED CHROME GTT PRO-MOD',
                'name_ru': 'GT-R R35 RED CHROME GTT PRO-MOD',
                'object_position': 'center 62%',
                'quarter_mile': '7.950 сек',
                'sort_order': 18,
                'specs': {       'cooling': 'Front Mount Massive Intercooler Core',
                                 'ecu': 'Syvecs S8 ECU with Launch & Traction Control',
                                 'engine': '3.8L VR38DETT Custom GTT Billet Assembly',
                                 'turbos': 'Garrett G35-1050 Turbochargers'},
                'tag_en': 'RDRC RUSSIAN CHAMPIONSHIP • RED CHROME',
                'tag_ru': 'RDRC ЧЕМПИОНАТ РОССИИ • КРАСНЫЙ ХРОМ',
                'top_speed': '350+ км/ч',
                'type': 'gtr',
                'video_src': 'assets/videos/gtr_red_g35_action_web.mp4',
                'video_title': 'Nissan GT-R GTT Red Chrome G35 — боевой заезд RDRC'},
        {       'badge_en': 'GTT Rocket Spec',
                'badge_ru': 'GTT Rocket Spec',
                'brand': 'NISSAN & GTT',
                'desc_en': 'Extreme project Nissan GT-R R35 Rocket by GoshaTurboTech skunkworks. Twin turbo package, '
                           'titanium straight pipes and ultra-lightweight race setup.',
                'desc_ru': 'Экстремальный проект Nissan GT-R R35 «Rocket» лаборатории GoshaTurboTech. Двухтурбинный '
                           'наддув, титановый прямой выхлоп и облегченная гоночная конфигурация кузова.',
                'fallback_img': 'assets/cars/gtr_draco_promod_front.jpg',
                'hp': '1,500+ HP',
                'id': 'gtr_rocket',
                'img': 'assets/cars/gtr_rocket_grey.jpg',
                'name_en': 'GT-R R35 GTT «ROCKET»',
                'name_ru': 'GT-R R35 GTT «ROCKET»',
                'object_position': 'center center',
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
                'fallback_img': 'assets/cars/gtr_red_front_rdrc.jpg',
                'hp': '1,500+ HP',
                'id': 'gtr_alpha12x',
                'img': 'assets/cars/gtr_alpha12x_launch.jpg',
                'name_en': 'GT-R R35 GTT ALPHA12X SPEC',
                'name_ru': 'GT-R R35 GTT ALPHA12X SPEC',
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
                'top_speed': '312.77 км/ч',
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
                'name_en': 'BMW M7 GTT EXECUTIVE TWIN TURBO',
                'name_ru': 'BMW M7 GTT EXECUTIVE TWIN TURBO',
                'object_position': 'center 82%',
                'quarter_mile': '10.200 сек',
                'sort_order': 23,
                'specs': {       'engine': '4.4L V8 TwinPower Turbo GTT Stage 2',
                                 'exhaust': 'Bespoke Stainless Valvetronic System',
                                 'transmission': 'ZF 8HP Reinforced Calibration',
                                 'turbos': 'Billet Hybrid Turbochargers'},
                'tag_en': 'EXECUTIVE FLAGSHIP • 900 HP V12',
                'tag_ru': 'EXECUTIVE FLAGSHIP • 900 HP V12',
                'top_speed': '330+ км/ч',
                'type': 'bmw',
                'video_src': '',
                'video_title': ''},
        {       'badge_en': 'Volga KGB V8',
                'badge_ru': 'Волга КГБ V8',
                'brand': 'ГАЗ & GTT',
                'desc_en': 'Legendary Soviet KGB interceptor GAZ-24 sleeper. Factory classic exterior concealing '
                           'modern twin-turbo V8 and motorsport chassis.',
                'desc_ru': 'Легендарный советский проект в кузове ГАЗ-24 «Догонялка». Внешне аутентичный хромированный '
                           'силуэт спецслужб, внутри — современный турбированный V8 и кастомное спортивное шасси.',
                'fallback_img': 'assets/cars/volga_kgb_v8_workshop.jpg',
                'hp': '1,050+ HP',
                'id': 'volga_kgb',
                'img': 'assets/cars/volga_kgb_v8_workshop.jpg',
                'is_photo': 1,
                'name_en': 'VOLGA GAZ-24 KGB V8 GTT SLEEPER',
                'name_ru': 'ВОЛГА ГАЗ-24 КГБ V8 GTT SLEEPER',
                'object_position': 'center center',
                'quarter_mile': '9.420 сек',
                'sort_order': 24,
                'specs': {       'chassis': 'Bespoke Independent Suspension & Wilwood Brakes',
                                 'engine': 'V8 Twin Turbo Restomod Powertrain',
                                 'interior': 'Restored Factory Soviet Cockpit',
                                 'transmission': 'Reinforced 6-Speed Manual'},
                'tag_en': 'LEGENDARY SLEEPER • V8 TWIN TURBO',
                'tag_ru': 'ЛЕГЕНДАРНЫЙ СЛИПЕР • V8 TWIN TURBO',
                'top_speed': '340+ км/ч',
                'type': 'other',
                'video_src': '',
                'video_title': ''},
        {       'badge_en': 'Ferrari 512 TR',
                'badge_ru': 'Ferrari 512 TR',
                'brand': 'FERRARI & GTT',
                'desc_en': 'Italian legend powered by Flat-12 engine. Complete mechanical overhaul by GTT, bespoke '
                           'titanium exhaust and precision injection mapping.',
                'desc_ru': 'Итальянская икона с 12-цилиндровым оппозитным двигателем Flat-12. Комплексная механическая '
                           'доработка в цехах GTT, индивидуальный титановый выпуск и филигранная калибровка впрыска.',
                'fallback_img': 'assets/cars/ferrari_512tr_dyno_red.jpg',
                'hp': '550+ HP',
                'id': 'ferrari_512tr',
                'img': 'assets/cars/ferrari_512tr_dyno_red.jpg',
                'is_photo': 1,
                'name_en': 'FERRARI 512 TR GTT HERITAGE CLASSIC',
                'name_ru': 'FERRARI 512 TR GTT HERITAGE CLASSIC',
                'object_position': 'center center',
                'quarter_mile': '10.800 сек',
                'sort_order': 25,
                'specs': {       'brakes': 'Brembo Racing High-Friction Setup',
                                 'clutch': 'GTT Heavy Duty Multi-Plate Clutch',
                                 'engine': '4.9L Flat-12 Naturally Aspirated Maranello',
                                 'exhaust': 'Handmade Titanium Valved Exhaust'},
                'tag_en': 'ITALIAN ICON • FLAT-12 ENGINE',
                'tag_ru': 'ИТАЛЬЯНСКАЯ ИКОНА • FLAT-12 ENGINE',
                'top_speed': '315+ км/ч',
                'type': 'other',
                'video_src': '',
                'video_title': ''},
        {       'badge_en': 'GT-R FIFA #10',
                'badge_ru': 'GT-R FIFA #10',
                'brand': 'NISSAN & GTT',
                'desc_en': 'Bespoke FIFA build crafted by GoshaTurboTech atelier, pairing premium cockpit refinement '
                           'with sub-8.5 quarter-mile violence.',
                'desc_ru': 'Именной болид «FIFA», созданный в ателье GoshaTurboTech. Сочетает комфортный салон и '
                           'бескомпромиссные характеристики разгона из 8.5 секунд на квотере.',
                'fallback_img': 'assets/cars/gtt_classified_car.svg',
                'hp': '—',
                'id': 'gtr_fifa',
                'img': 'assets/cars/gtt_classified_car.svg',
                'is_photo': 0,
                'name_en': 'GT-R R35 GTT «FIFA» #10',
                'name_ru': 'GT-R R35 GTT «FIFA» #10',
                'object_position': 'center center',
                'quarter_mile': '—',
                'sort_order': 26,
                'specs': {       'ecu': 'Motec M150',
                                 'engine': '4.1L Billet Stroker VR38 GTT',
                                 'transmission': 'Dodson Motorsport Billet Gearset',
                                 'turbos': 'Precision Gen2 Turbochargers'},
                'tag_en': 'BESPOKE BUILD • LUXURY & DRAG',
                'tag_ru': 'ИМЕННОЙ БОЛИД • LUXURY & DRAG',
                'top_speed': '—',
                'type': 'gtr',
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
                'fallback_img': 'assets/cars/gtt_classified_car.svg',
                'hp': '—',
                'id': 'porsche_992_puncher',
                'img': 'assets/cars/gtt_classified_car.svg',
                'is_photo': 0,
                'name_en': 'PORSCHE 911 TURBO S (992) GTT «PUNCHER»',
                'name_ru': 'PORSCHE 911 TURBO S (992) GTT «PUNCHER»',
                'object_position': 'center 50%',
                'quarter_mile': '—',
                'sort_order': 28,
                'specs': {       'engine': '3.8L Boxer-6 992 GTT Spec',
                                 'fuel': 'Methanol Multi-Port System',
                                 'intercooling': 'High-Flow Core Package',
                                 'turbos': 'Billet Precision Mirror Turbos'},
                'tag_en': 'WORLD CATEGORY RECORD • 9.303 SEC',
                'tag_ru': 'МИРОВОЙ РЕКОРД В КАТЕГОРИИ • 9.303 СЕК',
                'top_speed': '—',
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
                'desc_en': 'Track project based on tri-motor Tesla Model S Plaid. GTT carbon-ceramic braking package, '
                           'inverter thermal optimization and high-downforce aero.',
                'desc_ru': 'Трековый проект на базе трехмоторного седана Tesla Model S Plaid. Спортивная '
                           'карбон-керамическая тормозная система GTT, оптимизация охлаждения инверторов и '
                           'аэродинамический сплиттер.',
                'fallback_img': 'assets/cars/gtt_classified_car.svg',
                'hp': '—',
                'id': 'tesla_plaid',
                'img': 'assets/cars/gtt_classified_car.svg',
                'is_photo': 0,
                'name_en': 'TESLA MODEL S PLAID GTT DYNAMICS SPEC',
                'name_ru': 'TESLA MODEL S PLAID GTT DYNAMICS SPEC',
                'object_position': 'center center',
                'quarter_mile': '—',
                'sort_order': 30,
                'specs': {       'brakes': 'GTT Carbon Ceramic 410mm Track Rotors',
                                 'engine': 'Tri-Motor Carbon-Sleeved Electric Powertrain',
                                 'power': '1,020 HP / 1,420 Nm Instant Torque',
                                 'suspension': 'Lowered Active Air Suspension Calibration'},
                'tag_en': 'ELECTRIC HYPERCAR • 1020 HP • 9.230 SEC',
                'tag_ru': 'ЭЛЕКТРО-ГИПЕРКАР • 1020 HP • 9.230 СЕК',
                'top_speed': '—',
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
                'fallback_img': 'assets/cars/gtt_classified_car.svg',
                'hp': '—',
                'id': 'tonystark',
                'img': 'assets/cars/gtt_classified_car.svg',
                'is_photo': 0,
                'name_en': 'R8 V10 PLUS TWIN TURBO TONY STARK / RDRC',
                'name_ru': 'R8 V10 PLUS TWIN TURBO TONY STARK / RDRC',
                'object_position': 'center center',
                'quarter_mile': '—',
                'sort_order': 31,
                'specs': {       'cooling': 'CSF Triple Billet Heat Exchangers',
                                 'ecu': 'Syvecs S12 Standalone Motorsport Setup',
                                 'engine': '5.2L FSI V10 Twin Turbo Mid-Engine',
                                 'turbos': 'Mirror Twin Turbo Kit with Air-to-Water Intercooling'},
                'tag_en': 'BAIKAL ICE & RDRC FIGHTER • 8.948 SEC',
                'tag_ru': 'ПОКОРИТЕЛЬ БАЙКАЛА & RDRC • 8.948 СЕК',
                'top_speed': '—',
                'type': 'audi',
                'video_src': 'assets/videos/dodge_srt_pass.mp4',
                'video_title': 'Audi R8 V10 Twin Turbo Tony Stark — боевой заезд'}]

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
        {"id": "m1", "name": "Гоша", "role": "Основатель & Главный конструктор GTT", "status": "active", "photo": "assets/archive_tilda/team_gosha.jpg"},
        {"id": "m2", "name": "Эдик", "role": "Технический директор ателье", "status": "active", "photo": "assets/archive_tilda/team_edik.jpg"},
        {"id": "m3", "name": "Дмитрий", "role": "Администратор проектов", "status": "atelier", "photo": "assets/archive_tilda/team_dmitry.jpg"},
        {"id": "m4", "name": "Мария", "role": "Делопроизводитель & Менеджер рекордов", "status": "atelier", "photo": "assets/archive_tilda/team_maria.jpg"},
        {"id": "m5", "name": "Павел", "role": "Делопроизводитель & Логист команды", "status": "atelier", "photo": "assets/archive_tilda/team_pavel.jpg"},
        {"id": "m6", "name": "Георгий", "role": "Инженер-электрик & Калибровщик Motec/Syvecs", "status": "active", "photo": "assets/archive_tilda/team_georgy.jpg"},
        {"id": "m7", "name": "Рустам", "role": "Моторист высшей квалификации", "status": "active", "photo": "assets/archive_tilda/team_rustam.jpg"},
        {"id": "m8", "name": "Никита", "role": "Гоночный механик паддока", "status": "paddock", "photo": "assets/archive_tilda/team_nikita.jpg"},
        {"id": "m9", "name": "Иван", "role": "Гоночный механик паддока", "status": "paddock", "photo": "assets/archive_tilda/team_ivan.jpg"},
        {"id": "m10", "name": "Алексей", "role": "Гоночный механик паддока", "status": "paddock", "photo": "assets/archive_tilda/team_alexey_paddock.jpg"},
        {"id": "m11", "name": "Фазик", "role": "Механик сборочного цеха", "status": "atelier", "photo": "assets/archive_tilda/team_fazik.jpg"},
        {"id": "m12", "name": "Степан", "role": "Механик сборочного цеха", "status": "atelier", "photo": "assets/archive_tilda/team_stepan.jpg"},
        {"id": "m13", "name": "Алексей", "role": "Механик ходовой части", "status": "atelier", "photo": "assets/archive_tilda/team_alexey_mech.jpg"},
        {"id": "m14", "name": "Роман", "role": "Сварщик-фабрикатор титана и инконеля", "status": "active", "photo": "assets/archive_tilda/team_roman.jpg"},
        {"id": "m15", "name": "Евгений", "role": "Диагност электронных систем", "status": "active", "photo": "assets/archive_tilda/team_evgeny.jpg"}
    ]
    for idx, member in enumerate(default_team):
        cursor.execute("INSERT OR REPLACE INTO team (id, name, role, status, photo, sort_order) VALUES (?, ?, ?, ?, ?, ?)",
                       (member["id"], member["name"], member["role"], member["status"], member.get("photo"), idx + 1))

    default_records = [
        {"id": "rec_moses", "year": "2016 • Абсолютный рекорд GTT", "car": "NISSAN GT-R R35 GTT-1800 «MOSES»", "telemetry": "1/4 мили: 7.526 сек • 304.36 км/ч", "desc": "Легендарные тесты в ОАЭ и UNLIM 500+ Greece. 7.526 сек со скоростью 304.36 км/ч — быстрейший результат на 402 м за всю историю ателье GoshaTurboTech.", "img": "assets/archive_tilda/gtr_moses.png"},
        {"id": "rec_draco", "year": "2024 • Рекорд RDRC Pro-Mod", "car": "NISSAN GT-R R35 DRACO PRO-MOD #300", "telemetry": "1/4 мили: 7.694 сек • 304.44 км/ч", "desc": "Пилот Руслан Арефьев на этапе RDRC 2024 (заезд №537). Подтвержденный протокол DragDB. Скорость на выходе 1/2 мили превысила 323.88 км/ч.", "img": "assets/cars/gtr_draco_promod_front.jpg"},
        {"id": "rec_kurdalagon", "year": "26.10.2026 • Рекорд Быково", "car": "NISSAN GT-R R35 «КУРДАЛАГОН»", "telemetry": "1/4 мили: 7.766 сек • 300.00 км/ч", "desc": "Свежайший подтвержденный рекорд команды GoshaTurboTech, зафиксированный на трек-дне в Быково в конце октября 2026 года.", "img": "assets/archive_tilda/gtr_kurdalagon.png"},
        {"id": "rec_rokot", "year": "2026 • Рекорд России для Audi", "car": "AUDI R8 V10 PLUS TWIN TURBO «ROKOT»", "telemetry": "1/4 мили: 7.877 сек • Суперкубок RDRC", "desc": "Эдуард Саркисян и Руслан Арефьев на болиде ателье GoshaTurboTech впервые в истории России вывели Audi из рубежа 8 секунд.", "img": "assets/cars/audi_r8_tsmr_launch.jpg"},
        {"id": "rec_bezzubik", "year": "Рекорд Европы • Race 1000", "car": "LAMBORGHINI HURACAN TT BEZZUBIK", "telemetry": "1/2 мили: 353.02 км/ч • 1/4 мили: 8.054 сек", "desc": "Официальный рекорд Европы на дистанции 804 м среди полноприводных суперкаров в Германии (353.02 км/ч) и 8.054 сек на 402 м. Легенда GTT.", "img": "assets/photos/huracan_rdrc_stage_line.jpg"},
        {"id": "rec_zelenka", "year": "ОАЭ & Германия • 344.60 км/ч", "car": "LAMBORGHINI HURACAN TWIN TURBO «ЗЕЛЕНКА»", "telemetry": "1/4 мили: 8.373 сек • 1000 м: 344.60 км/ч", "desc": "8.373 сек со скоростью 275.26 км/ч на 1/4 мили в ОАЭ и 344.60 км/ч на 1000 м в Германии (Rolling 50 1000). Культовый проект GoshaTurboTech.", "img": "assets/photos/huracan_zelenka_gtt.jpg"},
        {"id": "rec_lucifer", "year": "RDRC 2026 • 1-е место в классе", "car": "NISSAN GT-R R35 «LUCIFER» GTT #71", "telemetry": "1/4 мили: 8.400 сек • 1/2 мили: 343.67 км/ч", "desc": "Флагманский болид Гоши Перцхелии. 8.400 сек в ОАЭ, победный заезд 8.551 сек на RDRC 2026 и 343.67 км/ч на Unlim 500+.", "img": "assets/cars/gtr_lucifer_solo.jpg"},
        {"id": "rec_korzhik", "year": "Рекорд России • Московская миля", "car": "NISSAN GT-R R35 GTT «KORZHIK» #712", "telemetry": "1/2 мили: 13.435 сек • 334.41 км/ч", "desc": "Пилот Николай Коржов. 8.602 сек на 402 м и официальный рекорд России на 1/2 мили — 13.435 сек со скоростью 334.41 км/ч.", "img": "assets/cars/gtr_korzhik_712.jpg"},
        {"id": "rec_hulk", "year": "Суперкубок RDRC 2026", "car": "LAMBORGHINI HURACAN LP610-4 «HULK»", "telemetry": "1/4 мили: 8.951 сек • 3/8 мили: 291.14 км/ч", "desc": "Пилот Эдуард Саркисян в зачете GoshaTurboTech. 8.951 сек со скоростью 257.14 км/ч на 1/4 мили (3/8 мили: 11.561 с / 291.14 км/ч).", "img": "assets/cars/huracan_green_grey_rdrc.jpg"},
        {"id": "rec_tonystark", "year": "Record Days 2023", "car": "AUDI R8 V10 PLUS TT «TONY STARK»", "telemetry": "1/4 мили: 8.948 сек • 247.68 км/ч", "desc": "Стабильный выезд из 9 секунд на трек-днях Record Days (8.948 сек) и 15.403 сек со скоростью 287.19 км/ч на 1/2 мили.", "img": "assets/archive_tilda/audi_r8_tonystark.png"},
        {"id": "rec_gtt1200", "year": "Рекорд России/Европы • RDRC RacePark", "car": "PORSCHE 911 TURBO (991.1) GTT-1200", "telemetry": "1/4 мили: 9.086 сек • 259.64 км/ч", "desc": "Пилот Алексей Сагал. Рекорд России и Европы для кузова 991.1 (9.086 с), скорость на 1/2 мили — 312.77 км/ч.", "img": "assets/cars/porsche_991_1200_white.jpg"},
        {"id": "rec_su7", "year": "2026 • Суперкубок RDRC", "car": "XIAOMI SU7 ULTRA GTT RACE SPEC", "telemetry": "1/4 мили: 9.130 сек • 3/8 мили: 287.31 км/ч", "desc": "Пилот В. Щед в зачете GoshaTurboTech на Суперкубке RDRC 2026 показал сенсационные 9.130 сек со скоростью 249.31 км/ч.", "img": "assets/cars/bmw_m5_rdrc_race.jpg"},
        {"id": "rec_imba", "year": "2022–2025 • Мировой рекорд RDRC", "car": "PORSCHE 911 TURBO S (992) GTT-IMBA", "telemetry": "1/4 мили: 9.167 сек • RDRC 2025", "desc": "Пилот Мария Кутычкина. Мировой рекорд 9.252 сек со скоростью 231.80 км/ч на заводских турбинах, улучшенный на RDRC 2025 до 9.167 сек.", "img": "assets/cars/porsche_992_imba_silver.jpg"},
        {"id": "rec_puncher", "year": "2021 • Мировой ориентир UNLIM FEST", "car": "PORSCHE 911 TURBO S (992) PUNCHER", "telemetry": "1/4 мили: 9.303 сек • 235.83 км/ч", "desc": "Мировой ориентир для дорожных Porsche 992 на Unlim Fest (9.303 сек) и 1/2 мили за 14.778 сек со скоростью 276.92 км/ч.", "img": "assets/archive_tilda/porsche_992_puncher.jpg"},
        {"id": "rec_gyurza", "year": "2022 • Абсолютный рекорд льда", "car": "AUDI R8 V10 PLUS TT «GYURZA»", "telemetry": "1 км с места на льду: 124.00 км/ч", "desc": "Дни скорости на льду озера Байкал совместно с Kiwamaru. Абсолютный триумфатор ледовых заездов с места в истории России.", "img": "assets/archive_tilda/audi_r8_gyurza_ice.jpg"},
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
        car["isFeatured"] = bool(car.get("is_featured", 0))
        car["is_featured"] = int(car.get("is_featured", 0))
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
    car["isFeatured"] = bool(car.get("is_featured", 0))
    car["is_featured"] = int(car.get("is_featured", 0))
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
    if "is_featured" in car_data or "isFeatured" in car_data:
        feat_raw = car_data.get("is_featured", car_data.get("isFeatured", 0))
        feat_val = 1 if (feat_raw == 1 or feat_raw is True or feat_raw == '1') else 0
        cursor.execute("UPDATE cars SET is_featured = ? WHERE id = ?", (feat_val, car_data["id"]))
    if "sort_order" in car_data or "sortOrder" in car_data:
        try:
            so_val = int(car_data.get("sort_order", car_data.get("sortOrder", 0)) or 0)
            cursor.execute("UPDATE cars SET sort_order = ? WHERE id = ?", (so_val, car_data["id"]))
        except Exception:
            pass
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
        cursor.execute("UPDATE cars SET is_featured = 0")
        for idx, car_id in enumerate(featured_ids):
            cursor.execute("UPDATE cars SET sort_order = ?, is_featured = 1 WHERE id = ?", (idx + 1, car_id))
        placeholders = ','.join('?' for _ in featured_ids)
        cursor.execute(f"SELECT id FROM cars WHERE id NOT IN ({placeholders}) ORDER BY sort_order ASC, rowid ASC", featured_ids)
        remaining = cursor.fetchall()
        for idx, r in enumerate(remaining):
            cursor.execute("UPDATE cars SET sort_order = ?, is_featured = 0 WHERE id = ?", (len(featured_ids) + 1 + idx, r[0]))
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
        item.get("logo", ""),
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
            "img": "assets/moto/bmw_m1000rr_gtt.jpg",
            "sort_order": 1,
            "is_active": 1
        },
        {
            "id": "moto_2",
            "title": "Титановый выпуск GTT Moto",
            "code": "TITANIUM // EXH",
            "desc": "Ручная аргоновая сварка титана и инконеля для мотоциклов. Экстремальное снижение веса, породистый акустический звук и прибавка крутящего момента во всем диапазоне.",
            "bullets": "Ультралегкие коллекторы из сплава Titan-Gr5\nКастомная фрезеровка насадок\nОгненные отстрелы и сочный басовитый тон",
            "img": "assets/moto/gtt_moto_r1m_m1000rr_night.jpg",
            "sort_order": 2,
            "is_active": 1
        },
        {
            "id": "moto_3",
            "title": "Bespoke кастомизация",
            "code": "BESPOKE // CNC",
            "desc": "Полный цикл доработки премиальной мототехники: кованые сверхлегкие диски, сухое сцепление, карбоновое оперение и комплексное предсезонное ТО.",
            "bullets": "Сухой автоклавный карбон 3K/12K\nТормозные системы Brembo Racing / GP4\nИндивидуальный дизайн и покраска",
            "img": "assets/moto/bmw_m1000rr_cafe_street.jpg",
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


