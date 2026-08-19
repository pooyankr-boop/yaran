/* ---------- نمایش دسته‌بندی محتوای اتاق (بخش ۶: screen-content) ---------- */
let _contentRoom = null;

/* تگ‌های نوع محتوا */
const CONTENT_TYPE_TAGS = [
  { v: "", l: "همه" },
  { v: "pdf", l: "📄 کاربرگ" },
  { v: "audio", l: "🔊 صوت" },
  { v: "video", l: "🎬 ویدیو" },
  { v: "game", l: "🎮 بازی" },
  { v: "activity", l: "🎯 فعالیت" },
  { v: "story", l: "📖 داستان" },
  { v: "song", l: "🎵 آهنگ" },
];

function openContentForRoom(roomId) {
  const room = (typeof ROOMS !== "undefined") && ROOMS.find(r => r.id === roomId);
  if (!room) return;
  _contentRoom = room;
  showScreen("screen-content");

  const titleEl = document.getElementById("content-title");
  const zonesEl = document.getElementById("content-zones");
  if (titleEl) titleEl.textContent = room.icon + " " + room.name + " — محتوای آموزشی";

  // استخراج تمام آیتمها از views (بدون تکرار بر اساس عنوان+نوع)
  const seen = new Set();
  const views = Object.keys(room.views || {});
  const sections = [];

  views.forEach(viewKey => {
    const view = room.views[viewKey];
    const label = (view && view.label) || VIEW_LABELS[viewKey] || viewKey;
    const hotspots = (view && view.hotspots) || [];
    const items = [];
    hotspots.forEach(h => {
      (h.categories || []).forEach(cat => {
        (cat.items || []).forEach(it => {
          const key = (it.title || "") + "|" + (it.type || "");
          if (seen.has(key)) return;
          seen.add(key);
          items.push(Object.assign({}, it, { _zone: h.title, _cat: cat.title }));
        });
      });
    });
    if (items.length) sections.push({ label, items });
  });

  // کاربرگ‌های این اتاق از آرشیو سمیه روحی (فیلد room روی هر آیتم)
  let out = "";
  const sheets = (typeof ARCHIVE_DATA !== "undefined" && ARCHIVE_DATA)
    ? ARCHIVE_DATA.filter(it => it.room === roomId) : [];
  if (sheets.length) {
    const sheetCards = sheets.map(it => {
      const thumb = it.image
        ? '<img class="content-card-thumb" src="' + it.image + '" loading="lazy" onerror="this.style.display=\'none\'" />'
        : '<div class="content-card-thumb content-card-thumb-empty">📄</div>';
      return '<div class="content-card" data-type="' + (it.type || "pdf") + '" data-search="' +
        (it.title || "") + " " + (it.category || "") + '" onclick="openMediaModal(' +
        JSON.stringify(it).replace(/\"/g, "&quot;") + ')">' +
        thumb +
        '<div class="content-card-body">' +
          '<div class="content-card-title">' + (it.title || "") + '</div>' +
          '<div class="content-card-meta">' + (it.category || "کاربرگ") + '</div>' +
        '</div></div>';
    }).join("");
    out += '<div class="content-section">' +
      '<h3 class="content-section-title">📄 کاربرگ‌های این اتاق <span class="content-section-count">(' + sheets.length + ')</span></h3>' +
      '<div class="content-card-grid">' + sheetCards + '</div></div>';
  }

  if (!sections.length) {
    zonesEl.innerHTML = out || '<div style="text-align:center;color:#7a6b55;padding:3rem;">محتوایی برای این اتاق ثبت نشده است.</div>';
    bindContentFilters(zonesEl);
    return;
  }

  zonesEl.innerHTML = out + sections.map(sec => {
    const cards = sec.items.map(it => {
      const typeIcon = { pdf: "📄", video: "🎬", audio: "🔊", game: "🎮", activity: "🎯", story: "📖", song: "🎵", craft: "✂️", image: "🖼️" }[it.type] || "🎯";
      const meta = [it._cat, it.age].filter(Boolean).join(" • ");
      const thumb = it.image
        ? '<img class="content-card-thumb" src="' + it.image + '" loading="lazy" onerror="this.style.display=\'none\'" />'
        : '<div class="content-card-thumb content-card-thumb-empty">' + typeIcon + '</div>';
      return '<div class="content-card" data-type="' + (it.type || "") + '" data-search="' +
        (it.title || "") + " " + (it._cat || "") + '" onclick="openMediaModal(' +
        JSON.stringify(it).replace(/\"/g, "&quot;") + ')">' +
        thumb +
        '<div class="content-card-body">' +
          '<div class="content-card-title">' + (it.title || "") + '</div>' +
          (meta ? '<div class="content-card-meta">' + meta + '</div>' : '') +
        '</div></div>';
    }).join("");
    return '<div class="content-section">' +
      '<h3 class="content-section-title">' + sec.label + ' <span class="content-section-count">(' + sec.items.length + ')</span></h3>' +
      '<div class="content-card-grid">' + cards + '</div></div>';
  }).join("") +
  // Scroll-to-top button at bottom
  '<div style="text-align:center;padding:2rem 0 1rem;"><button class="pill-btn" onclick="document.getElementById(\'screen-content\').scrollTo({top:0,behavior:\'smooth\'})">⬆️ بازگشت به بالا</button></div>';

  // نوار جستجو + تگ نوع بالای محتوا
  const toolbar = '<div class="content-toolbar">' +
    '<input type="text" id="content-filter-input" class="content-filter-input" placeholder="🔍 جستجو در محتوای این اتاق..." />' +
    '<div class="content-type-tags" id="content-type-tags">' +
    CONTENT_TYPE_TAGS.map(t =>
      '<button class="content-type-tag' + (t.v === "" ? " active" : "") + '" data-type="' + t.v + '">' + t.l + '</button>'
    ).join("") +
    '</div></div>';
  zonesEl.insertAdjacentHTML("afterbegin", toolbar);
  bindContentFilters(zonesEl);
}

/* فیلتر زنده: جستجو + تگ نوع */
function bindContentFilters(scope) {
  const input = document.getElementById("content-filter-input");
  const tags = document.getElementById("content-type-tags");
  if (!input || !tags) return;
  let activeType = "";

  const apply = () => {
    const q = input.value.trim();
    const cards = scope.querySelectorAll(".content-card");
    let visible = 0;
    cards.forEach(card => {
      const typeOk = !activeType || card.dataset.type === activeType;
      const qOk = !q || (card.dataset.search || "").includes(q);
      const show = typeOk && qOk;
      card.style.display = show ? "" : "none";
      if (show) visible++;
    });
    // نمایش/مخفی کردن سکشنهای خالی
    scope.querySelectorAll(".content-section").forEach(sec => {
      const visibleCards = [...sec.querySelectorAll(".content-card")].some(c => c.style.display !== "none");
      sec.style.display = visibleCards ? "" : "none";
    });
  };

  input.addEventListener("input", apply);
  tags.querySelectorAll(".content-type-tag").forEach(btn => {
    btn.addEventListener("click", () => {
      tags.querySelectorAll(".content-type-tag").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeType = btn.dataset.type;
      apply();
    });
  });
}

(function bindContentBack() {
  const back = document.getElementById("content-back-room");
  if (back) back.addEventListener("click", () => {
    if (_contentRoom) openRoom(_contentRoom.id);
    else showScreen("screen-map");
  });
})();