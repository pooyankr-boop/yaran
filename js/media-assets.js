/*
  یاران — حل‌کننده‌ی مسیر رسانه
  مانیفست assets/images/manifest.json را می‌خواند (خروجی tools/integrate-media.mjs)
  و مسیرهای «.webp» کد را به فایل واقعیِ موجود نگاشت می‌کند؛ پس رسانه‌های جدید
  بدون هیچ تغییری در کد جایگزین می‌شوند.
*/
var MediaAssets = (function () {
  var map = null;
  var waiters = [];
  try {
    fetch("assets/images/manifest.json")
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) {
        map = j || {};
        waiters.splice(0).forEach(function (fn) { try { fn(map); } catch (e) {} });
      })
      .catch(function () { map = {}; });
  } catch (e) { /* file:// — بی‌خیال */ }
  function resolve(url) {
    if (!map || !url) return url;
    var hit = map[url];
    return hit ? hit + "?v=" + (map.__v || "1") : url;
  }
  // اجرای تابع بعد از آماده شدن مانیفست (یا فوراً اگر آماده است)
  function onReady(fn) {
    if (map) { try { fn(map); } catch (e) {} }
    else waiters.push(fn);
  }
  return { resolve: resolve, onReady: onReady };
})();
