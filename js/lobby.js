/* لابی: نکته روز فرزندپروری + اسلایدشو محتوا + چند-صفحه تم */

var PARENTING_TIPS = [
  { cat: "ارتباط", text: "روزی ۱۵ دقیقه بازی آزاد با کودک، بیشتر از هر اسباب‌بازی گران‌قیمتی بر رشد عاطفی او تأثیر دارد.", src: "کتاب فرزندپروری مثبت — گوردون نیوفلد" },
  { cat: "گفتار", text: "با کودک خود به جای دستور دادن، سؤال باز بپرسید: «امروز چه چیزی تو رو خوشحال کرد؟»", src: "انستیتو مطالعات کودک" },
  { cat: "خواب", text: "خواب کافی در سنین پیش‌دبستانی (۱۰-۱۳ ساعت) نقش اساسی در تقویت حافظه و یادگیری دارد.", src: "آکادمی اطفال آمریکا" },
  { cat: "تغذیه", text: "صبحانه کامل با پروتئین و فیبر، تمرکز کودک را در کلاس تا ۴۰٪ بهبود می‌بخشد.", src: "سازمان بهداشت جهانی" },
  { cat: "احساسات", text: "نام‌گذاری احساسات کودک («می‌بینم ناراحتی») به او کمک می‌کند هوش هیجانی را رشد دهد.", src: "دانیل گلمن — هوش هیجانی" },
  { cat: "بازی", text: "بازی نقش (نقش‌بازی) مهارت‌های اجتماعی و زبانی کودک را به‌طرز چشمگیری تقویت می‌کند.", src: "ویگوتسکی — نظریه یادگیری اجتماعی" },
  { cat: "خلاقیت", text: "اجازه دهید کودک در بازی خطا کند؛ آزمون و خطا مهم‌ترین روش یادگیری در سنین پایین است.", src: "ماریا مونته‌سوری" },
  { cat: "انضباط", text: "به جای تنبیه، از عواقب طبیعی استفاده کنید: اگر اسباب‌بازی را پرت کند، مدتی از آن محروم می‌شود.", src: "کتاب فرزندپروری مثبت" },
  { cat: "ارتباط", text: "گوش دادن فعال: وقتی کودک صحبت می‌کند، گوشی‌تان را کنار بگذارید و تماس چشمی برقرار کنید.", src: "مرکز مشاوره خانواده" },
  { cat: "حرکت", text: "کودکان پیش‌دبستانی روزانه حداقل ۶۰ دقیقه فعالیت بدنی نیاز دارند.", src: "سازمان بهداشت جهانی" },
  { cat: "زبان", text: "خواندن روزانه داستان به کودک، دایره لغت او را گسترش می‌دهد و عشق به کتابخوانی را در او پرورش می‌دهد.", src: "باشگاه کتاب کودک" },
  { cat: "اجتماعی", text: "بازی گروهی به کودک یاد می‌دهد نوبت بگیرد، مشارکت کند و با دیگران تعامل داشته باشد.", src: "انستیتو مطالعات کودک" },
  { cat: "خلاقیت", text: "نقاشی آزاد بدون الگو، خلاقیت و بیان احساسات کودک را تقویت می‌کند.", src: "هنردرمانی کودک" },
  { cat: "تربیت", text: "تعریف کردن از تلاش کودک (نه نتیجه): «خیلی زحمت کشیدی!» به جای «آفرین، قشنگ شد!»", src: "کارول دوک — رشد ذهنیت" },
  { cat: "ایمنی", text: "آموزش ایمنی شخصی به کودکان پیش‌دبستانی با داستان و بازی، مؤثرتر از توضیح خشک است.", src: "پروژه ایمنی کودک" },
  { cat: "هنر", text: "ساختن کاردستی با مواد بازیافتی، هم خلاقیت و هم آگاهی زیست‌محیطی را رشد می‌دهد.", src: "آموزش پایدار" },
  { cat: "موسیقی", text: "آواز خواندن با کودک مهارت‌های زبانی و ریاضی را همزمان تقویت می‌کند.", src: "تحقیقات موسیقی درمانی" },
  { cat: "رشد", text: "هر کودک سرعت رشد متفاوتی دارد؛ مقایسه با همسالان می‌تواند به اعتماد به نفس او آسیب بزند.", src: "آکادمی اطفال آمریکا" },
  { cat: "خانواده", text: "روتین‌های ساده روزانه (صبحانه، بازی، داستانگویی، خواب) احساس امنیت و ثبات در کودک ایجاد می‌کند.", src: "روانشناسی رشد" },
  { cat: "رفتار", text: "به جای گفتن «این کار بدیه»، بگویید «این رفتار درست نیست» — کودک را از رفتارش جدا کنید، نه شخصیتش.", src: "فرزندپروری مثبت", srcUrl: "https://www.amazon.com/Parenting-Teens-Workbook-Christopher-Freytag/dp/157025295X" }
];

