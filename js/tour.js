/*  موتور تور مجازی — v5
    چرخه تککلیک + منو فقط هاور + RTL + دکمه نمای جلو + plan zoom-out
*/

const VIEW_LABELS = { hero: "نمای کلی", herog: "نمای پشت", herog_left: "نمای چپ", herog_right: "نمای راست", media: "چند‌رسانه‌ای" };

let currentRoom = null;
let currentView = "hero";
let activeLayer = "a";
let transitioning = false;

/* ---------- helpers ---------- */
function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  closeGlassMenu();
  if (id === "screen-plan") requestAnimationFrame(positionPlanLayout);
  // Explorer: only show from lobby onwards
  var et = document.getElementById("explorer-toggle");
  if (et) {
    et.style.display = (id === "screen-intro" || id === "screen-plan" || id === "screen-role") ? "none" : "flex";
  }
  // Apply role-based visibility when lobby is shown
  if (id === "screen-lobby" && typeof applyRoleVisibility === "function") {
    applyRoleVisibility();
  }
  /* موسیقی: فقط با دکمه دستی پخش شود */
}

/* ---------- پلان: چیدمان دقیق عکس + درها ----------
   عکس پلان با object-fit:contain (بدون افتادگی/کراپ) و با کمی زومآوت (PLAN_ZOOM_OUT)
   داخل صفحه جا میگیرد. چون CSS بهتنهایی نمیتواند این باکس دقیق را به لایهی هاتسپاتها
   بدهد، عکس و لایهی درها هر دو با جاوااسکریپت دقیقاًٌ هماندازه محاسبه میشوند تا درصد
   x/y هر در همیشه درست روی خود عکس بنشیند، نه کل صفحه. */
const PLAN_ZOOM_OUT = 1.2; // 20% larger than normal size
function positionPlanLayout() {
  const scene = document.querySelector("#screen-plan .scene");
  const img = document.getElementById("plan-img");
  const wrap = document.getElementById("door-hotspots");
  if (!scene || !img || !wrap) return;
  const cw = scene.clientWidth, ch = scene.clientHeight;
  const iw = img.naturalWidth || 1200, ih = img.naturalHeight || 896;
  const ir = iw / ih, cr = cw / ch;
  let w, h;
  if (ir > cr) { w = cw; h = w / ir; } else { h = ch; w = h * ir; }
  w *= PLAN_ZOOM_OUT; h *= PLAN_ZOOM_OUT;
  const x = (cw - w) / 2, y = (ch - h) / 2;
  [img, wrap].forEach(el => {
    el.style.position = "absolute";
    el.style.left = x + "px";
    el.style.top = y + "px";
    el.style.width = w + "px";
    el.style.height = h + "px";
    el.style.right = "auto";
    el.style.bottom = "auto";
  });
  img.style.objectFit = "contain";
}
window.addEventListener("resize", () => {
  if (document.getElementById("screen-plan").classList.contains("active")) positionPlanLayout();
});
window.addEventListener("load", positionPlanLayout);

/* ---------- اینترو ---------- */
document.getElementById("btn-enter").addEventListener("click", () => showScreen("screen-plan"));

/* ---------- پلان ---------- */
function renderDoors() {
  const wrap = document.getElementById("door-hotspots");
  wrap.innerHTML = "";
  ENTRY_DOORS.forEach(door => {
    const el = document.createElement("div");
    el.className = "door-hotspot";
    el.dataset.role = door.role;
    el.style.left = door.x + "%";
    el.style.top = door.y + "%";
    el.innerHTML = '<div class="door-icon">🚪</div><div class="door-label">' + door.label + '</div>';
    el.addEventListener("click", () => { setRole(door.role); showScreen("screen-lobby"); });
    wrap.appendChild(el);
  });
  positionPlanLayout();
  const planImg = document.getElementById("plan-img");
  if (planImg) planImg.addEventListener("load", positionPlanLayout);
}
document.getElementById("plan-back-intro").addEventListener("click", () => showScreen("screen-intro"));

/* ---------- لابی ---------- */
document.getElementById("lobby-back-plan").addEventListener("click", () => showScreen("screen-plan"));
document.getElementById("btn-goto-map").addEventListener("click", () => { playMapEnter(); showScreen("screen-map"); });
document.getElementById("lobby-panel").addEventListener("click", () => { initPanel(); showScreen("screen-panel"); });
document.getElementById("lobby-search").addEventListener("click", () => { showScreen("screen-search"); document.getElementById("search-input").focus(); });

/* ── دکمه‌های لابی ── */
document.getElementById("btn-decks").addEventListener("click", function () {
  if (typeof Decks === "undefined" || typeof DECK_LIBRARY === "undefined") return;
  var aud = (typeof currentUserRole !== "undefined" && currentUserRole === "parent") ? "parent"
    : (typeof currentUserRole !== "undefined" && currentUserRole === "manager") ? "staff" : "teacher";
  var modal = document.getElementById("game-modal");
  var header = document.getElementById("game-header");
  var body = document.getElementById("game-body");
  if (!modal || !header || !body) return;
  header.innerHTML = '<span>🖥️</span> — ' + (aud === "parent"
    ? "درس‌های تعاملی والدین"
    : "درس‌های تعاملی مربیان و کارکنان");
  body.innerHTML = Decks.picker(aud);
  modal.classList.remove("hidden");
  modal.classList.add("active");
  body.querySelectorAll(".dk-picker-card").forEach(function (card) {
    card.addEventListener("click", function () {
      modal.classList.add("hidden");
      modal.classList.remove("active");
      Decks.open(card.dataset.id);
    });
  });
});

/* ── بستن game-modal با کلیک روی overlay ── */
(function () {
  var gm = document.getElementById("game-modal");
  if (gm) gm.addEventListener("click", function (e) {
    if (e.target === gm) {
      gm.classList.add("hidden");
      gm.classList.remove("active");
      var gb = gm.querySelector("#game-body");
      if (gb) gb.innerHTML = "";
    }
  });
})();

document.getElementById("btn-goto-games").addEventListener("click", function () {
  showScreen("screen-lobby");
  if (typeof openRoom === "function") openRoom("bazi");
  else showScreen("screen-map");
});
document.getElementById("btn-virtual-tour").addEventListener("click", function () {
  if (typeof VirtualTour !== "undefined") {
    try { VirtualTour.start(); } catch(e) { /* silent */ }
  }
});

/* ---------- نقشه اتاقها: دایرههای انیمیشنی ---------- */
// عکس پایه هر دایره = نمای کلی اتاق (hero.webp)؛ اسلایدشو هاور فقط گوشه‌های راست/چپ
const MAP_BASE = { key: "media", label: "نمای کلی" };
const MAP_CORNERS = [
  { key: "herog",       label: "گوشه وسط" },
  { key: "herog_left",  label: "گوشه چپ" },
  { key: "herog_right", label: "گوشه راست" }
];

