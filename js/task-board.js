/* ══════════════════════════════════════════════════════════════
   تخته پیگیری وظایف — Task Board v2
   خواندن مستقیم data/tasks.json از HTTP server
   بروزرسانی خودکار هر ۳ دقیقه + دکمه 🔄
   ══════════════════════════════════════════════════════════════ */
var TaskBoard = (function () {
  'use strict';
  var timer = null, container = null, collapsed = false, tab = 'tasks', panel = null;
  var API = (window.YARAN_API_BASE || '') + '/api';

  function fetch() {
    var x = new XMLHttpRequest();
    x.open('GET', API + '/tasks?' + Date.now(), true);
    x.timeout = 5000;
    x.onload = function () {
      if (x.status === 200) {
        try { render(JSON.parse(x.responseText)); return; } catch (e) {}
      }
      showEmpty('خطا در خواندن داده');
    };
    x.onerror = x.ontimeout = function () { showEmpty('سرور در دسترس نیست'); };
    x.send();
    if (tab !== 'tasks') fetchPanel();
  }

  function fetchPanel() {
    var x = new XMLHttpRequest();
    x.open('GET', API + '/panel?' + Date.now(), true);
    x.timeout = 5000;
    x.onload = function () {
      if (x.status === 200) {
        try { panel = JSON.parse(x.responseText); render(null); return; } catch (e) {}
      }
    };
    x.send();
  }

  function showEmpty(msg) {
    if (!container) return;
    container.innerHTML =
      '<div class="tb-header"><span class="tb-title">📋 تخته پیگیری وظایف</span>' +
      '<div class="tb-actions"><button class="tb-btn" data-tb="refresh">🔄</button></div></div>' +
      '<div class="tb-empty"><div class="tb-empty-icon">📝</div>' +
      '<div class="tb-empty-text">' + esc(msg || 'هنوز وظیفه‌ای ثبت نشده') + '</div>' +
      '<div class="tb-empty-hint">از ربات @yaran_robot اضافه کنید</div></div>';
    bind();
  }

  function render(data) {
      if (!container) return;
      var tasks = (data && data.tasks) ? data.tasks : null;
      var h = '';

      h += '<div class="tb-header"><span class="tb-title">📋 تخته پیگیری وظایف</span>';
      h += '<span class="tb-count"></span>';
      h += '<div class="tb-actions">';
      h += '<button class="tb-btn" data-tb="pin" title="پین در همه صفحات">📌</button>';
      h += '<button class="tb-btn" data-tb="maximize" title="تمامصفحه">⛶</button>';
      h += '<button class="tb-btn tb-btn-collapse" data-tb="collapse">' + (collapsed ? '+' : '−') + '</button>';
      h += '<button class="tb-btn" data-tb="refresh" title="بروزرسانی">🔄</button>';
      h += '<button class="tb-btn tb-btn-close" data-tb="close">✕</button>';
      h += '</div></div>';

      if (!collapsed) {
        h += '<div class="tb-tabs">';
        h += '<button class="tb-tab' + (tab === 'tasks' ? ' tb-tab-active' : '') + '" data-tb-tab="tasks">📋 وظایف</button>';
        h += '<button class="tb-tab' + (tab === 'reports' ? ' tb-tab-active' : '') + '" data-tb-tab="reports">😊 گزارش</button>';
        h += '<button class="tb-tab' + (tab === 'notes' ? ' tb-tab-active' : '') + '" data-tb-tab="notes">📝 یادداشت</button>';
        h += '<button class="tb-tab' + (tab === 'messages' ? ' tb-tab-active' : '') + '" data-tb-tab="messages">💬 پیام</button>';
        h += '</div>';

        if (tab === 'tasks') {
          h += renderTasks(tasks);
        } else if (tab === 'reports') {
          h += renderPanelList(panel ? panel.reports : [], function (r) {
            var emo = { happy: '😊', neutral: '😐', sad: '😢' };
            return '<div class="tb-task"><div class="tb-task-top"><span class="tb-task-title">' +
              esc(r.childName || 'کودک') + '</span></div><div class="tb-task-assignee">' +
              (emo[r.mood] || '') + ' ' + esc(r.mood || '') + ' · 🍽 ' + esc(r.food || '') +
              ' · 😴 ' + esc(r.sleep || '') + (r.note ? '<br>📝 ' + esc(r.note) : '') +
              '</div><div class="tb-task-meta">' + esc((r.date || '').slice(0, 10)) + '</div></div>';
          }, 'گزارشی ثبت نشده');
        } else if (tab === 'notes') {
          h += renderPanelList(panel ? panel.notes : [], function (n) {
            return '<div class="tb-task"><div class="tb-task-top"><span class="tb-task-title">' +
              esc(n.text) + '</span></div><div class="tb-task-meta">' + esc(n.author || '') +
              ' · ' + esc((n.date || '').slice(0, 10)) + '</div></div>';
          }, 'یادداشتی ثبت نشده');
        } else if (tab === 'messages') {
          h += renderPanelList(panel ? panel.messages : [], function (m) {
            return '<div class="tb-task"><div class="tb-task-top"><span class="tb-task-title">' +
              esc(m.text) + '</span></div><div class="tb-task-meta">' + esc(m.author || '') +
              ' · ' + esc((m.date || '').slice(0, 10)) + '</div></div>';
          }, 'پیامی ثبت نشده');
        }
      }

      container.innerHTML = h;
      bind();
    }

    function renderTasks(tasks) {
      if (!tasks) return '<div class="tb-empty"><div class="tb-empty-text">در حال بارگذاری…</div></div>';
      var pending = tasks.filter(function (t) { return t.status === 'pending' || t.status === 'in_progress' || t.status === 'open'; });
      /* جدیدترین اول (created_at نزولی) — تسکهای بدون تاریخ آخر بمانند */
      var byNew = function (a, b) {
        var ta = a.created_at || '', tb = b.created_at || '';
        if (ta === tb) return 0;
        if (!ta) return 1;
        if (!tb) return -1;
        return ta < tb ? 1 : -1;
      };
      pending.sort(byNew);
      var done = tasks.filter(function (t) { return t.status === 'done' || t.status === 'completed'; });
      done.sort(byNew);
      var h = '';
      if (pending.length) {
        h += '<div class="tb-section"><div class="tb-section-title">⏳ در حال انجام (' + pending.length + ')</div>';
        pending.forEach(function (t) {
          h += '<div class="tb-task"><div class="tb-task-top">';
          h += '<span class="tb-task-id">#' + shortId(t.id) + '</span>';
          h += '<span class="tb-task-title">' + esc(t.title) + '</span></div>';
          var detail = [];
          if (t.assigned_to) detail.push('👤 ' + esc(t.assigned_to));
          if (t.priority && t.priority !== 'medium') detail.push(t.priority === 'high' ? '🔴 فوری' : '🟢 عادی');
          if (t.created_at) {
            var when = fmtWhen(t);
            if (when) detail.push('🕐 ' + when);
          }
          if (detail.length) h += '<div class="tb-task-assignee">' + detail.join(' · ') + '</div>';
          h += '<div class="tb-task-meta"><span class="tb-status-badge">' + esc(t.status) + '</span></div></div>';
        });
        h += '</div>';
      }
      if (done.length) {
        h += '<div class="tb-section"><div class="tb-section-title tb-done-toggle" data-tb="toggle-done">✅ تمام شده (' + done.length + ')</div>';
        h += '<div class="tb-done-list">';
        done.forEach(function (t) {
          h += '<div class="tb-task tb-task-done"><span class="tb-check">✓</span><span class="tb-task-title">' + esc(t.title) + '</span></div>';
        });
        h += '</div>';
        h += '<button class="tb-btn tb-btn-clear-done" data-tb="clear-done">🧹 پاک کردن انجامشدهها</button>';
        h += '</div>';
      }
      if (!tasks.length) {
        h += '<div class="tb-empty"><div class="tb-empty-icon">📝</div>';
        h += '<div class="tb-empty-text">هنوز وظیفهای ثبت نشده</div></div>';
      }
      return h;
    }

    function renderPanelList(items, itemFn, emptyMsg) {
      if (!items || !items.length) return '<div class="tb-empty"><div class="tb-empty-text">' + esc(emptyMsg) + '</div></div>';
      var h = '<div class="tb-section">';
      items.forEach(function (it) { h += itemFn(it); });
      h += '</div>';
      return h;
    }

  function bind() {
      if (!container) return;
      container.querySelectorAll('[data-tb]').forEach(function (b) {
        b.addEventListener('click', function () {
          var a = b.getAttribute('data-tb');
          if (a === 'collapse') { collapsed = !collapsed; fetch(); }
          else if (a === 'close') container.classList.add('tb-hidden');
          else if (a === 'refresh') fetch();
          else if (a === 'pin') togglePin();
          else if (a === 'maximize') toggleMax();
          else if (a === 'clear-done') {
            if (!window.confirm('همه وظایف انجامشده حذف شوند؟')) return;
            var x = new XMLHttpRequest();
            x.open('DELETE', API + '/tasks/done', true);
            x.onload = function () { fetch(); };
            x.send();
          }
          else if (a === 'toggle-done') {
            var l = container.querySelector('.tb-done-list');
            if (l) l.classList.toggle('tb-visible');
          }
        });
      });
      container.querySelectorAll('[data-tb-tab]').forEach(function (b) {
        b.addEventListener('click', function () {
          tab = b.getAttribute('data-tb-tab');
          if (tab === 'tasks') fetch();
          else fetchPanel();
        });
      });
    }

  function shortId(id) { return String(id || '').slice(-6); }

  var pinHost = null;
  function togglePin() {
    if (container.classList.contains('tb-pinned')) {
      if (pinHost) pinHost.appendChild(container);
      container.classList.remove('tb-pinned');
    } else {
      /* پین با ماکسیمایز ناسازگار است — فقط یکی فعال */
      container.classList.remove('tb-maximized');
      pinHost = container.parentNode;
      document.body.appendChild(container);
      container.classList.add('tb-pinned');
    }
  }
  function toggleMax() {
    if (container.classList.contains('tb-maximized')) {
      container.classList.remove('tb-maximized');
    } else {
      if (container.classList.contains('tb-pinned')) {
        if (pinHost) pinHost.appendChild(container);
        container.classList.remove('tb-pinned');
      } else {
        pinHost = container.parentNode;
      }
      container.classList.add('tb-maximized');
    }
  }

  function esc(s) { return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  /* ── تاریخ شمسی (تقویم ایران) ── */
  var JALALI_MONTHS = ['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'];
  function toJalali(gy, gm, gd) {
    var g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    var gy2 = (gm > 2) ? (gy + 1) : gy;
    var days = 355666 + (365 * gy) + ~~((gy2 + 3) / 4) - ~~((gy2 + 99) / 100) + ~~((gy2 + 399) / 400) + gd + g_d_m[gm - 1];
    var jy = -1595 + (33 * ~~(days / 12053));
    days %= 12053;
    jy += 4 * ~~(days / 1461);
    days %= 1461;
    if (days > 365) { jy += ~~((days - 1) / 365); days = (days - 1) % 365; }
    var jm = (days < 186) ? 1 + ~~(days / 31) : 7 + ~~((days - 186) / 30);
    var jd = 1 + ((days < 186) ? (days % 31) : ((days - 186) % 30));
    return [jy, jm, jd];
  }
  function fmtJalali(iso) {
    var d = new Date(iso);
    if (isNaN(d)) return '';
    var j = toJalali(d.getFullYear(), d.getMonth() + 1, d.getDate());
    return j[2] + ' ' + JALALI_MONTHS[j[1] - 1] + ' ' + j[0];
  }

  /* ── زمان نسبی: «چند دقیقه/ساعت پیش» ── */
  function timeAgo(iso) {
    if (!iso) return '';
    var diff = Date.now() - new Date(iso).getTime();
    if (isNaN(diff) || diff < 0) diff = 0;
    var min = Math.floor(diff / 60000);
    if (min < 1) return 'لحظاتی پیش';
    if (min < 60) return min + ' دقیقه پیش';
    var hr = Math.floor(min / 60);
    if (hr < 24) return hr + ' ساعت پیش';
    var day = Math.floor(hr / 24);
    if (day < 7) return day + ' روز پیش';
    return fmtJalali(iso);
  }
  function fmtWhen(t) {
    var when = t.updated_at || t.created_at || '';
    return when ? timeAgo(when) : '';
  }

  return {
      init: function (id) {
        var el = document.getElementById(id);
        if (!el) return;
        /* همواره یک تخته: اگر همین تخته فعال است، کاری نکن (رندرهای مکرر تور دوباره init میکنند) */
        if (container === el) return;
      /* فقط یک تخته فعال در هر لحظه:
         - تخته قبلی پین‌شده → روی body می‌ماند، جایگاه جدید را برای بازگشت پین ثبت کن
         - تخته قبلی عادی → مخفی کن */
      if (container && container !== el) {
        if (container.classList.contains('tb-pinned')) {
          pinHost = el;
          container = el;
          el.classList.remove('tb-hidden');
          fetch();
          if (timer) clearInterval(timer);
          timer = setInterval(fetch, 180000);
          return;
        }
        container.classList.add('tb-hidden');
      }
      container = el;
      el.classList.remove('tb-hidden');
      showEmpty('در حال بارگذاری...');
      fetch();
      if (timer) clearInterval(timer);
      timer = setInterval(fetch, 180000);
    },
    refresh: fetch,
    destroy: function () { if (timer) { clearInterval(timer); timer = null; } container = null; }
  };
})();
