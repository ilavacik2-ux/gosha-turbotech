/**
 * GOSHA TURBOTECH - Interactive Engine & Dataset
 * Strictly visual, data-driven, authentic engineering showcase
 */

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
window.escapeHtml = escapeHtml;

let gttProjects = [
  {
    "id": "gtr_lucifer",
    "brand": "NISSAN & GTT",
    "type": "gtr",
    "name": {
      "ru": "GT-R R35 «LUCIFER» GTT #71 CHAMPION",
      "en": "GT-R R35 «LUCIFER» GTT #71 CHAMPION"
    },
    "tag": {
      "ru": "ЧЕМПИОН RDRC • ПИЛОТ ГОША ПЕРЦХЕЛИЯ #71",
      "en": "RDRC CHAMPION • PILOT GOSHA PERTSKHELIYA #71"
    },
    "hp": "1,850+ HP",
    "quarterMile": "8.400 сек",
    "topSpeed": "343.67 км/ч",
    "badge": {
      "ru": "Боевой Огненный Болид Гоши #71",
      "en": "Gosha Fire Drag Weapon #71"
    },
    "img": "assets/cars/gtr_lucifer_solo.jpg",
    "fallbackImg": "assets/cars/gtr_lucifer_full.jpg",
    "isPhoto": true,
    "objectPosition": "center 46%",
    "videoSrc": "assets/videos/gosha_na_svoem_lucifer_web.mp4",
    "videoTitle": "Гоша на своей // GT-R Lucifer RDRC",
    "desc": {
      "ru": "Победоносный огненный болид Гоши Перцхелия, борт №71. Личный драг-монстр в культовой ливрее адского пламени — триумфатор и победитель чемпионата России RDRC (лучшее время 8.400 сек / 1/2 мили 13.690 с / 343.67 км/ч).",
      "en": "Victorious hellfire-liveried race weapon piloted by Gosha Pertskheliya himself (race car #71). Built in the GoshaTurboTech skunkworks — champion and winner of Russian Drag Racing Championship (RDRC) finals."
    },
    "specs": {
      "engine": "4.1L Billet Stroker VR38DETT GTT Race Spec",
      "turbos": "Dual Precision 7675 Gen2 Pro Mod Billet Turbos",
      "fuel": "VP Racing Ethanol M5 / Dual In-Tank 1700cc Injection",
      "ecu": "Motec M150 Drag AWD Management + GTT Flame Map",
      "chassis": "Full Drag Suspension, Parachute System & Weld Beadlocks"
    },
    "is_featured": 1,
    "isFeatured": true
  },
  {
    "id": "draco_promod",
    "brand": "NISSAN & DRACO",
    "type": "gtr",
    "name": {
      "ru": "GT-R R35 DRACO PRO-MOD GTT #300",
      "en": "GT-R R35 DRACO PRO-MOD GTT #300"
    },
    "tag": {
      "ru": "РЕКОРД RDRC 7.694 СЕК • ПИЛОТ Р. АРЕФЬЕВ #300",
      "en": "RDRC RECORD 7.694 SEC • PILOT R. AREFYEV #300"
    },
    "hp": "3,000+ HP",
    "quarterMile": "7.694 сек",
    "topSpeed": "323.88 км/ч",
    "badge": {
      "ru": "Белый Рекордный GT-R #300",
      "en": "White Record GT-R #300"
    },
    "img": "assets/cars/gtr_draco_promod_front.jpg",
    "fallbackImg": "assets/cars/gtr_draco_wrap_detail.jpg",
    "isPhoto": true,
    "objectPosition": "center 64%",
    "videoSrc": "assets/videos/draco_gtr_action.mp4",
    "videoTitle": "Nissan GT-R Draco Pro-Mod 3000+ HP — боевой рекордный заезд RDRC",
    "desc": {
      "ru": "Легендарный белый флагман дрэг-стрипа RDRC под управлением Руслана Арефьева (борт №300). Официальное время 7.694 сек со скоростью 304.44 км/ч на 1/4 мили (RDRC этап 5, заезд №537) и 323.88 км/ч на 1/2 мили. Специально построенное трубчатое шасси и свыше 3000 л.с.",
      "en": "Legendary white flagship of the RDRC drag strip piloted by Ruslan Arefyev (race car #300). Official verified time 7.694 sec at 304.44 km/h on the 1/4 mile (RDRC Stage 5, pass #537) and 323.88 km/h on the 1/2 mile."
    },
    "specs": {
      "engine": "4.3L Billet VR38 Race Block GTT / Draco Spec",
      "turbos": "Dual Precision 88mm Pro-Mod Turbochargers",
      "fuel": "Methanol M1 Injected + Dual Billet Fuel Rails",
      "ecu": "Motec M150 Standalone Pro Drag System",
      "chassis": "Full Chrome-Moly Tube Chassis & Carbon Body"
    },
    "is_featured": 1,
    "isFeatured": true
  },
  {
    "id": "r8_rokot",
    "brand": "AUDI & GTT",
    "type": "audi",
    "name": {
      "ru": "AUDI R8 V10 PLUS TWIN TURBO «ROKOT» GTT",
      "en": "AUDI R8 V10 PLUS TWIN TURBO «ROKOT» GTT"
    },
    "tag": {
      "ru": "РЕКОРД РОССИИ ДЛЯ AUDI • 7.877 СЕК",
      "en": "RUSSIAN RECORD FOR AUDI • 7.877 SEC"
    },
    "hp": "1,600+ HP",
    "quarterMile": "7.877 сек",
    "topSpeed": "350+ км/ч",
    "badge": {
      "ru": "Рекорд России для Audi 7.877s",
      "en": "Russia Audi Record 7.877s"
    },
    "img": "assets/cars/audi_r8_tsmr_launch.jpg",
    "fallbackImg": "assets/archive_tilda/audi_r8_tonystark.png",
    "isPhoto": true,
    "objectPosition": "center 75%",
    "videoSrc": "assets/videos/gtr_launch_pass.mp4",
    "videoTitle": "AUDI R8 V10 PLUS TWIN TURBO «ROKOT» GTT",
    "desc": {
      "ru": "Боевая Audi R8 «ROKOT» от GoshaTurboTech под управлением Эдуарда Саркисяна и Руслана Арефьева. Абсолютный национальный рекорд России для марки Audi на 1/4 мили (7.877 сек). Первый и единственный автомобиль марки Audi в стране, выехавший из 8 секунд!",
      "en": "Competition Audi R8 «ROKOT» by GoshaTurboTech piloted by Eduard Sarkisyan and Ruslan Arefyev. Absolute Russian National Record for Audi on the 1/4 mile (7.877 sec). The first and only Audi in Russia to conquer the 7-second barrier!"
    },
    "specs": {
      "engine": "5.2L FSI V10 Twin Turbo Mid-Engine GTT Stage 3",
      "turbos": "Mirror Twin Turbo Kit with Air-to-Water Intercooling",
      "cooling": "CSF Triple Billet Heat Exchangers",
      "ecu": "Syvecs S12 Standalone Motorsport Setup",
      "clutch": "GTT Upgraded Billet 9-Plate Dual Clutch"
    },
    "is_featured": 1,
    "isFeatured": true
  },
  {
    "id": "gtr_kurdalagon",
    "brand": "NISSAN & GTT",
    "type": "gtr",
    "name": {
      "ru": "GT-R R35 GTT «KURDALAGON»",
      "en": "GT-R R35 GTT «KURDALAGON»"
    },
    "tag": {
      "ru": "РЕКОРД БЫКОВО 26.10.2026 • 7.766 СЕК",
      "en": "BYKOVO RECORD 26.10.2026 • 7.766 SEC"
    },
    "hp": "1,650+ HP",
    "quarterMile": "7.766 сек",
    "topSpeed": "300.00 км/ч",
    "badge": {
      "ru": "Рекорд трек-дня 7.766s",
      "en": "Track-Day Record 7.766s"
    },
    "img": "assets/cars/___________1793144311_27df8e5d.jpg",
    "fallbackImg": "assets/cars/gtr_red_front_rdrc.jpg",
    "isPhoto": true,
    "objectPosition": "center 65%",
    "desc": {
      "ru": "Боевой болид Nissan GT-R R35 «Курдалагон» — имя древнего осетинского бога-кузнеца. 26 октября 2026 года на трек-дне в Быково установил новый личный рекорд команды: 7.766 сек на 402 метра со скоростью на выходе 300.00 км/ч.",
      "en": "Mythical Kurdalagon GT-R named after the ancient blacksmith deity. Set a brand new personal best of 7.766 sec at 300.00 km/h on October 26, 2026 at Bykovo Drag Track."
    },
    "specs": {
      "engine": "4.1L Billet VR38 Race Assembly GTT Spec",
      "turbos": "Dual Precision 7275 Billet Gen2",
      "fuel": "VP Racing Ethanol M5",
      "ecu": "Motec M150 Standalone Drag Management",
      "chassis": "Drag Parachute & Weld Racing Beadlocks"
    },
    "is_featured": 1,
    "isFeatured": true
  },
  {
    "id": "bezzubik",
    "brand": "LAMBORGHINI & GTT",
    "type": "lambo",
    "name": {
      "ru": "HURACAN TWIN TURBO GTT-BEZZUBIK",
      "en": "HURACAN TWIN TURBO GTT-BEZZUBIK"
    },
    "tag": {
      "ru": "РЕКОРД ЕВРОПЫ 353 КМ/Ч • RACE 1000",
      "en": "EUROPE RECORD 353 KM/H • RACE 1000"
    },
    "hp": "1,500+ HP",
    "quarterMile": "8.054 сек",
    "topSpeed": "353.02 км/ч",
    "badge": {
      "ru": "Рекорд Европы 353 км/ч",
      "en": "Race 1000 Europe Record"
    },
    "img": "assets/photos/huracan_rdrc_stage_line.jpg",
    "fallbackImg": "assets/cars/huracan_green_grey_rdrc.jpg",
    "isPhoto": true,
    "objectPosition": "center 65%",
    "videoSrc": "",
    "desc": {
      "ru": "Культовый европейский триумфатор Race 1000 в Германии и звезда RDRC. Официальный рекорд Европы со скоростью 353.02 км/ч на дистанции 804 метра и лучший квотер 8.054 сек. Построен и настроен в ателье GoshaTurboTech.",
      "en": "Iconic European champion of Race 1000 in Germany and RDRC superstar. Official European record with 353.02 km/h on 804m distance and 8.054 sec best 1/4 mile. Built and tuned by GoshaTurboTech."
    },
    "specs": {
      "engine": "5.2L V10 FSI Twin Turbo GTT Stage 3",
      "turbos": "Precision Dual Mirror V-Band Turbos",
      "exhaust": "GTT Inconel Custom Straight System",
      "ecu": "Syvecs Dual-CAN Motorsport Management",
      "fuel": "100 RON Daily / Ethanol E85 Race Map"
    },
    "is_featured": 0,
    "isFeatured": false
  },
  {
    "id": "porsche_911_imba",
    "brand": "PORSCHE & GTT",
    "type": "porsche",
    "name": {
      "ru": "PORSCHE 911 TURBO S (992) GTT-IMBA",
      "en": "PORSCHE 911 TURBO S (992) GTT-IMBA"
    },
    "tag": {
      "ru": "РЕКОРД RDRC 992 • 9.167 СЕК • М. КУТЫЧКИНА",
      "en": "RDRC 992 RECORD • 9.167 SEC • M. KUTYCHKINA"
    },
    "hp": "1,050+ HP",
    "quarterMile": "9.167 сек",
    "topSpeed": "345+ км/ч",
    "badge": {
      "ru": "Рекорд RDRC 992 • 9.167s",
      "en": "RDRC 992 Record • 9.167s"
    },
    "img": "assets/cars/porsche_992_imba_silver.jpg",
    "fallbackImg": "assets/cars/porsche_992_imba_silver.jpg",
    "isPhoto": true,
    "objectPosition": "center 64%",
    "videoSrc": "",
    "videoTitle": "Porsche 911 Turbo S IMBA — заезд RDRC 9.167 сек",
    "desc": {
      "ru": "Официальный рекордсмен RDRC среди Porsche поколения 992 под управлением Марии Кутычкиной. Подтвержденное время 9.167 сек со скоростью 236.92 км/ч на 1/4 мили (RDRC 2025, заезд 528). Кастомный интеркулер GTT и метаноловый впрыск.",
      "en": "Official RDRC record holder among Porsche 992 generation piloted by Maria Kutychkina. Verified time 9.167 sec at 236.92 km/h on 1/4 mile (RDRC 2025, pass 528). Custom GTT intercoolers and direct port methanol injection."
    },
    "specs": {
      "engine": "3.8L Twin-Turbo Boxer-6 GTT Spec",
      "turbos": "GTT Billet High-Flow Turbos",
      "fuel": "100 RON + Methanol Injection",
      "ecu": "Syvecs S7 Plus Standalone Porsche Kit"
    },
    "is_featured": 0,
    "isFeatured": false
  },
  {
    "id": "bmw_m5",
    "brand": "BMW M-POWER",
    "type": "bmw",
    "name": {
      "ru": "BMW M5 G90 COMPETITION GTT-STAGE 3",
      "en": "BMW M5 G90 COMPETITION GTT-STAGE 3"
    },
    "tag": {
      "ru": "RDRC ДРЭГ-КИЛЛЕР • БОЛИД GTT G90",
      "en": "RDRC DRAG WEAPON • GTT G90 BULLET"
    },
    "hp": "1,050+ HP",
    "quarterMile": "9.420 сек",
    "topSpeed": "340+ км/ч",
    "badge": {
      "ru": "Боевая BMW G90 Гоши Турботех",
      "en": "GoshaTurboTech Race BMW G90"
    },
    "img": "assets/cars/bmw_m5_rdrc_race.jpg",
    "fallbackImg": "assets/cars/bmw_m5_paddock_front.jpg",
    "isPhoto": true,
    "objectPosition": "center 54%",
    "videoSrc": "",
    "videoTitle": "BMW M5 G90 Competition GTT — боевой разгон",
    "desc": {
      "ru": "Заряженная боевая BMW M5 поколения G90 от GoshaTurboTech, выступающая в чемпионате России по дрэг-рейсингу RDRC. Полный привод M xDrive, гибридные турбины GTT и усиленная поршневая группа.",
      "en": "Competition BMW M5 G90 built by GoshaTurboTech competing in RDRC. M xDrive AWD system, custom GTT hybrid billet turbos, and reinforced engine internals."
    },
    "specs": {
      "engine": "4.4L V8 TwinPower Turbo Hybrid Powertrain GTT Spec",
      "turbos": "GTT Custom Billet Hybrid Turbos",
      "fuel": "100 RON + Methanol Direct Port Injected",
      "ecu": "GTT Custom Dual ECU & 8HP Transmission Flash",
      "exhaust": "Inconel Catless Downpipes + Full Titanium System"
    },
    "is_featured": 0,
    "isFeatured": false
  },
  {
    "id": "dodge_demon",
    "brand": "DODGE SRT",
    "type": "other",
    "name": {
      "ru": "DODGE CHALLENGER SRT DEMON GTT",
      "en": "DODGE CHALLENGER SRT DEMON GTT"
    },
    "tag": {
      "ru": "RDRC БЕРНАУТ КИНГ • 9.748 СЕК",
      "en": "RDRC BURNOUT KING • 9.748 SEC"
    },
    "hp": "1,200+ HP",
    "quarterMile": "9.748 сек",
    "topSpeed": "330+ км/ч",
    "badge": {
      "ru": "SRT Demon 1200+ HP",
      "en": "SRT Demon 1200+ HP"
    },
    "img": "assets/cars/dodge_burnout_sunset.jpg",
    "fallbackImg": "assets/cars/challenger_srt_gtt.jpg",
    "isPhoto": true,
    "objectPosition": "center 70%",
    "videoSrc": "",
    "videoTitle": "Dodge Challenger SRT Demon GTT — дымный бернаут RDRC",
    "desc": {
      "ru": "Черный компрессорный монстр Dodge Challenger SRT Demon от GoshaTurboTech под управлением И. Кардана и М. Шония. Подтвержденное время 9.748 сек со скоростью 233.24 км/ч на 1/4 мили RDRC 2026.",
      "en": "Supercharged black Dodge Challenger SRT Demon built by GoshaTurboTech, piloted by I. Kardan and M. Shoniya. Verified 9.748 sec at 233.24 km/h on RDRC 2026."
    },
    "specs": {
      "engine": "6.2L Supercharged HEMI V8 Built by GTT",
      "blower": "Whipple 3.8L Gen 5 Supercharger Kit",
      "fuel": "Triple Fore Innovations Fuel Pumps + 1700cc Injectors",
      "driveshaft": "QA1 Carbon Fiber Driveshaft + GTT 9-inch Rear End",
      "tires": "Mickey Thompson ET Street R Drag Radials"
    },
    "is_featured": 0,
    "isFeatured": false
  },
  {
    "id": "dodge_demon_170",
    "brand": "DODGE SRT",
    "type": "other",
    "name": {
      "ru": "DODGE CHALLENGER SRT DEMON 170 GTT",
      "en": "DODGE CHALLENGER SRT DEMON 170 GTT"
    },
    "tag": {
      "ru": "ЗАВОДСКОЙ ВЫХОД НА ВИЛЛИ • 1025 HP",
      "en": "FACTORY WHEELIE DRAG MONSTER • 1025 HP"
    },
    "hp": "1,025+ HP",
    "quarterMile": "9.150 сек",
    "topSpeed": "335+ км/ч",
    "badge": {
      "ru": "Demon 170 Crate",
      "en": "Demon 170 Crate"
    },
    "img": "assets/cars/challenger_burnout_close.jpg",
    "fallbackImg": "assets/cars/dodge_srt_front.jpg",
    "isPhoto": true,
    "objectPosition": "center center",
    "desc": {
      "ru": "Финальный коллекционный шедевр эпохи HEMI — Demon 170. Калибровка датчиков этанола flex-fuel, усиленный карданный вал и разгон с отрывом передних колес от стрипа.",
      "en": "The pinnacle of the HEMI era — Demon 170. Flex-fuel ethanol auto-tuning, reinforced drivetrain and wheelie-popping launches on VHT prepped tracks."
    },
    "specs": {
      "engine": "6.2L Supercharged D170 HEMI Crate Engine",
      "blower": "3.0L High-Helix Whipple Supercharger",
      "fuel": "Ethanol E85 Flex Fuel Auto-Calibration",
      "chassis": "Transbrake Pro Drag Launch System"
    },
    "videoSrc": "",
    "is_featured": 0,
    "isFeatured": false
  },
  {
    "id": "audi_zlayazaya",
    "brand": "AUDI & GTT",
    "type": "audi",
    "name": {
      "ru": "AUDI R8 V10 PLUS TWIN TURBO «ZLAYAZAYA»",
      "en": "AUDI R8 V10 PLUS TWIN TURBO «ZLAYAZAYA»"
    },
    "tag": {
      "ru": "RDRC БОЕВОЙ БОЛИД • ПИЛОТ Р. АРЕФЬЕВ",
      "en": "RDRC WEAPON • PILOT R. AREFYEV"
    },
    "hp": "1,200+ HP",
    "quarterMile": "10.060 сек",
    "topSpeed": "340+ км/ч",
    "badge": {
      "ru": "R8 «Злая Зая» GTT",
      "en": "R8 «ZlayaZaya» GTT"
    },
    "img": "assets/cars/audi_r8_zlayazaya_launch.jpg",
    "fallbackImg": "assets/cars/audi_r8_zlayazaya_launch.jpg",
    "isPhoto": true,
    "objectPosition": "center center",
    "videoSrc": "",
    "videoTitle": "Audi R8 «Злая Зая» — боевой выезд RDRC",
    "desc": {
      "ru": "Культовая Audi R8 «Злая Зая» Руслана Арефьева (борт №6303). Призер этапов чемпионата RDRC, стабильный запуск на полном приводе quattro и двухтурбинный пакет GTT.",
      "en": "Renowned Audi R8 ZlayaZaya piloted by Ruslan Arefyev (#6303). RDRC podium finisher with custom twin turbo package and relentless quattro AWD launches."
    },
    "specs": {
      "engine": "5.2L V10 FSI Reinforced Internals GTT",
      "turbos": "Dual Mirror Precision Turbos",
      "fuel": "Direct Port Fuel Injected 100 RON",
      "ecu": "Syvecs Powertrain Management"
    },
    "is_featured": 0,
    "isFeatured": false
  },
  {
    "id": "zelenka",
    "brand": "LAMBORGHINI",
    "type": "lambo",
    "name": {
      "ru": "HURACAN TWIN TURBO «ЗЕЛЕНКА» GTT",
      "en": "HURACAN TWIN TURBO «ZELENKA» GTT"
    },
    "tag": {
      "ru": "КУЛЬТОВЫЙ 1500+ СИЛЬНЫЙ БОЛИД RDRC",
      "en": "CULT 1500+ HP RDRC CHAMPIONSHIP BULLET"
    },
    "hp": "1,500+ HP",
    "quarterMile": "8.373 сек",
    "topSpeed": "355+ км/ч",
    "badge": {
      "ru": "Легендарная «Зеленка» GTT",
      "en": "Legendary «Zelenka» GTT"
    },
    "img": "assets/photos/huracan_zelenka_gtt.jpg",
    "fallbackImg": "assets/cars/huracan_green_grey_rdrc.jpg",
    "isPhoto": true,
    "objectPosition": "center 45%",
    "videoSrc": "",
    "videoTitle": "Lamborghini Huracan Twin Turbo «Зеленка» GTT — боевой заезд RDRC",
    "desc": {
      "ru": "Знаменитая ядовито-зеленая Lamborghini Huracan Twin Turbo «Зеленка» — легенда паддока RDRC и уличных дуэлей. Кастомный твин-турбо кит от GoshaTurboTech, задние бедлоки и выстрел за 8 секунд (1/2 мили 14.041 с / 327.86 км/ч).",
      "en": "The legendary acid-green Lamborghini Huracan Twin Turbo «Zelenka» — racing icon of the RDRC paddock. Built by GoshaTurboTech with custom mirror turbos, rear beadlock drag wheels and low 8-second passes."
    },
    "specs": {
      "engine": "5.2L V10 FSI GTT Built Engine",
      "turbos": "Precision Mirror Dual Ball-Bearing Turbos",
      "fuel": "Dual Billet Fuel Rails + 100 RON / E85 Maps",
      "trans": "GTT Upgraded Billet Dual Clutch 10-Plate",
      "wheels": "Weld Racing Rear Beadlocks with Mickey Thompson ET"
    },
    "is_featured": 0,
    "isFeatured": false
  },
  {
    "id": "lambo_maxpain",
    "brand": "LAMBORGHINI & GTT",
    "type": "lambo",
    "name": {
      "ru": "HURACAN PERFORMANTE TT GTT-MAXPAIN",
      "en": "HURACAN PERFORMANTE TT GTT-MAXPAIN"
    },
    "tag": {
      "ru": "FORGED COMPOSITES • 1600+ HP TWIN TURBO",
      "en": "FORGED COMPOSITES • 1600+ HP TWIN TURBO"
    },
    "hp": "1,600+ HP",
    "quarterMile": "8.150 сек",
    "topSpeed": "360+ км/ч",
    "badge": {
      "ru": "GTT-MAXPAIN Performante",
      "en": "GTT-MAXPAIN Performante"
    },
    "img": "assets/cars/huracan_maxpain_purple.jpg",
    "fallbackImg": "assets/cars/huracan_maxpain_purple.jpg",
    "isPhoto": true,
    "objectPosition": "center center",
    "desc": {
      "ru": "Безупречный Huracan Performante в заводском кованом карбоне Forged Composites с установленным биллетовым твин-турбо китом GTT. Чудовищная отдача 1600+ л.с. и активная аэродинамика ALA.",
      "en": "Forged Composites masterpiece Lamborghini Huracan Performante empowered by bespoke GTT 1600+ HP twin turbo system and calibrated ALA active aero."
    },
    "specs": {
      "engine": "5.2L V10 FSI GTT Billet Rods & Pistons",
      "turbos": "Mirror Twin Billet Precision Turbos Gen2",
      "clutch": "GTT Dual-Clutch Billet 10-Plate Basket",
      "ecu": "Syvecs S12 Standalone Motorsport Management"
    },
    "videoSrc": "",
    "is_featured": 0,
    "isFeatured": false
  },
  {
    "id": "lambo_spyder_800",
    "brand": "LAMBORGHINI & GTT",
    "type": "lambo",
    "name": {
      "ru": "HURACAN SPYDER GTT-800 STAGE 2",
      "en": "HURACAN SPYDER GTT-800 STAGE 2"
    },
    "tag": {
      "ru": "ЧЕМПИОНАТ ПФО 2 МЕСТО • 9.988 СЕК",
      "en": "PFO CHAMPIONSHIP PODIUM • 9.988 SEC"
    },
    "hp": "850+ HP",
    "quarterMile": "9.988 сек",
    "topSpeed": "335+ км/ч",
    "badge": {
      "ru": "Spyder GTT-800",
      "en": "Spyder GTT-800"
    },
    "img": "assets/cars/huracan_spyder_orange.jpg",
    "fallbackImg": "assets/cars/huracan_spyder_orange.jpg",
    "isPhoto": true,
    "objectPosition": "center center",
    "desc": {
      "ru": "Открытый родстер Huracan Spyder с доработанной выхлопной трассой Inconel и пакетом GTT Stage 2. Официальное 2-е место на Чемпионате ПФО с результатом 9.988 сек на 402 метра.",
      "en": "Atmospheric open-top roadster tuned with Inconel race exhaust and GTT Stage 2 package. PFO Championship podium with 9.988 sec quarter mile pass."
    },
    "specs": {
      "engine": "5.2L V10 Naturally Aspirated GTT Tune",
      "exhaust": "Inconel Valvetronic Full System Handcrafted",
      "intake": "Carbon Ram-Air Box",
      "ecu": "GTT Dual ECU Custom Calibration"
    },
    "videoSrc": "",
    "is_featured": 0,
    "isFeatured": false
  },
  {
    "id": "moses",
    "brand": "NISSAN",
    "type": "gtr",
    "name": {
      "ru": "GT-R R35 GTT-1800 «MOSES» #712",
      "en": "GT-R R35 GTT-1800 «MOSES» #712"
    },
    "tag": {
      "ru": "РЕКОРД ЕВРОПЫ UNLIM 500+ КРИТ • 7.810 СЕК",
      "en": "UNLIM 500+ CRETE EUROPE RECORD • 7.810 SEC"
    },
    "hp": "1,800+ HP",
    "quarterMile": "7.526 сек",
    "topSpeed": "360+ км/ч",
    "badge": {
      "ru": "Легендарный Moses #712",
      "en": "Legendary Moses #712"
    },
    "img": "assets/archive_tilda/gtr_moses.png",
    "fallbackImg": "assets/cars/gtr_draco_connections.jpg",
    "isPhoto": false,
    "desc": {
      "ru": "Культовый белый Nissan GT-R R35 «MOSES» борт №712. Европейский рекорд времени на Unlim 500+ Greece (остров Крит) — 7.810 сек / 287.65 км/ч и личный рекорд 7.526 сек со скоростью 304.36 км/ч в ОАЭ. 3-й результат в мире на момент постройки.",
      "en": "Iconic white Nissan GT-R R35 MOSES #712. European record holder at Unlim 500+ Greece (Crete) with 7.810 sec pass and personal best 7.526 sec at 304.36 km/h in UAE tests."
    },
    "specs": {
      "engine": "4.1L Billet Stroker VR38DETT GTT Spec",
      "turbos": "Dual Precision Ball-Bearing Race Turbos",
      "fuel": "VP Racing C16 / 100 RON Dual Fuel Map",
      "ecu": "Motec M1 + Custom GTT Drag AWD Logic",
      "trans": "GTT Billet PPG Sequential Dog-Box"
    },
    "videoSrc": "",
    "is_featured": 0,
    "isFeatured": false
  },
  {
    "id": "gtr_korzhik",
    "brand": "NISSAN & GTT",
    "type": "gtr",
    "name": {
      "ru": "GT-R R35 GTT «KORZHIK» #712",
      "en": "GT-R R35 GTT «KORZHIK» #712"
    },
    "tag": {
      "ru": "РЕКОРД РОССИИ 334 КМ/Ч • Н. КОРЖОВ",
      "en": "RUSSIAN RECORD 334 KM/H • N. KORZHOV"
    },
    "hp": "1,600+ HP",
    "quarterMile": "8.602 сек",
    "topSpeed": "334.41 км/ч",
    "badge": {
      "ru": "Рекорд России 334 км/ч",
      "en": "Russian Record 334 km/h"
    },
    "img": "assets/cars/gtr_korzhik_712.jpg",
    "fallbackImg": "assets/cars/gtr_korzhik_712.jpg",
    "isPhoto": true,
    "desc": {
      "ru": "Боевой болид Николая Коржова. Рекорд России на Московской миле (1/2 мили: 13.435 сек со скоростью 334.41 км/ч) и 8.602 сек на 402 метра. Вице-чемпион абсолютного зачета Чемпионата SMP RDRC в классе FSL.",
      "en": "Competition build piloted by Nikolay Korzhov. Russian Record at Moscow Mile (1/2 mile: 13.435 sec at 334.41 km/h) and 8.602 sec 1/4 mile. Vice-champion of SMP RDRC FSL class."
    },
    "specs": {
      "engine": "4.0L Forged VR38 GTT Spec",
      "turbos": "Precision Gen2 Billet Race Turbos",
      "fuel": "VP Racing Ethanol Map",
      "transmission": "Dodson Promax Heavy Duty Clutch"
    },
    "videoSrc": "",
    "is_featured": 0,
    "isFeatured": false,
    "objectPosition": "center center"
  },
  {
    "id": "gtr_baloo",
    "brand": "NISSAN & GTT",
    "type": "gtr",
    "name": {
      "ru": "GT-R R35 GTT «BALOO»",
      "en": "GT-R R35 GTT «BALOO»"
    },
    "tag": {
      "ru": "МОСКОВСКАЯ МИЛЯ • 8.875 СЕК • 322 КМ/Ч",
      "en": "MOSCOW MILE • 8.875 SEC • 322 KM/H"
    },
    "hp": "1,450+ HP",
    "quarterMile": "8.875 сек",
    "topSpeed": "322.00 км/ч",
    "badge": {
      "ru": "GT-R Baloo GTT",
      "en": "GT-R Baloo GTT"
    },
    "img": "assets/cars/gtr_red_strip_sunset.jpg",
    "fallbackImg": "assets/cars/gtr_draco_connections.jpg",
    "isPhoto": true,
    "objectPosition": "center 60%",
    "desc": {
      "ru": "Уникальный проект «Baloo» с мощнейшим средним диапазоном оборотов и полным приводом. Личные показатели команды: 8.875 сек на 402 м со скоростью 262.39 км/ч и 13.726 сек на 1/2 мили со скоростью 322.00 км/ч.",
      "en": "Unique Baloo build optimized for high mid-range torque and lethal AWD traction. Official team records: 8.875 sec at 262.39 km/h on 1/4 mile and 13.726 sec at 322.00 km/h on 1/2 mile."
    },
    "specs": {
      "engine": "3.8L VR38 Reinforced GTT Block",
      "turbos": "Garrett G30 Billet Turbos",
      "cooling": "GTT Dual Radiator Pack",
      "fuel": "Dual In-Tank Fuel Rail"
    },
    "videoSrc": "",
    "is_featured": 0,
    "isFeatured": false
  },
  {
    "id": "gtr_blue_888",
    "brand": "NISSAN",
    "type": "gtr",
    "name": {
      "ru": "GT-R R35 MIDNIGHT BLUE GTT #888",
      "en": "GT-R R35 MIDNIGHT BLUE GTT #888"
    },
    "tag": {
      "ru": "RDRC ЧЕМПИОНАТ РОССИИ • БОРТ #888",
      "en": "RDRC RUSSIAN CHAMPIONSHIP • CAR #888"
    },
    "hp": "1,550+ HP",
    "quarterMile": "8.120 сек",
    "topSpeed": "348+ км/ч",
    "badge": {
      "ru": "Синий GT-R #888",
      "en": "Blue GT-R #888"
    },
    "img": "assets/photos/gtr_blue_888_rdrc.jpg",
    "fallbackImg": "assets/cars/gtr_blue_rdrc_888.jpg",
    "isPhoto": true,
    "objectPosition": "center 45%",
    "videoSrc": "",
    "videoTitle": "Nissan GT-R #888 Midnight Blue GTT — боевой заезд RDRC",
    "desc": {
      "ru": "Знаменитый синий Nissan GT-R R35 со стартовым номером #888, постоянный участник и призер этапов Чемпионата России RDRC. Калибровка лаунч-контроля GTT и кованый 3.8L VR38.",
      "en": "The renowned Midnight Blue Nissan GT-R R35 carrying race #888, competing consistently on RDRC stages. Calibrated GTT launch control algorithms and bulletproof forged 3.8L VR38."
    },
    "specs": {
      "engine": "3.8L Forged VR38DETT GTT Spec",
      "turbos": "Dual Garrett G30-900 Turbochargers",
      "cooling": "ETS 4-inch Race Intercooler Kit",
      "ecu": "Syvecs S6+ ECU with GTT Drag Launch Strategy",
      "trans": "Dodson Pro-Max 8-Plate Drag Clutch"
    },
    "is_featured": 0,
    "isFeatured": false
  },
  {
    "id": "gtr_red",
    "brand": "NISSAN",
    "type": "gtr",
    "name": {
      "ru": "GT-R R35 RED CHROME GTT PRO-MOD",
      "en": "GT-R R35 RED CHROME GTT PRO-MOD"
    },
    "tag": {
      "ru": "RDRC ЧЕМПИОНАТ РОССИИ • КРАСНЫЙ ХРОМ",
      "en": "RDRC RUSSIAN CHAMPIONSHIP • RED CHROME"
    },
    "hp": "1,650+ HP",
    "quarterMile": "7.950 сек",
    "topSpeed": "350+ км/ч",
    "badge": {
      "ru": "Красный Хром RDRC",
      "en": "Red Chrome RDRC"
    },
    "img": "assets/cars/gtr_red_front_rdrc.jpg",
    "fallbackImg": "assets/cars/gtr_red_chrome_rdrc.jpg",
    "isPhoto": true,
    "objectPosition": "center 62%",
    "videoSrc": "",
    "videoTitle": "Nissan GT-R GTT Red Chrome G35 — боевой заезд RDRC",
    "desc": {
      "ru": "Один из самых ярких Nissan GT-R в российском дрэг-рейсинге под управлением Гоши Перцхелия. Кастомный хром-дизайн, усиленная подвеска и боевая трансмиссия GTT.",
      "en": "One of the most striking Nissan GT-R cars in Russian drag racing piloted by Gosha Pertskheliya. Custom red chrome livery, reinforced suspension and bulletproof GTT race transmission."
    },
    "specs": {
      "engine": "3.8L VR38DETT Custom GTT Billet Assembly",
      "turbos": "Garrett G35-1050 Turbochargers",
      "cooling": "Front Mount Massive Intercooler Core",
      "ecu": "Syvecs S8 ECU with Launch & Traction Control"
    },
    "is_featured": 0,
    "isFeatured": false
  },
  {
    "id": "gtr_rocket",
    "brand": "NISSAN & GTT",
    "type": "gtr",
    "name": {
      "ru": "GT-R R35 GTT «ROCKET»",
      "en": "GT-R R35 GTT «ROCKET»"
    },
    "tag": {
      "ru": "СПЕЦПРОЕКТ GTT • КАРБОНОВЫЙ БОДИКИТ",
      "en": "GTT ATELIER SPEC • FULL CARBON AERO"
    },
    "hp": "1,500+ HP",
    "quarterMile": "8.350 сек",
    "topSpeed": "345+ км/ч",
    "badge": {
      "ru": "GTT Rocket Spec",
      "en": "GTT Rocket Spec"
    },
    "img": "assets/cars/gtr_rocket_grey.jpg",
    "fallbackImg": "assets/cars/gtr_rocket_grey.jpg",
    "isPhoto": true,
    "objectPosition": "center center",
    "desc": {
      "ru": "Экстремальный проект Nissan GT-R R35 «Rocket» ателье GoshaTurboTech. Двухтурбинный наддув, титановый прямой выхлоп и облегченная гоночная конфигурация кузова.",
      "en": "Extreme project Nissan GT-R R35 Rocket by GoshaTurboTech. Twin turbo package, titanium straight pipes and ultra-lightweight race setup."
    },
    "specs": {
      "engine": "3.8L VR38DETT Built by GTT",
      "turbos": "Dual Precision High-Boost Turbos",
      "ecu": "Motec M1 Drag Calibration",
      "fuel": "100 RON + Ethanol Map"
    },
    "videoSrc": "",
    "is_featured": 0,
    "isFeatured": false
  },
  {
    "id": "gtr_alpha12x",
    "brand": "NISSAN & GTT",
    "type": "gtr",
    "name": {
      "ru": "GT-R R35 GTT ALPHA12X SPEC",
      "en": "GT-R R35 GTT ALPHA12X SPEC"
    },
    "tag": {
      "ru": "КУЛЬТОВАЯ АЛЬФА GTT • 1500 HP",
      "en": "CULT ALPHA GTT • 1500 HP"
    },
    "hp": "1,500+ HP",
    "quarterMile": "8.250 сек",
    "topSpeed": "350+ км/ч",
    "badge": {
      "ru": "Alpha 12X GTT",
      "en": "Alpha 12X GTT"
    },
    "img": "assets/cars/gtr_alpha12x_launch.jpg",
    "fallbackImg": "assets/cars/gtr_alpha12x_launch.jpg",
    "isPhoto": true,
    "objectPosition": "center center",
    "desc": {
      "ru": "Проект на базе культового пакета Alpha 12X, доработанный инженерами GTT. Кастомное охлаждение, усиленная трансмиссия GR6 и индивидуальная прошивка блока управления.",
      "en": "Build based on the legendary Alpha 12X package, heavily refined by GTT engineers. Upgraded GR6 transmission and bespoke engine management."
    },
    "specs": {
      "engine": "4.0L Stroker VR38 GTT Spec",
      "turbos": "AMS Alpha 12X Turbo Kit",
      "transmission": "ShepTrans Stage 4 GR6",
      "ecu": "Syvecs S8 Dual ECU"
    },
    "videoSrc": "",
    "is_featured": 0,
    "isFeatured": false
  },
  {
    "id": "porsche_991_1200",
    "brand": "PORSCHE & GTT",
    "type": "porsche",
    "name": {
      "ru": "PORSCHE 911 TURBO (991.1) GTT-1200",
      "en": "PORSCHE 911 TURBO (991.1) GTT-1200"
    },
    "tag": {
      "ru": "РЕКОРД РОССИИ/ЕВРОПЫ • А. САГАЛ",
      "en": "RUSSIA/EUROPE RECORD • A. SAGAL"
    },
    "hp": "1,200+ HP",
    "quarterMile": "9.086 сек",
    "topSpeed": "312.77 км/ч",
    "badge": {
      "ru": "991.1 GTT-1200",
      "en": "991.1 GTT-1200"
    },
    "img": "assets/cars/porsche_991_1200_white.jpg",
    "fallbackImg": "assets/cars/porsche_991_1200_white.jpg",
    "isPhoto": true,
    "objectPosition": "center center",
    "desc": {
      "ru": "Безумный 991.1 Turbo Алексея Сагала. Официальный рекорд России/Европы на RDRC RacePark: 9.086 сек со скоростью 259.64 км/ч на 402 м и 14.186 сек со скоростью 312.77 км/ч на 1/2 мили.",
      "en": "Savage 991.1 Turbo piloted by Alexey Sagal. Official Russia/Europe Record at RDRC RacePark: 9.086 sec at 259.64 km/h on 1/4 mile and 14.186 sec at 312.77 km/h on 1/2 mile."
    },
    "specs": {
      "engine": "3.8L Twin-Turbo Boxer-6 Built Internals",
      "turbos": "GTT Dual Billet High-Flow Turbos",
      "transmission": "Reinforced PDK Dual-Clutch Pack",
      "fuel": "Methanol Direct Port Injection"
    },
    "videoSrc": "",
    "is_featured": 0,
    "isFeatured": false
  },
  {
    "id": "porsche_991_felix",
    "brand": "PORSCHE & GTT",
    "type": "porsche",
    "name": {
      "ru": "PORSCHE 911 TURBO S (991.2) FELIX FERRO",
      "en": "PORSCHE 911 TURBO S (991.2) FELIX FERRO"
    },
    "tag": {
      "ru": "FELIX FERRO EDITION • 9.601 СЕК",
      "en": "FELIX FERRO EDITION • 9.601 SEC"
    },
    "hp": "950+ HP",
    "quarterMile": "9.601 сек",
    "topSpeed": "232.40 км/ч",
    "badge": {
      "ru": "Felix Ferro Edition",
      "en": "Felix Ferro Edition"
    },
    "img": "assets/cars/porsche_991_felix_grey.jpg",
    "fallbackImg": "assets/cars/porsche_991_felix_grey.jpg",
    "isPhoto": true,
    "objectPosition": "center center",
    "desc": {
      "ru": "Лимитированная инженерная серия Felix Ferro Edition. Индивидуальный аэродинамический пакет, облегченные кованые диски и настройка блока управления Syvecs. 9.601 сек на квотере.",
      "en": "Exclusive Felix Ferro Edition bespoke engineering build. Lightweight aero package, forged monoblocks and Syvecs ECU calibration. 9.601 sec quarter mile."
    },
    "specs": {
      "engine": "3.8L Twin-Turbo Boxer-6 GTT RS Spec",
      "turbos": "Billet Hybrid Turbos Gen2",
      "exhaust": "Titanium Valved System Handcrafted",
      "ecu": "Syvecs S7 Standalone Engine Management"
    },
    "videoSrc": "",
    "is_featured": 0,
    "isFeatured": false
  },
  {
    "id": "bmw_m7_gtt",
    "brand": "BMW M-POWER",
    "type": "bmw",
    "name": {
      "ru": "BMW M7 GTT EXECUTIVE TWIN TURBO",
      "en": "BMW M7 GTT EXECUTIVE TWIN TURBO"
    },
    "tag": {
      "ru": "EXECUTIVE FLAGSHIP • 900 HP V12",
      "en": "EXECUTIVE FLAGSHIP • 900 HP V12"
    },
    "hp": "900+ HP",
    "quarterMile": "10.200 сек",
    "topSpeed": "330+ км/ч",
    "badge": {
      "ru": "M7 Executive GTT",
      "en": "M7 Executive GTT"
    },
    "img": "assets/cars/bmw_m7_gtt_blue.jpg",
    "fallbackImg": "assets/cars/bmw_m7_gtt_blue.jpg",
    "isPhoto": true,
    "objectPosition": "center 82%",
    "desc": {
      "ru": "Представительский флагман BMW 7 серии в глубокой доработке GoshaTurboTech. Двухтурбинный V8/V12, бесшумный акустический комфорт в салоне и ураганная динамика на скоростных прямых.",
      "en": "Executive flagship 7-series heavily enhanced by GoshaTurboTech. Twin-turbocharged powertrain offering silent luxury alongside autobahn supremacy."
    },
    "specs": {
      "engine": "4.4L V8 TwinPower Turbo GTT Stage 2",
      "turbos": "Billet Hybrid Turbochargers",
      "exhaust": "Bespoke Stainless Valvetronic System",
      "transmission": "ZF 8HP Reinforced Calibration"
    },
    "videoSrc": "",
    "is_featured": 0,
    "isFeatured": false
  },
  {
    "id": "volga_kgb",
    "brand": "ГАЗ & GTT",
    "type": "other",
    "name": {
      "ru": "ВОЛГА ГАЗ-24 КГБ V8 GTT SLEEPER",
      "en": "VOLGA GAZ-24 KGB V8 GTT SLEEPER"
    },
    "tag": {
      "ru": "ЛЕГЕНДАРНЫЙ СЛИПЕР • V8 TWIN TURBO",
      "en": "LEGENDARY SLEEPER • V8 TWIN TURBO"
    },
    "hp": "1,050+ HP",
    "quarterMile": "9.420 сек",
    "topSpeed": "340+ км/ч",
    "badge": {
      "ru": "Волга КГБ V8",
      "en": "Volga KGB V8"
    },
    "img": "assets/cars/volga_kgb_v8_workshop.jpg",
    "fallbackImg": "assets/cars/volga_kgb_v8_workshop.jpg",
    "isPhoto": true,
    "objectPosition": "center center",
    "desc": {
      "ru": "Легендарный советский проект в кузове ГАЗ-24 «Догонялка». Внешне аутентичный хромированный силуэт спецслужб, внутри — современный турбированный V8 и кастомное спортивное шасси.",
      "en": "Legendary Soviet KGB interceptor GAZ-24 sleeper. Factory classic exterior concealing modern twin-turbo V8 and motorsport chassis."
    },
    "specs": {
      "engine": "V8 Twin Turbo Restomod Powertrain",
      "chassis": "Bespoke Independent Suspension & Wilwood Brakes",
      "transmission": "Reinforced 6-Speed Manual",
      "interior": "Restored Factory Soviet Cockpit"
    },
    "videoSrc": "",
    "is_featured": 0,
    "isFeatured": false
  },
  {
    "id": "ferrari_512tr",
    "brand": "FERRARI & GTT",
    "type": "other",
    "name": {
      "ru": "FERRARI 512 TR GTT HERITAGE CLASSIC",
      "en": "FERRARI 512 TR GTT HERITAGE CLASSIC"
    },
    "tag": {
      "ru": "ИТАЛЬЯНСКАЯ ИКОНА • FLAT-12 ENGINE",
      "en": "ITALIAN ICON • FLAT-12 ENGINE"
    },
    "hp": "550+ HP",
    "quarterMile": "10.800 сек",
    "topSpeed": "315+ км/ч",
    "badge": {
      "ru": "Ferrari 512 TR",
      "en": "Ferrari 512 TR"
    },
    "img": "assets/cars/ferrari_512tr_dyno_red.jpg",
    "fallbackImg": "assets/cars/ferrari_512tr_dyno_red.jpg",
    "isPhoto": true,
    "isClassified": true,
    "objectPosition": "center center",
    "desc": {
      "ru": "Итальянская икона с 12-цилиндровым оппозитным двигателем Flat-12. Комплексная механическая доработка в цехах GTT, индивидуальный титановый выпуск и филигранная калибровка впрыска.",
      "en": "Italian legend powered by Flat-12 engine. Complete mechanical overhaul by GTT, bespoke titanium exhaust and precision injection mapping."
    },
    "specs": {
      "engine": "4.9L Flat-12 Naturally Aspirated Maranello",
      "exhaust": "Handmade Titanium Valved Exhaust",
      "clutch": "GTT Heavy Duty Multi-Plate Clutch",
      "brakes": "Brembo Racing High-Friction Setup"
    },
    "videoSrc": "",
    "is_featured": 0,
    "isFeatured": false
  },
  {
    "id": "gtr_fifa",
    "brand": "NISSAN & GTT",
    "type": "gtr",
    "name": {
      "ru": "GT-R R35 GTT «FIFA» #10",
      "en": "GT-R R35 GTT «FIFA» #10"
    },
    "tag": {
      "ru": "ИМЕННОЙ БОЛИД • LUXURY & DRAG",
      "en": "BESPOKE BUILD • LUXURY & DRAG"
    },
    "hp": "—",
    "quarterMile": "—",
    "topSpeed": "—",
    "badge": {
      "ru": "GT-R FIFA #10",
      "en": "GT-R FIFA #10"
    },
    "img": "assets/cars/gtt_classified_car.svg",
    "fallbackImg": "assets/cars/gtt_classified_car.svg",
    "isPhoto": false,
    "objectPosition": "center center",
    "desc": {
      "ru": "Именной болид «FIFA», созданный в ателье GoshaTurboTech. Сочетает комфортный салон и бескомпромиссные характеристики разгона из 8.5 секунд на квотере.",
      "en": "Bespoke FIFA build crafted by GoshaTurboTech atelier, pairing premium cockpit refinement with sub-8.5 quarter-mile violence."
    },
    "specs": {
      "engine": "4.1L Billet Stroker VR38 GTT",
      "turbos": "Precision Gen2 Turbochargers",
      "transmission": "Dodson Motorsport Billet Gearset",
      "ecu": "Motec M150"
    },
    "videoSrc": "",
    "is_featured": 0,
    "isFeatured": false,
    "isClassified": true,
    "isTeaser": true
  },
  {
    "id": "porsche_991_900",
    "brand": "PORSCHE & GTT",
    "type": "porsche",
    "name": {
      "ru": "PORSCHE 911 TURBO S (991.2) GTT-900",
      "en": "PORSCHE 911 TURBO S (991.2) GTT-900"
    },
    "tag": {
      "ru": "GTT STAGE 2+ • 900 HP НА 100 БЕНЗИНЕ",
      "en": "GTT STAGE 2+ • 900 HP PUMP FUEL"
    },
    "hp": "—",
    "quarterMile": "—",
    "topSpeed": "—",
    "badge": {
      "ru": "GTT-900 Stage 2+",
      "en": "GTT-900 Stage 2+"
    },
    "img": "assets/cars/gtt_classified_car.svg",
    "fallbackImg": "assets/cars/gtt_classified_car.svg",
    "isPhoto": false,
    "objectPosition": "center center",
    "desc": {
      "ru": "Идеальный баланс повседневного суперкара и рекордного темпа. 900 сил на товарном 100-м бензине с ресурсом заводского мотора.",
      "en": "The quintessential balance of daily driveability and track dominance. 900 reliable horsepower on pump 100 RON gasoline."
    },
    "specs": {
      "engine": "3.8L Boxer-6 Twin-Turbo GTT Stage 2",
      "turbos": "Upgraded High-Efficiency Turbos",
      "intercoolers": "CSF High-Capacity Charge Coolers",
      "ecu": "Custom GTT ECU & TCU Map"
    },
    "videoSrc": "",
    "is_featured": 0,
    "isFeatured": false,
    "isClassified": true,
    "isTeaser": true
  },
  {
    "id": "porsche_992_puncher",
    "brand": "PORSCHE & GTT",
    "type": "porsche",
    "name": {
      "ru": "PORSCHE 911 TURBO S (992) GTT «PUNCHER»",
      "en": "PORSCHE 911 TURBO S (992) GTT «PUNCHER»"
    },
    "tag": {
      "ru": "МИРОВОЙ РЕКОРД В КАТЕГОРИИ • 9.303 СЕК",
      "en": "WORLD CATEGORY RECORD • 9.303 SEC"
    },
    "hp": "—",
    "quarterMile": "—",
    "topSpeed": "—",
    "badge": {
      "ru": "Puncher 992 GTT",
      "en": "Puncher 992 GTT"
    },
    "img": "assets/cars/gtt_classified_car.svg",
    "fallbackImg": "assets/cars/gtt_classified_car.svg",
    "isPhoto": false,
    "objectPosition": "center center",
    "desc": {
      "ru": "Культовый Porsche 992 Turbo S «Puncher» Сергея Никитина. Мировой рекорд в категории на UNLIM FEST 2021: 9.303 сек со скоростью 235.83 км/ч на 1/4 мили и 14.778 сек со скоростью 276.92 км/ч на 1/2 мили.",
      "en": "Iconic Porsche 992 Turbo S Puncher driven by Sergey Nikitin. World Category Record at UNLIM FEST 2021: 9.303 sec at 235.83 km/h on 1/4 mile and 14.778 sec at 276.92 km/h on 1/2 mile."
    },
    "specs": {
      "engine": "3.8L Boxer-6 992 GTT Spec",
      "turbos": "Billet Precision Mirror Turbos",
      "intercooling": "High-Flow Core Package",
      "fuel": "Methanol Multi-Port System"
    },
    "videoSrc": "",
    "is_featured": 0,
    "isFeatured": false,
    "isClassified": true,
    "isTeaser": true
  },
  {
    "id": "mercedes_e63",
    "brand": "MERCEDES-AMG & GTT",
    "type": "other",
    "name": {
      "ru": "MERCEDES-AMG E63S 4MATIC+ GTT-950",
      "en": "MERCEDES-AMG E63S 4MATIC+ GTT-950"
    },
    "tag": {
      "ru": "RDRC 2026 • 9.880 СЕК • ПИЛОТ В. ЩЕД",
      "en": "RDRC 2026 • 9.880 SEC • PILOT V. SHCHED"
    },
    "hp": "—",
    "quarterMile": "—",
    "topSpeed": "—",
    "badge": {
      "ru": "E63S GTT-950",
      "en": "E63S GTT-950"
    },
    "img": "assets/cars/gtt_classified_car.svg",
    "fallbackImg": "assets/cars/gtt_classified_car.svg",
    "isPhoto": false,
    "isClassified": true,
    "objectPosition": "center center",
    "desc": {
      "ru": "Беспощадный бизнес-седан с 4.0L V8 Biturbo, форсированный до 950 л.с. Пилот В. Щед на RDRC 2026 показал подтвержденное время 9.880 сек со скоростью 234.91 км/ч на 1/4 мили.",
      "en": "Savage executive sedan boasting 950 horsepower from 4.0L V8 Biturbo. Piloted by V. Shched on RDRC 2026 with verified 9.880 sec pass at 234.91 km/h."
    },
    "specs": {
      "engine": "4.0L V8 Biturbo M177 Built by GTT",
      "turbos": "Billet Upgraded Stage 3 Turbos",
      "downpipes": "Inconel Catless Thermal-Wrapped Pipes",
      "transmission": "AMG SPEEDSHIFT MCT 9G Flashed"
    },
    "videoSrc": "",
    "is_featured": 0,
    "isFeatured": false,
    "isTeaser": true
  },
  {
    "id": "tesla_plaid",
    "brand": "TESLA & GTT",
    "type": "other",
    "name": {
      "ru": "TESLA MODEL S PLAID GTT DYNAMICS SPEC",
      "en": "TESLA MODEL S PLAID GTT DYNAMICS SPEC"
    },
    "tag": {
      "ru": "ЭЛЕКТРО-ГИПЕРКАР • 1020 HP • 9.230 СЕК",
      "en": "ELECTRIC HYPERCAR • 1020 HP • 9.230 SEC"
    },
    "hp": "—",
    "quarterMile": "—",
    "topSpeed": "—",
    "badge": {
      "ru": "Tesla Plaid GTT",
      "en": "Tesla Plaid GTT"
    },
    "img": "assets/cars/gtt_classified_car.svg",
    "fallbackImg": "assets/cars/gtt_classified_car.svg",
    "isPhoto": false,
    "isClassified": true,
    "objectPosition": "center center",
    "desc": {
      "ru": "Трековый проект на базе трехмоторного седана Tesla Model S Plaid. Спортивная карбон-керамическая тормозная система GTT, оптимизация охлаждения инверторов и аэродинамический сплиттер.",
      "en": "Track project based on tri-motor Tesla Model S Plaid. GTT carbon-ceramic braking package, inverter thermal optimization and high-downforce aero."
    },
    "specs": {
      "engine": "Tri-Motor Carbon-Sleeved Electric Powertrain",
      "power": "1,020 HP / 1,420 Nm Instant Torque",
      "brakes": "GTT Carbon Ceramic 410mm Track Rotors",
      "suspension": "Lowered Active Air Suspension Calibration"
    },
    "videoSrc": "",
    "is_featured": 0,
    "isFeatured": false,
    "isTeaser": true
  },
  {
    "id": "tonystark",
    "brand": "AUDI & ЦМРБАНК",
    "type": "audi",
    "name": {
      "ru": "R8 V10 PLUS TWIN TURBO TONY STARK / RDRC",
      "en": "R8 V10 PLUS TWIN TURBO TONY STARK / RDRC"
    },
    "tag": {
      "ru": "ПОКОРИТЕЛЬ БАЙКАЛА & RDRC • 8.948 СЕК",
      "en": "BAIKAL ICE & RDRC FIGHTER • 8.948 SEC"
    },
    "hp": "—",
    "quarterMile": "—",
    "topSpeed": "—",
    "badge": {
      "ru": "Tony Stark 1400+ HP",
      "en": "Tony Stark 1400+ HP"
    },
    "img": "assets/cars/gtt_classified_car.svg",
    "fallbackImg": "assets/cars/gtt_classified_car.svg",
    "isPhoto": false,
    "objectPosition": "center center",
    "videoSrc": "",
    "videoTitle": "Audi R8 V10 Twin Turbo Tony Stark — боевой заезд",
    "desc": {
      "ru": "Боевая Audi R8 V10 Twin Turbo под эгидой ЦМРБанк и GTT на треке RDRC. Официальное время 8.948 сек со скоростью 247.68 км/ч на Record Days 2023 и 287.19 км/ч на 1/2 мили.",
      "en": "Race Audi R8 V10 Twin Turbo backed by CMRBank and GTT on the RDRC strip. Record Days 2023 8.948 sec pass at 247.68 km/h."
    },
    "specs": {
      "engine": "5.2L FSI V10 Twin Turbo Mid-Engine",
      "turbos": "Mirror Twin Turbo Kit with Air-to-Water Intercooling",
      "cooling": "CSF Triple Billet Heat Exchangers",
      "ecu": "Syvecs S12 Standalone Motorsport Setup"
    },
    "is_featured": 0,
    "isFeatured": false,
    "isClassified": true,
    "isTeaser": true
  }
];

