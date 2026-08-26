/*
  یاران — سامانه‌ی دسته‌بندی محتوا (نسخه‌ی ۲ — بازطراحی کامل)
  ────────────────────────────────────────────────────────────────
  به‌جای رشته‌های آزاد «category» که سال‌ها بی‌قاعده انباشته شده بود،
  هر آیتم روی پنج بُعد (فاست) مستقل توصیف می‌شود:

    type      نوع محتوا        (تک‌انتخابی): کاربرگ، ویدیو، صوت، بازی، فعالیت، درس تعاملی، فرم
    domain    حوزه‌ی رشد       (۱ تا ۳ مقدار): شناختی، زبان، ریاضی، علوم، حرکتی، اجتماعی، هنر، موسیقی، زندگی، سلامت، خانواده، حرفه‌ای
    audience  مخاطب            : کودک، والدین، مربیان، مدیران
    age       گروه سنی         : ۲–۳ ، ۳–۴ ، ۴–۵ ، ۵–۶ ، همه سنین
    genre     ژانر رسانه       (فقط صوت/ویدیو): قصه، لالایی، ترانه، مدیتیشن، پادکست، شعر، موسیقی آرام، آموزشی

  منبع (source) و اتاق (room) هم به‌صورت پویا از خود آیتم استخراج می‌شوند.
  دسته‌های قدیمیِ آزاد به‌صورت خودکار با جدول نگاشت + قواعد احتمالی به این ساختار ترجمه می‌شوند؛
  داده‌ی جدید لازم نیست تغییر کند — فقط غنی‌سازی می‌شود (item._tax کش می‌شود).
*/
var YaranTax = (function () {
  "use strict";

  /* ══════════ ۱) فاست‌ها ══════════ */
  var FACETS = {
    type: {
      key: "type", label: "نوع محتوا", icon: "🧩", multi: false,
      values: {
        worksheet: { fa: "کاربرگ",     icon: "📄", color: "#4f8ef7" },
        video:     { fa: "ویدیو",      icon: "🎬", color: "#e05263" },
        audio:     { fa: "صوت",        icon: "🔊", color: "#9b59d0" },
        game:      { fa: "بازی",       icon: "🎮", color: "#ff9f43" },
        activity:  { fa: "فعالیت",     icon: "✂️", color: "#2ecc71" },
        deck:      { fa: "درس تعاملی", icon: "🖥️", color: "#17a2b8" },
        form:      { fa: "فرم و اوراق", icon: "🗂️", color: "#8d99ae" }
      }
    },
    domain: {
      key: "domain", label: "حوزه‌ی رشد", icon: "🌱", multi: true,
      values: {
        cognitive: { fa: "شناخت و هوش",        icon: "🧠", color: "#6c5ce7" },
        language:  { fa: "زبان و ادبیات",      icon: "📖", color: "#0984e3" },
        math:      { fa: "ریاضی و منطق",       icon: "🔢", color: "#00b894" },
        science:   { fa: "علوم و طبیعت",       icon: "🔬", color: "#00cec9" },
        motor:     { fa: "حرکت و بدن",         icon: "🤸", color: "#fdcb6e" },
        social:    { fa: "اجتماعی و عاطفی",    icon: "💞", color: "#e17055" },
        art:       { fa: "هنر و خلاقیت",       icon: "🎨", color: "#fd79a8" },
        music:     { fa: "موسیقی و ریتم",      icon: "🎵", color: "#a29bfe" },
        life:      { fa: "زندگی و خودمراقبتی", icon: "🌱", color: "#55efc4" },
        health:    { fa: "سلامت و تغذیه",      icon: "🍎", color: "#ff7675" },
        family:    { fa: "خانواده و والدگری",  icon: "👨‍👩‍👧", color: "#fab1a0" },
        pro:       { fa: "حرفه‌ای و اداری",    icon: "🗂️", color: "#636e72" }
      }
    },
    audience: {
      key: "audience", label: "مخاطب", icon: "👥", multi: true,
      values: {
        child:   { fa: "کودکان",          icon: "🧒", color: "#ff9f43" },
        parent:  { fa: "والدین",          icon: "👨‍👩‍👧", color: "#54a0ff" },
        teacher: { fa: "مربیان",          icon: "👩‍🏫", color: "#1dd1a1" },
        staff:   { fa: "مدیران و کارکنان", icon: "🏫", color: "#576574" }
      }
    },
    age: {
      key: "age", label: "گروه سنی", icon: "🎈", multi: true,
      values: {
        "2-3": { fa: "۲ تا ۳ سال", icon: "🍼" },
        "3-4": { fa: "۳ تا ۴ سال", icon: "🧸" },
        "4-5": { fa: "۴ تا ۵ سال", icon: "🎨" },
        "5-6": { fa: "۵ تا ۶ سال", icon: "🎒" },
        "all": { fa: "همه سنین",   icon: "🌈" }
      }
    },
    genre: {
      key: "genre", label: "ژانر رسانه", icon: "🎧", multi: true, onlyTypes: ["audio", "video"],
      values: {
        story:      { fa: "قصه و داستان",    icon: "📖" },
        lullaby:    { fa: "لالایی",           icon: "🌙" },
        song:       { fa: "ترانه و آهنگ",     icon: "🎶" },
        meditation: { fa: "آرامش و مدیتیشن",  icon: "🧘" },
        podcast:    { fa: "پادکست",           icon: "🎙️" },
        poem:       { fa: "شعر",              icon: "✍️" },
        calm:       { fa: "موسیقی آرام",      icon: "🎵" },
        instructional: { fa: "آموزشی",       icon: "📚" }
      }
    },
    source: {
      key: "source", label: "منبع", icon: "🏷️", multi: false, dynamic: true,
      values: {
        yaran:        { fa: "یاران",             icon: "⭐" },
        somayehrouhi: { fa: "سایه روحی",          icon: "📄" },
        istgah:       { fa: "ایستگاه کودک",       icon: "🎵" },
        castbox:      { fa: "کست‌باکس",          icon: "🎙️" },
        wikimedia:    { fa: "ویکی‌مدیا",         icon: "🌍" },
        mahd:         { fa: "محتوای مهد",        icon: "📁" },
        youtube:      { fa: "یوتیوب",            icon: "▶️" }
      }
    }
  };

  /* ══════════ ۲) نگاشت دسته‌های قدیمی → بُعدهای جدید ══════════ */
  // کلید = رشته‌ی category در داده‌های موجود (با دو املا/فاصله‌گذاری)، مقدار = {d:[domain], a:[audience], g?:[genre], t?:type override}
  var LEGACY = {
    /* — شناختی/هوش — */
    "هوش مکانی": { d: ["cognitive", "math"] }, "هوش و تمرکز": { d: ["cognitive"] }, "مهارت شناختی": { d: ["cognitive"] },
    "شناخت الگو": { d: ["cognitive", "math"] }, "الگوسازی": { d: ["cognitive", "math"] }, "دسته‌بندی": { d: ["cognitive"] },
    "جورچین": { d: ["cognitive"], t: "game" }, "پازل": { d: ["cognitive"], t: "game" }, "بازی فکری": { d: ["cognitive"], t: "game" },
    "شطرنج و قرینه": { d: ["cognitive"], t: "game" }, "شناسایی": { d: ["cognitive"] }, "مجموعه متناظر": { d: ["cognitive"] },
    "بگرد و پیدا کن": { d: ["cognitive", "motor"], t: "activity" }, "نقشه‌خوانی": { d: ["cognitive"] }, "بازی نقشه": { d: ["cognitive"], t: "game" },
    "ساعت": { d: ["cognitive", "math"] }, "آموزش ساعت": { d: ["cognitive", "math"] },
    /* — زبان — */
    "فارسی": { d: ["language"] }, "شناخت حروف": { d: ["language"] }, "کلمات متضاد": { d: ["language"] }, "متضاد": { d: ["language"] },
    "خط و نقطه‌چین": { d: ["language", "motor"] }, "کتابخوانی": { d: ["language"] }, "کتاب‌خوانی": { d: ["language"] },
    "داستان‌سازی": { d: ["language", "art"] }, "بازی زبانی": { d: ["language"], t: "game" }, "شعر و ادبیات": { d: ["language", "art"] },
    "قصه‌گویی": { d: ["language", "art"] },
    /* — ریاضی — */
    "ریاضی": { d: ["math"] }, "اعمال ریاضی": { d: ["math"] }, "شمارش": { d: ["math"] },
    "ردیف اعداد": { d: ["math"] }, "ردیف کردن اعداد": { d: ["math"] }, "شناخت اعداد": { d: ["math"] },
    "شمارش و ردیف": { d: ["math"] }, "شمارش و ردیف اعداد": { d: ["math"] }, "شمارش و مقایسه": { d: ["math"] },
    "اندازه": { d: ["math", "cognitive"] }, "اندازه‌گیری": { d: ["math"] }, "شناخت اندازه": { d: ["math", "cognitive"] },
    /* — علوم — */
    "علوم": { d: ["science"] }, "آزمایش علمی": { d: ["science"], t: "activity" }, "آزمایش علوم": { d: ["science"], t: "activity" },
    "شناخت طبیعت": { d: ["science"] }, "طبیعت": { d: ["science"] }, "مشاهده طبیعت": { d: ["science"], t: "activity" },
    "گیاهان": { d: ["science"] }, "آب و هوا": { d: ["science"] }, "آب وهوا": { d: ["science"] },
    "شناخت حیوانات": { d: ["science"] }, "شناخت میوه": { d: ["science", "health"] }, "آشنایی با میوه و سبزی": { d: ["science", "health"] },
    /* — حرکتی — */
    "بازی حرکتی": { d: ["motor"], t: "game" }, "ورزش و حرکتی": { d: ["motor"] }, "حرکات بدنی": { d: ["motor"] },
    "حرکات موزون": { d: ["motor", "music"] }, "آزمایش حرکتی": { d: ["motor"], t: "activity" },
    "بازی آبی": { d: ["motor"], t: "activity" }, "بازی گروهی": { d: ["motor", "social"], t: "game" },
    /* — اجتماعی/عاطفی — */
    "مهارت اجتماعی": { d: ["social"] }, "مهارت عاطفی": { d: ["social"] }, "شناخت اجتماعی": { d: ["social"] },
    "ارتباط": { d: ["social"] }, "ارتباط والد-مهد": { d: ["social", "family"], a: ["parent"] },
    "کار گروهی": { d: ["social"], t: "activity" }, "بازی اجتماعی": { d: ["social"], t: "game" },
    "بازی خلاقانه": { d: ["social", "art"], t: "game" },
    /* — هنر — */
    "رنگ‌آمیزی": { d: ["art", "motor"], t: "activity" }, "نقاشی کودک": { d: ["art"], t: "activity" },
    "نقاشی آبی": { d: ["art", "motor"], t: "activity" }, "نقاشی انگشتی": { d: ["art", "motor"], t: "activity" },
    "کاردستی": { d: ["art", "motor"], t: "activity" }, "کاردستی پیشرفته": { d: ["art", "motor"], t: "activity" },
    "خمیربازی": { d: ["art", "motor"], t: "activity" }, "خمیربازی خلاقانه": { d: ["art", "motor"], t: "activity" },
    "دست ورزی": { d: ["art", "motor"], t: "activity" }, "دست‌ورزی": { d: ["art", "motor"], t: "activity" },
    "نمایش": { d: ["art", "language"] }, "نمایش خلاق": { d: ["art", "language"] }, "نمایش سایه": { d: ["art"] },
    "نمایش عروسکی": { d: ["art", "language"] }, "آلبوم کار": { d: ["art"] }, "هنر در حیاط": { d: ["art", "science"], t: "activity" },
    "رقص": { d: ["art", "motor"] }, "رقص خلاقانه": { d: ["art", "motor"] }, "رقص نمایشی": { d: ["art", "motor"] },
    /* — موسیقی — */
    "موسیقی": { d: ["music"] }, "بازی موسیقی": { d: ["music"], t: "game" }, "شناخت موسیقی": { d: ["music"] },
    "نوازندگی": { d: ["music"] }, "نوازندگی گروهی": { d: ["music", "social"] }, "سازسازی": { d: ["music", "art"], t: "activity" },
    "سازسازی طبیعی": { d: ["music", "science"], t: "activity" }, "ریتم": { d: ["music"] }, "ریتم نمایشی": { d: ["music", "art"] },
    "ریتم و صدا": { d: ["music", "science"] }, "اجرا موسیقی": { d: ["music", "art"] }, "آهنگ‌سازی": { d: ["music", "art"] },
    "موسیقی آرام": { d: ["music"], g: ["calm"] }, "موسیقی بلز": { d: ["music"], g: ["calm"] },
    "کافه خیال - موسیقی بی کلام": { d: ["music"], g: ["calm"] },
    /* — زندگی/بهداشت — */
    "مهارت زندگی": { d: ["life"] }, "خودمراقبتی": { d: ["life"] }, "بهداشت": { d: ["health", "life"] },
    "بهداشت شخصی": { d: ["life", "health"] }, "عادت سالم": { d: ["health", "life"] }, "عادت غذایی سالم": { d: ["health", "life"] },
    "تغذیه": { d: ["health"] }, "آداب غذا": { d: ["life", "social"] }, "آشپزی ساده": { d: ["life", "science"], t: "activity" },
    "بازی غذایی": { d: ["life"], t: "game" },
    "آرامسازی": { d: ["health", "social"], g: ["meditation"] }, "آرام‌سازی": { d: ["health", "social"], g: ["meditation"] },
    "تکنیک آرامسازی سریع": { d: ["health"], g: ["meditation"] }, "تکنیک آرام‌سازی سریع": { d: ["health"], g: ["meditation"] },
    "مدیریت استرس": { d: ["health", "pro"], a: ["teacher", "parent"] },
    /* — خانواده/والدگری — */
    "فرزندپروری": { d: ["family"], a: ["parent"] }, "فرزند پروری مثبت": { d: ["family"], a: ["parent"] },
    "کتاب فرزندپروری": { d: ["family"], a: ["parent"] }, "تربیت جنسی": { d: ["family", "health"], a: ["parent"] },
    "روانشناسی کودک": { d: ["family", "social"], a: ["parent", "teacher"] },
    "اضطراب کودک": { d: ["family", "social"], a: ["parent", "teacher"] },
    "اختلالات روانی": { d: ["family", "health"], a: ["parent", "teacher"] },
    "اختلالات اضطرابی ترکمان": { d: ["family", "health"], a: ["parent", "teacher"] },
    "بالینی کودک": { d: ["health"], a: ["teacher", "staff"] },
    "کودکان استثنایی": { d: ["family", "social"], a: ["parent", "teacher", "staff"] },
    "مددکاری": { d: ["social", "pro"], a: ["staff", "teacher"] }, "کودک‌یاری": { d: ["social", "pro"], a: ["staff", "teacher"] },
    "مددکاری و کودک‌یاری": { d: ["social", "pro"], a: ["staff", "teacher"] },
    /* — حرفه‌ای/اداری — */
    "مدیریت کلاس": { d: ["pro"], a: ["teacher"] }, "ارزیابی رشد": { d: ["pro"], a: ["teacher"] },
    "واحد کار": { d: ["pro"], a: ["teacher"] }, "موضوع جلسه": { d: ["pro"], a: ["teacher", "staff"] },
    "منابع آموزشی": { d: ["pro"], a: ["teacher"] }, "آزمون و ارزیابی": { d: ["pro"], a: ["teacher"] },
    "راهنما": { d: ["pro"], a: ["teacher"] },
    "فرم": { d: ["pro"], a: ["staff"], t: "form" }, "فرمهای اداری": { d: ["pro"], a: ["staff"], t: "form" },
    "فرم‌های اداری": { d: ["pro"], a: ["staff"], t: "form" }, "فرم‌های ارتباطی": { d: ["pro"], a: ["staff"], t: "form" },
    "فرمهای ارزیابی": { d: ["pro"], a: ["teacher"], t: "form" }, "فرم‌های ارزیابی": { d: ["pro"], a: ["teacher"], t: "form" },
    "فرم‌های روزانه": { d: ["pro"], a: ["teacher"], t: "form" }, "گواهی": { d: ["pro"], a: ["staff"], t: "form" },
    /* — انواع صریح قدیمی — */
    "کاربرگ": { t: "worksheet" }, "کاربرگ چاپی": { t: "worksheet" }, "کاربرگ پیش‌دبستانی": { t: "worksheet" },
    "فعالیت آماده": { t: "activity" }, "ویدیو": { t: "video" }, "ویدیوی آموزشی": { t: "video", g: ["instructional"] },
    "بازی": { t: "game" }, "بازی آموزشی": { t: "game", d: ["cognitive"] }, "بازی حسی": { d: ["motor", "science"], t: "game" },
    "قصه": { g: ["story"] }, "قصه کودک": { g: ["story"] }, "قصه حیوانات": { g: ["story"] }, "قصه خواب": { g: ["story", "lullaby"] },
    "قصه شب کودک": { g: ["story"] }, "داستان": { g: ["story"] }, "داستان شب کودک": { g: ["story"] },
    "قصه کلاسیک کودک": { g: ["story"] }, "قصه و خیال": { g: ["story"] }, "قصه و مدیتیشن": { g: ["story", "meditation"] },
    "شب بخیر کوچولو": { g: ["lullaby"] }, "لالایی": { g: ["lullaby"] }, "ترانه کودکانه": { g: ["song"] },
    "آهنگ‌های سال": { g: ["song"] }, "مدیتیشن بزرگسال": { g: ["meditation"], a: ["parent", "teacher"] },
    "شعر": { g: ["poem"], d: ["language"] },
    /* — نام اتاق‌ها که گاهی به‌عنوان category ثبت شده — */
    "اتاق بهداشت و سلامت": { d: ["health"] }, "اتاق خواب": {}, "اتاق مربی": {},
    "جلسه اولیا": { d: ["family"], a: ["parent"] }, "تریا": {}, "حیاط": {},
    "استراحت مربیان": { d: ["pro"], a: ["teacher"] },
    /* — انگلیسی‌ها (کتابخانه ویدیو) — */
    "education": { g: ["instructional"] }, "parenting": { d: ["family"], a: ["parent"] }, "health": { d: ["health"] },
    "MAHD": {}
  };

  /* ══════════ ۳) قواعد احتمالی برای دسته‌های دیده‌نشده ══════════ */
  var RULES = [
    [/فرزندپروری|والد|مادر|پدر|خانواده/, { d: ["family"], a: ["parent"] }],
    [/مربی|معلم|کلاس|مدیری/, { d: ["pro"], a: ["teacher"] }],
    [/فرم|گواهی|ادار/, { d: ["pro"], a: ["staff"], t: "form" }],
    [/قصه|داستان|حکایت/, { g: ["story"] }],
    [/لالایی|شب بخیر/, { g: ["lullaby"] }],
    [/ترانه|آهنگ|سرود/, { g: ["song"] }],
    [/مدیتیشن|مراقبه|آرام/, { g: ["meditation"] }],
    [/شعر/, { g: ["poem"], d: ["language"] }],
    [/ریاض|عدد|شمارش/, { d: ["math"] }],
    [/علوم|طبیعت|گیاه|حیوان|آب و هوا/, { d: ["science"] }],
    [/حرف|فارسی|خط|خواندن|نوشتن|کتاب/, { d: ["language"] }],
    [/رنگ|نقاشی|هنر|کاردستی|خمیر/, { d: ["art"] }],
    [/موسیقی|ریتم|آواز|نوازندگ|ساز/, { d: ["music"] }],
    [/حرکت|ورزش|بدنی|موزون/, { d: ["motor"] }],
    [/بهداشت|سلامت|تغذیه|غذا|خواب/, { d: ["health", "life"] }],
    [/اجتماعی|عاطفی|احساس|دوست/, { d: ["social"] }],
    [/هوش|شناخت|تمرکز|حافظه|تفکر/, { d: ["cognitive"] }]
  ];

  var SOURCE_PATTERNS = [
    [/somayehrouhi/i, "somayehrouhi"], [/istgah|ایستگاه/i, "istgah"],
    [/castbox|s3\.castbox/i, "castbox"], [/wikimedia/i, "wikimedia"],
    [/youtube|youtu\.be/i, "youtube"], [/assets\/mahd|mahd/i, "mahd"]
  ];

  /* ══════════ ۴) غنی‌سازی آیتم ══════════ */
  function normKey(s) {
    return String(s || "").replace(/\u200c/g, " ").replace(/\s+/g, " ").trim();
  }

  function inferType(item) {
    if (item.type) {
      var t = item.type;
      if (/^audio[-ـ]/.test(t)) return "audio";
      if (FACETS.type.values[t]) return t;
      if (t === "pdf") return item.form ? "form" : "worksheet";
      if (t === "story") return "deck";
      if (t === "craft") return "activity";
      if (t === "image") return "worksheet";
    }
    if (item.game) return "game";
    if (item.audioUrl || /\.(mp3|m4a|ogg|wav)(\?|#|$)/i.test(item.url || "")) return "audio";
    if (/\.(mp4|webm)(\?|#|$)/i.test(item.url || "") || /youtube/.test(item.url || "")) return "video";
    if (item.deckId || item.deck) return "deck";
    if (item.instructions && !item.url) return "activity";
    return "worksheet";
  }

  function inferAudience(item, mapped) {
    var out = [];
    var raw = normKey(item.audience);
    if (/والد|پدر|مادر/.test(raw)) out.push("parent");
    if (/مربی|معلم/.test(raw)) out.push("teacher");
    if (/مدیر|کارمند|کارکنان|staff/.test(raw)) out.push("staff");
    if (/کودک|child/.test(raw)) out.push("child");
    if (!out.length && mapped && mapped.a) out = mapped.a.slice();
    if (!out.length) {
      var t = inferType(item);
      if (t === "form") out = ["staff"];
      else if (t === "deck") out = ["parent", "teacher"];
      else out = ["child"];
    }
    return dedupe(out);
  }

  function inferAges(item) {
    var ages = [];
    if (typeof item.ageMin === "number" || typeof item.ageMax === "number") {
      var lo = item.ageMin || 2, hi = item.ageMax || lo;
      [["2-3", 2, 2.99], ["3-4", 3, 3.99], ["4-5", 4, 4.99], ["5-6", 5, 6.49]].forEach(function (band) {
        if (hi >= band[1] && lo <= band[2]) ages.push(band[0]);
      });
      if (!ages.length) ages.push("5-6");
      return ages;
    }
    var m = normKey(item.age).match(/(\d)\s*[-–تا]\s*(\d)/);
    if (m) {
      var lo2 = +m[1], hi2 = +m[2];
      Object.keys(FACETS.age.values).forEach(function (k) {
        if (k === "all") return;
        var b = k.split("-"); var bl = +b[0], bh = +b[1];
        if (hi2 >= bl && lo2 <= bh) ages.push(k);
      });
      if (ages.length) return ages;
    }
    return ["all"];
  }

  function inferSource(item) {
    var hay = (item.source || "") + " " + (item.url || "") + " " + (item.channel || "");
    for (var i = 0; i < SOURCE_PATTERNS.length; i++) {
      if (SOURCE_PATTERNS[i][0].test(hay)) return SOURCE_PATTERNS[i][1];
    }
    if (item.source === "یاران" || !item.source) return "yaran";
    return null; // منبع سفارشی
  }

  var _cache = typeof WeakMap !== "undefined" ? new WeakMap() : null;

  function enrich(item) {
    if (_cache && item && item._tax) return item._tax;
    var cat = normKey(item.category);
    var mapped = LEGACY[cat] || LEGACY[item.category] || {};
    if (!Object.keys(mapped).length && cat) {
      // قواعد احتمالی
      for (var i = 0; i < RULES.length; i++) {
        if (RULES[i][0].test(cat)) { mapped = mergeRule(mapped, RULES[i][1]); break; }
      }
    }
    var type = mapped.t || inferType(item);
    var tax = {
      type: type,
      domains: mapped.d ? mapped.d.slice() : [],
      audiences: inferAudience(item, mapped),
      ages: inferAges(item),
      genres: [],
      source: inferSource(item),
      sourceRaw: item.source || "",
      room: item.room || item._room || null,
      canonCat: cat
    };
    // ژانر: از نگاشت، یا تشخیص از عنوان/کانال برای صوت
    if (mapped.g) tax.genres = mapped.g.slice();
    else if (type === "audio" || type === "video") tax.genres = detectGenre(item);
    if (!tax.domains.length) {
      // قواعد احتمالی روی عنوان/توضیح هم اجرا شود (خیلی از کاربرگ‌ها دسته‌ی کلی دارند ولی عنوان گویاست)
      var hay = normKey((item.title || "") + " " + (item.desc || "") + " " + cat);
      for (var j = 0; j < RULES.length; j++) {
        if (RULES[j][0].test(hay)) { tax.domains = (RULES[j][1].d || []).slice(); break; }
      }
    }
    if (!tax.domains.length) {
      tax.domains = defaultDomains(item, type, tax.genres);
    }
    if (_cache && item) { try { item._tax = tax; } catch (e) { /* frozen */ } }
    return tax;
  }

  function mergeRule(a, b) {
    var out = { d: (a.d || []).slice(), a: (a.a || []).slice(), g: (a.g || []).slice() };
    (b.d || []).forEach(function (x) { if (out.d.indexOf(x) < 0) out.d.push(x); });
    (b.a || []).forEach(function (x) { if (out.a.indexOf(x) < 0) out.a.push(x); });
    (b.g || []).forEach(function (x) { if (out.g.indexOf(x) < 0) out.g.push(x); });
    if (b.t) out.t = b.t;
    return out;
  }

  function detectGenre(item) {
    var hay = normKey((item.title || "") + " " + (item.channel || "") + " " + (item.info || "") + " " + (item.desc || ""));
    var g = [];
    if (/لالایی|شب بخیر|خواب/.test(hay)) g.push("lullaby");
    if (/قصه|داستان|حکایت/.test(hay)) g.push("story");
    if (/ترانه|آهنگ|سرود|song|music/i.test(hay)) g.push("song");
    if (/مدیتیشن|مراقبه|آرامسازی|mindful/i.test(hay)) g.push("meditation");
    if (/پادکست|podcast|گفتگو با/.test(hay)) g.push("podcast");
    if (/شعر/.test(hay)) g.push("poem");
    if (/بی ?کلام|آرامش|instrumental|بلز/.test(hay)) g.push("calm");
    if (!g.length && /آموزش|learn|edu/i.test(hay)) g.push("instructional");
    return dedupe(g);
  }

  function defaultDomains(item, type, genres) {
    if (genres.indexOf("meditation") >= 0 || genres.indexOf("calm") >= 0 || genres.indexOf("lullaby") >= 0) return ["health"];
    if (genres.indexOf("podcast") >= 0) return ["family"];
    if (genres.indexOf("story") >= 0 || genres.indexOf("poem") >= 0) return ["language", "art"];
    if (genres.indexOf("song") >= 0) return ["music"];
    if (type === "form") return ["pro"];
    if (type === "deck") return ["family", "pro"];
    if (type === "game") return ["cognitive"];
    if (type === "worksheet" || type === "activity") return ["cognitive"]; // کاربرگ عمومی پیش‌فرض
    return [];
  }

  /* ══════════ ۵) جستجو/فیلتر ══════════ */
  function facetOf(item, key) {
    var tax = enrich(item);
    switch (key) {
      case "type": return [tax.type];
      case "domain": return tax.domains;
      case "audience": return tax.audiences;
      case "age": return tax.ages;
      case "genre": return tax.genres;
      case "source": return tax.source ? [tax.source] : [];
    }
    return [];
  }

  function filter(items, sel) {
    sel = sel || {};
    return items.filter(function (it) {
      for (var k in sel) {
        var want = sel[k];
        if (!want || !want.length) continue;
        var have = facetOf(it, k);
        var ok = want.some(function (w) { return have.indexOf(w) >= 0; });
        if (!ok) return false;
      }
      return true;
    });
  }

  function counts(items, key) {
    var c = {};
    items.forEach(function (it) {
      facetOf(it, key).forEach(function (v) { c[v] = (c[v] || 0) + 1; });
    });
    return c;
  }

  /* برچسب کوتاه برای نمایش روی کارت */
  function chipHtml(facetKey, valueId, extraCls) {
    var f = FACETS[facetKey];
    if (!f) return "";
    var v = f.values[valueId];
    if (!v) return valueId === "__custom__" ? "" : "";
    var style = v.color ? ' style="background:' + v.color + '22;color:' + v.color + ';border-color:' + v.color + '55"' : "";
    return '<span class="tax-chip' + (extraCls ? " " + extraCls : "") + '" data-facet="' + facetKey + '" data-value="' + valueId + '"' + style + '>' +
      (v.icon ? '<span class="tax-chip-icon">' + v.icon + '</span>' : '') +
      '<span>' + v.fa + '</span></span>';
  }

  function chipsHtml(item, opts) {
    opts = opts || {};
    var tax = enrich(item);
    var out = [];
    out.push(chipHtml("type", tax.type));
    if (!opts.noDomain) tax.domains.slice(0, opts.maxDomains || 2).forEach(function (d) { out.push(chipHtml("domain", d)); });
    if (opts.withAudience) tax.audiences.forEach(function (a) { out.push(chipHtml("audience", a)); });
    var srcChip = "";
    if (tax.source) srcChip = chipHtml("source", tax.source);
    else if (tax.sourceRaw) srcChip = '<span class="tax-chip">🏷️ ' + esc(tax.sourceRaw.split("/")[0].slice(0, 18)) + '</span>';
    if (srcChip) out.push(srcChip);
    return out.join("");
  }

  function esc(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function dedupe(arr) {
    var seen = {}, out = [];
    arr.forEach(function (x) { if (!seen[x]) { seen[x] = 1; out.push(x); } });
    return out;
  }

  /* نوار فاست برای صفحات جستجو/بایگانی/محتوای اتاق */
  function facetBar(containerId, items, onChange, visibleFacets) {
    var el = document.getElementById(containerId);
    if (!el) return;
    visibleFacets = visibleFacets || ["type", "domain", "audience", "genre"];
    var state = {};
    var html = '<div class="tax-facetbar">';
    visibleFacets.forEach(function (fk) {
      var f = FACETS[fk];
      var countsMap = counts(items, fk);
      var keys = Object.keys(f.values).filter(function (v) { return countsMap[v]; });
      if (f.onlyTypes) keys = keys.filter(function (v) { return true; });
      if (!keys.length) return;
      html += '<div class="tax-facet" data-facet="' + fk + '">' +
        '<button class="tax-facet-btn" type="button">' + f.icon + " " + f.label + ' <span class="tax-caret">▾</span></button>' +
        '<div class="tax-facet-menu">';
      keys.forEach(function (v) {
        var val = f.values[v];
        html += '<label class="tax-facet-opt"><input type="checkbox" value="' + v + '" /> ' +
          (val.icon ? val.icon + " " : "") + val.fa +
          ' <span class="tax-count">' + YaranTax_num(countsMap[v]) + "</span></label>";
      });
      html += "</div></div>";
    });
    html += '<button class="tax-clear hidden" type="button">✕ حذف فیلترها</button></div>';
    el.innerHTML = html;

    function apply() {
      var sel = {};
      var any = false;
      el.querySelectorAll(".tax-facet").forEach(function (fc) {
        var vals = [];
        fc.querySelectorAll("input:checked").forEach(function (cb) { vals.push(cb.value); });
        if (vals.length) { sel[fc.dataset.facet] = vals; any = true; }
      });
      el.querySelector(".tax-clear").classList.toggle("hidden", !any);
      el.querySelectorAll(".tax-facet").forEach(function (fc) {
        fc.classList.toggle("has-filter", !!sel[fc.dataset.facet]);
      });
      onChange(sel);
    }

    el.querySelectorAll(".tax-facet-btn").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        var fc = btn.closest(".tax-facet");
        var wasOpen = fc.classList.contains("open");
        el.querySelectorAll(".tax-facet.open").forEach(function (o) { o.classList.remove("open"); });
        if (!wasOpen) fc.classList.add("open");
      });
    });
    document.addEventListener("click", function (e) {
      if (!e.target.closest(".tax-facet")) el.querySelectorAll(".tax-facet.open").forEach(function (o) { o.classList.remove("open"); });
    });
    el.querySelectorAll(".tax-facet-opt input").forEach(function (cb) {
      cb.addEventListener("change", apply);
    });
    el.querySelector(".tax-clear").addEventListener("click", function () {
      el.querySelectorAll(".tax-facet-opt input:checked").forEach(function (cb) { cb.checked = false; });
      apply();
    });

    state.get = function () { return el.querySelectorAll(".tax-facet input:checked").length; };
    return state;
  }
  function YaranTax_num(n) { return String(n); } // ارقام فارسی توسط YCal.num در لایه‌ی CSS/فراخوان انجام شود

  return {
    FACETS: FACETS, LEGACY: LEGACY,
    enrich: enrich, filter: filter, counts: counts, facetOf: facetOf,
    chipHtml: chipHtml, chipsHtml: chipsHtml, facetBar: facetBar
  };
})();
