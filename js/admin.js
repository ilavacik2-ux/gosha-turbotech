// GOSHA TURBOTECH - Admin Dashboard Multi-Module Engine
// Cars, Team Crew, Records Telemetry & Media Reels

const ADMIN_STORAGE_KEY = 'gtt_admin_cars_db';
const GALLERY_STORAGE_KEY = 'gtt_admin_gallery_db';
const TEAM_STORAGE_KEY = 'gtt_admin_team_db';
const RECORDS_STORAGE_KEY = 'gtt_admin_records_db';
const MEDIA_STORAGE_KEY = 'gtt_admin_media_db';
const PARTNERS_STORAGE_KEY = 'gtt_admin_partners_db';
const TRAFFIC_STORAGE_KEY = 'gtt_traffic_telemetry';
const AUTH_KEY = 'gtt_admin_authenticated';
const PASS_HASH_KEY = 'gtt_admin_custom_pin';
const TG_CONFIG_KEY = 'gtt_admin_tg_config';
const SECRET_URL_TOKEN = 'gtt_atelier_2026_x71k';
const VALID_SECRET_TOKENS = ['gtt_atelier_2026_x71k', 'gtt_atelier_2026', 'gtt_secret_atelier_2026_unlim'];
const TOKEN_SESSION_KEY = 'gtt_token_authorized_session';
const TOKEN_DEVICE_KEY = 'gtt_authorized_device_token';

function isStaticDeployment() {
  return window.location.hostname.includes('github.io') || window.location.protocol === 'file:';
}

// Secret URL Token Gate
function isGateAccessGranted() {
  try {
    // 1. Local development environment and GitHub Pages (online staging) always grant gate access
    if (isStaticDeployment() || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      sessionStorage.setItem(TOKEN_SESSION_KEY, 'granted');
      if (!sessionStorage.getItem('gtt_gate_token')) sessionStorage.setItem('gtt_gate_token', 'gtt_atelier_2026_x71k');
      return true;
    }

    // 2. Direct click from official website (referrer check)
    if (document.referrer && (document.referrer.includes(window.location.host) || document.referrer.includes('index.html'))) {
      sessionStorage.setItem(TOKEN_SESSION_KEY, 'granted');
      if (!sessionStorage.getItem('gtt_gate_token')) sessionStorage.setItem('gtt_gate_token', 'gtt_atelier_2026_x71k');
      return true;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token && VALID_SECRET_TOKENS.includes(token)) {
      sessionStorage.setItem(TOKEN_SESSION_KEY, 'granted');
      sessionStorage.setItem('gtt_gate_token', token);
      localStorage.setItem(TOKEN_DEVICE_KEY, token);
      const cleanPath = window.location.pathname;
      window.history.replaceState({}, document.title, cleanPath);
      return true;
    }

    if (sessionStorage.getItem(TOKEN_SESSION_KEY) === 'granted') {
      return true;
    }

    const devToken = localStorage.getItem(TOKEN_DEVICE_KEY);
    if (devToken && VALID_SECRET_TOKENS.includes(devToken)) {
      sessionStorage.setItem('gtt_gate_token', devToken);
      return true;
    }
  } catch (e) {
    console.error('Security token verification note:', e);
  }
  return false;
}

function getSecretGatewayToken() {
  return sessionStorage.getItem('gtt_gate_token') || localStorage.getItem(TOKEN_DEVICE_KEY) || SECRET_URL_TOKEN;
}

// 1. Initial Cars Seed
const defaultProjects = [
  {
    "id": "gtr_lucifer",
    "brand": "NISSAN & GTT",
    "type": "gtr",
    "nameRu": "GT-R R35 «LUCIFER» GTT #71 CHAMPION",
    "nameEn": "GT-R R35 «LUCIFER» GTT #71 CHAMPION",
    "hp": "1,850+ HP",
    "quarterMile": "8.400 сек",
    "topSpeed": "343.67 км/ч",
    "img": "assets/cars/gtr_lucifer_solo.jpg",
    "videoSrc": "assets/videos/gosha_na_svoem_lucifer_web.mp4",
    "descRu": "Победоносный огненный болид Гоши Перцхелия, борт №71. Личный драг-монстр в культовой ливрее адского пламени — триумфатор и победитель чемпионата России RDRC (лучшее время 8.400 сек / 1/2 мили 13.690 с / 343.67 км/ч).",
    "is_featured": 1
  },
  {
    "id": "draco_promod",
    "brand": "NISSAN & DRACO",
    "type": "gtr",
    "nameRu": "GT-R R35 DRACO PRO-MOD GTT #300",
    "nameEn": "GT-R R35 DRACO PRO-MOD GTT #300",
    "hp": "3,000+ HP",
    "quarterMile": "7.694 сек",
    "topSpeed": "323.88 км/ч",
    "img": "assets/cars/gtr_draco_promod_front.jpg",
    "videoSrc": "assets/videos/draco_gtr_action.mp4",
    "descRu": "Легендарный белый флагман дрэг-стрипа RDRC под управлением Руслана Арефьева (борт №300). Официальное время 7.694 сек со скоростью 304.44 км/ч на 1/4 мили (RDRC этап 5, заезд №537) и 323.88 км/ч на 1/2 мили. Специально построенное трубчатое шасси и свыше 3000 л.с.",
    "is_featured": 1
  },
  {
    "id": "r8_rokot",
    "brand": "AUDI & GTT",
    "type": "audi",
    "nameRu": "AUDI R8 V10 PLUS TWIN TURBO «ROKOT» GTT",
    "nameEn": "AUDI R8 V10 PLUS TWIN TURBO «ROKOT» GTT",
    "hp": "1,600+ HP",
    "quarterMile": "7.877 сек",
    "topSpeed": "350+ км/ч",
    "img": "assets/cars/audi_r8_tsmr_launch.jpg",
    "videoSrc": "assets/videos/gtr_launch_pass.mp4",
    "videoTitle": "AUDI R8 V10 PLUS TWIN TURBO «ROKOT» GTT",
    "descRu": "Боевая Audi R8 «ROKOT» от GoshaTurboTech под управлением Эдуарда Саркисяна и Руслана Арефьева. Абсолютный национальный рекорд России для марки Audi на 1/4 мили (7.877 сек). Первый и единственный автомобиль марки Audi в стране, выехавший из 8 секунд!",
    "is_featured": 1
  },
  {
    "id": "gtr_kurdalagon",
    "brand": "NISSAN & GTT",
    "type": "gtr",
    "nameRu": "GT-R R35 GTT «KURDALAGON»",
    "nameEn": "GT-R R35 GTT «KURDALAGON»",
    "hp": "1,650+ HP",
    "quarterMile": "7.766 сек",
    "topSpeed": "300.00 км/ч",
    "img": "assets/archive_tilda/gtr_kurdalagon.png",
    "descRu": "Боевой болид Nissan GT-R R35 «Курдалагон» — имя древнего осетинского бога-кузнеца. 26 октября 2026 года на трек-дне в Быково установил новый личный рекорд команды: 7.766 сек на 402 метра со скоростью на выходе 300.00 км/ч.",
    "is_featured": 1
  },
  {
    "id": "bezzubik",
    "brand": "LAMBORGHINI & GTT",
    "type": "lambo",
    "nameRu": "HURACAN TWIN TURBO GTT-BEZZUBIK",
    "nameEn": "HURACAN TWIN TURBO GTT-BEZZUBIK",
    "hp": "1,500+ HP",
    "quarterMile": "8.054 сек",
    "topSpeed": "353.02 км/ч",
    "img": "assets/photos/huracan_rdrc_stage_line.jpg",
    "videoSrc": "",
    "descRu": "Культовый европейский триумфатор Race 1000 в Германии и звезда RDRC. Официальный рекорд Европы со скоростью 353.02 км/ч на дистанции 804 метра и лучший квотер 8.054 сек. Построен и настроен в ателье GoshaTurboTech.",
    "is_featured": 0
  },
  {
    "id": "porsche_911_imba",
    "brand": "PORSCHE & GTT",
    "type": "porsche",
    "nameRu": "PORSCHE 911 TURBO S (992) GTT-IMBA",
    "nameEn": "PORSCHE 911 TURBO S (992) GTT-IMBA",
    "hp": "1,050+ HP",
    "quarterMile": "9.167 сек",
    "topSpeed": "345+ км/ч",
    "img": "assets/cars/porsche_992_imba_silver.jpg",
    "videoSrc": "",
    "descRu": "Официальный рекордсмен RDRC среди Porsche поколения 992 под управлением Марии Кутычкиной. Подтвержденное время 9.167 сек со скоростью 236.92 км/ч на 1/4 мили (RDRC 2025, заезд 528). Кастомный интеркулер GTT и метаноловый впрыск.",
    "is_featured": 0,
    "fallbackImg": "assets/cars/porsche_992_imba_silver.jpg",
    "objectPosition": "center 75%",
    "is_photo": 1
  },
  {
    "id": "bmw_m5",
    "brand": "BMW M-POWER",
    "type": "bmw",
    "nameRu": "BMW M5 G90 COMPETITION GTT-STAGE 3",
    "nameEn": "BMW M5 G90 COMPETITION GTT-STAGE 3",
    "hp": "1,050+ HP",
    "quarterMile": "9.420 сек",
    "topSpeed": "340+ км/ч",
    "img": "assets/cars/bmw_m5_rdrc_race.jpg",
    "videoSrc": "",
    "descRu": "Заряженная боевая BMW M5 поколения G90 от GoshaTurboTech, выступающая в чемпионате России по дрэг-рейсингу RDRC. Полный привод M xDrive, гибридные турбины GTT и усиленная поршневая группа.",
    "is_featured": 0
  },
  {
    "id": "dodge_demon",
    "brand": "DODGE SRT",
    "type": "other",
    "nameRu": "DODGE CHALLENGER SRT DEMON GTT",
    "nameEn": "DODGE CHALLENGER SRT DEMON GTT",
    "hp": "1,200+ HP",
    "quarterMile": "9.748 сек",
    "topSpeed": "330+ км/ч",
    "img": "assets/cars/dodge_burnout_sunset.jpg",
    "videoSrc": "",
    "descRu": "Черный компрессорный монстр Dodge Challenger SRT Demon от GoshaTurboTech под управлением И. Кардана и М. Шония. Подтвержденное время 9.748 сек со скоростью 233.24 км/ч на 1/4 мили RDRC 2026.",
    "is_featured": 0
  },
  {
    "id": "dodge_demon_170",
    "brand": "DODGE SRT",
    "type": "other",
    "nameRu": "DODGE CHALLENGER SRT DEMON 170 GTT",
    "nameEn": "DODGE CHALLENGER SRT DEMON 170 GTT",
    "hp": "1,025+ HP",
    "quarterMile": "9.150 сек",
    "topSpeed": "335+ км/ч",
    "img": "assets/cars/challenger_burnout_close.jpg",
    "videoSrc": "",
    "descRu": "Финальный коллекционный шедевр эпохи HEMI — Demon 170. Калибровка датчиков этанола flex-fuel, усиленный карданный вал и разгон с отрывом передних колес от стрипа.",
    "is_featured": 0
  },
  {
    "id": "audi_zlayazaya",
    "brand": "AUDI & GTT",
    "type": "audi",
    "nameRu": "AUDI R8 V10 PLUS TWIN TURBO «ZLAYAZAYA»",
    "nameEn": "AUDI R8 V10 PLUS TWIN TURBO «ZLAYAZAYA»",
    "hp": "1,200+ HP",
    "quarterMile": "10.060 сек",
    "topSpeed": "340+ км/ч",
    "img": "assets/cars/audi_r8_zlayazaya_launch.jpg",
    "videoSrc": "",
    "descRu": "Культовая Audi R8 «Злая Зая» Руслана Арефьева (борт №6303). Призер этапов чемпионата RDRC, стабильный запуск на полном приводе quattro и двухтурбинный пакет GTT.",
    "is_featured": 0,
    "fallbackImg": "assets/cars/audi_r8_zlayazaya_launch.jpg",
    "objectPosition": "center center",
    "is_photo": 1
  },
  {
    "id": "zelenka",
    "brand": "LAMBORGHINI",
    "type": "lambo",
    "nameRu": "HURACAN TWIN TURBO «ЗЕЛЕНКА» GTT",
    "nameEn": "HURACAN TWIN TURBO «ZELENKA» GTT",
    "hp": "1,500+ HP",
    "quarterMile": "8.373 сек",
    "topSpeed": "355+ км/ч",
    "img": "assets/photos/huracan_zelenka_gtt.jpg",
    "videoSrc": "",
    "descRu": "Знаменитая ядовито-зеленая Lamborghini Huracan Twin Turbo «Зеленка» — легенда паддока RDRC и уличных дуэлей. Кастомный твин-турбо кит от GoshaTurboTech, задние бедлоки и выстрел за 8 секунд (1/2 мили 14.041 с / 327.86 км/ч).",
    "is_featured": 0
  },
  {
    "id": "lambo_maxpain",
    "brand": "LAMBORGHINI & GTT",
    "type": "lambo",
    "nameRu": "HURACAN PERFORMANTE TT GTT-MAXPAIN",
    "nameEn": "HURACAN PERFORMANTE TT GTT-MAXPAIN",
    "hp": "1,600+ HP",
    "quarterMile": "8.150 сек",
    "topSpeed": "360+ км/ч",
    "img": "assets/cars/huracan_maxpain_purple.jpg",
    "videoSrc": "",
    "descRu": "Безупречный Huracan Performante в заводском кованом карбоне Forged Composites с установленным биллетовым твин-турбо китом GTT. Чудовищная отдача 1600+ л.с. и активная аэродинамика ALA.",
    "is_featured": 0,
    "fallbackImg": "assets/cars/huracan_maxpain_purple.jpg",
    "objectPosition": "center center",
    "is_photo": 1
  },
  {
    "id": "lambo_spyder_800",
    "brand": "LAMBORGHINI & GTT",
    "type": "lambo",
    "nameRu": "HURACAN SPYDER GTT-800 STAGE 2",
    "nameEn": "HURACAN SPYDER GTT-800 STAGE 2",
    "hp": "850+ HP",
    "quarterMile": "9.988 сек",
    "topSpeed": "335+ км/ч",
    "img": "assets/cars/huracan_spyder_orange.jpg",
    "videoSrc": "",
    "descRu": "Открытый родстер Huracan Spyder с доработанной выхлопной трассой Inconel и пакетом GTT Stage 2. Официальное 2-е место на Чемпионате ПФО с результатом 9.988 сек на 402 метра.",
    "is_featured": 0,
    "fallbackImg": "assets/cars/huracan_spyder_orange.jpg",
    "objectPosition": "center center",
    "is_photo": 1
  },
  {
    "id": "moses",
    "brand": "NISSAN",
    "type": "gtr",
    "nameRu": "GT-R R35 GTT-1800 «MOSES» #712",
    "nameEn": "GT-R R35 GTT-1800 «MOSES» #712",
    "hp": "1,800+ HP",
    "quarterMile": "7.526 сек",
    "topSpeed": "360+ км/ч",
    "img": "assets/archive_tilda/gtr_moses.png",
    "videoSrc": "",
    "descRu": "Культовый белый Nissan GT-R R35 «MOSES» борт №712. Европейский рекорд времени на Unlim 500+ Greece (остров Крит) — 7.810 сек / 287.65 км/ч и личный рекорд 7.526 сек со скоростью 304.36 км/ч в ОАЭ. 3-й результат в мире на момент постройки.",
    "is_featured": 0
  },
  {
    "id": "gtr_korzhik",
    "brand": "NISSAN & GTT",
    "type": "gtr",
    "nameRu": "GT-R R35 GTT «KORZHIK» #712",
    "nameEn": "GT-R R35 GTT «KORZHIK» #712",
    "hp": "1,600+ HP",
    "quarterMile": "8.602 сек",
    "topSpeed": "334.41 км/ч",
    "img": "assets/cars/gtr_korzhik_712.jpg",
    "videoSrc": "",
    "descRu": "Боевой болид Николая Коржова. Рекорд России на Московской миле (1/2 мили: 13.435 сек со скоростью 334.41 км/ч) и 8.602 сек на 402 метра. Вице-чемпион абсолютного зачета Чемпионата SMP RDRC в классе FSL.",
    "is_featured": 0,
    "fallbackImg": "assets/cars/gtr_korzhik_712.jpg",
    "objectPosition": "center center",
    "is_photo": 1
  },
  {
    "id": "gtr_baloo",
    "brand": "NISSAN & GTT",
    "type": "gtr",
    "nameRu": "GT-R R35 GTT «BALOO»",
    "nameEn": "GT-R R35 GTT «BALOO»",
    "hp": "1,450+ HP",
    "quarterMile": "8.875 сек",
    "topSpeed": "322.00 км/ч",
    "img": "assets/cars/gtr_red_strip_sunset.jpg",
    "videoSrc": "",
    "descRu": "Уникальный проект «Baloo» с мощнейшим средним диапазоном оборотов и полным приводом. Личные показатели команды: 8.875 сек на 402 м со скоростью 262.39 км/ч и 13.726 сек на 1/2 мили со скоростью 322.00 км/ч.",
    "is_featured": 0
  },
  {
    "id": "gtr_blue_888",
    "brand": "NISSAN",
    "type": "gtr",
    "nameRu": "GT-R R35 MIDNIGHT BLUE GTT #888",
    "nameEn": "GT-R R35 MIDNIGHT BLUE GTT #888",
    "hp": "1,550+ HP",
    "quarterMile": "8.120 сек",
    "topSpeed": "348+ км/ч",
    "img": "assets/photos/gtr_blue_888_rdrc.jpg",
    "videoSrc": "",
    "descRu": "Знаменитый синий Nissan GT-R R35 со стартовым номером #888, постоянный участник и призер этапов Чемпионата России RDRC. Калибровка лаунч-контроля GTT и кованый 3.8L VR38.",
    "is_featured": 0
  },
  {
    "id": "gtr_red",
    "brand": "NISSAN",
    "type": "gtr",
    "nameRu": "GT-R R35 RED CHROME GTT PRO-MOD",
    "nameEn": "GT-R R35 RED CHROME GTT PRO-MOD",
    "hp": "1,650+ HP",
    "quarterMile": "7.950 сек",
    "topSpeed": "350+ км/ч",
    "img": "assets/cars/gtr_red_front_rdrc.jpg",
    "videoSrc": "",
    "descRu": "Один из самых ярких Nissan GT-R в российском дрэг-рейсинге под управлением Гоши Перцхелия. Кастомный хром-дизайн, усиленная подвеска и боевая трансмиссия GTT.",
    "is_featured": 0
  },
  {
    "id": "gtr_rocket",
    "brand": "NISSAN & GTT",
    "type": "gtr",
    "nameRu": "GT-R R35 GTT «ROCKET»",
    "nameEn": "GT-R R35 GTT «ROCKET»",
    "hp": "1,500+ HP",
    "quarterMile": "8.350 сек",
    "topSpeed": "345+ км/ч",
    "img": "assets/cars/gtr_rocket_grey.jpg",
    "videoSrc": "",
    "descRu": "Экстремальный проект Nissan GT-R R35 «Rocket» лаборатории GoshaTurboTech. Двухтурбинный наддув, титановый прямой выхлоп и облегченная гоночная конфигурация кузова.",
    "is_featured": 0,
    "fallbackImg": "assets/cars/gtr_rocket_grey.jpg",
    "objectPosition": "center center",
    "is_photo": 1
  },
  {
    "id": "gtr_alpha12x",
    "brand": "NISSAN & GTT",
    "type": "gtr",
    "nameRu": "GT-R R35 GTT ALPHA12X SPEC",
    "nameEn": "GT-R R35 GTT ALPHA12X SPEC",
    "hp": "1,500+ HP",
    "quarterMile": "8.250 сек",
    "topSpeed": "350+ км/ч",
    "img": "assets/cars/gtr_alpha12x_launch.jpg",
    "videoSrc": "",
    "descRu": "Проект на базе культового пакета Alpha 12X, доработанный инженерами GTT. Кастомное охлаждение, усиленная трансмиссия GR6 и индивидуальная прошивка блока управления.",
    "is_featured": 0,
    "fallbackImg": "assets/cars/gtr_alpha12x_launch.jpg",
    "objectPosition": "center center",
    "is_photo": 1
  },
  {
    "id": "porsche_991_1200",
    "brand": "PORSCHE & GTT",
    "type": "porsche",
    "nameRu": "PORSCHE 911 TURBO (991.1) GTT-1200",
    "nameEn": "PORSCHE 911 TURBO (991.1) GTT-1200",
    "hp": "1,200+ HP",
    "quarterMile": "9.086 сек",
    "topSpeed": "312.77 км/ч",
    "img": "assets/cars/porsche_991_1200_white.jpg",
    "videoSrc": "",
    "descRu": "Безумный 991.1 Turbo Алексея Сагала. Официальный рекорд России/Европы на RDRC RacePark: 9.086 сек со скоростью 259.64 км/ч на 402 м и 14.186 сек со скоростью 312.77 км/ч на 1/2 мили.",
    "is_featured": 0,
    "fallbackImg": "assets/cars/porsche_991_1200_white.jpg",
    "objectPosition": "center center",
    "is_photo": 1
  },
  {
    "id": "porsche_991_felix",
    "brand": "PORSCHE & GTT",
    "type": "porsche",
    "nameRu": "PORSCHE 911 TURBO S (991.2) FELIX FERRO",
    "nameEn": "PORSCHE 911 TURBO S (991.2) FELIX FERRO",
    "hp": "950+ HP",
    "quarterMile": "9.601 сек",
    "topSpeed": "232.40 км/ч",
    "img": "assets/cars/porsche_991_felix_grey.jpg",
    "videoSrc": "",
    "descRu": "Лимитированная инженерная серия Felix Ferro Edition. Индивидуальный аэродинамический пакет, облегченные кованые диски и настройка блока управления Syvecs. 9.601 сек на квотере.",
    "is_featured": 0,
    "fallbackImg": "assets/cars/porsche_991_felix_grey.jpg",
    "objectPosition": "center center",
    "is_photo": 1
  },
  {
    "id": "bmw_m7_gtt",
    "brand": "BMW M-POWER",
    "type": "bmw",
    "nameRu": "BMW M7 GTT EXECUTIVE TWIN TURBO",
    "nameEn": "BMW M7 GTT EXECUTIVE TWIN TURBO",
    "hp": "900+ HP",
    "quarterMile": "10.200 сек",
    "topSpeed": "330+ км/ч",
    "img": "assets/cars/bmw_m7_gtt_blue.jpg",
    "videoSrc": "",
    "descRu": "Представительский флагман BMW 7 серии в глубокой доработке GoshaTurboTech. Двухтурбинный V8/V12, бесшумный акустический комфорт в салоне и ураганная динамика на скоростных прямых.",
    "is_featured": 0,
    "fallbackImg": "assets/cars/bmw_m7_gtt_blue.jpg",
    "objectPosition": "center 75%",
    "is_photo": 1
  },
  {
    "id": "volga_kgb",
    "brand": "ГАЗ & GTT",
    "type": "other",
    "nameRu": "ВОЛГА ГАЗ-24 КГБ V8 GTT SLEEPER",
    "nameEn": "VOLGA GAZ-24 KGB V8 GTT SLEEPER",
    "hp": "1,050+ HP",
    "quarterMile": "9.420 сек",
    "topSpeed": "340+ км/ч",
    "img": "assets/cars/volga_kgb_v8_workshop.jpg",
    "videoSrc": "",
    "descRu": "Легендарный советский проект в кузове ГАЗ-24 «Догонялка». Внешне аутентичный хромированный силуэт спецслужб, внутри — современный турбированный V8 и кастомное спортивное шасси.",
    "is_featured": 0,
    "fallbackImg": "assets/cars/volga_kgb_v8_workshop.jpg",
    "objectPosition": "center center",
    "is_photo": 1
  },
  {
    "id": "ferrari_512tr",
    "brand": "FERRARI & GTT",
    "type": "other",
    "nameRu": "FERRARI 512 TR GTT HERITAGE CLASSIC",
    "nameEn": "FERRARI 512 TR GTT HERITAGE CLASSIC",
    "hp": "550+ HP",
    "quarterMile": "10.800 сек",
    "topSpeed": "315+ км/ч",
    "img": "assets/cars/ferrari_512tr_dyno_red.jpg",
    "videoSrc": "",
    "descRu": "Итальянская икона с 12-цилиндровым оппозитным двигателем Flat-12. Комплексная механическая доработка в цехах GTT, индивидуальный титановый выпуск и филигранная калибровка впрыска.",
    "is_featured": 0,
    "fallbackImg": "assets/cars/ferrari_512tr_dyno_red.jpg",
    "objectPosition": "center center",
    "is_photo": 1
  },
  {
    "id": "gtr_fifa",
    "brand": "NISSAN & GTT",
    "type": "gtr",
    "nameRu": "GT-R R35 GTT «FIFA» #10",
    "nameEn": "GT-R R35 GTT «FIFA» #10",
    "hp": "—",
    "quarterMile": "—",
    "topSpeed": "—",
    "img": "assets/cars/gtt_classified_car.svg",
    "videoSrc": "",
    "descRu": "Именной болид «FIFA», созданный в ателье GoshaTurboTech. Сочетает комфортный салон и бескомпромиссные характеристики разгона из 8.5 секунд на квотере.",
    "is_featured": 0,
    "fallbackImg": "assets/cars/gtt_classified_car.svg",
    "objectPosition": "center center",
    "is_photo": 0,
    "isClassified": true,
    "isTeaser": true
  },
  {
    "id": "porsche_991_900",
    "brand": "PORSCHE & GTT",
    "type": "porsche",
    "nameRu": "PORSCHE 911 TURBO S (991.2) GTT-900",
    "nameEn": "PORSCHE 911 TURBO S (991.2) GTT-900",
    "hp": "—",
    "quarterMile": "—",
    "topSpeed": "—",
    "img": "assets/cars/gtt_classified_car.svg",
    "videoSrc": "",
    "descRu": "Идеальный баланс повседневного суперкара и рекордного темпа. 900 сил на товарном 100-м бензине с ресурсом заводского мотора.",
    "is_featured": 0,
    "fallbackImg": "assets/cars/gtt_classified_car.svg",
    "objectPosition": "center center",
    "is_photo": 0,
    "isClassified": true,
    "isTeaser": true
  },
  {
    "id": "porsche_992_puncher",
    "brand": "PORSCHE & GTT",
    "type": "porsche",
    "nameRu": "PORSCHE 911 TURBO S (992) GTT «PUNCHER»",
    "nameEn": "PORSCHE 911 TURBO S (992) GTT «PUNCHER»",
    "hp": "—",
    "quarterMile": "—",
    "topSpeed": "—",
    "img": "assets/cars/gtt_classified_car.svg",
    "videoSrc": "",
    "descRu": "Культовый Porsche 992 Turbo S «Puncher» Сергея Никитина. Мировой рекорд в категории на UNLIM FEST 2021: 9.303 сек со скоростью 235.83 км/ч на 1/4 мили и 14.778 сек со скоростью 276.92 км/ч на 1/2 мили.",
    "is_featured": 0,
    "fallbackImg": "assets/cars/gtt_classified_car.svg",
    "objectPosition": "center center",
    "is_photo": 0,
    "isClassified": true,
    "isTeaser": true
  },
  {
    "id": "mercedes_e63",
    "brand": "MERCEDES-AMG & GTT",
    "type": "other",
    "nameRu": "MERCEDES-AMG E63S 4MATIC+ GTT-950",
    "nameEn": "MERCEDES-AMG E63S 4MATIC+ GTT-950",
    "hp": "—",
    "quarterMile": "—",
    "topSpeed": "—",
    "img": "assets/cars/gtt_classified_car.svg",
    "videoSrc": "",
    "descRu": "Беспощадный бизнес-седан с 4.0L V8 Biturbo, форсированный до 950 л.с. Пилот В. Щед на RDRC 2026 показал подтвержденное время 9.880 сек со скоростью 234.91 км/ч на 1/4 мили.",
    "is_featured": 0,
    "fallbackImg": "assets/cars/gtt_classified_car.svg",
    "objectPosition": "center center",
    "is_photo": 0,
    "isClassified": true,
    "isTeaser": true
  },
  {
    "id": "tesla_plaid",
    "brand": "TESLA & GTT",
    "type": "other",
    "nameRu": "TESLA MODEL S PLAID GTT DYNAMICS SPEC",
    "nameEn": "TESLA MODEL S PLAID GTT DYNAMICS SPEC",
    "hp": "—",
    "quarterMile": "—",
    "topSpeed": "—",
    "img": "assets/cars/gtt_classified_car.svg",
    "videoSrc": "",
    "descRu": "Трековый проект на базе трехмоторного седана Tesla Model S Plaid. Спортивная карбон-керамическая тормозная система GTT, оптимизация охлаждения инверторов и аэродинамический сплиттер.",
    "is_featured": 0,
    "fallbackImg": "assets/cars/gtt_classified_car.svg",
    "objectPosition": "center center",
    "is_photo": 0,
    "isClassified": true,
    "isTeaser": true
  },
  {
    "id": "tonystark",
    "brand": "AUDI & ЦМРБАНК",
    "type": "audi",
    "nameRu": "R8 V10 PLUS TWIN TURBO TONY STARK / RDRC",
    "nameEn": "R8 V10 PLUS TWIN TURBO TONY STARK / RDRC",
    "hp": "—",
    "quarterMile": "—",
    "topSpeed": "—",
    "img": "assets/cars/gtt_classified_car.svg",
    "videoSrc": "",
    "descRu": "Боевая Audi R8 V10 Twin Turbo под эгидой ЦМРБанк и GTT на треке RDRC. Официальное время 8.948 сек со скоростью 247.68 км/ч на Record Days 2023 и 287.19 км/ч на 1/2 мили.",
    "is_featured": 0,
    "fallbackImg": "assets/cars/gtt_classified_car.svg",
    "is_photo": 0,
    "isClassified": true,
    "isTeaser": true
  }
];

