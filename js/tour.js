/*  موتور تور مجازی — v5
    چرخه تککلیک + منو فقط هاور + RTL + دکمه نمای جلو + plan zoom-out
*/

const VIEW_LABELS = { hero: "نمای کلی", herog: "نمای جلو", herog_left: "نمای چپ", herog_right: "نمای راست" };

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
  /* موسیقی: تور مجازی اتاق = آرامش شبانه؛ بقیه صفحهها = قطع */
  if (id === "screen-room") { if (window.YaranMusic) window.YaranMusic.start("room"); }
  else if (window.YaranMusic) window.YaranMusic.stop();
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
    el.style.left = door.x + "%";
    el.style.top = door.y + "%";
    el.innerHTML = '<div class="door-icon">🚪</div><div class="door-label">' + door.label + '</div>';
    el.addEventListener("click", () => { currentUserRole = door.role; showScreen("screen-lobby"); });
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

/* ---------- نقشه اتاقها: دایرههای انیمیشنی ---------- */
// عکس پایه هر دایره = نمای کلی اتاق (hero.webp)؛ اسلایدشو هاور فقط گوشه‌های راست/چپ
const MAP_BASE = { key: "hero", label: "نمای کلی" };
const MAP_CORNERS = [
  { key: "herog",       label: "گوشه وسط" },
  { key: "herog_left",  label: "گوشه چپ" },
  { key: "herog_right", label: "گوشه راست" }
];

