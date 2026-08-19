# یاران — مهدکودک و پیش‌دبستانی مجازی

تور مجازی تعاملی مهدکودک با ۱۳ اتاق، ۸ بازی آموزشی، ۸۳۴ کاربرگ، سیستم گزارش‌دهی روزانه، تخته پیگیری وظایف، و ربات تلگرام همگام.

## 🚀 شروع سریع (لوکال)

```bash
# کل پروژه (سایت + سرور API + ربات تلگرام) با یک فرمان:
cd server
npm install
npm start
# سایت: http://localhost:4000
```

### فقط سایت (استاتیک)
```bash
npx serve .
```

### فقط ربات (با .env لوکال)
```bash
cd telegram-bot
npm install
node bot.js
```

## 🌍 استقرار رایگان

راهنمای کامل قدم‌به‌قدم: **[DEPLOYMENT.md](DEPLOYMENT.md)**
- سایت → GitHub Pages
- سرور + ربات → Render (free)
- بدون Firebase، بدون دیتابیس — همه‌چیز فایل JSON

## 🔧 تنظیمات

| فایل | نقش |
|------|-----|
| `telegram-bot/.env` | توکن ربات، ADMIN_ID، پروکسی (در گیت نیست — نمونه: `.env.example`) |
| `js/config.js` | آدرس سرور API برای GitHub Pages (`window.YARAN_API_BASE`) |
| `server/start-all.js` | اجرای سرور + ربات در یک پروسه (برای Render) |

## 📁 ساختار

```
├── index.html                 # نقطه ورود
├── firebase.json              # تنظیمات Firebase Hosting
├── css/
│   ├── main.css              # طراحی اصلی (50KB)
│   ├── vt.css                # استایل تور مجازی
│   └── task-board.css        # تخته وظایف
├── js/
│   ├── api.js                # کلاینت API
│   ├── rooms.js              # داده اتاق‌ها (1.1MB)
│   ├── tour.js               # موتور ناوبری
│   ├── virtual-tour.js       # تور خودکار
│   ├── app.js                # کنترلر اصلی
│   ├── auth.js               # احراز هویت
│   ├── games.js / games2.js  # بازی‌های آموزشی
│   ├── media.js              # پلیر PDF/ویدیو
│   ├── lobby.js              # لابی + نکات
│   └── ...                   # ماژول‌های دیگر
├── server/
│   ├── index.js              # Express API
│   └── package.json
├── assets/
│   ├── images/               # تصاویر WebP
│   ├── mahd/worksheets/      # کاربرگ‌ها
│   └── audio/                # فایل‌های صوتی
└── .github/workflows/        # CI/CD
```

## ✨ امکانات

- **۱۳ اتاق تعاملی** با تور ۴ نمایه
- **۸ بازی آموزشی** (حافظه، سایمون، الگو، پازل و...)
- **۸۳۴ کاربرگ** قابل چاپ
- **نکات روزانه فرزندپروری**
- **سیستم گزارش‌دهی** (خوراک، خواب، احساسات)
- **طراحی واکنش‌گرا** (موبایل + دسکتاپ)
- **پوسته روز/شب/جشن**
- **پشتیبانی آفلاین** (پس از بارگذاری اولیه)

## 🔒 امنیت

- CSP header فعال
- XSS protection روی محتوای کاربر
- Rate limiting روی فرم‌ها
- JWT auth با bcrypt
- حذف نقش admin از فرم ثبت‌نام
- توکن ربات فقط در `.env` (در گیت نیست)

## 📄 مجوز

فقط برای استفاده آموزشی/مهدکودک یاران.

## 🛠️ فناوری

- **فرانت:** Vanilla JS + CSS (بدون framework)
- **بک‌اند:** Express.js + JWT + bcrypt
- **هاست:** Firebase Hosting
- **زبان:** فارسی (RTL)

## 📝 مجوز

MIT
