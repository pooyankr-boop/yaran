/* ══════════════════════════════════════════════════════════════
   گردش مجازی — Virtual Tour v4
   Single container + glass overlay + somayehrouhi PDFs
   Event delegation for all buttons (no lost bindings)
   ══════════════════════════════════════════════════════════════ */

var VirtualTour = (function () {
  'use strict';

  /* ── constants ── */
  var VIEWS = ['herog', 'herog_left', 'herog_right'];
  var VIEW_LABELS = { herog: 'نمای کلی', herog_left: 'گوشه چپ', herog_right: 'گوشه راست' };
  var DUR_OVERVIEW = 4000, DUR_HOTSPOT = 5000, DUR_CONTENT = 12000, DUR_TIP = 6000;
  var KB_COUNT = 4;
  var ICONS = { activity: '🎨', pdf: '📄', game: '🎮', video: '🎬', audio: '🔊', story: '📖', song: '🎵' };
  var TYPE_LABELS = { activity: 'فعالیت', pdf: 'کاربرگ', game: 'بازی', video: 'ویدیو', audio: 'صدا', story: 'داستان', song: 'آهنگ' };

  /* ── tips (different from lobby PARENTING_TIPS) ── */
  var TIPS = [
    { cat: 'یادگیری', text: 'کودکان ۷۰٪ آموخته‌هایشان را از طریق بازی تثبیت می‌کنند، نه حفظ کردن.', src: 'تحقیقات هاروارد' },
    { cat: 'خلاقیت', text: 'اجازه دهید کودک بدون الگو نقاشی کند؛ نقاشی آزاد راه درون‌بینی اوست.', src: 'هنردرمانی خلاق' },
    { cat: 'تغذیه', text: 'میان‌وعده‌های مغذی تمرکز کودک را برای یادگیری بهتر آماده می‌کند.', src: 'انجمن تغذیه سالم کودک' },
    { cat: 'حرکت', text: 'بازی‌های حرکتی بزرگ هماهنگی عصبی-عضلانی کودک را تقویت می‌کند.', src: 'فیزیولوژی ورزشی کودک' },
    { cat: 'زبان', text: 'خواندن کتاب صوتی با کودک، مهارت گوش دادن و تخیل را همزمان رشد می‌دهد.', src: 'بنیاد سوادآموزی کودک' },
    { cat: 'اجتماعی', text: 'بازی‌های گروهی کوچک بهتر از جمع‌های بزرگ مهارت اجتماعی را آموزش می‌دهد.', src: 'روانشناسی تربیتی' },
    { cat: 'احساسات', text: 'شناخت احساسات پایه اولین قدم تنظیم هیجانی کودک است.', src: 'مرکز روانشناسی کودک' },
    { cat: 'ایمنی', text: 'آموزش شماره اضطراری به کودک از ۳ سالگی با بازی مؤثرتر است.', src: 'پروژه ایمنی خانواده' },
    { cat: 'خواب', text: 'تاریکی کامل در اتاق کودک کیفیت خواب و ترشح هورمون رشد را بهبود می‌بخشد.', src: 'آکادمی خواب کودک' },
    { cat: 'هنر', text: 'کار با خمیربازی مهارت‌های ظریف دستی و خلاقیت فضایی را تقویت می‌کند.', src: 'روانشناسی هنر کودک' },
    { cat: 'ریاضی', text: 'شمارش اشیای واقعی مفهوم عدد را برای کودک ملموس‌تر می‌کند.', src: 'آموزش ریاضی پیش‌دبستانی' },
    { cat: 'علم', text: 'کنجکاوی کودک با آزمایش‌های ساده بهترین تقویت را می‌یابد.', src: 'علوم تجربی کودک' },
    { cat: 'طبیعت', text: 'بازی در طبیعت حداقل ۲۰ دقیقه در روز استرس کودک را ۳۰٪ کاهش می‌دهد.', src: 'اکولوژی کودک' },
    { cat: 'موسیقی', text: 'ضرب گرفتن روی اشیا درک الگوهای ریاضی و ریتم را تقویت می‌کند.', src: 'موسیقی‌درمانی کودک' },
    { cat: 'گفتار', text: 'توصیف کارهای کودک به جای تحسین ساده واژگان را غنی‌تر می‌کند.', src: 'گفتاردرمانی' },
    { cat: 'رشد', text: 'کودکان پیش‌دبستانی هر روز چیز جدیدی یاد می‌گیرند؛ صبور باشید.', src: 'روانشناسی رشد' },
    { cat: 'بازی', text: 'بازی‌های نمایشی درک دنیای اجتماعی کودک را عمیق‌تر می‌کند.', src: 'روانشناسی بازی' },
    { cat: 'خانواده', text: 'گفتگوی خانوادگی سر میز شام مهارت‌های زبانی کودک را تقویت می‌کند.', src: 'مرکز مطالعات خانواده' },
    { cat: 'پژوهش', text: 'کودکانی که روزانه کتاب می‌خوانند در مدرسه عملکرد بهتری دارند.', src: 'انستیتو تحقیقات آموزشی' },
    { cat: 'تفکر', text: 'پرسیدن «چرا فکر می‌کنی؟» تفکر انتقادی کودک را رشد می‌دهد.', src: 'فلسفه برای کودکان' }
  ];

  /* ── state ── */
  var state = {
    roomIds: [], ri: 0,
    phase: 'overview', vi: 0, hi: 0, ci: 0,
    items: [], playing: true, shuffleMode: 'all',
    filters: { pdf: true, video: true, game: true, activity: true, audio: true },
    timer: null, role: 'مربی', kbIndex: 0, tipUsed: {}, sidebarOpen: false, tipClosed: false
  };

  /* ── helpers ── */
  function $(id) { return document.getElementById(id); }
  function shuffleArr(a) {
    var b = a.slice();
    for (var i = b.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = b[i]; b[i] = b[j]; b[j] = t; }
    return b;
  }
  function getRoom(id) { return ROOMS.find(function (r) { return r.id === id; }); }
  function roomImg(rid, view) { return MediaAssets.resolve('assets/images/' + rid + '/' + view + '.webp'); }

  /* ── role filter ── */
  function isRoleMatch(item) {
    var r = state.role;
    // English role values from ENTRY_DOORS: 'manager', 'teacher', 'parent', 'child'
    if (r === 'teacher' || r === 'مربی') return true;
    var t = (item.type || '').toLowerCase();
    if (r === 'parent' || r === 'والد') return true;
    if (r === 'child' || r === 'کودک') return (t === 'audio' || t === 'song'); // کودک فقط صوت
    if (r === 'manager' || r === 'مدیر') return true;
    return true;
  }

  /* ── collect items from room hotspots + somayehrouhi ── */
  function collectRoomItems(rid) {
    var r = getRoom(rid);
    if (!r) return [];
    var seen = {}, out = [];

    /* items from room hotspots */
    var _childOnlyFront = (state.role === 'child' || state.role === 'کودک');
    (_childOnlyFront ? ['herog'] : VIEWS).forEach(function (v) {
      if (!r.views[v]) return;
      (r.views[v].hotspots || []).forEach(function (h) {
        (h.categories || []).forEach(function (c) {
          (c.items || []).forEach(function (it) {
            if (seen[it.title]) return;
            seen[it.title] = 1;
            if (!isRoleMatch(it)) return;
            var tt = (it.type || 'activity').toLowerCase();
            if (!state.filters[tt]) return;
            // filter empty items — no image, desc, url, page, audioUrl, instructions, materials
            if (!it.image && !it.desc && !it.url && !it.page && !it.audioUrl && !it.instructions && !it.materials) return;
            out.push({ item: it, hs: h.title, cat: c.title, view: v });
          });
        });
      });
    });

    /* somayehrouhi items for this room */
    if (typeof SOMAYEHROUHI_ITEMS !== 'undefined') {
      SOMAYEHROUHI_ITEMS.forEach(function (it) {
        if (it.room !== rid) return;
        if (seen[it.title]) return;
        seen[it.title] = 1;
        if (!isRoleMatch(it)) return;
        var tt = (it.type || 'pdf').toLowerCase();
        if (!state.filters[tt]) return;
        out.push({ item: it, hs: 'کاربرگ‌ها', cat: it.category || 'کاربرگ', view: 'herog' });
      });
    }

    /* video items from VIDEO_LIBRARY */
    if (typeof VIDEO_LIBRARY !== 'undefined') {
      VIDEO_LIBRARY.forEach(function(v) {
        if (seen[v.title]) return;
        seen[v.title] = 1;
        if (!isRoleMatch({ type: 'video' })) return;
        if (!state.filters['video']) return;
        var title = v.titleFa || v.title || '';
        var desc = v.descFa || v.desc || '';
        out.push({ item: { title: title, type: 'video', url: v.url, image: 'https://img.youtube.com/vi/' + (v.videoId || '') + '/mqdefault.jpg', desc: desc, channel: v.channel || '', duration: v.duration || '' }, hs: 'محتوای تصویری', cat: v.category || 'video', view: 'herog' });
      });
    }

    return out;
  }

  function getAllItems() {
    var out = [];
    state.roomIds.forEach(function (rid) {
      var items = collectRoomItems(rid);
      items.forEach(function (entry) { out.push(entry); });
    });
    return out;
  }

  /* ── phase durations ── */
  function phaseDuration() {
    switch (state.phase) {
      case 'overview': return DUR_OVERVIEW;
      case 'hotspot': return DUR_HOTSPOT;
      case 'content': return DUR_CONTENT;
      case 'tip': return DUR_TIP;
      default: return DUR_OVERVIEW;
    }
  }

  /* ── advance ── */
  function advance() {
    if (!state.playing) return;
    var rid = state.roomIds[state.ri];
    if (!rid) { finish(); return; }
    var items = state.items;

    if (state.phase === 'overview') {
      var _isChildVT = (state.role === 'child' || state.role === 'کودک');
      if (_isChildVT && items.length > 0) {
        state.phase = 'content'; state.ci = 0;
      } else if (_isChildVT) {
        nextRoom(); return;
      } else {
        state.phase = 'hotspot';
      }
    } else if (state.phase === 'hotspot') {
      if (items.length > 0) {
        state.phase = 'content'; state.ci = 0;
      } else {
        nextRoom();
        return;
      }
    } else if (state.phase === 'content') {
      state.ci++;
      if (state.ci >= items.length) {
        nextRoomWithTip();
        return;
      }
    } else if (state.phase === 'tip') {
      /* کودک: فاز tip رد شود */
      if (state.role === 'child' || state.role === 'کودک') { nextRoom(); return; }
      nextRoom();
      return;
    }

    render();
    schedule(phaseDuration());
  }

  function nextRoomWithTip() {
    state.ri++;
    if (state.ri >= state.roomIds.length) { finish(); return; }
    resetRoomState();
    state.phase = 'tip';
    render();
    schedule(DUR_TIP);
  }

  function nextRoom() {
    state.ri++;
    if (state.ri >= state.roomIds.length) { finish(); return; }
    resetRoomState();
    state.phase = 'overview';
    render();
    schedule(DUR_OVERVIEW);
  }

  function prevRoom() {
    if (state.ri > 0) {
      state.ri--;
      resetRoomState();
      state.phase = 'overview';
      render();
      schedule(DUR_OVERVIEW);
    }
  }

  function resetRoomState() {
    state.vi = 0; state.hi = 0; state.ci = 0;
    state.kbIndex = (state.kbIndex + 1) % KB_COUNT;
    state.items = collectRoomItems(state.roomIds[state.ri]);
  }

  function schedule(ms) {
    if (state.timer) clearTimeout(state.timer);
    if (state.playing) state.timer = setTimeout(advance, ms);
  }

  /* ── navigation ── */
  function next() {
    if (state.phase === 'content' && state.ci < state.items.length - 1) {
      state.ci++;
      render(); schedule(phaseDuration());
    } else if (state.phase === 'content') {
      nextRoom();
    } else {
      advance();
    }
  }

  function prev() {
    if (state.phase === 'content' && state.ci > 0) {
      state.ci--;
      render(); schedule(phaseDuration());
    } else if (state.phase === 'content' || state.phase === 'hotspot') {
      state.phase = 'overview';
      render(); schedule(phaseDuration());
    } else if (state.phase === 'tip') {
      prevRoom();
    } else {
      prevRoom();
    }
  }

  function togglePlay() {
    state.playing = !state.playing;
    if (state.playing) schedule(phaseDuration());
    else if (state.timer) { clearTimeout(state.timer); state.timer = null; }
    updatePlayBtn();
  }

  function cycleShuffle() {
    var modes = ['all', 'rooms', 'off'];
    var idx = modes.indexOf(state.shuffleMode);
    state.shuffleMode = modes[(idx + 1) % modes.length];
    applyShuffle();
    updateShuffleBtn();
  }

  function applyShuffle() {
    var allRooms = ROOMS.map(function (r) { return r.id; });
    if (state.shuffleMode === 'all') {
      state.roomIds = shuffleArr(allRooms);
    } else if (state.shuffleMode === 'rooms') {
      state.roomIds = allRooms;
    } else {
      state.roomIds = allRooms;
    }
    state.ri = 0;
    resetRoomState();
  }

  function exit() {
    if (state.timer) { clearTimeout(state.timer); state.timer = null; }
    state.playing = false;
    stopMusic();
    document.querySelectorAll('.screen').forEach(function (s) { s.classList.remove('active'); });
    var lobby = $('screen-lobby');
    if (lobby) lobby.classList.add('active');
    /* برگرداندن تخته لابی (تور تختهی خودش را فعال کرده بود) */
    if (typeof TaskBoard !== 'undefined') TaskBoard.init('lobby-task-board');
    if (typeof TaskBoard !== 'undefined') TaskBoard.refresh();
  }

  function finish() {
    state.phase = 'done';
    state.playing = false;
    if (state.timer) { clearTimeout(state.timer); state.timer = null; }
    render();
  }

  function toggleSidebar() {
    state.sidebarOpen = !state.sidebarOpen;
    var el = $('vt-room-list');
    if (el) el.classList.toggle('vt-rl-open', state.sidebarOpen);
  }

  /* ── theme cycles: light → light-blue → dark-gray → pink ── */
  var THEMES = ['light', 'blue', 'dark', 'pink'];
  var THEME_LABELS = { light: '☀️', blue: '💙', dark: '🌙', pink: '🌸' };
  var themeIdx = 0;
  function toggleTheme() {
    themeIdx = (themeIdx + 1) % THEMES.length;
    var t = THEMES[themeIdx];
    var st = document.getElementById('screen-tour');
    if (!st) return;
    ['light', 'blue', 'dark', 'pink'].forEach(function (c) { st.classList.remove('vt-theme-' + c); });
    st.classList.add('vt-theme-' + t);
    var btn = document.querySelector('[data-vt="theme"]');
    if (btn) btn.textContent = THEME_LABELS[t] || '🎨';
  }

  function jumpToRoom(idx) {
    state.ri = idx;
    resetRoomState();
    state.phase = 'overview';
    state.sidebarOpen = false;
    var el = $('vt-room-list');
    if (el) el.classList.remove('vt-rl-open');
    render();
    schedule(DUR_OVERVIEW);
  }

  /* ── typewriter helper ── */
  function typewrap(text, cssClass) {
    if (!text) return '';
    var words = text.split(/\s+/);
    return '<span class="' + (cssClass || 'vt-tw') + '">' +
      words.map(function (w, i) {
        return '<span class="vt-tw-word" style="animation-delay:' + (i * 0.12) + 's">' + esc(w) + '</span>';
      }).join(' ') + '</span>';
  }

  function esc(s) { return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  /* ── tip box top-left (mirrored from lobby, closable) ── */
  function renderTipTop(el) {
    if (!el) return;
    if (state.tipClosed || state.role === 'child' || state.role === 'کودک') { el.style.display = 'none'; return; }
    el.style.display = '';
    var tip = pickTip();
    el.innerHTML = '<div class="tip-header"><span class="tip-icon">💡</span><span class="tip-title">نکته روز</span>' +
      '<button class="vt-tip-close" data-vt="tip-close" title="بستن نکته">✕</button></div>' +
      '<div class="tip-body">' + esc(tip.text) + '</div>' +
      '<div style="font-size:.6rem;color:#a09080;margin-top:4px">— ' + esc(tip.src) + '</div>';
  }

  /* ── pick tip ── */
  function pickTip() {
    var available = [];
    TIPS.forEach(function (t, i) {
      if (!state.tipUsed[i]) available.push({ tip: t, idx: i });
    });
    if (!available.length) { state.tipUsed = {}; available = TIPS.map(function (t, i) { return { tip: t, idx: i }; }); }
    var pick = available[Math.floor(Math.random() * available.length)];
    state.tipUsed[pick.idx] = 1;
    return pick.tip;
  }

  /* ══════════════════════════════════════════════════════════
     RENDER
     ══════════════════════════════════════════════════════════ */

  function render() {
    var rid = state.roomIds[state.ri];
    if (!rid) { finish(); return; }
    var r = getRoom(rid);
    if (!r) { finish(); return; }
    var bgWrap = $('vt-bg-wrap');
    var contentEl = $('vt-content');
    var topEl = $('vt-top-bar');
    var tipTopEl = $('vt-tip-top');
    var progEl = $('vt-progress');
    if (!contentEl) return;

    /* ── background image ── */
    renderBg(bgWrap, rid);

    /* ── top bar ── */
    renderTopBar(topEl);

    /* ── tip box top-left (mirrored from lobby) ── */
    if (tipTopEl) renderTipTop(tipTopEl);

    /* ── content (wrapped in inner for 2/3 width) ── */
    contentEl.innerHTML = '<div class="vt-content-inner" id="vt-content-inner"></div>';
    var innerEl = $('vt-content-inner');

    if (state.phase === 'overview') {
      renderOverview(innerEl, r);
    } else if (state.phase === 'hotspot') {
      renderHotspotMenu(innerEl, r);
    } else if (state.phase === 'content') {
      renderContentDetail(innerEl, r);
    } else if (state.phase === 'tip') {
      renderTip(innerEl);
    } else if (state.phase === 'done') {
      renderDone(innerEl);
    }

    /* ── progress ── */
    renderProgress(progEl);

    /* ── soft crossfade on every tour change ── */
    [contentEl, bgWrap].forEach(function (n) {
      n.classList.remove('vt-swap');
      void n.offsetWidth;
      n.classList.add('vt-swap');
    });

    /* ── room sidebar ── */
    renderRoomSidebar();

    /* ── task board (persistent in VT, hidden for child) ── */
    if (typeof TaskBoard !== 'undefined' && state.role !== 'child' && state.role !== 'کودک') {
      TaskBoard.init('vt-task-board');
    }

    /* mobile: pull floating tip/taskboard into the content flow so they never cover the slideshow */
    if (window.innerWidth <= 768 && contentEl) {
      var cEl2 = contentEl;
      var tEl = $('vt-tip-top'), bEl = $('vt-task-board');
      if (tEl && tEl.parentElement !== cEl2) cEl2.insertBefore(tEl, cEl2.firstChild);
      if (bEl && bEl.parentElement !== cEl2) cEl2.appendChild(bEl);
    }

    /* ── Ken burns ── */
    updateKenBurns();
  }

  /* ── background ── */
  function renderBg(el, rid) {
    if (!el) return;
    var url = roomImg(rid, VIEWS[state.vi] || 'herog');
    el.innerHTML = '<img class="vt-bg-img" src="' + url + '" alt="" onerror="this.style.display=\'none\'" />';
  }

  function updateKenBurns() {
    var img = document.querySelector('.vt-bg-img');
    if (!img) return;
    img.className = 'vt-bg-img ken-burns-' + ((state.kbIndex % KB_COUNT) + 1);
  }

  /* ── top bar ── */
  function renderTopBar(el) {
    if (!el) return;
    var html = '<div class="vt-top-inner">';

    /* exit */
    html += '<button class="vt-tb-btn vt-tb-exit" data-vt="exit">✕</button>';
    /* room list toggle — next to exit */
    html += '<button class="vt-tb-btn vt-tb-list-toggle" data-vt="sidebar">☰ فهرست</button>';
    /* next room */
    html += '<button class="vt-tb-btn" data-vt="next-room" title="اتاق بعدی">⏭</button>';
    /* next — in RTL the forward button sits right of play */
    html += '<button class="vt-tb-btn" data-vt="next" title="بعدی">▶▶</button>';
    /* play/pause */
    html += '<button class="vt-tb-btn vt-tb-play" data-vt="play">' + (state.playing ? '⏸' : '▶') + '</button>';
    /* prev — in RTL the back button sits left of play */
    html += '<button class="vt-tb-btn" data-vt="prev" title="قبلی">◀◀</button>';
    /* prev room */
    html += '<button class="vt-tb-btn" data-vt="prev-room" title="اتاق قبلی">⏮</button>';
    /* shuffle */
    var shLabel = state.shuffleMode === 'all' ? '🔀 تصادفی' : state.shuffleMode === 'rooms' ? '📋 ترتیبی' : '➡️ ثابت';
    html += '<button class="vt-tb-btn vt-tb-shuffle" data-vt="shuffle">' + shLabel + '</button>';
    /* theme toggle */
    html += '<span class="vt-tb-divider"></span>';
    html += '<button class="vt-tb-btn vt-tb-theme" data-vt="theme">🎨 تم</button>';
    /* music toggle */
    html += '<button class="vt-tb-btn" data-vt="music">' + ((window.YaranMusic && window.YaranMusic.isPlaying()) ? '🔊' : '🔇') + '</button>';

    html += '<span class="vt-tb-spacer"></span>';

    /* room name */
    var r = getRoom(state.roomIds[state.ri]);
    html += '<span class="vt-tb-label">' + (r ? r.icon + ' ' + r.name : '') + '</span>';

    html += '</div>';

    /* tags row — type tags + audio subcategory tags */
    html += '<div class="vt-tags">';
    var _isChildVT2 = (state.role === 'child' || state.role === 'کودک');
    (_isChildVT2 ? ['audio'] : ['activity','pdf','game','video']).forEach(function (t) {
      var on = state.filters[t];
      html += '<button class="vt-tag ' + (on ? 'vt-tag-on' : 'vt-tag-off') + '" data-vt="tag" data-tag="' + t + '">' +
        (ICONS[t] || '📎') + ' ' + (TYPE_LABELS[t] || t) + '</button>';
    });
    html += '</div>';

    el.innerHTML = html;
  }

  /* ── overview phase ── */
  function renderOverview(el, r) {
    if (!el) return;
    var itemCount = state.items.length;
    var html = '<div class="vt-phase vt-overview">';
    html += '<div class="vt-ov-icon">' + (r.icon || '🏫') + '</div>';
    html += '<div class="vt-ov-title">' + esc(r.name) + '</div>';
    html += '<div class="vt-ov-sub">' + esc(r.desc || '') + '</div>';
    html += '<div class="vt-stats">';
    html += '<span class="vt-stat-chip">📋 ' + itemCount + ' محتوا</span>';
    html += '<span class="vt-stat-chip">📷 ۳ نما</span>';
    html += '<span class="vt-stat-chip">🏷️ ' + (r.tags || []).length + ' تگ</span>';
    html += '</div>';
    html += '<div class="vt-ov-hint">در حال بارگذاری محتوا...</div>';
    html += '</div>';
    el.innerHTML = html;
  }

  /* ── hotspot menu phase ── */
  function renderHotspotMenu(el, r) {
    if (!el) return;
    var items = state.items;
    var html = '<div class="vt-phase vt-hs-phase">';

    html += '<div class="vt-hs-header">';
    html += '<span class="vt-hs-title">محتواهای اتاق</span>';
    html += '<span class="vt-hs-count">' + items.length + ' مورد</span>';
    html += '</div>';

    /* show items grouped by category */
    var cats = {};
    items.forEach(function (entry) {
      var c = entry.cat || 'سایر';
      if (!cats[c]) cats[c] = [];
      cats[c].push(entry);
    });

    Object.keys(cats).forEach(function (catName) {
      var catItems = cats[catName];
      html += '<div class="vt-hs-cat">';
      html += '<div class="vt-hs-cat-hdr">' + esc(catName) + ' <span class="vt-hs-cat-count">(' + catItems.length + ')</span></div>';
      html += '<div class="vt-hs-cat-items">';
      catItems.forEach(function (entry, i) {
        var it = entry.item;
        var icon = ICONS[(it.type || 'activity').toLowerCase()] || '📎';
        html += '<div class="vt-item-row vt-fadein" style="animation-delay:' + (i * 0.08) + 's">';
        html += '<span class="vt-item-icon">' + icon + '</span>';
        html += '<span class="vt-item-label">' + esc(it.title || '') + '</span>';
        html += '<span class="vt-item-arrow">◀</span>';
        html += '</div>';
      });
      html += '</div></div>';
    });

    html += '</div>';
    el.innerHTML = html;
  }

  /* ── content detail phase — two-column: right=text, left=media ── */
  function renderContentDetail(el, r) {
    if (!el) return;
    var entry = state.items[state.ci];
    if (!entry) { nextRoom(); return; }
    var it = entry.item;
    var html = '<div class="vt-phase vt-content-detail vt-fadein">';

    /* counter */
    html += '<div class="vt-cd-counter">' + (state.ci + 1) + ' / ' + state.items.length + '</div>';

    /* breadcrumb */
    html += '<div class="vt-cd-breadcrumb">';
    html += '<span>' + esc(r.icon + ' ' + r.name) + '</span>';
    html += ' <span class="vt-cd-sep">◀</span> ';
    html += '<span>' + esc(entry.hs || '') + '</span>';
    html += ' <span class="vt-cd-sep">◀</span> ';
    html += '<span>' + esc(entry.cat || '') + '</span>';
    html += '</div>';

    html += '<div class="vt-two-col">';

    /* RIGHT COLUMN: text content */
    html += '<div class="vt-two-col-text">';

    /* title with typewriter */
    html += '<div class="vt-cd-title">' + typewrap(it.title || '', 'vt-tw') + '</div>';

    /* badge */
    var type = (it.type || 'activity').toLowerCase();
    html += '<div class="vt-cd-badge">' + (ICONS[type] || '📎') + ' ' + (TYPE_LABELS[type] || type) + '</div>';

    /* description */
    if (it.desc) {
      html += '<div class="vt-cd-section">';
      html += '<div class="vt-cd-section-title">📝 توضیحات</div>';
      html += '<div class="vt-cd-desc">' + typewrap(it.desc, 'vt-tw') + '</div>';
      html += '</div>';
    }

    /* materials */
    if (it.materials) {
      html += '<div class="vt-cd-section">';
      html += '<div class="vt-cd-section-title">🧰 وسایل مورد نیاز</div>';
      html += '<div class="vt-cd-materials">' + typewrap(it.materials, 'vt-tw') + '</div>';
      html += '</div>';
    }

    /* instructions */
    if (it.instructions) {
      html += '<div class="vt-cd-section">';
      html += '<div class="vt-cd-section-title">📋 مراحل اجرا</div>';
      html += '<div class="vt-cd-steps">';
      var _sn = ['1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣'];
      var steps = it.instructions.split(/\n|،|؛|\.|\d+\)|→/g).filter(function (s) { return s.trim(); });
      steps.forEach(function (step, i) {
        var num = i < _sn.length ? _sn[i] + ' ' : (i+1) + '. ';
        html += '<div class="vt-step-item vt-fadein" style="animation-delay:' + (i * 0.2) + 's">' + num + esc(step.trim()) + '</div>';
      });
      html += '</div></div>';
    }

    /* safety */
    if (it.safety) {
      html += '<div class="vt-cd-section vt-cd-safety">';
      html += '<div class="vt-cd-section-title">⚠️ نکات ایمنی</div>';
      html += '<div class="vt-cd-desc">' + esc(it.safety) + '</div>';
      html += '</div>';
    }

    /* action buttons */
    html += '<div class="vt-cd-actions">';
    if (it.type === 'audio' || it.type === 'song' || it.audioUrl) {
      var _au = it.audioUrl || it.url || '';
      html += '<button class="vt-action-btn vt-action-primary" onclick="window.yrPlay && yrPlay({title:\'' + (it.title||'').replace(/'/g,"\\'") + '\',audioUrl:\'' + _au + '\',category:\'' + (it.category||'').replace(/'/g,"\\'") + '\',channel:\'' + (it.channel||'').replace(/'/g,"\\'") + '\'})" style="cursor:pointer;">▶ پخش</button>';
    } else if (it.type === 'video' && it.url) {
      html += '<button class="vt-action-btn vt-action-primary" onclick="window.open(\'' + esc(it.url) + '\',\'_blank\')" style="cursor:pointer;">▶ پخش ویدیو</button>';
    } else if (it.url) {
      html += '<a class="vt-action-btn vt-action-primary" href="' + esc(it.url) + '" target="_blank" rel="noopener">📥 دانلود</a>';
    }
    if (it.page) {
      html += '<a class="vt-action-btn" href="' + esc(it.page) + '" target="_blank" rel="noopener">🌐 مشاهده در سایت</a>';
    }
    html += '</div>';

    html += '</div>'; /* end vt-two-col-text */

    /* LEFT COLUMN: media */
    html += '<div class="vt-two-col-media">';
    if (it.image) {
      html += '<img src="' + esc(it.image) + '" alt="" loading="lazy" onerror="this.style.display=\'none\'" />';
    } else if (it.type === 'audio' || it.type === 'song') {
      html += '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;background:linear-gradient(135deg,#1a1a2e,#16213e);border-radius:16px;padding:2rem;"><div style="font-size:5rem;">🔊</div><div style="color:#ffb84d;font-size:1rem;margin-top:12px;text-align:center;">' + esc(it.title || 'صدای آرامش') + '</div>' + (it.channel ? '<div style="color:#888;font-size:.8rem;margin-top:8px;">' + esc(it.channel) + '</div>' : '') + '</div>';
    } else if (it.type === 'video') {
      html += '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;background:linear-gradient(135deg,#1a1a2e,#16213e);border-radius:16px;"><div style="font-size:5rem;">🎬</div><div style="color:#ffb84d;font-size:1rem;margin-top:12px;">پخش ویدیو</div></div>';
    }
    html += '</div>';

    html += '</div>'; /* end vt-two-col */
    html += '</div>'; /* end vt-phase */
    el.innerHTML = html;
  }

  /* ── tip phase ── */
  function renderTip(el) {
    if (!el) return;
    var tip = pickTip();
    var html = '<div class="vt-phase vt-tip-phase vt-fadein">';
    html += '<div class="vt-tip-badge">💡 نکته ' + esc(tip.cat) + '</div>';
    html += '<div class="vt-tip-text">' + typewrap(tip.text, 'vt-tw') + '</div>';
    html += '<div class="vt-tip-source">— ' + esc(tip.src) + '</div>';
    html += '</div>';
    el.innerHTML = html;
  }

  /* ── tip box (persistent bottom) ── */
  function renderTipBox(el) {
    if (!el) return;
    if (state.phase === 'tip') { el.innerHTML = ''; return; }
    var tip = pickTip();
    el.innerHTML = '<div class="vt-tip-box-title">💡 نکته روز</div>' +
      '<div class="vt-tip-box-text">' + esc(tip.text) + '</div>' +
      '<div class="vt-tip-box-source">— ' + esc(tip.src) + '</div>';
  }

  /* ── done ── */
  function renderDone(el) {
    if (!el) return;
    el.innerHTML = '<div class="vt-phase vt-done vt-fadein">' +
      '<div class="vt-done-icon">🎉</div>' +
      '<div class="vt-done-title">گردش مجازی تمام شد!</div>' +
      '<div class="vt-done-desc">از تمام اتاق‌ها و محتواها دیدن کردید.</div>' +
      '<button class="vt-action-btn vt-action-primary" data-vt="restart">🔄 شروع مجدد</button>' +
      '<button class="vt-action-btn" data-vt="exit">🏠 بازگشت به لابی</button>' +
      '</div>';
  }

  /* ── progress ── */
  function renderProgress(el) {
    if (!el) return;
    var total = state.roomIds.length;
    var current = state.ri + 1;
    var pct = total > 0 ? Math.round((current / total) * 100) : 0;
    el.innerHTML = '<div class="vt-prog-bar"><div class="vt-prog-fill" style="width:' + pct + '%"></div></div>' +
      '<div class="vt-prog-text">اتاق ' + current + ' از ' + total + '</div>';
  }

  /* ── room sidebar ── */
  function renderRoomSidebar() {
    var el = $('vt-room-list');
    if (!el) return;
    var html = '<div class="vt-rl-header">فهرست اتاق‌ها <button class="vt-rl-close" data-vt="sidebar">✕</button></div>';
    state.roomIds.forEach(function (rid, i) {
      var r = getRoom(rid);
      if (!r) return;
      var active = i === state.ri ? ' vt-rl-active' : '';
      html += '<div class="vt-rl-item' + active + '" data-vt="jump" data-ri="' + i + '">';
      html += '<span class="vt-rl-num">' + (i + 1) + '</span>';
      html += '<span class="vt-rl-name">' + (r.icon || '') + ' ' + esc(r.name) + '</span>';
      html += '</div>';
    });
    el.innerHTML = html;
  }

  /* ══════════════════════════════════════════════════════════
     EVENT DELEGATION — single handler on vt-glass, never lost
     ══════════════════════════════════════════════════════════ */

  function bindEvents() {
    var glass = $('vt-glass');
    /* tip-top lives OUTSIDE #vt-glass → needs its own closer */
    var tipTop = $('vt-tip-top');
    if (tipTop) {
      tipTop.addEventListener('click', function (e) {
        if (e.target.closest('[data-vt="tip-close"]')) {
          state.tipClosed = true;
          tipTop.style.display = 'none';
        }
      });
    }
    if (glass) {
      glass.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-vt]');
        if (!btn) return;
        var action = btn.getAttribute('data-vt');
        switch (action) {
          case 'exit': exit(); break;
          case 'play': togglePlay(); break;
          case 'next': next(); break;
          case 'prev': prev(); break;
          case 'next-room': nextRoom(); break;
          case 'prev-room': prevRoom(); break;
          case 'shuffle': cycleShuffle(); break;
          case 'sidebar': toggleSidebar(); break;
          case 'theme': toggleTheme(); break;
          case 'music': toggleMusic(); break;
          case 'tip-close':
            state.tipClosed = true;
            var tipEl = $('vt-tip-top');
            if (tipEl) tipEl.style.display = 'none';
            break;
          case 'restart': start(); break;
          case 'tag':
            var tag = btn.getAttribute('data-tag');
            state.filters[tag] = !state.filters[tag];
            state.items = collectRoomItems(state.roomIds[state.ri]);
            render();
            break;
        }
      });
    }

    /* room sidebar delegation */
    var sidebar = $('vt-room-list');
    if (sidebar) {
      sidebar.addEventListener('click', function (e) {
        var closeBtn = e.target.closest && e.target.closest('[data-vt="sidebar"]');
        if (closeBtn) {
          /* دکمه بستن (✕) داخل سایدبار — خارج از vt-glass است، اینجا handle می‌شود */
          state.sidebarOpen = false;
          sidebar.classList.remove('vt-rl-open');
          return;
        }
        var item = e.target.closest('[data-vt="jump"]');
        if (!item) return;
        var idx = parseInt(item.getAttribute('data-ri'), 10);
        if (!isNaN(idx)) jumpToRoom(idx);
      });
    }

    /* keyboard */
    document.addEventListener('keydown', function (e) {
      var screen = $('screen-tour');
      if (!screen || !screen.classList.contains('active')) return;
      switch (e.key) {
        case 'ArrowRight': case 'Backspace': prev(); e.preventDefault(); break;
        case 'ArrowLeft': case ' ': next(); e.preventDefault(); break;
        case 'Escape': exit(); e.preventDefault(); break;
        case 'p': togglePlay(); break;
      }
    });
  }

  /* ── update play button label (no re-render) ── */
  function updatePlayBtn() {
    var btn = document.querySelector('[data-vt="play"]');
    if (btn) btn.textContent = state.playing ? '⏸' : '▶';
  }

  function updateShuffleBtn() {
    var btn = document.querySelector('.vt-tb-shuffle');
    if (btn) {
      btn.textContent = state.shuffleMode === 'all' ? '🔀 تصادفی' : state.shuffleMode === 'rooms' ? '📋 ترتیبی' : '➡️ ثابت';
    }
  }

  /* ══════════════════════════════════════════════════════════
     START / EXIT
     ══════════════════════════════════════════════════════════ */

  function start(role) {
    /* role */
    if (role) state.role = role;
    else {
      try {
        var u = (typeof currentUser === 'function') ? currentUser() : null;
        if (u && u.role) state.role = u.role;
      } catch (e) { }
    }

    /* shuffle rooms */
    var allRooms = ROOMS.map(function (r) { return r.id; });
    state.roomIds = state.shuffleMode === 'all' ? shuffleArr(allRooms) : allRooms;
    state.ri = 0;
    state.playing = true;
    state.tipUsed = {};
    state.kbIndex = 0;
    resetRoomState();
    state.sidebarOpen = false;

    /* show screen */
    document.querySelectorAll('.screen').forEach(function (s) { s.classList.remove('active'); });
    var tourScreen = $('screen-tour');
    if (tourScreen) tourScreen.classList.add('active');


    /* intro2 video before tour starts */
    var introWrap = document.createElement('div');
    introWrap.id = 'vt-intro2-wrap';
    introWrap.style.cssText = 'position:absolute;inset:0;z-index:9999;background:#000;display:flex;align-items:center;justify-content:center;flex-direction:column;';
    var introVid = document.createElement('video');
    introVid.src = 'assets/video/intro2.yar';
    introVid.autoplay = true;
    introVid.muted = true;
    introVid.playsInline = true;
    introVid.style.cssText = 'max-width:100%;max-height:90vh;';
    introWrap.appendChild(introVid);
    var skipBtn = document.createElement('button');
    skipBtn.textContent = '\u2190 \u0631\u062F \u0634\u062F\u0646';
    skipBtn.style.cssText = 'position:absolute;top:1rem;left:1rem;background:rgba(0,0,0,.6);color:#fff;border:1px solid #ffb84d;border-radius:8px;padding:.5rem 1rem;cursor:pointer;font-size:.9rem;z-index:10000;';
    skipBtn.onclick = function() { introWrap.remove(); };
    introVid.onended = function() { introWrap.remove(); };
    introWrap.appendChild(skipBtn);
    tourScreen.appendChild(introWrap);

    /* bind events (delegation — safe to call multiple times) */
    bindEvents();

    /* auto-play music removed per user request */

    /* outside-click closes sidebar */
    document.addEventListener('click', function (e) {
      if (!state.sidebarOpen) return;
      var sidebar = $('vt-room-list');
      var btn = e.target.closest && e.target.closest('[data-vt="sidebar"]');
      if (!sidebar || sidebar.contains(e.target) || btn) return;
      state.sidebarOpen = false;
      sidebar.classList.remove('vt-rl-open');
    });

    /* render */
    state.phase = 'overview';
    render();
    schedule(DUR_OVERVIEW);
  }

  function startWithRole(role) { start(role); }

  /* ── music: soft melody via YaranMusic ── */
  function startMusic() {
    window.YaranMusic && window.YaranMusic.start('tour');
  }

  function stopMusic() {
    window.YaranMusic && window.YaranMusic.stop();
  }

  function toggleMusic() {
    if (window.YaranMusic && window.YaranMusic.isPlaying()) stopMusic();
    else startMusic();
    var btn = document.querySelector('[data-vt="music"]');
    if (btn) btn.textContent = (window.YaranMusic && window.YaranMusic.isPlaying()) ? '🔊' : '🔇';
  }

  function setRole(role) {
    if (role) state.role = role;
  }

  return { start: start, exit: exit, startWithRole: startWithRole, setRole: setRole };
})();