/* نکته‌های بیشتر از منابع معتبر */
var PARENTING_TIPS_EXTRA = [
  { cat: "خواب", text: "روتین ثابت خواب (حمام، قصه، خواب) به کودک کمک می‌کند سریع‌تر و آرام‌تر بخوابد.", src: "بنیاد ملی خواب", srcUrl: "https://www.sleepfoundation.org/children-and-sleep" },
  { cat: "تغذیه", text: "کاهش قند افزودنی در رژیم کودک، پرخاشگری و بیش‌فعالی را کاهش می‌دهد.", src: "انجمن تغذیه کودک", srcUrl: "https://www.eatright.org/" },
  { cat: "زبان", text: "صحبت کردن با کودک به زبان کامل و غنی، مهارت زبانی‌اش را سریع‌تر رشد می‌دهد.", src: "انجمن گفتار درمانی", srcUrl: "https://www.asha.org/" },
  { cat: "احساسات", text: "جعبه آرامش (با اسباب‌بازی نرم و کتاب) به کودک کمک می‌کند هنگام خشم خود را تنظیم کند.", src: "روانشناسی کودک", srcUrl: "https://www.zerotothree.org/" },
  { cat: "بازی", text: "زمان بازی بدون وسیله (کارتون‌باکس، پارچه) خلاقیت را بیشتر از اسباب‌بازی‌های هوشمند تحریک می‌کند.", src: "پروژه بازی آزاد", srcUrl: "https://www.playworks.org/" },
  { cat: "اجتماعی", text: "مدل‌سازی همدلی («وقتی دوستت ناراحت است، چه کاری مهربانانه‌ای می‌توانی بکنی؟») همدلی را می‌آموزد.", src: "یونیسف", srcUrl: "https://www.unicef.org/parenting" },
  { cat: "ایمنی", text: "آموزش «بدن من مال منه» و نام درست اعضا، پیشگیری از سوءاستفاده را تقویت می‌کند.", src: "پروژه ایمنی کودک", srcUrl: "https://www.childhelplineinternational.org/" },
  { cat: "رشد", text: "تحسین تلاش بیش از هوش، ذهنیت رشد و پشتکار را در کودک می‌سازد.", src: "کارول دوک — رشد ذهنیت", srcUrl: "https://mindsetworks.com/" },
  { cat: "خانواده", text: "شام خانوادگی بدون گوشی، پیوند عاطفی و مهارت‌های گفتگو را تقویت می‌کند.", src: "تحقیقات خانواده", srcUrl: "https://www.familydinnerproject.org/" },
  { cat: "هنر", text: "نمایش آثار هنری کودک در خانه، اعتماد به نفس و حس ارزشمندی او را بالا می‌برد.", src: "هنردرمانی", srcUrl: "https://www.arttherapy.org/" }
];
PARENTING_TIPS = PARENTING_TIPS.concat(PARENTING_TIPS_EXTRA);

var tipIndex = 0;
var tipTimer = null;

function getIranDateTime() {
  var now = new Date();
  // Convert to Iran timezone (UTC+3:30)
  var utc = now.getTime() + now.getTimezoneOffset() * 60000;
  var iranTime = new Date(utc + 3.5 * 3600000);
  // Use Intl.DateTimeFormat for Persian calendar
  var formatter = new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
  return formatter.format(iranTime);
}

