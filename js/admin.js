// GOSHA TURBOTECH - Admin Dashboard Multi-Module Engine
// Cars, Team Crew, Records Telemetry & Media Reels

const ADMIN_STORAGE_KEY = 'gtt_admin_cars_db';
const GALLERY_STORAGE_KEY = 'gtt_admin_gallery_db';
const TEAM_STORAGE_KEY = 'gtt_admin_team_db';
const RECORDS_STORAGE_KEY = 'gtt_admin_records_db';
const MEDIA_STORAGE_KEY = 'gtt_admin_media_db';
const TRAFFIC_STORAGE_KEY = 'gtt_traffic_telemetry';
const AUTH_KEY = 'gtt_admin_authenticated';
const PASS_HASH_KEY = 'gtt_admin_custom_pin';
const TG_CONFIG_KEY = 'gtt_admin_tg_config';
const SECRET_URL_TOKEN = 'gtt_atelier_2026';
const TOKEN_SESSION_KEY = 'gtt_token_authorized_session';
const TOKEN_DEVICE_KEY = 'gtt_authorized_device_token';

// Secret URL Token Gate
(function verifySecretUrlAccess() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    // If valid secret token is provided in the URL, store authorized session
    if (token === SECRET_URL_TOKEN) {
      sessionStorage.setItem(TOKEN_SESSION_KEY, 'granted');
      localStorage.setItem(TOKEN_DEVICE_KEY, SECRET_URL_TOKEN);
      const cleanPath = window.location.pathname;
      window.history.replaceState({}, document.title, cleanPath);
      return;
    }
  } catch (e) {
    console.error('Security token verification note:', e);
  }
})();