// 2. Initial Team Seed (15 Members with high-res photos)
const defaultTeamPhotos = {
  m1: 'assets/archive_tilda/team_gosha.jpg',
  m2: 'assets/archive_tilda/team_edik.jpg',
  m3: 'assets/archive_tilda/team_dmitry.jpg',
  m4: 'assets/archive_tilda/team_maria.jpg',
  m5: 'assets/archive_tilda/team_pavel.jpg',
  m6: 'assets/archive_tilda/team_georgy.jpg',
  m7: 'assets/archive_tilda/team_rustam.jpg',
  m8: 'assets/archive_tilda/team_nikita.jpg',
  m9: 'assets/archive_tilda/team_ivan.jpg',
  m10: 'assets/archive_tilda/team_alexey_paddock.jpg',
  m11: 'assets/archive_tilda/team_fazik.jpg',
  m12: 'assets/archive_tilda/team_stepan.jpg',
  m13: 'assets/archive_tilda/team_alexey_mech.jpg',
  m14: 'assets/archive_tilda/team_roman.jpg',
  m15: 'assets/archive_tilda/team_evgeny.jpg'
};

const defaultTeam = [
  { id: 'm1', name: 'Гоша', role: 'Основатель & Главный конструктор GTT', status: 'active', photo: defaultTeamPhotos.m1 },
  { id: 'm2', name: 'Эдик', role: 'Технический директор ателье', status: 'active', photo: defaultTeamPhotos.m2 },
  { id: 'm3', name: 'Дмитрий', role: 'Администратор проектов', status: 'atelier', photo: defaultTeamPhotos.m3 },
  { id: 'm4', name: 'Мария', role: 'Делопроизводитель & Менеджер рекордов', status: 'atelier', photo: defaultTeamPhotos.m4 },
  { id: 'm5', name: 'Павел', role: 'Делопроизводитель & Логист команды', status: 'atelier', photo: defaultTeamPhotos.m5 },
  { id: 'm6', name: 'Георгий', role: 'Инженер-электрик & Калибровщик Motec/Syvecs', status: 'active', photo: defaultTeamPhotos.m6 },
  { id: 'm7', name: 'Рустам', role: 'Моторист высшей квалификации', status: 'active', photo: defaultTeamPhotos.m7 },
  { id: 'm8', name: 'Никита', role: 'Гоночный механик паддока', status: 'paddock', photo: defaultTeamPhotos.m8 },
  { id: 'm9', name: 'Иван', role: 'Гоночный механик паддока', status: 'paddock', photo: defaultTeamPhotos.m9 },
  { id: 'm10', name: 'Алексей', role: 'Гоночный механик паддока', status: 'paddock', photo: defaultTeamPhotos.m10 },
  { id: 'm11', name: 'Фазик', role: 'Механик сборочного цеха', status: 'atelier', photo: defaultTeamPhotos.m11 },
  { id: 'm12', name: 'Степан', role: 'Механик сборочного цеха', status: 'atelier', photo: defaultTeamPhotos.m12 },
  { id: 'm13', name: 'Алексей', role: 'Механик ходовой части', status: 'atelier', photo: defaultTeamPhotos.m13 },
  { id: 'm14', name: 'Роман', role: 'Сварщик-фабрикатор титана и инконеля', status: 'active', photo: defaultTeamPhotos.m14 },
  { id: 'm15', name: 'Евгений', role: 'Диагност электронных систем', status: 'active', photo: defaultTeamPhotos.m15 }
];

// 3. Initial Records Seed (Hall of Fame with authentic photos)
const defaultRecords = [
  {
    id: 'rec_moses',
    year: '2016 • Абсолютный рекорд GTT',
    car: 'NISSAN GT-R R35 GTT-1800 «MOSES»',
    telemetry: '1/4 мили: 7.526 сек • 304.36 км/ч',
    desc: 'Легендарные тесты в ОАЭ и UNLIM 500+ Greece. 7.526 сек со скоростью 304.36 км/ч — быстрейший результат на 402 м за всю историю ателье GoshaTurboTech.',
    img: 'assets/archive_tilda/gtr_moses.png'
  },
  {
    id: 'rec_draco',
    year: '2024 • Рекорд RDRC Pro-Mod',
    car: 'NISSAN GT-R R35 DRACO PRO-MOD #300',
    telemetry: '1/4 мили: 7.694 сек • 304.44 км/ч',
    desc: 'Пилот Руслан Арефьев на этапе RDRC 2024 (заезд №537). Подтвержденный протокол DragDB. Скорость на выходе 1/2 мили превысила 323.88 км/ч.',
    img: 'assets/cars/gtr_draco_promod_front.jpg'
  },
  {
    id: 'rec_kurdalagon',
    year: '26.10.2026 • Рекорд Быково',
    car: 'NISSAN GT-R R35 «КУРДАЛАГОН»',
    telemetry: '1/4 мили: 7.766 сек • 300.00 км/ч',
    desc: 'Свежайший подтвержденный рекорд команды GoshaTurboTech, зафиксированный на трек-дне в Быково в конце октября 2026 года.',
    img: 'assets/archive_tilda/gtr_kurdalagon.png'
  },
  {
    id: 'rec_rokot',
    year: '2026 • Рекорд России для Audi',
    car: 'AUDI R8 V10 PLUS TWIN TURBO «ROKOT»',
    telemetry: '1/4 мили: 7.877 сек • Суперкубок RDRC',
    desc: 'Эдуард Саркисян и Руслан Арефьев на болиде ателье GoshaTurboTech впервые в истории России вывели Audi из рубежа 8 секунд.',
    img: 'assets/cars/audi_r8_tsmr_launch.jpg'
  },
  {
    id: 'rec_bezzubik',
    year: 'Рекорд Европы • Race 1000',
    car: 'LAMBORGHINI HURACAN TT BEZZUBIK',
    telemetry: '1/2 мили: 353.02 км/ч • 1/4 мили: 8.054 сек',
    desc: 'Официальный рекорд Европы на дистанции 804 м среди полноприводных суперкаров в Германии (353.02 км/ч) и 8.054 сек на 402 м. Легенда GTT.',
    img: 'assets/photos/huracan_rdrc_stage_line.jpg'
  },
  {
    id: 'rec_zelenka',
    year: 'ОАЭ & Германия • 344.60 км/ч',
    car: 'LAMBORGHINI HURACAN TWIN TURBO «ЗЕЛЕНКА»',
    telemetry: '1/4 мили: 8.373 сек • 1000 м: 344.60 км/ч',
    desc: '8.373 сек со скоростью 275.26 км/ч на 1/4 мили в ОАЭ и 344.60 км/ч на 1000 м в Германии (Rolling 50 1000). Культовый проект GoshaTurboTech.',
    img: 'assets/photos/huracan_zelenka_gtt.jpg'
  },
  {
    id: 'rec_lucifer',
    year: 'RDRC 2026 • 1-е место в классе',
    car: 'NISSAN GT-R R35 «LUCIFER» GTT #71',
    telemetry: '1/4 мили: 8.400 сек • 1/2 мили: 343.67 км/ч',
    desc: 'Флагманский болид Гоши Перцхелии. 8.400 сек в ОАЭ, победный заезд 8.551 сек на RDRC 2026 и 343.67 км/ч на Unlim 500+.',
    img: 'assets/cars/gtr_lucifer_solo.jpg'
  },
  {
    id: 'rec_korzhik',
    year: 'Рекорд России • Московская миля',
    car: 'NISSAN GT-R R35 GTT «KORZHIK» #712',
    telemetry: '1/2 мили: 13.435 сек • 334.41 км/ч',
    desc: 'Пилот Николай Коржов. 8.602 сек на 402 м и официальный рекорд России на 1/2 мили — 13.435 сек со скоростью 334.41 км/ч.',
    img: 'assets/cars/gtr_korzhik_712.jpg'
  },
  {
    id: 'rec_hulk',
    year: 'Суперкубок RDRC 2026',
    car: 'LAMBORGHINI HURACAN LP610-4 «HULK»',
    telemetry: '1/4 мили: 8.951 сек • 3/8 мили: 291.14 км/ч',
    desc: 'Пилот Эдуард Саркисян в зачете GoshaTurboTech. 8.951 сек со скоростью 257.14 км/ч на 1/4 мили (3/8 мили: 11.561 с / 291.14 км/ч).',
    img: 'assets/cars/huracan_green_grey_rdrc.jpg'
  },
  {
    id: 'rec_tonystark',
    year: 'Record Days 2023',
    car: 'AUDI R8 V10 PLUS TT «TONY STARK»',
    telemetry: '1/4 мили: 8.948 сек • 247.68 км/ч',
    desc: 'Стабильный выезд из 9 секунд на трек-днях Record Days (8.948 сек) и 15.403 сек со скоростью 287.19 км/ч на 1/2 мили.',
    img: 'assets/archive_tilda/audi_r8_tonystark.png'
  },
  {
    id: 'rec_gtt1200',
    year: 'Рекорд России/Европы • RDRC RacePark',
    car: 'PORSCHE 911 TURBO (991.1) GTT-1200',
    telemetry: '1/4 мили: 9.086 сек • 259.64 км/ч',
    desc: 'Пилот Алексей Сагал. Рекорд России и Европы для кузова 991.1 (9.086 с), скорость на 1/2 мили — 312.77 км/ч.',
    img: 'assets/cars/porsche_991_1200_white.jpg'
  },
  {
    id: 'rec_su7',
    year: '2026 • Суперкубок RDRC',
    car: 'XIAOMI SU7 ULTRA GTT RACE SPEC',
    telemetry: '1/4 мили: 9.130 сек • 3/8 мили: 287.31 км/ч',
    desc: 'Пилот В. Щед в зачете GoshaTurboTech на Суперкубке RDRC 2026 показал сенсационные 9.130 сек со скоростью 249.31 км/ч.',
    img: 'assets/cars/bmw_m5_rdrc_race.jpg'
  },
  {
    id: 'rec_imba',
    year: '2022–2025 • Мировой рекорд RDRC',
    car: 'PORSCHE 911 TURBO S (992) GTT-IMBA',
    telemetry: '1/4 мили: 9.167 сек • RDRC 2025',
    desc: 'Пилот Мария Кутычкина. Мировой рекорд 9.252 сек со скоростью 231.80 км/ч на заводских турбинах, улучшенный на RDRC 2025 до 9.167 сек.',
    img: 'assets/cars/porsche_992_imba_silver.jpg'
  },
  {
    id: 'rec_puncher',
    year: '2021 • Мировой ориентир UNLIM FEST',
    car: 'PORSCHE 911 TURBO S (992) PUNCHER',
    telemetry: '1/4 мили: 9.303 сек • 235.83 км/ч',
    desc: 'Мировой ориентир для дорожных Porsche 992 на Unlim Fest (9.303 сек) и 1/2 мили за 14.778 сек со скоростью 276.92 км/ч.',
    img: 'assets/archive_tilda/porsche_992_puncher.jpg'
  },
  {
    id: 'rec_gyurza',
    year: '2022 • Абсолютный рекорд льда',
    car: 'AUDI R8 V10 PLUS TT «GYURZA»',
    telemetry: '1 км с места на льду: 124.00 км/ч',
    desc: 'Дни скорости на льду озера Байкал совместно с Kiwamaru. Абсолютный триумфатор ледовых заездов с места в истории России.',
    img: 'assets/archive_tilda/audi_r8_gyurza_ice.jpg'
  },
  {
    id: 'rec_gallardo',
    year: 'Мировой рекорд • 1 миля (1609 м)',
    car: 'LAMBORGHINI GALLARDO NERA TWIN TURBO',
    telemetry: '1 миля: 409.55 км/ч • 20.845 сек',
    desc: 'Аэродром Крит, Греция. Легендарная Черная Галлардо Гоши Перцхелии — первый болид из России, покоривший планку 400+ км/ч на 1 милю.',
    img: 'assets/photos/huracan_zelenka_gtt.jpg'
  }
];

// 4. Initial Media Reels Seed
const defaultMedia = [
  { id: 'med_1', title: 'Гоша на своем боевом GT-R Lucifer RDRC', type: 'mp4', url: 'assets/videos/gosha_na_svoem_lucifer_web.mp4', car: 'GT-R Lucifer' },
  { id: 'med_2', title: 'Боевой синий GT-R #888 заезд RDRC', type: 'mp4', url: 'assets/videos/gtr_blue_888_pass_web.mp4', car: 'GT-R Blue 888' },
  { id: 'med_3', title: 'Красный хромированный GT-R Pro-Mod', type: 'mp4', url: 'assets/videos/gtr_red_g35_action_web.mp4', car: 'GT-R Red Chrome' },
  { id: 'med_4', title: 'Дымный бернаут Dodge Hellcat RDRC', type: 'mp4', url: 'assets/videos/dodge_challenger_action.mp4', car: 'Dodge Challenger SRT' },
  { id: 'med_5', title: 'Huracan «Зеленка» Twin Turbo прогрев', type: 'mp4', url: 'assets/videos/r8_launch_action.mp4', car: 'Huracan Зеленка' }
];

// 5. Initial Gallery (Живые кадры) Seed
const defaultGallery = [
  { id: 'gal_1', tag: 'RDRC CHAMPION', title: 'Huracan TT «Зеленка» GTT', img: 'assets/photos/huracan_zelenka_gtt.jpg' },
  { id: 'gal_2', tag: 'BURNOUT SMOKE', title: 'Dodge Demon', img: 'assets/cars/dodge_burnout_sunset.jpg' },
  { id: 'gal_3', tag: '3000+ HP PRO-MOD', title: 'Nissan GT-R R35 Draco Dragster', img: 'assets/cars/gtr_draco_promod_front.jpg' },
  { id: 'gal_4', tag: '1400+ HP V10 TT', title: 'Audi R8 V10 Plus TT «Rokot»', img: 'assets/cars/audi_r8_tsmr_launch.jpg' },
  { id: 'gal_5', tag: 'CHAMPIONSHIP WINNER', title: 'Nissan GT-R R35 Lucifer', img: 'assets/cars/gtr_lucifer_solo.jpg' },
  { id: 'gal_6', tag: 'AERODYNAMICS', title: 'Red Chrome Nissan GT-R R35', img: 'assets/cars/gtr_red_front_rdrc.jpg' },
  { id: 'gal_7', tag: 'MIDNIGHT BLUE', title: 'Nissan GT-R R35 #888 Sunset Pass', img: 'assets/photos/gtr_blue_888_rdrc.jpg' },
  { id: 'gal_8', tag: 'CHIEF MOTORSPORT ENGINEER', title: 'Гоша Перцхелия на стрипе RDRC', img: 'assets/photos/gosha_on_track.jpg' },
  { id: 'gal_9', tag: 'ATELIER GARAGE', title: 'Бокс GTT: Паддок команды & Nissan GT-R', img: 'assets/cars/bmw_m5_paddock_front.jpg' },
  { id: 'gal_10', tag: 'TWIN TURBO V8', title: 'BMW M5 G90 Stage 2 GTT', img: 'assets/cars/bmw_m5_rdrc_race.jpg' },
  { id: 'gal_11', tag: 'TWIN TURBO V10', title: 'Huracan Twin Turbo «Зеленка» GTT', img: 'assets/cars/huracan_green_bezzubik_track.jpg' }
];

// 6. Initial Partners Seed (28 Authentic GTT Motorsport & Technical Partners)
const defaultPartners = [
  { id: 'rog', name: 'Republic of Gamers', category: 'Телеметрия & Электроника', desc: 'Высокопроизводительные аппаратные комплексы, ноутбуки и системы сбора телеметрии для настройки гоночных болидов на треке и стенде.', logo: 'assets/partners/rog.png', link: 'https://rog.asus.com', sort_order: 1, is_active: 1 },
  { id: 'toys_detailing', name: 'Toys Detailing', category: 'Детейлинг & Защита', desc: 'Премиальный детейлинг, керамические покрытия, полировка и защитные антигравийные пленки для шоу-каров и гоночных болидов GTT.', logo: 'assets/partners/toys_detailing.png', link: 'https://toysdetailing.ru', sort_order: 2, is_active: 1 },
  { id: 'felix_ferro', name: 'Felix Ferro', category: 'Интерьер & Стиль', desc: 'Эксклюзивные кастомные аксессуары, ювелирные ключи зажигания и титановые эмблемы ручной работы для флагманских проектов GoshaTurboTech.', logo: 'assets/partners/felix_ferro.png', link: 'https://felixferro.com', sort_order: 3, is_active: 1 },
  { id: 'vp_racing', name: 'VP Racing Fuels', category: 'Топливо & Метанол', desc: 'Мировой эталон спортивного топлива, гоночного кислородного бензина и чистого метанола M1 для рекордных заездов RDRC.', logo: 'assets/partners/vp_racing.png', link: 'https://vpracingfuels.com', sort_order: 4, is_active: 1 },
  { id: 'je_pistons', name: 'JE Pistons', category: 'Кованая поршневая', desc: 'Сверхпрочные кованые гоночные поршни для экстремального давления наддува и мощностей свыше 2,000+ л.с. в моторах VR38DETT и V10.', logo: 'assets/partners/je_pistons.png', link: 'https://jepistons.com', sort_order: 5, is_active: 1 },
  { id: 'link_ecu', name: 'Link Engine Management', category: 'Электроника & ЭБУ', desc: 'Спортивные блоки управления двигателем (ECU), даталоггеры и цифровые приборные панели для абсолютного контроля над силовой установкой.', logo: 'assets/partners/link_ecu.png', link: 'https://linkecu.com', sort_order: 6, is_active: 1 },
  { id: 'mainline_dyno', name: 'Mainline DynoLog', category: 'Диностенды & Замеры', desc: 'Профессиональные колесные и ступичные мощностные стенды высокой точности для калибровки и снятия графиков болидов до 3000 л.с.', logo: 'assets/partners/mainline_dyno.png', link: 'https://mainlinedyno.com.au', sort_order: 7, is_active: 1 },
  { id: 'redline_oil', name: 'Red Line Synthetic Oil', category: 'Смазочные материалы', desc: 'Специализированные трансмиссионные жидкости ShockProof и гоночные присадки для дифференциалов повышенного трения и раздаточных коробок.', logo: 'assets/partners/redline_oil.png', link: 'https://redlineoil.com', sort_order: 8, is_active: 1 },
  { id: 'syvecs', name: 'Syvecs Powertrain Control', category: 'Электроника & ЭБУ', desc: 'Топовые блоки управления двигателем (ECU), полноприводной трансмиссией (AWD Controller) и прецизионными алгоритмами лаунч-контроля.', logo: 'assets/partners/syvecs.png', link: 'https://syvecs.com', sort_order: 9, is_active: 1 },
  { id: 'plazmaman', name: 'Plazmaman Pro Billet', category: 'Впуск & Охлаждение', desc: 'Фрезерованные из авиационного алюминиевого монолита впускные коллекторы и интеркулеры для экстремальных моторов VR38DETT и V10.', logo: 'assets/partners/plazmaman.png', link: 'https://plazmaman.com', sort_order: 10, is_active: 1 },
  { id: 'ppg_gearboxes', name: 'PPG (Pfitzner Gearboxes)', category: 'Трансмиссия & КПП', desc: 'Усиленные прямозубые кулачковые и секвентальные ряды передач, выдерживающие колоссальный крутящий момент и агрессивные переключения.', logo: 'assets/partners/ppg_gearboxes.png', link: 'https://ppgearbox.com.au', sort_order: 11, is_active: 1 },
  { id: 'ticon_titanium', name: 'Ticon Titanium', category: 'Титановые компоненты', desc: 'Высококлассные титановые трубы, конусы, фланцы и отводы для создания сверхлегких термостойких выхлопных систем GoshaTurboTech.', logo: 'assets/partners/ticon_titanium.png', link: 'https://ticontitanium.com', sort_order: 12, is_active: 1 },
  { id: 'cobb_tuning', name: 'COBB Tuning', category: 'Калибровка & Софт', desc: 'Программно-аппаратные комплексы Accessport для быстрой смены карт калибровки, перепрошивки блоков управления и скоростного логирования.', logo: 'assets/partners/cobb_tuning.png', link: 'https://cobbtuning.com', sort_order: 13, is_active: 1 },
  { id: 'bell_intercoolers', name: 'Bell Intercoolers', category: 'Охлаждение & Впуск', desc: 'Высокоэффективные теплообменники и кастомные интеркулерные ядра с минимальным сопротивлением для мощных турбосистем.', logo: 'assets/partners/bell_intercoolers.png', link: 'https://bellintercoolers.com', sort_order: 14, is_active: 1 },
  { id: 'armytrix', name: 'Armytrix', category: 'Выхлопные системы', desc: 'Премиальные регулируемые титановые и нержавеющие выхлопные системы Valvetronic с дистанционным управлением звуком через приложение.', logo: 'assets/partners/armytrix.png', link: 'https://armytrix.com', sort_order: 15, is_active: 1 },
  { id: 'ecutek', name: 'Ecutek Technology', category: 'Электроника & ЭБУ', desc: 'Передовое программное обеспечение для глубокой инженерной калибровки заводских блоков управления Nissan GT-R, BMW и суперкаров.', logo: 'assets/partners/ecutek.png', link: 'https://ecutek.com', sort_order: 16, is_active: 1 },
  { id: 'precision_turbo', name: 'Precision Turbo & Engine', category: 'Турбосистемы', desc: 'Специализированные гоночные турбокомпрессоры сверхвысокого наддува серии Pro Mod и GEN2 CEA, обеспечивающие отдачу до 3,500+ л.с.', logo: 'assets/partners/precision_turbo.png', link: 'https://precisionturbo.net', sort_order: 17, is_active: 1 },
  { id: 'motec', name: 'MoTeC Systems', category: 'Электроника & ЭБУ', desc: 'Золотой стандарт мирового автоспорта: управляющие процессоры M1, цветные цифровые дисплеи C1212 и прецизионные логгеры телеметрии.', logo: 'assets/partners/motec.png', link: 'https://motec.com.au', sort_order: 18, is_active: 1 },
  { id: 'motul', name: 'Motul Motorsport', category: 'Смазочные материалы', desc: 'Синтетические моторные масла Motul 300V Motorsport Line с технологией Ester Core, защищающие 2000+ сильные моторы GTT при пиковых нагрузках.', logo: 'assets/partners/motul.png', link: 'https://motul.com', sort_order: 19, is_active: 1 },
  { id: 'injector_dynamics', name: 'Injector Dynamics', category: 'Топливные форсунки', desc: 'Прецизионные спортивные топливные форсунки с динамическим подбором баланса подачи для абсолютной стабильности топливовоздушной смеси.', logo: 'assets/partners/injector_dynamics.png', link: 'https://injectordynamics.com', sort_order: 20, is_active: 1 },
  { id: 'dodson_motorsport', name: 'Dodson Motorsport', category: 'Сцепления & Трансмиссия', desc: 'Усиленные многодисковые сцепления, шестерни и гидравлика для роботизированных коробок передач GR6 (GT-R) и DL800 (R8/Huracan).', logo: 'assets/partners/dodson_motorsport.png', link: 'https://dodsonmotorsport.com', sort_order: 21, is_active: 1 },
  { id: 't1_race', name: 'T1 Race Development', category: 'Топливные системы', desc: 'Прецизионные компоненты топливной магистрали, вентиляции картера и силовые инженерные узлы для быстрейших суперкаров мира.', logo: 'assets/partners/t1_race.png', link: 'https://t1racedevelopment.com', sort_order: 22, is_active: 1 },
  { id: 'csf_radiators', name: 'CSF Radiators', category: 'Охлаждение & Радиаторы', desc: 'Высокопроизводительные цельноалюминиевые радиаторы охлаждения ДВС, масляные радиаторы и теплообменники для экстремальных нагрузок.', logo: 'assets/partners/csf_radiators.png', link: 'https://csfradiators.com', sort_order: 23, is_active: 1 },
  { id: 'dragtimes', name: 'Dragtimes', category: 'Медиа & Суперкары', desc: 'Крупнейшее медиа-сообщество суперкаров и дрэг-рейсинга, организатор всероссийских заездов на 1/2 мили и хронометража рекордов.', logo: 'assets/partners/dragtimes.png', link: 'https://dragtimes.ru', sort_order: 24, is_active: 1 },
  { id: 'rdrc_racepark', name: 'RDRC Racepark', category: 'Автоспорт & Трассы', desc: 'Главный дрэг-стрип страны и организатор Чемпионата России по дрэг-рейсингу RDRC в Быково, где GTT ставит официальные рекорды скорости.', logo: 'assets/partners/rdrc_racepark.png', link: 'https://rdrc.ru', sort_order: 25, is_active: 1 },
  { id: 'dsc_off', name: 'DSC OFF', category: 'Медиа & Хроника', desc: 'Автоспортивный медиа-проект Гурама Инцкирвели, подробно освещающий постройку и боевые заезды быстрейших суперкаров GoshaTurboTech.', logo: 'assets/partners/dsc_off.png', link: 'https://youtube.com/@dscoff', sort_order: 26, is_active: 1 },
  { id: 'pride_jfc', name: 'Pride JFC', category: 'Автоспорт & Стиль', desc: 'Официальный партнерский клуб и спортивная лига, разделяющая философию бескомпромиссной борьбы за первенство и победы.', logo: 'assets/partners/pride_jfc.png', link: 'https://goshaturbotech.ru', sort_order: 27, is_active: 1 },
  { id: 'deikin_exhaust', name: 'Deikin Exhaust', category: 'Выхлопные системы', desc: 'Индивидуальное проектирование и ручная аргонная TIG-сварка спортивных выхлопных систем из титана Grade 5 и жаропрочного Inconel.', logo: 'assets/partners/deikin_exhaust.png', link: 'https://goshaturbotech.ru', sort_order: 28, is_active: 1 }
];

// 7. Initial Moto Seed (Superbikes & Customization)
const defaultMoto = [
  {
    id: 'moto_1',
    title: 'Superbike Stage 1 / 2',
    code: 'SUPERBIKE // STAGE 2',
    desc: 'Программное раскрытие потенциала литровых спортбайков BMW S1000RR / M1000RR, Ducati Panigale V4, Yamaha R1. Индивидуальные карты зажигания, снятие ограничителей и калибровка квикшифтера на диностенде.',
    bullets: 'Индивидуальная калибровка на диностенде\nОптимизация Wheelie & Launch Control\nКалибровка электронного дросселя без задержек',
    img: 'assets/moto/bmw_m1000rr_gtt.jpg',
    sort_order: 1,
    is_active: 1
  },
  {
    id: 'moto_2',
    title: 'Титановый выпуск GTT Moto',
    code: 'TITANIUM // EXH',
    desc: 'Ручная аргоновая сварка титана и инконеля для мотоциклов. Экстремальное снижение веса, породистый акустический звук и прибавка крутящего момента во всем диапазоне.',
    bullets: 'Ультралегкие коллекторы из сплава Titan-Gr5\nКастомная фрезеровка насадок\nОгненные отстрелы и сочный басовитый тон',
    img: 'assets/moto/gtt_moto_r1m_m1000rr_night.jpg',
    sort_order: 2,
    is_active: 1
  },
  {
    id: 'moto_3',
    title: 'Bespoke кастомизация',
    code: 'BESPOKE // CNC',
    desc: 'Полный цикл доработки премиальной мототехники: кованые сверхлегкие диски, сухое сцепление, карбоновое оперение и комплексное предсезонное ТО.',
    bullets: 'Сухой автоклавный карбон 3K/12K\nТормозные системы Brembo Racing / GP4\nИндивидуальный дизайн и покраска',
    img: 'assets/moto/bmw_m1000rr_cafe_street.jpg',
    sort_order: 3,
    is_active: 1
  }
];

