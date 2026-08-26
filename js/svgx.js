/*
  یاران — کتابخانه‌ی SVG متحرک و شاد (SVGX)
  ─────────────────────────────────────────────
  همه‌ی انیمیشن‌ها اینلاین و بدون شبکه؛ با CSS keyframes در svg.css.
  اجزا: ماسکوت خرسی «یاربر»، لودرها، حالت‌های خالی، دکور اتاق‌ها،
  ذرات محیطی، آیکون‌های رابط کاربری.
*/
var SVGX = (function () {
  "use strict";

  var PAL = {
    coral: "#ff6b6b", sun: "#ffd93d", leaf: "#6bcb77", sky: "#4d96ff",
    grape: "#9b59d0", pink: "#ff8fab", teal: "#2ec4b6", peach: "#ffb26b",
    brown: "#8d5a3b", darkbrown: "#5a3a24", cream: "#fff8ec", white: "#ffffff",
    night: "#2b2350"
  };

  /* ═══════════ ماسکوت: یاربر ═══════════ */
  // خرسی گرد با گوش، لپ‌های صورتی، پلک‌زنی و دست تکان‌دهنده
  function mascot(opts) {
    opts = opts || {};
    var s = opts.size || 120;
    var wave = opts.wave !== false;
    return '' +
'<svg class="svgx-mascot' + (opts.cls ? " " + opts.cls : "") + '" width="' + s + '" height="' + s + '" viewBox="0 0 120 120" role="img" aria-label="یاربر">' +
'  <g class="m-body">' +
'    <ellipse cx="60" cy="108" rx="30" ry="7" fill="' + PAL.darkbrown + '" opacity=".14"/>' +
'    <circle cx="34" cy="30" r="13" fill="' + PAL.brown + '"/>' +
'    <circle cx="86" cy="30" r="13" fill="' + PAL.brown + '"/>' +
'    <circle cx="34" cy="30" r="6.5" fill="' + PAL.peach + '"/>' +
'    <circle cx="86" cy="30" r="6.5" fill="' + PAL.peach + '"/>' +
'    <circle cx="60" cy="58" r="38" fill="' + PAL.brown + '"/>' +
'    <ellipse cx="60" cy="70" rx="24" ry="19" fill="' + PAL.cream + '"/>' +
'    <g class="m-eye">' +
'      <circle cx="46" cy="52" r="5" fill="' + PAL.darkbrown + '"/><circle cx="74" cy="52" r="5" fill="' + PAL.darkbrown + '"/>' +
'      <circle cx="47.6" cy="50.4" r="1.6" fill="#fff"/><circle cx="75.6" cy="50.4" r="1.6" fill="#fff"/>' +
'    </g>' +
'    <g class="m-lid"><rect x="39" y="47" rx="3" width="14" height="0" fill="' + PAL.brown + '"/><rect x="67" y="47" rx="3" width="14" height="0" fill="' + PAL.brown + '"/></g>' +
'    <ellipse cx="60" cy="63" rx="5" ry="4" fill="' + PAL.darkbrown + '"/>' +
'    <path d="M60 66 q0 6 -6 7 M60 66 q0 6 6 7" stroke="' + PAL.darkbrown + '" stroke-width="2.2" fill="none" stroke-linecap="round"/>' +
'    <ellipse cx="36" cy="63" rx="6" ry="4.4" fill="' + PAL.pink + '" opacity=".75"/>' +
'    <ellipse cx="84" cy="63" rx="6" ry="4.4" fill="' + PAL.pink + '" opacity=".75"/>' +
(wave ?
'    <g class="m-arm">' +
'      <path d="M94 66 q16 -4 18 -18" stroke="' + PAL.brown + '" stroke-width="11" fill="none" stroke-linecap="round"/>' +
'      <circle cx="113" cy="45" r="8" fill="' + PAL.peach + '"/>' +
'    </g>' : '') +
'    <path d="M27 68 q-10 6 -8 16" stroke="' + PAL.brown + '" stroke-width="11" fill="none" stroke-linecap="round"/>' +
'  </g>' +
'</svg>';
  }

  /* ═══════════ لودرها ═══════════ */
  function loader(kind, size) {
    size = size || 72;
    if (kind === "blocks") {
      // سه بلوک رنگی که می‌پرند
      return '<svg class="svgx-loader" width="' + size + '" height="' + size + '" viewBox="0 0 80 80" aria-label="در حال بارگذاری">' +
        '<rect class="ld-b1" x="12" y="42" width="18" height="18" rx="5" fill="' + PAL.coral + '"/>' +
        '<rect class="ld-b2" x="32" y="42" width="18" height="18" rx="5" fill="' + PAL.sun + '"/>' +
        '<rect class="ld-b3" x="52" y="42" width="18" height="18" rx="5" fill="' + PAL.sky + '"/>' +
        '<text x="40" y="30" text-anchor="middle" font-size="12" fill="' + PAL.grape + '" font-weight="bold">…</text>' +
      '</svg>';
    }
    if (kind === "pinwheel") {
      return '<svg class="svgx-loader svgx-spin" width="' + size + '" height="' + size + '" viewBox="0 0 80 80" aria-label="در حال بارگذاری">' +
        [0, 90, 180, 270].map(function (a) {
          return '<path d="M40 40 Q56 20 44 8 Q64 16 58 34 Z" transform="rotate(' + a + ' 40 40)" fill="' + ["#ff6b6b", "#ffd93d", "#6bcb77", "#4d96ff"][a / 90] + '" opacity=".9"/>';
        }).join("") +
        '<circle cx="40" cy="40" r="6" fill="' + PAL.white + '"/></svg>';
    }
    // default: orbiting stars
    return '<svg class="svgx-loader" width="' + size + '" height="' + size + '" viewBox="0 0 80 80" aria-label="در حال بارگذاری">' +
      '<g class="orb-orbit"><circle cx="40" cy="12" r="7" fill="' + PAL.sun + '"/><circle cx="65" cy="55" r="5" fill="' + PAL.coral + '"/><circle cx="15" cy="55" r="5" fill="' + PAL.sky + '"/></g>' +
      '<circle cx="40" cy="40" r="9" fill="' + PAL.grape + '" opacity=".85"/></svg>';
  }

  /* ═══════════ حالت خالی ═══════════ */
  function emptyState(o) {
    o = o || {};
    var art = o.art || "cloud";
    var svg = "";
    if (art === "cloud") {
      svg = '<svg width="150" height="110" viewBox="0 0 150 110">' +
        '<g class="es-cloud">' +
          '<ellipse cx="70" cy="45" rx="34" ry="22" fill="#cfe8ff"/>' +
          '<circle cx="46" cy="50" r="17" fill="#cfe8ff"/><circle cx="96" cy="48" r="19" fill="#cfe8ff"/>' +
          '<circle cx="60" cy="40" r="4" fill="' + PAL.darkbrown + '"/><circle cx="82" cy="40" r="4" fill="' + PAL.darkbrown + '"/>' +
          '<path d="M64 51 q7 6 14 0" stroke="' + PAL.darkbrown + '" stroke-width="2.4" fill="none" stroke-linecap="round"/>' +
          '<ellipse cx="52" cy="48" rx="4.5" ry="3" fill="' + PAL.pink + '" opacity=".7"/>' +
          '<ellipse cx="90" cy="48" rx="4.5" ry="3" fill="' + PAL.pink + '" opacity=".7"/>' +
        '</g>' +
        '<g class="es-rain">' +
          '<line x1="52" y1="72" x2="49" y2="84" stroke="' + PAL.sky + '" stroke-width="4" stroke-linecap="round"/>' +
          '<line x1="70" y1="76" x2="67" y2="88" stroke="' + PAL.sky + '" stroke-width="4" stroke-linecap="round"/>' +
          '<line x1="88" y1="72" x2="85" y2="84" stroke="' + PAL.sky + '" stroke-width="4" stroke-linecap="round"/>' +
        '</g>' +
        '<g class="es-sun"><circle cx="124" cy="22" r="11" fill="' + PAL.sun + '"/>' +
          [0, 45, 90, 135].map(function (a) { return '<line x1="124" y1="4" x2="124" y2="-1" transform="rotate(' + a + ' 124 22)" stroke="' + PAL.sun + '" stroke-width="3" stroke-linecap="round" transform-origin="124 22"/>'; }).join("") +
        '</g></svg>';
    } else if (art === "balloon") {
      svg = '<svg width="120" height="130" viewBox="0 0 120 130">' +
        '<g class="es-balloon">' +
          '<ellipse cx="60" cy="42" rx="26" ry="31" fill="' + PAL.coral + '"/>' +
          '<ellipse cx="52" cy="33" rx="8" ry="11" fill="#fff" opacity=".35"/>' +
          '<path d="M60 73 l-5 7 h10 z" fill="' + PAL.coral + '"/>' +
        '</g>' +
        '<path class="es-string" d="M60 82 q-10 14 0 26 q10 12 0 20" stroke="' + PAL.grape + '" stroke-width="2.4" fill="none" stroke-linecap="round"/>' +
        '</svg>';
    }
    return '<div class="svgx-empty">' + svg +
      '<div class="svgx-empty-title">' + (o.title || "هنوز چیزی اینجا نیست!") + "</div>" +
      (o.sub ? '<div class="svgx-empty-sub">' + o.sub + "</div>" : "") +
      (o.action ? '<div class="svgx-empty-action">' + o.action + "</div>" : "") +
      "</div>";
  }

  /* ═══════════ دکورهای صحنه (پراپ‌های اتاق) ═══════════ */
  var PROPS = {
    balloon: function (c) {
      c = c || PAL.coral;
      return '<svg viewBox="0 0 60 100" class="sx-prop"><g class="pr-float">' +
        '<ellipse cx="30" cy="30" rx="19" ry="23" fill="' + c + '"/><ellipse cx="24" cy="23" rx="5.5" ry="8" fill="#fff" opacity=".4"/>' +
        '<path d="M30 53 l-4.5 6 h9 z" fill="' + c + '"/>' +
        '<path d="M30 59 q-7 10 0 19 q7 9 0 17" stroke="' + c + '" stroke-width="2" fill="none" opacity=".7"/></g></svg>';
    },
    cloud: function () {
      return '<svg viewBox="0 0 110 60" class="sx-prop"><g class="pr-drift">' +
        '<ellipse cx="52" cy="34" rx="30" ry="16" fill="#fff" opacity=".92"/>' +
        '<circle cx="34" cy="30" r="13" fill="#fff" opacity=".92"/><circle cx="70" cy="28" r="15" fill="#fff" opacity=".92"/></g></svg>';
    },
    sun: function () {
      return '<svg viewBox="0 0 90 90" class="sx-prop"><g class="pr-sunrays">' +
        [0, 45, 90, 135, 180, 225, 270, 315].map(function (a) {
          return '<line x1="45" y1="8" x2="45" y2="1" transform="rotate(' + a + ' 45 45)" stroke="' + PAL.sun + '" stroke-width="4" stroke-linecap="round"/>';
        }).join("") +
        '<circle cx="45" cy="45" r="21" fill="' + PAL.sun + '"/>' +
        '<circle cx="38" cy="41" r="2.6" fill="' + PAL.darkbrown + '"/><circle cx="52" cy="41" r="2.6" fill="' + PAL.darkbrown + '"/>' +
        '<path d="M39 50 q6 5 12 0" stroke="' + PAL.darkbrown + '" stroke-width="2.2" fill="none" stroke-linecap="round"/></g></svg>';
    },
    moonstars: function () {
      return '<svg viewBox="0 0 120 80" class="sx-prop"><g class="pr-twinkle">' +
        '<path d="M62 14 a22 22 0 1 0 20 32 a18 18 0 0 1 -20 -32 z" fill="' + PAL.sun + '"/>' +
        star(24, 22, 7, "#fff") + star(95, 40, 5, "#ffd93d") + star(105, 16, 4, "#fff") +
        '</g></svg>';
    },
    bunting: function () {
      // ریسه‌ی پرچم‌های رنگی
      var colors = [PAL.coral, PAL.sun, PAL.leaf, PAL.sky, PAL.grape, PAL.pink];
      var flags = "";
      for (var i = 0; i < 9; i++) {
        var x = 8 + i * 13;
        flags += '<path class="pr-flag" style="animation-delay:' + (i * .22) + 's" d="M' + x + ' 14 L' + (x + 11) + ' 14 L' + (x + 5.5) + ' 30 z" fill="' + colors[i % colors.length] + '"/>';
      }
      return '<svg viewBox="0 0 128 34" class="sx-prop sx-wide"><path d="M2 10 Q64 22 126 10" stroke="#c9b08f" stroke-width="2" fill="none"/>' + flags + "</svg>";
    },
    butterfly: function (c) {
      c = c || PAL.grape;
      return '<svg viewBox="0 0 60 50" class="sx-prop"><g class="pr-fly">' +
        '<ellipse class="wing wing-l" cx="21" cy="22" rx="13" ry="10" fill="' + c + '" opacity=".85"/>' +
        '<ellipse class="wing wing-r" cx="39" cy="22" rx="13" ry="10" fill="' + c + '" opacity=".85"/>' +
        '<rect x="27.5" y="14" width="5" height="24" rx="2.5" fill="' + PAL.darkbrown + '"/>' +
        '<path d="M29 14 q-4 -7 -8 -8 M31 14 q4 -7 8 -8" stroke="' + PAL.darkbrown + '" stroke-width="1.8" fill="none" stroke-linecap="round"/></g></svg>';
    },
    notes: function () {
      // نُت‌های موسیقی شناور
      function note(x, y, s, delay, color) {
        return '<g class="pr-note" style="animation-delay:' + delay + 's" transform="translate(' + x + " " + y + ') scale(' + s + ')">' +
          '<ellipse cx="0" cy="14" rx="6.5" ry="5" fill="' + color + '" transform="rotate(-18)"/>' +
          '<path d="M6 13 V0 q6 2 7 7" stroke="' + color + '" stroke-width="2.6" fill="none" stroke-linecap="round"/></g>';
      }
      return '<svg viewBox="0 0 90 90" class="sx-prop">' +
        note(20, 30, 1, 0, PAL.grape) + note(52, 18, .8, .9, PAL.coral) + note(40, 55, .65, 1.7, PAL.teal) +
        "</svg>";
    },
    blocks: function () {
      return '<svg viewBox="0 0 90 70" class="sx-prop"><g class="pr-wobble">' +
        '<rect x="8" y="38" width="26" height="26" rx="6" fill="' + PAL.sky + '"/>' +
        '<rect x="36" y="38" width="26" height="26" rx="6" fill="' + PAL.coral + '"/>' +
        '<rect x="22" y="10" width="26" height="26" rx="6" fill="' + PAL.sun + '"/>' +
        '<circle cx="35" cy="23" r="4.5" fill="#fff" opacity=".55"/>' +
        '<path d="M47 51 h4 m6 0 h4" stroke="#fff" stroke-width="2.6" stroke-linecap="round" opacity=".7"/>' +
        '<path d="M15 51 h4 m6 0 h4" stroke="#fff" stroke-width="2.6" stroke-linecap="round" opacity=".7"/></g></svg>';
    },
    plant: function () {
      return '<svg viewBox="0 0 70 90" class="sx-prop"><g class="pr-sway">' +
        '<path d="M35 52 q-16 -8 -14 -30 q14 6 14 30 z" fill="' + PAL.leaf + '"/>' +
        '<path d="M35 52 q16 -10 16 -32 q-16 8 -16 32 z" fill="#4caf50"/>' +
        '<rect x="22" y="52" width="26" height="26" rx="6" fill="' + PAL.peach + '"/>' +
        '<rect x="22" y="52" width="26" height="7" rx="3" fill="#e8935a"/></g></svg>';
    },
    starstring: function () {
      var out = '<svg viewBox="0 0 140 40" class="sx-prop sx-wide">';
      for (var i = 0; i < 6; i++) {
        out += star(14 + i * 22, 16 + (i % 2) * 8, 8, [PAL.sun, PAL.pink, PAL.sky][i % 3], i * .35);
      }
      return out + "</svg>";
    },
    rocket: function () {
      return '<svg viewBox="0 0 70 90" class="sx-prop"><g class="pr-hover">' +
        '<path d="M35 6 q14 14 14 34 q0 14 -6 22 h-16 q-6 -8 -6 -22 q0 -20 14 -34 z" fill="#eceff4"/>' +
        '<circle cx="35" cy="34" r="7" fill="' + PAL.sky + '"/>' +
        '<path d="M21 50 l-10 14 l14 -4 z" fill="' + PAL.coral + '"/><path d="M49 50 l10 14 l-14 -4 z" fill="' + PAL.coral + '"/>' +
        '<g class="pr-flame"><path d="M29 64 q6 16 6 20 q0 -4 6 -20 z" fill="' + PAL.sun + '"/></g></g></svg>';
    },
    rainbow: function () {
      var cols = [PAL.coral, PAL.sun, PAL.leaf, PAL.sky];
      return '<svg viewBox="0 0 120 66" class="sx-prop sx-wide"><g class="pr-glow">' +
        cols.map(function (c, i) {
          return '<path d="M' + (14 + i * 8) + " 60 a" + (46 - i * 8) + " " + (46 - i * 8) + ' 0 0 1 ' + (92 - i * 16) + ' 0" stroke="' + c + '" stroke-width="7" fill="none" stroke-linecap="round"/>';
        }).join("") + "</g></svg>";
    },
    paintdrop: function (c) {
      c = c || PAL.pink;
      return '<svg viewBox="0 0 40 54" class="sx-prop"><g class="pr-drip">' +
        '<path d="M20 6 q12 16 12 25 a12 12 0 1 1 -24 0 q0 -9 12 -25 z" fill="' + c + '"/></g></svg>';
    }
  };

  function star(cx, cy, r, color, delay) {
    var pts = [];
    for (var i = 0; i < 10; i++) {
      var rad = (i % 2 === 0 ? r : r * .45);
      var a = Math.PI / 5 * i - Math.PI / 2;
      pts.push((cx + rad * Math.cos(a)).toFixed(1) + "," + (cy + rad * Math.sin(a)).toFixed(1));
    }
    return '<polygon class="pr-star" style="animation-delay:' + (delay || 0) + 's" points="' + pts.join(" ") + '" fill="' + color + '"/>';
  }

  /* پیش‌تنظیم دکور هر فضا — مختصات درصدی روی صحنه */
  var DECOR = {
    lobby: [
      { p: "bunting", x: 4, y: 2, w: 30 }, { p: "balloon", x: 88, y: 10, w: 5 },
      { p: "balloon", x: 93, y: 16, w: 3.6, c: PAL.sky }, { p: "sun", x: 3, y: 6, w: 9 },
      { p: "plant", x: 91, y: 74, w: 7 }
    ],
    plan: [
      { p: "cloud", x: 6, y: 6, w: 14 }, { p: "cloud", x: 78, y: 4, w: 12 },
      { p: "sun", x: 88, y: 6, w: 9 }, { p: "butterfly", x: 48, y: 8, w: 4 }
    ],
    map: [
      { p: "starstring", x: 30, y: 2, w: 40 }, { p: "rocket", x: 90, y: 8, w: 6 }
    ],
    amoozesh: [
      { p: "blocks", x: 3, y: 70, w: 8 }, { p: "starstring", x: 34, y: 3, w: 30 },
      { p: "plant", x: 90, y: 72, w: 7 }, { p: "paintdrop", x: 12, y: 8, w: 3, c: PAL.sky }
    ],
    bazi: [
      { p: "bunting", x: 3, y: 2, w: 34 }, { p: "balloon", x: 90, y: 8, w: 5.5 },
      { p: "balloon", x: 84, y: 14, w: 3.8, c: PAL.sun }, { p: "blocks", x: 88, y: 72, w: 9 }
    ],
    honar: [
      { p: "paintdrop", x: 6, y: 8, w: 4, c: PAL.pink }, { p: "paintdrop", x: 13, y: 14, w: 2.6, c: PAL.teal },
      { p: "rainbow", x: 66, y: 4, w: 26 }, { p: "notes", x: 87, y: 60, w: 8 }
    ],
    motaleh: [
      { p: "moonstars", x: 74, y: 5, w: 16 }, { p: "starstring", x: 8, y: 4, w: 26 },
      { p: "cloud", x: 6, y: 10, w: 12 }
    ],
    salamat: [
      { p: "rainbow", x: 5, y: 4, w: 24 }, { p: "heart", x: 88, y: 10, w: 6 },
      { p: "plant", x: 4, y: 70, w: 6.5 }
    ],
    khab: [
      { p: "moonstars", x: 6, y: 5, w: 18 }, { p: "starstring", x: 40, y: 3, w: 30 },
      { p: "cloud", x: 80, y: 8, w: 13 }
    ],
    moraabi: [
      { p: "bunting", x: 4, y: 2, w: 30 }, { p: "plant", x: 90, y: 70, w: 7 },
      { p: "balloon", x: 8, y: 12, w: 4.4, c: PAL.grape }
    ],
    "esterahat-moraabian": [
      { p: "plant", x: 6, y: 64, w: 7 }, { p: "plant", x: 88, y: 66, w: 6 },
      { p: "moonstars", x: 76, y: 6, w: 14 }, { p: "notes", x: 12, y: 10, w: 7 }
    ],
    "jalase-owlia": [
      { p: "bunting", x: 2, y: 2, w: 40 }, { p: "balloon", x: 90, y: 8, w: 5.5 },
      { p: "balloon", x: 6, y: 10, w: 4.6, c: PAL.leaf }, { p: "starstring", x: 36, y: 6, w: 26 }
    ],
    bayegani: [
      { p: "blocks", x: 88, y: 70, w: 8 }, { p: "starstring", x: 30, y: 4, w: 34 },
      { p: "plant", x: 5, y: 68, w: 6 }
    ],
    teria: [
      { p: "apple", x: 88, y: 12, w: 5 }, { p: "bunting", x: 4, y: 2, w: 30 },
      { p: "plant", x: 6, y: 66, w: 6 }
    ],
    hayat: [
      { p: "sun", x: 84, y: 5, w: 11 }, { p: "butterfly", x: 20, y: 16, w: 4.5 },
      { p: "butterfly", x: 66, y: 10, w: 3.4, c: PAL.coral }, { p: "cloud", x: 8, y: 6, w: 13 }
    ],
    maddakari: [
      { p: "heart", x: 8, y: 10, w: 6 }, { p: "rainbow", x: 62, y: 4, w: 26 },
      { p: "balloon", x: 88, y: 12, w: 4.4, c: PAL.pink }
    ]
  };
  PROPS.heart = function (c) {
    c = c || PAL.coral;
    return '<svg viewBox="0 0 50 46" class="sx-prop"><g class="pr-beat">' +
      '<path d="M25 42 C10 30 4 20 6 12 C8 4 18 2 25 10 C32 2 42 4 44 12 C46 20 40 30 25 42 z" fill="' + c + '"/></g></svg>';
  };
  PROPS.apple = function () {
    return '<svg viewBox="0 0 50 54" class="sx-prop"><g class="pr-wobble">' +
      '<path d="M25 16 C10 10 2 22 6 34 C9 44 18 50 25 48 C32 50 41 44 44 34 C48 22 40 10 25 16 z" fill="' + PAL.coral + '"/>' +
      '<path d="M25 16 q1 -8 8 -10" stroke="' + PAL.brown + '" stroke-width="3" fill="none" stroke-linecap="round"/>' +
      '<path d="M33 8 q8 -2 8 6 q-8 2 -8 -6z" fill="' + PAL.leaf + '"/>' +
      '<ellipse cx="17" cy="28" rx="4.5" ry="7" fill="#fff" opacity=".3"/></g></svg>';
  };

  function renderDecor(screenEl, spaceId) {
    var old = screenEl.querySelector(".sx-decor-layer");
    if (old) old.remove();
    var preset = DECOR[spaceId];
    if (!preset || !preset.length) return;
    var layer = document.createElement("div");
    layer.className = "sx-decor-layer";
    layer.setAttribute("aria-hidden", "true");
    preset.forEach(function (d) {
      var fn = PROPS[d.p];
      if (!fn) return;
      var wrap = document.createElement("div");
      wrap.className = "sx-prop-wrap";
      wrap.style.left = (d.x || 0) + "%";
      wrap.style.top = (d.y || 0) + "%";
      wrap.style.width = (d.w || 6) + "%";
      wrap.innerHTML = fn(d.c);
      layer.appendChild(wrap);
    });
    screenEl.appendChild(layer);
  }

  /* ═══════════ ذرات محیطی (تم روز/شب/جشن) ═══════════ */
  function ambient(theme) {
    var bits = "", i;
    if (theme === "night") {
      for (i = 0; i < 26; i++) {
        var sz = 2 + Math.random() * 3.5;
        bits += '<span class="am-star" style="left:' + rnd(100) + "%;top:" + rnd(100) + "%;width:" + sz + "px;height:" + sz + "px;animation-delay:" + rnd(6) + 's"></span>';
      }
    } else if (theme === "festival") {
      var cols = [PAL.coral, PAL.sun, PAL.leaf, PAL.sky, PAL.grape, PAL.pink];
      for (i = 0; i < 22; i++) {
        bits += '<span class="am-confetti" style="left:' + rnd(100) + "%;background:" + cols[i % cols.length] +
          ";animation-delay:-" + rnd(14) + "s;animation-duration:" + (9 + rnd(8)) + 's"></span>';
      }
    } else {
      for (i = 0; i < 12; i++) {
        bits += '<span class="am-bubble" style="left:' + rnd(100) + "%;width:" + (8 + rnd(16)) + "px;height:" + (8 + rnd(16)) + "px;animation-delay:-" + rnd(16) + "s;animation-duration:" + (12 + rnd(10)) + 's"></span>';
      }
    }
    return '<div class="sx-ambient" aria-hidden="true">' + bits + "</div>";
  }
  function rnd(n) { return Math.round(Math.random() * n); }

  /* ═══════════ آیکون‌های کوچک UI ═══════════ */
  var ICONS = {
    home: '<path d="M6 26 L16 8 L26 26 Z M10 22 V30 H22 V22" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"/>',
    back: '<path d="M20 6 L8 16 L20 26" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>',
    play: '<path d="M9 6 Q9 4 11 5 L23 13 Q25 14 23 15.5 L11 23 Q9 24 9 22 Z"/>',
    search: '<circle cx="13" cy="13" r="8" fill="none" stroke="currentColor" stroke-width="3"/><path d="M19 19 L27 27" stroke="currentColor" stroke-width="3.4" stroke-linecap="round"/>',
    calendar: '<rect x="4" y="7" width="24" height="21" rx="5" fill="none" stroke="currentColor" stroke-width="2.6"/><path d="M4 14 H28 M11 4 V9 M21 4 V9" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>',
    message: '<path d="M5 7 h22 a3 3 0 0 1 3 3 v11 a3 3 0 0 1 -3 3 h-13 l-6 5 v-5 h-3 a3 3 0 0 1 -3 -3 v-11 a3 3 0 0 1 3 -3 z" transform="translate(0,-2)" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linejoin="round"/>',
    game: '<rect x="4" y="9" width="24" height="16" rx="7" fill="none" stroke="currentColor" stroke-width="2.6"/><path d="M10 17 h5 M12.5 14.5 v5 M20 15.5 v.01 M23 18.5 v.01" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>',
    book: '<path d="M16 8 C12 5 7 5 4 7 V26 C7 24 12 24 16 27 C20 24 25 24 28 26 V7 C25 5 20 5 16 8 Z M16 8 V27" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/>',
    star: '<polygon points="16,3 20,12 30,13 22,20 25,30 16,24 7,30 10,20 2,13 12,12" fill="currentColor"/>',
    close: '<path d="M8 8 L24 24 M24 8 L8 24" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/>'
  };
  function icon(name, size, cls) {
    size = size || 22;
    return '<svg class="svgx-icon' + (cls ? " " + cls : "") + '" width="' + size + '" height="' + size + '" viewBox="0 0 32 32" aria-hidden="true">' + (ICONS[name] || "") + "</svg>";
  }

  /* دکمه‌ی شاد با موج ضربه */
  function fabBtn(id, iconName, label, cls) {
    return '<button id="' + id + '" class="svgx-fab ' + (cls || "") + '">' + icon(iconName, 22) +
      (label ? "<span>" + label + "</span>" : "") + "</button>";
  }

  return {
    PAL: PAL, mascot: mascot, loader: loader, emptyState: emptyState,
    PROPS: PROPS, DECOR: DECOR, renderDecor: renderDecor,
    ambient: ambient, icon: icon, fabBtn: fabBtn, star: star
  };
})();
