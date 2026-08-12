/*
  کنترلر اصلی — پنل، بایگانی، جستجو، بازی
*/

let currentUserRole = "teacher";

/* ---------- پنل کاربری ---------- */
function initPanel() {
  if (typeof renderAuthStatus === "function") renderAuthStatus();
  renderPanelTab("dashboard");
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderPanelTab(btn.dataset.tab);
    });
  });
}

function renderPanelTab(tab) {
  const body = document.getElementById("panel-body");
  if (tab === "dashboard") {
    body.innerHTML = `
      <div class="panel-stat-grid">
        <div class="panel-stat"><div class="stat-num">۱۳</div><div class="stat-label">اتاق</div></div>
        <div class="panel-stat"><div class="stat-num">۱۴</div><div class="stat-label">بازی</div></div>
        <div class="panel-stat"><div class="stat-num">۲۸</div><div class="stat-label">کاربرگ</div></div>
        <div class="panel-stat"><div class="stat-num">۱۲</div><div class="stat-label">ویدیو</div></div>
      </div>
      <h3 style="margin-top:1.5rem;margin-bottom:.8rem;">اتاق‌های پربازدید</h3>
      <div style="display:flex;gap:.5rem;flex-wrap:wrap;">
        ${ROOMS.slice(0,5).map(r => `<span class="pill-btn" style="cursor:pointer;" onclick="openRoom('${r.id}')">${r.icon} ${r.name}</span>`).join("")}
      </div>
    `;
  } else if (tab === "tasks") {
    const tasks = [
      "بررسی حضور غیاب کودکان",
      "تهیه گزارش روزانه",
      "بررسی وضعیت بهداشتی کودکان",
      "آماده‌سازی فعالیت‌های فردای کلاس",
      "ارسال پیام به والدین",
    ];
    body.innerHTML = `
      <h3 style="margin-bottom:.8rem;">کارهای امروز</h3>
      <ul class="task-list">
        ${tasks.map(t => `<li class="task-item"><div class="task-check" onclick="this.classList.toggle('done')"></div><span>${t}</span></li>`).join("")}
      </ul>
    `;
  } else if (tab === "messages") {
    body.innerHTML = `
      <h3 style="margin-bottom:.8rem;">پیام‌های اخیر</h3>
      <div style="color:#7a6b55;text-align:center;padding:2rem;">
        <div style="font-size:2rem;margin-bottom:.5rem;">💬</div>
        <p>پیام جدیدی نیست</p>
      </div>
    `;
  } else if (tab === "reports") {
    renderReportsTab(body);
  }
}

/* ---------- گزارش روزانه‌ی کودکان — فاز ۶ (داده‌ی واقعی از API) ---------- */
const MOOD_FA = { happy: "😄 شاد", ok: "🙂 معمولی", tired: "😴 خسته", upset: "😢 ناراحت" };
const FOOD_FA = { eaten_all: "🍽️ همه‌ی غذا", eaten_some: "🍽️ مقداری", eaten_none: "🍽️ چیزی نخورد" };
const SLEEP_FA = { slept_well: "🛏️ خوب خوابید", restless: "🛏️ بی‌قرار", no_nap: "🛏️ نخوابید" };

async function renderReportsTab(body) {
  const user = typeof currentUser === "function" ? currentUser() : null;
  if (!user) {
    body.innerHTML = `
      <h3 style="margin-bottom:.8rem;">گزارش‌های روزانه</h3>
      <div style="text-align:center;color:#7a6b55;padding:2rem;">
        برای دیدن گزارش‌های روزانه‌ی کودکان، ابتدا وارد شوید.
        <div style="margin-top:1rem;"><button class="btn" onclick="openAuthModal()">ورود / ثبت‌نام</button></div>
      </div>`;
    return;
  }
  await API_READY;
  if (!APP_API_ONLINE) {
    body.innerHTML = `<div style="text-align:center;color:#7a6b55;padding:2rem;">اتصال به سرور برقرار نیست.</div>`;
    return;
  }
  body.innerHTML = `<div style="text-align:center;color:#7a6b55;padding:1rem;">در حال بارگذاری...</div>`;
  let children;
  try {
    children = await Api.children();
  } catch (e) {
    body.innerHTML = `<div style="text-align:center;color:#c0392b;padding:2rem;">${e.message}</div>`;
    return;
  }
  if (!children.length) {
    body.innerHTML = `<div style="text-align:center;color:#7a6b55;padding:2rem;">کودکی برای این حساب ثبت نشده است.</div>`;
    return;
  }
  const isStaff = user.role === "teacher" || user.role === "admin";
  body.innerHTML = `<h3 style="margin-bottom:.8rem;">${isStaff ? "گزارش‌های کودکان" : "گزارش‌های روزانه‌ی فرزندم"}</h3>` +
    children.map(child => `
      <div class="report-child-card">
        <div class="report-child-header">
          <strong>👶 ${child.name}</strong>
          ${isStaff ? `<button class="pill-btn" onclick="openAddReportForm('${child.id}', this)">+ ثبت گزارش امروز</button>` : ""}
        </div>
        <div id="add-report-${child.id}"></div>
        <div id="reports-list-${child.id}">در حال بارگذاری گزارش‌ها...</div>
      </div>
    `).join("");

  children.forEach(child => loadChildReports(child.id));
}

