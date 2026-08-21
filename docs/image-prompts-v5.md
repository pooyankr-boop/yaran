# YARAN Image Standards v5 — Final
# Soft watercolor + 3D cartoon, satin gloss, soft window light, semi-realistic soft characters
# Save to: D:/openclaw/Projects/yaran/assets/images/{folder}/

## ═══════════════════════════════════════════
## STYLE — PREPEND TO EVERY PROMPT
## ═══════════════════════════════════════════

STYLE_BASE = """
Soft watercolor blended with 3D cartoon rendering. Surfaces have 
subtle satin gloss finish — not matte, not chrome, like satin fabric 
or polished wood with gentle sheen. Soft diffused window light 
from large windows, gentle shadows, warm ambient fill. 
Color palette: warm pastels with moderate saturation — 
sage green (#B5EAD7), dusty rose (#E8A0BF), butter yellow (#FFD98E), 
sky blue (#A8D8EA), warm cream (#FFF8E7), soft lavender (#C7CEEA). 
Gentle depth-of-field blur on backgrounds. Professional children's 
book illustration quality. Touchable, warm, inviting.
"""

CHARACTERS = """
Semi-realistic soft children (ages 3-5): natural proportions slightly 
softened, round faces, gentle expressions, rosy cheeks. Diverse Iranian 
features: black/brown hair, curly/straight, various skin tones. 
No hijab. Colorful everyday clothes: overalls, cotton dresses, 
t-shirts, sneakers. Natural candid poses — not stiff, not exaggerated. 
Soft shadows on skin, natural fabric folds on clothing.
"""

FORBIDDEN = """
NO text, NO letters, NO words, NO numbers, NO watermarks.
NO hijab, NO headscarf.
NO flat illustration (must have 3D depth and form).
NO harsh outlines, NO cell-shading.
"""

## ═══════════════════════════════════════════
## MOOD PER ROOM
## ═══════════════════════════════════════════
## lobby/plan/map → warm & inviting
## bazi/honar/jalase-owlia → energetic & joyful
## motaleh/khab/esterahat → calm & cozy
## amoozesh/moraabi/tavanbakhshi → mixed
## salamat/teria/bayegani → clean & organized
## hayat → sunny & natural

## ═══════════════════════════════════════════
## A. INTRO (assets/images/intro/)
## ═══════════════════════════════════════════

### intro-hero.webp (1920×1080)
"Soft watercolor and 3D cartoon blend. A kindergarten entrance at 
soft afternoon light. Warm-toned wooden double door with painted 
rainbow arch above. Colorful paper flowers and children's handprint 
art decorating the door frame. Through the open door: warm interior 
with soft light, colorful cubbies visible. Outside: stone pathway 
lined with potted sunflowers and daisies, wooden bench with teddy 
bear. Gentle window light from side. Semi-realistic children (no 
hijab, ages 3-5) peeking excitedly — natural expressions, soft 
skin tones. Subtle satin gloss on door handle and flower petals. 
Soft watercolor texture on background, 3D depth on foreground. 
Warm, inviting, cozy. {FORBIDDEN}. 8K."

### intro-hero-v.webp (1080×1920)
Same, portrait: door centered, children lower third, flowers on sides.

## ═══════════════════════════════════════════
## B. FLOOR PLAN (assets/images/plan/)
## ═══════════════════════════════════════════

### hero.webp (1920×1080)
"Soft watercolor and 3D cartoon blend. Illustrated top-down view of 
kindergarten floor plan. U-shaped building around central courtyard. 
Each wing a soft pastel color (sage, dusty rose, sky blue, lavender, 
butter yellow, warm cream). Courtyard: green grass, wooden sandbox 
frame, mature tree with rope swing, flower beds along walls, small 
paved path. Soft afternoon shadows. Watercolor texture on grass and 
walls, 3D depth on buildings. Warm, organized, inviting. 
{FORBIDDEN}. 8K."

### hero-v.webp (1080×1920)
Same, portrait.

### plan2.webp (1920×1080)
"Soft watercolor and 3D cartoon blend. Kindergarten hallway with 
12 doors in soft pastel colors (sage, rose, blue, yellow, cream, 
lavender, peach, mint, etc.). Each door has a different shaped 
window (circle, star, heart, moon, diamond) and unique handle. 
Warm wooden floor with satin sheen. Soft recessed lighting. Small 
potted plant between every two doors. Gentle shadows. Cozy, 
welcoming. {FORBIDDEN}. 8K."

### plan2-v.webp (1080×1920)
Same, portrait: doors in perspective.

## ═══════════════════════════════════════════
## C. LOBBY (assets/images/lobby/)
## ═══════════════════════════════════════════