const MOTO_STORAGE_KEY = 'gtt_admin_moto_db';

// Server API Client Engine (FastAPI & SQLite persistence)
const API_BASE = '';

async function apiFetch(endpoint, options = {}) {
  try {
    const sessionToken = sessionStorage.getItem('gtt_session_token') || localStorage.getItem('gtt_session_token');
    const authHeaders = sessionToken ? { 'Authorization': `Bearer ${sessionToken}` } : {};
    const gateToken = (typeof getSecretGatewayToken === 'function') ? getSecretGatewayToken() : (sessionStorage.getItem('gtt_gate_token') || 'gtt_atelier_2026_x71k');

    const res = await fetch(API_BASE + endpoint, {
      headers: {
        'Content-Type': 'application/json',
        'x-gateway-token': gateToken,
        ...authHeaders,
        ...(options.headers || {})
      },
      ...options
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({ detail: res.statusText }));
      throw new Error(errData.detail || 'HTTP error ' + res.status);
    }
    return await res.json();
  } catch (err) {
    console.warn(`[GTT API] Request to ${endpoint} failed:`, err);
    throw err;
  }
}

// ==========================================================================
// GTT CYBER-SHIELD SANITIZERS (OWASP CWE-79 DOM-XSS PREVENTION)
// ==========================================================================
function escapeHTML(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeJS(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/"/g, '&quot;');
}

// ==========================================================================
// GTT MOTORSPORT TOAST ENGINE
// ==========================================================================
function showToast(title, message = '', type = 'info', duration = 3800) {
  let container = document.getElementById('adminToastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'adminToastContainer';
    container.className = 'gtt-toast-container';
    document.body.appendChild(container);
  }

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠️',
    info: '⚡'
  };

  const toast = document.createElement('div');
  toast.className = `gtt-toast toast-${type}`;
  toast.innerHTML = `
    <div class="gtt-toast-icon">${icons[type] || '⚡'}</div>
    <div class="gtt-toast-body">
      <div class="gtt-toast-title">${title}</div>
      ${message ? `<div class="gtt-toast-desc">${message}</div>` : ''}
    </div>
    <button class="gtt-toast-close" aria-label="Закрыть">&times;</button>
    <div class="gtt-toast-progress" style="animation-duration: ${duration}ms;"></div>
  `;

  container.appendChild(toast);

  // Trigger CSS slide-in
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  let dismissTimeout = setTimeout(dismiss, duration);

  function dismiss() {
    clearTimeout(dismissTimeout);
    toast.classList.remove('show');
    toast.classList.add('hide');
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 400);
  }

  const closeBtn = toast.querySelector('.gtt-toast-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dismiss();
    });
  }

  // Hover to pause dismissal
  toast.addEventListener('mouseenter', () => {
    clearTimeout(dismissTimeout);
  });

  toast.addEventListener('mouseleave', () => {
    dismissTimeout = setTimeout(dismiss, 1600);
  });

  return toast;
}

window.showToast = showToast;

function sanitizeCarRecord(car) {
  if (!car || typeof car !== 'object') return car;
  const rawName = String(car.nameRu || car.name_ru || (car.name && (car.name.ru || car.name.en)) || car.id || '').toUpperCase();

  // 1. Repair Volga KGB records (including user-created slot gtt_car_1793314607236)
  const isVolga = car.id === 'volga_kgb' || car.id === 'gtt_car_1793314607236' || rawName.includes('ВОЛГА') || rawName.includes('VOLGA');
  if (isVolga) {
    if (!car.img || car.img.includes('gtr-min.png') || car.img.includes('7tuUxJxwl5e8') || car.img.includes('bmw_m5')) {
      car.img = 'assets/cars/volga_kgb_v8_sleeper.jpg';
    }
    car.fallbackImg = 'assets/cars/volga_kgb_v8_sleeper.jpg';
    if (!car.hp || car.hp === '-' || car.hp === '- HP' || car.hp === '—') car.hp = '1,050+ HP';
    if (!car.quarterMile || car.quarterMile === '-' || car.quarterMile === '- сек' || car.quarterMile === '—') car.quarterMile = '9.420 сек';
    if (!car.topSpeed || car.topSpeed === '-' || car.topSpeed === '- км/ч' || car.topSpeed === '—') car.topSpeed = '340+ км/ч';
    if (car.nameRu === 'ВОЛГА КГБНА' || car.name_ru === 'ВОЛГА КГБНА' || car.nameRu === 'Волга КГБна' || car.name_ru === 'Волга КГБна') {
      car.nameRu = 'ВОЛГА КГБ';
      if (car.name && typeof car.name === 'object') car.name.ru = 'ВОЛГА КГБ';
    }
    if (!car.nameEn && !car.name_en) {
      car.nameEn = 'VOLGA GAZ-24 KGB V8 GTT SLEEPER';
      if (car.name && typeof car.name === 'object') car.name.en = 'VOLGA GAZ-24 KGB V8 GTT SLEEPER';
    }
  }

  // 2. Clear broken phantom paths (e.g. assets/cars/7tuUx...)
  if (car.img && typeof car.img === 'string' && car.img.startsWith('assets/cars/') && car.img.includes('7tuUxJxwl5e8')) {
    car.img = 'assets/cars/volga_kgb_v8_sleeper.jpg';
  }

  // 3. Clear placeholder dashes on any car
  if (car.hp === '-' || car.hp === '- HP') car.hp = '1,050+ HP';
  if (car.quarterMile === '-' || car.quarterMile === '- сек') car.quarterMile = '9.420 сек';
  if (car.topSpeed === '-' || car.topSpeed === '- км/ч') car.topSpeed = '340+ км/ч';

  return car;
}

// Helpers for LocalStorage & In-memory Cache
function getDB(key, defaultVal) {
  const saved = localStorage.getItem(key);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        if (parsed.length === 0 && Array.isArray(defaultVal) && defaultVal.length > 0) {
          const cleanDefault = (key === ADMIN_STORAGE_KEY) ? defaultVal.map(sanitizeCarRecord) : defaultVal;
          try { localStorage.setItem(key, JSON.stringify(cleanDefault)); } catch (e) {}
          return cleanDefault;
        }
        if (key === ADMIN_STORAGE_KEY) {
          return parsed.map(sanitizeCarRecord);
        }
        return parsed;
      }
      return parsed;
    } catch (e) {
      console.error('Error loading ' + key, e);
    }
  }
  const cleanDefault = (key === ADMIN_STORAGE_KEY && Array.isArray(defaultVal)) ? defaultVal.map(sanitizeCarRecord) : defaultVal;
  try {
    localStorage.setItem(key, JSON.stringify(cleanDefault));
  } catch (e) {}
  return cleanDefault;
}

function restoreFactoryDatabase() {
  if (!confirm('Вы уверены, что хотите восстановить базу данных ателье по умолчанию?\n\nВсе проекты гаража, мировые рекорды RDRC, бренды партнеров, кадры галереи и специалисты команды будут обновлены до полного заводского архива GoshaTurboTech.')) return;
  
  try {
    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(defaultProjects.map(sanitizeCarRecord)));
    localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(defaultGallery));
    localStorage.setItem(TEAM_STORAGE_KEY, JSON.stringify(defaultTeam));
    localStorage.setItem(PARTNERS_STORAGE_KEY, JSON.stringify(defaultPartners));
    localStorage.setItem(MOTO_STORAGE_KEY, JSON.stringify(defaultMoto));
    localStorage.setItem(RECORDS_STORAGE_KEY, JSON.stringify(defaultRecords));
  } catch (e) {}

  if (window.BroadcastChannel) {
    try {
      const ch = new BroadcastChannel('gtt_channel');
      ch.postMessage({ type: 'projects_updated', projects: defaultProjects });
      ch.postMessage({ type: 'partners_updated', partners: defaultPartners });
      ch.postMessage({ type: 'records_updated', records: defaultRecords });
    } catch (e) {}
  }
  
  renderAllModules();
  showToast('База восстановлена', 'Все разделы ателье успешно восстановлены до эталонного состояния', 'success');
}
window.restoreFactoryDatabase = restoreFactoryDatabase;

function saveDB(key, data) {
  try {
    const cleanData = (key === ADMIN_STORAGE_KEY && Array.isArray(data)) ? data.map(sanitizeCarRecord) : data;
    localStorage.setItem(key, JSON.stringify(cleanData));
  } catch (err) {
    console.error('LocalStorage save error:', err);
    if (err && err.name === 'QuotaExceededError') {
      showToast('Память браузера', 'Память LocalStorage заполнена. Очистите кэш или уменьшите размер файлов.', 'error');
    }
  }
}

const USER_NAME_KEY = 'gtt_admin_user_name';

const FAILED_ATTEMPTS_KEY = 'gtt_auth_fail_count';
const LOCKOUT_TIMESTAMP_KEY = 'gtt_auth_lockout_until';
const MAX_CLIENT_FAILS = 5;
const CLIENT_LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes lockout

function checkClientLockout() {
  const lockoutUntil = parseInt(localStorage.getItem(LOCKOUT_TIMESTAMP_KEY) || '0', 10);
  const now = Date.now();
  if (now < lockoutUntil) {
    const remainingSec = Math.ceil((lockoutUntil - now) / 1000);
    const min = Math.floor(remainingSec / 60);
    const sec = remainingSec % 60;
    const inputEl = document.getElementById('adminPass');
    const loginBtn = document.getElementById('loginBtn');
    const errorEl = document.getElementById('authError');
    if (inputEl) {
      inputEl.disabled = true;
      inputEl.placeholder = 'Доступ заблокирован...';
    }
    if (loginBtn) {
      loginBtn.disabled = true;
      loginBtn.textContent = `Блокировка (${min}:${sec < 10 ? '0' : ''}${sec})`;
    }
    if (errorEl) {
      errorEl.textContent = `🛑 Доступ заблокирован из-за 5 неверных попыток. Защита от перебора. Повторите через ${min} мин ${sec} сек.`;
      errorEl.style.display = 'block';
    }
    setTimeout(checkClientLockout, 1000);
    return true;
  } else if (lockoutUntil > 0 && now >= lockoutUntil) {
    localStorage.removeItem(LOCKOUT_TIMESTAMP_KEY);
    localStorage.removeItem(FAILED_ATTEMPTS_KEY);
    const inputEl = document.getElementById('adminPass');
    const loginBtn = document.getElementById('loginBtn');
    const errorEl = document.getElementById('authError');
    if (inputEl) {
      inputEl.disabled = false;
      inputEl.placeholder = 'Введите пароль...';
      inputEl.value = '';
    }
    if (loginBtn) {
      loginBtn.disabled = false;
      loginBtn.textContent = 'Войти в панель GTT';
    }
    if (errorEl) errorEl.style.display = 'none';
    return false;
  }
  return false;
}

// Authentication & Module Initialization
async function checkAuth() {
  const gateBlock = document.getElementById('gateBlockScreen');
  const loginScreen = document.getElementById('loginScreen');
  const dashboardScreen = document.getElementById('dashboardScreen');
  const welcomeTextEl = document.getElementById('userWelcomeText');

  // Level 1 Security: Gatekeeper check
  if (!isGateAccessGranted()) {
    if (gateBlock) gateBlock.style.display = 'flex';
    if (loginScreen) loginScreen.style.display = 'none';
    if (dashboardScreen) dashboardScreen.style.display = 'none';
    return;
  }

  if (gateBlock) gateBlock.style.display = 'none';

  // Level 2 Security: Authenticated session check
  const isAuth = sessionStorage.getItem(AUTH_KEY) === 'true' || localStorage.getItem(AUTH_KEY) === 'true';

  if (isAuth) {
    if (loginScreen) loginScreen.style.display = 'none';
    if (dashboardScreen) dashboardScreen.style.display = 'block';

    if (welcomeTextEl) {
      const storedUser = localStorage.getItem(USER_NAME_KEY) || 'Гоша Перцхелия';
      welcomeTextEl.innerHTML = `Добро пожаловать // <strong>${storedUser}</strong>`;
    }

    renderAllModules();
    updateAdminBellUI();
    syncAllModulesFromAPI();
  } else {
    if (loginScreen) loginScreen.style.display = 'flex';
    if (dashboardScreen) dashboardScreen.style.display = 'none';
    checkClientLockout();
  }
}

async function syncAllModulesFromAPI() {
  try {
    const [cars, gallery, team, records, media, partners, moto] = await Promise.allSettled([
      apiFetch('/api/cars'),
      apiFetch('/api/gallery'),
      apiFetch('/api/team'),
      apiFetch('/api/records'),
      apiFetch('/api/media'),
      apiFetch('/api/partners'),
      apiFetch('/api/moto')
    ]);

    if (cars.status === 'fulfilled' && Array.isArray(cars.value) && cars.value.length > 0) {
      saveDB(ADMIN_STORAGE_KEY, cars.value);
    }
    if (gallery.status === 'fulfilled' && Array.isArray(gallery.value) && gallery.value.length > 0) {
      saveDB(GALLERY_STORAGE_KEY, gallery.value);
    }
    if (team.status === 'fulfilled' && Array.isArray(team.value) && team.value.length > 0) {
      saveDB(TEAM_STORAGE_KEY, team.value);
    }
    if (records.status === 'fulfilled' && Array.isArray(records.value) && records.value.length > 0) {
      saveDB(RECORDS_STORAGE_KEY, records.value);
    }
    if (media.status === 'fulfilled' && Array.isArray(media.value) && media.value.length > 0) {
      saveDB(MEDIA_STORAGE_KEY, media.value);
    }
    if (partners.status === 'fulfilled' && Array.isArray(partners.value) && partners.value.length > 0) {
      saveDB(PARTNERS_STORAGE_KEY, partners.value);
    }
    if (moto.status === 'fulfilled' && Array.isArray(moto.value) && moto.value.length > 0) {
      saveDB(MOTO_STORAGE_KEY, moto.value);
    }
    renderAllModules();
  } catch (e) {
    console.warn('[GTT API] Standalone sync note:', e);
  }
}

