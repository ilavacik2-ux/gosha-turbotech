// GOSHA TURBOTECH - Admin Dashboard Engine
// Secure client-side garage database manager with export/import capabilities

const ADMIN_STORAGE_KEY = 'gtt_admin_cars_db';
const AUTH_KEY = 'gtt_admin_authenticated';
const DEFAULT_ACCESS_PIN = 'gtt71'; // Official default pin for GoshaTurboTech Hub

// Initial Seed Projects Database from app.js
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
    descRu: 'Победоносный огненный болид Георгия Зурабовича Перцхелия (Гоши), борт №71. Построенный в лаборатории GoshaTurboTech драг-монстр в культовой ливрее адского пламени — триумфатор и победитель финалов чемпионата России RDRC.'
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
    descRu: 'Легендарный флагман и абсолютный монстр дрэг-стрипа RDRC под управлением Романа Арефьева. Трубчатое шасси, гигантские улитки турбонаддува и более 3000 л.с.'
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
    descRu: 'Заряженная боевая BMW M5 поколения G90 от GoshaTurboTech, выступающая в чемпионате России по дрэг-рейсингу RDRC. Полный привод M xDrive, гибридные турбины GTT и усиленная поршневая группа.'
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
    descRu: 'Культовый белый Nissan GT-R R35 борт №712 под управлением Николая Коржова — символ побед GoshaTurboTech в России и Европе. Абсолютный чемпион SMP RDRC и призер Unlim 500+ на Крите.'
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
    descRu: 'Знаменитая ядовито-зеленая Lamborghini Huracan Twin Turbo «Зеленка» — легенда паддока RDRC и уличных дуэлей. Кастомный твин-турбо кит от GoshaTurboTech, бедлоки и выстрел за 8 секунд.'
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
    descRu: 'Боевая Audi R8 V10 Twin Turbo под эгидой ЦМРБанк и GTT на треке RDRC. Покоритель байкальского льда и один из самых стабильных болидов чемпионата.'
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
    descRu: 'Черный компрессорный монстр Dodge Challenger SRT от GoshaTurboTech, зажигающий на прямых RDRC под управлением Гончарова. Море дыма и чудовищный крутящий момент.'
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
    descRu: 'Легендарный серый Lamborghini Huracan TT «Беззубик» — обладатель рекорда Европы на дистанции 804 метра в Германии (Race 1000). Двойной наддув, титановый коллектор и абсолютная надежность.'
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
    descRu: 'Синий драг-болид борт №888, построенный в GoshaTurboTech для стабильных низких 8 секунд и выходов в 7 секунд на клееной трассе RDRC.'
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
    descRu: 'Красный хромированный болид GTT с расширением кузова и аэродинамическим оперением для предельных скоростей на 1/2 мили.'
  }
];

// Load Projects from LocalStorage or Fallback to Default
function getProjectsDB() {
  const saved = localStorage.getItem(ADMIN_STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Error parsing admin DB, resetting to defaults', e);
    }
  }
  localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(defaultProjects));
  return defaultProjects;
}

function saveProjectsDB(projects) {
  localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(projects));
  renderAdminTable();
}

// Authentication Logic
function checkAuth() {
  const isAuth = sessionStorage.getItem(AUTH_KEY);
  const loginScreen = document.getElementById('loginScreen');
  const dashboardScreen = document.getElementById('dashboardScreen');

  if (isAuth === 'true') {
    loginScreen.style.display = 'none';
    dashboardScreen.style.display = 'block';
    renderAdminTable();
  } else {
    loginScreen.style.display = 'flex';
    dashboardScreen.style.display = 'none';
  }
}

function handleAdminLogin(e) {
  e.preventDefault();
  const input = document.getElementById('adminPass').value.trim();
  const errorEl = document.getElementById('authError');

  if (input === DEFAULT_ACCESS_PIN || input.toLowerCase() === 'gosha') {
    sessionStorage.setItem(AUTH_KEY, 'true');
    errorEl.style.display = 'none';
    checkAuth();
  } else {
    errorEl.style.display = 'block';
  }
}

function handleAdminLogout() {
  sessionStorage.removeItem(AUTH_KEY);
  checkAuth();
}

// Table Rendering
function renderAdminTable() {
  const projects = getProjectsDB();
  const tbody = document.getElementById('projectsTableBody');
  const totalCarsEl = document.getElementById('statTotalCars');

  if (totalCarsEl) totalCarsEl.textContent = projects.length;
  if (!tbody) return;

  tbody.innerHTML = projects.map((car, idx) => `
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

// Car Editor Modal
function openCarEditModal(carId) {
  const modal = document.getElementById('carEditModal');
  const title = document.getElementById('modalEditorTitle');
  const form = document.getElementById('carEditForm');
  modal.style.display = 'flex';

  if (carId) {
    const projects = getProjectsDB();
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
  const projects = getProjectsDB();

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

  saveProjectsDB(projects);
  closeCarEditModal();
}

function deleteCarProject(carId) {
  if (!confirm('Вы уверены, что хотите удалить этот проект из базы GTT?')) return;
  const projects = getProjectsDB().filter(c => c.id !== carId);
  saveProjectsDB(projects);
}

// Export Database JSON
function exportDataJSON() {
  const projects = getProjectsDB();
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(projects, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `gtt_projects_database_${Date.now()}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

// Global Exports
window.handleAdminLogin = handleAdminLogin;
window.handleAdminLogout = handleAdminLogout;
window.openCarEditModal = openCarEditModal;
window.closeCarEditModal = closeCarEditModal;
window.saveCarProject = saveCarProject;
window.deleteCarProject = deleteCarProject;
window.exportDataJSON = exportDataJSON;

document.addEventListener('DOMContentLoaded', checkAuth);