async function loadChildReports(childId) {
  const el = document.getElementById("reports-list-" + childId);
  if (!el) return;
  try {
    const reports = await Api.childReports(childId);
    if (!reports.length) { el.innerHTML = '<p style="color:#7a6b55;">هنوز گزارشی ثبت نشده.</p>'; return; }
    el.innerHTML = reports.map(r => {
      const d = new Date(r.date);
      const dateStr = d.toLocaleDateString("fa-IR");
      return `
        <div class="report-entry">
          <div class="report-entry-date">${dateStr}${r.teacher ? " — " + r.teacher.name : ""}</div>
          <div class="report-entry-badges">
            ${r.mood ? '<span class="report-badge">' + (MOOD_FA[r.mood] || r.mood) + '</span>' : ""}
            ${r.food ? '<span class="report-badge">' + (FOOD_FA[r.food] || r.food) + '</span>' : ""}
            ${r.sleep ? '<span class="report-badge">' + (SLEEP_FA[r.sleep] || r.sleep) + '</span>' : ""}
          </div>
          ${r.note ? '<div class="report-entry-note">' + r.note + '</div>' : ""}
        </div>`;
    }).join("");
  } catch (e) {
    el.innerHTML = '<p style="color:#c0392b;">' + e.message + '</p>';
  }
}

function openAddReportForm(childId) {
  const wrap = document.getElementById("add-report-" + childId);
  if (!wrap) return;
  wrap.innerHTML = `
    <div class="report-form">
      <select id="mood-${childId}"><option value="happy">😄 شاد</option><option value="ok">🙂 معمولی</option><option value="tired">😴 خسته</option><option value="upset">😢 ناراحت</option></select>
      <select id="food-${childId}"><option value="eaten_all">🍽️ همه‌ی غذا</option><option value="eaten_some">🍽️ مقداری</option><option value="eaten_none">🍽️ چیزی نخورد</option></select>
      <select id="sleep-${childId}"><option value="slept_well">🛏️ خوب خوابید</option><option value="restless">🛏️ بی‌قرار</option><option value="no_nap">🛏️ نخوابید</option></select>
      <textarea id="note-${childId}" placeholder="یادداشت مربی..." style="width:100%;margin-top:.5rem;padding:.5rem;border-radius:8px;border:1px solid #ddd;"></textarea>
      <div style="margin-top:.5rem;display:flex;gap:.5rem;">
        <button class="btn" onclick="submitReport('${childId}')">ثبت گزارش</button>
        <button class="pill-btn" onclick="document.getElementById('add-report-${childId}').innerHTML=''">انصراف</button>
      </div>
    </div>`;
}

async function submitReport(childId) {
  const mood = document.getElementById("mood-" + childId).value;
  const food = document.getElementById("food-" + childId).value;
  const sleep = document.getElementById("sleep-" + childId).value;
  const note = document.getElementById("note-" + childId).value;
  try {
    await Api.addReport(childId, { mood, food, sleep, note });
    document.getElementById("add-report-" + childId).innerHTML = "";
    loadChildReports(childId);
  } catch (e) {
    alert("خطا در ثبت گزارش: " + e.message);
  }
}

document.getElementById("panel-back").addEventListener("click", () => showScreen("screen-lobby"));

/* ---------- بایگانی (فاز ۳: جستجوی زنده از API، با سقوط به داده‌ی استاتیک اگر سرور در دسترس نبود) ---------- */
async function initArchive() {
  await API_READY; // مطمئن شویم قبل از تصمیم‌گیری، وضعیت آنلاین/آفلاین واقعی API مشخص شده باشد
  const filtersEl = document.getElementById("archive-filters");
  let cats = [];
  if (APP_API_ONLINE) {
    try { cats = await Api.categories(); } catch (e) { console.warn(e); }
  }
  if (!cats.length) cats = [...new Set(ARCHIVE_DATA.map(a => a.category).filter(Boolean))];
  cats = ["همه", ...cats];

  filtersEl.innerHTML = cats.map((c, i) =>
    `<button class="filter-btn${i === 0 ? ' active' : ''}" data-cat="${c}">${c}</button>`
  ).join("");
  filtersEl.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      filtersEl.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      filterArchive();
    });
  });
  document.getElementById("archive-search-input").addEventListener("input", debounce(filterArchive, 250));
  filterArchive();
}

