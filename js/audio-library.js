/* ---------- Audio library: castbox episodes + podcasts → archive + mini player ---------- */

// Local real-audio sample so playback actually works in-page.
const AUDIO_SAMPLE_LOCAL = "assets/audio/sample.wav";

// Map a castbox episode id -> local playable audio file (drop your own mp3/wav here).
const AUDIO_LOCAL_MAP = {
  "castbox-2538237-980658695": AUDIO_SAMPLE_LOCAL, // آرنی، دونات شکلاتی
};

function _buildOne(arr, extras) {
  if (!arr) return [];
  return arr.map(function(ep) {
    var local = AUDIO_LOCAL_MAP[ep.id] || null;
    return Object.assign({}, extras || {}, ep, {
      type: "audio",
      audioUrl: local || ep.src || ep.audioUrl || null,
      channelId: ep.categoryId || ep.channelId || extras.channelId || "",
      pageUrl: ep.url || "",
    });
  });
}

function buildAudioLibrary() {
  var result = [];

  // 1) CASTBOX_EPISODES_FULL (legacy)
  if (typeof CASTBOX_EPISODES_FULL !== "undefined" && CASTBOX_EPISODES_FULL) {
    result = result.concat(_buildOne(CASTBOX_EPISODES_FULL, {}));
  }

  // 2) CASTBOX_MEDITATION — مدیتیشن و قصه کودک
  if (typeof CASTBOX_MEDITATION !== "undefined" && CASTBOX_MEDITATION) {
    result = result.concat(_buildOne(CASTBOX_MEDITATION, { category: "مدیتیشن و قصه کودک" }));
  }

  // 3) CASTBOX_HEKAYAT — کتاب صوتی
  if (typeof CASTBOX_HEKAYAT !== "undefined" && CASTBOX_HEKAYAT) {
    result = result.concat(_buildOne(CASTBOX_HEKAYAT, { category: "کتاب صوتی" }));
  }

  // 4) PLAYLIST_EPISODES — پلی لیست موسیقی
  if (typeof PLAYLIST_EPISODES !== "undefined" && PLAYLIST_EPISODES) {
    result = result.concat(_buildOne(PLAYLIST_EPISODES, { category: "پلی لیست" }));
  }

  // 5) REGIONAL_MUSIC_SUBLISTS — موسیقی نواحی
  if (typeof REGIONAL_MUSIC_SUBLISTS !== "undefined" && REGIONAL_MUSIC_SUBLISTS) {
    REGIONAL_MUSIC_SUBLISTS.forEach(function(sublist) {
      if (Array.isArray(sublist)) {
        result = result.concat(_buildOne(sublist, { category: "موسیقی نواحی" }));
      }
    });
  }

  return result;
}

const AUDIO_LIBRARY = buildAudioLibrary();

// Merge into ARCHIVE_DATA so audio episodes appear in archive/search/room views.
if (typeof ARCHIVE_DATA !== "undefined" && ARCHIVE_DATA) {
  // drop legacy castbox rows (generic titles, no id, empty desc)
  for (var i = ARCHIVE_DATA.length - 1; i >= 0; i--) {
    var a = ARCHIVE_DATA[i];
    if (a.source === "کستباکس" && !a.id) ARCHIVE_DATA.splice(i, 1);
  }
  // avoid duplicates by id
  const existing = new Set(ARCHIVE_DATA.map(function (a) { return a.id; }));
  AUDIO_LIBRARY.forEach(function (a) {
    if (!existing.has(a.id)) { ARCHIVE_DATA.push(a); existing.add(a.id); }
  });
}

// Helper for rooms: get episodes of a specific channel.
function getAudioByChannel(channelId) {
  return AUDIO_LIBRARY.filter(function (a) { return a.channelId === channelId; });
}