function renderMapCircles() {
  const wrap = document.getElementById("map-circles");
  if (wrap) wrap.innerHTML = "";

  // مکان دایره روی عکس plan2 — نعل‌اسبی عمودی (پرسپکتیو راهرو)
  const PLAN_CENTER = {
    /* ── بازوی چپ (جلو→عقب، پایین→بالا) ── */
    amoozesh:  { x: 22, y: 80 },   // در سبز — راهرو چپ جلو
    bazi:      { x: 24, y: 68 },   // در صورتی — راهرو چپ
    honar:     { x: 26, y: 56 },   // در زرد — راهرو چپ
    motaleh:   { x: 28, y: 46 },   // در آبی روشن — راهرو چپ
    salamat:   { x: 30, y: 37 },   // در کرم — راهرو چپ نزدیک دیوار پشت
    /* ── دیوار پشت (مرکز بالا) ── */
    khab:      { x: 38, y: 26 },   // در بنفش — دیوار پشت چپ
    moraabi:   { x: 50, y: 22 },   // در سبز — دیوار پشت مرکز
    "esterahat-moraabian": { x: 62, y: 26 }, // در هلویی — دیوار پشت راست
    /* ── بازوی راست (عقب→جلو، بالا→پایین) ── */
    "jalase-owlia": { x: 70, y: 37 }, // در سالمون — راهرو راست نزدیک دیوار پشت
    bayegani:  { x: 72, y: 46 },   // در آبی روشن — راهرو راست
    teria:     { x: 74, y: 56 },   // در آبی — راهرو راست
    hayat:     { x: 76, y: 68 },   // در قهوه‌ای — راهرو راست
    maddakari: { x: 78, y: 80 },   // در کرم — راهرو راست جلو
           };
  // تبدیل مکان نقشه (نسبت به تصویر کوچک) به مکان روی کل صفحه — نقشه در مرکز است
  const PLAN_SCALE = 1.08; // پخش دایره‌ها روی کل صفحه نسبت به مرکز (1.2 × 0.9 = هم‌راستا با scale(.9) عکس)
  const toScreen = (p) => ({ x: 50 + (p.x - 50) * PLAN_SCALE, y: 50 + (p.y - 50) * PLAN_SCALE });
  // مکان اولیه از روی عکس نقشه
  const posOf = {};
  ROOMS.forEach(r => {
    const base = PLAN_CENTER[r.id] || (r.heroPos && r.heroPos.center ? r.heroPos.center : { x: 50, y: 50 });
    posOf[r.id] = toScreen(Object.assign({}, base));
  });

  ROOMS.forEach(room => {
    const c = document.createElement("div");
    c.className = "map-circle";
    c.dataset.room = room.id;
    const pid = "ring-" + room.id;
    const base = "assets/images/" + room.folder + "/";
    c.innerHTML =
      '<div class="circle-inner">' +
        '<img class="circle-base" src="' + base + MAP_BASE.key + '.webp" alt="' + room.name + '" loading="lazy" onerror="this.style.display=\'none\'">' +
        '<div class="circle-slides">' +
          MAP_CORNERS.map((cn, i) =>
            '<img class="cs' + (i === 0 ? " active" : "") + '" data-corner="' + cn.label +
            '" src="' + base + cn.key + '.webp" alt="" loading="lazy" onerror="this.style.display=\'none\'">'
          ).join("") +
        '</div>' +
      '</div>' +
      '<svg class="circle-ring" viewBox="0 0 100 100" aria-hidden="true">' +
        '<defs><path id="' + pid + '" d="M50,50 m-40,0 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0"/></defs>' +
        '<text><textPath href="#' + pid + '" startOffset="0">' + MAP_BASE.label + ' • ' + MAP_BASE.label + ' • </textPath></text>' +
      '</svg>' +
      '<div class="circle-name">' + room.icon + ' ' + room.name + '</div>';
    c.addEventListener("click", () => openRoomWithTransition(room.id));

    // هاور: اسلایدشو گوشه‌ها + متن چرخنده
    const baseImg = c.querySelector(".circle-base");
    const imgs = c.querySelectorAll(".circle-slides img");
    const ring = c.querySelector(".circle-ring textPath");
    let si = 0, timer = null;
    function step() {
      imgs[si].classList.remove("active");
      si = (si + 1) % imgs.length;
      imgs[si].classList.add("active");
      if (ring) ring.textContent = imgs[si].dataset.corner + " • " + imgs[si].dataset.corner + " • ";
    }
    function reset() {
      si = 0;
      imgs.forEach((im, i) => im.classList.toggle("active", i === 0));
      if (ring) ring.textContent = MAP_BASE.label + " • " + MAP_BASE.label + " • ";
    }
    c.addEventListener("mouseenter", () => { if (baseImg) baseImg.style.opacity = "0"; reset(); step(); timer = setInterval(step, 2000); });
    c.addEventListener("mouseleave", () => { if (timer) clearInterval(timer); timer = null; reset(); if (baseImg) baseImg.style.opacity = "1"; });
    if (wrap) {
      // قرارگیری روی نقشه در محل اتاق (با فاصله اگر هم‌مکان باشند)
      const pos = posOf[room.id] || (room.heroPos && room.heroPos.center ? room.heroPos.center : { x: 50, y: 50 });
      c.style.left = pos.x + "%";
      c.style.top  = pos.y + "%";
      c.style.transform = "translate(-50%, -50%)";
      wrap.appendChild(c);
    }
  });
}

/* انیمیشن ورود نقشه: plan2 از دور فید+زوم، محو، پس‌زمینه باقی‌مانده */
function playMapEnter() {
  const screen = document.getElementById("screen-map");
  if (!screen) return;
  let fx = document.getElementById("map-enter-fx");
  if (!fx) {
    fx = document.createElement("div");
    fx.id = "map-enter-fx";
    fx.className = "map-enter-fx";
    screen.appendChild(fx);
  }
  fx.style.animation = "none";
  void fx.offsetWidth;
  fx.style.animation = "";
  setTimeout(() => { if (fx && fx.parentNode) fx.remove(); }, 2000);
}

/* ---------- Zoom + fade transition into room ---------- */
function openRoomWithTransition(id) {
  const grid = document.getElementById("map-circles");
  if (!grid || transitioning) return;
  
  const room = ROOMS.find(r => r.id === id);
  if (!room) return;
  
  currentRoom = room;
  currentView = "hero";
  transitioning = true;
  
  // Animate: zoom out effect
  grid.style.transition = "transform 0.5s ease-in, opacity 0.5s ease-in";
  grid.style.transform = "scale(0.8)";
  grid.style.opacity = "0";
  
  setTimeout(() => {
    showScreen("screen-room");
    openRoom(id);
    grid.style.transition = "";
    grid.style.transform = "";
    grid.style.opacity = "";
    transitioning = false;
  }, 450);
}

document.getElementById("map-back-lobby").addEventListener("click", () => showScreen("screen-lobby"));

/* ---------- اتاق ---------- */
function isPortrait() {
  return window.innerHeight > window.innerWidth * 1.05 || window.innerWidth < 640;
}
function openRoom(id) {
  clearSlideTimer();
  currentRoom = ROOMS.find(r => r.id === id);
  currentView = "hero";
  transitioning = false;
  showScreen("screen-room");
  const a = document.getElementById("room-bg-a");
  const b = document.getElementById("room-bg-b");
  // ریست کامل هر دو لایه (باگ قبلی: کلاس off هیچوقت پاک نمیشد و لایهی a برای همیشه مخفی میماند)
  a.classList.remove("on", "off");
  b.classList.remove("on", "off");
  a.src = "assets/images/" + currentRoom.folder + "/" + (isPortrait() ? "hero-v" : "media") + ".webp";
  a.classList.add("on");
  activeLayer = "a";
  updateRoomChrome();
  if (typeof updateExplorerVisibility === "function") updateExplorerVisibility(id);
  injectAudioIntoHotspots();
}

