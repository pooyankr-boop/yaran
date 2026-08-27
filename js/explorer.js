/*
  کاوشگر محتوا — پنل تاشوی سمت راست
  فیلتر هوشمند + گروه‌بندی + مشاهده تصاویر بدون دانلود PDF
*/

let explorerSourceItems = [];

async function loadExplorerSource() {
  if (typeof API_READY !== "undefined") await API_READY;
  if (typeof APP_API_ONLINE !== "undefined" && APP_API_ONLINE) {
    try {
      const res = await Api.archive({ type: "pdf", pageSize: "1000" });
      explorerSourceItems = (res && res.items || []).filter(it => it.image);
      if (explorerSourceItems.length > 0) return;
    } catch (e) {}
  }
  if (typeof ARCHIVE_DATA !== "undefined") {
    explorerSourceItems = ARCHIVE_DATA.filter(it => it.image && it.image.length > 0);
  }
  // Add videos
  if (typeof VIDEO_LIBRARY !== 'undefined') {
    VIDEO_LIBRARY.forEach(function(v) {
      explorerSourceItems.push({
        title: v.titleFa || v.title, category: 'ویدیو', type: 'video',
        url: v.url, desc: v.desc || '', image: 'https://img.youtube.com/vi/' + (v.videoId || '') + '/mqdefault.jpg',
        age: '', channel: v.channel || ''
      });
    });
  }
  // Add audio
  if (typeof AUDIO_LIBRARY !== 'undefined') {
    AUDIO_LIBRARY.forEach(function(a) {
      explorerSourceItems.push({
        title: a.title, category: a.category || 'صوت', type: 'audio',
        url: a.audioUrl || a.src || '', desc: (a.info || '').substring(0, 300),
        image: a.pageImg || '', age: '', channel: a.channel || a.category || ''
      });
    });
  }
  if (typeof MAHD_EXPLORER_DATA !== "undefined" && MAHD_EXPLORER_DATA) {
    explorerSourceItems = explorerSourceItems.concat(MAHD_EXPLORER_DATA);
  }
}

function initExplorerFilters() {
  const filtersEl = document.getElementById("explorer-filters");
  if (!filtersEl) return;
  const isChild = (typeof currentUserRole !== "undefined" && currentUserRole === "child");
  const typeCats = [...new Set(explorerSourceItems.map(it => it.category).filter(Boolean))].sort();
  /* کودک: فقط صوت + فقط دسته‌های مناسب کودک */
  var typeChips;
  if (isChild) {
    typeChips = '<span class="filter-chip active" data-group="type" data-val="صوت">🔊 صوت</span>';
  } else {
    typeChips = '<span class="filter-chip active" data-group="type" data-val="همه">همه</span>' +
      '<span class="filter-chip" data-group="type" data-val="ویدیو">🎬 ویدیو</span>' +
      '<span class="filter-chip" data-group="type" data-val="صوت">🔊 صوت</span>' +
      '<span class="filter-chip" data-group="type" data-val="آهنگ">🎶 آهنگ و ترانه</span>' +
      typeCats.map((t) => '<span class="filter-chip" data-group="type" data-val="' + t + '">' + t + '</span>').join("");
  }
  filtersEl.innerHTML =
    '<div style="width:100%;font-size:.75rem;color:#999;margin-bottom:2px;">دسته:</div>' +
    '<div class="filter-row">' + typeChips + '</div>';

  filtersEl.querySelectorAll(".filter-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      const group = chip.dataset.group;
      filtersEl.querySelectorAll('[data-group="' + group + '"]').forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      renderExplorerItems();
    });
  });
}

function initExplorer() {
  const panel = document.getElementById("explorer-panel");
  const toggle = document.getElementById("explorer-toggle");
  const closeBtn = document.getElementById("explorer-close");
  const searchInput = document.getElementById("explorer-search-input");

  if (!panel || !toggle) return;

  // Single toggle handler - lazy load on first open
  toggle.addEventListener("click", function(e) {
    e.stopPropagation();
    var isOpen = panel.classList.contains("open");
    if (isOpen) {
      panel.classList.remove("open");
      toggle.classList.remove("shifted");
    } else {
      panel.classList.add("open");
      toggle.classList.add("shifted");
      if (!panel.dataset.loaded) {
        panel.dataset.loaded = "1";
        loadExplorerSource().then(function() {
          initExplorerFilters();
          renderExplorerItems();
        });
      }
    }
  });

  // Close button
  closeBtn.addEventListener("click", function(e) {
    e.stopPropagation();
    panel.classList.remove("open");
    toggle.classList.remove("shifted");
  });

  // Search
  if (searchInput) {
    searchInput.addEventListener("input", renderExplorerItems);
  }

  // Preload data in background (non-blocking)
  loadExplorerSource().then(function() {
    panel.dataset.loaded = "1";
    initExplorerFilters();
  });
}

