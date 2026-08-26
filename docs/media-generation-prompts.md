# 🎨 یاران — کتابخانه‌ی پرامپت تولید رسانه (نسخه ۶ — نهایی)
# YARAN Media Generation Prompt Book

**Workflow (تقسیم کار):**
1. این فایل فهرست کاملِ هر تصویر/ویدیویی است که باید ساخته یا جایگزین شود.
2. پرامپت‌ها را در Google Gemini (یا ابزار مشابه) اجرا کنید و خروجی‌ها را دانلود کنید.
3. فایل‌ها را با **نام فایل مشخص‌شده برای هر مورد** در پوشه‌ی `assets/_inbox/` بریزید (زیرپوشه اختیاری).
4. دستور `node tools/integrate-media.mjs` را اجرا کنید — خودش فایل‌ها را تشخیص می‌دهد، سر جای project می‌گذارد و مانیفست را به‌روز می‌کند.
5. سایت بدون هیچ تغییر کدی، از تصاویر جدید استفاده می‌کند (از طریق `assets/images/manifest.json`).

> ⚠️ **قالب خروجی:** ترجیحاً **WebP**؛ اگر ابزار شما WebP نمی‌دهد، JPG/PNG هم مشکلی ندارد —
> ابزار انتگراسیون خودش ثبت می‌کند و ران‌تایم مسیر درست را پیدا می‌کند.
> ابعاد landscape: **۱۹۲۰×۱۰۸۰** · ابعاد portrait: **۱۰۸۰×۱۹۲۰**

---

## STYLE — این بلوک را ابتدای «همه‌ی» پرامپت‌ها بچسبانید

```
Soft watercolor blended with 3D cartoon rendering. Surfaces have subtle satin gloss finish —
not matte, not chrome, like satin fabric or polished wood with gentle sheen. Soft diffused
window light from large windows, gentle shadows, warm ambient fill. Color palette: warm
pastels with moderate saturation — sage green (#B5EAD7), dusty rose (#E8A0BF), butter yellow
(#FFD98E), sky blue (#A8D8EA), warm cream (#FFF8E7), soft lavender (#C7CEEA). Gentle
depth-of-field blur on backgrounds. Professional children's book illustration quality.
Touchable, warm, inviting.
```

## CHARACTERS — برای صحنه‌هایی که کودک دارند

```
Semi-realistic soft children (ages 3-5): natural proportions slightly softened, round faces,
gentle expressions, rosy cheeks. Diverse Iranian features: black/brown hair, curly/straight,
various skin tones. Colorful everyday clothes: overalls, cotton dresses, t-shirts, sneakers.
Natural candid poses — not stiff, not exaggerated. Soft shadows on skin, natural fabric folds.
```

## FORBIDDEN — انتهای همه‌ی پرامپت‌ها

```
NO text, NO letters, NO words, NO numbers, NO watermarks, NO logos.
NO flat illustration (must have 3D depth and form).
NO harsh outlines, NO cell-shading.
```

## MOOD PER ROOM
| فضا | Mood |
|---|---|
| لابی/پلان/نقشه | warm & inviting |
| بازی/هنر/جلسه اولیا | energetic & joyful |
| مطالعه/خواب/استراحت مربیان | calm & cozy |
| آموزش/مربی/توانبخشی | mixed |
| سلامت/تریا/بایگانی | clean & organized |
| حیاط | sunny & natural |

**قانون مهم برای نمای اتاق‌ها:** شش نمای هر اتاق باید **یک فضای واحد و پیوسته** را از زوایای
مختلف نشان دهند (مثل عکاسی واقعی از یک اتاق). رنگ دیوارها، فرش، پنجره‌ها و مبلمان باید بین
نماها کاملاً یکسان بماند. در پرامپت هر نمای بعدی بنویسید: *"Same exact room as previous view,
same furniture, colors and layout, camera now looking from …"*.

---

## A) پلان ورودی — `plan/`

### `plan-hero.webp` (۱۹۲۰×۱۰۸۰)
```
[STYLE] Illustrated top-down aerial view of a kindergarten campus shaped like a soft U around
a central courtyard. Each wing painted a different pastel (sage green, dusty rose, sky blue,
lavender, butter yellow, warm cream). Courtyard: lush green grass, wooden sandbox frame,
mature tree with rope swing, flower beds along walls, small winding paved path. Rooftops in
soft terracotta with skylights. Tiny details: bicycles parked near gate, laundry-line of
children paintings between two poles. Late-afternoon golden light, long soft shadows.
Watercolor texture on grass and walls, 3D depth on buildings. Warm, organized, inviting.
[FORBIDDEN]
```