function setRoomView(view) {
  if (transitioning) return;
  if (view === currentView) return;
  clearSlideTimer();
  transitioning = true;
  const nextView = view;
  const a = document.getElementById("room-bg-a");
  const b = document.getElementById("room-bg-b");
  // نمای جلو: عکس media.webp اتاق
  const file = view === "media" ? (isPortrait() ? "hero-v" : "hero")
    : (view === "hero" ? (isPortrait() ? "hero-v" : "hero") : view);
  const src = "assets/images/" + currentRoom.folder + "/" + file + ".webp";
  const showEl = activeLayer === "a" ? b : a;
  const hideEl = activeLayer === "a" ? a : b;

  const viewLabel = (currentRoom.views && currentRoom.views[nextView] && currentRoom.views[nextView].label) || VIEW_LABELS[nextView];
  document.getElementById("room-caption").textContent = currentRoom.icon + " " + currentRoom.name + " — " + viewLabel;

  // Disable nav during transition
  const nav = document.getElementById("view-nav");
  if (nav) nav.style.pointerEvents = "none";

  const preload = new Image();
  preload.onload = () => {
    currentView = nextView;
    showEl.src = src;
    showEl.classList.toggle("zoom", view === "media"); // نمای جلو: زوم بیشتر نسبت به نمای کلی
    hideEl.classList.remove("zoom");
    showEl.classList.remove("off");
    showEl.classList.add("on");
    hideEl.classList.remove("on");
    activeLayer = activeLayer === "a" ? "b" : "a";
    transitioning = false;
    renderHotspots();
    renderViewNav();
    if (nav) nav.style.pointerEvents = "";
  };
  preload.onerror = () => {
    transitioning = false;
    renderViewNav();
    if (nav) nav.style.pointerEvents = "";
  };
  preload.src = src;
}

function updateRoomChrome() {
  const viewLabelCur = (currentRoom.views && currentRoom.views[currentView] && currentRoom.views[currentView].label) || VIEW_LABELS[currentView];
  document.getElementById("room-caption").textContent = currentRoom.icon + " " + currentRoom.name + " — " + viewLabelCur;
  renderHotspots();
  renderViewNav();
}

/* ---------- هاتسپاتها + برچسبها ----------
   هاتسپاتها همیشه show میشن (hover-only)، منو فقط موقع هاور باز میشه.
   برچسبِ هر هاتسپات مستقیماًٌ زیر آیکون، با رنگ مخصوص خودش نمایش داده میشه؛
   زیر منو نیست و با همپوشانی ندارد. */
let menuHideTimer = null;
let openHotspotEl = null;

function renderHotspots() {
  const wrap = document.getElementById("room-hotspots");
  wrap.innerHTML = "";
  openHotspotEl = null;
  closeGlassMenu();
  clearTimeout(menuHideTimer);
  renderHeroNavZones();
  if (!currentRoom.views) return;
  const viewData = currentRoom.views[currentView];
  let hotspots = (viewData && viewData.hotspots) || [];
  // منوی محتوای تصویری/صوتی فقط در نمای جلو؛ نمای کلی فقط زون‌های ناوبری دارد
  if (currentView === "media") hotspots = buildMediaHotspots();
  // کودک فقط هات‌اسپات "محتوای صوتی" در نمای جلو می‌بیند
  if (typeof currentUserRole !== 'undefined' && currentUserRole === 'child') {
    if (currentView === "media") {
      hotspots = hotspots.filter(function(h) { return h.title === "محتوای صوتی"; });
    } else {
      hotspots = [];
    }
  }
  hotspots.forEach((hotspot) => {
    const el = document.createElement("div");
    el.className = "hotspot";
    /* Correct for object-fit:cover crop */
    const img = document.querySelector('.scene-bg.on') || document.querySelector('.scene-bg');
    let hx = hotspot.x, hy = hotspot.y;
    if (img && img.naturalWidth && img.naturalHeight) {
      const cw = img.clientWidth, ch = img.clientHeight;
      const nw = img.naturalWidth, nh = img.naturalHeight;
      const scale = Math.max(cw / nw, ch / nh);
      const rw = nw * scale, rh = nh * scale;
      const ox = (cw - rw) / 2, oy = (ch - rh) / 2;
      hx = (ox + rw * hotspot.x / 100) / cw * 100;
      hy = (oy + rh * hotspot.y / 100) / ch * 100;
    }
    el.style.left = Math.max(2, Math.min(98, hx)) + "%";
    el.style.top = Math.max(2, Math.min(98, hy)) + "%";
    const label = document.createElement("div");
    label.className = "hotspot-label";
    label.textContent = hotspot.title;
    el.appendChild(label);

    // کلیک: باز/بسته کردن منو
    el.addEventListener("click", (e) => {
      e.stopPropagation();
      clearTimeout(menuHideTimer);
      if (openHotspotEl === el) { closeGlassMenu(); return; }
      openGlassMenu(hotspot, el);
    });
    // hover: باز کردن منو پس از 300ms تأخیر (جلوگیری از باز شدن ناخواسته)
    el.addEventListener("mouseenter", (e) => {
      e.stopPropagation();
      clearTimeout(menuHideTimer);
      menuHideTimer = setTimeout(() => openGlassMenu(hotspot, el), 300);
    });
    el.addEventListener("mouseleave", () => {
      clearTimeout(menuHideTimer);
      menuHideTimer = setTimeout(() => closeGlassMenu(), 1500);
    });
    wrap.appendChild(el);
  });
  if (currentView === "media") renderMediaSlideshow();
}

/* ---------- محتوای رسانهای اتاق: صوتی (چپ) / تصویری (راست) ---------- */
function _catAudio(a) {
  var all = ((a.category||"")+" "+(a.channel||"")+" "+(a.title||"")+" "+(a.info||"")).toLowerCase();
  if (/لالایی|lullaby|خواب بخیر|شب بخیر/.test(all)) return "لالایی";
  if (/ترانه|آهنگ|music|song|خواننده/.test(all)) return "ترانه و آهنگ";
  if (/مدیتیشن|meditation|مراقبه|mindful/.test(all)) return "مدیتیشن";
  if (/روانشناسی|تربیت|والد|mادرانه|parenting/.test(all)) return "پادکست والدین";
  if (/قصه|dastan|story|حیوان|کلاسیک|خیال|شبانه/.test(all)) return "قصه و داستان";
  if (/شعر|شاعر|شعرخوانی/.test(all)) return "شعر";
  if (/بی کلام|instrumental|موسیقی آرامش/.test(all)) return "موسیقی آرامش";
  if (/آموزش|learn|edu/.test(all)) return "آموزش";
  return "سایر صوت";
}
function buildMediaHotspots() {
  const all = [];
  Object.values(currentRoom.views).forEach((v) => (v.hotspots || []).forEach((h) => (h.categories || []).forEach((c) => (c.items || []).forEach((it) => all.push(it)))));
  const audio = [], visual = [];
  all.forEach((it) => (it.type === "audio" ? audio : visual).push(it));

  // ── بایگانی: والد فقط محتوای غیرصوتی ──
  if (currentRoom && currentRoom.id === 'baghaghi' && currentUserRole === 'parent') {
    audio.length = 0;
  }
  if (typeof AUDIO_LIBRARY !== "undefined" && AUDIO_LIBRARY && typeof ROOM_AUDIO_MAP !== "undefined") {
    // ── بایگانی: والد صوت نمی‌بیند ──
    if (currentRoom && currentRoom.id === 'baghaghi' && currentUserRole === 'parent') {
      // skip audio library for archive/parent
    } else {
    var rcats = ROOM_AUDIO_MAP[currentRoom.id];
    if (rcats) {
      var seen = {};
      audio.forEach(function(a) { seen[(a.title||'').trim().toLowerCase()] = true; });
      AUDIO_LIBRARY.forEach(function(a) {
        if (rcats.indexOf(a.category) !== -1 && a.audioUrl) {
          var key = a.title.trim().toLowerCase();
          if (seen[key]) return;
          seen[key] = true;
          audio.push({ title: a.title, type: "audio", audioUrl: a.audioUrl,
          category: a.category, channel: a.channel || a.category || "",
          desc: (a.info || "").substring(0, 300),
          duration: a.duration || "", _group: _catAudio(a) });
        }
      });
    }
    } // end else (not archive/parent)
  }
  // Add videos from VIDEO_LIBRARY for this room
  var roomVideos = (typeof getVideosForRoom === 'function') ? getVideosForRoom(currentRoom.id) : [];
  roomVideos.forEach(function(v) {
    visual.push({
      type: 'video', title: v.titleFa || v.title, url: v.url,
      category: 'ویدیوی آموزشی', desc: v.desc || '', duration: v.duration || '',
      channel: v.channel || '', lang: v.lang || ''
    });
  });
  const byType = (items) => {
    const g = {};
    items.forEach((it) => { (g[it.type] = g[it.type] || []).push(it); });
    return Object.keys(g).map((t) => {
      if (t === "audio") {
        const sg = {};
        items.filter(it => it.type === "audio").forEach(it => {
          const g2 = it._group || "صوت";
          (sg[g2] = sg[g2] || []).push(it);
        });
        return Object.keys(sg).map(g2 => ({ title: g2, items: sg[g2] }));
      }
      return { title: t === "game" ? "بازی و سرگرمی" : t === "activity" ? "فعالیت و رنگآمیزی" : t === "pdf" ? "جزوه و کاربرگ" : t === "video" ? "ویدیوی آموزشی" : t, items: g[t] };
    }).flat();
  };
  const p = isPortrait(); // موبایل: باکس تور پایین صفحه → منوها بروند بالا؛ دسکتاپ: کناره‌ها خارج از کادر
  return [
      { title: "🖼 محتوای تصویری", x: p ? 15 : 92, y: p ? 12 : 50, categories: byType(visual) },
      { title: "🎧 محتوای صوتی", x: p ? 85 : 8, y: p ? 12 : 50, categories: byType(audio) },
    ];
  }

