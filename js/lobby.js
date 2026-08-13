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
  { cat: "رفتار", text: "به جای گفتن «این کار بدیه»، بگویید «این رفتار درست نیست» — کودک را از رفتارش جدا کنید، نه شخصیتش.", src: "فرزندپروری مثبت" }
];

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
  body.innerHTML = '<div class="tip-category">' + tip.cat + '</div><div class="tip-text">' + tip.text + '</div><div class="tip-source">📚 ' + tip.src + '</div>';
  if (counter) counter.textContent = (tipIndex + 1) + ' / ' + PARENTING_TIPS.length;
  if (datetime) datetime.textContent = getIranDateTime();
}

function nextTip() { tipIndex = (tipIndex + 1) % PARENTING_TIPS.length; renderTip(); }
function prevTip() { tipIndex = (tipIndex - 1 + PARENTING_TIPS.length) % PARENTING_TIPS.length; renderTip(); }
function startTipRotation() { clearInterval(tipTimer); tipTimer = setInterval(nextTip, 30000); }

/* اسلایدشو محتوا */
var slideshowItems = [];
var slideIndex = 0;
var slideTimer = null;

function initSlideshow() {
  var archives = typeof ARCHIVE_DATA !== 'undefined' ? ARCHIVE_DATA : [];
  var withImages = archives.filter(function(a) { return a.image && a.type === 'pdf'; });
  withImages.sort(function() { return Math.random() - 0.5; });
  slideshowItems = withImages.slice(0, 20);
  if (slideshowItems.length === 0) return;
  renderSlide();
}

function renderSlide() {
  if (slideshowItems.length === 0) return;
  var item = slideshowItems[slideIndex];
  var body = document.getElementById("slideshow-body");
  var caption = document.getElementById("slideshow-caption");
  if (!body) return;
  body.innerHTML = '<img src="' + (item.image || '') + '" alt="' + (item.title || '') + '">';
  if (caption) caption.textContent = item.title || '';
}

function nextSlide() { slideIndex = (slideIndex + 1) % slideshowItems.length; renderSlide(); }
function prevSlide() { slideIndex = (slideIndex - 1 + slideshowItems.length) % slideshowItems.length; renderSlide(); }
function startSlideshow() { clearInterval(slideTimer); slideTimer = setInterval(nextSlide, 5000); }

/* آب‌المزرده */
document.getElementById("tip-next").addEventListener("click", function() { nextTip(); startTipRotation(); });
document.getElementById("tip-prev").addEventListener("click", function() { prevTip(); startTipRotation(); });
document.getElementById("tip-share").addEventListener("click", function() {
  var tip = PARENTING_TIPS[tipIndex];
  if (navigator.share) navigator.share({ title: 'نکته فرزندپروری یاران', text: tip.cat + ': ' + tip.text });
});
document.getElementById("slide-next").addEventListener("click", function() { nextSlide(); startSlideshow(); });
document.getElementById("slide-prev").addEventListener("click", function() { prevSlide(); startSlideshow(); });
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
    renderTip();
    startTipRotation();
    initSlideshow();
    startSlideshow();
  } else {
    clearInterval(tipTimer);
    clearInterval(slideTimer);
  }
};
