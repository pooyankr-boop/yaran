# YARAN Complete Image Prompt Catalog
# Save all images to: D:/openclaw/Projects/yaran/assets/images/{folder}/
# Generate with: nano-banana-pro at 1K (draft) then 4K (final)
# Style: soft watercolor + 3D cartoon, warm pastels, no text, no hijab, child-friendly

## ═══════════════════════════════════════════
## GLOBAL STYLE RULES (prepend to every prompt)
## ═══════════════════════════════════════════
STYLE = "soft watercolor illustration blended with gentle 3D cartoon rendering, warm pastel color palette (coral #FF9B85, butter yellow #FFD98E, sky blue #A8D8EA, mint green #B5EAD7, lavender #C7CEEA), soft golden-hour lighting, gentle ambient shadows, no harsh outlines, professional children's book illustration quality, 8K ultra detailed"
FORBIDDEN = "no text, no letters, no words, no numbers, no hijab, no headscarf, no watermarks, no signatures"

## ═══════════════════════════════════════════
## A. INTRO SCREEN (assets/images/intro/)
## ═══════════════════════════════════════════

### intro-hero.webp (1920×1080) — fallback when video fails
"A magical kindergarten entrance at golden hour. Large ornate wooden door with colorful children's handprints painted on it, wide open revealing warm light inside. Lush garden on both sides: sunflowers, daisies, butterflies, a small fountain. Three diverse Iranian children (ages 3-5, curly and straight hair, no hijab) peek excitedly from behind the door, eyes wide with wonder. Fairy lights strung above the entrance. Stepping stone path leading to the door. Soft watercolor + 3D cartoon style, warm pastel palette. No text, no letters. Professional children's book illustration, 8K ultra detailed."

### intro-hero-v.webp (1080×1920) — mobile portrait
Same scene, portrait composition: tall door centered, children at lower third, fairy lights trailing up, garden visible on sides, warm sky with fluffy clouds at top.

## ═══════════════════════════════════════════
## B. FLOOR PLAN SCREEN (assets/images/plan/)
## ═══════════════════════════════════════════

### hero.webp (1920×1080) — main floor plan
"Top-down illustrated map of a kindergarten floor plan in soft watercolor style. U-shaped building around central courtyard. 12 colorful rooms visible: art room (coral), game room (yellow), reading room (blue), nap room (lavender), health room (mint), education room (peach), courtyard (green), etc. Each room shown as an open area with tiny recognizable furniture. Central courtyard has a tree, sandbox, and small pond. Paths connecting rooms. Soft, warm lighting from above. Bird's-eye view, isometric tilt. No text, no labels, no letters. Warm pastel palette. Professional children's book map illustration, 8K."

### hero-v.webp (1080×1920) — mobile floor plan
Same map, portrait: rooms stacked vertically, courtyard in center, paths visible.

### plan2.webp (1920×1080) — door selector
"12 colorful kindergarten doors arranged in a gentle arc on a warm wooden floor. Each door is a different pastel color with a unique decorative handle shape: star, heart, moon, sun, flower, cat, butterfly, cloud, rainbow, fish, tree, house. Soft glow around each door. Central area has a welcome mat with teddy bear. Walls decorated with children's artwork silhouettes. Warm, inviting. Soft watercolor + 3D style. No text, no labels, no letters. 8K."

### plan2-v.webp (1080×1920) — mobile door selector
Same 12 doors, portrait: doors in grid (3×4), each with glow, warm wooden floor, soft lighting.

## ═══════════════════════════════════════════
## C. LOBBY (assets/images/lobby/)
## ═══════════════════════════════════════════

### hero.webp (1920×1080) — lobby interior
"Spacious, warm kindergarten lobby. Polished wooden floor with soft area rug. Left wall: row of colorful children's cubbies with name hooks (animal-shaped). Center: round welcome table with fresh flowers in a vase. Right wall: large window with sheer curtains, sunlight streaming in. Back wall: painted mural of a friendly forest scene with animals (bear, rabbit, bird, squirrel). Ceiling: paper lanterns in pastel colors. A potted plant near the door. Empty, waiting for children. Warm, inviting. Soft watercolor + 3D style. No text, no letters. 8K."

### hero-v.webp (1080×1920) — mobile lobby
Same lobby, portrait: showing floor to ceiling, cubbies on left going up, window on right with light, rug centered.

### herog.webp (1920×1080) — lobby garden view
"View from kindergarten lobby through large glass double doors into a sunny courtyard garden. Glass doors have colorful butterfly stickers. Through the glass: green grass, flower beds, a small tree with swing, blue sky. Interior frame: warm wooden doorframe, a welcome mat, small umbrella stand. Warm sunlight flooding in. Soft watercolor + 3D style. No text. 8K."

### herog_left.webp (1920×1080)
Same garden view, angled from left: more of the cubby wall visible, children's artwork silhouettes displayed.