// Full Bilingual Dictionary (Russian & English)
const i18n = {
  ru: {
    nav_garage: "Гараж проектов",
    nav_founder: "О Гоше",
    nav_records: "Рекорды RDRC",
    nav_team: "Команда GTT",
    nav_moto: "Moto Division",
    nav_gallery: "Жизнь ателье",
    nav_partners: "Партнеры",
    nav_contact: "Связь",
    nav_telegram: "Telegram Канал",
    preloader_tag: "Инженерия Скорости & Мощности • Москва",
    hero_tag: "GoshaTurboTech • Try to catch up",
    hero_title: `Инженерия <br><span class="gradient-text">запредельной</span> <br>скорости`,
    hero_desc: "Инжиниринг и тюнинг Гоши Перцхелия (GoshaTurboTech). Рекордсмены соревнований по дрэг-рейсингу и ледовых трасс Байкала. Постройка, форсировка и калибровка суперкаров BMW M, Nissan GT-R, Audi, Porsche и супербайков.",
    unit_sec: "сек",
    unit_kmh: "км/ч",
    unit_hp: "л.с.",
    telemetry_gtr: "1/4 мили (Nissan GT-R Moses)",
    telemetry_record: "Рекорд Европы (1/2 мили)",
    telemetry_output: "Предельная отдача автомобиля",
    hero_btn_explore: "Исследовать проекты GTT",
    hero_btn_video: "<span>▶</span> Видео заезда HURACAN TWIN TURBO «ЗЕЛЕНКА» GTT",
    garage_tag: "// SHOWROOM & MOTORSPORT BUILDS",
    garage_title: "Легендарные проекты GTT",
    garage_subtitle: "Каждый автомобиль собран вручную в ателье GoshaTurboTech с персональной калибровкой блоков управления и двойного турбонаддува.",
    filter_all: "Все проекты (35)",
    filter_other: "Эксклюзив &amp; Маслкары (8)",
    spec_power: "Мощность",
    spec_402: "1/4 мили",
    spec_speed: "Скорость",
    btn_passport: "Инженерный паспорт GTT",
    gallery_drag_hint: "Листайте тачпадом, мышью или стрелками",
    discuss_tg: "Обсудить проект в Telegram GTT",
    partners_show_all: "Все партнеры (28)",
    partners_collapse: "Свернуть",
    contact_social_title: "Соцсети ателье",
    contact_social_desc: "Мы на связи в мессенджерах для обсуждения Stage-пакетов, Twin Turbo систем и обслуживания вашей техники.",
    mobile_bar_tg: "Telegram GTT",
    mobile_bar_navi: "Навигатор",
    mobile_bar_call: "Позвонить",
    contact_tag: "// HEADQUARTERS & ATELIER",
    contact_hq_title: "GOSHATURBOTECH",
    contact_hq_desc: "Центр спортивного инжиниринга и персональной доработки суперкаров и супербайков. Предварительный осмотр, диностенд и онлайн-согласование проектов.",
    contact_phone_lbl: "Телефон мастерской",
    contact_tg_lbl: "Официальный Telegram канал",
    contact_loc_lbl: "Локация ателье",
    contact_loc_val: "Можайское ш., стр. 166В (Новоивановское)",
    contact_btn_call: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg> <span>Позвонить в GTT</span>',
    contact_btn_navi: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg> <span>Яндекс Навигатор</span>',
    partners_tag: "// GTT TECHNICAL & MOTORSPORT PARTNERS",
    partners_title: "Партнеры",
    partners_subtitle: "Ведущие мировые бренды автоспорта, компонентов трансмиссии, турбонаддува и смазочных материалов, с которыми побеждает GoshaTurboTech.",
    // Records
    records_tag: "// HALL OF FAME",
    records_title: "Мировые рекорды и победы RDRC",
    records_subtitle: "Более 15 лет непрерывных побед на дистанциях 402 м, 804 м, 1000 м и ледовых трассах.",
    rec1_badge: "2022 • Мировой рекорд",
    rec1_title: "Быстрейший Porsche 992 на заводских турбинах",
    rec1_telemetry: "1/4 мили: 9.252 сек • 231.80 км/ч",
    rec1_text: "Официально подтвержденный рекорд RDRC для кузова 992 со стандартным блоком цилиндров, заводскими турбинами и коробкой PDK.",
    rec2_badge: "2022 • Абсолютный рекорд льда",
    rec2_title: "Дни скорости на льду озера Байкал",
    rec2_telemetry: "1 км с места на льду: 124 км/ч средняя скорость",
    rec2_text: "Подготовленный совместно с Kiwamaru болид стал абсолютным триумфатором ледовых гонок за всю историю российского автоспорта.",
    rec3_badge: "2021 • Мировой ориентир",
    rec3_title: "Триумф на фестивале Unlim Fest",
    rec3_telemetry: "1/4 мили: 9.303 сек • 235.83 км/ч",
    rec3_text: "Пилот Сергей Никитин установил рекорд соревнований, подтвердив статус Stage 2 от GTT как эталона точности настройки.",
    rec4_badge: "2019 • Рекорд России SMP RDRC",
    rec4_title: "Чемпионат SMP RDRC FSL",
    rec4_telemetry: "1/2 мили: 13.435 сек • 334.41 км/ч",
    rec4_text: "Николай Коржов на легендарном GT-R занял 2-е место в абсолютном зачете Чемпионата SMP RDRC в классе FSL.",
    rec5_badge: "2017 • Рекорд Европы",
    rec5_title: "Race 1000 Германия",
    rec5_telemetry: "1/2 мили (804 м): 353 км/ч",
    rec5_text: "Европейский рекорд скорости на 804 метра среди полноприводных суперкаров, построенных для дорог общего пользования.",
    rec6_badge: "2014 • Рекорд Европы",
    rec6_title: "UNLIM 500+ Greece (Остров Крит)",
    rec6_telemetry: "1/4 мили: 7.810 сек • 287.65 км/ч",
    rec6_text: "Европейский рекорд времени и 3-й результат в мире на тот момент. Мощность более 1800 л.с. на топливе VP Racing.",
    // Founder
    founder_caption: "Гоша на дрэг-стрипе RDRC",
    founder_caption_0: "Гоша на дрэг-стрипе RDRC",
    founder_caption_1: "Гоша Перцхелия — Основатель GTT",
    founder_caption_2: "Контроль боевого выезда на клей",
    founder_tagline: "Основатель & Главный идеолог GTT",
    founder_manifesto: "// THE FOUNDER & PHILOSOPHY",
    founder_name: "Гоша Перцхелия",
    founder_quote: "«Настоящий тюнинг — это не просто прикрутить турбину большего размера. Это искусство собрать сложнейший механизм так, чтобы он разгонялся до 350 км/ч на треке, а затем с абсолютным комфортом вез вас домой по вечернему городу».",
    founder_bio: "За 15+ лет увлечения предельной скоростью Гоша Перцхелия прошел путь от первых кастомных турбо-проектов до постройки сложнейших гиперкаров и дрэгстеров, признанных мировым сообществом энтузиастов. Он лично курирует инженерные разработки, калибрует электронные блоки управления и тестирует болиды на главных треках и дрэг-стрипах RDRC.",
    founder_stat1: "Лет в автоспорте",
    founder_stat2: "Мировых & Евро рекордов",
    founder_stat3: "Кастомный инжиниринг",
    sig_name: "G. Pertskheliya",
    sig_badge: "Личная подпись основателя GTT",
    sig_replay: "Повторить росчерк",
    founder_achieve_tag: "// КЛЮЧЕВЫЕ ВЕХИ И ИНЖЕНЕРНЫЕ ЗАСЛУГИ",
    achieve1_title: "Абсолютные рекорды RDRC",
    achieve1_desc: "Многократные абсолютные чемпионы России в классе 1/4 мили (7.1 сек)",
    achieve2_title: "3000+ HP Pro-Mod «Draco»",
    achieve2_desc: "Постройка быстрейшего кастомного дрэгстера в СНГ на VR38 Billet",
    achieve3_title: "Европейский триумф на Unlim 500+",
    achieve3_desc: "Nissan GT-R Moses 7.810 сек на Крите и 353 км/ч Huracan в Германии",
    achieve4_title: "Собственная разработка Twin Turbo",
    achieve4_desc: "Авторские киты с титановым выхлопом для Lambo Huracan, R8, BMW M и 911",
    // Team (15 Members)
    team_badge: "ATELIER CREW // 35+ СПЕЦИАЛИСТОВ",
    team_tag: "// RACING CREW & PILOTS",
    team_title: "Команда инженеров GoshaTurboTech",
    team_subtitle: "Люди, которые куют рекорды на дрэг-стрипе RDRC и в стенах ателье: 35+ мотористов, телеметристов, диагностов, мастеров шасси и пилотов.",
    team_pill_all: "Все специалисты (35+)",
    team_pill_mgmt: "Руководство &amp; Тюнинг",
    team_pill_eng: "Инженеры &amp; Мотористы",
    team_pill_mech: "Механики цеха",
    team_pill_fab: "Сварка &amp; Фабрикация",
    team_stat_label: "Специалистов цеха и гонок",
    team_summary_desc: "Собственный сборочный цех, аргонная фабрикация выхлопных трасс из титана и инконеля, настройка и калибровка ЭБУ MoTeC и Syvecs, а также выездная гоночная команда паддока RDRC.",
    team_role_1: "Основатель",
    team_name_1: "Гоша",
    team_role_2: "Технический директор",
    team_name_2: "Эдик",
    team_role_3: "Администратор",
    team_name_3: "Дмитрий",
    team_role_4: "Делопроизводитель",
    team_name_4: "Мария",
    team_role_5: "Делопроизводитель",
    team_name_5: "Павел",
    team_role_6: "Инженер-электрик",
    team_name_6: "Георгий",
    team_role_7: "Моторист",
    team_name_7: "Рустам",
    team_role_8: "Механик",
    team_name_8: "Никита",
    team_role_9: "Механик",
    team_name_9: "Иван",
    team_role_10: "Механик",
    team_name_10: "Алексей",
    team_role_11: "Механик",
    team_name_11: "Фазик",
    team_role_12: "Механик",
    team_name_12: "Степан",
    team_role_13: "Механик",
    team_name_13: "Алексей",
    team_role_14: "Сварщик-фабрикатор",
    team_name_14: "Роман",
    team_role_15: "Диагност",
    team_name_15: "Евгений",
    // Moto
    moto_badge: "NEW DIVISION 2025",
    moto_title: "GTT Moto Division",
    moto_subtitle: "Сверхмощный инжиниринг теперь на двух колесах: личные супербайки Гоши, трековые болиды и титановые выхлопные системы.",
    moto_hero_badge: "GTT MOTO FLEET // 200+ HP",
    moto_hero_desc: "Личный боевой супербайк Гоши BMW M1000RR M-Performance. Полный цикл спортивной калибровки ECU, снятие заводских лимитов, титановые выхлопные трассы ручной сварки и сухой автоклавный карбон.",
    moto_spec_1: "212 л.с. при 14 500 об/мин • Сухой вес 168 кг",
    moto_spec_2: "Титановый выпуск Akrapovic Full System с отстрелами огнем",
    moto_spec_3: "M-Winglets карбоновые крылья с прижимной силой 16.3 кг",
    moto_banner_badge: "Личный супербайк Гоши BMW M1000RR & Флот GTT",
    moto_banner_title: "Страсть к двум колесам",
    moto_banner_text: "BMW M1000RR M-Performance, Yamaha R1M Carbon, Ducati Panigale V4. Полный спектр калибровок блоков управления, сухого карбона, выхлопа из титана и снятия лимитов оборотов.",
    moto_bullet_1: "Калибровка электронного дросселя и квикшифтера без задержек",
    moto_bullet_2: "Кастомный титановый выпуск GTT Moto с огненными отстрелами",
    moto_bullet_3: "Индивидуальные прошивки под 100 RON и гоночное топливо",
    moto_card1_title: "Трековая калибровка ECU",
    moto_card1_desc: "Индивидуальная настройка блоков управления для BMW S1000RR, Ducati Panigale V4, Yamaha R1. Снятие заводских ограничителей, квикшифтер, автоблип и контроль тяги.",
    moto_card1_b1: "Индивидуальные топливные карты под 100 RON",
    moto_card1_b2: "Оптимизация Wheelie & Launch Control",
    moto_card1_b3: "Калибровка электронного дросселя без задержек",
    moto_card2_title: "Титановый выпуск GTT Moto",
    moto_card2_desc: "Ручная аргоновая сварка титана и инконеля для мотоциклов. Экстремальное снижение веса, породистый акустический звук и прибавка крутящего момента во всем диапазоне.",
    moto_card2_b1: "Ультралегкие коллекторы из сплава Titan-Gr5",
    moto_card2_b2: "Кастомная фрезеровка насадок",
    moto_card2_b3: "Огненные отстрелы и сочный басовитый тон",
    moto_card3_title: "Bespoke кастомизация",
    moto_card3_desc: "Полный цикл доработки премиальной мототехники: кованые сверхлегкие диски, сухое сцепление, карбоновое оперение и комплексное предсезонное ТО.",
    moto_card3_b1: "Сухой автоклавный карбон 3K/12K",
    moto_card3_b2: "Тормозные системы Brembo Racing / GP4",
    moto_card3_b3: "Индивидуальный дизайн и покраска",
    // Gallery captions
    gallery_tag: "// RDRC CHAMPIONSHIP & PADDOCK LIFE",
    gallery_title: "Хроника гонок & Мастерская GTT",
    gallery_subtitle: "Живые кадры с трассы Чемпионата России RDRC и из ателье GoshaTurboTech.",
    gallery_cap_zelenka: "Легендарная Lamborghini Huracan TT «Зеленка» RDRC",
    gallery_cap_dodge: "Dodge Demon: дымный прогрев сликов на закате RDRC",
    gallery_cap_draco: "3000+ HP Nissan GT-R Draco Pro-Mod на сликах RDRC",
    gallery_cap_r8: "Audi R8 V10 Plus TT «Rokot» на стартовой черте RDRC",
    gallery_cap_gtr_red: "Красный хромированный Nissan GT-R R35 GTT Pro-Mod",
    gallery_cap_gtr_blue: "Боевой синий Nissan GT-R R35 #888 на закате RDRC",
    gallery_cap_box: "Бокс GTT: Паддок команды и Nissan GT-R",
    gallery_cap_track: "Гоша Перцхелия контролирует подготовку трассы RDRC",
    // Contact & Footer Legal
    contact_email_lbl: "Электронная почта",
    footer_copy: "© GOSHATURBOTECH. TRY TO CATCH UP.",
    footer_privacy: "Политика обработки персональных данных",
    footer_offer: "Публичная оферта",
    footer_requisites: "Реквизиты организации",
    footer_disclaimer: "Информация на сайте не является публичной офертой (ст. 437 ГК РФ)",
    mobile_bar_tg: "Telegram",
    mobile_bar_navi: "Навигатор",
    mobile_bar_call: "Позвонить"
  },
  en: {
    nav_garage: "Garage Builds",
    nav_founder: "About Gosha",
    nav_records: "RDRC Records",
    nav_team: "GTT Crew",
    nav_moto: "Moto Division",
    nav_gallery: "Motorsport Life",
    nav_partners: "Partners",
    nav_contact: "Contact",
    nav_telegram: "Telegram Channel",
    preloader_tag: "Speed & Power Engineering • Moscow",
    hero_tag: "GoshaTurboTech • Try to catch up",
    hero_title: `Engineering of <br><span class="gradient-text">ultimate</span> <br>velocity`,
    hero_desc: "Engineering and tuning atelier by Gosha Pertskheliya (GoshaTurboTech). Drag racing champions and Lake Baikal ice record holders. High-performance engineering for BMW M, Nissan GT-R, Audi, Porsche and superbikes.",
    unit_sec: "sec",
    unit_kmh: "km/h",
    unit_hp: "HP",
    telemetry_gtr: "1/4 Mile (Nissan GT-R Moses)",
    telemetry_record: "European Record (1/2 Mile)",
    telemetry_output: "Maximum Output (Supercar)",
    hero_btn_explore: "Explore GTT Projects",
    hero_btn_video: "<span>▶</span> Race Video: HURACAN TWIN TURBO «ZELENKA» GTT",
    garage_tag: "// SHOWROOM & MOTORSPORT BUILDS",
    garage_title: "Legendary GTT Projects",
    garage_subtitle: "Hand-built in the GoshaTurboTech atelier with bespoke ECU calibration and twin turbo engineering.",
    filter_all: "All Projects (35)",
    filter_other: "Exclusive &amp; Muscle (8)",
    spec_power: "Output",
    spec_402: "1/4 Mile",
    spec_speed: "Top Speed",
    btn_passport: "GTT Engineering Passport",
    gallery_drag_hint: "Swipe with trackpad or drag with mouse",
    discuss_tg: "Discuss Project on Telegram GTT",
    partners_show_all: "All Partners (28)",
    partners_collapse: "Collapse",
    contact_social_title: "Atelier Social Networks",
    contact_social_desc: "We are available on messaging platforms to discuss Stage packages, Twin Turbo setups, and supercar maintenance.",
    mobile_bar_tg: "Telegram GTT",
    mobile_bar_navi: "Navigator",
    mobile_bar_call: "Call Atelier",
    contact_tag: "// HEADQUARTERS & ATELIER",
    contact_hq_title: "GOSHATURBOTECH",
    contact_hq_desc: "Motorsport engineering center and bespoke performance atelier for supercars and superbikes. Pre-tuning inspection, dyno hub and online project advisory.",
    contact_phone_lbl: "Workshop Direct Line",
    contact_tg_lbl: "Official Telegram Channel",
    contact_loc_lbl: "Atelier Location",
    contact_loc_val: "166B Mozhayskoye Hwy (Novoivanovskoye)",
    contact_btn_call: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg> <span>Call GTT Workshop</span>',
    contact_btn_navi: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg> <span>Yandex Navigator</span>',
    partners_tag: "// GTT TECHNICAL & MOTORSPORT PARTNERS",
    partners_title: "Partners",
    partners_subtitle: "World-leading motorsport brands, transmission components, turbochargers and racing lubricants powering GoshaTurboTech victories.",
    // Records
    records_tag: "// HALL OF FAME",
    records_title: "World Records & RDRC Victories",
    records_subtitle: "Over 15 years of uninterrupted victories across 1/4 mile, 1/2 mile, 1000m and ice tracks.",
    rec1_badge: "2022 • World Record",
    rec1_title: "Fastest Porsche 992 on Stock Turbochargers",
    rec1_telemetry: "1/4 Mile: 9.252 sec • 231.80 km/h",
    rec1_text: "Officially certified RDRC record for the 992 chassis with stock engine block, factory turbochargers and OEM PDK transmission.",
    rec2_badge: "2022 • Absolute Ice Record",
    rec2_title: "Days of Speed on Lake Baikal Ice",
    rec2_telemetry: "1 km from standstill on ice: 124 km/h average speed",
    rec2_text: "Engineered in collaboration with Kiwamaru, becoming the absolute champion of ice speed records in Russian motorsport history.",
    rec3_badge: "2021 • Global Benchmark",
    rec3_title: "Triumph at Unlim Fest",
    rec3_telemetry: "1/4 Mile: 9.303 sec • 235.83 km/h",
    rec3_text: "Pilot Sergey Nikitin set the event record, establishing GTT Stage 2 as the gold standard of precision calibration.",
    rec4_badge: "2019 • Russian Record SMP RDRC",
    rec4_title: "SMP RDRC FSL Championship",
    rec4_telemetry: "1/2 Mile: 13.435 sec • 334.41 km/h",
    rec4_text: "Nikolay Korzhov in the legendary GT-R took 2nd place overall in the SMP RDRC FSL Championship standings.",
    rec5_badge: "2017 • European Record",
    rec5_title: "Race 1000 Germany",
    rec5_telemetry: "1/2 Mile (804 m): 353 km/h",
    rec5_text: "European standing 804-meter speed record among street-legal all-wheel-drive supercars.",
    rec6_badge: "2014 • European Record",
    rec6_title: "UNLIM 500+ Greece (Crete Island)",
    rec6_telemetry: "1/4 Mile: 7.810 sec • 287.65 km/h",
    rec6_text: "European record time and 3rd fastest in the world at the time. Over 1,800 HP output on VP Racing fuel.",
    // Founder
    founder_caption: "Gosha on the RDRC Drag Strip",
    founder_caption_0: "Gosha on the RDRC Drag Strip",
    founder_caption_1: "Gosha Pertskheliya — GTT Founder",
    founder_caption_2: "Track VHT Glue Launch Prep",
    founder_tagline: "Founder & Chief Visionary of GTT",
    founder_manifesto: "// THE FOUNDER & PHILOSOPHY",
    founder_name: "Gosha Pertskheliya",
    founder_quote: "“True tuning is never just about bolting on a larger turbocharger. It is the fine art of crafting a sophisticated machine that accelerates to 350 km/h on the track, yet drives you home in total comfort through city streets.”",
    founder_bio: "Over 15+ years of chasing ultimate velocity, Gosha Pertskheliya evolved from custom turbo prototypes to building bespoke world-record hypercars recognized globally. He personally oversees powertrain engineering, calibrates ECUs and tests builds on leading dragstrips and RDRC championships.",
    founder_stat1: "Years in Motorsport",
    founder_stat2: "World & Euro Records",
    founder_stat3: "Custom Engineering",
    sig_name: "G. Pertskheliya",
    sig_badge: "Verified GTT Founder Signature",
    sig_replay: "Replay Stroke",
    founder_achieve_tag: "// KEY MILESTONES & ENGINEERING ACCOLADES",
    achieve1_title: "Absolute RDRC National Records",
    achieve1_desc: "Multiple all-time Russian national champions in 1/4-mile drag racing (7.1 sec)",
    achieve2_title: "3,000+ HP Pro-Mod «Draco»",
    achieve2_desc: "Crafted the fastest custom tube-chassis drag weapon in CIS on VR38 Billet",
    achieve3_title: "European Glory at Unlim 500+",
    achieve3_desc: "Nissan GT-R Moses 7.810s in Crete and 353 km/h Huracan in Germany",
    achieve4_title: "Proprietary Twin Turbo Kits",
    achieve4_desc: "In-house titanium exhaust & TT packages for Huracan, R8, BMW M & 911",
    // Team (15 Members)
    team_badge: "ATELIER CREW // 35+ SPECIALISTS",
    team_tag: "// RACING CREW & PILOTS",
    team_title: "GoshaTurboTech Engineering Crew",
    team_subtitle: "The specialists forging records on the RDRC drag strip and inside the skunkworks: 35+ engine builders, telemetrists, mechanics and pilots.",
    team_pill_all: "All Specialists (35+)",
    team_pill_mgmt: "Management &amp; Tuning",
    team_pill_eng: "Engineers &amp; Engine Builders",
    team_pill_mech: "Workshop Mechanics",
    team_pill_fab: "Fabrication &amp; Welding",
    team_stat_label: "Specialists in Workshop & Racing",
    team_summary_desc: "In-house assembly bays, titanium and Inconel TIG fabrication, MoTeC and Syvecs ECU calibration facility, plus the traveling RDRC trackside race crew.",
    team_role_1: "Founder",
    team_name_1: "Gosha",
    team_role_2: "Technical Director",
    team_name_2: "Edik",
    team_role_3: "Administrator",
    team_name_3: "Dmitriy",
    team_role_4: "Records Manager",
    team_name_4: "Mariya",
    team_role_5: "Records Manager",
    team_name_5: "Pavel",
    team_role_6: "Electrical Engineer",
    team_name_6: "Georgy",
    team_role_7: "Engine Builder",
    team_name_7: "Rustam",
    team_role_8: "Race Mechanic",
    team_name_8: "Nikita",
    team_role_9: "Race Mechanic",
    team_name_9: "Ivan",
    team_role_10: "Race Mechanic",
    team_name_10: "Aleksey",
    team_role_11: "Race Mechanic",
    team_name_11: "Fazik",
    team_role_12: "Race Mechanic",
    team_name_12: "Stepan",
    team_role_13: "Race Mechanic",
    team_name_13: "Aleksey",
    team_role_14: "Welder & Fabricator",
    team_name_14: "Roman",
    team_role_15: "Diagnostics Engineer",
    team_name_15: "Evgeniy",
    // Moto
    moto_badge: "NEW DIVISION 2025",
    moto_title: "GTT Moto Division",
    moto_subtitle: "Extreme engineering now unleashed on two wheels: Gosha's personal superbikes, track weapons, and bespoke titanium exhaust systems.",
    moto_hero_badge: "GTT MOTO FLEET // 200+ HP",
    moto_hero_desc: "Gosha's personal race-prepped BMW M1000RR M-Performance superbike. Complete motorsport ECU calibrations, factory rev limiter removal, custom handcrafted titanium exhaust, and autoclave dry carbon fiber.",
    moto_spec_1: "212 HP @ 14,500 RPM • Dry Weight 168 kg",
    moto_spec_2: "Akrapovic Full System Titanium Exhaust with flame backfires",
    moto_spec_3: "M-Winglets carbon aerodynamic wings with 16.3 kg downforce",
    moto_banner_badge: "Gosha's Personal BMW M1000RR & GTT Fleet",
    moto_banner_title: "Passion for Two Wheels",
    moto_banner_text: "BMW M1000RR M-Performance, Yamaha R1M Carbon, Ducati Panigale V4. Complete ECU calibrations, autoclave carbon fiber, custom titanium exhausts and rev-limiter removal.",
    moto_bullet_1: "Instant throttle calibration and lag-free quickshifter tuning",
    moto_bullet_2: "Custom GTT Moto titanium exhaust with violent flame sputters",
    moto_bullet_3: "Tailored maps for 100 RON and high-octane race fuels",
    moto_card1_title: "Track ECU Calibration",
    moto_card1_desc: "Custom ECU calibrations for BMW S1000RR, Ducati Panigale V4, Yamaha R1. Factory limiter removal, quickshifter, autoblipper and traction control tuning.",
    moto_card1_b1: "Custom fuel maps for 100 RON & race gas",
    moto_card1_b2: "Wheelie & Launch Control optimization",
    moto_card1_b3: "Zero-latency ride-by-wire throttle mapping",
    moto_card2_title: "GTT Moto Titanium Exhaust",
    moto_card2_desc: "Handcrafted argon-welded titanium and Inconel systems for superbikes. Drastic weight reduction, deep acoustic tone, and torque gains across the entire rev band.",
    moto_card2_b1: "Ultralight headers crafted from Titan-Gr5 alloy",
    moto_card2_b2: "Bespoke CNC-milled tips",
    moto_card2_b3: "Crisp flame backfires and rich bass tone",
    moto_card3_title: "Bespoke Customization",
    moto_card3_desc: "Full bespoke engineering for flagship motorcycles: forged ultralight wheels, dry clutch conversions, carbon bodywork, and comprehensive pre-season service.",
    moto_card3_b1: "Autoclave dry carbon fiber 3K/12K",
    moto_card3_b2: "Brembo Racing / GP4 brake systems",
    moto_card3_b3: "Individual aerodynamic design and livery",
    // Gallery captions
    gallery_tag: "// RDRC CHAMPIONSHIP & PADDOCK LIFE",
    gallery_title: "Motorsport Chronicle & GTT Workshop",
    gallery_subtitle: "Raw action footage from the Russian Drag Racing Championship and inside the GoshaTurboTech skunkworks.",
    gallery_cap_zelenka: "Legendary Lamborghini Huracan TT «Zelenka» RDRC",
    gallery_cap_dodge: "Dodge Demon: Smoky Burnout at Sunset RDRC",
    gallery_cap_draco: "3,000+ HP Nissan GT-R Draco Pro-Mod on RDRC Slicks",
    gallery_cap_r8: "Audi R8 V10 Plus TT «Rokot» on the RDRC Starting Line",
    gallery_cap_gtr_red: "Red Chrome Nissan GT-R R35 GTT Pro-Mod",
    gallery_cap_gtr_blue: "GTT Race Midnight Blue Nissan GT-R R35 #888 at RDRC",
    gallery_cap_box: "GTT Garage Pit: Team Paddock & Nissan GT-R",
    gallery_cap_track: "Georgy Pertskheliya Supervising RDRC Track Glue Preparation",
    // Contact & Footer Legal
    contact_email_lbl: "Email Address",
    footer_copy: "© GOSHATURBOTECH. TRY TO CATCH UP.",
    footer_privacy: "Privacy Policy & Data Processing",
    footer_offer: "Public Offer",
    footer_requisites: "Company Details & Requisites",
    footer_disclaimer: "The information on this website is for reference only and does not constitute a public offer (Art. 437 Civil Code of the RF)",
    mobile_bar_tg: "Telegram",
    mobile_bar_navi: "Navigator",
    mobile_bar_call: "Call Workshop"
  }
};

