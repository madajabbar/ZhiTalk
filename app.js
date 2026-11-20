/* ===== ZTalk — app.js ===== */
"use strict";

const API_BASE = new URLSearchParams(location.search).get("api") || "https://api-ztalk.akusedang.online";

const ICONS = {
  book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
  list: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>',
  speaker: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>'
};

/* ---------- data ---------- */
// 20 hanzi inti HSK1 (dari silabus Moona)
const CHAR_LIST = [
  { c: "你", py: "nǐ",  mn: "kamu" },
  { c: "好", py: "hǎo", mn: "baik/halo" },
  { c: "我", py: "wǒ",  mn: "saya" },
  { c: "是", py: "shì", mn: "adalah" },
  { c: "人", py: "rén", mn: "orang" },
  { c: "大", py: "dà",  mn: "besar" },
  { c: "小", py: "xiǎo",mn: "kecil" },
  { c: "一", py: "yī",  mn: "satu" },
  { c: "二", py: "èr",  mn: "dua" },
  { c: "三", py: "sān", mn: "tiga" },
  { c: "天", py: "tiān",mn: "hari/langit" },
  { c: "今", py: "jīn", mn: "sekarang" },
  { c: "明", py: "míng",mn: "terang/besok" },
  { c: "昨", py: "zuó", mn: "kemarin" },
  { c: "学", py: "xué", mn: "belajar" },
  { c: "生", py: "shēng",mn: "lahir/siswa" },
  { c: "朋", py: "péng",mn: "teman" },
  { c: "友", py: "yǒu", mn: "teman" },
  { c: "家", py: "jiā", mn: "keluarga/rumah" },
  { c: "爸", py: "bà",  mn: "ayah" },
  { c: "妈", py: "mā",  mn: "ibu" },
];

const LESSONS = [
  { id: "salam", title: "Salam & sapaan", words: [
      { hz: "你好", py: "nǐ hǎo", mn: "Halo" },
      { hz: "再见", py: "zài jiàn", mn: "Sampai jumpa" },
      { hz: "谢谢", py: "xiè xie", mn: "Terima kasih" },
      { hz: "对不起", py: "duì bu qǐ", mn: "Maaf" },
      { hz: "请", py: "qǐng", mn: "Silakan" },
      { hz: "早上好", py: "zǎo shang hǎo", mn: "Selamat pagi" },
  ]},
  { id: "angka", title: "Angka", words: [
      { hz: "一", py: "yī", mn: "satu" },
      { hz: "二", py: "èr", mn: "dua" },
      { hz: "三", py: "sān", mn: "tiga" },
      { hz: "四", py: "sì", mn: "empat" },
      { hz: "五", py: "wǔ", mn: "lima" },
      { hz: "十", py: "shí", mn: "sepuluh" },
  ]},
  { id: "keluarga", title: "Keluarga & orang", words: [
      { hz: "我", py: "wǒ", mn: "saya" },
      { hz: "你", py: "nǐ", mn: "kamu" },
      { hz: "他", py: "tā", mn: "dia (lk)" },
      { hz: "她", py: "tā", mn: "dia (pr)" },
      { hz: "爸爸", py: "bàba", mn: "ayah" },
      { hz: "妈妈", py: "māma", mn: "ibu" },
      { hz: "朋友", py: "péngyou", mn: "teman" },
      { hz: "家", py: "jiā", mn: "rumah/keluarga" },
  ]},
  { id: "hari", title: "Hari & waktu", words: [
      { hz: "今天", py: "jīntiān", mn: "hari ini" },
      { hz: "明天", py: "míngtiān", mn: "besok" },
      { hz: "昨天", py: "zuótiān", mn: "kemarin" },
      { hz: "早上", py: "zǎoshang", mn: "pagi" },
      { hz: "晚上", py: "wǎnshang", mn: "malam" },
      { hz: "现在", py: "xiànzài", mn: "sekarang" },
  ]},
  { id: "verba", title: "Kata kerja dasar", words: [
      { hz: "是", py: "shì", mn: "adalah" },
      { hz: "有", py: "yǒu", mn: "punya" },
      { hz: "去", py: "qù", mn: "pergi" },
      { hz: "看", py: "kàn", mn: "melihat" },
      { hz: "说", py: "shuō", mn: "berkata" },
      { hz: "学", py: "xué", mn: "belajar" },
      { hz: "吃", py: "chī", mn: "makan" },
      { hz: "喝", py: "hē", mn: "minum" },
  ]},
];