### herog_right.webp (1920×1080)
Same garden view, angled from right: coat hooks, backpack area, a small mirror at child height.

### media.webp (1920×1080)
"Diverse Iranian children (no hijab, ages 3-5) sitting in a circle on soft carpet in kindergarten lobby, sharing picture books. One child holds up a book with colorful illustrations, others lean in with wide curious eyes. Warm golden light from window. Teddy bear sitting among them. Soft watercolor + 3D style. No text. 8K."

### media-v.webp (1080×1920) — mobile lobby media
Same scene, portrait: children in circle, book visible, warm light from above.

## ═══════════════════════════════════════════
## D. ROOMS (13 rooms × 6 images each = 78)
## Pattern: hero.webp, hero-v.webp, herog.webp, herog_left.webp, herog_right.webp, media.webp
## Each room folder: assets/images/{room-id}/
## ═══════════════════════════════════════════

## D1. آموزش EDUCATION (amoozesh/)
hero: "Bright kindergarten classroom. Small tables in groups of 4, tiny chairs. Whiteboard with colorful abstract drawings (no text). Bookshelf with picture books. Large windows, sunlight. Reading corner with bean bags and stuffed animals. Sky blue walls, butter yellow accents. Clean, organized. {STYLE}. {FORBIDDEN}. 8K."
hero-v: Same, portrait orientation.
herog: Wide doorway view of entire classroom, all stations visible.
herog_left: Close-up reading corner: bean bags, bookshelf, stuffed owl, soft lamp.
herog_right: Close-up building block station: colorful blocks, shape sorters on low table.
media: Children at table doing craft with crayons, one shows drawing to another.

## D2. بازی GAMES (bazi/)
hero: "Exciting playroom, soft foam rainbow floor. Indoor slide, ball pit (colorful balls), puppet theater corner, building blocks. Bubbles floating. Bright coral/yellow/teal accents. {STYLE}. {FORBIDDEN}. 8K."
hero-v: Same, portrait.
herog: Wide view all play zones.
herog_left: Ball pit close-up: foam pit, colorful balls, climbing wall.
herog_right: Puppet theater: wooden stage, red curtain, animal puppets.
media: Children playing: one slides, one in ball pit, one builds blocks.

## D3. هنر ART (honar/)
hero: "Kindergarten art studio. Easels with paintings, paint palettes, finger paint station, collage materials. Drying rack with artwork. Skylights. Paint splashes on floor (playful). {STYLE}. {FORBIDDEN}. 8K."
hero-v: Same, portrait.
herog: Wide view all art stations.
herog_left: Painting station: easel, canvas, paint cups, smock on hook.
herog_right: Clay table: playdough, cookie cutters, small sculpted animals.
media: Children finger painting, paint on hands, happy expressions.

## D4. مطالعه READING (motaleh/)
hero: "Serene reading nook. U-shaped cushion pit with pillows. Floor-to-ceiling bookshelves with colorful books. Stuffed owl on shelf. Fairy lights. Cozy library feel. Lavender and cream palette. {STYLE}. {FORBIDDEN}. 8K."
hero-v: Same, portrait.
herog: Wide view: cushion pit, window seat, hammock chair, floor cushions.
herog_left: Window seat: cushions, open picture books, stuffed rabbit, sunlight.
herog_right: Bookshelf: rainbow-organized books, step stool, reading lamp.
media: Children on cushions reading picture books, one points at illustrations.

## D5. حیات COURTYARD (hayat/)
hero: "Sunny courtyard garden. Green grass, sunflower/tulip beds, sandbox, wooden play structure with slide, tree with tire swing. Blue sky, clouds, butterflies, birds. {STYLE}. {FORBIDDEN}. 8K."
hero-v: Same, portrait.
herog: Wide aerial: paths, beds, sandbox, play structure, basketball hoop, shaded seating.
herog_left: Sandbox close-up: frame, toys (shovels, buckets), watering can.
herog_right: Tire swing: painted tire from tree, flower beds below, golden light.
media: Children in garden: digging in sandbox, watering flowers, swinging.

## D6. خواب NAP (khab/)
hero: "Peaceful nap room. Small beds with pastel sheets in rows, each with stuffed animal. Soft curtains, sunset light. Constellation projector on ceiling with stars. Dreamy lavender/cream. {STYLE}. {FORBIDDEN}. 8K."
hero-v: Same, portrait.
herog: Wide view: beds in curve, different blankets, sound machine, soft rug.
herog_left: Nap bed: soft sheets, knitted blanket, stuffed bear, warm lamp.
herog_right: Night-light: constellation projector, glow stars on ceiling, lavender.
media: Children napping peacefully, soft blankets, stuffed animals, sunset light.

