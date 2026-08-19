/*
  کنترلر اصلی — پنل، بایگانی، جستجو، بازی
*/

let currentUserRole = "teacher";

/* ---------- XSS escape ---------- */
function escHtml(s) {
  if (!s) return '';
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

/* ---------- پنل کاربری ---------- */
function updateAdminTabVisibility() {
  const user = typeof currentUser === "function" ? currentUser() : null;
  const adminBtn = document.getElementById("panel-admin-tab-btn");
  if (adminBtn) adminBtn.classList.toggle("hidden", !(user && user.role === "admin"));
}

function initPanel() {
  if (typeof renderAuthStatus === "function") renderAuthStatus();
  updateAdminTabVisibility();
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
    const roomCount = (typeof ROOMS !== "undefined") ? ROOMS.length : 0;
    const gameCount = (typeof GAMES !== "undefined") ? Object.keys(GAMES).length : 0;
    const archiveCount = (typeof ARCHIVE_DATA !== "undefined") ? ARCHIVE_DATA.length : 0;
    const videoCount = (typeof ARCHIVE_DATA !== "undefined") ? ARCHIVE_DATA.filter(a => a.type === "video").length : 0;
    body.innerHTML = `
      <div class="panel-stat-grid">
        <div class="panel-stat"><div class="stat-num">${roomCount}</div><div class="stat-label">اتاق</div></div>
        <div class="panel-stat"><div class="stat-num">${gameCount}</div><div class="stat-label">بازی</div></div>
        <div class="panel-stat"><div class="stat-num">${archiveCount}</div><div class="stat-label">کاربرگ</div></div>
        <div class="panel-stat"><div class="stat-num">${videoCount}</div><div class="stat-label">ویدیو</div></div>
      </div>
      <h3 style="margin-top:1.5rem;margin-bottom:.8rem;">اتاقهای پربازدید</h3>
      <div style="display:flex;gap:.5rem;flex-wrap:wrap;">
        ${ROOMS.slice(0,5).map(r => `<span class="pill-btn" style="cursor:pointer;" onclick="openRoom('${r.id}')">${r.icon} ${r.name}</span>`).join("")}
      </div>
    `;
  } else if (tab === "tasks") {
    renderTasksTab(body);
  } else if (tab === "messages") {
    renderMessagesTab(body);
  } else if (tab === "reports") {
    renderReportsTab(body);
  } else if (tab === "admin") {
    renderAdminTab(body);
  }
}

/* ---------- کارهای روزانه — داده‌ی واقعی از تخته وظایف ---------- */
async function renderTasksTab(body) {
  body.innerHTML = `<div style="text-align:center;color:#7a6b55;padding:1rem;">در حال بارگذاری...</div>`;
  try {
    const data = await Api.tasks();
    const tasks = data.tasks || [];
    const pending = tasks.filter(t => t.status !== 'completed' && t.status !== 'done');
    const done = tasks.filter(t => t.status === 'completed' || t.status === 'done');
    body.innerHTML = `
      <h3 style="margin-bottom:.8rem;">کارهای در جریان (${pending.length})</h3>
      ${pending.length ? '<ul class="task-list">' + pending.map(t =>
        `<li class="task-item"><span>${escHtml(t.title)}</span>${t.assigned_to ? '<small style="color:#a09080;"> — ' + escHtml(t.assigned_to) + '</small>' : ''}</li>`
      ).join("") + '</ul>' : '<p style="color:#7a6b55;text-align:center;padding:1rem;">وظیفه‌ای در جریان نیست.</p>'}
      ${done.length ? '<h3 style="margin:1rem 0 .5rem;">تمام‌شده (' + done.length + ')</h3><ul class="task-list">' +
        done.map(t => `<li class="task-item done"><span>${escHtml(t.title)}</span></li>`).join("") + '</ul>' : ''}
    `;
  } catch (e) {
    body.innerHTML = `<div style="text-align:center;color:#c0392b;padding:2rem;">${escHtml(e.message)}</div>`;
  }
}

