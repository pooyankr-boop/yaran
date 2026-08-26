/*
  یاران — تقویم هجری شمسی (جلالی)
  تبدیل دقیق میلادی↔شمسی (الگوریتم استاندارد ۳۳ساله)، نام ماه‌ها و روزها،
  ارقام فارسی، شبکه‌ی ماه برای رابط تقویم، زمان نسبی فارسی.
  استفاده: YCal.today()، YCal.format(new Date())، YCal.monthGrid(1404, 5) ...
*/
var YCal = (function () {
  "use strict";

  /* ── هسته‌ی تبدیل (jalaali algorithm) ── */
  function div(a, b) { return ~~(a / b); }
  function mod(a, b) { return a - ~~(a / b) * b; }

  function jalCal(jy) {
    var breaks = [-61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635];
    var bl = breaks.length, gy = jy + 621, leapJ = -14, jp = breaks[0], jm, jump, leap, n, i;
    if (jy < jp || jy >= breaks[bl - 1]) throw new Error("سال جلالی خارج از بازه: " + jy);
    for (i = 1; i < bl; i += 1) {
      jm = breaks[i];
      jump = jm - jp;
      if (jy < jm) break;
      leapJ = leapJ + div(jump, 33) * 8 + div(mod(jump, 33), 4);
      jp = jm;
    }
    n = jy - jp;
    leapJ = leapJ + div(n, 33) * 8 + div(mod(n, 33) + 3, 4);
    if (mod(jump, 33) === 4 && jump - n === 4) leapJ += 1;
    var leapG = div(gy, 4) - div((div(gy, 100) + 1) * 3, 4) - 150;
    var march = 20 + leapJ - leapG;
    if (jump - n < 6) n = n - jump + div(jump + 4, 33) * 33;
    leap = mod(mod(n + 1, 33) - 1, 4);
    if (leap === -1) leap = 4;
    return { leap: leap, gy: gy, march: march };
  }

  function j2d(jy, jm, jd) {
    var r = jalCal(jy);
    return g2d(r.gy, 3, r.march) + (jm - 1) * 31 - div(jm, 7) * (jm - 7) + jd - 1;
  }
  function d2j(jdn) {
    var gy = d2g(jdn).gy, jy = gy - 621, r = jalCal(jy), jdn1f = g2d(gy, 3, r.march), jd, jm, k;
    k = jdn - jdn1f;
    if (k >= 0) {
      if (k <= 185) { jm = 1 + div(k, 31); jd = mod(k, 31) + 1; return { jy: jy, jm: jm, jd: jd }; }
      else k -= 186;
    } else { jy -= 1; k += 179; if (r.leap === 1) k += 1; }
    jm = 7 + div(k, 30); jd = mod(k, 30) + 1;
    return { jy: jy, jm: jm, jd: jd };
  }
  function g2d(gy, gm, gd) {
    var d = div((gy + div(gm - 8, 6) + 100100) * 1461, 4)
      + div(153 * mod(gm + 9, 12) + 2, 5)
      + gd - 34840408;
    d = d - div(div(gy + 100100 + div(gm - 8, 6), 100) * 3, 4) + 752;
    return d;
  }
  function d2g(jdn) {
    var j, i, gd, gm, gy;
    j = 4 * jdn + 139361631;
    j = j + div(div(4 * jdn + 183187720, 146097) * 3, 4) * 4 - 3908;
    i = div(mod(j, 1461), 4) * 5 + 308;
    gd = div(mod(i, 153), 5) + 1;
    gm = mod(div(i, 153), 12) + 1;
    gy = div(j, 1461) - 100100 + div(8 - gm, 6);
    return { gy: gy, gm: gm, gd: gd };
  }

  function toJalali(gy, gm, gd) { return d2j(g2d(gy, gm, gd)); }
  function toGregorian(jy, jm, jd) { var g = d2g(j2d(jy, jm, jd)); return { gy: g.gy, gm: g.gm, gd: g.gd }; }
  function isLeapJalaaliYear(jy) { return jalCal(jy).leap === 0; }
  function monthLength(jy, jm) {
    if (jm <= 6) return 31;
    if (jm <= 11) return 30;
    return isLeapJalaaliYear(jy) ? 30 : 29;
  }

  /* ── نام‌ها ── */
  var MONTHS = ["فروردین","اردیبهشت","خرداد","تیر","مرداد","شهریور","مهر","آبان","آذر","دی","بهمن","اسفند"];
  var WEEKDAYS = ["شنبه","یک‌شنبه","دوشنبه","سه‌شنبه","چهارشنبه","پنج‌شنبه","جمعه"];
  var WEEKDAYS_SHORT = ["ش","ی","د","س","چ","پ","ج"];
  // getDay(): یکشنبه=0 … شنبه=6 → ایندکس فارسی
  function faWeekday(d) { return (d.getDay() + 1) % 7; }

  /* ── ارقام فارسی ── */
  var FA_DIGITS = ["۰","۱","۲","۳","۴","۵","۶","۷","۸","۹"];
  function faDigits(s) {
    return String(s).replace(/[0-9]/g, function (d) { return FA_DIGITS[+d]; });
  }
  function enDigits(s) {
    return String(s).replace(/[۰-۹]/g, function (d) { return String(FA_DIGITS.indexOf(d)); })
                    .replace(/[٠-٩]/g, function (d) { return String("٠١٢٣٤٥٦٧٨٩".indexOf(d)); });
  }
  function num(n) { return faDigits(String(n)); }
  function groupNum(n) {
    var s = String(Math.abs(n)), out = "", c = 0;
    for (var i = s.length - 1; i >= 0; i--) { out = s[i] + out; if (++c % 3 === 0 && i > 0) out = "٬" + out; }
    return (n < 0 ? "−" : "") + faDigits(out);
  }
  function pad2(n) { return (n < 10 ? "0" : "") + n; }

  /* ── آبجکت‌های تاریخ ── */
  function fromDate(date) {
    date = date || new Date();
    var j = toJalali(date.getFullYear(), date.getMonth() + 1, date.getDate());
    j.hours = date.getHours(); j.minutes = date.getMinutes(); j.seconds = date.getSeconds();
    j.weekday = WEEKDAYS[faWeekday(date)];
    j.weekdayIndex = faWeekday(date);
    j.dateObj = date;
    return j;
  }
  function toDate(jy, jm, jd, h, m) {
    var g = toGregorian(jy, jm, jd);
    return new Date(g.gy, g.gm - 1, g.gd, h || 0, m || 0, 0);
  }
  function today() { return fromDate(new Date()); }

  /* ── قالب‌بندی ── */
  // style: "long" پنج‌شنبه ۲۵ مرداد ۱۴۰۵ | "medium" ۲۵ مرداد ۱۴۰۵ | "short" ۱۴۰۵/۰۵/۲۵ | "month" مرداد ۱۴۰۵ | "day" ۲۵ مرداد
  function format(date, style, withTime) {
    var j = (date instanceof Date) ? fromDate(date) : date;
    var out;
    switch ((style || "medium")) {
      case "long":   out = j.weekday + " " + num(j.jd) + " " + MONTHS[j.jm - 1] + " " + num(j.jy); break;
      case "medium": out = num(j.jd) + " " + MONTHS[j.jm - 1] + " " + num(j.jy); break;
      case "short":  out = num(j.jy) + "/" + num(pad2(j.jm)) + "/" + num(pad2(j.jd)); break;
      case "month":  out = MONTHS[j.jm - 1] + " " + num(j.jy); break;
      case "day":    out = num(j.jd) + " " + MONTHS[j.jm - 1]; break;
      default:       out = num(j.jd) + " " + MONTHS[j.jm - 1] + " " + num(j.jy);
    }
    if (withTime) out += " — " + formatTime(j.dateObj || new Date());
    return out;
  }
  function formatTime(date) {
    date = date || new Date();
    return num(pad2(date.getHours())) + ":" + num(pad2(date.getMinutes()));
  }
  // ISO (میلادی) → شمسی خوانا؛ برای داده‌های ذخیره‌شده در سرور
  function formatISO(iso, style) {
    if (!iso) return "";
    var d = new Date(iso);
    if (isNaN(d.getTime())) return String(iso);
    return format(d, style || "medium");
  }
  function timeAgo(iso) {
    var t = new Date(iso).getTime();
    if (isNaN(t)) return "";
    var s = Math.floor((Date.now() - t) / 1000);
    if (s < 45) return "لحظاتی پیش";
    if (s < 3600) return num(Math.floor(s / 60)) + " دقیقه پیش";
    if (s < 86400) return num(Math.floor(s / 3600)) + " ساعت پیش";
    if (s < 172800) return "دیروز";
    if (s < 2592000) return num(Math.floor(s / 86400)) + " روز پیش";
    return formatISO(iso, "medium");
  }

  /* ── شبکه‌ی ماه برای UI تقویم ──
     خروجی: { jy, jm, weeks: [[{jd, iso, weekdayIndex, inMonth}|null ×7]…] } */
  function monthGrid(jy, jm) {
    var len = monthLength(jy, jm);
    var firstDate = toDate(jy, jm, 1);
    var startCol = faWeekday(firstDate); // شنبه=0
    var cells = [];
    var i;
    for (i = 0; i < startCol; i++) cells.push(null);
    for (i = 1; i <= len; i++) {
      var g = toGregorian(jy, jm, i);
      cells.push({
        jd: i,
        iso: g.gy + "-" + pad2(g.gm) + "-" + pad2(g.gd),
        weekdayIndex: (startCol + i - 1) % 7,
        inMonth: true
      });
    }
    while (cells.length % 7 !== 0) cells.push(null);
    var weeks = [];
    for (i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
    return { jy: jy, jm: jm, monthName: MONTHS[jm - 1], weeks: weeks, length: len };
  }

  /* رویدادهای ثابت تقویم ایران (بدون سال) — برای نمایش در برنامه‌ریز */
  var OCCASIONS_CLEAN = {
    "1-1": "نوروز", "1-2": "نوروز", "1-3": "نوروز", "1-4": "نوروز", "1-13": "سیزده‌بدر",
    "2-25": "فردوسی", "3-14": "رحلت امام خمینی", "3-15": "۱۵ خرداد",
    "7-20": "حافظ", "8-24": "مولانا", "9-16": "دانشجو", "9-30": "یلدا",
    "11-22": "پیروزی انقلاب", "12-29": "ملی شدن نفت"
  };

  return {
    MONTHS: MONTHS, WEEKDAYS: WEEKDAYS, WEEKDAYS_SHORT: WEEKDAYS_SHORT,
    toJalali: toJalali, toGregorian: toGregorian,
    isLeapJalaaliYear: isLeapJalaaliYear, monthLength: monthLength,
    fromDate: fromDate, toDate: toDate, today: today,
    format: format, formatTime: formatTime, formatISO: formatISO, timeAgo: timeAgo,
    faDigits: faDigits, enDigits: enDigits, num: num, groupNum: groupNum, pad2: pad2,
    monthGrid: monthGrid, OCCASIONS: OCCASIONS_CLEAN
  };
})();