## D7. سلامت HEALTH (salamat/)
hero: "Bright health room. Small exam couch with animal stickers, growth chart with animal characters, toy medical kit, sink with step stool. Reassuring, clean. Mint green/white. {STYLE}. {FORBIDDEN}. 8K."
hero-v: Same, portrait.
herog: Wide view: exam area, handwashing, first aid, weight scale.
herog_left: Growth chart: animal characters at height levels (bear bottom, giraffe top).
herog_right: Toy medical kit: stethoscope, thermometer, bandages with animals.
media: Nurse measuring child's height, child smiling on growth chart.

## D8. جلسه علیا UPPER HALL (jalase-owlia/)
hero: "Spacious activity hall. Polished wood floor, stage with small curtain, colorful floor mats in rows. Balloons, streamers. Bright coral/gold. {STYLE}. {FORBIDDEN}. 8K."
hero-v: Same, portrait.
herog: Wide view from stage: mats, wall decorations, instrument storage.
herog_left: Musical instruments: small drums, tambourines, maracas, xylophone.
herog_right: Stage: platform, red curtain, child-height mic, painted backdrop.
media: Children on mats watching puppet show on stage, excited faces.

## D9. مرابی MORABI (moraabi/)
hero: "Cozy multipurpose room. Floor cushions, play kitchen corner with toy food, dress-up rack with costumes. Home-like warmth. Coral/cream. {STYLE}. {FORBIDDEN}. 8K."
hero-v: Same, portrait.
herog: Wide view: cushions, kitchen, dress-up, tea party table.
herog_left: Play kitchen: toy stove, pots, play fruits/vegetables, tiny aprons.
herog_right: Dress-up: costumes on rack (princess, superhero, doctor, chef), mirror.
media: Children playing tea party, one pours from teapot, others hold cups.

## D10. استراحت مرابیان REST (esterahat-moraabian/)
hero: "Tranquil quiet room. Soft bean bags pastel, rocking chair, nature sounds machine, plants on windowsill. Sheer curtains diffusing light. Mint/lavender. {STYLE}. {FORBIDDEN}. 8K."
hero-v: Same, portrait.
herog: Wide: bean bags, rocking chair, bookshelf, nature corner, soft rug.
herog_left: Bean bag corner: oversized bags, blanket, stuffed owl, fairy lights.
herog_right: Nature corner: plants, terrarium, nature books, pinecones in basket.
media: Child on bean bag hugging stuffed animal, others reading quietly.

## D11. توانبخشی REHAB (tavanbakhshi/)
hero: "Cheerful therapy/sensory room. Foam obstacles, balance beam, tunnel, therapy ball, sensory wall with textures, weighted blanket corner. Inclusive. Teal/yellow. {STYLE}. {FORBIDDEN}. 8K."
hero-v: Same, portrait.
herog: Wide: obstacle course, sensory wall, quiet corner, soft mats.
herog_left: Sensory wall: bumpy, smooth, fuzzy, crinkly panels at child height.
herog_right: Soft obstacles: foam tunnel, balance beam, stepping stones.
media: Children navigating obstacles: crawling through tunnel, balancing.

## D12. تئوری THEORY (teria/)
hero: "Teacher prep room. Desk with lesson plans, organized supply bins, laminator, curriculum books. Whiteboard with sticky notes (no text). Professional yet warm. Blue/white. {STYLE}. {FORBIDDEN}. 8K."
hero-v: Same, portrait.
herog: Wide: desk, supply storage, whiteboard, meeting table.
herog_left: Supply bins: colorful, organized, art materials.
herog_right: Teacher desk: notebook, markers, plant, children's drawings.
media: Teacher preparing crafts at desk, colorful supplies, warm smile.

## D13. بایگانی ARCHIVE (bayegani/)
hero: "Organized archive/library. Tall wooden shelves, colorful binders by color, rolling ladder. Pendant lamps. Amber/brown palette. {STYLE}. {FORBIDDEN}. 8K."
hero-v: Same, portrait.
herog: Wide: shelving units, sorting desk, tablet catalog area.
herog_left: Shelves: color-gradient binders, step stool, library cart.
herog_right: Sorting desk: papers in trays, stamps, stickers, labels.
media: Librarian organizing colorful folders on shelves, rolling ladder.

## ═══════════════════════════════════════════
## E. MAP/ROOM SELECTOR SCREEN (assets/images/map/)
## ═══════════════════════════════════════════

### bg.webp (1920×1080) — map background
"Warm, illustrated aerial view of a kindergarten campus from above. U-shaped building around garden courtyard. Each wing color-coded: coral (art), yellow (games), blue (reading), green (courtyard), lavender (nap), mint (health). Soft paths connecting wings. Trees and gardens between buildings. Warm afternoon light, long gentle shadows. Illustrated map style, not realistic. Soft watercolor + 3D. No text, no labels, no letters. 8K."