### hero.webp (1920×1080)
"Soft watercolor and 3D cartoon blend. Warm kindergarten lobby. 
Oak hardwood floor with satin sheen. Left wall: 8 wooden cubbies 
with fabric bins (sage, dusty rose, sky blue, peach) and animal 
coat hooks. Center: round white table with glass vase of tulips. 
Right: floor-to-ceiling window with sheer linen curtains, soft 
window light creating gentle patterns on floor. Back wall: 
watercolor forest mural with animals. 3 paper lanterns on ceiling. 
Large potted monstera. Geometric woven rug. Cozy, warm, inviting. 
Satin gloss on floor and vase. Watercolor texture on mural. 
{FORBIDDEN}. 8K."

### hero-v.webp (1080×1920)
Same, portrait.

### herog.webp (1920×1080)
"Soft watercolor + 3D cartoon. Through glass doors from lobby 
into sunny courtyard. Soft light flooding in. Green grass, flowers, 
tree visible through glass. Warm interior frame. Inviting, warm. 
{FORBIDDEN}. 8K."

### herog_left.webp (1920×1080)
Same from left: cubby wall, artwork displayed, warm light.

### herog_right.webp (1920×1080)
Same from right: coat hooks, backpacks, child-height mirror.

### media.webp (1920×1080)
"Semi-realistic soft children (no hijab, ages 3-5) sitting in 
circle on woven rug in kindergarten lobby. One holds open picture 
book, others lean in with curious natural expressions. Soft window 
light on faces. Teddy bear nearby. Natural, candid, warm. 
Satin gloss on book pages. {FORBIDDEN}. 8K."

### media-v.webp (1080×1920)
Same, portrait.

## ═══════════════════════════════════════════
## D. MAP (assets/images/map/)
## ═══════════════════════════════════════════

### bg.webp (1920×1080)
"Soft watercolor + 3D cartoon. Illustrated aerial view of 
kindergarten campus. Each wing soft pastel color. Central courtyard 
with tree, sandbox, flower beds. Warm afternoon light. Soft 
watercolor texture, 3D building forms. Organized, inviting. 
{FORBIDDEN}. 8K."

### bg-v.webp (1080×1920)
Same, portrait.

### room-circles-bg.webp (1920×1080)
"Soft blurred kindergarten hallway. Pastel doors as soft shapes, 
warm light, watercolor texture. Dreamy, inviting. No text. 8K."

## ═══════════════════════════════════════════
## E-H. SCREENS
## ═══════════════════════════════════════════

search/bg: "Soft blurred library with rainbow book spines, warm 
window light, watercolor texture. Cozy. No text. 8K."
panel/bg: "Soft blurred desk with pencil holder, succulent, warm 
light. Clean, warm. No text. 8K."
archive/bg: "Soft blurred shelves with colorful binders, warm desk 
lamp, watercolor texture. Cozy. No text. 8K."
content/bg: "Soft warm cream background with subtle pastel pattern. 
Clean, minimal. No text. 8K."
(All have -v.webp mobile.)

## ═══════════════════════════════════════════
## I. ROOMS — 13 × 6 images each
## ═══════════════════════════════════════════

### D1. EDUCATION (amoozesh/) — mood: warm & organized
hero: "Soft watercolor and 3D cartoon blend. Kindergarten classroom. 
4 small wooden tables with tiny chairs (natural wood, sage green seats). 
White wall with children's crayon drawings pinned. Low bookshelf with 
colorful picture books (real spines). Large windows with white sheer 
curtains, soft window light. Reading corner: 2 bean bags (dusty rose, 
sage) with stuffed animals. Linoleum floor warm gray. Satin gloss on 
table surfaces. Watercolor texture on walls. Clean, organized, warm. 
{FORBIDDEN}. 8K."
hero-v: Same, portrait.
herog: Wide from doorway: all tables, bookshelf, bean bags, windows.
herog_left: Bean bag corner: stuffed owl, books, soft lamp.
herog_right: Bookshelf: real book spines, step stool, potted plant.
media: Children at table doing craft, natural expressions, warm light.

### D2. GAMES (bazi/) — mood: energetic & joyful
hero: "Soft watercolor + 3D cartoon. Exciting playroom. Soft foam 
floor in pastel rainbow. Indoor slide (white/blue). Ball pit with 
colorful balls. Wooden puppet theater with red curtain. Building 
blocks. Bubbles floating. Bright accents (coral, yellow, teal). 
Satin gloss on slide and balls. Energetic, fun, safe. {FORBIDDEN}. 8K."
hero-v/herog/herog_left/herog_right/media: Same pattern.

### D3. ART (honar/) — mood: creative & joyful
hero: "Soft watercolor + 3D cartoon. Art studio. 3 easels with 
paintings. Table with paint palettes, crayons. Drying rack. 
Skylights with soft light. Paint splatters on floor. Supply shelves. 
Satin gloss on paint surfaces. Creative, colorful. {FORBIDDEN}. 8K."
hero-v/herog/herog_left/herog_right/media: Same pattern.