/* ---------- پیام‌های اخیر — داده‌ی واقعی از پنل ---------- */
async function renderMessagesTab(body) {
  body.innerHTML = `<div style="text-align:center;color:#7a6b55;padding:1rem;">در حال بارگذاری...</div>`;
  try {
    const data = await Api.panel();
    const messages = data.messages || [];
    body.innerHTML = `
      <h3 style="margin-bottom:.8rem;">پیام‌های اخیر</h3>
      ${messages.length ? messages.map(m => `
        <div class="report-entry">
          <div class="report-entry-note">${escHtml(m.text)}</div>
          <div class="report-entry-date">${escHtml(m.author || '')} · ${escHtml((m.date || '').slice(0,10))}</div>
        </div>`).join("") : `
        <div style="color:#7a6b55;text-align:center;padding:2rem;">
          <div style="font-size:2rem;margin-bottom:.5rem;">💬</div>
          <p>پیام جدیدی نیست</p>
        </div>`}
    `;
  } catch (e) {
    body.innerHTML = `<div style="text-align:center;color:#c0392b;padding:2rem;">${escHtml(e.message)}</div>`;
  }
}

/* ---------- پنل مدیریت — فقط برای نقش admin ---------- */
async function renderAdminTab(body) {
  const user = typeof currentUser === "function" ? currentUser() : null;
  if (!user || user.role !== "admin") {
    body.innerHTML = `<div style="text-align:center;color:#7a6b55;padding:2rem;">دسترسی فقط برای مدیر.</div>`;
    return;
  }
  body.innerHTML = `<div style="text-align:center;color:#7a6b55;padding:1rem;">در حال بارگذاری...</div>`;
  try {
      const [usersRes, panelRes, tasksRes] = await Promise.all([Api.adminUsers(), Api.panel(), Api.tasks()]);
      const users = usersRes.users || [];
      const allTasks = tasksRes.tasks || [];
      const openTasks = allTasks.filter(t => t.status !== 'completed' && t.status !== 'done');
      const doneTasks = allTasks.filter(t => t.status === 'completed' || t.status === 'done');
      const taskIcon = t => t.status === 'in_progress' ? '🔄' : '⬜';
      body.innerHTML = `
        <h3 style="margin-bottom:.8rem;">👥 کاربران (${users.length})</h3>
      <div class="admin-user-list">
        ${users.map(u => `
          <div class="admin-user-row" data-user-id="${escHtml(u.id)}">
            <div><strong>${escHtml(u.name)}</strong><br><small style="color:#a09080;">${escHtml(u.email)}</small></div>
            <div>
              ${u.role === 'admin' ? '<span class="pill-btn">مدیر</span>' : `
                <select class="admin-role-select" data-user-id="${escHtml(u.id)}">
                  <option value="teacher" ${u.role === 'teacher' ? 'selected' : ''}>مربی</option>
                  <option value="parent" ${u.role === 'parent' ? 'selected' : ''}>والد</option>
                </select>
                <button class="pill-btn admin-delete-user" data-user-id="${escHtml(u.id)}" title="حذف کاربر">🗑</button>
              `}
            </div>
          </div>`).join("")}
      </div>

      <h3 style="margin:1.5rem 0 .8rem;">📋 وظایف (${allTasks.length})</h3>
      <div class="admin-mod-list">
        ${openTasks.map(t => `
          <div class="admin-mod-row" data-task-id="${escHtml(t.id)}">
            <span>${taskIcon(t)} ${escHtml(t.title)}${t.assigned_to ? ' <small style="color:#a09080;">👤' + escHtml(t.assigned_to) + '</small>' : ''}</span>
            <span style="display:flex;gap:4px;">
              ${t.status !== 'in_progress' ? '<button class="pill-btn admin-task-start" data-task-id="' + escHtml(t.id) + '" title="در جریان">🔄</button>' : ''}
              <button class="pill-btn admin-task-done" data-task-id="${escHtml(t.id)}" title="انجام شد">✅</button>
              <button class="pill-btn admin-delete-task" data-task-id="${escHtml(t.id)}" title="حذف">🗑</button>
            </span>
          </div>`).join("") || '<p style="color:#7a6b55;">وظیفه‌ای در جریان نیست.</p>'}
        ${doneTasks.length ? '<details style="margin-top:6px;"><summary style="color:#a09080;cursor:pointer;font-size:.85rem;">تمام‌شده (' + doneTasks.length + ')</summary>' + doneTasks.map(t => `
          <div class="admin-mod-row" data-task-id="${escHtml(t.id)}">
            <span style="opacity:.6;text-decoration:line-through;">✅ ${escHtml(t.title)}</span>
            <button class="pill-btn admin-delete-task" data-task-id="${escHtml(t.id)}" title="حذف">🗑</button>
          </div>`).join("") + '</details>' : ''}
      </div>

      <h3 style="margin:1.5rem 0 .8rem;">📝 یادداشت‌ها (${(panelRes.notes||[]).length})</h3>
      <div class="admin-mod-list">
        ${(panelRes.notes || []).map(n => `
          <div class="admin-mod-row" data-note-id="${escHtml(n.id)}">
            <span>${escHtml(n.text)}</span>
            <button class="pill-btn admin-delete-note" data-note-id="${escHtml(n.id)}">🗑</button>
          </div>`).join("") || '<p style="color:#7a6b55;">یادداشتی نیست.</p>'}
      </div>

      <h3 style="margin:1.5rem 0 .8rem;">💬 پیام‌ها (${(panelRes.messages||[]).length})</h3>
      <div class="admin-mod-list">
        ${(panelRes.messages || []).map(m => `
          <div class="admin-mod-row" data-message-id="${escHtml(m.id)}">
            <span>${escHtml(m.text)}</span>
            <button class="pill-btn admin-delete-message" data-message-id="${escHtml(m.id)}">🗑</button>
          </div>`).join("") || '<p style="color:#7a6b55;">پیامی نیست.</p>'}
      </div>
    `;

    body.querySelectorAll(".admin-role-select").forEach(sel => {
      sel.addEventListener("change", async () => {
        try { await Api.adminSetRole(sel.dataset.userId, sel.value); }
        catch (e) { alert(e.message); renderAdminTab(body); }
      });
    });
    body.querySelectorAll(".admin-delete-user").forEach(btn => {
      btn.addEventListener("click", async () => {
        if (!confirm("این کاربر حذف شود؟")) return;
        try { await Api.adminDeleteUser(btn.dataset.userId); renderAdminTab(body); }
        catch (e) { alert(e.message); }
      });
    });
    body.querySelectorAll(".admin-task-done").forEach(btn => {
      btn.addEventListener("click", async () => {
        try { await Api.updateTask(btn.dataset.taskId, { status: "completed" }); renderAdminTab(body); }
        catch (e) { alert(e.message); }
      });
    });
    body.querySelectorAll(".admin-task-start").forEach(btn => {
      btn.addEventListener("click", async () => {
        try { await Api.updateTask(btn.dataset.taskId, { status: "in_progress" }); renderAdminTab(body); }
        catch (e) { alert(e.message); }
      });
    });
    body.querySelectorAll(".admin-delete-task").forEach(btn => {
      btn.addEventListener("click", async () => {
        if (!confirm("این وظیفه حذف شود؟")) return;
        try { await Api.deleteTask(btn.dataset.taskId); renderAdminTab(body); }
        catch (e) { alert(e.message); }
      });
    });
    body.querySelectorAll(".admin-delete-note").forEach(btn => {
      btn.addEventListener("click", async () => {
        try { await Api.deleteNote(btn.dataset.noteId); renderAdminTab(body); }
        catch (e) { alert(e.message); }
      });
    });
    body.querySelectorAll(".admin-delete-message").forEach(btn => {
      btn.addEventListener("click", async () => {
        try { await Api.deleteMessage(btn.dataset.messageId); renderAdminTab(body); }
        catch (e) { alert(e.message); }
      });
    });
  } catch (e) {
    body.innerHTML = `<div style="text-align:center;color:#c0392b;padding:2rem;">${escHtml(e.message)}</div>`;
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
          <div class="report-entry-date">${dateStr}${r.teacher ? " — " + escHtml(r.teacher.name || "") : ""}</div>
          <div class="report-entry-badges">
            ${r.mood ? '<span class="report-badge">' + (MOOD_FA[r.mood] || r.mood) + '</span>' : ""}
            ${r.food ? '<span class="report-badge">' + (FOOD_FA[r.food] || r.food) + '</span>' : ""}
            ${r.sleep ? '<span class="report-badge">' + (SLEEP_FA[r.sleep] || r.sleep) + '</span>' : ""}
          </div>
          ${r.note ? '<div class="report-entry-note">' + escHtml(r.note) + '</div>' : ""}
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

var _panelBack = document.getElementById("panel-back");
if (_panelBack) _panelBack.addEventListener("click", () => showScreen("screen-lobby"));

/* ---------- بایگانی (فاز ۳: جستجوی زنده از API، با سقوط به داده‌ی استاتیک اگر سرور در دسترس نبود) ---------- */
async function initArchive() {
  await API_READY; // مطمئن شویم قبل از تصمیم‌گیری، وضعیت آنلاین/آفلاین واقعی API مشخص شده باشد
  const filtersEl = document.getElementById("archive-filters");
  let cats = [];
  if (APP_API_ONLINE) {
    try { cats = await Api.categories(); } catch (e) { /* fallback */ }
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
    const typeIcon = { pdf: "📄", video: "🎬", audio: "🔊", game: "🎮", activity: "🎯" }[item.type] || "📄";
    // منبع کوتاه (فقط نام، بدون URL طولانی)
    const srcName = (item.source || "").replace(/^https?:\/\//, "").split("/")[0] || "";
    const srcTag = srcName ? '<span class="ai-tag ai-source">' + srcName + '</span>' : '';
    const typeTag = '<span class="ai-tag ai-type">' + (item.type || 'سایر') + '</span>';
    // فقط دسته و سن — بدون رشته‌های طولانی
    const meta = [item.category, item.age].filter(Boolean).join(" • ");
    return `
      <div class="archive-item" onclick="openMediaModal(${JSON.stringify(item).replace(/"/g, '&quot;')})">
        <div class="ai-icon">${typeIcon}</div>
        <div class="ai-title">${item.title}</div>
        <div class="ai-meta">${meta}</div>
        <div class="ai-tags">${typeTag}${srcTag}</div>
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
      /* fallback to static data */
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

var _archiveBack = document.getElementById("archive-back");
if (_archiveBack) _archiveBack.addEventListener("click", () => showScreen("screen-lobby"));

/* ---------- جستجوی عمومی (فاز ۳: فیلتر + تگ + سورت) ---------- */

// همه آیتمها: بایگانی + همه آیتمهای اتاقها (injected MAHD شامل)
let _allSearchItems = null;
function getAllSearchItems() {
  if (_allSearchItems) return _allSearchItems;
  const seen = new Set();
  const out = (typeof ARCHIVE_DATA !== "undefined" ? ARCHIVE_DATA : []).slice();
  out.forEach(it => { if (it.id) seen.add(it.id); });
  (typeof ROOMS !== "undefined" ? ROOMS : []).forEach(room => {
    Object.keys(room.views || {}).forEach(vk => {
      (room.views[vk].hotspots || []).forEach(h => {
        (h.categories || []).forEach(cat => {
          (cat.items || []).forEach(it => {
            const key = (it.title || "") + "|" + (it.type || "");
            if (seen.has(key)) return;
            seen.add(key);
            out.push(Object.assign({}, it, { _room: room.id, source: it.source || "اتاق " + (room.name || room.id) }));
          });
        });
      });
    });
  });
  _allSearchItems = out;
  return out;
}
function applySearchFilters(results, q) {
  const type = document.getElementById("search-type")?.value || "";
  const cat = document.getElementById("search-category")?.value || "";
  const age = document.getElementById("search-age")?.value || "";
  const sort = document.getElementById("search-sort")?.value || "relevance";

  let r = results.slice();
  if (type) r = r.filter(a => (a.type || "") === type);
  if (cat) r = r.filter(a => (a.category || "") === cat);
  if (age) r = r.filter(a => (a.age || "").includes(age.replace(/ سال/g, "")));

  if (sort === "title") {
    r.sort((a, b) => (a.title || "").localeCompare((b.title || ""), "fa"));
  } else if (sort === "newest" || sort === "oldest") {
    r.sort((a, b) => {
      const da = new Date(a.date || 0).getTime();
      const db = new Date(b.date || 0).getTime();
      return sort === "newest" ? db - da : da - db;
    });
  } else if (q) {
    r.sort((a, b) => (b.title || "").includes(q) - (a.title || "").includes(q));
  }
  return r;
}

function renderSearchTags() {
  const el = document.getElementById("search-tags");
  if (!el) return;
  const type = document.getElementById("search-type")?.value || "";
  const cat = document.getElementById("search-category")?.value || "";
  const age = document.getElementById("search-age")?.value || "";
  const labels = [];
  if (type) labels.push({ k: "type", t: ({pdf:"کاربرگ",video:"ویدیو",audio:"صوت",game:"بازی",activity:"فعالیت"})[type] || type });
  if (cat) labels.push({ k: "category", t: cat });
  if (age) labels.push({ k: "age", t: age });
  el.innerHTML = labels.map(l =>
    '<span class="search-tag" data-k="' + l.k + '">' + l.t + ' <button class="search-tag-x" onclick="clearSearchFilter(\'' + l.k + '\')">✕</button></span>'
  ).join("");
}

function clearSearchFilter(key) {
  if (key === "type") document.getElementById("search-type").value = "";
  if (key === "category") document.getElementById("search-category").value = "";
  if (key === "age") document.getElementById("search-age").value = "";
  document.getElementById("search-input").dispatchEvent(new Event("input"));
}

function doSearch(q) {
  const el = document.getElementById("search-results");
  if (!q) { el.innerHTML = ""; return; }
  let results = getAllSearchItems().filter(a =>
    (a.title || "").includes(q) ||
    (a.category || "").includes(q) ||
    (a.audience || "").includes(q) ||
    (a.desc || "").includes(q)
  );
  results = applySearchFilters(results, q);
  renderSearchTags();
  renderArchiveResults("search-results", results);
}

document.getElementById("search-input").addEventListener("input", debounce(async (e) => {
  doSearch(e.target.value.trim());
}, 250));
["search-type", "search-category", "search-age", "search-sort"].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener("change", () => {
    const q = (document.getElementById("search-input")?.value || "").trim();
    if (q) doSearch(q);
  });
});

// پر کردن دسته‌ها در فیلتر جستجو از داده واقعی
(function fillSearchCategories() {
  const sel = document.getElementById("search-category");
  if (!sel) return;
  const cats = [...new Set(ARCHIVE_DATA.map(a => a.category).filter(Boolean))].sort();
  cats.forEach(c => {
    const o = document.createElement("option");
    o.value = c; o.textContent = c;
    sel.appendChild(o);
  });
})();

var _searchBack = document.getElementById("search-back");
if (_searchBack) _searchBack.addEventListener("click", () => showScreen("screen-lobby"));

/* ---------- برگشت به بالا در صفحه جستجو ---------- */
(function bindSearchToTop() {
  const sc = document.getElementById("screen-search");
  const btn = document.getElementById("search-to-top");
  if (!sc || !btn) return;
  sc.addEventListener("scroll", () => {
    btn.classList.toggle("show", sc.scrollTop > 300);
  });
  btn.addEventListener("click", () => {
    sc.scrollTo({ top: 0, behavior: "smooth" });
  });
})();

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
  renderMapCircles();
  initArchive();
  if (typeof TaskBoard !== "undefined") TaskBoard.init("lobby-task-board");
})();



var _btnGotoGames = document.getElementById("btn-goto-games");
if (_btnGotoGames) _btnGotoGames.addEventListener("click", () => {
  if (typeof openGamePicker === "function") openGamePicker();
});

/* ---------- Lobby: Virtual Tour button ---------- */
var _btnTour = document.getElementById("btn-virtual-tour");
if (_btnTour) _btnTour.addEventListener("click", () => {
  if (typeof VirtualTour !== "undefined") {
    try { VirtualTour.start(); } catch(e) { /* silent */ }
  }
});


/* ---------- Mini Player: real <audio> playback ---------- */
var _miniPlayerState = { queue: [], currentIndex: -1, open: false };
var _miniAudio = null;

function _getAudio() {
  if (!_miniAudio) _miniAudio = document.getElementById('mini-audio');
  return _miniAudio;
}

// source url priority: explicit audio/video file (audioUrl/mediaUrl) > item.url when it is a media file
function _resolveAudioSrc(item) {
  if (!item) return null;
  if (item.audioUrl || item.audio_url || item.mediaUrl) return item.audioUrl || item.audio_url || item.mediaUrl;
  var u = item.url || "";
  if (/\.(m4a|mp3|ogg|wav|mp4|webm)(\?|#|$)/i.test(u)) return u;
  return null;
}

function openMiniPlayer(item) {
  if (!item) return;
  var playable = /\.(m4a|mp3|ogg|wav|mp4|webm)(\?|#|$)/i.test((item.url || "") + " " + (item.mediaUrl || ""));
  if (!playable && item.type !== 'audio' && item.type !== 'video') return;
  var player = document.getElementById('mini-player');
  if (!player) return;

  var src = _resolveAudioSrc(item);
    if (!src) {
      // No direct audio file (castbox blocks direct mp3). Show the mini player
      // with a fallback link — no auto popup (browsers block them anyway).
      _miniPlayerState.queue.push(item);
    _miniPlayerState.currentIndex = _miniPlayerState.queue.length - 1;
    _updateMiniPlayerUI();
    var player = document.getElementById('mini-player');
    if (player) { player.classList.remove('hidden'); player.classList.add('open'); }
    _miniPlayerState.open = true;
    var pl = document.getElementById('mini-playlist');
    if (pl) pl.innerHTML = '<div class="mini-playlist-fallback">فایل صوتی مستقیم در دسترس نیست. <a href="' + (item.url || '#') + '" target="_blank" style="color:#ff8c00">▶ پخش در کستباکس</a></div>';
    return;
  }

  var existing = _miniPlayerState.queue.findIndex(function(e) { return e.id === item.id; });
  if (existing >= 0) {
    _miniPlayerState.currentIndex = existing;
  } else {
    _miniPlayerState.queue.push(item);
    _miniPlayerState.currentIndex = _miniPlayerState.queue.length - 1;
  }

  _updateMiniPlayerUI();
  player.classList.remove('hidden');
  player.classList.add('open');
  _miniPlayerState.open = true;
  _playEpisode(_miniPlayerState.queue[_miniPlayerState.currentIndex]);
}

function closeMiniPlayer() {
  var player = document.getElementById('mini-player');
  var a = _getAudio();
  if (a) a.pause();
  if (player) {
    player.classList.add('hidden');
    player.classList.remove('open');
    _miniPlayerState.open = false;
  }
}

function _fmtTime(sec) {
  if (!isFinite(sec) || sec < 0) sec = 0;
  var m = Math.floor(sec / 60);
  var s = Math.floor(sec % 60);
  return m + ':' + (s < 10 ? '0' : '') + s;
}

function _updateMiniPlayerUI() {
  var item = _miniPlayerState.queue[_miniPlayerState.currentIndex];
  if (!item) return;
  var titleEl = document.getElementById('mini-title');
  var channelEl = document.getElementById('mini-channel');
  var playlistEl = document.getElementById('mini-playlist');
  if (titleEl) titleEl.textContent = item.title || '';
  if (channelEl) channelEl.textContent = item.channel || item.source || '';

  if (playlistEl && _miniPlayerState.queue.length > 0) {
    playlistEl.innerHTML = _miniPlayerState.queue.map(function(ep, i) {
      return '<div class="mini-playlist-item' + (i === _miniPlayerState.currentIndex ? ' active' : '') + '">' +
        (i + 1) + '. ' + ep.title + '</div>';
    }).join('');
    playlistEl.querySelectorAll('.mini-playlist-item').forEach(function(el, idx) {
      el.onclick = function() {
        _miniPlayerState.currentIndex = idx;
        _updateMiniPlayerUI();
        _playEpisode(_miniPlayerState.queue[idx]);
      };
    });
  }
}

function _syncPlayButton() {
  var a = _getAudio();
  var btn = document.getElementById('mini-play-pause');
  var tgl = document.getElementById('mini-toggle-icon');
  var playing = a && !a.paused && !a.ended;
  if (btn) btn.textContent = playing ? '⏸' : '▶';
  if (tgl) tgl.textContent = playing ? '⏸' : '▶';
}

function _playEpisode(item) {
  if (!item) return;
  var src = _resolveAudioSrc(item);
  if (!src) return;
  var a = _getAudio();
  if (!a) return;
  if (a.src !== src) a.src = src;
  a.play().catch(function(err) { /* silent */ });
  _syncPlayButton();
}

function _prevEpisode() {
  if (_miniPlayerState.queue.length === 0) return;
  _miniPlayerState.currentIndex = (_miniPlayerState.currentIndex - 1 + _miniPlayerState.queue.length) % _miniPlayerState.queue.length;
  _updateMiniPlayerUI();
  _playEpisode(_miniPlayerState.queue[_miniPlayerState.currentIndex]);
}

function _nextEpisode() {
  if (_miniPlayerState.queue.length === 0) return;
  _miniPlayerState.currentIndex = (_miniPlayerState.currentIndex + 1) % _miniPlayerState.queue.length;
  _updateMiniPlayerUI();
  _playEpisode(_miniPlayerState.queue[_miniPlayerState.currentIndex]);
}

function toggleMiniPlayer() {
  var player = document.getElementById('mini-player');
  if (!player) return;
  if (player.classList.contains('hidden')) {
    player.classList.remove('hidden');
  }
  // minimize: فقط پنل جمع میشود، پخش ادامه دارد، آیکون میماند
  if (player.classList.contains('open')) {
    player.classList.remove('open');
    _miniPlayerState.open = false;
  } else {
    player.classList.add('open');
    _miniPlayerState.open = true;
  }
}

  /* ---------- Mini Player: wiring controls ---------- */
  function _bindMiniControls() {
    var toggleBtn = document.getElementById('mini-player-toggle');
    var playPause = document.getElementById('mini-play-pause');
    var prevBtn = document.getElementById('mini-prev');
    var nextBtn = document.getElementById('mini-next');
    var seek = document.getElementById('mini-seek');
    var closeBtn = document.getElementById('mini-close');
    var audio = _getAudio();

    if (toggleBtn) toggleBtn.addEventListener('click', toggleMiniPlayer);
    if (playPause) playPause.addEventListener('click', function () {
      var a = _getAudio();
      if (!a || !a.src) return;
      if (a.paused) { a.play().catch(function (err) { /* silent */ }); }
      else { a.pause(); }
      _syncPlayButton();
    });
    if (prevBtn) prevBtn.addEventListener('click', _prevEpisode);
    if (nextBtn) nextBtn.addEventListener('click', _nextEpisode);
    if (closeBtn) closeBtn.addEventListener('click', closeMiniPlayer);

    if (audio) {
      audio.addEventListener('timeupdate', function () {
        if (!isFinite(audio.duration) || audio.duration <= 0) return;
        var pct = (audio.currentTime / audio.duration) * 100;
        if (seek) seek.value = pct;
        var cur = document.getElementById('mini-cur');
        var dur = document.getElementById('mini-dur');
        if (cur) cur.textContent = _fmtTime(audio.currentTime);
        if (dur) dur.textContent = _fmtTime(audio.duration);
      });
      audio.addEventListener('ended', function () { _nextEpisode(); });
      audio.addEventListener('play', _syncPlayButton);
      audio.addEventListener('pause', _syncPlayButton);
      audio.addEventListener('loadedmetadata', function () {
        var dur = document.getElementById('mini-dur');
        if (dur && isFinite(audio.duration)) dur.textContent = _fmtTime(audio.duration);
      });
    }
    if (seek) {
      seek.addEventListener('input', function () {
        var a = _getAudio();
        if (!a || !isFinite(a.duration) || a.duration <= 0) return;
        a.currentTime = (seek.value / 100) * a.duration;
      });
    }
  }
  _bindMiniControls();

  // Outside-click-close handlers
  document.addEventListener('click', function(e) {
    ['auth-modal', 'media-modal', 'game-modal'].forEach(function(modalId) {
      var modal = document.getElementById(modalId);
      if (modal && !modal.classList.contains('hidden') && e.target === modal) {
        modal.classList.add('hidden');
        modal.classList.remove('active');
      }
    });
    var explorerPanel = document.getElementById('explorer-panel');
    var explorerToggle = document.getElementById('explorer-toggle');
    if (explorerPanel && explorerToggle && explorerPanel.classList.contains('open') && 
        !explorerPanel.contains(e.target) && !explorerToggle.contains(e.target)) {
      explorerPanel.classList.remove('open');
      explorerToggle.classList.remove('shifted');
    }
  });
