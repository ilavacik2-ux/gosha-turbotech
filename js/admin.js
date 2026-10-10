// GOSHA TURBOTECH - Admin Dashboard Multi-Module Engine
// Cars, Team Crew, Records Telemetry & Media Reels

const ADMIN_STORAGE_KEY = 'gtt_admin_cars_db';
const GALLERY_STORAGE_KEY = 'gtt_admin_gallery_db';
const TEAM_STORAGE_KEY = 'gtt_admin_team_db';
const RECORDS_STORAGE_KEY = 'gtt_admin_records_db';
const MEDIA_STORAGE_KEY = 'gtt_admin_media_db';
const AUTH_KEY = 'gtt_admin_authenticated';
const DEFAULT_ACCESS_PIN = 'gtt71'; // Default pin

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
    descRu: 'Победоносный огненный болид Георгия Зурабовича Перцхелия (Гоши), борт №71. Построенный в лаборатории GoshaTurboTech драг-монстр в культовой ливрее адского пламени.'
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
  { id: 'gal_8', tag: 'CHIEF MOTORSPORT ENGINEER', title: 'Георгий Перцхелия на стрипе RDRC', img: 'assets/photos/gosha_on_track.jpg' },
  { id: 'gal_9', tag: 'ATELIER GARAGE', title: 'Бокс GTT: BMW M4 G82 & GT-R', img: 'assets/cars/bmw_m4_g82_gtt.jpg' },
  { id: 'gal_10', tag: 'TWIN TURBO V8', title: 'BMW M5 G90 Stage 2 GTT', img: 'assets/cars/bmw_m5_rdrc_race.jpg' },
  { id: 'gal_11', tag: 'BEZZUBIK TT', title: 'Huracan Twin Turbo «Беззубик»', img: 'assets/cars/huracan_green_bezzubik_track.jpg' }
];

// Helpers for LocalStorage
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

// Authentication
function checkAuth() {
  const isAuth = sessionStorage.getItem(AUTH_KEY) === 'true' || localStorage.getItem(AUTH_KEY) === 'true';
  const loginScreen = document.getElementById('loginScreen');
  const dashboardScreen = document.getElementById('dashboardScreen');

  if (isAuth) {
    loginScreen.style.display = 'none';
    dashboardScreen.style.display = 'block';
    renderAllModules();
  } else {
    loginScreen.style.display = 'flex';
    dashboardScreen.style.display = 'none';
  }
}

function handleAdminLogin(e) {
  if (e && e.preventDefault) e.preventDefault();
  const inputEl = document.getElementById('adminPass');
  const input = (inputEl ? inputEl.value : '').trim().toLowerCase();
  const errorEl = document.getElementById('authError');

  // Accepted passwords: gtt71, gosha, gtt, 71
  if (input === 'gtt71' || input === 'gosha' || input === 'gtt' || input === '71') {
    sessionStorage.setItem(AUTH_KEY, 'true');
    localStorage.setItem(AUTH_KEY, 'true'); // Dual storage for 100% persistence across tabs
    if (errorEl) errorEl.style.display = 'none';
    checkAuth();
  } else {
    if (errorEl) {
      errorEl.style.display = 'block';
    }
    if (inputEl) {
      inputEl.value = '';
      inputEl.focus();
    }
  }
}

function handleAdminLogout() {
  sessionStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(AUTH_KEY);
  checkAuth();
}

// Tabs Switcher
function switchAdminTab(tabName) {
  document.querySelectorAll('.admin-tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.admin-tab-content').forEach(c => c.style.display = 'none');

  if (tabName === 'cars') {
    document.querySelectorAll('.admin-tab-btn')[0].classList.add('active');
    document.getElementById('tabCars').style.display = 'block';
  } else if (tabName === 'gallery') {
    document.querySelectorAll('.admin-tab-btn')[1].classList.add('active');
    document.getElementById('tabGallery').style.display = 'block';
  } else if (tabName === 'team') {
    document.querySelectorAll('.admin-tab-btn')[2].classList.add('active');
    document.getElementById('tabTeam').style.display = 'block';
  } else if (tabName === 'records') {
    document.querySelectorAll('.admin-tab-btn')[3].classList.add('active');
    document.getElementById('tabRecords').style.display = 'block';
  } else if (tabName === 'media') {
    document.querySelectorAll('.admin-tab-btn')[4].classList.add('active');
    document.getElementById('tabMedia').style.display = 'block';
  }
}

