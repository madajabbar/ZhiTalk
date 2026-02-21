// ===== ZhiTalk Web — app.js =====
// Vanilla SPA with hash-based routing, demo data, and interactive features

// ────────────────────── DEMO DATA ──────────────────────
const USER = {
  name: 'Budi Santoso',
  level: 3,
  xp: 2450,
  streak: 15,
  league: 'SILVER LEAGUE',
  avatar: '🐼',
};

const LEVELS = [
  {
    id: 'dasar-1',
    title: 'Dasar 1',
    icon: 'translate',
    progress: '8/10',
    style: 'red',
    isCurrent: true,
    offset: 0,
    lessons: [
      {
        id: 'L1_1',
        title: 'Salam & Sapaan',
        description: 'Pelajari cara menyapa dan memperkenalkan diri dalam Bahasa Mandarin.',
        vocabularies: [
          { hanzi: '你好', pinyin: 'nǐ hǎo', meaning: 'Halo', example: '你好，我是小明。', exampleMeaning: 'Halo, saya Xiaoming.' },
          { hanzi: '谢谢', pinyin: 'xiè xie', meaning: 'Terima kasih', example: '谢谢你的帮助。', exampleMeaning: 'Terima kasih atas bantuanmu.' },
          { hanzi: '再见', pinyin: 'zài jiàn', meaning: 'Sampai jumpa', example: '明天见，再见！', exampleMeaning: 'Sampai besok, sampai jumpa!' },
          { hanzi: '早上好', pinyin: 'zǎo shang hǎo', meaning: 'Selamat pagi', example: '早上好，老师！', exampleMeaning: 'Selamat pagi, guru!' },
          { hanzi: '晚上好', pinyin: 'wǎn shang hǎo', meaning: 'Selamat malam', example: '晚上好，妈妈。', exampleMeaning: 'Selamat malam, mama.' },
          { hanzi: '对不起', pinyin: 'duì bu qǐ', meaning: 'Maaf', example: '对不起，我迟到了。', exampleMeaning: 'Maaf, saya terlambat.' },
        ],
        quiz: [
          { question: '你好 artinya apa?', options: ['Selamat tinggal', 'Halo', 'Terima kasih', 'Maaf'], correct: 1, explanation: '你好 (nǐ hǎo) adalah sapaan paling umum dalam Bahasa Mandarin.' },
          { question: 'Apa pinyin dari 谢谢?', options: ['nǐ hǎo', 'zài jiàn', 'xiè xie', 'duì bu qǐ'], correct: 2, explanation: '谢谢 dibaca xiè xie, artinya terima kasih.' },
          { question: 'Bagaimana mengucapkan "Sampai jumpa"?', pinyin: 'zài jiàn', options: ['你好', '再见', '谢谢', '对不起'], correct: 1, explanation: '再见 (zài jiàn) berarti sampai jumpa.' },
          { question: '"Selamat pagi" dalam Mandarin adalah...', options: ['晚上好', '早上好', '你好', '再见'], correct: 1, explanation: '早上好 (zǎo shang hǎo) digunakan di pagi hari.' },
          { question: 'Apa arti 对不起?', options: ['Halo', 'Terima kasih', 'Sampai jumpa', 'Maaf'], correct: 3, explanation: '对不起 (duì bu qǐ) berarti maaf, digunakan untuk meminta maaf.' },
        ],
      },
    ],
  },
  {
    id: 'angka',
    title: 'Angka',
    icon: 'pin',
    progress: 'COMPLETED',
    style: 'gold',
    offset: 80,
    lessons: [
      {
        id: 'L2_1',
        title: 'Angka 1-10',
        description: 'Pelajari angka dasar dalam Bahasa Mandarin dari 1 sampai 10.',
        vocabularies: [
          { hanzi: '一', pinyin: 'yī', meaning: 'Satu (1)', example: '我有一个苹果。', exampleMeaning: 'Saya punya satu apel.' },
          { hanzi: '二', pinyin: 'èr', meaning: 'Dua (2)', example: '我有二本书。', exampleMeaning: 'Saya punya dua buku.' },
          { hanzi: '三', pinyin: 'sān', meaning: 'Tiga (3)', example: '三个人来了。', exampleMeaning: 'Tiga orang datang.' },
          { hanzi: '四', pinyin: 'sì', meaning: 'Empat (4)', example: '四季很美。', exampleMeaning: 'Empat musim sangat indah.' },
          { hanzi: '五', pinyin: 'wǔ', meaning: 'Lima (5)', example: '五点钟见。', exampleMeaning: 'Ketemu jam lima.' },
          { hanzi: '十', pinyin: 'shí', meaning: 'Sepuluh (10)', example: '十个学生。', exampleMeaning: 'Sepuluh murid.' },
        ],
        quiz: [
          { question: '三 adalah angka berapa?', options: ['Satu', 'Dua', 'Tiga', 'Empat'], correct: 2, explanation: '三 (sān) berarti tiga.' },
          { question: 'Bagaimana menulis angka 5 dalam Mandarin?', options: ['四', '五', '六', '十'], correct: 1, explanation: '五 (wǔ) adalah angka lima.' },
          { question: 'Apa pinyin dari 十?', options: ['sì', 'wǔ', 'shí', 'yī'], correct: 2, explanation: '十 dibaca shí, artinya sepuluh.' },
        ],
      },
    ],
  },
  {
    id: 'keluarga',
    title: 'Keluarga',
    icon: 'family_restroom',
    progress: 'COMPLETED',
    style: 'gold',
    offset: -80,
    lessons: [
      {
        id: 'L3_1',
        title: 'Anggota Keluarga',
        description: 'Kenali panggilan untuk anggota keluarga dalam Bahasa Mandarin.',
        vocabularies: [
          { hanzi: '妈妈', pinyin: 'mā ma', meaning: 'Ibu / Mama', example: '妈妈做饭很好吃。', exampleMeaning: 'Masakan mama sangat enak.' },
          { hanzi: '爸爸', pinyin: 'bà ba', meaning: 'Ayah / Papa', example: '爸爸去上班了。', exampleMeaning: 'Papa pergi kerja.' },
          { hanzi: '哥哥', pinyin: 'gē ge', meaning: 'Kakak laki-laki', example: '哥哥很高。', exampleMeaning: 'Kakak (laki-laki) sangat tinggi.' },
          { hanzi: '姐姐', pinyin: 'jiě jie', meaning: 'Kakak perempuan', example: '姐姐在上大学。', exampleMeaning: 'Kakak (perempuan) sedang kuliah.' },
          { hanzi: '弟弟', pinyin: 'dì di', meaning: 'Adik laki-laki', example: '弟弟很可爱。', exampleMeaning: 'Adik (laki-laki) sangat lucu.' },
        ],
        quiz: [
          { question: '妈妈 artinya apa?', options: ['Ayah', 'Ibu', 'Kakak', 'Adik'], correct: 1, explanation: '妈妈 (mā ma) berarti ibu atau mama.' },
          { question: 'Siapa yang dipanggil 爸爸?', options: ['Ibu', 'Kakak', 'Ayah', 'Adik'], correct: 2, explanation: '爸爸 (bà ba) berarti ayah atau papa.' },
          { question: '哥哥 adalah...', options: ['Kakak perempuan', 'Adik laki-laki', 'Kakak laki-laki', 'Adik perempuan'], correct: 2, explanation: '哥哥 (gē ge) berarti kakak laki-laki.' },
        ],
      },
    ],
  },
  {
    id: 'restoran',
    title: 'Restoran',
    icon: 'restaurant',
    progress: 'LOCKED',
    style: 'white',
    offset: 0,
    lessons: [],
  },
];

