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
      explorerSourceItems = res.items.filter(it => it.image);
      return;
    } catch (e) {
      console.warn("Explorer: API failed, falling back to static ARCHIVE_DATA", e);
    }
  }
  explorerSourceItems = ARCHIVE_DATA.filter(it => it.image && it.image.length > 0);
}

async function initExplorer() {
  const panel = document.getElementById("explorer-panel");
  const toggle = document.getElementById("explorer-toggle");
  const closeBtn = document.getElementById("explorer-close");
  const searchInput = document.getElementById("explorer-search-input");
  const filtersEl = document.getElementById("explorer-filters");

  await loadExplorerSource();

  // Build filter chips
  const ages = ["همه سنین", "۲-۳ سال", "۳-۴ سال", "۴-۵ سال", "۵-۶ سال"];
  const types = ["همه انواع", "ریاضی", "فارسی", "علوم", "هنر", "بازی", "ورزش", "بهداشت", "قرآن"];
  const aspects = ["همه جنبه‌ها", "شناختی", "حرکتی", "اجتماعی", "هیجانی", "زبانی", "خلاقیت"];

  filtersEl.innerHTML =
    '<div style="width:100%;font-size:.75rem;color:#999;margin-bottom:2px;">سن:</div>' +
    ages.map((a, i) => '<span class="filter-chip' + (i === 0 ? ' active' : '') + '" data-group="age" data-val="' + a + '">' + a + '</span>').join("") +
    '<div style="width:100%;font-size:.75rem;color:#999;margin-bottom:2px;margin-top:4px;">نوع:</div>' +
    types.map((t, i) => '<span class="filter-chip' + (i === 0 ? ' active' : '') + '" data-group="type" data-val="' + t + '">' + t + '</span>').join("") +
    '<div style="width:100%;font-size:.75rem;color:#999;margin-bottom:2px;margin-top:4px;">جنبه رشد:</div>' +
    aspects.map((a, i) => '<span class="filter-chip' + (i === 0 ? ' active' : '') + '" data-group="aspect" data-val="' + a + '">' + a + '</span>').join("");

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

  // Apply age filter
  if (activeFilters.age && activeFilters.age !== "همه سنین") {
    const ageMap = {"۲-۳ سال": [2,3], "۳-۴ سال": [3,4], "۴-۵ سال": [4,5], "۵-۶ سال": [5,6]};
    const [min, max] = ageMap[activeFilters.age] || [0, 99];
    items = items.filter(it => {
      const age = it.age || "";
      return age.includes(min) || age.includes(max) || age === "";
    });
  }

  // Apply type filter
  if (activeFilters.type && activeFilters.type !== "همه انواع") {
    items = items.filter(it => {
      const cat = (it.category || "").toLowerCase();
      const title = (it.title || "").toLowerCase();
      const type = activeFilters.type.toLowerCase();
      return cat.includes(type) || title.includes(type);
    });
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
      html += '<div class="explorer-group-title" onclick="this.classList.toggle(\'open\');this.nextElementSibling.classList.toggle(\'open\')">';
      html += '<span>' + cat + ' (' + catItems.length + ')</span><span class="arrow">◀</span>';
      html += '</div>';
      html += '<div class="explorer-items">';
      catItems.forEach((it, i) => {
        const thumbHtml = it.image ? '<img class="explorer-item-thumb" src="' + it.image + '" loading="lazy" />' : '';
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
  // Open in enhanced media reader
  openMediaReader(item);
}

/* ---------- Show/hide explorer based on room ---------- */
function updateExplorerVisibility(roomId) {
  const toggle = document.getElementById("explorer-toggle");
  toggle.style.display = "flex"; // فعلاً کاوشگر در همه‌ی اتاق‌ها فعال است
}

// Init on load
document.addEventListener("DOMContentLoaded", initExplorer);