async function sha256Hex(str) {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function getStoredPin() {
  return localStorage.getItem(PASS_HASH_KEY) || 'gtt71';
}

function sendTelegramAlert(text) {
  try {
    const raw = localStorage.getItem(TG_CONFIG_KEY);
    if (!raw) return;
    const config = JSON.parse(raw);
    if (!config.botToken || !config.chatId) return;

    fetch(`https://api.telegram.org/bot${config.botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: config.chatId,
        text: text,
        parse_mode: 'HTML'
      })
    }).catch(err => console.warn('TG Alert send error:', err));
  } catch (e) {
    console.warn('TG notification failed:', e);
  }
}

async function handleAdminLogin(e) {
  if (e && e.preventDefault) e.preventDefault();
  if (checkClientLockout()) return;

  const userEl = document.getElementById('adminUser');
  const passEl = document.getElementById('adminPass');
  const username = (userEl ? userEl.value : '').trim();
  const password = (passEl ? passEl.value : '').trim();
  const errorEl = document.getElementById('authError');
  const loginBtn = document.getElementById('loginBtn');

  if (!username) {
    if (errorEl) {
      errorEl.textContent = '⚠️ Введите позывной или логин инженера!';
      errorEl.style.display = 'block';
    }
    if (userEl) userEl.focus();
    return;
  }

  if (!password) {
    if (errorEl) {
      errorEl.textContent = '⚠️ Введите мастер-пароль доступа!';
      errorEl.style.display = 'block';
    }
    if (passEl) passEl.focus();
    return;
  }

  if (loginBtn) {
    loginBtn.disabled = true;
    loginBtn.textContent = 'Проверка учетных данных...';
  }

  let authSuccessful = false;
  let errorMsg = '⚠️ Неверный логин или пароль доступа. Попытка зафиксирована.';
  let isRateLimited = false;

  try {
    const gateToken = getSecretGatewayToken();
    const trapEl = document.getElementById('adminSecurityTrap');
    const trapVal = trapEl ? trapEl.value : '';

    const res = await apiFetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'x-gateway-token': gateToken
      },
      body: JSON.stringify({
        username: username,
        password: password,
        gateway_token: gateToken,
        honeypot: trapVal
      })
    });
    if (res && res.status === 'ok') {
      authSuccessful = true;
      if (res.session_token) {
        sessionStorage.setItem('gtt_session_token', res.session_token);
        localStorage.setItem('gtt_session_token', res.session_token);
      }
      if (res.username) {
        localStorage.setItem(USER_NAME_KEY, res.username);
      }
    }
  } catch (apiErr) {
    if (apiErr.message && (apiErr.message.includes('429') || apiErr.message.includes('Слишком много') || apiErr.message.includes('заблокирован'))) {
      authSuccessful = false;
      isRateLimited = true;
      errorMsg = apiErr.message;
    } else if (apiErr.message && (apiErr.message.includes('401') || apiErr.message.includes('пароль') || apiErr.message.includes('логин'))) {
      authSuccessful = false;
      errorMsg = '⚠️ Неверный логин или пароль доступа!';
    } else if (apiErr.message && apiErr.message.includes('404') && !isStaticDeployment()) {
      authSuccessful = false;
      errorMsg = '🛑 Доступ запрещен политикой безопасности шлюза GTT.';
    } else {
      // Offline fallback: Cryptographically secure SHA-256 hash check
      try {
        const inputHash = await sha256Hex(password.trim());
        const isUserOk = (username.toLowerCase() === 'gosha');
        const authorizedHashes = [
          '4c457e64bb36ed3df535c84837abac5b57626615b5b2630dc8f72c66e1a565e5', // gtt71
          'b7840a350b9cb095a0075eef96c675a8739af0ac120c68d6b601fee091328285', // gtt_atelier_2026
          await sha256Hex('gtt_master_password_2026!')
        ];
        const customPin = getStoredPin();
        if (customPin) authorizedHashes.push(await sha256Hex(customPin));

        if (isUserOk && authorizedHashes.includes(inputHash)) {
          authSuccessful = true;
          localStorage.setItem(USER_NAME_KEY, username);
        }
      } catch (hashErr) {
        console.warn('Crypto hash note:', hashErr);
      }
    }
  } finally {
    if (loginBtn && !isRateLimited) {
      loginBtn.disabled = false;
      loginBtn.textContent = 'Войти в панель GTT';
    }
  }

  if (authSuccessful) {
    localStorage.removeItem(FAILED_ATTEMPTS_KEY);
    localStorage.removeItem(LOCKOUT_TIMESTAMP_KEY);
    sessionStorage.setItem(AUTH_KEY, 'true');
    localStorage.setItem(AUTH_KEY, 'true');
    if (errorEl) errorEl.style.display = 'none';
    showToast('Доступ разрешен', `Успешный вход под логином ${username}`, 'success');
    checkAuth();
  } else {
    let failCount = parseInt(localStorage.getItem(FAILED_ATTEMPTS_KEY) || '0', 10) + 1;
    localStorage.setItem(FAILED_ATTEMPTS_KEY, failCount.toString());

    if (isRateLimited || failCount >= MAX_CLIENT_FAILS) {
      localStorage.setItem(LOCKOUT_TIMESTAMP_KEY, (Date.now() + CLIENT_LOCKOUT_MS).toString());
      checkClientLockout();
      showToast('Блокировка доступа', 'Слишком много неверных попыток! Блокировка на 15 минут.', 'error');
    } else {
      const remainingAttempts = MAX_CLIENT_FAILS - failCount;
      const warningText = `${errorMsg} Осталось попыток: ${remainingAttempts}`;
      if (errorEl) {
        errorEl.textContent = warningText;
        errorEl.style.display = 'block';
      }
      showToast('Ошибка доступа', warningText, 'error');
      if (passEl) {
        passEl.value = '';
        passEl.focus();
      }
    }
  }
}

function handleAdminLogout() {
  apiFetch('/api/auth/logout', { method: 'POST' }).catch(() => {});
  sessionStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(USER_NAME_KEY);
  showToast('Выход из системы', 'Сессия инженера GTT Atelier завершена', 'info');
  checkAuth();
}

// Tabs Switcher
function switchAdminTab(tabName) {
  document.querySelectorAll('.admin-tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.admin-tab-content').forEach(c => c.style.display = 'none');

  const btn = Array.from(document.querySelectorAll('.admin-tab-btn')).find(b => b.getAttribute('onclick')?.includes(`'${tabName}'`));
  if (btn) btn.classList.add('active');

  if (tabName === 'cars') {
    document.getElementById('tabCars').style.display = 'block';
  } else if (tabName === 'traffic') {
    document.getElementById('tabTraffic').style.display = 'block';
    renderTrafficModule();
  } else if (tabName === 'gallery') {
    document.getElementById('tabGallery').style.display = 'block';
  } else if (tabName === 'team') {
    document.getElementById('tabTeam').style.display = 'block';
  } else if (tabName === 'partners') {
    document.getElementById('tabPartners').style.display = 'block';
    renderPartnersTable();
  } else if (tabName === 'moto') {
    document.getElementById('tabMoto').style.display = 'block';
    renderMotoTable();
  } else if (tabName === 'records') {
    document.getElementById('tabRecords').style.display = 'block';
  } else if (tabName === 'media') {
    document.getElementById('tabMedia').style.display = 'block';
  } else if (tabName === 'settings') {
    document.getElementById('tabSettings').style.display = 'block';
    populateSettingsInputs();
  }
}


// Render All
function renderAllModules() {
  try { renderCarsTable(); } catch (e) { console.error('Error in renderCarsTable:', e); }
  try { renderTrafficModule(); } catch (e) { console.error('Error in renderTrafficModule:', e); }
  try { renderGalleryTable(); } catch (e) { console.error('Error in renderGalleryTable:', e); }
  try { renderTeamTable(); } catch (e) { console.error('Error in renderTeamTable:', e); }
  try { renderPartnersTable(); } catch (e) { console.error('Error in renderPartnersTable:', e); }
  try { renderMotoTable(); } catch (e) { console.error('Error in renderMotoTable:', e); }
  try { renderRecordsTable(); } catch (e) { console.error('Error in renderRecordsTable:', e); }
  try { renderMediaTable(); } catch (e) { console.error('Error in renderMediaTable:', e); }
}

const GARAGE_STATS_KEY = 'gtt_garage_stats_custom';

const defaultGarageStats = {
  maxHp: '3,000+ HP',
  maxHpLbl: 'Пиковая мощность (Draco Pro-Mod)',
  bestPass: '6.850 сек',
  bestPassLbl: 'Рекордное время (402 м)'
};

function getGarageStats() {
  try {
    const raw = localStorage.getItem(GARAGE_STATS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return defaultGarageStats;
}

function renderGarageStats() {
  const stats = getGarageStats();
  const maxHpEl = document.getElementById('statMaxHp');
  const maxHpLblEl = document.getElementById('statMaxHpLbl');
  const bestPassEl = document.getElementById('statBestPass');
  const bestPassLblEl = document.getElementById('statBestPassLbl');

  if (maxHpEl) maxHpEl.textContent = stats.maxHp || defaultGarageStats.maxHp;
  if (maxHpLblEl) maxHpLblEl.textContent = stats.maxHpLbl || defaultGarageStats.maxHpLbl;
  if (bestPassEl) bestPassEl.textContent = stats.bestPass || defaultGarageStats.bestPass;
  if (bestPassLblEl) bestPassLblEl.textContent = stats.bestPassLbl || defaultGarageStats.bestPassLbl;
}

function openGarageStatsModal() {
  const stats = getGarageStats();
  document.getElementById('editStatMaxHp').value = stats.maxHp || defaultGarageStats.maxHp;
  document.getElementById('editStatMaxHpLbl').value = stats.maxHpLbl || defaultGarageStats.maxHpLbl;
  document.getElementById('editStatBestPass').value = stats.bestPass || defaultGarageStats.bestPass;
  document.getElementById('editStatBestPassLbl').value = stats.bestPassLbl || defaultGarageStats.bestPassLbl;
  document.getElementById('garageStatsModal').style.display = 'flex';
}

function closeGarageStatsModal() {
  document.getElementById('garageStatsModal').style.display = 'none';
}

function saveGarageStats(e) {
  if (e && e.preventDefault) e.preventDefault();
  const newStats = {
    maxHp: document.getElementById('editStatMaxHp').value.trim() || defaultGarageStats.maxHp,
    maxHpLbl: document.getElementById('editStatMaxHpLbl').value.trim() || defaultGarageStats.maxHpLbl,
    bestPass: document.getElementById('editStatBestPass').value.trim() || defaultGarageStats.bestPass,
    bestPassLbl: document.getElementById('editStatBestPassLbl').value.trim() || defaultGarageStats.bestPassLbl
  };

  localStorage.setItem(GARAGE_STATS_KEY, JSON.stringify(newStats));
  try {
    fetch('/api/settings/garage_stats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: JSON.stringify(newStats) })
    }).catch(() => {});
  } catch (err) {}
  renderGarageStats();
  closeGarageStatsModal();
  showToast('Показатели обновлены', 'Статистика гаража GTT успешно сохранена!', 'success');
}

// Fetch backend garage stats if synced
fetch('/api/settings/garage_stats')
  .then(r => r.json())
  .then(data => {
    if (data && data.value) {
      localStorage.setItem(GARAGE_STATS_KEY, data.value);
      renderGarageStats();
    }
  }).catch(() => {});

window.openGarageStatsModal = openGarageStatsModal;
window.closeGarageStatsModal = closeGarageStatsModal;
window.saveGarageStats = saveGarageStats;

// ================= HERO SCREEN TELEMETRY =================
const HERO_TELEMETRY_KEY = 'gtt_hero_telemetry_custom';

const defaultHeroTelemetry = {
  item1: { val: '7.810', unit: 'сек', label: '1/4 мили (Nissan GT-R Moses)' },
  item2: { val: '353', unit: 'км/ч', label: 'Рекорд Европы (1/2 мили)' },
  item3: { val: '3,000+', unit: 'л.с.', label: 'Предельная отдача автомобиля' }
};

function getHeroTelemetry() {
  try {
    const raw = localStorage.getItem(HERO_TELEMETRY_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return defaultHeroTelemetry;
}

function renderHeroTelemetry() {
  const t = getHeroTelemetry();
  const v1 = document.getElementById('adminHeroVal1');
  const l1 = document.getElementById('adminHeroLbl1');
  const v2 = document.getElementById('adminHeroVal2');
  const l2 = document.getElementById('adminHeroLbl2');
  const v3 = document.getElementById('adminHeroVal3');
  const l3 = document.getElementById('adminHeroLbl3');

  const i1 = t.item1 || defaultHeroTelemetry.item1;
  const i2 = t.item2 || defaultHeroTelemetry.item2;
  const i3 = t.item3 || defaultHeroTelemetry.item3;

  if (v1) v1.textContent = `${i1.val} ${i1.unit}`;
  if (l1) l1.textContent = i1.label;
  if (v2) v2.textContent = `${i2.val} ${i2.unit}`;
  if (l2) l2.textContent = i2.label;
  if (v3) v3.textContent = `${i3.val} ${i3.unit}`;
  if (l3) l3.textContent = i3.label;
}

function openHeroTelemetryModal() {
  const t = getHeroTelemetry();
  const i1 = t.item1 || defaultHeroTelemetry.item1;
  const i2 = t.item2 || defaultHeroTelemetry.item2;
  const i3 = t.item3 || defaultHeroTelemetry.item3;

  document.getElementById('editHeroVal1').value = i1.val || '7.810';
  document.getElementById('editHeroUnit1').value = i1.unit || 'сек';
  document.getElementById('editHeroLbl1').value = i1.label || '1/4 мили (Nissan GT-R Moses)';

  document.getElementById('editHeroVal2').value = i2.val || '353';
  document.getElementById('editHeroUnit2').value = i2.unit || 'км/ч';
  document.getElementById('editHeroLbl2').value = i2.label || 'Рекорд Европы (1/2 мили)';

  document.getElementById('editHeroVal3').value = i3.val || '3,000+';
  document.getElementById('editHeroUnit3').value = i3.unit || 'л.с.';
  document.getElementById('editHeroLbl3').value = i3.label || 'Предельная отдача автомобиля';

  document.getElementById('heroTelemetryModal').style.display = 'flex';
}

function closeHeroTelemetryModal() {
  document.getElementById('heroTelemetryModal').style.display = 'none';
}

async function saveHeroTelemetry(e) {
  if (e && e.preventDefault) e.preventDefault();
  const newTelemetry = {
    item1: {
      val: document.getElementById('editHeroVal1').value.trim() || '7.810',
      unit: document.getElementById('editHeroUnit1').value.trim() || 'сек',
      label: document.getElementById('editHeroLbl1').value.trim() || '1/4 мили (Nissan GT-R Moses)'
    },
    item2: {
      val: document.getElementById('editHeroVal2').value.trim() || '353',
      unit: document.getElementById('editHeroUnit2').value.trim() || 'км/ч',
      label: document.getElementById('editHeroLbl2').value.trim() || 'Рекорд Европы (1/2 мили)'
    },
    item3: {
      val: document.getElementById('editHeroVal3').value.trim() || '3,000+',
      unit: document.getElementById('editHeroUnit3').value.trim() || 'л.с.',
      label: document.getElementById('editHeroLbl3').value.trim() || 'Предельная отдача автомобиля'
    }
  };

  const jsonStr = JSON.stringify(newTelemetry);
  localStorage.setItem(HERO_TELEMETRY_KEY, jsonStr);

  try {
    await apiFetch('/api/settings/hero_telemetry', {
      method: 'POST',
      body: JSON.stringify({ value: jsonStr })
    });
  } catch (err) {
    console.warn('[GTT API] Hero telemetry note:', err);
  }

  renderHeroTelemetry();
  closeHeroTelemetryModal();
  showToast('Hero-панель обновлена', 'Показатели телеметрии на главном экране успешно сохранены!', 'success');
}

// Fetch backend hero telemetry if synced
apiFetch('/api/settings/hero_telemetry')
  .then(data => {
    if (data && data.value) {
      localStorage.setItem(HERO_TELEMETRY_KEY, data.value);
      renderHeroTelemetry();
    }
  }).catch(() => {});

window.openHeroTelemetryModal = openHeroTelemetryModal;
window.closeHeroTelemetryModal = closeHeroTelemetryModal;
window.saveHeroTelemetry = saveHeroTelemetry;

// ================= MODULE 1: CARS =================

// ==========================================================================
// SMART RUSSIAN -> ENGLISH AUTOMOTIVE TRANSLATOR & TRANSLITERATOR
// ==========================================================================
const GTT_TRANSLIT_MAP = {
  'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'Yo',
  'Ж': 'Zh', 'З': 'Z', 'И': 'I', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M',
  'Н': 'N', 'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U',
  'Ф': 'F', 'Х': 'Kh', 'Ц': 'Ts', 'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Shch',
  'Ъ': '', 'Ы': 'Y', 'Ь': '', 'Э': 'E', 'Ю': 'Yu', 'Я': 'Ya',
  'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
  'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
  'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
  'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch',
  'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
};

const GTT_AUTO_DICT = {
  // Classic Russian & iconic builds
  'волга': 'Volga',
  'чайка': 'Chaika',
  'жигули': 'Zhiguli',
  'жигуль': 'Zhigul',
  'лада': 'Lada',
  'нива': 'Niva',
  'москвич': 'Moskvich',
  'кгб': 'KGB',
  'газ': 'GAZ',
  'ваз': 'VAZ',
  'уаз': 'UAZ',
  'камаз': 'KAMAZ',
  'ссср': 'USSR',
  'рф': 'RF',
  
  // GTT legends
  'зеленка': 'Zelenka',
  'зелёнка': 'Zelenka',
  'беззубик': 'Bezzubik',
  'рокот': 'Rokot',
  'гюрза': 'Gyurza',
  'курдалагон': 'Kurdalagon',
  'люцифер': 'Lucifer',
  'драко': 'Draco',
  'промод': 'Pro-Mod',
  'про-мод': 'Pro-Mod',
  'коржик': 'Korzhik',
  'гоша': 'Gosha',
  'турботех': 'TurboTech',
  'имба': 'Imba',
  
  // Automotive engineering terms
  'турбо': 'Turbo',
  'твин': 'Twin',
  'битурбо': 'BiTurbo',
  'би-турбо': 'BiTurbo',
  'компрессор': 'Supercharger',
  'мотор': 'Engine',
  'проект': 'Project',
  'выхлоп': 'Exhaust',
  'титан': 'Titanium',
  'инконель': 'Inconel',
  'карбон': 'Carbon',
  'ковка': 'Forged',
  'кованый': 'Forged',
  'впрыск': 'Injection',
  'метанол': 'Methanol',
  'этанол': 'Ethanol',
  'спирт': 'Ethanol',
  'закись': 'Nitrous',
  'нитро': 'Nitro',
  'стейдж': 'Stage',
  'буст': 'Boost',
  'кастом': 'Custom',
  'корч': 'Korch',
  'сток': 'Stock',
  'силы': 'HP',
  'сил': 'HP',
  'л.с.': 'HP',
  'лс': 'HP',

  // Colors & adjectives
  'черный': 'Black', 'черная': 'Black', 'чёрный': 'Black', 'чёрная': 'Black',
  'белый': 'White', 'белая': 'White',
  'красный': 'Red', 'красная': 'Red',
  'синий': 'Blue', 'синяя': 'Blue',
  'зеленый': 'Green', 'зеленая': 'Green', 'зелёный': 'Green', 'зелёная': 'Green',
  'желтый': 'Yellow', 'желтая': 'Yellow', 'жёлтый': 'Yellow', 'жёлтая': 'Yellow',
  'серый': 'Grey', 'серая': 'Grey',
  'серебристый': 'Silver', 'серебро': 'Silver',
  'золотой': 'Gold', 'золотая': 'Gold',
  'оранжевый': 'Orange',
  'фиолетовый': 'Purple',
  'темный': 'Dark', 'тёмный': 'Dark',
  'светлый': 'Light',
  'быстрый': 'Fast', 'быстрая': 'Fast',
  
  // Motorsport & race
  'ракета': 'Rocket',
  'пушка': 'Rocket',
  'зверь': 'Beast',
  'демон': 'Demon',
  'монстр': 'Monster',
  'призрак': 'Ghost',
  'стрела': 'Arrow',
  'молния': 'Lightning',
  'гром': 'Thunder',
  'буря': 'Storm',
  'акула': 'Shark',
  'хищник': 'Predator',
  'ночной': 'Night', 'ночь': 'Night',
  'день': 'Day',
  'город': 'City',
  'гонка': 'Race', 'гоночный': 'Racing',
  'спорт': 'Sport', 'спортивный': 'Sport',
  'трек': 'Track',
  'стрип': 'Strip',
  'дрэг': 'Drag',
  'дрифт': 'Drift',
  'рекорд': 'Record',
  'кубок': 'Cup',
  'чемпион': 'Champion',
  'победа': 'Victory',
  'версия': 'Version',
  'серия': 'Series',
  'издание': 'Edition',
  'эдишн': 'Edition',
  'спец': 'Special', 'специальный': 'Special',
  'лимитированный': 'Limited',

  // Popular Russian phonetics for car makes/models
  'ниссан': 'Nissan',
  'бмв': 'BMW',
  'ауди': 'Audi',
  'порше': 'Porsche',
  'порш': 'Porsche',
  'ламборгини': 'Lamborghini',
  'ламборджини': 'Lamborghini',
  'ламба': 'Lambo',
  'додж': 'Dodge',
  'мерседес': 'Mercedes',
  'тойота': 'Toyota',
  'супра': 'Supra',
  'скайлайн': 'Skyline',
  'гтр': 'GT-R',
  'хуракан': 'Huracan',
  'авентадор': 'Aventador',
  'урус': 'Urus',
  'гальярдо': 'Gallardo',
  'челленджер': 'Challenger',
  'чарджер': 'Charger',
  'хеллкэт': 'Hellcat'
};

function autoTranslateRuToEn(text) {
  if (!text || typeof text !== 'string') return '';
  let str = text;

  // Process word by word preserving delimiters
  const tokens = str.split(/(\s+|[^\w\u0400-\u04FF]+)/);
  const out = [];

  for (let token of tokens) {
    if (!token) continue;
    const lower = token.toLowerCase();
    if (GTT_AUTO_DICT[lower]) {
      let repl = GTT_AUTO_DICT[lower];
      if (token === token.toUpperCase() && token.length > 1) {
        repl = repl.toUpperCase();
      } else if (token[0] === token[0].toUpperCase()) {
        repl = repl.charAt(0).toUpperCase() + repl.slice(1);
      }
      out.push(repl);
    } else {
      let chars = '';
      for (let i = 0; i < token.length; i++) {
        const c = token[i];
        chars += (GTT_TRANSLIT_MAP[c] !== undefined) ? GTT_TRANSLIT_MAP[c] : c;
      }
      out.push(chars);
    }
  }

  return out.join('');
}

let isManualNameEn = false;

function updateNameEnModeUI() {
  const badge = document.getElementById('nameEnAutoBadge');
  const btnText = document.getElementById('btnEditNameEnText');
  const btn = document.getElementById('btnToggleEditNameEn');

  if (isManualNameEn) {
    if (badge) {
      badge.style.display = 'inline-flex';
      badge.style.color = '#00ff88';
      badge.innerHTML = '<span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: #00ff88; box-shadow: 0 0 6px #00ff88;"></span> РУЧНОЙ ВВОД';
    }
    if (btnText) btnText.textContent = 'Авто';
    if (btn) {
      btn.title = 'Вернуть авто-перевод с русского';
      btn.classList.add('is-manual-mode');
    }
  } else {
    if (badge) {
      badge.style.display = 'inline-flex';
      badge.style.color = 'var(--gtt-orange)';
      badge.innerHTML = '<span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: var(--gtt-orange); box-shadow: 0 0 6px var(--gtt-orange);"></span> АВТО-ПЕРЕВОД С RU';
    }
    if (btnText) btnText.textContent = 'Изменить';
    if (btn) {
      btn.title = 'Изменить английское название вручную';
      btn.classList.remove('is-manual-mode');
    }
  }
}

function handleNameRuInput(val) {
  if (!isManualNameEn) {
    const translated = autoTranslateRuToEn(val);
    const enInput = document.getElementById('editNameEn');
    if (enInput) enInput.value = translated;
  }

  // Auto-detect brand if brand input is empty or defaults
  const brandInput = document.getElementById('editBrand');
  if (brandInput && (!brandInput.value || brandInput.value === 'GTT ATELIER')) {
    const detected = autoDetectBrand(val);
    if (detected !== 'GTT ATELIER') {
      brandInput.value = detected;
    }
  }

  // Auto-detect filter type if currently 'other'
  const typeSelect = document.getElementById('editType');
  if (typeSelect && typeSelect.value === 'other') {
    const detectedType = autoDetectType(val);
    if (detectedType !== 'other') {
      typeSelect.value = detectedType;
    }
  }
}

function toggleManualNameEn() {
  if (!isManualNameEn) {
    isManualNameEn = true;
    updateNameEnModeUI();
    const enInput = document.getElementById('editNameEn');
    if (enInput) {
      enInput.focus();
      enInput.select();
    }
    showToast('Режим редактирования', 'Теперь вы можете свободно изменить название на английском', 'info');
  } else {
    isManualNameEn = false;
    updateNameEnModeUI();
    const ruVal = document.getElementById('editNameRu')?.value || '';
    const enInput = document.getElementById('editNameEn');
    if (enInput) {
      enInput.value = autoTranslateRuToEn(ruVal);
    }
    showToast('Авто-перевод включен', 'Английское название снова генерируется автоматически из русского', 'success');
  }
}

function handleManualNameEnInput(val) {
  if (!isManualNameEn) {
    isManualNameEn = true;
    updateNameEnModeUI();
  }
}

function autoDetectBrand(name) {
  if (!name) return 'GTT ATELIER';
  const n = name.toUpperCase();
  if (n.includes('ВОЛГА') || n.includes('VOLGA') || n.includes('ГАЗ') || n.includes('GAZ')) return 'ГАЗ & ВОЛГА';
  if (n.includes('ЛАДА') || n.includes('LADA') || n.includes('ВАЗ') || n.includes('VAZ') || n.includes('ЖИГУЛИ') || n.includes('ZHIGULI')) return 'LADA & VAZ';
  if (n.includes('GT-R') || n.includes('GTR') || n.includes('NISSAN') || n.includes('LUCIFER') || n.includes('DRACO')) return 'NISSAN & GTT';
  if (n.includes('BMW') || n.includes('M5') || n.includes('M4') || n.includes('M3') || n.includes('M8') || n.includes('M2')) return 'BMW M-POWER';
  if (n.includes('AUDI') || n.includes('R8') || n.includes('RS6') || n.includes('RS7')) return 'AUDI SPORT';
  if (n.includes('PORSCHE') || n.includes('911') || n.includes('TURBO S') || n.includes('GT3') || n.includes('GT2')) return 'PORSCHE';
  if (n.includes('LAMBORGHINI') || n.includes('HURACAN') || n.includes('AVENTADOR') || n.includes('URUS')) return 'LAMBORGHINI';
  if (n.includes('DODGE') || n.includes('HELLCAT') || n.includes('DEMON') || n.includes('CHALLENGER') || n.includes('CHARGER')) return 'DODGE & SRT';
  if (n.includes('MERCEDES') || n.includes('AMG')) return 'MERCEDES-AMG';
  return 'GTT ATELIER';
}

function autoDetectType(name) {
  if (!name) return 'other';
  const n = name.toUpperCase();
  if (n.includes('GT-R') || n.includes('GTR') || n.includes('NISSAN') || n.includes('LUCIFER') || n.includes('DRACO')) return 'gtr';
  if (n.includes('BMW') || n.includes('M5') || n.includes('M4') || n.includes('M3')) return 'bmw';
  if (n.includes('AUDI') || n.includes('R8')) return 'audi';
  if (n.includes('PORSCHE') || n.includes('911')) return 'porsche';
  if (n.includes('LAMBORGHINI') || n.includes('HURACAN')) return 'lambo';
  return 'other';
}

// ==========================================================================
// TOP-N FEATURED CARS (FLAGSHIPS ENGINE, DYNAMIC COUNT & DRAG-AND-DROP REORDERING)
// ==========================================================================
let currentTargetFeaturedSlot = null;
let featuredDragFromSlot = null;
let featuredPointerState = null;
let draggingCarRowId = null;

function getFeaturedCarsList(projects) {
  if (!Array.isArray(projects)) return [];
  const featured = projects.filter(p => p.is_featured === 1 || p.is_featured === true || p.is_featured === '1' || p.isFeatured === true);
  if (featured.length > 0) return featured;
  return projects.slice(0, 4);
}

function getFeaturedHeadingText(count) {
  if (count <= 0) return 'Топ главных проектов (Витрина пуста)';
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) {
    return 'Топ-' + count + ' главный проект (Самый быстрый болид)';
  }
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
    return 'Топ-' + count + ' главных проекта (Самые быстрые болиды)';
  }
  return 'Топ-' + count + ' главных проектов (Самые быстрые болиды)';
}

function getFeaturedSubtitleText(count) {
  return 'Именно эти ' + count + ' болидов отображаются первыми в витрине на главной странице сайта до кнопки «Показать все проекты». Вы можете перетаскивать их мышкой или свайпом, зажать карточку для перемещения, поменять местами стрелками, убрать галочкой или перенести снизу новый болид.';
}

// Table row dragging
function handleCarRowDragStart(e, carId) {
  if (e.target.closest('button, select, input, label, a')) {
    e.preventDefault();
    return;
  }
  draggingCarRowId = carId;
  window._draggingCarRowId = carId;
  try {
    e.dataTransfer.setData('text/plain', 'car_row:' + carId);
    e.dataTransfer.effectAllowed = 'copyMove';
  } catch (err) {}
  
  const tr = e.currentTarget;
  if (tr) tr.classList.add('is-row-dragging');
}

function handleCarRowDragEnd(e) {
  draggingCarRowId = null;
  window._draggingCarRowId = null;
  document.querySelectorAll('tr.is-row-dragging').forEach(tr => tr.classList.remove('is-row-dragging'));
  document.querySelectorAll('.is-drop-active, .is-drop-target').forEach(el => {
    el.classList.remove('is-drop-active', 'is-drop-target');
  });
}

function handleSlotsAreaDragOver(e) {
  e.preventDefault();
  if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
  const target = e.currentTarget;
  if (target) target.classList.add('is-drop-active');
}

function handleSlotsAreaDragLeave(e) {
  const target = e.currentTarget;
  if (target) target.classList.remove('is-drop-active');
}

function handleDropIntoNewSlot(e) {
  e.preventDefault();
  e.stopPropagation();
  const target = e.currentTarget;
  if (target) target.classList.remove('is-drop-active');

  let carId = draggingCarRowId || window._draggingCarRowId;
  if (!carId) {
    try {
      const raw = e.dataTransfer.getData('text/plain');
      if (raw && raw.startsWith('car_row:')) {
        carId = raw.replace('car_row:', '');
      } else if (raw && !isNaN(parseInt(raw, 10))) {
        const fromSlot = parseInt(raw, 10);
        const projects = getDB(ADMIN_STORAGE_KEY, defaultProjects);
        const featured = getFeaturedCarsList(projects);
        if (fromSlot >= 0 && fromSlot < featured.length) {
          moveFeaturedSlot(fromSlot, featured.length - 1);
        }
        return;
      }
    } catch (err) {}
  }

  if (carId) {
    toggleCarFeatured(carId, true);
  }
}

// Slot card dragging
function handleFeaturedDragStart(e, slotIdx) {
  if (e.target.closest('button, select, input, label, a, .btn-slot-edit, .btn-slot-arrow, .btn-slot-remove')) {
    e.preventDefault();
    return;
  }
  featuredDragFromSlot = slotIdx;
  e.dataTransfer.effectAllowed = 'move';
  try {
    e.dataTransfer.setData('text/plain', String(slotIdx));
  } catch (err) {}
  
  const card = e.currentTarget;
  if (card) {
    card.classList.add('is-dragging');
  }
}

function handleFeaturedDragOver(e, slotIdx) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  const card = e.currentTarget;
  if (card) {
    if (draggingCarRowId || (featuredDragFromSlot !== null && featuredDragFromSlot !== slotIdx)) {
      card.classList.add('is-drop-target');
    }
  }
}

function handleFeaturedDragLeave(e, slotIdx) {
  const card = e.currentTarget;
  if (card) {
    card.classList.remove('is-drop-target');
  }
}

function handleFeaturedDrop(e, targetSlotIdx) {
  e.preventDefault();
  e.stopPropagation();
  const card = e.currentTarget;
  if (card) {
    card.classList.remove('is-drop-target', 'is-drop-active');
  }

  let carRowId = draggingCarRowId || window._draggingCarRowId;
  let rawData = '';
  try {
    rawData = e.dataTransfer.getData('text/plain') || '';
  } catch (err) {}

  if (rawData.startsWith('car_row:')) {
    carRowId = rawData.replace('car_row:', '');
  }

  if (carRowId) {
    insertCarIntoFeaturedSlot(carRowId, targetSlotIdx);
    return;
  }

  let fromSlot = featuredDragFromSlot;
  if (fromSlot === null && rawData !== '') {
    const parsed = parseInt(rawData, 10);
    if (!isNaN(parsed)) fromSlot = parsed;
  }

  if (fromSlot !== null && !isNaN(fromSlot) && fromSlot !== targetSlotIdx) {
    moveFeaturedSlot(fromSlot, targetSlotIdx);
  }
  featuredDragFromSlot = null;
}

function handleFeaturedDragEnd(e) {
  document.querySelectorAll('.featured-slot-card').forEach(el => {
    el.classList.remove('is-dragging', 'is-drop-target', 'is-holding');
  });
  featuredDragFromSlot = null;
  draggingCarRowId = null;
  window._draggingCarRowId = null;
}

// Unified Pointer & Touch & Long-press engine
function initFeaturedPointerEvents() {
  const grid = document.getElementById('featuredSlotsGrid');
  if (!grid || grid._pointerEventsBound) return;
  grid._pointerEventsBound = true;

  grid.addEventListener('pointerdown', (e) => {
    if (e.target.closest('button, select, input, label, a, .btn-slot-edit, .btn-slot-arrow, .btn-slot-remove')) return;
    const card = e.target.closest('.featured-slot-card');
    if (!card) return;

    const fromSlot = parseInt(card.dataset.slot, 10);
    if (isNaN(fromSlot)) return;

    featuredPointerState = {
      card,
      fromSlot,
      startX: e.clientX,
      startY: e.clientY,
      pointerId: e.pointerId,
      isDragging: false,
      isHolding: false,
      avatar: null,
      timer: setTimeout(() => {
        if (featuredPointerState && !featuredPointerState.isDragging) {
          featuredPointerState.isHolding = true;
          card.classList.add('is-holding');
          if (navigator.vibrate) {
            try { navigator.vibrate(30); } catch (err) {}
          }
        }
      }, 180)
    };
  });

  window.addEventListener('pointermove', (e) => {
    if (!featuredPointerState) return;
    const state = featuredPointerState;
    if (e.pointerId !== state.pointerId) return;

    const dx = e.clientX - state.startX;
    const dy = e.clientY - state.startY;
    const dist = Math.hypot(dx, dy);

    if (!state.isDragging) {
      if (dist > 7 || state.isHolding) {
        if (state.timer) clearTimeout(state.timer);
        state.isDragging = true;
        state.card.classList.remove('is-holding');
        state.card.classList.add('is-dragging');

        const rect = state.card.getBoundingClientRect();
        const avatar = state.card.cloneNode(true);
        avatar.className = 'featured-slot-card featured-slot-drag-avatar';
        avatar.style.width = rect.width + 'px';
        avatar.style.height = rect.height + 'px';
        avatar.style.left = e.clientX + 'px';
        avatar.style.top = e.clientY + 'px';
        avatar.querySelectorAll('button, select, input').forEach(el => el.style.pointerEvents = 'none');
        document.body.appendChild(avatar);
        state.avatar = avatar;
      }
    }

    if (state.isDragging && state.avatar) {
      if (e.cancelable) e.preventDefault();
      state.avatar.style.left = e.clientX + 'px';
      state.avatar.style.top = e.clientY + 'px';

      const elem = document.elementFromPoint(e.clientX, e.clientY);
      const targetCard = elem ? elem.closest('.featured-slot-card:not(.featured-slot-drag-avatar)') : null;

      document.querySelectorAll('.featured-slot-card:not(.featured-slot-drag-avatar)').forEach(el => {
        if (el !== targetCard) el.classList.remove('is-drop-target');
      });

      if (targetCard && targetCard !== state.card) {
        targetCard.classList.add('is-drop-target');
      }
    }
  }, { passive: false });

  const endPointerDrag = (e) => {
    if (!featuredPointerState) return;
    const state = featuredPointerState;
    if (e.pointerId && state.pointerId !== e.pointerId) return;

    if (state.timer) clearTimeout(state.timer);

    if (state.avatar) {
      state.avatar.remove();
      state.avatar = null;
    }

    state.card.classList.remove('is-dragging', 'is-holding');

    if (state.isDragging) {
      const elem = document.elementFromPoint(e.clientX, e.clientY);
      const targetCard = elem ? elem.closest('.featured-slot-card:not(.featured-slot-drag-avatar)') : null;
      let targetSlot = null;
      if (targetCard && targetCard !== state.card) {
        targetSlot = parseInt(targetCard.dataset.slot, 10);
      } else {
        const highlighted = document.querySelector('.featured-slot-card.is-drop-target:not(.featured-slot-drag-avatar)');
        if (highlighted && highlighted !== state.card) {
          targetSlot = parseInt(highlighted.dataset.slot, 10);
        }
      }

      if (targetSlot !== null && !isNaN(targetSlot) && targetSlot !== state.fromSlot) {
        moveFeaturedSlot(state.fromSlot, targetSlot);
      }
    }

    document.querySelectorAll('.featured-slot-card').forEach(el => {
      el.classList.remove('is-drop-target', 'is-dragging', 'is-holding');
    });

    featuredPointerState = null;
  };

  window.addEventListener('pointerup', endPointerDrag);
  window.addEventListener('pointercancel', endPointerDrag);
}

function renderFeaturedSlots() {
  const container = document.getElementById('featuredSlotsGrid');
  if (!container) return;

  const projects = getDB(ADMIN_STORAGE_KEY, defaultProjects);
  const featuredCars = getFeaturedCarsList(projects);
  const esc = (s) => (s ? String(s).replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;') : '');

  const headingEl = document.getElementById('featuredSlotsHeading');
  const descEl = document.getElementById('featuredSlotsDesc');
  if (headingEl) {
    headingEl.textContent = getFeaturedHeadingText(featuredCars.length);
  }
  if (descEl) {
    descEl.textContent = getFeaturedSubtitleText(featuredCars.length);
  }

  let html = '';
  for (let i = 0; i < featuredCars.length; i++) {
    const car = featuredCars[i];
    const rawName = car.nameRu || car.name_ru || (car.name && (car.name.ru || car.name.en)) || car.id;
    const name = esc(rawName);
    const hp = esc(car.hp || '—');
    const quarter = esc(car.quarterMile || car.quarter_mile || '—');
    const img = esc(convertGoogleDriveUrl(car.img) || 'assets/cars/bmw_m5_rdrc_race.jpg');
    const hasVideo = !!(car.videoSrc || car.video_src);
    const carId = esc(car.id);
    const carIdAttr = escapeJS(car.id);

    const options = projects.map(p => {
      const pName = p.nameRu || p.name_ru || (p.name && (p.name.ru || p.name.en)) || p.id;
      const pHp = p.hp || '';
      const isSel = p.id === car.id ? 'selected' : '';
      return `<option value="${p.id}" ${isSel}>${esc(pName)} (${esc(pHp)})</option>`;
    }).join('');

    html += `
      <div class="featured-slot-card" data-slot="${i}" draggable="true"
           ondragstart="handleFeaturedDragStart(event, ${i})"
           ondragover="handleFeaturedDragOver(event, ${i})"
           ondragleave="handleFeaturedDragLeave(event, ${i})"
           ondrop="handleFeaturedDrop(event, ${i})"
           ondragend="handleFeaturedDragEnd(event)">
        <div class="featured-slot-topbar">
          <div class="featured-slot-rank">
            <span class="featured-slot-drag-handle" title="Зажмите карточку или перетащите мышкой / свайпом, чтобы поменять слоты местами" data-drag-handle="true">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="8" cy="6" r="2.2"></circle><circle cx="16" cy="6" r="2.2"></circle>
                <circle cx="8" cy="12" r="2.2"></circle><circle cx="16" cy="12" r="2.2"></circle>
                <circle cx="8" cy="18" r="2.2"></circle><circle cx="16" cy="18" r="2.2"></circle>
              </svg>
            </span>
            <span>⚡ СЛОТ #${i + 1}</span>
          </div>
          <div class="slot-topbar-controls">
            <label class="slot-featured-check" title="Снять с витрины топа">
              <input type="checkbox" checked onchange="toggleCarFeatured('${carIdAttr}', false)">
              <span>В ТОПЕ</span>
            </label>
            <button type="button" class="btn-slot-remove" onclick="toggleCarFeatured('${carIdAttr}', false)" title="Убрать из топа">✕</button>
            <div class="featured-slot-arrows">
              <button type="button" class="btn-slot-arrow" onclick="moveFeaturedSlot(${i}, ${i - 1})" ${i === 0 ? 'disabled' : ''} title="Сдвинуть влево">←</button>
              <button type="button" class="btn-slot-arrow" onclick="moveFeaturedSlot(${i}, ${i + 1})" ${i === featuredCars.length - 1 ? 'disabled' : ''} title="Сдвинуть вправо">→</button>
            </div>
          </div>
        </div>

        <div class="featured-slot-img-wrap">
          <img src="${img}" alt="${name}" class="featured-slot-img" onerror="this.onerror=null; this.src='assets/cars/gtt_classified_car.svg';">
          <div class="featured-slot-video-tag ${hasVideo ? 'active' : ''}">
            ${hasVideo ? '● Видео активно' : '○ Без видео'}
          </div>
        </div>

        <div class="featured-slot-name" title="${name}">${name}</div>

        <div class="featured-slot-metrics">
          <span class="featured-slot-metric-hp">${hp}</span>
          <span class="featured-slot-metric-time">${quarter}</span>
        </div>

        <div style="display:flex; flex-direction:column; gap:5px;">
          <label style="font-size:10px; color:var(--text-muted); font-family:var(--font-mono); text-transform:uppercase; letter-spacing:0.4px;">Выбрать болид из базы:</label>
          <select class="featured-slot-select" onchange="handleFeaturedSlotSelectChange(${i}, this.value)">
            ${options}
          </select>
        </div>

        <div class="featured-slot-actions">
          <button type="button" class="btn-slot-edit" onclick="openCarEditModal('${carIdAttr}', ${i})" title="Редактировать параметры болида">
            ✏️ Редактировать
          </button>
          <button type="button" class="btn-slot-edit" onclick="openCarEditModal(null, ${i})" title="Загрузить новый болид через проводник">
            📁 Папка
          </button>
        </div>
      </div>
    `;
  }

  // Append Dropzone for adding new slots
  html += `
    <div class="featured-slot-add-dropzone" id="featuredAddDropzone"
         ondragover="handleSlotsAreaDragOver(event)"
         ondragleave="handleSlotsAreaDragLeave(event)"
         ondrop="handleDropIntoNewSlot(event)">
      <div class="add-dropzone-icon">＋</div>
      <div class="add-dropzone-title">Добавить в Топ-${featuredCars.length + 1}</div>
      <div class="add-dropzone-hint">
        Перетащите плашку болида из таблицы снизу сюда или отметьте галочкой «В топе»
      </div>
    </div>
  `;

  container.innerHTML = html;
  initFeaturedPointerEvents();
}

function handleFeaturedSlotSelectChange(slotIdx, newCarId) {
  if (!newCarId) return;
  const projects = getDB(ADMIN_STORAGE_KEY, defaultProjects);
  const featured = getFeaturedCarsList(projects);

  if (slotIdx >= featured.length) return;
  const currentCar = featured[slotIdx];
  if (currentCar.id === newCarId) return;

  const targetCar = projects.find(c => c.id === newCarId);
  if (!targetCar) return;

  const oldIdxInFeatured = featured.findIndex(c => c.id === newCarId);
  if (oldIdxInFeatured !== -1) {
    featured[slotIdx] = targetCar;
    featured[oldIdxInFeatured] = currentCar;
  } else {
    currentCar.is_featured = 0;
    currentCar.isFeatured = false;
    targetCar.is_featured = 1;
    targetCar.isFeatured = true;
    featured[slotIdx] = targetCar;
  }

  const nonFeatured = projects.filter(c => !featured.some(f => f.id === c.id));
  const newProjects = [...featured, ...nonFeatured];

  saveDB(ADMIN_STORAGE_KEY, newProjects);
  localStorage.setItem('gtt_projects_v2', JSON.stringify(newProjects));

  if (window.BroadcastChannel) {
    try {
      new BroadcastChannel('gtt_channel').postMessage({ type: 'projects_updated', projects: newProjects });
    } catch (e) {}
  }

  renderCarsTable();

  const name = targetCar.nameRu || targetCar.name_ru || targetCar.id;
  showToast('Слот обновлен', `В Слот #${slotIdx + 1} назначен болид «${name}»`, 'success');

  recordAuditEvent({
    section: 'Флагманы ТОП',
    action: `Назначен слот #${slotIdx + 1}`,
    item: name,
    details: `Заменен на позиции #${slotIdx + 1}`
  });

  syncFeaturedOrderToBackend(newProjects);
}

function moveFeaturedSlot(fromIdx, toIdx) {
  const projects = getDB(ADMIN_STORAGE_KEY, defaultProjects);
  const featured = getFeaturedCarsList(projects);
  const count = featured.length;

  if (fromIdx < 0 || toIdx < 0 || fromIdx >= count || toIdx >= count || fromIdx === toIdx) return;

  const movedCar = featured[fromIdx];
  featured.splice(fromIdx, 1);
  featured.splice(toIdx, 0, movedCar);

  const nonFeatured = projects.filter(c => !featured.some(f => f.id === c.id));
  const newProjects = [...featured, ...nonFeatured];

  saveDB(ADMIN_STORAGE_KEY, newProjects);
  localStorage.setItem('gtt_projects_v2', JSON.stringify(newProjects));

  if (window.BroadcastChannel) {
    try {
      new BroadcastChannel('gtt_channel').postMessage({ type: 'projects_updated', projects: newProjects });
    } catch (e) {}
  }

  renderCarsTable();

  const name = movedCar.nameRu || movedCar.name_ru || movedCar.id;
  showToast('Слоты изменены', `«${name}» перемещен в Слот #${toIdx + 1}`, 'info');

  recordAuditEvent({
    section: 'Флагманы ТОП',
    action: 'Смена позиций',
    item: `Слот #${fromIdx + 1} ⇄ Слот #${toIdx + 1}`,
    details: `Перемещение «${name}»`
  });

  syncFeaturedOrderToBackend(newProjects);
}

function toggleCarFeatured(carId, makeFeatured) {
  const projects = getDB(ADMIN_STORAGE_KEY, defaultProjects);
  const car = projects.find(c => c.id === carId);
  if (!car) return;

  const currentFeatured = getFeaturedCarsList(projects);
  const isCurrentlyFeatured = currentFeatured.some(c => c.id === carId);

  if (isCurrentlyFeatured === Boolean(makeFeatured)) return;

  if (makeFeatured) {
    car.is_featured = 1;
    car.isFeatured = true;
    const featured = projects.filter(c => (c.is_featured === 1 || c.is_featured === true || c.is_featured === '1' || c.isFeatured === true) && c.id !== carId);
    featured.push(car);
    const nonFeatured = projects.filter(c => c.id !== carId && !featured.some(f => f.id === c.id));
    const newProjects = [...featured, ...nonFeatured];

    saveDB(ADMIN_STORAGE_KEY, newProjects);
    localStorage.setItem('gtt_projects_v2', JSON.stringify(newProjects));

    if (window.BroadcastChannel) {
      try {
        new BroadcastChannel('gtt_channel').postMessage({ type: 'projects_updated', projects: newProjects });
      } catch (e) {}
    }

    renderCarsTable();
    const name = car.nameRu || car.name_ru || car.id;
    showToast('Добавлен в Топ', `«${name}» добавлен в Слот #${featured.length} (Всего в топе: ${featured.length})`, 'success');

    recordAuditEvent({
      section: 'Флагманы ТОП',
      action: 'Добавлен болид',
      item: name,
      details: `Слот #${featured.length}`
    });

    syncFeaturedOrderToBackend(newProjects);
  } else {
    if (currentFeatured.length <= 1) {
      showToast('Внимание', 'В блоке Топ должен оставаться хотя бы один болид!', 'warning');
      renderCarsTable();
      return;
    }

    car.is_featured = 0;
    car.isFeatured = false;
    const featured = currentFeatured.filter(c => c.id !== carId);
    const nonFeatured = projects.filter(c => !featured.some(f => f.id === c.id));
    const newProjects = [...featured, ...nonFeatured];

    saveDB(ADMIN_STORAGE_KEY, newProjects);
    localStorage.setItem('gtt_projects_v2', JSON.stringify(newProjects));

    if (window.BroadcastChannel) {
      try {
        new BroadcastChannel('gtt_channel').postMessage({ type: 'projects_updated', projects: newProjects });
      } catch (e) {}
    }

    renderCarsTable();
    const name = car.nameRu || car.name_ru || car.id;
    showToast('Убран из Топа', `«${name}» убран из витрины топа (Осталось в топе: ${featured.length})`, 'info');

    recordAuditEvent({
      section: 'Флагманы ТОП',
      action: 'Убран болид',
      item: name,
      details: `Осталось в топе: ${featured.length}`
    });

    syncFeaturedOrderToBackend(newProjects);
  }
}

function insertCarIntoFeaturedSlot(carId, targetSlotIdx) {
  const projects = getDB(ADMIN_STORAGE_KEY, defaultProjects);
  const targetCar = projects.find(c => c.id === carId);
  if (!targetCar) return;

  targetCar.is_featured = 1;
  targetCar.isFeatured = true;

  let featured = projects.filter(c => (c.is_featured === 1 || c.is_featured === true || c.is_featured === '1' || c.isFeatured === true) && c.id !== carId);
  const nonFeatured = projects.filter(c => c.id !== carId && !featured.some(f => f.id === c.id));

  const insertIdx = Math.max(0, Math.min(targetSlotIdx, featured.length));
  featured.splice(insertIdx, 0, targetCar);

  const newProjects = [...featured, ...nonFeatured];
  saveDB(ADMIN_STORAGE_KEY, newProjects);
  localStorage.setItem('gtt_projects_v2', JSON.stringify(newProjects));

  if (window.BroadcastChannel) {
    try {
      new BroadcastChannel('gtt_channel').postMessage({ type: 'projects_updated', projects: newProjects });
    } catch (e) {}
  }

  renderCarsTable();

  const name = targetCar.nameRu || targetCar.name_ru || targetCar.id;
  showToast('Болид добавлен в Топ', `«${name}» назначен в Слот #${insertIdx + 1} (Всего в топе: ${featured.length})`, 'success');

  recordAuditEvent({
    section: 'Флагманы ТОП',
    action: `Добавлен в Слот #${insertIdx + 1}`,
    item: name,
    details: `Всего в топе: ${featured.length}`
  });

  syncFeaturedOrderToBackend(newProjects);
}

async function syncFeaturedOrderToBackend(projects) {
  const list = projects || getDB(ADMIN_STORAGE_KEY, defaultProjects);
  const featured = getFeaturedCarsList(list);
  const featuredIds = featured.map(c => c.id);

  try {
    await apiFetch('/api/cars/featured', {
      method: 'POST',
      body: JSON.stringify({ featured_ids: featuredIds })
    });
  } catch (err) {
    console.warn('[GTT API] syncFeaturedOrderToBackend note:', err);
  }
}

function renderCarsTable() {
  const projects = getDB(ADMIN_STORAGE_KEY, defaultProjects);
  const tbody = document.getElementById('projectsTableBody');
  const totalCarsEl = document.getElementById('statTotalCars');
  if (totalCarsEl) totalCarsEl.textContent = projects.length;
  renderGarageStats();
  renderHeroTelemetry();
  renderFeaturedSlots();
  if (!tbody) return;

  const featured = getFeaturedCarsList(projects);
  const featuredSet = new Set(featured.map(c => c.id));

  tbody.innerHTML = projects.map((car, idx) => {
    const rawName = car.nameRu || car.name_ru || (car.name && (car.name.ru || car.name.en)) || car.id;
    const name = escapeHTML(rawName);
    const isClass = Boolean(car.isClassified || car.is_classified || (car.img && (car.img.includes('classified') || car.img.endsWith('.svg'))));
    const rawHp = (car.hp || '').trim();
    const hp = escapeHTML(isClass ? (rawHp || '—') : ((!rawHp || rawHp === '-' || rawHp === '- HP' || rawHp === '—') ? '1,050+ HP' : rawHp));
    const rawQ = (car.quarterMile || car.quarter_mile || '').trim();
    const quarter = escapeHTML(isClass ? (rawQ || '—') : ((!rawQ || rawQ === '-' || rawQ === '- сек' || rawQ === '—') ? '9.420 сек' : rawQ));
    const img = escapeHTML(convertGoogleDriveUrl(car.img) || 'assets/cars/bmw_m5_rdrc_race.jpg');
    const carId = escapeHTML(car.id);
    const carIdAttr = escapeJS(car.id);
    const hasVideo = !!(car.videoSrc || car.video_src);
    const isFeatured = featuredSet.has(car.id);
    const featuredIdx = isFeatured ? featured.findIndex(c => c.id === car.id) : -1;
    const rawBrand = car.brand || (car.type ? car.type.toUpperCase() : 'GTT');
    const brand = escapeHTML(rawBrand);

    return `
    <tr class="${isFeatured ? 'tr-featured-slot' : ''} tr-draggable"
        draggable="true"
        ondragstart="handleCarRowDragStart(event, '${carIdAttr}')"
        ondragend="handleCarRowDragEnd(event)">
      <td style="text-align: center;">
        <label class="car-table-check-label ${isFeatured ? 'is-top' : ''}" title="${isFeatured ? 'Снять с витрины топа' : 'Добавить в витрину топа'}">
          <input type="checkbox" ${isFeatured ? 'checked' : ''} onchange="toggleCarFeatured('${carIdAttr}', this.checked)">
          <span>${isFeatured ? `ТОП #${featuredIdx + 1}` : 'В ТОП'}</span>
        </label>
      </td>
      <td>
        <div class="car-cell-flex">
          <span class="car-row-drag-handle" title="Зажмите и перетащите в блок Топ выше" data-drag-handle="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="8" cy="6" r="2.2"></circle><circle cx="16" cy="6" r="2.2"></circle>
              <circle cx="8" cy="12" r="2.2"></circle><circle cx="16" cy="12" r="2.2"></circle>
              <circle cx="8" cy="18" r="2.2"></circle><circle cx="16" cy="18" r="2.2"></circle>
            </svg>
          </span>
          <img src="${img}" alt="${name}" class="car-thumb" onerror="this.onerror=null; this.src='assets/cars/gtt_classified_car.svg';">
          <div>
            <div class="car-title-text">${name}</div>
            <div style="display:flex; gap:6px; align-items:center; margin-top:2px;">
              <span class="tag-pill">${carId}</span>
              ${isFeatured ? `<span class="tag-pill" style="background:rgba(234, 91, 12, 0.2); border:1px solid var(--gtt-orange); color:#fff; font-weight:700;">⚡ ТОП #${featuredIdx + 1}</span>` : ''}
            </div>
          </div>
        </div>
      </td>
      <td><span class="tag-pill">${brand}</span></td>
      <td style="color: var(--gtt-orange); font-weight: 700;">${hp}</td>
      <td style="font-family: var(--font-mono);">${quarter}</td>
      <td>
        ${hasVideo ? '<span style="color: #22c55e; font-size: 11px;">● Подключено</span>' : '<span style="color: #64748b; font-size: 11px;">Нет</span>'}
      </td>
      <td>
        <div class="row-actions">
          <button class="table-btn" onclick="openCarEditModal('${carIdAttr}', ${isFeatured ? featuredIdx : 'null'})">Редактировать</button>
          <button class="table-btn delete" onclick="deleteCarProject('${carIdAttr}')">Удалить</button>
        </div>
      </td>
    </tr>
    `;
  }).join('');
}


// ==========================================================================
// UNIVERSAL FILE UPLOAD & CROSS-PLATFORM OS FILE PICKER ENGINE (MAC & WIN)
// ==========================================================================
function compressImageClientSide(base64Data, maxWidth = 1280, maxHeight = 850, quality = 0.82) {
  return new Promise((resolve) => {
    if (typeof Image === 'undefined') return resolve(base64Data);
    const img = new Image();
    img.onload = () => {
      let width = img.width;
      let height = img.height;
      if (width > maxWidth || height > maxHeight) {
        if (width / height > maxWidth / maxHeight) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        } else {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }
      try {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      } catch (err) {
        resolve(base64Data);
      }
    };
    img.onerror = () => resolve(base64Data);
    img.src = base64Data;
  });
}

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

async function handleGenericUpload(file, { inputId, previewWrapId, previewImgId, previewNameId, previewInfoId, folder, isVideo, successMsg }) {
  if (!file) return;

  if (isVideo) {
    const validVideo = file.type.startsWith('video/') || /\.(mp4|webm|mov|m4v)$/i.test(file.name);
    if (!validVideo) {
      showToast('Неверный формат', 'Пожалуйста, выберите видеофайл (MP4, WebM, MOV)', 'warning');
      return;
    }
  } else {
    const validImg = file.type.startsWith('image/') || /\.(jpg|jpeg|png|webp|avif|gif)$/i.test(file.name);
    if (!validImg) {
      showToast('Неверный формат', 'Пожалуйста, выберите изображение (JPG, PNG, WebP, AVIF, GIF)', 'warning');
      return;
    }
  }

  const reader = new FileReader();
  reader.onload = async (event) => {
    let base64Data = event.target.result;
    const sizeKb = (file.size / 1024).toFixed(1);

    if (!isVideo) {
      try {
        base64Data = await compressImageClientSide(base64Data, 1280, 850, 0.82);
      } catch (cErr) {}
    }

    if (!isVideo && previewWrapId) {
      const wrap = document.getElementById(previewWrapId);
      const img = document.getElementById(previewImgId);
      const nameEl = document.getElementById(previewNameId);
      const infoEl = document.getElementById(previewInfoId);
      if (wrap) wrap.style.display = 'block';
      if (img) img.src = base64Data;
      if (nameEl) nameEl.textContent = file.name;
      if (infoEl) infoEl.textContent = `${sizeKb} КБ • Готово`;
    }

    const input = document.getElementById(inputId);
    const safeName = file.name.replace(/[^a-zA-Z0-9_\-\.]/g, '_');
    const targetFolder = folder || (isVideo ? 'videos' : 'cars');
    const fallbackPath = `assets/${targetFolder}/${safeName}`;

    // For photos, immediately set compressed base64Data so static hosting (GitHub Pages) works 100% reliably
    if (!isVideo && input) {
      input.value = base64Data;
    } else if (isVideo && input) {
      input.value = fallbackPath;
    }

    // Attempt secure upload via authenticated API if server backend is running
    try {
      const uploadResult = await apiFetch('/api/upload', {
        method: 'POST',
        body: JSON.stringify({
          filename: file.name,
          data: base64Data,
          folder: targetFolder
        })
      });

      if (uploadResult && uploadResult.url) {
        if (input) input.value = uploadResult.url;
        showToast('Файл сохранен', successMsg || `Файл «${file.name}» успешно сохранен на сервере`, 'success');
        return;
      }
    } catch (netErr) {
      console.warn('Backend upload note (offline or static hosting fallback active):', netErr);
      if (netErr && netErr.message && netErr.message.includes('401')) {
        showToast('Ошибка сессии', 'Сессия истекла, войдите заново', 'error');
      }
    }

    showToast('Файл выбран', successMsg || `Файл «${file.name}» готов к сохранению`, 'success');
  };

  reader.readAsDataURL(file);
}

// 1. Car Photo & Video Handlers
function triggerCarPhotoPicker() {
  const fileInput = document.getElementById('carPhotoFileInput');
  if (fileInput) {
    fileInput.value = '';
    fileInput.click();
  }
}

function handleCarPhotoSelected(e) {
  const file = e.target.files && e.target.files[0];
  if (file) {
    handleGenericUpload(file, {
      inputId: 'editImg',
      previewWrapId: 'carImgPreviewWrap',
      previewImgId: 'carImgPreview',
      previewNameId: 'carImgMetaName',
      previewInfoId: 'carImgMetaInfo',
      folder: 'cars',
      isVideo: false,
      successMsg: `Фото «${file.name}» готово к сохранению`
    });
  }
}

async function updateCarVideoPreviewUI(videoSrc, name = '', meta = '') {
  const wrap = document.getElementById('carVideoPreviewWrap');
  const videoEl = document.getElementById('carVideoPreview');
  const nameEl = document.getElementById('carVideoMetaName');
  const infoEl = document.getElementById('carVideoMetaInfo');

  if (!videoSrc) {
    if (wrap) wrap.style.display = 'none';
    if (videoEl) {
      videoEl.pause();
      videoEl.removeAttribute('src');
      videoEl.load();
    }
    return;
  }

  let resolvedSrc = videoSrc;
  if (typeof GTTMediaDB !== 'undefined') {
    resolvedSrc = await GTTMediaDB.resolveMediaUrl(videoSrc);
  }

  if (videoEl) {
    videoEl.src = resolvedSrc;
    videoEl.load();
  }
  if (nameEl) nameEl.textContent = name || (videoSrc.startsWith('blob:') ? 'Локальный видеофайл' : videoSrc.split('/').pop());
  if (infoEl) infoEl.textContent = meta || '● Готово к воспроизведению';
  if (wrap) wrap.style.display = 'block';
}

async function handleCarVideoPathInput(val) {
  const trimmed = (val || '').trim();
  if (trimmed) {
    await updateCarVideoPreviewUI(trimmed, trimmed.split('/').pop(), 'Путь к видео');
  } else {
    await updateCarVideoPreviewUI('');
  }
}

function clearCarVideoPreview() {
  const editVideoInput = document.getElementById('editVideoSrc');
  const fileInput = document.getElementById('carVideoFileInput');
  if (editVideoInput) editVideoInput.value = '';
  if (fileInput) fileInput.value = '';
  updateCarVideoPreviewUI('');
}

async function handleCarVideoSelected(e) {
  const file = e.target.files && e.target.files[0];
  if (!file) return;

  const validVideo = file.type.startsWith('video/') || /\.(mp4|webm|mov|m4v)$/i.test(file.name);
  if (!validVideo) {
    showToast('Неверный формат', 'Пожалуйста, выберите видеофайл (MP4, WebM, MOV)', 'warning');
    return;
  }

  const blobUrl = URL.createObjectURL(file);
  const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
  const safeName = file.name.replace(/[^a-zA-Z0-9_\-\.]/g, '_');
  const fallbackPath = `assets/videos/${safeName}`;

  const input = document.getElementById('editVideoSrc');
  if (input) input.value = fallbackPath;

  // Save to IndexedDB so it can be played instantly across tabs, pages and reloads
  if (typeof GTTMediaDB !== 'undefined') {
    await GTTMediaDB.saveBlob(file.name, file);
    await GTTMediaDB.saveBlob(safeName, file);
    await GTTMediaDB.saveBlob(fallbackPath, file);
  }

  // Update live preview in modal
  await updateCarVideoPreviewUI(blobUrl, file.name, `${sizeMb} МБ • Готово к воспроизведению`);

  showToast('Видео загружено', `Видео «${file.name}» (${sizeMb} МБ) готово к просмотру! Нажмите Play для проверки.`, 'success');

  // Background upload attempt if local server is active and file <= 45MB
  if (file.size <= 45 * 1024 * 1024) {
    try {
      const reader = new FileReader();
      reader.onload = async (evt) => {
        try {
          const res = await fetch('/api/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              filename: file.name,
              data: evt.target.result,
              folder: 'videos'
            })
          });
          if (res.ok) {
            const data = await res.json();
            if (data && data.url && input) {
              input.value = data.url;
            }
          }
        } catch (err) {}
      };
      reader.readAsDataURL(file);
    } catch (e) {}
  }
}

function handleCarImgPreviewError(imgEl) {
  if (!imgEl) return;
  imgEl.onerror = null;
  imgEl.src = 'assets/cars/gtt_classified_car.svg';
  const nameEl = document.getElementById('carImgMetaName');
  const infoEl = document.getElementById('carImgMetaInfo');
  if (nameEl) nameEl.innerHTML = '<span style="color:#ef4444; font-weight:700;">⚠️ Файл не найден или ссылка недоступна</span>';
  if (infoEl) infoEl.innerHTML = '<span style="color:#f59e0b;">Нажмите кнопку «Папка» чтобы загрузить фото с компьютера</span>';
}

function updateCarPhotoPreviewUI(imgSrc, name = '', meta = '') {
  const wrap = document.getElementById('carImgPreviewWrap');
  const imgEl = document.getElementById('carImgPreview');
  const nameEl = document.getElementById('carImgMetaName');
  const infoEl = document.getElementById('carImgMetaInfo');

  if (!imgSrc) {
    if (wrap) wrap.style.display = 'none';
    return;
  }

  const cleanSrc = convertGoogleDriveUrl(imgSrc);
  if (imgEl) {
    imgEl.onerror = () => handleCarImgPreviewError(imgEl);
    imgEl.src = cleanSrc;
    const pos = document.getElementById('editObjectPosition')?.value || 'center 50%';
    imgEl.style.objectPosition = pos;
  }
  if (nameEl) nameEl.textContent = name || (cleanSrc.startsWith('data:') ? 'Локальное изображение (сжато в памяти)' : cleanSrc.split('/').pop());
  if (infoEl) infoEl.textContent = meta || 'Предпросмотр активен';
  if (wrap) wrap.style.display = 'block';
}

function handleCarPhotoPositionChange(val) {
  const num = Math.max(0, Math.min(100, parseInt(val, 10) || 50));
  const posStr = `center ${num}%`;

  const hiddenInput = document.getElementById('editObjectPosition');
  if (hiddenInput) hiddenInput.value = posStr;

  const slider = document.getElementById('editObjectPositionY');
  if (slider && String(slider.value) !== String(num)) slider.value = num;

  const display = document.getElementById('carPosValueDisplay');
  if (display) display.textContent = `${num}%`;

  const previewImg = document.getElementById('carImgPreview');
  if (previewImg) {
    previewImg.style.objectPosition = posStr;
  }
}

function setCarPhotoPreset(preset) {
  let val = 50;
  if (preset === 'top') val = 15;
  else if (preset === 'center') val = 50;
  else if (preset === 'bottom') val = 82;

  handleCarPhotoPositionChange(val);
}

function handleCarPhotoPathInput(val) {
  let trimmed = (val || '').trim();
  const converted = convertGoogleDriveUrl(trimmed);
  if (converted !== trimmed) {
    trimmed = converted;
    const input = document.getElementById('editImg');
    if (input) input.value = converted;
    showToast('Google Диск', 'Ссылка с Google Диска автоматически преобразована для прямого показа фото', 'success');
  }
  if (trimmed) {
    updateCarPhotoPreviewUI(trimmed, trimmed.split('/').pop(), 'Путь к фото');
  } else {
    updateCarPhotoPreviewUI('');
  }
}

function clearCarPhotoPreview() {
  const editImgInput = document.getElementById('editImg');
  const fileInput = document.getElementById('carPhotoFileInput');
  if (editImgInput) editImgInput.value = '';
  if (fileInput) fileInput.value = '';
  updateCarPhotoPreviewUI('');
}

// 2. Team Member Photo Handlers
function handleTeamPhotoSelected(e) {
  const file = e.target.files && e.target.files[0];
  if (file) {
    handleGenericUpload(file, {
      inputId: 'editMemberPhoto',
      previewWrapId: 'teamImgPreviewWrap',
      previewImgId: 'teamImgPreview',
      previewNameId: 'teamImgMetaName',
      previewInfoId: 'teamImgMetaInfo',
      folder: 'photos',
      isVideo: false,
      successMsg: `Фото специалиста «${file.name}» загружено`
    });
  }
}

function handleTeamPhotoInput(val) {
  const trimmed = (val || '').trim();
  const img = document.getElementById('teamImgPreview');
  if (img) {
    img.src = trimmed || 'assets/photos/team_pilot_paddock.jpg';
  }
  updateTeamLiveCardPreview();
}

function updateTeamLiveCardPreview() {
  const nameInput = document.getElementById('editMemberName');
  const roleInput = document.getElementById('editMemberRole');
  const statusInput = document.getElementById('editMemberStatus');
  const photoInput = document.getElementById('editMemberPhoto');

  const namePrev = document.getElementById('teamLiveNamePreview');
  const rolePrev = document.getElementById('teamLiveRolePreview');
  const badgePrev = document.getElementById('teamLiveBadgeOverlay');
  const imgPrev = document.getElementById('teamImgPreview');

  if (namePrev) namePrev.textContent = (nameInput && nameInput.value.trim()) || 'Специалист GTT';
  if (rolePrev) rolePrev.textContent = (roleInput && roleInput.value.trim()) || 'Инженер команды';

  const statusMap = {
    active: '● Основной состав RDRC',
    atelier: '🔧 Лаборатория GTT',
    paddock: '🏁 На выездном этапе'
  };
  if (badgePrev && statusInput) {
    badgePrev.textContent = statusMap[statusInput.value] || 'В боксах GTT';
  }
  if (imgPrev && photoInput) {
    const p = photoInput.value.trim();
    if (p) imgPrev.src = p;
  }
}

function clearTeamPhotoPreview() {
  const input = document.getElementById('editMemberPhoto');
  const fileInput = document.getElementById('teamPhotoFileInput');
  const img = document.getElementById('teamImgPreview');
  if (input) input.value = '';
  if (fileInput) fileInput.value = '';
  if (img) img.src = 'assets/photos/team_pilot_paddock.jpg';
  updateTeamLiveCardPreview();
}

// 3. Record Photo & Telemetry Handlers
function handleRecordPhotoSelected(e) {
  const file = e.target.files && e.target.files[0];
  if (file) {
    handleGenericUpload(file, {
      inputId: 'editRecordImg',
      previewWrapId: 'recordImgPreviewWrap',
      previewImgId: 'recordImgPreview',
      previewNameId: 'recordImgMetaName',
      previewInfoId: 'recordImgMetaInfo',
      folder: 'records',
      isVideo: false,
      successMsg: `Файл рекорда «${file.name}» загружен`
    });
  }
}

function handleRecordPhotoInput(val) {
  const trimmed = (val || '').trim();
  const wrap = document.getElementById('recordImgPreviewWrap');
  const img = document.getElementById('recordImgPreview');
  const nameEl = document.getElementById('recordImgMetaName');
  if (trimmed) {
    if (wrap) wrap.style.display = 'block';
    if (img) img.src = trimmed;
    if (nameEl) nameEl.textContent = trimmed.split('/').pop();
  } else {
    if (wrap) wrap.style.display = 'none';
  }
}

function clearRecordPhotoPreview() {
  const input = document.getElementById('editRecordImg');
  const fileInput = document.getElementById('recordPhotoFileInput');
  const wrap = document.getElementById('recordImgPreviewWrap');
  if (input) input.value = '';
  if (fileInput) fileInput.value = '';
  if (wrap) wrap.style.display = 'none';
}

async function updateMediaFilePreviewUI(src, name = '', meta = '') {
  const wrap = document.getElementById('mediaFilePreviewWrap');
  const videoEl = document.getElementById('mediaVideoPreview');
  const imgEl = document.getElementById('mediaImgPreview');
  const nameEl = document.getElementById('mediaMetaName');
  const infoEl = document.getElementById('mediaMetaInfo');

  if (!src) {
    if (wrap) wrap.style.display = 'none';
    if (videoEl) {
      videoEl.pause();
      videoEl.removeAttribute('src');
      videoEl.style.display = 'none';
    }
    if (imgEl) {
      imgEl.removeAttribute('src');
      imgEl.style.display = 'none';
    }
    return;
  }

  let resolved = src;
  if (typeof GTTMediaDB !== 'undefined') {
    resolved = await GTTMediaDB.resolveMediaUrl(src);
  }

  const isImg = /\.(jpg|jpeg|png|webp|gif|avif|svg)$/i.test(src) || src.startsWith('data:image/');

  if (isImg) {
    if (videoEl) {
      videoEl.pause();
      videoEl.style.display = 'none';
    }
    if (imgEl) {
      imgEl.src = resolved;
      imgEl.style.display = 'block';
    }
  } else {
    if (imgEl) imgEl.style.display = 'none';
    if (videoEl) {
      videoEl.src = resolved;
      videoEl.style.display = 'block';
      videoEl.load();
    }
  }

  if (nameEl) nameEl.textContent = name || (src.startsWith('blob:') ? 'Локальный файл' : src.split('/').pop());
  if (infoEl) infoEl.textContent = meta || '● Готово';
  if (wrap) wrap.style.display = 'block';
}

async function handleMediaFileInput(val) {
  const trimmed = (val || '').trim();
  if (trimmed) {
    await updateMediaFilePreviewUI(trimmed, trimmed.split('/').pop(), 'Путь к файлу');
  } else {
    await updateMediaFilePreviewUI('');
  }
}

function clearMediaFilePreview() {
  const urlInput = document.getElementById('editMediaUrl');
  const fileInput = document.getElementById('mediaFileInput');
  if (urlInput) urlInput.value = '';
  if (fileInput) fileInput.value = '';
  updateMediaFilePreviewUI('');
}

async function handleMediaFileSelected(e) {
  const file = e.target.files && e.target.files[0];
  if (!file) return;

  const isVideo = file.type.startsWith('video/') || /\.(mp4|webm|mov|m4v)$/i.test(file.name);
  const blobUrl = URL.createObjectURL(file);
  const safeName = file.name.replace(/[^a-zA-Z0-9_\-\.]/g, '_');
  const fallbackPath = isVideo ? `assets/videos/${safeName}` : `assets/media/${safeName}`;

  const input = document.getElementById('editMediaUrl');
  if (input) input.value = fallbackPath;

  if (typeof GTTMediaDB !== 'undefined') {
    await GTTMediaDB.saveBlob(file.name, file);
    await GTTMediaDB.saveBlob(safeName, file);
    await GTTMediaDB.saveBlob(fallbackPath, file);
  }

  const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
  await updateMediaFilePreviewUI(blobUrl, file.name, `${sizeMb} МБ • Готово`);
  showToast('Файл прикреплен', `Медиафайл «${file.name}» (${sizeMb} МБ) готов к сохранению`, 'success');
}

// 5. Gallery Photo Handlers
function triggerGalleryPhotoPicker() {
  const fileInput = document.getElementById('galleryPhotoFileInput');
  if (fileInput) {
    fileInput.value = '';
    fileInput.click();
  }
}

function handleGalleryPhotoSelected(e) {
  const file = e.target.files && e.target.files[0];
  if (file) {
    handleGenericUpload(file, {
      inputId: 'editGalleryImg',
      folder: 'photos',
      isVideo: false,
      successMsg: `Кадр «${file.name}» сохранен в галерее`
    });
  }
}

let isDragDropInitialized = false;
function setupCarPhotoDragDrop() {
  if (isDragDropInitialized) return;
  const dropZone = document.getElementById('carPhotoDropZone');
  const modal = document.getElementById('carEditModal');
  if (!dropZone) return;

  ['dragenter', 'dragover'].forEach(eventName => {
    dropZone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropZone.classList.add('drag-active');
    }, false);
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropZone.classList.remove('drag-active');
    }, false);
  });

  dropZone.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    if (dt && dt.files && dt.files.length > 0) {
      const file = dt.files[0];
      if (file.type.startsWith('video/')) {
        handleCarVideoSelected({ target: { files: [file] } });
      } else {
        handleCarPhotoSelected({ target: { files: [file] } });
      }
    }
  });

  if (modal) {
    modal.addEventListener('dragover', (e) => e.preventDefault(), false);
    modal.addEventListener('drop', (e) => {
      if (e.target && !e.target.closest('#carPhotoDropZone')) {
        const dt = e.dataTransfer;
        if (dt && dt.files && dt.files.length > 0) {
          e.preventDefault();
          const file = dt.files[0];
          if (file.type.startsWith('video/')) {
            handleCarVideoSelected({ target: { files: [file] } });
          } else {
            handleCarPhotoSelected({ target: { files: [file] } });
          }
        }
      }
    }, false);
  }

  isDragDropInitialized = true;
}

function openCarEditModal(carId, targetFeaturedSlot = null) {
  currentTargetFeaturedSlot = (typeof targetFeaturedSlot === 'number') ? targetFeaturedSlot : null;
  const modal = document.getElementById('carEditModal');
  const title = document.getElementById('modalEditorTitle');
  const form = document.getElementById('carEditForm');
  if (!modal) return;
  modal.style.display = 'flex';

  setupCarPhotoDragDrop();

  const slotSuffix = currentTargetFeaturedSlot !== null 
    ? ` [Флагман Слот #${currentTargetFeaturedSlot + 1}]` 
    : '';

  if (carId) {
    const projects = getDB(ADMIN_STORAGE_KEY, defaultProjects);
    const car = projects.find(c => c.id === carId);
    if (!car) return;

    const nameRu = car.nameRu || car.name_ru || (car.name && (car.name.ru || car.name.en)) || '';
    const nameEn = car.nameEn || car.name_en || nameRu;
    const brand = car.brand || autoDetectBrand(nameRu);
    const type = car.type || autoDetectType(nameRu);
    const hp = car.hp || '';
    const quarterMile = car.quarterMile || car.quarter_mile || '';
    const topSpeed = car.topSpeed || car.top_speed || '';
    const img = car.img || '';
    const videoSrc = car.videoSrc || car.video_src || '';
    const descRu = car.descRu || car.desc_ru || '';

    title.textContent = `Редактирование: ${nameRu}${slotSuffix}`;
    document.getElementById('editCarId').value = car.id;
    document.getElementById('editBrand').value = brand;
    document.getElementById('editType').value = type;
    document.getElementById('editNameRu').value = nameRu;
    document.getElementById('editNameEn').value = nameEn;
    const autoEn = autoTranslateRuToEn(nameRu);
    isManualNameEn = Boolean(nameEn && nameEn !== autoEn && nameEn !== nameRu);
    updateNameEnModeUI();
    document.getElementById('editHp').value = hp;
    document.getElementById('editQuarter').value = quarterMile;
    document.getElementById('editTopSpeed').value = topSpeed;
    document.getElementById('editImg').value = img;
    document.getElementById('editVideoSrc').value = videoSrc;
    document.getElementById('editDescRu').value = descRu;

    let currentY = 50;
    const rawPos = car.object_position || car.objectPosition || 'center center';
    const match = rawPos.match(/(\d+)%/);
    if (match) {
      currentY = parseInt(match[1], 10);
    } else if (rawPos.includes('top')) {
      currentY = 15;
    } else if (rawPos.includes('bottom')) {
      currentY = 80;
    } else {
      currentY = 50;
    }
    handleCarPhotoPositionChange(currentY);

    if (img) {
      updateCarPhotoPreviewUI(img, img.split('/').pop(), 'Текущее фото автомобиля');
    } else {
      updateCarPhotoPreviewUI('');
    }

    if (videoSrc) {
      updateCarVideoPreviewUI(videoSrc, videoSrc.split('/').pop(), 'Текущее видео проекта');
    } else {
      updateCarVideoPreviewUI('');
    }
  } else {
    title.textContent = `Добавление нового проекта GTT${slotSuffix}`;
    if (form) form.reset();
    document.getElementById('editCarId').value = '';
    isManualNameEn = false;
    updateNameEnModeUI();
    handleCarPhotoPositionChange(50);
    updateCarPhotoPreviewUI('');
    updateCarVideoPreviewUI('');
  }
}

function closeCarEditModal() {
  currentTargetFeaturedSlot = null;
  const modal = document.getElementById('carEditModal');
  if (modal) modal.style.display = 'none';
  clearCarPhotoPreview();
  clearCarVideoPreview();
}

async function saveCarProject(e) {
  if (e && e.preventDefault) e.preventDefault();
  const idInput = document.getElementById('editCarId').value.trim();
  const projects = getDB(ADMIN_STORAGE_KEY, defaultProjects);

  const rawNameRu = document.getElementById('editNameRu').value.trim();
  if (!rawNameRu) {
    showToast('Укажите название', 'Пожалуйста, введите название автомобиля (например: BMW M5 GTT)', 'warning');
    const inputRu = document.getElementById('editNameRu');
    if (inputRu) {
      inputRu.focus();
      inputRu.style.borderColor = 'var(--gtt-orange)';
    }
    return;
  }

  const rawBrand = document.getElementById('editBrand').value.trim();
  const finalBrand = rawBrand || autoDetectBrand(rawNameRu);

  const rawType = document.getElementById('editType').value;
  const finalType = rawType && rawType !== 'other' ? rawType : autoDetectType(rawNameRu);

  const rawNameEn = document.getElementById('editNameEn').value.trim();
  const finalNameEn = rawNameEn || autoTranslateRuToEn(rawNameRu) || rawNameRu;

  const rawHp = document.getElementById('editHp').value.trim();
  const finalHp = rawHp ? (rawHp.includes('HP') || rawHp.includes('л.с.') ? rawHp : rawHp + ' HP') : '1,050+ HP';

  const rawQuarter = document.getElementById('editQuarter').value.trim();
  const finalQuarter = rawQuarter ? (rawQuarter.includes('сек') ? rawQuarter : rawQuarter + ' сек') : '9.420 сек';

  const rawTopSpeed = document.getElementById('editTopSpeed').value.trim();
  const finalTopSpeed = rawTopSpeed ? (rawTopSpeed.includes('км/ч') ? rawTopSpeed : rawTopSpeed + ' км/ч') : '340+ км/ч';

  const rawImg = convertGoogleDriveUrl(document.getElementById('editImg').value.trim());
  const isVolgaName = rawNameRu.toUpperCase().includes('ВОЛГА') || rawNameRu.toUpperCase().includes('VOLGA') || rawNameRu.toUpperCase().includes('ГАЗ');
  const defaultCarImg = isVolgaName ? 'assets/cars/volga_kgb_v8_sleeper.jpg' : 'assets/cars/gtt_classified_car.svg';
  const finalImg = rawImg || defaultCarImg;

  const finalVideoSrc = document.getElementById('editVideoSrc').value.trim();
  const finalDescRu = document.getElementById('editDescRu').value.trim() || `Спецпроект лаборатории GoshaTurboTech: ${rawNameRu}. Доработка силового агрегата, калибровка Motec/Syvecs и настройка телеметрии.`;
  const finalObjPos = document.getElementById('editObjectPosition')?.value || 'center 50%';

  const carData = {
    id: idInput || ('gtt_car_' + Date.now()),
    brand: finalBrand,
    type: finalType,
    name_ru: rawNameRu,
    nameRu: rawNameRu,
    name_en: finalNameEn,
    nameEn: finalNameEn,
    hp: finalHp,
    quarter_mile: finalQuarter,
    quarterMile: finalQuarter,
    top_speed: finalTopSpeed,
    topSpeed: finalTopSpeed,
    img: finalImg,
    is_photo: 1,
    isPhoto: true,
    object_position: finalObjPos,
    objectPosition: finalObjPos,
    video_src: finalVideoSrc,
    videoSrc: finalVideoSrc,
    desc_ru: finalDescRu,
    descRu: finalDescRu,
    tag_ru: 'RDRC БОЛИД',
    tag_en: 'RDRC CAR',
    badge_ru: 'GTT Spec',
    badge_en: 'GTT Spec'
  };

  // 1. Direct reliable save to SQLite backend FIRST
  try {
    let savedCar = null;
    if (idInput) {
      savedCar = await apiFetch(`/api/cars/${encodeURIComponent(idInput)}`, {
        method: 'PUT',
        body: JSON.stringify(carData)
      });
    } else {
      savedCar = await apiFetch('/api/cars', {
        method: 'POST',
        body: JSON.stringify(carData)
      });
    }
    if (savedCar && savedCar.id) {
      carData.id = savedCar.id;
      if (savedCar.img) carData.img = savedCar.img;
      if (savedCar.object_position) carData.object_position = savedCar.object_position;
      if (savedCar.objectPosition) carData.objectPosition = savedCar.objectPosition;
    }
  } catch (err) {
    if (!isStaticDeployment()) {
      console.error('[GTT API] Car backend save failed:', err);
      showToast('Ошибка сохранения', 'Не удалось сохранить проект в базе: ' + (err.message || err), 'error');
      return;
    }
  }

  // 2. Update local state
  if (idInput) {
    const idx = projects.findIndex(c => c.id === idInput);
    if (idx !== -1) {
      projects[idx] = carData;
      if (currentTargetFeaturedSlot !== null && currentTargetFeaturedSlot >= 0 && currentTargetFeaturedSlot < projects.length && idx !== currentTargetFeaturedSlot) {
        const temp = projects[currentTargetFeaturedSlot];
        projects[currentTargetFeaturedSlot] = projects[idx];
        projects[idx] = temp;
      }
    } else {
      if (currentTargetFeaturedSlot !== null && currentTargetFeaturedSlot >= 0 && currentTargetFeaturedSlot <= projects.length) {
        projects.splice(currentTargetFeaturedSlot, 0, carData);
      } else {
        projects.push(carData);
      }
    }
  } else {
    if (currentTargetFeaturedSlot !== null && currentTargetFeaturedSlot >= 0 && currentTargetFeaturedSlot <= projects.length) {
      projects.splice(currentTargetFeaturedSlot, 0, carData);
    } else {
      projects.push(carData);
    }
  }

  // 3. Persist local storage and broadcast to open tabs of the main site
  saveDB(ADMIN_STORAGE_KEY, projects);
  localStorage.setItem('gtt_projects_v2', JSON.stringify(projects));

  if (window.BroadcastChannel) {
    try {
      new BroadcastChannel('gtt_channel').postMessage({ type: 'projects_updated', projects });
    } catch (e) {}
  }

  renderCarsTable();
  closeCarEditModal();

  showToast(
    idInput ? 'Проект обновлен' : 'Проект добавлен',
    `Болид «${rawNameRu}» успешно сохранен в базе и применен на сайте!`,
    'success'
  );

  recordAuditEvent({
    section: currentTargetFeaturedSlot !== null ? 'Флагманы ТОП-4' : 'Гараж проектов',
    action: idInput ? 'Обновлен болид' : 'Добавлен новый болид',
    item: rawNameRu,
    details: `${finalHp} • ${finalQuarter} • ${finalTopSpeed}`
  });

  syncFeaturedOrderToBackend(projects);
}

async function deleteCarProject(carId) {
  if (!confirm('Вы уверены, что хотите удалить этот проект из базы GTT?')) return;

  // 1. Delete from SQLite backend FIRST
  try {
    await apiFetch(`/api/cars/${encodeURIComponent(carId)}`, { method: 'DELETE' });
  } catch (err) {
    if (!isStaticDeployment()) {
      console.error('[GTT API] Car backend deletion failed:', err);
      showToast('Ошибка удаления', 'Не удалось удалить проект из базы: ' + (err.message || err), 'error');
      return;
    }
  }

  // 2. Update local state
  const projects = getDB(ADMIN_STORAGE_KEY, defaultProjects).filter(c => c.id !== carId);
  saveDB(ADMIN_STORAGE_KEY, projects);
  localStorage.setItem('gtt_projects_v2', JSON.stringify(projects));

  // 3. Broadcast to official site
  if (window.BroadcastChannel) {
    try {
      new BroadcastChannel('gtt_channel').postMessage({ type: 'projects_updated', projects });
    } catch (e) {}
  }

  renderCarsTable();
  showToast('Проект удален', `Болид ${carId} успешно удален из базы данных`, 'info');

  recordAuditEvent({
    section: 'Гараж проектов',
    action: 'Удален болид',
    item: carId,
    details: 'Удален из базы ателье'
  });
}

// ================= MODULE: TRAFFIC & VISITORS TELEMETRY =================
async function renderTrafficModule() {
  const defaultStats = {
    totalViews: 0,
    uniqueVisitors: 0,
    todayViews: 0,
    log: []
  };

  let stats = getDB(TRAFFIC_STORAGE_KEY, defaultStats);

  try {
    const liveTraffic = await apiFetch('/api/traffic');
    if (liveTraffic && typeof liveTraffic.totalViews === 'number') {
      stats = liveTraffic;
      saveDB(TRAFFIC_STORAGE_KEY, stats);
    }
  } catch (e) {
    // Offline / fallback mode
  }

  const totalEl = document.getElementById('statTotalViews');
  const uniqueEl = document.getElementById('statUniqueVisitors');
  const todayEl = document.getElementById('statTodayViews');
  const tbody = document.getElementById('trafficTableBody');

  if (totalEl) totalEl.textContent = (stats.totalViews || 0).toLocaleString('ru-RU');
  if (uniqueEl) uniqueEl.textContent = (stats.uniqueVisitors || 0).toLocaleString('ru-RU');
  if (todayEl) todayEl.textContent = '+' + (stats.todayViews || 0).toLocaleString('ru-RU');

  if (!tbody) return;

  const logList = (stats.log && stats.log.length > 0) ? stats.log : [];

  if (logList.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-dim); padding: 24px;">Визиты не зафиксированы или база была очищена.</td></tr>`;
    return;
  }

  tbody.innerHTML = logList.map(entry => `
    <tr>
      <td style="font-family: var(--font-mono); font-weight: 700; color: #fff;">${entry.time || '—'}</td>
      <td style="color: var(--text-muted); font-size: 13px;">${entry.date || 'Сегодня'}</td>
      <td>
        <span style="display: inline-flex; align-items: center; gap: 6px; font-weight: 600;">
          ${entry.device && entry.device.includes('Mobile') ? '📱' : (entry.device && entry.device.includes('Mac') ? '💻' : '🖥️')}
          ${entry.device || 'Веб-клиент'}
        </span>
      </td>
      <td>
        <span style="color: ${entry.source && entry.source.includes('Telegram') ? 'var(--gtt-orange)' : 'var(--text-muted)'}; font-family: var(--font-mono); font-size: 12.5px;">
          ${entry.source || 'Прямой заход'}
        </span>
      </td>
      <td>
        <code style="background: rgba(255,255,255,0.06); padding: 3px 8px; border-radius: 4px; font-size: 11px;">/${entry.page || 'index.html'}</code>
      </td>
      <td>
        <span style="font-size: 11px; padding: 3px 8px; border-radius: 12px; background: ${entry.is_new_session || entry.isNewSession ? 'rgba(34, 197, 94, 0.15)' : 'rgba(255, 255, 255, 0.08)'}; color: ${entry.is_new_session || entry.isNewSession ? '#22c55e' : 'var(--text-dim)'}; border: 1px solid ${entry.is_new_session || entry.isNewSession ? 'rgba(34, 197, 94, 0.3)' : 'transparent'};">
          ${entry.is_new_session || entry.isNewSession ? 'Новый визит' : 'Возврат'}
        </span>
      </td>
    </tr>
  `).join('');
}

function refreshTrafficAnalytics() {
  renderTrafficModule();
  showToast('Аналитика обновлена', 'Получены свежие данные телеметрии визитов', 'info');
}

async function resetTrafficAnalytics() {
  if (!confirm('Сбросить накопленную статистику просмотров и визитов?')) return;
  try {
    await apiFetch('/api/traffic/reset', { method: 'POST' });
  } catch (e) {}

  const resetStats = {
    totalViews: 0,
    uniqueVisitors: 0,
    todayViews: 0,
    log: []
  };
  saveDB(TRAFFIC_STORAGE_KEY, resetStats);
  renderTrafficModule();
  showToast('Аналитика очищена', 'Счетчики просмотров и лог визитов успешно сброшены', 'info');
}

// ================= MODULE 2: GALLERY (ЖИВЫЕ КАДРЫ) =================
function renderGalleryTable() {
  const gallery = getDB(GALLERY_STORAGE_KEY, defaultGallery);
  const tbody = document.getElementById('galleryTableBody');
  if (!tbody) return;

  tbody.innerHTML = gallery.map(item => {
    const id = escapeJS(item.id);
    const title = escapeHTML(item.title);
    const tag = escapeHTML(item.tag);
    const img = escapeHTML(item.img);
    return `
    <tr>
      <td>
        <img src="${img}" alt="${title}" class="car-thumb" onerror="this.src='assets/photos/huracan_zelenka_gtt.jpg'">
      </td>
      <td><span class="tag-pill" style="color: var(--gtt-orange);">${tag}</span></td>
      <td style="font-weight: 600; color: #fff;">${title}</td>
      <td style="font-family: var(--font-mono); font-size: 11px; color: var(--text-dim); max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
        ${img}
      </td>
      <td>
        <div class="row-actions">
          <button class="table-btn" onclick="openGalleryPhotoModal('${id}')">Изменить</button>
          <button class="table-btn delete" onclick="deleteGalleryPhoto('${id}')">Удалить</button>
        </div>
      </td>
    </tr>
  `;
  }).join('');
}

function openGalleryPhotoModal(id) {
  const modal = document.getElementById('galleryPhotoModal');
  const title = document.getElementById('galleryModalTitle');
  const form = document.getElementById('galleryPhotoForm');
  modal.style.display = 'flex';

  if (id) {
    const gallery = getDB(GALLERY_STORAGE_KEY, defaultGallery);
    const item = gallery.find(g => g.id === id);
    if (!item) return;
    title.textContent = `Редактирование кадра: ${item.title}`;
    document.getElementById('editGalleryId').value = item.id;
    document.getElementById('editGalleryTitle').value = item.title;
    document.getElementById('editGalleryTag').value = item.tag;
    document.getElementById('editGalleryImg').value = item.img;
  } else {
    title.textContent = 'Добавить новый кадр в галерею';
    form.reset();
    document.getElementById('editGalleryId').value = '';
  }
}

function closeGalleryPhotoModal() {
  document.getElementById('galleryPhotoModal').style.display = 'none';
}

async function saveGalleryPhoto(e) {
  if (e && e.preventDefault) e.preventDefault();
  const idInput = document.getElementById('editGalleryId').value;
  const gallery = getDB(GALLERY_STORAGE_KEY, defaultGallery);

  const rawTitle = document.getElementById('editGalleryTitle').value.trim();
  if (!rawTitle) {
    showToast('Укажите название', 'Введите заголовок или описание кадра', 'warning');
    document.getElementById('editGalleryTitle')?.focus();
    return;
  }

  const photoData = {
    id: idInput || ('gal_' + Date.now()),
    title: rawTitle,
    tag: document.getElementById('editGalleryTag').value.trim() || 'RDRC',
    img: document.getElementById('editGalleryImg').value.trim() || 'assets/photos/huracan_zelenka_gtt.jpg'
  };

  // 1. Direct reliable save to SQLite backend FIRST
  try {
    if (idInput) {
      await apiFetch(`/api/gallery/${encodeURIComponent(idInput)}`, {
        method: 'PUT',
        body: JSON.stringify(photoData)
      });
    } else {
      const res = await apiFetch('/api/gallery', {
        method: 'POST',
        body: JSON.stringify(photoData)
      });
      if (res && res.id) photoData.id = res.id;
    }
  } catch (err) {
    if (!isStaticDeployment()) {
      console.error('[GTT API] Gallery save failed:', err);
      showToast('Ошибка сохранения', 'Не удалось сохранить кадр в базе: ' + (err.message || err), 'error');
      return;
    }
  }

  // 2. Update local state
  if (idInput) {
    const idx = gallery.findIndex(g => g.id === idInput);
    if (idx !== -1) gallery[idx] = photoData;
    else gallery.push(photoData);
  } else {
    gallery.push(photoData);
  }

  saveDB(GALLERY_STORAGE_KEY, gallery);

  // 3. Broadcast to official site
  if (window.BroadcastChannel) {
    try {
      new BroadcastChannel('gtt_channel').postMessage({ type: 'gallery_updated', gallery });
    } catch (e) {}
  }

  renderGalleryTable();
  closeGalleryPhotoModal();

  showToast(
    idInput ? 'Кадр обновлен' : 'Кадр добавлен',
    `Фотография «${photoData.title}» сохранена в базе и применилась на сайте!`,
    'success'
  );

  recordAuditEvent({
    section: 'Живая галерея',
    action: idInput ? 'Обновлен кадр' : 'Добавлен новый кадр',
    item: photoData.title || photoData.tag,
    details: photoData.tag ? `Тег: ${photoData.tag}` : ''
  });
}

async function deleteGalleryPhoto(id) {
  if (!confirm('Удалить кадр из живой галереи?')) return;

  // 1. Delete from SQLite backend FIRST
  try {
    await apiFetch(`/api/gallery/${encodeURIComponent(id)}`, { method: 'DELETE' });
  } catch (err) {
    if (!isStaticDeployment()) {
      console.error('[GTT API] Gallery delete failed:', err);
      showToast('Ошибка удаления', 'Не удалось удалить кадр из базы: ' + (err.message || err), 'error');
      return;
    }
  }

  // 2. Update local state
  const gallery = getDB(GALLERY_STORAGE_KEY, defaultGallery).filter(g => g.id !== id);
  saveDB(GALLERY_STORAGE_KEY, gallery);

  // 3. Broadcast to official site
  if (window.BroadcastChannel) {
    try {
      new BroadcastChannel('gtt_channel').postMessage({ type: 'gallery_updated', gallery });
    } catch (e) {}
  }

  renderGalleryTable();
  showToast('Кадр удален', 'Фотография удалена из живой галереи и базы данных', 'info');

  recordAuditEvent({
    section: 'Живая галерея',
    action: 'Удален кадр',
    item: id,
    details: 'Удален из галереи трека'
  });
}


// ================= MODULE 3: TEAM =================
let selectedInspectorMemberId = null;

function selectTeamMemberForInspection(id) {
  const team = getDB(TEAM_STORAGE_KEY, defaultTeam);
  const m = team.find(item => item.id === id) || team[0];
  if (!m) return;
  selectedInspectorMemberId = m.id;

  const img = document.getElementById('inspectorMemberImg');
  const nameEl = document.getElementById('inspectorMemberName');
  const roleEl = document.getElementById('inspectorMemberRole');
  const statusEl = document.getElementById('inspectorMemberStatus');
  const badgeEl = document.getElementById('inspectorMemberBadge');
  const editBtn = document.getElementById('inspectorEditBtn');

  const photo = m.photo || defaultTeamPhotos[m.id] || 'assets/photos/team_pilot_paddock.jpg';
  if (img) img.src = photo;
  if (nameEl) nameEl.textContent = m.name;
  if (roleEl) roleEl.textContent = m.role;

  const statusMap = {
    active: '● В основном составе RDRC',
    atelier: '🔧 В лаборатории GTT',
    paddock: '🏁 На выездном этапе паддока'
  };
  if (statusEl) statusEl.textContent = statusMap[m.status] || m.status;
  if (badgeEl) badgeEl.textContent = m.status === 'active' ? 'RDRC Core' : (m.status === 'atelier' ? 'Lab Spec' : 'Paddock');
  if (editBtn) editBtn.setAttribute('onclick', `openTeamMemberModal('${escapeJS(m.id)}')`);

  // Highlight selected table row
  document.querySelectorAll('#teamTableBody tr').forEach(tr => {
    tr.classList.remove('active-inspector-row');
    if (tr.getAttribute('data-team-id') === m.id) {
      tr.classList.add('active-inspector-row');
    }
  });
}

function renderTeamTable() {
  const team = getDB(TEAM_STORAGE_KEY, defaultTeam);
  const tbody = document.getElementById('teamTableBody');
  if (!tbody) return;

  const statusMap = {
    active: '<span style="color: #22c55e;">● Основной состав RDRC</span>',
    atelier: '<span style="color: #38bdf8;">🔧 Лаборатория GTT</span>',
    paddock: '<span style="color: #f59e0b;">🏁 Паддок RDRC</span>'
  };

  tbody.innerHTML = team.map((m, idx) => {
    const photoUrl = escapeHTML(m.photo || defaultTeamPhotos[m.id] || 'assets/photos/team_pilot_paddock.jpg');
    const name = escapeHTML(m.name);
    const role = escapeHTML(m.role);
    const id = escapeJS(m.id);
    const statusHtml = statusMap[m.status] || escapeHTML(m.status);
    return `
    <tr data-team-id="${id}" onclick="selectTeamMemberForInspection('${id}')" style="cursor: pointer;" title="Кликните для просмотра фото и профиля справа">
      <td style="color: var(--text-dim); font-family: var(--font-mono);">${idx + 1}</td>
      <td>
        <img src="${photoUrl}" alt="${name}" class="team-member-thumb" style="width: 44px; height: 44px; border-radius: 6px; object-fit: cover; border: 1px solid rgba(255,255,255,0.15); display: block;" onerror="this.src='assets/photos/team_pilot_paddock.jpg'">
      </td>
      <td style="font-weight: 700; color: #fff;">${name}</td>
      <td>${role}</td>
      <td>${statusHtml}</td>
      <td>
        <div class="row-actions" onclick="event.stopPropagation()">
          <button class="table-btn" onclick="openTeamMemberModal('${id}')">Изменить</button>
          <button class="table-btn delete" onclick="deleteTeamMember('${id}')">Удалить</button>
        </div>
      </td>
    </tr>
    `;
  }).join('');

  if (team.length > 0) {
    selectTeamMemberForInspection(selectedInspectorMemberId || team[0].id);
  }
}

function openTeamMemberModal(id) {
  const modal = document.getElementById('teamModal');
  const title = document.getElementById('teamModalTitle');
  const form = document.getElementById('teamEditForm');
  if (!modal) return;
  modal.style.display = 'flex';

  if (id) {
    const team = getDB(TEAM_STORAGE_KEY, defaultTeam);
    const m = team.find(item => item.id === id);
    if (!m) return;
    title.textContent = `Редактирование: ${m.name}`;
    document.getElementById('editMemberId').value = m.id;
    document.getElementById('editMemberName').value = m.name;
    document.getElementById('editMemberRole').value = m.role;
    document.getElementById('editMemberStatus').value = m.status;
    const photo = m.photo || defaultTeamPhotos[m.id] || '';
    if (document.getElementById('editMemberPhoto')) {
      document.getElementById('editMemberPhoto').value = photo;
      handleTeamPhotoInput(photo);
    }
  } else {
    title.textContent = 'Добавить специалиста в команду';
    if (form) form.reset();
    document.getElementById('editMemberId').value = '';
    clearTeamPhotoPreview();
  }
  updateTeamLiveCardPreview();
}

function closeTeamModal() {
  const modal = document.getElementById('teamModal');
  if (modal) modal.style.display = 'none';
  clearTeamPhotoPreview();
}

async function saveTeamMember(e) {
  if (e && e.preventDefault) e.preventDefault();
  const idInput = document.getElementById('editMemberId').value;
  const team = getDB(TEAM_STORAGE_KEY, defaultTeam);

  const rawName = document.getElementById('editMemberName').value.trim();
  if (!rawName) {
    showToast('Укажите имя', 'Введите имя специалиста команды GTT', 'warning');
    document.getElementById('editMemberName')?.focus();
    return;
  }

  const existingMember = idInput ? team.find(m => m.id === idInput) : null;
  const photoVal = document.getElementById('editMemberPhoto')?.value.trim() || (existingMember ? existingMember.photo : '') || (idInput ? defaultTeamPhotos[idInput] : '');

  const memberData = {
    id: idInput || ('team_' + Date.now()),
    name: rawName,
    role: document.getElementById('editMemberRole').value.trim() || 'Инженер GTT Atelier',
    status: document.getElementById('editMemberStatus').value || 'active',
    photo: photoVal || undefined,
    social: existingMember ? existingMember.social : undefined
  };

  // 1. Direct reliable save to SQLite backend FIRST
  try {
    if (idInput) {
      await apiFetch(`/api/team/${encodeURIComponent(idInput)}`, {
        method: 'PUT',
        body: JSON.stringify(memberData)
      });
    } else {
      const res = await apiFetch('/api/team', {
        method: 'POST',
        body: JSON.stringify(memberData)
      });
      if (res && res.id) memberData.id = res.id;
    }
  } catch (err) {
    if (!isStaticDeployment()) {
      console.error('[GTT API] Team backend save failed:', err);
      showToast('Ошибка сохранения', 'Не удалось сохранить специалиста в базе: ' + (err.message || err), 'error');
      return;
    }
  }

  // 2. Update local state
  if (idInput) {
    const idx = team.findIndex(m => m.id === idInput);
    if (idx !== -1) team[idx] = Object.assign({}, existingMember, memberData);
    else team.push(memberData);
  } else {
    team.push(memberData);
  }

  saveDB(TEAM_STORAGE_KEY, team);
  localStorage.setItem('gtt_team_v2', JSON.stringify(team));

  // 3. Broadcast to all open tabs of the site
  if (window.BroadcastChannel) {
    try {
      new BroadcastChannel('gtt_channel').postMessage({ type: 'team_updated', team });
    } catch (e) {}
  }

  renderTeamTable();
  selectTeamMemberForInspection(memberData.id);
  closeTeamModal();

  showToast(
    idInput ? 'Сотрудник обновлен' : 'Сотрудник добавлен',
    `Специалист «${memberData.name}» успешно сохранен в базе и применен на сайте!`,
    'success'
  );

  recordAuditEvent({
    section: 'Команда GTT',
    action: idInput ? 'Обновлен специалист' : 'Добавлен специалист',
    item: memberData.name,
    details: `${memberData.role}`
  });
}

async function deleteTeamMember(id) {
  if (!confirm('Удалить сотрудника из списка команды?')) return;

  // 1. Delete from SQLite backend FIRST
  try {
    await apiFetch(`/api/team/${encodeURIComponent(id)}`, { method: 'DELETE' });
  } catch (err) {
    if (!isStaticDeployment()) {
      console.error('[GTT API] Team backend deletion failed:', err);
      showToast('Ошибка удаления', 'Не удалось удалить специалиста из базы: ' + (err.message || err), 'error');
      return;
    }
  }

  // 2. Update local state
  const team = getDB(TEAM_STORAGE_KEY, defaultTeam).filter(m => m.id !== id);
  saveDB(TEAM_STORAGE_KEY, team);
  localStorage.setItem('gtt_team_v2', JSON.stringify(team));

  // 3. Broadcast to site
  if (window.BroadcastChannel) {
    try {
      new BroadcastChannel('gtt_channel').postMessage({ type: 'team_updated', team });
    } catch (e) {}
  }

  renderTeamTable();
  showToast('Сотрудник удален', 'Специалист исключен из базы данных ателье', 'info');

  recordAuditEvent({
    section: 'Команда GTT',
    action: 'Удален специалист',
    item: id,
    details: 'Исключен из состава команды'
  });
}

// ================= MODULE 3: RECORDS =================
function renderRecordsTable() {
  const records = getDB(RECORDS_STORAGE_KEY, defaultRecords);
  const tbody = document.getElementById('recordsTableBody');
  if (!tbody) return;

  tbody.innerHTML = records.map(rec => {
    const id = escapeJS(rec.id);
    const year = escapeHTML(rec.year);
    const car = escapeHTML(rec.car);
    const telemetry = escapeHTML(rec.telemetry);
    const desc = escapeHTML(rec.desc);
    return `
    <tr>
      <td><span class="tag-pill" style="color: var(--gtt-orange);">${year}</span></td>
      <td style="font-weight: 700; color: #fff;">${car}</td>
      <td style="font-family: var(--font-mono);">${telemetry}</td>
      <td style="color: var(--text-muted); font-size: 11.5px;">${desc}</td>
      <td>
        <div class="row-actions">
          <button class="table-btn" onclick="openRecordEditModal('${id}')">Изменить</button>
          <button class="table-btn delete" onclick="deleteRecord('${id}')">Удалить</button>
        </div>
      </td>
    </tr>
  `;
  }).join('');
}

function openRecordEditModal(id) {
  const modal = document.getElementById('recordModal');
  const title = document.getElementById('recordModalTitle');
  const form = document.getElementById('recordEditForm');
  if (!modal) return;
  modal.style.display = 'flex';

  if (id) {
    const records = getDB(RECORDS_STORAGE_KEY, defaultRecords);
    const rec = records.find(r => r.id === id);
    if (!rec) return;
    title.textContent = `Редактирование рекорда: ${rec.car}`;
    document.getElementById('editRecordId').value = rec.id;
    document.getElementById('editRecordYear').value = rec.year;
    document.getElementById('editRecordCar').value = rec.car;
    document.getElementById('editRecordTelemetry').value = rec.telemetry;
    document.getElementById('editRecordDesc').value = rec.desc;
    const imgVal = rec.img || '';
    if (document.getElementById('editRecordImg')) {
      document.getElementById('editRecordImg').value = imgVal;
      handleRecordPhotoInput(imgVal);
    }
  } else {
    title.textContent = 'Внести новый рекорд в зал славы';
    if (form) form.reset();
    document.getElementById('editRecordId').value = '';
    clearRecordPhotoPreview();
  }
}

function closeRecordModal() {
  const modal = document.getElementById('recordModal');
  if (modal) modal.style.display = 'none';
  clearRecordPhotoPreview();
}

async function saveRecord(e) {
  if (e && e.preventDefault) e.preventDefault();
  const idInput = document.getElementById('editRecordId').value;
  const records = getDB(RECORDS_STORAGE_KEY, defaultRecords);

  const rawCar = document.getElementById('editRecordCar').value.trim();
  if (!rawCar) {
    showToast('Укажите болид', 'Введите название автомобиля или болида рекорда', 'warning');
    document.getElementById('editRecordCar')?.focus();
    return;
  }

  const recData = {
    id: idInput || ('rec_' + Date.now()),
    year: document.getElementById('editRecordYear').value.trim() || '2024 • Рекорд GTT',
    car: rawCar,
    telemetry: document.getElementById('editRecordTelemetry').value.trim() || '—',
    desc: document.getElementById('editRecordDesc').value.trim() || 'Официально зафиксированный заезд GoshaTurboTech в RDRC.',
    img: document.getElementById('editRecordImg')?.value.trim() || ''
  };

  // 1. Direct reliable save to SQLite backend FIRST
  try {
    if (idInput) {
      await apiFetch(`/api/records/${encodeURIComponent(idInput)}`, {
        method: 'PUT',
        body: JSON.stringify(recData)
      });
    } else {
      const res = await apiFetch('/api/records', {
        method: 'POST',
        body: JSON.stringify(recData)
      });
      if (res && res.id) recData.id = res.id;
    }
  } catch (err) {
    if (!isStaticDeployment()) {
      console.error('[GTT API] Record backend save failed:', err);
      showToast('Ошибка сохранения', 'Не удалось сохранить рекорд в базе: ' + (err.message || err), 'error');
      return;
    }
  }

  // 2. Update local state
  if (idInput) {
    const idx = records.findIndex(r => r.id === idInput);
    if (idx !== -1) records[idx] = recData;
    else records.push(recData);
  } else {
    records.push(recData);
  }

  saveDB(RECORDS_STORAGE_KEY, records);
  localStorage.setItem('gtt_records_v2', JSON.stringify(records));

  // 3. Broadcast to official site in real time
  if (window.BroadcastChannel) {
    try {
      new BroadcastChannel('gtt_channel').postMessage({ type: 'records_updated', records });
    } catch (e) {}
  }

  renderRecordsTable();
  closeRecordModal();

  showToast(
    idInput ? 'Рекорд обновлен' : 'Рекорд внесен',
    `Запись «${recData.car}» сохранена в базе и применилась на сайте!`,
    'success'
  );

  recordAuditEvent({
    section: 'Доска рекордов',
    action: idInput ? 'Обновлен рекорд' : 'Внесен новый рекорд',
    item: recData.car,
    details: `${recData.year} • ${recData.telemetry}`
  });
}

async function deleteRecord(id) {
  if (!confirm('Удалить рекорд из зала славы?')) return;

  // 1. Delete from SQLite backend FIRST
  try {
    await apiFetch(`/api/records/${encodeURIComponent(id)}`, { method: 'DELETE' });
  } catch (err) {
    if (!isStaticDeployment()) {
      console.error('[GTT API] Record backend deletion failed:', err);
      showToast('Ошибка удаления', 'Не удалось удалить рекорд из базы: ' + (err.message || err), 'error');
      return;
    }
  }

  // 2. Update local state
  const records = getDB(RECORDS_STORAGE_KEY, defaultRecords).filter(r => r.id !== id);
  saveDB(RECORDS_STORAGE_KEY, records);
  localStorage.setItem('gtt_records_v2', JSON.stringify(records));

  // 3. Broadcast to official site in real time
  if (window.BroadcastChannel) {
    try {
      new BroadcastChannel('gtt_channel').postMessage({ type: 'records_updated', records });
    } catch (e) {}
  }

  renderRecordsTable();
  showToast('Рекорд удален', 'Запись рекорда удалена из Зала славы и базы данных', 'info');

  recordAuditEvent({
    section: 'Доска рекордов',
    action: 'Удален рекорд',
    item: id,
    details: 'Запись удалена из Зала славы'
  });
}

// ================= MODULE 4: MEDIA =================
function renderMediaTable() {
  const media = getDB(MEDIA_STORAGE_KEY, defaultMedia);
  const tbody = document.getElementById('mediaTableBody');
  if (!tbody) return;

  tbody.innerHTML = media.map(item => {
    const id = escapeJS(item.id);
    const title = escapeHTML(item.title);
    const type = escapeHTML((item.type || '').toUpperCase());
    const url = escapeHTML(item.url);
    const car = escapeHTML(item.car);
    return `
    <tr>
      <td style="font-weight: 600; color: #fff;">${title}</td>
      <td><span class="tag-pill">${type}</span></td>
      <td style="font-family: var(--font-mono); font-size: 11px; color: var(--text-dim); max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
        ${url}
      </td>
      <td><span class="tag-pill" style="color: var(--gtt-orange);">${car}</span></td>
      <td>
        <div class="row-actions">
          <button class="table-btn" onclick="openMediaEditModal('${id}')">Изменить</button>
          <button class="table-btn delete" onclick="deleteMediaItem('${id}')">Удалить</button>
        </div>
      </td>
    </tr>
  `;
  }).join('');
}

function openMediaEditModal(id) {
  const modal = document.getElementById('mediaModal');
  const title = document.getElementById('mediaModalTitle');
  const form = document.getElementById('mediaEditForm');
  modal.style.display = 'flex';

  if (id) {
    const media = getDB(MEDIA_STORAGE_KEY, defaultMedia);
    const item = media.find(m => m.id === id);
    if (!item) return;
    title.textContent = `Редактирование: ${item.title}`;
    document.getElementById('editMediaId').value = item.id;
    document.getElementById('editMediaTitle').value = item.title;
    document.getElementById('editMediaType').value = item.type;
    document.getElementById('editMediaCar').value = item.car;
    document.getElementById('editMediaUrl').value = item.url;
    if (item.url) {
      updateMediaFilePreviewUI(item.url, item.url.split('/').pop(), 'Текущий файл');
    } else {
      updateMediaFilePreviewUI('');
    }
  } else {
    title.textContent = 'Добавить видеоматериал / Reels';
    form.reset();
    document.getElementById('editMediaId').value = '';
    updateMediaFilePreviewUI('');
  }
}

function closeMediaModal() {
  document.getElementById('mediaModal').style.display = 'none';
  clearMediaFilePreview();
}

async function saveMediaItem(e) {
  if (e && e.preventDefault) e.preventDefault();
  const idInput = document.getElementById('editMediaId').value;
  const media = getDB(MEDIA_STORAGE_KEY, defaultMedia);

  const rawTitle = document.getElementById('editMediaTitle').value.trim();
  if (!rawTitle) {
    showToast('Укажите название', 'Введите название ролика или Reels', 'warning');
    document.getElementById('editMediaTitle')?.focus();
    return;
  }

  const rawUrl = document.getElementById('editMediaUrl').value.trim();
  const mediaData = {
    id: idInput || ('med_' + Date.now()),
    title: rawTitle,
    type: document.getElementById('editMediaType').value || 'mp4',
    car: document.getElementById('editMediaCar').value.trim() || 'GTT Atelier Supercar',
    url: rawUrl || 'assets/videos/hero_burnout_action.mp4'
  };

  // 1. Direct reliable save to SQLite backend FIRST
  try {
    if (idInput) {
      await apiFetch(`/api/media/${encodeURIComponent(idInput)}`, {
        method: 'PUT',
        body: JSON.stringify(mediaData)
      });
    } else {
      const res = await apiFetch('/api/media', {
        method: 'POST',
        body: JSON.stringify(mediaData)
      });
      if (res && res.id) mediaData.id = res.id;
    }
  } catch (err) {
    if (!isStaticDeployment()) {
      console.error('[GTT API] Media save failed:', err);
      showToast('Ошибка сохранения', 'Не удалось сохранить видео в базе: ' + (err.message || err), 'error');
      return;
    }
  }

  // 2. Update local state
  if (idInput) {
    const idx = media.findIndex(m => m.id === idInput);
    if (idx !== -1) media[idx] = mediaData;
    else media.push(mediaData);
  } else {
    media.push(mediaData);
  }

  saveDB(MEDIA_STORAGE_KEY, media);

  // 3. Broadcast to official site
  if (window.BroadcastChannel) {
    try {
      new BroadcastChannel('gtt_channel').postMessage({ type: 'media_updated', media });
    } catch (e) {}
  }

  renderMediaTable();
  closeMediaModal();

  showToast(
    idInput ? 'Медиа обновлено' : 'Медиа добавлено',
    `Видео «${mediaData.title}» сохранено в базе и применилось на сайте!`,
    'success'
  );

  recordAuditEvent({
    section: 'Медиатека / Reels',
    action: idInput ? 'Обновлено видео' : 'Добавлено видео',
    item: mediaData.title,
    details: `${mediaData.type.toUpperCase()} • ${mediaData.car}`
  });
}

async function deleteMediaItem(id) {
  if (!confirm('Удалить видео из медиатеки?')) return;

  // 1. Delete from SQLite backend FIRST
  try {
    await apiFetch(`/api/media/${encodeURIComponent(id)}`, { method: 'DELETE' });
  } catch (err) {
    if (!isStaticDeployment()) {
      console.error('[GTT API] Media delete failed:', err);
      showToast('Ошибка удаления', 'Не удалось удалить видео из базы: ' + (err.message || err), 'error');
      return;
    }
  }

  // 2. Update local state
  const media = getDB(MEDIA_STORAGE_KEY, defaultMedia).filter(m => m.id !== id);
  saveDB(MEDIA_STORAGE_KEY, media);

  // 3. Broadcast to official site
  if (window.BroadcastChannel) {
    try {
      new BroadcastChannel('gtt_channel').postMessage({ type: 'media_updated', media });
    } catch (e) {}
  }

  renderMediaTable();
  showToast('Видео удалено', 'Медиаматериал удален из базы данных', 'info');

  recordAuditEvent({
    section: 'Медиатека / Reels',
    action: 'Удалено видео',
    item: id,
    details: 'Удалено из медиатеки'
  });
}

// ==========================================================================
// NOTIFICATION BELL & LIVE AUDIT TRAIL SYSTEM
// ==========================================================================
const AUDIT_STORAGE_KEY = 'gtt_admin_audit_log';

function getAuditLogs() {
  try {
    const raw = localStorage.getItem(AUDIT_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveAuditLogs(logs) {
  try {
    localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(logs.slice(0, 50)));
  } catch (e) {}
}

let currentAuditFilter = 'all';

function getEventCategory(action) {
  const act = (action || '').toLowerCase();
  if (act.includes('удал') || act.includes('исключ')) return 'removed';
  if (act.includes('добав') || act.includes('внесен')) return 'added';
  if (act.includes('топ-4') || act.includes('слот') || act.includes('позиц')) return 'featured';
  return 'updated';
}

function filterAuditNotifications(filter, btn) {
  currentAuditFilter = filter || 'all';
  document.querySelectorAll('.notif-filter-chip').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderNotificationsDropdown(currentAuditFilter);
}

function recordAuditEvent({ section, action, item, details }) {
  const author = localStorage.getItem(USER_NAME_KEY) || 'gosha';
  const now = new Date();
  const timeStr = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const dateStr = now.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' });

  const eventData = {
    id: 'audit_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
    section: section || 'Система',
    action: action || 'Изменение',
    item: item || '',
    details: details || '',
    author: author,
    time: timeStr,
    date: dateStr,
    timestamp: Date.now()
  };

  const logs = getAuditLogs();
  logs.unshift(eventData);
  saveAuditLogs(logs);

  updateAdminBellUI();
  // Duplicate popup card eliminated: only the single primary toast is shown on screen

  // Broadcast to other open tabs / windows in real time
  if (window.BroadcastChannel) {
    try {
      const ch = new BroadcastChannel('gtt_channel');
      ch.postMessage({ type: 'audit_event', eventData });
    } catch (e) {}
  }
}

function updateAdminBellUI() {
  const badge = document.getElementById('adminBellBadge');
  const totalBadge = document.getElementById('adminNotifTotalBadge');
  const logs = getAuditLogs();
  if (badge) {
    if (logs.length > 0) {
      badge.textContent = logs.length > 99 ? '99+' : logs.length;
      badge.style.display = 'inline-flex';
    } else {
      badge.style.display = 'none';
    }
  }
  if (totalBadge) {
    totalBadge.textContent = logs.length;
  }
}

function toggleAdminNotifications(e) {
  if (e && e.stopPropagation) e.stopPropagation();
  const dropdown = document.getElementById('adminNotificationsDropdown');
  if (!dropdown) return;
  const isHidden = dropdown.style.display === 'none' || !dropdown.style.display;
  dropdown.style.display = isHidden ? 'block' : 'none';
  if (isHidden) {
    renderNotificationsDropdown(currentAuditFilter);
  }
}

function clearAdminNotifications() {
  localStorage.removeItem(AUDIT_STORAGE_KEY);
  updateAdminBellUI();
  const list = document.getElementById('adminNotifList');
  if (list) {
    list.innerHTML = `
      <div class="admin-notif-empty">
        <div style="font-size: 24px; margin-bottom: 6px;">📋</div>
        <div>Журнал очищен. Новые действия будут отображаться здесь.</div>
      </div>
    `;
  }
  showToast('Журнал очищен', 'История действий ателье успешно сброшена', 'info');
}

function renderNotificationsDropdown(filter = 'all') {
  const list = document.getElementById('adminNotifList');
  if (!list) return;
  let logs = getAuditLogs();

  if (filter && filter !== 'all') {
    logs = logs.filter(log => getEventCategory(log.action) === filter);
  }

  updateAdminBellUI();

  if (logs.length === 0) {
    const emptyLabels = {
      all: 'Журнал пуст. Все изменения проектов, рекордов и команды фиксируются здесь в реальном времени.',
      removed: 'В журнале нет удаленных объектов.',
      added: 'В журнале нет недавно добавленных объектов.',
      updated: 'В журнале нет измененных объектов.',
      featured: 'Порядок слотов ТОП-4 болидов не изменялся.'
    };
    list.innerHTML = `
      <div class="admin-notif-empty">
        <div style="font-size: 26px; margin-bottom: 8px;">📋</div>
        <div>${emptyLabels[filter] || emptyLabels.all}</div>
      </div>
    `;
    return;
  }

  const tagConfig = {
    removed: { cls: 'tag-removed', label: 'УБРАНО ИЗ БАЗЫ', icon: '🗑️' },
    added: { cls: 'tag-added', label: 'ДОБАВЛЕНО В БАЗУ', icon: '✨' },
    featured: { cls: 'tag-featured', label: 'ТОП-4 ФЛАГМАНЫ', icon: '⚡' },
    updated: { cls: 'tag-updated', label: 'ОСТАВЛЕНО / ИЗМЕНЕНО', icon: '✏️' }
  };

  list.innerHTML = logs.map(log => {
    const cat = getEventCategory(log.action);
    const tagInfo = tagConfig[cat] || tagConfig.updated;
    const section = escapeHTML(log.section);
    const action = escapeHTML(log.action);
    const time = escapeHTML(log.time);
    const date = escapeHTML(log.date || '');
    const item = escapeHTML(log.item);
    const details = log.details ? escapeHTML(log.details) : '';
    const author = escapeHTML(log.author);

    return `
    <div class="admin-notif-item item-cat-${cat}">
      <div class="admin-notif-topbar">
        <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
          <span class="admin-notif-action-tag ${tagInfo.cls}">${tagInfo.icon} ${tagInfo.label}</span>
          <span class="admin-notif-sec-pill">[${section}]</span>
        </div>
        <span class="admin-notif-time">${date ? date + ' ' : ''}${time}</span>
      </div>
      <div class="admin-notif-text">
        <div class="admin-notif-item-title">${item}</div>
        ${details ? `<div class="admin-notif-item-sub">${details}</div>` : ''}
      </div>
      <div class="admin-notif-footer">
        <span class="admin-notif-act-desc">${action}</span>
        <span class="admin-notif-author">👤 ${author}</span>
      </div>
    </div>
    `;
  }).join('');
}

// Deprecated: No more secondary duplicate popup card on screen
function showRightLiveNotification() {
  // Intentional no-op to eliminate redundant screen popups
}

// Close notifications dropdown when clicking outside
document.addEventListener('click', (e) => {
  const wrap = document.getElementById('adminBellWrap');
  const dropdown = document.getElementById('adminNotificationsDropdown');
  if (dropdown && dropdown.style.display !== 'none' && wrap && !wrap.contains(e.target)) {
    dropdown.style.display = 'none';
  }
});

// Global Exports
function exportDataJSON() {
  const exportBundle = {
    cars: getDB(ADMIN_STORAGE_KEY, defaultProjects),
    team: getDB(TEAM_STORAGE_KEY, defaultTeam),
    records: getDB(RECORDS_STORAGE_KEY, defaultRecords),
    media: getDB(MEDIA_STORAGE_KEY, defaultMedia),
    exportedAt: new Date().toISOString()
  };

  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportBundle, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `gtt_full_atelier_hub_${Date.now()}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();

  showToast('Экспорт базы', 'Резервная копия базы данных скачана в формате JSON', 'success');
}

window.handleAdminLogin = handleAdminLogin;
window.handleAdminLogout = handleAdminLogout;
window.switchAdminTab = switchAdminTab;

window.openCarEditModal = openCarEditModal;
window.closeCarEditModal = closeCarEditModal;
window.saveCarProject = saveCarProject;
window.deleteCarProject = deleteCarProject;

window.openGalleryPhotoModal = openGalleryPhotoModal;
window.closeGalleryPhotoModal = closeGalleryPhotoModal;
window.saveGalleryPhoto = saveGalleryPhoto;
window.deleteGalleryPhoto = deleteGalleryPhoto;

window.openTeamMemberModal = openTeamMemberModal;
window.closeTeamModal = closeTeamModal;
window.saveTeamMember = saveTeamMember;
window.deleteTeamMember = deleteTeamMember;

window.openRecordEditModal = openRecordEditModal;
window.closeRecordModal = closeRecordModal;
window.saveRecord = saveRecord;
window.deleteRecord = deleteRecord;

window.openMediaEditModal = openMediaEditModal;
window.closeMediaModal = closeMediaModal;
window.saveMediaItem = saveMediaItem;
window.deleteMediaItem = deleteMediaItem;

window.refreshTrafficAnalytics = refreshTrafficAnalytics;
window.resetTrafficAnalytics = resetTrafficAnalytics;

window.exportDataJSON = exportDataJSON;

// ================= MODULE 5: SETTINGS & SECURITY =================
async function populateSettingsInputs() {
  const urlDisplay = document.getElementById('secretUrlDisplay');
  if (urlDisplay) {
    const origin = window.location.origin;
    const path = window.location.pathname.replace(/\/admin\.html$/, '/admin');
    urlDisplay.textContent = `${origin}${path}?token=${SECRET_URL_TOKEN}`;
  }

  try {
    const config = await apiFetch('/api/settings/telegram');
    if (config) {
      if (document.getElementById('tgBotTokenInput')) document.getElementById('tgBotTokenInput').value = config.bot_token || config.botToken || '';
      if (document.getElementById('tgChatIdInput')) document.getElementById('tgChatIdInput').value = config.chat_id || config.chatId || '';
    }
  } catch (e) {
    try {
      const raw = localStorage.getItem(TG_CONFIG_KEY);
      if (raw) {
        const config = JSON.parse(raw);
        if (document.getElementById('tgBotTokenInput')) document.getElementById('tgBotTokenInput').value = config.botToken || '';
        if (document.getElementById('tgChatIdInput')) document.getElementById('tgChatIdInput').value = config.chatId || '';
      }
    } catch (err) {}
  }
}

async function handlePasswordChange(e) {
  e.preventDefault();
  const currentInput = document.getElementById('currentPassInput');
  const newInput = document.getElementById('newPassInput');
  const statusEl = document.getElementById('passChangeStatus');
  if (!currentInput || !newInput || !statusEl) return;

  const enteredCurrent = currentInput.value.trim();
  const enteredNew = newInput.value.trim();

  if (enteredNew.length < 6) {
    statusEl.style.display = 'block';
    statusEl.style.background = 'rgba(239, 68, 68, 0.15)';
    statusEl.style.color = '#ef4444';
    statusEl.style.border = '1px solid rgba(239, 68, 68, 0.3)';
    statusEl.textContent = '❌ Новый пароль должен содержать минимум 6 символов!';
    showToast('Ошибка пароля', 'Пароль должен содержать минимум 6 символов!', 'warning');
    return;
  }

  try {
    await apiFetch('/api/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({
        current_password: enteredCurrent,
        new_password: enteredNew
      })
    });
    localStorage.setItem(PASS_HASH_KEY, enteredNew);
    currentInput.value = '';
    newInput.value = '';

    statusEl.style.display = 'block';
    statusEl.style.background = 'rgba(34, 197, 94, 0.15)';
    statusEl.style.color = '#22c55e';
    statusEl.style.border = '1px solid rgba(34, 197, 94, 0.3)';
    statusEl.textContent = '✅ Новый пароль успешно установлен и сохранен в базе SQLite!';
    showToast('Пароль обновлен', 'Мастер-пароль успешно сохранен в базе SQLite', 'success');
  } catch (err) {
    statusEl.style.display = 'block';
    statusEl.style.background = 'rgba(239, 68, 68, 0.15)';
    statusEl.style.color = '#ef4444';
    statusEl.style.border = '1px solid rgba(239, 68, 68, 0.3)';
    statusEl.textContent = '❌ Ошибка: ' + (err.message || 'Не удалось обновить пароль');
    showToast('Ошибка пароля', err.message || 'Неверный текущий пароль', 'error');
  }
}

async function handleSaveTelegramConfig(e) {
  e.preventDefault();
  const botToken = (document.getElementById('tgBotTokenInput')?.value || '').trim();
  const chatId = (document.getElementById('tgChatIdInput')?.value || '').trim();
  const statusEl = document.getElementById('tgStatus');

  const config = { bot_token: botToken, chat_id: chatId };
  localStorage.setItem(TG_CONFIG_KEY, JSON.stringify({ botToken, chatId }));

  try {
    await apiFetch('/api/settings/telegram', {
      method: 'POST',
      body: JSON.stringify(config)
    });
    if (statusEl) {
      statusEl.style.display = 'block';
      statusEl.style.background = 'rgba(34, 197, 94, 0.15)';
      statusEl.style.color = '#22c55e';
      statusEl.style.border = '1px solid rgba(34, 197, 94, 0.3)';
      statusEl.textContent = '✅ Настройки Telegram сохранены в SQLite!';
      setTimeout(() => { statusEl.style.display = 'none'; }, 4000);
    }
    showToast('Telegram подключен', 'Настройки бота и Chat ID сохранены в SQLite', 'success');
  } catch (err) {
    if (statusEl) {
      statusEl.style.display = 'block';
      statusEl.style.background = 'rgba(239, 68, 68, 0.15)';
      statusEl.style.color = '#ef4444';
      statusEl.style.border = '1px solid rgba(239, 68, 68, 0.3)';
      statusEl.textContent = '❌ Ошибка сохранения: ' + err.message;
    }
    showToast('Ошибка сохранения', err.message || 'Не удалось сохранить настройки бота', 'error');
  }
}

async function testTelegramAlert() {
  const statusEl = document.getElementById('tgStatus');
  const botToken = (document.getElementById('tgBotTokenInput')?.value || '').trim();
  const chatId = (document.getElementById('tgChatIdInput')?.value || '').trim();

  if (!botToken || !chatId) {
    showToast('Поля не заполнены', 'Введите Telegram Bot Token и Chat ID перед отправкой теста!', 'warning');
    return;
  }

  try {
    const res = await apiFetch('/api/settings/telegram/test', {
      method: 'POST',
      body: JSON.stringify({ bot_token: botToken, chat_id: chatId })
    });
    if (statusEl) {
      statusEl.style.display = 'block';
      statusEl.style.background = 'rgba(34, 197, 94, 0.15)';
      statusEl.style.color = '#22c55e';
      statusEl.style.border = '1px solid rgba(34, 197, 94, 0.3)';
      statusEl.textContent = '🚀 Тестовое сообщение успешно отправлено сервером в Telegram!';
    }
    showToast('Telegram доставлен', 'Тестовое уведомление успешно отправлено сервером в Telegram!', 'success');
  } catch (err) {
    if (statusEl) {
      statusEl.style.display = 'block';
      statusEl.style.background = 'rgba(239, 68, 68, 0.15)';
      statusEl.style.color = '#ef4444';
      statusEl.style.border = '1px solid rgba(239, 68, 68, 0.3)';
      statusEl.textContent = '❌ Ошибка Telegram: ' + err.message;
    }
    showToast('Ошибка Telegram', err.message, 'error');
  }
}

window.handlePasswordChange = handlePasswordChange;
window.handleSaveTelegramConfig = handleSaveTelegramConfig;
window.testTelegramAlert = testTelegramAlert;
window.populateSettingsInputs = populateSettingsInputs;

// Car modal & file picker exports
window.openCarEditModal = openCarEditModal;
window.closeCarEditModal = closeCarEditModal;
window.saveCarProject = saveCarProject;
window.deleteCarProject = deleteCarProject;
window.triggerCarPhotoPicker = triggerCarPhotoPicker;
window.handleCarPhotoSelected = handleCarPhotoSelected;
window.handleCarVideoSelected = handleCarVideoSelected;
window.handleCarVideoPathInput = handleCarVideoPathInput;
window.clearCarVideoPreview = clearCarVideoPreview;
window.updateCarVideoPreviewUI = updateCarVideoPreviewUI;
window.handleCarPhotoPathInput = handleCarPhotoPathInput;
window.clearCarPhotoPreview = clearCarPhotoPreview;

// Top-N Featured slots & row dragging exports
window.renderFeaturedSlots = renderFeaturedSlots;
window.handleFeaturedSlotSelectChange = handleFeaturedSlotSelectChange;
window.moveFeaturedSlot = moveFeaturedSlot;
window.syncFeaturedOrderToBackend = syncFeaturedOrderToBackend;
window.toggleCarFeatured = toggleCarFeatured;
window.insertCarIntoFeaturedSlot = insertCarIntoFeaturedSlot;
window.handleCarRowDragStart = handleCarRowDragStart;
window.handleCarRowDragEnd = handleCarRowDragEnd;
window.handleSlotsAreaDragOver = handleSlotsAreaDragOver;
window.handleSlotsAreaDragLeave = handleSlotsAreaDragLeave;
window.handleDropIntoNewSlot = handleDropIntoNewSlot;
window.handleFeaturedDragStart = handleFeaturedDragStart;
window.handleFeaturedDragOver = handleFeaturedDragOver;
window.handleFeaturedDragLeave = handleFeaturedDragLeave;
window.handleFeaturedDrop = handleFeaturedDrop;
window.handleFeaturedDragEnd = handleFeaturedDragEnd;

// Team modal & photo exports
window.openTeamMemberModal = openTeamMemberModal;
window.closeTeamModal = closeTeamModal;
window.saveTeamMember = saveTeamMember;
window.deleteTeamMember = deleteTeamMember;
window.handleTeamPhotoSelected = handleTeamPhotoSelected;
window.handleTeamPhotoInput = handleTeamPhotoInput;
window.clearTeamPhotoPreview = clearTeamPhotoPreview;
window.updateTeamLiveCardPreview = updateTeamLiveCardPreview;
window.selectTeamMemberForInspection = selectTeamMemberForInspection;

// Records modal & photo exports
window.openRecordEditModal = openRecordEditModal;
window.closeRecordModal = closeRecordModal;
window.saveRecord = saveRecord;
window.deleteRecord = deleteRecord;
window.handleRecordPhotoSelected = handleRecordPhotoSelected;
window.handleRecordPhotoInput = handleRecordPhotoInput;
window.clearRecordPhotoPreview = clearRecordPhotoPreview;

// Media modal & video exports
window.openMediaEditModal = openMediaEditModal;
window.closeMediaModal = closeMediaModal;
window.saveMediaItem = saveMediaItem;
window.deleteMediaItem = deleteMediaItem;
window.handleMediaFileSelected = handleMediaFileSelected;
window.handleMediaFileInput = handleMediaFileInput;
window.clearMediaFilePreview = clearMediaFilePreview;
window.updateMediaFilePreviewUI = updateMediaFilePreviewUI;

// Gallery modal & photo exports
window.triggerGalleryPhotoPicker = triggerGalleryPhotoPicker;
window.handleGalleryPhotoSelected = handleGalleryPhotoSelected;
window.openGalleryPhotoModal = openGalleryPhotoModal;
window.closeGalleryPhotoModal = closeGalleryPhotoModal;
window.saveGalleryPhoto = saveGalleryPhoto;
window.deleteGalleryPhoto = deleteGalleryPhoto;

// ================= PARTNERS CRUD MODULE =================

function renderPartnersTable() {
  let partners = getDB(PARTNERS_STORAGE_KEY, defaultPartners);
  if (!Array.isArray(partners) || partners.length < 28) {
    partners = defaultPartners;
    saveDB(PARTNERS_STORAGE_KEY, partners);
  } else {
    let updated = false;
    partners = partners.map(p => {
      if (!p.logo || p.logo.includes('partners_banner.png') || p.logo.endsWith('.svg') || p.logo === '#') {
        const match = defaultPartners.find(d => d.id === p.id);
        if (match) {
          updated = true;
          return { ...p, logo: match.logo };
        }
      }
      return p;
    });
    if (updated) {
      saveDB(PARTNERS_STORAGE_KEY, partners);
    }
  }

  const tbody = document.getElementById('partnersTableBody');
  if (!tbody) return;

  partners.sort((a, b) => (parseInt(a.sort_order || 0) - parseInt(b.sort_order || 0)));

  tbody.innerHTML = partners.map((p, idx) => {
    const id = escapeJS(p.id);
    const name = escapeHTML(p.name);
    const category = escapeHTML(p.category || 'Партнер');
    const desc = escapeHTML(p.desc || '');
    const sortOrder = parseInt(p.sort_order || idx + 1);
    const isActive = (p.is_active === 1 || p.is_active === true || p.is_active === '1');
    const statusHtml = isActive 
      ? '<span style="color: #22c55e; font-size: 11.5px; font-weight: 600;">● Активен</span>'
      : '<span style="color: #64748b; font-size: 11.5px;">Скрыт</span>';

    const logoSrc = p.logo ? escapeHTML(p.logo) : '';
    const monogram = escapeHTML(p.name ? p.name.substring(0, 2).toUpperCase() : 'PT');
    const hasRealLogo = logoSrc && logoSrc !== '#' && !logoSrc.includes('partners_banner.png');
    const logoHtml = hasRealLogo
      ? `<div style="width: 44px; height: 44px; border-radius: 8px; background: rgba(0,0,0,0.6); border: 1px solid rgba(255,255,255,0.12); display: flex; align-items: center; justify-content: center; padding: 4px; overflow: hidden; margin: 0 auto;">
           <img src="${logoSrc}" alt="${name}" style="max-width: 100%; max-height: 100%; object-fit: contain;" onerror="this.onerror=null; this.parentElement.innerHTML='<span style=\\'font-family:var(--font-mono);font-size:11px;font-weight:700;color:var(--gtt-orange);\\'>${monogram}</span>';">
         </div>`
      : `<div style="width: 44px; height: 44px; border-radius: 8px; background: rgba(234, 91, 12, 0.1); border: 1px dashed rgba(234, 91, 12, 0.35); display: flex; align-items: center; justify-content: center; margin: 0 auto;">
           <span style="font-family: var(--font-mono); font-size: 12px; font-weight: 800; color: var(--gtt-orange);">${monogram}</span>
         </div>`;

    return `
    <tr>
      <td style="color: var(--text-dim); font-family: var(--font-mono); text-align: center;">${idx + 1}</td>
      <td style="text-align: center;">${logoHtml}</td>
      <td>
        <div style="font-weight: 700; color: #fff;">${name}</div>
        ${p.link && p.link !== '#' ? `<a href="${escapeHTML(p.link)}" target="_blank" rel="noopener" style="font-size: 11px; color: #38bdf8; text-decoration: none;">Перейти ↗</a>` : ''}
      </td>
      <td><span class="tag-pill" style="color: var(--gtt-orange); border-color: rgba(255,100,37,0.3); font-size: 10.5px;">${category}</span></td>
      <td style="font-size: 12.5px; color: var(--text-muted); line-height: 1.45; max-width: 300px;">
        ${desc}
      </td>
      <td style="font-family: var(--font-mono); font-size: 12px; color: var(--text-dim); text-align: center;">${sortOrder}</td>
      <td>${statusHtml}</td>
      <td>
        <div class="row-actions">
          <button class="table-btn" onclick="openPartnerModal('${id}')">Изменить</button>
          <button class="table-btn delete" onclick="deletePartner('${id}')">Удалить</button>
        </div>
      </td>
    </tr>
    `;
  }).join('');
}

function updatePartnerLogoPreview(url) {
  const box = document.getElementById('partnerLogoPreviewBox');
  const img = document.getElementById('partnerLogoPreviewImg');
  const txt = document.getElementById('partnerLogoPreviewText');
  if (!box || !img) return;
  const cleanUrl = (url || '').trim();
  if (cleanUrl && cleanUrl !== '#' && !cleanUrl.includes('partners_banner.png')) {
    img.src = cleanUrl;
    img.style.display = 'block';
    if (txt) txt.textContent = cleanUrl.startsWith('data:') ? 'Пользовательское изображение (Base64)' : cleanUrl;
    box.style.display = 'flex';
  } else {
    img.src = '';
    img.style.display = 'none';
    if (txt) txt.textContent = 'Маленькая картинка / логотип не заданы (будет использована стильная монограмма)';
    box.style.display = 'flex';
  }
}
window.updatePartnerLogoPreview = updatePartnerLogoPreview;

function openPartnerModal(id) {
  const modal = document.getElementById('partnerModal');
  const title = document.getElementById('partnerModalTitle');
  const form = document.getElementById('partnerForm');
  if (!modal) return;
  modal.style.display = 'flex';

  if (id) {
    const partners = getDB(PARTNERS_STORAGE_KEY, defaultPartners);
    const p = partners.find(item => item.id === id);
    if (!p) return;
    title.textContent = `Редактирование: ${p.name}`;
    document.getElementById('editPartnerId').value = p.id;
    document.getElementById('editPartnerName').value = p.name || '';
    document.getElementById('editPartnerCategory').value = p.category || '';
    document.getElementById('editPartnerSortOrder').value = p.sort_order || 0;
    document.getElementById('editPartnerDesc').value = p.desc || '';
    document.getElementById('editPartnerLink').value = p.link || '';
    document.getElementById('editPartnerLogo').value = p.logo || '';
    updatePartnerLogoPreview(p.logo || '');
    document.getElementById('editPartnerIsActive').checked = (p.is_active === 1 || p.is_active === true || p.is_active === '1');
  } else {
    title.textContent = 'Добавить нового партнера';
    if (form) form.reset();
    document.getElementById('editPartnerId').value = '';
    document.getElementById('editPartnerSortOrder').value = 0;
    document.getElementById('editPartnerLogo').value = '';
    updatePartnerLogoPreview('');
    document.getElementById('editPartnerIsActive').checked = true;
  }
}

function closePartnerModal() {
  const modal = document.getElementById('partnerModal');
  if (modal) modal.style.display = 'none';
}

function handlePartnerLogoSelected(event) {
  const file = event.target.files[0];
  if (!file) return;
  const input = document.getElementById('editPartnerLogo');
  const reader = new FileReader();
  reader.onload = async (e) => {
    let base64 = e.target.result;
    try {
      base64 = await compressImageClientSide(base64, 400, 300, 0.85);
    } catch (err) {}
    if (input) input.value = base64;
    updatePartnerLogoPreview(base64);
    showToast('Логотип загружен', `Файл «${file.name}» оптимизирован для витрины`, 'success');
  };
  reader.readAsDataURL(file);
}

async function savePartner(e) {
  if (e && e.preventDefault) e.preventDefault();
  const idInput = document.getElementById('editPartnerId').value;
  const rawName = document.getElementById('editPartnerName').value.trim();
  const rawCategory = document.getElementById('editPartnerCategory').value.trim();

  if (!rawName) {
    showToast('Укажите название', 'Введите имя бренда или партнера', 'warning');
    document.getElementById('editPartnerName')?.focus();
    return;
  }

  const partnerData = {
    id: idInput || ('prt_' + Date.now()),
    name: rawName,
    category: rawCategory || 'Технические партнеры',
    sort_order: parseInt(document.getElementById('editPartnerSortOrder').value) || 0,
    desc: document.getElementById('editPartnerDesc').value.trim(),
    link: document.getElementById('editPartnerLink').value.trim() || '#',
    logo: document.getElementById('editPartnerLogo').value.trim() || 'assets/photos/partners_banner.png',
    is_active: document.getElementById('editPartnerIsActive').checked ? 1 : 0
  };

  const partners = getDB(PARTNERS_STORAGE_KEY, defaultPartners);
  const existingIdx = partners.findIndex(p => p.id === partnerData.id);

  if (existingIdx !== -1) {
    partners[existingIdx] = partnerData;
  } else {
    partners.push(partnerData);
  }
  saveDB(PARTNERS_STORAGE_KEY, partners);

  // Sync with FastAPI backend if online
  try {
    const method = idInput ? 'PUT' : 'POST';
    const url = idInput ? `/api/partners/${encodeURIComponent(partnerData.id)}` : '/api/partners';
    await apiFetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(partnerData)
    });
  } catch (err) {
    console.warn('[GTT API] Partner offline/static note:', err);
  }

  // Real-time broadcast sync across all browser tabs
  if (window.BroadcastChannel) {
    try {
      const ch = new BroadcastChannel('gtt_channel');
      ch.postMessage({ type: 'partners_updated', partners: partners });
    } catch (bcErr) {}
  }

  closePartnerModal();
  renderPartnersTable();
  showToast('Успешно', `Данные партнера «${partnerData.name}» сохранены`, 'success');
}

async function deletePartner(id) {
  if (!confirm('Вы уверены, что хотите удалить этого партнера?')) return;

  const partners = getDB(PARTNERS_STORAGE_KEY, defaultPartners);
  const updated = partners.filter(p => p.id !== id);
  saveDB(PARTNERS_STORAGE_KEY, updated);

  try {
    await apiFetch(`/api/partners/${encodeURIComponent(id)}`, { method: 'DELETE' });
  } catch (err) {
    console.warn('[GTT API] Partner delete note:', err);
  }

  if (window.BroadcastChannel) {
    try {
      const ch = new BroadcastChannel('gtt_channel');
      ch.postMessage({ type: 'partners_updated', partners: updated });
    } catch (bcErr) {}
  }

  renderPartnersTable();
  showToast('Удалено', 'Партнер успешно удален', 'info');
}

// Partner module exports
window.renderPartnersTable = renderPartnersTable;
window.openPartnerModal = openPartnerModal;
window.closePartnerModal = closePartnerModal;
window.savePartner = savePartner;
window.deletePartner = deletePartner;
window.handlePartnerLogoSelected = handlePartnerLogoSelected;

// Notification Bell & Audit Trail exports
window.toggleAdminNotifications = toggleAdminNotifications;
window.clearAdminNotifications = clearAdminNotifications;
window.updateAdminBellUI = updateAdminBellUI;

// ================= MOTO CRUD MODULE =================

function renderMotoTable() {
  const moto = getDB(MOTO_STORAGE_KEY, defaultMoto);
  const tbody = document.getElementById('motoTableBody');
  if (!tbody) return;

  moto.sort((a, b) => (parseInt(a.sort_order || 0) - parseInt(b.sort_order || 0)));

  tbody.innerHTML = moto.map((m, idx) => {
    const id = escapeJS(m.id);
    const title = escapeHTML(m.title);
    const code = escapeHTML(m.code || 'GTT MOTO');
    const desc = escapeHTML(m.desc || '');
    const bullets = (m.bullets || '').split('\n').filter(Boolean).map(b => `<div style="font-size: 11.5px; color: #94a3b8;">• ${escapeHTML(b)}</div>`).join('');
    const sortOrder = parseInt(m.sort_order || idx + 1);
    const isActive = (m.is_active === 1 || m.is_active === true || m.is_active === '1');
    const statusHtml = isActive 
      ? '<span style="color: #22c55e; font-size: 11.5px; font-weight: 600;">● Активен</span>'
      : '<span style="color: #64748b; font-size: 11.5px;">Скрыт</span>';

    return `
    <tr>
      <td style="color: var(--text-dim); font-family: var(--font-mono);">${idx + 1}</td>
      <td>
        <div style="display: flex; align-items: center; gap: 10px;">
          ${m.img ? `
            <div style="width: 50px; height: 36px; border-radius: 4px; overflow: hidden; background: #000; border: 1px solid rgba(255,255,255,0.12); flex-shrink: 0;">
              <img src="${escapeHTML(m.img)}" alt="${title}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.style.display='none'">
            </div>
          ` : ''}
          <div>
            <div style="font-weight: 700; color: #fff;">${title}</div>
            ${m.img ? `<div style="font-size: 10.5px; color: var(--text-dim); max-width: 170px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${escapeHTML(m.img)}</div>` : ''}
          </div>
        </div>
      </td>
      <td><span class="tag-pill" style="color: var(--gtt-cyan); border-color: rgba(56,189,248,0.3); font-size: 10.5px;">${code}</span></td>
      <td style="font-size: 12.5px; color: var(--text-muted); line-height: 1.45; max-width: 340px;">
        <div style="margin-bottom: 4px;">${desc}</div>
        ${bullets}
      </td>
      <td style="font-family: var(--font-mono); font-size: 12px; color: var(--text-dim); text-align: center;">${sortOrder}</td>
      <td>${statusHtml}</td>
      <td>
        <div class="row-actions">
          <button class="table-btn" onclick="openMotoModal('${id}')">Изменить</button>
          <button class="table-btn delete" onclick="deleteMoto('${id}')">Удалить</button>
        </div>
      </td>
    </tr>
    `;
  }).join('');
}

function updateMotoPhotoPreview(url) {
  const imgEl = document.getElementById('motoPhotoPreviewImg');
  const textEl = document.getElementById('motoPhotoPreviewText');
  if (!imgEl || !textEl) return;
  const clean = (url || '').trim();
  if (clean) {
    imgEl.src = clean;
    imgEl.style.display = 'block';
    textEl.textContent = clean.startsWith('data:') ? 'Файл загружен (Base64)' : clean;
  } else {
    imgEl.src = '';
    imgEl.style.display = 'none';
    textEl.textContent = 'Файл не выбран';
  }
}

function handleMotoPhotoSelected(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;
  const input = document.getElementById('editMotoImg');
  const reader = new FileReader();
  reader.onload = async (e) => {
    let base64 = e.target.result;
    try {
      base64 = await compressImageClientSide(base64, 1200, 800, 0.88);
    } catch (err) {}
    if (input) input.value = base64;
    updateMotoPhotoPreview(base64);
    showToast('Фото загружено', `Файл «${file.name}» готов к сохранению`, 'success');
  };
  reader.readAsDataURL(file);
}

function openMotoModal(id) {
  const modal = document.getElementById('motoModal');
  const title = document.getElementById('motoModalTitle');
  const form = document.getElementById('motoForm');
  if (!modal) return;
  modal.style.display = 'flex';

  if (id) {
    const moto = getDB(MOTO_STORAGE_KEY, defaultMoto);
    const m = moto.find(item => item.id === id);
    if (!m) return;
    title.textContent = `Редактирование: ${m.title}`;
    document.getElementById('editMotoId').value = m.id;
    document.getElementById('editMotoTitle').value = m.title || '';
    document.getElementById('editMotoCode').value = m.code || '';
    document.getElementById('editMotoSortOrder').value = m.sort_order || 0;
    document.getElementById('editMotoDesc').value = m.desc || '';
    document.getElementById('editMotoBullets').value = m.bullets || '';
    document.getElementById('editMotoImg').value = m.img || '';
    updateMotoPhotoPreview(m.img || '');
    document.getElementById('editMotoIsActive').checked = (m.is_active === 1 || m.is_active === true || m.is_active === '1');
  } else {
    title.textContent = 'Добавить новый мотопроект';
    if (form) form.reset();
    document.getElementById('editMotoId').value = '';
    document.getElementById('editMotoSortOrder').value = 0;
    document.getElementById('editMotoImg').value = 'assets/moto/bmw_m1000rr_gtt.jpg';
    updateMotoPhotoPreview('assets/moto/bmw_m1000rr_gtt.jpg');
    document.getElementById('editMotoIsActive').checked = true;
  }
}

function closeMotoModal() {
  const modal = document.getElementById('motoModal');
  if (modal) modal.style.display = 'none';
}

async function saveMoto(e) {
  if (e) e.preventDefault();
  const id = document.getElementById('editMotoId').value;
  const title = document.getElementById('editMotoTitle').value.trim();
  const code = document.getElementById('editMotoCode').value.trim();
  const sortOrder = parseInt(document.getElementById('editMotoSortOrder').value || 0);
  const desc = document.getElementById('editMotoDesc').value.trim();
  const bullets = document.getElementById('editMotoBullets').value.trim();
  const img = document.getElementById('editMotoImg').value.trim();
  const isActive = document.getElementById('editMotoIsActive').checked ? 1 : 0;

  if (!title || !code) {
    showToast('Ошибка', 'Укажите название и код мотопроекта', 'error');
    return;
  }

  const motoList = getDB(MOTO_STORAGE_KEY, defaultMoto);
  let payload;

  if (id) {
    const existingIdx = motoList.findIndex(m => m.id === id);
    payload = {
      id,
      title,
      code,
      desc,
      bullets,
      img,
      sort_order: sortOrder,
      is_active: isActive
    };
    if (existingIdx !== -1) {
      motoList[existingIdx] = payload;
    } else {
      motoList.push(payload);
    }
  } else {
    const newId = 'moto_' + Date.now();
    payload = {
      id: newId,
      title,
      code,
      desc,
      bullets,
      img,
      sort_order: sortOrder || motoList.length + 1,
      is_active: isActive
    };
    motoList.push(payload);
  }

  saveDB(MOTO_STORAGE_KEY, motoList);
  renderMotoTable();
  closeMotoModal();

  if (window.BroadcastChannel) {
    try {
      const ch = new BroadcastChannel('gtt_channel');
      ch.postMessage({ type: 'moto_updated', moto: motoList });
    } catch (bcErr) {}
  }

  try {
    const method = id ? 'PUT' : 'POST';
    const url = id ? `/api/moto/${id}` : '/api/moto';
    const res = await apiFetch(url, {
      method,
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      showToast('Успешно', `Мотопроект "${title}" сохранен в БД`, 'success');
      addAuditNotification('updated', `Мотопроект: ${title} (${code})`);
    }
  } catch (err) {
    showToast('Сохранено локально', 'Синхронизация с сервером будет повторена позже', 'warning');
  }
}

async function deleteMoto(id) {
  if (!confirm('Вы уверены, что хотите удалить этот мотопроект?')) return;
  const motoList = getDB(MOTO_STORAGE_KEY, defaultMoto);
  const m = motoList.find(item => item.id === id);
  const title = m ? m.title : id;
  const filtered = motoList.filter(item => item.id !== id);
  saveDB(MOTO_STORAGE_KEY, filtered);
  renderMotoTable();

  if (window.BroadcastChannel) {
    try {
      const ch = new BroadcastChannel('gtt_channel');
      ch.postMessage({ type: 'moto_updated', moto: filtered });
    } catch (bcErr) {}
  }

  try {
    const res = await apiFetch(`/api/moto/${id}`, { method: 'DELETE' });
    if (res.ok) {
      showToast('Удалено', `Мотопроект "${title}" удален из базы данных`, 'info');
      addAuditNotification('removed', `Удален мотопроект: ${title}`);
    }
  } catch (err) {
    showToast('Удалено локально', 'Удалено из памяти браузера', 'warning');
  }
}

// Moto module exports
window.renderMotoTable = renderMotoTable;
window.openMotoModal = openMotoModal;
window.closeMotoModal = closeMotoModal;
window.saveMoto = saveMoto;
window.deleteMoto = deleteMoto;
window.handleMotoPhotoSelected = handleMotoPhotoSelected;
window.updateMotoPhotoPreview = updateMotoPhotoPreview;

// Project Name Auto-Translate & Edit Exports
window.handleNameRuInput = handleNameRuInput;
window.toggleManualNameEn = toggleManualNameEn;
window.handleManualNameEnInput = handleManualNameEnInput;
window.autoTranslateRuToEn = autoTranslateRuToEn;

document.addEventListener('DOMContentLoaded', checkAuth);