### D4. READING (motaleh/) — mood: calm & cozy
hero: "Soft watercolor + 3D cartoon. Cozy reading nook. U-shaped 
cushion pit with soft pillows (lavender, cream). Bookshelf with 
colorful books. Pendant light. Stuffed animals. Fairy lights. 
Calm, cozy, warm. Satin gloss on book covers. {FORBIDDEN}. 8K."
hero-v/herog/herog_left/herog_right/media: Same pattern.

### D5. COURTYARD (hayat/) — mood: sunny & natural
hero: "Soft watercolor + 3D cartoon. Sunny garden. Real green grass, 
flower beds (sunflowers, tulips, daisies). Wooden sandbox. Tree with 
tire swing. Blue sky, clouds, butterflies. Natural, warm, alive. 
Satin gloss on leaves and petals. {FORBIDDEN}. 8K."
hero-v/herog/herog_left/herog_right/media: Same pattern.

### D6. NAP (khab/) — mood: calm & dreamy
hero: "Soft watercolor + 3D cartoon. Peaceful nap room. Small beds 
with pastel sheets. Stuffed animals. Soft curtains, sunset light. 
Constellation night-light. Dreamy, calm. Lavender/cream. Satin gloss 
on bed frames. {FORBIDDEN}. 8K."
hero-v/herog/herog_left/herog_right/media: Same pattern.

### D7. HEALTH (salamat/) — mood: clean & reassuring
hero: "Soft watercolor + 3D cartoon. Cheerful health room. Exam couch 
with animal stickers. Growth chart with animals. Toy medical kit. 
Sink with step stool. Mint green. Clean, reassuring. Satin gloss on 
surfaces. {FORBIDDEN}. 8K."
hero-v/herog/herog_left/herog_right/media: Same pattern.

### D8. UPPER HALL (jalase-owlia/) — mood: festive & energetic
hero: "Soft watercolor + 3D cartoon. Spacious hall. Polished wood 
floor. Stage with red curtain. Colorful mats. Balloons, streamers. 
Musical instruments. Coral/gold. Festive, exciting. Satin gloss on 
floor and instruments. {FORBIDDEN}. 8K."
hero-v/herog/herog_left/herog_right/media: Same pattern.

### D9. MORABI (moraabi/) — mood: cozy & homey
hero: "Soft watercolor + 3D cartoon. Cozy room. Floor cushions. 
Play kitchen with wooden stove, colorful pots. Dress-up rack with 
costumes. Tea party table. Homey, warm. Satin gloss on kitchen 
surfaces. {FORBIDDEN}. 8K."
hero-v/herog/herog_left/herog_right/media: Same pattern.

### D10. REST (esterahat-moraabian/) — mood: calm & zen
hero: "Soft watercolor + 3D cartoon. Quiet room. Giant bean bags 
(sage, lavender). Rocking chair. Plants on windowsill. Sheer 
curtains. Calm, zen. Satin gloss on wood. {FORBIDDEN}. 8K."
hero-v/herog/herog_left/herog_right/media: Same pattern.

### D11. REHAB (tavanbakhshi/) — mood: encouraging & fun
hero: "Soft watercolor + 3D cartoon. Therapy room. Foam obstacles, 
balance beam, tunnel. Sensory wall with textures. Therapy ball. 
Teal/yellow. Fun, safe. Satin gloss on foam. {FORBIDDEN}. 8K."
hero-v/herog/herog_left/herog_right/media: Same pattern.

### D12. THEORY (teria/) — mood: clean & professional
hero: "Soft watercolor + 3D cartoon. Teacher prep room. Desk with 
planner, markers, succulent. Supply bins. Whiteboard with sticky 
notes (no text). Blue/white. Professional yet warm. Satin gloss on 
desk. {FORBIDDEN}. 8K."
hero-v/herog/herog_left/herog_right/media: Same pattern.

### D13. ARCHIVE (bayegani/) — mood: warm & organized
hero: "Soft watercolor + 3D cartoon. Archive. Tall shelves with 
rainbow binders. Rolling ladder. Pendant lamp. Sorting desk. 
Amber/warm. Organized, inviting. Satin gloss on binders. 
{FORBIDDEN}. 8K."
hero-v/herog/herog_left/herog_right/media: Same pattern.

## ═══════════════════════════════════════════
## J. FEATURED (lobby/featured/)
## ═══════════════════════════════════════════

featured-1: "Semi-realistic soft children painting at art table, 
colorful paint on fingers, natural smiles. Warm light. No text."
featured-2: "Children building tower with blocks, one places final 
block, others watch. Natural expressions. No text."
featured-3: "Child reading book under tree, dappled light. Peaceful. 
No text."
featured-4: "Children with painted hands held up, laughing. Natural. 
No text."
featured-5: "Children making clay animals, focused. Art room. No text."
featured-6: "Children puppet show, audience watching. Excited. No text."

## ═══════════════════════════════════════════
## TEST BATCH:
## 1. assets/images/lobby/hero.webp
## 2. assets/images/bazi/hero.webp
## 3. assets/images/honar/hero.webp
## ═══════════════════════════════════════════
