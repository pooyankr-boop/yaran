/*
  یاران — پنل برنامه‌ریزی و ارتباط با والدین
  تقویم شمسی (جلالی)، جلسه‌گذاری با والدین، پیام با ضمیمه‌ی محتوای اتاق‌ها.
  کارکنان: تقویم + ساخت جلسه/رویداد + ارسال پیام.
  والدین: جلسات پیش‌رو (تأیید/رد) + صندوق پیام دریافتی.
*/
var Planner = (function () {
  "use strict";

  var state = { jy: null, jm: null, selIso: null, events: [], parents: [], msgs: [], view: "calendar", attachments: [] };
  var KIND_FA = { meeting: "🤝 جلسه با والد", event: "🎪 رویداد مهد", reminder: "⏰ یادآور" };
  var STATUS_FA = {
    pending: '<span class="pl-badge pending">در انتظار پاسخ</span>',
    confirmed: '<span class="pl-badge ok">تأیید شده</span>',
    declined: '<span class="pl-badge no">رد شده</span>',
    cancelled: '<span class="pl-badge no">لغو شد</span>',
    done: '<span class="pl-badge ok">برگزار شد</span>'
  };

  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function fa(n) { return (typeof YCal !== "undefined") ? YCal.num(n) : String(n); }
  function isoToJ(iso) { const p = iso.split("-"); return YCal.toJalali(+p[0], +p[1], +p[2]); }
  function todayISO() { const d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
  function isStaffUser() {
    const u = typeof currentUser === "function" ? currentUser() : null;
    return u && (u.role === "teacher" || u.role === "admin");
  }

  /* ═══════════ ورودی اصلی (از renderPanelTab) ═══════════ */
  async function render(body) {
    if (!APP_API_ONLINE) {
      body.innerHTML = emptyBox("🔌 اتصال به سرور برقرار نیست؛ برنامه‌ریزی به سرور نیاز دارد.", "");
      return;
    }
    body.innerHTML = '<div style="text-align:center;color:#7a6b55;padding:2rem;">در حال بارگذاری…</div>';
    const t = todayISO();
    const j = isoToJ(t);
    state.jy = j.jy; state.jm = j.jm; state.selIso = t;
    try {
      await refreshData();
    } catch (e) {
      body.innerHTML = emptyBox("خطا در دریافت داده: " + esc(e.message), "");
      return;
    }
    draw(body);
  }

  async function refreshData() {
    const evRes = await Api.plannerEvents();
    state.events = evRes.events || [];
    if (isStaffUser()) {
      try { state.parents = (await Api.plannerParents()).parents || []; } catch (e) { state.parents = []; }
    } else {
      try { state.msgs = (await Api.parentMessages()).messages || []; } catch (e) { state.msgs = []; }
    }
  }

  function emptyBox(title, sub) {
    return (typeof SVGX !== "undefined") ? SVGX.emptyState({ art: "cloud", title: title, sub: sub }) :
      "<p>" + title + "</p>";
  }

  /* ═══════════ رندر کلی ═══════════ */
  function draw(body) {
    if (isStaffUser()) drawStaff(body); else drawParent(body);
  }

  /* ═══════════ نمای کارکنان ═══════════ */
  function drawStaff(body) {
    body.innerHTML =
      '<div class="pl-wrap">' +
        '<div class="pl-cols">' +
          '<div class="pl-col">' +
            '<h3 class="yr-display pl-h">🗓 تقویم یاران</h3>' +
            '<div id="pl-calendar"></div>' +
            '<div id="pl-day-detail"></div>' +
          "</div>" +
          '<div class="pl-col">' +
            '<div class="pl-tabs2">' +
              '<button class="pl-t2 active" data-v="compose">✉️ پیام به والدین</button>' +
              '<button class="pl-t2" data-v="inbox">📥 ارسالی‌ها</button>' +
            "</div>" +
            '<div id="pl-comm"></div>' +
          "</div>" +
        "</div>" +
      "</div>";

    body.querySelectorAll(".pl-t2").forEach(function (b) {
      b.addEventListener("click", function () {
        body.querySelectorAll(".pl-t2").forEach(x => x.classList.remove("active"));
        b.classList.add("active");
        state.view = b.dataset.v;
        drawComm(document.getElementById("pl-comm"));
      });
    });

    drawCalendar(document.getElementById("pl-calendar"));
    drawDayDetail(document.getElementById("pl-day-detail"));
    drawComm(document.getElementById("pl-comm"));
  }

  /* ── تقویم شمسی ── */
  function drawCalendar(el) {
    var grid = YCal.monthGrid(state.jy, state.jm);
    var today = todayISO();
    var occKey;
    var html = '<div class="pl-cal-head">' +
      '<button class="pill-btn" id="pl-prev-m">‹</button>' +
      '<span class="pl-month yr-display">' + grid.monthName + " " + fa(grid.jy) + "</span>" +
      '<button class="pill-btn" id="pl-next-m">›</button>' +
      '<button class="pill-btn pl-today-btn" id="pl-go-today">امروز</button>' +
      "</div>";
    html += '<div class="pl-cal-week">' + YCal.WEEKDAYS_SHORT.map(function (w) {
      return "<span>" + w + "</span>";
    }).join("") + "</div>";
    html += '<div class="pl-cal-grid">';
    grid.weeks.forEach(function (week) {
      week.forEach(function (cell) {
        if (!cell) { html += '<span class="pl-day blank"></span>'; return; }
        var cls = "pl-day";
        if (cell.iso === today) cls += " today";
        if (cell.iso === state.selIso) cls += " sel";
        if (cell.weekdayIndex === 6) cls += " friday";
        var evCount = eventsOn(cell.iso).length;
        var occ = YCal.OCCASIONS[cell.jm + "-" + cell.jd] || "";
        html += '<button class="' + cls + '" data-iso="' + cell.iso + '" title="' + esc(occ) + '">' +
          "<span class='pl-dnum'>" + fa(cell.jd) + "</span>" +
          (occ ? "<span class='pl-occ'>" + occ + "</span>" : "") +
          (evCount ? "<span class='pl-evdots'>" + "●".repeat(Math.min(evCount, 3)) + "</span>" : "") +
          "</button>";
      });
    });
    html += "</div>";
    el.innerHTML = html;

    el.querySelector("#pl-prev-m").addEventListener("click", function () { shiftMonth(-1); });
    el.querySelector("#pl-next-m").addEventListener("click", function () { shiftMonth(1); });
    el.querySelector("#pl-go-today").addEventListener("click", function () {
      var j = isoToJ(todayISO()); state.jy = j.jy; state.jm = j.jm; state.selIso = todayISO();
      redraw();
    });
    el.querySelectorAll(".pl-day[data-iso]").forEach(function (d) {
      d.addEventListener("click", function () {
        state.selIso = d.dataset.iso;
        el.querySelectorAll(".pl-day.sel").forEach(x => x.classList.remove("sel"));
        d.classList.add("sel");
        drawDayDetail(document.getElementById("pl-day-detail"));
      });
    });
  }

  function shiftMonth(d) {
    state.jm += d;
    if (state.jm > 12) { state.jm = 1; state.jy++; }
    if (state.jm < 1) { state.jm = 12; state.jy--; }
    redraw();
  }
  function redraw() {
    var body = document.getElementById("panel-body");
    if (!body || !body.querySelector(".pl-wrap")) return;
    drawCalendar(body.querySelector("#pl-calendar"));
    drawDayDetail(body.querySelector("#pl-day-detail"));
  }

  function eventsOn(iso) {
    return state.events.filter(function (e) { return e.date === iso; });
  }

  /* ── جزئیات روز انتخابی ── */
  function drawDayDetail(el) {
    var iso = state.selIso;
    var j = isoToJ(iso);
    var evs = eventsOn(iso);
    var staff = isStaffUser();
    var html = '<div class="pl-daybox"><div class="pl-daybox-head yr-display">' +
      YCal.format(new Date(iso + "T12:00:00"), "long") + "</div>";

    if (evs.length) {
      html += '<div class="pl-evlist">';
      evs.forEach(function (e) {
        html += '<div class="pl-ev' + (e.kind === "meeting" ? " is-meeting" : "") + '">' +
          '<div class="pl-ev-main">' +
            '<strong>' + (KIND_FA[e.kind] || "📌") + " " + esc(e.title) + "</strong>" +
            '<small>' + (e.time ? "🕐 " + fa(e.time) : "") + (e.parentName ? " · 👤 " + esc(e.parentName) : "") + (e.childName ? " · 🧒 " + esc(e.childName) : "") + "</small>" +
            (e.note ? '<em>' + esc(e.note) + "</em>" : "") +
            attChipsHtml(e.attachments, true) +
          "</div>" +
          '<div class="pl-ev-side">' + STATUS_FA[e.status] +
          (staff ? '<button class="pill-btn pl-del" data-id="' + e.id + '" title="حذف">🗑</button>' : "") +
          "</div></div>";
      });
      html += "</div>";
    } else {
      html += '<p class="pl-noday">رویدادی برای این روز ثبت نشده.</p>';
    }

    if (staff) {
      html += '<details class="pl-addwrap"><summary class="svgx-fab pulsing">＋ افزودن رویداد/جلسه در این روز</summary>' + addFormHtml(iso) + "</details>";
    }
    html += "</div>";
    el.innerHTML = html;

    if (staff) bindAddForm(el);
    el.querySelectorAll(".pl-del").forEach(function (b) {
      b.addEventListener("click", async function () {
        if (!confirm("این رویداد حذف شود؟")) return;
        try { await Api.plannerDeleteEvent(b.dataset.id); await refreshData(); redraw(); }
        catch (e) { alert(e.message); }
      });
    });
  }

  function addFormHtml(iso) {
    var parentOpts = state.parents.map(function (p) {
      return '<option value="' + esc(p.email) + '">' + esc(p.name) + " (" + esc(p.email) + ")</option>";
    }).join("");
    return '<form class="pl-form" id="pl-add-form">' +
      '<label>نوع <select name="kind"><option value="meeting">' + KIND_FA.meeting + '</option><option value="event">' + KIND_FA.event + '</option><option value="reminder">' + KIND_FA.reminder + "</option></select></label>" +
      '<label>عنوان <input name="title" required maxlength="120" placeholder="مثلاً جلسه‌ی گزارش پیشرفت" /></label>' +
      '<div class="pl-row2">' +
        '<label>ساعت <input name="time" type="time" value="16:00" /></label>' +
        '<label>مدت (دقیقه) <input name="durationMin" type="number" min="10" max="240" step="5" value="30" /></label>' +
      "</div>" +
      '<label class="only-meeting">والد <select name="parentEmail"><option value="">— انتخاب والد —</option>' + parentOpts + "</select></label>" +
      '<label class="only-meeting">نام کودک <input name="childName" placeholder="اختیاری" /></label>' +
      '<label>یادداشت <textarea name="note" rows="2" placeholder="موضوع جلسه، نکته‌ها…"></textarea></label>' +
      '<div class="pl-form-actions"><button type="submit" class="svgx-fab">ثبت در تقویم</button></div>' +
      '<input type="hidden" name="date" value="' + iso + '" />' +
      "</form>";
  }

  function bindAddForm(scope) {
    var form = scope.querySelector("#pl-add-form");
    if (!form) return;
    var kindSel = form.querySelector('[name="kind"]');
    function syncKind() {
      form.classList.toggle("kind-meeting", kindSel.value === "meeting");
    }
    kindSel.addEventListener("change", syncKind);
    syncKind();
    form.addEventListener("submit", async function (ev) {
      ev.preventDefault();
      var fd = new FormData(form);
      var payload = Object.fromEntries(fd.entries());
      payload.kind = payload.kind || "meeting";
      if (payload.kind === "meeting" && !payload.parentEmail) { alert("برای جلسه، انتخاب والد لازم است."); return; }
      try {
        await Api.plannerCreateEvent(payload);
        await refreshData(); redraw();
      } catch (e) { alert(e.message); }
    });
  }

  /* ── ارتباط: نوشتن/دیدن پیام‌ها ── */
  function drawComm(el) {
    if (state.view === "inbox") { drawSent(el); return; }
    var parentOpts = '<option value="*">📣 همه‌ی والدین (اعلامیه)</option>' + state.parents.map(function (p) {
      return '<option value="' + esc(p.email) + '">' + esc(p.name) + " (" + esc(p.email) + ")</option>";
    }).join("");
    el.innerHTML =
      '<div class="pl-compose">' +
        "<p class='pl-tip'>💡 می‌توانید کاربرگ، قصه یا فعالیت موجود در اتاق‌ها را به پیام ضمیمه کنید.</p>" +
        '<label>مخاطب <select id="pl-to">' + parentOpts + "</select></label>" +
        '<textarea id="pl-text" rows="4" placeholder="پیام شما برای والد…" maxlength="3000"></textarea>' +
        '<div class="pl-att-row">' +
          '<button class="svgx-fab cool" id="pl-pick">📎 ضمیمه‌ی محتوای یاران</button>' +
          '<div id="pl-att-chips" class="pl-att-chips"></div>' +
        "</div>" +
        '<div class="pl-form-actions"><button class="svgx-fab grapey" id="pl-send">📨 ارسال پیام</button></div>' +
      "</div>";
    el.querySelector("#pl-pick").addEventListener("click", openPicker);
    el.querySelector("#pl-send").addEventListener("click", send);
  }

  async function send() {
    var toEl = document.getElementById("pl-to");
    var textEl = document.getElementById("pl-text");
    var text = textEl.value.trim();
    if (!text) { textEl.focus(); return; }
    var toEmail = toEl.value;
    var toName = toEmail === "*" ? "" : ((state.parents.find(p => p.email === toEmail) || {}).name || "");
    try {
      await Api.createParentMessage({
        text: text,
        toEmail: toEmail,
        toName: toName,
        attachments: state.attachments.map(function (a) {
          return { title: a.title, type: a.type, url: a.url, image: a.image, icon: a.icon, audioUrl: a.audioUrl || undefined };
        })
      });
      textEl.value = "";
      state.attachments = [];
      renderAttChips();
      alert("✅ پیام ارسال شد.");
    } catch (e) { alert(e.message); }
  }

  function drawSent(el) {
    Api.parentMessages().then(function (r) {
      var list = (r.messages || []).filter(function (m) { return m.fromEmail === (currentUser() || {}).email; });
      if (!list.length) { el.innerHTML = emptyBox("هنوز پیامی نفرستاده‌اید.", ""); return; }
      el.innerHTML = list.map(function (m) {
        var toFa = m.toEmail === "*" ? "همه‌ی والدین" : (m.toName || m.toEmail);
        return '<div class="pl-msg"><div class="pl-msg-head"><strong>' + esc(toFa) + "</strong><span class='pl-date'>" + YCal.formatISO(m.date, "medium") + " · " + YCal.formatTime(new Date(m.date)) + "</span></div>" +
          '<p>' + esc(m.text).replace(/\n/g, "<br/>") + "</p>" + attChipsHtml(m.attachments, true) +
          '<div class="pl-readby">' + fa((m.readBy || []).length) + " بار خوانده شد</div></div>";
      }).join("");
    }).catch(function (e) {
      el.innerHTML = emptyBox("خطا: " + e.message, "");
    });
  }

  function attChipsHtml(atts, clickable) {
    if (!atts || !atts.length) return "";
    return '<div class="pl-atts">' + atts.map(function (a, i) {
      return '<button class="pl-att"' + (clickable ? ' data-i="' + i + '"' : "") + ">" +
        (a.icon || ({ pdf: "📄", video: "🎬", audio: "🔊", game: "🎮", activity: "🎯" }[a.type] || "📎")) +
        " " + esc(a.title) + "</button>";
    }).join("") + "</div>";
  }

  /* ── انتخابگر محتوا (ضمیمه از کتابخانه‌ی یاران) ── */
  function collectLibrary() {
    var items = [];
    var seen = new Set();
    function push(it) {
      var key = (it.title || "") + "|" + (it.type || "");
      if (seen.has(key)) return;
      seen.add(key);
      items.push(it);
    }
    (typeof ARCHIVE_DATA !== "undefined" ? ARCHIVE_DATA : []).slice().reverse().slice(0, 600).forEach(push);
    if (typeof getAllSearchItems === "function") {
      try { getAllSearchItems().slice(0, 900).forEach(push); } catch (e) {}
    }
    return items;
  }

  function openPicker() {
    var items = collectLibrary();
    var overlay = document.createElement("div");
    overlay.className = "pl-picker-overlay";
    overlay.innerHTML =
      '<div class="pl-picker">' +
        '<div class="pl-picker-head"><strong>📎 انتخاب محتوا برای ضمیمه</strong><button class="dk-btn" id="pl-pk-close">✕</button></div>' +
        '<input id="pl-pk-q" placeholder="🔍 جستجوی عنوان…" />' +
        '<div class="pl-pk-types">' +
          [["", "همه"], ["pdf", "📄"], ["video", "🎬"], ["audio", "🔊"], ["game", "🎮"], ["activity", "🎯"]].map(function (t) {
            return '<button class="content-type-tag' + (t[0] === "" ? " active" : "") + '" data-t="' + t[0] + '">' + (t[1].length > 2 ? t[1] + " " + ({ pdf: "کاربرگ", video: "ویدیو", audio: "صوت", game: "بازی", activity: "فعالیت" }[t[0]] || "") : t[1]) + "</button>";
          }).join("") +
        "</div>" +
        '<div class="pl-picker-list" id="pl-pk-list"></div>' +
      "</div>";
    document.body.appendChild(overlay);

    var curType = "", q = "";
    function rowHtml(it) {
      var icon = ({ pdf: "📄", video: "🎬", audio: "🔊", game: "🎮", activity: "🎯" }[it.type] || "📎");
      return '<button class="pl-pk-item" data-title="' + esc(it.title || "").replace(/"/g, "&quot;") + '">' +
        "<span class='pi'>" + icon + "</span><span class='pt'>" + esc(it.title || "(بدون عنوان)") + "</span>" +
        "<small>" + esc((typeof YaranTax !== "undefined" && it._tax && it._tax.canonCat) || it.category || "") + "</small></button>";
    }
    function renderList() {
      var filtered = items.filter(function (it) {
        if (curType && (it.type || "").split("-")[0] !== curType) return false;
        if (q && !((it.title || "").includes(q))) return false;
        return true;
      }).slice(0, 120);
      document.getElementById("pl-pk-list").innerHTML =
        filtered.map(rowHtml).join("") || '<p style="text-align:center;color:#999;padding:20px;">چیزی یافت نشد</p>';
      document.querySelectorAll(".pl-pk-item").forEach(function (b) {
        b.addEventListener("click", function () {
          var it = filtered.find(x => x.title === b.dataset.title);
          if (!it) return;
          if (state.attachments.length >= 8) { alert("حداکثر ۸ ضمیمه"); return; }
          state.attachments.push({
            title: it.title, type: it.type || "pdf",
            url: it.url || "", image: it.image || "",
            audioUrl: it.audioUrl || "", icon: ""
          });
          renderAttChips();
        });
      });
    }
    overlay.querySelector("#pl-pk-close").addEventListener("click", function () { overlay.remove(); });
    overlay.addEventListener("click", function (e) { if (e.target === overlay) overlay.remove(); });
    overlay.querySelector("#pl-pk-q").addEventListener("input", function (e) { q = e.target.value.trim(); renderList(); });
    overlay.querySelectorAll(".content-type-tag").forEach(function (t) {
      t.addEventListener("click", function () {
        overlay.querySelectorAll(".content-type-tag").forEach(x => x.classList.remove("active"));
        t.classList.add("active"); curType = t.dataset.t; renderList();
      });
    });
    renderList();
  }

  function renderAttChips() {
    var box = document.getElementById("pl-att-chips");
    if (!box) return;
    box.innerHTML = state.attachments.map(function (a, i) {
      return '<span class="tax-chip">' + (a.icon || ({ pdf: "📄", video: "🎬", audio: "🔊", game: "🎮", activity: "🎯" }[a.type] || "📎")) + " " +
        esc(a.title.slice(0, 26)) + ' <button class="search-tag-x" data-x="' + i + '">✕</button></span>';
    }).join("");
    box.querySelectorAll("[data-x]").forEach(function (b) {
      b.addEventListener("click", function () {
        state.attachments.splice(+b.dataset.x, 1);
        renderAttChips();
      });
    });
  }

  /* ═══════════ نمای والدین ═══════════ */
  function drawParent(body) {
    var meetings = state.events.filter(function (e) { return e.status !== "cancelled"; });
    var html = '<div class="pl-wrap">';
    html += '<h3 class="yr-display pl-h">🤝 جلسات پیش‌رو</h3>';
    if (!meetings.length) {
      html += emptyBox("هنوز جلسه‌ای ثبت نشده.", "مربیان می‌توانند از بخش برنامه‌ریزی برای شما وقت جلسه بگذارند.");
    } else {
      html += '<div class="pl-evlist">';
      meetings.forEach(function (e) {
        var jd = isoToJ(e.date);
        html += '<div class="pl-ev is-meeting">' +
          '<div class="pl-ev-main">' +
            "<strong>" + esc(e.title) + "</strong>" +
            "<small>📅 " + YCal.format(new Date(e.date + "T12:00:00"), "long") + (e.time ? " · 🕐 ساعت " + fa(e.time) : "") + "</small>" +
            (e.note ? "<em>" + esc(e.note) + "</em>" : "") +
            attChipsHtml(e.attachments, true) +
          "</div>" +
          '<div class="pl-ev-side">' + STATUS_FA[e.status];
        if (e.status === "confirmed" || e.status === "pending") {
          html += '<div style="display:flex;gap:5px;margin-top:6px;">' +
            '<button class="svgx-fab cool pl-rsvp" data-id="' + e.id + '" data-st="confirmed">می‌آیم ✓</button>' +
            '<button class="pill-btn pl-rsvp" data-id="' + e.id + '" data-st="declined">نمی‌توانم ✕</button></div>';
        }
        html += "</div></div>";
      });
      html += "</div>";
    }

    html += '<h3 class="yr-display pl-h" style="margin-top:22px;">✉️ پیام‌های مربیان</h3>';
    if (!state.msgs.length) {
      html += emptyBox("پیامی دریافت نشده.", "");
    } else {
      html += state.msgs.map(function (m) {
        return '<div class="pl-msg"><div class="pl-msg-head"><strong>' + esc(m.fromName || "کارکنان یاران") + "</strong>" +
          "<span class='pl-date'>" + YCal.timeAgo(m.date) + "</span></div>" +
          "<p>" + esc(m.text).replace(/\n/g, "<br/>") + "</p>" +
          attChipsHtml(m.attachments, true) + "</div>";
      }).join("");
    }
    html += "</div>";
    body.innerHTML = html;

    body.querySelectorAll(".pl-att").forEach(function (b) {
      b.addEventListener("click", function () {
        // یافتن آیتم ضمیمه از روی عنوان بین همه‌ی پیام‌ها/جلسات
        var allAtts = [];
        state.events.forEach(function (e) { (e.attachments || []).forEach(function (a) { allAtts.push(a); }); });
        state.msgs.forEach(function (m) { (m.attachments || []).forEach(function (a) { allAtts.push(a); }); });
        var a = allAtts.find(function (x) { return x.title === b.textContent.replace(/^.\s*/, "").trim(); }) ||
                (function () { var parts = b.textContent.trim().split(/\s+/); return allAtts.find(x => x.title.includes(parts[parts.length - 1])); })();
        if (!a) return;
        if (typeof openMediaModal === "function") openMediaModal(a);
      });
    });
    body.querySelectorAll(".pl-rsvp").forEach(function (b) {
      b.addEventListener("click", async function () {
        try {
          await Api.plannerSetStatus(b.dataset.id, b.dataset.st);
          await refreshData();
          drawParent(document.getElementById("panel-body"));
        } catch (e) { alert(e.message); }
      });
    });
  }

  return { render: render };
})();
