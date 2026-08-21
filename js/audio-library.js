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

  if (typeof CASTBOX_HEKAYAT !== "undefined" && CASTBOX_HEKAYAT) {
    result = result.concat(_buildOne(CASTBOX_HEKAYAT, { category: "کتاب صوتی" }));
  }

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
