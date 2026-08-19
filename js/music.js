/* ══════════════════════════════════════════════════════════════
   موسیقی آرام — YaranMusic
   ملودیهای نرم WebAudio (بدون فایل خارجی) — جعبه موسیقی
   tour: تور گردش (شاد/روشن)  ·  room: تور مجازی اتاق (آرام/شبانه)
   ══════════════════════════════════════════════════════════════ */
window.YaranMusic = (function () {
  'use strict';
  var ctx = null, timer = null, seq = 0, playing = null;

  var F = { // فرکانس نت‌ها (Hz)
    C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.00, A3: 220.00, B3: 246.94,
    C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88,
    C5: 523.25, D5: 587.33, E5: 659.26, A5: 880.00
  };
  var STEP = 0.9;        // فاصله نت‌ها (ثانیه)
  var DUR = 1.6;         // طول هر نت با decay نرم
  var VOL = 0.045;       // خیلی آرام

  var MELODIES = {
    tour: [
      // C — آرپژ بالارونده/فرودی، روشن
      'C4','E4','G4','C5','G4','E4', 'C4','E4','G4','C5','G4','E4',
      // Am — سایه نرم
      'A3','C4','E4','A4','E4','C4', 'A3','C4','E4','A4','E4','C4',
      // F — بازتر
      'F3','A3','C4','F4','C4','A3', 'F3','A3','C4','F4','C4','A3',
      // G — پل به شروع
      'G3','B3','D4','G4','D4','B3', 'G3','B3','D4','G4','D4','B3'
    ],
    room: [
      // Am — پنتاتونیک شبانه، پایین‌تر و آرام‌تر
      'A3','C4','E4','A4','E4','C4', 'A3','C4','E4','A4','E4','C4',
      // F — تنفس
      'F3','A3','C4','F4','C4','A3', 'F3','A3','C4','F4','C4','A3',
      // C — گرم
      'C4','E4','G4','C5','G4','E4', 'C4','E4','G4','C5','G4','E4',
      // G — برگشت آرام
      'G3','B3','D4','G4','D4','B3', 'G3','B3','D4','G4','D4','B3'
    ]
  };

  function ensureCtx() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  function playNote(freq, when) {
    var o = ctx.createOscillator();
    var g = ctx.createGain();
    var o2 = ctx.createOscillator(); // هارمونیک ظریف اکتاو بالا
    var g2 = ctx.createGain();
    o.type = 'sine';
    o.frequency.value = freq;
    o2.type = 'sine';
    o2.frequency.value = freq * 2;
    g2.gain.value = 0.12;
    g.gain.setValueAtTime(0.0001, when);
    g.gain.linearRampToValueAtTime(VOL, when + 0.25);
    g.gain.setValueAtTime(VOL, when + 0.7);
    g.gain.exponentialRampToValueAtTime(0.0001, when + DUR);
    o.connect(g); g.connect(ctx.destination);
    o2.connect(g2); g2.connect(g);
    o.start(when); o.stop(when + DUR + 0.05);
    o2.start(when); o2.stop(when + DUR + 0.05);
  }

  function step() {
    var mel = MELODIES[playing];
    if (!mel) return;
    var when = ctx.currentTime + 0.05;
    // دو نت پشت‌سر: ملودی + باس ریشه آکورد هر ۶ نت
    for (var i = 0; i < 2; i++) {
      var idx = (seq + i) % mel.length;
      var note = mel[idx];
      if (F[note]) playNote(F[note], when + i * STEP * 0.5);
    }
    if (seq % 6 === 0) {
      var root = { tour: 'C3', room: 'A3' }[playing];
      if (F[root]) playNote(F[root], when, DUR > 2 ? 2 : 1);
    }
    seq++;
  }

  function start(kind) {
    if (!kind || !MELODIES[kind]) kind = 'tour';
    if (playing === kind) return;
    stop();
    try {
      ensureCtx();
      playing = kind;
      seq = 0;
      step();
      timer = setInterval(step, STEP * 1000);
    } catch (e) { playing = null; }
  }

  function stop() {
    if (timer) { clearInterval(timer); timer = null; }
    playing = null;
  }

  return { start: start, stop: stop, isPlaying: function () { return !!playing; } };
})();