function renderExplorerItems() {
  const body = document.getElementById("explorer-body");
  const searchInput = document.getElementById("explorer-search-input");
  if (!body) return;
  const query = searchInput ? searchInput.value : "";

  const activeFilters = {};
  document.querySelectorAll("#explorer-filters .filter-chip.active").forEach(chip => {
    activeFilters[chip.dataset.group] = chip.dataset.val;
  });

  let items = explorerSourceItems;

  /* فیلتر کودک: فقط صوتی‌های مناسب کودک */
  if (typeof currentUserRole !== "undefined" && currentUserRole === "child") {
    var childCats = ["قصه","لالایی","ترانه و آهنگ","شعر","موسیقی آرامش","سایر صداها"];
    items = items.filter(function (it) {
      if (it.type !== "audio") return false;
      var cat = it.category || "";
      return childCats.some(function (c) { return cat.indexOf(c) >= 0; });
    });
  }

  if (query) {
    items = items.filter(it => (it.title || "").includes(query) || (it.desc && it.desc.includes(query)));
  }

  if (activeFilters.type && activeFilters.type !== "همه") {
    if (activeFilters.type === "ویدیو") {
      items = items.filter(it => it.type === "video");
    } else if (activeFilters.type === "صوت") {
      items = items.filter(it => it.type === "audio");
    } else if (activeFilters.type === "آهنگ") {
      items = items.filter(it => it.type === "audio" && (it.category || "").includes("ترانه"));
    } else {
      items = items.filter(it => (it.category || "") === activeFilters.type);
    }
  }

  const groups = {};
  items.forEach(it => {
    const cat = it.category || "سایر";
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(it);
  });

  let html = "";
  const sortedCats = Object.keys(groups).sort((a, b) => groups[b].length - groups[a].length);

  if (sortedCats.length === 0) {
    html = '<div style="text-align:center;color:#999;padding:2rem;">نتیجه‌ای یافت نشد</div>';
  } else {
    sortedCats.forEach(cat => {
      const catItems = groups[cat];
      html += '<div class="explorer-group">';
      html += '<div class="explorer-group-title open" onclick="this.classList.toggle(\'open\');this.nextElementSibling.classList.toggle(\'open\')">';
      html += '<span>' + cat + ' (' + catItems.length + ')</span><span class="arrow">◀</span>';
      html += '</div>';
      html += '<div class="explorer-items open">';
      catItems.forEach((it) => {
        const typeIcons = {pdf:'📄',video:'🎬',audio:'🔊',game:'🎮',activity:'🎯',story:'📖',song:'🎵',craft:'✂️',image:'🖼️',word:'📝'};
        const defaultIcon = typeIcons[it.type] || '📄';
        const mediaThumb = (typeof getMediaThumbHtml === "function") ? getMediaThumbHtml(it) : null;
        const thumbHtml = it.image
          ? '<img class="explorer-item-thumb" src="' + it.image + '" loading="lazy" />'
          : mediaThumb
          ? '<div class="explorer-item-thumb explorer-item-thumb-media">' + mediaThumb + '</div>'
          : '<div class="explorer-item-thumb" style="display:flex;align-items:center;justify-content:center;font-size:1.8rem;background:rgba(255,184,77,0.15);">' + defaultIcon + '</div>';
        const meta = [it.age, it.channel || it.category].filter(Boolean).join(' • ');
        html += '<div class="explorer-item" onclick="openExplorerItem(' + JSON.stringify(it).replace(/\"/g, '&quot;').replace(/\n/g, ' ') + ')">';
        html += thumbHtml;
        html += '<div class="explorer-item-title">' + (it.title || '') + '</div>';
        html += '<div class="explorer-item-meta">' + meta + '</div>';
        html += '</div>';
      });
      html += '</div></div>';
    });
  }

  body.innerHTML = html;
}

function openExplorerItem(item) {
  if (item.image && (!item.type || item.type !== "pdf")) {
    item._noDownload = true;
  }
  if (item.type === 'video' && item.url) {
    if (typeof yrPlay === 'function') yrPlay(item);
    else window.open(item.url, '_blank');
    return;
  }
  if (item.type === 'audio' && (item.url || item.audioUrl)) {
    if (typeof yrPlay === 'function') yrPlay(item);
    else window.open(item.url || item.audioUrl, '_blank');
    return;
  }
  openMediaReader(item);
}

function updateExplorerVisibility(roomId) {
  var toggle = document.getElementById("explorer-toggle");
  if (toggle) toggle.style.display = "flex";
}

document.addEventListener("DOMContentLoaded", initExplorer);