let currentLang = 'ru';

window.setLanguage = function(lang) {
  if (lang !== 'ru' && lang !== 'en') return;
  currentLang = lang;

  document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.getElementById(lang === 'ru' ? 'langRu' : 'langEn');
  if (activeBtn) activeBtn.classList.add('active');

  // Update DOM elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (i18n[lang] && i18n[lang][key]) {
      el.innerHTML = i18n[lang][key];
    }
  });

  if (typeof applyCustomHeroTelemetry === 'function') {
    applyCustomHeroTelemetry();
  }

  // Update founder photo caption according to new language
  if (typeof updateFounderPhoto === 'function') {
    updateFounderPhoto();
  }

  // Update gallery cards titles and tags
  if (typeof updateGalleryTranslations === 'function') {
    updateGalleryTranslations();
  }

  // Re-render garage grid with translated spec labels
  const activeFilter = document.querySelector('.filter-pill.active')?.getAttribute('data-filter') || 'all';
  renderGarageGrid(activeFilter);
  if (typeof updateFilterPillsCounts === 'function') {
    updateFilterPillsCounts();
  }
  if (cachedTeamData) {
    renderTeamGrid(cachedTeamData);
  } else {
    updateTeamVisibility();
  }
  if (cachedRecordsData && typeof renderRecordsEditorial === 'function') {
    renderRecordsEditorial(cachedRecordsData);
  }
  if (typeof renderPartnersGrid === 'function') {
    renderPartnersGrid(cachedPartnersData || defaultPartnersList);
  }
};

// Ensure browser starts at top and disables scroll restoration
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

// Document Ready Initialization
document.addEventListener('DOMContentLoaded', () => {
  window.scrollTo(0, 0);
  initPreloader();
  renderGarageGrid('all');
  updateFilterPillsCounts();
  syncProjectsFromAPI();
  syncTeamFromAPI();
  syncGalleryFromAPI();
  syncRecordsFromAPI();
  syncPartnersFromAPI();
  syncMotoFromAPI();
  initNavigation();
  initFilters();
  initModal();
  initSpecialEffects();
  updateFounderPhoto();
  updateGalleryTranslations();
  initGalleryMarqueeInteractions();
  initFounderGestures();
  initRecordsCarousel();
  initMobileStickyBar();
  initBackToTopButton();
  initTelemetryCounters();
});

// Dynamic SQLite & LocalStorage Synchronization for Cars
async function syncProjectsFromAPI() {
  // 1. Instant render from local cache
  try {
    const local = localStorage.getItem('gtt_admin_cars_db') || localStorage.getItem('gtt_projects_v2');
    if (local) {
      const parsed = JSON.parse(local);
      if (Array.isArray(parsed) && parsed.length > 0) {
        applyCarsData(parsed);
      }
    }
  } catch (e) {}

  // 2. Fetch live data from SQLite backend
  try {
    const res = await fetch('/api/cars');
    if (!res.ok) return;
    const serverCars = await res.json();
    if (Array.isArray(serverCars) && serverCars.length > 0) {
      localStorage.setItem('gtt_admin_cars_db', JSON.stringify(serverCars));
      localStorage.setItem('gtt_projects_v2', JSON.stringify(serverCars));
      applyCarsData(serverCars);
    }
  } catch (err) {
    // Offline or static fallback
  }
}

function sanitizeCarRecord(c) {
  if (!c || typeof c !== 'object') return c;
  const rawName = String(c.name_ru || c.nameRu || (c.name && (c.name.ru || c.name.en)) || c.id || '').toUpperCase();

  // 1. Repair Volga KGB records (including user-created slot gtt_car_1793314607236)
  const isVolga = c.id === 'volga_kgb' || c.id === 'gtt_car_1793314607236' || rawName.includes('ВОЛГА') || rawName.includes('VOLGA');
  if (isVolga) {
    if (!c.img || c.img.includes('gtr-min.png') || c.img.includes('7tuUxJxwl5e8') || c.img.includes('bmw_m5')) {
      c.img = 'assets/cars/volga_kgb_v8_workshop.jpg';
    }
    c.fallbackImg = 'assets/cars/volga_kgb_v8_workshop.jpg';
    if (!c.hp || c.hp === '-' || c.hp === '- HP' || c.hp === '—') c.hp = '1,050+ HP';
    if (!c.quarter_mile && !c.quarterMile) c.quarterMile = '9.420 сек';
    if (!c.top_speed && !c.topSpeed) c.topSpeed = '340+ км/ч';
    if (c.name && typeof c.name === 'object') {
      if (c.name.ru === 'ВОЛГА КГБНА' || c.name.ru === 'Волга КГБна') c.name.ru = 'ВОЛГА КГБ';
      if (!c.name.en) c.name.en = 'VOLGA GAZ-24 KGB V8 GTT SLEEPER';
    }
  }

  // 2. Clear broken phantom paths (e.g. assets/cars/7tuUx...)
  if (c.img && typeof c.img === 'string' && c.img.startsWith('assets/cars/') && c.img.includes('7tuUxJxwl5e8')) {
    c.img = 'assets/cars/volga_kgb_v8_workshop.jpg';
  }

  // 3. Clear placeholder dashes on any car ONLY if not classified
  const isClassifiedCar = Boolean(c.isClassified || c.is_classified || c.isTeaser || (c.img && (c.img.includes('classified') || c.img.endsWith('.svg'))));
  if (!isClassifiedCar) {
    if (c.hp === '-' || c.hp === '- HP') c.hp = '1,050+ HP';
    if (c.quarterMile === '-' || c.quarterMile === '- сек') c.quarterMile = '9.420 сек';
    if (c.topSpeed === '-' || c.topSpeed === '- км/ч') c.topSpeed = '340+ км/ч';
  }

  return c;
}

