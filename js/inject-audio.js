/* injectAudioIntoHotspots — تزریق محتوای صوتی متناسب با موضوع اتاق */
var ROOM_AUDIO_MAP = {
  "honar": ["ترانه کودکانه", "قصه کودک", "قصه و مدیتیشن", "موسیقی کودک", "داستان شب کودک", "قصه حیوانات"],
  "khab": ["قصه شب کودک", "داستان شب کودک", "شب بخیر کوچولو", "کانال همراه مادر و کودک", "قصه کودک", "قصه حیوانات"],
  "bazi": ["قصه کودک", "قصه حیوانات", "آموزش کودک", "داستان شب کودک"],
  "motaleh": ["قصه کلاسیک کودک", "قصه و خیال", "روانشناسی کودک", "تربیت کودک", "داستان شب کودک"],
  "moraabi": ["کافه خیال - موسیقی بی کلام", "کانال همراه مادر و کودک", "موسیقی کودک", "ترانه کودکانه"],
  "esterahat-moraabian": ["کافه خیال - موسیقی بی کلام", "قصه و مدیتیشن", "مدیتیشن بزرگسال"],
  "amoozesh": ["قصه کلاسیک کودک", "قصه و خیال", "آموزش کودک", "داستان شب کودک"],
  "salamat": ["کانال همراه مادر و کودک", "روانشناسی کودک", "تربیت کودک", "مدیتیشن بزرگسال"],
  "jalase-owlia": ["کانال همراه مادر و کودک", "روانشناسی کودک", "تربیت کودک", "مادرانه"],
  "bayegani": ["قصه کودک", "قصه شب کودک", "داستان شب کودک"],
  "teria": ["قصه کودک", "داستان شب کودک", "قصه حیوانات"],
  "hayat": ["قصه کودک", "قصه حیوانات", "داستان شب کودک"],
  "maddakari": ["قصه کودک", "ترانه کودکانه", "داستان شب کودک"]
};

function _categorizeAudio(item) {
  var cat = (item.category || '').toLowerCase();
  var title = (item.title || '').toLowerCase();
  var info = (item.info || '').toLowerCase();

  // لالایی
  if (/لالایی|lullaby/.test(title + ' ' + info)) return 'لالایی';
  // آهنگ و ترانه کودک
  if (/ترانه|آهنگ|music|song|خواننده|kooky|aed/.test(cat + ' ' + info)) return 'آهنگ و ترانه';
  // مدیتیشن
  if (/مدیتیشن|meditation|مراقبه|mindful/.test(cat + ' ' + title + ' ' + info)) return 'مدیتیشن';
  // روانشناسی و پادکست
  if (/روانشناسی|تربیت|والد|mادرانه|radif|parenting/.test(cat + ' ' + info)) return 'پادکست والدین';
  // قصه و داستان
  if (/قصه|dastan|story|شب کودک|حیوانات|کلاسیک|خیال/.test(cat)) return 'قصه';
  // شعر
  if (/شعر|شاعر|شعرخوانی/.test(info)) return 'شعر';
  // موسیقی بی کلام
  if (/بی کلام|instrumental|cafe kheyal/.test(cat + ' ' + info)) return 'موسیقی آرامش';
  // آموزش
  if (/آموزش|learn|edu/.test(cat + ' ' + info)) return 'آموزش';
  // پیش‌فرض
  return 'صوت';
}

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
        allItems.push({
          title: a.title,
          type: "audio",
          audioUrl: a.audioUrl,
          category: a.category,
          desc: (a.info || "").substring(0, 300),
          duration: a.duration || "",
          _group: _categorizeAudio(a)
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
