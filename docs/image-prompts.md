# پرامپت‌های تولید تصویر — تور مجازی یاران (موبایل)

هدف: تولید عکس‌های جایگزین/تکمیلی برای تور گردش مجازی، بهینه برای موبایل (عمودی).
هر پرامپت = یک اتاق. در ابزار تولید تصویر (Midjourney / DALL·E / Flux / Ideogram) استفاده کنید.

## قالب مشترک (استایل یکدست — در همه پرامپت‌ها ثابت)

```
Warm flat illustration of a cozy Iranian kindergarten, soft rounded shapes, bright cheerful palette (cream walls, wooden floor, woven Persian rug), gentle natural window light, no text, no watermark, clean composition, high detail
```

نسبت تصویر:
- تور بالای صفحه (hero.webp): `--ar 16:9`
- نمای گالری/موبایل (herog*.webp): `--ar 3:4` — عمودی، سوژه‌ی اصلی در مرکز-پایین (محل چیدمان نقطه‌های قابل کلیک)

## پرامپت‌ها (به‌جای «[اتاق]» و «[جزئیات]» جایگزین کنید)

| اتاق | پرامپت |
|---|---|
| لابی 🏠 | `[قالب] wide entrance lobby of a kindergarten, reception desk with small plants, colorful welcome board, coat hooks with tiny backpacks, 3 children arriving happily, --ar 16:9` — عمودی: `[قالب] vertical view of the lobby corner, coat hooks, shoe shelves, soft toys on a bench, child putting on shoes, --ar 3:4` |
| اتاق آموزش 📚 | `[قالب] classroom with a whiteboard showing letters and shapes, low bookshelves, colorful building blocks on a round table, 3 children learning with a teacher, --ar 16:9` — عمودی: `[قالب] low-angle view of the learning corner, alphabet rug, cushions for story time, open picture books, --ar 3:4` |
| اتاق بازی 🧸 | `[قالب] playroom with ball pit, wooden slide, toy cars and dolls on soft mats, kids playing joyfully, --ar 16:9` — عمودی: `[قالب] vertical view of the ball pit and climbing blocks, child mid-laugh, warm light, --ar 3:4` |
| اتاق هنر و موسیقی 🎨 | `[قالب] art and music room, easels with child paintings, small drums and xylophone, paint jars on shelves, kids painting and singing, --ar 16:9` — عمودی: `[قالب] vertical view of the painting wall with framed children artworks, music corner with colorful instruments, --ar 3:4` |
| اتاق مطالعه و هوش 🧩 | `[قالب] quiet reading nook with soft bean bags, wall puzzle board, shape-sorting toys, child reading a picture book, --ar 16:9` — عمودی: `[قالب] vertical view of bookshelf corner with puzzle table and felt board, calm lighting, --ar 3:4` |
| اتاق بهداشت و سلامت 🩺 | `[قالب] bright health room, friendly nurse desk, height chart on wall, tooth model and washbasin, child getting a bandage with a smile, --ar 16:9` — عمودی: `[قالب] vertical view of the hand-washing station with step stool and colorful towel hooks, --ar 3:4` |
| اتاق خواب 😴 | `[قالب] cozy nap room, row of small beds with soft blankets, starry ceiling lights, teddy bears, one child asleep peacefully, --ar 16:9` — عمودی: `[قالب] vertical view of a single bed with soft blanket and plush toys, dreamy blue light, --ar 3:4` |
| اتاق مربی 👩‍🏫 | `[قالب] teachers room, wooden desk with lesson planner and tea, notice board with kids photos, window with plant, --ar 16:9` — عمودی: `[قالب] vertical view of the notice board corner with photos and colorful schedules, --ar 3:4` |
| استراحت مربیان ☕ | `[قالب] staff lounge, cozy sofa, samovar and tea cups on a small table, bookshelf, two teachers resting, --ar 16:9` — عمودی: `[قالب] vertical view of tea corner with samovar and sweets, warm inviting light, --ar 3:4` |
| جلسه اولیا 🪑 | `[قالب] parent meeting room, round table with chairs, whiteboard with family-tree drawing, cookies and tea on the table, --ar 16:9` — عمودی: `[قالب] vertical view of chairs around a warm meeting table, family drawings on the wall, --ar 3:4` |
| بایگانی 🗂 | `[قالب] archive room, neat wooden shelves with labeled colorful boxes, folders organized, soft lamp light, --ar 16:9` — عمودی: `[قالب] vertical view of shelf corner with color-coded boxes and small plant, --ar 3:4` |
| تریا 🥛 | `[قالب] kindergarten snack bar, counter with milk glasses and fruit bowls, small tables with tiny chairs, kids having snacks, --ar 16:9` — عمودی: `[قالب] vertical view of the fruit bowl counter with juice glasses, bright cheerful light, --ar 3:4` |
| حیاط 🌳 | `[قالب] sunny courtyard playground, slide and swings, sandbox with buckets, climbing frame, kids playing outside, trees and soft clouds, --ar 16:9` — عمودی: `[قالب] vertical view of slide and sandbox corner with round flower beds, --ar 3:4` |
| مددکاری و کودک‌یاری 🤝 | `[قالب] gentle counseling corner, soft seating, story cards on the wall, feelings chart, counselor talking kindly with a child, --ar 16:9` — عمودی: `[قالب] vertical view of feelings chart wall with cozy two-seat sofa, --ar 3:4` |

## راهنمای جایگزینی

1. خروجی را webp کنید (کیفیت ~85، ابعاد: hero 1408×768؛ عمودی 1080×1440).
2. نام‌گذاری مثل فعلی: `assets/images/<اتاق>/hero.webp` (افقی) و `assets/images/<اتاق>/herog.webp` (عمودی — گالری تور).
3. پوشه Lob هم `assets/images/lobby/hero.webp` دارد (لابی سایت).
4. نقاط قابل کلیک (هات‌اسپات) در تور روی پس‌زمینه قرار دارند — سوژه‌ی اصلی را در مرکز/پایین نگه دارید تا دکمه‌ها روی محتوای مهم نیفتند.