function applyCarsData(carList) {
  const cleanList = Array.isArray(carList) ? carList.filter(c => c && c.id) : [];
  const listToUse = (cleanList.length > 0 ? cleanList : carList).map(sanitizeCarRecord);

  // Sort so featured cars come first if sort_order isn't doing so
  listToUse.sort((a, b) => {
    const aOrder = (a.sort_order !== undefined && a.sort_order !== null) ? a.sort_order : ((a.sortOrder !== undefined && a.sortOrder !== null) ? a.sortOrder : 9999);
    const bOrder = (b.sort_order !== undefined && b.sort_order !== null) ? b.sort_order : ((b.sortOrder !== undefined && b.sortOrder !== null) ? b.sortOrder : 9999);
    if (aOrder !== bOrder) return aOrder - bOrder;
    const aFeat = (a.is_featured === 1 || a.is_featured === true || a.is_featured === '1' || a.isFeatured === true) ? 1 : 0;
    const bFeat = (b.is_featured === 1 || b.is_featured === true || b.is_featured === '1' || b.isFeatured === true) ? 1 : 0;
    return bFeat - aFeat;
  });

  const featuredCarsSet = new Set(listToUse.filter(c => c.is_featured === 1 || c.is_featured === true || c.is_featured === '1' || c.isFeatured === true).map(c => c.id));
  if (featuredCarsSet.size === 0) {
    listToUse.slice(0, 4).forEach(c => featuredCarsSet.add(c.id));
  }

  const originalCarIds = new Set([
    'gtr_lucifer', 'draco_promod', 'r8_rokot', 'gtr_kurdalagon',
    'bezzubik', 'moses', 'zelenka', 'tonystark', 'dodge_srt',
    'gtr_blue_888', 'gtr_red', 'bmw_m5'
  ]);

  gttProjects = listToUse.map(c => {
    const isFeat = featuredCarsSet.has(c.id);
    return {
      id: c.id,
      brand: c.brand || '',
      isFeatured: isFeat,
      is_featured: isFeat ? 1 : 0,
      name: {
        ru: c.name_ru || c.nameRu || (c.name && c.name.ru) || c.name || '',
        en: c.name_en || c.nameEn || (c.name && c.name.en) || c.name_ru || c.nameRu || ''
      },
      type: c.type || 'other',
      tag: {
        ru: c.tag_ru || c.tagRu || (c.tag && c.tag.ru) || c.tag || 'RDRC БОЛИД',
        en: c.tag_en || c.tagEn || (c.tag && c.tag.en) || c.tag || 'RDRC CAR'
      },
      hp: c.hp || '',
      quarterMile: c.quarter_mile || c.quarterMile || '',
      topSpeed: c.top_speed || c.topSpeed || '',
      badge: {
        ru: c.badge_ru || c.badgeRu || (c.badge && c.badge.ru) || c.badge || 'GTT Spec',
        en: c.badge_en || c.badgeEn || (c.badge && c.badge.en) || c.badge || 'GTT Spec'
      },
      img: c.img || '',
      fallbackImg: c.fallback_img || c.fallbackImg || c.img || '',
      isPhoto: (c.is_photo !== undefined ? Boolean(c.is_photo) : true) && !(c.img || '').toLowerCase().includes('.svg'),
      isClassified: Boolean(c.is_classified) || Boolean(c.isClassified) || (c.img || '').includes('classified') || (c.img || '').toLowerCase().endsWith('.svg'),
      objectPosition: c.object_position || c.objectPosition || 'center center',
      videoSrc: isFeat ? (c.video_src || c.videoSrc || '') : '',
      videoTitle: isFeat ? (c.video_title || c.videoTitle || '') : '',
      desc: {
        ru: c.desc_ru || c.descRu || (c.desc && c.desc.ru) || c.desc || '',
        en: c.desc_en || c.descEn || (c.desc && c.desc.en) || c.desc_ru || c.descRu || ''
      },
      specs: (typeof c.specs === 'object' && c.specs !== null) ? c.specs : {},
      isTeaser: c.isTeaser || c.is_teaser || c.hp === '?' || !c.img,
      isNew: false
    };
  });

  const activeFilter = document.querySelector('#carsFilterPills .filter-pill.active')?.getAttribute('data-filter') || 'all';
  renderGarageGrid(activeFilter);
  updateFilterPillsCounts();
}

function updateFilterPillsCounts() {
  if (!Array.isArray(gttProjects)) return;
  const gtrCount = gttProjects.filter(c => c.type === 'gtr').length;
  const porscheCount = gttProjects.filter(c => c.type === 'porsche').length;
  const lamboCount = gttProjects.filter(c => c.type === 'lambo').length;
  const audiCount = gttProjects.filter(c => c.type === 'audi').length;
  const bmwCount = gttProjects.filter(c => c.type === 'bmw').length;
  const otherCount = gttProjects.filter(c => c.type === 'other').length;
  const allCount = gttProjects.length;

  const pillAll = document.querySelector('#carsFilterPills .filter-pill[data-filter="all"]');
  if (pillAll) pillAll.textContent = currentLang === 'ru' ? `Все проекты (${allCount})` : `All Projects (${allCount})`;

  const pillGtr = document.querySelector('#carsFilterPills .filter-pill[data-filter="gtr"]');
  if (pillGtr) pillGtr.textContent = `Nissan GT-R (${gtrCount})`;

  const pillPorsche = document.querySelector('#carsFilterPills .filter-pill[data-filter="porsche"]');
  if (pillPorsche) pillPorsche.textContent = `Porsche GTT (${porscheCount})`;

  const pillLambo = document.querySelector('#carsFilterPills .filter-pill[data-filter="lambo"]');
  if (pillLambo) pillLambo.textContent = `Lamborghini TT (${lamboCount})`;

  const pillAudi = document.querySelector('#carsFilterPills .filter-pill[data-filter="audi"]');
  if (pillAudi) pillAudi.textContent = `Audi R8 TT (${audiCount})`;

  const pillBmw = document.querySelector('#carsFilterPills .filter-pill[data-filter="bmw"]');
  if (pillBmw) pillBmw.textContent = `BMW M-Power (${bmwCount})`;

  const pillOther = document.querySelector('#carsFilterPills .filter-pill[data-filter="other"]');
  if (pillOther) pillOther.textContent = currentLang === 'ru' ? `Эксклюзив & Маслкары (${otherCount})` : `Exclusive & Muscle (${otherCount})`;
}

// Pre-configured official team assets & photos map
const defaultTeamPhotos = {
  m1: { photo: 'assets/archive_tilda/team_gosha.jpg', social: '@goshaturbotech' },
  m2: { photo: 'assets/archive_tilda/team_edik.jpg', social: '@vip.hay' },
  m3: { photo: 'assets/archive_tilda/team_dmitry.jpg', social: '' },
  m4: { photo: 'assets/archive_tilda/team_maria.jpg', social: '@_zm_zima_' },
  m5: { photo: 'assets/archive_tilda/team_pavel.jpg', social: '' },
  m6: { photo: 'assets/archive_tilda/team_georgy.jpg', social: '' },
  m7: { photo: 'assets/archive_tilda/team_rustam.jpg', social: '' },
  m8: { photo: 'assets/archive_tilda/team_nikita.jpg', social: '' },
  m9: { photo: 'assets/archive_tilda/team_ivan.jpg', social: '' },
  m10: { photo: 'assets/archive_tilda/team_alexey_paddock.jpg', social: '' },
  m11: { photo: 'assets/archive_tilda/team_fazik.jpg', social: '' },
  m12: { photo: 'assets/archive_tilda/team_stepan.jpg', social: '' },
  m13: { photo: 'assets/archive_tilda/team_alexey_mech.jpg', social: '' },
  m14: { photo: 'assets/archive_tilda/team_roman.jpg', social: '' },
  m15: { photo: 'assets/archive_tilda/team_evgeny.jpg', social: '' }
};

let cachedTeamData = null;

async function syncTeamFromAPI() {
  // 1. Instant check from admin localStorage
  try {
    const local = localStorage.getItem('gtt_admin_team_db') || localStorage.getItem('gtt_team_v2');
    if (local) {
      const parsed = JSON.parse(local);
      if (Array.isArray(parsed) && parsed.length > 0) {
        cachedTeamData = parsed;
        renderTeamGrid(parsed);
      }
    }
  } catch (e) {}

  // 2. Fetch live data from SQLite backend
  try {
    const res = await fetch('/api/team');
    if (!res.ok) return;
    const serverTeam = await res.json();
    if (Array.isArray(serverTeam) && serverTeam.length > 0) {
      cachedTeamData = serverTeam;
      localStorage.setItem('gtt_admin_team_db', JSON.stringify(serverTeam));
      localStorage.setItem('gtt_team_v2', JSON.stringify(serverTeam));
      renderTeamGrid(serverTeam);
    }
  } catch (err) {
    // Offline / static fallback
  }
}

// Dynamic Gallery Synchronization
async function syncGalleryFromAPI() {
  try {
    const local = localStorage.getItem('gtt_admin_gallery_db');
    if (local) {
      const parsed = JSON.parse(local);
      if (Array.isArray(parsed) && parsed.length > 0) {
        renderGalleryTrack(parsed);
      }
    }
  } catch (e) {}

  try {
    const res = await fetch('/api/gallery');
    if (!res.ok) return;
    const serverGal = await res.json();
    if (Array.isArray(serverGal) && serverGal.length > 0) {
      localStorage.setItem('gtt_admin_gallery_db', JSON.stringify(serverGal));
      renderGalleryTrack(serverGal);
    }
  } catch (err) {}
}

// Technical & Motorsport Partners (28 Authentic GTT Motorsport & Technical Partners)
const defaultPartnersList = [
  { id: 'rog', name: 'Republic of Gamers', category: 'Телеметрия & Софт', desc: 'Телеметрия и даталоггинг для трека и стенда', logo: 'assets/partners/rog.png', link: 'https://rog.asus.com', sort_order: 1, is_active: 1 },
  { id: 'toys_detailing', name: 'Toys Detailing', category: 'Детейлинг & Защита', desc: 'Керамика и полиуретановая защита кузова', logo: 'assets/partners/toys_detailing.png', link: 'https://toysdetailing.ru', sort_order: 2, is_active: 1 },
  { id: 'felix_ferro', name: 'Felix Ferro', category: 'Интерьер & Стиль', desc: 'Эксклюзивные ювелирные ключи и аксессуары', logo: 'assets/partners/felix_ferro.png', link: 'https://felixferro.com', sort_order: 3, is_active: 1 },
  { id: 'vp_racing', name: 'VP Racing Fuels', category: 'Спортивное топливо', desc: 'Гоночный кислородный бензин и чистый метанол M1', logo: 'assets/partners/vp_racing.png', link: 'https://vpracingfuels.com', sort_order: 4, is_active: 1 },
  { id: 'je_pistons', name: 'JE Pistons', category: 'Кованая поршневая', desc: 'Кованые поршни под экстремальный наддув 2000+ HP', logo: 'assets/partners/je_pistons.png', link: 'https://jepistons.com', sort_order: 5, is_active: 1 },
  { id: 'link_ecu', name: 'Link Engine Management', category: 'Спортивные ЭБУ', desc: 'Блоки управления двигателем и даталоггеры', logo: 'assets/partners/link_ecu.png', link: 'https://linkecu.com', sort_order: 6, is_active: 1 },
  { id: 'mainline_dyno', name: 'Mainline DynoLog', category: 'Диностенды до 3000 HP', desc: 'Прецизионные мощностные стенды замера', logo: 'assets/partners/mainline_dyno.png', link: 'https://mainlinedyno.com.au', sort_order: 7, is_active: 1 },
  { id: 'redline_oil', name: 'Red Line Synthetic Oil', category: 'Спортивные масла', desc: 'Трансмиссионные жидкости ShockProof и присадки', logo: 'assets/partners/redline_oil.png', link: 'https://redlineoil.com', sort_order: 8, is_active: 1 },
  { id: 'syvecs', name: 'Syvecs Powertrain Control', category: 'ЭБУ & Контроллеры AWD', desc: 'Гоночные блоки управления ДВС и полным приводом', logo: 'assets/partners/syvecs.png', link: 'https://syvecs.com', sort_order: 9, is_active: 1 },
  { id: 'plazmaman', name: 'Plazmaman Pro Billet', category: 'Впуск & Интеркулеры', desc: 'Фрезерованные коллекторы и кулеры VR38 / V10', logo: 'assets/partners/plazmaman.png', link: 'https://plazmaman.com', sort_order: 10, is_active: 1 },
  { id: 'ppg_gearboxes', name: 'PPG (Pfitzner Gearboxes)', category: 'Кулачковые КПП', desc: 'Усиленные кулачковые и секвентальные ряды передач', logo: 'assets/partners/ppg_gearboxes.png', link: 'https://ppgearbox.com.au', sort_order: 11, is_active: 1 },
  { id: 'ticon_titanium', name: 'Ticon Titanium', category: 'Титановые компоненты', desc: 'Сверхлегкие титановые трубы и отводы выхлопа', logo: 'assets/partners/ticon_titanium.png', link: 'https://ticontitanium.com', sort_order: 12, is_active: 1 },
  { id: 'cobb_tuning', name: 'COBB Tuning', category: 'Accessport & Софт', desc: 'Платформа калибровки и перепрошивки Accessport', logo: 'assets/partners/cobb_tuning.png', link: 'https://cobbtuning.com', sort_order: 13, is_active: 1 },
  { id: 'bell_intercoolers', name: 'Bell Intercoolers', category: 'Теплообменники & Кулеры', desc: 'Высокоэффективные интеркулерные ядра', logo: 'assets/partners/bell_intercoolers.png', link: 'https://bellintercoolers.com', sort_order: 14, is_active: 1 },
  { id: 'armytrix', name: 'Armytrix', category: 'Valvetronic Выхлоп', desc: 'Титановые выхлопные системы с заслонками', logo: 'assets/partners/armytrix.png', link: 'https://armytrix.com', sort_order: 15, is_active: 1 },
  { id: 'ecutek', name: 'Ecutek Technology', category: 'Программное обеспечение', desc: 'Инженерная калибровка заводских блоков ЭБУ', logo: 'assets/partners/ecutek.png', link: 'https://ecutek.com', sort_order: 16, is_active: 1 },
  { id: 'precision_turbo', name: 'Precision Turbo & Engine', category: 'Турбокомпрессоры CEA', desc: 'Гоночные турбины Pro Mod и GEN2 CEA до 3500 л.с.', logo: 'assets/partners/precision_turbo.png', link: 'https://precisionturbo.net', sort_order: 17, is_active: 1 },
  { id: 'motec', name: 'MoTeC Systems', category: 'Электроника M1 & PDM', desc: 'Управляющие процессоры, приборные панели и телеметрия', logo: 'assets/partners/motec.png', link: 'https://motec.com.au', sort_order: 18, is_active: 1 },
  { id: 'motul', name: 'Motul Motorsport', category: 'Моторные масла 300V', desc: 'Синтетические масла 300V Motorsport Line', logo: 'assets/partners/motul.png', link: 'https://motul.com', sort_order: 19, is_active: 1 },
  { id: 'injector_dynamics', name: 'Injector Dynamics', category: 'Топливные форсунки', desc: 'Высокоточные спортивные форсунки подачи топлива', logo: 'assets/partners/injector_dynamics.png', link: 'https://injectordynamics.com', sort_order: 20, is_active: 1 },
  { id: 'dodson_motorsport', name: 'Dodson Motorsport', category: 'Сцепления GR6 / DL800', desc: 'Усиленные сцепления для GT-R и Huracan/R8', logo: 'assets/partners/dodson_motorsport.png', link: 'https://dodsonmotorsport.com', sort_order: 21, is_active: 1 },
  { id: 't1_race', name: 'T1 Race Development', category: 'Инженерия VR38 & V10', desc: 'Компоненты топливных рамп и картера GT-R', logo: 'assets/partners/t1_race.png', link: 'https://t1racedevelopment.com', sort_order: 22, is_active: 1 },
  { id: 'csf_radiators', name: 'CSF Radiators', category: 'Радиаторы охлаждения', desc: 'Алюминиевые радиаторы ДВС и масляные кулеры', logo: 'assets/partners/csf_radiators.png', link: 'https://csfradiators.com', sort_order: 23, is_active: 1 },
  { id: 'dragtimes', name: 'Dragtimes', category: 'Суперкары & Дрэг', desc: 'Медиа-сообщество суперкаров и хронометраж', logo: 'assets/partners/dragtimes.png', link: 'https://dragtimes.ru', sort_order: 24, is_active: 1 },
  { id: 'rdrc_racepark', name: 'RDRC Racepark', category: 'Дрэг-стрип RDRC', desc: 'Главный гоночный автодром Чемпионата России', logo: 'assets/partners/rdrc_racepark.png', link: 'https://rdrc.ru', sort_order: 25, is_active: 1 },
  { id: 'dsc_off', name: 'DSC OFF', category: 'Автоспортивное медиа', desc: 'Медиа-проект Гурама Инцкирвели о рекордах GTT', logo: 'assets/partners/dsc_off.png', link: 'https://youtube.com/@dscoff', sort_order: 26, is_active: 1 },
  { id: 'pride_jfc', name: 'Pride JFC', category: 'Партнерский клуб', desc: 'Официальный клуб и спортивная лига', logo: 'assets/partners/pride_jfc.png', link: 'https://goshaturbotech.ru', sort_order: 27, is_active: 1 },
  { id: 'deikin_exhaust', name: 'Deikin Exhaust', category: 'Титановый выхлоп', desc: 'Кастомные титановые выхлопные системы', logo: 'assets/partners/deikin_exhaust.png', link: 'https://goshaturbotech.ru', sort_order: 28, is_active: 1 }
];

let cachedPartnersData = null;
let currentPartnerFilter = 'all';

function normalizePartnerList(list) {
  if (!Array.isArray(list) || list.length === 0) return defaultPartnersList;
  return list.map(p => {
    let logo = p.logo;
    const match = defaultPartnersList.find(d => d.id === p.id);
    if (!logo || logo.includes('partners_banner.png') || logo.endsWith('.svg') || logo === '#') {
      logo = match ? match.logo : `assets/partners/${p.id}.png`;
    }
    return { ...p, logo };
  });
}

function renderPartnersMarquee(partners) {
  const marqueeTrack = document.getElementById('partnersMarqueeTrack');
  if (!marqueeTrack) return;

  const list = normalizePartnerList(Array.isArray(partners) && partners.length > 0 ? partners : (cachedPartnersData || defaultPartnersList));
  const activePartners = list
    .filter(p => p.is_active === 1 || p.is_active === true || p.is_active === '1' || p.is_active === undefined)
    .sort((a, b) => (parseInt(a.sort_order || 0) - parseInt(b.sort_order || 0)));

  if (activePartners.length === 0) {
    marqueeTrack.innerHTML = '';
    return;
  }

  // Duplicate for seamless infinite marquee loop
  const loopList = [...activePartners, ...activePartners];
  marqueeTrack.innerHTML = loopList.map(p => {
    const name = escapeHtml(p.name || '');
    const logoSrc = escapeHtml(p.logo || '');
    
    return `
      <div class="partners-marquee-item" title="${name}">
        ${logoSrc ? `<img src="${logoSrc}" alt="${name}" class="partners-marquee-logo" loading="lazy" onerror="this.style.display='none'">` : ''}
        <span class="partners-marquee-text">${name}</span>
      </div>
    `;
  }).join('');
}

function getOptimalPartnerColumns(count) {
  if (count <= 2) return count;
  if (count <= 4) return 2;
  if (count <= 6) return 3;

  // Exact division with zero orphans
  if (count % 4 === 0) return 4;
  if (count % 3 === 0) return 3;

  // Remainder analysis to eliminate lonely single orphan cards
  const rem4 = count % 4; // e.g. for 21: 1 (orphan!)
  const rem3 = count % 3; // e.g. for 21: 0 (perfect!)

  if (rem4 === 1 && rem3 !== 1) return 3;
  if (rem3 === 1 && rem4 !== 1) return 4;

  return rem4 >= rem3 ? 4 : 3;
}

const partnerCategoryTranslations = {
  'Телеметрия & Софт': 'Telemetry & Software',
  'Детейлинг & Защита': 'Detailing & Protection',
  'Интерьер & Стиль': 'Interior & Bespoke',
  'Спортивное топливо': 'Race Fuel',
  'Смазочные материалы': 'Lubricants & Oils',
  'Трансмиссия & Сцепление': 'Transmission & Clutch',
  'Выхлопные системы': 'Exhaust Systems',
  'Кованые диски': 'Forged Wheels',
  'Тормозные системы': 'Braking Systems',
  'Шины & Слики': 'Tires & Racing Slicks',
  'Турбокомпрессоры': 'Turbochargers',
  'Дрэг-стрип & Трек': 'Dragstrip & Circuit',
  'Автоспорт': 'Motorsport',
  'Медиа & Автоспорт': 'Media & Motorsport',
  'Спортивные ремни & Экипировка': 'Racing Harnesses & Gear',
  'Партнер GTT': 'GTT Technical Partner'
};

