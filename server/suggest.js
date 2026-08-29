/* ═════════════ response suggester — no extra LLM tokens ═════════════
   Builds follow-up chips from needle tool results (what just happened),
   the user role, and whether the user has stored memories.
   Pure server logic — zero tokens. Client renders data-msg chips;
   clicking sends the text as a normal user turn.
   Response field: suggestions: [ {label, msg} ] on /api/agent.
   ═════════════════════════════════════════════════════════════════════ */
'use strict';

function build(userRole, toolResults, memCount) {
  var s = [];
  function r(label, msg) { if (s.length < 4) s.push({ label: label, msg: msg }); }

  var results = toolResults || [];
  var done = results.filter(function (x) { return x && (x.ok === true || x.client_action); });
  var failed = results.filter(function (x) { return x && (x.error || x.ok === false) && !x.client_action; });

  if (failed.length && !done.length) {
    r('دوباره', 'دوباره امتحان کن');
    r('راهنمایی', 'چرا نشد؟ توضیح بده و راه دیگری پیشنهاد بده');
    return s;
  }

  if (done.length) {
    var last = done[done.length - 1];
    var a = (last.client_action && last.client_action.type) || last.action || '';

    if (a === 'ask') {
      // question shown; wait for user — suggest nothing extra
      return s;
    }
    if (a === 'navigate_room') {
      r('اتاق دیگر', 'اتاقهای دیگر را معرفی کن');
      r('فعالیت این اتاق', 'چه فعالیتی برای این اتاق پیشنهاد میکنی؟');
    } else if (a === 'open_deck') {
      r('درس دیگر', 'درسهای مشابه دیگری داری؟');
      r('پادکست مرتبط', 'پادکست مرتبط با همین موضوع را پیدا کن');
    } else if (a === 'play_audio') {
      r('ادامه پخش', 'چند پیشنهاد صوتی دیگر از همین دسته پخش کن');
      r('لالایی', 'یک لالایی آرام پخش کن');
    } else if (a === 'open_panel') {
      r('کمک پنل', 'در این بخش چه کارهایی میتوانی انجام دهی؟');
    } else if (a === 'list_children') {
      r('گزارش کودک', 'گزارش آخرین وضعیت یکی از کودکان را بده');
      r('کلاسها', 'کلاسها را نشان بده');
    } else if (a === 'list_classes' || a === 'list_teachers') {
      r('برنامه هفتگی', 'برنامه هفتگی این هفته را نشان بده');
      r('کلاس جدید', 'میخواهم کلاس جدید بسازم');
    } else if (a === 'set_weekly_plan' || a === 'edit_weekly_item' || a === 'delete_weekly_item') {
      r('برنامه را نشان بده', 'برنامه هفتگی بهروز شده را نشان بده');
      r('روز دیگر', 'برنامه یک روز دیگر را هم بچین');
    } else if (a === 'create_report') {
      r('گزارش دیگر', 'گزارش دیگری ثبت کنم');
      r('پیام به والد', 'این گزارش را به والد کودک پیام کن');
    } else if (a === 'send_parent_message') {
      r('پیامهای والدین', 'پیامهای اخیر والدین را نشان بده');
    } else if (a === 'create_task' || a === 'complete_task') {
      r('کارهای باقی', 'کارهای باقیمانده را نشان بده');
    } else if (a === 'create_note') {
      r('یادداشتها', 'یادداشتهای من را نشان بده');
    } else if (a === 'create_event') {
      r('رویدادها', 'رویدادهای پیش رو را نشان بده');
    } else if (a === 'search_decks' || a === 'search_podcasts') {
      r('باز کن', 'اولین نتیجه را برایم باز کن');
      r('جستجوی دیگر', 'جستجوی دیگری انجام بده');
    } else if (a === 'remember_fact' || a === 'forget_memory') {
      r('حافظهام', 'چه چیزهایی از من یاد گرفتهای؟');
    } else {
      r('برنامه هفتگی', 'برنامه هفتگی این هفته را نشان بده');
      r('جستجو', 'محتوای آموزشی پیشنهاد بده');
    }
  }

  // role chips + memory hint — appended while room remains (max 4 total)
  if (userRole === 'parent') r('درس والدین', 'کدام درس والدین برای من مناسب است؟');
  if (userRole === 'teacher') r('برنامه من', 'برنامه هفتگی کلاس من را نشان بده');
  if (userRole === 'admin' || userRole === 'manager') r('داشبورد', 'خلاصه وضعیت مهدکودک را بده');
  if (!memCount) r('یاد بگیر', 'دوست دارم هر ترجیح من را به خاطر بسپاری');

  return s.slice(0, 4);
}

module.exports = { build: build };
