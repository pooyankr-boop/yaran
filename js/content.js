/* ---------- نمایش دسته‌بندی محتوای اتاق (بخش ۶: screen-content) ---------- */
let _contentRoom = null;

/* تگ‌های نوع محتوا */
const CONTENT_TYPE_TAGS = [
  { v: "", l: "همه" },
  { v: "pdf", l: "📄 کاربرگ" },
  { v: "video", l: "🎬 ویدیو" },
  { v: "game", l: "🎮 بازی" },
  { v: "activity", l: "🎯 فعالیت" },
  { v: "audio-قصه و داستان", l: "📖 قصه" },
  { v: "audio-لالایی", l: "🌙 لالایی" },
  { v: "audio-ترانه و آهنگ", l: "🎶 آهنگ" },
  { v: "audio-مدیتیشن", l: "🧘 مدیتیشن" },
  { v: "audio-پادکست والدین", l: "📞 پادکست" },
  { v: "audio-شعر", l: "✍️ شعر" },
  { v: "audio-موسیقی آرامش", l: "🎵 آرامش" },
  { v: "audio-آموزش", l: "📚 آموزش" },
  { v: "audio", l: "🔊 سایر صوت" },
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

  // Add audio from AUDIO_LIBRARY
  if (typeof AUDIO_LIBRARY !== 'undefined' && AUDIO_LIBRARY && typeof ROOM_AUDIO_MAP !== 'undefined' && typeof _catAudio === 'function') {
    var rcats = ROOM_AUDIO_MAP[roomId];
    if (rcats) {
      var aSeen = {};
      var aItems = [];
      AUDIO_LIBRARY.forEach(function(a) {
        if (rcats.indexOf(a.category) !== -1 && a.audioUrl) {
          var key = a.title.trim().toLowerCase();
          if (aSeen[key]) return;
          aSeen[key] = true;
          aItems.push({ type: 'audio', title: a.title, audioUrl: a.audioUrl,
            category: a.category, channel: a.channel || a.category || '',
            desc: (a.info || '').substring(0, 300), duration: a.duration || '',
            _group: _catAudio(a) });
        }
      });
      if (aItems.length) {
        var aCards = aItems.map(function(it) {
          var thumb = '<div class="content-card-thumb content-card-thumb-empty">' +
            ({'قصه و داستان':'📖','لالایی':'🌙','ترانه و آهنگ':'🎶','مدیتیشن':'🧘','پادکست والدین':'📞','شعر':'✍️','موسیقی آرامش':'🎵','آموزش':'📚'}[it._group]||'🔊') + '</div>';
          return '<div class="content-card" data-type="audio" data-search="' +
            (it.title||'') + ' ' + (it._group||'') + ' ' + (it.channel||'') + '" onclick="openMediaModal(' +
            JSON.stringify(it).replace(/"/g, '&quot;') + ')">' +
            thumb +
            '<div class="content-card-body">' +
              '<div class="content-card-title">' + (it.title||'') + '</div>' +
              '<div class="content-card-meta">' + (it._group||'صوت') + (it.channel ? ' • ' + it.channel : '') + '</div>' +
            '</div></div>';
        }).join('');
        out += '<div class="content-section">' +
          '<h3 class="content-section-title">🔊 محتوای صوتی <span class="content-section-count">(' + aItems.length + ')</span></h3>' +
          '<div class="content-card-grid">' + aCards + '</div></div>';
      }
    }
  }

  // Add videos for this room
  var roomVideos = (typeof getVideosForRoom === 'function') ? getVideosForRoom(roomId) : [];
  if (roomVideos.length) {
    var vCards = roomVideos.map(function(v) {
      var item = { type: 'video', title: v.titleFa || v.title, url: v.url, desc: v.desc || '', duration: v.duration || '', channel: v.channel || '' };
      var thumb = '<div class="content-card-thumb content-card-thumb-empty">🎬</div>';
      return '<div class="content-card" data-type="video" data-search="' + (v.titleFa || v.title || '') + ' ' + (v.category || '') + '" onclick="openMediaModal(' +
        JSON.stringify(item).replace(/\"/g, '&quot;') + ')">' +
        thumb +
        '<div class="content-card-body">' +
          '<div class="content-card-title">' + (v.titleFa || v.title || '') + '</div>' +
          '<div class="content-card-meta">ویدیوی آموزشی' + (v.duration ? ' • ' + v.duration : '') + '</div>' +
        '</div></div>';
    }).join('');
    out += '<div class="content-section">' +
      '<h3 class="content-section-title">🎬 ویدیوهای آموزشی <span class="content-section-count">(' + roomVideos.length + ')</span></h3>' +
      '<div class="content-card-grid">' + vCards + '</div></div>';
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
  var _isChildContent = (typeof currentUserRole !== 'undefined' && currentUserRole === 'child');
  var _tags = _isChildContent
    ? CONTENT_TYPE_TAGS.filter(function(t) { return t.v === '' || t.v === 'audio' || t.v.startsWith('audio-'); })
    : CONTENT_TYPE_TAGS;
  const toolbar = '<div class="content-toolbar">' +
    '<input type="text" id="content-filter-input" class="content-filter-input" placeholder="🔍 جستجو در محتوای این اتاق..." />' +
    '<div class="content-type-tags" id="content-type-tags">' +
    _tags.map(t =>
      '<button class="content-type-tag' + (t.v === "" ? " active" : "") + '" data-type="' + t.v + '">' + t.l + '</button>'
    ).join("") +
    '</div></div>';
  zonesEl.insertAdjacentHTML("afterbegin", toolbar);
  bindContentFilters(zonesEl);

  /* کودک: فقط بخش‌های صوتی نمایش داده شود */
  if (typeof currentUserRole !== 'undefined' && currentUserRole === 'child') {
    zonesEl.querySelectorAll('.content-section').forEach(function(sec) {
      var title = (sec.querySelector('.content-section-title') || {}).textContent || '';
      if (title.indexOf('صوت') === -1 && title.indexOf('🔊') === -1) {
        sec.style.display = 'none';
      }
    });
  }
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
      const typeOk = !activeType || card.dataset.type === activeType || (activeType.startsWith("audio-") && card.dataset.type === "audio" && (card.dataset.search || "").includes(activeType.substring(6)));
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