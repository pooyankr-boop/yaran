/*
  کاوشگر محتوا — پنل تاشوی سمت راست
  فیلتر هوشمند + گروه‌بندی + مشاهده تصاویر بدون دانلود PDF
*/

/* ---------- Init Explorer (فاز ۳: منبع داده از API واقعی، با سقوط به ARCHIVE_DATA استاتیک) ---------- */
let explorerSourceItems = [];

async function loadExplorerSource() {
  if (typeof API_READY !== "undefined") await API_READY;
  if (typeof APP_API_ONLINE !== "undefined" && APP_API_ONLINE) {
    try {
      const res = await Api.archive({ type: "pdf", pageSize: "1000" });
      explorerSourceItems = (res && res.items || []).filter(it => it.image);
      if (explorerSourceItems.length > 0) return;
    } catch (e) {
      // fall through to static data
    }
  }
  explorerSourceItems = ARCHIVE_DATA.filter(it => it.image && it.image.length > 0);
  // Add videos from VIDEO_LIBRARY
  if (typeof VIDEO_LIBRARY !== 'undefined') {
    VIDEO_LIBRARY.forEach(function(v) {
      explorerSourceItems.push({
        title: v.titleFa || v.title, category: 'ویدیو', type: 'video',
        url: v.url, desc: v.desc || '', image: 'https://img.youtube.com/vi/' + (v.videoId || '') + '/mqdefault.jpg',
        age: '', channel: v.channel || ''
      });
    });
  }
  // Merge MAHD explorer data
  if (typeof MAHD_EXPLORER_DATA !== "undefined" && MAHD_EXPLORER_DATA) {
    explorerSourceItems = explorerSourceItems.concat(MAHD_EXPLORER_DATA);
  }
}

async function initExplorer() {
  const panel = document.getElementById("explorer-panel");
  const toggle = document.getElementById("explorer-toggle");
  const closeBtn = document.getElementById("explorer-close");
  const searchInput = document.getElementById("explorer-search-input");
  const filtersEl = document.getElementById("explorer-filters");

  await loadExplorerSource();

  // Build filter chips from REAL categories present in the explorer source (image worksheets only)
  const typeCats = [...new Set(explorerSourceItems.map(it => it.category).filter(Boolean))].sort();


  filtersEl.innerHTML =
    '<div style="width:100%;font-size:.75rem;color:#999;margin-bottom:2px;">دسته:</div>' +
    '<div class="filter-row">' +
    '<span class="filter-chip active" data-group="type" data-val="همه">همه</span>' +
    '<span class="filter-chip" data-group="type" data-val="ویدیو">🎬 ویدیو</span>' +
    typeCats.map((t, i) => '<span class="filter-chip" data-group="type" data-val="' + t + '">' + t + '</span>').join("") + '</div>';

  // Filter chip clicks
  filtersEl.querySelectorAll(".filter-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      const group = chip.dataset.group;
      filtersEl.querySelectorAll('[data-group="' + group + '"]').forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      renderExplorerItems();
    });
  });

  // Search
  searchInput.addEventListener("input", renderExplorerItems);

  // Toggle
  toggle.addEventListener("click", () => {
    panel.classList.toggle("open");
    toggle.classList.toggle("shifted");
  });

  // Close
  closeBtn.addEventListener("click", () => {
    panel.classList.remove("open");
    toggle.classList.remove("shifted");
  });

  renderExplorerItems();
}

function renderExplorerItems() {
  const body = document.getElementById("explorer-body");
  const searchInput = document.getElementById("explorer-search-input");
  const query = searchInput ? searchInput.value : "";

  // Get active filters
  const activeFilters = {};
  document.querySelectorAll("#explorer-filters .filter-chip.active").forEach(chip => {
    activeFilters[chip.dataset.group] = chip.dataset.val;
  });

  // آیتم‌های دارای تصویر (کاربرگ‌های سمیه‌روحی) — از API یا سقوط استاتیک، بارگذاری‌شده در initExplorer
  let items = explorerSourceItems;

  // Apply search
  if (query) {
    items = items.filter(it => it.title.includes(query) || (it.desc && it.desc.includes(query)));
  }

  // Apply type filter
  if (activeFilters.type && activeFilters.type !== "همه") {
    if (activeFilters.type === "ویدیو") {
      items = items.filter(it => it.type === "video");
    } else {
      items = items.filter(it => (it.category || "") === activeFilters.type);
    }
  }

  // Group by category
  const groups = {};
  items.forEach(it => {
    const cat = it.category || "سایر";
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(it);
  });

  // Render
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
      catItems.forEach((it, i) => {
        const typeIcons = {pdf:'📄',video:'🎬',audio:'🔊',game:'🎮',activity:'🎯',story:'📖',song:'🎵',craft:'✂️',image:'🖼️',word:'📝'};
        const defaultIcon = typeIcons[it.type] || '📄';
        const thumbHtml = it.image ? '<img class="explorer-item-thumb" src="' + it.image + '" loading="lazy" />' : '<div class="explorer-item-thumb" style="display:flex;align-items:center;justify-content:center;font-size:1.8rem;background:rgba(255,184,77,0.15);">' + defaultIcon + '</div>';
        const meta = [it.age, it.category].filter(Boolean).join(' • ');
        html += '<div class="explorer-item" onclick="openExplorerItem(' + JSON.stringify(it).replace(/"/g, '&quot;').replace(/\n/g, ' ') + ')">';
        html += thumbHtml;
        html += '<div class="explorer-item-title">' + it.title + '</div>';
        html += '<div class="explorer-item-meta">' + meta + '</div>';
        html += '</div>';
      });
      html += '</div></div>';
    });
  }

  body.innerHTML = html;
}

function openExplorerItem(item) {
  // اگر آیتم تصویر دارد و PDF نیست، دانلود PDF را حذف کن
  if (item.image && (!item.type || item.type !== "pdf")) {
    item._noDownload = true;
  }
  // Open in enhanced media reader
  if (item.type === 'video' && item.url) {
    if (typeof yrPlay === 'function') yrPlay(item);
    else window.open(item.url, '_blank');
    return;
  }
  openMediaReader(item);
}

/* ---------- Show/hide explorer based on room ---------- */
function updateExplorerVisibility(roomId) {
  const toggle = document.getElementById("explorer-toggle");
  toggle.style.display = "flex"; // فعلاً کاوشگر در همه‌ی اتاق‌ها فعال است
}

// Init on load
document.addEventListener("DOMContentLoaded", initExplorer);
