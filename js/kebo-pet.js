/* ═══════════ رایان — حیوان خانگی شناور سایت ═══════════ */
var RayanPet = (function () {
  var el, speechEl, imgEl;
  var state = "idle";
  var dragTimer = null;
  var isDragging = false, startX = 0, startY = 0;

  var GIFS = {
    idle:  "img/kebo/idle.gif",
    think: "img/kebo/think.gif",
    happy: "img/kebo/happy.gif",
    sad:   "img/kebo/sad.gif",
    wave:  "img/kebo/wave.gif",
    walk:  "img/kebo/walk.gif",
    sleep: "img/kebo/sleep.gif"
  };

  var MESSAGES = [
    "سلام! من رایانم 👋",
    "بیا با هم یاد بگیریم!",
    "درس خیلی fun هست!",
    "هر سوالی داری بپرس 😊",
    "من اینجام کمکت کنم!",
    "بزن بریم! 🚀"
  ];

  function create() {
    if (document.getElementById("rayan-pet")) return;

    el = document.createElement("div");
    el.id = "rayan-pet";
    el.style.cssText =
      "position:fixed;bottom:100px;right:14px;z-index:9002;cursor:pointer;" +
      "display:flex;flex-direction:column;align-items:center;user-select:none;" +
      "transition:transform 0.3s ease;pointer-events:auto;";
    el.title = "کلیک کن تا چت باز شود";

    imgEl = document.createElement("img");
    imgEl.src = GIFS.idle;
    imgEl.alt = "رایان";
    imgEl.style.cssText =
      "width:72px;height:72px;image-rendering:pixelated;border-radius:50%;" +
      "box-shadow:0 2px 10px rgba(0,0,0,0.25);";

    speechEl = document.createElement("div");
    speechEl.style.cssText =
      "position:absolute;top:-36px;left:50%;transform:translateX(-50%);" +
      "background:#fff;border-radius:12px;padding:4px 10px;font-size:12px;" +
      "white-space:nowrap;box-shadow:0 2px 8px rgba(0,0,0,0.15);opacity:0;" +
      "transition:opacity 0.3s;pointer-events:none;color:#333;";

    el.appendChild(speechEl);
    el.appendChild(imgEl);
    document.body.appendChild(el);

    /* ── click: open chat ── */
    el.addEventListener("click", function () {
      if (dragTimer) return;
      if (typeof YaranBot !== "undefined" && YaranBot.toggle) YaranBot.toggle();
    });

    /* ── drag (optional — no interference with click) ── */
    el.addEventListener("mousedown", function (e) {
      if (e.target === speechEl) return;
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      e.preventDefault();
    });

    document.addEventListener("mousemove", function (e) {
      if (!isDragging) return;
      el.style.right = "auto";
      el.style.left = (e.clientX - 36) + "px";
      el.style.top = (e.clientY - 36) + "px";
    });

    document.addEventListener("mouseup", function (e) {
      if (!isDragging) return;
      isDragging = false;
      var dx = Math.abs(e.clientX - startX);
      var dy = Math.abs(e.clientY - startY);
      if (dx > 5 || dy > 5) {
        dragTimer = setTimeout(function () { dragTimer = null; }, 200);
      }
    });

    /* ── initial wave ── */
    setTimeout(function () {
      set("wave");
      showSpeech(MESSAGES[0]);
      setTimeout(function () { set("idle"); }, 4000);
    }, 2000);

    /* ── periodic random speech ── */
    setInterval(function () {
      if (state === "idle") {
        var msg = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
        showSpeech(msg);
        set("wave");
        setTimeout(function () { set("idle"); }, 3000);
      }
    }, 25000);
  }

  function set(newState) {
    if (!el || !imgEl) return;
    if (!GIFS[newState]) return;
    state = newState;
    imgEl.src = GIFS[newState];
  }

  function showSpeech(text) {
    if (!speechEl) return;
    speechEl.textContent = text;
    speechEl.style.opacity = "1";
    clearTimeout(showSpeech._t);
    showSpeech._t = setTimeout(function () {
      speechEl.style.opacity = "0";
    }, 3500);
  }

  function init() { create(); }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  return { init: init, setState: set, say: showSpeech };
})();
