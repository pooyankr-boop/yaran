/*
  یاران — راه‌اندازی اجزای بصری جدید (ماسکوت اینترو، ذرات محیطی، دکور صحنه‌ها)
*/
(function () {
  "use strict";

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  /* ماسکوت صفحه‌ی اینترو */
  function mountIntro() {
    var slot = document.getElementById("intro-mascot");
    if (slot && typeof SVGX !== "undefined") slot.innerHTML = SVGX.mascot({ size: 130 });
  }

  /* تصاویر استاتیک HTML (پلان/لابی/نقشه) از مانیفست رسانه حل شوند
     تا جایگزینی jpeg/webp بدون تغییر index.html کار کند */
  function resolveStaticImages() {
    if (typeof MediaAssets === "undefined") return;
    ["plan-img", "map-bg"].forEach(function (id) {
      var img = document.getElementById(id);
      if (!img || !img.getAttribute("src")) return;
      var nu = MediaAssets.resolve(img.getAttribute("src"));
      if (nu && nu !== img.getAttribute("src")) img.src = nu;
    });
    document.querySelectorAll(".scene-bg").forEach(function (img) {
      var src = img.getAttribute("src");
      if (!src || img.dataset.mResolved) return;
      var nu = MediaAssets.resolve(src);
      if (nu && nu !== src) { img.src = nu; }
      img.dataset.mResolved = "1";
    });
    document.querySelectorAll("picture source[srcset]").forEach(function (s) {
      var ss = s.getAttribute("srcset");
      if (!ss || s.dataset.mResolved) return;
      var nu = MediaAssets.resolve(ss.split(" ")[0]);
      if (nu && nu !== ss.split(" ")[0]) s.setAttribute("srcset", nu);
      s.dataset.mResolved = "1";
    });
  }

  /* لایه‌ی ذرات محیطی — با تغییر تم بازسازی می‌شود */
  function mountAmbient() {
    if (typeof SVGX === "undefined") return;
    var old = document.querySelector(".sx-ambient");
    if (old) old.remove();
    var theme = document.body.classList.contains("theme-night") ? "night"
      : document.body.classList.contains("theme-festival") ? "festival" : "day";
    var wrap = document.createElement("div");
    wrap.innerHTML = SVGX.ambient(theme);
    document.body.appendChild(wrap.firstChild);
  }
  // بعد از applyTheme صدا زده شود
  window.__yaranRefreshAmbient = mountAmbient;

  ready(function () {
    mountIntro();
    mountAmbient();
    // تصاویر استاتیک بعد از آماده شدن مانیفست
    if (typeof MediaAssets !== "undefined" && MediaAssets.onReady) {
      MediaAssets.onReady(resolveStaticImages);
      setTimeout(resolveStaticImages, 2500); // شبکه کند: یک تلاش دیگر
    }
    // با تغییر تم (کلاس body) ذرات محیطی نو شوند
    if (typeof MutationObserver !== "undefined") {
      var t = null;
      new MutationObserver(function () {
        clearTimeout(t);
        t = setTimeout(mountAmbient, 60);
      }).observe(document.body, { attributes: true, attributeFilter: ["class"] });
    }
  });

  /* اعداد فارسی برای همه‌ی شمارنده‌ها پس از هر رندر */
  if (typeof YCal !== "undefined") {
    window.faNum = YCal.num;
  }
})();