### `plan-hero-v.webp` (۱۰۸۰×۱۹۲۰) — همان صحنه، عمودی.

### `plan-plan2.webp` (۱۹۲۰×۱۰۸۰)
```
[STYLE] Kindergarten interior hallway seen straight on: 13 doors in soft pastel colors (sage,
rose, blue, yellow, cream, lavender, peach, mint, coral, lilac…). Each door has a different
shaped window (circle, star, heart, moon, diamond, flower) and a unique tiny handle shaped
like animals. Warm oak floor with satin sheen reflecting recessed lighting. Small potted plant
between every two doors; children's framed finger-paint art at kid height. Cozy, welcoming.
[FORBIDDEN]
```

### `plan-plan2-v.webp` (۱۰۸۰×۱۹۲۰) — همان راهرو با پرسپکتیو عمودی.

---

## B) لابی — `lobby/`

### `lobby-hero.webp` (۱۹۲۰×۱۰۸۰)
```
[STYLE] Warm kindergarten lobby. Oak hardwood floor with satin sheen. Left wall: 8 wooden
cubbies with fabric bins (sage, dusty rose, sky blue, peach) and animal-shaped coat hooks.
Center: round white table, glass vase of tulips. Right: floor-to-ceiling window, sheer linen
curtains, sunlight patterns dancing on floor. Back wall: large watercolor forest mural with
foxes, deer and birds. Three paper lanterns on ceiling. Big potted monstera. Geometric woven
rug in soft rainbow. [CHARACTERS optional: one child hanging a small backpack on a hook].
Cozy, warm, inviting. [FORBIDDEN]
```

### `lobby-hero-v.webp` (۱۰۸۰×۱۹۲۰) — همان لابی، عمودی.

### `lobby-herog.webp` — نگاه از لابی به درهای شیشه‌ای رو به حیاط: نور غرق‌آمه، چمن و درخت پشت شیشه.
### `lobby-herog_left.webp` — همان اتاق، دوربین به چپ: دیوار کیوبی‌ها + آثار هنری کودکان با نخ و گیره.
### `lobby-herog_right.webp` — دوربین به راست: قلاب لباس، کوله‌پشتی‌ها، آینه قدی کودکانه.
### `lobby-media.webp` — `[CHARACTERS]` کودکان نشسته در دایره روی فرش، یکی کتاب مصور باز کرده، بقیه با کنجکاوی خم شده‌اند.
### `lobby-media-v.webp` (۱۰۸۰×۱۹۲۰) — همان، عمودی.

---

## C) اتاق‌ها — ۱۳ اتاق × ۶ نما

برای هر اتاق ۶ فایل لازم است:
`<room>-hero.webp`, `<room>-hero-v.webp`, `<room>-herog.webp` (نمای پشت),
`<room>-herog_left.webp`, `<room>-herog_right.webp`, `<room>-media.webp` (نمای جلو/فعالیت).

الگوی پرامپت هر نما:
- **hero**: نمای کلی از مرکز اتاق (۱۹۲۰×۱۰۸۰)
- **hero-v**: همان، عمودی (۱۰۸۰×۱۹۲۰)
- **herog**: دوربین برگشته به دیوار پشت
- **herog_left/right**: پن به دیوار چپ/راست
- **media**: زاویه‌ی فعالیت اصلی اتاق با کودکان (نمای جلو)

---

### C1. اتاق آموزش — `amoozesh-*` (mood: warm & organized)
```
hero: [STYLE] Kindergarten classroom. Four small wooden tables with tiny chairs (natural wood,
sage green seats). White wall with children's crayon drawings pinned on twine. Low bookshelf
overflowing with colorful picture books (real spines, no readable text). Large windows with
white sheer curtains, soft window light. Reading corner: two bean bags (dusty rose, sage) with
stuffed animals. Warm gray linoleum floor. Satin gloss on tabletops. Watercolor texture on
walls. Persian geometric rug under central table. Clean, organized, warm. [FORBIDDEN]
```
- **herog**: دیوار پشت = قفسه‌ی کتاب + ساعت دیواری کودکانه + تخته سفید با نقاشی (بدون نوشته)
- **herog_left**: گوشه‌ی bean bag: جغد عروسکی، کتاب‌ها، چراغ خواب نرم
- **herog_right**: قفسه کتاب از نزدیک + چهارپایه + گلدان
- **media**: کودکان سر یک میز در حال کار با مداد رنگی، مربی جوان کنارشان

