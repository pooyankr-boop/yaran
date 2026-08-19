// Orphan fix v2 — exact title matching for lost items
(function(){
  if (typeof ROOMS === "undefined") return;
  var R = ROOMS;
  function room(id){ for(var i=0;i<R.length;i++) if(R[i].id===id) return R[i]; return null; }
  function view(r,v){ return r && r.views ? r.views[v] : null; }
  function hotspot(r,v,t){ var vd=view(r,v); if(!vd) return null; for(var i=0;i<vd.hotspots.length;i++) if(vd.hotspots[i].title===t) return vd.hotspots[i]; return null; }

  function inject(roomId, viewKey, hsTitle, catTitle, items){
    var h = hotspot(room(roomId), viewKey, hsTitle);
    if (!h || !items || !items.length) return;
    for (var i=0;i<h.categories.length;i++){
      if (h.categories[i].title === catTitle){ h.categories[i].items = h.categories[i].items.concat(items); return; }
    }
    h.categories.push({ title: catTitle, items: items });
  }

  // ═══ honar/herog_right — exact titles from base rooms.js ═══
  inject('honar', 'herog_right', 'ساز', 'آزمایش علوم', [
    {"title":"آزمایش علوم — اثر پروانه (بافوم و سرکه)","type":"activity","desc":"آزمایش شیمی ساده","category":"آزمایش علمی","ageMin":4,"ageMax":6,"duration":15,"materials":"بافوم, سرکه, رنگ","instructions":"بافوم در لیوان بگذارید → رنگ اضافه کنید → سرکه بریزید → فوران ببینید!","safety":"از چشم دور نگه دارید"},
    {"title":"آزمایش علوم — رنگ‌های جادویی (قلم‌رو و آب)","type":"activity","desc":"ترکیب رنگ‌ها با آب","category":"آزمایش علمی","ageMin":3,"ageMax":6,"duration":15,"materials":"قلم‌رو, آب, لیوان","instructions":"آب را رنگ کنید → رنگ‌ها را مخلوط کنید → رنگ جدید ببینید","safety":""},
    {"title":"آزمایش علوم — باران در کاسه","type":"activity","desc":"شبیه‌سازی باران","category":"آزمایش علمی","ageMin":3,"ageMax":5,"duration":10,"materials":"کاسه آب, اسفنج, رنگ","instructions":"اسفنج را در آب رنگی فشار دهید → بالای کاسه نگه دارید → باران ببارد!","safety":""},
    {"title":"آزمایش علوم — مغناطیس و فلزات","type":"activity","desc":"کشف مغناطیس","category":"آزمایش علمی","ageMin":4,"ageMax":6,"duration":15,"materials":"آهنربا, اشیای فلزی و غیرفلزی","instructions":"آهنربا را به اشیا نزدیک کنید → کدام می‌چسبد؟ چرا؟","safety":""}
  ]);

  inject('honar', 'herog_right', 'ساز', 'واحد کار علوم', [
    {"title":"مجموعه رایگان واحد کار علوم اول دبستان","type":"pdf","desc":"مجموعه واحد کار علوم","category":"واحد کار","ageMin":5,"ageMax":7,"source":"سمیه روحی"},
    {"title":"واحدکار اعضای بدن جانوران علوم پیش دبستان","type":"pdf","desc":"شناخت اعضای بدن حیوانات","category":"واحد کار","ageMin":3,"ageMax":6,"source":"سمیه روحی"},
    {"title":"واحدکار غذای جانوران علوم پیش دبستانی","type":"pdf","desc":"شناخت غذای حیوانات","category":"واحد کار","ageMin":3,"ageMax":6,"source":"سمیه روحی"},
    {"title":"واحد کار علوم حرکت جانوارن پیش دبستان","type":"pdf","desc":"شناخت حرکت حیوانات","category":"واحد کار","ageMin":3,"ageMax":6,"source":"سمیه روحی"},
    {"title":"واحد کار علوم حس بویایی اول دبستان","type":"pdf","desc":"آموزش حس بویایی","category":"واحد کار","ageMin":3,"ageMax":6,"source":"سمیه روحی"},
    {"title":"واحد کار علوم حواس پنج گانه پیش دبستانی","type":"pdf","desc":"شناخت حواس پنجگانه","category":"واحد کار","ageMin":3,"ageMax":6,"source":"سمیه روحی"}
  ]);

  inject('honar', 'herog_right', 'ضرب‌آهنگ', 'کاردستی', [
    {"title":"کاردستی — مجسمه خمیر بازی (Playdough Sculpture)","type":"activity","desc":"ساخت مجسمه با خمیر","category":"کاردستی","ageMin":3,"ageMax":6,"duration":20,"materials":"خمیر بازی رنگی","instructions":"خمیر را گرم کنید → شکل دهید → جزئیات اضافه کنید → خشک شود","safety":""},
    {"title":"کاردستی — קולاجطبیعت (Nature Collage)","type":"activity","desc":"کولاژ با مواد طبیعی","category":"کاردستی","ageMin":3,"ageMax":6,"duration":20,"materials":"برگ, چوب, سنگ, چسب","instructions":"مواد طبیعت را جمع کنید → روی کاغذ بچسبانید → طرح بسازید","safety":""}
  ]);

  inject('honar', 'herog_right', 'ضرب‌آهنگ', 'دست ورزی', [
    {"title":"دانلود رایگان کاربرگ دست ورزی pdf","type":"pdf","desc":"کاربرگ رایگان دست ورزی","category":"دست ورزی","ageMin":3,"ageMax":6,"source":"سمیه روحی"},
    {"title":"کاربرگ دست ورزی (ماز) پیش دبستان","type":"pdf","desc":"ماز مسیریابی","category":"دست ورزی","ageMin":3,"ageMax":6,"source":"سمیه روحی"},
    {"title":"کاربرگ دست ورزی نشانه های کلاس اول","type":"pdf","desc":"تمرین نشانه‌ها","category":"دست ورزی","ageMin":5,"ageMax":7,"source":"سمیه روحی"},
    {"title":"کاربرگ دست ورزی نقطه چین پیش دبستان","type":"pdf","desc":"نقطه‌چین حروف","category":"دست ورزی","ageMin":3,"ageMax":6,"source":"سمیه روحی"},
    {"title":"کاربرگ دست ورزی و دقت و تمرکز پیش دبستان","type":"pdf","desc":"تمرین دقت","category":"دست ورزی","ageMin":3,"ageMax":6,"source":"سمیه روحی"}
  ]);

  // ═══ moraabi/herog_right — exact titles ═══
  inject('moraabi', 'herog_right', 'حمایت', 'فعالیت و کاربرد', [
    {"title":"تقویت مهارت‌های حرکتی ظریف (کاردرمانی ساده)","type":"activity","desc":"تمرینات کاردرمانی ساده","category":"کودکان استثنایی","ageMin":3,"ageMax":6,"duration":15,"materials":"خودکار, توپ کوچک, مکعب","instructions":"خودکار را بچرخانید → توپ را فشار دهید → مکعب‌ها را بچینید","safety":""},
    {"title":"گزارش پیشرفت کودکان استثنایی به والدین","type":"activity","desc":"نحوه نوشتن گزارش پیشرفت","category":"کودکان استثنایی","ageMin":0,"ageMax":6,"duration":15,"materials":"فرم گزارش","instructions":"نام کودک → هدف → فعالیت انجام شده → نتیجه → پیشنهاد بعدی → تاریخ","safety":""},
    {"title":"ارتباط جایگزین (AAC) برای کودکان بی‌کلام","type":"activity","desc":"روش‌های ارتباط برای کودکان بی‌کلام","category":"کودکان استثنایی","ageMin":2,"ageMax":6,"duration":15,"materials":"کارت تصویر, تابلو","instructions":"کارت‌های تصویری آماده کنید → نیازهای روزمره → انتخاب با کودک → تمرین روزانه","safety":""},
    {"title":"فرم چک‌لیست رفتاری کودکان استثنایی","type":"activity","desc":"ثبت رفتار روزانه کودک","category":"کودکان استثنایی","ageMin":0,"ageMax":6,"duration":10,"materials":"فرم چک‌لیست","instructions":"تاریخ → نام کودک → رفتار مشاهده شده → شدت → محرک → واکنش مربی","safety":""}
  ]);

  // ═══ bayegani/herog_right — exact titles ═══
  inject('bayegani', 'herog_right', 'نامه‌ها', 'فرم‌های اداری', [
    {"title":"فرم پیگیری وضعیت ساعتی (نسخه مدیر)","type":"activity","desc":"ثبت وضعیت کودک در طول روز","category":"فرم‌های اداری","ageMin":0,"ageMax":6,"duration":5,"materials":"فرم ساعتی","instructions":"ساعت → وضعیت خواب → وضعیت غذا → وضعیت رفتار → یادداشت مربی","safety":""},
    {"title":"فرم معرفی به متخصص (گفتار/کاردرمانی)","type":"activity","desc":"نمونه فرم ارجاع","category":"فرم‌های اداری","ageMin":0,"ageMax":6,"duration":5,"materials":"فرم ارجاع","instructions":"نام کودک → سن → مشکل مشاهده شده → تاریخچه → پیشنهاد متخصص → امضا","safety":""},
    {"title":"فرم چک‌لیست ایمنی و بهداشت روزانه","type":"activity","desc":"بررسی روزانه ایمنی","category":"فرم‌های اداری","ageMin":0,"ageMax":6,"duration":10,"materials":"چک‌لیست","instructions":"کلاس → تهویه → نظافت → ایمنی وسایل → داروها → گزارش مشکل","safety":""},
    {"title":"فرم رضایت‌نامه والدین","type":"activity","desc":"نمونه فرم رضایت‌نامه","category":"فرم‌های اداری","ageMin":0,"ageMax":6,"duration":5,"materials":"فرم چاپی","instructions":"نام کودک → نام والدین → موضوع رضایت → امضا → تاریخ","safety":""},
    {"title":"فرم برنامه روزانه کلاس","type":"activity","desc":"برنامه روزانه کلاس","category":"فرم‌های اداری","ageMin":0,"ageMax":6,"duration":10,"materials":"تقویم روزانه","instructions":"ساعت → فعالیت → مربی → مواد مورد نیاز → یادداشت","safety":""},
    {"title":"فرم جلسه اولیا و مربیان","type":"activity","desc":"ثبت مصوبات جلسه","category":"فرم‌های اداری","ageMin":0,"ageMax":6,"duration":10,"materials":"فرم جلسه","instructions":"تاریخ → شرکت‌کنندگان → موضوعات → تصمیمات → وظایف → زمان‌بندی","safety":""},
    {"title":"فرم گزارش ماهانه به مدیر","type":"activity","desc":"گزارش ماهانه عملکرد","category":"فرم‌های اداری","ageMin":0,"ageMax":6,"duration":15,"materials":"فرم گزارش","instructions":"تعداد دانش‌آموزان → فعالیت‌های انجام شده → چالش‌ها → پیشنهادات → آمار","safety":""}
  ]);

  // ═══ honar/herog_right — remaining exact titles ═══
  inject('honar', 'herog_right', 'ساز', 'آشپزی ساده', [
    {"title":"آشپزی ساده — سالاد میوه رنگارنگ","type":"activity","desc":"ساخت سالاد میوه","category":"آشپزی ساده","ageMin":3,"ageMax":6,"duration":15,"materials":"میوه‌های مختلف, کاسه","instructions":"میوه‌ها را بشویید → خرد کنید → مخلوط کنید → نوش جان!","safety":"مربی کمک کند"},
    {"title":"آشپزی ساده — کوکی ساده شیرینی","type":"activity","desc":"پخت کوکی ساده","category":"آشپزی ساده","ageMin":4,"ageMax":6,"duration":30,"materials":"آرد, کره, شکر, تخم مرغ","instructions":"مواد را مخلوط کنید → خمیر بزنید → شکل دهید → بپزید","safety":"فر داغ است"},
    {"title":"آشپزی ساده — نان پیتا و پنیر","type":"activity","desc":"تهیه میان‌وعده ساده","category":"آشپزی ساده","ageMin":3,"ageMax":5,"duration":10,"materials":"نان پیتا, پنیر, سبزی","instructions":"نان را برش بزنید → پنیر بگذارید → سبزی اضافه کنید → نوش جان!","safety":""}
  ]);

  inject('honar', 'herog_right', 'ساز', 'کاردستی', [
    {"title":"کاردستی — چاپ با سبزیجات و میوه","type":"activity","desc":"نقاشی با برش میوه","category":"کاردستی","ageMin":2,"ageMax":5,"duration":15,"materials":"میوه برش‌خورده, رنگ, کاغذ","instructions":"میوه را در رنگ بزنید → روی کاغذ فشار دهید → اثر میوه ببینید","safety":""},
    {"title":"کاردستی — کاغذ ماشه (پیه‌ماشه)","type":"activity","desc":"ساخت مجسمه با کاغذ","category":"کاردستی","ageMin":4,"ageMax":6,"duration":30,"materials":"کاغذ روزنامه, چسب, رنگ","instructions":"کاغذها را خرد کنید → با چسب مخلوط کنید → شکل دهید → خشک کنید → رنگ کنید","safety":""},
    {"title":"کاردستی — نقاشی با ابزارهای غیرمتعارف","type":"activity","desc":"نقاشی با اشیای مختلف","category":"کاردستی","ageMin":3,"ageMax":6,"duration":15,"materials":"چنگال, اسفنج, نخ","instructions":"ابزارهای مختلف را در رنگ بزنید → روی کاغذ بزنید → الگوهای جالب بسازید","safety":""}
  ]);

  inject('honar', 'herog_right', 'ضرب‌آهنگ', 'دست ورزی', [
    {"title":"کاربرگ دست ورزی پیش دبستان","type":"pdf","desc":"مجموعه دست ورزی","category":"دست ورزی","ageMin":3,"ageMax":6,"source":"سمیه روحی"}
  ]);

  // ═══ moraabi/herog_right — remaining exact titles ═══
  inject('moraabi', 'herog_right', 'حمایت', 'فعالیت و کاربرد', [
    {"title":"مدیریت رفتار چالشی (خودآزاری/پرخاشگری)","type":"activity","desc":"تکنیک‌های مدیریت رفتارهای چالشی","category":"کودکان استثنایی","ageMin":2,"ageMax":6,"duration":15,"materials":"","instructions":"رفتار را ثبت کنید → محرک را شناسایی کنید → راه‌حل جایگزین پیشنهاد دهید → تقویت مثبت","safety":""},
    {"title":"برنامه زمان‌بندی بصری (Visual Schedule)","type":"activity","desc":"ساخت برنامه بصری روزانه","category":"کودکان استثنایی","ageMin":2,"ageMax":6,"duration":10,"materials":"تصاویر, کاغذ مقوا","instructions":"فعالیت‌های روز را تصویر کنید → ترتیب بگذارید → هر فعالیت تمام شد → علامت بزنید","safety":""}
  ]);

})();
