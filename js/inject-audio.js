/* injectAudioIntoHotspots — اضافه کردن محتوای صوتی به منوی گوشه چندرسانه‌ای (media) */
function injectAudioIntoHotspots() {
  if (typeof AUDIO_LIBRARY === "undefined" || !AUDIO_LIBRARY) {
 return; }
  if (typeof ROOMS === "undefined" || !ROOMS) {
 return; }
  console.log('[YARAN] injectAudio: AUDIO_LIBRARY', AUDIO_LIBRARY.length, 'items, ROOMS', ROOMS.length, 'rooms');
  var ROOM_AUDIO_MAP = {
    "honar": ["ترانه کودکانه", "قصه کودک", "قصه و مدیتیشن", "موسیقی کودک"],
    "khab": ["قصه شب کودک", "داستان شب کودک", "شب بخیر کوچولو", "کانال همراه مادر و کودک", "قصه کودک", "قصه حیوانات"],
    "bazi": ["قصه کودک", "قصه حیوانات", "آموزش کودک"],
    "motaleh": ["قصه کلاسیک کودک", "قصه و خیال", "روانشناسی کودک", "تربیت کودک"],
    "moraabi": ["کافه خیال - موسیقی بی کلام", "کانال همراه مادر و کودک", "موسیقی کودک"],
    "esterahat-moraabian": ["کافه خیال - موسیقی بی کلام", "قصه و مدیتیشن", "مدیتیشن بزرگسال"],
    "amoozesh": ["قصه کلاسیک کودک", "قصه و خیال"],
    "salamat": ["کانال همراه مادر و کودک", "روانشناسی کودک", "تربیت کودک"],
    "jalase-owlia": ["کانال همراه مادر و کودک", "روانشناسی کودک", "تربیت کودک"],
    "bayegani": ["قصه کودک", "قصه شب کودک"],
    "teria": ["قصه کودک"],
    "hayat": ["قصه کودک", "قصه حیوانات"],
    "maddakari": ["قصه کودک", "ترانه کودکانه"]
  };
  ROOMS.forEach(function(room) {
    var cats = ROOM_AUDIO_MAP[room.id];
    if (!cats) return;
    var allItems = [];
    var seen = {};
    AUDIO_LIBRARY.forEach(function(a) {
      if (cats.indexOf(a.category) !== -1 && a.audioUrl) {
        var key = a.title.trim().toLowerCase();
        if (seen[key]) return;
        seen[key] = true;
        var isSong = /ترانه|آهنگ|music|song|خواننده/.test(a.category + " " + (a.info || ""));
        var isPoem = /شعر|شاعر|شعرخوانی/.test(a.category + " " + (a.info || ""));
        allItems.push({
          title: a.title,
          type: "audio",
          audioUrl: a.audioUrl,
          category: a.category,
          desc: (a.info || "").substring(0, 300),
          duration: a.duration || "",
          _group: isSong ? "آهنگ و ترانه" : isPoem ? "شعر" : "صوت"
        });
      }
    });
    if (allItems.length === 0) return;
    var groups = {};
    allItems.forEach(function(it) {
      var g = it._group;
      if (!groups[g]) groups[g] = [];
      groups[g].push(it);
    });
    var mediaCat = [];
    Object.keys(groups).forEach(function(g) {
      groups[g].forEach(function(it) { delete it._group; });
      mediaCat.push({ title: g, items: groups[g] });
    });
    var views = Object.keys(room.views || {});
    for (var vi = 0; vi < views.length; vi++) {
      if (views[vi] === "media") {
        var view = room.views[views[vi]];
        view.hotspots = view.hotspots || [];
        // جلوگیری از تزریق تکراری: چون این تابع هر بار ورود به اتاق دوباره صدا زده می‌شود
        // (از tour.js)، اگر هات‌اسپات صوتی از قبل اضافه شده، فقط محتوایش را به‌روز کن
        var existing = null;
        for (var hi = 0; hi < view.hotspots.length; hi++) {
          if (view.hotspots[hi].title === "🔊 محتوای صوتی") { existing = view.hotspots[hi]; break; }
        }
        if (existing) {
          existing.categories = mediaCat;
        } else {
          view.hotspots.push({
            title: "🔊 محتوای صوتی",
            x: 8,
            y: 50,
            categories: mediaCat
          });
        }
        return;
      }
    }
  });
}