function renderPartnersGrid(partners) {
  const container = document.getElementById('partnersGrid');
  if (!container) return;

  const rawList = Array.isArray(partners) && partners.length > 0 ? partners : (cachedPartnersData || defaultPartnersList);
  const normalizedList = normalizePartnerList(rawList);
  cachedPartnersData = normalizedList;

  const activePartners = normalizedList
    .filter(p => p.is_active === 1 || p.is_active === true || p.is_active === '1' || p.is_active === undefined)
    .sort((a, b) => (parseInt(a.sort_order || 0) - parseInt(b.sort_order || 0)));

  if (activePartners.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 48px 20px; color: var(--text-muted); font-family: var(--font-mono); font-size: 14px; width: 100%;">
        // Список партнеров обновляется
      </div>
    `;
    return;
  }

  // Set optimal column layout on the grid to prevent awkward orphan cards
  const optimalCols = getOptimalPartnerColumns(activePartners.length);
  container.setAttribute('data-cols', String(optimalCols));

  container.innerHTML = activePartners.map(p => {
    const name = escapeHtml(p.name || '');
    let category = p.category || 'Партнер GTT';
    if (typeof currentLang !== 'undefined' && currentLang === 'en') {
      category = partnerCategoryTranslations[category] || category;
    }
    const tag = escapeHtml(category);
    const logoSrc = escapeHtml(p.logo || '');
    const monogram = name.split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase();
    
    return `
      <div class="partner-card" data-partner-id="${escapeHtml(p.id || '')}">
        <div class="partner-logo-box">
          ${logoSrc ? `<img src="${logoSrc}" alt="${name}" class="partner-card-logo-img" loading="lazy" onerror="this.onerror=null; this.style.display='none'; if(this.nextElementSibling) this.nextElementSibling.style.display='block';">` : ''}
          <span class="partner-monogram-badge" style="${logoSrc ? 'display:none;' : 'display:block;'}">${monogram}</span>
        </div>
        <div class="partner-card-meta">
          <h3 class="partner-card-name">${name}</h3>
          <span class="partner-card-tag">${tag}</span>
        </div>
      </div>
    `;
  }).join('');
}

window.filterPartners = function() {
  renderPartnersGrid(cachedPartnersData || defaultPartnersList);
};

window.togglePartnersExpand = function() {
  const grid = document.getElementById('partnersGrid');
  const btn = document.getElementById('partnersExpandBtn');
  if (!grid || !btn) return;

  const isExpanded = grid.classList.toggle('is-expanded');
  const textSpan = btn.querySelector('.expand-btn-text');
  const icon = btn.querySelector('.expand-btn-icon');
  const lang = (typeof currentLang !== 'undefined') ? currentLang : 'ru';

  if (isExpanded) {
    if (textSpan) textSpan.textContent = (lang === 'en') ? 'Collapse' : 'Свернуть';
    if (icon) icon.style.transform = 'rotate(180deg)';
  } else {
    if (textSpan) textSpan.textContent = (lang === 'en') ? 'All Partners (28)' : 'Все партнеры (28)';
    if (icon) icon.style.transform = 'rotate(0deg)';
    const partnersSection = document.getElementById('partners');
    if (partnersSection) {
      partnersSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
};

async function syncPartnersFromAPI() {
  // 0. Render default partners & marquee immediately so UI is instant and never empty
  renderPartnersMarquee(defaultPartnersList);
  renderPartnersGrid(defaultPartnersList);

  // 1. Instant check from localStorage with auto-upgrade of legacy data
  try {
    const local = localStorage.getItem('gtt_admin_partners_db');
    if (local) {
      const parsed = JSON.parse(local);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const upgraded = normalizePartnerList(parsed);
        cachedPartnersData = upgraded;
        localStorage.setItem('gtt_admin_partners_db', JSON.stringify(upgraded));
        renderPartnersMarquee(upgraded);
        renderPartnersGrid(upgraded);
      } else {
        cachedPartnersData = defaultPartnersList;
        localStorage.setItem('gtt_admin_partners_db', JSON.stringify(defaultPartnersList));
        renderPartnersMarquee(defaultPartnersList);
        renderPartnersGrid(defaultPartnersList);
      }
    } else {
      cachedPartnersData = defaultPartnersList;
      localStorage.setItem('gtt_admin_partners_db', JSON.stringify(defaultPartnersList));
      renderPartnersMarquee(defaultPartnersList);
      renderPartnersGrid(defaultPartnersList);
    }
  } catch (e) {
    renderPartnersMarquee(defaultPartnersList);
    renderPartnersGrid(defaultPartnersList);
  }

  // 2. Fetch from backend API
  try {
    const res = await fetch('/api/partners');
    if (!res.ok) return;
    const serverPartners = await res.json();
    if (Array.isArray(serverPartners) && serverPartners.length > 0) {
      const upgraded = normalizePartnerList(serverPartners);
      cachedPartnersData = upgraded;
      localStorage.setItem('gtt_admin_partners_db', JSON.stringify(upgraded));
      renderPartnersMarquee(upgraded);
      renderPartnersGrid(upgraded);
    }
  } catch (err) {}
}

const defaultMotoList = [
  {
    id: 'moto_1',
    title: 'Superbike Stage 1 / 2',
    code: 'SUPERBIKE // STAGE 2',
    desc: 'Программное раскрытие потенциала литровых спортбайков BMW S1000RR / M1000RR, Ducati Panigale V4, Yamaha R1. Индивидуальные карты зажигания, снятие ограничителей и калибровка квикшифтера на диностенде.',
    bullets: 'Индивидуальная калибровка на диностенде\nОптимизация Wheelie & Launch Control\nКалибровка электронного дросселя без задержек',
    img: '',
    sort_order: 1,
    is_active: 1
  },
  {
    id: 'moto_2',
    title: 'Титановый выпуск GTT Moto',
    code: 'TITANIUM // EXH',
    desc: 'Ручная аргоновая сварка титана и инконеля для мотоциклов. Экстремальное снижение веса, породистый акустический звук и прибавка крутящего момента во всем диапазоне.',
    bullets: 'Ультралегкие коллекторы из сплава Titan-Gr5\nКастомная фрезеровка насадок\nОгненные отстрелы и сочный басовитый тон',
    img: '',
    sort_order: 2,
    is_active: 1
  },
  {
    id: 'moto_3',
    title: 'Bespoke кастомизация',
    code: 'BESPOKE // CNC',
    desc: 'Полный цикл доработки премиальной мототехники: кованые сверхлегкие диски, сухое сцепление, карбоновое оперение и комплексное предсезонное ТО.',
    bullets: 'Сухой автоклавный карбон 3K/12K\nТормозные системы Brembo Racing / GP4\nИндивидуальный дизайн и покраска',
    img: '',
    sort_order: 3,
    is_active: 1
  }
];

let cachedMotoData = null;

function renderMotoGrid(motoList) {
  const container = document.getElementById('motoCardsGrid');
  if (!container) return;

  const rawList = Array.isArray(motoList) && motoList.length > 0 ? motoList : defaultMotoList;
  const list = rawList.map(m => ({ ...m, img: '' }));
  const activeMoto = list
    .filter(m => m.is_active === 1 || m.is_active === true || m.is_active === '1' || m.is_active === undefined)
    .sort((a, b) => (parseInt(a.sort_order || 0) - parseInt(b.sort_order || 0)));

  if (activeMoto.length === 0) {
    return;
  }

  container.innerHTML = activeMoto.map((m, idx) => {
    const title = escapeHtml(m.title || '');
    const code = escapeHtml(m.code || 'GTT // MOTO');
    const desc = escapeHtml(m.desc || '');
    const rawBullets = m.bullets || '';
    const bullets = (Array.isArray(rawBullets) ? rawBullets : String(rawBullets).split('\n'))
      .map(b => b.trim())
      .filter(Boolean);

    // Clean up code badge (e.g. "SUPERBIKE // STAGE 2" -> "STAGE 1 / 2 • ECU")
    let cleanCode = code;
    if (code.includes('STAGE')) cleanCode = 'STAGE 1 / 2 • ECU';
    else if (code.includes('TITANIUM') || code.includes('EXH')) cleanCode = 'ТИТАНОВЫЙ ВЫПУСК';
    else if (code.includes('BESPOKE') || code.includes('CNC')) cleanCode = 'BESPOKE & КАРБОН';

    const bulletsHtml = bullets.map(b => `
      <div class="moto-spec-item">
        <span class="spec-bullet">—</span>
        <span class="spec-label">${escapeHtml(b)}</span>
      </div>
    `).join('');

    return `
      <div class="moto-card" data-moto-id="${escapeHtml(m.id || '')}">
        <!-- Question Mark Teaser On Top -->
        <div class="moto-card-teaser-media">
          <div class="moto-teaser-glow-orbit"></div>
          <div class="moto-teaser-icon-wrap">
            <span class="moto-teaser-qmark">?</span>
            <span class="moto-teaser-radar"></span>
          </div>
          <span class="moto-card-teaser-status">PROJECT #0${idx + 1}</span>
        </div>
        <div class="moto-card-header">
          <span class="moto-card-num">0${idx + 1}</span>
          <span class="moto-card-pill">${cleanCode}</span>
        </div>
        <h3 class="moto-card-title">${title}</h3>
        <p class="moto-card-desc">${desc}</p>
        <div class="moto-spec-strip">
          ${bulletsHtml}
        </div>
      </div>
    `;
  }).join('');
}

async function syncMotoFromAPI() {
  // 1. Instant check from localStorage
  try {
    const local = localStorage.getItem('gtt_admin_moto_db');
    if (local) {
      const parsed = JSON.parse(local);
      if (Array.isArray(parsed) && parsed.length > 0) {
        cachedMotoData = parsed;
        renderMotoGrid(parsed);
      }
    }
  } catch (e) {}

  // 2. Fetch from backend API
  try {
    const res = await fetch('/api/moto');
    if (!res.ok) {
      if (!cachedMotoData) renderMotoGrid(defaultMotoList);
      return;
    }
    const serverMoto = await res.json();
    if (Array.isArray(serverMoto) && serverMoto.length > 0) {
      cachedMotoData = serverMoto;
      localStorage.setItem('gtt_admin_moto_db', JSON.stringify(serverMoto));
      renderMotoGrid(serverMoto);
    } else if (!cachedMotoData) {
      renderMotoGrid(defaultMotoList);
    }
  } catch (err) {
    if (!cachedMotoData) {
      renderMotoGrid(defaultMotoList);
    }
  }
}

function getGalleryBilingual(rawTitle, rawTag) {
  let title = rawTitle || '';
  let tag = rawTag || 'RDRC';

  // Strip test artifacts like "проверка"
  title = title.replace(/\s*проверка/gi, '').trim();

  const titleDict = {
    // 1. Zelenka
    'Huracan TT «Зеленка» GTT': {
      ru: 'Huracan TT «Зеленка» GTT',
      en: 'Huracan TT «Zelenka» GTT'
    },
    'Huracan Twin Turbo «Зеленка» GTT': {
      ru: 'Huracan Twin Turbo «Зеленка» GTT',
      en: 'Huracan Twin Turbo «Zelenka» GTT'
    },
    'Lamborghini Huracan «Зеленка» Twin Turbo на треке RDRC': {
      ru: 'Lamborghini Huracan «Зеленка» Twin Turbo на треке RDRC',
      en: 'Lamborghini Huracan «Zelenka» Twin Turbo at RDRC'
    },
    'Huracan TT «Зеленка» GTT проверка': {
      ru: 'Huracan TT «Зеленка» GTT',
      en: 'Huracan TT «Zelenka» GTT'
    },
    'Легендарная Lamborghini Huracan TT «Зеленка» RDRC': {
      ru: 'Легендарная Lamborghini Huracan TT «Зеленка» RDRC',
      en: 'Legendary Lamborghini Huracan TT «Zelenka» RDRC'
    },
    // Dodge Demon
    'Dodge Demon': {
      ru: 'Dodge Demon',
      en: 'Dodge Demon'
    },
    'Dodge Demon: дымный прогрев сликов на закате RDRC': {
      ru: 'Dodge Demon: дымный прогрев сликов на закате RDRC',
      en: 'Dodge Demon: Smoky Burnout at Sunset RDRC'
    },
    // Audi R8 Rokot
    'Audi R8 V10 Plus TT «Rokot»': {
      ru: 'Audi R8 V10 Plus TT «Rokot»',
      en: 'Audi R8 V10 Plus TT «Rokot»'
    },
    'Audi R8 V10 Plus TT «Rokot» на стартовой черте RDRC': {
      ru: 'Audi R8 V10 Plus TT «Rokot» на стартовой черте RDRC',
      en: 'Audi R8 V10 Plus TT «Rokot» on RDRC Starting Line'
    },
    // Nissan GT-R R35 Draco Dragster
    'Nissan GT-R R35 Draco Dragster': {
      ru: 'Nissan GT-R R35 Draco Dragster',
      en: 'Nissan GT-R R35 Draco Dragster'
    },
    '3000+ HP Nissan GT-R R35 Draco Pro-Mod на сликах RDRC': {
      ru: '3000+ HP Nissan GT-R R35 Draco Pro-Mod на сликах RDRC',
      en: '3000+ HP Nissan GT-R R35 Draco Pro-Mod on RDRC Slicks'
    },
    // Nissan GT-R R35 Lucifer
    'Nissan GT-R R35 Lucifer': {
      ru: 'Nissan GT-R R35 Lucifer',
      en: 'Nissan GT-R R35 Lucifer'
    },
    'Nissan GT-R R35 Lucifer: чемпионский победный болид RDRC': {
      ru: 'Nissan GT-R R35 Lucifer: чемпионский победный болид RDRC',
      en: 'Nissan GT-R R35 Lucifer: RDRC Championship Winner'
    },
    // Red Chrome Nissan GT-R R35
    'Red Chrome Nissan GT-R R35': {
      ru: 'Red Chrome Nissan GT-R R35',
      en: 'Red Chrome Nissan GT-R R35'
    },
    'Красный хромированный Nissan GT-R R35 GTT': {
      ru: 'Красный хромированный Nissan GT-R R35 GTT',
      en: 'Red Chrome Nissan GT-R R35 GTT'
    },
    // 2. Bezzubik
    'Huracan Twin Turbo «Беззубик»': {
      ru: 'Huracan Twin Turbo «Беззубик»',
      en: 'Huracan Twin Turbo «Bezzubik»'
    },
    'Lamborghini Huracan Беззубик Twin Turbo на треке': {
      ru: 'Lamborghini Huracan Беззубик Twin Turbo на треке',
      en: 'Lamborghini Huracan Bezzubik Twin Turbo on Track'
    },
    // 3. Gosha
    'Гоша Перцхелия на стрипе RDRC': {
      ru: 'Гоша Перцхелия на стрипе RDRC',
      en: 'Gosha Pertskheliya at RDRC Strip'
    },
    'Георгий Перцхелия на стрипе RDRC': {
      ru: 'Гоша Перцхелия на стрипе RDRC',
      en: 'Gosha Pertskheliya at RDRC Strip'
    },
    'Гоша Перцхелия контролирует подготовку трассы RDRC': {
      ru: 'Гоша Перцхелия контролирует подготовку трассы RDRC',
      en: 'Gosha Pertskheliya Supervising RDRC Glue Prep'
    },
    // 4. Box
    'Бокс GTT: BMW M4 G82 & GT-R': {
      ru: 'Бокс GTT: BMW M4 G82 & GT-R',
      en: 'GTT Pit: BMW M4 G82 & GT-R'
    },
    'Бокс GTT: белая BMW M4 G82 и Nissan GT-R': {
      ru: 'Бокс GTT: белая BMW M4 G82 и Nissan GT-R',
      en: 'GTT Pit: White BMW M4 G82 & Nissan GT-R'
    },
    // 5. Sarkisyan
    'Пилот Саркисян & Draco GTT': {
      ru: 'Пилот Саркисян & Draco GTT',
      en: 'Pilot Sarkisyan & Draco GTT'
    },
    'Пилот Саркисян и дрэгстер Draco в закрытом парке': {
      ru: 'Пилот Саркисян и дрэгстер Draco в закрытом парке',
      en: 'Pilot Sarkisyan & Draco Dragster in Parc Fermé'
    },

    // 7. Huracan on staging
    'Huracan TT на стартовом створе': {
      ru: 'Huracan TT на стартовом створе',
      en: 'Huracan TT on Staging Lane'
    },
    'Lamborghini Huracan Twin Turbo на стартовой решетке RDRC': {
      ru: 'Lamborghini Huracan Twin Turbo на стартовой решетке RDRC',
      en: 'Lamborghini Huracan Twin Turbo on RDRC Starting Grid'
    },
    // 8. Titanium Exhaust
    'GT-R R35 // GTT Titanium Exhaust': {
      ru: 'GT-R R35 // GTT Titanium Exhaust',
      en: 'GT-R R35 // GTT Titanium Exhaust'
    },
    'Красный Nissan GT-R: титановый выпуск GTT и официальная рамка RDRC': {
      ru: 'Красный Nissan GT-R: титановый выпуск GTT и официальная рамка RDRC',
      en: 'Red Nissan GT-R: GTT Titanium Exhaust & RDRC Plate'
    },
    // 9. Paddock
    'Паддок GTT: BMW M5 G90 & GT-R': {
      ru: 'Паддок GTT: BMW M5 G90 & GT-R',
      en: 'GTT Paddock: BMW M5 G90 & GT-R'
    },
    'Паддок GoshaTurboTech: матовая BMW M5 G90 и боевой GT-R у боксов': {
      ru: 'Паддок GoshaTurboTech: матовая BMW M5 G90 и боевой GT-R у боксов',
      en: 'GoshaTurboTech Paddock: Matte BMW M5 G90 & Race GT-R'
    },
    // 10. Pair Huracans
    'Пара Lamborghini Huracan TT GTT': {
      ru: 'Пара Lamborghini Huracan TT GTT',
      en: 'Pair of Lamborghini Huracan TT GTT'
    },
    'Двойной удар V10 Twin Turbo: пара боевых Huracan команды GTT': {
      ru: 'Двойной удар V10 Twin Turbo: пара боевых Huracan команды GTT',
      en: 'Twin V10 Strike: Pair of Race Huracans from GTT'
    },
    // 11. Billet Suspension
    'VR38 Billet & Drag Suspension': {
      ru: 'VR38 Billet & Drag Suspension',
      en: 'VR38 Billet & Drag Suspension'
    },
    'VR38 Billet & Дрэг-подвеска': {
      ru: 'VR38 Billet & Drag Suspension',
      en: 'VR38 Billet & Drag Suspension'
    },
    // 12. Challenger Burnout
    'Challenger SRT // Cloud of Smoke': {
      ru: 'Challenger SRT // Cloud of Smoke',
      en: 'Challenger SRT // Cloud of Smoke'
    },
    'Challenger SRT // Облако дыма': {
      ru: 'Challenger SRT // Cloud of Smoke',
      en: 'Challenger SRT // Cloud of Smoke'
    }
  };

  const tagDict = {
    'CHIEF MOTORSPORT ENGINEER': {
      ru: 'CHIEF MOTORSPORT ENGINEER',
      en: 'CHIEF MOTORSPORT ENGINEER'
    },
    'ГЛАВНЫЙ ИНЖЕНЕР': {
      ru: 'ГЛАВНЫЙ ИНЖЕНЕР',
      en: 'CHIEF MOTORSPORT ENGINEER'
    }
  };

  let finalTitle = title;
  let finalTag = tag;

  if (titleDict[title]) {
    finalTitle = titleDict[title][currentLang] || title;
  } else if (currentLang === 'en') {
    finalTitle = finalTitle
      .replace(/«Зеленка»/gi, '«Zelenka»')
      .replace(/Зеленка/gi, 'Zelenka')
      .replace(/«Беззубик»/gi, '«Bezzubik»')
      .replace(/Беззубик/gi, 'Bezzubik')
      .replace(/Гоша Перцхелия/gi, 'Gosha Pertskheliya')
      .replace(/Георгий Перцхелия/gi, 'Gosha Pertskheliya')
      .replace(/на стрипе RDRC/gi, 'at RDRC Strip')
      .replace(/на прогреве/gi, 'in Staging')
      .replace(/на стартовом створе/gi, 'on Staging Lane')
      .replace(/Бокс GTT:/gi, 'GTT Pit:')
      .replace(/Паддок GTT:/gi, 'GTT Paddock:')
      .replace(/Пара Lamborghini/gi, 'Pair of Lamborghini')
      .replace(/Пилот Саркисян/gi, 'Pilot Sarkisyan')
      .replace(/Дрэг-подвеска/gi, 'Drag Suspension')
      .replace(/Облако дыма/gi, 'Cloud of Smoke')
      .trim();
  }

  if (tagDict[tag]) {
    finalTag = tagDict[tag][currentLang] || tag;
  }

  return { title: finalTitle, tag: finalTag };
}

function updateGalleryTranslations() {
  const track = document.getElementById('marqueeTrackMain');
  if (!track) return;
  track.querySelectorAll('.marquee-card').forEach(card => {
    const rawTitle = card.getAttribute('data-raw-title') || card.querySelector('.marquee-card-title')?.textContent || '';
    const rawTag = card.getAttribute('data-raw-tag') || card.querySelector('.marquee-card-tag')?.textContent || '';
    if (!card.getAttribute('data-raw-title')) {
      card.setAttribute('data-raw-title', rawTitle);
    }
    if (!card.getAttribute('data-raw-tag')) {
      card.setAttribute('data-raw-tag', rawTag);
    }
    const bilingual = getGalleryBilingual(rawTitle, rawTag);
    const titleEl = card.querySelector('.marquee-card-title');
    const tagEl = card.querySelector('.marquee-card-tag');
    if (titleEl) titleEl.textContent = bilingual.title;
    if (tagEl) tagEl.textContent = bilingual.tag;
  });
}

function renderGalleryTrack(items) {
  const track = document.getElementById('marqueeTrackMain');
  if (!track || !Array.isArray(items) || items.length === 0) return;
  track.innerHTML = items.map(g => {
    const rawTitle = (g.title || '').replace(/\s*проверка/gi, '').trim();
    const rawTag = g.tag || 'RDRC';
    const bilingual = getGalleryBilingual(rawTitle, rawTag);
    return `
    <div class="marquee-card" data-raw-title="${rawTitle.replace(/"/g, '&quot;')}" data-raw-tag="${rawTag.replace(/"/g, '&quot;')}" onclick="openGalleryLightbox('${g.img}', '${rawTitle.replace(/'/g, "\\'")}')">
      <img src="${g.img}" alt="${bilingual.title || 'GTT'}" decoding="async" onerror="this.onerror=null; this.src='assets/photos/gtt_shield_logo.svg';">
      <div class="marquee-card-meta">
        <span class="marquee-card-tag">${bilingual.tag}</span>
        <div class="marquee-card-title">${bilingual.title}</div>
      </div>
    </div>
  `;
  }).join('');
  initGalleryMarqueeInteractions();
}

// Dynamic Records Synchronization
let cachedRecordsData = null;

const defaultRecords = [
  {
    id: 'rec_moses',
    year: 'UNLIM 500+ • 2016',
    eventPill: 'UNLIM 500+ • 2016',
    heroTime: '7.526',
    heroUnit: 'СЕК',
    heroSpeed: '304.36 КМ/Ч • 1/4 МИЛИ',
    car: 'NISSAN GT-R R35 «MOSES»',
    telemetry: '1/4 мили: 7.526 сек • 304.36 км/ч',
    desc: 'Абсолютный рекорд 402 м за всю историю ателье GoshaTurboTech.',
    img: 'assets/archive_tilda/gtr_moses.png'
  },
  {
    id: 'rec_draco',
    year: 'RDRC PRO-MOD • 2024',
    eventPill: 'RDRC PRO-MOD • 2024',
    heroTime: '7.694',
    heroUnit: 'СЕК',
    heroSpeed: '304.44 КМ/Ч • 1/4 МИЛИ',
    car: 'NISSAN GT-R DRACO PRO-MOD #300',
    telemetry: '1/4 мили: 7.694 сек • 304.44 км/ч',
    desc: 'Флагман дрэг-рейсинга России. Выход из 1/2 мили 323.88 км/ч.',
    img: 'assets/cars/gtr_draco_promod_front.jpg'
  },
  {
    id: 'rec_kurdalagon',
    year: 'RDRC БЫКОВО • 2026',
    eventPill: 'RDRC БЫКОВО • 2026',
    heroTime: '7.766',
    heroUnit: 'СЕК',
    heroSpeed: '300.00 КМ/Ч • 1/4 МИЛИ',
    car: 'NISSAN GT-R R35 «КУРДАЛАГОН»',
    telemetry: '1/4 мили: 7.766 сек • 300.00 км/ч',
    desc: 'Официальный рекорд трек-дня в Быково конца октября 2026.',
    img: 'assets/archive_tilda/gtr_kurdalagon.png'
  },
  {
    id: 'rec_rokot',
    year: 'РЕКОРД РОССИИ • 2026',
    eventPill: 'РЕКОРД РОССИИ • 2026',
    heroTime: '7.877',
    heroUnit: 'СЕК',
    heroSpeed: 'СУПЕРКУБОК RDRC • 1/4 МИЛИ',
    car: 'AUDI R8 V10 PLUS TT «ROKOT»',
    telemetry: '1/4 мили: 7.877 сек • Суперкубок RDRC',
    desc: 'Первый и единственный болид Audi в России быстрее 8 секунд.',
    img: 'assets/cars/audi_r8_tsmr_launch.jpg'
  },
  {
    id: 'rec_bezzubik',
    year: 'RACE 1000 • ГЕРМАНИЯ',
    eventPill: 'RACE 1000 • ГЕРМАНИЯ',
    heroTime: '353.02',
    heroUnit: 'КМ/Ч',
    heroSpeed: '1/2 МИЛИ • 8.054 СЕК НА 402 М',
    car: 'HURACAN TT «BEZZUBIK»',
    telemetry: '1/2 мили: 353.02 км/ч • 1/4 мили: 8.054 сек',
    desc: 'Официальный рекорд Европы на дистанции 804 м среди полноприводных суперкаров.',
    img: 'assets/photos/huracan_rdrc_stage_line.jpg'
  },
  {
    id: 'rec_zelenka',
    year: 'ROLLING 50 1000',
    eventPill: 'ROLLING 50 1000',
    heroTime: '344.60',
    heroUnit: 'КМ/Ч',
    heroSpeed: '1000 М • 8.373 СЕК 1/4 МИЛИ',
    car: 'HURACAN TT «ЗЕЛЕНКА»',
    telemetry: '1/4 мили: 8.373 сек • 1000 м: 344.60 км/ч',
    desc: 'Культовый 2000+ сильный болид GoshaTurboTech в ОАЭ и Германии.',
    img: 'assets/photos/huracan_zelenka_gtt.jpg'
  },
  {
    id: 'rec_lucifer',
    year: 'RDRC 2026 • ЧЕМПИОН',
    eventPill: 'RDRC 2026 • ЧЕМПИОН',
    heroTime: '8.400',
    heroUnit: 'СЕК',
    heroSpeed: '343.67 КМ/Ч • 1/2 МИЛИ',
    car: 'NISSAN GT-R R35 «LUCIFER» #71',
    telemetry: '1/4 мили: 8.400 сек • 1/2 мили: 343.67 км/ч',
    desc: 'Личный флагманский боевой болид Гоши Перцхелии.',
    img: 'assets/cars/gtr_lucifer_solo.jpg'
  },
  {
    id: 'rec_korzhik',
    year: 'МОСКОВСКАЯ МИЛЯ',
    eventPill: 'МОСКОВСКАЯ МИЛЯ',
    heroTime: '13.435',
    heroUnit: 'СЕК',
    heroSpeed: '334.41 КМ/Ч • 1/2 МИЛИ',
    car: 'NISSAN GT-R R35 «KORZHIK» #712',
    telemetry: '1/2 мили: 13.435 сек • 334.41 км/ч',
    desc: 'Пилот Николай Коржов. Официальный рекорд России на 1/2 мили.',
    img: 'assets/cars/gtr_korzhik_712.jpg'
  },
  {
    id: 'rec_hulk',
    year: 'СУПЕРКУБОК RDRC',
    eventPill: 'СУПЕРКУБОК RDRC',
    heroTime: '8.951',
    heroUnit: 'СЕК',
    heroSpeed: '257.14 КМ/Ч • 1/4 МИЛИ',
    car: 'HURACAN LP610-4 «HULK»',
    telemetry: '1/4 мили: 8.951 сек • 3/8 мили: 291.14 км/ч',
    desc: 'Пилот Эдуард Саркисян. Победный заезд на Суперкубке RDRC.',
    img: 'assets/cars/huracan_green_grey_rdrc.jpg'
  },
  {
    id: 'rec_tonystark',
    year: 'RECORD DAYS',
    eventPill: 'RECORD DAYS',
    heroTime: '8.948',
    heroUnit: 'СЕК',
    heroSpeed: '287.19 КМ/Ч • 1/2 МИЛИ',
    car: 'AUDI R8 V10 PLUS «TONY STARK»',
    telemetry: '1/4 мили: 8.948 сек • 247.68 км/ч',
    desc: 'Стабильный выезд из 9 секунд на трек-днях Record Days.',
    img: 'assets/archive_tilda/audi_r8_tonystark.png'
  },
  {
    id: 'rec_gtt1200',
    year: 'РЕКОРД ЕВРОПЫ 991',
    eventPill: 'РЕКОРД ЕВРОПЫ 991',
    heroTime: '9.086',
    heroUnit: 'СЕК',
    heroSpeed: '312.77 КМ/Ч • 1/2 МИЛИ',
    car: 'PORSCHE 911 TURBO GTT-1200',
    telemetry: '1/4 мили: 9.086 сек • 259.64 км/ч',
    desc: 'Пилот Алексей Сагал. Рекорд России и Европы для кузова 991.1.',
    img: 'assets/cars/porsche_991_1200_white.jpg'
  },
  {
    id: 'rec_su7',
    year: 'СУПЕРКУБОК 2026',
    eventPill: 'СУПЕРКУБОК 2026',
    heroTime: '9.130',
    heroUnit: 'СЕК',
    heroSpeed: '249.31 КМ/Ч • 1/4 МИЛИ',
    car: 'XIAOMI SU7 ULTRA GTT SPEC',
    telemetry: '1/4 мили: 9.130 сек • 3/8 мили: 287.31 км/ч',
    desc: 'Сенсационный рекорд команды для электрических гиперкаров.',
    img: 'assets/cars/bmw_m5_rdrc_race.jpg'
  },
  {
    id: 'rec_imba',
    year: 'МИРОВОЙ ОРИЕНТИР 992',
    eventPill: 'МИРОВОЙ ОРИЕНТИР 992',
    heroTime: '9.167',
    heroUnit: 'СЕК',
    heroSpeed: '231.80 КМ/Ч • 1/4 МИЛИ',
    car: 'PORSCHE 911 TURBO S IMBA',
    telemetry: '1/4 мили: 9.167 сек • RDRC 2025',
    desc: 'Пилот Мария Кутычкина. Быстрейший 992 на заводских турбинах.',
    img: 'assets/cars/porsche_992_imba_silver.jpg'
  },
  {
    id: 'rec_puncher',
    year: 'UNLIM FEST',
    eventPill: 'UNLIM FEST',
    heroTime: '9.303',
    heroUnit: 'СЕК',
    heroSpeed: '276.92 КМ/Ч • 1/2 МИЛИ',
    car: 'PORSCHE 911 TURBO S PUNCHER',
    telemetry: '1/4 мили: 9.303 сек • 235.83 км/ч',
    desc: 'Триумф Сергея Никитина в зачетах дорожных Porsche 992.',
    img: 'assets/archive_tilda/porsche_992_puncher.jpg'
  },
  {
    id: 'rec_gyurza',
    year: 'РЕКОРД ЛЬДА БАЙКАЛА',
    eventPill: 'РЕКОРД ЛЬДА БАЙКАЛА',
    heroTime: '124.00',
    heroUnit: 'КМ/Ч',
    heroSpeed: '1 КМ С МЕСТА ПО ЛЬДУ',
    car: 'AUDI R8 V10 PLUS «GYURZA»',
    telemetry: '1 км с места на льду: 124.00 км/ч',
    desc: 'Дни скорости на льду озера Байкал совместно с Kiwamaru.',
    img: 'assets/archive_tilda/audi_r8_gyurza_ice.jpg'
  },
  {
    id: 'rec_gallardo',
    year: 'МИРОВОЙ РЕКОРД 1 МИЛЯ',
    eventPill: 'МИРОВОЙ РЕКОРД 1 МИЛЯ',
    heroTime: '409.55',
    heroUnit: 'КМ/Ч',
    heroSpeed: '20.845 СЕК НА 1 МИЛЮ (1609 М)',
    car: 'LAMBORGHINI GALLARDO NERA TT',
    telemetry: '1 миля: 409.55 км/ч • 20.845 сек',
    desc: 'Первый болид из России, покоривший планку 400+ км/ч в Греции.',
    img: 'assets/photos/huracan_zelenka_gtt.jpg'
  }
];

const recordTranslationsEn = {
  'rec_moses': {
    year: '2016 • Absolute GTT Benchmark',
    title: 'All-Time 1/4-Mile Record',
    desc: 'Legendary passes in UAE and UNLIM 500+ Greece. 7.526 sec at 304.36 km/h — fastest drag time in GoshaTurboTech history.'
  },
  'rec_draco': {
    year: '2024 • RDRC Pro-Mod Record',
    title: 'Flagship of Russian Drag Racing',
    desc: 'Driver Ruslan Arefyev at RDRC 2024 (pass #537). Verified DragDB telemetry. Half-mile exit speed surpassed 323.88 km/h.'
  },
  'rec_kurdalagon': {
    year: '2026 • Bykovo Track Record',
    title: 'Latest GTT Track Day Record',
    desc: 'Fresh official track day benchmark established by the GoshaTurboTech skunkworks at Bykovo in late October 2026.'
  },
  'rec_rokot': {
    year: '2026 • Russian National Record for Audi',
    title: 'First Audi in Russia Sub-8 Seconds',
    desc: 'Eduard Sarkisyan and Ruslan Arefyev shattered the national barrier, becoming the first Audi in Russia to clock under 8 seconds.'
  },
  'rec_bezzubik': {
    year: 'European Record • Race 1000',
    title: 'European Triumph in Germany',
    desc: 'Official 804-meter European record among AWD supercars in Germany (353.02 km/h) and 8.054 sec quarter-mile.'
  },
  'rec_zelenka': {
    year: 'UAE & Germany • 344.60 km/h',
    title: 'Legendary Green GTT Hypercar',
    desc: '8.373 sec at 275.26 km/h on quarter mile in UAE and 344.60 km/h over 1000 meters in Germany (Rolling 50 1000).'
  },
  'rec_lucifer': {
    year: 'RDRC 2026 • 1st Place Champion',
    title: "Gosha's Personal Flagship Build",
    desc: 'Gosha Pertskheliya personal race weapon. 8.400 sec in UAE, 8.551 sec class win on RDRC 2026, and 343.67 km/h half-mile.'
  },
  'rec_korzhik': {
    year: 'Russian Record • Moscow Mile',
    title: 'Moscow Mile Record Holder',
    desc: 'Piloted by Nikolay Korzhov. 8.602 sec 1/4-mile and verified Russian 1/2-mile national record: 13.435 sec at 334.41 km/h.'
  },
  'rec_hulk': {
    year: 'RDRC Supercup 2026',
    title: 'RDRC Supercup Victory',
    desc: 'Driver Eduard Sarkisyan for GoshaTurboTech. 8.951 sec at 257.14 km/h on 1/4 mile (3/8 mile: 11.561 sec / 291.14 km/h).'
  },
  'rec_tonystark': {
    year: 'Record Days 2023',
    title: 'Turbo Monster R8 Tony Stark',
    desc: 'Consistent sub-9 second passes on Record Days track events (8.948 sec) and 15.403 sec at 287.19 km/h half-mile.'
  },
  'rec_gtt1200': {
    year: 'Russian & European Record • RacePark',
    title: 'Record Pass Porsche 991',
    desc: 'Driver Alexey Sagal. Russian and European benchmark for 991.1 body (9.086 sec) with 312.77 km/h half-mile.'
  },
  'rec_su7': {
    year: '2026 • RDRC Supercup',
    title: 'Electric Hyper-Sedan 1548 HP',
    desc: 'Driver V. Shched piloting for GoshaTurboTech at RDRC Supercup 2026 clocked an electric record 9.130 sec at 249.31 km/h.'
  },
  'rec_imba': {
    year: '2022–2025 • World RDRC Benchmark',
    title: 'Fastest 992 on Stock Turbos',
    desc: 'Driver Maria Kutychkina. World benchmark 9.252 sec at 231.80 km/h on stock turbos, lowered on RDRC 2025 to 9.167 sec.'
  },
  'rec_puncher': {
    year: '2021 • World Benchmark UNLIM FEST',
    title: 'Sergey Nikitin Triumph',
    desc: 'Street-legal Porsche 992 benchmark at Unlim Fest (9.303 sec) and half-mile in 14.778 sec at 276.92 km/h.'
  },
  'rec_gyurza': {
    year: '2022 • Absolute Ice Record',
    title: 'Days of Speed on Lake Baikal Ice',
    desc: 'Built by GTT in collaboration with Kiwamaru. All-time standing-start ice racing record in Russian motorsport history.'
  },
  'rec_gallardo': {
    year: 'World Record • 1 Mile (1609 m)',
    title: 'All-Time Speed Record 409+ km/h',
    desc: 'Crete Airfield, Greece. Gosha Pertskheliya legendary Black Gallardo — first car from Russia to conquer 400+ km/h on 1 mile.'
  }
};

// Dynamic Records Synchronization & Smooth Continuous Carousel Stream
let recordsTrackPos = 0;
let recordsIsHovered = false;
let recordsIsManualSliding = false;
let recordsRafId = null;
let recordsResumeTimeout = null;

window.handleRecordImgLoad = function(img) {
  if (!img || !img.naturalWidth || !img.naturalHeight) return;
  if (!img.getAttribute('data-custom-pos')) {
    const src = (img.currentSrc || img.src || '').toLowerCase();
    if (src.includes('lucifer')) {
      img.style.objectPosition = '55% 65%';
    } else if (src.includes('zelenka')) {
      img.style.objectPosition = '32% 60%';
    } else if (src.includes('draco')) {
      img.style.objectPosition = 'center 65%';
    } else if (src.includes('audi_r8') || src.includes('rokot')) {
      img.style.objectPosition = 'center 68%';
    } else if (img.naturalHeight > img.naturalWidth) {
      img.style.objectPosition = 'center 68%';
    }
  }
};

function stepRecordsContinuousMotion() {
  const track = document.getElementById('recordsCarouselTrack');
  if (track && !recordsIsHovered && !recordsIsManualSliding) {
    const singleHalfWidth = track.scrollWidth / 2;
    if (singleHalfWidth > 100) {
      if (Math.abs(recordsTrackPos) >= singleHalfWidth * 2) {
        recordsTrackPos = 0;
      }
      // Neat, elegant continuous rotation on both mobile and desktop
      const speed = window.innerWidth <= 820 ? 0.45 : 0.65;
      recordsTrackPos -= speed;
      if (Math.abs(recordsTrackPos) >= singleHalfWidth) {
        recordsTrackPos += singleHalfWidth;
      }
      track.style.transform = `translate3d(${recordsTrackPos}px, 0, 0)`;
    }
  }
  recordsRafId = requestAnimationFrame(stepRecordsContinuousMotion);
}

window.recordsCarouselNext = function() {
  const track = document.getElementById('recordsCarouselTrack');
  if (!track) return;
  recordsIsManualSliding = true;
  clearTimeout(recordsResumeTimeout);

  const cardEl = track.querySelector('.record-item');
  const cardWidth = cardEl ? cardEl.offsetWidth : (window.innerWidth <= 820 ? 320 : 360);
  const gap = window.innerWidth <= 820 ? 16 : 24;
  const step = cardWidth + gap;
  const singleHalfWidth = track.scrollWidth / 2;
  recordsTrackPos -= step;
  if (Math.abs(recordsTrackPos) >= singleHalfWidth) {
    recordsTrackPos += singleHalfWidth;
  }
  track.style.transition = 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)';
  track.style.transform = `translate3d(${recordsTrackPos}px, 0, 0)`;

  recordsResumeTimeout = setTimeout(() => {
    if (track) track.style.transition = 'none';
    recordsIsManualSliding = false;
    recordsIsHovered = false;
  }, 1800);
};

window.recordsCarouselPrev = function() {
  const track = document.getElementById('recordsCarouselTrack');
  if (!track) return;
  recordsIsManualSliding = true;
  clearTimeout(recordsResumeTimeout);

  const cardEl = track.querySelector('.record-item');
  const cardWidth = cardEl ? cardEl.offsetWidth : (window.innerWidth <= 820 ? 320 : 360);
  const gap = window.innerWidth <= 820 ? 16 : 24;
  const step = cardWidth + gap;
  const singleHalfWidth = track.scrollWidth / 2;
  recordsTrackPos += step;
  if (recordsTrackPos > 0) {
    recordsTrackPos -= singleHalfWidth;
  }
  track.style.transition = 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)';
  track.style.transform = `translate3d(${recordsTrackPos}px, 0, 0)`;

  recordsResumeTimeout = setTimeout(() => {
    if (track) track.style.transition = 'none';
    recordsIsManualSliding = false;
    recordsIsHovered = false;
  }, 1800);
};

window.goToRecordSlide = function(idx) {
  const track = document.getElementById('recordsCarouselTrack');
  if (!track) return;
  const cardEl = track.querySelector('.record-item');
  const cardWidth = cardEl ? cardEl.offsetWidth : (window.innerWidth <= 820 ? 320 : 360);
  const gap = window.innerWidth <= 820 ? 16 : 24;
  const step = cardWidth + gap;
  recordsTrackPos = -(idx * step);
  track.style.transition = 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)';
  track.style.transform = `translate3d(${recordsTrackPos}px, 0, 0)`;
  setTimeout(() => { if (track) track.style.transition = 'none'; }, 480);
};

function renderRecordsEditorial(recordsList) {
  const track = document.getElementById('recordsCarouselTrack');
  if (!track || !Array.isArray(recordsList) || recordsList.length === 0) return;
  cachedRecordsData = recordsList;

  const renderSingle = (rec, idx, isDup) => {
    const photo = rec.img || 'assets/photos/huracan_rdrc_stage_line.jpg';
    const enMeta = (typeof recordTranslationsEn !== 'undefined' && recordTranslationsEn[rec.id]) ? recordTranslationsEn[rec.id] : {};
    const carName = rec.car || 'GTT Spec';
    const descText = (typeof currentLang !== 'undefined' && currentLang === 'en' && enMeta.desc) ? enMeta.desc : (rec.desc || '');
    const num = String((idx % 16) + 1).padStart(2, '0');
    const dupAttr = isDup ? '_dup' : '';

    let eventPill = rec.eventPill || rec.year || 'GTT RECORD';
    if (typeof currentLang !== 'undefined' && currentLang === 'en' && enMeta.year) {
      eventPill = enMeta.year;
    }

    let heroTime = rec.heroTime;
    let heroUnit = rec.heroUnit || 'СЕК';
    let heroSpeed = rec.heroSpeed;

    if (!heroTime || !heroSpeed) {
      const tel = rec.telemetry || '';
      const secMatch = tel.match(/([\d\.]+)\s*сек/i);
      const kmhMatch = tel.match(/([\d\.]+)\s*км\/ч/i);
      if (secMatch) {
        heroTime = secMatch[1];
        heroUnit = 'СЕК';
        if (kmhMatch) {
          heroSpeed = `${kmhMatch[1]} КМ/Ч • ${tel.includes('1/2') ? '1/2 МИЛИ' : tel.includes('1 миля') ? '1 МИЛЯ' : '1/4 МИЛИ'}`;
        } else {
          heroSpeed = tel.replace(/1\/4\s*мили:?\s*/i, '').replace(/1\/2\s*мили:?\s*/i, '').trim();
        }
      } else if (kmhMatch) {
        heroTime = kmhMatch[1];
        heroUnit = 'КМ/Ч';
        heroSpeed = tel.replace(/[\d\.]+\s*км\/ч/i, '').replace(/^[•:\s]+|[•:\s]+$/g, '').trim() || 'МАКСИМАЛЬНАЯ СКОРОСТЬ';
      } else {
        heroTime = 'GTT';
        heroUnit = 'RECORD';
        heroSpeed = tel || 'OFFICIAL TELEMETRY';
      }
    }

    if (typeof currentLang !== 'undefined' && currentLang === 'en') {
      if (heroUnit === 'СЕК') heroUnit = 'SEC';
      if (heroUnit === 'КМ/Ч') heroUnit = 'KM/H';

      if (heroSpeed) {
        heroSpeed = heroSpeed
          .replace(/КМ\/Ч/gi, 'KM/H')
          .replace(/1\/4\s*МИЛИ/gi, '1/4 MILE')
          .replace(/1\/2\s*МИЛИ/gi, '1/2 MILE')
          .replace(/1\s*МИЛЯ/gi, '1 MILE')
          .replace(/1\s*КМ\s*С\s*МЕСТА(\s*ПО\s*ЛЬДУ|\s*НА\s*ЛЬДУ)?/gi, '1 KM STANDING START')
          .replace(/СУПЕРКУБОК\s*RDRC/gi, 'RDRC SUPERCUP')
          .replace(/РЕКОРД\s*РОССИИ/gi, 'RUSSIAN RECORD')
          .replace(/РЕКОРД\s*ЕВРОПЫ/gi, 'EUROPEAN RECORD')
          .replace(/МИРОВОЙ\s*РЕКОРД/gi, 'WORLD RECORD')
          .replace(/РЕКОРД\s*БЫКОВО/gi, 'BYKOVO TRACK RECORD')
          .replace(/МАКСИМАЛЬНАЯ\s*СКОРОСТЬ/gi, 'TOP SPEED');
      }
    }

    const customPos = rec.object_position || rec.objectPosition || '';
    const posAttr = customPos ? ` style="object-position: ${customPos};" data-custom-pos="true"` : '';

    return `
      <div class="record-item" data-id="${rec.id || idx}${dupAttr}">
        <div class="record-photo-wrapper">
          <img src="${photo}" 
               alt="${carName}" 
               class="record-photo-img"${posAttr}
               decoding="async"
               onload="handleRecordImgLoad(this)"
               onerror="this.src='assets/photos/huracan_rdrc_stage_line.jpg'">
          <div class="record-photo-overlay"></div>
          <div class="record-photo-badges">
            <span class="record-event-pill">${eventPill}</span>
            <span class="record-num-pill">#${num}</span>
          </div>
        </div>
        <div class="record-content-box">
          <div class="record-stat-row">
            <span class="record-hero-time">${heroTime} <span class="record-hero-unit">${heroUnit}</span></span>
            <span class="record-hero-speed">${heroSpeed}</span>
          </div>
          <h3 class="record-car-title">${carName}</h3>
          <p class="record-car-desc">${descText}</p>
        </div>
      </div>
    `;
  };

  const primaryCards = recordsList.map((r, i) => renderSingle(r, i, false)).join('');
  const duplicateCards = recordsList.map((r, i) => renderSingle(r, i, true)).join('');
  track.innerHTML = primaryCards + duplicateCards;

  initRecordsCarousel();
}

function initRecordsCarousel() {
  const stage = document.querySelector('.records-carousel-stage');
  const viewport = document.getElementById('recordsCarouselViewport');
  const track = document.getElementById('recordsCarouselTrack');
  if (!track) return;

  if (recordsRafId) {
    cancelAnimationFrame(recordsRafId);
  }
  recordsRafId = requestAnimationFrame(stepRecordsContinuousMotion);

  if (stage && !stage._recordsListenersAttached) {
    stage._recordsListenersAttached = true;

    // Helper: Seamless infinite loop position wrapping
    const wrapRecordsPosition = () => {
      const singleHalfWidth = track.scrollWidth / 2;
      if (singleHalfWidth > 100) {
        while (Math.abs(recordsTrackPos) >= singleHalfWidth) {
          recordsTrackPos += singleHalfWidth;
        }
        while (recordsTrackPos > 0) {
          recordsTrackPos -= singleHalfWidth;
        }
      } else {
        recordsTrackPos = 0;
      }
    };

    // 1. Smooth pause on hover (desktop cursor only)
    stage.addEventListener('mouseenter', () => { 
      if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        recordsIsHovered = true; 
      }
    });
    stage.addEventListener('mouseleave', () => { 
      recordsIsHovered = false; 
    });

    // 2. Multi-Device Swipe & Drag Engine (Mouse, Touch, Tablet Stylus, Trackpad)
    let isPointerDown = false;
    let pointerStartX = 0;
    let pointerStartY = 0;
    let pointerInitialPos = 0;
    let lastPointerX = 0;
    let lastPointerTime = 0;
    let pointerVelocityX = 0;
    let isHorizontalGesture = false;
    let hasMovedSignificantly = false;

    const onPointerDown = (clientX, clientY) => {
      isPointerDown = true;
      recordsIsHovered = true; // immediately pause smooth drift on touch/press
      pointerStartX = clientX;
      pointerStartY = clientY;
      lastPointerX = clientX;
      lastPointerTime = performance.now();
      pointerVelocityX = 0;
      pointerInitialPos = recordsTrackPos;
      isHorizontalGesture = false;
      hasMovedSignificantly = false;
    };

    const onPointerMove = (clientX, clientY, e) => {
      if (!isPointerDown) return;

      const deltaX = clientX - pointerStartX;
      const deltaY = clientY - pointerStartY;

      if (!hasMovedSignificantly) {
        if (Math.abs(deltaX) > 8 || Math.abs(deltaY) > 8) {
          hasMovedSignificantly = true;
          isHorizontalGesture = Math.abs(deltaX) > Math.abs(deltaY);
          if (isHorizontalGesture) {
            recordsIsManualSliding = true;
            clearTimeout(recordsResumeTimeout);
            if (track) track.style.transition = 'none';
            if (viewport) viewport.classList.add('is-dragging');
          }
        }
      }

      if (hasMovedSignificantly && isHorizontalGesture) {
        if (e && e.cancelable) e.preventDefault();

        const now = performance.now();
        const dt = now - lastPointerTime;
        if (dt > 10) {
          pointerVelocityX = (clientX - lastPointerX) / dt;
          lastPointerX = clientX;
          lastPointerTime = now;
        }

        recordsTrackPos = pointerInitialPos + deltaX;
        wrapRecordsPosition();
        if (track) track.style.transform = `translate3d(${recordsTrackPos}px, 0, 0)`;
      }
    };

    const onPointerUp = () => {
      if (!isPointerDown) return;
      isPointerDown = false;
      if (viewport) viewport.classList.remove('is-dragging');

      if (hasMovedSignificantly && isHorizontalGesture) {
        if (window.innerWidth <= 820) {
          const cardEl = track.querySelector('.record-item');
          const cardWidth = cardEl ? cardEl.offsetWidth : 320;
          const gap = 16;
          const step = cardWidth + gap;
          let targetSlot = Math.round(recordsTrackPos / step);
          recordsTrackPos = targetSlot * step;
          wrapRecordsPosition();
          if (track) {
            track.style.transition = 'transform 0.42s cubic-bezier(0.16, 1, 0.3, 1)';
            track.style.transform = `translate3d(${recordsTrackPos}px, 0, 0)`;
          }
          clearTimeout(recordsResumeTimeout);
          recordsResumeTimeout = setTimeout(() => {
            if (track) track.style.transition = 'none';
            recordsIsManualSliding = false;
            recordsIsHovered = false;
          }, 1800);
          return;
        }

        // Inertial flick / momentum
        const absVel = Math.abs(pointerVelocityX);
        if (absVel > 0.35) {
          const momentum = Math.max(-800, Math.min(800, pointerVelocityX * 240));
          recordsTrackPos += momentum;
          wrapRecordsPosition();
          if (track) {
            track.style.transition = 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)';
            track.style.transform = `translate3d(${recordsTrackPos}px, 0, 0)`;
          }
          recordsResumeTimeout = setTimeout(() => {
            if (track) track.style.transition = 'none';
            recordsIsManualSliding = false;
            recordsIsHovered = false;
          }, 350);
          return;
        }

        // Fast resume: 150ms after manual swipe release
        recordsResumeTimeout = setTimeout(() => {
          recordsIsManualSliding = false;
          recordsIsHovered = false;
        }, 150);
      } else {
        recordsIsManualSliding = false;
        recordsIsHovered = false;
      }
    };

    // --- Touch Listeners (Mobile & Tablet) ---
    const targetElement = viewport || stage;

    targetElement.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        onPointerDown(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    targetElement.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1) {
        onPointerMove(e.touches[0].clientX, e.touches[0].clientY, e);
      }
    }, { passive: false });

    targetElement.addEventListener('touchend', () => {
      onPointerUp();
    }, { passive: true });

    targetElement.addEventListener('touchcancel', () => {
      onPointerUp();
    }, { passive: true });

    // --- Mouse Drag Listeners (Laptop & Desktop) ---
    targetElement.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return; // Primary left button only
      onPointerDown(e.clientX, e.clientY);
      e.preventDefault();
    });

    window.addEventListener('mousemove', (e) => {
      if (isPointerDown) {
        onPointerMove(e.clientX, e.clientY, e);
      }
    });

    window.addEventListener('mouseup', () => {
      if (isPointerDown) {
        onPointerUp();
      }
    });

    // Prevent accidental clicks on cards during drag
    targetElement.addEventListener('click', (e) => {
      if (hasMovedSignificantly) {
        e.preventDefault();
        e.stopPropagation();
      }
    }, true);

    // --- Trackpad Horizontal Swipe & Shift+Wheel (Laptop & Desktop) ---
    targetElement.addEventListener('wheel', (e) => {
      const dx = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : (e.shiftKey ? e.deltaY : 0);
      if (Math.abs(dx) > 3) {
        e.preventDefault();
        recordsIsManualSliding = true;
        clearTimeout(recordsResumeTimeout);

        recordsTrackPos -= dx * 1.15;
        wrapRecordsPosition();
        if (track) {
          track.style.transition = 'none';
          track.style.transform = `translate3d(${recordsTrackPos}px, 0, 0)`;
        }

        recordsResumeTimeout = setTimeout(() => {
          recordsIsManualSliding = false;
        }, 1200);
      }
    }, { passive: false });
  }
}

async function syncRecordsFromAPI() {
  let recordsToUse = defaultRecords;
  try {
    const local = localStorage.getItem('gtt_admin_records_db') || localStorage.getItem('gtt_records_v2');
    if (local) {
      const parsed = JSON.parse(local);
      if (Array.isArray(parsed) && parsed.length >= 10) {
        recordsToUse = parsed;
      }
    }
  } catch (e) {}

  cachedRecordsData = recordsToUse;
  try {
    localStorage.setItem('gtt_admin_records_db', JSON.stringify(recordsToUse));
    localStorage.setItem('gtt_records_v2', JSON.stringify(recordsToUse));
  } catch (e) {}
  renderRecordsEditorial(recordsToUse);

  try {
    const res = await fetch('/api/records');
    if (!res.ok) return;
    const serverRecs = await res.json();
    if (Array.isArray(serverRecs) && serverRecs.length > 0) {
      cachedRecordsData = serverRecs;
      localStorage.setItem('gtt_admin_records_db', JSON.stringify(serverRecs));
      localStorage.setItem('gtt_records_v2', JSON.stringify(serverRecs));
      renderRecordsEditorial(serverRecs);
    }
  } catch (err) {}
}

// Multi-Tab Real-Time Sync Listener
window.addEventListener('storage', (e) => {
  if (e.key === 'gtt_admin_cars_db' || e.key === 'gtt_projects_v2') {
    syncProjectsFromAPI();
  } else if (e.key === 'gtt_admin_team_db' || e.key === 'gtt_team_v2') {
    syncTeamFromAPI();
  } else if (e.key === 'gtt_admin_gallery_db') {
    syncGalleryFromAPI();
  } else if (e.key === 'gtt_admin_records_db' || e.key === 'gtt_records_v2') {
    syncRecordsFromAPI();
  } else if (e.key === 'gtt_admin_partners_db') {
    syncPartnersFromAPI();
  } else if (e.key === 'gtt_admin_moto_db') {
    syncMotoFromAPI();
  } else if (e.key === 'gtt_hero_telemetry_custom') {
    if (typeof applyCustomHeroTelemetry === 'function') applyCustomHeroTelemetry();
  }
});

if (window.BroadcastChannel) {
  try {
    const ch = new BroadcastChannel('gtt_channel');
    ch.onmessage = (e) => {
      if (e.data && e.data.type === 'records_updated' && Array.isArray(e.data.records)) {
        cachedRecordsData = e.data.records;
        renderRecordsEditorial(e.data.records);
      } else if (e.data && e.data.type === 'projects_updated' && Array.isArray(e.data.projects)) {
        applyCarsData(e.data.projects);
      } else if (e.data && e.data.type === 'team_updated') {
        syncTeamFromAPI();
      } else if (e.data && e.data.type === 'gallery_updated') {
        syncGalleryFromAPI();
      } else if (e.data && e.data.type === 'partners_updated') {
        if (Array.isArray(e.data.partners)) {
          renderPartnersMarquee(e.data.partners);
          renderPartnersGrid(e.data.partners);
        } else {
          syncPartnersFromAPI();
        }
      } else if (e.data && e.data.type === 'moto_updated') {
        if (Array.isArray(e.data.moto)) {
          renderMotoGrid(e.data.moto);
        } else {
          syncMotoFromAPI();
        }
      }
    };
  } catch (err) {}
}

let currentTeamDept = 'all';
let isTeamExpanded = false;

function getDeptByRole(role) {
  if (!role) return 'reserve';
  const r = role.toLowerCase();
  if (r.includes('основатель') || r.includes('директор') || r.includes('администратор') || r.includes('делопроизводитель')) return 'management';
  if (r.includes('инженер') || r.includes('моторист') || r.includes('диагност') || r.includes('электрик') || r.includes('калибровщик') || r.includes('телеметри')) return 'engineers';
  if (r.includes('механик')) return 'mechanics';
  if (r.includes('сварщик') || r.includes('фабрикатор')) return 'fab';
  return 'reserve';
}

function updateTeamVisibility() {
  const cards = document.querySelectorAll('#teamGrid .team-card');
  const expandWrap = document.getElementById('teamExpandWrap');
  const expandBtn = document.getElementById('btnTeamExpand');
  const expandText = document.getElementById('teamExpandText');

  let visibleCount = 0;
  let totalMatching = 0;

  cards.forEach(card => {
    let dept = card.getAttribute('data-team-dept');
    if (!dept) {
      const roleText = card.querySelector('.team-role')?.textContent || '';
      dept = getDeptByRole(roleText);
      card.setAttribute('data-team-dept', dept);
    }

    const matches = (currentTeamDept === 'all') || (dept === currentTeamDept);
    if (!matches) {
      card.style.display = 'none';
      return;
    }

    totalMatching++;
    if (currentTeamDept === 'all' && !isTeamExpanded && totalMatching > 8) {
      card.style.display = 'none';
    } else {
      card.style.display = 'flex';
      visibleCount++;
    }
  });

  if (expandWrap) {
    if (currentTeamDept === 'all' && cards.length > 8) {
      expandWrap.style.display = 'flex';
      if (expandBtn) expandBtn.classList.toggle('is-expanded', isTeamExpanded);
      if (expandText) {
        if (currentLang === 'en') {
          expandText.textContent = isTeamExpanded 
            ? 'Collapse Crew Roster' 
            : `Show Full Crew (another ${cards.length - 8} specialists)`;
        } else {
          expandText.textContent = isTeamExpanded 
            ? 'Свернуть состав команды' 
            : `Показать всю команду (ещё ${cards.length - 8} специалистов)`;
        }
      }
    } else {
      expandWrap.style.display = 'none';
    }
  }
}

window.filterTeamDepartment = function(dept) {
  currentTeamDept = dept;
  document.querySelectorAll('#teamFilterPills .filter-pill').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-team-dept') === dept);
  });
  updateTeamVisibility();
};

window.toggleTeamExpand = function() {
  isTeamExpanded = !isTeamExpanded;
  updateTeamVisibility();
};

function renderTeamGrid(teamList) {
  const grid = document.getElementById('teamGrid');
  if (!grid || !Array.isArray(teamList)) return;
  grid.innerHTML = teamList.map(m => {
    const asset = defaultTeamPhotos[m.id] || { photo: 'assets/photos/gtt_shield_logo.svg', social: '' };
    let photo = m.photo || asset.photo;
    if (!photo || photo.includes('tildacdn.com')) {
      photo = asset.photo;
    }
    const social = m.social !== undefined ? m.social : asset.social;
    const rawId = m.id || '';
    const num = rawId.replace(/\D/g, '');
    const dept = getDeptByRole(m.role);
    let displayRole = m.role;
    let displayName = m.name;

    if (currentLang === 'en') {
      if (num && i18n.en[`team_role_${num}`]) {
        displayRole = i18n.en[`team_role_${num}`];
      }
      if (num && i18n.en[`team_name_${num}`]) {
        displayName = i18n.en[`team_name_${num}`];
      }
    } else {
      if (num && i18n.ru[`team_role_${num}`]) {
        displayRole = i18n.ru[`team_role_${num}`];
      }
      if (num && i18n.ru[`team_name_${num}`]) {
        displayName = i18n.ru[`team_name_${num}`];
      }
    }

    return `
      <div class="team-card" data-team-dept="${dept}">
        <div class="team-card-photo">
          <img src="${photo}" alt="${displayName}" loading="lazy" onerror="if(this.src!=='${asset.photo}'){this.src='${asset.photo}';}else{this.src='assets/photos/gtt_shield_logo.svg';}">
        </div>
        <div class="team-card-body">
          <span class="team-role">${displayRole}</span>
          <h3 class="team-name">${displayName}</h3>
          ${social ? `<span class="team-social">${social}</span>` : ''}
        </div>
      </div>
    `;
  }).join('');
  updateTeamVisibility();
}

// Reliable Multi-Platform Hero Video Engine (iOS Low Power, Safari & Android Autoplay Support)
function setupHeroVideo() {
  const heroVideo = document.querySelector('.hero-video-bg');
  if (!heroVideo) return;

  // Strict browser autoplay requirements
  heroVideo.muted = true;
  heroVideo.defaultMuted = true;
  heroVideo.playsInline = true;
  heroVideo.setAttribute('muted', '');
  heroVideo.setAttribute('playsinline', '');
  heroVideo.setAttribute('webkit-playsinline', '');

  function attemptPlay() {
    heroVideo.muted = true;
    const playPromise = heroVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        attachInteractionFallback();
      });
    }
  }

  function attachInteractionFallback() {
    const events = ['touchstart', 'pointerdown', 'mousedown', 'scroll', 'click', 'keydown'];
    const onAction = () => {
      heroVideo.muted = true;
      heroVideo.play().catch(() => {});
      events.forEach(evt => window.removeEventListener(evt, onAction));
    };
    events.forEach(evt => window.addEventListener(evt, onAction, { passive: true, once: true }));
  }

  attemptPlay();
  heroVideo.addEventListener('loadedmetadata', attemptPlay, { once: true });
  heroVideo.addEventListener('canplay', attemptPlay, { once: true });

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && heroVideo.paused) {
      attemptPlay();
    }
  });
}

// Clean Premium Motorsport Preloader (Fast, Seamless & Silky Smooth)
function initPreloader() {
  const preloader = document.getElementById('preloader');
  const fill = document.getElementById('preloaderFill');
  
  window.scrollTo(0, 0);
  setupHeroVideo();

  let finished = false;
  const startTime = performance.now();
  const minDuration = 700; // Fast and energetic

  function frame(now) {
    if (finished) return;
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / minDuration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const percent = Math.min(Math.round(eased * 100), 100);

    if (fill) fill.style.width = `${percent}%`;

    if (progress >= 1) {
      finished = true;
      if (fill) fill.style.width = '100%';
      setTimeout(() => {
        const heroVideo = document.querySelector('.hero-video-bg');
        if (heroVideo && heroVideo.paused) {
          heroVideo.muted = true;
          heroVideo.play().catch(() => {});
        }
        if (preloader) {
          preloader.classList.add('fade-out');
          document.body.classList.remove('is-loading');
          window.scrollTo(0, 0);
          setTimeout(() => {
            preloader.style.display = 'none';
          }, 600);
        }
      }, 50);
    } else {
      requestAnimationFrame(frame);
    }
  }

  requestAnimationFrame(frame);
}

// Master division switcher (Cars & Moto)
window.switchShowroomDivision = function(type) {
  const btnCars = document.getElementById('divBtnCars');
  const btnMoto = document.getElementById('divBtnMoto');
  const garageSection = document.getElementById('garage');
  const motoSection = document.getElementById('moto');

  if (type === 'cars') {
    if (btnCars) btnCars.classList.add('active');
    if (btnMoto) btnMoto.classList.remove('active');
    if (garageSection) {
      garageSection.scrollIntoView({ behavior: 'smooth' });
    }
  } else if (type === 'moto') {
    if (btnCars) btnCars.classList.remove('active');
    if (btnMoto) btnMoto.classList.add('active');
    if (motoSection) {
      motoSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
};

function convertGoogleDriveUrl(url) {
  if (!url || typeof url !== 'string') return url || '';
  const trimmed = url.trim();
  const matchFile = trimmed.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (matchFile && matchFile[1]) {
    return `https://lh3.googleusercontent.com/d/${matchFile[1]}`;
  }
  const matchId = trimmed.match(/drive\.google\.com\/(?:open|uc)\?[^#]*id=([a-zA-Z0-9_-]+)/);
  if (matchId && matchId[1]) {
    return `https://lh3.googleusercontent.com/d/${matchId[1]}`;
  }
  return trimmed;
}

function formatSpecVal(val, lang, type) {
  let str = (typeof val === 'object' && val !== null) ? (val[lang] || val.ru || val.en || '') : String(val || '').trim();
  if (str === '—' || str === '-') {
    return '—';
  }
  const isDashOrEmpty = !str || str === 'undefined' || 
    str === '- HP' || str === '— HP' || 
    str === '- сек' || str === '— сек' || str === '- sec' || str === '— sec' || 
    str === '- км/ч' || str === '— км/ч' || str === '- km/h' || str === '— km/h';

  if (isDashOrEmpty) {
    return '—';
  }
  if (lang === 'en') {
    if (type === 'quarterMile') {
      return str.replace(/сек\.?/gi, 'sec').replace(/\bс\b/gi, 'sec');
    }
    if (type === 'topSpeed') {
      return str.replace(/км\/ч/gi, 'km/h');
    }
    if (type === 'hp') {
      return str.replace(/л\.?с\.?/gi, 'HP');
    }
  } else {
    if (type === 'quarterMile') {
      return str.replace(/sec\.?/gi, 'сек').replace(/\bs\b/gi, 'сек');
    }
    if (type === 'topSpeed') {
      return str.replace(/km\/h/gi, 'км/ч');
    }
  }
  return str;
}

function formatGarageExpandText(remaining, isExpanded, lang) {
  if (isExpanded) {
    return lang === 'ru' ? 'Свернуть каталог проектов' : 'Collapse Projects Catalog';
  }
  if (lang === 'ru') {
    const mod10 = remaining % 10;
    const mod100 = remaining % 100;
    let word = 'болидов';
    if (mod100 < 11 || mod100 > 19) {
      if (mod10 === 1) word = 'болид';
      else if (mod10 >= 2 && mod10 <= 4) word = 'болида';
    }
    return `Показать все проекты (ещё ${remaining} ${word})`;
  }
  return `Show All Projects (+${remaining} builds)`;
}

let isGarageExpanded = false;

window.toggleGarageExpand = function() {
  isGarageExpanded = !isGarageExpanded;
  const activeFilter = document.querySelector('#carsFilterPills .filter-pill.active')?.getAttribute('data-filter') || 'all';
  renderGarageGrid(activeFilter);
};

window.handleCarCardImgLoad = function(imgEl, configuredPos) {
  if (!imgEl || !imgEl.naturalWidth || !imgEl.naturalHeight) return;
  // Systematic detection: if the photo is portrait / vertical (height > width * 1.12)
  const isPortrait = imgEl.naturalHeight > imgEl.naturalWidth * 1.12;
  if (isPortrait) {
    imgEl.classList.add('is-portrait-car-photo');
    // If no custom offset was specifically configured or it's default center center / center 50%,
    // automatically pin to center 80% so wheels, bumper and grill are always in full view!
    if (!configuredPos || configuredPos === 'center center' || configuredPos === 'center 50%') {
      imgEl.style.setProperty('object-position', 'center 80%', 'important');
    }
  }
};

// Render Garage Grid with smooth animation & bilingual support
function renderGarageGrid(filterType) {
  const container = document.getElementById('garageGrid');
  if (!container) return;

  container.classList.add('filtering');

  const countEl = document.getElementById('divCarsCount');
  if (countEl) countEl.textContent = gttProjects.length;

  setTimeout(() => {
    // 1. Filter items
    let filtered = (filterType === 'all')
      ? [...gttProjects]
      : gttProjects.filter(c => c.type === filterType);

    // 2. Pagination for 'all' filter (flagship featured builds shown first, rest expandable)
    const expandWrap = document.getElementById('garageExpandWrap');
    const expandBtn = document.getElementById('btnGarageExpand');
    const expandText = document.getElementById('garageExpandText');

    const featuredCount = gttProjects.filter(c => c.isFeatured || c.is_featured === 1 || c.is_featured === true).length || 4;

    let displayList = filtered;
    if (filterType === 'all') {
      if (!isGarageExpanded && filtered.length > featuredCount) {
        displayList = filtered.slice(0, featuredCount);
        container.classList.add('is-collapsed-4');
        if (expandWrap) expandWrap.style.display = 'flex';
        if (expandBtn) expandBtn.classList.remove('is-expanded');
        if (expandText) expandText.textContent = formatGarageExpandText(filtered.length - featuredCount, false, currentLang);
      } else {
        container.classList.remove('is-collapsed-4');
        if (expandWrap) expandWrap.style.display = 'flex';
        if (expandBtn) expandBtn.classList.add('is-expanded');
        if (expandText) expandText.textContent = formatGarageExpandText(0, true, currentLang);
      }
    } else {
      container.classList.remove('is-collapsed-4');
      if (expandWrap) expandWrap.style.display = 'none';
    }

    const featuredCarsSet = new Set(gttProjects.filter(c => c.isFeatured || c.is_featured === 1 || c.is_featured === true).map(c => c.id));
    if (featuredCarsSet.size === 0) {
      gttProjects.slice(0, 4).forEach(c => featuredCarsSet.add(c.id));
    }

    container.innerHTML = displayList.map((car, idx) => {
      const name = (typeof car.name === 'object') ? (car.name[currentLang] || car.name.ru) : car.name;
      const desc = (typeof car.desc === 'object') ? (car.desc[currentLang] || car.desc.ru) : car.desc;
      const badge = (typeof car.badge === 'object') ? (car.badge[currentLang] || car.badge.ru) : car.badge;
      const tag = (typeof car.tag === 'object') ? (car.tag[currentLang] || car.tag.ru) : car.tag;
      const isClass = car.isClassified || (car.img && (car.img.includes('classified') || car.img.endsWith('.svg')));

      const isNewCar = Boolean(car.isNew);
      const isTopFeatured = featuredCarsSet.has(car.id);
      const showVideoBtn = isTopFeatured && Boolean(car.videoSrc || car.youtubeId);

      return `
      <div class="car-card car-card-fade-in ${isClass ? 'is-classified' : ''} ${isNewCar ? 'is-new-car-pending' : ''}" data-id="${car.id}" onclick="openCarModal('${car.id}')" style="cursor: pointer; animation-delay: ${idx * 0.04}s">
        ${isNewCar 
          ? `<span class="car-card-badge is-new-badge">${currentLang === 'ru' ? 'НОВЫЙ ПРОЕКТ // ВЫБОР ФОТО' : 'NEW BUILD // PENDING PHOTO'}</span>` 
          : `<span class="car-card-badge">${badge}</span>`
        }
        <div class="car-card-media ${isClass ? 'classified-media' : ''}" style="position: relative;">
          ${isNewCar ? `
            <div class="card-question-overlay">
              <div class="card-question-icon">?</div>
            </div>
          ` : ''}
          <img class="car-card-img ${car.isPhoto ? 'photo-fit' : ''}" 
               src="${convertGoogleDriveUrl(car.img)}" 
               alt="${name}" 
               style="${car.objectPosition ? `object-position: ${car.objectPosition} !important;` : ''}"
               onload="handleCarCardImgLoad(this, '${escapeJS(car.objectPosition || '')}')"
               onerror="this.onerror=null; this.src='${car.fallbackImg || 'assets/cars/gtt_classified_car.svg'}';">
        </div>
        <div class="car-card-info">
          <div class="car-brand">${tag || car.brand}</div>
          <h3 class="car-model-title">${name}</h3>
          <p class="car-card-desc">${desc}</p>
          <div class="car-specs-row">
            <div class="spec-cell">
              <div class="spec-val">${formatSpecVal(car.hp, currentLang, 'hp')}</div>
              <div class="spec-lbl">${i18n[currentLang].spec_power}</div>
            </div>
            <div class="spec-cell">
              <div class="spec-val">${formatSpecVal(car.quarterMile, currentLang, 'quarterMile')}</div>
              <div class="spec-lbl">${i18n[currentLang].spec_402}</div>
            </div>
            <div class="spec-cell">
              <div class="spec-val">${formatSpecVal(car.topSpeed, currentLang, 'topSpeed')}</div>
              <div class="spec-lbl">${i18n[currentLang].spec_speed}</div>
            </div>
          </div>
          <div class="car-card-footer">
            ${showVideoBtn ? `
              <button class="btn-card-details btn-card-video" onclick="event.stopPropagation(); openCarVideo('${car.id}')">
                <span>▶</span> ${currentLang === 'ru' ? 'Видео заезда' : 'Race Video'}
              </button>
            ` : ''}
            <button class="btn-card-details" onclick="event.stopPropagation(); openCarModal('${car.id}')">${i18n[currentLang].btn_passport}</button>
          </div>
        </div>
      </div>
      `;
    }).join('');

    container.classList.remove('filtering');
    if (window.apply3DTiltCards) window.apply3DTiltCards();
  }, 140);
}

// ==========================================================================
// INTERACTIVE MOTO STAGE (BMW / YAMAHA / DUCATI) & EXHAUST SOUND SYNTHESIZER
// ==========================================================================
const superbikeModels = {
  bmw: {
    title: 'BMW M1000RR M-Performance',
    desc: 'Личный боевой супербайк Гоши BMW M1000RR M-Performance. Полный цикл спортивной калибровки ECU, снятие заводских лимитов, титановые выхлопные трассы ручной сварки и сухой автоклавный карбон.',
    spec1: '212 л.с. при 14 500 об/мин • Сухой вес 168 кг',
    spec2: 'Титановый выпуск Akrapovic Full System с отстрелами огнем',
    spec3: 'M-Winglets карбоновые крылья с прижимной силой 16.3 кг',
    revPitch: 1.0
  },
  yamaha: {
    title: 'Yamaha YZF-R1M Carbon Edition',
    desc: 'Гоночная версия с полным карбоновым обвесом, крестообразным коленвалом Crossplane CP4 и активной подвеской Ohlins Electronic Racing Suspension.',
    spec1: '200 л.с. при 13 500 об/мин • Сухой вес 170 кг',
    spec2: 'Гоночный квикшифтер вверх/вниз без сцепления QSS',
    spec3: 'Двухканальная телеметрия Y-TRAC с GPS-логгером углов наклона',
    revPitch: 0.92
  },
  ducati: {
    title: 'Ducati Panigale V4 RDRC Spec',
    desc: 'Итальянский супербайк с двигателем Desmosedici Stradale V4 90°, сухим сцеплением STM EVO-SBK и аэродинамикой MotoGP.',
    spec1: '215 л.с. при 13 000 об/мин • Сухой вес 172 кг',
    spec2: 'Титановая система GTT Moto Exhaust с лаунч-отстрелами',
    spec3: 'Сухое сцепление STM EVO-SBK с открытой крышкой карбон',
    revPitch: 0.85
  }
};

window.switchSuperbikeModel = function(modelKey) {
  const model = superbikeModels[modelKey];
  if (!model) return;

  document.querySelectorAll('.moto-stage-tab').forEach(t => t.classList.remove('active'));
  const activeTab = event?.currentTarget || document.querySelector(`.moto-stage-tab[onclick*="${modelKey}"]`);
  if (activeTab) activeTab.classList.add('active');

  const titleEl = document.getElementById('motoHeroTitle');
  const descEl = document.getElementById('motoHeroDesc');
  const s1 = document.getElementById('motoSpec1');
  const s2 = document.getElementById('motoSpec2');
  const s3 = document.getElementById('motoSpec3');

  if (titleEl) titleEl.textContent = model.title;
  if (descEl) descEl.textContent = model.desc;
  if (s1) s1.textContent = model.spec1;
  if (s2) s2.textContent = model.spec2;
  if (s3) s3.textContent = model.spec3;
};

// Interactive Founder Photo Switcher
const founderPhotos = [
  {
    src: 'assets/photos/gosha_strip_selfie.jpg',
    caption: {
      ru: 'Гоша на дрэг-стрипе RDRC',
      en: 'Gosha on the RDRC Drag Strip'
    }
  },
  {
    src: 'assets/photos/gosha_zadorkin_new.jpg',
    caption: {
      ru: 'Гоша Перцхелия — Основатель GTT',
      en: 'Gosha Pertskheliya — GTT Founder'
    }
  },
  {
    src: 'assets/photos/gosha_on_track.jpg',
    caption: {
      ru: 'Контроль боевого выезда на клей',
      en: 'Track VHT Glue Launch Prep'
    }
  }
];

// Preload all founder photos immediately into browser cache
founderPhotos.forEach(item => {
  const p = new Image();
  p.src = item.src;
});

let currentFounderIndex = 0;
let isFounderAnimating = false;

window.switchFounderPhoto = function(step, explicitDir) {
  if (isFounderAnimating) return;
  const direction = explicitDir !== undefined ? explicitDir : (step > 0 ? 1 : -1);
  currentFounderIndex = (currentFounderIndex + step + founderPhotos.length) % founderPhotos.length;
  updateFounderPhoto(direction);
};

window.setFounderPhoto = function(idx) {
  if (isFounderAnimating || idx === currentFounderIndex) return;
  const direction = idx > currentFounderIndex ? 1 : -1;
  currentFounderIndex = idx;
  updateFounderPhoto(direction);
};

function updateFounderPhoto(direction = 1) {
  const img = document.getElementById('founderImg');
  const caption = document.getElementById('founderImgCaption');
  const dots = document.querySelectorAll('.gallery-dot');
  
  if (!img) return;

  const cur = founderPhotos[currentFounderIndex];
  if (!cur) return;

  const capText = (typeof cur.caption === 'object')
    ? (cur.caption[currentLang] || cur.caption.ru)
    : cur.caption;

  if (caption) {
    caption.style.opacity = '0';
    setTimeout(() => {
      caption.textContent = capText;
      caption.style.opacity = '1';
    }, 120);
  }

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentFounderIndex);
  });

  const curSrc = cur.src;
  const currentImgSrc = img.getAttribute('src');
  if (currentImgSrc && currentImgSrc.endsWith(curSrc)) {
    return;
  }

  isFounderAnimating = true;
  const exitX = direction > 0 ? -40 : 40;
  const enterX = direction > 0 ? 40 : -40;

  // Phase 1: Slide & fade out in the movement direction
  img.style.transition = 'transform 0.16s ease-in, opacity 0.16s ease-in, filter 0.16s ease-in';
  img.style.transform = `translateX(${exitX}px) scale(0.98)`;
  img.style.opacity = '0.2';
  img.style.filter = 'blur(3px)';

  setTimeout(() => {
    // Phase 2: Instant swap to new photo off-center
    img.src = curSrc;
    img.style.transition = 'none';
    img.style.transform = `translateX(${enterX}px) scale(0.98)`;

    // Phase 3: Smooth glide in to center
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        img.style.transition = 'transform 0.38s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.38s ease-out, filter 0.38s ease-out';
        img.style.transform = 'translateX(0) scale(1)';
        img.style.opacity = '1';
        img.style.filter = 'none';

        setTimeout(() => {
          isFounderAnimating = false;
        }, 400);
      });
    });
  }, 160);
}

