/*
  یاران — بازی‌های نسل ۳ (games3) — با گرافیک SVG متحرک
  ادغام در همان رجیستری مشترک GAMES مثل games2
*/
var Games3 = (function () {
  "use strict";

  var active = null;
  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function faNum(n) { return (typeof YCal !== "undefined") ? YCal.num(n) : String(n); }
  function shuf(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }

  /* قالب پایه‌ی هر بازی */
  function base(container, title, subtitle, bodyHtml) {
    container.innerHTML =
      '<div class="g3-wrap">' +
        '<div class="g3-head"><span class="g3-title yr-display">' + title + '</span>' +
        (subtitle ? '<span class="g3-sub">' + subtitle + "</span>" : "") + "</div>" +
        '<div class="g3-body">' + bodyHtml + "</div>" +
      "</div>";
    return container.querySelector(".g3-body");
  }
  function winBanner(bodyEl, msg, onAgain) {
    var b = document.createElement("div");
    b.className = "g3-win";
    b.innerHTML =
      '<div class="g3-win-stars">⭐⭐⭐</div>' +
      '<div class="g3-win-msg yr-display">' + msg + '</div>' +
      '<button class="svgx-fab grapey g3-again">↺ دوباره</button>';
    bodyEl.appendChild(b);
    b.querySelector(".g3-again").addEventListener("click", onAgain);
  }
  function difficultyPicker(labels, onPick) {
    return '<div class="g3-diff">' + labels.map(function (l, i) {
      return '<button class="svgx-fab cool" data-d="' + i + '">' + l + "</button>";
    }).join("") + "</div>";
  }

  /* ═══════════ ۱) سایه‌ها — تطبیق شکل با سایه ═══════════ */
  var SHADOW_ITEMS = [
    { e: "🐘", n: "فیل" }, { e: "🦒", n: "زرافه" }, { e: "🐟", n: "ماهی" }, { e: "🦋", n: "پروانه" },
    { e: "🍎", n: "سیب" }, { e: "🚗", n: "ماشین" }, { e: "🏠", n: "خانه" }, { e: "🌳", n: "درخت" },
    { e: "⭐", n: "ستاره" }, { e: "🎈", n: "بادکنک" }, { e: "🐢", n: "لاک‌پشت" }, { e: "☂️", n: "چتر" }
  ];
  function shadowMatch(container) {
    var body = base(container, "🔍 سایه‌ی کیست؟", "شکل درست را به سایه‌اش وصل کن");
    var round = 0, score = 0, TOTAL = 8;
    function nextRound() {
      if (round >= TOTAL) {
        winBanner(bodyEl, "همه را یافتی! " + faNum(score) + " امتیاز", start);
        return;
      }
      var pool = shuf(SHADOW_ITEMS).slice(0, 4);
      var target = pool[Math.floor(Math.random() * pool.length)];
      bodyEl.innerHTML =
        '<div class="g3-target"><div class="g3-q-line">سایه‌ی کدام است؟</div>' +
        '<div class="g3-shadow">' + target.e + "</div></div>" +
        '<div class="g3-opts">' + shuf(pool).map(function (p, i) {
          return '<button class="g3-opt-btn" data-n="' + p.n + '">' + p.e + "</button>";
        }).join("") + "</div>" +
        '<div class="g3-progress">' + faNum(round + 1) + " از " + faNum(TOTAL) + "</div>";
      bodyEl.querySelectorAll(".g3-opt-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var ok = btn.dataset.n === target.n;
          btn.classList.add(ok ? "right" : "wrong");
          if (ok) { score++; round++; setTimeout(nextRound, 550); }
          else { btn.disabled = true; }
        });
      });
    }
    var bodyEl;
    function start() { round = 0; score = 0; bodyEl = base(container, "🔍 سایه‌ی کیست؟", "شکل درست را به سایه‌اش وصل کن"); nextRound(); }
    start();
    active = { destroy: function () { } };
  }

  /* ═══════════ ۲) باغچه‌ی شمارش ═══════════ */
  function countGarden(container) {
    var FLOWERS = ["🌷", "🌻", "🌸", "🌺", "🌼"];
    var maxN = 5;
    var bodyEl = null, streak = 0;

    function ask() {
      var f = FLOWERS[Math.floor(Math.random() * FLOWERS.length)];
      var n = 2 + Math.floor(Math.random() * maxN);
      var garden = "";
      for (var i = 0; i < n; i++) {
        garden += '<span class="g3-flower" style="animation-delay:' + (i * .18) + 's;transform:rotate(' + ((Math.random() * 24) - 12) + 'deg)">' + f + "</span>";
      }
      var opts = shuf([n, n + 1, Math.max(1, n - 1)]);
      bodyEl.innerHTML =
        '<div class="g3-garden">' + garden + "</div>" +
        '<div class="g3-q-line">چند تا گل توی باغچه است؟</div>' +
        '<div class="g3-num-opts">' + opts.map(function (o) {
          return '<button class="g3-num" data-v="' + o + '">' + faNum(o) + "</button>";
        }).join("") + "</div>";
      bodyEl.querySelectorAll(".g3-num").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var ok = +btn.dataset.v === n;
          btn.classList.add(ok ? "right" : "wrong");
          if (ok) {
            streak++;
            if (streak % 5 === 0 && maxN < 10) maxN++;
            setTimeout(ask, 600);
          } else {
            btn.disabled = true;
          }
        });
      });
    }
    bodyEl = base(container, "🌻 باغچه‌ی شمارش", "گل‌ها را بشمار و عدد درست را بزن");
    ask();
    active = { destroy: function () { } };
  }

  /* ═══════════ ۳) حباب‌های الفبا ═══════════ */
  function alphabetBubbles(container) {
    var LETTERS = ["ا", "ب", "پ", "ت", "س", "ج", "م", "ن", "ر", "د", "ک", "گ", "و", "ه", "ی", "ش", "ل", "ف"];
    var COLORS = ["#ff6b6b22,#ff6b6b55", "#ffd93d33,#ffd93d66", "#6bcb7722,#6bcb7755", "#4d96ff22,#4d96ff55", "#9b59d022,#9b59d055"];
    var target = "", hits = 0, GOAL = 8, timer = null, bodyEl;

    function spawn() {
      var field = bodyEl.querySelector(".g3-bubble-field");
      if (!field || hits >= GOAL) return;
      var b = document.createElement("button");
      var letter = Math.random() < .45 ? target : LETTERS[Math.floor(Math.random() * LETTERS.length)];
      var c = COLORS[Math.floor(Math.random() * COLORS.length)];
      b.className = "g3-bubble";
      b.style.background = "radial-gradient(circle at 32% 28%, #ffffffcc, transparent 42%), linear-gradient(135deg," + c + ")";
      b.style.left = (5 + Math.random() * 80) + "%";
      b.style.animationDuration = (5 + Math.random() * 4) + "s";
      b.textContent = letter;
      b.addEventListener("click", function () {
        if (letter === target) {
          hits++;
          b.classList.add("popped");
          updateHud();
          if (hits >= GOAL) { clearInterval(timer); winBanner(bodyEl, "حباب‌ها ترکیدند! 🎉", start); }
        } else {
          b.classList.add("missed");
          setTimeout(function () { b.remove(); }, 350);
          return;
        }
        setTimeout(function () { b.remove(); }, 300);
      });
      field.appendChild(b);
      setTimeout(function () { b.remove(); }, 9500);
    }
    function updateHud() {
      var h = bodyEl.querySelector(".g3-hud");
      if (h) h.textContent = faNum(hits) + " / " + faNum(GOAL);
    }
    function start() {
      hits = 0; target = LETTERS[Math.floor(Math.random() * LETTERS.length)];
      bodyEl = base(container, "🫧 حباب‌های الفبا",
        'حباب‌های «<b class="g3-target-letter">' + target + '</b>» را پاره کن! <span class="g3-hud"></span>');
      bodyEl.insertAdjacentHTML("beforeend", '<div class="g3-bubble-field"></div>');
      updateHud();
      clearInterval(timer);
      for (var i = 0; i < 5; i++) setTimeout(spawn, i * 700);
      timer = setInterval(spawn, 1100);
    }
    start();
    active = { destroy: function () { clearInterval(timer); } };
  }

  /* ═══════════ ۴) بزرگ و کوچک — سبدبندی اندازه ═══════════ */
  function sizeSort(container) {
    var ITEMS = ["⚽", "🎈", "🍎", "🧸", "🐟", "🌸"];
    var bodyEl, item, sizePx, correctBig;

    function ask() {
      item = ITEMS[Math.floor(Math.random() * ITEMS.length)];
      sizePx = 26 + Math.floor(Math.random() * 40);
      correctBig = Math.random() < .5 ? true : false; // آیا این «بزرگ» است؟ مرز ۴۵px
      var isBig = sizePx >= 46;
      bodyEl.innerHTML =
        '<div class="g3-size-stage"><span class="g3-size-item" style="font-size:' + (sizePx * 1.6) + 'px">' + item + "</span></div>" +
        '<div class="g3-size-btns">' +
          '<button class="g3-num g3-big" data-k="big">بزرگ 🐘</button>' +
          '<button class="g3-num g3-small" data-k="small">کوچک 🐜</button>' +
        "</div>";
      bodyEl.querySelectorAll("[data-k]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var ok = (btn.dataset.k === "big") === isBig;
          btn.classList.add(ok ? "right" : "wrong");
          if (ok) setTimeout(ask, 500); else btn.disabled = true;
        });
      });
    }
    bodyEl = base(container, "📏 بزرگ یا کوچک؟", "اندازه‌ی شکل را درست تشخیص بده");
    ask();
    active = { destroy: function () { } };
  }

  /* ═══════════ ۵) جادوی رنگ ═══════════ */
  function colorMix(container) {
    var MIXES = [
      { a: "🔴", b: "🟡", r: "🟠", an: "قرمز", bn: "زرد", rn: "نارنجی" },
      { a: "🔵", b: "🟡", r: "🟢", an: "آبی", bn: "زرد", rn: "سبز" },
      { a: "🔴", b: "🔵", r: "🟣", an: "قرمز", bn: "آبی", rn: "بنفش" },
      { a: "⚪", b: "⚫", r: "⚪", an: "سفید", bn: "مشکی", rn: "خاکستری" }
    ];
    var idx = 0, score = 0, bodyEl;

    function ask() {
      var m = MIXES[idx % MIXES.length];
      var opts = shuf(MIXES.map(function (x) { return x.rn; }));
      bodyEl.innerHTML =
        '<div class="g3-mix-stage">' +
          '<span class="g3-drop d1">' + m.a + "</span>" +
          '<span class="g3-plus">＋</span>' +
          '<span class="g3-drop d2">' + m.b + "</span>" +
          '<span class="g3-plus">＝</span>' +
          '<span class="g3-drop d3">❓</span>' +
        "</div>" +
        '<div class="g3-q-line">چه رنگی ساخته می‌شود؟</div>' +
        '<div class="g3-opts">' + opts.map(function (o) {
          return '<button class="g3-opt-btn">' + o + "</button>";
        }).join("") + "</div>";
      bodyEl.querySelectorAll(".g3-opt-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var ok = btn.textContent.trim() === m.rn;
          btn.classList.add(ok ? "right" : "wrong");
          if (!ok) { btn.disabled = true; return; }
          score++;
          var q = bodyEl.querySelector(".g3-drop.d3");
          q.textContent = m.r;
          q.classList.add("reveal");
          setTimeout(function () {
            idx++;
            if (idx >= MIXES.length * 2) winBanner(bodyEl, "جادوگر رنگ شدی! 🎨", start);
            else ask();
          }, 900);
        });
      });
    }
    function start() { idx = 0; score = 0; bodyEl = base(container, "🎨 جادوی رنگ", "رنگ‌ها را ترکیب کن!"); ask(); }
    start();
    active = { destroy: function () { } };
  }

  /* ═══════════ ۶) غذا دادن به هیولای مهربان ═══════════ */
  function feedMonster(container) {
    var FOODS = [
      { e: "🍪", n: "کلوچه" }, { e: "🍓", n: "توت‌فرنگی" }, { e: "🍕", n: "پیتزا" },
      { e: "🍌", n: "موز" }, { e: "🧁", n: "کیک" }, { e: "🍉", n: "هندوانه" }
    ];
    var fed = 0, GOAL = 6, want = null, bodyEl;

    function monsterSvg(mood) {
      // هیولای SVG متحرک — دهان بر اساس خلق‌وخو
      var mouth = mood === "chew"
        ? '<ellipse cx="50" cy="62" rx="17" ry="13" fill="#3a1f4e"/>'
        : mood === "happy"
          ? '<path d="M33 56 Q50 78 67 56 Q50 68 33 56 z" fill="#3a1f4e"/>'
          : '<path d="M35 60 h30 v14 a15 15 0 0 1 -30 0 z" fill="#3a1f4e"/>';
      return '<svg viewBox="0 0 100 100" class="g3-monster">' +
        '<g class="gm-body">' +
          '<rect x="18" y="20" width="64" height="70" rx="26" fill="#9b59d0"/>' +
          '<circle cx="38" cy="44" r="8.5" fill="#fff"/><circle cx="62" cy="44" r="8.5" fill="#fff"/>' +
          '<circle class="gm-eye" cx="39" cy="45" r="3.8" fill="#23103a"/><circle class="gm-eye" cx="61" cy="45" r="3.8" fill="#23103a"/>' +
          mouth +
          '<line x1="26" y1="14" x2="34" y2="24" stroke="#7c3fb3" stroke-width="4" stroke-linecap="round"/>' +
          '<line x1="74" y1="14" x2="66" y2="24" stroke="#7c3fb3" stroke-width="4" stroke-linecap="round"/>' +
        '</g></svg>';
    }

    function ask(mood) {
      want = FOODS[Math.floor(Math.random() * FOODS.length)];
      var tray = shuf(FOODS);
      bodyEl.querySelector(".g3-monster-slot").innerHTML = monsterSvg(mood || "open");
      bodyEl.querySelector(".g3-want").innerHTML = "من <b>" + want.e + " " + want.n + "</b> می‌خواهم!";
      var trayEl = bodyEl.querySelector(".g3-tray");
      trayEl.innerHTML = tray.map(function (f) {
        return '<button class="g3-food" data-n="' + f.n + '">' + f.e + "</button>";
      }).join("");
      trayEl.querySelectorAll(".g3-food").forEach(function (btn) {
        btn.addEventListener("click", function () {
          if (btn.dataset.n === want.n) {
            fed++;
            bodyEl.querySelector(".g3-monster-slot").innerHTML = monsterSvg("happy");
            updateHud();
            setTimeout(function () {
              if (fed >= GOAL) winBanner(bodyEl, "هیولا سیر شد! 😋", start);
              else ask();
            }, 750);
          } else {
            btn.classList.add("shake-x");
            setTimeout(function () { btn.classList.remove("shake-x"); }, 450);
          }
        });
      });
    }
    function updateHud() {
      var h = bodyEl.querySelector(".g3-hud");
      if (h) h.textContent = faNum(fed) + " / " + faNum(GOAL);
    }
    function start() {
      fed = 0;
      bodyEl = base(container, "👾 هیولای گرسنه",
        '<span class="g3-want"></span> <span class="g3-hud"></span>');
      bodyEl.insertAdjacentHTML("beforeend",
        '<div class="g3-monster-slot"></div><div class="g3-tray"></div>');
      updateHud();
      ask();
    }
    start();
    active = { destroy: function () { } };
  }

  /* ═══════════ ثبت در رجیستری مشترک ═══════════ */
  var games = {
    "shadow-match": shadowMatch,
    "count-garden": countGarden,
    "alphabet-bubbles": alphabetBubbles,
    "size-sort": sizeSort,
    "color-mix": colorMix,
    "feed-monster": feedMonster
  };

  return {
    start: function (name, container) {
      var fn = games[name];
      if (fn) fn(container);
      else container.innerHTML = "<p>بازی یافت نشد</p>";
    },
    list: function () { return Object.keys(games); }
  };
})();

/* ادغام در رجیستری مشترک GAMES (این فایل بعد از games.js/games2.js لود می‌شود) */
(function mergeGames3() {
  if (typeof GAMES === "undefined" || typeof Games3 === "undefined") return;
  Games3.list().forEach(function (id) {
    GAMES[id] = function (body) { Games3.start(id, body); };
  });
  var G3_LABELS = {
    "shadow-match": "🔍 سایه‌ی کیست؟",
    "count-garden": "🌻 باغچه‌ی شمارش",
    "alphabet-bubbles": "🫧 حباب‌های الفبا",
    "size-sort": "📏 بزرگ یا کوچک؟",
    "color-mix": "🎨 جادوی رنگ",
    "feed-monster": "👾 هیولای گرسنه"
  };
  if (typeof GAME_LABELS !== "undefined") {
    for (var k in G3_LABELS) if (G3_LABELS.hasOwnProperty(k)) GAME_LABELS[k] = G3_LABELS[k];
  }
  window.__games3Clean = function () {};
})();