function renderTip() {
  var tip = PARENTING_TIPS[tipIndex];
  var body = document.getElementById("tip-body");
  var counter = document.getElementById("tip-counter");
  var datetime = document.getElementById("tip-datetime");
  if (!body) return;
  var srcLink = tip.srcUrl
    ? '<a class="tip-source-link" href="' + tip.srcUrl + '" target="_blank" rel="noopener">📚 ' + tip.src + '</a>'
    : '<span class="tip-source-text">📚 ' + tip.src + '</span>';
  body.innerHTML = '<div class="tip-category">' + tip.cat + '</div><div class="tip-text">' + tip.text + '</div><div class="tip-source">' + srcLink + '</div>';
  if (counter) counter.textContent = (tipIndex + 1) + ' / ' + PARENTING_TIPS.length;
  if (datetime) datetime.textContent = getIranDateTime();
}

function nextTip() { tipIndex = (tipIndex + 1) % PARENTING_TIPS.length; renderTip(); }
function prevTip() { tipIndex = (tipIndex - 1 + PARENTING_TIPS.length) % PARENTING_TIPS.length; renderTip(); }
function startTipRotation() { clearInterval(tipTimer); tipTimer = setInterval(nextTip, 60000); }

/* اسلایدشو محتوا */
var slideshowItems = [];
var slideIndex = 0;
var slideTimer = null;

function initSlideshow() {
  var items = [];
  // PDFs with images
  var archives = typeof ARCHIVE_DATA !== 'undefined' ? ARCHIVE_DATA : [];
  archives.filter(function(a) { return a.image; }).forEach(function(a) { items.push(a); });
  // Videos with thumbnails
  if (typeof VIDEO_LIBRARY !== 'undefined') {
    VIDEO_LIBRARY.forEach(function(v) {
      items.push({
        title: v.titleFa || v.title, category: 'ویدیو', type: 'video',
        image: 'https://img.youtube.com/vi/' + (v.videoId || '') + '/mqdefault.jpg',
        desc: v.desc || '', url: v.url, channel: v.channel || '',
        age: '', _source: 'video'
      });
    });
  }
  // Audio with actual thumbnails only
  if (typeof AUDIO_LIBRARY !== 'undefined') {
    AUDIO_LIBRARY.filter(function(a) { return a.pageImg && a.pageImg.length > 5; }).slice(0, 60).forEach(function(a) {
      items.push({
        title: a.title, category: a.category || 'صوت', type: 'audio',
        image: a.pageImg, desc: (a.info || '').substring(0, 200),
        url: a.audioUrl || a.pageUrl || '', channel: a.channel || a.category || '',
        age: '', _source: 'audio'
      });
    });
  }
  items.sort(function() { return Math.random() - 0.5; });
  slideshowItems = items.slice(0, 40);
  if (slideshowItems.length === 0) return;
  renderSlide();
}

function renderSlide() {
  if (slideshowItems.length === 0) return;
  var item = slideshowItems[slideIndex];
  var body = document.getElementById("slideshow-body");
  var caption = document.getElementById("slideshow-caption");
  if (!body) return;
  var html = '';
  if (item.image) {
    html = '<img src="' + item.image + '" alt="' + (item.title || '') + '" style="max-width:100%;max-height:100%;object-fit:contain;border-radius:8px;">';
  } else {
    var icon = item.type === 'video' ? '🎬' : item.type === 'audio' ? '🔊' : '📄';
    html = '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;color:#ffb84d;">' +
      '<div style="font-size:4rem;">' + icon + '</div>' +
      '<div style="font-size:1.2rem;margin-top:16px;max-width:80%;text-align:center;">' + (item.title || '') + '</div>' +
      (item.channel ? '<div style="font-size:.9rem;color:#999;margin-top:8px;">' + item.channel + '</div>' : '') +
      '</div>';
  }
  body.innerHTML = html;
  if (caption) {
    var capText = (item.title || '');
    if (item.channel) capText += ' — ' + item.channel;
    if (item.desc) capText += ' — ' + item.desc;
    caption.textContent = capText;
  }
}