### bg-v.webp (1080×1920) — mobile map
Same aerial view, portrait: building stretching vertically, courtyard centered.

### room-circles-bg.webp (1920×1080) — behind room selector
"Soft blurred background of a kindergarten interior: warm wooden floor, soft carpet, colorful wall decorations out of focus. Bokeh effect with pastel light spots. Dreamy, warm. No text. 8K."

## ═══════════════════════════════════════════
## F. SEARCH SCREEN (assets/images/search/)
## ═══════════════════════════════════════════

### bg.webp (1920×1080)
"Soft, dreamy background for a search page. Blurred kindergarten library scene: rows of colorful books on shelves, warm sunlight through window, soft bokeh lights. Warm cream and gold tones. Minimalist, clean. No text, no letters. 8K."

### bg-v.webp (1080×1920)
Same, portrait: books and light from above, warm gradient toward bottom.

## ═══════════════════════════════════════════
## G. PANEL/USER SCREEN (assets/images/panel/)
## ═══════════════════════════════════════════

### bg.webp (1920×1080)
"Warm, clean background for a user dashboard. Soft watercolor wash in warm cream and peach tones. Subtle pattern of tiny stars, hearts, and circles in pastel colors. Minimal, not distracting. No text. 8K."

### bg-v.webp (1080×1920)
Same, portrait: warm gradient from cream to peach, subtle pattern.

## ═══════════════════════════════════════════
## H. ARCHIVE SCREEN (assets/images/archive/)
## ═══════════════════════════════════════════

### bg.webp (1920×1080)
"Soft background for archive/file browser. Blurred vintage library: wooden shelves, warm lamp light, dust particles in sunbeam. Warm amber tones, dreamy. No text. 8K."

### bg-v.webp (1080×1920)
Same, portrait.

## ═══════════════════════════════════════════
## I. CONTENT SCREEN (assets/images/content/)
## ═══════════════════════════════════════════

### bg.webp (1920×1080)
"Clean, warm background for content display page. Soft watercolor wash: cream center fading to pastel edges. Subtle paper texture. Minimal, allows content to stand out. No text. 8K."

## ═══════════════════════════════════════════
## J. VIRTUAL TOUR UI ELEMENTS
## ═══════════════════════════════════════════

### tour-nav-bg.webp (tileable, 512×512)
"Seamless tileable soft watercolor texture in warm cream with very subtle golden flecks. For virtual tour navigation overlay background. No text. 8K."

## ═══════════════════════════════════════════
## K. MINI PLAYER ICONS
## ═══════════════════════════════════════════

### player-bg.webp (tileable, 256×256)
"Seamless tileable soft watercolor texture in warm white with tiny pastel dots (coral, yellow, blue, mint). For mini player panel background. No text. 8K."

## ═══════════════════════════════════════════
## L. LOBBY SLIDESHOW / FEATURED CONTENT
## ═══════════════════════════════════════════

### featured-1.webp (800×600)
"Happy children painting together at kindergarten art table. Warm, joyful. Soft watercolor + 3D. No text. 8K."

### featured-2.webp (800×600)
"Children building tall tower with colorful blocks in kindergarten playroom. One child places final block, others watch. Soft watercolor. No text. 8K."

### featured-3.webp (800×600)
"Child reading picture book under a tree in kindergarten garden. Sunlight through leaves. Peaceful. Soft watercolor. No text. 8K."

### featured-4.webp (800×600)
"Children doing finger painting, colorful hands held up, laughing. Art room background. Joyful. Soft watercolor. No text. 8K."

### featured-5.webp (800×600)
"Children playing with clay, making animal shapes. Focused, creative. Art room. Soft watercolor. No text. 8K."

### featured-6.webp (800×600)
"Children in costumes doing puppet show on small stage. Audience watching excitedly. Hall background. Soft watercolor. No text. 8K."

## ═══════════════════════════════════════════
## TOTAL COUNT
## ═══════════════════════════════════════════
## Intro: 2
## Plan: 4
## Lobby: 7
## Map: 3
## Search: 2
## Panel: 2
## Archive: 2
## Content: 1
## Tour: 1
## Player: 1
## Featured: 6
## 13 Rooms × 6: 78
## ─────────────
## TOTAL: ~109 images

## ═══════════════════════════════════════════
## GENERATION ORDER (batch by batch)
## ═══════════════════════════════════════════
## Batch 1 (test quality): lobby/hero.webp, bazi/hero.webp, honar/hero.webp
## Batch 2 (all desktop heroes): every hero.webp = 16 images
## Batch 3 (all mobile heroes): every hero-v.webp = 16 images
## Batch 4 (all media): every media.webp = 14 images
## Batch 5 (tour views): herog + left + right = 42 images
## Batch 6 (screens + UI): map, search, panel, archive, content backgrounds + tour/player + featured = 21 images
