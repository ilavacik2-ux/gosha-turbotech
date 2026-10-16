/**
 * GOSHA TURBOTECH - Interactive Engine & Dataset
 * Strictly visual, data-driven, authentic engineering showcase
 */

let gttProjects = [
  {
    id: 'gtr_lucifer',
    brand: 'NISSAN & GTT',
    name: {
      ru: 'GT-R R35 «LUCIFER» GTT #71 CHAMPION',
      en: 'GT-R R35 «LUCIFER» GTT #71 CHAMPION'
    },
    type: 'gtr',
    tag: {
      ru: 'ЧЕМПИОН RDRC • ПИЛОТ ГОША ПЕРЦХЕЛИЯ #71',
      en: 'RDRC CHAMPION • PILOT GOSHA PERTSKHELIYA #71'
    },
    hp: '1,850+ HP',
    quarterMile: '7.620 сек',
    topSpeed: '355+ км/ч',
    badge: {
      ru: 'Боевой Огненный Болид Гоши #71',
      en: 'Gosha Fire Drag Weapon #71'
    },
    img: 'assets/cars/gtr_lucifer_solo.jpg',
    fallbackImg: 'assets/cars/gtr_lucifer_full.jpg',
    isPhoto: true,
    objectPosition: 'center 60%',
    videoSrc: 'assets/videos/gosha_na_svoem_lucifer_web.mp4',
    videoTitle: 'Гоша на своей // GT-R Lucifer RDRC',
    desc: {
      ru: 'Победоносный огненный болид Гоши Перцхелия, борт №71. Построенный в лаборатории GoshaTurboTech драг-монстр в культовой ливрее адского пламени — триумфатор и победитель финалов чемпионата России RDRC. Максимальное облегчение, биллетовый блок и яростный старт.',
      en: 'Victorious hellfire-liveried race weapon piloted by Gosha Pertskheliya himself (race car #71). Built in the GoshaTurboTech skunkworks — champion and winner of Russian Drag Racing Championship (RDRC) finals. Billet engine, extreme lightweight drag chassis and brutal AWD launches.'
    },
    specs: {
      engine: '4.1L Billet Stroker VR38DETT GTT Race Spec',
      turbos: 'Dual Precision 7675 Gen2 Pro Mod Billet Turbos',
      fuel: 'VP Racing Ethanol M5 / Dual In-Tank 1700cc Injection',
      ecu: 'Motec M150 Drag AWD Management + GTT Flame Map',
      chassis: 'Full Drag Suspension, Parachute System & Weld Beadlocks'
    }
  },
  {
    id: 'draco_promod',
    brand: 'NISSAN & DRACO',
    name: {
      ru: 'GT-R R35 DRACO PRO-MOD GTT 3000+ HP',
      en: 'GT-R R35 DRACO PRO-MOD GTT 3000+ HP'
    },
    type: 'gtr',
    tag: {
      ru: 'RDRC PRO-MOD RECORD • ПИЛОТ Р. АРЕФЬЕВ',
      en: 'RDRC PRO-MOD RECORD • PILOT R. AREFYEV'
    },
    hp: '3,000+ HP',
    quarterMile: '6.850 сек',
    topSpeed: '380+ км/ч',
    badge: {
      ru: 'Болид RDRC Pro-Mod 3000+ HP',
      en: 'RDRC Pro-Mod 3000+ HP Weapon'
    },
    img: 'assets/cars/gtr_draco_promod_front.jpg',
    fallbackImg: 'assets/cars/gtr_draco_wrap_detail.jpg',
    isPhoto: true,
    videoSrc: 'assets/videos/draco_gtr_action.mp4',
    videoTitle: 'Nissan GT-R Draco Pro-Mod 3000+ HP — боевой заезд RDRC',
    desc: {
      ru: 'Легендарный флагман и абсолютный монстр дрэг-стрипа RDRC под управлением Романа Арефьева. Специально построенное трубчатое шасси, гигантские улитки турбонаддува и более 3000 л.с.',
      en: 'Legendary flagship and absolute ruler of the RDRC drag strip piloted by Roman Arefyev. Bespoke chrome-moly tube chassis, massive twin pro-mod turbochargers and over 3,000 brake horsepower.'
    },
    specs: {
      engine: '4.3L Billet VR38 Race Block GTT / Draco Spec',
      turbos: 'Dual Precision 88mm Pro-Mod Turbochargers',
      fuel: 'Methanol M1 Injected + Dual Billet Fuel Rails',
      ecu: 'Motec M150 Standalone Pro Drag System',
      chassis: 'Full Chrome-Moly Tube Chassis & Carbon Body'
    }
  },
  {
    id: 'bmw_m5',
    brand: 'BMW M-POWER',
    name: {
      ru: 'BMW M5 G90 COMPETITION GTT-STAGE 3',
      en: 'BMW M5 G90 COMPETITION GTT-STAGE 3'
    },
    type: 'bmw',
    tag: {
      ru: 'RDRC ДРЭГ-КИЛЛЕР • БОЛИД GTT G90',
      en: 'RDRC DRAG WEAPON • GTT G90 BULLET'
    },
    hp: '1,050+ HP',
    quarterMile: '9.420 сек',
    topSpeed: '340+ км/ч',
    badge: {
      ru: 'Боевая BMW G90 Гоши Турботех',
      en: 'GoshaTurboTech Race BMW G90'
    },
    img: 'assets/cars/bmw_m5_rdrc_race.jpg',
    fallbackImg: 'assets/cars/bmw_m5_rdrc_race.jpg',
    isPhoto: true,
    videoSrc: 'assets/videos/r8_acceleration.mp4',
    videoTitle: 'BMW M5 G90 Competition GTT — боевой разгон',
    desc: {
      ru: 'Заряженная боевая BMW M5 поколения G90 от GoshaTurboTech, выступающая в чемпионате России по дрэг-рейсингу RDRC. Полный привод M xDrive, гибридные турбины GTT и усиленная поршневая группа.',
      en: 'Competition BMW M5 G90 built by GoshaTurboTech competing in RDRC. M xDrive AWD system, custom GTT hybrid billet turbos, and reinforced engine internals.'
    },
    specs: {
      engine: '4.4L V8 TwinPower Turbo Hybrid Powertrain GTT Spec',
      turbos: 'GTT Custom Billet Hybrid Turbos',
      fuel: '100 RON + Methanol Direct Port Injected',
      ecu: 'GTT Custom Dual ECU & 8HP Transmission Flash',
      exhaust: 'Inconel Catless Downpipes + Full Titanium System'
    }
  },
  {
    id: 'moses',
    brand: 'NISSAN',
    name: {
      ru: 'GT-R R35 GTT-MOSES «КОРЖИК» #712',
      en: 'GT-R R35 GTT-MOSES «KORZHIK» #712'
    },
    type: 'gtr',
    tag: {
      ru: 'ЛЕГЕНДА UNLIM 500+ & RDRC • БОРТ #712',
      en: 'UNLIM 500+ & RDRC LEGEND • RACING #712'
    },
    hp: '1,800+ HP',
    quarterMile: '7.810 сек',
    topSpeed: '360+ км/ч',
    badge: {
      ru: 'Легендарный Белый GT-R #712',
      en: 'Legendary White GT-R #712'
    },
    img: 'https://static.tildacdn.com/tild3032-3266-4139-a563-653561393961/gtr-min.png',
    fallbackImg: 'assets/cars/gtr_red_chrome_rdrc.jpg',
    isPhoto: false,
    desc: {
      ru: 'Культовый белый Nissan GT-R R35 борт №712 под управлением Николая Коржова — символ побед GoshaTurboTech в России и Европе. Абсолютный чемпион SMP RDRC и призер Unlim 500+ на Крите.',
      en: 'Iconic white Nissan GT-R R35 #712 driven by Nikolay Korzhov — emblem of GoshaTurboTech victories across Europe and Russia. SMP RDRC champion and Unlim 500+ podium finisher in Crete.'
    },
    specs: {
      engine: '4.1L Billet Stroker VR38DETT GTT Spec',
      turbos: 'Dual Precision Ball-Bearing Race Turbos',
      fuel: 'VP Racing C16 / 100 RON Dual Fuel Map',
      ecu: 'Motec M1 + Custom GTT Drag AWD Logic',
      trans: 'GTT Billet PPG Sequential Dog-Box'
    }
  },
  {
    id: 'zelenka',
    brand: 'LAMBORGHINI',
    name: {
      ru: 'HURACAN TWIN TURBO «ЗЕЛЕНКА» GTT',
      en: 'HURACAN TWIN TURBO «ZELENKA» GTT'
    },
    type: 'lambo',
    tag: {
      ru: 'КУЛЬТОВЫЙ 1500+ СИЛЬНЫЙ БОЛИД RDRC',
      en: 'CULT 1500+ HP RDRC CHAMPIONSHIP BULLET'
    },
    hp: '1,500+ HP',
    quarterMile: '8.180 сек',
    topSpeed: '355+ км/ч',
    badge: {
      ru: 'Легендарная «Зеленка» GTT',
      en: 'Legendary «Zelenka» GTT'
    },
    img: 'assets/photos/huracan_zelenka_gtt.jpg',
    fallbackImg: 'assets/cars/huracan_green_grey_rdrc.jpg',
    isPhoto: true,
    objectPosition: 'center 45%',
    videoSrc: 'assets/videos/r8_launch_action.mp4',
    videoTitle: 'Lamborghini Huracan Twin Turbo «Зеленка» GTT — боевой заезд RDRC',
    desc: {
      ru: 'Знаменитая ядовито-зеленая Lamborghini Huracan Twin Turbo «Зеленка» — легенда паддока RDRC и уличных дуэлей. Кастомный твин-турбо кит от GoshaTurboTech, бедлоки и выстрел за 8 секунд.',
      en: 'The legendary acid-green Lamborghini Huracan Twin Turbo «Zelenka» — racing icon of the RDRC paddock. Built by GoshaTurboTech with custom mirror turbos, rear beadlock drag wheels and low 8-second 1/4 mile passes.'
    },
    specs: {
      engine: '5.2L V10 FSI GTT Built Engine',
      turbos: 'Precision Mirror Dual Ball-Bearing Turbos',
      fuel: 'Dual Billet Fuel Rails + 100 RON / E85 Maps',
      trans: 'GTT Upgraded Billet Dual Clutch 10-Plate',
      wheels: 'Weld Racing Rear Beadlocks with Mickey Thompson ET'
    }
  },
  {
    id: 'tonystark',
    brand: 'AUDI & ЦМРБАНК',
    name: {
      ru: 'R8 V10 PLUS TWIN TURBO TONY STARK / RDRC',
      en: 'R8 V10 PLUS TWIN TURBO TONY STARK / RDRC'
    },
    type: 'audi',
    tag: {
      ru: 'РЕКОРД БАЙКАЛА & RDRC СТРИТ-КИЛЛЕР',
      en: 'BAIKAL ICE RECORD & RDRC STREET WEAPON'
    },
    hp: '1,400+ HP',
    quarterMile: '8.450 сек',
    topSpeed: '350+ км/ч',
    badge: {
      ru: 'V10 Twin Turbo Flagship',
      en: 'V10 Twin Turbo Flagship'
    },
    img: 'assets/cars/audi_r8_tsmr_launch.jpg',
    fallbackImg: 'https://static.tildacdn.com/tild3162-3462-4064-b931-313636663133/audi_r8-min.png',
    isPhoto: true,
    objectPosition: 'center 75%',
    videoSrc: 'assets/videos/dodge_srt_pass.mp4',
    videoTitle: 'Audi R8 V10 Twin Turbo GTT — боевой заезд',
    desc: {
      ru: 'Боевая Audi R8 V10 Twin Turbo под эгидой ЦМРБанк и GTT на треке RDRC. Покоритель байкальского льда и один из самых стабильных болидов чемпионата.',
      en: 'Race Audi R8 V10 Twin Turbo backed by CMRBank and GTT on the RDRC strip. Record setter on Lake Baikal ice and one of the most reliable twin-turbo builds in Russian motorsport.'
    },
    specs: {
      engine: '5.2L FSI V10 Twin Turbo Mid-Engine',
      turbos: 'Mirror Twin Turbo Kit with Air-to-Water Intercooling',
      cooling: 'CSF Triple Billet Heat Exchangers',
      ecu: 'Syvecs S12 Standalone Motorsport Setup',
      clutch: 'GTT Upgraded Billet 9-Plate Dual Clutch'
    }
  },
  {
    id: 'dodge_srt',
    brand: 'DODGE SRT',
    name: {
      ru: 'CHALLENGER SRT HELLCAT GTT-MONSTER',
      en: 'CHALLENGER SRT HELLCAT GTT-MONSTER'
    },
    type: 'other',
    tag: {
      ru: 'RDRC BURNOUT KING • 1,200+ HP',
      en: 'RDRC BURNOUT KING • 1,200+ HP'
    },
    hp: '1,200+ HP',
    quarterMile: '8.890 сек',
    topSpeed: '330+ км/ч',
    badge: {
      ru: 'Американский маслкар GTT',
      en: 'GTT American Muscle Monster'
    },
    img: 'assets/cars/dodge_burnout_sunset.jpg',
    fallbackImg: 'assets/cars/challenger_srt_gtt.jpg',
    isPhoto: true,
    objectPosition: 'center 70%',
    videoSrc: 'assets/videos/dodge_challenger_action.mp4',
    videoTitle: 'Dodge Challenger SRT Hellcat GTT — дымный бернаут RDRC',
    desc: {
      ru: 'Черный компрессорный монстр Dodge Challenger SRT от GoshaTurboTech, зажигающий на прямых RDRC под управлением Гончарова. Море дыма и чудовищный крутящий момент.',
      en: 'Supercharged black Dodge Challenger SRT built by GoshaTurboTech, dominating RDRC straight lines under pilot Goncharov. Enormous smoke, torque and American V8 thunder.'
    },
    specs: {
      engine: '6.2L Supercharged HEMI V8 Built by GTT',
      blower: 'Whipple 3.8L Gen 5 Supercharger Kit',
      fuel: 'Triple Fore Innovations Fuel Pumps + 1700cc Injectors',
      driveshaft: 'QA1 Carbon Fiber Driveshaft + GTT 9-inch Rear End',
      tires: 'Mickey Thompson ET Street R Drag Radials'
    }
  },
  {
    id: 'bezzubik',
    brand: 'LAMBORGHINI',
    name: {
      ru: 'HURACAN TWIN TURBO GTT-BEZZUBIK',
      en: 'HURACAN TWIN TURBO GTT-BEZZUBIK'
    },
    type: 'lambo',
    tag: {
      ru: 'РЕКОРД ЕВРОПЫ 353 КМ/Ч • RDRC STAGE',
      en: 'EUROPE RECORD 353 KM/H • RDRC STAGE'
    },
    hp: '1,500+ HP',
    quarterMile: '8.200 сек',
    topSpeed: '353 км/ч',
    badge: {
      ru: 'Race 1000 Champion',
      en: 'Race 1000 Champion'
    },
    img: 'assets/photos/huracan_rdrc_stage_line.jpg',
    fallbackImg: 'assets/cars/huracan_green_grey_rdrc.jpg',
    isPhoto: true,
    objectPosition: 'center 65%',
    desc: {
      ru: 'Европейский триумфатор Race 1000 и гроза трассы RDRC. Скорость 353 км/ч на дистанции 804 метра среди быстрейших полноприводных суперкаров мира с двойным турбонаддувом GTT.',
      en: 'European champion of Race 1000 in Germany and RDRC star. 353 km/h on 804m distance among the fastest street-legal AWD supercars in the world with GTT Twin Turbo systems.'
    },
    specs: {
      engine: '5.2L V10 FSI Twin Turbo GTT Stage 3',
      turbos: 'Precision Dual Mirror V-Band Turbos',
      exhaust: 'GTT Inconel Custom Straight System',
      ecu: 'Syvecs Dual-CAN Motorsport Management',
      fuel: '100 RON Daily / Ethanol E85 Race Map'
    }
  },
  {
    id: 'gtr_blue_888',
    brand: 'NISSAN',
    name: {
      ru: 'GT-R R35 MIDNIGHT BLUE GTT #888',
      en: 'GT-R R35 MIDNIGHT BLUE GTT #888'
    },
    type: 'gtr',
    tag: {
      ru: 'RDRC ЧЕМПИОНАТ РОССИИ • БОРТ #888',
      en: 'RDRC RUSSIAN CHAMPIONSHIP • CAR #888'
    },
    hp: '1,550+ HP',
    quarterMile: '8.120 сек',
    topSpeed: '348+ км/ч',
    badge: {
      ru: 'Синий GT-R #888',
      en: 'Blue GT-R #888'
    },
    img: 'assets/photos/gtr_blue_888_rdrc.jpg',
    fallbackImg: 'assets/cars/gtr_blue_rdrc_888.jpg',
    isPhoto: true,
    objectPosition: 'center 45%',
    videoSrc: 'assets/videos/gtr_blue_888_pass_web.mp4',
    videoTitle: 'Nissan GT-R #888 Midnight Blue GTT — боевой заезд RDRC',
    desc: {
      ru: 'Знаменитый синий Nissan GT-R R35 со стартовым номером #888, постоянный участник и призер этапов Чемпионата России RDRC. Калибровка лаунч-контроля GTT и кованый 3.8L VR38.',
      en: 'The renowned Midnight Blue Nissan GT-R R35 carrying race #888, competing consistently on RDRC stages. Calibrated GTT launch control algorithms and bulletproof forged 3.8L VR38.'
    },
    specs: {
      engine: '3.8L Forged VR38DETT GTT Spec',
      turbos: 'Dual Garrett G30-900 Turbochargers',
      cooling: 'ETS 4-inch Race Intercooler Kit',
      ecu: 'Syvecs S6+ ECU with GTT Drag Launch Strategy',
      trans: 'Dodson Pro-Max 8-Plate Drag Clutch'
    }
  },
  {
    id: 'gtr_red',
    brand: 'NISSAN',
    name: {
      ru: 'GT-R R35 RED CHROME GTT PRO-MOD',
      en: 'GT-R R35 RED CHROME GTT PRO-MOD'
    },
    type: 'gtr',
    tag: {
      ru: 'RDRC ЧЕМПИОНАТ РОССИИ',
      en: 'RDRC RUSSIAN CHAMPIONSHIP'
    },
    hp: '1,650+ HP',
    quarterMile: '7.950 сек',
    topSpeed: '350+ км/ч',
    badge: {
      ru: 'Красный Хром RDRC',
      en: 'Red Chrome RDRC'
    },
    img: 'assets/cars/gtr_red_front_rdrc.jpg',
    fallbackImg: 'assets/cars/gtr_red_chrome_rdrc.jpg',
    isPhoto: true,
    objectPosition: 'center 62%',
    videoSrc: 'assets/videos/gtr_red_g35_action_web.mp4',
    videoTitle: 'Nissan GT-R GTT Red Chrome G35 — боевой заезд RDRC',
    desc: {
      ru: 'Один из самых ярких Nissan GT-R в российском дрэг-рейсинге. Кастомный хром-дизайн, усиленная подвеска и боевая трансмиссия GTT.',
      en: 'One of the most striking Nissan GT-R cars in Russian drag racing. Custom red chrome livery, reinforced motorsport suspension and bulletproof GTT race transmission.'
    },
    specs: {
      engine: '3.8L VR38DETT Custom GTT Billet Assembly',
      turbos: 'Garrett G35-1050 Turbochargers',
      cooling: 'Front Mount Massive Intercooler Core',
      ecu: 'Syvecs S8 ECU with Launch & Traction Control'
    }
  },
  {
    id: 'bmw_m4',
    brand: 'BMW M-POWER',
    type: 'bmw',
    name: {
      ru: 'BMW M4 G82 COMPETITION GTT-850',
      en: 'BMW M4 G82 COMPETITION GTT-850'
    },
    tag: {
      ru: 'GTT TRACK & STREET SPEC • 850 HP',
      en: 'GTT TRACK & STREET SPEC • 850 HP'
    },
    hp: '850+ HP',
    quarterMile: '10.150 сек',
    topSpeed: '325+ км/ч',
    badge: {
      ru: 'Track & Street Spec',
      en: 'Track & Street Spec'
    },
    img: 'assets/cars/bmw_m4_g82_gtt.jpg',
    fallbackImg: 'assets/cars/bmw_m4_g82_gtt.jpg',
    isPhoto: true,
    objectPosition: 'center center',
    desc: {
      ru: 'Кастомный проект на базе BMW M4 G82. Доработанные турбокомпрессоры S58, карбоновый впуск Eventuri, титановый выхлоп ручной работы и индивидуальная калибровка блока управления.',
      en: 'Custom build based on BMW M4 G82. Upgraded S58 turbos, Eventuri carbon intake, bespoke titanium exhaust and custom ECU calibration.'
    },
    specs: {
      engine: '3.0L S58 Twin-Turbo Inline-6',
      turbos: 'Pure Turbos Stage 2+ Billet Core',
      cooling: 'CSF Radiator & Charge Cooler Pack',
      ecu: 'Custom Bootmod3 GTT Calibration'
    }
  },
  {
    id: 'porsche_911_gtt',
    brand: 'PORSCHE',
    type: 'porsche',
    name: {
      ru: 'PORSCHE 911 TURBO S (992) GTT-IMBA',
      en: 'PORSCHE 911 TURBO S (992) GTT-IMBA'
    },
    tag: {
      ru: 'МИРОВОЙ РЕКОРД RDRC • 9.252 СЕК',
      en: 'WORLD RECORD RDRC • 9.252 SEC'
    },
    hp: '1,050+ HP',
    quarterMile: '9.252 сек',
    topSpeed: '345+ км/ч',
    badge: {
      ru: 'Мировой Рекорд RDRC',
      en: 'World Record RDRC'
    },
    img: 'assets/cars/gtr_rdrc_red_panamera.jpg',
    fallbackImg: 'assets/cars/gtr_rdrc_red_panamera.jpg',
    isPhoto: true,
    objectPosition: 'center center',
    desc: {
      ru: 'Официально подтвержденный рекордсмен RDRC среди Porsche поколения 992. Кастомный интеркулер, метаноловый впрыск и экстремальный запуск с лаунча.',
      en: 'Officially verified RDRC record holder among Porsche 992 generation. Custom intercoolers, direct port methanol and ferocious launch control.'
    },
    specs: {
      engine: '3.8L Twin-Turbo Boxer-6 GTT Spec',
      turbos: 'GTT Billet High-Flow Turbos',
      fuel: '100 RON + Methanol Injection',
      ecu: 'Syvecs S7 Plus Standalone Porsche Kit'
    }
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
    nav_contact: "Связь",
    nav_telegram: "Telegram Канал",
    preloader_tag: "Инженерия Скорости & Мощности • Москва",
    hero_tag: "World Record Engineering • Moscow • RDRC",
    hero_title: `Инженерия <br><span class="gradient-text">запредельной</span> <br>скорости`,
    hero_desc: "Лаборатория спортивного инжиниринга Гоши Перцхелия (GoshaTurboTech). Победители Unlim 500+, триумфаторы Чемпионата России RDRC и абсолютные рекордсмены ледовых трасс Байкала. Мы форсируем суперкары BMW M, Nissan GT-R, Audi R8, Lamborghini и супербайки.",
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
    garage_subtitle: "Каждый автомобиль собран вручную в лаборатории GoshaTurboTech с персональной калибровкой блоков управления и двойного турбонаддува.",
    filter_all: "Все проекты",
    spec_power: "Мощность",
    spec_402: "1/4 мили",
    spec_speed: "Скорость",
    btn_passport: "Инженерный паспорт GTT",
    discuss_tg: "Обсудить проект в Telegram GTT",
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
    contact_btn_navi: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg> <span>Маршрут в Яндекс Навигаторе</span>',
    partners_tag: "// GTT TECHNICAL & MOTORSPORT PARTNERS",
    partners_title: "Партнеры",
    partners_subtitle: "Ведущие мировые бренды автоспорта, компонентов трансмиссии, турбонаддува и смазочных материалов, с которыми побеждает GoshaTurboTech.",
    // Records
    records_tag: "// HALL OF FAME • UNLIM 500+ & RDRC",
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
    founder_caption: "Гоша на стартовой полосе RDRC",
    founder_tagline: "Основатель & Главный идеолог GTT",
    founder_manifesto: "// THE FOUNDER & PHILOSOPHY",
    founder_name: "Гоша Перцхелия",
    founder_quote: "«Настоящий тюнинг — это не просто прикрутить турбину большего размера. Это искусство собрать сложнейший механизм так, чтобы он разгонялся до 350 км/ч на треке, а затем с абсолютным комфортом вез вас домой по вечернему городу».",
    founder_bio: "За 15+ лет увлечения предельной скоростью Гоша Перцхелия прошел путь от первых кастомных турбо-проектов до постройки сложнейших гиперкаров и дрэгстеров, признанных мировым сообществом энтузиастов. Он лично курирует инженерные разработки, калибрует электронные блоки управления и тестирует болиды на треках RDRC и ледовых просторах Байкала.",
    founder_stat1: "Лет в автоспорте",
    founder_stat2: "Мировых & Евро рекордов",
    founder_stat3: "Кастомный инжиниринг",
    founder_achieve_tag: "// КЛЮЧЕВЫЕ ВЕХИ И ИНЖЕНЕРНЫЕ ЗАСЛУГИ",
    achieve1_title: "Абсолютный рекорд льда Байкала",
    achieve1_desc: "Audi R8 Gyurza TT — 124 км/ч средняя скорость на льду с места",
    achieve2_title: "3000+ HP Pro-Mod «Draco»",
    achieve2_desc: "Постройка быстрейшего кастомного дрэгстера в СНГ на VR38 Billet",
    achieve3_title: "Европейский триумф на Unlim 500+",
    achieve3_desc: "Nissan GT-R Moses 7.810 сек на Крите и 353 км/ч Huracan в Германии",
    achieve4_title: "Собственная разработка Twin Turbo",
    achieve4_desc: "Авторские киты с титановым выхлопом для Lambo Huracan, R8, BMW M и 911",
    // Team (15 Members)
    team_tag: "// RACING CREW & PILOTS",
    team_title: "Команда GoshaTurboTech",
    team_subtitle: "Люди, которые куют рекорды на дрэг-стрипе RDRC: инженеры, телеметристы, механики и пилоты.",
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
    gallery_cap_dodge: "Dodge Challenger SRT Hellcat: дымный прогрев сликов на закате RDRC",
    gallery_cap_draco: "3000+ HP Nissan GT-R Draco Pro-Mod на сликах RDRC",
    gallery_cap_r8: "Audi R8 V10 Twin Turbo ЦМРБанк на стартовой черте RDRC",
    gallery_cap_gtr_red: "Красный хромированный Nissan GT-R R35 GTT Pro-Mod",
    gallery_cap_gtr_blue: "Боевой синий Nissan GT-R R35 #888 на закате RDRC",
    gallery_cap_box: "Бокс GTT: белая BMW M4 G82 и Nissan GT-R",
    gallery_cap_track: "Гоша Перцхелия контролирует подготовку трассы RDRC"
  },
  en: {
    nav_garage: "Garage Builds",
    nav_founder: "About Gosha",
    nav_records: "RDRC Records",
    nav_team: "GTT Crew",
    nav_moto: "Moto Division",
    nav_gallery: "Motorsport Life",
    nav_contact: "Contact",
    nav_telegram: "Telegram Channel",
    preloader_tag: "Speed & Power Engineering • Moscow",
    hero_tag: "World Record Engineering • Moscow • RDRC",
    hero_title: `Engineering of <br><span class="gradient-text">ultimate</span> <br>velocity`,
    hero_desc: "Gosha Pertskheliya's motorsport engineering laboratory. Champions of Unlim 500+, Russian Drag Racing Championship (RDRC) and Lake Baikal ice speed record holders. We engineer BMW M, Nissan GT-R, Audi R8, Lamborghini and superbikes.",
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
    garage_subtitle: "Hand-built in the GoshaTurboTech skunkworks facility with bespoke ECU calibration and twin turbo engineering.",
    filter_all: "All Projects",
    spec_power: "Output",
    spec_402: "1/4 Mile",
    spec_speed: "Top Speed",
    btn_passport: "GTT Engineering Passport",
    discuss_tg: "Discuss Project on Telegram GTT",
    contact_social_title: "Atelier Social Networks",
    contact_social_desc: "We are available on messaging platforms to discuss Stage packages, Twin Turbo setups, and supercar maintenance.",
    mobile_bar_tg: "Telegram GTT",
    mobile_bar_navi: "Navigator",
    mobile_bar_call: "Call Atelier",
    contact_tag: "// HEADQUARTERS & ATELIER",
    contact_hq_title: "GOSHATURBOTECH",
    contact_hq_desc: "Motorsport engineering center and bespoke performance laboratory for supercars and superbikes. Pre-tuning inspection, dyno hub and online project advisory.",
    contact_phone_lbl: "Workshop Direct Line",
    contact_tg_lbl: "Official Telegram Channel",
    contact_loc_lbl: "Atelier Location",
    contact_loc_val: "166B Mozhayskoye Hwy (Novoivanovskoye)",
    contact_btn_call: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg> <span>Call GTT Workshop</span>',
    contact_btn_navi: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg> <span>Open in Yandex Navigator</span>',
    partners_tag: "// GTT TECHNICAL & MOTORSPORT PARTNERS",
    partners_title: "Partners",
    partners_subtitle: "World-leading motorsport brands, transmission components, turbochargers and racing lubricants powering GoshaTurboTech victories.",
    // Records
    records_tag: "// HALL OF FAME • UNLIM 500+ & RDRC",
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
    founder_caption: "Gosha at the RDRC Starting Line",
    founder_tagline: "Founder & Chief Visionary of GTT",
    founder_manifesto: "// THE FOUNDER & PHILOSOPHY",
    founder_name: "Gosha Pertskheliya",
    founder_quote: "“True tuning is never just about bolting on a larger turbocharger. It is the fine art of crafting a sophisticated machine that accelerates to 350 km/h on the track, yet drives you home in total comfort through city streets.”",
    founder_bio: "Over 15+ years of chasing ultimate velocity, Gosha Pertskheliya evolved from custom turbo prototypes to building bespoke world-record hypercars recognized globally. He personally oversees powertrain engineering, calibrates ECUs and tests builds on RDRC strips and Lake Baikal ice.",
    founder_stat1: "Years in Motorsport",
    founder_stat2: "World & Euro Records",
    founder_stat3: "Custom Engineering",
    founder_achieve_tag: "// KEY MILESTONES & ENGINEERING ACCOLADES",
    achieve1_title: "Absolute Baikal Ice Record",
    achieve1_desc: "Audi R8 Gyurza TT — 124 km/h standing-start average speed on natural ice",
    achieve2_title: "3,000+ HP Pro-Mod «Draco»",
    achieve2_desc: "Crafted the fastest custom tube-chassis drag weapon in CIS on VR38 Billet",
    achieve3_title: "European Glory at Unlim 500+",
    achieve3_desc: "Nissan GT-R Moses 7.810s in Crete and 353 km/h Huracan in Germany",
    achieve4_title: "Proprietary Twin Turbo Kits",
    achieve4_desc: "In-house titanium exhaust & TT packages for Huracan, R8, BMW M & 911",
    // Team (15 Members)
    team_tag: "// RACING CREW & PILOTS",
    team_title: "GoshaTurboTech Racing Crew",
    team_subtitle: "The specialists forging records on the RDRC drag strip: engineers, telemetrists, mechanics and pilots.",
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
    gallery_cap_dodge: "Dodge Challenger SRT Hellcat: Smoky Burnout at Sunset RDRC",
    gallery_cap_draco: "3,000+ HP Nissan GT-R Draco Pro-Mod on RDRC Slicks",
    gallery_cap_r8: "Audi R8 V10 Twin Turbo CMRBank on the RDRC Starting Line",
    gallery_cap_gtr_red: "Red Chrome Nissan GT-R R35 GTT Pro-Mod",
    gallery_cap_gtr_blue: "GTT Race Midnight Blue Nissan GT-R R35 #888 at RDRC",
    gallery_cap_box: "GTT Garage Pit: White BMW M4 G82 & Nissan GT-R",
    gallery_cap_track: "Georgy Pertskheliya Supervising RDRC Track Glue Preparation"
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

  // Re-render garage grid with translated spec labels
  const activeFilter = document.querySelector('.filter-pill.active')?.getAttribute('data-filter') || 'all';
  renderGarageGrid(activeFilter);
  if (cachedTeamData) {
    renderTeamGrid(cachedTeamData);
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
  syncProjectsFromAPI();
  syncTeamFromAPI();
  syncGalleryFromAPI();
  syncRecordsFromAPI();
  initNavigation();
  initFilters();
  initModal();
  initSpecialEffects();
  initGalleryMarqueeInteractions();
  initFounderGestures();
  initMobileStickyBar();
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

function applyCarsData(carList) {
  const cleanList = Array.isArray(carList) ? carList.filter(c => c && c.hp !== '?' && c.img && !c.isTeaser) : [];
  const listToUse = cleanList.length > 0 ? cleanList : carList;
  gttProjects = listToUse.map(c => ({
    id: c.id,
    brand: c.brand || '',
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
    isPhoto: c.is_photo !== undefined ? Boolean(c.is_photo) : true,
    objectPosition: c.object_position || c.objectPosition || 'center center',
    videoSrc: c.video_src || c.videoSrc || '',
    videoTitle: c.video_title || c.videoTitle || '',
    desc: {
      ru: c.desc_ru || c.descRu || (c.desc && c.desc.ru) || c.desc || '',
      en: c.desc_en || c.descEn || (c.desc && c.desc.en) || c.desc_ru || c.descRu || ''
    },
    specs: (typeof c.specs === 'object' && c.specs !== null) ? c.specs : {},
    isTeaser: c.isTeaser || c.is_teaser || c.hp === '?' || !c.img
  }));

  const activeFilter = document.querySelector('#carsFilterPills .filter-pill.active')?.getAttribute('data-filter') || 'all';
  renderGarageGrid(activeFilter);
}

// Pre-configured official team assets & photos map
const defaultTeamPhotos = {
  m1: { photo: 'https://static.tildacdn.com/tild3630-6231-4439-b763-373662653964/ncse4W-BrwAKR5pHQvkX.jpg', social: '@goshaturbotech' },
  m2: { photo: 'https://static.tildacdn.com/tild6237-6430-4338-a236-626231306234/photo.jpg', social: '@vip.hay' },
  m3: { photo: 'https://static.tildacdn.com/tild6538-3832-4431-b761-636265323064/896A0858.jpg', social: '' },
  m4: { photo: 'https://static.tildacdn.com/tild3132-6639-4537-b432-323633653738/7R209573.jpg', social: '@_zm_zima_' },
  m5: { photo: 'https://static.tildacdn.com/tild3933-6664-4738-b164-626565346535/7R203219.jpg', social: '' },
  m6: { photo: 'https://static.tildacdn.com/tild3561-3862-4562-b734-363034623936/photo.jpg', social: '' },
  m7: { photo: 'https://static.tildacdn.com/tild6263-3266-4433-b264-626239376166/7R209460.jpg', social: '' },
  m8: { photo: 'https://static.tildacdn.com/tild3965-3435-4135-b437-386634613361/7R203125_2.jpg', social: '' },
  m9: { photo: 'https://static.tildacdn.com/tild3737-3661-4365-b831-383634343036/7R203122_2.jpg', social: '' },
  m10: { photo: 'https://static.tildacdn.com/tild6639-3931-4563-a462-303263313765/7R209470.jpg', social: '' },
  m11: { photo: 'https://static.tildacdn.com/tild6464-3435-4433-b162-616263636632/7R209475.jpg', social: '' },
  m12: { photo: 'https://static.tildacdn.com/tild3632-6234-4637-b431-653731376638/7R200607.jpg', social: '' },
  m13: { photo: 'https://static.tildacdn.com/tild6166-6166-4539-b731-363937393131/7R200882.jpg', social: '' },
  m14: { photo: 'https://static.tildacdn.com/tild6537-6137-4239-a630-323765383839/7R201446.jpg', social: '' },
  m15: { photo: 'https://static.tildacdn.com/tild3961-3566-4536-b334-636632383732/7R201128.jpg', social: '' }
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

function renderGalleryTrack(items) {
  const track = document.getElementById('marqueeTrackMain');
  if (!track || !Array.isArray(items) || items.length === 0) return;
  track.innerHTML = items.map(g => `
    <div class="marquee-card" onclick="openGalleryLightbox('${g.img}', '${(g.title || '').replace(/'/g, "\\'")}')">
      <img src="${g.img}" alt="${g.title || 'GTT'}" loading="lazy">
      <div class="marquee-card-meta">
        <span class="marquee-card-tag">${g.tag || 'RDRC'}</span>
        <div class="marquee-card-title">${g.title || ''}</div>
      </div>
    </div>
  `).join('');
}

// Dynamic Records Synchronization
async function syncRecordsFromAPI() {
  try {
    const local = localStorage.getItem('gtt_admin_records_db');
    if (local) {
      const parsed = JSON.parse(local);
      if (Array.isArray(parsed) && parsed.length > 0) {
        renderRecordsEditorial(parsed);
      }
    }
  } catch (e) {}

  try {
    const res = await fetch('/api/records');
    if (!res.ok) return;
    const serverRecs = await res.json();
    if (Array.isArray(serverRecs) && serverRecs.length > 0) {
      localStorage.setItem('gtt_admin_records_db', JSON.stringify(serverRecs));
      renderRecordsEditorial(serverRecs);
    }
  } catch (err) {}
}

function renderRecordsEditorial(recordsList) {
  const container = document.querySelector('.records-editorial-table');
  if (!container || !Array.isArray(recordsList) || recordsList.length === 0) return;
  // Update editorial rows if rendered dynamically
}

// Multi-Tab Real-Time Sync Listener
window.addEventListener('storage', (e) => {
  if (e.key === 'gtt_admin_cars_db' || e.key === 'gtt_projects_v2') {
    syncProjectsFromAPI();
  } else if (e.key === 'gtt_admin_team_db' || e.key === 'gtt_team_v2') {
    syncTeamFromAPI();
  } else if (e.key === 'gtt_admin_gallery_db') {
    syncGalleryFromAPI();
  } else if (e.key === 'gtt_admin_records_db') {
    syncRecordsFromAPI();
  } else if (e.key === 'gtt_hero_telemetry_custom') {
    if (typeof applyCustomHeroTelemetry === 'function') applyCustomHeroTelemetry();
  }
});

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
        expandText.textContent = isTeamExpanded 
          ? 'Свернуть состав команды' 
          : `Показать всю команду (ещё ${cards.length - 8} специалистов)`;
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
    const photo = m.photo || asset.photo;
    const social = m.social !== undefined ? m.social : asset.social;
    const dept = getDeptByRole(m.role);
    return `
      <div class="team-card" data-team-dept="${dept}">
        <div class="team-card-photo">
          <img src="${photo}" alt="${m.name}" loading="lazy" onerror="this.src='assets/photos/gtt_shield_logo.svg'">
        </div>
        <div class="team-card-body">
          <span class="team-role">${m.role}</span>
          <h3 class="team-name">${m.name}</h3>
          ${social ? `<span class="team-social">${social}</span>` : ''}
        </div>
      </div>
    `;
  }).join('');
  updateTeamVisibility();
}

// --- Engineering & Team Access Gateway (Stealth & Secure) ---
function openAdminSecure(e) {
  if (e && e.preventDefault) e.preventDefault();
  if (e && e.stopPropagation) e.stopPropagation();
  window.location.href = '/gtt71';
}

// 1. Global Keyboard Shortcut for PC / Mac: Cmd+Shift+A or Ctrl+Shift+A
function handleAdminKeydown(e) {
  const hasModifier = e.ctrlKey || e.metaKey;
  const isKeyA = e.code === 'KeyA' || e.key === 'A' || e.key === 'a' || e.key === 'Ф' || e.key === 'ф';
  
  if (hasModifier && e.shiftKey && isKeyA) {
    e.preventDefault();
    e.stopPropagation();
    openAdminSecure();
  }
}

// 2. Secret Typist Code: type 'admin' or 'gtt' anywhere on page
let secretCodeBuffer = '';
function handleSecretKeypress(e) {
  if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;
  if (e.key && e.key.length === 1) {
    secretCodeBuffer += e.key.toLowerCase();
    if (secretCodeBuffer.length > 12) secretCodeBuffer = secretCodeBuffer.slice(-12);
    if (secretCodeBuffer.endsWith('admin') || secretCodeBuffer.endsWith('gtt') || secretCodeBuffer.endsWith('админ')) {
      secretCodeBuffer = '';
      openAdminSecure();
    }
  }
}

// 3. Mobile Secret Touch Gesture (Hold brand logo for 3.5s)
let logoPressTimer = null;
function initMobileStaffGesture() {
  const brandLogo = document.querySelector('.brand-logo');
  if (!brandLogo) return;

  const startPress = (e) => {
    if (e.type === 'touchstart') {
      logoPressTimer = setTimeout(() => {
        if ('vibrate' in navigator) navigator.vibrate(60);
        openAdminSecure();
      }, 3500);
    }
  };

  const cancelPress = () => {
    if (logoPressTimer) {
      clearTimeout(logoPressTimer);
      logoPressTimer = null;
    }
  };

  brandLogo.addEventListener('touchstart', startPress, { passive: true });
  brandLogo.addEventListener('touchend', cancelPress, { passive: true });
  brandLogo.addEventListener('touchmove', cancelPress, { passive: true });
}

// 4. Stealth Triple-Click on Footer Copyright text
let footerCopyClicks = 0;
let footerCopyTimer = null;
function initFooterStaffAccess() {
  const footerCopy = document.getElementById('footerCopyStaffTrigger') || document.querySelector('.footer-copy-text');
  if (footerCopy) {
    footerCopy.addEventListener('click', () => {
      footerCopyClicks++;
      clearTimeout(footerCopyTimer);
      if (footerCopyClicks >= 3) {
        footerCopyClicks = 0;
        openAdminSecure();
      } else {
        footerCopyTimer = setTimeout(() => {
          footerCopyClicks = 0;
        }, 1200);
      }
    });
  }
}

window.addEventListener('keydown', handleAdminKeydown, true);
window.addEventListener('keypress', handleSecretKeypress, true);
document.addEventListener('DOMContentLoaded', () => {
  initFooterStaffAccess();
  initMobileStaffGesture();
});

window.openAdminDirect = openAdminSecure;

// Clean Premium Motorsport Preloader (Fast, Seamless & Silky Smooth)
function initPreloader() {
  const preloader = document.getElementById('preloader');
  const fill = document.getElementById('preloaderFill');
  const heroVideo = document.querySelector('.hero-video-bg');
  
  window.scrollTo(0, 0);

  if (heroVideo) {
    heroVideo.play().catch(() => {});
  }

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
        if (heroVideo && heroVideo.paused) {
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

let isGarageExpanded = false;

window.toggleGarageExpand = function() {
  isGarageExpanded = !isGarageExpanded;
  const activeFilter = document.querySelector('#carsFilterPills .filter-pill.active')?.getAttribute('data-filter') || 'all';
  renderGarageGrid(activeFilter);
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

    // 2. Pagination for 'all' filter (12 builds total)
    const expandWrap = document.getElementById('garageExpandWrap');
    const expandBtn = document.getElementById('btnGarageExpand');
    const expandText = document.getElementById('garageExpandText');

    let displayList = filtered;
    if (filterType === 'all') {
      if (!isGarageExpanded && filtered.length > 9) {
        displayList = filtered.slice(0, 9);
        if (expandWrap) expandWrap.style.display = 'flex';
        if (expandBtn) expandBtn.classList.remove('is-expanded');
        if (expandText) expandText.textContent = `Показать все проекты (ещё ${filtered.length - 9} болида)`;
      } else {
        if (expandWrap) expandWrap.style.display = 'flex';
        if (expandBtn) expandBtn.classList.add('is-expanded');
        if (expandText) expandText.textContent = 'Свернуть каталог проектов';
      }
    } else {
      if (expandWrap) expandWrap.style.display = 'none';
    }

    container.innerHTML = displayList.map((car, idx) => {
      const name = (typeof car.name === 'object') ? (car.name[currentLang] || car.name.ru) : car.name;
      const desc = (typeof car.desc === 'object') ? (car.desc[currentLang] || car.desc.ru) : car.desc;
      const badge = (typeof car.badge === 'object') ? (car.badge[currentLang] || car.badge.ru) : car.badge;
      const tag = (typeof car.tag === 'object') ? (car.tag[currentLang] || car.tag.ru) : car.tag;

      return `
      <div class="car-card car-card-fade-in" data-id="${car.id}" style="animation-delay: ${idx * 0.04}s">
        <span class="car-card-badge">${badge}</span>
        <div class="car-card-media">
          <img class="car-card-img ${car.isPhoto ? 'photo-fit' : ''}" 
               src="${car.img}" 
               alt="${name}" 
               style="${car.objectPosition ? `object-position: ${car.objectPosition};` : ''}"
               onerror="if('${car.fallbackImg}'){this.src='${car.fallbackImg}'}">
        </div>
        <div class="car-card-info">
          <div class="car-brand">${car.brand} • ${tag}</div>
          <h3 class="car-model-title">${name}</h3>
          <p class="car-card-desc">${desc}</p>
          <div class="car-specs-row">
            <div class="spec-cell">
              <div class="spec-val">${car.hp}</div>
              <div class="spec-lbl">${i18n[currentLang].spec_power}</div>
            </div>
            <div class="spec-cell">
              <div class="spec-val">${car.quarterMile}</div>
              <div class="spec-lbl">${i18n[currentLang].spec_402}</div>
            </div>
            <div class="spec-cell">
              <div class="spec-val">${car.topSpeed}</div>
              <div class="spec-lbl">${i18n[currentLang].spec_speed}</div>
            </div>
          </div>
          <div class="car-card-footer" style="display: flex; gap: 8px; justify-content: flex-end; align-items: center;">
            ${(car.videoSrc || car.youtubeId) ? `
              <button class="btn-card-details" style="background: rgba(255,100,37,0.15); border-color: var(--gtt-orange); color: var(--gtt-orange); display: inline-flex; align-items: center; gap: 5px;" onclick="event.stopPropagation(); openCarVideo('${car.id}')">
                <span>▶</span> ${currentLang === 'ru' ? 'Видео заезда' : 'Race Video'}
              </button>
            ` : ''}
            <button class="btn-card-details" onclick="openCarModal('${car.id}')">${i18n[currentLang].btn_passport}</button>
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
    caption: 'Гоша на дрэг-стрипе RDRC'
  },
  {
    src: 'assets/photos/gosha_zadorkin_new.jpg',
    caption: 'Гоша Перцхелия — Основатель GTT'
  },
  {
    src: 'assets/photos/gosha_on_track.jpg',
    caption: 'Контроль боевого выезда на клей'
  }
];

// Preload all founder photos immediately into browser cache
founderPhotos.forEach(item => {
  const p = new Image();
  p.src = item.src;
});

let currentFounderIndex = 0;

window.switchFounderPhoto = function(step) {
  currentFounderIndex = (currentFounderIndex + step + founderPhotos.length) % founderPhotos.length;
  updateFounderPhoto();
};

window.setFounderPhoto = function(idx) {
  currentFounderIndex = idx;
  updateFounderPhoto();
};

function updateFounderPhoto() {
  const img = document.getElementById('founderImg');
  const caption = document.getElementById('founderImgCaption');
  const dots = document.querySelectorAll('.gallery-dot');
  
  if (!img) return;

  img.style.opacity = '0.35';

  setTimeout(() => {
    img.src = founderPhotos[currentFounderIndex].src;
    if (caption) caption.textContent = founderPhotos[currentFounderIndex].caption;
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentFounderIndex);
    });
    img.style.opacity = '1';
  }, 60);
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

  // Update on click as well
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
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
      <img src="${car.img}" alt="${name}" class="carmodal-hero-img" onerror="if('${car.fallbackImg}'){this.src='${car.fallbackImg}'}">
    </div>

    <!-- Big 3 Telemetry Metrics Grid -->
    <div class="carmodal-metrics-grid">
      <div class="carmodal-metric-card">
        <div class="carmodal-metric-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
        </div>
        <div class="carmodal-metric-val">${car.hp}</div>
        <div class="carmodal-metric-lbl">${i18n[currentLang].spec_power}</div>
      </div>
      <div class="carmodal-metric-card">
        <div class="carmodal-metric-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="8"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="9" y1="2" x2="15" y2="2"/></svg>
        </div>
        <div class="carmodal-metric-val">${car.quarterMile}</div>
        <div class="carmodal-metric-lbl">${i18n[currentLang].spec_402}</div>
      </div>
      <div class="carmodal-metric-card">
        <div class="carmodal-metric-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m16.2 7.8-4.2 4.2"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.9 4.9 1.4 1.4"/><path d="m17.7 17.7 1.4 1.4"/><path d="M2 12h2"/><path d="M20 12h2"/></svg>
        </div>
        <div class="carmodal-metric-val">${car.topSpeed}</div>
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
window.openCarVideo = function(carId) {
  const car = gttProjects.find(c => c.id === carId);
  if (!car) return;
  const name = (typeof car.name === 'object') ? (car.name[currentLang] || car.name.ru) : car.name;
  
  if (car.youtubeId) {
    window.openYouTubePlayer(car.youtubeId, car.videoStart, car.videoEnd, car.videoTitle || name);
  } else if (car.videoSrc) {
    window.openVideoPlayer(car.videoSrc, car.videoTitle || name);
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

// Video Player Modal - Handles any video source dynamically with fullscreen support
window.openVideoPlayer = function(videoSrc, title) {
  const modal = document.getElementById('videoModal');
  const container = document.getElementById('videoContainer');
  if (!modal || !container) return;

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

      <video id="activeModalVideo" controls playsinline webkit-playsinline preload="metadata" style="position: relative; z-index: 2; width: 100%; height: 100%; object-fit: contain; background: #000;">
        <source src="${videoSrc}" type="video/mp4">
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
    videoEl.addEventListener('playing', hideSpinner, { once: true });
    videoEl.addEventListener('error', hideSpinner, { once: true });
    
    // Attempt smooth play, fallback to user touch on mobile policies
    const playPromise = videoEl.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay policy prevented playback, user can tap native play control
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
      <p>Настоящая Политика обработки персональных данных составлена в соответствии с требованиями Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных» и определяет порядок сбора, обработки и защиты информации лаборатории GoshaTurboTech (GTT).</p>
      
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

// Fullscreen Photo Lightbox
window.openGalleryLightbox = function(src, caption) {
  const modal = document.getElementById('galleryLightbox');
  const img = document.getElementById('lightboxImg');
  const cap = document.getElementById('lightboxCaption');
  if (!modal || !img) return;

  img.src = src;
  img.alt = caption || 'GoshaTurboTech Motorsport';
  if (cap) cap.textContent = caption || '';
  modal.classList.add('active');
};

window.closeGalleryLightbox = function() {
  const modal = document.getElementById('galleryLightbox');
  if (modal) modal.classList.remove('active');
};

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

// 6. Interactive Gallery Filmstrip Slider (Infinite Seamless Circular Loop)
function initGalleryMarqueeInteractions() {
  const wrapper = document.querySelector('.marquee-stream-wrapper');
  const track = document.getElementById('marqueeTrackMain');
  const counterEl = document.getElementById('galleryCurrentIdx');
  if (!wrapper || !track) return;

  const originalCards = Array.from(track.querySelectorAll('.marquee-card'));
  const totalCards = originalCards.length;
  if (!totalCards) return;

  // Mark original indexes
  originalCards.forEach((card, idx) => {
    card.setAttribute('data-index', idx);
  });

  // Create infinite clone buffers (1 set before, 1 set after)
  if (!track.dataset.infiniteInitialized) {
    track.dataset.infiniteInitialized = 'true';
    
    // Post-clones (after)
    originalCards.forEach((card, idx) => {
      const clone = card.cloneNode(true);
      clone.setAttribute('data-index', idx);
      clone.classList.add('is-clone');
      track.appendChild(clone);
    });

    // Pre-clones (before)
    originalCards.slice().reverse().forEach((card, reverseIdx) => {
      const idx = totalCards - 1 - reverseIdx;
      const clone = card.cloneNode(true);
      clone.setAttribute('data-index', idx);
      clone.classList.add('is-clone');
      track.insertBefore(clone, track.firstChild);
    });
  }

  const allCards = Array.from(track.querySelectorAll('.marquee-card'));
  let singleCycleWidth = 0;
  let isDown = false;
  let startX = 0;
  let startScrollLeft = 0;
  let isDragging = false;
  let autoTimer = null;
  let isNormalizing = false;

  function measureCycle() {
    singleCycleWidth = originalCards[0].offsetLeft - allCards[0].offsetLeft;
    if (singleCycleWidth <= 0) {
      const cardW = originalCards[0].offsetWidth || 460;
      singleCycleWidth = (cardW + 24) * totalCards;
    }
  }

  measureCycle();

  // Position viewport at start of original set
  const initOffset = originalCards[0].offsetLeft - (wrapper.clientWidth - originalCards[0].offsetWidth) / 2;
  wrapper.scrollLeft = Math.max(0, initOffset);

  function getActiveCard() {
    const wrapperCenter = wrapper.scrollLeft + wrapper.clientWidth / 2;
    let closestCard = originalCards[0];
    let minDiff = Infinity;
    
    allCards.forEach(card => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const diff = Math.abs(wrapperCenter - cardCenter);
      if (diff < minDiff) {
        minDiff = diff;
        closestCard = card;
      }
    });
    return closestCard;
  }

  function updateCounter() {
    if (!counterEl) return;
    const card = getActiveCard();
    const realIdx = parseInt(card.getAttribute('data-index') || '0', 10);
    counterEl.textContent = String(realIdx + 1).padStart(2, '0');
  }

  // Seamless Infinite Boundary Normalizer
  function checkBoundaryWrap() {
    if (isNormalizing || !singleCycleWidth) return;
    const currentScroll = wrapper.scrollLeft;
    const baseOffset = originalCards[0].offsetLeft - (wrapper.clientWidth - originalCards[0].offsetWidth) / 2;
    const maxBoundary = baseOffset + singleCycleWidth - 40;
    const minBoundary = baseOffset - 40;

    if (currentScroll >= maxBoundary) {
      isNormalizing = true;
      wrapper.scrollLeft -= singleCycleWidth;
      if (isDown) startScrollLeft -= singleCycleWidth;
      requestAnimationFrame(() => { isNormalizing = false; });
    } else if (currentScroll < minBoundary) {
      isNormalizing = true;
      wrapper.scrollLeft += singleCycleWidth;
      if (isDown) startScrollLeft += singleCycleWidth;
      requestAnimationFrame(() => { isNormalizing = false; });
    }
  }

  // Next / Prev Arrow Navigation with Infinite Circular Wrap
  window.scrollGalleryTrack = function(direction) {
    pauseAuto();
    checkBoundaryWrap();
    const currentCard = getActiveCard();
    const currentIdx = allCards.indexOf(currentCard);
    const targetIdx = currentIdx + direction;

    if (targetIdx >= 0 && targetIdx < allCards.length) {
      const targetCard = allCards[targetIdx];
      const targetScroll = targetCard.offsetLeft - (wrapper.clientWidth - targetCard.offsetWidth) / 2;
      wrapper.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
    resumeAuto();
  };

  // Scroll listener for counter & boundary check
  let scrollTimeout = null;
  wrapper.addEventListener('scroll', () => {
    checkBoundaryWrap();
    if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(updateCounter, 50);
  }, { passive: true });

  // Mouse drag-to-scroll
  wrapper.addEventListener('mousedown', (e) => {
    isDown = true;
    isDragging = false;
    startX = e.pageX;
    startScrollLeft = wrapper.scrollLeft;
    pauseAuto();
  });

  window.addEventListener('mouseup', () => {
    if (!isDown) return;
    isDown = false;
    checkBoundaryWrap();
    resumeAuto();
  });

  wrapper.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    const dx = e.pageX - startX;
    if (Math.abs(dx) > 5) {
      isDragging = true;
      e.preventDefault();
      wrapper.scrollLeft = startScrollLeft - dx;
      checkBoundaryWrap();
    }
  });

  // Prevent opening lightbox modal when dragging
  allCards.forEach(card => {
    card.addEventListener('click', (e) => {
      if (isDragging) {
        e.stopImmediatePropagation();
        e.preventDefault();
        isDragging = false;
      }
    }, true);
  });

  // Touch handlers
  wrapper.addEventListener('touchstart', () => {
    pauseAuto();
  }, { passive: true });

  wrapper.addEventListener('touchend', () => {
    checkBoundaryWrap();
    resumeAuto();
  }, { passive: true });

  // Gentle auto-advance (pauses on hover)
  function pauseAuto() {
    if (autoTimer) clearInterval(autoTimer);
  }

  function resumeAuto() {
    pauseAuto();
    autoTimer = setInterval(() => {
      if (window.scrollGalleryTrack) {
        window.scrollGalleryTrack(1);
      }
    }, 5500);
  }

  wrapper.addEventListener('mouseenter', pauseAuto);
  wrapper.addEventListener('mouseleave', resumeAuto);

  window.addEventListener('resize', () => {
    measureCycle();
    checkBoundaryWrap();
  });

  // Initialize
  updateCounter();
  resumeAuto();
}

window.scrollGalleryTrack = function(dir) {
  const wrapper = document.querySelector('.marquee-stream-wrapper');
  if (wrapper && window.scrollGalleryTrack) {
    // Overridden inside initGalleryMarqueeInteractions
  }
};


/* ==========================================================================
   TOUCH GESTURES FOR FOUNDER CAROUSEL
   ========================================================================== */
function initFounderGestures() {
  const wrapper = document.getElementById('founderGalleryWrapper');
  if (!wrapper) return;

  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;

  wrapper.addEventListener('touchstart', (e) => {
    if (e.changedTouches && e.changedTouches[0]) {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }
  }, { passive: true });

  wrapper.addEventListener('touchend', (e) => {
    if (!e.changedTouches || !e.changedTouches[0]) return;
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;

    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;

    // Only trigger if horizontal swipe is prominent and exceeds 40px
    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX < 0) {
        // Swiped Left -> Next photo
        window.switchFounderPhoto(1);
      } else {
        // Swiped Right -> Previous photo
        window.switchFounderPhoto(-1);
      }
    }
  }, { passive: true });
}

/* ==========================================================================
   MOBILE STICKY ACTION BAR CONTROLLER (Auto-hide on modals / bottom)
   ========================================================================== */
function initMobileStickyBar() {
  const bar = document.getElementById('mobileBottomBar');
  if (!bar) return;

  let isPreloaderActive = true;

  // Reveal bar only after preloader is completely faded out
  const preloaderEl = document.getElementById('preloader');
  if (preloaderEl) {
    const checkPreloader = setInterval(() => {
      if (preloaderEl.style.display === 'none' || preloaderEl.classList.contains('fade-out')) {
        clearInterval(checkPreloader);
        setTimeout(() => {
          isPreloaderActive = false;
          bar.classList.add('visible');
        }, 600);
      }
    }, 200);
  } else {
    isPreloaderActive = false;
    bar.classList.add('visible');
  }

  function updateBarVisibility() {
    if (isPreloaderActive) {
      bar.classList.remove('visible');
      return;
    }

    const anyModalActive = document.querySelector('.modal-overlay.active, .video-modal-overlay.active, .gallery-lightbox-modal.active, .mobile-drawer.active');
    const contactEl = document.getElementById('contact');
    let isContactInView = false;
    if (contactEl) {
      const rect = contactEl.getBoundingClientRect();
      isContactInView = (rect.top <= window.innerHeight * 0.75) && (rect.bottom >= 50);
    }
    const isNearBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 60);

    if (anyModalActive || isContactInView || isNearBottom) {
      bar.classList.add('hidden');
      bar.classList.remove('visible');
    } else {
      bar.classList.remove('hidden');
      bar.classList.add('visible');
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