// ────────────────────── STATE ──────────────────────
let currentPage = '';
let quizState = { index: 0, selected: null, answered: false, correct: 0 };
let flashcardState = { index: 0, flipped: false };
let writingState = { index: 0, strokes: [] };

// ────────────────────── ROUTER ──────────────────────
function navigate(route) {
  window.location.hash = route;
}

function getRoute() {
  const hash = window.location.hash.slice(1) || 'login';
  return hash;
}

function handleRoute() {
  const route = getRoute();
  const container = document.getElementById('page-container');
  const bottomNav = document.getElementById('bottom-nav');

  // Determine page
  const parts = route.split('/');
  const page = parts[0];
  const param = parts[1] || null;

  // Show/hide bottom nav & sidebar
  const hasNav = ['home', 'learn', 'progress', 'profile'].includes(page);
  bottomNav.classList.toggle('hidden', !hasNav);
  const sideNav = document.getElementById('side-nav');
  if (sideNav) sideNav.classList.toggle('hidden', !hasNav);

  // Update active nav (both bottom and sidebar)
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.route === page);
  });

  // Render page with animation
  container.classList.add('page-exit');
  setTimeout(() => {
    container.innerHTML = '';
    container.classList.remove('page-exit');

    switch (page) {
      case 'login': container.innerHTML = renderLogin(); break;
      case 'home': container.innerHTML = renderHome(); break;
      case 'learn': container.innerHTML = renderLearn(); break;
      case 'lesson': container.innerHTML = renderLesson(param); break;
      case 'flashcard':
        flashcardState = { index: 0, flipped: false };
        container.innerHTML = renderFlashcard(param);
        break;
      case 'quiz':
        quizState = { index: 0, selected: null, answered: false, correct: 0 };
        container.innerHTML = renderQuiz(param);
        break;
      case 'writing':
        writingState = { index: 0, strokes: [] };
        container.innerHTML = renderWriting(param);
        setTimeout(() => initWritingCanvas(), 50);
        break;
      case 'progress': container.innerHTML = renderProgress(); break;
      case 'profile': container.innerHTML = renderProfile(); break;
      default: container.innerHTML = renderLogin();
    }

    container.classList.add('page-enter');
    setTimeout(() => container.classList.remove('page-enter'), 400);

    currentPage = page;
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, 180);
}

// ────────────────────── HELPERS ──────────────────────
function findLesson(lessonId) {
  for (const level of LEVELS) {
    for (const lesson of level.lessons) {
      if (lesson.id === lessonId) return lesson;
    }
  }
  return null;
}

function icon(name, cls = '') {
  return `<span class="material-icons-round ${cls}">${name}</span>`;
}

// ────────────────────── LOGIN PAGE ──────────────────────
function renderLogin() {
  return `
    <div class="min-h-screen flex items-center justify-center px-6 py-10">
      <div class="w-full max-w-sm mx-auto page-enter">
        <!-- Logo -->
        <div class="flex flex-col items-center mb-8">
          <div class="w-24 h-24 rounded-[24px] bg-white shadow-lg flex items-center justify-center text-5xl mb-6 border border-white/60"
               style="box-shadow: 0 6px 0 #D5D5D5, 0 8px 20px rgba(0,0,0,0.08);">
            🐼
          </div>
          <h1 class="text-4xl sm:text-5xl font-black text-zh-red tracking-tight">ZhiTalk</h1>
          <p class="text-zh-text-sec text-sm sm:text-base font-semibold mt-2">Belajar Mandarin Jadi Seru!</p>
        </div>

        <!-- Login Card -->
        <div class="glass-card p-8">
          <h2 class="text-xl font-black text-center text-zh-text mb-8">Selamat Datang Kembali</h2>

          <label class="block mb-1.5 text-xs font-bold text-zh-text-sec tracking-wide">EMAIL</label>
          <div class="flex items-center gap-3 bg-zh-bg border border-zh-border rounded-xl px-4 py-3.5 mb-5 focus-within:border-zh-red transition-colors">
            ${icon('email', 'text-zh-text-sec text-xl')}
            <input type="email" placeholder="nama@email.com" 
                   class="w-full bg-transparent outline-none text-sm text-zh-text placeholder:text-zh-text-sec/60" id="login-email">
          </div>

          <label class="block mb-1.5 text-xs font-bold text-zh-text-sec tracking-wide">PASSWORD</label>
          <div class="flex items-center gap-3 bg-zh-bg border border-zh-border rounded-xl px-4 py-3.5 mb-8 focus-within:border-zh-red transition-colors">
            ${icon('lock', 'text-zh-text-sec text-xl')}
            <input type="password" placeholder="••••••••" 
                   class="w-full bg-transparent outline-none text-sm text-zh-text" id="login-pass">
          </div>

          <button onclick="navigate('home')" class="btn-primary text-base py-5 rounded-2xl"
                  style="box-shadow: 0 6px 24px rgba(192,57,43,0.3), 0 4px 0 #922B21;">
            MASUK
          </button>
        </div>

        <p class="text-center mt-8 text-sm text-zh-text-sec">
          Belum punya akun? 
          <span class="text-zh-red font-black cursor-pointer hover:underline" onclick="navigate('home')">Daftar Sekarang</span>
        </p>
      </div>
    </div>
  `;
}