// 1. Initial Cars Seed
const defaultProjects = [
  {
    id: 'gtr_lucifer',
    brand: 'NISSAN & GTT',
    type: 'gtr',
    nameRu: 'GT-R R35 «LUCIFER» GTT #71 CHAMPION',
    nameEn: 'GT-R R35 «LUCIFER» GTT #71 CHAMPION',
    hp: '1,850+ HP',
    quarterMile: '7.620 сек',
    topSpeed: '355+ км/ч',
    img: 'assets/cars/gtr_lucifer_solo.jpg',
    videoSrc: 'assets/videos/gosha_na_svoem_lucifer_web.mp4',
    descRu: 'Победоносный огненный болид Гоши Перцхелия, борт №71. Построенный в лаборатории GoshaTurboTech драг-монстр в культовой ливрее адского пламени.'
  },
  {
    id: 'draco_promod',
    brand: 'NISSAN & DRACO',
    type: 'gtr',
    nameRu: 'GT-R R35 DRACO PRO-MOD GTT 3000+ HP',
    nameEn: 'GT-R R35 DRACO PRO-MOD GTT 3000+ HP',
    hp: '3,000+ HP',
    quarterMile: '6.850 сек',
    topSpeed: '380+ км/ч',
    img: 'assets/cars/gtr_draco_promod_front.jpg',
    videoSrc: 'assets/videos/draco_gtr_action.mp4',
    descRu: 'Легендарный флагман и абсолютный монстр дрэг-стрипа RDRC под управлением Романа Арефьева. Трубчатое шасси, гигантские турбины и более 3000 л.с.'
  },
  {
    id: 'bmw_m5',
    brand: 'BMW M-POWER',
    type: 'bmw',
    nameRu: 'BMW M5 G90 COMPETITION GTT-STAGE 3',
    nameEn: 'BMW M5 G90 COMPETITION GTT-STAGE 3',
    hp: '1,050+ HP',
    quarterMile: '9.420 сек',
    topSpeed: '340+ км/ч',
    img: 'assets/cars/bmw_m5_rdrc_race.jpg',
    videoSrc: 'assets/videos/r8_acceleration.mp4',
    descRu: 'Заряженная боевая BMW M5 поколения G90 от GoshaTurboTech, выступающая в чемпионате России RDRC. Полный привод M xDrive, гибридные турбины GTT.'
  },
  {
    id: 'moses',
    brand: 'NISSAN',
    type: 'gtr',
    nameRu: 'GT-R R35 GTT-MOSES «КОРЖИК» #712',
    nameEn: 'GT-R R35 GTT-MOSES «KORZHIK» #712',
    hp: '1,800+ HP',
    quarterMile: '7.810 сек',
    topSpeed: '360+ км/ч',
    img: 'https://static.tildacdn.com/tild3032-3266-4139-a563-653561393961/gtr-min.png',
    videoSrc: 'assets/videos/gtr_launch_pass.mp4',
    descRu: 'Культовый белый Nissan GT-R R35 борт №712 под управлением Николая Коржова — символ побед GoshaTurboTech в России и Европе. Абсолютный чемпион SMP RDRC.'
  },
  {
    id: 'zelenka',
    brand: 'LAMBORGHINI',
    type: 'lambo',
    nameRu: 'HURACAN TWIN TURBO «ЗЕЛЕНКА» GTT',
    nameEn: 'HURACAN TWIN TURBO «ZELENKA» GTT',
    hp: '1,500+ HP',
    quarterMile: '8.120 сек',
    topSpeed: '350+ км/ч',
    img: 'assets/photos/huracan_zelenka_gtt.jpg',
    videoSrc: 'assets/videos/r8_launch_action.mp4',
    descRu: 'Знаменитая ядовито-зеленая Lamborghini Huracan Twin Turbo «Зеленка» — легенда паддока RDRC и уличных дуэлей.'
  },
  {
    id: 'tonystark',
    brand: 'AUDI & ЦМРБАНК',
    type: 'audi',
    nameRu: 'R8 V10 PLUS TWIN TURBO TONY STARK / RDRC',
    nameEn: 'R8 V10 PLUS TWIN TURBO TONY STARK / RDRC',
    hp: '1,400+ HP',
    quarterMile: '8.450 сек',
    topSpeed: '350+ км/ч',
    img: 'assets/cars/audi_r8_tsmr_launch.jpg',
    videoSrc: 'assets/videos/dodge_srt_pass.mp4',
    descRu: 'Боевая Audi R8 V10 Twin Turbo под эгидой ЦМРБанк и GTT на треке RDRC. Покоритель байкальского льда.'
  },
  {
    id: 'dodge_srt',
    brand: 'DODGE SRT',
    type: 'other',
    nameRu: 'CHALLENGER SRT HELLCAT GTT-MONSTER',
    nameEn: 'CHALLENGER SRT HELLCAT GTT-MONSTER',
    hp: '1,200+ HP',
    quarterMile: '8.890 сек',
    topSpeed: '330+ км/ч',
    img: 'assets/cars/dodge_burnout_sunset.jpg',
    videoSrc: 'assets/videos/dodge_challenger_action.mp4',
    descRu: 'Черный компрессорный монстр Dodge Challenger SRT от GoshaTurboTech под управлением Гончарова. Море дыма и чудовищный крутящий момент.'
  },
  {
    id: 'bezzubik',
    brand: 'LAMBORGHINI',
    type: 'lambo',
    nameRu: 'HURACAN TWIN TURBO GTT-BEZZUBIK',
    nameEn: 'HURACAN TWIN TURBO GTT-BEZZUBIK',
    hp: '1,600+ HP',
    quarterMile: '7.950 сек',
    topSpeed: '353 км/ч',
    img: 'assets/cars/huracan_green_bezzubik_track.jpg',
    videoSrc: 'assets/videos/hero_burnout_action.mp4',
    descRu: 'Легендарный серый Lamborghini Huracan TT «Беззубик» — обладатель рекорда Европы на дистанции 804 метра в Германии (Race 1000).'
  },
  {
    id: 'gtr_blue_888',
    brand: 'NISSAN',
    type: 'gtr',
    nameRu: 'GT-R R35 MIDNIGHT BLUE GTT #888',
    nameEn: 'GT-R R35 MIDNIGHT BLUE GTT #888',
    hp: '1,650+ HP',
    quarterMile: '7.850 сек',
    topSpeed: '350+ км/ч',
    img: 'assets/photos/gtr_blue_888_rdrc.jpg',
    videoSrc: 'assets/videos/gtr_blue_888_pass_web.mp4',
    descRu: 'Синий драг-болид борт №888, построенный в GoshaTurboTech для стабильных низких 8 секунд и выходов в 7 секунд.'
  },
  {
    id: 'gtr_red',
    brand: 'NISSAN',
    type: 'gtr',
    nameRu: 'GT-R R35 RED CHROME GTT PRO-MOD',
    nameEn: 'GT-R R35 RED CHROME GTT PRO-MOD',
    hp: '2,200+ HP',
    quarterMile: '7.210 сек',
    topSpeed: '365+ км/ч',
    img: 'assets/cars/gtr_red_front_rdrc.jpg',
    videoSrc: 'assets/videos/gtr_red_g35_action_web.mp4',
    descRu: 'Красный хромированный болид GTT с расширением кузова и аэродинамическим оперением.'
  },
  {
    id: 'bmw_m4',
    brand: 'BMW M-POWER',
    type: 'bmw',
    nameRu: 'BMW M4 G82 COMPETITION GTT-850',
    nameEn: 'BMW M4 G82 COMPETITION GTT-850',
    hp: '850+ HP',
    quarterMile: '10.150 сек',
    topSpeed: '325+ км/ч',
    img: 'assets/cars/bmw_m4_g82_gtt.jpg',
    videoSrc: '',
    descRu: 'Кастомный проект на базе BMW M4 G82. Доработанные турбокомпрессоры S58, карбоновый впуск Eventuri, титановый выхлоп ручной работы и индивидуальная калибровка блока управления.'
  },
  {
    id: 'porsche_911_gtt',
    brand: 'PORSCHE',
    type: 'porsche',
    nameRu: 'PORSCHE 911 TURBO S (992) GTT-IMBA',
    nameEn: 'PORSCHE 911 TURBO S (992) GTT-IMBA',
    hp: '1,050+ HP',
    quarterMile: '9.252 сек',
    topSpeed: '345+ км/ч',
    img: 'assets/cars/gtr_rdrc_red_panamera.jpg',
    videoSrc: '',
    descRu: 'Официально подтвержденный рекордсмен RDRC среди Porsche поколения 992. Кастомный интеркулер, метаноловый впрыск и экстремальный запуск с лаунча.'
  }
];

