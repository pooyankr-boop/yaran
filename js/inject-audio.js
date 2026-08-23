/* injectAudioIntoHotspots — اضافه کردن محتوای صوتی به منوی گوشه چندرسانه‌ای (media) */
var ROOM_AUDIO_MAP = {
  "honar": ["ترانه کودکانه", "قصه کودک", "قصه و مدیتیشن", "موسیقی کودک"],
  "khab": ["قصه شب کودک", "داستان شب کودک", "شب بخیر کوچولو", "کانال همراه مادر و کودک", "قصه کودک", "قصه حیوانات"],
  "bazi": ["قصه کودک", "قصه حیوانات", "آموزش کودک"],
  "motaleh": ["قصه کلاسیک کودک", "قصه و خیال", "روانشناسی کودک", "تربیت کودک"],
  "moraabi": ["کافه خیال - موسیقی بی کلام", "کانال همراه مادر و کودک", "موسیقی کودک"],
  "esterahat-moraabian": ["کافه خیال - موسیقی بی کلام", "قصه و مدیتیشن"],
  "amoozesh": ["قصه کلاسیک کودک", "قصه و خیال", "آموزش کودک"],
  "salamat": ["کانال همراه مادر و کودک", "روانشناسی کودک", "تربیت کودک"],
  "jalase-owlia": ["کانال همراه مادر و کودک", "روانشناسی کودک", "تربیت کودک"],
  "bayegani": ["قصه کودک", "قصه شب کودک"],
  "teria": ["قصه کودک"],
  "hayat": ["قصه کودک", "قصه حیوانات"],
  "maddakari": ["قصه کودک", "ترانه کودکانه"]
};

function injectAudioIntoHotspots() {
  if (typeof AUDIO_LIBRARY === "undefined" || !AUDIO_LIBRARY) return;
  if (typeof ROOMS === "undefined" || !ROOMS) return;
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
        var cat = a.category || "";
        var txt = (a.title || "") + " " + (a.info || "");
        var group = "صوت";
        if (/موسیقی|بی کلام|کافه خیال/.test(cat)) group = "موسیقی بی کلام";
        else if (/ترانه|آهنگ|music|song|خواننده/.test(cat + " " + txt)) group = "ترانه و آهنگ";
        else if (/شعر|شاعر|شعرخوانی/.test(txt)) group = "شعر";
        else if (/لالایی|خواب|شب بخیر/.test(cat + " " + txt)) group = "لالایی";
        else if (/مدیتیشن|مراقبه|آرامش/.test(cat + " " + txt)) group = "مدیتیشن";
        else if (/روانشناسی|تربیت|والد|خانواده/.test(cat)) group = "روانشناسی و تربیت";
        else if (/آموزش|یادگیری|زبان/.test(cat + " " + txt)) group = "آموزش";
        else if (/قصه|داستان|حیوان/.test(cat)) group = "قصه";
        allItems.push({
          title: a.title,
          type: "audio",
          audioUrl: a.audioUrl,
          category: a.category,
          desc: (a.info || "").substring(0, 300),
          duration: a.duration || "",
          _group: group
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
        view.hotspots.push({
          title: "🔊 محتوای صوتی",
          x: 8,
          y: 50,
          categories: mediaCat
        });
        return;
      }
    }
  });
}