/* ---------- تور مجازی نمای جلو: مثل تور گردش لابی — گوشه‌به‌گوشه، محتوای کامل هر آیتم ---------- */
let mslideTimer = null; // نام m- تا با lobby.js (slideTimer) تداخل global نداشته باشد
let slideIdx = 0;
let slideList = [];
let slideViews = [];
let slideViewStart = {};
let slideViewEnd = {};
let slideShuffle = false;
let _fullSlideList = [];
function clearSlideTimer() { if (mslideTimer) { clearInterval(mslideTimer); mslideTimer = null; } }
const SLIDE_MS = 15000; // مدت نمایش هر اسلاید (سه برابر حالت قبلی)
const msImg = (view) => "assets/images/" + currentRoom.folder + "/" + view + ".webp";
const msSafe = (i, n) => ((i % n) + n) % n;

function buildSlides() {
  const cyc = (k) => { const i = CYCLE_ORDER.indexOf(k); return i < 0 ? 99 : i; };
  const views = Object.keys(currentRoom.views).filter((k) => k !== "hero"
    && (currentRoom.views[k].hotspots || []).some((h) => (h.categories || []).some((c) => (c.items || []).length)))
    .sort((a, b) => cyc(a) - cyc(b));
  if (slideShuffle) {
    for (let i = views.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [views[i], views[j]] = [views[j], views[i]]; }
  }
  slideViews = views;
  slideList = [];
  slideViewStart = {};
  slideViewEnd = {};

  function isEmptyItem(it) {
    if (!it) return true;
    if (it.audioUrl) return false;
    if (it.image) return false;
    if (it.desc && it.desc.trim()) return false;
    if (it.url) return false;
    if (it.page) return false;
    if (it.instructions && it.instructions.trim()) return false;
    if (it.materials && it.materials.trim()) return false;
    return true;
  }

  // جمع‌آوری همه آیتم‌ها (شامل صوتی و تصویری و کاربرگ) برای هر ویو
  views.forEach((k) => {
    slideViewStart[k] = slideList.length;
    const v = currentRoom.views[k];

    // ۱. آیتم‌های هات‌اسپات این ویو (فیلتر خالی‌ها)
    (v.hotspots || []).forEach((h) =>
      (h.categories || []).forEach((c) => {
        (c.items || []).forEach((it) => {
          if (isEmptyItem(it)) return;
          slideList.push({ view: k, cat: c.title, item: it });
        });
      })
    );

    // ۲. محتوای صوتی از AUDIO_LIBRARY (فقط در ویوی اول)
    if (k === views[0] && typeof AUDIO_LIBRARY !== "undefined" && AUDIO_LIBRARY && typeof ROOM_AUDIO_MAP !== "undefined") {
      var rcats = ROOM_AUDIO_MAP[currentRoom.id];
      if (rcats) {
        var aSeen = {};
        AUDIO_LIBRARY.forEach(function(a) {
          if (rcats.indexOf(a.category) === -1 || !a.audioUrl) return;
          var key = a.title.trim().toLowerCase();
          if (aSeen[key]) return;
          aSeen[key] = true;
          var desc = (a.info || "").substring(0, 300);
          if (!desc) return;
          views.forEach(function(vk) {
            slideList.push({ view: vk, cat: "صوت", item: { title: a.title, type: "audio", audioUrl: a.audioUrl, category: a.category, channel: a.channel || a.category || "", desc: desc, duration: a.duration || "", _group: typeof _catAudio === "function" ? _catAudio(a) : "audio" } });
          });
        });
      }
    }

    // ۳. کاربرگ‌های آرشیو با عکس (فقط در ویوی اول)
    if (k === views[0] && typeof ARCHIVE_DATA !== "undefined" && ARCHIVE_DATA) {
      var shSeen = {};
      ARCHIVE_DATA.forEach(function(sh) {
        if (sh.room !== currentRoom.id) return;
        if (shSeen[sh.title]) return;
        shSeen[sh.title] = true;
        if (!sh.image && !sh.category) return;
        views.forEach(function(vk) {
          slideList.push({ view: vk, cat: "کاربرگ", item: { title: sh.title, type: sh.type || "pdf", image: sh.image || "", desc: sh.category || "", url: sh.url || "", page: sh.page || "" } });
        });
      });
    }

    slideViewEnd[k] = slideList.length;
  });
  console.log("[buildSlides] room:", currentRoom && currentRoom.id, "slides:", slideList.length, "views:", views.length);
}