function nextSlide() { slideIndex = (slideIndex + 1) % slideshowItems.length; renderSlide(); }
function prevSlide() { slideIndex = (slideIndex - 1 + slideshowItems.length) % slideshowItems.length; renderSlide(); }
function startSlideshow() { clearInterval(slideTimer); slideTimer = setInterval(nextSlide, 10000); }

/* آب‌المزرده */
document.getElementById("tip-next").addEventListener("click", function() { nextTip(); startTipRotation(); });
document.getElementById("tip-prev").addEventListener("click", function() { prevTip(); startTipRotation(); });
var _tipBox = document.getElementById("lobby-tip-box");
var _tipClose = document.getElementById("tip-close");
if (_tipBox && _tipClose) _tipClose.addEventListener("click", function() { _tipBox.style.display = "none"; });
document.getElementById("tip-share").addEventListener("click", function() {
  var tip = PARENTING_TIPS[tipIndex];
  if (navigator.share) navigator.share({ title: 'نکته فرزندپروری یاران', text: tip.cat + ': ' + tip.text });
});
document.getElementById("slide-next").addEventListener("click", function() { nextSlide(); startSlideshow(); });
document.getElementById("slide-prev").addEventListener("click", function() { prevSlide(); startSlideshow(); });
var _slideBox = document.getElementById("lobby-slideshow-box");
var _slideClose = document.getElementById("slide-close");
if (_slideBox && _slideClose) _slideClose.addEventListener("click", function() { _slideBox.style.display = "none"; });
document.getElementById("slide-share").addEventListener("click", function() {
  if (slideshowItems.length === 0) return;
  var item = slideshowItems[slideIndex];
  if (navigator.share) navigator.share({ title: item.title, text: item.title });
});

/* چند-صفحه */
document.querySelectorAll(".theme-toggle").forEach(function(toggle) {
  toggle.addEventListener("click", function(e) {
    var btn = e.target.closest(".theme-btn");
    if (btn) applyTheme(btn.dataset.theme);
  });
});

/* showScreen override: init lobby features on lobby screen */
var _origShowScreen = window.showScreen;
window.showScreen = function(id) {
  _origShowScreen(id);
  if (id === "screen-lobby") {
    tipIndex = Math.floor(Math.random() * PARENTING_TIPS.length);  // نکته اول همیشه رندوم
    renderTip();
    startTipRotation();
    initSlideshow();
    startSlideshow();
  } else {
    clearInterval(tipTimer);
    clearInterval(slideTimer);
  }
};


/* ── ویدیوهای آموزشی — لیست در لابی ── */
function renderLobbyVideos() {
  var el = document.getElementById("lobby-video-list");
  if (!el || typeof VIDEO_LIBRARY === "undefined") return;
  var vids = VIDEO_LIBRARY.slice(0, 12);
  el.innerHTML = vids.map(function(v, i) {
    var title = v.titleFa || v.title || "";
    var lang = v.lang === "fa" ? "🇫🇦" : "🇬🇧";
    var desc = v.descFa || v.desc || "";
    return '<div class="lobby-video-item" data-vid="' + i + '" style="display:flex;gap:8px;padding:6px 0;border-bottom:1px solid rgba(0,0,0,.06);cursor:pointer;align-items:flex-start;">' +
      '<span style="font-size:1.1rem;">' + lang + '</span>' +
      '<div style="flex:1;min-width:0;">' +
        '<div style="font-size:.82rem;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + title + '</div>' +
        '<div style="font-size:.7rem;color:#8a7a6a;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + v.channel + (v.duration ? ' · ' + v.duration : '') + '</div>' +
      '</div></div>';
  }).join("");
  el.querySelectorAll(".lobby-video-item").forEach(function(item) {
    item.addEventListener("click", function() {
      var idx = parseInt(this.dataset.vid);
      var v = vids[idx];
      if (typeof openMediaModal === "function") {
        openMediaModal({ type: "video", title: v.titleFa || v.title, url: v.url, desc: v.desc || v.descFa || "" });
      }
    });
  });
}
