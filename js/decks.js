/*
  یاران — موتور «درس تعاملی» (اسلاید‌دک) برای والدین، مربیان و کارکنان
  ────────────────────────────────────────────────────────────────────
  یک تجربه‌ی اسلایدی واقعاً تعاملی: آزمون با بازخورد، کارت‌های برگردان،
  مرتب‌سازی مراحل، مقیاس خودارزیابی، چک‌لیست و سناریو.
  استفاده: Decks.open('sep-anxiety') — داده‌ی دک‌ها در deck-data.js
*/
var Decks = (function () {
  "use strict";

  var current = null;   // {deck, idx, answers, score}
  var _prevFocus = null;

  function esc(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function faNum(n) { return (typeof YCal !== "undefined") ? YCal.num(n) : String(n); }

  /* ═══════════ باز کردن ═══════════ */
  function open(deckId) {
    var deck = (typeof DECK_LIBRARY !== "undefined") && DECK_LIBRARY.find(function (d) { return d.id === deckId; });
    if (!deck) { console.warn("[Decks] not found:", deckId); return; }
    _prevFocus = document.activeElement;
    current = { deck: deck, idx: 0, score: 0, answered: {}, reflections: {} };
    // کلید پایدار برای هر اسلاید (برای ذخیره‌ی پاسخ‌ها)
    deck.slides.forEach(function (s, i) { if (!s._k) s._k = deckId + ":" + i; });
    var overlay = document.getElementById("deck-modal");
    if (!overlay) return;
    overlay.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    render();
  }

  function close() {
    var overlay = document.getElementById("deck-modal");
    if (overlay) {
      overlay.classList.add("hidden");
      overlay.classList.remove("active");
      var shell = overlay.querySelector("#deck-shell");
      if (shell) shell.innerHTML = "";
    }
    // Also close game-modal (used for picker)
    var gameModal = document.getElementById("game-modal");
    if (gameModal) {
      gameModal.classList.add("hidden");
      gameModal.classList.remove("active");
      var gameBody = gameModal.querySelector("#game-body");
      if (gameBody) gameBody.innerHTML = "";
    }
    document.body.style.overflow = "";
    if (_prevFocus && _prevFocus.focus) try { _prevFocus.focus(); } catch (e) {}
    current = null;
  }

  /* ═══════════ رندر پوسته ═══════════ */
  function shell() {
    var c = current;
    var total = c.deck.slides.length;
    var pct = Math.round(((c.idx + 1) / total) * 100);
    var audienceFa = { parent: "والدین", teacher: "مربیان", staff: "کارکنان" };
    var audHtml = (c.deck.audience || []).map(function (a) {
      return '<span class="dk-aud">' + esc(audienceFa[a] || a) + "</span>";
    }).join("");

    return '' +
      '<header class="dk-header">' +
        '<button class="dk-btn dk-close" id="deck-close" title="بستن">' + SVGX.icon("close", 18) + "</button>" +
        '<div class="dk-head-info">' +
          '<div class="dk-title yr-display">' + esc(c.deck.icon || "🖥️") + " " + esc(c.deck.title) + "</div>" +
          '<div class="dk-meta">' + audHtml + '<span class="dk-count">اسلاید ' + faNum(c.idx + 1) + " از " + faNum(total) + "</span></div>" +
        "</div>" +
      "</header>" +
      '<div class="dk-progress"><div class="dk-progress-fill" style="width:' + pct + '%"></div>' +
        '<span class="dk-progress-pct">%' + faNum(pct) + "</span></div>" +
      '<main class="dk-stage" id="deck-stage"></main>' +
      '<footer class="dk-footer">' +
        '<button class="svgx-fab cool" id="deck-prev">‹ قبلی</button>' +
        '<div class="dk-dots" id="deck-dots"></div>' +
        (c.idx === total - 1
          ? '<button class="svgx-fab grapey pulsing" id="deck-finish">پایان 🎉</button>'
          : '<button class="svgx-fab" id="deck-next">بعدی ›</button>') +
      "</footer>";
  }

  function render() {
    var c = current;
    document.getElementById("deck-shell").innerHTML = shell();
    renderSlide();
    renderDots();
    bindShell();
  }

  function renderDots() {
    var el = document.getElementById("deck-dots");
    if (!el) return;
    var c = current;
    el.innerHTML = c.deck.slides.map(function (_, i) {
      var cls = i === c.idx ? "on" : (i < c.idx ? "done" : "");
      return '<button class="dk-dot ' + cls + '" data-i="' + i + '" title="اسلاید ' + faNum(i + 1) + '"></button>';
    }).join("");
    el.querySelectorAll(".dk-dot").forEach(function (d) {
      d.addEventListener("click", function () { current.idx = +d.dataset.i; renderSlideSoft(); });
    });
  }

  function renderSlideSoft() {
    // فقط اسلاید و هدر بدون ساخت دوباره‌ی کل (برای نرمی)
    render();
  }

  /* ═══════════ رندر هر نوع اسلاید ═══════════ */
  function renderSlide() {
    var stage = document.getElementById("deck-stage");
    var c = current;
    var s = c.deck.slides[c.idx];
    var html = "";
    switch (s.type) {
      case "title": html = slideTitle(s); break;
      case "text": html = slideText(s); break;
      case "quiz": html = slideQuiz(s); break;
      case "flip": html = slideFlip(s); break;
      case "order": html = slideOrder(s); break;
      case "scale": html = slideScale(s); break;
      case "checklist": html = slideChecklist(s); break;
      case "scenario": html = slideScenario(s); break;
      case "quote": html = slideQuote(s); break;
      default: html = slideText(s);
    }
    stage.innerHTML = '<section class="dk-slide yr-rise dk-type-' + s.type + '">' + html + "</section>";
    bindSlide(s);
  }

  function head(icon, title) {
    return '<h2 class="dk-h yr-display">' + (icon ? icon + " " : "") + esc(title) + "</h2>";
  }
  function bullets(arr) {
    return '<ul class="dk-list">' + arr.map(function (b) {
      return "<li><span class='dk-bullet'>🌸</span><span>" + b + "</span></li>";
    }).join("") + "</ul>";
  }

  function slideTitle(s) {
    return '<div class="dk-title-slide">' +
      '<div class="dk-art">' + SVGX.mascot({ size: 120 }) + "</div>" +
      '<h1 class="yr-display rainbow-shadow yr-glow">' + esc(s.title) + "</h1>" +
      (s.sub ? '<p class="dk-sub yr-editorial">' + esc(s.sub) + "</p>" : "") +
      '<div class="dk-start-hint">با دکمه‌ی «بعدی» شروع کنید ▾</div></div>';
  }

  function slideText(s) {
    var out = head(s.icon, s.title);
    if (s.paragraphs) out += s.paragraphs.map(function (p) { return '<p class="dk-p">' + p + "</p>"; }).join("");
    if (s.bullets) out += bullets(s.bullets);
    if (s.note) out += '<aside class="dk-note"><strong>💡 نکته:</strong> ' + s.note + "</aside>";
    return out;
  }

  function slideQuote(s) {
    return '<div class="dk-quote-wrap">' +
      '<div class="dk-quote-mark">❝</div>' +
      '<blockquote class="dk-quote yr-story">' + s.text + "</blockquote>" +
      (s.by ? '<div class="dk-quote-by">— ' + esc(s.by) + "</div>" : "") +
      "</div>";
  }

  /* — آزمون تک‌گزینه‌ای — */
  function slideQuiz(s) {
    var answered = current.answered[s._k] !== undefined;
    var chosen = current.answered[s._k];
    var out = head(s.icon || "🤔", s.q);
    if (s.context) out += '<p class="dk-p">' + s.context + "</p>";
    out += '<div class="dk-quiz-opts">';
    s.options.forEach(function (opt, i) {
      var cls = "dk-opt";
      if (answered) {
        if (i === s.correct) cls += " right";
        else if (i === chosen) cls += " wrong";
        else cls += " dim";
      } else if (chosen === i) cls += " picked";
      out += '<button class="' + cls + '" data-i="' + i + '">' +
        '<span class="dk-opt-letter">' + ["الف", "ب", "پ", "ت", "ث"][i] + "</span> " + opt + "</button>";
    });
    out += "</div>";
    if (answered) {
      var ok = chosen === s.correct;
      out += '<div class="dk-feedback ' + (ok ? "ok" : "no") + '">' +
        (ok ? "🎉 آفرین! درست است." : "🤔 اشکالی ندارد — پاسخ درست مشخص شد.") +
        (s.explain ? '<div class="dk-explain">' + s.explain + "</div>" : "") +
        "</div>";
    } else {
      out += '<div class="dk-hint">یک گزینه را انتخاب کنید…</div>';
    }
    return out;
  }

  /* — سناریو: موقعیت + انتخاب واکنش + بازخورد اختصاصی — */
  function slideScenario(s) {
    var answered = current.answered[s._k] !== undefined;
    var chosen = current.answered[s._k];
    var out = head(s.icon || "🎭", s.title);
    out += '<div class="dk-scenario-box"><span class="dk-scenario-label">موقعیت</span><p>' + s.situation + "</p></div>";
    out += '<div class="dk-scenario-q">' + s.question + "</div>";
    out += '<div class="dk-quiz-opts">';
    s.options.forEach(function (opt, i) {
      var fb = s.feedback[i];
      var cls = "dk-opt";
      if (answered) {
        if (fb.best) cls += " right";
        else if (i === chosen) cls += " wrong";
        else cls += " dim";
      } else if (chosen === i) cls += " picked";
      out += '<button class="' + cls + '" data-i="' + i + '"><span class="dk-opt-letter">' + ["۱", "۲", "۳", "۴"][i] + "</span> " + opt + "</button>";
    });
    out += "</div>";
    if (answered) {
      var fb2 = s.feedback[chosen];
      out += '<div class="dk-feedback ' + (fb2.best ? "ok" : "no") + '">' +
        (fb2.best ? "🌟 عالی بود! " : "💭 ") + fb2.text + "</div>";
    }
    return out;
  }

  /* — کارت‌های برگردان — */
  function slideFlip(s) {
    var out = head(s.icon || "🔄", s.title);
    out += '<div class="dk-flip-grid">';
    s.cards.forEach(function (card, i) {
      out += '<button class="dk-flip" data-i="' + i + '">' +
        '<span class="dk-flip-inner">' +
          '<span class="dk-face dk-front"><span class="dk-front-label">' + card.front + '</span><small>برای دیدن بزنید ↺</small></span>' +
          '<span class="dk-face dk-back">' + card.back + "</span>" +
        "</span></button>";
    });
    out += "</div>";
    return out;
  }

  /* — مرتب‌سازی مراحل با کلیک به ترتیب — */
  function slideOrder(s) {
    var state = current.answered[s._k];
    var done = state && state.length === s.steps.length;
    var out = head(s.icon || "📋", s.title);
    if (s.intro) out += '<p class="dk-p">' + s.intro + "</p>";
    out += '<p class="dk-order-hint">' + (done ? "✅ ترتیب کامل شد!" : "مراحل را به‌ترتیبِ درست بزنید:") + "</p>";
    out += '<ol class="dk-order-list">';
    s.steps.forEach(function (st, i) {
      var pos = state ? state.indexOf(i) : -1;
      var cls = "dk-order-item" + (pos >= 0 ? " placed" : "") + (pos >= 0 && st.order !== undefined && pos === st.order ? " okpos" : "");
      out += '<li><button class="' + cls + '" data-i="' + i + '" ' + (pos >= 0 ? "disabled" : "") + ">" +
        (pos >= 0 ? '<span class="dk-order-num">' + faNum(pos + 1) + "</span> " : "") + st.text + "</button></li>";
    });
    out += "</ol>";
    if (done) {
      out += '<button class="svgx-fab cool dk-reset" data-reset="1">↺ از نو</button>';
    }
    return out;
  }

  /* — مقیاس خودارزیابی — */
  function slideScale(s) {
    var val = current.reflections[s._k];
    var faces = ["😖", "🙁", "😐", "🙂", "😄"];
    var labels = s.labels || ["خیلی کم", "کم", "متوسط", "زیاد", "خیلی زیاد"];
    var out = head(s.icon || "🎯", s.title);
    out += '<p class="dk-p">' + s.prompt + "</p>";
    out += '<div class="dk-scale-row">';
    faces.forEach(function (f, i) {
      out += '<button class="dk-scale-opt' + (val === i ? " on" : "") + '" data-v="' + i + '">' +
        '<span class="dk-face-emoji">' + f + "</span><span class='dk-face-label'>" + labels[i] + "</span></button>";
    });
    out += "</div>";
    if (val !== undefined && s.reflect) out += '<div class="dk-feedback ok yr-rise">' + s.reflect + "</div>";
    return out;
  }

  /* — چک‌لیست — */
  function slideChecklist(s) {
    var checked = current.answered[s._k] || [];
    var all = s.items.length === checked.length;
    var out = head(s.icon || "☑️", s.title);
    if (s.intro) out += '<p class="dk-p">' + s.intro + "</p>";
    out += '<div class="dk-check-list">';
    s.items.forEach(function (it, i) {
      var on = checked.indexOf(i) >= 0;
      out += '<label class="dk-check' + (on ? " on" : "") + '"><input type="checkbox" data-i="' + i + '" ' + (on ? "checked" : "") + "/>" +
        '<span class="dk-check-box"></span><span>' + it + "</span></label>";
    });
    out += "</div>";
    if (all) out += '<div class="dk-feedback ok">🌈 همه‌ی موارد علامت خورد — چه برنامه‌ی خوبی!</div>';
    return out;
  }

  /* ═══════════ تعاملات ═══════════ */
  function bindSlide(s) {
    var stage = document.getElementById("deck-stage");
    if (!stage) return;
    var key = s._k;

    stage.querySelectorAll(".dk-quiz-opts .dk-opt").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (current.answered[key] !== undefined) return;
        current.answered[key] = +btn.dataset.i;
        var correctIdx = s.correct !== undefined ? s.correct : s.feedback.findIndex(function (f) { return f.best; });
        if (+btn.dataset.i === correctIdx) current.score++;
        renderSlide();
      });
    });

    stage.querySelectorAll(".dk-flip").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        btn.classList.toggle("flipped");
      });
    });

    var ol = stage.querySelector(".dk-order-list");
    if (ol) {
      if (!current.answered[key]) current.answered[key] = [];
      ol.querySelectorAll(".dk-order-item").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var arr = current.answered[key];
          if (arr.indexOf(+btn.dataset.i) < 0) arr.push(+btn.dataset.i);
          renderSlide();
        });
      });
    }
    var resetBtn = stage.querySelector(".dk-reset");
    if (resetBtn) resetBtn.addEventListener("click", function () {
      current.answered[key] = [];
      renderSlide();
    });

    stage.querySelectorAll(".dk-scale-opt").forEach(function (btn) {
      btn.addEventListener("click", function () {
        current.reflections[key] = +btn.dataset.v;
        renderSlide();
      });
    });

    stage.querySelectorAll(".dk-check input").forEach(function (cb) {
      cb.addEventListener("change", function () {
        var arr = current.answered[key] || [];
        var i = +cb.dataset.i;
        if (cb.checked) { if (arr.indexOf(i) < 0) arr.push(i); }
        else arr = arr.filter(function (x) { return x !== i; });
        current.answered[key] = arr;
        renderSlide();
      });
    });
  }

  /* ═══════════ ناوبری ═══════════ */
  function bindShell() {
    var next = document.getElementById("deck-next");
    var prev = document.getElementById("deck-prev");
    var fin = document.getElementById("deck-finish");
    var closeBtn = document.getElementById("deck-close");
    if (next) next.addEventListener("click", function () { if (current.idx < current.deck.slides.length - 1) { current.idx++; render(); } });
    if (prev) prev.addEventListener("click", function () { if (current.idx > 0) { current.idx--; render(); } });
    if (fin) fin.addEventListener("click", finish);
    if (closeBtn) closeBtn.addEventListener("click", close);
  }

  function finish() {
    var c = current;
    var quizCount = 0;
    c.deck.slides.forEach(function (s) { if (s.type === "quiz" || s.type === "scenario") quizCount++; });
    var stars = quizCount ? Math.max(1, Math.round((c.score / quizCount) * 3)) : 3;
    var stage = document.getElementById("deck-stage");
    var starHtml = [1, 2, 3].map(function (i) {
      return '<span class="dk-star' + (i <= stars ? " on" : "") + '">⭐</span>';
    }).join("");
    stage.innerHTML =
      '<div class="dk-done yr-rise">' +
        '<div class="dk-stars">' + starHtml + "</div>" +
        "<h2 class='yr-display'>درس را تمام کردید! 🎉</h2>" +
        (quizCount ? '<p>پاسخ‌های درست: ' + faNum(c.score) + " از " + faNum(quizCount) + "</p>" : "") +
        (c.deck.takeaway ? '<div class="dk-takeaway"><strong>🌱 یادتان باشد:</strong> ' + c.deck.takeaway + "</div>" : "") +
        '<div style="margin-top:14px;display:flex;gap:8px;justify-content:center;flex-wrap:wrap;">' +
          '<button class="svgx-fab cool" id="dk-restart">↺ از ابتدا</button>' +
          '<button class="svgx-fab grapey" id="dk-close-end">بستن</button>' +
        "</div></div>";
    var footer = stage.closest(".deck-shell").querySelector(".dk-footer");
    if (footer) footer.style.visibility = "hidden";
    document.getElementById("dk-restart").addEventListener("click", function () {
      current.idx = 0; current.score = 0; current.answered = {}; current.reflections = {};
      if (footer) footer.style.visibility = "";
      render();
    });
    document.getElementById("dk-close-end").addEventListener("click", close);
  }

  /* کلیدها و سوایپ */
  document.addEventListener("keydown", function (e) {
    var overlay = document.getElementById("deck-modal");
    if (!overlay || overlay.classList.contains("hidden")) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft" && current && current.idx < current.deck.slides.length - 1) { current.idx++; render(); }
    else if (e.key === "ArrowRight" && current && current.idx > 0) { current.idx--; render(); }
  });
  document.addEventListener("click", function (e) {
    var overlay = document.getElementById("deck-modal");
    if (overlay && !overlay.classList.contains("hidden") && e.target === overlay) close();
  });
  // سوایپ لمسی
  (function () {
    var x0 = null;
    document.addEventListener("touchstart", function (e) {
      var overlay = document.getElementById("deck-modal");
      if (overlay && !overlay.classList.contains("hidden")) x0 = e.touches[0].clientX;
    }, { passive: true });
    document.addEventListener("touchend", function (e) {
      var overlay = document.getElementById("deck-modal");
      if (!overlay || overlay.classList.contains("hidden") || x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      x0 = null;
      if (Math.abs(dx) < 60) return;
      if (dx > 0 && current && current.idx > 0) { current.idx--; render(); }           // سوایپ راست → قبلی (RTL)
      if (dx < 0 && current && current.idx < current.deck.slides.length - 1) { current.idx++; render(); }
    }, { passive: true });
  })();

  /* ═══════════ انتخابگر (picker) ═══════════ */
  function picker(audience) {
    var list = (typeof DECK_LIBRARY !== "undefined") ? DECK_LIBRARY.filter(function (d) {
      return !audience || (d.audience || []).indexOf(audience) >= 0;
    }) : [];
    var html = '<div class="dk-picker-grid">';
    list.forEach(function (d) {
      html += '<button class="dk-picker-card" data-id="' + d.id + '">' +
        '<span class="dp-icon">' + (d.icon || "🖥️") + "</span>" +
        '<span class="dp-title">' + d.title + "</span>" +
        '<span class="dp-desc">' + (d.desc || "") + "</span>" +
        '<span class="dp-len">' + ((d.slides || []).length) + " اسلاید</span>" +
        "</button>";
    });
    html += "</div>";
    return html;
  }

  return { open: open, close: close, picker: picker };
})();
