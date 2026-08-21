/* ---------- Mini Player: audio playback + editable playlist ---------- */
var _miniPlayerState = { queue: [], currentIndex: -1, open: false, plOpen: false };
var _miniAudio = null;
var _PROXY_BASE = '';

function _getAudio() {
  if (!_miniAudio) _miniAudio = document.getElementById('mini-audio');
  return _miniAudio;
}

function _getProxyBase() {
  if (_PROXY_BASE) return _PROXY_BASE;
  _PROXY_BASE = window.location.origin;
  return _PROXY_BASE;
}

function _resolveAudioSrc(item) {
  if (!item) return null;
  var raw = item.audioUrl || item.audio_url || item.mediaUrl;
  if (!raw) {
    var u = item.url || '';
    if (/\.(m4a|mp3|ogg|wav|mp4|webm)(\?|#|$)/i.test(u)) raw = u;
  }
  if (!raw) return null;
  var finalUrl = /s3\.castbox\.fm|castbox\.fm/i.test(raw)
    ? _getProxyBase() + '/api/audio-proxy?url=' + encodeURIComponent(raw)
    : raw;
  console.log('[player] resolved:', item.title, '→', finalUrl.substring(0, 80));
  return finalUrl;
}

function openMiniPlayer(item) {
  if (!item) return;
  var src = _resolveAudioSrc(item);
  console.log('[player] openMiniPlayer:', item.title, 'type:', item.type, 'src:', src ? 'OK' : 'NULL');
  var player = document.getElementById('mini-player');
  if (!player) return;

  // Add to queue if not already there
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
  // Show playlist when adding
  if (!_miniPlayerState.plOpen) toggleMiniPlaylist();
  if (src) _playEpisode(_miniPlayerState.queue[_miniPlayerState.currentIndex]);
}

function closeMiniPlayer() {
  var player = document.getElementById('mini-player');
  var a = _getAudio();
  if (a) { a.pause(); a.src = ''; }
  if (player) { player.classList.add('hidden'); player.classList.remove('open'); }
  _miniPlayerState.open = false;
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
  var countEl = document.getElementById('mini-pl-count');
  if (titleEl) titleEl.textContent = item.title || '';
  if (channelEl) channelEl.textContent = item.category || item.author || item.source || '';
  if (countEl) countEl.textContent = _miniPlayerState.queue.length + ' آیتم';

  // Update playlist
  var plList = document.getElementById('mini-pl-list');
  if (plList && _miniPlayerState.queue.length > 0) {
    plList.innerHTML = _miniPlayerState.queue.map(function(ep, i) {
      var active = i === _miniPlayerState.currentIndex ? ' active' : '';
      return '<div class="mini-playlist-item' + active + '" data-idx="' + i + '" draggable="true">' +
        '<span class="pl-handle">⠿</span>' +
        '<span class="pl-num">' + (i + 1) + '</span>' +
        '<span class="pl-title">' + (ep.title || '') + '</span>' +
        '<button class="pl-rm" data-rm="' + i + '" title="حذف">✕</button>' +
      '</div>';
    }).join('');

    // Click to play
    plList.querySelectorAll('.mini-playlist-item').forEach(function(el) {
      el.onclick = function(e) {
        if (e.target.classList.contains('pl-rm') || e.target.classList.contains('pl-handle')) return;
        var idx = parseInt(el.dataset.idx);
        _miniPlayerState.currentIndex = idx;
        _updateMiniPlayerUI();
        _playEpisode(_miniPlayerState.queue[idx]);
      };
    });

    // Remove buttons
    plList.querySelectorAll('.pl-rm').forEach(function(btn) {
      btn.onclick = function(e) {
        e.stopPropagation();
        _removeFromPlaylist(parseInt(btn.dataset.rm));
      };
    });

    // Drag to reorder
    _bindDragReorder(plList);
  }

  // Auto-show playlist if open
  var pl = document.getElementById('mini-playlist');
  if (pl && _miniPlayerState.plOpen) pl.classList.remove('hidden');
}

function _removeFromPlaylist(idx) {
  if (idx < 0 || idx >= _miniPlayerState.queue.length) return;
  var wasPlaying = idx === _miniPlayerState.currentIndex;
  _miniPlayerState.queue.splice(idx, 1);
  if (_miniPlayerState.queue.length === 0) {
    closeMiniPlayer();
    return;
  }
  if (wasPlaying) {
    _miniPlayerState.currentIndex = Math.min(idx, _miniPlayerState.queue.length - 1);
    _playEpisode(_miniPlayerState.queue[_miniPlayerState.currentIndex]);
  } else if (idx < _miniPlayerState.currentIndex) {
    _miniPlayerState.currentIndex--;
  }
  _updateMiniPlayerUI();
}

/* ── Drag to reorder ── */
var _dragIdx = null;
function _bindDragReorder(container) {
  container.querySelectorAll('.mini-playlist-item').forEach(function(el) {
    el.ondragstart = function(e) {
      _dragIdx = parseInt(el.dataset.idx);
      el.style.opacity = '0.4';
      e.dataTransfer.effectAllowed = 'move';
    };
    el.ondragend = function() { el.style.opacity = '1'; _dragIdx = null; };
    el.ondragover = function(e) { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; };
    el.ondrop = function(e) {
      e.preventDefault();
      var dropIdx = parseInt(el.dataset.idx);
      if (_dragIdx === null || _dragIdx === dropIdx) return;
      // Reorder queue
      var item = _miniPlayerState.queue.splice(_dragIdx, 1)[0];
      _miniPlayerState.queue.splice(dropIdx, 0, item);
      // Fix currentIndex
      if (_miniPlayerState.currentIndex === _dragIdx) {
        _miniPlayerState.currentIndex = dropIdx;
      } else if (_dragIdx < _miniPlayerState.currentIndex && dropIdx >= _miniPlayerState.currentIndex) {
        _miniPlayerState.currentIndex--;
      } else if (_dragIdx > _miniPlayerState.currentIndex && dropIdx <= _miniPlayerState.currentIndex) {
        _miniPlayerState.currentIndex++;
      }
      _updateMiniPlayerUI();
    };
  });
}

function _playEpisode(item) {
  if (!item) return;
  var src = _resolveAudioSrc(item);
  if (!src) { console.log('[player] NO SRC for:', item.title); return; }
  var a = _getAudio();
  if (!a) { console.log('[player] NO AUDIO ELEMENT'); return; }
  console.log('[player] playing:', src.substring(0, 80));
  if (a.src !== src) a.src = src;
  a.play().catch(function(err) { console.log('[player] PLAY ERROR:', err.message); });
  _syncPlayButton();
  a.onended = function() { _nextEpisode(); };
}

function _prevEpisode() {
  if (_miniPlayerState.queue.length === 0) return;
  var tries = _miniPlayerState.queue.length;
  while (tries-- > 0) {
    _miniPlayerState.currentIndex = (_miniPlayerState.currentIndex - 1 + _miniPlayerState.queue.length) % _miniPlayerState.queue.length;
    var prev = _miniPlayerState.queue[_miniPlayerState.currentIndex];
    if (_resolveAudioSrc(prev)) { _updateMiniPlayerUI(); _playEpisode(prev); return; }
  }
}

function _nextEpisode() {
  if (_miniPlayerState.queue.length === 0) return;
  var tries = _miniPlayerState.queue.length;
  while (tries-- > 0) {
    _miniPlayerState.currentIndex = (_miniPlayerState.currentIndex + 1) % _miniPlayerState.queue.length;
    var next = _miniPlayerState.queue[_miniPlayerState.currentIndex];
    if (_resolveAudioSrc(next)) { _updateMiniPlayerUI(); _playEpisode(next); return; }
  }
}

function toggleMiniPlayer() {
  var player = document.getElementById('mini-player');
  if (!player) return;
  if (player.classList.contains('hidden')) player.classList.remove('hidden');
  if (player.classList.contains('open')) {
    player.classList.remove('open');
    _miniPlayerState.open = false;
  } else {
    player.classList.add('open');
    _miniPlayerState.open = true;
  }
}

function toggleMiniPlaylist() {
  var pl = document.getElementById('mini-playlist');
  if (!pl) return;
  _miniPlayerState.plOpen = !_miniPlayerState.plOpen;
  if (_miniPlayerState.plOpen) pl.classList.remove('hidden');
  else pl.classList.add('hidden');
}

function _syncPlayButton() {
  var a = _getAudio();
  var btn = document.getElementById('mini-play-pause');
  var tgl = document.getElementById('mini-toggle-icon');
  var playing = a && !a.paused && !a.ended;
  if (btn) btn.textContent = playing ? '⏸' : '▶';
  if (tgl) tgl.textContent = playing ? '⏸' : '♪';
}

/* ── Bind mini player events ── */
document.addEventListener('DOMContentLoaded', function() {
  var toggle = document.getElementById('mini-player-toggle');
  var close = document.getElementById('mini-close');
  var pp = document.getElementById('mini-play-pause');
  var prev = document.getElementById('mini-prev');
  var next = document.getElementById('mini-next');
  var seek = document.getElementById('mini-seek');
  var plToggle = document.getElementById('mini-pl-toggle');

  if (toggle) toggle.onclick = toggleMiniPlayer;
  if (close) close.onclick = closeMiniPlayer;
  if (pp) pp.onclick = function() {
    var a = _getAudio();
    if (!a || !a.src) return;
    if (a.paused) a.play().catch(function(){}); else a.pause();
    _syncPlayButton();
  };
  if (prev) prev.onclick = _prevEpisode;
  if (next) next.onclick = _nextEpisode;
  if (plToggle) plToggle.onclick = toggleMiniPlaylist;
  if (seek) seek.oninput = function() {
    var a = _getAudio();
    if (a && a.duration) a.currentTime = (seek.value / 100) * a.duration;
  };

  // Time update
  setInterval(function() {
    var a = _getAudio();
    if (!a) return;
    var cur = document.getElementById('mini-cur');
    var dur = document.getElementById('mini-dur');
    if (cur) cur.textContent = _fmtTime(a.currentTime);
    if (dur) dur.textContent = _fmtTime(a.duration);
    if (seek && a.duration) seek.value = (a.currentTime / a.duration) * 100;
    _syncPlayButton();
  }, 500);
});