// Navigation Scroll Effect & Active Section Scroll Spy
function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = Array.from(navLinks).map(link => {
    const hash = link.getAttribute('href');
    if (hash && hash.startsWith('#') && hash.length > 1) {
      return document.querySelector(hash);
    }
    return null;
  });

  function updateActiveNavLink() {
    const scrollPos = window.scrollY + 120;
    let currentIdx = -1;

    for (let i = sections.length - 1; i >= 0; i--) {
      const sec = sections[i];
      if (sec && sec.offsetTop <= scrollPos) {
        currentIdx = i;
        break;
      }
    }

    navLinks.forEach((link, idx) => {
      if (idx === currentIdx) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveNavLink();
  }, { passive: true });

  // Smooth scroll with precise navbar offset on click (desktop & mobile drawer)
  const allNavLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  allNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const hash = link.getAttribute('href');
      if (hash && hash.startsWith('#') && hash.length > 1) {
        const target = document.querySelector(hash);
        if (target) {
          e.preventDefault();
          if (typeof toggleMobileNav === 'function') {
            toggleMobileNav(false);
          }
          setTimeout(() => {
            const navHeight = window.innerWidth <= 768 ? 64 : 80;
            const targetTop = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
            window.scrollTo({
              top: Math.max(0, targetTop),
              behavior: 'smooth'
            });
          }, 40);
          navLinks.forEach(l => l.classList.remove('active'));
          if (link.classList.contains('nav-link')) link.classList.add('active');
        }
      }
    });
  });

  updateActiveNavLink();
}

