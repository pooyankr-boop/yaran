/**
 * games2.js — 15 additional interactive games for YARAN kindergarten
 * Zero dependencies, vanilla JS, RTL Persian
 */
var Games2 = (function() {
  'use strict';
  var active = null;

  function clean(c) { if (c) c.innerHTML = ''; if (active && active.destroy) active.destroy(); active = null; }

  function rand(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }
  function shuffle(arr) { for (var i = arr.length - 1; i > 0; i--) { var j = rand(0, i); var t = arr[i]; arr[i] = arr[j]; arr[j] = t; } return arr; }

  function btn(text, fn, style) {
    var b = document.createElement('button');
    b.textContent = text;
    b.style.cssText = 'padding:8px 16px;border:none;border-radius:10px;background:#ffb84d;color:#3d2f1f;font-size:1rem;cursor:pointer;font-family:inherit;' + (style || '');
    if (fn) b.addEventListener('click', fn);
    return b;
  }

  // Difficulty selector: returns 'easy'|'medium'|'hard'
  function diffSelector(c, onPick) {
    var wrap = document.createElement('div');
    wrap.style.cssText = 'text-align:center;margin-bottom:12px';
    var label = document.createElement('div');
    label.style.cssText = 'font-weight:700;color:#3d2f1f;margin-bottom:6px;font-size:.95rem';
    label.textContent = '🎯 درجه سختی را انتخاب کنید:';
    wrap.appendChild(label);
    var row = document.createElement('div');
    row.style.cssText = 'display:flex;gap:8px;justify-content:center';
    [['آسان 🌱', 'easy', '#8fae7a'], ['متوسط 🔥', 'medium', '#ffb84d'], ['سخت 💪', 'hard', '#e74c3c']].forEach(function(d) {
      var b = btn(d[0], function() { onPick(d[1]); }, 'background:' + d[2] + ';font-size:.9rem;padding:6px 14px');
      row.appendChild(b);
    });
    wrap.appendChild(row);
    c.appendChild(wrap);
  }

  function scoreBoard(el, score) {
    el.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px"><span style="font-size:1.1rem;font-weight:700;color:#3d2f1f">🏆 امتیاز: ' + score + '</span></div>';
  }

  // 1. BALLOON POP
  function balloonPop(c) {
    clean(c); var score = 0, interval, running = true;
    c.style.cssText += 'position:relative;overflow:hidden;background:linear-gradient(180deg,#87CEEB,#E0F7FA);border-radius:16px';
    var sb = document.createElement('div'); sb.style.cssText = 'padding:8px;text-align:center'; scoreBoard(sb, score); c.appendChild(sb);

    function spawn() {
      if (!running) return;
      var b = document.createElement('div');
      var colors = ['#ff6b6b','#feca57','#48dbfb','#ff9ff3','#54a0ff','#5f27cd','#01a3a4','#f368e0'];
      var col = colors[rand(0, colors.length - 1)];
      b.style.cssText = 'position:absolute;bottom:-60px;width:45px;height:55px;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;background:' + col + ';cursor:pointer;transition:transform .1s;z-index:2';
      b.style.left = rand(10, 85) + '%';
      b.innerHTML = '<div style="position:absolute;bottom:-15px;left:50%;width:2px;height:15px;background:#999;transform:translateX(-50%)"></div>';
      b.addEventListener('click', function() { score += 10; sb.innerHTML = ''; scoreBoard(sb, score); b.style.transform = 'scale(1.3)'; setTimeout(function() { b.remove(); }, 150); });
      c.appendChild(b);
      var pos = -60;
      var rise = setInterval(function() { if (!running) { clearInterval(rise); return; } pos += 2; b.style.bottom = pos + 'px'; if (pos > c.offsetHeight + 60) { b.remove(); clearInterval(rise); } }, 30);
    }

    interval = setInterval(spawn, 800);
    active = { destroy: function() { running = false; clearInterval(interval); c.style.cssText = ''; } };
    var restart = btn('🔄 شروع دوباره', function() { clean(c); balloonPop(c); });
    restart.style.cssText += 'position:absolute;top:8px;left:8px;z-index:5';
    c.appendChild(restart);
  }

  // 2. DRAWING
  function drawing(c) {
    clean(c); c.style.cssText += 'background:#fff;border-radius:16px;overflow:hidden';
    var tools = document.createElement('div');
    tools.style.cssText = 'display:flex;gap:6px;padding:8px;align-items:center;flex-wrap:wrap;background:#f5f0e8';
    var colors = ['#ff0000','#ff6b00','#ffcc00','#00cc00','#0066ff','#9900cc','#ff69b4','#000000'];
    var canvas = document.createElement('canvas');
    var ctx; var currentColor = '#000'; var currentSize = 4; var drawing = false;

    colors.forEach(function(col) {
      var swatch = document.createElement('div');
      swatch.style.cssText = 'width:28px;height:28px;border-radius:50%;cursor:pointer;border:3px solid #ddd;background:' + col;
      swatch.addEventListener('click', function() { currentColor = col; });
      tools.appendChild(swatch);
    });

    var sizeLabel = document.createElement('span');
    sizeLabel.style.cssText = 'font-size:.8rem;color:#666';
    sizeLabel.textContent = 'قلم: ' + currentSize;
    tools.appendChild(sizeLabel);

    var sizes = [2, 4, 8, 14];
    sizes.forEach(function(s) {
      var sb = btn(s + '', function() { currentSize = s; sizeLabel.textContent = 'قلم: ' + s; });
      sb.style.cssText += 'width:32px;height:32px;padding:0;font-size:.8rem;border-radius:50%';
      tools.appendChild(sb);
    });

    var clearBtn = btn('🗑️ پاک کردن', function() { ctx.clearRect(0, 0, canvas.width, canvas.height); });
    clearBtn.style.cssText += 'font-size:.8rem;margin-right:auto';
    tools.appendChild(clearBtn);

    c.appendChild(tools);
    c.appendChild(canvas);

    function resize() {
      canvas.width = c.offsetWidth;
      canvas.height = c.offsetHeight - tools.offsetHeight - 4;
      ctx = canvas.getContext('2d');
      ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    }
    resize();

    function getPos(e) { var r = canvas.getBoundingClientRect(); var t = e.touches ? e.touches[0] : e; return { x: t.clientX - r.left, y: t.clientY - r.top }; }

    canvas.addEventListener('mousedown', function(e) { drawing = true; var p = getPos(e); ctx.beginPath(); ctx.moveTo(p.x, p.y); });
    canvas.addEventListener('mousemove', function(e) { if (!drawing) return; var p = getPos(e); ctx.strokeStyle = currentColor; ctx.lineWidth = currentSize; ctx.lineTo(p.x, p.y); ctx.stroke(); });
    canvas.addEventListener('mouseup', function() { drawing = false; });
    canvas.addEventListener('touchstart', function(e) { e.preventDefault(); drawing = true; var p = getPos(e); ctx.beginPath(); ctx.moveTo(p.x, p.y); });
    canvas.addEventListener('touchmove', function(e) { e.preventDefault(); if (!drawing) return; var p = getPos(e); ctx.strokeStyle = currentColor; ctx.lineWidth = currentSize; ctx.lineTo(p.x, p.y); ctx.stroke(); });
    canvas.addEventListener('touchend', function() { drawing = false; });

    active = { destroy: function() { c.style.cssText = ''; } };
  }

  // 3. CATCH FISH
  function catchFish(c) {
    clean(c); var score = 0, running = true;
    c.style.cssText += 'position:relative;overflow:hidden;background:linear-gradient(180deg,#006994,#00b4d8);border-radius:16px';
    var sb = document.createElement('div'); scoreBoard(sb, score); sb.style.cssText = 'padding:8px;text-align:center;color:#fff'; c.appendChild(sb);
    var bucket = document.createElement('div');
    bucket.style.cssText = 'position:absolute;bottom:10px;width:70px;height:50px;background:#8B4513;border-radius:0 0 12px 12px;left:50%;transform:translateX(-50%);z-index:3;transition:left .1s';
    c.appendChild(bucket);

    var bucketX = c.offsetWidth / 2 - 35;
    function fishMoveHandler(e) { if (!running) return; var r = c.getBoundingClientRect(); bucketX = Math.max(0, Math.min(r.width - 70, e.clientX - r.left - 35)); bucket.style.left = bucketX + 'px'; }
    function fishTouchHandler(e) { if (!running || !e.touches[0]) return; e.preventDefault(); var r = c.getBoundingClientRect(); bucketX = Math.max(0, Math.min(r.width - 70, e.touches[0].clientX - r.left - 35)); bucket.style.left = bucketX + 'px'; }
    document.addEventListener('mousemove', fishMoveHandler);
    c.addEventListener('touchmove', fishTouchHandler, { passive: false });

    var fishEmojis = ['🐟','🐠','🐡','🦈','🐙','🦑','🦞','🦀'];
    function spawnFish() {
      if (!running) return;
      var f = document.createElement('div');
      f.textContent = fishEmojis[rand(0, fishEmojis.length - 1)];
      f.style.cssText = 'position:absolute;top:-40px;font-size:2rem;cursor:pointer;z-index:2;left:' + rand(5, 90) + '%';
      c.appendChild(f);
      var y = -40;
      var fall = setInterval(function() {
        if (!running) { clearInterval(fall); return; }
        y += 3; f.style.top = y + 'px';
        if (y > c.offsetHeight - 60) {
          var fl = parseFloat(f.style.left);
          var bl = bucketX / c.offsetWidth * 100;
          if (Math.abs(fl - bl) < 12) { score += 10; sb.innerHTML = ''; scoreBoard(sb, score); f.textContent = '✨'; setTimeout(function() { f.remove(); }, 300); }
          else { f.remove(); }
          clearInterval(fall);
        }
      }, 30);
      f.addEventListener('click', function() { score += 5; sb.innerHTML = ''; scoreBoard(sb, score); f.remove(); clearInterval(fall); });
    }

    var interval = setInterval(spawnFish, 1200);
    active = { destroy: function() { running = false; clearInterval(interval); c.style.cssText = ''; document.removeEventListener('mousemove', fishMoveHandler); } };
    var restart = btn('🔄 شروع', function() { clean(c); catchFish(c); });
    restart.style.cssText += 'position:absolute;top:8px;left:8px;z-index:5';
    c.appendChild(restart);
  }

  // 4. MAZE
  function maze(c) {
    clean(c); c.style.cssText += 'background:#f5f0e8;border-radius:16px;overflow:hidden;text-align:center';
    diffSelector(c, function(diff) { startMaze(c, diff); });
    function startMaze(c, diff) {
    var sizes = {easy:[7,5,52], medium:[9,7,44], hard:[13,9,32]};
    var s = sizes[diff] || sizes.medium;
    var W = s[0], H = s[1], cell = s[2];
    var grid = [];
    for (var y = 0; y < H; y++) { grid[y] = []; for (var x = 0; x < W; x++) grid[y][x] = 1; }

    // DFS maze gen
    function carve(x, y) {
      grid[y][x] = 0;
      var dirs = shuffle([[0,-2],[0,2],[-2,0],[2,0]]);
      dirs.forEach(function(d) {
        var nx = x + d[0], ny = y + d[1];
        if (nx >= 0 && nx < W && ny >= 0 && ny < H && grid[ny][nx] === 1) {
          grid[y + d[1]/2][x + d[0]/2] = 0;
          carve(nx, ny);
        }
      });
    }
    carve(0, 0);

    var px = 0, py = 0, gx = W - 1, gy = H - 1;

    var wrap = document.createElement('div');
    wrap.style.cssText = 'display:inline-block;margin:10px auto;position:relative';
    wrap.style.width = W * cell + 'px';
    wrap.style.height = H * cell + 'px';

    var goal = document.createElement('div');
    goal.textContent = '🏠';
    goal.style.cssText = 'position:absolute;font-size:1.5rem;z-index:2;transition:all .2s';
    goal.style.left = gx * cell + cell/4 + 'px';
    goal.style.top = gy * cell + cell/4 + 'px';
    wrap.appendChild(goal);

    var player = document.createElement('div');
    player.textContent = '🧒';
    player.style.cssText = 'position:absolute;font-size:1.5rem;z-index:3;transition:all .15s';
    wrap.appendChild(player);

    for (var y = 0; y < H; y++) for (var x = 0; x < W; x++) {
      var cellEl = document.createElement('div');
      cellEl.style.cssText = 'position:absolute;width:' + cell + 'px;height:' + cell + 'px;background:' + (grid[y][x] ? '#5a4a3a' : '#e8dcc8') + ';border:1px solid #d4c4a8';
      cellEl.style.left = x * cell + 'px'; cellEl.style.top = y * cell + 'px';
      wrap.appendChild(cellEl);
    }

    function updatePos() { player.style.left = px * cell + cell/4 + 'px'; player.style.top = py * cell + cell/4 + 'px'; }
    updatePos();

    var msg = document.createElement('div');
    msg.style.cssText = 'padding:8px;font-weight:700;color:#3d2f1f';
    msg.textContent = '🎯 با کلیدهای جهت‌نما حرکت کنید';
    c.appendChild(msg);
    c.appendChild(wrap);

    var won = false;
    function move(dx, dy) {
      if (won) return;
      var nx = px + dx, ny = py + dy;
      if (nx >= 0 && nx < W && ny >= 0 && ny < H && !grid[ny][nx]) { px = nx; py = ny; updatePos(); }
      if (px === gx && py === gy) { won = true; msg.textContent = '🎉 تبریک! برنده شدید!'; }
    }

    function mazeKeyHandler(e) {
      if (e.key === 'ArrowRight') move(1, 0);
      else if (e.key === 'ArrowLeft') move(-1, 0);
      else if (e.key === 'ArrowDown') move(0, 1);
      else if (e.key === 'ArrowUp') move(0, -1);
    }
    document.addEventListener('keydown', mazeKeyHandler);

    // Mobile buttons
    var controls = document.createElement('div');
    controls.style.cssText = 'display:flex;gap:4px;justify-content:center;margin-top:8px';
    [['⬆️',0,-1],['⬇️',0,1],['⬅️',-1,0],['➡️',1,0]].forEach(function(d) {
      var b = btn(d[0], function() { move(d[1], d[2]); });
      b.style.cssText += 'width:40px;height:40px;padding:0;font-size:1.2rem';
      controls.appendChild(b);
    });
    c.appendChild(controls);
    active = { destroy: function() { c.style.cssText = ''; document.removeEventListener('keydown', mazeKeyHandler); } };
    } // end startMaze
  }

  // 5. QUIZ
  function quiz(c) {
    clean(c); c.style.cssText += 'background:#f5f0e8;border-radius:16px;padding:16px;overflow:hidden';
    var questions = [
      { q: 'کدام حیوان میو میو می‌کند؟', opts: ['🐕 سگ', '🐱 گربه', '🐔 مرغ', '🐮 گاو'], ans: 1 },
      { q: '۲ + ۳ چند می‌شود؟', opts: ['۴', '۵', '۶', '۷'], ans: 1 },
      { q: 'رنگ آسمان چیست؟', opts: ['🔴 قرمز', '🟢 سبز', '🔵 آبی', '🟡 زرد'], ans: 2 },
      { q: 'کدام فصل برف می‌بارد؟', opts: ['🌸 بهار', '☀️ تابستان', '❄️ زمستان', '🍂 پاییز'], ans: 2 },
      { q: 'شکل ⬛ چیست؟', opts: ['دایره', 'مثلث', 'مربع', 'ستاره'], ans: 2 },
      { q: 'کدام میوه قرمز است؟', opts: ['🍌 موز', '🍎 سیب', '🍊 پرتقال', '🍇 انگور'], ans: 1 },
      { q: 'تعداد پای عنکبوت چند تاست؟', opts: ['۴', '۶', '۸', '۱۰'], ans: 2 },
      { q: 'کدام رنگ در رنگین‌کمان نیست؟', opts: ['قرمز', 'بنفش', 'صورتی', 'سبز'], ans: 2 },
    ];
    shuffle(questions);
    var qi = 0, score = 0;

    function render() {
      if (qi >= questions.length) {
        c.innerHTML = '<div style="text-align:center;padding:30px"><h2 style="font-size:2rem">🎉 آفرین!</h2><p style="font-size:1.3rem;margin:16px 0">امتیاز: ' + score + ' از ' + questions.length + '</p></div>';
        c.appendChild(btn('🔄 دوباره', function() { quiz(c); }));
        return;
      }
      var q = questions[qi];
      c.innerHTML = '<div style="text-align:center;margin-bottom:8px;color:#888;font-size:.85rem">سوال ' + (qi+1) + ' از ' + questions.length + '</div>';
      c.innerHTML += '<div style="text-align:center;font-size:1.2rem;font-weight:700;margin:16px 0;color:#3d2f1f">' + q.q + '</div>';
      var grid = document.createElement('div');
      grid.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:16px';
      q.opts.forEach(function(opt, i) {
        var b = btn(opt, function() {
          if (i === q.ans) { score++; b.style.background = '#00b894'; b.style.color = '#fff'; }
          else { b.style.background = '#ff7675'; b.style.color = '#fff'; }
          setTimeout(function() { qi++; render(); }, 600);
        });
        b.style.cssText += 'font-size:1rem;padding:12px';
        grid.appendChild(b);
      });
      c.appendChild(grid);
    }
    render();
    active = { destroy: function() { c.style.cssText = ''; } };
  }

  // 6. SORTING
  function sorting(c) {
    clean(c); c.style.cssText += 'background:#f5f0e8;border-radius:16px;padding:16px;overflow:hidden';
    diffSelector(c, function(diff) { startSorting(c, diff); });
    function startSorting(c, diff) {
    var cfg = {easy:{colors:2,items:4,rounds:3},medium:{colors:3,items:5,rounds:5},hard:{colors:4,items:6,rounds:7}};
    var cf = cfg[diff] || cfg.medium;
    var score = 0, round = 0, maxRounds = cf.rounds;
    var shapes = ['🔴','🟡','🔵','🟢'];
    var categories = ['قرمز','آبی','سبز','زرد'].slice(0, cf.colors);

    function renderRound() {
      if (round >= maxRounds) {
        c.innerHTML = '<div style="text-align:center;padding:30px"><h2>🎉 تمام شد!</h2><p style="font-size:1.2rem;margin:12px 0">امتیاز: ' + score + '/' + maxRounds + '</p></div>';
        c.appendChild(btn('🔄 دوباره', function() { sorting(c); }));
        return;
      }
      var cat = categories[round % categories.length];
      var items = [];
      for (var i = 0; i < cf.items; i++) items.push(cat === categories[0] ? shapes[0] : shapes[1]);
      for (var i = 0; i < Math.floor(cf.items / 2); i++) items.push(cat === categories[0] ? shapes[1] : shapes[0]);
      shuffle(items);

      c.innerHTML = '<div style="text-align:center"><h3>🎯 ' + items.length + ' شیء ' + cat + ' را پیدا کن و روی آن کلیک کن!</h3></div>';
      c.innerHTML += '<div style="text-align:center;margin:8px 0;color:#888">امتیاز: ' + score + '</div>';
      var grid = document.createElement('div');
      grid.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:16px';
      items.forEach(function(shape) {
        var b = document.createElement('button');
        b.textContent = shape;
        b.style.cssText = 'font-size:2.5rem;padding:12px;background:#fff;border:3px solid #ddd;border-radius:12px;cursor:pointer;transition:all .15s';
        b.addEventListener('click', function() {
          if (shape === shapes[categories.indexOf(cat)]) {
            score++; b.style.transform = 'scale(1.3)'; b.style.borderColor = '#00b894';
          } else {
            b.style.transform = 'scale(0.8)'; b.style.borderColor = '#ff7675';
          }
        });
        grid.appendChild(b);
      });
      c.appendChild(grid);
      var next = btn('مرحله بعد →', function() { round++; renderRound(); });
      next.style.cssText += 'display:block;margin:16px auto 0';
      c.appendChild(next);
    }
    renderRound();
    active = { destroy: function() { c.style.cssText = ''; } };
    } // end startSorting
  }

  // 7. MEMORY (extended)
  function memory2(c) {
    clean(c); c.style.cssText += 'background:#f5f0e8;border-radius:16px;padding:16px;overflow:hidden';
    var emojis = ['🐱','🐶','🐰','🐻','🐼','🦊','🐸','🐵','🦁','🐷'];
    var cards = shuffle(emojis.slice(0, 8).concat(emojis.slice(0, 8)));
    var flipped = [], matched = 0, score = 0, locked = false;
    c.innerHTML = '<div style="text-align:center;margin-bottom:12px"><span style="font-size:1.1rem;font-weight:700">🏆 ' + score + '</span></div>';
    var grid = document.createElement('div');
    grid.style.cssText = 'display:grid;grid-template-columns:repeat(4,1fr);gap:8px;max-width:350px;margin:0 auto';
    cards.forEach(function(emoji, i) {
      var card = document.createElement('div');
      card.style.cssText = 'aspect-ratio:1;background:#6c5ce7;border-radius:12px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:1.8rem;transition:transform .3s;color:#fff';
      card.textContent = '❓';
      card.addEventListener('click', function() {
        if (locked || card.dataset.matched || flipped.length >= 2) return;
        card.textContent = emoji; card.style.background = '#fff';
        flipped.push({ el: card, emoji: emoji, idx: i });
        if (flipped.length === 2) {
          locked = true;
          if (flipped[0].emoji === flipped[1].emoji) {
            flipped[0].el.dataset.matched = '1'; flipped[1].el.dataset.matched = '1';
            flipped[0].el.style.background = '#00b894'; flipped[1].el.style.background = '#00b894';
            matched++; score += 10;
            if (matched === 8) { setTimeout(function() { c.innerHTML = '<h2 style="text-align:center">🎉 آفرین! ' + score + ' امتیاز</h2>'; c.appendChild(btn('🔄 دوباره', function() { memory2(c); })); }, 500); }
            flipped = []; locked = false;
          } else {
            setTimeout(function() { flipped.forEach(function(f) { f.el.textContent = '❓'; f.el.style.background = '#6c5ce7'; }); flipped = []; locked = false; }, 800);
          }
        }
      });
      grid.appendChild(card);
    });
    c.appendChild(grid);
    active = { destroy: function() { c.style.cssText = ''; } };
  }

  // 8-15: Simpler games using canvas or DOM
  function balloonPop2(c) { balloonPop(c); } // alias
  function dotConnect(c) {
    clean(c); c.style.cssText += 'background:#fff;border-radius:16px;overflow:hidden;text-align:center;padding:10px';
    var canvas = document.createElement('canvas');
    canvas.width = c.offsetWidth - 20; canvas.height = c.offsetHeight - 80;
    canvas.style.cssText = 'border:2px solid #ddd;border-radius:12px';
    c.appendChild(canvas);
    var ctx = canvas.getContext('2d');
    var dots = [[100,50],[200,30],[300,80],[350,180],[300,280],[180,300],[80,250],[50,150]];
    ctx.fillStyle = '#fff'; ctx.fillRect(0,0,canvas.width,canvas.height);
    dots.forEach(function(d,i) { ctx.beginPath(); ctx.arc(d[0],d[1],12,0,Math.PI*2); ctx.fillStyle='#ffb84d'; ctx.fill(); ctx.fillStyle='#3d2f1f'; ctx.font='bold 14px Vazirmatn'; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText(i+1,d[0],d[1]); });
    var order = 0;
    canvas.addEventListener('click', function(e) {
      var r = canvas.getBoundingClientRect(); var x = e.clientX-r.left; var y = e.clientY-r.top;
      var d = dots[order]; if (Math.abs(x-d[0])<20 && Math.abs(y-d[1])<20) {
        if (order > 0) { ctx.beginPath(); ctx.moveTo(dots[order-1][0],dots[order-1][1]); ctx.lineTo(d[0],d[1]); ctx.strokeStyle='#6c5ce7'; ctx.lineWidth=3; ctx.stroke(); }
        order++;
        if (order >= dots.length) { ctx.beginPath(); ctx.moveTo(d[dots.length-1][0],d[dots.length-1][1]); ctx.lineTo(dots[0][0],dots[0][1]); ctx.strokeStyle='#6c5ce7'; ctx.lineWidth=3; ctx.stroke(); c.innerHTML='<h2 style="text-align:center">🎉 تصویر کامل شد!</h2>'; c.appendChild(canvas); c.appendChild(btn('🔄 دوباره',function(){dotConnect(c);})); }
      }
    });
    var hint = document.createElement('div'); hint.style.cssText='padding:6px;font-size:.85rem;color:#888'; hint.textContent='روی نقطه‌ها به ترتیب شماره کلیک کنید'; c.insertBefore(hint,canvas);
    active = {destroy:function(){c.style.cssText='';}};
  }

  function bingo(c) {
    clean(c); c.style.cssText += 'background:#f5f0e8;border-radius:16px;padding:12px;overflow:hidden;text-align:center';
    var nums = []; for(var i=1;i<=25;i++) nums.push(i); shuffle(nums);
    var called = []; var grid = document.createElement('div');
    grid.style.cssText = 'display:grid;grid-template-columns:repeat(5,1fr);gap:4px;max-width:300px;margin:0 auto';
    nums.forEach(function(n,i){
      var cell = document.createElement('div');
      cell.style.cssText='aspect-ratio:1;background:#fff;border:2px solid #ddd;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:1.1rem;font-weight:700;cursor:pointer';
      cell.textContent=n;
      cell.addEventListener('click',function(){cell.style.background=cell.style.background==='rgb(255, 184, 77)'?'#fff':'#ffb84d';});
      grid.appendChild(cell);
    });
    c.appendChild(grid);
    var callBtn = btn('🎱 شماره بکش',function(){
      var remaining=nums.filter(function(n){return called.indexOf(n)===-1;});
      if(remaining.length===0){c.innerHTML='<h2>🎉 تمام شماره‌ها کشیده شد!</h2>';c.appendChild(btn('🔄 دوباره',function(){bingo(c);}));return;}
      var pick=remaining[rand(0,remaining.length-1)]; called.push(pick);
      var disp=document.getElementById('bingo-display');
      if(!disp){disp=document.createElement('div');disp.id='bingo-display';disp.style.cssText='font-size:3rem;margin:12px 0;color:#6c5ce7;font-weight:700';c.appendChild(disp);}
      disp.textContent=pick;
    });
    callBtn.style.cssText+='margin-top:12px';
    c.appendChild(callBtn);
    active={destroy:function(){c.style.cssText='';}};
  }

  function rhythm(c){
    clean(c);c.style.cssText += 'background:#f5f0e8;border-radius:16px;padding:16px;overflow:hidden;text-align:center';
    var seq=[],userSeq=[],score=0,locked=true;
    var colors=['#ff6b6b','#feca57','#48dbfb','#54a0ff'];
    var labels=['🔴','🟡','🔵','🟣'];
    var grid=document.createElement('div');grid.style.cssText='display:flex;gap:12px;justify-content:center;margin:20px 0';
    labels.forEach(function(l,i){
      var b=document.createElement('button');b.textContent=l;b.style.cssText='font-size:3rem;width:80px;height:80px;border-radius:50%;border:4px solid #ddd;background:#fff;cursor:pointer;transition:all .15s';
      b.addEventListener('mousedown',function(){b.style.transform='scale(0.9)';});
      b.addEventListener('mouseup',function(){b.style.transform='scale(1)';});
      b.addEventListener('click',function(){if(locked)return;userSeq.push(i);checkStep();});
      grid.appendChild(b);
    });
    c.appendChild(grid);
    var msg=document.createElement('div');msg.style.cssText='font-size:1rem;font-weight:700;color:#3d2f1f;margin:12px 0';c.appendChild(msg);

    function playSeq(){locked=true;msg.textContent='مشاهده کنید...';var i=0;var iv=setInterval(function(){
      if(i>=seq.length){clearInterval(iv);locked=false;userSeq=[];msg.textContent='نوبت شماست!';return;}
      flash(seq[i]);i++;},700);}
    function flash(idx){var btns=grid.children;btns[idx].style.transform='scale(1.3)';btns[idx].style.background=colors[idx];setTimeout(function(){btns[idx].style.transform='scale(1)';btns[idx].style.background='#fff';},400);}
    function checkStep(){var i=userSeq.length-1;if(userSeq[i]!==seq[i]){msg.textContent='اشتباه! ❌ امتیاز: '+score;setTimeout(function(){seq=[];score=0;nextRound();},1500);return;}
      if(userSeq.length===seq.length){score++;msg.textContent='آفرین! ✅ '+score;setTimeout(nextRound,800);}}
    function nextRound(){seq.push(rand(0,3));playSeq();}
    var startBtn=btn('▶ شروع',function(){startBtn.remove();nextRound();});startBtn.style.cssText+='margin:12px auto';c.appendChild(startBtn);
    active={destroy:function(){c.style.cssText='';}};
  }

  function wordSearch(c){
    clean(c);c.style.cssText += 'background:#f5f0e8;border-radius:16px;padding:12px;overflow:hidden;text-align:center';
    var words=['گربه','سگ','مرغ','ماهی','خرگوش'];
    var letters='ابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی';
    var grid=[];var G=8;
    for(var y=0;y<G;y++){grid[y]=[];for(var x=0;x<G;x++)grid[y][x]=letters[rand(0,letters.length-1)];}
    words.forEach(function(w){var dir=rand(0,1)?1:0;var sx=rand(0,G-3);var sy=rand(0,G-3);for(var i=0;i<w.length&&sx+i<G&&sy+i<G;i++){if(dir)grid[sy][sx+i]=w[i];else grid[sy+i][sx]=w[i];}});
    var tbl=document.createElement('div');tbl.style.cssText='display:inline-block;background:#fff;border-radius:12px;padding:8px;margin:8px auto';
    for(var y=0;y<G;y++){var row=document.createElement('div');row.style.cssText='display:flex;gap:2px';
    for(var x=0;x<G;x++){var cell=document.createElement('span');cell.textContent=grid[y][x];cell.style.cssText='width:32px;height:32px;display:flex;align-items:center;justify-content:center;font-size:1rem;border:1px solid #eee;border-radius:4px;cursor:pointer';
    cell.addEventListener('click',function(){this.style.background=this.style.background==='rgb(255, 184, 77)'?'#fff':'#ffb84d';});row.appendChild(cell);}tbl.appendChild(row);}
    c.appendChild(tbl);
    var wl=document.createElement('div');wl.style.cssText='margin:8px 0;font-weight:700;color:#3d2f1f';wl.textContent='کلمات: '+words.join(' - ');c.appendChild(wl);
    active={destroy:function(){c.style.cssText='';}};
  }

  function patternMatch(c){
    clean(c);c.style.cssText += 'background:#f5f0e8;border-radius:16px;padding:16px;overflow:hidden;text-align:center';
    var emojis=['🍎','🍊','🍋','🍇','🍓','🍒','🥝','🫐'];
    var seq=[];for(var i=0;i<5;i++)seq.push(emojis[rand(0,emojis.length-1)]);
    var msg=document.createElement('div');msg.style.cssText='font-size:1.1rem;font-weight:700;color:#3d2f1f;margin-bottom:12px';msg.textContent='الگو را به خاطر بسپارید:';c.appendChild(msg);
    var display=document.createElement('div');display.style.cssText='font-size:2rem;margin:12px 0;letter-spacing:8px';display.textContent=seq.join(' ');c.appendChild(display);
    var score=0;setTimeout(function(){display.textContent='❓'.repeat(5);msg.textContent='الگو را بازسازی کنید:';
    var choices=document.createElement('div');choices.style.cssText='display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:16px';
    var picked=[];
    emojis.forEach(function(e){var b=document.createElement('button');b.textContent=e;b.style.cssText='font-size:2rem;padding:8px;background:#fff;border:3px solid #ddd;border-radius:10px;cursor:pointer';
    b.addEventListener('click',function(){picked.push(e);b.style.borderColor='#6c5ce7';
    if(picked.length===seq.length){var correct=picked.every(function(v,i){return v===seq[i]});
    if(correct){score++;msg.textContent='✅ آفرین!';display.textContent=seq.join(' ');}
    else{msg.textContent='❌ درست: '+seq.join(' ');display.textContent=seq.join(' ');}
    setTimeout(function(){clean(c);patternMatch(c);},1500);}});
    choices.appendChild(b);});
    c.appendChild(choices);},2000);
    active={destroy:function(){c.style.cssText='';}};
  }

  function storyBuilder(c){
    clean(c);c.style.cssText += 'background:#f5f0e8;border-radius:16px;padding:16px;overflow:hidden';
    diffSelector(c, function(diff) { startStory(c, diff); });
    function startStory(c, diff) {
    var fullStory=['🌅 صبح شد','🧒 کودک از خواب بیدار شد','🪥 مسواک زد','🥣 صبحانه خورد','📚 به مهدکودک رفت','👫 با دوستان بازی کرد','🎨 نقاشی کشید','🍽️ ناهار خورد','😴 چُرت زد','🏠 به خانه برگشت','📖 قصه شنید','🌙 خوابید'];
    var counts = {easy:6, medium:9, hard:12};
    var n = counts[diff] || 9;
    var story = fullStory.slice(0, n);
    var order = shuffle(story.map(function (_, i) { return i; }));
    var msg=document.createElement('div');msg.style.cssText='text-align:center;font-weight:700;font-size:1.1rem;color:#3d2f1f;margin-bottom:12px';msg.textContent='داستان را با دکمه‌های ⬆️⬇️ به ترتیب درست بچینید';c.appendChild(msg);
    var list=document.createElement('div');list.style.cssText='display:flex;flex-direction:column;gap:6px;max-height:320px;overflow-y:auto;padding:4px';
    c.appendChild(list);

    function renderList() {
      list.innerHTML = '';
      order.forEach(function (storyIdx, pos) {
        var item=document.createElement('div');
        item.style.cssText='padding:10px 14px;background:#fff;border:2px solid #ddd;border-radius:10px;font-size:1rem;display:flex;align-items:center;gap:8px';
        var num=document.createElement('span');num.textContent=pos+1;num.style.cssText='min-width:24px;font-weight:700;color:#888';
        var text=document.createElement('span');text.textContent=story[storyIdx];text.style.cssText='flex:1';
        var moveUp=btn('⬆️', function () {
          if (pos === 0) return;
          var tmp = order[pos]; order[pos] = order[pos - 1]; order[pos - 1] = tmp;
          renderList();
        });
        moveUp.style.cssText += 'width:32px;height:32px;padding:0;font-size:.9rem';
        var moveDown=btn('⬇️', function () {
          if (pos === order.length - 1) return;
          var tmp = order[pos]; order[pos] = order[pos + 1]; order[pos + 1] = tmp;
          renderList();
        });
        moveDown.style.cssText += 'width:32px;height:32px;padding:0;font-size:.9rem';
        item.appendChild(num); item.appendChild(text); item.appendChild(moveUp); item.appendChild(moveDown);
        list.appendChild(item);
      });
    }
    renderList();

    var check=btn('✅ بررسی',function(){
      var correct = order.every(function (storyIdx, pos) { return storyIdx === pos; });
      msg.textContent = correct ? '🎉 آفرین! ترتیب درست است!' : '❌ هنوز درست نیست — دوباره تلاش کنید!';
    });
    check.style.cssText+='display:block;margin:12px auto 0';c.appendChild(check);
    active={destroy:function(){c.style.cssText='';}};
    } // end startStory
  }

  function magnetFish(c){
    clean(c);c.style.cssText += 'position:relative;overflow:hidden;background:linear-gradient(180deg,#006994,#00b4d8);border-radius:16px';
    diffSelector(c, function(diff) { startFish(c, diff); });
    function startFish(c, diff) {
    c.style.cssText += 'position:relative;overflow:hidden;background:linear-gradient(180deg,#006994,#00b4d8);border-radius:16px';
    var score=0,sb=document.createElement('div');scoreBoard(sb,score);sb.style.cssText='padding:8px;text-align:center;color:#fff';c.appendChild(sb);
    var fishEmojis=['🐟','🐠','🐡','🦀','🦞','🐙','🦑'];
    var counts={easy:5,medium:8,hard:12};
    var speeds={easy:4,medium:2,hard:1};
    var n=counts[diff]||8;
    for(var i=0;i<n;i++){var f=document.createElement('div');f.textContent=fishEmojis[rand(0,fishEmojis.length-1)];
    f.style.cssText='position:absolute;font-size:2rem;cursor:pointer;transition:all .3s';f.style.left=rand(5,85)+'%';f.style.top=rand(10,80)+'%';
    f.style.animation='float '+(2+rand(0,3))+'s ease-in-out infinite alternate';
    f.addEventListener('click',function(){score+=10;sb.innerHTML='';scoreBoard(sb,score);this.style.transform='scale(0) rotate(360deg)';var self=this;setTimeout(function(){self.remove();},300);});
    c.appendChild(f);}
    var style=document.createElement('style');style.textContent='@keyframes float{0%{transform:translateY(0)}100%{transform:translateY(-15px)}}';c.appendChild(style);
    var restart = btn('🔄 ماهی جدید',function(){clean(c);magnetFish(c);});restart.style.cssText+='position:absolute;top:8px;left:8px;z-index:5;color:#fff;background:rgba(255,255,255,.3)';
    c.appendChild(restart);
    active={destroy:function(){c.style.cssText='';}};
    } // end startFish
  }

  function domino(c){
    clean(c);c.style.cssText += 'background:#f5f0e8;border-radius:16px;padding:16px;overflow:hidden;text-align:center';
    var doms=[];for(var i=0;i<=6;i++)for(var j=i;j<=6;j++)doms.push([i,j]);shuffle(doms);doms=doms.slice(0,10);
    var table=document.createElement('div');table.style.cssText='display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:12px 0;min-height:60px;padding:8px;background:#fff;border-radius:12px';
    var hand=document.createElement('div');hand.style.cssText='display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-top:12px;padding:8px;background:rgba(255,255,255,.5);border-radius:12px';
    var msg=document.createElement('div');msg.style.cssText='font-weight:700;color:#3d2f1f;margin:8px 0';msg.textContent='مهره‌ها را بازی کنید';c.appendChild(msg);c.appendChild(table);c.appendChild(hand);

    function renderDom(d,clickable){
      var el=document.createElement('div');el.style.cssText='width:40px;height:70px;background:#fff;border:2px solid #6c5ce7;border-radius:8px;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:1rem;font-weight:700;gap:2px';
      el.innerHTML='<span>'+d[0]+'</span><hr style="width:80%;border:1px solid #ddd"><span>'+d[1]+'</span>';
      if(clickable)el.addEventListener('click',function(){
        table.appendChild(el);el.style.cursor='default';
        if(table.children.length>=doms.length){msg.textContent='🎉 تمام مهره‌ها بازی شد!';}
      });
      return el;
    }
    doms.forEach(function(d){hand.appendChild(renderDom(d,true));});
    active={destroy:function(){c.style.cssText='';}};
  }

  var games = {
    'balloon-pop': balloonPop, 'drawing': drawing, 'catch-fish': catchFish,
    'maze': maze, 'quiz': quiz, 'sorting': sorting, 'memory2': memory2,
    'dot-connect': dotConnect, 'bingo': bingo, 'rhythm': rhythm,
    'word-search': wordSearch, 'pattern-match': patternMatch,
    'story-builder': storyBuilder, 'magnet-fish': magnetFish, 'domino': domino
  };

  return {
    start: function(name, container) { var fn = games[name]; if (fn) fn(container); else container.innerHTML = '<p>بازی یافت نشد</p>'; },
    list: function() { return Object.keys(games); }
  };
})();