function renderMediaSlideshow() {
  clearSlideTimer();
  const old = document.getElementById("media-slideshow");
  if (old) old.remove();
  const wrap = document.getElementById("room-hotspots");
  buildSlides();
  if (!slideList.length) { console.log("[slideshow] slideList empty, views:", slideViews, "room:", currentRoom && currentRoom.id); return; }
  slideIdx = 0;

  const box = document.createElement("div");
  box.id = "media-slideshow";
  box.className = "media-slideshow";
  const bg = document.createElement("img");
  bg.className = "ms-bg"; bg.alt = "";
  const top = document.createElement("div");
  top.className = "ms-top";
  const body = document.createElement("div");
  body.className = "ms-body";
  const viewMenu = document.createElement("div");
  viewMenu.className = "ms-menu";
  const count = document.createElement("div");
  count.className = "ms-count";

  const tbtn = (label, title, fn) => {
    const b = document.createElement("button");
    b.textContent = label; b.title = title; b.className = "ms-btn";
    b.addEventListener("click", (e) => { e.stopPropagation(); fn(); });
    return b;
  };
  const btnClose = tbtn("✕", "بستن و بازگشت به نمای کلی", () => setRoomView("hero"));
  const btnViews = tbtn("☰", "فهرست گوشه‌ها", () => viewMenu.classList.toggle("open"));
  const btnPrevView = tbtn("⏮", "گوشه قبلی", () => jumpView(-1));
      const btnPrev = tbtn("◀◀", "قبلی", () => step(-1));
      const btnPlay = tbtn("⏸", "توقف / پخش", () => togglePlay());
      const btnNext = tbtn("▶▶", "بعدی", () => step(1));
      const btnNextView = tbtn("⏭", "گوشه بعدی", () => jumpView(1));
  const btnShuffle = tbtn("🔀", "تصادفی کردن گوشه‌ها", () => toggleShuffle());
  var msMuted=false;
  const btnMute=tbtn("🔇","بیصدا",function(){
    msMuted=!msMuted;
    this.textContent=msMuted?"🔊":"🔇";
    // Mute any playing video in the slideshow
    var vids=document.querySelectorAll('#media-slideshow video');
    vids.forEach(function(v){v.muted=msMuted;});
    // Also mute the player if open
    if(typeof yrMute==='function')yrMute(msMuted);
  });
  top.append(btnClose, btnViews, btnNextView, btnNext, btnPlay, btnPrev, btnPrevView, btnShuffle, count);

  function renderViewMenu() {
    viewMenu.innerHTML = "";
    const cur = slideList[msSafe(slideIdx, slideList.length)].view;
    slideViews.forEach((k) => {
      const vh = document.createElement("div");
      vh.className = "ms-menu-view" + (k === cur ? " ms-menu-on" : "");
      vh.textContent = "◈ " + (VIEW_LABELS[k] || k);
      vh.addEventListener("click", (e) => { e.stopPropagation(); viewMenu.classList.remove("open"); jumpTo(k); });
      viewMenu.appendChild(vh);
      // زیرفهرست: فهرست‌ها (categories) و آیتم‌هایشان — کلیک → پرش به همان اسلاید
      for (let i = slideViewStart[k]; i < slideViewEnd[k]; i++) {
        const s = slideList[i];
        const it = document.createElement("button");
        it.className = "ms-menu-item" + (s.item ? " ms-menu-sub" : " ms-menu-cat") + (i === msSafe(slideIdx, slideList.length) ? " ms-menu-on" : "");
        it.textContent = (s.item ? "•  " : "▸  ") + (s.item ? s.item.title : s.cat);
        it.addEventListener("click", (e) => { e.stopPropagation(); viewMenu.classList.remove("open"); slideIdx = i; show(); });
        viewMenu.appendChild(it);
      }
    });
  }

  // نوار فیلتر تگ‌ها
  var tagBar = document.createElement('div');
  tagBar.className = 'ms-tagbar';
  var slideFilter = '';
  var TAG_DEFS = [{v:'',l:'همه'},{v:'pdf',l:'📄 کاربرگ'},{v:'audio',l:'🔊 صوت'},{v:'video',l:'🎬 ویدیو'},{v:'game',l:'🎮 بازی'},{v:'activity',l:'🎯 فعالیت'},{v:'story',l:'📖 داستان'}];
  function renderTags() {
    tagBar.innerHTML = '';
    TAG_DEFS.forEach(function(t) {
      var b = document.createElement('button');
      b.className = 'ms-tagbtn' + (slideFilter === t.v ? ' ms-tag-on' : '');
      b.textContent = t.l;
      b.addEventListener('click', function(e) {
        e.stopPropagation();
        slideFilter = t.v;
        renderTags();
        applySlideFilter();
      });
      tagBar.appendChild(b);
    });
  }
  function applySlideFilter() {
    if (!_fullSlideList.length) _fullSlideList = slideList.slice();
    slideList = slideFilter ? _fullSlideList.filter(function(s) { return s.item && s.item.type === slideFilter; }) : _fullSlideList.slice();
    slideIdx = 0;
    if (slideList.length) show();
    else body.innerHTML = '<div style="padding:2rem;text-align:center;color:#aaa;">محتوایی با این فیلتر موجود نیست</div>';
  }
  renderTags();
  box.append(bg, top, tagBar, body, viewMenu);
  wrap.appendChild(box);

  const TICONS = { pdf: "📄", video: "🎬", audio: "🔊", game: "🎮", activity: "🎯", story: "📖", song: "🎵", craft: "✂️" };
  const TLABELS = { pdf: "کاربرگ", video: "ویدیو", audio: "صوت", game: "بازی", activity: "فعالیت", story: "قصه", song: "آهنگ", craft: "کاردستی" };

  const show = () => {
    const s = slideList[msSafe(slideIdx, slideList.length)];
    bg.src = msImg(s.view);
    const label = "◈ " + (VIEW_LABELS[s.view] || s.view);
    if (!s.item) {
      body.classList.add("ms-cat-slide");
      body.innerHTML = "<div class=\"ms-cat-title\">" + escHtml(s.cat) + "</div>"
        + "<div class=\"ms-cat-view\">" + label + "</div>";
    } else {
      body.classList.remove("ms-cat-slide");
      const it = s.item;
      const type = (it.type || "activity").toLowerCase();
      let h = "<div class=\"ms-two-col\"><div class=\"ms-text\">";
      h += "<div class=\"ms-meta\"><span class=\"ms-badge\">" + (TICONS[type] || "📎") + " " + (TLABELS[type] || type) + "</span>"
        + "<span class=\"ms-viewtag\">" + label + " · " + escHtml(s.cat) + "</span></div>";
      h += "<div class=\"ms-title\" onclick=\"openMediaModal(" + JSON.stringify(it).replace(/"/g, "&quot;") + ")\">" + escHtml(it.title) + "</div>";
      if (it.desc) h += "<div class=\"ms-sec\"><div class=\"ms-sec-t\">📝 توضیحات</div><div class=\"ms-desc\">" + escHtml(it.desc) + "</div></div>";
      if (it.materials) h += "<div class=\"ms-sec\"><div class=\"ms-sec-t\">🧰 وسایل مورد نیاز</div><div class=\"ms-desc\">" + escHtml(it.materials) + "</div></div>";
      if (it.instructions) {
        h += '<div class="ms-sec"><div class="ms-sec-t">📋 مراحل اجرا</div><div class="ms-steps">';
        var _nums = ['1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣'];
        var _steps = it.instructions.split(/[\n،؛.]+|\d+[.)-]|→/g).filter(function(x) { return x.trim(); });
        _steps.forEach(function(st, si) {
          h += '<div class="ms-step-item">' + (si < _nums.length ? _nums[si] + ' ' : (si+1) + '. ') + escHtml(st.trim()) + '</div>';
        });
        h += '</div></div>';
      }
      if (it.safety) h += "<div class=\"ms-sec ms-safety\"><div class=\"ms-sec-t\">⚠️ نکات ایمنی</div><div class=\"ms-desc\">" + escHtml(it.safety) + "</div></div>";
      if (it.url || it.page) {
        h += "<div class=\"ms-actions\">";
        if (it.url) h += "<a class=\"ms-act ms-act-primary\" href=\"" + escHtml(it.url) + "\" target=\"_blank\" rel=\"noopener\">📥 دانلود کاربرگ</a>";
        if (it.page) h += "<a class=\"ms-act\" href=\"" + escHtml(it.page) + "\" target=\"_blank\" rel=\"noopener\">🌐 مشاهده در سایت</a>";
        h += "</div>";
      }
      h += "</div><div class=\"ms-media\"><div class=\"ms-media-frame\" onclick=\"openMediaModal(" + JSON.stringify(it).replace(/"/g, "&quot;") + ")\">";
      h += "<img src=\"" + escHtml(it.image || msImg(s.view)) + "\" alt=\"\" onerror=\"this.src='" + msImg(s.view) + "'\">";
      h += "</div></div></div>";
      body.innerHTML = h;
    }
    count.textContent = (msSafe(slideIdx, slideList.length) + 1) + " / " + slideList.length;
    renderViewMenu();
  };

  const step = (d) => { slideIdx += d; show(); };
  const viOf = () => slideViews.indexOf(slideList[msSafe(slideIdx, slideList.length)].view);
  const jumpTo = (k) => { slideIdx = slideViewStart[k] || 0; show(); };
  const jumpView = (d) => {
    const vi = viOf();
    if (vi < 0) return;
    jumpTo(slideViews[msSafe(vi + d, slideViews.length)]);
  };
  const togglePlay = () => {
    if (mslideTimer) { clearSlideTimer(); btnPlay.textContent = "▶"; }
    else { mslideTimer = setInterval(() => { slideIdx++; show(); }, SLIDE_MS); btnPlay.textContent = "⏸"; }
  };
  const toggleShuffle = () => {
    slideShuffle = !slideShuffle;
    btnShuffle.textContent = slideShuffle ? "📋" : "🔀";
    btnShuffle.title = slideShuffle ? "ترتیبی کردن گوشه‌ها" : "تصادفی کردن گوشه‌ها";
    clearSlideTimer();
    buildSlides();
    slideIdx = 0;
    mslideTimer = setInterval(() => { slideIdx++; show(); }, SLIDE_MS);
    show();
  };

  show();
  mslideTimer = setInterval(() => { slideIdx++; show(); }, SLIDE_MS);
}

