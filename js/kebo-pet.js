/* ═══════════ Kebo — حیوان خانگی شناور سایت ═══════════ */
/* شخصیت انیمیشنی که روی صفحه قدم میزند و با کاربر تعامل دارد */
var KeboPet = (function () {
  var el, speechEl, spriteEl;
  var state = "idle";
  var x = 0, y = 0;
  var targetX = 0;
  var moveTimer = null;
  var speechTimer = null;
  var facingLeft = false;

  var GREETINGS = [
    "سلام! 🌟",
    "خوش اومدی! 😊",
    "حالت چطوره؟",
    "بیا بازی کنیم! 🎮",
    "درس داریم امروز! 📚",
    "musiqi گوش بده! 🎵",
    "من کبو هستم! 🐨",
  ];

  var STATE_MSGS = {
    idle: "من اینجام! 😊",
    walk: "دارم قدم میزنم... 🚶",
    wave: "سلام! 👋",
    happy: "خوشحالم! ✨",
    sleep: "z z z... 😴",
  };

  function create() {
    if (document.getElementById("kebo-pet")) return;
    el = document.createElement("div");
    el.id = "kebo-pet";
    el.className = "kebo-pet";
    el.innerHTML =
      '<div class="kebo-speech" id="kebo-speech"></div>' +
      '<div class="kebo-sprite" data-state="idle"></div>' +
      '<div class="kebo-name">Kebo</div>';
    document.body.appendChild(el);

    spriteEl = el.querySelector(".kebo-sprite");
    speechEl = document.getElementById("kebo-speech");

    // Random position
    x = Math.max(20, Math.random() * (window.innerWidth - 120));
    y = window.innerHeight - 180;
    el.style.left = x + "px";
    el.style.bottom = "auto";
    el.style.top = y + "px";

    // Click = open chat
    el.addEventListener("click", function () {
      if (typeof YaranBot !== "undefined" && YaranBot.toggle) YaranBot.toggle();
      else {
        var fab = document.getElementById("yr-chat-fab");
        if (fab) fab.click();
      }
      say("بیا چت کنیم! 💬");
      setState("wave");
      setTimeout(function () { setState("idle"); }, 2000);
    });

    // Hover
    el.addEventListener("mouseenter", function () {
      setState("wave");
      say(STATE_MSGS.wave);
    });
    el.addEventListener("mouseleave", function () {
      setState("idle");
    });

    // Start walking
    setTimeout(function () {
      say(GREETINGS[Math.floor(Math.random() * GREETINGS.length)]);
      setState("wave");
      setTimeout(function () {
        setState("idle");
        startWandering();
      }, 2500);
    }, 1500);
  }

  function setState(s) {
    state = s;
    if (spriteEl) spriteEl.setAttribute("data-state", s);
  }

  function say(msg) {
    if (!speechEl) return;
    speechEl.textContent = msg;
    speechEl.classList.add("show");
    clearTimeout(speechTimer);
    speechTimer = setTimeout(function () {
      speechEl.classList.remove("show");
    }, 3500);
  }

  function startWandering() {
    function wander() {
      // Pick random target
      var maxX = window.innerWidth - 100;
      targetX = 40 + Math.random() * (maxX - 40);

      var dist = Math.abs(targetX - x);
      var duration = Math.max(2000, dist * 10);

      setState("walk");
      facingLeft = targetX < x;
      spriteEl.style.transform = facingLeft ? "scaleX(-1)" : "";

      // Animate position
      var startX = x;
      var startTime = Date.now();
      function step() {
        var t = Math.min(1, (Date.now() - startTime) / duration);
        x = startX + (targetX - startX) * t;
        el.style.left = x + "px";
        if (t < 1) {
          requestAnimationFrame(step);
        } else {
          setState("idle");
          spriteEl.style.transform = "";
          // Random idle time before next wander
          var idleTime = 5000 + Math.random() * 15000;
          // Random speech
          if (Math.random() < 0.3) {
            say(STATE_MSGS.idle);
          }
          moveTimer = setTimeout(wander, idleTime);
        }
      }
      requestAnimationFrame(step);
    }
    wander();
  }

  return {
    init: create,
    say: say,
    state: function (s) { setState(s); },
  };
})();

// Auto-init when DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function () { KeboPet.init(); });
} else {
  KeboPet.init();
}
