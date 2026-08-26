/*
  یاران — تزریق درس‌های تعاملی به اتاق‌های مرتبط + بایگانی
  jalase-owlia → دک‌های والدین | moraabi و esterahat-moraabian → دک‌های مربیان/کارکنان
  این فایل بعد از rooms.js، deck-data.js و taxonomy.js لود می‌شود.
*/
(function injectDecksIntoRooms() {
  if (typeof DECK_LIBRARY === "undefined" || typeof ROOMS === "undefined") return;

  var ROOM_AUD = {
    "jalase-owlia": ["parent"],
    "moraabi": ["teacher"],
    "esterahat-moraabian": ["teacher", "staff"],
    "teria": ["staff"]
  };

  function deckItem(d) {
    return {
      title: (d.icon || "") + " " + d.title,
      type: "deck",
      deckId: d.id,
      category: d.audience.indexOf("parent") >= 0 ? "فرزندپروری" : "منابع آموزشی",
      audience: d.audience.indexOf("parent") >= 0 ? "والدین" : "مربیان",
      desc: d.desc || "",
      source: "یاران",
      _room: null
    };
  }

  ROOMS.forEach(function (room) {
    var auds = ROOM_AUD[room.id];
    if (!auds) return;
    var decks = DECK_LIBRARY.filter(function (d) {
      return d.audience.some(function (a) { return auds.indexOf(a) >= 0; });
    });
    if (!decks.length) return;
    if (!room.views) room.views = {};
    // نمای جلو (media): هات‌اسپات ویژه‌ی «درس تعاملی»
    var viewKey = room.views["media"] ? "media" : Object.keys(room.views)[0];
    if (!viewKey || !room.views[viewKey]) return;
    var v = room.views[viewKey];
    if (!Array.isArray(v.hotspots)) v.hotspots = [];
    // حذف تزریق قبلی (برای جلوگیری از دوباره‌کاری در reload)
    v.hotspots = v.hotspots.filter(function (h) { return !h.__decks; });
    var items = decks.map(deckItem);
    v.hotspots.push({
      __decks: true,
      title: "🖥️ مشاوره و آموزش تعاملی",
      x: 50, y: 86,
      categories: [{ title: "درس‌های تعاملی", items: items }]
    });
  });

  // افزودن به بایگانی برای جستجو/فاست
  if (typeof ARCHIVE_DATA !== "undefined") {
    DECK_LIBRARY.forEach(function (d) {
      var exists = ARCHIVE_DATA.some(function (a) { return a.deckId === d.id; });
      if (!exists) {
        var it = deckItem(d);
        it.room = d.audience.indexOf("parent") >= 0 ? "jalase-owlia" : "moraabi";
        delete it._room;
        ARCHIVE_DATA.push(it);
      }
    });
  }
})();