/* ---------- ناوبری روی نمای کلی ----------
   ذوزنقهٔ چپ/راست (بالا) + مثلث پشت (پایین) — هم‌شکل قبل؛ دایرهٔ نمای جلو وسط، روی ساختار اضافه شده */
function renderHeroNavZones() {
  const wrap = document.getElementById("hero-nav-zones");
  if (!wrap) return;
  wrap.innerHTML = "";
  if (currentView !== "hero") return;
  const zones = [
    { cls: "hero-zone-left", target: "herog_left", labelPos: { left: "25%", top: "18%" } },
        { cls: "hero-zone-front", target: "herog", labelPos: { left: "50%", top: "82%" } },
        { cls: "hero-zone-right", target: "herog_right", labelPos: { left: "75%", top: "18%" } },
    { cls: "hero-zone-media", target: "media", labelPos: { left: "50%", top: "32%" } }, // دایرهٔ وسط
  ];
  zones.forEach(z => {
    const el = document.createElement("div");
    el.className = "hero-zone " + z.cls;
    const viewData = currentRoom.views ? currentRoom.views[z.target] : null;
    const labelText = (viewData && viewData.label) || (z.target === "media" ? "چند‌رسانه‌ای" : "");
    if (labelText) {
      const label = document.createElement("div");
      label.className = "hero-zone-label";
      label.textContent = labelText;
      // Position label at zone center using fixed positioning
      label.style.left = z.labelPos.left;
      label.style.top = z.labelPos.top;
      // Set initial transform for non-hover state
      label.style.transform = "translate(-50%, -50%) scale(0.92)";
      // Set initial color per zone
      if (z.cls === "hero-zone-left") label.style.background = "#5aa9e6";
            else if (z.cls === "hero-zone-right") label.style.background = "#e6739f";
            else if (z.cls === "hero-zone-media") label.style.background = "#34c988";
            else label.style.background = "#f6a94a";
      el.appendChild(label);
    }
    el.addEventListener("click", (e) => { e.stopPropagation(); setRoomView(z.target); });
    wrap.appendChild(el);
  });
}

/* ---------- ناوبری چرخهای ----------
   چرخهٔ بستهٔ ۴ نما: جلو > راست > پشت > چپ > جلو (گردش به راست = +۱ در چرخه، به چپ = −۱)
   نمای کلی و دکمههای جلو/پشت خارج از چرخه: کلی → چپ/راست؛ جلو/پشت همیشه نمای خودشان. */
const CYCLE_ORDER = ["media", "herog_right", "herog", "herog_left"]; // +۱: جلو←راست←پشت←چپ
function getNextView(current, direction) {
  if (current === "hero") return direction === 1 ? "herog_right" : "herog_left";
  const i = CYCLE_ORDER.indexOf(current);
  if (i < 0) return current;
  return CYCLE_ORDER[(i + direction + 4) % 4];
}

function renderViewNav() {
  const nav = document.getElementById("view-nav");
  nav.innerHTML = "";
  const rightBtn = document.createElement("button");
  rightBtn.textContent = "▶";
  rightBtn.title = "گردش به راست";
  rightBtn.addEventListener("click", (e) => { e.stopPropagation(); setRoomView(getNextView(currentView, 1)); });
  const leftBtn = document.createElement("button");
  leftBtn.textContent = "◀";
  leftBtn.title = "گردش به چپ";
  leftBtn.addEventListener("click", (e) => { e.stopPropagation(); setRoomView(getNextView(currentView, -1)); });
  const centerBtn = document.createElement("button");
  centerBtn.textContent = "⌂";
  centerBtn.title = "نمای پشت";
  centerBtn.className = "vn-center" + (currentView === "herog" ? " active" : "");
  centerBtn.addEventListener("click", (e) => { e.stopPropagation(); setRoomView("herog"); });
  const mediaBtn = document.createElement("button");
  mediaBtn.textContent = "🎬";
  mediaBtn.title = "نمای جلو";
  mediaBtn.className = "vn-media" + (currentView === "media" ? " active" : "");
  mediaBtn.addEventListener("click", (e) => { e.stopPropagation(); setRoomView("media"); });
  const heroBtn = document.createElement("button");
  heroBtn.textContent = "🏠";
  heroBtn.title = "نمای کلی";
  heroBtn.className = currentView === "hero" ? "vn-hero active" : "vn-hero";
  heroBtn.addEventListener("click", (e) => { e.stopPropagation(); setRoomView("hero"); });
  const stack = document.createElement("div");
  stack.className = "vn-stack";
  stack.appendChild(mediaBtn);
  stack.appendChild(heroBtn);
  stack.appendChild(centerBtn);
  nav.appendChild(rightBtn);
  nav.appendChild(stack);
  nav.appendChild(leftBtn);
}

