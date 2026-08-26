# 📥 صندوق ورودی رسانه (Media Inbox)

فایل‌های تولیدشده با Gemini را **همین‌جا** بریزید، بعد یک بار این دستور را اجرا کنید:

```
node tools/integrate-media.mjs
```

## قواعد نام‌گذاری فایل‌ها

الگو: `<اتاق>-<نما>.<پسوند>` — بزرگ/کوچک حروف و پسوند (webp/png/jpg) مهم نیست.

**نماها:** `hero` ، `hero-v` ، `herog` ، `herog_left` ، `herog_right` ، `media`

مثال‌ها:
- `bazi-hero.webp` → نمای کلی اتاق بازی
- `amoozesh_media.png` → نمای جلو اتاق آموزش
- `lobby-hero.jpg` → لابی
- `plan-hero.webp` و `plan-plan2.webp` → نقشه پلان
- `intro-video.mp4` → ویدیوی اینترو
- `ui-mascot-bear.png` → اسپرایت خرس (پس‌زمینه شفاف)

فهرست کامل شناسه‌ها: `docs/media-generation-prompts.md`

فایل‌های پردازش‌شده به `_done/` منتقل می‌شوند. اگر نامی شناخته نشد، ابزار همان‌جا گزارش می‌دهد.

> چرا مانیفست؟ ابزار `assets/images/manifest.json` می‌سازد و ران‌تایم سایت (`js/media-assets.js`)
> مسیرهای `.webp` کد را به فایل واقعی موجود نگاشت می‌کند — پس هر فرمتی بدهید بدون دست‌زدن به کد کار می‌کند.
