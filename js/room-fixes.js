/*
  Room Fixes — اصلاح نام‌گذاری گوشه‌ها و حذف محتوای نامرتبط
  اجرا: بعد از corner-content.js
  هدف: نام هر hotspot با محتوای واقعی آن مطابقت داشته باشد
*/
(function(){
  if (typeof ROOMS === "undefined") return;
  var R = ROOMS;
  function room(id){ for(var i=0;i<R.length;i++) if(R[i].id===id) return R[i]; return null; }
  function view(r,v){ return r && r.views ? r.views[v] : null; }
  function hotspot(r,v,t){ var vd=view(r,v); if(!vd) return null; for(var i=0;i<vd.hotspots.length;i++) if(vd.hotspots[i].title===t) return vd.hotspots[i]; return null; }

  // ─── helper: rename hotspot ───
  function rename(roomId, viewKey, oldTitle, newTitle){
    var h = hotspot(room(roomId), viewKey, oldTitle);
    if(h) h.title = newTitle;
  }

  // ─── helper: update view label ───
  function setLabel(roomId, viewKey, label){
    var v = view(room(roomId), viewKey);
    if(v) v.label = label;
  }

  // ═══════════════════════════════════════════════
  // 1) amoozesh — اتاق آموزش
  // ═══════════════════════════════════════════════
  // herog: محتوای واقعی = ریاضی + خطوط + حروف + شکل
  rename('amoozesh','herog','حروف','خط و عدد');
  rename('amoozesh','herog','کلمات','کلمات و حروف');
  rename('amoozesh','herog','داستان','آموزش حروف');
  rename('amoozesh','herog','شعر','شکل و شعر');
  setLabel('amoozesh','herog','خط و عدد، کلمات و حروف، آموزش حروف، شکل و شعر');

  // herog_left: محتوای واقعی = شمارش+رنگ + شکل+جهت + مقایسه+اندازه + ترتیب+ردیف
  rename('amoozesh','herog_left','شمارش','شمارش و رنگ');
  rename('amoozesh','herog_left','شکل‌ها','شکل و جهت');
  rename('amoozesh','herog_left','مقایسه','مقایسه و اندازه');
  rename('amoozesh','herog_left','ترتیب','ترتیب و ردیف');
  setLabel('amoozesh','herog_left','شمارش و رنگ، شکل و جهت، مقایسه و اندازه، ترتیب و ردیف');

  // herog_right: محتوای واقعی = مشاغل+بهداشت + هوش + طبیعت+آب وهوا + بهداشت
  rename('amoozesh','herog_right','رنگ‌ها','مهارت‌های زندگی');
  rename('amoozesh','herog_right','حیوانات','هوش و تمرکز');
  rename('amoozesh','herog_right','فصل‌ها','طبیعت و آب و هوا');
  rename('amoozesh','herog_right','طبیعت','بهداشت و طبیعت');
  setLabel('amoozesh','herog_right','مهارت‌های زندگی، هوش و تمرکز، طبیعت و آب و هوا، بهداشت و طبیعت');

  // ═══════════════════════════════════════════════
  // 2) bazi — اتاق بازی
  // ═══════════════════════════════════════════════
  // herog: پازل+هوش + بلوک+دست‌ورزی + خمیر + جورچین+هوش
  rename('bazi','herog','بلوک','دست‌ورزی');
  rename('bazi','herog','جورچین','جورچین و هوش');
  setLabel('bazi','herog','پازل، دست‌ورزی، خمیر، جورچین و هوش');

  // herog_left: بازی‌های گروهی + هوش + سُرخوردن + رقص (corrected by corner-content)
  rename('bazi','herog_left','توپ','بازی‌های گروهی');
  rename('bazi','herog_left','دویدن','هوش و تمرکز');
  setLabel('bazi','herog_left','بازی‌های گروهی، هوش و تمرکز، سُرخوردن، رقص');

  // herog_right: حافظه+تمرکز + بازی حرکتی + هوش+بازی + دست‌ورزی
  rename('bazi','herog_right','نقاشی','حافظه و تمرکز');
  rename('bazi','herog_right','عروسک','بازی‌های حرکتی');
  rename('bazi','herog_right','موسیقی','هوش و بازی');
  rename('bazi','herog_right','ساختنی','دست‌ورزی');
  setLabel('bazi','herog_right','حافظه و تمرکز، بازی‌های حرکتی، هوش و بازی، دست‌ورزی');

  // ═══════════════════════════════════════════════
  // 3) honar — اتاق هنر
  // ═══════════════════════════════════════════════
  // herog: برش+کاردستی + اوریگامی+دست‌ورزی + کولاژ+خمیر + نخی+مهره
  // → names are mostly OK, keep
  setLabel('honar','herog','برش، اوریگامی، کولاژ و نخی');
  setLabel('honar','herog_left','انگشتی، اسفنجی، رنگ‌آمیزی و ترکیب رنگ');
  setLabel('honar','herog_right','ساز، آواز، ضرب‌آهنگ و حرکت');

  // ═══════════════════════════════════════════════
  // 4) motaleh — اتاق مطالعه
  // ═══════════════════════════════════════════════
  // herog: فارسی+خطوط + خطوط+نقطه‌چین + هوش + هوش
  rename('motaleh','herog','داستان','فارسی و خط');
  rename('motaleh','herog','علمی','خطوط و نوشتن');
  rename('motaleh','herog','مجله','هوش و خلاقیت');
  rename('motaleh','herog','صوتی','هوش و استعداد');
  setLabel('motaleh','herog','فارسی و خط، خطوط و نوشتن، هوش و خلاقیت، هوش و استعداد');

  // herog_left: فارسی+علوم + شمارش+فارسی + شعر+الگو + نمایش+دسته‌بندی
  rename('motaleh','herog_left','منطق','فارسی و علوم');
  rename('motaleh','herog_left','شمارش','شمارش و فارسی');
  rename('motaleh','herog_left','الگو','الگو و شعر');
  rename('motaleh','herog_left','دسته‌بندی','نمایش و دسته‌بندی');
  setLabel('motaleh','herog_left','فارسی و علوم، شمارش و فارسی، الگو و شعر، نمایش و دسته‌بندی');

  // herog_right: هوش+آزمایش + هوش+مشاهده + شعر+نقشه + قصه+ساعت
  rename('motaleh','herog_right','آزمایش','آزمایش و هوش');
  rename('motaleh','herog_right','مشاهده','مشاهده و هوش');
  rename('motaleh','herog_right','نقشه','نقشه و شعر');
  rename('motaleh','herog_right','زمان','زمان و ساعت');
  setLabel('motaleh','herog_right','آزمایش و هوش، مشاهده و هوش، نقشه و شعر، زمان و ساعت');

  // ═══════════════════════════════════════════════
  // 5) salamat — اتاق سلامت
  // ═══════════════════════════════════════════════
  // herog: خواب+بهداشت+میوه + ورزش+مسواک + آب + بازی+بهداشت
  rename('salamat','herog','میوه','تغذیه و بهداشت');
  rename('salamat','herog','صبحانه','عادات روزانه');
  rename('salamat','herog','میان‌وعده','میان‌وعده و بازی');
  setLabel('salamat','herog','تغذیه و بهداشت، عادات روزانه، آب، میان‌وعده و بازی');

  // herog_left: OK already
  setLabel('salamat','herog_left','دست‌ها، مسواک، حمام و صورت');

  // herog_right: کمک+ورزش + چراغ+خواب + ناخن+نور + غذا+هوا
  rename('salamat','herog_right','ورزش','ورزش و ایمنی');
  rename('salamat','herog_right','خواب','خواب و ایمنی');
  rename('salamat','herog_right','نور','بهداشت و نور');
  rename('salamat','herog_right','هوا','تغذیه و هوا');
  setLabel('salamat','herog_right','ورزش و ایمنی، خواب و ایمنی، بهداشت و نور، تغذیه و هوا');

  // ═══════════════════════════════════════════════
  // 6) khab — اتاق خواب
  // ═══════════════════════════════════════════════
  // herog: OK
  setLabel('khab','herog','محیط، تنفس، آرامش و تصویر');

  // herog_left: لالایی + قصه+لالایی + آمادگی+لالایی + مسواک+قصه
  setLabel('khab','herog_left','لالایی، قصه، آمادگی و مسواک');

  // herog_right: صبح + کشش + شستشو+شمارش + لباس+لالایی
  rename('khab','herog_right','شستشو','آرامش و شستشو');
  rename('khab','herog_right','لباس','لالایی و لباس');
  setLabel('khab','herog_right','صبح، کشش، آرامش و شستشو، لالایی و لباس');

  // ═══════════════════════════════════════════════
  // 7) moraabi — اتاق مربی
  // ═══════════════════════════════════════════════
  setLabel('moraabi','herog','فارسی، انگلیسی، شعر و داستان');
  setLabel('moraabi','herog_left','مدیریت رفتار، مشاهده و مستندسازی، برنامه‌ریزی و ارزیابی رشد');
  setLabel('moraabi','herog_right','حمایت، کارگاه، منابع و تخصص');

  // ═══════════════════════════════════════════════
  // 8) esterahat-moraabian — استراحت مربیان
  // ═══════════════════════════════════════════════
  setLabel('esterahat-moraabian','herog','هفتگی، ارزیابی، مواد و هماهنگی');
  setLabel('esterahat-moraabian','herog_left','چای، مطالعه، گفتگو و ورزش');
  setLabel('esterahat-moraabian','herog_right','کارگاه، کتاب، وبینار و تبادل');

  // ═══════════════════════════════════════════════
  // 9) jalase-owlia — جلسه اولیا
  // ═══════════════════════════════════════════════
  setLabel('jalase-owlia','herog','احساسات، دوستی، ترس و خودباوری');
  setLabel('jalase-owlia','herog_left','فرزندپروری، مرزها، زمان و احساسات');
  setLabel('jalase-owlia','herog_right','رشد، تحصیلی، گزارش و برنامه فردی');

  // ═══════════════════════════════════════════════
  // 10) bayegani — بایگانی
  // ═══════════════════════════════════════════════
  // herog: میوه+ثبت‌نام + برنامه هفتگی + دفترچه + فرم
  rename('bayegani','herog','ثبت‌نام','ثبت‌نام و ارزیابی');
  rename('bayegani','herog','گزارش','برنامه و گزارش');
  rename('bayegani','herog','برنامه','دفترچه و برنامه');
  setLabel('bayegani','herog','ثبت‌نام و ارزیابی، برنامه و گزارش، دفترچه و برنامه، فرم‌ها');

  // herog_left: رنگ‌آمیزی+گواهی + ردیابی حروف+گواهی + شمارش+آلبوم + الگو+کارنامه
  rename('bayegani','herog_left','تربیت','گواهی و کاربرگ');
  rename('bayegani','herog_left','ارتباط','ردیابی حروف و گواهی');
  rename('bayegani','herog_left','رفتار','کاربرگ و آلبوم');
  rename('bayegani','herog_left','مدرسه','الگو و کارنامه');
  setLabel('bayegani','herog_left','گواهی و کاربرگ، ردیابی حروف و گواهی، کاربرگ و آلبوم، الگو و کارنامه');

  // herog_right: OK after mahd-content + corner-content
  setLabel('bayegani','herog_right','نامه‌ها، پوشه‌ها، نمونه‌کار و بایگانی دیجیتال');

  // ═══════════════════════════════════════════════
  // 11) teria — تریا
  // ═══════════════════════════════════════════════
  setLabel('teria','herog','غذاهای سالم، میان‌وعده سالم، آب و پروتئین، برنامه‌ریزی وعده‌ها');
  setLabel('teria','herog_left','میوه‌ها، سبزیجات، بهداشت دست و آداب سفره');
  setLabel('teria','herog_right','آداب غذاخوری، بازی‌های غذایی، طعم‌ها و داستان غذاها');

  // ═══════════════════════════════════════════════
  // 12) hayat — حیاط
  // ═══════════════════════════════════════════════
  // herog: کاشت+فوتبال + حباب+کفپوش + شن+لبه + بازی آب+نظارت
  rename('hayat','herog','فوتبال','ایمنی حیاط');
  rename('hayat','herog','دویدن','ایمنی و بازی');
  rename('hayat','herog','پرش','ایمنی و شن');
  rename('hayat','herog','دوچرخه','نظارت و بازی');
  setLabel('hayat','herog','ایمنی حیاط، ایمنی و بازی، ایمنی و شن، نظارت و بازی');

  // herog_left & herog_right: OK after corner-content
  setLabel('hayat','herog_left','باغ، گیاهان، حشرات و طبیعت');
  setLabel('hayat','herog_right','گچ، آب و شن، بذر و برگ');

  // ═══════════════════════════════════════════════
  // 13) maddakari — مددکاری
  // ═══════════════════════════════════════════════
  setLabel('maddakari','herog','مشاوره، اقتصادی، بهزیستی و فرزندپروری');
  setLabel('maddakari','herog_left','خواندن، نوشتن، ریاضی و شنوایی');
  setLabel('maddakari','herog_right','IEP، ارجاع، حمایت روزانه و آرام‌سازی');

})();