// ────────────────────── HOME PAGE ──────────────────────
function renderHome() {
  return `
    <div class="pb-8">
      <!-- Sticky Header -->
      <div class="sticky top-0 z-40 px-6 pt-6 pb-4" style="background: rgba(255,253,240,0.92); backdrop-filter: blur(12px);">
        <div class="flex items-center justify-between resp-container !px-0">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 rounded-xl bg-white/40 border border-white/50 flex items-center justify-center text-2xl cursor-pointer hover:scale-105 transition-transform"
                 style="box-shadow: 0 4px 12px rgba(0,0,0,0.06);" onclick="navigate('profile')">
              ${USER.avatar}
            </div>
            <div>
              <h2 class="text-lg font-black">你好, ${USER.name.split(' ')[0]}!</h2>
              <p class="text-[10px] font-black text-zh-text-sec tracking-widest">${USER.league}</p>
            </div>
          </div>
          <div class="flex gap-2">
            <div class="header-badge">
              ${icon('local_fire_department', 'text-lg')}
              <span style="color: #E67E22;">${USER.streak}</span>
            </div>
            <div class="header-badge">
              ${icon('stars', 'text-lg')}
              <span style="color: #D4AC0D;">${USER.xp.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Progress Card (Floating) -->
      <div class="resp-container mt-4">
        <div class="glass-card p-6 sm:p-8 float-anim">
          <div class="flex items-center gap-4 sm:gap-8">
            <div class="flex-1">
              <span class="tag-badge text-white mb-3" style="background: var(--zh-red); box-shadow: 0 4px 12px rgba(192,57,43,0.25);">
                CURRENT COURSE
              </span>
              <h3 class="text-3xl font-black text-zh-red mt-3">Hanzi Master</h3>
              <div class="flex items-center gap-2 mt-3">
                <div class="flex-1 progress-bar">
                  <div class="progress-bar-fill" style="width: 72%;"></div>
                </div>
                <span class="text-xs font-black text-zh-red">72%</span>
              </div>
            </div>
            <div class="relative flex-shrink-0">
              <svg width="80" height="80" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="8"/>
                <circle cx="40" cy="40" r="34" fill="none" stroke="#F4D03F" stroke-width="8" 
                        stroke-dasharray="${2 * Math.PI * 34}" stroke-dashoffset="${2 * Math.PI * 34 * 0.3}"
                        transform="rotate(-90 40 40)" stroke-linecap="round"/>
              </svg>
              <div class="absolute inset-0 flex flex-col items-center justify-center">
                <span class="text-[9px] font-black text-zh-text-sec">LEVEL</span>
                <span class="text-2xl font-black text-zh-red">${USER.level}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Level Path -->
      <div class="mt-10 level-path flex flex-col items-center">
        ${LEVELS.map((lv, i) => `
          <div class="relative z-10 flex flex-col items-center ${i > 0 ? 'mt-20' : ''}" style="transform: translateX(${lv.offset}px);">
            <div class="level-node ${lv.style} ${lv.isCurrent ? 'pulse-ring' : ''}" 
                 style="width: ${lv.isCurrent ? '110px' : '90px'}; height: ${lv.isCurrent ? '110px' : '90px'};"
                 onclick="${lv.style !== 'white' && lv.lessons.length ? `navigate('lesson/${lv.lessons[0].id}')` : ''}">
              ${icon(lv.icon, `text-${lv.isCurrent ? '5xl' : '4xl'}`)}
            </div>
            <h4 class="mt-3 font-black text-lg ${lv.style === 'red' ? 'text-zh-red' : lv.style === 'gold' ? 'text-zh-gold-dark' : 'text-gray-400'}">
              ${lv.title}
            </h4>
            <span class="text-[9px] font-bold tracking-widest ${lv.style === 'red' ? 'text-zh-red/70' : lv.style === 'gold' ? 'text-zh-gold-dark/70' : 'text-gray-300'}">
              ${lv.progress}
            </span>
            ${lv.isCurrent ? `
              <button onclick="navigate('lesson/${lv.lessons[0]?.id || ''}')" 
                      class="mt-5 px-8 py-4 bg-zh-red text-white rounded-2xl font-black text-xs tracking-widest hover:scale-105 active:scale-95 transition-transform"
                      style="box-shadow: 0 6px 20px rgba(192,57,43,0.3), 0 4px 0 #922B21;">
                RESUME UNIT
              </button>
            ` : ''}
          </div>
        `).join('')}
        <div class="h-16"></div>
      </div>
    </div>
  `;
}