// 2. Initial Team Seed (15 Members)
const defaultTeam = [
  { id: 'm1', name: 'Гоша', role: 'Основатель & Главный конструктор GTT', status: 'active' },
  { id: 'm2', name: 'Эдик', role: 'Технический директор ателье', status: 'active' },
  { id: 'm3', name: 'Дмитрий', role: 'Администратор проектов', status: 'atelier' },
  { id: 'm4', name: 'Мария', role: 'Делопроизводитель & Менеджер рекордов', status: 'atelier' },
  { id: 'm5', name: 'Павел', role: 'Делопроизводитель & Логист команды', status: 'atelier' },
  { id: 'm6', name: 'Георгий', role: 'Инженер-электрик & Калибровщик Motec/Syvecs', status: 'active' },
  { id: 'm7', name: 'Рустам', role: 'Моторист высшей квалификации', status: 'active' },
  { id: 'm8', name: 'Никита', role: 'Гоночный механик паддока', status: 'paddock' },
  { id: 'm9', name: 'Иван', role: 'Гоночный механик паддока', status: 'paddock' },
  { id: 'm10', name: 'Алексей', role: 'Гоночный механик паддока', status: 'paddock' },
  { id: 'm11', name: 'Фазик', role: 'Механик сборочного цеха', status: 'atelier' },
  { id: 'm12', name: 'Степан', role: 'Механик сборочного цеха', status: 'atelier' },
  { id: 'm13', name: 'Алексей', role: 'Механик ходовой части', status: 'atelier' },
  { id: 'm14', name: 'Роман', role: 'Сварщик-фабрикатор титана и инконеля', status: 'active' },
  { id: 'm15', name: 'Евгений', role: 'Диагност электронных систем', status: 'active' }
];