/* ---------- باز/بسته کردن منوی شیشهای ---------- */
function openGlassMenu(hotspot, hotspotEl) {
  clearTimeout(menuHideTimer);
  closeGlassMenu();
  openHotspotEl = hotspotEl || null;
  const menu = document.createElement("div");
  menu.className = "glass-menu fade";
  menu.id = "active-glass-menu";

  menu.addEventListener("mouseenter", () => clearTimeout(menuHideTimer));
  menu.addEventListener("mouseleave", () => {
    menuHideTimer = setTimeout(() => closeGlassMenu(), 800);
  });

  const screen = document.getElementById("screen-room");
  menu.style.position = "absolute";
  menu.style.visibility = "hidden";
  menu.style.top = "-9999px";
  menu.style.left = "0";

  // Collect all items flat
  const allItems = [];
  (hotspot.categories || []).forEach((cat, ci) => {
    cat.items.forEach((it, ii) => {
      allItems.push({ ...it, _ci: ci, _ii: ii });
    });
  });
  // کودک فقط محتوای صوتی در منو ببیند
  if (typeof currentUserRole !== 'undefined' && currentUserRole === 'child') {
    allItems.length = 0;
    (hotspot.categories || []).forEach((cat, ci) => {
      if (cat.title === "محتوای صوتی") {
        cat.items.forEach((it, ii) => {
          allItems.push({ ...it, _ci: ci, _ii: ii });
        });
      }
    });
  }

  const TYPE_ICONS = { pdf: "\u{1F4C4}", video: "\u{1F3AC}", game: "\u{1F3AE}", activity: "\u{1F3AF}", craft: "\u{2702}\u{FE0F}", image: "\u{1F5BC}\u{FE0F}" };
  const TYPE_LABELS = { pdf: "کاربرگ", video: "ویدیو", game: "بازی", activity: "فعالیت", craft: "کاردستی", image: "عکس" };
  const TYPE_ORDER = ["pdf", "game", "video", "activity", "craft", "image", "other"];
  const _G_ICONS = {"قصه و داستان":"\uD83D\uDCD6","لالایی":"\uD83C\uDF19","ترانه و آهنگ":"\uD83C\uDFB5","مدیتیشن":"\uD83E\uDDD8","پادکست والدین":"\uD83D\uDCDE","شعر":"\u270D\uFE0F","موسیقی آرامش":"\uD83C\uDFB6","آموزش":"\uD83D\uDCDA","سایر صوت":"\uD83D\uDD0A"};

  const typeGroups = {};
  const audioByGroup = {};
  allItems.forEach(it => {
    if (it.type === "audio") {
      const g = it._group || "سایر صوت";
      (audioByGroup[g] = audioByGroup[g] || []).push(it);
    } else {
      // کودک فقط صوت ببیند
      if (typeof currentUserRole !== 'undefined' && currentUserRole === 'child') return;
      const tp = it.type || "other";
      (typeGroups[tp] = typeGroups[tp] || []).push(it);
    }
  });

  let html = '<h3 style="margin:.3rem 0 .6rem;padding-right:.3rem;border-bottom:2px solid #ffb84d;font-size:.95rem;">' + hotspot.title + '</h3>';
  // کودک جستجو نیاز ندارد
  if (typeof currentUserRole === 'undefined' || currentUserRole !== 'child') {
    html += '<div class="glass-menu-search"><input type="text" placeholder="🔍 جستجو..." /></div>';
  }

  // فهرست‌های صوتی مستقیم (هر گروه یک فهرست بازشو)
  Object.keys(audioByGroup).sort().forEach(g => {
    const gItems = audioByGroup[g];
    const gIcon = _G_ICONS[g] || "\uD83D\uDD0A";
    const channels = {};
    gItems.forEach(it => { const ch = it.channel || it.category || "سایر"; (channels[ch] = channels[ch] || []).push(it); });
    const chKeys = Object.keys(channels).sort((a,b) => channels[b].length - channels[a].length);
    html += '<div class="menu-type-group" data-type="audio">';
    html += '<div class="menu-type-header" style="color:#3d2f1f;font-weight:bold;">' + gIcon + ' ' + g + ' (' + gItems.length + ') <span class="menu-arrow">\u25C0</span></div>';
    html += '<ul class="menu-type-items" style="display:none;">';
    if (chKeys.length > 1) {
      chKeys.forEach(ch => {
        html += '<li class="menu-subgroup-header" style="color:#5a4a3a;font-size:.78rem;padding-right:.5rem;cursor:pointer;user-select:none;" data-toggle-sub="' + ch.replace(/"/g,'&quot;') + '" data-open="0">\u25B8 ' + ch + ' (' + channels[ch].length + ')</li>';
        channels[ch].forEach(it => {
          html += '<li class="menu-subgroup-item" data-ch="' + ch.replace(/"/g,'&quot;') + '" data-title="' + (it.title || '').replace(/"/g, '&quot;') + '" style="display:none;padding-right:1.5rem;font-size:.78rem;color:#5a4a3a;">' + it.title + '</li>';
        });
      });
    } else {
      gItems.forEach(it => {
        html += '<li data-title="' + (it.title || '').replace(/"/g, '&quot;') + '">' + it.title + '</li>';
      });
    }
    html += '</ul></div>';
  });

  // سایر انواع
  TYPE_ORDER.forEach(tp => {
    if (!typeGroups[tp] || !typeGroups[tp].length) return;
    const icon = TYPE_ICONS[tp] || "\uD83D\uDCC3";
    const label = TYPE_LABELS[tp] || tp;
    html += '<div class="menu-type-group" data-type="' + tp + '">';
    html += '<div class="menu-type-header">' + icon + ' ' + label + ' (' + typeGroups[tp].length + ') <span class="menu-arrow">\u25C0</span></div>';
    html += '<ul class="menu-type-items" style="display:none;">';
    typeGroups[tp].forEach(it => {
      html += '<li data-title="' + (it.title || '').replace(/"/g, '&quot;') + '">' + it.title + '</li>';
    });
    html += '</ul></div>';
  });


  if (allItems.length === 0) {
    html += '<div style="padding:.5rem;color:#888;font-size:.8rem;">محتوایی موجود نیست</div>';
  }

  menu.innerHTML = html;
  screen.appendChild(menu);

  // Search
  const searchInput = menu.querySelector(".glass-menu-search input");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const q = searchInput.value.trim().toLowerCase();
      menu.querySelectorAll(".menu-type-group").forEach(g => {
        let match = false;
        g.querySelectorAll("li").forEach(li => {
          li.style.display = (!q || li.dataset.title.toLowerCase().includes(q)) ? "" : "none";
          if (!q || li.style.display !== "none") match = true;
        });
        g.style.display = match ? "" : "none";
      });
    });
  }

  // Toggle type groups
  menu.querySelectorAll(".menu-type-header").forEach(hdr => {
    hdr.addEventListener("click", (e) => {
      e.stopPropagation();
      const ul = hdr.nextElementSibling;
      const arrow = hdr.querySelector(".menu-arrow");
      const isOpen = ul.style.display !== "none";
      ul.style.display = isOpen ? "none" : "block";
      arrow.textContent = isOpen ? "\u25C0" : "\u25BE";
      repositionGlassMenu(menu, hotspotEl);
    });
  });

  // Toggle channel subgroups
  menu.querySelectorAll('.menu-subgroup-header').forEach(hdr => {
    hdr.addEventListener('click', (e) => {
      e.stopPropagation();
      const ch = hdr.dataset.toggleSub;
      const isOpen = hdr.dataset.open === '1';
      hdr.dataset.open = isOpen ? '0' : '1';
      const arrow = isOpen ? '▸' : '▾';
      const items = menu.querySelectorAll('.menu-subgroup-item[data-ch="' + ch + '"]');
      const count = items.length;
      hdr.textContent = arrow + ' ' + ch + ' (' + count + ')';
      items.forEach(item => { item.style.display = isOpen ? 'none' : ''; });
      repositionGlassMenu(menu, hotspotEl);
    });
  });

  // Item clicks → openMediaModal
  menu.querySelectorAll(".menu-type-items li").forEach(li => {
    li.addEventListener("click", (e) => {
      e.stopPropagation();
      const title = li.dataset.title;
      const item = allItems.find(it => (it.title || "") === title);
      if (!item) return;
      closeGlassMenu();
      if (typeof openMediaModal === "function") {
        openMediaModal(item);
      } else {
        showItemDetails(item, hotspot.title);
      }
    });
  });

  function repositionGlassMenu(m, el) {
    const mW = m.offsetWidth, mH = m.offsetHeight;
    const sr = screen.getBoundingClientRect();
    const vw = sr.width, vh = sr.height, gap = 10;
    let left, top;
    if (el) {
      const hr = el.getBoundingClientRect();
      const hL = hr.left - sr.left, hR = hr.right - sr.left;
      const hT = hr.top - sr.top, hB = hr.bottom - sr.top;
      const hCY = (hT + hB) / 2;
      if (vw - hR >= mW + gap) { left = hR + gap; top = hCY - mH / 2; }
      else if (hL >= mW + gap) { left = hL - gap - mW; top = hCY - mH / 2; }
      else if (vh - hB >= mH + gap) { top = hB + gap; left = hL + (hR - hL) / 2 - mW / 2; }
      else { top = hT - gap - mH; left = hL + (hR - hL) / 2 - mW / 2; }
    } else { left = (vw - mW) / 2; top = vh * 0.15; }
    left = Math.max(gap, Math.min(left, vw - mW - gap));
    top = Math.max(gap, Math.min(top, vh - mH - gap));
    m.style.left = left + "px";
    m.style.top = top + "px";
  }

  repositionGlassMenu(menu, hotspotEl);
  menu.style.visibility = "visible";
}