/* ادغام ۱۵ بازی اضافه از games2.js در رجیستری مشترک GAMES (games2.js بعد از games.js لود میشود) */
(function mergeGames2() {
  if (typeof GAMES === "undefined" || typeof Games2 === "undefined") return;
  Games2.list().forEach(function (id) {
    GAMES[id] = function (body) { Games2.start(id, body); };
  });
  var G2_LABELS = {
    "balloon-pop": "🎈 ترکاندن بادکنک", "drawing": "🖍️ نقاشی", "catch-fish": "🐟 گرفتن ماهی",
    "maze": "🌀 هزارتو", "quiz": "❓ مسابقه‌ی دانستنی", "sorting": "🔴 دسته‌بندی رنگ",
    "memory2": "🃏 حافظه‌ی بزرگ", "dot-connect": "🔢 نقطه به نقطه", "bingo": "🎱 بینگو",
    "rhythm": "🎵 ریتم و رنگ", "word-search": "🔤 کلمات مخفی", "pattern-match": "🍎 الگوی میوه",
    "story-builder": "📖 چیدن داستان", "magnet-fish": "🧲 ماهی‌گیری", "domino": "🁣 دومینو",
  };
  if (typeof GAME_LABELS !== "undefined") {
    for (var k in G2_LABELS) if (G2_LABELS.hasOwnProperty(k)) GAME_LABELS[k] = G2_LABELS[k];
  }
  window.__games2Clean = function () {
    if (active && active.destroy) { try { active.destroy(); } catch (e) {} }
    active = null;
  };
})();
