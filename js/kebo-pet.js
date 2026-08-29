/* ═══════════ Kebo — حیوان خانگی شناور سایت ═══════════ */
/* شخصیت انیمیشنی با GIFهای مجزا — بدون sprite sheet */
var KeboPet = (function () {
  var el, speechEl, imgEl;
  var state = "idle";
  var speechTimer = null;
  var moveTimer = null;
  var isDragging = false;
  var dragOffX = 0, dragOffY = 0;

  var STATES = {
    idle:  "img/kebo/idle.gif",
    walk:  "img/kebo/walk.gif",
    think: "img/kebo/think.gif",
    happy: "img/kebo/happy.gif",
    sad:   "img/kebo/sad.gif",
    wave:  "img/kebo/wave.gif",
    sleep: "img/kebo/sleep.gif"
  };

  var MESSAGES = [
    "سلام! من یارانم",
    "بیا با هم یاد بگیریم!",
    "درس خیلی fun هست!",
    "هر سوالی داری بپرس",
    "من اینجام کمکت کنم!",
    "بزن بریم! "
  ];

  function create() {
    if (document.getElementById("kebo-pet")) return;
    el = document.createElement("div");
    el.id = "kebo-pet";
    el.style.cssText = "position:fixed;bottom:90px;right:12px;z-index:899;cursor:pointer;" +
      "display:flex;flex-direction:column;align-items:center;user-select:none;" +
      "transition:transform 0.3s ease;pointer-events:auto;";
    el.title = "کلیک کن تا چت باز شود";

    imgEl = document.createElement("img");
    imgEl.src = STATES.idle;
    imgEl.alt = "";
    imgEl.style.cssText = "width:72px;height:72px;image-rendering:pixelated;border-radius:50%;" +
      "box-shadow:0 2px 8px rgba(0,0,0,0.2);";

    speechEl = document.createElement("div");
    speechEl.style.cssText = "position:absolute;top:-40px;left:50%;transform:translateX(-50%);" +
      "background:#fff;border-radius:12px;padding:4px 10px;font-size:12px;" +
      "white-space:nowrap;box-shadow:0 2px 6px rgba(0,0,0,0.15);opacity:0;" +
      "transition:opacity 0.3s;pointer-events:none;color:#333;";

    el.appendChild(speechEl);
    el.appendChild(imgEl);
    document.body.appendChild(el);

    el.addEventListener("click", function () {
      if (typeof Chatbot !== "undefined" && Chatbot.toggle) Chatbot.toggle();
    });

    // Drag
    el.addEventListener("mousedown", function (e) {
      if (e.target === speechEl) return;
      isDragging = true;
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
    document.addEventListener("mouseup", function () { isDragging = false; });

    setTimeout(function () {
      set("wave");
      showSpeech("سلام! من یارانم ");
      setTimeout(function () { set("idle"); }, 3000);
    }, 2000);

    scheduleRandom();
  }

  function set(s) {
    if (!el || state === s) return;
    state = s;
    if (STATES[s]) imgEl.src = STATES[s];
  }

  function showSpeech(text) {
    if (!speechEl) return;
    speechEl.textContent = text;
    speechEl.style.opacity = "1";
    clearTimeout(speechTimer);
    speechTimer = setTimeout(function () { speechEl.style.opacity = "0"; }, 4000);
  }

  function scheduleRandom() {
    var delay = 15000 + Math.random() * 25000;
    clearTimeout(moveTimer);
    moveTimer = setTimeout(function () {
      var r = Math.random();
      if (r < 0.3) {
        set("walk");
        setTimeout(function () { set("idle"); }, 2000);
      } else if (r < 0.5) {
        set("happy");
        showSpeech(MESSAGES[Math.floor(Math.random() * MESSAGES.length)]);
        setTimeout(function () { set("idle"); }, 3000);
      } else if (r < 0.7) {
        set("wave");
        showSpeech(MESSAGES[Math.floor(Math.random() * MESSAGES.length)]);
        setTimeout(function () { set("idle"); }, 2000);
      }
      scheduleRandom();
    }, delay);
  }

  return {
    init: create,
    set: set,
    say: showSpeech
  };
})();

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function () { KeboPet.init(); });
} else {
  KeboPet.init();
}