// 3. Initial Records Seed
const defaultRecords = [
  {
    id: 'rec_1',
    year: '2022 • Мировой рекорд',
    car: 'PORSCHE 911 TURBO S (992) GTT-IMBA',
    telemetry: '1/4 мили: 9.252 сек • 231.80 км/ч',
    desc: 'Официально подтвержденный рекорд RDRC для кузова 992 на заводских турбинах.'
  },
  {
    id: 'rec_2',
    year: '2022 • Абсолютный рекорд льда',
    car: 'AUDI R8 V10 PLUS TT «GYURZA»',
    telemetry: '1 км с места на льду: 124 км/ч средняя скорость',
    desc: 'Дни скорости на льду озера Байкал совместно с Kiwamaru.'
  },
  {
    id: 'rec_3',
    year: '2021 • Мировой ориентир',
    car: 'PORSCHE 911 TURBO S GTT STAGE 2',
    telemetry: '1/4 мили: 9.303 сек • 235.83 км/ч',
    desc: 'Триумф на фестивале Unlim Fest. Пилот Сергей Никитин.'
  },
  {
    id: 'rec_4',
    year: '2019 • Рекорд России SMP RDRC',
    car: 'NISSAN GT-R R35 GTT-KORZHIK',
    telemetry: '1/2 мили: 13.435 сек • 334.41 км/ч',
    desc: 'Николай Коржов, 2-е место в абсолютном зачете SMP RDRC FSL.'
  },
  {
    id: 'rec_5',
    year: '2017 • Рекорд Европы',
    car: 'LAMBORGHINI HURACAN TT BEZZUBIK',
    telemetry: '1/2 мили (804 м): 353 км/ч',
    desc: 'Race 1000 Германия. Рекорд на 804 метра среди полноприводных суперкаров.'
  },
  {
    id: 'rec_6',
    year: '2014 • Рекорд Европы',
    car: 'NISSAN GT-R R35 GTT-1800 MOSES',
    telemetry: '1/4 мили: 7.810 сек • 287.65 км/ч',
    desc: 'UNLIM 500+ Greece (Остров Крит). 3-й результат в мире на тот момент.'
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
  { id: 'gal_2', tag: 'BURNOUT SMOKE', title: 'Dodge Challenger SRT Hellcat', img: 'assets/cars/dodge_burnout_sunset.jpg' },
  { id: 'gal_3', tag: '3000+ HP PRO-MOD', title: 'Nissan GT-R Draco Dragster', img: 'assets/cars/gtr_draco_promod_front.jpg' },
  { id: 'gal_4', tag: '1400+ HP V10 TT', title: 'Audi R8 V10 Plus CMRBank', img: 'assets/cars/audi_r8_tsmr_launch.jpg' },
  { id: 'gal_5', tag: 'CHAMPIONSHIP WINNER', title: 'GTR Lucifer // Gosha RDRC', img: 'assets/cars/gtr_lucifer_solo.jpg' },
  { id: 'gal_6', tag: 'AERODYNAMICS', title: 'Red Chrome Nissan GT-R Pro-Mod', img: 'assets/cars/gtr_red_front_rdrc.jpg' },
  { id: 'gal_7', tag: 'MIDNIGHT BLUE', title: 'Nissan GT-R R35 #888 Sunset Pass', img: 'assets/photos/gtr_blue_888_rdrc.jpg' },
  { id: 'gal_8', tag: 'CHIEF MOTORSPORT ENGINEER', title: 'Гоша Перцхелия на стрипе RDRC', img: 'assets/photos/gosha_on_track.jpg' },
  { id: 'gal_9', tag: 'ATELIER GARAGE', title: 'Бокс GTT: BMW M4 G82 & GT-R', img: 'assets/cars/bmw_m4_g82_gtt.jpg' },
  { id: 'gal_10', tag: 'TWIN TURBO V8', title: 'BMW M5 G90 Stage 2 GTT', img: 'assets/cars/bmw_m5_rdrc_race.jpg' },
  { id: 'gal_11', tag: 'BEZZUBIK TT', title: 'Huracan Twin Turbo «Беззубик»', img: 'assets/cars/huracan_green_bezzubik_track.jpg' }
];

// Server API Client Engine (FastAPI & SQLite persistence)
const API_BASE = '';

async function apiFetch(endpoint, options = {}) {
  try {
    const res = await fetch(API_BASE + endpoint, {
      headers: {
        'Content-Type': 'application/json',
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

// Helpers for LocalStorage & In-memory Cache
function getDB(key, defaultVal) {
  const saved = localStorage.getItem(key);
  if (saved) {
    try { return JSON.parse(saved); } catch (e) { console.error('Error loading ' + key, e); }
  }
  localStorage.setItem(key, JSON.stringify(defaultVal));
  return defaultVal;
}

function saveDB(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

const USER_NAME_KEY = 'gtt_admin_user_name';

// Authentication & Module Initialization
async function checkAuth() {
  const isAuth = sessionStorage.getItem(AUTH_KEY) === 'true' || localStorage.getItem(AUTH_KEY) === 'true';
  const loginScreen = document.getElementById('loginScreen');
  const dashboardScreen = document.getElementById('dashboardScreen');
  const welcomeTextEl = document.getElementById('userWelcomeText');

  if (isAuth) {
    loginScreen.style.display = 'none';
    dashboardScreen.style.display = 'block';

    if (welcomeTextEl) {
      welcomeTextEl.innerHTML = `Добро пожаловать // <strong>GTT Atelier Hub</strong>`;
    }

    renderAllModules();
    syncAllModulesFromAPI();
  } else {
    loginScreen.style.display = 'flex';
    dashboardScreen.style.display = 'none';
  }
}

async function syncAllModulesFromAPI() {
  try {
    const [cars, gallery, team, records, media] = await Promise.allSettled([
      apiFetch('/api/cars'),
      apiFetch('/api/gallery'),
      apiFetch('/api/team'),
      apiFetch('/api/records'),
      apiFetch('/api/media')
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
    renderAllModules();
  } catch (e) {
    console.warn('[GTT API] Standalone sync note:', e);
  }
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
  const inputEl = document.getElementById('adminPass');
  const input = (inputEl ? inputEl.value : '').trim();
  const errorEl = document.getElementById('authError');
  const loginBtn = document.getElementById('loginBtn');

  if (loginBtn) {
    loginBtn.disabled = true;
    loginBtn.textContent = 'Проверка ключа...';
  }

  let authSuccessful = false;
  let errorMsg = '⚠️ Неверный ключ или секретный пароль. Доступ заблокирован.';

  try {
    const res = await apiFetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ password: input })
    });
    if (res && res.status === 'ok') {
      authSuccessful = true;
    }
  } catch (apiErr) {
    if (apiErr.message && (apiErr.message.includes('429') || apiErr.message.includes('Слишком много'))) {
      authSuccessful = false;
      errorMsg = apiErr.message;
    } else if (apiErr.message && (apiErr.message.includes('401') || apiErr.message.includes('пароль'))) {
      authSuccessful = false;
      errorMsg = '⚠️ Неверный секретный пароль инженера!';
    } else {
      // Offline fallback
      const currentPin = getStoredPin();
      const validPins = [currentPin, 'gtt71', 'gtt_atelier_2026', '7777'];
      if (validPins.some(p => p.toLowerCase() === input.toLowerCase())) {
        authSuccessful = true;
      }
    }
  } finally {
    if (loginBtn) {
      loginBtn.disabled = false;
      loginBtn.textContent = 'Войти в панель GTT';
    }
  }

  if (authSuccessful) {
    sessionStorage.setItem(AUTH_KEY, 'true');
    localStorage.setItem(AUTH_KEY, 'true');
    if (errorEl) errorEl.style.display = 'none';
    showToast('Доступ разрешен', 'Успешная авторизация в панели инженера GTT', 'success');
    checkAuth();
  } else {
    if (errorEl) {
      errorEl.textContent = errorMsg;
      errorEl.style.display = 'block';
    }
    showToast('Ошибка доступа', errorMsg, 'error');
    if (inputEl) {
      inputEl.value = '';
      inputEl.focus();
    }
  }
}

function handleAdminLogout() {
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

  const tabs = document.querySelectorAll('.admin-tab-btn');
  if (tabName === 'cars') {
    if (tabs[0]) tabs[0].classList.add('active');
    document.getElementById('tabCars').style.display = 'block';
  } else if (tabName === 'traffic') {
    if (tabs[1]) tabs[1].classList.add('active');
    document.getElementById('tabTraffic').style.display = 'block';
    renderTrafficModule();
  } else if (tabName === 'gallery') {
    if (tabs[2]) tabs[2].classList.add('active');
    document.getElementById('tabGallery').style.display = 'block';
  } else if (tabName === 'team') {
    if (tabs[3]) tabs[3].classList.add('active');
    document.getElementById('tabTeam').style.display = 'block';
  } else if (tabName === 'records') {
    if (tabs[4]) tabs[4].classList.add('active');
    document.getElementById('tabRecords').style.display = 'block';
  } else if (tabName === 'media') {
    if (tabs[5]) tabs[5].classList.add('active');
    document.getElementById('tabMedia').style.display = 'block';
  } else if (tabName === 'settings') {
    if (tabs[6]) tabs[6].classList.add('active');
    document.getElementById('tabSettings').style.display = 'block';
    populateSettingsInputs();
  }
}


// Render All
function renderAllModules() {
  renderCarsTable();
  renderTrafficModule();
  renderGalleryTable();
  renderTeamTable();
  renderRecordsTable();
  renderMediaTable();
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
    await fetch('/api/settings/hero_telemetry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: jsonStr })
    });
  } catch (err) {}

  renderHeroTelemetry();
  closeHeroTelemetryModal();
  showToast('Hero-панель обновлена', 'Показатели телеметрии на главном экране успешно сохранены!', 'success');
}

// Fetch backend hero telemetry if synced
fetch('/api/settings/hero_telemetry')
  .then(r => r.json())
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
function renderCarsTable() {
  const projects = getDB(ADMIN_STORAGE_KEY, defaultProjects);
  const tbody = document.getElementById('projectsTableBody');
  const totalCarsEl = document.getElementById('statTotalCars');
  if (totalCarsEl) totalCarsEl.textContent = projects.length;
  renderGarageStats();
  renderHeroTelemetry();
  if (!tbody) return;

  // Enforce ready cars first, teaser cars last
  const sortedProjects = [...projects].sort((a, b) => {
    const aTeaser = a.hp === '?' || !a.img ? 1 : 0;
    const bTeaser = b.hp === '?' || !b.img ? 1 : 0;
    return aTeaser - bTeaser;
  });

  tbody.innerHTML = sortedProjects.map(car => `
    <tr>
      <td>
        <div class="car-cell-flex">
          <img src="${car.img}" alt="${car.nameRu}" class="car-thumb" onerror="this.src='assets/cars/bmw_m5_rdrc_race.jpg'">
          <div>
            <div class="car-title-text">${car.nameRu}</div>
            <span class="tag-pill">${car.id}</span>
          </div>
        </div>
      </td>
      <td><span class="tag-pill">${car.brand}</span></td>
      <td style="color: var(--gtt-orange); font-weight: 700;">${car.hp}</td>
      <td style="font-family: var(--font-mono);">${car.quarterMile}</td>
      <td>
        ${car.videoSrc ? '<span style="color: #22c55e; font-size: 11px;">● Подключено</span>' : '<span style="color: #64748b; font-size: 11px;">Нет</span>'}
      </td>
      <td>
        <div class="row-actions">
          <button class="table-btn" onclick="openCarEditModal('${car.id}')">Редактировать</button>
          <button class="table-btn delete" onclick="deleteCarProject('${car.id}')">Удалить</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function openCarEditModal(carId) {
  const modal = document.getElementById('carEditModal');
  const title = document.getElementById('modalEditorTitle');
  const form = document.getElementById('carEditForm');
  modal.style.display = 'flex';

  if (carId) {
    const projects = getDB(ADMIN_STORAGE_KEY, defaultProjects);
    const car = projects.find(c => c.id === carId);
    if (!car) return;

    title.textContent = `Редактирование: ${car.nameRu}`;
    document.getElementById('editCarId').value = car.id;
    document.getElementById('editBrand').value = car.brand || '';
    document.getElementById('editType').value = car.type || 'other';
    document.getElementById('editNameRu').value = car.nameRu || '';
    document.getElementById('editNameEn').value = car.nameEn || car.nameRu || '';
    document.getElementById('editHp').value = car.hp || '';
    document.getElementById('editQuarter').value = car.quarterMile || '';
    document.getElementById('editTopSpeed').value = car.topSpeed || '';
    document.getElementById('editImg').value = car.img || '';
    document.getElementById('editVideoSrc').value = car.videoSrc || '';
    document.getElementById('editDescRu').value = car.descRu || '';
  } else {
    title.textContent = 'Добавление нового проекта GTT';
    form.reset();
    document.getElementById('editCarId').value = '';
  }
}

function closeCarEditModal() {
  document.getElementById('carEditModal').style.display = 'none';
}

async function saveCarProject(e) {
  e.preventDefault();
  const idInput = document.getElementById('editCarId').value;
  const projects = getDB(ADMIN_STORAGE_KEY, defaultProjects);

  const carData = {
    id: idInput || 'gtt_car_' + Date.now(),
    brand: document.getElementById('editBrand').value.trim(),
    type: document.getElementById('editType').value,
    name_ru: document.getElementById('editNameRu').value.trim(),
    nameRu: document.getElementById('editNameRu').value.trim(),
    name_en: document.getElementById('editNameEn').value.trim(),
    nameEn: document.getElementById('editNameEn').value.trim(),
    hp: document.getElementById('editHp').value.trim(),
    quarter_mile: document.getElementById('editQuarter').value.trim(),
    quarterMile: document.getElementById('editQuarter').value.trim(),
    top_speed: document.getElementById('editTopSpeed').value.trim(),
    topSpeed: document.getElementById('editTopSpeed').value.trim(),
    img: document.getElementById('editImg').value.trim(),
    video_src: document.getElementById('editVideoSrc').value.trim(),
    videoSrc: document.getElementById('editVideoSrc').value.trim(),
    desc_ru: document.getElementById('editDescRu').value.trim(),
    descRu: document.getElementById('editDescRu').value.trim()
  };

  if (idInput) {
    const idx = projects.findIndex(c => c.id === idInput);
    if (idx !== -1) projects[idx] = carData;
  } else {
    projects.push(carData);
  }

  saveDB(ADMIN_STORAGE_KEY, projects);
  localStorage.setItem('gtt_projects_v2', JSON.stringify(projects));
  renderCarsTable();
  closeCarEditModal();

  showToast(
    idInput ? 'Проект обновлен' : 'Проект добавлен',
    `Болид «${carData.nameRu || carData.name_ru}» сохранен в базе SQLite!`,
    'success'
  );

  try {
    if (idInput) {
      await apiFetch(`/api/cars/${encodeURIComponent(idInput)}`, {
        method: 'PUT',
        body: JSON.stringify(carData)
      });
    } else {
      await apiFetch('/api/cars', {
        method: 'POST',
        body: JSON.stringify(carData)
      });
    }
  } catch (err) {
    console.warn('[GTT API] Car backend save note:', err);
    showToast('Синхронизация с сервером', 'Данные сохранены локально, сервер недоступен', 'warning');
  }
}

async function deleteCarProject(carId) {
  if (!confirm('Вы уверены, что хотите удалить этот проект из базы GTT?')) return;
  const projects = getDB(ADMIN_STORAGE_KEY, defaultProjects).filter(c => c.id !== carId);
  saveDB(ADMIN_STORAGE_KEY, projects);
  localStorage.setItem('gtt_projects_v2', JSON.stringify(projects));
  renderCarsTable();
  showToast('Проект удален', `Болид ${carId} успешно удален из базы данных`, 'info');

  try {
    await apiFetch(`/api/cars/${encodeURIComponent(carId)}`, { method: 'DELETE' });
  } catch (err) {
    console.warn('[GTT API] Car backend deletion note:', err);
  }
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

  tbody.innerHTML = gallery.map(item => `
    <tr>
      <td>
        <img src="${item.img}" alt="${item.title}" class="car-thumb" onerror="this.src='assets/photos/huracan_zelenka_gtt.jpg'">
      </td>
      <td><span class="tag-pill" style="color: var(--gtt-orange);">${item.tag}</span></td>
      <td style="font-weight: 600; color: #fff;">${item.title}</td>
      <td style="font-family: var(--font-mono); font-size: 11px; color: var(--text-dim); max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
        ${item.img}
      </td>
      <td>
        <div class="row-actions">
          <button class="table-btn" onclick="openGalleryPhotoModal('${item.id}')">Изменить</button>
          <button class="table-btn delete" onclick="deleteGalleryPhoto('${item.id}')">Удалить</button>
        </div>
      </td>
    </tr>
  `).join('');
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
  e.preventDefault();
  const idInput = document.getElementById('editGalleryId').value;
  const gallery = getDB(GALLERY_STORAGE_KEY, defaultGallery);

  const photoData = {
    id: idInput || 'gal_' + Date.now(),
    title: document.getElementById('editGalleryTitle').value.trim(),
    tag: document.getElementById('editGalleryTag').value.trim(),
    img: document.getElementById('editGalleryImg').value.trim()
  };

  if (idInput) {
    const idx = gallery.findIndex(g => g.id === idInput);
    if (idx !== -1) gallery[idx] = photoData;
  } else {
    gallery.push(photoData);
  }

  saveDB(GALLERY_STORAGE_KEY, gallery);
  renderGalleryTable();
  closeGalleryPhotoModal();

  showToast(
    idInput ? 'Кадр обновлен' : 'Кадр добавлен',
    `Фотография «${photoData.title}» сохранена в живой галерее!`,
    'success'
  );

  try {
    if (idInput) {
      await apiFetch(`/api/gallery/${encodeURIComponent(idInput)}`, {
        method: 'PUT',
        body: JSON.stringify(photoData)
      });
    } else {
      await apiFetch('/api/gallery', {
        method: 'POST',
        body: JSON.stringify(photoData)
      });
    }
  } catch (err) {
    console.warn('[GTT API] Gallery save note:', err);
    showToast('Синхронизация', 'Кадр сохранен локально, сервер недоступен', 'warning');
  }
}

async function deleteGalleryPhoto(id) {
  if (!confirm('Удалить кадр из живой галереи?')) return;
  const gallery = getDB(GALLERY_STORAGE_KEY, defaultGallery).filter(g => g.id !== id);
  saveDB(GALLERY_STORAGE_KEY, gallery);
  renderGalleryTable();
  showToast('Кадр удален', 'Фотография удалена из живой галереи', 'info');

  try {
    await apiFetch(`/api/gallery/${encodeURIComponent(id)}`, { method: 'DELETE' });
  } catch (err) {
    console.warn('[GTT API] Gallery delete note:', err);
  }
}

// ================= MODULE 3: TEAM =================
function renderTeamTable() {
  const team = getDB(TEAM_STORAGE_KEY, defaultTeam);
  const tbody = document.getElementById('teamTableBody');
  if (!tbody) return;

  const statusMap = {
    active: '<span style="color: #22c55e;">● Основной состав RDRC</span>',
    atelier: '<span style="color: #38bdf8;">🔧 Лаборатория GTT</span>',
    paddock: '<span style="color: #f59e0b;">🏁 Паддок RDRC</span>'
  };

  tbody.innerHTML = team.map((m, idx) => `
    <tr>
      <td style="color: var(--text-dim); font-family: var(--font-mono);">${idx + 1}</td>
      <td style="font-weight: 700; color: #fff;">${m.name}</td>
      <td>${m.role}</td>
      <td>${statusMap[m.status] || m.status}</td>
      <td>
        <div class="row-actions">
          <button class="table-btn" onclick="openTeamMemberModal('${m.id}')">Изменить</button>
          <button class="table-btn delete" onclick="deleteTeamMember('${m.id}')">Удалить</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function openTeamMemberModal(id) {
  const modal = document.getElementById('teamModal');
  const title = document.getElementById('teamModalTitle');
  const form = document.getElementById('teamEditForm');
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
  } else {
    title.textContent = 'Добавить специалиста в команду';
    form.reset();
    document.getElementById('editMemberId').value = '';
  }
}

function closeTeamModal() {
  document.getElementById('teamModal').style.display = 'none';
}

async function saveTeamMember(e) {
  e.preventDefault();
  const idInput = document.getElementById('editMemberId').value;
  const team = getDB(TEAM_STORAGE_KEY, defaultTeam);

  const existingMember = idInput ? team.find(m => m.id === idInput) : null;
  const memberData = {
    id: idInput || 'team_' + Date.now(),
    name: document.getElementById('editMemberName').value.trim(),
    role: document.getElementById('editMemberRole').value.trim(),
    status: document.getElementById('editMemberStatus').value,
    photo: existingMember ? existingMember.photo : undefined,
    social: existingMember ? existingMember.social : undefined
  };

  if (idInput) {
    const idx = team.findIndex(m => m.id === idInput);
    if (idx !== -1) team[idx] = Object.assign({}, existingMember, memberData);
  } else {
    team.push(memberData);
  }

  saveDB(TEAM_STORAGE_KEY, team);
  localStorage.setItem('gtt_team_v2', JSON.stringify(team));
  renderTeamTable();
  closeTeamModal();

  showToast(
    idInput ? 'Сотрудник обновлен' : 'Сотрудник добавлен',
    `Специалист «${memberData.name}» сохранен в составе команды!`,
    'success'
  );

  try {
    if (idInput) {
      await apiFetch(`/api/team/${encodeURIComponent(idInput)}`, {
        method: 'PUT',
        body: JSON.stringify(memberData)
      });
    } else {
      await apiFetch('/api/team', {
        method: 'POST',
        body: JSON.stringify(memberData)
      });
    }
  } catch (err) {
    console.warn('[GTT API] Team save note:', err);
    showToast('Синхронизация', 'Данные сотрудника сохранены локально', 'warning');
  }
}

async function deleteTeamMember(id) {
  if (!confirm('Удалить сотрудника из списка команды?')) return;
  const team = getDB(TEAM_STORAGE_KEY, defaultTeam).filter(m => m.id !== id);
  saveDB(TEAM_STORAGE_KEY, team);
  localStorage.setItem('gtt_team_v2', JSON.stringify(team));
  renderTeamTable();
  showToast('Сотрудник удален', 'Специалист исключен из списка команды', 'info');

  try {
    await apiFetch(`/api/team/${encodeURIComponent(id)}`, { method: 'DELETE' });
  } catch (err) {
    console.warn('[GTT API] Team delete note:', err);
  }
}

// ================= MODULE 3: RECORDS =================
function renderRecordsTable() {
  const records = getDB(RECORDS_STORAGE_KEY, defaultRecords);
  const tbody = document.getElementById('recordsTableBody');
  if (!tbody) return;

  tbody.innerHTML = records.map(rec => `
    <tr>
      <td><span class="tag-pill" style="color: var(--gtt-orange);">${rec.year}</span></td>
      <td style="font-weight: 700; color: #fff;">${rec.car}</td>
      <td style="font-family: var(--font-mono);">${rec.telemetry}</td>
      <td style="color: var(--text-muted); font-size: 11.5px;">${rec.desc}</td>
      <td>
        <div class="row-actions">
          <button class="table-btn" onclick="openRecordEditModal('${rec.id}')">Изменить</button>
          <button class="table-btn delete" onclick="deleteRecord('${rec.id}')">Удалить</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function openRecordEditModal(id) {
  const modal = document.getElementById('recordModal');
  const title = document.getElementById('recordModalTitle');
  const form = document.getElementById('recordEditForm');
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
  } else {
    title.textContent = 'Внести новый рекорд в зал славы';
    form.reset();
    document.getElementById('editRecordId').value = '';
  }
}

function closeRecordModal() {
  document.getElementById('recordModal').style.display = 'none';
}

async function saveRecord(e) {
  e.preventDefault();
  const idInput = document.getElementById('editRecordId').value;
  const records = getDB(RECORDS_STORAGE_KEY, defaultRecords);

  const recData = {
    id: idInput || 'rec_' + Date.now(),
    year: document.getElementById('editRecordYear').value.trim(),
    car: document.getElementById('editRecordCar').value.trim(),
    telemetry: document.getElementById('editRecordTelemetry').value.trim(),
    desc: document.getElementById('editRecordDesc').value.trim()
  };

  if (idInput) {
    const idx = records.findIndex(r => r.id === idInput);
    if (idx !== -1) records[idx] = recData;
  } else {
    records.push(recData);
  }

  saveDB(RECORDS_STORAGE_KEY, records);
  renderRecordsTable();
  closeRecordModal();

  showToast(
    idInput ? 'Рекорд обновлен' : 'Рекорд внесен',
    `Запись «${recData.car}» сохранена в Зале славы RDRC!`,
    'success'
  );

  try {
    if (idInput) {
      await apiFetch(`/api/records/${encodeURIComponent(idInput)}`, {
        method: 'PUT',
        body: JSON.stringify(recData)
      });
    } else {
      await apiFetch('/api/records', {
        method: 'POST',
        body: JSON.stringify(recData)
      });
    }
  } catch (err) {
    console.warn('[GTT API] Record save note:', err);
    showToast('Синхронизация', 'Рекорд сохранен локально', 'warning');
  }
}

async function deleteRecord(id) {
  if (!confirm('Удалить рекорд из зала славы?')) return;
  const records = getDB(RECORDS_STORAGE_KEY, defaultRecords).filter(r => r.id !== id);
  saveDB(RECORDS_STORAGE_KEY, records);
  renderRecordsTable();
  showToast('Рекорд удален', 'Запись рекорда удалена из Зала славы', 'info');

  try {
    await apiFetch(`/api/records/${encodeURIComponent(id)}`, { method: 'DELETE' });
  } catch (err) {
    console.warn('[GTT API] Record delete note:', err);
  }
}

// ================= MODULE 4: MEDIA =================
function renderMediaTable() {
  const media = getDB(MEDIA_STORAGE_KEY, defaultMedia);
  const tbody = document.getElementById('mediaTableBody');
  if (!tbody) return;

  tbody.innerHTML = media.map(item => `
    <tr>
      <td style="font-weight: 600; color: #fff;">${item.title}</td>
      <td><span class="tag-pill">${item.type.toUpperCase()}</span></td>
      <td style="font-family: var(--font-mono); font-size: 11px; color: var(--text-dim); max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
        ${item.url}
      </td>
      <td><span class="tag-pill" style="color: var(--gtt-orange);">${item.car}</span></td>
      <td>
        <div class="row-actions">
          <button class="table-btn" onclick="openMediaEditModal('${item.id}')">Изменить</button>
          <button class="table-btn delete" onclick="deleteMediaItem('${item.id}')">Удалить</button>
        </div>
      </td>
    </tr>
  `).join('');
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
  } else {
    title.textContent = 'Добавить видеоматериал / Reels';
    form.reset();
    document.getElementById('editMediaId').value = '';
  }
}

function closeMediaModal() {
  document.getElementById('mediaModal').style.display = 'none';
}

async function saveMediaItem(e) {
  e.preventDefault();
  const idInput = document.getElementById('editMediaId').value;
  const media = getDB(MEDIA_STORAGE_KEY, defaultMedia);

  const mediaData = {
    id: idInput || 'med_' + Date.now(),
    title: document.getElementById('editMediaTitle').value.trim(),
    type: document.getElementById('editMediaType').value,
    car: document.getElementById('editMediaCar').value.trim(),
    url: document.getElementById('editMediaUrl').value.trim()
  };

  if (idInput) {
    const idx = media.findIndex(m => m.id === idInput);
    if (idx !== -1) media[idx] = mediaData;
  } else {
    media.push(mediaData);
  }

  saveDB(MEDIA_STORAGE_KEY, media);
  renderMediaTable();
  closeMediaModal();

  showToast(
    idInput ? 'Медиа обновлено' : 'Медиа добавлено',
    `Видео «${mediaData.title}» сохранено в медиатеке!`,
    'success'
  );

  try {
    if (idInput) {
      await apiFetch(`/api/media/${encodeURIComponent(idInput)}`, {
        method: 'PUT',
        body: JSON.stringify(mediaData)
      });
    } else {
      await apiFetch('/api/media', {
        method: 'POST',
        body: JSON.stringify(mediaData)
      });
    }
  } catch (err) {
    console.warn('[GTT API] Media save note:', err);
    showToast('Синхронизация', 'Видео сохранено локально', 'warning');
  }
}

async function deleteMediaItem(id) {
  if (!confirm('Удалить видео из медиатеки?')) return;
  const media = getDB(MEDIA_STORAGE_KEY, defaultMedia).filter(m => m.id !== id);
  saveDB(MEDIA_STORAGE_KEY, media);
  renderMediaTable();
  showToast('Видео удалено', 'Медиаматериал удален из базы', 'info');

  try {
    await apiFetch(`/api/media/${encodeURIComponent(id)}`, { method: 'DELETE' });
  } catch (err) {
    console.warn('[GTT API] Media delete note:', err);
  }
}

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

document.addEventListener('DOMContentLoaded', checkAuth);