// Filter Navigation
function initFilters() {
  const pills = document.querySelectorAll('#carsFilterPills .filter-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const filter = pill.getAttribute('data-filter');
      renderGarageGrid(filter);
    });
  });
}

// Car Specification Modal
function initModal() {
  const modal = document.getElementById('carModal');
  const closeBtn = document.getElementById('modalClose');

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.classList.remove('modal-open');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
      }
    });
  }
}

window.openCarModal = function(carId) {
  const car = gttProjects.find(c => c.id === carId);
  if (!car) return;

  const modalBody = document.getElementById('modalBody');
  const modal = document.getElementById('carModal');

  const name = (typeof car.name === 'object') ? (car.name[currentLang] || car.name.ru) : car.name;
  const desc = (typeof car.desc === 'object') ? (car.desc[currentLang] || car.desc.ru) : car.desc;
  const badge = (typeof car.badge === 'object') ? (car.badge[currentLang] || car.badge.ru) : car.badge;

  modalBody.innerHTML = `
    <!-- Top Header & Badges -->
    <div class="carmodal-header">
      <div class="carmodal-badges">
        <span class="carmodal-passport-tag">GTT MOTORSPORT PASSPORT</span>
        <span class="carmodal-car-badge">${badge}</span>
      </div>
      <h2 class="carmodal-title">${name}</h2>
    </div>

    <!-- Hero Media Stage (Widescreen + Atmosphere Glow) -->
    <div class="carmodal-hero-stage">
      <div class="carmodal-glow"></div>
      <img src="${convertGoogleDriveUrl(car.img)}" alt="${name}" class="carmodal-hero-img" onerror="this.onerror=null; this.src='${car.fallbackImg || 'assets/cars/gtt_classified_car.svg'}';">
    </div>

    <!-- Big 3 Telemetry Metrics Grid -->
    <div class="carmodal-metrics-grid">
      <div class="carmodal-metric-card">
        <div class="carmodal-metric-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
        </div>
        <div class="carmodal-metric-val">${formatSpecVal(car.hp, currentLang, 'hp')}</div>
        <div class="carmodal-metric-lbl">${i18n[currentLang].spec_power}</div>
      </div>
      <div class="carmodal-metric-card">
        <div class="carmodal-metric-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="8"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="9" y1="2" x2="15" y2="2"/></svg>
        </div>
        <div class="carmodal-metric-val">${formatSpecVal(car.quarterMile, currentLang, 'quarterMile')}</div>
        <div class="carmodal-metric-lbl">${i18n[currentLang].spec_402}</div>
      </div>
      <div class="carmodal-metric-card">
        <div class="carmodal-metric-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m16.2 7.8-4.2 4.2"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.9 4.9 1.4 1.4"/><path d="m17.7 17.7 1.4 1.4"/><path d="M2 12h2"/><path d="M20 12h2"/></svg>
        </div>
        <div class="carmodal-metric-val">${formatSpecVal(car.topSpeed, currentLang, 'topSpeed')}</div>
        <div class="carmodal-metric-lbl">${i18n[currentLang].spec_speed}</div>
      </div>
    </div>

    <!-- Description & Engineering Story -->
    <div class="carmodal-desc-box">
      <div class="carmodal-desc-lbl">${currentLang === 'ru' ? 'Инженерная концепция' : 'Engineering Concept'}</div>
      <p class="carmodal-desc-text">${desc}</p>
    </div>

    <!-- Technical Specification Passport -->
    <div class="carmodal-specs-section">
      <div class="carmodal-specs-header">
        <span class="carmodal-specs-title">${currentLang === 'ru' ? 'Конфигурация и компоненты' : 'Configuration & Components'}</span>
        <span class="carmodal-specs-badge">GTT RACE SPEC</span>
      </div>
      <div class="carmodal-specs-grid">
        ${Object.entries(car.specs).map(([key, val]) => `
          <div class="carmodal-spec-row">
            <span class="carmodal-spec-key">${key}</span>
            <span class="carmodal-spec-val">${val}</span>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Modal Actions Footer -->
    <div class="carmodal-footer-actions">
      ${(car.videoSrc || car.youtubeId) ? `
        <button class="carmodal-btn-video" onclick="openCarVideo('${car.id}')">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          ${currentLang === 'ru' ? 'Смотреть видео заезда' : 'Watch Race Video'}
        </button>
      ` : ''}
    </div>
  `;

  modal.classList.add('active');
  document.body.classList.add('modal-open');
};

// Dedicated Car Video Launcher
window.openCarVideo = async function(carId) {
  const car = gttProjects.find(c => c.id === carId);
  if (!car) return;
  const name = (typeof car.name === 'object') ? (car.name[currentLang] || car.name.ru) : car.name;
  
  if (car.youtubeId) {
    window.openYouTubePlayer(car.youtubeId, car.videoStart, car.videoEnd, car.videoTitle || name);
  } else if (car.videoSrc) {
    let finalSrc = car.videoSrc;
    if (typeof GTTMediaDB !== 'undefined') {
      finalSrc = await GTTMediaDB.resolveMediaUrl(car.videoSrc);
    }
    window.openVideoPlayer(finalSrc, car.videoTitle || name);
  }
};

// YouTube Video Player Modal with exact clip timestamps (start & end)
window.openYouTubePlayer = function(youtubeId, startSec, endSec, title) {
  const modal = document.getElementById('videoModal');
  const container = document.getElementById('videoContainer');
  if (!modal || !container) return;

  const startParam = startSec ? `&start=${startSec}` : '';
  const endParam = endSec ? `&end=${endSec}` : '';
  const embedUrl = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1${startParam}${endParam}`;

  container.innerHTML = `
    <div style="position: relative; width: 100%; height: 100%; min-height: 240px; display: flex; flex-direction: column;">
      ${title ? `<div class="video-overlay-title">${title}</div>` : ''}
      <iframe 
        src="${embedUrl}" 
        style="width: 100%; height: 100%; min-height: 240px; border: 0; border-radius: 12px; background: #000;" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        allowfullscreen>
      </iframe>
    </div>
  `;
  modal.classList.add('active');
};

// Video Player Modal - Handles any video source dynamically with fullscreen support & IndexedDB resolution
window.openVideoPlayer = async function(videoSrc, title) {
  const modal = document.getElementById('videoModal');
  const container = document.getElementById('videoContainer');
  if (!modal || !container) return;

  let resolvedSrc = videoSrc;
  if (typeof GTTMediaDB !== 'undefined') {
    resolvedSrc = await GTTMediaDB.resolveMediaUrl(videoSrc);
  }

  container.innerHTML = `
    <div style="position: relative; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: #000; min-height: 200px;">
      ${title ? `<div class="video-overlay-title">${title}</div>` : ''}
      
      <!-- Fullscreen Toggle Button -->
      <button class="video-fullscreen-btn" onclick="togglePlayerFullscreen()" title="Во весь экран" aria-label="Во весь экран">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
        </svg>
      </button>

      <div id="videoSpinner" style="position: absolute; z-index: 1; color: var(--gtt-orange); font-family: var(--font-mono); font-size: 11px; display: flex; flex-direction: column; align-items: center; gap: 8px; text-align: center; padding: 12px; pointer-events: none;">
        <span style="display: inline-block; width: 24px; height: 24px; border: 2.5px solid rgba(255,100,37,0.3); border-top-color: var(--gtt-orange); border-radius: 50%; animation: spin 0.8s linear infinite;"></span>
        <span>Загрузка боевого заезда...</span>
      </div>

      <div id="videoErrorFallback" style="display: none; position: absolute; inset: 0; z-index: 5; background: #0a0d14; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 24px;">
        <div style="font-size: 32px; margin-bottom: 10px;">🏁</div>
        <div style="font-family: var(--font-display); font-size: 16px; font-weight: 700; color: #fff; margin-bottom: 6px;">Видео заезда недоступно на удаленном сервере</div>
        <p style="font-size: 12px; color: var(--text-muted); max-width: 380px; line-height: 1.5; margin-bottom: 16px;">
          Файл не найден на сервере GitHub. Включите официальное видео ателье:
        </p>
        <button class="btn-primary" style="padding: 9px 20px; font-size: 12px; cursor: pointer;" onclick="window.openVideoShowreel()">Смотреть боевой лаунч R8 V10 TT</button>
      </div>

      <video id="activeModalVideo" src="${resolvedSrc}" controls playsinline webkit-playsinline preload="auto" style="position: relative; z-index: 2; width: 100%; height: 100%; object-fit: contain; background: #000;">
        Ваш браузер не поддерживает видео.
      </video>
    </div>
  `;
  modal.classList.add('active');
  document.body.classList.add('modal-open');

  const videoEl = document.getElementById('activeModalVideo');
  if (videoEl) {
    const hideSpinner = () => {
      const sp = document.getElementById('videoSpinner');
      if (sp) sp.style.display = 'none';
    };
    videoEl.addEventListener('loadeddata', hideSpinner, { once: true });
    videoEl.addEventListener('canplay', hideSpinner, { once: true });
    videoEl.addEventListener('playing', hideSpinner, { once: true });
    videoEl.addEventListener('error', () => {
      hideSpinner();
      const errorBox = document.getElementById('videoErrorFallback');
      if (errorBox) errorBox.style.display = 'flex';
      videoEl.style.display = 'none';
    }, { once: true });
    
    // Attempt smooth play, fallback to user touch on mobile policies
    const playPromise = videoEl.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        hideSpinner();
      });
    }
  }
};

// Fullscreen API helper for mobile and desktop
window.togglePlayerFullscreen = function() {
  const video = document.getElementById('activeModalVideo');
  if (!video) return;

  if (video.requestFullscreen) {
    video.requestFullscreen().catch(() => {});
  } else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen();
  } else if (video.webkitEnterFullscreen) {
    // Native iOS Safari video player fullscreen
    video.webkitEnterFullscreen();
  } else if (video.msRequestFullscreen) {
    video.msRequestFullscreen();
  }
};

// Video Showreel Modal - Plays user's real R8 video or stream
window.openVideoShowreel = function() {
  window.openVideoPlayer('assets/videos/r8_launch_action.mp4', 'Audi R8 V10 Twin Turbo — боевой лаунч RDRC');
};

window.closeVideoShowreel = function() {
  const modal = document.getElementById('videoModal');
  const container = document.getElementById('videoContainer');
  if (container) container.innerHTML = '';
  if (modal) modal.classList.remove('active');
  document.body.classList.remove('modal-open');
};

// Legal Document Reader (152-ФЗ и Публичная оферта)
window.openLegalDoc = function(type) {
  const modal = document.getElementById('legalModal');
  const title = document.getElementById('legalModalTitle');
  const content = document.getElementById('legalModalContent');
  if (!modal || !title || !content) return;

  if (type === 'privacy') {
    title.textContent = 'Политика обработки персональных данных (152-ФЗ)';
    content.innerHTML = `
      <h4>1. Общие положения</h4>
      <p>Настоящая Политика обработки персональных данных составлена в соответствии с требованиями Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных» и определяет порядок сбора, обработки и защиты информации ателье GoshaTurboTech (GTT).</p>
      
      <h4>2. Цели сбора данных</h4>
      <p>Обработка персональных данных (имя, номер телефона, аккаунт в мессенджере Telegram) осуществляется исключительно в целях оперативной консультации по тюнинг-проектам, записи на замер мощности на диностенде и согласования технического задания.</p>
      
      <h4>3. Безопасность и хранение данных</h4>
      <p>Персональные данные пользователей не передаются третьим лицам, за исключением случаев, предусмотренных действующим законодательством РФ. Данные хранятся на защищенных серверах на территории Российской Федерации (в соответствии с 242-ФЗ).</p>

      <h4>4. Использование файлов Cookie</h4>
      <p>Сайт использует технические файлы cookie для сохранения языковых настроек (RU/EN) и оптимизации отображения на мобильных устройствах.</p>
    `;
  } else if (type === 'offer') {
    title.textContent = 'Уведомление и публичная оферта (ст. 437 ГК РФ)';
    content.innerHTML = `
      <h4>1. Информационный статус</h4>
      <p>Все материалы, технические спецификации, показатели разгона, мощности (л.с.) и описания проектов, размещенные на официальном сайте GoshaTurboTech, носят исключительно ознакомительный и демонстрационный характер инженерных достижений.</p>
      
      <h4>2. Отказ от публичной оферты</h4>
      <p>Никакие опубликованные данные, ориентировочные характеристики или перечни доработок ни при каких условиях не являются публичной офертой, определяемой положениями пункта 2 Статьи 437 Гражданского кодекса Российской Федерации.</p>
      
      <h4>3. Индивидуальный расчет</h4>
      <p>Каждый проект спортивного инжиниринга, постройки Twin Turbo китов и калибровки блоков управления рассчитывается в индивидуальном порядке на основе официального договора и технического регламента ателье.</p>
    `;
  } else if (type === 'requisites') {
    title.textContent = 'Реквизиты организации';
    content.innerHTML = `
      <h4>Общество с ограниченной ответственностью «ГОШАТУРБОТЕХ»</h4>
      <table style="width: 100%; border-collapse: collapse; margin-top: 14px; font-size: 13.5px; line-height: 1.8;">
        <tbody>
          <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
            <td style="color: var(--text-muted); padding: 8px 0; width: 38%;">ОГРН:</td>
            <td style="color: #fff; font-family: var(--font-mono); font-weight: 600;">1185053020162 от 10.08.2018</td>
          </tr>
          <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
            <td style="color: var(--text-muted); padding: 8px 0;">ИНН / КПП:</td>
            <td style="color: #fff; font-family: var(--font-mono); font-weight: 600;">5024187371 / 503201001</td>
          </tr>
          <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
            <td style="color: var(--text-muted); padding: 8px 0;">Юридический адрес:</td>
            <td style="color: #fff;">Московская обл., г.о. Одинцовский, р.п. Новоивановское, ш. Можайское, стр. 166В</td>
          </tr>
          <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
            <td style="color: var(--text-muted); padding: 8px 0;">Банк:</td>
            <td style="color: #fff;">ПАО «СБЕРБАНК»</td>
          </tr>
          <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
            <td style="color: var(--text-muted); padding: 8px 0;">Расчетный счет:</td>
            <td style="color: #fff; font-family: var(--font-mono); font-weight: 600;">40702810340000039770</td>
          </tr>
          <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
            <td style="color: var(--text-muted); padding: 8px 0;">БИК:</td>
            <td style="color: #fff; font-family: var(--font-mono); font-weight: 600;">044525225</td>
          </tr>
          <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
            <td style="color: var(--text-muted); padding: 8px 0;">Корр. счет:</td>
            <td style="color: #fff; font-family: var(--font-mono); font-weight: 600;">30101810400000000225</td>
          </tr>
          <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
            <td style="color: var(--text-muted); padding: 8px 0;">Генеральный директор:</td>
            <td style="color: #fff; font-weight: 600;">Перцхелия Гиви Зурабович (Действует на основании Устава)</td>
          </tr>
          <tr>
            <td style="color: var(--text-muted); padding: 8px 0;">Электронная почта:</td>
            <td><a href="mailto:info@goshaturbotech.com" style="color: var(--gtt-orange); text-decoration: underline;">info@goshaturbotech.com</a></td>
          </tr>
        </tbody>
      </table>
    `;
  }

  modal.classList.add('active');
  document.body.classList.add('modal-open');
};

window.closeLegalModal = function() {
  const modal = document.getElementById('legalModal');
  if (modal) modal.classList.remove('active');
  document.body.classList.remove('modal-open');
};

// 3-Mode Gallery Layout Switcher
window.switchGalleryMode = function(mode) {
  // Update buttons
  document.querySelectorAll('.gallery-mode-btn').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.getElementById(`btnMode${mode.charAt(0).toUpperCase() + mode.slice(1)}`);
  if (activeBtn) activeBtn.classList.add('active');

  // Update views
  document.querySelectorAll('.gallery-view-mode').forEach(view => view.classList.remove('active'));
  const activeView = document.getElementById(`galleryMode${mode.charAt(0).toUpperCase() + mode.slice(1)}`);
  if (activeView) activeView.classList.add('active');
};

// Horizontal Track Slider Arrow Controller
window.scrollTrackSlider = function(direction) {
  const container = document.getElementById('trackSliderScroll');
  if (!container) return;
  const scrollAmount = 440 * direction;
  container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
};

// Fullscreen Photo Lightbox Engine
let currentLightboxIndex = 0;
function getActiveGalleryList() {
  const cards = Array.from(document.querySelectorAll('#marqueeTrackMain .marquee-card:not(.is-clone)'));
  return cards.map(c => {
    const img = c.querySelector('img');
    const src = img ? (img.getAttribute('src') || '') : '';
    const caption = c.getAttribute('data-raw-title') || c.querySelector('.marquee-card-title')?.textContent || '';
    return { src, caption };
  });
}