// ────────────────────── LEARN PAGE ──────────────────────
function renderLearn() {
  return `
    <div class="resp-container pt-6 pb-8">
      <h1 class="text-2xl sm:text-3xl font-black mb-6">📚 Semua Pelajaran</h1>
      <div class="stagger-in learn-grid">
        ${LEVELS.map(lv => `
          <div class="glass-card p-5 ${lv.style === 'white' ? 'opacity-50' : 'cursor-pointer hover:scale-[1.02] transition-transform'}"
               onclick="${lv.lessons.length ? `navigate('lesson/${lv.lessons[0].id}')` : ''}">
            <div class="flex items-center gap-4">
              <div class="level-node ${lv.style}" style="width: 56px; height: 56px; flex-shrink: 0;">
                ${icon(lv.icon, 'text-2xl')}
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="font-black text-lg">${lv.title}</h3>
                <p class="text-xs text-zh-text-sec font-semibold">${lv.lessons.length ? lv.lessons[0].title : 'Segera hadir'}</p>
              </div>
              <span class="tag-badge ${lv.progress === 'COMPLETED' ? 'bg-green-100 text-green-700' : lv.progress === 'LOCKED' ? 'bg-gray-100 text-gray-400' : 'bg-red-50 text-zh-red'}" style="font-size: 9px;">
                ${lv.progress}
              </span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// ────────────────────── LESSON DETAIL PAGE ──────────────────────
function renderLesson(lessonId) {
  const lesson = findLesson(lessonId);
  if (!lesson) return '<div class="p-8 text-center text-zh-text-sec">Pelajaran tidak ditemukan.</div>';

  return `
    <!-- App Bar -->
    <div class="sticky top-0 z-40 bg-white flex items-center gap-3 px-4 py-4 border-b border-zh-border">
      <div class="resp-container !px-0 flex items-center gap-3">
        <button onclick="history.back()" class="p-2 rounded-xl hover:bg-zh-bg transition-colors">
          ${icon('arrow_back', 'text-zh-text')}
        </button>
        <h2 class="font-bold text-base sm:text-lg flex-1">${lesson.title}</h2>
      </div>
    </div>

    <!-- Header -->
    <div class="p-6" style="background: linear-gradient(135deg, #3498DB, #2980B9);">
      <h2 class="text-white text-xl font-bold">${lesson.title}</h2>
      <p class="text-white/80 text-sm mt-2 leading-relaxed">${lesson.description}</p>
      <div class="flex gap-3 mt-5">
        <div class="info-chip">${icon('translate', 'text-base')} ${lesson.vocabularies.length} Kosakata</div>
        <div class="info-chip">${icon('timer', 'text-base')} ~15 menit</div>
      </div>
    </div>

    <!-- Vocabulary List -->
    <div class="resp-container py-5">
      <div class="flex items-center gap-2 mb-4">
        ${icon('book', 'text-zh-blue')}
        <h3 class="font-bold text-lg sm:text-xl">Kosakata</h3>
      </div>
      <div class="stagger-in vocab-grid">
        ${lesson.vocabularies.map(v => `
          <div class="vocab-card">
            <div class="flex items-start gap-3">
              <div class="flex-1">
                <span class="hanzi-md text-zh-text">${v.hanzi}</span>
                <p class="text-zh-orange italic text-sm mt-1">${v.pinyin}</p>
              </div>
            </div>
            <div class="bg-gray-50 rounded-lg p-3 mt-3">
              <p class="text-sm text-zh-text font-medium">${v.meaning}</p>
            </div>
            ${v.example ? `
              <div class="border border-zh-border rounded-lg p-3 mt-2">
                <p class="text-sm text-zh-text">${v.example}</p>
                ${v.exampleMeaning ? `<p class="text-xs text-zh-text-sec italic mt-1">${v.exampleMeaning}</p>` : ''}
              </div>
            ` : ''}
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="resp-container pt-0 pb-5">
      <div class="resp-content-narrow">
      <button onclick="navigate('flashcard/${lessonId}')" class="btn-primary btn-green mb-3">
        ${icon('school', 'text-xl')} Latihan Kosakata
      </button>
      <button onclick="navigate('writing/${lessonId}')" class="btn-primary mb-3" style="background: var(--zh-blue); box-shadow: 0 4px 16px rgba(52,152,219,0.25);">
        ${icon('brush', 'text-xl')} Latihan Menulis
      </button>
      <button onclick="navigate('quiz/${lessonId}')" class="btn-outline">
        ${icon('quiz', 'text-xl')} Kuis
      </button>
      </div>
    </div>
    <div class="h-8"></div>
  `;
}

// ────────────────────── FLASHCARD PAGE ──────────────────────
function renderFlashcard(lessonId) {
  const lesson = findLesson(lessonId);
  if (!lesson) return '<div class="p-8 text-center">Lesson not found.</div>';
  const vocab = lesson.vocabularies[flashcardState.index];
  const progress = (flashcardState.index + 1) / lesson.vocabularies.length;
  const isLast = flashcardState.index >= lesson.vocabularies.length - 1;

  return `
    <!-- App Bar -->
    <div class="sticky top-0 z-40 bg-white flex items-center gap-3 px-4 py-4 border-b border-zh-border">
      <button onclick="history.back()" class="p-2 rounded-xl hover:bg-zh-bg transition-colors">
        ${icon('arrow_back', 'text-zh-text')}
      </button>
      <h2 class="font-bold text-base flex-1">${lesson.title}</h2>
    </div>

    <!-- Progress -->
    <div class="px-5 pt-5">
      <div class="flex justify-between text-xs mb-2">
        <span class="text-zh-text-sec font-semibold">Progress Latihan</span>
        <span class="text-zh-red font-bold">${flashcardState.index + 1} / ${lesson.vocabularies.length}</span>
      </div>
      <div class="progress-bar-sm"><div class="progress-bar-fill" style="width: ${progress * 100}%;"></div></div>
    </div>

    <!-- Flashcard -->
    <div class="flex-1 flex items-center justify-center px-6 py-8" style="min-height: 400px;">
      <div class="flashcard-container" onclick="toggleFlashcard('${lessonId}')">
        <div class="flashcard ${flashcardState.flipped ? 'flipped' : ''}">
          <!-- Front -->
          <div class="flashcard-front">
            <span class="hanzi-xl text-zh-text">${vocab.hanzi}</span>
            <p class="text-xs text-zh-text-sec font-bold tracking-[2px] mt-8">KETUK UNTUK ARTI</p>
          </div>
          <!-- Back -->
          <div class="flashcard-back">
            <span class="hanzi-lg text-zh-red">${vocab.hanzi}</span>
            <p class="text-zh-text-sec text-base font-medium mt-1">${vocab.pinyin}</p>
            <div class="w-full h-px bg-zh-border my-5"></div>
            <h3 class="text-xl font-bold text-zh-text text-center">${vocab.meaning}</h3>
            ${vocab.example ? `<p class="text-sm text-zh-text-sec text-center mt-3">${vocab.example}</p>` : ''}
          </div>
        </div>
      </div>
    </div>

    <!-- Controls -->
    <div class="bg-white rounded-t-3xl p-6 border-t border-zh-border">
      ${!flashcardState.flipped ? `<p class="text-center text-xs text-zh-text-sec mb-4">Ketuk kartu untuk jawaban</p>` : ''}
      <div class="flex items-center gap-4">
        <button onclick="prevFlashcard('${lessonId}')" 
                class="w-12 h-12 rounded-xl flex items-center justify-center ${flashcardState.index > 0 ? 'bg-zh-border text-zh-text hover:bg-gray-300' : 'bg-gray-100 text-gray-300 cursor-not-allowed'} transition-colors"
                ${flashcardState.index <= 0 ? 'disabled' : ''}>
          ${icon('chevron_left')}
        </button>
        <button onclick="${isLast ? "navigate('lesson/" + lessonId + "')" : "nextFlashcard('" + lessonId + "')"}" class="btn-primary flex-1">
          ${isLast ? 'Selesai' : 'Selanjutnya'}
        </button>
      </div>
    </div>
  `;
}

function toggleFlashcard(lessonId) {
  flashcardState.flipped = !flashcardState.flipped;
  document.getElementById('page-container').innerHTML = renderFlashcard(lessonId);
}
function nextFlashcard(lessonId) {
  const lesson = findLesson(lessonId);
  if (flashcardState.index < lesson.vocabularies.length - 1) {
    flashcardState.index++;
    flashcardState.flipped = false;
    document.getElementById('page-container').innerHTML = renderFlashcard(lessonId);
  }
}
function prevFlashcard(lessonId) {
  if (flashcardState.index > 0) {
    flashcardState.index--;
    flashcardState.flipped = false;
    document.getElementById('page-container').innerHTML = renderFlashcard(lessonId);
  }
}

// ────────────────────── QUIZ PAGE ──────────────────────
function renderQuiz(lessonId) {
  const lesson = findLesson(lessonId);
  if (!lesson || !lesson.quiz.length) return '<div class="p-8 text-center text-zh-text-sec">Belum ada soal kuis.</div>';

  const q = lesson.quiz[quizState.index];
  const progress = (quizState.index + 1) / lesson.quiz.length;
  const isLast = quizState.index >= lesson.quiz.length - 1;

  return `
    <!-- App Bar -->
    <div class="sticky top-0 z-40 bg-white flex items-center gap-3 px-4 py-4 border-b border-zh-border">
      <button onclick="history.back()" class="p-2 rounded-xl hover:bg-zh-bg transition-colors">
        ${icon('arrow_back', 'text-zh-text')}
      </button>
      <h2 class="font-bold text-base flex-1">${lesson.title}</h2>
    </div>

    <!-- Progress -->
    <div class="px-5 pt-5">
      <div class="flex justify-between text-xs mb-2">
        <span class="text-zh-text-sec font-semibold">Pertanyaan ${quizState.index + 1} dari ${lesson.quiz.length}</span>
        <span class="text-zh-red font-bold">Poin: ${quizState.correct * 10}</span>
      </div>
      <div class="progress-bar-sm"><div class="progress-bar-fill" style="width: ${progress * 100}%;"></div></div>
    </div>

    <!-- Question -->
    <div class="resp-container py-6 stagger-in">
      <div class="bg-white rounded-3xl border border-zh-border p-8 sm:p-10 mb-8 resp-content-narrow mx-auto" style="box-shadow: 0 8px 32px rgba(0,0,0,0.04);">
        <h3 class="text-lg font-bold text-center text-zh-text">${q.question}</h3>
        ${q.pinyin ? `<p class="text-center text-zh-text-sec italic mt-3">${q.pinyin}</p>` : ''}
      </div>

      <!-- Options -->
      <div class="quiz-options-grid resp-content-narrow mx-auto">
      ${q.options.map((opt, i) => {
    let cls = 'quiz-option';
    let statusIcon = '';
    if (quizState.answered) {
      cls += ' disabled';
      if (i === q.correct) { cls += ' correct'; statusIcon = icon('check_circle', 'text-2xl text-zh-success'); }
      else if (i === quizState.selected) { cls += ' wrong'; statusIcon = icon('cancel', 'text-2xl text-zh-error'); }
    } else if (i === quizState.selected) {
      cls += ' selected';
    }
    return `
          <div class="${cls}" onclick="selectQuizOption(${i}, '${lessonId}')">
            <div class="option-marker">${String.fromCharCode(65 + i)}</div>
            <span class="flex-1 text-sm font-medium">${opt}</span>
            ${statusIcon}
          </div>
        `;
  }).join('')}
      </div>

      <!-- Explanation -->
      ${quizState.answered && q.explanation ? `
        <div class="resp-content-narrow mx-auto">
        <div class="explanation-box mt-4">
          ${icon('lightbulb', 'text-xl flex-shrink-0')} 
          <p class="text-sm text-zh-text" style="color: #7D6608;">${q.explanation}</p>
        </div>
        </div>
      ` : ''}
    </div>

    <!-- Footer -->
    <div class="bg-white rounded-t-3xl p-6 border-t border-zh-border mt-auto">
      <button onclick="quizAction('${lessonId}')" class="btn-primary" 
              ${quizState.selected === null ? 'disabled' : ''}>
        ${!quizState.answered ? 'PERIKSA JAWABAN' : isLast ? 'LIHAT HASIL AKHIR' : 'LANJUTKAN'}
      </button>
    </div>
  `;
}

function selectQuizOption(index, lessonId) {
  if (quizState.answered) return;
  quizState.selected = index;
  document.getElementById('page-container').innerHTML = renderQuiz(lessonId);
}

function quizAction(lessonId) {
  const lesson = findLesson(lessonId);
  if (!quizState.answered) {
    // Check answer
    const q = lesson.quiz[quizState.index];
    if (quizState.selected === q.correct) quizState.correct++;
    quizState.answered = true;
    document.getElementById('page-container').innerHTML = renderQuiz(lessonId);
  } else if (quizState.index < lesson.quiz.length - 1) {
    // Next question
    quizState.index++;
    quizState.selected = null;
    quizState.answered = false;
    document.getElementById('page-container').innerHTML = renderQuiz(lessonId);
  } else {
    // Show results
    showQuizResults(lessonId);
  }
}

function showQuizResults(lessonId) {
  const lesson = findLesson(lessonId);
  const total = lesson.quiz.length;
  const pct = Math.round((quizState.correct / total) * 100);
  const isPerfect = quizState.correct === total;
  const isPassed = pct >= 70;
  const color = isPerfect ? '#F4D03F' : isPassed ? '#27AE60' : '#E67E22';
  const emoji = isPerfect ? '⭐' : isPassed ? '🏆' : '💪';
  const title = isPerfect ? 'Sempurna!' : isPassed ? 'Lulus!' : 'Hampir!';
  const msg = isPerfect
    ? 'Luar biasa! Anda menguasai semua materi!'
    : isPassed
      ? 'Bagus! Anda telah menguasai materi ini!'
      : 'Tetap semangat! Ulangi lagi untuk hasil lebih baik.';

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal-card">
      <div class="text-5xl mb-4">${emoji}</div>
      <h2 class="text-2xl font-black" style="color: ${color};">${title}</h2>
      <div class="text-5xl font-black my-4" style="color: ${color};">${pct}%</div>
      <p class="text-zh-text-sec text-base font-semibold">Skor: ${quizState.correct}/${total}</p>
      <p class="text-zh-text-sec text-sm mt-2 leading-relaxed">${msg}</p>
      <div class="flex gap-3 mt-8">
        <button onclick="this.closest('.modal-overlay').remove(); navigate('lesson/${lessonId}')" 
                class="flex-1 py-3 rounded-xl border-2 border-zh-border text-zh-text font-bold text-sm hover:bg-zh-bg transition-colors">
          Selesai
        </button>
        ${!isPerfect ? `
          <button onclick="this.closest('.modal-overlay').remove(); quizState = {index:0, selected:null, answered:false, correct:0}; document.getElementById('page-container').innerHTML = renderQuiz('${lessonId}');" 
                  class="flex-1 py-3 rounded-xl text-white font-bold text-sm" style="background: ${color};">
            Ulangi
          </button>
        ` : ''}
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
}

// ────────────────────── WRITING PRACTICE PAGE ──────────────────────
function renderWriting(lessonId) {
  const lesson = findLesson(lessonId);
  if (!lesson) return '<div class="p-8 text-center">Lesson not found.</div>';
  const vocab = lesson.vocabularies[writingState.index];
  const progress = (writingState.index + 1) / lesson.vocabularies.length;
  const isLast = writingState.index >= lesson.vocabularies.length - 1;

  return `
    <!-- App Bar -->
    <div class="sticky top-0 z-40 bg-white flex items-center gap-3 px-4 py-4 border-b border-zh-border">
      <button onclick="history.back()" class="p-2 rounded-xl hover:bg-zh-bg transition-colors">
        ${icon('arrow_back', 'text-zh-text')}
      </button>
      <h2 class="font-bold text-base flex-1">Latihan Menulis</h2>
    </div>

    <!-- Progress -->
    <div class="resp-container pt-5">
      <div class="flex justify-between text-xs mb-2">
        <span class="text-zh-text-sec font-semibold">Karakter ${writingState.index + 1} / ${lesson.vocabularies.length}</span>
        <span class="text-zh-blue font-bold">${vocab.hanzi}</span>
      </div>
      <div class="progress-bar-sm"><div class="progress-bar-fill" style="width: ${progress * 100}%; background: var(--zh-blue);"></div></div>
    </div>

    <!-- Char Info -->
    <div class="resp-container pt-5">
      <div class="resp-content-narrow">
        <div class="flex items-center gap-4 bg-white rounded-2xl border border-zh-border p-4 mb-4" style="box-shadow: 0 2px 10px rgba(0,0,0,0.04);">
          <div class="w-16 h-16 rounded-xl flex items-center justify-center" style="background: rgba(52,152,219,0.08);">
            <span class="hanzi-lg text-zh-blue">${vocab.hanzi}</span>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-zh-orange italic text-sm font-semibold">${vocab.pinyin}</p>
            <p class="text-zh-text text-base font-bold mt-0.5">${vocab.meaning}</p>
          </div>
          <div id="stroke-counter" class="text-center px-3">
            <div class="text-2xl font-black text-zh-blue" id="stroke-count">0</div>
            <div class="text-[9px] font-bold text-zh-text-sec tracking-wider">GORESAN</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Canvas Area -->
    <div class="resp-container">
      <div class="resp-content-narrow">
        <div class="writing-canvas-wrapper">
          <canvas id="writing-canvas" class="writing-canvas" width="320" height="320"></canvas>
          <div class="writing-ghost-char" id="ghost-char">${vocab.hanzi}</div>
        </div>

        <!-- Canvas Controls -->
        <div class="flex items-center justify-center gap-3 mt-4">
          <button onclick="undoStroke('${lessonId}')" class="w-12 h-12 rounded-xl bg-white border border-zh-border flex items-center justify-center text-zh-text-sec hover:bg-zh-bg hover:text-zh-text transition-all" title="Undo">
            ${icon('undo', 'text-xl')}
          </button>
          <button onclick="clearCanvas('${lessonId}')" class="w-12 h-12 rounded-xl bg-white border border-zh-border flex items-center justify-center text-zh-text-sec hover:bg-zh-bg hover:text-zh-text transition-all" title="Hapus Semua">
            ${icon('delete_outline', 'text-xl')}
          </button>
          <button onclick="toggleGhost()" class="w-12 h-12 rounded-xl bg-white border border-zh-border flex items-center justify-center text-zh-text-sec hover:bg-zh-bg hover:text-zh-text transition-all" id="ghost-toggle" title="Toggle Panduan">
            ${icon('visibility', 'text-xl')}
          </button>
        </div>
        <p class="text-center text-[10px] text-zh-text-sec font-bold tracking-widest mt-3">TULIS KARAKTER DI ATAS KOTAK</p>
      </div>
    </div>

    <!-- Bottom Controls -->
    <div class="bg-white rounded-t-3xl p-6 border-t border-zh-border mt-6">
      <div class="resp-content-narrow mx-auto flex items-center gap-4">
        <button onclick="prevWriting('${lessonId}')" 
                class="w-12 h-12 rounded-xl flex items-center justify-center ${writingState.index > 0 ? 'bg-zh-border text-zh-text hover:bg-gray-300' : 'bg-gray-100 text-gray-300 cursor-not-allowed'} transition-colors"
                ${writingState.index <= 0 ? 'disabled' : ''}>
          ${icon('chevron_left')}
        </button>
        <button onclick="${isLast ? "navigate('lesson/" + lessonId + "')" : "nextWriting('" + lessonId + "')"}" 
                class="btn-primary flex-1" style="background: var(--zh-blue); box-shadow: 0 4px 16px rgba(52,152,219,0.25);">
          ${isLast ? 'Selesai' : 'Karakter Berikutnya'}
        </button>
      </div>
    </div>
  `;
}

// Canvas Drawing Logic
let canvasCtx = null;
let isDrawing = false;
let currentStroke = [];

function initWritingCanvas() {
  const canvas = document.getElementById('writing-canvas');
  if (!canvas) return;

  // Make canvas responsive
  const wrapper = canvas.parentElement;
  const size = Math.min(wrapper.clientWidth, 360);
  canvas.width = size;
  canvas.height = size;
  canvas.style.width = size + 'px';
  canvas.style.height = size + 'px';

  canvasCtx = canvas.getContext('2d');
  drawGrid();

  // Mouse events
  canvas.addEventListener('mousedown', (e) => startDraw(e, canvas));
  canvas.addEventListener('mousemove', (e) => draw(e, canvas));
  canvas.addEventListener('mouseup', () => endDraw());
  canvas.addEventListener('mouseleave', () => endDraw());

  // Touch events
  canvas.addEventListener('touchstart', (e) => { e.preventDefault(); startDraw(e.touches[0], canvas); }, { passive: false });
  canvas.addEventListener('touchmove', (e) => { e.preventDefault(); draw(e.touches[0], canvas); }, { passive: false });
  canvas.addEventListener('touchend', (e) => { e.preventDefault(); endDraw(); }, { passive: false });

  // Redraw any existing strokes
  redrawAll();
}

function getCanvasPos(e, canvas) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: (e.clientX - rect.left) * (canvas.width / rect.width),
    y: (e.clientY - rect.top) * (canvas.height / rect.height)
  };
}

function drawGrid() {
  if (!canvasCtx) return;
  const w = canvasCtx.canvas.width;
  const h = canvasCtx.canvas.height;

  canvasCtx.clearRect(0, 0, w, h);

  // Grid background
  canvasCtx.fillStyle = '#FFFDF0';
  canvasCtx.fillRect(0, 0, w, h);

  // Grid lines
  canvasCtx.strokeStyle = 'rgba(234,234,234,0.7)';
  canvasCtx.lineWidth = 1;
  canvasCtx.setLineDash([8, 4]);

  // Cross lines
  canvasCtx.beginPath();
  canvasCtx.moveTo(w / 2, 0);
  canvasCtx.lineTo(w / 2, h);
  canvasCtx.moveTo(0, h / 2);
  canvasCtx.lineTo(w, h / 2);
  // Diagonal lines
  canvasCtx.moveTo(0, 0);
  canvasCtx.lineTo(w, h);
  canvasCtx.moveTo(w, 0);
  canvasCtx.lineTo(0, h);
  canvasCtx.stroke();
  canvasCtx.setLineDash([]);

  // Border
  canvasCtx.strokeStyle = '#EAEAEA';
  canvasCtx.lineWidth = 2;
  canvasCtx.strokeRect(1, 1, w - 2, h - 2);
}

function startDraw(e, canvas) {
  isDrawing = true;
  const pos = getCanvasPos(e, canvas);
  currentStroke = [pos];
  canvasCtx.beginPath();
  canvasCtx.moveTo(pos.x, pos.y);
  canvasCtx.strokeStyle = '#2C2C2C';
  canvasCtx.lineWidth = Math.max(4, canvasCtx.canvas.width / 60);
  canvasCtx.lineCap = 'round';
  canvasCtx.lineJoin = 'round';
}

function draw(e, canvas) {
  if (!isDrawing || !canvasCtx) return;
  const pos = getCanvasPos(e, canvas);
  currentStroke.push(pos);
  canvasCtx.lineTo(pos.x, pos.y);
  canvasCtx.stroke();
}

function endDraw() {
  if (!isDrawing) return;
  isDrawing = false;
  if (currentStroke.length > 1) {
    writingState.strokes.push([...currentStroke]);
    updateStrokeCount();
  }
  currentStroke = [];
}

function updateStrokeCount() {
  const el = document.getElementById('stroke-count');
  if (el) el.textContent = writingState.strokes.length;
}

function redrawAll() {
  if (!canvasCtx) return;
  drawGrid();
  const lineW = Math.max(4, canvasCtx.canvas.width / 60);
  writingState.strokes.forEach(stroke => {
    if (stroke.length < 2) return;
    canvasCtx.beginPath();
    canvasCtx.moveTo(stroke[0].x, stroke[0].y);
    for (let i = 1; i < stroke.length; i++) {
      canvasCtx.lineTo(stroke[i].x, stroke[i].y);
    }
    canvasCtx.strokeStyle = '#2C2C2C';
    canvasCtx.lineWidth = lineW;
    canvasCtx.lineCap = 'round';
    canvasCtx.lineJoin = 'round';
    canvasCtx.stroke();
  });
  updateStrokeCount();
}

function undoStroke(lessonId) {
  writingState.strokes.pop();
  redrawAll();
}

function clearCanvas(lessonId) {
  writingState.strokes = [];
  redrawAll();
}

function toggleGhost() {
  const ghost = document.getElementById('ghost-char');
  const btn = document.getElementById('ghost-toggle');
  if (ghost) {
    const visible = ghost.style.opacity !== '0';
    ghost.style.opacity = visible ? '0' : '0.08';
    if (btn) btn.innerHTML = icon(visible ? 'visibility_off' : 'visibility', 'text-xl');
  }
}

function nextWriting(lessonId) {
  const lesson = findLesson(lessonId);
  if (writingState.index < lesson.vocabularies.length - 1) {
    writingState.index++;
    writingState.strokes = [];
    document.getElementById('page-container').innerHTML = renderWriting(lessonId);
    setTimeout(() => initWritingCanvas(), 50);
  }
}
function prevWriting(lessonId) {
  if (writingState.index > 0) {
    writingState.index--;
    writingState.strokes = [];
    document.getElementById('page-container').innerHTML = renderWriting(lessonId);
    setTimeout(() => initWritingCanvas(), 50);
  }
}

// ────────────────────── PROFILE PAGE ──────────────────────
function renderProfile() {
  return `
    <div class="resp-container pt-8 pb-8">
      <div class="flex flex-col items-center mb-8">
        <div class="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-white border border-zh-border flex items-center justify-center text-5xl sm:text-6xl mb-4"
             style="box-shadow: 0 6px 0 #D5D5D5, 0 8px 20px rgba(0,0,0,0.08);">
          ${USER.avatar}
        </div>
        <h1 class="text-2xl sm:text-3xl font-black text-zh-text">${USER.name}</h1>
        <span class="tag-badge bg-red-50 text-zh-red mt-2">${USER.league}</span>
      </div>

      <div class="stagger-in">
        <!-- Stats Grid -->
        <div class="stats-grid-responsive mb-6">
          <div class="glass-card p-4 text-center">
            <div class="text-2xl font-black text-zh-red">${USER.level}</div>
            <div class="text-[10px] font-bold text-zh-text-sec tracking-wider mt-1">LEVEL</div>
          </div>
          <div class="glass-card p-4 text-center">
            <div class="text-2xl font-black text-zh-gold-dark">${USER.xp.toLocaleString()}</div>
            <div class="text-[10px] font-bold text-zh-text-sec tracking-wider mt-1">XP</div>
          </div>
          <div class="glass-card p-4 text-center">
            <div class="text-2xl font-black text-zh-orange">${USER.streak}</div>
            <div class="text-[10px] font-bold text-zh-text-sec tracking-wider mt-1">STREAK</div>
          </div>
        </div>

        <!-- Menu Items -->
        ${[
      { icon: 'settings', label: 'Pengaturan', color: 'text-zh-text-sec' },
      { icon: 'notifications', label: 'Notifikasi', color: 'text-zh-blue' },
      { icon: 'help_outline', label: 'Bantuan', color: 'text-zh-success' },
      { icon: 'info_outline', label: 'Tentang ZhiTalk', color: 'text-zh-gold-dark' },
    ].map(item => `
          <div class="flex items-center gap-4 p-4 bg-white rounded-2xl border border-zh-border mb-3 cursor-pointer hover:bg-zh-bg transition-colors">
            ${icon(item.icon, `text-xl ${item.color}`)}
            <span class="flex-1 font-semibold text-sm">${item.label}</span>
            ${icon('chevron_right', 'text-zh-text-sec text-xl')}
          </div>
        `).join('')}

        <button onclick="navigate('login')" class="w-full mt-4 py-4 rounded-2xl border-2 border-zh-error/30 text-zh-error font-bold text-sm hover:bg-red-50 transition-colors flex items-center justify-center gap-2">
          ${icon('logout', 'text-xl')} Keluar
        </button>
      </div>
    </div>
  `;
}

// ────────────────────── PROGRESS PAGE ──────────────────────
function renderProgress() {
  return `
    <div class="resp-container pt-8 pb-8">
      <h1 class="text-2xl sm:text-3xl font-black mb-6">📊 Progres Belajar</h1>
      
      <div class="stagger-in">
        <!-- Weekly Summary -->
        <div class="glass-card p-6 mb-4">
          <h3 class="text-sm font-black text-zh-text-sec tracking-wider mb-4">RINGKASAN MINGGU INI</h3>
          <div class="stats-grid-responsive">
            <div>
              <div class="text-3xl font-black text-zh-red">5</div>
              <div class="text-xs text-zh-text-sec font-semibold mt-1">Pelajaran Selesai</div>
            </div>
            <div>
              <div class="text-3xl font-black text-zh-success">42</div>
              <div class="text-xs text-zh-text-sec font-semibold mt-1">Kosakata Dikuasai</div>
            </div>
            <div>
              <div class="text-3xl font-black text-zh-gold-dark">87%</div>
              <div class="text-xs text-zh-text-sec font-semibold mt-1">Rata-rata Kuis</div>
            </div>
            <div>
              <div class="text-3xl font-black text-zh-orange">2.5</div>
              <div class="text-xs text-zh-text-sec font-semibold mt-1">Jam Belajar</div>
            </div>
          </div>
        </div>

        <!-- Level Progress -->
        <div class="glass-card p-6 mb-4">
          <h3 class="text-sm font-black text-zh-text-sec tracking-wider mb-4">PROGRESS PER LEVEL</h3>
          ${LEVELS.filter(l => l.style !== 'white').map(lv => `
            <div class="mb-4 last:mb-0">
              <div class="flex justify-between text-sm mb-1.5">
                <span class="font-bold">${lv.title}</span>
                <span class="text-zh-text-sec font-semibold">${lv.progress}</span>
              </div>
              <div class="progress-bar-sm">
                <div class="progress-bar-fill" style="width: ${lv.progress === 'COMPLETED' ? '100' : '80'}%; ${lv.progress === 'COMPLETED' ? 'background: var(--zh-success);' : ''}"></div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Streak Calendar (simplified) -->
        <div class="glass-card p-6">
          <h3 class="text-sm font-black text-zh-text-sec tracking-wider mb-4">🔥 STREAK ${USER.streak} HARI</h3>
          <div class="flex gap-2 justify-center flex-wrap">
            ${Array.from({ length: 7 }, (_, i) => {
    const active = i < 5;
    return `<div class="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold ${active ? 'bg-zh-red text-white' : 'bg-zh-border text-zh-text-sec'}">${['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'][i]}</div>`;
  }).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

// ────────────────────── INIT ──────────────────────
window.addEventListener('hashchange', handleRoute);
window.addEventListener('DOMContentLoaded', () => {
  // Nav button clicks (both bottom nav and sidebar)
  document.querySelectorAll('#bottom-nav .nav-btn, #side-nav .nav-btn').forEach(btn => {
    btn.addEventListener('click', () => navigate(btn.dataset.route));
  });
  handleRoute();
});
