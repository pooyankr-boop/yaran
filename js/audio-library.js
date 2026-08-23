/* ---------- Audio library: podcasts with real audio URLs → archive + mini player ---------- */

var AUDIO_SAMPLE_LOCAL = "assets/audio/sample.wav";
var AUDIO_LOCAL_MAP = {
  "castbox-2538237-980658695": AUDIO_SAMPLE_LOCAL,
};

function _buildOne(arr, extras) {
  if (!arr) return [];
  return arr.map(function(ep) {
    var local = AUDIO_LOCAL_MAP[ep.id] || null;
    return Object.assign({}, extras || {}, ep, {
      audioUrl: local || ep.src || ep.audioUrl || null,
      channelId: ep.categoryId || ep.channelId || (extras && extras.channelId) || "",
      pageUrl: ep.url || "",
    }, { type: "audio" }); // type AFTER merge to force it
  });
}

function buildAudioLibrary() {
  var result = [];

  if (typeof CASTBOX_MEDITATION !== "undefined" && CASTBOX_MEDITATION) {
    result = result.concat(_buildOne(CASTBOX_MEDITATION, { category: "قصه و مدیتیشن" }));
  }

  // توجه: منبع «کتاب صوتی» (CASTBOX_HEKAYAT) عمداً حذف شد — شامل رمان‌های
  // کاملاً بزرگسال بود («برادران کارامازوف»، «بیوه‌کشی»، «تاریخ بیهقی») که
  // برای سایت مهدکودک کاملاً نامناسب است. اگر در آینده منبع مشابهی اضافه شد،
  // حتماً محتوایش را قبل از وصل‌کردن به این شکل بررسی کنید.

  // قصه‌های کودک تحقیق‌شده (واکشی مستقیم از کست‌باکس/anchor.fm — لینک mp3 واقعی)
  if (typeof PODCAST_RESEARCH !== "undefined" && PODCAST_RESEARCH) {
    var research = PODCAST_RESEARCH.map(function (ep, i) {
      return Object.assign({ id: "research-" + i }, ep);
    });
    result = result.concat(_buildOne(research, { category: "قصه کودک" }));
  }

  // کانال‌های کودک CastBox (۲۸ کانال واکشی‌شده)
  if (typeof CASTBOX_CHANNELS !== "undefined" && CASTBOX_CHANNELS) {
    CASTBOX_CHANNELS.forEach(function(ch) {
      var eps = (ch.episodes || []).map(function(ep, i) {
        return Object.assign({ id: "ch-" + ch.id + "-" + i }, ep);
      });
      result = result.concat(_buildOne(eps, { category: ch.category || "قصه کودک" }));
    });
  }

  // ترانه‌های کودکانه istgahekoodak.ir
  if (typeof ISTGAH_SONGS !== "undefined" && ISTGAH_SONGS) {
    var songs = ISTGAH_SONGS.map(function (ep, i) {
      return Object.assign({ id: "song-" + i }, ep);
    });
    result = result.concat(_buildOne(songs, { category: "ترانه کودکانه" }));
  }

  // توجه: پلی‌لیست موسیقی مختار رزمجو (PLAYLIST_EPISODES) و موسیقی نواحی/اقوام
  // (REGIONAL_MUSIC_SUBLISTS) عمداً اینجا اضافه نشده‌اند — طبق تصمیم کارفرما این
  // محتوا برای سایت کودک/مهدکودک نامرتبط است و نباید در آرشیو/جستجو ظاهر شود.

  // حذف آیتم‌های بدون فایل صوتی قابل پخش
  result = result.filter(function(a) {
    var src = a.audioUrl || a.src || "";
    return /https?:\/\/.+\.(mp3|m4a)(\?[^]*)?$/i.test(src);
  });

  // حذف موارد تکراری — اولویت با لینک مستقیم mp3 و توضیحات بیشتر
  var seen = {};
  result = result.filter(function(a) {
    var norm = (a.title || "").trim().toLowerCase().replace(/[^\w\u0600-\u06FF]/g, "");
    if (!norm) return true;
    if (seen[norm]) {
      var prev = seen[norm];
      var curSrc = a.audioUrl || a.src || "";
      var prevSrc = prev.audioUrl || prev.src || "";
      var curIsDirect = /s3\.castbox\.fm|dl\.istgahekoodak\.ir/.test(curSrc);
      var prevIsDirect = /s3\.castbox\.fm|dl\.istgahekoodak\.ir/.test(prevSrc);
      if (curIsDirect && !prevIsDirect) { seen[norm] = a; return true; }
      if (!curIsDirect && prevIsDirect) return false;
      if ((a.info || "").length > (prev.info || "").length) { seen[norm] = a; return true; }
      return false;
    }
    seen[norm] = a;
    return true;
  });

  return result;
}

var AUDIO_LIBRARY = buildAudioLibrary();

if (typeof ARCHIVE_DATA !== "undefined" && ARCHIVE_DATA) {
  for (var i = ARCHIVE_DATA.length - 1; i >= 0; i--) {
    var a = ARCHIVE_DATA[i];
    if (a.source === "کستباکس" && !a.id) ARCHIVE_DATA.splice(i, 1);
  }
  var existing = new Set(ARCHIVE_DATA.map(function(a) { return a.id; }));
  AUDIO_LIBRARY.forEach(function(a) {
    if (!existing.has(a.id)) { ARCHIVE_DATA.push(a); existing.add(a.id); }
  });
}

function getAudioByChannel(channelId) {
  return AUDIO_LIBRARY.filter(function(a) { return a.channelId === channelId; });
}