/* ---------- state ---------- */
let progress = null;
let assignments = [];
let currentChar = null;
let currentAssignmentId = null;
let writer = null;
let mode = "practice";
let quiz = { correct: 0, mistakes: 0, total: 0 };
let lastCapture = "";

/* ---------- api ---------- */
async function api(path, opts = {}) {
  const res = await fetch(API_BASE + path, {
    headers: { "Content-Type": "application/json" },
    ...opts,
  });
  if (!res.ok && res.status !== 401) throw new Error("HTTP " + res.status);
  const data = await res.json().catch(() => ({}));
  return { status: res.status, data };
}

function toast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.hidden = false;
  clearTimeout(t._h);
  t._h = setTimeout(() => (t.hidden = true), 2200);
}

/* ---------- router ---------- */
const panels = ["home", "practice", "lessons", "assign", "progress"];
function showPanel(name) {
  panels.forEach(p => {
    document.getElementById("panel-" + p).classList.toggle("active", p === name);
  });
  document.querySelectorAll(".tab").forEach(b => {
    b.classList.toggle("active", b.dataset.panel === name);
  });
  if (name === "home") renderHome();
  if (name === "practice") renderCharGrid();
  if (name === "lessons") renderLessons();
  if (name === "assign") renderAssignments();
  if (name === "progress") renderProgress();
}
document.querySelectorAll(".tab").forEach(b =>
  b.addEventListener("click", () => showPanel(b.dataset.panel)));

/* ---------- speech ---------- */
function speak(text) {
  try {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "zh-CN"; u.rate = 0.8;
    const voices = speechSynthesis.getVoices().filter(v => v.lang.startsWith("zh"));
    if (voices.length) u.voice = voices[0];
    speechSynthesis.cancel(); speechSynthesis.speak(u);
  } catch (e) { /* ignore */ }
}

/* ---------- streak ---------- */
function calcStreak(days) {
  const set = new Set(days);
  const today = new Date();
  let cursor = new Date(today);
  if (!set.has(iso(cursor))) cursor.setDate(cursor.getDate() - 1); // allow yesterday start
  let n = 0;
  while (set.has(iso(cursor))) { n++; cursor.setDate(cursor.getDate() - 1); }
  return n;
}
function iso(d) { return d.toISOString().slice(0, 10); }

/* ---------- home ---------- */
function renderHome() {
  const a = progress ? progress.totalAttempts : 0;
  const m = progress ? progress.masteryPct : 0;
  const mastered = progress
    ? Object.values(progress.characters).filter(x => x.avgScore >= 70).length : 0;
  document.getElementById("hs-attempts").textContent = a;
  document.getElementById("hs-mastery").textContent = m + "%";
  document.getElementById("hs-chars").textContent = mastered + "/" + CHAR_LIST.length;
  document.getElementById("streak-n").textContent = progress ? calcStreak(progress.days) : 0;
  const assign = assignments[0];
  const btn = document.getElementById("home-assign-btn");
  if (assign) {
    document.getElementById("home-assign-title").textContent = assign.title;
    btn.disabled = false;
    btn.onclick = () => {
      currentAssignmentId = assign.id;
      showPanel("practice");
    };
  } else {
    document.getElementById("home-assign-title").textContent = "Belum ada tugas baru";
    btn.disabled = true;
  }
  // next char to practice: lowest mastery among chars tried/untried
  let next = CHAR_LIST[0];
  for (const ch of CHAR_LIST) {
    if (!progress || !progress.characters[ch.c] || progress.characters[ch.c].avgScore < 70) { next = ch; break; }
  }
  document.getElementById("home-next-char").textContent = next.c + " · " + next.py;
  document.getElementById("home-practice-btn").onclick = () => { currentChar = next; showPanel("practice"); };
}

