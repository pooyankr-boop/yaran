/* ══════════════════════════════════════════════════════════════
   تخته پیگیری وظایف — Task Board v2
   خواندن مستقیم data/tasks.json از HTTP server
   بروزرسانی خودکار هر ۱۰ ثانیه
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
      var done = tasks.filter(function (t) { return t.status === 'done' || t.status === 'completed'; });
      var h = '';
      if (pending.length) {
        h += '<div class="tb-section"><div class="tb-section-title">⏳ در حال انجام (' + pending.length + ')</div>';
        pending.forEach(function (t) {
          h += '<div class="tb-task"><div class="tb-task-top">';
          h += '<span class="tb-task-id">#' + t.id + '</span>';
          h += '<span class="tb-task-title">' + esc(t.title) + '</span></div>';
          var detail = [];
          if (t.assigned_to) detail.push('👤 ' + esc(t.assigned_to));
          if (t.priority && t.priority !== 'medium') detail.push(t.priority === 'high' ? '🔴 فوری' : '🟢 عادی');
          if (t.created_at) detail.push('🕐 ' + esc(t.created_at.slice(0, 10)));
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
        h += '</div></div>';
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

  function esc(s) { return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  return {
    init: function (id) {
      container = document.getElementById(id);
      if (!container) return;
      container.classList.remove('tb-hidden');
      showEmpty('در حال بارگذاری...');
      fetch();
      if (timer) clearInterval(timer);
      timer = setInterval(fetch, 10000);
    },
    refresh: fetch,
    destroy: function () { if (timer) { clearInterval(timer); timer = null; } container = null; }
  };
})();
