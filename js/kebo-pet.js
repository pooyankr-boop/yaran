/* ═══════════ رایان — پت شناور (روش هرمس petdex) ═══════════ */
/* spritesheet 1536×2288، 11 state، فریم 192×208 */
/* پینگ‌پنگ = بدون پرش، بدون غیب/ظاهر. قابل درگ. کلیک = چت */
var RayanPet = (function () {
  "use strict";

  var SHEET = "img/kebo/spritesheet.png";
  var FW = 192, FH = 208;
  var COLS = 8;

  /* n = تعداد فریم واقعی هر ردیف (فریمهای خالی سورس کنار گذاشته شده) */
  var STATES = {
    idle:    { row: 0,  n: 7, fps: 6 },
    walk:    { row: 1,  n: 8, fps: 8 },
    run:     { row: 2,  n: 8, fps: 10 },
    wave:    { row: 3,  n: 4, fps: 6, once: true, next: "idle" },
    happy:   { row: 4,  n: 5, fps: 8, once: true, next: "idle" },
    sleep:   { row: 5,  n: 8, fps: 3 },
    think:   { row: 6,  n: 6, fps: 5 },
    curious: { row: 7,  n: 6, fps: 5, once: true, next: "idle" },
    shy:     { row: 8,  n: 6, fps: 5, once: true, next: "idle" },
    sad:     { row: 9,  n: 8, fps: 5 },
    cheer:   { row: 10, n: 8, fps: 8, once: true, next: "idle" }
  };

  var FLOURISH = ["curious", "shy", "happy", "cheer", "wave"];

  var el, spriteEl, speechEl;
  var state = "idle";
  var inited = false;
  var frameIdx = 0;
  var lastFrameTime = 0;
  var seq = [0], seqPos = 0;
  var wasDragged = false;
  var lastInteract = Date.now();

  /* ═══ دنباله پینگ‌پنگ: 0..n-1..0 — هیچ گذر نامیزانی نیست ═══ */
  function buildSeq(n) {
    seq = [];
    var i;
    for (i = 0; i < n; i++) seq.push(i);
    for (i = n - 2; i >= 1; i--) seq.push(i);
    seqPos = 0;
  }

  function drawFrame(f, row) {
    frameIdx = f;
    spriteEl.style.backgroundPosition =
      (-f * (FW / 2)) + "px " + (-row * (FH / 2)) + "px";
  }

  /* ═══ ساخت DOM ═══ */
  function create() {
    if (inited) return;
    el = document.getElementById("rayan-pet");
    if (!el) {
      el = document.createElement("div");
      el.id = "rayan-pet";
      document.body.appendChild(el);
    }

    var w = 96, h = 104;   // فریم 192×208 در نصف سایز

    el.innerHTML =
      '<div class="rayan-sprite" style="width:' + w + 'px;height:' + h + 'px;' +
      'background-image:url(' + SHEET + ');' +
      'background-size:' + (COLS * w) + 'px ' + (11 * h) + 'px;' +
      'background-position:0px 0px;background-repeat:no-repeat;"></div>' +
      '<div class="rayan-speech" style="display:none;"></div>';

    el.style.cssText =
      "position:fixed;bottom:20px;left:20px;z-index:9002;width:" + w + "px;height:" + h + "px;" +
      "cursor:grab;user-select:none;touch-action:none;";

    spriteEl = el.querySelector(".rayan-sprite");
    speechEl = el.querySelector(".rayan-speech");
    speechEl.style.cssText =
      "position:absolute;bottom:calc(100% + 8px);right:0;display:none;" +
      "background:#fff;border:2px solid #7c3aed;border-radius:10px;padding:6px 10px;" +
      "font:13px Tahoma,sans-serif;color:#333;white-space:nowrap;direction:rtl;" +
      "box-shadow:0 2px 8px rgba(0,0,0,.2);";

    bindDrag();
    bindClick();
    lifeTimer();
    setState("idle");
    requestAnimationFrame(tick);
    inited = true;
  }

  /* ═══ حلقه انیمیشن — پینگ‌پنگ، فریم ۰ همیشه رسم میشود ═══ */
  function tick(t) {
    requestAnimationFrame(tick);
    var st = STATES[state];
    if (!st || !spriteEl) return;
    var interval = 1000 / st.fps;
    if (t - lastFrameTime < interval) return;
    lastFrameTime = t;
    seqPos++;
    if (seqPos >= seq.length) {
      if (st.once) {           /* پخش یکباره تمام شد (در فریم ۰) → state بعدی */
        setState(st.next || "idle");
        drawFrame(seq[0], STATES[state].row);
        return;
      }
      seqPos = 0;
    }
    drawFrame(seq[seqPos], st.row);
  }

  /* ═══ تعویض state ═══ */
  function setState(name) {
    if (!STATES[name]) name = "idle";
    if (name !== state) {
      state = name;
      buildSeq(STATES[name].n);
      lastFrameTime = 0;
    }
    if (spriteEl && STATES[state]) drawFrame(seq[seqPos], STATES[state].row);
  }

  /* ═══ زندگی خودکار: حالات اتفاقی + خواب بعد از بیتفاوتی ═══ */
  function lifeTimer() {
    setInterval(function () {
      if (!inited || state !== "idle") return;
      if (Date.now() - lastInteract > 90000) { setState("sleep"); return; }
      if (Math.random() < 0.35) {
        setState(FLOURISH[Math.floor(Math.random() * FLOURISH.length)]);
      }
    }, 15000);
  }

  /* ═══ درگ ═══ */
  function bindDrag() {
    var dragging = false, startX, startY, origX, origY;

    el.addEventListener("pointerdown", function (e) {
      lastInteract = Date.now();
      if (state === "sleep") setState("idle");
      dragging = true; wasDragged = false;
      startX = e.clientX; startY = e.clientY;
      var r = el.getBoundingClientRect();
      origX = r.left; origY = r.top;
      try { el.setPointerCapture(e.pointerId); } catch (err) {}
      el.style.cursor = "grabbing";
      e.preventDefault();
    });

    el.addEventListener("pointermove", function (e) {
      if (!dragging) return;
      var dx = e.clientX - startX, dy = e.clientY - startY;
      if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
        wasDragged = true;
        el.style.left = (origX + dx) + "px";
        el.style.top = (origY + dy) + "px";
        el.style.bottom = "auto";
      }
      e.preventDefault();
    });

    var endDrag = function () {
      if (!dragging) return;
      dragging = false;
      lastInteract = Date.now();
      el.style.cursor = "grab";
      if (state === "think") setState("idle");
    };
    el.addEventListener("pointerup", endDrag);
    el.addEventListener("pointercancel", endDrag);
  }

  /* ═══ کلیک (بدون درگ) → چت ═══ */
  function bindClick() {
    el.addEventListener("click", function () {
      lastInteract = Date.now();
      if (wasDragged) { wasDragged = false; return; }
      if (typeof YaranBot !== "undefined" && YaranBot.toggle) {
        YaranBot.toggle();
      } else {
        say("چت اینجا نیست!");
      }
    });
  }

  /* ═══ حرف زدن ═══ */
  function say(text, ms) {
    if (!speechEl) return;
    speechEl.textContent = text;
    speechEl.style.display = "block";
    setState("wave");
    clearTimeout(say._t);
    say._t = setTimeout(function () {
      speechEl.style.display = "none";
      setState("idle");
    }, ms || 2500);
  }

  /* ═══ init خودکار ═══ */
  function init() { create(); }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  return { init: init, setState: setState, say: say };
})();
