/**
 * GOSHA TURBOTECH - Interactive Engine & Dataset
 * Strictly visual, data-driven, authentic engineering showcase
 */

const gttProjects = [
  {
    id: 'gtr_lucifer',
    brand: 'NISSAN & GTT',
    name: {
      ru: 'GT-R R35 «LUCIFER» GTT #71 CHAMPION',
      en: 'GT-R R35 «LUCIFER» GTT #71 CHAMPION'
    },
    type: 'gtr',
    tag: {
      ru: 'ЧЕМПИОН RDRC • ПИЛОТ ГЕОРГИЙ ПЕРЦХЕЛИЯ #71',
      en: 'RDRC CHAMPION • PILOT GEORGY PERTSKHELIYA #71'
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
      ru: 'Победоносный огненный болид Георгия Зурабовича Перцхелия (Гоши), борт №71. Построенный в лаборатории GoshaTurboTech драг-монстр в культовой ливрее адского пламени — триумфатор и победитель финалов чемпионата России RDRC. Максимальное облегчение, биллетовый блок и яростный старт.',
      en: 'Victorious hellfire-liveried race weapon piloted by Georgy Pertskheliya himself (race car #71). Built in the GoshaTurboTech skunkworks — champion and winner of Russian Drag Racing Championship (RDRC) finals. Billet engine, extreme lightweight drag chassis and brutal AWD launches.'
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
      ru: 'BMW M5 COMPETITION GTT-STAGE 3',
      en: 'BMW M5 COMPETITION GTT-STAGE 3'
    },
    type: 'bmw',
    tag: {
      ru: 'RDRC ДРЭГ-КИЛЛЕР • СИНИЙ БОЛИД GTT',
      en: 'RDRC DRAG WEAPON • BLUE GTT BULLET'
    },
    hp: '1,050+ HP',
    quarterMile: '9.420 сек',
    topSpeed: '340+ км/ч',
    badge: {
      ru: 'Боевая BMW Гоши Турботех',
      en: 'GoshaTurboTech Race BMW'
    },
    img: 'assets/cars/bmw_m5_rdrc_race.jpg',
    fallbackImg: 'assets/cars/bmw_m5_rdrc_race.jpg',
    isPhoto: true,
    videoSrc: 'assets/videos/r8_acceleration.mp4',
    videoTitle: 'BMW M5 Competition GTT — боевой разгон',
    desc: {
      ru: 'Заряженная боевая BMW M5 от GoshaTurboTech, выступающая в чемпионате России по дрэг-рейсингу RDRC. Полный привод M xDrive, гибридные турбины GTT и кованый низ S63.',
      en: 'Competition BMW M5 built by GoshaTurboTech competing in RDRC. M xDrive AWD system, custom GTT hybrid billet turbos, and forged S63 internals.'
    },
    specs: {
      engine: '4.4L V8 TwinPower Turbo (S63B44T4) GTT Spec',
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
  }
];

// Full Bilingual Dictionary (Russian & English)
const i18n = {
  ru: {
    nav_garage: "Гараж проектов",
    nav_records: "Рекорды RDRC",
    nav_founder: "О Гоше",
    nav_team: "Команда GTT",
    nav_moto: "Moto Division",
    nav_gallery: "Жизнь ателье",
    nav_contact: "Связь",
    nav_telegram: "Telegram Канал",
    preloader_tag: "Инженерия Скорости & Мощности • Москва",
    hero_tag: "World Record Engineering • Moscow • RDRC",
    hero_title: `Инженерия <br><span class="gradient-text">запредельной</span> <br>скорости`,
    hero_desc: "Лаборатория спортивного инжиниринга Георгия Зурабовича Перцхелия (GoshaTurboTech). Победители Unlim 500+, триумфаторы Чемпионата России RDRC и абсолютные рекордсмены ледовых трасс Байкала. Мы форсируем суперкары BMW M, Nissan GT-R, Audi R8, Lamborghini и супербайки до 1800+ л.с.",
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
    contact_hq_title: "Лаборатория GoshaTurboTech",
    contact_hq_desc: "Центр спортивного инжиниринга и персональной доработки суперкаров и мотоциклов. По вопросам постройки индивидуального проекта или консультации свяжитесь с командой напрямую.",
    contact_phone_lbl: "Телефон мастерской",
    contact_tg_lbl: "Официальный Telegram канал",
    contact_loc_lbl: "Локация ателье",
    contact_loc_val: "г. Москва, Можайское шоссе, 168",
    contact_btn_tg: "<span>✈️</span> Написать в Telegram GTT",
    contact_btn_navi: "<span>🗺️</span> Маршрут в Яндекс Навигаторе",
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
    founder_caption: "Георгий на стартовой полосе RDRC",
    founder_tagline: "Основатель & Главный идеолог GTT",
    founder_manifesto: "// THE FOUNDER & PHILOSOPHY",
    founder_name: "Георгий Зурабович Перцхелия",
    founder_quote: "«Настоящий тюнинг — это не просто прикрутить турбину большего размера. Это искусство собрать сложнейший механизм так, чтобы он разгонялся до 350 км/ч на треке, а затем с абсолютным комфортом вез вас домой по вечернему городу».",
    founder_bio: "За 15+ лет увлечения предельной скоростью Георгий Зурабович Перцхелия (Гоша) прошел путь от первых кастомных турбо-проектов до постройки сложнейших 1800-сильных гиперкаров, признанных мировым сообществом энтузиастов. Он лично курирует инженерные разработки, калибрует электронные блоки управления и тестирует болиды на треках RDRC и ледовых просторах Байкала.",
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
    gallery_subtitle: "Живые кадры с трассы Чемпионата России RDRC и из лаборатории GoshaTurboTech.",
    gallery_cap_zelenka: "Легендарная Lamborghini Huracan TT «Зеленка» RDRC",
    gallery_cap_dodge: "Dodge Challenger SRT Hellcat: дымный прогрев сликов на закате RDRC",
    gallery_cap_draco: "3000+ HP Nissan GT-R Draco Pro-Mod на сликах RDRC",
    gallery_cap_r8: "Audi R8 V10 Twin Turbo ЦМРБанк на стартовой черте RDRC",
    gallery_cap_gtr_red: "Красный хромированный Nissan GT-R R35 GTT Pro-Mod",
    gallery_cap_gtr_blue: "Боевой синий Nissan GT-R R35 #888 на закате RDRC",
    gallery_cap_box: "Бокс GTT: белая BMW M4 G82 и Nissan GT-R",
    gallery_cap_track: "Георгий Перцхелия контролирует подготовку трассы RDRC"
  },
  en: {
    nav_garage: "Garage Builds",
    nav_records: "RDRC Records",
    nav_founder: "About Gosha",
    nav_team: "GTT Crew",
    nav_moto: "Moto Division",
    nav_gallery: "Motorsport Life",
    nav_contact: "Contact",
    nav_telegram: "Telegram Channel",
    preloader_tag: "Speed & Power Engineering • Moscow",
    hero_tag: "World Record Engineering • Moscow • RDRC",
    hero_title: `Engineering of <br><span class="gradient-text">ultimate</span> <br>velocity`,
    hero_desc: "Georgy Zurabovich Pertskheliya's (Gosha) motorsport engineering laboratory. Champions of Unlim 500+, Russian Drag Racing Championship (RDRC) and Lake Baikal ice speed record holders. We engineer BMW M, Nissan GT-R, Audi R8, Lamborghini and superbikes up to 1800+ HP.",
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
    contact_hq_title: "GoshaTurboTech Laboratory",
    contact_hq_desc: "Motorsport engineering center and bespoke performance laboratory for supercars and superbikes. To inquire about a custom project or technical advice, contact our crew directly.",
    contact_phone_lbl: "Workshop Direct Line",
    contact_tg_lbl: "Official Telegram Channel",
    contact_loc_lbl: "Atelier Location",
    contact_loc_val: "168 Mozhayskoye Highway, Moscow, Russia",
    contact_btn_tg: "<span>✈️</span> Message GTT on Telegram",
    contact_btn_navi: "<span>🗺️</span> Open in Yandex Navigator",
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
    founder_caption: "Georgy at the RDRC Starting Line",
    founder_tagline: "Founder & Chief Visionary of GTT",
    founder_manifesto: "// THE FOUNDER & PHILOSOPHY",
    founder_name: "Georgy Zurabovich Pertskheliya",
    founder_quote: "“True tuning is never just about bolting on a larger turbocharger. It is the fine art of crafting a sophisticated machine that accelerates to 350 km/h on the track, yet drives you home in total comfort through city streets.”",
    founder_bio: "Over 15+ years of chasing ultimate velocity, Georgy Zurabovich Pertskheliya (Gosha) evolved from custom turbo prototypes to building bespoke 1,800+ HP hypercars recognized worldwide. He personally oversees powertrain engineering, calibrates ECUs and tests builds on RDRC strips and Lake Baikal ice.",
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

  // Re-render garage grid with translated spec labels
  const activeFilter = document.querySelector('.filter-pill.active')?.getAttribute('data-filter') || 'all';
  renderGarageGrid(activeFilter);
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
  initNavigation();
  initFilters();
  initModal();
  initSpecialEffects();
  initGalleryMarqueeInteractions();
  initFounderGestures();
  initMobileStickyBar();
  initTelemetryCounters();
});

// Clean Premium Motorsport Preloader (Silky Smooth 60fps Easing with video buffering)
function initPreloader() {
  const preloader = document.getElementById('preloader');
  const fill = document.getElementById('preloaderFill');
  const heroVideo = document.querySelector('.hero-video-bg');
  
  window.scrollTo(0, 0);

  // Kickstart video playback immediately
  if (heroVideo) {
    heroVideo.play().catch(() => {});
  }

  let finished = false;
  const startTime = performance.now();
  const totalDuration = 1400; // ms (gives video plenty of time to buffer and start playing behind)

  function frame(now) {
    if (finished) return;
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / totalDuration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const percent = Math.min(Math.round(eased * 100), 100);

    if (fill) fill.style.width = `${percent}%`;

    if (progress < 1) {
      requestAnimationFrame(frame);
    } else {
      finished = true;
      if (fill) fill.style.width = '100%';
      setTimeout(() => {
        if (heroVideo && heroVideo.paused) {
          heroVideo.play().catch(() => {});
        }
        if (preloader) {
          preloader.classList.add('fade-out');
          window.scrollTo(0, 0);
          setTimeout(() => {
            preloader.style.display = 'none';
          }, 850);
        }
      }, 150);
    }
  }

  requestAnimationFrame(frame);
}

// Render Garage Grid with smooth animation & bilingual support
function renderGarageGrid(filterType) {
  const container = document.getElementById('garageGrid');
  if (!container) return;

  container.classList.add('filtering');

  setTimeout(() => {
    const filtered = filterType === 'all' 
      ? gttProjects 
      : gttProjects.filter(item => item.type === filterType);

    container.innerHTML = filtered.map((car, idx) => {
      const name = (typeof car.name === 'object') ? (car.name[currentLang] || car.name.ru) : car.name;
      const desc = (typeof car.desc === 'object') ? (car.desc[currentLang] || car.desc.ru) : car.desc;
      const badge = (typeof car.badge === 'object') ? (car.badge[currentLang] || car.badge.ru) : car.badge;
      const tag = (typeof car.tag === 'object') ? (car.tag[currentLang] || car.tag.ru) : car.tag;

      return `
      <div class="car-card car-card-fade-in" data-id="${car.id}" style="animation-delay: ${idx * 0.08}s">
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
  }, 160);
}

// Interactive Founder Photo Switcher
const founderPhotos = [
  {
    src: 'assets/photos/gosha_strip_selfie.jpg',
    caption: 'Гоша на дрэг-стрипе RDRC'
  },
  {
    src: 'assets/photos/gosha_zadorkin_new.jpg',
    caption: 'Георгий Зурабович Перцхелия — Основатель GTT'
  },
  {
    src: 'assets/photos/gosha_on_track.jpg',
    caption: 'Контроль боевого выезда на клей'
  }
];

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

  img.style.opacity = '0';
  img.style.transform = 'scale(0.97)';

  setTimeout(() => {
    img.src = founderPhotos[currentFounderIndex].src;
    if (caption) caption.textContent = founderPhotos[currentFounderIndex].caption;
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentFounderIndex);
    });
    img.style.opacity = '1';
    img.style.transform = 'scale(1)';
  }, 200);
}

// Navigation Scroll Effect
function initNavigation() {
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// Filter Navigation
function initFilters() {
  const pills = document.querySelectorAll('.filter-pill');
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
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
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
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
      <span style="font-family: var(--font-mono); font-size: 12px; color: var(--gtt-orange); text-transform: uppercase;">
        // GTT PROJECT PASSPORT
      </span>
      <span style="background: rgba(255,100,37,0.15); border: 1px solid var(--gtt-orange); color: var(--gtt-orange); font-size: 11px; padding: 2px 8px; border-radius: 4px; font-family: var(--font-mono);">
        ${badge}
      </span>
    </div>
    
    <h2 style="font-family: var(--font-display); font-size: clamp(22px, 3.5vw, 30px); font-weight: 800; text-transform: uppercase; margin-bottom: 20px;">
      ${name}
    </h2>

    <div style="text-align: center; background: radial-gradient(circle, rgba(255,100,37,0.06) 0%, transparent 70%); padding: 20px; border-radius: 12px; margin-bottom: 24px; border: 1px solid var(--border-subtle); max-height: 280px; overflow: hidden; display: flex; align-items: center; justify-content: center;">
      <img src="${car.img}" alt="${name}" style="max-width: 95%; max-height: 240px; object-fit: contain; filter: drop-shadow(0 15px 30px rgba(0,0,0,0.8));">
    </div>

    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 24px;">
      <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-subtle); padding: 14px; border-radius: 8px; text-align: center;">
        <div style="font-family: var(--font-display); font-size: 20px; font-weight: 700; color: #fff;">${car.hp}</div>
        <div style="font-family: var(--font-mono); font-size: 11px; color: var(--text-dim); text-transform: uppercase; margin-top: 4px;">${i18n[currentLang].spec_power}</div>
      </div>
      <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-subtle); padding: 14px; border-radius: 8px; text-align: center;">
        <div style="font-family: var(--font-display); font-size: 20px; font-weight: 700; color: #fff;">${car.quarterMile}</div>
        <div style="font-family: var(--font-mono); font-size: 11px; color: var(--text-dim); text-transform: uppercase; margin-top: 4px;">${i18n[currentLang].spec_402}</div>
      </div>
      <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-subtle); padding: 14px; border-radius: 8px; text-align: center;">
        <div style="font-family: var(--font-display); font-size: 20px; font-weight: 700; color: #fff;">${car.topSpeed}</div>
        <div style="font-family: var(--font-mono); font-size: 11px; color: var(--text-dim); text-transform: uppercase; margin-top: 4px;">${i18n[currentLang].spec_speed}</div>
      </div>
    </div>

    <p style="font-size: 14px; color: var(--text-muted); line-height: 1.7; margin-bottom: 24px;">
      ${desc}
    </p>

    <h4 style="font-family: var(--font-mono); font-size: 12px; color: var(--gtt-orange); text-transform: uppercase; margin-bottom: 12px; letter-spacing: 0.1em;">
      // ${currentLang === 'ru' ? 'Спецификация конфигурации' : 'Configuration Specs'}
    </h4>
    <div style="background: rgba(0,0,0,0.4); border: 1px solid var(--border-subtle); border-radius: 10px; padding: 16px; margin-bottom: 24px;">
      ${Object.entries(car.specs).map(([key, val]) => `
        <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.04); font-size: 13px;">
          <span style="font-family: var(--font-mono); color: var(--text-dim); text-transform: uppercase;">${key}</span>
          <span style="color: #fff; font-weight: 500; text-align: right;">${val}</span>
        </div>
      `).join('')}
    </div>

    <div style="display: flex; justify-content: flex-end; gap: 12px; flex-wrap: wrap;">
      ${(car.videoSrc || car.youtubeId) ? `
        <button class="btn-outline" style="border-color: var(--gtt-orange); color: var(--gtt-orange); display: inline-flex; align-items: center; gap: 6px;" onclick="openCarVideo('${car.id}')">
          <span>▶</span> ${currentLang === 'ru' ? 'Смотреть видео заезда' : 'Watch Race Video'}
        </button>
      ` : ''}
      <a href="https://t.me/goshaturbotech" target="_blank" class="btn-primary">
        ${i18n[currentLang].discuss_tg}
      </a>
    </div>
  `;

  modal.classList.add('active');
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
    <div style="position: relative; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: #000; min-height: 240px;">
      ${title ? `<div class="video-overlay-title">${title}</div>` : ''}
      
      <!-- Fullscreen Toggle Button -->
      <button class="video-fullscreen-btn" onclick="togglePlayerFullscreen()" title="Во весь экран" aria-label="Во весь экран">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
        </svg>
      </button>

      <div id="videoSpinner" style="position: absolute; z-index: 1; color: var(--gtt-orange); font-family: var(--font-mono); font-size: 12px; display: flex; flex-direction: column; align-items: center; gap: 8px; text-align: center; padding: 12px;">
        <span style="display: inline-block; width: 24px; height: 24px; border: 2.5px solid rgba(255,100,37,0.3); border-top-color: var(--gtt-orange); border-radius: 50%; animation: spin 0.8s linear infinite;"></span>
        <span>Буферизация боевого видео...</span>
        <span style="font-size: 10px; color: var(--text-dim);">Секунду, поток подключается</span>
      </div>

      <video id="activeModalVideo" controls autoplay playsinline webkit-playsinline preload="auto" oncanplay="const s=document.getElementById('videoSpinner'); if(s) s.style.display='none';" style="position: relative; z-index: 2; width: 100%; height: 100%; max-height: 80vh; object-fit: contain; background: #000;">
        <source src="${videoSrc}" type="video/mp4">
        Ваш браузер не поддерживает видео.
      </video>
    </div>
  `;
  modal.classList.add('active');
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

// 6. Interactive Gallery Marquee (Mouse Wheel, Drag & Swipe Gestures)
function initGalleryMarqueeInteractions() {
  const wrapper = document.querySelector('.marquee-stream-wrapper');
  const track = document.getElementById('marqueeTrackMain');
  if (!wrapper || !track) return;

  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;
  let hasMoved = false;
  let resumeTimer = null;

  function pauseAutoScroll() {
    wrapper.classList.add('user-interacting');
    if (resumeTimer) clearTimeout(resumeTimer);
  }

  function scheduleResume() {
    if (resumeTimer) clearTimeout(resumeTimer);
    resumeTimer = setTimeout(() => {
      wrapper.classList.remove('user-interacting');
    }, 1800);
  }

  // A. Mouse Wheel Navigation (Scroll vertically or horizontally rotates track)
  wrapper.addEventListener('wheel', (e) => {
    // If user wheels over the stream, scroll horizontally
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(delta) > 2) {
      e.preventDefault();
      pauseAutoScroll();
      wrapper.scrollLeft += delta * 1.6;
      scheduleResume();
    }
  }, { passive: false });

  // B. Mouse Drag Navigation
  wrapper.addEventListener('mousedown', (e) => {
    isDown = true;
    hasMoved = false;
    startX = e.pageX - wrapper.offsetLeft;
    scrollLeft = wrapper.scrollLeft;
    pauseAutoScroll();
  });

  window.addEventListener('mouseup', () => {
    if (!isDown) return;
    isDown = false;
    scheduleResume();
  });

  wrapper.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - wrapper.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(walk) > 4) {
      hasMoved = true;
    }
    wrapper.scrollLeft = scrollLeft - walk;
  });

  // Prevent accidental lightbox opening when dragging
  wrapper.querySelectorAll('.marquee-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (hasMoved) {
        e.stopImmediatePropagation();
        e.preventDefault();
        hasMoved = false;
      }
    }, true);
  });

  // C. Touch Gestures (Mobile swipe & scroll)
  wrapper.addEventListener('touchstart', () => {
    pauseAutoScroll();
  }, { passive: true });

  wrapper.addEventListener('touchend', () => {
    scheduleResume();
  }, { passive: true });
}

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

  window.addEventListener('scroll', () => {
    if (isThrottled) return;
    isThrottled = true;
    requestAnimationFrame(() => {
      if (isPreloaderActive) {
        bar.classList.remove('visible');
        isThrottled = false;
        return;
      }

      const currentScrollY = window.scrollY;
      const anyModalActive = document.querySelector('.modal-overlay.active, .video-modal-overlay.active, .gallery-lightbox-modal.active, .mobile-drawer.active');
      
      if (anyModalActive) {
        bar.classList.add('hidden');
        bar.classList.remove('visible');
      } else {
        const isNearBottom = (window.innerHeight + currentScrollY) >= (document.documentElement.scrollHeight - 60);
        if (isNearBottom) {
          bar.classList.add('hidden');
          bar.classList.remove('visible');
        } else {
          bar.classList.remove('hidden');
          bar.classList.add('visible');
        }
      }
      lastScrollY = currentScrollY;
      isThrottled = false;
    });
  }, { passive: true });

  // Listen for modal state toggles
  const observer = new MutationObserver(() => {
    if (isPreloaderActive) return;
    const anyModalActive = document.querySelector('.modal-overlay.active, .video-modal-overlay.active, .gallery-lightbox-modal.active, .mobile-drawer.active');
    if (anyModalActive) {
      bar.classList.add('hidden');
      bar.classList.remove('visible');
    } else {
      bar.classList.remove('hidden');
      bar.classList.add('visible');
    }
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
function initTelemetryCounters() {
  const counterEls = document.querySelectorAll('.hero-telemetry-bar .counter-val');
  if (!counterEls.length) return;

  let hasAnimated = false;

  const animateCounters = () => {
    if (hasAnimated) return;
    hasAnimated = true;

    counterEls.forEach((el, idx) => {
      const targetStr = el.getAttribute('data-target');
      if (!targetStr) return;
      const targetVal = parseFloat(targetStr);
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