/* ---------- practice grid ---------- */
function renderCharGrid() {
  const grid = document.getElementById("char-grid");
  grid.innerHTML = "";
  CHAR_LIST.forEach(ch => {
    const cell = document.createElement("button");
    cell.className = "char-cell";
    const best = progress && progress.characters[ch.c] ? progress.characters[ch.c] : null;
    cell.innerHTML = `<span class="ch">${ch.c}</span><span class="py">${ch.py}</span>` +
      (best && best.avgScore >= 70 ? `<span class="score-tag">${best.avgScore}%</span>`
        : best ? `<span class="score-tag low">${best.avgScore}%</span>` : "");
    cell.addEventListener("click", () => { currentChar = ch; openWrite(); });
    grid.appendChild(cell);
  });
  if (currentChar && !document.getElementById("panel-write").classList.contains("active")) {
    openWrite();
  }
}

/* ---------- write screen ---------- */
async function openWrite() {
  showPanel("practice"); // keep tab active on practice
  document.getElementById("panel-practice").classList.remove("active");
  document.getElementById("panel-write").classList.add("active");
  document.getElementById("write-char").textContent = currentChar.c;
  document.getElementById("write-py").textContent = currentChar.py + " · " + currentChar.mn;
  setMode("practice");
  await createWriter();
  document.getElementById("write-status").textContent = "Gambar hanzi-nya. Ketuk “Lihat animasi” untuk contoh urutan goresan.";
}
document.getElementById("write-back").addEventListener("click", () => {
  destroyWriter();
  showPanel("practice");
  renderCharGrid();
});
document.querySelectorAll(".mode-tab").forEach(b =>
  b.addEventListener("click", () => setMode(b.dataset.mode)));

function setMode(m) {
  mode = m;
  document.querySelectorAll(".mode-tab").forEach(b => b.classList.toggle("active", b.dataset.mode === m));
  document.getElementById("write-save").disabled = true;
}

async function createWriter() {
  destroyWriter();
  const el = document.getElementById("writer");
  el.innerHTML = "";
  el.style.touchAction = "none";
  const opts = {
    width: 320, height: 320, padding: 8,
    showOutline: true, showCharacter: false,
    strokeColor: "#1C1B1A", radicalColor: "#A53A2F",
    highlightColor: "#A53A2F", outlineColor: "#E0DBD2",
    showHintAfterMisses: 3,
    onLoadCharData: () => {},
  };
  // fetch stroke data for total count
  let total = 0;
  try {
    const r = await fetch("https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0.7/" + encodeURIComponent(currentChar.c) + ".json");
    const d = await r.json();
    total = d.strokes.length;
  } catch (e) {}
  writer = HanziWriter.create(el, currentChar.c, opts);
  writer.on("mistake", () => { quiz.mistakes++; });
  writer.on("correctStroke", () => { quiz.correct++; });
  writer.on("characterCorrect", () => {
    const score = total ? Math.round(quiz.correct / total * 100) : 100;
    document.getElementById("write-status").textContent = "Selesai! Skor " + score + "% (" + quiz.correct + "/" + total + " goresan benar).";
    captureImage();
    document.getElementById("write-save").disabled = false;
  });
  if (mode === "animate") writer.animateCharacter({ onComplete: () => {
    document.getElementById("write-status").textContent = "Animasi selesai. COba gambar sendiri di mode Latih.";
  }});
  else if (mode === "quiz") {
    document.getElementById("write-status").textContent = "Tulis goresan sesuai urutan yang benar.";
    writer.startQuiz();
  } else {
    document.getElementById("write-status").textContent = "Gambar hanzi-nya bebas. Gunakan mode Kuis untuk nilai otomatis.";
  }
}

function destroyWriter() {
  if (writer) { try { writer.cancelQuiz(); } catch (e) {} writer = null; }
  quiz = { correct: 0, mistakes: 0, total: 0 };
}

function captureImage() {
  try {
    const svg = document.getElementById("writer").querySelector("svg");
    if (!svg) return;
    const xml = new XMLSerializer().serializeToString(svg);
    const svg64 = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(xml)));
    const img = new Image();
    img.onload = () => {
      const cv = document.createElement("canvas");
      cv.width = cv.height = 400;
      const ctx = cv.getContext("2d");
      ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, 400, 400);
      ctx.drawImage(img, 0, 0, 400, 400);
      lastCapture = cv.toDataURL("image/png");
    };
    img.src = svg64;
  } catch (e) { lastCapture = ""; }
}

