# 🎯 یاران — راهنمای استقرار رایگان

پروژه ۳ بخش دارد:
| بخش | تکنولوژی | هاست رایگان |
|-----|----------|-------------|
| **سایت** (HTML/CSS/JS استاتیک) | Vanilla JS | GitHub Pages |
| **سرور API** (tasks, panel, WS) | Node.js + Express | Render (free) |
| **ربات تلگرام** | Node.js + Telegraf | Render (free — با سرور یک‌جا) |

هزینه: ۰ تومان. هر دو سرویس سقف رایگان دارند.

---

## مرحله ۱ — ریپازیتوری گیت‌هاب

1. برو https://github.com/new
2. نام: `yaran` — **Public** — بدون README (فایل‌ها همین‌جا هستند)
3. Create repository

```bash
cd D:/openclaw/Projects/yaran
git remote remove origin        # اگر remote قدیمی هست
git add -A
git commit -m "Yaran v1 — site + server + bot"
git branch -M main
git remote add origin https://github.com/نام‌کاربری‌تو/yaran.git
git push -u origin main
```

> ⚠️ حجم ریپو ~۲۶۰MB (عکس‌ها). اولین push چند دقیقه طول می‌کشد.
> فایل `.env` (توکن ربات) **در گیت نیست** — در .gitignore است.

---

## مرحله ۲ — سایت روی GitHub Pages

1. گیت‌هاب → ریپو `yaran` → **Settings** → **Pages**
2. **Source**: `Deploy from a branch` → branch: `main` → folder: `/ (root)` → **Save**
3. صبر کن تا deploy شود (یک دقیقه) — آدرس: `https://نام‌کاربری‌تو.github.io/yaran/`
4. **مهم**: چون سرور API جای دیگری است، به سایت بگو کجا دنبال API بگردد:
   - فایل `js/config.js` را باز کن و آدرس سرور Render (مرحله ۳) را بگذار:
   ```js
   window.YARAN_API_BASE = "https://yaran-api.onrender.com";
   ```
   - commit و push کن. سایت deploy دوباره می‌شود.

---

## مرحله ۳ — سرور + ربات روی Render (رایگان)

1. حساب بساز: https://render.com (GitHub login)
2. **New** → **Web Service** → اتصال به ریپو `yaran`
3. تنظیمات:
   | گزینه | مقدار |
   |-------|-------|
   | Name | `yaran-api` |
   | Root Directory | `server` |
   | Build Command | `npm install` |
   | Start Command | `npm start` |
   | Instance Type | **Free** |

4. **Environment Variables** (روی همین صفحه):
   ```
   BOT_TOKEN=<توکن ربات — از @BotFather>
   GROUP_ID=-1003717678648
   ADMIN_ID=51948593
   SERVER_URL=https://yaran-api.onrender.com
   WS_URL=wss://yaran-api.onrender.com/ws
   # PROXY_URL را نگذار — سرور خارج از ایران است، مستقیم وصل می‌شود
   ```
5. **Create Web Service** → صبر کن build شود (۲–۳ دقیقه)
6. لاگ‌ها را ببین: باید `Yaran server running` + `Bot server on` + `WebSocket connected` بیاید

> ⚠️ **مهم — پروکسی**: در ایران ربات با `PROXY_URL` کار می‌کرد. در Render این متغیر را **نگذار** — سرور Render خارج از تحریم است و مستقیم به تلگرام وصل می‌شود. فقط لوکال/ایران پروکسی لازم دارد.

> 💤 **خواب Render**: نسخه رایگان بعد از ~۱۵ دقیقه بدون ترافیک می‌خوابد و اولین درخواست ۳۰–۶۰ ثانیه طول می‌کشد. برای بیدار نگه‌داشتن: https://cron-job.org رایگان → هر ۱۰ دقیقه یک GET به `https://yaran-api.onrender.com/api/health`

---

## مرحله ۴ — تست نهایی

1. **سایت**: باز کن `https://نام‌کاربری‌تو.github.io/yaran/` → تخته وظایف باید وظایف را نشان دهد (از سرور Render)
2. **ربات**: تلگرام → `@yaran_robot` → `/start` → لیست وظایف → افزودن وظیفه تست
3. **سینک**: وظیفه در سایت ظاهر شود (۱۰ ثانیه poll)
4. **گزارش**: در ربات گزارش روزانه بفرست → تب «😊 گزارش» در سایت

---

## نکات

- **داده‌ها**: `data/tasks.json` و `data/panel.json` روی Render ذخیره می‌شوند ولی بعد از هر deploy جدید ریست می‌شوند (دیسک موقتی). برای نگهداری طولانی: هر چند وقت یک‌بار `git add data/` + push.
- **لوکال**: `cd server && npm start` → `http://localhost:4000` (سایت + API + ربات با هم)
- **ربات فقط لوکال**: `cd telegram-bot && node bot.js` (با `.env` لوکال که PROXY_URL دارد)
- بدون Firebase — همه‌چیز JSON فایل است.
