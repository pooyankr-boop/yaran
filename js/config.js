/* ══════════════════════════════════════════════════════════════
   تنظیمات سرور API — برای GitHub Pages لازم است
   لوکال: خالی بماند (همان سرور 4000)
   روی GitHub Pages: آدرس سرور Render را بگذارید، مثل:
   window.YARAN_API_BASE = "https://yaran-api.onrender.com";
   ══════════════════════════════════════════════════════════════ */
// لوکال → همان سرور (4000)، غیرلوکال (Pages/Render) → سرور Render
var isLocal = location.hostname === "localhost" || location.hostname === "127.0.0.1" || location.protocol === "file:";
window.YARAN_API_BASE = isLocal ? "" : "https://yaran.onrender.com";