function renderMapCircles() {
  const wrap = document.getElementById("map-circles");
  if (wrap) wrap.innerHTML = "";

  // مکان دایره روی عکس plan2 (درصد از گوشه چپ‌بالا، از روی خودِ نقشه)
  const PLAN_CENTER = {
    amoozesh: { x: 33, y: 43 },
    bazi: { x: 28, y: 65 },
    honar: { x: 10, y: 76 },
    motaleh: { x: 10, y: 43 },
    salamat: { x: 58, y: 64 },
    khab: { x: 87, y: 61 },
    moraabi: { x: 50, y: 32 },
            "esterahat-moraabian": { x: 38, y: 80 },
            "jalase-owlia": { x: 58, y: 45.6 },
        bayegani: { x: 87, y: 42 },
        teria: { x: 58, y: 56 },
        hayat: { x: 43.06, y: 32 },
            maddakari: { x: 55, y: 58 },
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
  // جابجایی برای جلوگیری از همپوشانی (فاصله حداقل = قطر دایره)
    const MIN_GAP = 18; // درصد فاصله مرکز تا مرکز روی کل صفحه
    const LOCK = new Set(["moraabi", "jalase-owlia", "hayat", "teria"]); // مماس‌ها: قفل
    for (let iter = 0; iter < 80; iter++) {
      let moved = false;
      const ids = Object.keys(posOf);
      for (let a = 0; a < ids.length; a++) {
        for (let b = a + 1; b < ids.length; b++) {
          const A = posOf[ids[a]], B = posOf[ids[b]];
          let dx = B.x - A.x, dy = B.y - A.y;
          let dist = Math.hypot(dx, dy) || 0.01;
          if (dist < MIN_GAP) {
            // سه‌گانه مماس قفل‌اند — فقط همسایه را دور می‌کنیم
            if (LOCK.has(ids[a]) && LOCK.has(ids[b])) continue;
            const push = (MIN_GAP - dist) / 2;
            const ux = dx / dist, uy = dy / dist;
            if (LOCK.has(ids[a])) { B.x += ux * 2 * push; B.y += uy * 2 * push; }
            else if (LOCK.has(ids[b])) { A.x -= ux * 2 * push; A.y -= uy * 2 * push; }
            else { A.x -= ux * push; A.y -= uy * push; B.x += ux * push; B.y += uy * push; }
            moved = true;
          }
        }
      }
      ids.forEach(id => {
        posOf[id].x = Math.max(8, Math.min(92, posOf[id].x));
        posOf[id].y = Math.max(10, Math.min(90, posOf[id].y));
      });
      if (!moved) break;
    }
    // مماس‌ها: حیاط↔مربی عوض شدند (مربی راست حیاط)؛ جلسه اولیا ↕ لبه بالای تریا (قطر دقیق ۱۰۰px)
      {
        const hy = posOf["hayat"], mr = posOf["moraabi"], tl = posOf["teria"], jl = posOf["jalase-owlia"];
        const dX = 100 / window.innerWidth * 100, dY = 100 / window.innerHeight * 100;
        mr.x = hy.x + dX; mr.y = hy.y;
        jl.x = tl.x; jl.y = tl.y - dY;
      }

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
function openRoom(id) {
  currentRoom = ROOMS.find(r => r.id === id);
  currentView = "hero";
  transitioning = false;
  showScreen("screen-room");
  const a = document.getElementById("room-bg-a");
  const b = document.getElementById("room-bg-b");
  // ریست کامل هر دو لایه (باگ قبلی: کلاس off هیچوقت پاک نمیشد و لایهی a برای همیشه مخفی میماند)
  a.classList.remove("on", "off");
  b.classList.remove("on", "off");
  a.src = "assets/images/" + currentRoom.folder + "/hero.webp";
  a.classList.add("on");
  activeLayer = "a";
  updateRoomChrome();
  if (typeof updateExplorerVisibility === "function") updateExplorerVisibility(id);
}

function setRoomView(view) {
  if (transitioning) return;
  if (view === currentView) return;
  transitioning = true;
  const nextView = view;
  const a = document.getElementById("room-bg-a");
  const b = document.getElementById("room-bg-b");
  const src = "assets/images/" + currentRoom.folder + "/" + view + ".webp";
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
  renderHeroNavZones();
  if (currentView === "hero" || !currentRoom.views) return; // نمای کلی: بدون هاتسپات محتوا
  const viewData = currentRoom.views[currentView];
  const hotspots = (viewData && viewData.hotspots) || [];
  hotspots.forEach((hotspot) => {
    const el = document.createElement("div");
    el.className = "hotspot";
    el.style.left = hotspot.x + "%";
    el.style.top = hotspot.y + "%";
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
}

/* ---------- ناوبری روی نمای کلی: مثلث وسط + ذوزنقه چپ/راست ----------
   مثلث: قاعده = لبهی پایین کادر، رأس = وسط دقیق صفحه (کلیک → نمای جلو/herog)
   ذوزنقهی چپ/راست: قرینه، هرکدام کل نیمهی بالا-کنار خودشان تا رأس مثلث (کلیک → herog_left/right)
   برچسبِ هر جهت مستقیماًٌ روی همان گوشه و با رنگ مخصوص خودش نشان داده میشود. */
function renderHeroNavZones() {
  const wrap = document.getElementById("hero-nav-zones");
  if (!wrap) return;
  wrap.innerHTML = "";
  if (currentView !== "hero") return;
  const zones = [
    { cls: "hero-zone-left", target: "herog_left", labelPos: { left: "25%", top: "25%" } },
    { cls: "hero-zone-front", target: "herog", labelPos: { left: "50%", top: "80%" } },
    { cls: "hero-zone-right", target: "herog_right", labelPos: { left: "75%", top: "25%" } },
  ];
  zones.forEach(z => {
    const el = document.createElement("div");
    el.className = "hero-zone " + z.cls;
    const viewData = currentRoom.views ? currentRoom.views[z.target] : null;
    const labelText = (viewData && viewData.label) || "";
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
      else label.style.background = "#f6a94a";
      el.appendChild(label);
    }
    el.addEventListener("click", (e) => { e.stopPropagation(); setRoomView(z.target); });
    wrap.appendChild(el);
  });
}

/* ---------- ناوبری چرخهای ----------
   راست/چپ⇄وسط: اسلایدر کراندار. */
const ORDER_LR = ["herog_left", "herog", "herog_right"];
function getNextView(current, direction) {
  const idx = ORDER_LR.indexOf(current);
  if (idx === -1) {
    return direction === 1 ? ORDER_LR[2] : ORDER_LR[0];
  }
  const nextIdx = Math.max(0, Math.min(ORDER_LR.length - 1, idx + direction));
  return ORDER_LR[nextIdx];
}

function renderViewNav() {
  const nav = document.getElementById("view-nav");
  nav.innerHTML = "";
  const rightBtn = document.createElement("button");
  rightBtn.textContent = "▶";
  rightBtn.title = "نمای بعدی";
  rightBtn.addEventListener("click", (e) => { e.stopPropagation(); setRoomView(getNextView(currentView, 1)); });
  const leftBtn = document.createElement("button");
  leftBtn.textContent = "◀";
  leftBtn.title = "نمای قبلی";
  leftBtn.addEventListener("click", (e) => { e.stopPropagation(); setRoomView(getNextView(currentView, -1)); });
  const centerBtn = document.createElement("button");
  centerBtn.textContent = "⌂";
  centerBtn.title = "نمای جلو";
  centerBtn.className = "vn-center" + (currentView === "herog" ? " active" : "");
  centerBtn.addEventListener("click", (e) => { e.stopPropagation(); setRoomView("herog"); });
  const heroBtn = document.createElement("button");
  heroBtn.textContent = "🏠";
  heroBtn.title = "نمای کلی";
  heroBtn.className = currentView === "hero" ? "vn-hero active" : "vn-hero";
  heroBtn.addEventListener("click", (e) => { e.stopPropagation(); setRoomView("hero"); });
  const stack = document.createElement("div");
  stack.className = "vn-stack";
  stack.appendChild(centerBtn);
  stack.appendChild(heroBtn);
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

  // Group by type
  const TYPE_ICONS = { pdf: "\u{1F4C4}", video: "\u{1F3AC}", audio: "\u{1F50A}", game: "\u{1F3AE}", activity: "\u{1F3AF}", story: "\u{1F4D6}", song: "\u{1F3B5}", craft: "\u{2702}\u{FE0F}", image: "\u{1F5BC}\u{FE0F}" };
  const TYPE_LABELS = { pdf: "\u06A9\u0627\u0631\u0628\u0631\u06AF", video: "\u0648\u06CC\u062F\u06CC\u0648", audio: "\u0635\u0648\u062A", game: "\u0628\u0627\u0632\u06CC", activity: "\u0641\u0639\u0627\u0644\u06CC\u062A", story: "\u0642\u0635\u0647", song: "\u0622\u0647\u0646\u06AF", craft: "\u06A9\u0627\u0631\u062F\u0633\u062A\u06CC", image: "\u0639\u06A9\u0633" };
  const TYPE_ORDER = ["pdf", "game", "video", "audio", "story", "activity", "song", "craft", "image", "other"];
  const typeGroups = {};
  allItems.forEach(it => {
    const tp = it.type || "other";
    if (!typeGroups[tp]) typeGroups[tp] = [];
    typeGroups[tp].push(it);
  });

  // Build HTML
  let html = '<h3 style="margin:.3rem 0 .6rem;padding-right:.3rem;border-bottom:2px solid #ffb84d;font-size:.95rem;">' + hotspot.title + '</h3>';
  // Search
  html += '<div class="glass-menu-search"><input type="text" placeholder="\uD83D\uDD0D \u062C\u0633\u062A\u062C\u0648..." /></div>';
  // Type groups
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

/* ---------- راه‌اندازی ---------- */
renderDoors();
renderMapCircles();
