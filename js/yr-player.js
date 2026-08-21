/* ============================================
   YARAN AUDIO PLAYER v2 — clean rewrite
   Search → Play → Editable Playlist
   ============================================ */
(function() {
  'use strict';

  // ── State ──
  var queue = [];
  var currentIndex = -1;
  var audioEl = null;
  var panelOpen = false;
  var plOpen = false;

  // ── Helpers ──
  function getAudio() {
    if (!audioEl) audioEl = document.getElementById('yr-audio');
    return audioEl;
  }

  function getProxyBase() {
    return window.location.origin;
  }

  function resolveSrc(item) {
    if (!item) return null;
    // Try audioUrl, src, audio_url, mediaUrl
    var raw = item.audioUrl || item.src || item.audio_url || item.mediaUrl;
    if (!raw) {
      // Check url field for audio extensions
      var u = item.url || '';
      if (/\.(m4a|mp3|ogg|wav|mp4|webm)(\?|#|$)/i.test(u)) raw = u;
    }
    if (!raw) return null;
    // Route CastBox through proxy
    if (/castbox\.fm/i.test(raw)) {
      return getProxyBase() + '/api/audio-proxy?url=' + encodeURIComponent(raw);
    }
    return raw;
  }

  function fmtTime(sec) {
    if (!isFinite(sec) || sec < 0) return '0:00';
    var m = Math.floor(sec / 60);
    var s = Math.floor(sec % 60);
    return m + ':' + (s < 10 ? '0' : '') + s;
  }

  // ── Create DOM ──
  function createDOM() {
    if (document.getElementById('yr-player')) return;

    var el = document.createElement('div');
    el.id = 'yr-player';
    el.innerHTML = [
      '<audio id="yr-audio" preload="metadata"></audio>',
      // Floating button
      '<div id="yr-fab" class="yr-fab" title="پخشکننده">♪</div>',
      // Panel
      '<div id="yr-panel" class="yr-panel hidden">',
      '  <div class="yr-panel-top">',
      '    <div class="yr-panel-info">',
      '      <div class="yr-panel-title" id="yr-title">انتخاب کنید</div>',
      '      <div class="yr-panel-sub" id="yr-sub"></div>',
      '    </div>',
      '    <div class="yr-panel-btns">',
      '      <button class="yr-btn-icon" id="yr-pl-btn" title="لیست پخش">☰</button>',
      '      <button class="yr-btn-icon" id="yr-close" title="بستن">✕</button>',
      '    </div>',
      '  </div>',
      '  <div class="yr-controls">',
      '    <button class="yr-btn-icon" id="yr-prev" title="قبلی">⏮</button>',
      '    <button class="yr-btn-icon yr-play" id="yr-pp" title="پخش/توقف">▶</button>',
      '    <button class="yr-btn-icon" id="yr-next" title="بعدی">⏭</button>',
      '  </div>',
      '  <div class="yr-progress">',
      '    <span class="yr-time" id="yr-cur">0:00</span>',
      '    <input type="range" class="yr-seek" id="yr-seek" min="0" max="100" value="0">',
      '    <span class="yr-time" id="yr-dur">0:00</span>',
      '  </div>',
      '  <div id="yr-playlist" class="yr-playlist hidden">',
      '    <div class="yr-pl-header">',
      '      <span class="yr-pl-title">لیست پخش</span>',
      '      <span class="yr-pl-count" id="yr-pl-count"></span>',
      '    </div>',
      '    <div class="yr-pl-list" id="yr-pl-list"></div>',
      '  </div>',
      '</div>'
    ].join('\n');

    document.body.appendChild(el);
    injectStyles();
    bindEvents();
  }

  // ── CSS ──
  function injectStyles() {
    if (document.getElementById('yr-styles')) return;
    var s = document.createElement('style');
    s.id = 'yr-styles';
    s.textContent = [
      '#yr-audio { position: absolute; left: -9999px; width: 1px; height: 1px; }',
      '.yr-fab {',
      '  position: fixed; bottom: 16px; left: 16px; z-index: 10000;',
      '  width: 48px; height: 48px; border-radius: 50%;',
      '  background: linear-gradient(135deg, #ffb84d, #ff8c00);',
      '  box-shadow: 0 3px 14px rgba(255,140,0,.45);',
      '  display: flex; align-items: center; justify-content: center;',
      '  cursor: pointer; font-size: 20px; color: #fff;',
      '  transition: transform .2s, box-shadow .2s;',
      '  user-select: none;',
      '}',
      '.yr-fab:hover { transform: scale(1.1); box-shadow: 0 4px 20px rgba(255,140,0,.6); }',
      '.yr-fab.playing { animation: yr-pulse 1.5s infinite; }',
      '@keyframes yr-pulse { 0%,100% { box-shadow: 0 3px 14px rgba(255,140,0,.45); } 50% { box-shadow: 0 3px 24px rgba(255,140,0,.7); } }',
      '.yr-panel {',
      '  position: fixed; bottom: 72px; left: 16px; z-index: 10000;',
      '  width: 300px; background: rgba(255,255,255,.97);',
      '  backdrop-filter: blur(14px); border-radius: 16px;',
      '  box-shadow: 0 8px 32px rgba(0,0,0,.18); padding: 16px;',
      '  transition: opacity .25s, transform .25s;',
      '  transform-origin: bottom left;',
      '}',
      '.yr-panel.hidden { display: none; }',
      '.yr-panel-top { display: flex; align-items: flex-start; gap: 8px; margin-bottom: 10px; }',
      '.yr-panel-info { flex: 1; min-width: 0; }',
      '.yr-panel-title { font-weight: 600; font-size: 13px; color: #2d2d2d; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }',
      '.yr-panel-sub { font-size: 11px; color: #888; margin-top: 2px; }',
      '.yr-panel-btns { display: flex; gap: 4px; flex-shrink: 0; }',
      '.yr-btn-icon {',
      '  background: none; border: none; cursor: pointer;',
      '  font-size: 16px; color: #666; width: 32px; height: 32px;',
      '  border-radius: 8px; display: flex; align-items: center; justify-content: center;',
      '  transition: background .15s;',
      '}',
      '.yr-btn-icon:hover { background: rgba(255,140,0,.1); }',
      '.yr-play { background: #ffb84d; color: #fff; width: 40px; height: 40px; font-size: 18px; }',
      '.yr-play:hover { background: #ff8c00; }',
      '.yr-controls { display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 8px; }',
      '.yr-progress { display: flex; align-items: center; gap: 8px; }',
      '.yr-seek {',
      '  flex: 1; height: 4px; -webkit-appearance: none; appearance: none;',
      '  background: #e0e0e0; border-radius: 2px; outline: none; cursor: pointer;',
      '}',
      '.yr-seek::-webkit-slider-thumb {',
      '  -webkit-appearance: none; width: 14px; height: 14px; border-radius: 50%;',
      '  background: #ff8c00; cursor: pointer; box-shadow: 0 1px 4px rgba(0,0,0,.2);',
      '}',
      '.yr-time { font-size: 11px; color: #999; min-width: 30px; text-align: center; }',
      '.yr-playlist { margin-top: 10px; border-top: 1px solid #f0f0f0; padding-top: 8px; max-height: 220px; overflow-y: auto; }',
      '.yr-pl-header { display: flex; justify-content: space-between; margin-bottom: 6px; }',
      '.yr-pl-title { font-size: 12px; font-weight: 600; color: #666; }',
      '.yr-pl-count { font-size: 11px; color: #aaa; }',
      '.yr-pl-item {',
      '  display: flex; align-items: center; gap: 6px; padding: 6px 8px;',
      '  cursor: pointer; border-radius: 8px; font-size: 12px; color: #444;',
      '  transition: background .15s; user-select: none;',
      '}',
      '.yr-pl-item:hover { background: rgba(255,140,0,.08); }',
      '.yr-pl-item.active { background: rgba(255,140,0,.18); font-weight: 600; }',
      '.yr-pl-item .yr-drag { cursor: grab; color: #ccc; font-size: 11px; }',
      '.yr-pl-item .yr-drag:hover { color: #888; }',
      '.yr-pl-item .yr-pnum { color: #bbb; font-size: 11px; min-width: 16px; }',
      '.yr-pl-item .yr-ptitle { flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }',
      '.yr-pl-item .yr-del { color: #ccc; font-size: 13px; cursor: pointer; padding: 2px 4px; border: none; background: none; }',
      '.yr-pl-item .yr-del:hover { color: #e74c3c; }',
    ].join('\n');
    document.head.appendChild(s);
  }

  // ── Play ──
  function playItem(item) {
    var src = resolveSrc(item);
    console.log('[yr-player] play:', item.title, 'src:', src ? src.substring(0, 80) : 'NULL');
    if (!src) return false;
    var a = getAudio();
    if (!a) return false;
    a.src = src;
    a.load();
    var p = a.play();
    if (p && p.catch) p.catch(function(e) { console.log('[yr-player] play error:', e.message); });
    syncBtn();
    a.onended = function() { nextTrack(); };
    return true;
  }

  function syncBtn() {
    var a = getAudio();
    var pp = document.getElementById('yr-pp');
    var fab = document.getElementById('yr-fab');
    var playing = a && !a.paused && !a.ended;
    if (pp) pp.textContent = playing ? '⏸' : '▶';
    if (fab) {
      fab.textContent = playing ? '⏸' : '♪';
      if (playing) fab.classList.add('playing');
      else fab.classList.remove('playing');
    }
  }

  function nextTrack() {
    if (!queue.length) return;
    var tries = queue.length;
    while (tries-- > 0) {
      currentIndex = (currentIndex + 1) % queue.length;
      if (playItem(queue[currentIndex])) { renderUI(); return; }
    }
  }

  function prevTrack() {
    if (!queue.length) return;
    var tries = queue.length;
    while (tries-- > 0) {
      currentIndex = (currentIndex - 1 + queue.length) % queue.length;
      if (playItem(queue[currentIndex])) { renderUI(); return; }
    }
  }

  // ── UI ──
  function renderUI() {
    var item = queue[currentIndex];
    if (!item) return;
    var titleEl = document.getElementById('yr-title');
    var subEl = document.getElementById('yr-sub');
    var countEl = document.getElementById('yr-pl-count');
    if (titleEl) titleEl.textContent = item.title || '';
    if (subEl) subEl.textContent = item.category || item.author || item.source || '';
    if (countEl) countEl.textContent = queue.length + ' آیتم';

    // Playlist
    var list = document.getElementById('yr-pl-list');
    if (!list) return;
    list.innerHTML = queue.map(function(ep, i) {
      var cls = i === currentIndex ? ' yr-pl-item active' : ' yr-pl-item';
      return '<div class="' + cls + '" data-idx="' + i + '" draggable="true">' +
        '<span class="yr-drag">⠿</span>' +
        '<span class="yr-pnum">' + (i + 1) + '</span>' +
        '<span class="yr-ptitle">' + (ep.title || '') + '</span>' +
        '<button class="yr-del" data-del="' + i + '" title="حذف">✕</button>' +
      '</div>';
    }).join('');

    // Bind playlist clicks
    list.querySelectorAll('.yr-pl-item').forEach(function(el) {
      el.addEventListener('click', function(e) {
        if (e.target.classList.contains('yr-del') || e.target.classList.contains('yr-drag')) return;
        currentIndex = parseInt(el.dataset.idx);
        playItem(queue[currentIndex]);
        renderUI();
      });
      // Drag
      el.addEventListener('dragstart', function(e) {
        el._dragIdx = parseInt(el.dataset.idx);
        el.style.opacity = '0.4';
        e.dataTransfer.effectAllowed = 'move';
      });
      el.addEventListener('dragend', function() { el.style.opacity = '1'; });
      el.addEventListener('dragover', function(e) { e.preventDefault(); });
      el.addEventListener('drop', function(e) {
        e.preventDefault();
        var from = el._dragIdx;
        var to = parseInt(el.dataset.idx);
        if (from === to || isNaN(from)) return;
        var moved = queue.splice(from, 1)[0];
        queue.splice(to, 0, moved);
        if (currentIndex === from) currentIndex = to;
        else if (from < currentIndex && to >= currentIndex) currentIndex--;
        else if (from > currentIndex && to <= currentIndex) currentIndex++;
        renderUI();
      });
    });

    // Delete buttons
    list.querySelectorAll('.yr-del').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        var idx = parseInt(btn.dataset.del);
        queue.splice(idx, 1);
        if (!queue.length) { closePanel(); return; }
        if (idx === currentIndex) {
          currentIndex = Math.min(idx, queue.length - 1);
          playItem(queue[currentIndex]);
        } else if (idx < currentIndex) currentIndex--;
        renderUI();
      });
    });
  }

  function showPanel() {
    var panel = document.getElementById('yr-panel');
    if (panel) panel.classList.remove('hidden');
    panelOpen = true;
    renderUI();
  }

  function closePanel() {
    var panel = document.getElementById('yr-panel');
    var a = getAudio();
    if (a) { a.pause(); a.removeAttribute('src'); a.load(); }
    if (panel) panel.classList.add('hidden');
    panelOpen = false;
    currentIndex = -1;
    queue = [];
    syncBtn();
  }

  // ── Events ──
  function bindEvents() {
    var fab = document.getElementById('yr-fab');
    var close = document.getElementById('yr-close');
    var pp = document.getElementById('yr-pp');
    var prev = document.getElementById('yr-prev');
    var next = document.getElementById('yr-next');
    var seek = document.getElementById('yr-seek');
    var plBtn = document.getElementById('yr-pl-btn');

    if (fab) fab.addEventListener('click', function() {
      if (panelOpen) { document.getElementById('yr-panel').classList.add('hidden'); panelOpen = false; }
      else showPanel();
    });
    if (close) close.addEventListener('click', closePanel);
    if (pp) pp.addEventListener('click', function() {
      var a = getAudio();
      if (!a || !a.src) return;
      if (a.paused) { a.play().catch(function(){}); } else { a.pause(); }
      syncBtn();
    });
    if (prev) prev.addEventListener('click', prevTrack);
    if (next) next.addEventListener('click', nextTrack);
    if (seek) seek.addEventListener('input', function() {
      var a = getAudio();
      if (a && a.duration) a.currentTime = (seek.value / 100) * a.duration;
    });
    if (plBtn) plBtn.addEventListener('click', function() {
      var pl = document.getElementById('yr-playlist');
      if (!pl) return;
      plOpen = !plOpen;
      if (plOpen) pl.classList.remove('hidden');
      else pl.classList.add('hidden');
    });

    // Time update
    setInterval(function() {
      var a = getAudio();
      if (!a) return;
      var cur = document.getElementById('yr-cur');
      var dur = document.getElementById('yr-dur');
      if (cur) cur.textContent = fmtTime(a.currentTime);
      if (dur) dur.textContent = fmtTime(a.duration);
      if (seek && a.duration) seek.value = (a.currentTime / a.duration) * 100;
      syncBtn();
    }, 500);
  }

  // ── Public API ──
  // Called by openMediaModal when type === 'audio'
  window.yrPlay = function(item) {
    if (!item) return;
    createDOM();
    // Add to queue if not duplicate
    var exists = queue.findIndex(function(e) { return e.id === item.id; });
    if (exists >= 0) {
      currentIndex = exists;
    } else {
      queue.push(item);
      currentIndex = queue.length - 1;
    }
    showPanel();
    playItem(queue[currentIndex]);
    // Auto-open playlist
    var pl = document.getElementById('yr-playlist');
    if (pl && !plOpen) { plOpen = true; pl.classList.remove('hidden'); }
  };

  // Init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createDOM);
  } else {
    createDOM();
  }
})();