function closeGlassMenu() {
  clearTimeout(menuHideTimer);
  const existing = document.getElementById("active-glass-menu");
  if (existing) existing.remove();
  openHotspotEl = null;
}



// Backdrop close — click anywhere on screen-room outside menu/hotspot/zone
const screenRoomEl = document.getElementById("screen-room");
if (screenRoomEl) {
  screenRoomEl.addEventListener("click", (e) => {
    if (!e.target.closest(".glass-menu") && !e.target.closest(".hotspot") && !e.target.closest(".hero-zone")) closeGlassMenu();
  });
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeGlassMenu();
});

/* ---------- نمایش جزئیات آیتم (fallback) ---------- */
function showItemDetails(item, zoneTitle) {
  closeGlassMenu();
  // Delegate to openMediaModal for PDF/video/audio/image types
  if (item.type && ["pdf", "video", "audio", "image"].includes(item.type)) {
    openMediaModal(item);
    return;
  }
  const modal = document.getElementById("media-modal");
  const header = document.getElementById("media-header");
  const body = document.getElementById("media-body");
  const actions = document.getElementById("media-actions");
  const typeIcon = { pdf: "📄", video: "🎬", audio: "🔊", game: "🎮", activity: "🎯" }[item.type] || "🎯";
  header.innerHTML = '<span>' + typeIcon + '</span> — ' + item.title;
  let detailsHtml = '<div class="item-details">';
  detailsHtml += '<div class="detail-row"><strong>توضیح:</strong> ' + (item.desc || item.goal || '-') + '</div>';
  if (item.category) detailsHtml += '<div class="detail-row"><strong>دستهبندی:</strong> ' + item.category + '</div>';
  if (item.ageMin || item.ageMax) detailsHtml += '<div class="detail-row"><strong>سن:</strong> ' + (item.ageMin || '?') + '-' + (item.ageMax || '?') + ' سال</div>';
  if (item.duration) detailsHtml += '<div class="detail-row"><strong>مدت:</strong> ' + item.duration + ' دقیقه</div>';
  if (item.materials) detailsHtml += '<div class="detail-row"><strong>وسایل مورد نیاز:</strong> ' + item.materials + '</div>';
  if (item.instructions) {
    detailsHtml += '<div class="detail-row"><strong>مراحل انجام:</strong><ol style="margin:0.5rem 0;padding-right:1.5rem;">';
    item.instructions.split(" → ").forEach(step => {
      detailsHtml += '<li style="margin-bottom:.3rem;">' + step + '</li>';
    });
    detailsHtml += '</ol></div>';
  }
  if (item.safety) detailsHtml += '<div class="detail-row" style="background:#fff3cd;padding:.5rem;border-radius:6px;"><strong>⚠️ نکات ایمنی:</strong> ' + item.safety + '</div>';
  detailsHtml += '</div>';
  body.innerHTML = detailsHtml;
  let actionsHtml = '';
  if (item.type === "game" && item.game && typeof openGameModal === "function") {
    try { const _d=JSON.stringify(item); actionsHtml += '<button class="btn" onclick="openGameModal(' + _d + ')">' + item.title + ' را بازی کنید</button>'; } catch(e){}
  }
  if (item.url) {
    actionsHtml += '<a href="' + item.url + '" target="_blank" class="pill-btn">باز کردن</a>';
    if (item.type === "pdf") actionsHtml += '<a href="' + item.url + '" target="_blank" class="pill-btn">دانلود PDF</a>';
  }
  if (navigator.share && item.title) {
    actionsHtml += '<button class="pill-btn" onclick="navigator.share({title:\'' + item.title.replace(/'/g, "\\'") + '\',url:location.href})">اشتراکگذاری</button>';
  }
  actions.innerHTML = actionsHtml;
  modal.classList.remove("hidden");
  modal.classList.add("active");
}


document.getElementById("media-close").addEventListener("click", () => {
  document.getElementById("media-modal").classList.remove("active");
  document.getElementById("media-modal").classList.add("hidden");
});

/* ---------- تم ---------- */
function applyTheme(theme) {
  document.body.classList.remove("theme-night", "theme-festival");
  if (theme === "night") document.body.classList.add("theme-night");
  else if (theme === "festival") document.body.classList.add("theme-festival");
  document.querySelectorAll(".theme-btn").forEach(b => {
    b.classList.toggle("active", b.dataset.theme === theme);
  });
  localStorage.setItem("yaran-theme", theme);
}

function autoThemeByTime() {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  if (hour >= 18 && minute >= 30 || hour >= 19 || hour < 6) {
    applyTheme("night");
  } else {
    applyTheme("day");
  }
}

document.getElementById("theme-toggle").addEventListener("click", (e) => {
  const btn = e.target.closest(".theme-btn");
  if (btn) applyTheme(btn.dataset.theme);
});

const savedTheme = localStorage.getItem("yaran-theme");
if (savedTheme) {
  applyTheme(savedTheme);
} else {
  autoThemeByTime();
}
setInterval(() => {
  if (!localStorage.getItem("yaran-theme")) autoThemeByTime();
}, 300000);

/* ---------- دکمه‌های بازگشت ---------- */
document.getElementById("room-back-map").addEventListener("click", () => showScreen("screen-map"));
document.getElementById("room-view-content").addEventListener("click", () => { if (currentRoom) openContentForRoom(currentRoom.id); });
document.getElementById("room-back-lobby").addEventListener("click", () => showScreen("screen-lobby"));

/* ---------- کلیدهای کیبورد ---------- */
document.addEventListener("keydown", (e) => {
  if (!document.getElementById("screen-room").classList.contains("active")) return;
  if (e.key === "ArrowRight") setRoomView(getNextView(currentView, 1));
  else if (e.key === "ArrowLeft") setRoomView(getNextView(currentView, -1));
  else if (e.key === "Escape") { closeGlassMenu(); showScreen("screen-map"); }
});


/* inject function moved to js/inject-audio.js */
/* ---------- راه‌اندازی ---------- */
renderDoors();
renderMapCircles();