function renderArchiveResults(elId, results) {
  const el = document.getElementById(elId);
  el.innerHTML = results.map(item => {
    const typeIcon = { pdf: "📄", video: "🎬", audio: "🔊", game: "🎮" }[item.type] || "📄";
    return `
      <div class="archive-item" onclick="openMediaModal(${JSON.stringify(item).replace(/"/g, '&quot;')})">
        <div class="ai-icon">${typeIcon} ${item.url ? '🔗' : ''}</div>
        <div class="ai-title">${item.title}</div>
        <div class="ai-meta">${item.category || ''} • ${item.audience || ''} • ${item.age || ''} ${item.source ? '<span style="background:#ffb84d;padding:.1rem .4rem;border-radius:6px;font-size:.75rem;">'+item.source+'</span>' : ''}</div>
      </div>
    `;
  }).join("") || '<div style="text-align:center;color:#7a6b55;padding:2rem;">نتیجه‌ای یافت نشد</div>';
}

async function filterArchive() {
  const query = document.getElementById("archive-search-input").value;
  const activeCat = document.querySelector(".filter-btn.active")?.dataset.cat || "همه";

  if (APP_API_ONLINE) {
    try {
      const params = { pageSize: "60" };
      if (query) params.q = query;
      if (activeCat !== "همه") params.category = activeCat;
      const res = await Api.archive(params);
      renderArchiveResults("archive-results", res.items);
      return;
    } catch (e) {
      console.warn("Archive API failed, falling back to static data:", e);
    }
  }
  // Fallback: فیلتر روی داده‌ی استاتیک
  let results = ARCHIVE_DATA;
  if (activeCat !== "همه") results = results.filter(a => a.category === activeCat);
  if (query) results = results.filter(a => a.title.includes(query) || a.desc?.includes(query));
  renderArchiveResults("archive-results", results);
}

function debounce(fn, ms) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}

document.getElementById("archive-back").addEventListener("click", () => showScreen("screen-lobby"));

/* ---------- جستجوی عمومی (فاز ۳: زنده از API) ---------- */
document.getElementById("search-input").addEventListener("input", debounce(async (e) => {
  const q = e.target.value;
  const el = document.getElementById("search-results");
  if (!q) { el.innerHTML = ""; return; }

  if (APP_API_ONLINE) {
    try {
      const res = await Api.archive({ q, pageSize: "40" });
      renderArchiveResults("search-results", res.items);
      return;
    } catch (err) {
      console.warn("Search API failed, falling back to static data:", err);
    }
  }
  const results = ARCHIVE_DATA.filter(a => a.title.includes(q) || (a.category||"").includes(q) || (a.audience||"").includes(q));
  renderArchiveResults("search-results", results);
}, 250));

document.getElementById("search-back").addEventListener("click", () => showScreen("screen-lobby"));

/* ---------- اتاق‌ها از API (فاز ۴) ----------
   نکته‌ی مهم (بعد از بازطراحی هایلایت‌ها): بک‌اند هنوز ساختار قدیمی «zones» (چپ/وسط/راست
   روی نمای کلی) را برمی‌گرداند، در حالی که فرانت‌اند حالا از ساختار جدید «views» (هایلایت‌های
   منحصربه‌فرد روی هر نما) استفاده می‌کند. تا وقتی مدل داده‌ی بک‌اند هم به‌روزرسانی نشده،
   محتوای اتاق‌ها (زون‌ها/هایلایت‌ها) از API همگام‌سازی نمی‌شود تا ساختار جدید رونویسی نشود؛
   فقط از داده‌ی استاتیک rooms.js استفاده می‌شود. بقیه‌ی بخش‌های API (بایگانی، ورود، گزارش‌ها) دست‌نخورده کار می‌کنند. */
async function loadRoomsFromApi() {
  // غیرفعال — نگاه کن به یادداشت بالا. اگر بعداً بک‌اند به ساختار «views» مهاجرت کرد، اینجا فعال می‌شود.
  return;
}

/* ---------- راه‌اندازی اولیه ---------- */
(async function initApp() {
  await loadRoomsFromApi();
  renderDoors();
  renderRoomGrid();
  initArchive();
})();
document.getElementById("btn-goto-games").addEventListener("click", () => {
  if (typeof openGamePicker === "function") openGamePicker();
});
