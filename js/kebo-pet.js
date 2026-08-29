/* ═══════════ رایان — حیوان خانگی شناور ═══════════ */
/* روش Hermes petdex: spritesheet + CSS steps */
var RayanPet = (function () {
  var el, speechEl;
  var state = "idle";
  var inited = false;
  /* ── config ── */
  var SHEET = "img/kebo/spritesheet.png";
  var FW = 64, FH = 68;
  var COLS = 8; /* frames per row */
  var ROWS = { idle: 0, wave: 1, think: 2, walk: 3, sad: 4, happy: 5, sleep: 6 };
  var ANIM_SPEED = 0.6; /* seconds per cycle */

  function create() {
    if (document.getElementById("rayan-pet") || inited) return;
    inited = true;

    /* container */
    el = document.createElement("div");
    el.id = "rayan-pet";
    el.style.cssText = [
      "position:fixed", "bottom:100px", "right:14px", "z-index:9002",
      "cursor:pointer", "pointer-events:auto",
      "width:" + FW + "px", "height:" + FH + "px",
      "image-rendering:pixelated",
      "box-shadow:0 2px 10px rgba(0,0,0,0.25)",
      "transition:transform 0.3s ease",
      "-webkit-user-select:none", "user-select:none"
    ].join(";");

    /* sprite div — background-image with steps */
    var sprite = document.createElement("div");
    sprite.id = "rayan-sprite";
    sprite.style.cssText = [
      "width:100%", "height:100%",
      "background-image:url(" + SHEET + ")",
      "background-size:" + (FW * COLS) + "px " + (FH * Object.keys(ROWS).length) + "px",
      "background-position:0px 0px",
      "background-repeat:no-repeat",
      "image-rendering:pixelated",
      /* animation: 8 frames in a row */
      "animation:rayan-sprite " + ANIM_SPEED + "s steps(" + COLS + ") infinite"
    ].join(";");

    el.appendChild(sprite);

    /* speech bubble */
    speechEl = document.createElement("div");
    speechEl.style.cssText = [
      "position:absolute", "bottom:" + (FH + 5) + "px", "left:50%",
      "transform:translateX(-50%)", "background:#fff",
      "border:1px solid var(--yr-border,#e2e8f0)", "border-radius:10px",
      "padding:4px 10px", "font-size:11px", "white-space:nowrap",
      "box-shadow:0 2px 8px rgba(0,0,0,0.12)",
      "display:none", "z-index:9003", "pointer-events:none"
    ].join(";");
    el.appendChild(speechEl);

    /* click → open chat */
    el.addEventListener("click", function () {
      if (typeof YaranBot !== "undefined" && YaranBot.toggle) YaranBot.toggle();
    });

    /* hover effect */
    el.addEventListener("mouseenter", function () { el.style.transform = "scale(1.15)"; });
    el.addEventListener("mouseleave", function () { el.style.transform = ""; });

    document.body.appendChild(el);
  }

  /* ── state machine ── */
  function set(s) {
    if (!el || !ROWS.hasOwnProperty(s)) return;
    state = s;
    var row = ROWS[s];
    var sprite = document.getElementById("rayan-sprite");
    if (sprite) {
      /* change background-position-y to the correct row */
      sprite.style.backgroundPosition = "0px " + (-row * FH) + "px";
      /* restart animation */
      sprite.style.animation = "none";
      sprite.offsetHeight; /* reflow */
      sprite.style.animation = "rayan-sprite " + ANIM_SPEED + "s steps(" + COLS + ") infinite";
    }
    /* auto-reset to idle after 3s (except idle/sleep) */
    if (s !== "idle" && s !== "sleep") {
      setTimeout(function () { set("idle"); }, 3000);
    }
  }

  /* ── speech bubble ── */
  function say(text) {
    if (!speechEl || !text) return;
    speechEl.textContent = text;
    speechEl.style.display = "block";
    setTimeout(function () { speechEl.style.display = "none"; }, 3000);
  }

  /* ── init (only after role selection) ── */
  function init() { create(); }

  /* auto-init on load */
  function autoInit() { init(); }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", autoInit);
  } else {
    autoInit();
  }

  return { init: init, setState: set, say: say };
})();