// Render All
function renderAllModules() {
  renderCarsTable();
  renderGalleryTable();
  renderTeamTable();
  renderRecordsTable();
  renderMediaTable();
}

// ================= MODULE 1: CARS =================
function renderCarsTable() {
  const projects = getDB(ADMIN_STORAGE_KEY, defaultProjects);
  const tbody = document.getElementById('projectsTableBody');
  const totalCarsEl = document.getElementById('statTotalCars');
  if (totalCarsEl) totalCarsEl.textContent = projects.length;
  if (!tbody) return;

  tbody.innerHTML = projects.map(car => `
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

function saveCarProject(e) {
  e.preventDefault();
  const idInput = document.getElementById('editCarId').value;
  const projects = getDB(ADMIN_STORAGE_KEY, defaultProjects);

  const carData = {
    id: idInput || 'gtt_car_' + Date.now(),
    brand: document.getElementById('editBrand').value.trim(),
    type: document.getElementById('editType').value,
    nameRu: document.getElementById('editNameRu').value.trim(),
    nameEn: document.getElementById('editNameEn').value.trim(),
    hp: document.getElementById('editHp').value.trim(),
    quarterMile: document.getElementById('editQuarter').value.trim(),
    topSpeed: document.getElementById('editTopSpeed').value.trim(),
    img: document.getElementById('editImg').value.trim(),
    videoSrc: document.getElementById('editVideoSrc').value.trim(),
    descRu: document.getElementById('editDescRu').value.trim()
  };

  if (idInput) {
    const idx = projects.findIndex(c => c.id === idInput);
    if (idx !== -1) projects[idx] = carData;
  } else {
    projects.push(carData);
  }

  saveDB(ADMIN_STORAGE_KEY, projects);
  renderCarsTable();
  closeCarEditModal();
}

function deleteCarProject(carId) {
  if (!confirm('Вы уверены, что хотите удалить этот проект из базы GTT?')) return;
  const projects = getDB(ADMIN_STORAGE_KEY, defaultProjects).filter(c => c.id !== carId);
  saveDB(ADMIN_STORAGE_KEY, projects);
  renderCarsTable();
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

function saveGalleryPhoto(e) {
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
}

function deleteGalleryPhoto(id) {
  if (!confirm('Удалить кадр из живой галереи?')) return;
  const gallery = getDB(GALLERY_STORAGE_KEY, defaultGallery).filter(g => g.id !== id);
  saveDB(GALLERY_STORAGE_KEY, gallery);
  renderGalleryTable();
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

function saveTeamMember(e) {
  e.preventDefault();
  const idInput = document.getElementById('editMemberId').value;
  const team = getDB(TEAM_STORAGE_KEY, defaultTeam);

  const memberData = {
    id: idInput || 'team_' + Date.now(),
    name: document.getElementById('editMemberName').value.trim(),
    role: document.getElementById('editMemberRole').value.trim(),
    status: document.getElementById('editMemberStatus').value
  };

  if (idInput) {
    const idx = team.findIndex(m => m.id === idInput);
    if (idx !== -1) team[idx] = memberData;
  } else {
    team.push(memberData);
  }

  saveDB(TEAM_STORAGE_KEY, team);
  renderTeamTable();
  closeTeamModal();
}

function deleteTeamMember(id) {
  if (!confirm('Удалить сотрудника из списка команды?')) return;
  const team = getDB(TEAM_STORAGE_KEY, defaultTeam).filter(m => m.id !== id);
  saveDB(TEAM_STORAGE_KEY, team);
  renderTeamTable();
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

function saveRecord(e) {
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
}

function deleteRecord(id) {
  if (!confirm('Удалить рекорд из зала славы?')) return;
  const records = getDB(RECORDS_STORAGE_KEY, defaultRecords).filter(r => r.id !== id);
  saveDB(RECORDS_STORAGE_KEY, records);
  renderRecordsTable();
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

function saveMediaItem(e) {
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
}

function deleteMediaItem(id) {
  if (!confirm('Удалить видео из медиатеки?')) return;
  const media = getDB(MEDIA_STORAGE_KEY, defaultMedia).filter(m => m.id !== id);
  saveDB(MEDIA_STORAGE_KEY, media);
  renderMediaTable();
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

window.exportDataJSON = exportDataJSON;

document.addEventListener('DOMContentLoaded', checkAuth);
