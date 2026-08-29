/* ═══════════ رایان — حیوان خانگی شناور سایت ═══════════ */
/* شخصیت انیمیشنی — تصویر ثابت + GIF فقط هنگام change */
var RayanPet = (function () {
  var el, speechEl, imgEl;
  var state = "idle";
  var dragTimer = null;

  var STATES = {
    idle:   { png: "img/kebo/idle.png",   gif: "img/kebo/idle.gif" },
    think:  { png: "img/kebo/think.png",  gif: "img/kebo/think.gif" },
    happy:  { png: "img/kebo/happy.png",  gif: "img/kebo/happy.gif" },
    sad:    { png: "img/kebo/sad.png",    gif: "img/kebo/sad.gif" },
    wave:   { png: "img/kebo/wave.png",   gif: "img/kebo/wave.gif" },
    walk:   { png: "img/kebo/walk.png",   gif: "img/kebo/walk.gif" },
    sleep:  { png: "img/kebo/sleep.png",  gif: "img/kebo/sleep.gif" }
  };

  var MESSAGES = [
    "سلام! من رایانم",
    "بیا با هم یاد بگیریم!",
    "درس خیلی fun هست!",
    "هر سوالی داری بپرس",
    "من اینجام کمکت کنم!",
    "بزن بریم!"
  ];

  function create() {
    if (document.getElementById("rayan-pet")) return;
    el = document.createElement("div");
    el.id = "rayan-pet";
    el.style.cssText = "position:fixed;bottom:90px;right:12px;z-index:899;cursor:pointer;" +
      "display:flex;flex-direction:column;align-items:center;user-select:none;" +
      "transition:transform 0.3s ease;pointer-events:auto;";
    el.title = "کلیک کن تا چت باز شود";

    imgEl = document.createElement("img");
    imgEl.src = STATES.idle.png;
    imgEl.alt = "";
    imgEl.style.cssText = "width:72px;height:72px;image-rendering:pixelated;border-radius:50%;" +
      "box-shadow:0 2px 8px rgba(0,0,0,0.2);transition:opacity 0.2s;";

    speechEl = document.createElement("div");
    speechEl.style.cssText = "position:absolute;top:-40px;left:50%;transform:translateX(-50%);" +
      "background:#fff;border-radius:12px;padding:4px 10px;font-size:12px;" +
      "white-space:nowrap;box-shadow:0 2px 6px rgba(0,0,0,0.15);opacity:0;" +
      "transition:opacity 0.3s;pointer-events:none;color:#333;";

    el.appendChild(speechEl);
    el.appendChild(imgEl);
    document.body.appendChild(el);

    el.addEventListener("click", function () {
      if (dragTimer) return;
      if (typeof YaranBot !== "undefined" && YaranBot.toggle) YaranBot.toggle();
    });

    var isDragging = false, dragOffX = 0, dragOffY = 0, startX = 0, startY = 0;

    el.addEventListener("mousedown", function (e) {
      if (e.target === speechEl) return;
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      dragOffX = e.clientX - el.offsetLeft;
      dragOffY = e.clientY - el.offsetTop;
      e.preventDefault();
    });

    document.addEventListener("mousemove", function (e) {
      if (!isDragging) return;
      el.style.right = "auto";
      el.style.left = (e.clientX - dragOffX) + "px";
      el.style.top = (e.clientY - dragOffY) + "px";
    });

    document.addEventListener("mouseup", function () {
      if (!isDragging) return;
      isDragging = false;
      var dx = Math.abs(event.clientX - startX);
      var dy = Math.abs(event.clientY - startY);
      if (dx > 5 || dy > 5) {
        dragTimer = setTimeout(function () { dragTimer = null; }, 200);
      }
    });

    setTimeout(function () {
      set("wave");
      showSpeech(MESSAGES[0]);
      setTimeout(function () { set("idle"); }, 4000);
    }, 1500);

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
    var s = STATES[newState];
    if (!s) return;
    state = newState;
    imgEl.src = s.gif;
    setTimeout(function () {
      if (state === newState) imgEl.src = s.png;
    }, 3000);
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