### C2. اتاق بازی — `bazi-*` (energetic & joyful)
```
hero: [STYLE] Exciting indoor playroom. Pastel rainbow foam flooring. Small white-and-blue
slide, ball pit filled with coral/yellow/teal balls, wooden puppet theater with red curtain,
wooden building blocks scattered playfully, a few soap bubbles floating in air. Bright accents.
Satin gloss on slide surface and balls. Energetic, fun, safe. [FORBIDDEN]
```
- **media**: کودکی در حال سرسره‌سواری + دو کودک کنار استخر توپ، لحظه‌ی شادی واقعی

### C3. اتاق هنر و موسیقی — `honar-*` (creative & joyful)
```
hero: [STYLE] Sunlit art studio. Three wooden easels with half-finished paintings. Child-height
table with paint palettes, crayon boxes, clay pots. Drying rack with watercolor papers. Two
skylights pouring soft light. Friendly paint splatters on protected floor. Supply shelves in
rainbow order. A small piano and tambourine on a shelf corner. Satin gloss on wet paint.
Creative, colorful, joyful. [FORBIDDEN]
```

### C4. اتاق مطالعه و هوش — `motaleh-*` (calm & cozy)
```
hero: [STYLE] Dreamy reading nook. U-shaped cushion pit stuffed with soft pillows (lavender,
cream, sage). Curved low bookshelf with picture books facing out. Warm pendant lamp with
fringe. Stuffed animals tucked among pillows. String of fairy lights along wall. Round rug
with star pattern. Calm, cozy, magical. Satin gloss on book covers. [FORBIDDEN]
```

### C5. حیاط — `hayat-*` (sunny & natural)
```
hero: [STYLE] Sunny kindergarten garden. Real green grass, flower beds bursting sunflowers,
tulips and daisies. Wooden sandbox with cover half open. Mature maple tree with tire swing.
Small tricycle path circling a mini roundabout. Blue sky with two puffy clouds, one butterfly.
Watercolor texture on foliage. Satin gloss on leaves and petals. Natural, warm, alive.
[FORBIDDEN]
```

### C6. اتاق خواب — `khab-*` (calm & dreamy)
```
hero: [STYLE] Peaceful nap room bathed in sunset light through sheer curtains. Row of small
floor beds with pastel sheets (lavender, peach, mint), each with a folded blanket and a plush
friend. Crescent moon night-light glowing softly on wall. Star mobiles hanging. Fluffy cloud-shaped
rug. Dreamy, calm, tender. Lavender and cream palette. Satin gloss on bed frames. [FORBIDDEN]
```

### C7. اتاق بهداشت و سلامت — `salamat-*` (clean & reassuring)
```
hero: [STYLE] Cheerful health room, mint green walls. Exam couch with friendly animal stickers
on its paper roll. Wooden growth chart with animal markers (no numbers visible). Toy medical
kit open on shelf. Kid-height sink with step stool, toothbrush cups. Fruit bowl poster (no text).
Spotless, bright, reassuring. Satin gloss on surfaces. [FORBIDDEN]
```

### C8. جلسه اولیا / سالن — `jalase-owlia-*` (festive & energetic)
```
hero: [STYLE] Spacious kindergarten hall. Polished wood floor gleaming. Small stage with red
velvet curtain half open. Colorful foam mats stacked neatly. Balloon bunches (coral, gold, teal)
tied to corners. Paper streamers across ceiling. Shelf of musical instruments: drums, xylophone,
tambourines. Festive, exciting, warm. Satin gloss on floor and instruments. [FORBIDDEN]
```
- **media**: چند والد و مربی نشسته روی صندلی‌های کوچک در گفت‌وگوی دوستانه با چای

### C9. اتاق مربی — `moraabi-*` (cozy & homey)
```
hero: [STYLE] Cozy role-play room. Wooden play kitchen with tiny stove, colorful pots hanging.
Dress-up rack with costumes: doctor coat, firefighter vest, princess cape. Small tea-party
table set with toy cups. Floor cushions. Homey, warm, imaginative. Satin gloss on kitchen
surfaces. [FORBIDDEN]
```

### C10. استراحت مربیان — `esterahat-moraabian-*` (calm & zen)
```
hero: [STYLE] Quiet staff rest room. Two giant bean bags (sage, lavender) beside a rocking
chair with knitted throw. Windowsill lined with small potted herbs. Sheer curtains diffusing
afternoon light. Kettle and cup tray on low table. Calm, zen, adult-but-warm. Satin gloss on
wooden armrest. [FORBIDDEN]
```