document.getElementById("write-clear").addEventListener("click", async () => {
  if (mode === "quiz") { try { writer.cancelQuiz(); } catch (e) {} }
  await createWriter();
});
document.getElementById("write-save").addEventListener("click", async () => {
  const body = {
    character: currentChar.c,
    mistakes: quiz.mistakes,
    score: mode === "quiz" ? (quiz.total ? Math.round(quiz.correct / quiz.total * 100) : 100) : null,
    image: lastCapture,
    assignment_id: currentAssignmentId || null,
  };
  if (body.score === null) {
    // manual save without quiz: no auto score
    body.mistakes = 0; body.score = 0;
    delete body.score;
  }
  try {
    await api("/api/attempts", { method: "POST", body: JSON.stringify(body) });
    toast("Tersimpan ✓");
    await loadData();
  } catch (e) { toast("Gagal menyimpan: " + e.message); }
});

/* ---------- lessons ---------- */
function renderLessons() {
  const wrap = document.getElementById("lesson-list");
  wrap.innerHTML = "";
  LESSONS.forEach(lesson => {
    const block = document.createElement("div");
    block.className = "lesson-block";
    let cards = "";
    lesson.words.forEach(w => {
      cards += `<div class="vocab-card">
        <button class="hear" data-word="${w.hz}" aria-label="Dengar">${ICONS.speaker}</button>
        <div class="hz">${w.hz}</div>
        <div class="py">${w.py}</div>
        <div class="mn">${w.mn}</div>
      </div>`;
    });
    block.innerHTML = `<h3><span class="lesson-ic">${ICONS.book}</span> ${lesson.title} <span class="lesson-chip">${lesson.words.length} kata</span></h3>
      <div class="vocab-grid">${cards}</div>`;
    wrap.appendChild(block);
  });
  wrap.querySelectorAll(".hear").forEach(b =>
    b.addEventListener("click", () => speak(b.dataset.word)));
}

/* ---------- assignments ---------- */
function renderAssignments() {
  const wrap = document.getElementById("assign-list");
  wrap.innerHTML = "";
  if (!assignments.length) { wrap.innerHTML = `<div class="empty">Belum ada tugas. Moona akan mengirim di sini.</div>`; return; }
  assignments.forEach(a => {
    const chars = a.characters.trim().split(/\s+/).filter(Boolean);
    const card = document.createElement("div");
    card.className = "assign-card";
    card.innerHTML = `
      <div class="assign-title"><span class="assign-ic">${ICONS.list}</span> ${a.title}</div>
      <div class="assign-meta">${a.due_note ? "Jatuh tempo: " + a.due_note : ""}</div>
      <div class="assign-chips">${chars.slice(0, 8).map(c => `<span class="chip">${c}</span>`).join("")}</div>
      <button class="btn primary">Latih & kirim</button>`;
    card.querySelector(".btn").addEventListener("click", () => {
      currentAssignmentId = a.id;
      const first = CHAR_LIST.find(ch => chars.includes(ch.c)) || CHAR_LIST[0];
      currentChar = first;
      openWrite();
    });
    wrap.appendChild(card);
  });
}

/* ---------- progress ---------- */
function renderProgress() {
  document.getElementById("ps-attempts").textContent = progress ? progress.totalAttempts : "–";
  document.getElementById("ps-mastery").textContent = progress ? progress.masteryPct + "%" : "–";
  document.getElementById("ps-streak").textContent = progress ? calcStreak(progress.days) : "–";
  const wrap = document.getElementById("progress-chars");
  wrap.innerHTML = "";
  if (!progress || !Object.keys(progress.characters).length) {
    wrap.innerHTML = `<div class="empty">Belum ada latihan. Mulai dari tab Latihan.</div>`; return;
  }
  CHAR_LIST.forEach(ch => {
    const p = progress.characters[ch.c];
    if (!p) return;
    const row = document.createElement("div");
    row.className = "prog-row";
    row.innerHTML = `<span class="ch">${ch.c}</span>
      <div class="prog-bar"><i style="width:${p.avgScore}%"></i></div>
      <span class="pct">${p.avgScore}%</span>`;
    wrap.appendChild(row);
  });
}

/* ---------- data ---------- */
async function loadData() {
  try {
    const [pr, as] = await Promise.all([api("/api/progress"), api("/api/assignments")]);
    progress = pr.data;
    assignments = as.data;
  } catch (e) {
    toast("Gagal memuat data");
  }
  renderHome();
}

/* ---------- boot ---------- */
(async function init() {
  await loadData();
  showPanel("home");
})();
