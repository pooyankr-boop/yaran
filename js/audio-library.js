/* ---------- Audio library: castbox episodes → archive + mini player ----------
   کستباکس آدرسِ مستقیمِ فایل صوتی (mp3) را از طریق API/فید نمیدهد (پشت Cloudflare).
   پس اپیزودها را از دادههای موجود (castbox_episodes_full.js) میخوانیم و به آرشیو وصل میکنیم.
   - اگر یک آیتم `audioUrl` داشته باشد، مینیپلیر آن را واقعاً پخش میکند.
   - اپیزود نمونه (آرنی، دونات شکلاتی) به یک فایل صوتی محلی وصل شده تا پخش واقعی ثابت شود.
   - بقیه اپیزودها روی دکمهی پخش، صفحهی کستباکس را باز میکنند (fallback).
----------------------------------------------------------------------------- */

// Local real-audio sample so playback actually works in-page.
const AUDIO_SAMPLE_LOCAL = "assets/audio/sample.wav";

// Map a castbox episode id -> local playable audio file (drop your own mp3/wav here).
const AUDIO_LOCAL_MAP = {
  "castbox-2538237-980658695": AUDIO_SAMPLE_LOCAL, // آرنی، دونات شکلاتی
};

function buildAudioLibrary() {
  if (typeof CASTBOX_EPISODES_FULL === "undefined" || !CASTBOX_EPISODES_FULL) return [];
  return CASTBOX_EPISODES_FULL.map(function(ep) {
    const local = AUDIO_LOCAL_MAP[ep.id] || null;
    return Object.assign({}, ep, {
      type: "audio",
      // audioUrl: real audio file used by the mini player. null => open castbox page.
      audioUrl: local,
      channelId: ep.channelId,
      // keep original page url for fallback
      pageUrl: ep.url,
    });
  });
}

const AUDIO_LIBRARY = buildAudioLibrary();

// Merge into ARCHIVE_DATA so audio episodes appear in archive/search/room views.
if (typeof ARCHIVE_DATA !== "undefined" && ARCHIVE_DATA) {
  // avoid duplicates by id
  const existing = new Set(ARCHIVE_DATA.map(function (a) { return a.id; }));
  AUDIO_LIBRARY.forEach(function (a) {
    if (!existing.has(a.id)) { ARCHIVE_DATA.push(a); existing.add(a.id); }
  });
}

// Helper for rooms: get episodes of a specific channel (e.g. "همراه مادر و کودک").
function getAudioByChannel(channelId) {
  return AUDIO_LIBRARY.filter(function (a) { return a.channelId === channelId; });
}