### C11. مددکاری و توانبخشی — `maddakari-*` (encouraging & fun) *(پوشه: tavanbakhshi)*
```
hero: [STYLE] Cheerful therapy room. Soft foam obstacle blocks, low balance beam over mats,
crawl tunnel in teal and yellow. Sensory wall panel with textures: soft brush, mirror, bead maze.
Therapy ball with friendly face. Encouraging, playful, safe. Satin gloss on foam surfaces.
[FORBIDDEN]
```

### C12. تریا — `teria-*` (clean & professional)
```
hero: [STYLE] Kindergarten pantry/kitchen. Child-safe counter with fruit baskets, small fridge
decorated with magnets, open shelves with labeled jars (labels blank). Steel sink shining,
aprons hanging. Window over counter with herb pots. Clean, professional yet warm. Satin gloss
on steel and jars. [FORBIDDEN]
```

### C13. بایگانی — `bayegani-*` (warm & organized)
```
hero: [STYLE] Magical archive room. Tall wooden shelves with rainbow-ordered binders and boxes.
Rolling ladder leaning against shelves. Warm brass pendant lamp. Sorting desk with paper trays,
a magnifying glass and string-tied bundles of children's artworks. Amber warm light. Organized,
inviting, slightly storybook-like. Satin gloss on binder spines. [FORBIDDEN]
```

---

## D) ویدیوی اینترو

### `intro-video.mp4` (۱۰–۱۵ ثانیه، بی‌صدا، loop-friendly)
```
Gentle animated camera push-in through a kindergarten entrance at golden hour: painted rainbow
arch over wooden double door slowly swings open revealing warm glowing interior; paper flowers
tremble; a paper airplane flies across frame trailing soft sparkles; dust motes float in window
light. Style: soft watercolor blended with 3D cartoon, satin gloss, warm pastels
(#B5EAD7 #E8A0BF #FFD98E #A8D8EA #FFF8E7). Slow dreamy motion suitable for seamless looping.
NO text, NO letters, NO watermark, NO people faces close-up. 8K quality.
```

---

## E) اجزای گرافیکی UI (پس‌زمینه شفاف PNG/WebP — اختیاری ولی توصیه‌شده)

این‌ها «اسپرایت» هستند؛ پس‌زمینه شفاف، سوژه وسط فریم، سایه‌ی نرم زیر شیء.

| ID فایل | پرامپت |
|---|---|
| `ui-mascot-bear.png` | `[STYLE] A single adorable round teddy bear character sticker, waving one paw, rosy cheeks, big glossy eyes, soft brown fur, cream muzzle, standing pose, centered, transparent background, die-cut sticker style with thin white edge` |
| `ui-badge-star.png` | `[STYLE] A chunky glossy golden star badge with a happy face, sticker style, transparent background` |
| `ui-prop-balloon.png` | `[STYLE] One glossy coral balloon on a curling string, sticker style, transparent background` |
| `ui-prop-blocks.png` | `[STYLE] Three stacked wooden toy blocks (sky blue, coral, butter yellow) with simple shapes carved, satin gloss, sticker style, transparent background` |
| `ui-prop-crane.png`؟ | — |
| `ui-frame-paper.png` | `[STYLE] Torn-edge cream paper sheet with washi tape strips on two corners, slight shadow, top-down, transparent background` |

> نکته: اجزای تزئینی متحرک فعلاً با SVG داخلی (`js/svgx.js`) تأمین شده‌اند؛ اسپرایت‌های بالا
> برای غنی‌تر شدن منوها/کارتها استفاده می‌شوند و پس از ورود به `_inbox` به‌طور خودکار
> در `assets/ui/` قرار می‌گیرند.

---

## F) پس‌زمینه‌ی محو صفحات (اختیاری)

| ID | محتوا |
|---|---|
| `bg-search.webp` | blurred cozy library with rainbow book spines, warm window light |
| `bg-panel.webp` | blurred desk with pencil holder, succulent, warm light |
| `bg-archive.webp` | blurred shelves with colorful binders, warm desk lamp |

---

## ✅ چک‌لیست تولید (به ترتیب پیشنهادی اجرا)

**دسته‌ی آزمایشی (۳ فایل اول):**
1. `lobby-hero.webp`
2. `bazi-hero.webp`
3. `amoozesh-hero.webp`

→ اگر سبک تأیید شد، ادامه دهید:
4. شش نمای لابی و پلان (۸ فایل)
5. برای هر اتاق: hero → herog → left → right → media (با جمله‌ی «Same exact room…») — ۶۵ فایل
6. ویدیوی اینترو
7. اسپرایت‌های UI (۵ فایل)