window.openGalleryLightbox = function(src, rawCaption) {
  const modal = document.getElementById('galleryLightbox');
  const img = document.getElementById('lightboxImg');
  const cap = document.getElementById('lightboxCaption');
  if (!modal || !img) return;

  const list = getActiveGalleryList();
  const norm = s => (s || '').replace(/^(\.?\/|https?:\/\/[^\/]+\/)/, '').trim();
  const idx = list.findIndex(item => norm(item.src) === norm(src));
  if (idx !== -1) {
    currentLightboxIndex = idx;
  }

  const bilingual = getGalleryBilingual(rawCaption || '', '');
  const displayCaption = bilingual.title || rawCaption || 'GoshaTurboTech Motorsport';

  img.src = src;
  img.alt = displayCaption;
  if (cap) cap.textContent = displayCaption;
  modal.classList.add('active');
  document.body.classList.add('modal-open');
};

window.navigateLightbox = function(direction) {
  const list = getActiveGalleryList();
  if (!list.length) return;
  currentLightboxIndex = (currentLightboxIndex + direction + list.length) % list.length;
  const current = list[currentLightboxIndex];
  if (current) {
    const img = document.getElementById('lightboxImg');
    const cap = document.getElementById('lightboxCaption');
    const bilingual = getGalleryBilingual(current.caption || '', '');
    const displayCaption = bilingual.title || current.caption || 'GoshaTurboTech Motorsport';
    if (img && current.src) {
      img.src = current.src;
      img.alt = displayCaption;
    }
    if (cap) cap.textContent = displayCaption;
  }
};

window.closeGalleryLightbox = function() {
  const modal = document.getElementById('galleryLightbox');
  if (modal) modal.classList.remove('active');
  document.body.classList.remove('modal-open');
};

// Global Lightbox Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
  const modal = document.getElementById('galleryLightbox');
  if (!modal || !modal.classList.contains('active')) return;
  if (e.key === 'Escape') {
    closeGalleryLightbox();
  } else if (e.key === 'ArrowLeft') {
    navigateLightbox(-1);
  } else if (e.key === 'ArrowRight') {
    navigateLightbox(1);
  }
});

// Mobile Drawer Navigation Controller
window.toggleMobileNav = function(forceState) {
  const drawer = document.getElementById('mobileDrawer');
  const burger = document.getElementById('mobileBurgerBtn');
  if (!drawer) return;

  const shouldOpen = (forceState !== undefined) ? forceState : !drawer.classList.contains('active');
  
  drawer.classList.toggle('active', shouldOpen);
  if (burger) burger.classList.toggle('active', shouldOpen);
  document.body.style.overflow = shouldOpen ? 'hidden' : '';
};

/* ==========================================================================
   FLAGSHIP SPECIAL EFFECTS SUITE (1, 2, 4, 5)
   ========================================================================== */
function initSpecialEffects() {
  initAmbientCursorGlow();
  initRevealOnScroll();
  initTelemetryCounters();
  window.apply3DTiltCards();
}

// 4. Ambient Neon Spotlight Follower
function initAmbientCursorGlow() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  let glow = document.querySelector('.ambient-glow-cursor');
  if (!glow) {
    glow = document.createElement('div');
    glow.className = 'ambient-glow-cursor';
    document.body.appendChild(glow);
  }

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    glow.style.opacity = '1';
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    glow.style.opacity = '0';
  });

  // Smooth inertial lerp follow
  function renderGlow() {
    currentX += (mouseX - currentX) * 0.15;
    currentY += (mouseY - currentY) * 0.15;
    glow.style.left = `${currentX}px`;
    glow.style.top = `${currentY}px`;
    requestAnimationFrame(renderGlow);
  }
  requestAnimationFrame(renderGlow);
}

// 1. 3D Tilt Effect on Cards with Dynamic Specular Glare
window.apply3DTiltCards = function() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const targets = document.querySelectorAll('.car-card, .team-card, .moto-card, .record-item');

  targets.forEach(card => {
    if (card.dataset.tiltApplied) return;
    card.dataset.tiltApplied = 'true';

    // Inject glare overlay if not present
    let glare = card.querySelector('.tilt-glare');
    if (!glare) {
      glare = document.createElement('div');
      glare.className = 'tilt-glare';
      card.appendChild(glare);
    }

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Max rotation: 7 degrees for silky premium feel
      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px) scale3d(1.015, 1.015, 1.015)`;

      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.18) 0%, rgba(255,100,37,0.08) 35%, transparent 70%)`;
      glare.style.opacity = '1';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale3d(1, 1, 1)';
      glare.style.opacity = '0';
      card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'none';
    });
  });
};

// 2. High-Tech Telemetry Counter (MoTeC digital gauge effect)
function initTelemetryCounters() {
  const statNumbers = document.querySelectorAll('.founder-stat-item .num');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateNumericValue(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  statNumbers.forEach(el => observer.observe(el));
}

function animateNumericValue(element) {
  const rawText = element.textContent.trim();
  const match = rawText.match(/^([\d\.,]+)(.*)$/);
  if (!match) return;

  const targetNum = parseFloat(match[1].replace(',', '.'));
  const suffix = match[2] || '';
  const isDecimal = match[1].includes('.');
  const duration = 1400; // ms
  const startTime = performance.now();

  function updateCount(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Smooth ease-out quad
    const ease = 1 - (1 - progress) * (1 - progress);
    const current = (targetNum * ease);

    element.textContent = (isDecimal ? current.toFixed(1) : Math.floor(current)) + suffix;

    if (progress < 1) {
      requestAnimationFrame(updateCount);
    } else {
      element.textContent = rawText;
    }
  }

  requestAnimationFrame(updateCount);
}

// 5. Cinematic Reveal on Scroll
function initRevealOnScroll() {
  const revealTargets = document.querySelectorAll('.section-header, .moto-showcase-card, .founder-achievements, .records-editorial-table, .contact-container');

  revealTargets.forEach(el => el.classList.add('reveal-init'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealTargets.forEach(el => observer.observe(el));
}

// 6. Interactive Gallery Filmstrip Slider (Pure Continuous Flow Marquee + Infinite Bounded Ticker)
let galleryRafId = null;
let galleryOffset = 0;
let galleryIsPaused = false;
let galleryIsDragging = false;
let galleryStartX = 0;
let galleryDragStartOffset = 0;
let galleryHalfWidth = 0;
let galleryHasMoved = false;
let galleryResumeTimer = null;
const GALLERY_TICKER_SPEED = 0.85;

function wrapGalleryOffset() {
  if (galleryHalfWidth <= 0) return;
  while (galleryOffset <= -galleryHalfWidth) {
    galleryOffset += galleryHalfWidth;
  }
  while (galleryOffset > 0) {
    galleryOffset -= galleryHalfWidth;
  }
}

function initGalleryMarqueeInteractions() {
  const wrapper = document.querySelector('.marquee-stream-wrapper');
  const track = document.getElementById('marqueeTrackMain');
  if (!wrapper || !track) return;

  // Ensure native wrapper scrollLeft remains 0 forever to prevent runaway displacement
  wrapper.scrollLeft = 0;

  // Clean old clones if re-initializing
  track.querySelectorAll('.marquee-card.is-clone').forEach(el => el.remove());

  const originalCards = Array.from(track.querySelectorAll('.marquee-card:not(.is-clone)'));
  const totalCards = originalCards.length;
  if (!totalCards) return;

  // Duplicate cards for seamless 100% loop
  originalCards.forEach(card => {
    const clone = card.cloneNode(true);
    clone.classList.add('is-clone');
    track.appendChild(clone);
  });

  // Calculate halfWidth
  function updateHalfWidth() {
    galleryHalfWidth = track.scrollWidth / 2;
  }
  updateHalfWidth();

  // Reset transform to 0
  galleryOffset = 0;
  track.style.transform = 'translate3d(0, 0, 0)';

  // Cancel any existing animation frame
  if (galleryRafId) {
    cancelAnimationFrame(galleryRafId);
    galleryRafId = null;
  }

  // Animation Loop (Continuous 60fps glide with strict mathematical bounds)
  function tick() {
    if (!galleryIsPaused && !galleryIsDragging && galleryHalfWidth > 0) {
      galleryOffset -= GALLERY_TICKER_SPEED;
      wrapGalleryOffset();
      track.style.transform = `translate3d(${galleryOffset}px, 0, 0)`;
    }
    galleryRafId = requestAnimationFrame(tick);
  }
  galleryRafId = requestAnimationFrame(tick);

  // Recalculate width on resize or image loads
  window.addEventListener('resize', updateHalfWidth);
  track.querySelectorAll('img').forEach(img => {
    if (!img.complete) {
      img.addEventListener('load', updateHalfWidth, { once: true });
    }
  });

  function scheduleResume(delay = 1800) {
    clearTimeout(galleryResumeTimer);
    galleryResumeTimer = setTimeout(() => {
      galleryIsPaused = false;
    }, delay);
  }

  // Prevent browser native image ghost dragging
  wrapper.addEventListener('dragstart', (e) => {
    e.preventDefault();
    return false;
  });

  // Trackpad horizontal swipe & mouse wheel support
  wrapper.addEventListener('wheel', (e) => {
    const absX = Math.abs(e.deltaX);
    const absY = Math.abs(e.deltaY);

    // Trackpad horizontal scroll (two-finger swipe) OR Shift + mouse wheel
    if (absX > 0 || (e.shiftKey && absY > 0)) {
      if (e.cancelable) e.preventDefault();
      galleryIsPaused = true;
      const delta = (absX > 0) ? e.deltaX : e.deltaY;
      galleryOffset -= delta * 1.15;
      wrapGalleryOffset();
      track.style.transform = `translate3d(${galleryOffset}px, 0, 0)`;
      scheduleResume(1400);
    }
  }, { passive: false });

  // Modern Pointer Events for Mouse & Touch drag
  let isPointerDown = false;
  let activePointerId = null;
  let lastPointerX = 0;
  let pointerVelocity = 0;

  wrapper.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    isPointerDown = true;
    galleryHasMoved = false;
    galleryStartX = e.clientX;
    lastPointerX = e.clientX;
    galleryDragStartOffset = galleryOffset;
    pointerVelocity = 0;
    galleryIsPaused = true;
    activePointerId = e.pointerId;
    wrapper.classList.add('is-dragging');
  });

  wrapper.addEventListener('pointermove', (e) => {
    if (!isPointerDown || (activePointerId !== null && e.pointerId !== activePointerId)) return;

    const dx = e.clientX - galleryStartX;
    if (!galleryHasMoved && Math.abs(dx) > 10) {
      galleryHasMoved = true;
      try {
        wrapper.setPointerCapture(e.pointerId);
      } catch (_) {}
    }

    if (galleryHasMoved) {
      if (e.cancelable) e.preventDefault();
      pointerVelocity = e.clientX - lastPointerX;
      lastPointerX = e.clientX;
      galleryOffset = galleryDragStartOffset + dx;
      wrapGalleryOffset();
      track.style.transform = `translate3d(${galleryOffset}px, 0, 0)`;
    }
  });

  function onPointerEnd(e) {
    if (!isPointerDown) return;
    if (activePointerId !== null && e.pointerId !== activePointerId) return;
    isPointerDown = false;
    activePointerId = null;
    wrapper.classList.remove('is-dragging');

    try {
      if (wrapper.hasPointerCapture(e.pointerId)) {
        wrapper.releasePointerCapture(e.pointerId);
      }
    } catch (_) {}

    if (galleryHasMoved) {
      // Smooth inertia coasting if flicked
      if (Math.abs(pointerVelocity) > 2) {
        let momentum = pointerVelocity * 7;
        function coast() {
          if (Math.abs(momentum) < 0.3) {
            scheduleResume(1400);
            return;
          }
          galleryOffset += momentum;
          momentum *= 0.91;
          wrapGalleryOffset();
          track.style.transform = `translate3d(${galleryOffset}px, 0, 0)`;
          requestAnimationFrame(coast);
        }
        requestAnimationFrame(coast);
      } else {
        scheduleResume(1400);
      }
      setTimeout(() => {
        galleryHasMoved = false;
      }, 150);
    } else {
      scheduleResume(1400);
    }
  }

  wrapper.addEventListener('pointerup', onPointerEnd);
  wrapper.addEventListener('pointercancel', onPointerEnd);

  // Reliable click delegation for all gallery cards (both originals and clones)
  wrapper.addEventListener('click', (e) => {
    if (galleryHasMoved) {
      e.preventDefault();
      e.stopImmediatePropagation();
      return;
    }
    const card = e.target.closest('.marquee-card');
    if (!card) return;

    e.preventDefault();
    e.stopPropagation();

    const img = card.querySelector('img');
    const src = img ? (img.getAttribute('src') || '') : '';
    const rawTitle = card.getAttribute('data-raw-title') || card.querySelector('.marquee-card-title')?.textContent || '';
    if (src) {
      openGalleryLightbox(src, rawTitle);
    }
  });
}

// Global animated scroll helper for Prev / Next arrows
window.scrollGalleryTrack = function(dir) {
  if (galleryHalfWidth <= 0) return;
  galleryIsPaused = true;
  const amount = dir * 460;
  const startOffset = galleryOffset;
  const startTime = performance.now();
  const duration = 380;

  function step(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    galleryOffset = startOffset + (amount * ease);
    wrapGalleryOffset();
    const track = document.getElementById('marqueeTrackMain');
    if (track) track.style.transform = `translate3d(${galleryOffset}px, 0, 0)`;
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      clearTimeout(galleryResumeTimer);
      galleryResumeTimer = setTimeout(() => {
        galleryIsPaused = false;
      }, 1800);
    }
  }
  requestAnimationFrame(step);
};


/* ==========================================================================
   TOUCH GESTURES FOR FOUNDER CAROUSEL
   ========================================================================== */
function initFounderGestures() {
  const wrapper = document.getElementById('founderGalleryWrapper');
  const img = document.getElementById('founderImg');
  if (!wrapper || !img) return;

  // 1. MacBook Trackpad: 2-finger horizontal swipe (wheel deltaX)
  let wheelLock = false;
  wrapper.addEventListener('wheel', (e) => {
    const absX = Math.abs(e.deltaX);
    const absY = Math.abs(e.deltaY);

    // Dominant horizontal gesture on trackpad
    if (absX > absY) {
      // Prevent macOS Safari from triggering Back/Forward history navigation!
      e.preventDefault();

      if (absX > 18) {
        if (wheelLock || isFounderAnimating) return;
        wheelLock = true;
        setTimeout(() => { wheelLock = false; }, 420);

        if (e.deltaX > 0) {
          // Swiped fingers to the left -> Next photo
          window.switchFounderPhoto(1, 1);
        } else {
          // Swiped fingers to the right -> Previous photo
          window.switchFounderPhoto(-1, -1);
        }
      }
    }
  }, { passive: false });

  // 2. Gesture Engine: iPhone Touch + MacBook Mouse Drag
  let isDragging = false;
  let isHorizontalSwipe = false;
  let startX = 0;
  let startY = 0;
  let currentDiffX = 0;

  function onGestureStart(x, y, target) {
    if (isFounderAnimating) return;
    // Don't drag if clicking buttons, dots or telegram badge
    if (target && target.closest && (
      target.closest('.founder-gallery-btn') || 
      target.closest('.founder-gallery-topbar') || 
      target.closest('.founder-floating-card')
    )) {
      return;
    }
    isDragging = true;
    isHorizontalSwipe = false;
    startX = x;
    startY = y;
    currentDiffX = 0;
    wrapper.classList.add('is-dragging');
  }

  function onGestureMove(x, y) {
    if (!isDragging || isFounderAnimating) return;
    const diffX = x - startX;
    const diffY = y - startY;

    if (!isHorizontalSwipe) {
      // Determine if user intends a horizontal swipe
      if (Math.abs(diffX) > 8 && Math.abs(diffX) > Math.abs(diffY)) {
        isHorizontalSwipe = true;
      } else if (Math.abs(diffY) > 12) {
        // User is scrolling the page vertically — release drag
        onGestureCancel();
        return;
      }
    }

    if (isHorizontalSwipe) {
      currentDiffX = diffX;
      // Damped elastic drag feedback
      const damped = Math.sign(diffX) * Math.min(Math.abs(diffX) * 0.45, 90);
      img.style.transition = 'none';
      img.style.transform = `translateX(${damped}px) scale(0.99)`;
      img.style.opacity = Math.max(0.65, 1 - Math.abs(diffX) / 600);
    }
  }

  function onGestureEnd() {
    if (!isDragging) return;
    isDragging = false;
    wrapper.classList.remove('is-dragging');

    if (isHorizontalSwipe && Math.abs(currentDiffX) > 38 && !isFounderAnimating) {
      const step = currentDiffX < 0 ? 1 : -1;
      window.switchFounderPhoto(step, step);
    } else {
      // Spring back smoothly
      img.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease, filter 0.3s ease';
      img.style.transform = 'translateX(0) scale(1)';
      img.style.opacity = '1';
      img.style.filter = 'none';
    }

    currentDiffX = 0;
    isHorizontalSwipe = false;
  }

  function onGestureCancel() {
    if (!isDragging) return;
    isDragging = false;
    wrapper.classList.remove('is-dragging');
    img.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease';
    img.style.transform = 'translateX(0) scale(1)';
    img.style.opacity = '1';
    currentDiffX = 0;
    isHorizontalSwipe = false;
  }

  // Touch handlers (iPhone & iPad)
  wrapper.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches[0]) {
      onGestureStart(e.touches[0].clientX, e.touches[0].clientY, e.target);
    }
  }, { passive: true });

  wrapper.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) {
      onGestureMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  wrapper.addEventListener('touchend', onGestureEnd, { passive: true });
  wrapper.addEventListener('touchcancel', onGestureCancel, { passive: true });

  // Mouse handlers (MacBook trackpad click-and-drag / mouse)
  wrapper.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return; // Left click only
    onGestureStart(e.clientX, e.clientY, e.target);
  });

  window.addEventListener('mousemove', (e) => {
    if (isDragging) {
      onGestureMove(e.clientX, e.clientY);
    }
  });

  window.addEventListener('mouseup', () => {
    if (isDragging) {
      onGestureEnd();
    }
  });
}

/* ==========================================================================
   MOBILE STICKY ACTION BAR CONTROLLER (Auto-hide on modals / bottom)
   ========================================================================== */
function initMobileStickyBar() {
  const bar = document.getElementById('mobileBottomBar');
  if (!bar) return;

  let isPreloaderActive = true;
  let lastScrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
  let isScrollingDown = false;
  let scrollInactivityTimer = null;

  // Reveal bar only after preloader is completely faded out
  const preloaderEl = document.getElementById('preloader');
  if (preloaderEl) {
    const checkPreloader = setInterval(() => {
      if (preloaderEl.style.display === 'none' || preloaderEl.classList.contains('fade-out')) {
        clearInterval(checkPreloader);
        setTimeout(() => {
          isPreloaderActive = false;
          updateBarVisibility();
        }, 600);
      }
    }, 200);
  } else {
    isPreloaderActive = false;
    updateBarVisibility();
  }

  function updateBarVisibility() {
    if (isPreloaderActive) {
      bar.classList.add('hidden');
      bar.classList.remove('visible');
      document.body.classList.add('bottom-bar-hidden');
      return;
    }

    const currentScrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
    const diff = currentScrollY - lastScrollY;

    // Detect scroll direction (threshold of 8px to ignore micro-jitters)
    if (diff > 8 && currentScrollY > 120) {
      isScrollingDown = true;
    } else if (diff < -6) {
      isScrollingDown = false;
    }
    lastScrollY = currentScrollY;

    const anyModalActive = document.querySelector('.modal-overlay.active, .video-modal-overlay.active, .gallery-lightbox-modal.active, .mobile-drawer.active');
    const contactEl = document.getElementById('contact');
    const partnersEl = document.getElementById('partners');
    let isPastContact = false;
    const vh = window.innerHeight;
    if (contactEl) {
      isPastContact = (contactEl.offsetTop - currentScrollY) <= vh * 0.85;
    }
    if (partnersEl && !isPastContact) {
      isPastContact = (partnersEl.offsetTop - currentScrollY) <= vh * 0.85;
    }
    const isNearBottom = (vh + currentScrollY) >= (document.documentElement.scrollHeight - 100);
    const isAtTop = currentScrollY < 100;

    // Hide bar when scrolling down, near bottom, in modals, or at top
    if (anyModalActive || isPastContact || isNearBottom || isScrollingDown || isAtTop) {
      bar.classList.add('hidden');
      bar.classList.remove('visible');
      document.body.classList.add('bottom-bar-hidden');
    } else {
      bar.classList.remove('hidden');
      bar.classList.add('visible');
      document.body.classList.remove('bottom-bar-hidden');
    }

    // Re-show bar on mobile when user stops scrolling for 900ms
    clearTimeout(scrollInactivityTimer);
    if (!anyModalActive && !isPastContact && !isNearBottom && !isAtTop) {
      scrollInactivityTimer = setTimeout(() => {
        isScrollingDown = false;
        bar.classList.remove('hidden');
        bar.classList.add('visible');
        document.body.classList.remove('bottom-bar-hidden');
      }, 900);
    }
  }

  window.addEventListener('scroll', () => {
    if (isThrottled) return;
    isThrottled = true;
    requestAnimationFrame(() => {
      updateBarVisibility();
      isThrottled = false;
    });
  }, { passive: true });

  // Listen for modal state toggles
  const observer = new MutationObserver(() => {
    updateBarVisibility();
  });

  ['carModal', 'videoModal', 'galleryLightbox', 'mobileDrawer'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      observer.observe(el, { attributes: true, attributeFilter: ['class'] });
    }
  });
}

/* ==========================================================================
   FLOATING BACK TO TOP BUTTON WITH CIRCULAR SCROLL PROGRESS INDICATOR
   ========================================================================== */
function initBackToTopButton() {
  const btn = document.getElementById('backToTopBtn');
  const progressFill = document.getElementById('progressRingFill');
  if (!btn || !progressFill) return;

  const circumference = 2 * Math.PI * 21.5; // r=21.5 -> 135.09px
  progressFill.style.strokeDasharray = `${circumference} ${circumference}`;
  progressFill.style.strokeDashoffset = `${circumference}`;

  function updateScrollProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    // Toggle visibility: show when user scrolls beyond 320px
    if (scrollTop > 320) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }

    // Update circular progress ring
    if (scrollHeight > 0) {
      const scrollPercent = Math.min(Math.max(scrollTop / scrollHeight, 0), 1);
      const offset = circumference - (scrollPercent * circumference);
      progressFill.style.strokeDashoffset = `${offset}`;
    }
  }

  let isTicking = false;
  window.addEventListener('scroll', () => {
    if (!isTicking) {
      requestAnimationFrame(() => {
        updateScrollProgress();
        isTicking = false;
      });
      isTicking = true;
    }
  }, { passive: true });

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Initial check on load
  updateScrollProgress();
}

/* ==========================================================================
   DYNAMIC TELEMETRY ACCELERATION & ODOMETER COUNTERS
   ========================================================================== */
const HERO_TELEMETRY_KEY = 'gtt_hero_telemetry_custom';

function applyCustomHeroTelemetry() {
  let custom = null;
  try {
    const raw = localStorage.getItem(HERO_TELEMETRY_KEY);
    if (raw) custom = JSON.parse(raw);
  } catch (e) {}

  if (!custom) return;

  const bar = document.querySelector('.hero-telemetry-bar');
  if (!bar) return;

  const items = [custom.item1, custom.item2, custom.item3];
  const itemEls = bar.querySelectorAll('.telemetry-item');

  itemEls.forEach((itemEl, idx) => {
    const data = items[idx];
    if (!data) return;

    const valEl = itemEl.querySelector('.value');
    const lblEl = itemEl.querySelector('.label');

    const rawVal = (data.val || '').trim();
    let decimals = 0;
    if (rawVal.includes('.')) {
      const parts = rawVal.split('.');
      decimals = parts[1].replace(/[^\d]/g, '').length;
    }
    const suffix = rawVal.includes('+') ? '+' : '';
    const cleanNum = parseFloat(rawVal.replace(/[^\d.]/g, '')) || 0;

    if (valEl) {
      valEl.innerHTML = `<span class="counter-val" data-target="${cleanNum}" data-decimals="${decimals}" data-suffix="${suffix}">${rawVal}</span> <span class="unit">${data.unit || ''}</span>`;
    }

    if (lblEl) {
      lblEl.textContent = data.label || '';
      lblEl.removeAttribute('data-i18n');
    }
  });
}

function initTelemetryCounters() {
  applyCustomHeroTelemetry();

  // Background server fetch to sync custom hero telemetry
  try {
    fetch('/api/settings/hero_telemetry')
      .then(r => r.json())
      .then(res => {
        if (res && res.value) {
          localStorage.setItem(HERO_TELEMETRY_KEY, res.value);
          applyCustomHeroTelemetry();
        }
      })
      .catch(() => {});
  } catch (e) {}

  let hasAnimated = false;

  const animateCounters = () => {
    if (hasAnimated) return;
    hasAnimated = true;

    const counterEls = document.querySelectorAll('.hero-telemetry-bar .counter-val');
    if (!counterEls.length) return;

    counterEls.forEach((el, idx) => {
      const targetStr = el.getAttribute('data-target');
      if (!targetStr) return;
      const targetVal = parseFloat(targetStr.replace(/,/g, ''));
      const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
      const suffix = el.getAttribute('data-suffix') || '';
      
      const duration = 1800; // ms
      const startTime = performance.now() + (idx * 200); // Stagger each item

      function update(currentTime) {
        if (currentTime < startTime) {
          requestAnimationFrame(update);
          return;
        }

        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Quintic out easing for high performance race feeling
        const easeOut = 1 - Math.pow(1 - progress, 4);
        const currentVal = targetVal * easeOut;

        let displayVal;
        if (decimals > 0) {
          displayVal = currentVal.toFixed(decimals);
        } else {
          displayVal = Math.round(currentVal).toLocaleString('en-US');
        }

        el.textContent = displayVal + (progress === 1 ? suffix : '');

        if (progress < 1) {
          requestAnimationFrame(update);
        }
      }

      requestAnimationFrame(update);
    });
  };

  // Trigger when preloader finishes or after short delay
  const preloaderEl = document.getElementById('preloader');
  if (preloaderEl) {
    const observer = new MutationObserver(() => {
      if (preloaderEl.style.display === 'none' || preloaderEl.classList.contains('fade-out')) {
        observer.disconnect();
        setTimeout(animateCounters, 300);
      }
    });
    observer.observe(preloaderEl, { attributes: true, attributeFilter: ['style', 'class'] });
  }

  // Fallback trigger
  setTimeout(animateCounters, 1500);
}


// GTT Traffic & Visitors Counter Engine (Local & Real-Time)
(function trackGTTTraffic() {
  try {
    const TRAFFIC_KEY = 'gtt_traffic_telemetry';
    const VISITOR_ID_KEY = 'gtt_visitor_uuid';
    const SESSION_KEY = 'gtt_active_session_flag';

    let isNewSession = !sessionStorage.getItem(SESSION_KEY);
    sessionStorage.setItem(SESSION_KEY, 'active');

    let visitorId = localStorage.getItem(VISITOR_ID_KEY);
    let isUnique = false;
    if (!visitorId) {
      visitorId = 'gtt_' + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
      localStorage.setItem(VISITOR_ID_KEY, visitorId);
      isUnique = true;
    }

    let stats = {
      totalViews: 148,
      uniqueVisitors: 42,
      todayViews: 19,
      lastVisitDate: new Date().toISOString().split('T')[0],
      log: []
    };

    const saved = localStorage.getItem(TRAFFIC_KEY);
    if (saved) {
      try { stats = JSON.parse(saved); } catch (e) {}
    }

    const todayStr = new Date().toISOString().split('T')[0];
    if (stats.lastVisitDate !== todayStr) {
      stats.todayViews = 0;
      stats.lastVisitDate = todayStr;
    }

    stats.totalViews += 1;
    stats.todayViews += 1;
    if (isUnique) {
      stats.uniqueVisitors += 1;
    }

    // Determine device info
    const ua = navigator.userAgent;
    let device = 'Desktop PC';
    if (/iPad|Android(?!.*Mobile)|Tablet/i.test(ua)) device = 'Планшет / iPad';
    else if (/iPhone|Android.*Mobile|Mobile/i.test(ua)) device = 'Смартфон (Mobile)';
    else if (/Macintosh/i.test(ua)) device = 'Apple Mac';
    else if (/Windows/i.test(ua)) device = 'Windows PC';

    // Source referrer
    let source = document.referrer ? (new URL(document.referrer).hostname) : 'Прямой заход';
    if (source.includes('t.me') || source.includes('telegram')) source = 'Telegram (@goshaturbotech)';
    else if (source.includes('yandex')) source = 'Яндекс Поиск';
    else if (source.includes('google')) source = 'Google';

    // Add entry to log (keep last 35)
    if (!stats.log) stats.log = [];
    stats.log.unshift({
      id: 'vis_' + Date.now(),
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      date: new Date().toLocaleDateString('ru-RU', { day: '2-digit', month: 'short' }),
      device: device,
      source: source,
      page: window.location.pathname.split('/').pop() || 'Главная',
      isNewSession: isNewSession
    });

    if (stats.log.length > 50) {
      stats.log = stats.log.slice(0, 50);
    }

    localStorage.setItem(TRAFFIC_KEY, JSON.stringify(stats));

    // Async record to SQLite database engine
    fetch('/api/traffic/visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        device: device,
        source: source,
        page: window.location.pathname.split('/').pop() || 'index.html',
        isNewSession: isNewSession
      })
    }).catch(() => {});
  } catch (err) {
    console.warn('Traffic tracking skipped', err);
  }
})();

// Cookie Consent Banner Controller (152-ФЗ)
(function initCookieBanner() {
  const COOKIE_CONSENT_KEY = 'gtt_cookie_accepted';
  document.addEventListener('DOMContentLoaded', () => {
    const banner = document.getElementById('gttCookieBanner');
    if (!banner) return;

    if (!localStorage.getItem(COOKIE_CONSENT_KEY)) {
      setTimeout(() => {
        banner.style.display = 'flex';
      }, 1200);
    }
  });

  window.acceptGTTCookies = function() {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    const banner = document.getElementById('gttCookieBanner');
    if (banner) {
      banner.style.opacity = '0';
      banner.style.transform = 'translate(-50%, 20px)';
      banner.style.transition = 'all 0.3s ease';
      setTimeout(() => {
        banner.style.display = 'none';
      }, 300);
    }
  };
})();



