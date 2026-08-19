/*
  Corner Content — تزریق محتوای گوشه‌ها برای تمام اتاق‌ها
  اجرا: بعد از rooms.js و mahd-content.js
  هدف: پر کردن تمام هایلایت‌های خالی یا کم‌محتوا
*/
(function(){
  if (typeof ROOMS === "undefined") return;
  var R = ROOMS;
  function room(id){ for (var i=0;i<R.length;i++) if (R[i].id===id) return R[i]; return null; }
  function view(r,v){ return r && r.views ? r.views[v] : null; }
  function hotspot(r,v,t){ var vd=view(r,v); if(!vd) return null; for (var i=0;i<vd.hotspots.length;i++) if (vd.hotspots[i].title===t) return vd.hotspots[i]; return null; }

  function inject(roomId, viewKey, hsTitle, catTitle, items){
    var h = hotspot(room(roomId), viewKey, hsTitle);
    if (!h || !items || !items.length) return;
    for (var i=0;i<h.categories.length;i++){
      if (h.categories[i].title === catTitle){ h.categories[i].items = h.categories[i].items.concat(items); return; }
    }
    h.categories.push({ title: catTitle, items: items });
  }


  // ═══════════════════════════════════════════════
  // ۱) اتاق آموزش — تکمیل محتوای شعر و طبیعت
  // ═══════════════════════════════════════════════

  // --- herog/شعر: اضافه کردن شعرهای بیشتر ---
  inject('amoozesh', 'herog', 'شعر', 'معرفی و شناخت', [
    {"title":"شعرخوانی «یک دانه گندم»","type":"activity","desc":"آموزش شعر کلاسیک کودکان با حرکات دست","category":"شعر و ادبیات","ageMin":3,"ageMax":6,"duration":10,"materials":"کتاب شعر, تصاویر گندم","instructions":"شعر را با صدای بلند بخوانید → هر سرود را با حرکت دست نشان دهید → از کودکان بخواهید تکرار کنند → با هم شعر را اجرا کنید","safety":""},
    {"title":"شعرخوانی «خاله گل»","type":"activity","desc":"شعر درباره طبیعت و گل‌ها با لحن ملایم","category":"شعر و ادبیات","ageMin":2,"ageMax":5,"duration":10,"materials":"کتاب شعر, تصاویر گل","instructions":"شعر را آرام بخوانید → از کودکان بپرسید چه چیزی می‌بینند → با هم ادا درآورید → نقاشی گل بکشید","safety":""},
    {"title":"شعر «هوا سرد شده»","type":"activity","desc":"شعر فصلی درباره پاییز و تغییر هوا","category":"شعر و ادبیات","ageMin":3,"ageMax":6,"duration":10,"materials":"کتاب شعر, تصاویر پاییز","instructions":"شعر را بخوانید → با کودکان درباره تغییر فصل صحبت کنید → نقاشی پاییزی بکشید","safety":""}
  ]);

  // --- herog_right/طبیعت: محتوای طبیعت‌گردی ---
  inject('amoozesh', 'herog_right', 'طبیعت', 'معرفی و شناخت', [
    {"title":"کشف حیوانات باغ وحش","type":"activity","desc":"آشنایی با حیوانات مختلف و صدای آنها","category":"شناخت حیوانات","ageMin":2,"ageMax":5,"duration":15,"materials":"تصاویر حیوانات, صدای حیوانات","instructions":"تصاویر حیوانات را نشان دهید → صدای هر حیوان را تقلید کنید → درباره محل زندگی هر حیوان صحبت کنید","safety":""},
    {"title":"گشت در طبیعت","type":"activity","desc":"پیاده‌روی کوتاه و مشاهده گیاهان و حشرات","category":"مشاهده طبیعت","ageMin":3,"ageMax":6,"duration":20,"materials":"ذره‌بین, دفتر نقاشی, مداد رنگی","instructions":"با کودکان به حیاط بروید → برگ‌ها و گل‌ها را مشاهده کنید → با ذره‌بین حشرات را ببینید → نقاشی طبیعت بکشید","safety":"از حشرات نیش‌زننده دور بمانید"},
    {"title":"کاشت بذر کوچک","type":"activity","desc":"کاشت بذر در گلدان و مراقبت از آن","category":"گیاهان","ageMin":3,"ageMax":6,"duration":15,"materials":"گلدان کوچک, خاک, بذر, آب","instructions":"خاک را در گلدان بریزید → بذر را بکارید → آبیاری کنید → هر روز مراقبت کنید → رشد را مشاهده کنید","safety":"دست‌ها را بشویید"}
  ]);


  // ═══════════════════════════════════════════════
  // ۲) اتاق بازی — تکمیل سُرخوردن و رقص
  // ═══════════════════════════════════════════════

  // --- herog_left/سُرخوردن ---
  inject('bazi', 'herog_left', 'سُرخوردن', 'معرفی و شناخت', [
    {"title":"سُر خوردن ایمن","type":"activity","desc":"آموزش نحوه صحیح سُر خوردن روی سُرسره","category":"حرکات بدنی","ageMin":2,"ageMax":5,"duration":10,"materials":"سُرسره, تشک","instructions":"نحوه نشستن صحیح را نشان دهید → از بالا به پایین سُر بخورید → از کودکان بخواهید تقلید کنند","safety":"تشک زیر سُرسره بگذارید"},
    {"title":"مسابقه سُرخوردن","type":"activity","desc":"مسابقه سُر خوردن با توپ‌های کوچک","category":"بازی حرکتی","ageMin":3,"ageMax":5,"duration":15,"materials":"توپ کوچک, سُرسره, خط پایان","instructions":"توپ را از بالای سُرسره رها کنید → کدام توپ زودتر به پایان می‌رسد؟ → با توپ‌های مختلف امتحان کنید","safety":""},
    {"title":"سُر خوردن خلاق","type":"activity","desc":"سُر خوردن اشیاء مختلف و مقایسه سرعت","category":"آزمایش حرکتی","ageMin":3,"ageMax":6,"duration":15,"materials":"اشیاء مختلف, سُرسره","instructions":"هر شیء را از سُرسره رها کنید → کدام سریع‌تر می‌رود؟ → چرا؟ → نتیجه‌گیری کنید","safety":""}
  ]);
  inject('bazi', 'herog_left', 'سُرخوردن', 'فعالیت و کاربرد', [
    {"title":"ساخت سُرسره کاغذی","type":"activity","desc":"ساخت مدل کوچک سُرسره با کاغذ و مقوا","category":"کاردستی","ageMin":4,"ageMax":6,"duration":20,"materials":"مقوا, چسب, قیچی, توپ کوچک","instructions":"مقوا را به شکل سُرسره تا کنید → توپ کوچک را از بالا رها کنید → امتحان کنید چه شکلی سریع‌تر است","safety":"قیچی با مراقبت بزرگسال"},
    {"title":"سُر خوردن در آب","type":"activity","desc":"بازی سُر خوردن اشیاء در آب","category":"بازی آبی","ageMin":2,"ageMax":4,"duration":15,"materials":"وان کوچک, اشیاء پلاستیکی, صابون","instructions":"اشیاء صابونی را در آب سُر بدهید → کدام شناور می‌ماند؟ → با شکل‌های مختلف امتحان کنید","safety":"مراقب آب باشید"}
  ]);

  // --- herog_left/رقص ---
  inject('bazi', 'herog_left', 'رقص', 'معرفی و شناخت', [
    {"title":"رقص آزاد","type":"activity","desc":"رقص آزاد با موسیقی کودکانه","category":"حرکات موزون","ageMin":2,"ageMax":6,"duration":15,"materials":"موسیقی, فضای کافی","instructions":"موسیقی را پخش کنید → با کودکان برقصید → حرکات مختلف امتحان کنید → دست بزنید","safety":"فضای کافی برای حرکت فراهم کنید"},
    {"title":"رقص حیوانات","type":"activity","desc":"تقلید حرکات حیوانات با موسیقی","category":"رقص نمایشی","ageMin":2,"ageMax":5,"duration":15,"materials":"موسیقی, کارت حیوانات","instructions":"کارت حیوان را نشان دهید → حرکت آن حیوان را تقلید کنید → با موسیقی برقصید","safety":""},
    {"title":"رقص چرخشی","type":"activity","desc":"چرخش آرام در جا و تقویت تعادل","category":"حرکات بدنی","ageMin":3,"ageMax":6,"duration":10,"materials":"موسیقی, فضا","instructions":"موسیقی را پخش کنید → آرام بچرخید → سرعت را کم و زیاد کنید → هر بار به یک جهت بچرخید","safety":"آرام بچرخید"}
  ]);
  inject('bazi', 'herog_left', 'رقص', 'فعالیت و کاربرد', [
    {"title":"رقص موزیکال با شال","type":"activity","desc":"رقص با شال‌های رنگی و پارچه","category":"رقص خلاقانه","ageMin":2,"ageMax":5,"duration":15,"materials":"شال رنگی, پارچه سبک, موسیقی","instructions":"شال را در دست بگیرید → با موسیقی حرکت دهید → شال را در هوا بچرخانید → بازی با رنگ‌ها","safety":"مراقب گیر نکردن پارچه باشید"},
    {"title":"رقص آینه‌ای","type":"activity","desc":"رقص حرکت مشابه مانند آینه","category":"بازی گروهی","ageMin":3,"ageMax":6,"duration":15,"materials":"موسیقی","instructions":"دو نفر روبروی هم بایستند → یک نفر حرکت کند → نفر دوم تکرار کند → عوض کنید","safety":""}
  ]);

  // --- herog/خمیر: اضافه کردن فعالیت‌های بیشتر ---
  inject('bazi', 'herog', 'خمیر', 'معرفی و شناخت', [
    {"title":"خمیربازی رنگی","type":"activity","desc":"ساخت اشکال مختلف با خمیر بازی رنگی","category":"خمیربازی","ageMin":2,"ageMax":6,"duration":20,"materials":"خمیر بازی رنگی, ابزار شکل‌دهی","instructions":"خمیر را گرم کنید → مار بسازید → توپ بسازید → کیک درست کنید → ستاره بسازید","safety":"از خوردن خمیر جلوگیری کنید"},
    {"title":"ساخت میوه با خمیر","type":"activity","desc":"ساخت میوه‌های مختلف با خمیر رنگی","category":"خمیربازی خلاقانه","ageMin":3,"ageMax":6,"duration":20,"materials":"خمیر رنگی (قرمز, سبز, زرد)","instructions":"با خمیر قرمز سیب بسازید → با خمیر سبز موز بسازید → با خمیر زرد لیمو بسازید → میوه‌ها را دسته‌بندی کنید","safety":""}
  ]);

  // --- herog/جورچین: اضافه کردن محتوا ---
  inject('bazi', 'herog', 'جورچین', 'معرفی و شناخت', [
    {"title":"جورچین حیوانات","type":"activity","desc":"کامل کردن تصویر حیوانات با قطعات جورچین","category":"جورچین","ageMin":3,"ageMax":5,"duration":15,"materials":"جورچین حیوانات, تصویر مرجع","instructions":"تصویر مرجع را نشان دهید → قطعات را به کودک بدهید → قطعات درست را کنار هم بگذارید → تصویر کامل شد؟","safety":""},
    {"title":"جورچین منطقه‌ای","type":"activity","desc":"جورچین با قطعات منطقه‌ای و شکل‌ها","category":" هوش مکانی","ageMin":4,"ageMax":6,"duration":20,"materials":"جورچین ساده, قطعات هندسی","instructions":"قطعات را بر اساس شکل دسته‌بندی کنید → قطعات مشابه را کنار هم بگذارید → جورچین را تکمیل کنید","safety":""}
  ]);


  // ═══════════════════════════════════════════════
  // ۳) اتاق هنر — تکمیل herog_right
  // ═══════════════════════════════════════════════
  // herog_right توسط mahd-content.js بازسازی شده:
  // ساز(0), آواز(3), ضرب‌آهنگ(0), حرکت(0)

  // --- herog_right/ساز ---
  inject('honar', 'herog_right', 'ساز', 'معرفی و شناخت', [
    {"title":"ساز دستی کوزه‌ای","type":"activity","desc":"ساخت ساز ساده با بطری و دانه","category":"سازسازی","ageMin":3,"ageMax":6,"duration":20,"materials":"بطری پلاستیکی, دانه, چسب","instructions":"دانه‌ها را داخل بطری بریزید → در بطری را ببندید → تکان دهید → صداهای مختلف تولید کنید → با موسیقی همراهی کنید","safety":""},
    {"title":"ساز کاغذی","type":"activity","desc":"ساخت ساز موسیقی با کاغذ مقوایی","category":"سازسازی","ageMin":4,"ageMax":6,"duration":20,"materials":"مقوا, کش لاستیکی, قیچی, مداد","instructions":"مقوا را به شکل لوله درآورید → کش‌های لاستیکی را دور آن ببندید → با مداد ضربه بزنید → صداهای مختلف ایجاد کنید","safety":"قیچی با مراقبت بزرگسال"},
    {"title":"آشنایی با پیانو","type":"activity","desc":"شناخت صداهای پیانو و تفاوت بم و زیر","category":"شناخت موسیقی","ageMin":2,"ageMax":5,"duration":10,"materials":"تصویر پیانو, صدای پیانو","instructions":"تصویر پیانو را نشان دهید → صدای بم و زیر را پخش کنید → از کودکان بپرسید کدام بم‌تر است → با دست بلند و کوتاه نشان دهید","safety":""},
    {"title":"ساز طبیعی","type":"activity","desc":"ساخت ساز با اشیاء طبیعی (برگ, سنگ, چوب)","category":"سازسازی طبیعی","ageMin":3,"ageMax":6,"duration":15,"materials":"برگ خشک, سنگ‌های کوچک, چوب, کیسه پارچه‌ای","instructions":"اشیاء طبیعی را جمع کنید → در کیسه بریزید → تکان دهید → صداهای مختلف بشنوید → با هم موسیقی بسازید","safety":"از سنگ‌های تیز دور بمانید"}
  ]);
  inject('honar', 'herog_right', 'ساز', 'فعالیت و کاربرد', [
    {"title":"ارکستر کوچک","type":"activity","desc":"اجرا موسیقی گروهی با سازهای دست‌ساز","category":"اجرا موسیقی","ageMin":3,"ageMax":6,"duration":20,"materials":"سازهای دست‌ساز, طبل, زنگوله","instructions":"هر کودک یک ساز بگیرید → با هم یک آهنگ بنوازید → ریتم را با دست بزنید → نوبتی بنوازید","safety":""},
    {"title":"آهنگ‌سازی کودکانه","type":"activity","desc":"ساخت آهنگ ساده با صداهای مختلف","category":"آهنگ‌سازی","ageMin":4,"ageMax":6,"duration":20,"materials":"سازهای دست‌ساز, کاغذ و مداد","instructions":"صدای حیوانات را تقلید کنید → با آن آهنگ بسازید → از کودکان بخواهید صداهای متفاوت اضافه کنید → ضبط کنید","safety":""}
  ]);

  // --- herog_right/ضرب‌آهنگ ---
  inject('honar', 'herog_right', 'ضرب‌آهنگ', 'معرفی و شناخت', [
    {"title":"آشنایی با ریتم","type":"activity","desc":"شناخت ریتم ساده با دست زدن","category":"ریتم","ageMin":2,"ageMax":5,"duration":10,"materials":"طبل, دست","instructions":"ریتم ساده بزنید → با دست تکرار کنید → ریتم‌های مختلف امتحان کنید → سرعت را کم و زیاد کنید","safety":""},
    {"title":"ریتم با اشیاء","type":"activity","desc":"ایجاد ریتم با ضربه زدن به اشیاء مختلف","category":"ریتم و صدا","ageMin":3,"ageMax":6,"duration":15,"materials":"قابلمه, قاشق, بطری, کتاب","instructions":"به هر شیء ضربه بزنید → صدای آن را بشنوید → ریتم بسازید → با موسیقی همراهی کنید","safety":"از اشیاء شکستنی دور بمانید"},
    {"title":"طبل‌زنی کودکانه","type":"activity","desc":"نواختن طبل با ریتم‌های ساده","category":"نوازندگی","ageMin":2,"ageMax":5,"duration":15,"materials":"طبل کوچک, چوب طبل","instructions":"با چوب طبل بزنید → ریتم ساده بزنید → با آهنگ همراهی کنید → ریتم‌های مختلف امتحان کنید","safety":"بلندی صدا را کنترل کنید"},
    {"title":"ریتم حیوانات","type":"activity","desc":"تقلید صدای حیوانات با ضربه","category":"ریتم نمایشی","ageMin":2,"ageMax":5,"duration":10,"materials":"طبل, تصاویر حیوانات","instructions":"تصویر حیوان را نشان دهید → صدای آن را با طبل تقلید کنید → کودکان تکرار کنند → بازی شود","safety":""}
  ]);
  inject('honar', 'herog_right', 'ضرب‌آهنگ', 'فعالیت و کاربرد', [
    {"title":"گروه نوازندگی","type":"activity","desc":"نوازندگی گروهی با سازهای مختلف","category":"نوازندگی گروهی","ageMin":3,"ageMax":6,"duration":20,"materials":"طبل, زنگوله, ساز دستی","instructions":"هر کودک یک ساز بگیرید → با هم یک آهنگ بنوازید → نوبتی شروع کنید → ریتم را حفظ کنید","safety":""},
    {"title":"ریتم اجتماعی","type":"activity","desc":"ایجاد ریتم مشترک در گروه","category":"کار گروهی","ageMin":4,"ageMax":6,"duration":15,"materials":"دست, طبل","instructions":"در دایره بنشینید → یک نفر ریتم شروع کند → بقیه تکرار کنند → سرعت را زیاد کنید → هماهنگ باشید","safety":""}
  ]);

  // --- herog_right/حرکت ---
  inject('honar', 'herog_right', 'حرکت', 'معرفی و شناخت', [
    {"title":"حرکات نمایشی","type":"activity","desc":"بیان احساسات با حرکات بدن","category":"نمایش","ageMin":2,"ageMax":6,"duration":15,"materials":"فضای باز, موسیقی","instructions":"خوشحالی را با حرکت نشان دهید → غمگینی را نشان دهید → تعجب را نشان دهید → با موسیقی حرکت کنید","safety":""},
    {"title":"سایه بازی","type":"activity","desc":"بازی با سایه‌ها و حرکات نمایشی","category":"نمایش سایه","ageMin":3,"ageMax":6,"duration":15,"materials":"نور, دیوار سفید","instructions":"جلوی نور بایستید → سایه خود را ببینید → با دست شکل بسازید → حیوانات سایه‌ای بسازید","safety":""},
    {"title":"رقص با شال","type":"activity","desc":"حرکات موزون با شال‌های رنگی","category":"رقص","ageMin":2,"ageMax":5,"duration":15,"materials":"شال رنگی, موسیقی","instructions":"شال را در دست بگیرید → با موسیقی حرکت دهید → شال را در هوا بچرخانید → رنگ‌ها را ببینید","safety":"مراقب گیر نکردن شال باشید"}
  ]);
  inject('honar', 'herog_right', 'حرکت', 'فعالیت و کاربرد', [
    {"title":"نمایش عروسکی","type":"activity","desc":"اجرا نمایش با عروسک‌های دستی","category":"نمایش خلاق","ageMin":3,"ageMax":6,"duration":20,"materials":"عروسک دستی, صحنه نمایش","instructions":"داستانی انتخاب کنید → عروسک‌ها را به دست بگیرید → نقش‌ها را بازی کنید → با صداهای مختلف حرف بزنید","safety":""},
    {"title":"حرکات حیوانات","type":"activity","desc":"تقلید حرکات حیوانات مختلف","category":"رقص نمایشی","ageMin":2,"ageMax":5,"duration":15,"materials":"تصاویر حیوانات","instructions":"تصویر حیوان را نشان دهید → مانند آن حیوان راه بروید → غذا بخورید → بخوابید → با هم بازی کنید","safety":""}
  ]);

  // --- herog_left: اضافه کردن محتوای بیشتر به رنگ‌آمیزی و ترکیب رنگ ---
  inject('honar', 'herog_left', 'رنگ‌آمیزی', 'معرفی و شناخت', [
    {"title":"رنگ‌آمیزی با انگشت","type":"activity","desc":"نقاشی با انگشت و رنگ‌های مختلف","category":"نقاشی انگشتی","ageMin":2,"ageMax":4,"duration":15,"materials":"رنگ انگشتی, کاغذ, سینی","instructions":"رنگ را روی سینی بریزید → با انگشت روی کاغذ بکشید → خطوط و دایره بکشید → ترکیب رنگ‌ها را ببینید","safety":"از رنگ‌های خوراکی استفاده کنید"},
    {"title":"نقاشی آبی","type":"activity","desc":"نقاشی با آب روی کاغذ مخصوص","category":"نقاشی آبی","ageMin":2,"ageMax":4,"duration":10,"materials":"قلم مو, آب, کاغذ آبی","instructions":"قلم مو را در آب بزنید → روی کاغذ بکشید → شکل‌ها ظاهر می‌شوند → خشک شدن صبر کنید","safety":""}
  ]);
  inject('honar', 'herog_left', 'ترکیب رنگ', 'معرفی و شناخت', [
    {"title":"آزمایش رنگ‌ها","type":"activity","desc":"آزمایش ترکیب رنگ‌های اصلی","category":"شناخت رنگ","ageMin":3,"ageMax":6,"duration":15,"materials":"رنگ قرمز, آبی, زرد, لیوان, آب","instructions":"رنگ قرمز و زرد را مخلوط کنید → نارنجی می‌شود → رنگ آبی و زرد = سبز → رنگ قرمز و آبی = بنفش → نتیجه را یادداشت کنید","safety":"از ریختن رنگ جلوگیری کنید"}
  ]);


  // ═══════════════════════════════════════════════
  // ۴) اتاق مطالعه — تکمیل شمارش, الگو, دسته‌بندی, نقشه
  // ═══════════════════════════════════════════════

  // --- herog_left/شمارش: MAHD شمارش و ردیف اضافی ---
  inject('motaleh', 'herog_left', 'شمارش', 'شمارش و ردیف اعداد', [
    {"title":"کاربرگ شمارش و ردیف (۳)","type":"pdf","category":"MAHD","audience":"کودک","age":"پیش‌دبستان (۴-۶ سال)","source":"MAHD","image":"assets/mahd/worksheets/شمارش و ردیف اعداد/3db1961d20044d4f05a45512d0fddd46.jpg","images":[{"url":"assets/mahd/worksheets/شمارش و ردیف اعداد/3db1961d20044d4f05a45512d0fddd46.jpg"},{"url":"assets/mahd/worksheets/شمارش و ردیف اعداد/3e0eaed6c19f04768135354815abb92d.jpg"},{"url":"assets/mahd/worksheets/شمارش و ردیف اعداد/3e2e5174bec3495e267fcc55ce6a8c73.jpg"},{"url":"assets/mahd/worksheets/شمارش و ردیف اعداد/406061533b8db04b6dc0dab9cf032f1a.jpg"},{"url":"assets/mahd/worksheets/شمارش و ردیف اعداد/465739c855a43ecdb202662f530b55eb.jpg"},{"url":"assets/mahd/worksheets/شمارش و ردیف اعداد/4aa4344e6509761359aab4c87d2b31db.jpg"},{"url":"assets/mahd/worksheets/شمارش و ردیف اعداد/4aef08f0001e8daabe91b7d56e666f80.jpg"},{"url":"assets/mahd/worksheets/شمارش و ردیف اعداد/560fcebee8fb23f2f9077e87846fcc4d.jpg"},{"url":"assets/mahd/worksheets/شمارش و ردیف اعداد/5621b9ff87ac0ea44146789c6f047233.jpg"},{"url":"assets/mahd/worksheets/شمارش و ردیف اعداد/56548598b14362db80a84ef9707d65b0.jpg"},{"url":"assets/mahd/worksheets/شمارش و ردیف اعداد/56ceea69e2337dd4fe7a9affe36b023e.jpg"},{"url":"assets/mahd/worksheets/شمارش و ردیف اعداد/5c170f82d5a17388df2caf6be569695a.jpg"}],"desc":"کاربرگ‌های شمارش و ردیف — تصویر ۲۵ تا ۳۶"},
    {"title":"کاربرگ شمارش و ردیف (۴)","type":"pdf","category":"MAHD","audience":"کودک","age":"پیش‌دبستان (۴-۶ سال)","source":"MAHD","image":"assets/mahd/worksheets/شمارش و ردیف اعداد/5d12c64938d2074d59bee0a161bc0218.jpg","images":[{"url":"assets/mahd/worksheets/شمارش و ردیف اعداد/5d12c64938d2074d59bee0a161bc0218.jpg"},{"url":"assets/mahd/worksheets/شمارش و ردیف اعداد/6250a208ea19ee59980fd1cd92eae63f.jpg"},{"url":"assets/mahd/worksheets/شمارش و ردیف اعداد/6354342c61ae1cb6237ce6610f20482b.jpg"},{"url":"assets/mahd/worksheets/شمارش و ردیف اعداد/63f80e12c77d2112e44e60fed99382a7.jpg"},{"url":"assets/mahd/worksheets/شمارش و ردیف اعداد/668d952f9a36f923a7e3a60ed7b7d5b4.jpg"},{"url":"assets/mahd/worksheets/شمارش و ردیف اعداد/68d8315197edeed5a334aaae2a76add9.jpg"},{"url":"assets/mahd/worksheets/شمارش و ردیف اعداد/6a75bb9d2e0f836269b52bf8155b5828.jpg"},{"url":"assets/mahd/worksheets/شمارش و ردیف اعداد/704806f5ca1efe617bc76bce8e61ae64.jpg"},{"url":"assets/mahd/worksheets/شمارش و ردیف اعداد/70ad530cb6a5d30eebf4d0460c0de4bd.jpg"},{"url":"assets/mahd/worksheets/شمارش و ردیف اعداد/72db4ff450009352a3da626603b7363b.jpg"},{"url":"assets/mahd/worksheets/شمارش و ردیف اعداد/749a8fb06fecbb6a98ad61cfb9edcfbc.jpg"},{"url":"assets/mahd/worksheets/شمارش و ردیف اعداد/773040c4fbe1d96d84f310d080f58220.jpg"}],"desc":"کاربرگ‌های شمارش و ردیف — تصویر ۳۷ تا ۴۸"}
  ]);
  inject('motaleh', 'herog_left', 'شمارش', 'معرفی و شناخت', [
    {"title":"شمارش با اشیاء واقعی","type":"activity","desc":"شمارش میوه‌ها و اشیاء روزمره","category":"شمارش","ageMin":3,"ageMax":5,"duration":15,"materials":"میوه, لوبیا, دکمه, سینی","instructions":"۵ سیب بگذارید → با کودک بشمارید → ۳ موز اضافه کنید → چند تا شد؟ → با لوبیا تمرین کنید","safety":""},
    {"title":"شمارش تا ۱۰ با آهنگ","type":"activity","desc":"یادگیری اعداد ۱ تا ۱۰ با آهنگ","category":"شمارش","ageMin":2,"ageMax":5,"duration":10,"materials":"انگشتان دست, آهنگ","instructions":"انگشتان دست را بالا بیاورید → با هر انگشت یک عدد بگویید → با آهنگ بشمارید → تا ۱۰ برسانید","safety":""},
    {"title":"شمارش و مقایسه","type":"activity","desc":"مقایسه تعداد اشیاء با کم و زیاد","category":"شمارش و مقایسه","ageMin":3,"ageMax":6,"duration":15,"materials":"اشیاء مختلف, دو سینی","instructions":"در یک سینی ۵ تا و در دیگری ۳ تا بگذارید → کدام بیشتر است؟ → چقدر بیشتر؟ → اضافه کنید تا مساوی شود","safety":""}
  ]);

  // --- herog_left/الگو: MAHD شطرنج و قرینه اضافی ---
  inject('motaleh', 'herog_left', 'الگو', 'شطرنج و قرینه', [
    {"title":"کاربرگ شطرنج و قرینه (۳)","type":"pdf","category":"MAHD","audience":"کودک","age":"پیش‌دبستان (۴-۶ سال)","source":"MAHD","image":"assets/mahd/worksheets/شطرنج و قرینه/82d634866e7beedf59669cb0d8a51348.jpg","images":[{"url":"assets/mahd/worksheets/شطرنج و قرینه/82d634866e7beedf59669cb0d8a51348.jpg"},{"url":"assets/mahd/worksheets/شطرنج و قرینه/872600adce5625165bb76348dbf8796b.jpg"},{"url":"assets/mahd/worksheets/شطرنج و قرینه/87613fe0bd5029ad9a903e79342eb917.jpg"},{"url":"assets/mahd/worksheets/شطرنج و قرینه/8ec6da47ef8bac3c6f26a95057b7b02c.jpg"},{"url":"assets/mahd/worksheets/شطرنج و قرینه/9cdda6bf1442ba2d6d5c95c8e5a06afd.jpg"},{"url":"assets/mahd/worksheets/شطرنج و قرینه/a04ac5540fe71feb98fb83285a1987e4.jpg"},{"url":"assets/mahd/worksheets/شطرنج و قرینه/a2c781b1eb8a546489d5c705cee8a00d.jpg"},{"url":"assets/mahd/worksheets/شطرنج و قرینه/a8a6e32f5762880ea2784e5597219be1.jpg"},{"url":"assets/mahd/worksheets/شطرنج و قرینه/b8b19428542e6fc8be4a7a35d9bef1f9.jpg"},{"url":"assets/mahd/worksheets/شطرنج و قرینه/bc202409776cc6b08e049e049d84ceb8.jpg"},{"url":"assets/mahd/worksheets/شطرنج و قرینه/c52428f1312ac3c73232359a5600aa38.jpg"},{"url":"assets/mahd/worksheets/شطرنج و قرینه/ca7d7cfded5553ad03399f1e50c4be1c.jpg"}],"desc":"کاربرگ‌های شطرنج و قرینه — تصویر ۲۵ تا ۳۶"},
    {"title":"کاربرگ شطرنج و قرینه (۴)","type":"pdf","category":"MAHD","audience":"کودک","age":"پیش‌دبستان (۴-۶ سال)","source":"MAHD","image":"assets/mahd/worksheets/شطرنج و قرینه/cafe85b967e1f6e7891701dd4e3f7e85.jpg","images":[{"url":"assets/mahd/worksheets/شطرنج و قرینه/cafe85b967e1f6e7891701dd4e3f7e85.jpg"},{"url":"assets/mahd/worksheets/شطرنج و قرینه/cf9bca279c8981c543f798486d365040.jpg"},{"url":"assets/mahd/worksheets/شطرنج و قرینه/d31bb3de6c1ef7f4cb8eb185efdfb492.jpg"},{"url":"assets/mahd/worksheets/شطرنج و قرینه/d95e30b542928eeea0268e9ac66371da.jpg"},{"url":"assets/mahd/worksheets/شطرنج و قرینه/de0d003969d1a911e783bfa5db524a67.jpg"},{"url":"assets/mahd/worksheets/شطرنج و قرینه/e27445f460fda544b03c7324f82911e0.jpg"},{"url":"assets/mahd/worksheets/شطرنج و قرینه/e6c960f4108c9f17a1fcefa31c454336.jpg"},{"url":"assets/mahd/worksheets/شطرنج و قرینه/f92a8747c223c2e95a18ec068b1b1f89.jpg"},{"url":"assets/mahd/worksheets/شطرنج و قرینه/fd9919d19981c492a48eb28907369580.jpg"}],"desc":"کاربرگ‌های شطرنج و قرینه — تصویر ۳۷ تا ۴۵"}
  ]);
  inject('motaleh', 'herog_left', 'الگو', 'معرفی و شناخت', [
    {"title":"الگوسازی با لگو","type":"activity","desc":"ساخت الگوهای تکراری با قطعات لگو","category":"الگوسازی","ageMin":3,"ageMax":6,"duration":15,"materials":"لگو, کاغذ نقشه","instructions":"الگوی ساده بسازید (قرمز-آبی-قرمز-آبی) → کودک تکرار کند → الگوهای پیچیده‌تر بسازید → خودتان الگو بسازید","safety":""},
    {"title":"الگوی رنگی","type":"activity","desc":"ساخت الگو با رنگ‌های مختلف","category":"شناخت الگو","ageMin":3,"ageMax":5,"duration":15,"materials":"دایره‌های رنگی, چسب, کاغذ","instructions":"دایره‌های رنگی را بچسبانید → الگوی زرد-قرمز-زرد-قرمز → کودک ادامه دهد → الگوی جدید بسازید","safety":""}
  ]);

  // --- herog_left/دسته‌بندی: MAHD مجموعه متناظر اضافی ---
  inject('motaleh', 'herog_left', 'دسته‌بندی', 'مجموعه متناظر', [
    {"title":"کاربرگ مجموعه متناظر (۳)","type":"pdf","category":"MAHD","audience":"کودک","age":"پیش‌دبستان (۴-۶ سال)","source":"MAHD","image":"assets/mahd/worksheets/مجموعه متناظر/a4612a09317e3dc5e3ec1478feeed644.jpg","images":[{"url":"assets/mahd/worksheets/مجموعه متناظر/a4612a09317e3dc5e3ec1478feeed644.jpg"},{"url":"assets/mahd/worksheets/مجموعه متناظر/a628f942026b3e1a4e7535197866ef03.jpg"},{"url":"assets/mahd/worksheets/مجموعه متناظر/ad45c0241095371dbd7d71eba7238326.jpg"},{"url":"assets/mahd/worksheets/مجموعه متناظر/b1a925f73411eb1da4b7105217ddae0b.jpg"},{"url":"assets/mahd/worksheets/مجموعه متناظر/b4981e23d9c5b6b9f8f345ea045a877e.jpg"},{"url":"assets/mahd/worksheets/مجموعه متناظر/bf728460216c1b4708b1bd6fe95477ea.jpg"},{"url":"assets/mahd/worksheets/مجموعه متناظر/edf838862e41ba42fc7aa8716d330c37.jpg"},{"url":"assets/mahd/worksheets/مجموعه متناظر/fa35390183589aa47c7e47b98424bb22.jpg"}],"desc":"کاربرگ‌های مجموعه متناظر — تصویر ۲۵ تا ۳۲"}
  ]);
  inject('motaleh', 'herog_left', 'دسته‌بندی', 'معرفی و شناخت', [
    {"title":"دسته‌بندی بر اساس رنگ","type":"activity","desc":"دسته‌بندی اشیاء بر اساس رنگ","category":"دسته‌بندی","ageMin":2,"ageMax":4,"duration":15,"materials":"اشیاء رنگی مختلف, سینی رنگی","instructions":"اشیاء را در سینی‌های رنگی بگذارید → قرمز در سینی قرمز → آبی در سینی آبی → بررسی کنید","safety":""},
    {"title":"دسته‌بندی بر اساس شکل","type":"activity","desc":"دسته‌بندی اشیاء بر اساس شکل","category":"شناخت شکل","ageMin":3,"ageMax":5,"duration":15,"materials":"اشیاء هندسی مختلف, سینی","instructions":"اشیاء را بر اساس شکل دسته‌بندی کنید → دایره‌ها جدا → مربع‌ها جدا → مثلث‌ها جدا → بشمارید","safety":""},
    {"title":"دسته‌بندی بر اساس اندازه","type":"activity","desc":"دسته‌بندی اشیاء بر اساس بزرگ و کوچک","category":"شناخت اندازه","ageMin":3,"ageMax":5,"duration":10,"materials":"اشیاء با اندازه‌های مختلف","instructions":"اشیاء بزرگ و کوچک را مخلوط کنید → کودک بزرگ‌ها را جدا کند → کوچک‌ها را جدا کند → مقایسه کنید","safety":""}
  ]);

  // --- herog_right/نقشه ---
  inject('motaleh', 'herog_right', 'نقشه', 'معرفی و شناخت', [
    {"title":"نقشه مهدکودک","type":"activity","desc":"ساخت نقشه ساده از مهدکودک","category":"نقشه‌خوانی","ageMin":4,"ageMax":6,"duration":20,"materials":"کاغذ بزرگ, مداد رنگی, خط‌کش","instructions":"کلاس را ترسیم کنید → اتاق‌ها را نام‌گذاری کنید → مسیر را رنگ کنید → نقشه را به دیگران نشان دهید","safety":""},
    {"title":"نقشه گنج","type":"activity","desc":"ساخت نقشه گنج ساده برای بازی","category":"بازی نقشه","ageMin":4,"ageMax":6,"duration":20,"materials":"کاغذ قهوه‌ای, مداد, عکس","instructions":"کاغذ را پاره کنید → مسیر را بکشید → عکس X بگذارید → به دوست بدهید تا پیدا کند → جایزه بگذارید","safety":""}
  ]);

  // --- herog_right/آزمایش: اضافه کردن فعالیت ---
  inject('motaleh', 'herog_right', 'آزمایش', 'فعالیت و کاربرد', [
    {"title":"آزمایش آتشفشان کوچک","type":"activity","desc":"ساخت آتشفشان با جوش‌شیرین و سرکه","category":"آزمایش علمی","ageMin":4,"ageMax":6,"duration":15,"materials":"جوش‌شیرین, سرکه, رنگ, بطری کوچک","instructions":"جوش‌شیرین در بطری بریزید → رنگ اضافه کنید → سرکه بریزید → فوران ببینید! → چرا این اتفاق افتاد؟","safety":"از چشمان کودکان دور نگه دارید"},
    {"title":"آزمایش شناوری","type":"activity","desc":"آزمایش اشیاء شناور و غرق شونده","category":"آزمایش علمی","ageMin":3,"ageMax":6,"duration":15,"materials":"وان آب, اشیاء مختلف (سنگ, چوب, توپ)","instructions":"هر شیء را در آب بیندازید → شناور می‌ماند یا غرق می‌شود؟ → چرا؟ → چه چیزی باعث شناوری می‌شود؟","safety":"مراقب آب باشید"}
  ]);

  // ═══════════════════════════════════════════
  // ═══ اتاق سلامت (salamat) ═══
  // ═══════════════════════════════════════════

  // --- herog/میوه: اضافه کردن ---
  inject('salamat', 'herog', 'میوه', 'معرفی و شناخت', [
    {"title":"شناخت میوه‌های فصل بهار","type":"activity","desc":"آشنایی با میوه‌های بهاری","category":"شناخت میوه","ageMin":2,"ageMax":4,"duration":15,"materials":"میوه‌های واقعی یا تصویر","instructions":"میوه‌ها را نشان دهید → نام ببرید → رنگ و طعم را توصیف کنید → کدام شیرین‌تر است؟","safety":""},
    {"title":"شناخت میوه‌های فصل تابستان","type":"activity","desc":"آشنایی با میوه‌های تابستانی","category":"شناخت میوه","ageMin":2,"ageMax":4,"duration":15,"materials":"میوه‌های واقعی یا تصویر","instructions":"میوه‌های تابستانی را معرفی کنید → هندوانه, طالبی, شمام → طعم و رنگ را مقایسه کنید","safety":""},
    {"title":"آبمیوه‌گیری ساده","type":"activity","desc":"ساخت آبمیوه طبیعی","category":"آشپزی ساده","ageMin":3,"ageMax":5,"duration":20,"materials":"میوه, آبمیوه‌گیری دستی, لیوان","instructions":"میوه را بشویید → پوست بکنید → در آبمیوه‌گیری بگذارید → آب آن را بنوشید → چه مزه‌ای دارد؟","safety":"مربی کمک کند"}
  ]);
  inject('salamat', 'herog', 'میوه', 'فعالیت و کاربرد', [
    {"title":"نقاشی با میوه","type":"activity","desc":"نقاشی با برش میوه","category":"هنر در حیاط","ageMin":2,"ageMax":4,"duration":15,"materials":"میوه‌های برش‌خورده, رنگ, کاغذ","instructions":"میوه را در رنگ بزنید → روی کاغذ بزنید → الگو بسازید → خشک کنید","safety":""},
    {"title":"شمارش میوه‌ها","type":"activity","desc":"شمارش و دسته‌بندی میوه‌ها","category":"شناخت اعداد","ageMin":3,"ageMax":5,"duration":10,"materials":"میوه‌های مختلف, سینی","instructions":"میوه‌ها را بشمارید → دسته‌بندی کنید → کدام بیشتر است؟ → کدام کمتر؟","safety":""}
  ]);

  // --- herog/صبحانه: اضافه کردن ---
  inject('salamat', 'herog', 'صبحانه', 'معرفی و شناخت', [
    {"title":"صبحانه سالم چیست؟","type":"activity","desc":"آشنایی با اجزای صبحانه سالم","category":"عادت غذایی سالم","ageMin":2,"ageMax":4,"duration":10,"materials":"تصاویر مواد غذایی","instructions":"تصاویر نان, پنیر, تخم‌مرغ, شیر را نشان دهید → هر کدام چه فایده‌ای دارد؟ → صبحانه مهم‌ترین وعده است","safety":""},
    {"title":"صبحانه انرژی‌بخش","type":"activity","desc":"تأثیر صبحانه بر انرژی","category":"عادت غذایی سالم","ageMin":3,"ageMax":5,"duration":10,"materials":"تصاویر","instructions":"بدون صبحانه چه احساسی داریم؟ → با صبحانه چطور؟ → صبحانه به مغز کمک می‌کند → هر روز صبحانه بخوریم","safety":""}
  ]);

  // --- herog/آب: اضافه کردن ---
  inject('salamat', 'herog', 'آب', 'معرفی و شناخت', [
    {"title":"چرا آب مهم است؟","type":"activity","desc":"اهمیت نوشیدن آب","category":"عادت غذایی سالم","ageMin":2,"ageMax":4,"duration":10,"materials":"لیوان آب, تصویر بدن","instructions":"بدن ما از آب تشکیل شده → بدون آب مریض می‌شویم → روزی چند لیوان آب بنوشیم → آب بهترین نوشیدنی است","safety":""},
    {"title":"آب از کجا می‌آید؟","type":"activity","desc":"سفر آب از چشمه تا شیر","category":"شناخت طبیعت","ageMin":3,"ageMax":5,"duration":15,"materials":"تصویر, کاردستی ساده","instructions":"باران می‌بارد → زمین جذب می‌کند → چشمه جاری می‌شود → تصفیه می‌شود → از شیر می‌آید → قدردان آب باشیم","safety":""}
  ]);

  // --- herog/میان‌وعده: اضافه کردن ---
  inject('salamat', 'herog', 'میان‌وعده', 'معرفی و شناخت', [
    {"title":"میان‌وعده سالم","type":"activity","desc":"انتخاب میان‌وعده مناسب","category":"عادت غذایی سالم","ageMin":2,"ageMax":4,"duration":10,"materials":"تصاویر مواد غذایی","instructions":"میوه, آجیل, ماست → اینها میان‌وعده سالم هستند → چیپس و شکلات میان‌وعده سالم نیستند → هر چند ساعت یکبار بخوریم","safety":""}
  ]);

  // --- herog_left/دست‌ها: اضافه کردن ---
  inject('salamat', 'herog_left', 'دست‌ها', 'فعالیت و کاربرد', [
    {"title":"شستن دست‌ها با آهنگ","type":"activity","desc":"یادگیری شستن دست با آهنگ","category":"بهداشت شخصی","ageMin":2,"ageMax":4,"duration":5,"materials":"آب و صابون","instructions":"آب باز کنید → صابون بزنید → کف دست, پشت دست, بین انگشتان → ۲۰ ثانیه آهنگ بخوانید → آبکشی کنید","safety":""},
    {"title":"کِی دست‌ها را بشوییم؟","type":"activity","desc":"زمان‌های مهم شستن دست","category":"بهداشت شخصی","ageMin":2,"ageMax":4,"duration":10,"materials":"تصاویر","instructions":"قبل از غذا → بعد از دستشویی → بعد از بازی → بعد از عطسه → این زمان‌ها دست را بشوییم","safety":""}
  ]);

  // --- herog_left/مسواک: اضافه کردن ---
  inject('salamat', 'herog_left', 'مسواک', 'معرفی و شناخت', [
    {"title":"چرا مسواک می‌زنیم؟","type":"activity","desc":"اهمیت مسواک زدن","category":"بهداشت شخصی","ageMin":2,"ageMax":4,"duration":10,"materials":"مسواک, خمیردندان, تصویر","instructions":"دندان‌هایمان را دوست داریم → غذا بین دندان‌ها می‌ماند → باکتری دندان‌ها را خراب می‌کند → صبح و شب مسواک بزنیم","safety":"خمیردندان قورت ندهید"},
    {"title":"تکنیک مسواک زدن","type":"activity","desc":"روش صحیح مسواک زدن","category":"بهداشت شخصی","ageMin":3,"ageMax":5,"duration":10,"materials":"مسواک, خمیردندان","instructions":"مسواک را ۴۵ درجه نگه دارید → بالا و پایین مسواک بزنید → زبان را هم بشویید → ۲ دقیقه زمان بگیرید","safety":""}
  ]);

  // --- herog_left/حمام: اضافه کردن ---
  inject('salamat', 'herog_left', 'حمام', 'معرفی و شناخت', [
    {"title":"حمام کردن آرام","type":"activity","desc":"آداب حمام کردن","category":"بهداشت شخصی","ageMin":2,"ageMax":4,"duration":15,"materials":"شامپو, اسفنج, حوله","instructions":"آب گرم آماده کنید → بدن را خیس کنید → شامپو بزنید → آبکشی کنید → حوله بکشید → لباس تمیز بپوشید","safety":"دما را چک کنید"},
    {"title":"حمام بازی","type":"activity","desc":"بازی‌های حمام","category":"بازی حسی","ageMin":2,"ageMax":4,"duration":15,"materials":"اسباب‌بازی حمام, فنجان","instructions":"با فنجان آب بریزید → حباب‌ها را بشمارید → اسباب‌بازی شناور کنید → لیوان را پر و خالی کنید","safety":""}
  ]);

  // --- herog_left/صورت: اضافه کردن ---
  inject('salamat', 'herog_left', 'صورت', 'معرفی و شناخت', [
    {"title":"شستن صورت","type":"activity","desc":"آداب شستن صورت","category":"بهداشت شخصی","ageMin":2,"ageMax":4,"duration":5,"materials":"آب, صابون ملایم, حوله","instructions":"صورت را با آب ولرم بشویید → صابون ملایم بزنید → آبکشی کنید → حوله نرم بکشید","safety":"از چشم دور نگه دارید"},
    {"title":"اهمیت شستن صورت","type":"activity","desc":"چرا صورت را می‌شوییم؟","category":"بهداشت شخصی","ageMin":2,"ageMax":4,"duration":5,"materials":"تصاویر","instructions":"صورت کثیف می‌شود → عرق و گرد و غبار → شستن صورت پوست را سالم نگه می‌دارد → صبح و شب بشوییم","safety":""}
  ]);

  // --- herog_right/ورزش: اضافه کردن ---
  inject('salamat', 'herog_right', 'ورزش', 'معرفی و شناخت', [
    {"title":"ورزش صبحگاهی","type":"activity","desc":"حرکات کششی صبحگاهی","category":"بازی حرکتی","ageMin":2,"ageMax":6,"duration":10,"materials":"موسيقي","instructions":"بازوهایتان را بالا ببرید → ۱۰ بار بچرخید → خم شوید → بپرید → بدوید در جا","safety":"فضای کافی داشته باشید"},
    {"title":"فوتبال مینی","type":"activity","desc":"فوتبال ساده برای کودکان","category":"بازی حرکتی","ageMin":3,"ageMax":6,"duration":20,"materials":"توپ کوچک, دروازه","instructions":"تیم‌ها را تقسیم کنید → با پا توپ را بزنید → گل بزنید → نوبت‌گیری را رعایت کنید","safety":""}
  ]);
  inject('salamat', 'herog_right', 'ورزش', 'فعالیت و کاربرد', [
    {"title":"بازی تعادلی","type":"activity","desc":"تمرین تعادل با یک پا","category":"بازی حرکتی","ageMin":3,"ageMax":5,"duration":10,"materials":"هیچ","instructions":"روی یک پا بایستید → ۵ ثانیه نگه دارید → چشم‌ها را ببندید → چه کسی بیشتر نگه می‌دارد؟","safety":""}
  ]);

  // --- herog_right/خواب: اضافه کردن ---
  inject('salamat', 'herog_right', 'خواب', 'معرفی و شناخت', [
    {"title":"خواب کافی چقدر است؟","type":"activity","desc":"مدت خواب مناسب کودک","category":"عادت سالم","ageMin":2,"ageMax":4,"duration":10,"materials":"ساعت, تصویر","instructions":"کودکان ۱۰-۱۲ ساعت می‌خوابند → خواب کافی = بدن سالم → شب زود بخوابیم → صبح سرحال بیدار شویم","safety":""},
    {"title":"آداب قبل از خواب","type":"activity","desc":"روتین قبل از خواب","category":"عادت سالم","ageMin":2,"ageMax":4,"duration":10,"materials":"تصاویر","instructions":"مسواک بزنید → لباس خواب بپوشید → قصه بخوانید → لالایی گوش دهید → چراغ را کم کنید → بخوابید","safety":""}
  ]);

  // --- herog_right/نور: اضافه کردن ---
  inject('salamat', 'herog_right', 'نور', 'معرفی و شناخت', [
    {"title":"نور خورشید خوب است","type":"activity","desc":"اهمیت نور خورشید","category":"عادت سالم","ageMin":2,"ageMax":4,"duration":10,"materials":"تصویر خورشید","instructions":"نور خورشید ویتامین D می‌دهد → استخوان‌ها قوی می‌شوند → اما نباید زیاد بمانیم → کلاه بگذاریم","safety":"از آفتاب مستقیم دور باشید"},
    {"title":"نور و تاریکی","type":"activity","desc":"تفاوت نور و تاریکی","category":"شناخت طبیعت","ageMin":2,"ageMax":3,"duration":10,"materials":"چراغ قوه, اتاق تاریک","instructions":"چراغ را روشن کنید → همه چیز دیده می‌شود → خاموش کنید → تاریک می‌شود → چشم‌ها عادت می‌کنند","safety":""}
  ]);

  // --- herog_right/هوا: اضافه کردن ---
  inject('salamat', 'herog_right', 'هوا', 'معرفی و شناخت', [
    {"title":"هوا تمیز نفس بکشیم","type":"activity","desc":"اهمیت هوای تمیز","category":"عادت سالم","ageMin":2,"ageMax":4,"duration":10,"materials":"تصویر درخت, هوای آزاد","instructions":"درختان هوا را تمیز می‌کنند → در فضای باز بازی کنیم → پنجره را باز کنیم → هوای تازه بخوریم","safety":""}
  ]);

  // ═══════════════════════════════════════════
  // ═══ اتاق خواب (khab) ═══
  // ═══════════════════════════════════════════

  // --- herog/محیط: اضافه کردن ---
  inject('khab', 'herog', 'محیط', 'معرفی و شناخت', [
    {"title":"اتاق خواب ایده‌آل","type":"activity","desc":"ویژگی‌های اتاق خواب مناسب","category":"عادت سالم","ageMin":2,"ageMax":4,"duration":10,"materials":"تصویر اتاق","instructions":"اتاق باید تاریک باشد → دمای مناسب (۲۰ درجه) → ساکت باشد → تخت تمیز → بدون اسباب‌بازی زیاد","safety":""},
    {"title":"چراغ شب","type":"activity","desc":"استفاده از چراغ شب","category":"عادت سالم","ageMin":2,"ageMax":4,"duration":5,"materials":"چراغ شب کم‌نور","instructions":"چراغ شب نور کمی دارد → ترس از تاریکی را کم می‌کند → هر شب روشن بگذارید → وقتی بزرگ شدید خاموش می‌کنیم","safety":""}
  ]);

  // --- herog/تنفس: اضافه کردن ---
  inject('khab', 'herog', 'تنفس', 'معرفی و شناخت', [
    {"title":"تنفس شکمی","type":"activity","desc":"آموزش تنفس عمیق","category":"آرامسازی","ageMin":3,"ageMax":6,"duration":10,"materials":"هیچ","instructions":"دست روی شکم بگذارید → نفس عمیق بکشید → شکم باد شود → آرام بازدم کنید → ۵ بار تکرار","safety":""},
    {"title":"بازی حباب","type":"activity","desc":"تنفس با بازی حباب","category":"آرامسازی","ageMin":2,"ageMax":4,"duration":10,"materials":"حباب ساز","instructions":"حباب درست کنید → حباب‌ها را فوت کنید → بزرگترین حbubble → آرام نفس بکشید و فوت کنید","safety":""}
  ]);

  // --- herog/آرامش: اضافه کردن ---
  inject('khab', 'herog', 'آرامش', 'معرفی و شناخت', [
    {"title":"یوگای کودکان","type":"activity","desc":"حرکات یوگای ساده","category":"آرامسازی","ageMin":3,"ageMax":6,"duration":15,"materials":"موسيقي آرام","instructions":"مثل درخت بایستید → مثل گربه خم شوید → مثل پروانه بال‌ها را باز کنید → مثل ماهی آرام باشید","safety":""},
    {"title":"شمارش ستاره‌ها","type":"activity","desc":"تکنیک آرامسازی با شمارش","category":"آرامسازی","ageMin":2,"ageMax":5,"duration":10,"materials":"هیچ","instructions":"چشم‌ها را ببندید → تصور کنید آسمان پر ستاره → ۱۰ ستاره را بشمارید → هر ستاره یک نفس عمیق → آرام شوید","safety":""}
  ]);

  // --- herog/تصویر: اضافه کردن ---
  inject('khab', 'herog', 'تصویر', 'معرفی و شناخت', [
    {"title":"تصویرسازی ذهنی","type":"activity","desc":"تصویرسازی برای آرامش","category":"آرامسازی","ageMin":3,"ageMax":6,"duration":10,"materials":"هیچ","instructions":"چشم‌ها را ببندید → تصور کنید در یک باغ زیبا هستید → گل‌ها را ببینید → پروانه‌ها را ببینید → آرام شوید","safety":""}
  ]);

  // --- herog_left/لالایی: اضافه کردن ---
  inject('khab', 'herog_left', 'لالایی', 'معرفی و شناخت', [
    {"title":"لالایی‌های ایرانی","type":"song","desc":"لالایی‌های سنتی ایرانی","category":"لالایی","source":"یاران","desc":"لالایی‌های آرام‌بخش ایرانی برای خواب کودک"},
    {"title":"لالایی ستاره‌ها","type":"song","desc":"لالایی ملایم ستاره‌ها","category":"لالایی","source":"یاران","desc":"ستاره‌ها چشمک می‌زنند, کودک ما خوابیده است"},
    {"title":"لالایی باران","type":"song","desc":"صدای باران آرام‌بخش","category":"لالایی","source":"یاران","desc":"باران آرام می‌بارد, کودک در آغوش مادر آرام است"}
  ]);

  // --- herog_left/قصه: اضافه کردن ---
  inject('khab', 'herog_left', 'قصه', 'معرفی و شناخت', [
    {"title":"خرس کوچولو خوابید","type":"story","desc":"داستان خرسی که خوابش نمی‌برد","category":"قصه خواب","ageMin":2,"ageMax":5,"duration":10,"instructions":"خرس کوچولو در لانه‌اش دراز کشید → ماه را از پنجره دید → ستاره‌ها را شمرد → باران آرام شنید → چشمانش سنگین شد → خوابید"},
    {"title":"ستاره و ماه","type":"story","desc":"داستان دوستی ستاره و ماه","category":"قصه خواب","ageMin":2,"ageMax":5,"duration":10,"instructions":"ستاره کوچک هر شب ماه را می‌دید → ماه به ستاره لبخند زد → ستاره چشمک زد → هر دو آرام در آسمان خوابیدند"},
    {"title":"کرم شب‌تاب","type":"story","desc":"داستان کرم شب‌تاب که نور می‌دهد","category":"قصه خواب","ageMin":2,"ageMax":4,"duration":8,"instructions":"کرم شب‌تاب در تاریکی نور کوچکی داشت → با نورش راه را نشان داد → حیوانات کوچک را به خانه رساند → خودش هم آرام خوابید"}
  ]);

  // --- herog_left/آمادگی: اضافه کردن ---
  inject('khab', 'herog_left', 'آمادگی', 'معرفی و شناخت', [
    {"title":"روتین خواب کودک","type":"activity","desc":"برنامه قبل از خواب","category":"عادت سالم","ageMin":2,"ageMax":4,"duration":15,"materials":"تصویر فعالیت‌ها","instructions":"ساعت ۸: مسواک → ساعت ۸:۱۰: لباس خواب → ساعت ۸:۲۰: قصه → ساعت ۸:۳۰: لالایی → ساعت ۸:۴۰: خواب","safety":""},
    {"title":"شمارش معکوس","type":"activity","desc":"شمارش معکوس برای خواب","category":"آرامسازی","ageMin":3,"ageMax":5,"duration":5,"materials":"هیچ","instructions":"از ۱۰ شروع کنید → آرام بشمارید → ۹, ۸, ۷... → هر عدد یک نفس عمیق → ۱... خوابیدم","safety":""}
  ]);

  // --- herog_left/مسواک (khab): اضافه کردن ---
  inject('khab', 'herog_left', 'مسواک', 'معرفی و شناخت', [
    {"title":"مسواک قبل از خواب","type":"activity","desc":"اهمیت مسواک شب","category":"بهداشت شخصی","ageMin":2,"ageMax":4,"duration":5,"materials":"مسواک, خمیردندان","instructions":"غذا بین دندان‌ها مانده → باکتری‌ها فعال می‌شوند → شب قبل از خواب حتماً مسواک بزنیم → دندان‌های سالم داشته باشیم","safety":"خمیردندان قورت ندهید"}
  ]);

  // --- herog_right/صبح: اضافه کردن ---
  inject('khab', 'herog_right', 'صبح', 'معرفی و شناخت', [
    {"title":"بیدار شدن شاد","type":"activity","desc":"روتین صبحگاهی شاد","category":"عادت سالم","ageMin":2,"ageMax":4,"duration":10,"materials":"موسيقي شاد","instructions":"با لبخند بیدار شوید → کشش بیایید → صورت را بشویید → لباس تمیز بپوشید → صبحانه بخورید → آماده شوید","safety":""},
    {"title":"صبح زود بیدار","type":"activity","desc":"فواید صبح زود بیدار شدن","category":"عادت سالم","ageMin":3,"ageMax":5,"duration":5,"materials":"ساعت","instructions":"صبح زود = وقت بیشتر → بازی بیشتر → یادگیری بیشتر → شب زود بخوابید تا صبح زود بیدار شوید","safety":""}
  ]);

  // --- herog_right/کشش: اضافه کردن ---
  inject('khab', 'herog_right', 'کشش', 'معرفی و شناخت', [
    {"title":"کشش صبحگاهی","type":"activity","desc":"حرکات کششی بعد از بیدار شدن","category":"بازی حرکتی","ageMin":2,"ageMax":5,"duration":5,"materials":"موسيقي","instructions":"بازوها را بالا ببرید → ۵ ثانیه نگه دارید → خم شوید → پاها را بکشید → بپرید → سرحال شدید!","safety":"آرام شروع کنید"}
  ]);

  // --- herog_right/شستشو: اضافه کردن ---
  inject('khab', 'herog_right', 'شستشو', 'معرفی و شناخت', [
    {"title":"شستشوی صبحگاهی","type":"activity","desc":"روتین شستشوی صبح","category":"بهداشت شخصی","ageMin":2,"ageMax":4,"duration":10,"materials":"آب, صابون, حوله","instructions":"صورت را بشویید → دست‌ها را بشویید → شانه بزنید → لباس تمیز بپوشید → آماده روز جدید","safety":""}
  ]);

  // --- herog_right/لباس: اضافه کردن ---
  inject('khab', 'herog_right', 'لباس', 'معرفی و شناخت', [
    {"title":"انتخاب لباس صبح","type":"activity","desc":"انتخاب لباس مناسب","category":"مهارت زندگی","ageMin":3,"ageMax":5,"duration":10,"materials":"لباس‌های مختلف","instructions":"هوا را نگاه کنید → گرم است یا سرد؟ → لباس مناسب بپوشید → خودتان انتخاب کنید → مرتب باشید","safety":""},
    {"title":"پوشیدن لباس","type":"activity","desc":"تمرین پوشیدن لباس به تنهایی","category":"مهارت زندگی","ageMin":2,"ageMax":4,"duration":15,"materials":"لباس ساده","instructions":"اول پیراهن → بعد شلوار → دکمه‌ها را ببندید → زیپ را بکشید → خودتان توانستید!","safety":""}
  ]);

  // ═══════════════════════════════════════════
  // ═══ اتاق مربی (moraabi) ═══
  // ═══════════════════════════════════════════

  // --- herog/فارسی: اضافه کردن ---
  inject('moraabi', 'herog', 'فارسی', 'فعالیت و کاربرد', [
    {"title":"بازی‌های زبانی فارسی","type":"activity","desc":"بازی‌های تقویت زبان فارسی","category":"بازی زبانی","ageMin":3,"ageMax":6,"duration":15,"materials":"کارت حروف","instructions":"کارت‌ها را بگردانید → حرف را بگویید → کلمه بسازید → جمله بسازید → بازی کنید","safety":""}
  ]);

  // --- herog/انگلیسی: اضافه کردن ---
  inject('moraabi', 'herog', 'انگلیسی', 'فعالیت و کاربرد', [
    {"title":"آموزش الفبای انگلیسی با آهنگ","type":"activity","desc":"یادگیری حروف انگلیسی با آهنگ","category":"بازی زبانی","ageMin":3,"ageMax":6,"duration":15,"materials":"کارت حروف, آهنگ","instructions":"A-B-C را با آهنگ بخوانید → هر حرف را با تصویر نشان دهید → کلمه ساده بگویید → Apple, Ball, Cat","safety":""},
    {"title":"شمارش انگلیسی","type":"activity","desc":"شمارش ۱ تا ۱۰ به انگلیسی","category":"بازی آموزشی","ageMin":3,"ageMax":5,"duration":10,"materials":"انگشتان دست","instructions":"One, Two, Three → با انگشت بشمارید → Four, Five, Six → Seven, Eight, Nine, Ten → تبریک!","safety":""}
  ]);

  // --- herog/شعر: اضافه کردن ---
  inject('moraabi', 'herog', 'شعر', 'فعالیت و کاربرد', [
    {"title":"شعرخوانی گروهی","type":"activity","desc":"خواندن شعر با حرکات","category":"شعر","ageMin":2,"ageMax":5,"duration":10,"materials":"شعر چاپ شده","instructions":"شعر را با صدای بلند بخوانید → کودکان تکرار کنند → با حرکات همراهی کنند → لذت ببرید","safety":""}
  ]);

  // --- herog/داستان: اضافه کردن ---
  inject('moraabi', 'herog', 'داستان', 'فعالیت و کاربرد', [
    {"title":"قصه‌گویی با عروسک","type":"activity","desc":"استفاده از عروسک در قصه‌گویی","category":"قصه‌گویی","ageMin":2,"ageMax":5,"duration":15,"materials":"عروسک, کتاب","instructions":"عروسک را معرفی کنید → عروسک قصه تعریف می‌کند → کودکان سؤال بپرسند → عروسک جواب دهد → تعاملی و جذاب","safety":""}
  ]);

  // --- herog_left: اضافه کردن (after mahd-content.js rename) ---
  inject('moraabi', 'herog_left', 'مدیریت رفتار', 'فعالیت و کاربرد', [
    {"title":"تقویت رفتار مثبت","type":"activity","desc":"تکنیک‌های تقویت رفتار مثبت","category":"تکنیک تربیتی","ageMin":3,"ageMax":6,"duration":15,"materials":"ستاره, برچسب","instructions":"رفتار خوب را ببینید → فوراً تعریف کنید → ستاره بدهید → جدول پیشرفت → هر هفته جایزه","safety":""},
    {"title":"مدیریت احساسات کودک","type":"activity","desc":"کمک به کودک در مدیریت احساسات","category":"مهارت عاطفی","ageMin":2,"ageMax":5,"duration":15,"materials":"تصاویر احساسات","instructions":"احساسات را نام ببرید → خشم, غم, شادی → وقتی عصبانی هستی چه کنی → نفس عمیق → حرف بزن","safety":""}
  ]);

  inject('moraabi', 'herog_left', 'مشاهده و مستندسازی', 'فعالیت و کاربرد', [
    {"title":"فرم مشاهده روزانه","type":"activity","desc":"نحوه نوشتن فرم مشاهده","category":"فرمهای ارزیابی","ageMin":0,"ageMax":6,"duration":10,"materials":"فرم مشاهده, مداد","instructions":"تاریخ و نام کودک → فعالیت انجام شده → رفتار مشاهده شده → نقاط قوت → پیشنهاد بهبود → امضا","safety":""}
  ]);

  inject('moraabi', 'herog_left', 'برنامه‌ریزی', 'فعالیت و کاربرد', [
    {"title":"برنامه هفتگی کلاس","type":"activity","desc":"تهیه برنامه هفتگی آموزشی","category":"مدیریت کلاس","ageMin":0,"ageMax":6,"duration":20,"materials":"تقویم, ماژیک","instructions":"روزهای هفته را بنویسید → هر روز ۳ فعالیت → تنوع موضوعات → زمان استراحت → بازی → ارزیابی","safety":""}
  ]);

  inject('moraabi', 'herog_left', 'ارزیابی رشد', 'فعالیت و کاربرد', [
    {"title":"چک‌لیست رشد کودک","type":"activity","desc":"ارزیابی رشد جسمی و شناختی","category":"ارزیابی رشد","ageMin":0,"ageMax":6,"duration":15,"materials":"چک‌لیست ارزیابی","instructions":"رشد جسمی: قد, وزن, هماهنگی → رشد شناختی: حافظه, تمرکز → رشد عاطفی: احساسات, اجتماعی → ثبت در پرونده","safety":""}
  ]);

  // --- herog_right (after mahd-content.js rename) ---
  inject('moraabi', 'herog_right', 'حمایت', 'فعالیت و کاربرد', [
    {"title":"حمایت از کودکان آسیب‌پذیر","type":"activity","desc":"شناسایی و حمایت از کودکان نیازمند","category":"کودکان استثنایی","ageMin":0,"ageMax":6,"duration":15,"materials":"فرم ارزیابی","instructions":"کودکان آسیب‌پذیر را شناسایی کنید → با خانواده تماس بگیرید → برنامه حمایتی → پیگیری مستمر → گزارش","safety":""}
  ]);

  inject('moraabi', 'herog_right', 'کارگاه', 'فعالیت و کاربرد', [
    {"title":"کارگاه آموزشی مربیان","type":"activity","desc":"برگزاری کارگاه آموزشی","category":"مدیریت کلاس","ageMin":0,"ageMax":6,"duration":60,"materials":"پروژکتور, جزوه","instructions":"موضوع را انتخاب کنید → جزوه آماده کنید → مثال عملی بیاورید → تعامل با مربیان → بازخورد بگیرید","safety":""}
  ]);

  inject('moraabi', 'herog_right', 'منابع', 'فعالیت و کاربرد', [
    {"title":"منابع آموزشی مربیان","type":"activity","desc":"معرفی منابع مفید برای مربیان","category":"منابع آموزشی","ageMin":0,"ageMax":6,"duration":10,"materials":"لیست منابع","instructions":"کتاب‌های تخصصی → مجلات آموزشی → وبسایت‌های مفید → گروه‌های آموزشی → همایش‌ها → گواهینامه‌ها","safety":""}
  ]);

  // ═══════════════════════════════════════════
  // ═══ استراحت مربیان (esterahat-moraabian) ═══
  // ═══════════════════════════════════════════

  inject('esterahat-moraabian', 'herog', 'هفتگی', 'معرفی و شناخت', [
    {"title":"برنامه هفتگی استراحت","type":"activity","desc":"برنامه‌ریزی وقت استراحت","category":"خودمراقبتی","ageMin":0,"ageMax":6,"duration":10,"materials":"تقویم","instructions":"هر روز ۱۵ دقیقه استراحت → چای بنوشید → کتاب بخوانید → با همکاران گفتگو کنید → انرژی بگیرید","safety":""},
    {"title":"نرمش ساده","type":"activity","desc":"حرکات نرمشی ساده","category":"بازی حرکتی","ageMin":0,"ageMax":6,"duration":5,"materials":"هیچ","instructions":"بایستید → بازوهایتان را بچرخانید → خم شوید → ۱۰ بار بشینید و بلند شوید → کشش بیایید","safety":"آرام انجام دهید"}
  ]);

  inject('esterahat-moraabian', 'herog', 'ارزیابی', 'فعالیت و کاربرد', [
    {"title":"ارزیابی عملکرد ماهانه","type":"activity","desc":"خودارزیابی عملکرد ماهانه","category":"ارزیابی رشد","ageMin":0,"ageMax":6,"duration":20,"materials":"فرم ارزیابی","instructions":"اهداف ماه قبل → دستاوردها → چالش‌ها → برنامه بهبود → بازخورد مدیر → هدف ماه بعد","safety":""}
  ]);

  inject('esterahat-moraabian', 'herog', 'مواد', 'معرفی و شناخت', [
    {"title":"آماده‌سازی مواد آموزشی","type":"activity","desc":"تهیه وسایل آموزشی","category":"مدیریت کلاس","ageMin":0,"ageMax":6,"duration":30,"materials":"لیست مواد","instructions":"لیست مواد مورد نیاز → سفارش → دریافت → بررسی کیفیت → انبار → توزیع در کلاس‌ها","safety":""}
  ]);

  inject('esterahat-moraabian', 'herog', 'هماهنگی', 'فعالیت و کاربرد', [
    {"title":"هماهنگی بین کلاس‌ها","type":"activity","desc":"هماهنگی فعالیت‌های مشترک","category":"مدیریت کلاس","ageMin":0,"ageMax":6,"duration":15,"materials":"تقویم مشترک","instructions":"جلسه هفتگی → برنامه مشترک → تقسیم وظایف → اجرای هماهنگ → ارزیابی نتیجه","safety":""}
  ]);

  inject('esterahat-moraabian', 'herog_left', 'چای', 'معرفی و شناخت', [
    {"title":"وقت چای و گفتگو","type":"activity","desc":"استراحت با چای و گفتگو","category":"خودمراقبتی","ageMin":0,"ageMax":6,"duration":15,"materials":"چای, بیسکویت","instructions":"چای بریزید → آرام بنشینید → درباره روزمره گفتگو کنید → مشکلات را مطرح کنید → راه‌حل پیدا کنید","safety":""}
  ]);

  inject('esterahat-moraabian', 'herog_left', 'مطالعه', 'معرفی و شناخت', [
    {"title":"مطالعه تخصصی مربیان","type":"activity","desc":"مطالعه کتاب‌های تخصصی","category":"کتابخوانی","ageMin":0,"ageMax":6,"duration":30,"materials":"کتاب تخصصی","instructions":"کتاب مرتبط انتخاب کنید → ۳۰ دقیقه مطالعه → نکات مهم را یادداشت کنید → با دیگران به اشتراک بگذارید","safety":""}
  ]);

  inject('esterahat-moraabian', 'herog_left', 'گفتگو', 'فعالیت و کاربرد', [
    {"title":"گفتگوی حرفه‌ای","type":"activity","desc":"تبادل تجربیات مربیان","category":"ارتباط","ageMin":0,"ageMax":6,"duration":20,"materials":"هیچ","instructions":"تجربه موفق را تعریف کنید → چالش‌ها را مطرح کنید → راه‌حل‌های خلاق پیشنهاد دهید → یاد بگیرید","safety":""}
  ]);

  inject('esterahat-moraabian', 'herog_left', 'ورزش', 'معرفی و شناخت', [
    {"title":"نرمش صبحگاهی مربیان","type":"activity","desc":"حرکات ورزشی صبحگاهی","category":"بازی حرکتی","ageMin":0,"ageMax":6,"duration":10,"materials":"موسيقي","instructions":"قبل از شروع کار → ۱۰ دقیقه نرمش → کشش → تنفس عمیق → آماده شروع روز","safety":"آرام شروع کنید"}
  ]);

  inject('esterahat-moraabian', 'herog_right', 'کارگاه', 'معرفی و شناخت', [
    {"title":"کارگاه مهارت‌افزایی","type":"activity","desc":"کارگاه‌های تخصصی ماهانه","category":"مدیریت کلاس","ageMin":0,"ageMax":6,"duration":60,"materials":"پروژکتور","instructions":"موضوع: مدیریت کلاس → موضوع: ارتباط با والدین → موضوع: بازی‌های آموزشی → موضوع: ارزیابی","safety":""}
  ]);

  inject('esterahat-moraabian', 'herog_right', 'کتاب', 'معرفی و شناخت', [
    {"title":"کتاب‌های پیشنهادی","type":"activity","desc":"معرفی کتاب‌های مفید","category":"کتابخوانی","ageMin":0,"ageMax":6,"duration":10,"materials":"لیست کتاب","instructions":"کودک و خانواده → روانشناسی کودک → مدیریت کلاس → خلاقیت در آموزش → هر ماه یک کتاب","safety":""}
  ]);

  inject('esterahat-moraabian', 'herog_right', 'وبینار', 'معرفی و شناخت', [
    {"title":"وبینارهای آموزشی","type":"activity","desc":"شرکت در وبینارهای تخصصی","category":"مدیریت کلاس","ageMin":0,"ageMax":6,"duration":60,"materials":"کامپیوتر, اینترنت","instructions":"وبینار مرتبط پیدا کنید → ثبت‌نام کنید → شرکت کنید → یادداشت بردارید → نکات را اجرا کنید","safety":""}
  ]);

  inject('esterahat-moraabian', 'herog_right', 'تبادل', 'فعالیت و کاربرد', [
    {"title":"تبادل تجربه با مهدکودک‌های دیگر","type":"activity","desc":"بازدید و تبادل تجربه","category":"ارتباط","ageMin":0,"ageMax":6,"duration":120,"materials":"خودرو, لیست سؤالات","instructions":"مهدکودک مقصد → بازدید از کلاس‌ها → گفتگو با مربیان → یادداشت نکات → اجرای ایده‌ها در مهد خودمان","safety":""}
  ]);

  // ═══════════════════════════════════════════
  // ═══ جلسه اولیا (jalase-owlia) ═══
  // ═══════════════════════════════════════════

  inject('jalase-owlia', 'herog', 'احساسات', 'معرفی و شناخت', [
    {"title":"شناخت احساسات کودک","type":"activity","desc":"آشنایی با احساسات مختلف","category":"مهارت عاطفی","ageMin":2,"ageMax":6,"duration":15,"materials":"تصاویر احساسات","instructions":"شادی → لبخند → غم → اشک → خشم → صورت قرمز → ترس → فرار → هر احساسی طبیعی است","safety":""},
    {"title":"بیان احساسات","type":"activity","desc":"آموزش بیان احساسات","category":"مهارت عاطفی","ageMin":3,"ageMax":6,"duration":15,"materials":"کارت احساسات","instructions":"احساست چیست؟ → چه حسی داری؟ → چرا این حس را داری؟ → چه کمکی نیاز داری؟ → حرف بزن","safety":""}
  ]);

  inject('jalase-owlia', 'herog', 'دوستی', 'معرفی و شناخت', [
    {"title":"دوستیابی کودکان","type":"activity","desc":"کمک به کودک در دوستیابی","category":"مهارت اجتماعی","ageMin":2,"ageMax":5,"duration":15,"materials":"بازی گروهی","instructions":"سلام کن → اسمت چیه؟ → بازی کنیم؟ → نوبت بگیر → مشارکت کن → دوست خوب باش","safety":""}
  ]);

  inject('jalase-owlia', 'herog', 'ترس', 'معرفی و شناخت', [
    {"title":"مدیریت ترس کودک","type":"activity","desc":"کمک به کودک در غلبه بر ترس","category":"مهارت عاطفی","ageMin":2,"ageMax":5,"duration":15,"materials":"کتاب داستان","instructions":"ترس طبیعی است → ترس را نام ببر → چرا می‌ترسی؟ → با هم راه‌حل پیدا کن → کم‌کم شجاع شو","safety":""}
  ]);

  inject('jalase-owlia', 'herog', 'خودباوری', 'معرفی و شناخت', [
    {"title":"تقویت اعتماد به نفس","type":"activity","desc":"راهکارهای تقویت خودباوری","category":"مهارت عاطفی","ageMin":2,"ageMax":6,"duration":15,"materials":"آینه, کتاب","instructions":"تو توانایی → تلاش کن → اشکالی نداره → دوباره تلاش کن → تو خوبی → به خودت ایمان داشته باش","safety":""}
  ]);

  // herog_left (after mahd-content.js rename)
  inject('jalase-owlia', 'herog_left', 'فرزندپروری', 'معرفی و شناخت', [
    {"title":"شیوه‌های فرزندپروری مثبت","type":"activity","desc":"اصول تربیت مثبت","category":"فرزندپروری","ageMin":0,"ageMax":6,"duration":30,"materials":"جزوه آموزشی","instructions":"تحت فشار نگذارید → تشویق کنید → الگو باشید → وقت بگذارید → گوش دهید → صبور باشید","safety":""},
    {"title":"روابط عاطفی با کودک","type":"activity","desc":"تقویت پیوند عاطفی","category":"فرزندپروری","ageMin":0,"ageMax":6,"duration":20,"materials":"هیچ","instructions":"در آغوش بگیرید → بازی کنید → قصه بخوانید → گوش دهید → تأیید کنید → وقت با کیفیت","safety":""}
  ]);

  inject('jalase-owlia', 'herog_left', 'مرزها', 'معرفی و شناخت', [
    {"title":"تعیین مرزهای سالم","type":"activity","desc":"规矩 و محدودیت‌های مناسب","category":"فرزندپروری","ageMin":0,"ageMax":6,"duration":20,"materials":"لیست قوانین","instructions":"قوانین ساده و روشن → دلیل قانون را بگویید → ثابت باشید → تشویق > تنبیه → انعطاف در حد معقول","safety":""}
  ]);

  inject('jalase-owlia', 'herog_left', 'زمان با کیفیت', 'معرفی و شناخت', [
    {"title":" وقت با کیفیت با کودک","type":"activity","desc":"روش‌های گذراندن وقت با کیفیت","category":"فرزندپروری","ageMin":0,"ageMax":6,"duration":20,"materials":"ایده‌های فعالیت","instructions":"بازی مشترک → قصه خوانی → پیاده‌روی → نقاشی → آشپزی → هر فعالیتی که با هم باشید","safety":""}
  ]);

  inject('jalase-owlia', 'herog_left', 'احساسات', 'معرفی و شناخت', [
    {"title":"شناخت احساسات والدین","type":"activity","desc":"تأثیر احساسات والدین بر کودک","category":"مهارت عاطفی","ageMin":0,"ageMax":6,"duration":15,"materials":"هیچ","instructions":"احساسات خود را بشناسید → تحت تأثیر کودک نباشید → مدیریت استرس → الگوی آرامش","safety":""}
  ]);

  // herog_right
  inject('jalase-owlia', 'herog_right', 'رشد', 'معرفی و شناخت', [
    {"title":"مراحل رشد کودک","type":"activity","desc":"آشنایی با مراحل رشد","category":"فرزندپروری","ageMin":0,"ageMax":6,"duration":20,"materials":"جدول رشد","instructions":"رشد جسمی → قد و وزن → رشد شناختی → هوش → رشد عاطفی → احساسات → رشد اجتماعی → تعامل","safety":""}
  ]);

  inject('jalase-owlia', 'herog_right', 'تحصیلی', 'معرفی و شناخت', [
    {"title":"آمادگی تحصیلی کودک","type":"activity","desc":"ارزیابی آمادگی برای دبستان","category":"فرزندپروری","ageMin":0,"ageMax":6,"duration":15,"materials":"چک‌لیست","instructions":"شناخت حروف → شمارش → نوشتن → تمرکز → اجتماعی بودن → استقلال → آماده برای مدرسه","safety":""}
  ]);

  inject('jalase-owlia', 'herog_right', 'گزارش', 'فعالیت و کاربرد', [
    {"title":"گزارش پیشرفت کودک","type":"activity","desc":"نحوه نوشتن گزارش پیشرفت","category":"فرمهای ارزیابی","ageMin":0,"ageMax":6,"duration":15,"materials":"فرم گزارش","instructions":"نام کودک → تاریخ → فعالیت‌های انجام شده → نقاط قوت → زمینه‌های بهبود → پیشنهاد والدین","safety":""}
  ]);

  inject('jalase-owlia', 'herog_right', 'برنامه فردی', 'فعالیت و کاربرد', [
    {"title":"برنامه فردی کودک","type":"activity","desc":"تهیه برنامه فردی هر کودک","category":"فرمهای ارزیابی","ageMin":0,"ageMax":6,"duration":20,"materials":"فرم برنامه فردی","instructions":"اهداف کوتاه‌مدت → اهداف بلندمدت → فعالیت‌های هدفمند → زمان‌بندی → پیگیری → ارزیابی ماهانه","safety":""}
  ]);

  // ═══════════════════════════════════════════
  // ═══ بایگانی (bayegani) ═══
  // ═══════════════════════════════════════════

  // herog_right (after mahd-content.js rename)
  inject('bayegani', 'herog_right', 'نامه‌ها', 'معرفی و شناخت', [
    {"title":"نامه‌های اداری","type":"activity","desc":"نمونه نامه‌های اداری مهدکودک","category":"فرمهای اداری","ageMin":0,"ageMax":6,"duration":10,"materials":"نمونه نامه","instructions":"نامه به والدین → نامه به بهداشت → نامه به آموزش → نامه تشکر → قالب استاندارد","safety":""},
    {"title":"نامه‌های والدین","type":"activity","desc":"نحوه پاسخگویی به نامه‌های والدین","category":"ارتباط","ageMin":0,"ageMax":6,"duration":10,"materials":"نمونه نامه","instructions":"نامه را بخوانید → پاسخ دهید → مؤدبانه → دقیق → در زمان مناسب → بایگانی کنید","safety":""}
  ]);

  inject('bayegani', 'herog_right', 'نمونه‌کار', 'معرفی و شناخت', [
    {"title":"آلبوم نمونه‌کار کودکان","type":"activity","desc":"نحوه ثبت نمونه‌کار","category":"آلبوم کار","ageMin":0,"ageMax":6,"duration":15,"materials":"پوشه, برچسب","instructions":"آثار کودک را جمع‌آوری کنید → تاریخ بزنید → توضیح بنویسید → پوشه فردی → هر ماه بررسی کنید","safety":""}
  ]);

  inject('bayegani', 'herog_right', 'بایگانی دیجیتال', 'فعالیت و کاربرد', [
    {"title":"بایگانی دیجیتال اسناد","type":"activity","desc":"اسکن و بایگانی دیجیتال","category":"هوش دیجیتال","ageMin":0,"ageMax":6,"duration":30,"materials":"اسکنر, کامپیوتر","instructions":"اسناد را اسکن کنید → نام‌گذاری صحیح → پوشه‌بندی → بکاپ بگیرید → بایگانی امن","safety":""}
  ]);

  // ═══════════════════════════════════════════
  // ═══ تریا (teria) ═══
  // ═══════════════════════════════════════════

  // herog_left (after mahd-content.js rename)
  inject('teria', 'herog_left', 'میوه‌ها', 'معرفی و شناخت', [
    {"title":"شناخت میوه‌های رنگارنگ","type":"activity","desc":"آشنایی با میوه‌های مختلف","category":"آشنایی با میوه و سبزی","ageMin":2,"ageMax":4,"duration":15,"materials":"میوه‌های واقعی","instructions":"میوه‌ها را نام ببرید → رنگ‌ها را مقایسه کنید → طعم بچشید → کدام شیرین؟ کدام ترش؟","safety":""},
    {"title":"میوه‌های فصلی","type":"activity","desc":"شناخت میوه‌ها بر اساس فصل","category":"آشنایی با میوه و سبزی","ageMin":3,"ageMax":5,"duration":15,"materials":"تصاویر میوه‌ها","instructions":"بهار: توت‌فرنگی → تابستان: هندوانه → پاییز: انار → زمستان: نارنگی → هر فصل میوه مخصوص دارد","safety":""}
  ]);

  inject('teria', 'herog_left', 'سبزیجات', 'معرفی و شناخت', [
    {"title":"شناخت سبزیجات","type":"activity","desc":"آشنایی با سبزیجات مفید","category":"آشنایی با میوه و سبزی","ageMin":2,"ageMax":4,"duration":15,"materials":"سبزیجات واقعی","instructions":"کاهو, خیار, گوجه, هویج, کلم → هر کدام چه رنگی؟ → چه مزه‌ای؟ → چه فایده‌ای دارد؟","safety":""},
    {"title":"سبزیکاری کوچک","type":"activity","desc":"کاشت سبزی در گلدان","category":"طبیعت","ageMin":3,"ageMax":6,"duration":20,"materials":"گلدان, خاک, بذر سبزی","instructions":"گلدان را پر کنید → بذر بکارید → آب بدهید → هر روز مراقبت → جوانه بزند → سبزی بخورید!","safety":""}
  ]);

  inject('teria', 'herog_left', 'بهداشت دست', 'معرفی و شناخت', [
    {"title":"شستن دست قبل از غذا","type":"activity","desc":"اهمیت شستن دست قبل از غذا","category":"بهداشت شخصی","ageMin":2,"ageMax":4,"duration":5,"materials":"آب, صابون","instructions":"دست‌ها کثیف هستند → باکتری دارند → قبل از غذا حتماً بشویید → ۲۰ ثانیه صابون بزنید → آبکشی کنید","safety":""}
  ]);

  inject('teria', 'herog_left', 'آداب سفره', 'معرفی و شناخت', [
    {"title":"آداب نشستن سر سفره","type":"activity","desc":"规矩 سفره و غذاخوردن","category":"آداب غذا","ageMin":2,"ageMax":4,"duration":10,"materials":"سفره, لوازم غذا","instructions":"آرام بنشینید → دستمال بگذارید → با قاشق بخورید → دهان را ببندید → تشکر کنید","safety":""}
  ]);

  // herog (after mahd-content.js rename)
  inject('teria', 'herog', 'غذاهای سالم', 'معرفی و شناخت', [
    {"title":"هرم غذایی کودک","type":"activity","desc":"آشنایی با هرم غذایی","category":"عادت غذایی سالم","ageMin":3,"ageMax":6,"duration":15,"materials":"تصویر هرم غذایی","instructions":"پایه: نان و غلات → وسط: میوه و سبزی → بالا: گوشت و لبنیات → نوک: شکر و چربی کم","safety":""},
    {"title":"غذای سالم چیست؟","type":"activity","desc":"تفاوت غذای سالم و ناسالم","category":"عادت غذایی سالم","ageMin":2,"ageMax":4,"duration":10,"materials":"تصاویر غذاها","instructions":"میوه, سبزی, نان, شیر = سالم → چیپس, شکلات, نوشابه = ناسالم → بیشتر سالم بخوریم","safety":""}
  ]);

  inject('teria', 'herog', 'میان‌وعده سالم', 'معرفی و شناخت', [
    {"title":"میان‌وعده‌های مقوی","type":"activity","desc":"انتخاب میان‌وعده سالم","category":"عادت غذایی سالم","ageMin":2,"ageMax":4,"duration":10,"materials":"تصاویر مواد غذایی","instructions":"میوه تازه → ماست → آجیل → نان و پنیر → آبمیوه طبیعی → هر ۳ ساعت یکبار","safety":""}
  ]);

  inject('teria', 'herog', 'آب و پروتئین', 'معرفی و شناخت', [
    {"title":"اهمیت آب و پروتئین","type":"activity","desc":"نقش آب و پروتئین در رشد","category":"عادت غذایی سالم","ageMin":3,"ageMax":5,"duration":10,"materials":"تصویر","instructions":"آب = نوشیدنی اصلی → روزی ۶-۸ لیوان → پروتئین = تخم‌مرغ, گوشت, حبوبات → بدن را قوی می‌کند","safety":""}
  ]);

  inject('teria', 'herog', 'برنامه‌ریزی وعده‌ها', 'فعالیت و کاربرد', [
    {"title":"برنامه غذایی هفتگی","type":"activity","desc":"تهیه برنامه غذایی هفتگی","category":"عادت غذایی سالم","ageMin":0,"ageMax":6,"duration":20,"materials":"تقویم غذایی","instructions":"شنبه: کباب → یکشنبه: آبگوشت → دوشنبه: ماکارونی → ... → تنوع رعایت شود → میوه و سبزی فراموش نشود","safety":""}
  ]);

  // herog_right (after mahd-content.js rename)
  inject('teria', 'herog_right', 'آداب غذاخوری', 'معرفی و شناخت', [
    {"title":"آداب غذاخوری","type":"activity","desc":"规矩 و آداب سفره","category":"آداب غذا","ageMin":2,"ageMax":4,"duration":10,"materials":"سفره","instructions":"دست بشویید → آرام بنشینید → با قاشق بخورید → دهان را ببندید → جیغ نزنید → تشکر کنید","safety":""}
  ]);

  inject('teria', 'herog_right', 'بازی‌های غذایی', 'فعالیت و کاربرد', [
    {"title":"بازی شناسایی طعم","type":"activity","desc":"حدس زدن طعم غذاها","category":"بازی غذایی","ageMin":3,"ageMax":5,"duration":15,"materials":"غذاهای مختلف, چشم‌بند","instructions":"چشم‌بند بگذارید → یک غذا بچشید → چی بود؟ → شیرین بود یا ترش؟ → نمکی بود یا بی‌نمک؟","safety":""},
    {"title":"آشپزی کوچک","type":"activity","desc":"ساخت سالاد میوه","category":"آشپزی ساده","ageMin":3,"ageMax":5,"duration":20,"materials":"میوه‌های مختلف, کاسه","instructions":"میوه‌ها را بشویید → پوست بکنید → خرد کنید → در کاسه بریزید → هم بزنید → نوش جان!","safety":"مربی کمک کند"}
  ]);

  inject('teria', 'herog_right', 'طعم‌ها', 'معرفی و شناخت', [
    {"title":"شناخت طعم‌ها","type":"activity","desc":"آشنایی با طعم‌های مختلف","category":"بازی حسی","ageMin":2,"ageMax":4,"duration":15,"materials":"مواد غذایی مختلف","instructions":"شیرین: عسل → ترش: لیمو → تلخ: قهوه (فقط بو) → شور: نمک → هر طعمی زبان مخصوص دارد","safety":""}
  ]);

  inject('teria', 'herog_right', 'داستان غذاها', 'معرفی و شناخت', [
    {"title":"داستان سبزیجات","type":"story","desc":"قصه سبزیجات مهربان","category":"داستان","ageMin":2,"ageMax":5,"duration":10,"instructions":"هویج نارنجی بود و خیلی شاد → کاهو سبز بود و مهربان → گوجه قرمز بود و پرانرژی → همه با هم سالاد شدند → بچه‌ها خوشحال شدند"},
    {"title":"داستان میوه‌های رنگارنگ","type":"story","desc":"قصه میوه‌ها در سبد","category":"داستان","ageMin":2,"ageMax":5,"duration":10,"instructions":"سیب قرمز گفت من شیرینم → موز زرد گفت من نرمم → انگور بنفش گفت من خوشمزه‌ام → همه با هم آبمیوه شدند"}
  ]);

  // ═══════════════════════════════════════════
  // ═══ حیاط (hayat) ═══
  // ═══════════════════════════════════════════

  // herog_left
  inject('hayat', 'herog_left', 'باغ', 'معرفی و شناخت', [
    {"title":"باغبانی کودکان","type":"activity","desc":"کاشت و مراقبت از گیاهان","category":"طبیعت","ageMin":3,"ageMax":6,"duration":20,"materials":"بذر, گلدان, خاک, آب","instructions":"خاک را آماده کنید → بذر بکارید → آب بدهید → هر روز مراقبت → جوانه بزند → رشد کند → لذت ببرید","safety":""},
    {"title":"گلکاری در حیاط","type":"activity","desc":"کاشت گل در حیاط","category":"طبیعت","ageMin":3,"ageMax":6,"duration":30,"materials":"نهال گل, خاک, بیلچه","instructions":"جای مناسب انتخاب کنید → خاک را نرم کنید → نهال بکارید → آب بدهید → مراقبت کنید → گل ببینید","safety":""}
  ]);

  inject('hayat', 'herog_left', 'گیاهان', 'معرفی و شناخت', [
    {"title":"شناخت گیاهان حیاط","type":"activity","desc":"آشنایی با گیاهان مختلف","category":"طبیعت","ageMin":2,"ageMax":5,"duration":15,"materials":"تصاویر گیاهان","instructions":"درخت → بلند → بوته → کوتاه → چمن → سبز → هر گیاهی آب و نور می‌خواهد → مراقبت کنیم","safety":""},
    {"title":"نقاشی گیاهان","type":"activity","desc":"نقاشی از گیاهان حیاط","category":"هنر در حیاط","ageMin":2,"ageMax":5,"duration":15,"materials":"کاغذ, مداد رنگی","instructions":"یک گیاه انتخاب کنید → دقیق نگاه کنید → برگ‌ها را بکشید → ساقه را بکشید → رنگ کنید → تابلو کنید","safety":""}
  ]);

  inject('hayat', 'herog_left', 'حشرات', 'معرفی و شناخت', [
    {"title":"مشاهده حشرات حیاط","type":"activity","desc":"آشنایی با حشرات کوچک","category":"طبیعت","ageMin":3,"ageMax":6,"duration":15,"materials":"ذره‌بین, دفتر","instructions":"پروانه → زیبا → مورچه → زرنگ → زنبور → عسل → کفشدوزک → خوش‌شانس → هر حشره مفید است","safety":"دست نزنید"}
  ]);

  inject('hayat', 'herog_left', 'طبیعت', 'معرفی و شناخت', [
    {"title":"کشف طبیعت","type":"activity","desc":"گشت‌وگذار در طبیعت حیاط","category":"طبیعت","ageMin":2,"ageMax":5,"duration":20,"materials":"ذره‌بین, سبد","instructions":"در حیاط قدم بزنید → برگ‌ها را ببینید → سنگ‌ها را لمس کنید → صداها را گوش دهید → بوها را بکشید","safety":""}
  ]);

  // herog_right
  inject('hayat', 'herog_right', 'گچ', 'معرفی و شناخت', [
    {"title":"نقاشی با گچ","type":"activity","desc":"نقاشی با گچ روی زمین","category":"هنر در حیاط","ageMin":2,"ageMax":5,"duration":20,"materials":"گچ رنگی","instructions":"گچ بردارید → روی زمین نقاشی کنید → دایره, مربع, خانه → هر کسی یک نقاشی → با هم نمایشگاه","safety":""}
  ]);

  inject('hayat', 'herog_right', 'آب و شن', 'معرفی و شناخت', [
    {"title":"بازی آب و شن","type":"activity","desc":"بازی خلاقانه با آب و شن","category":"بازی حسی","ageMin":2,"ageMax":5,"duration":20,"materials":"وان شن, آب, اسباب‌بازی","instructions":"شن بریزید → آب اضافه کنید → خمیر بسازید → شکل بسازید → قلعه بسازید → تخریب کنید → دوباره بسازید","safety":""}
  ]);

  inject('hayat', 'herog_right', 'بذر', 'معرفی و شناخت', [
    {"title":"کاشت بذر","type":"activity","desc":"مشاهده رشد بذر","category":"طبیعت","ageMin":3,"ageMax":6,"duration":15,"materials":"بذر لوبیا, پنبه, ظرف شفاف","instructions":"پنبه خیس در ظرف → بذر روی پنبه → آب بدهید → هر روز نگاه کنید → جوانه بزند → رشد کند → لذت ببرید","safety":""}
  ]);

  inject('hayat', 'herog_right', 'برگ', 'معرفی و شناخت', [
    {"title":"جمع‌آوری برگ‌ها","type":"activity","desc":"جمع‌آوری و شناسایی برگ‌ها","category":"طبیعت","ageMin":2,"ageMax":5,"duration":15,"materials":"سبد, کتاب","instructions":"برگ‌ها را جمع کنید → رنگ‌ها مقایسه → شکل‌ها مقایسه → بزرگ و کوچک → پاییزی و تابستانی","safety":""},
    {"title":"کولاژ با برگ","type":"activity","desc":"ساخت کولاژ با برگ‌های طبیعی","category":"هنر در حیاط","ageMin":3,"ageMax":6,"duration":20,"materials":"برگ‌های خشک, چسب, کاغذ","instructions":"برگ‌ها را خشک کنید → شکل‌ها را ببینید → روی کاغذ بچسبانید → چهره بسازید → تابلو کنید","safety":""}
  ]);

  // ═══════════════════════════════════════════
  // ═══ مددکاری (maddakari) ═══
  // ═══════════════════════════════════════════

  // herog_left
  inject('maddakari', 'herog_left', 'خواندن', 'معرفی و شناخت', [
    {"title":"آموزش خواندن به کودکان با نیازهای ویژه","type":"activity","desc":"تکنیک‌های آموزش خواندن","category":"کودکان استثنایی","ageMin":3,"ageMax":6,"duration":20,"materials":"کارت حروف, تصویر","instructions":"حروف را بزرگ بنویسید → صدا بگویید → تصویر نشان دهید → تکرار کنید → صبور باشید → جایزه بدهید","safety":""}
  ]);

  inject('maddakari', 'herog_left', 'نوشتن', 'معرفی و شناخت', [
    {"title":"آموزش نوشتن به کودکان با نیازهای ویژه","type":"activity","desc":"تکنیک‌های آموزش نوشتن","category":"کودکان استثنایی","ageMin":4,"ageMax":6,"duration":20,"materials":"کاغذ درشت, مداد ضخیم","instructions":"خط‌های درشت بکشید → با انگشت تمرین کنید → مداد ضخیم بگیرید → حروف را تقلید کنید → صبور باشید","safety":""}
  ]);

  inject('maddakari', 'herog_left', 'ریاضی', 'معرفی و شناخت', [
    {"title":"آموزش ریاضی به کودکان با نیازهای ویژه","type":"activity","desc":"تکنیک‌های آموزش ریاضی","category":"کودکان استثنایی","ageMin":3,"ageMax":6,"duration":20,"materials":"اشیاء ملموس, انگشتان","instructions":"با اشیاء واقعی شمارش کنید → انگشتان → سنگ‌ها → میوه‌ها → کم‌کم انتزاعی شوید → صبور باشید","safety":""}
  ]);

  inject('maddakari', 'herog_left', 'شنوایی', 'معرفی و شناخت', [
    {"title":"ارزیابی شنوایی کودکان","type":"activity","desc":"بررسی مشکلات شنوایی","category":"کودکان استثنایی","ageMin":2,"ageMax":6,"duration":15,"materials":"اسباب‌بازی صدادار","instructions":"صدای آرام تولید کنید → واکنش کودک را ببینید → صدا را تغییر دهید → الگوی شنوایی ثبت کنید → ارجاع","safety":""}
  ]);

  // herog_right
  inject('maddakari', 'herog_right', 'IEP', 'معرفی و شناخت', [
    {"title":"تهیه برنامه آموزشی فردی (IEP)","type":"activity","desc":"نحوه نوشتن IEP","category":"کودکان استثنایی","ageMin":0,"ageMax":6,"duration":30,"materials":"فرم IEP","instructions":"ارزیابی اولیه → تعیین اهداف → فعالیت‌های هدفمند → معیارهای موفقیت → زمان‌بندی → ارزیابی دوره‌ای","safety":""}
  ]);

  inject('maddakari', 'herog_right', 'ارجاع', 'معرفی و شناخت', [
    {"title":"فرآیند ارجاع کودکان","type":"activity","desc":"نحوه ارجاع کودکان به متخصص","category":"کودکان استثنایی","ageMin":0,"ageMax":6,"duration":15,"materials":"فرم ارجاع","instructions":"علائم مشکوک شناسایی → گفتگو با والدین → فرم ارجاع → معرفی متخصص → پیگیری نتیجه","safety":""}
  ]);

  inject('maddakari', 'herog_right', 'حمایت روزانه', 'فعالیت و کاربرد', [
    {"title":"حمایت روزانه از کودکان نیازمند","type":"activity","desc":"روش‌های حمایت روزانه","category":"کودکان استثنایی","ageMin":0,"ageMax":6,"duration":20,"materials":"برنامه روزانه","instructions":"صبح: خوشامدگویی → صبحانه: کمک → کلاس: همراهی → بازی: حمایت → ظهر: ناهار → عصر: خداحافظی","safety":""}
  ]);

  inject('maddakari', 'herog_right', 'آرام‌سازی', 'فعالیت و کاربرد', [
    {"title":"تکنیک‌های آرام‌سازی کودکان","type":"activity","desc":"روش‌های آرام کردن کودکان","category":"تکنیک آرامسازی سریع","ageMin":2,"ageMax":6,"duration":10,"materials":"لوازم آرامسازی","instructions":"تنفس عمیق → شمارش → حباب درست کن → خمیر بازی → گوش دادن به موسیقی → در آغوش گرفتن","safety":""}
  ]);

})();
// ─── Fix: empty categories in moraabi/herog_right ───
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

  inject('moraabi', 'herog_right', 'حمایت', 'معرفی و شناخت', [
    {"title":"حمایت عاطفی کودکان","type":"activity","desc":"تقویت احساس امنیت","category":"کودکان استثنایی","ageMin":2,"ageMax":6,"duration":10,"materials":"","instructions":"با کودک همدلی کنید → احساساتش را تأیید کنید → فضای امن ایجاد کنید → پیگیری مستمر","safety":""}
  ]);
  inject('moraabi', 'herog_right', 'کارگاه', 'معرفی و شناخت', [
    {"title":"نحوه برگزاری کارگاه","type":"activity","desc":"راهنمای برگزاری کارگاه آموزشی","category":"مدیریت کلاس","ageMin":0,"ageMax":6,"duration":10,"materials":"","instructions":"موضوع را مشخص کنید → مدت زمان تعیین کنید → مواد آموزشی آماده کنید → بازخورد جمع‌آوری کنید","safety":""}
  ]);
  inject('moraabi', 'herog_right', 'منابع', 'معرفی و شناخت', [
    {"title":"منابع رایگان آموزشی","type":"activity","desc":"معرفی منابع رایگان مفید","category":"منابع آموزشی","ageMin":0,"ageMax":6,"duration":5,"materials":"","instructions":"کتابخانه ملی → پایگاه‌های علمی → مجلات آموزشی → وبسایت‌های تخصصی → گروه‌های آموزشی","safety":""}
  ]);
})();
