/* ---------- موتور بازی تعاملی — فاز ۵ ---------- */

let gameScore = 0;
let gameOnWin = null;

function openGameModal(item) {
  const modal = document.getElementById("game-modal");
  const header = document.getElementById("game-header");
  const body = document.getElementById("game-body");
  header.innerHTML = "🎮 " + item.title;
  gameScore = 0;
  const gameId = item.game;
  const runner = GAMES[gameId];
  if (!runner) {
    body.innerHTML = '<div style="text-align:center;padding:2rem;">این بازی هنوز آماده نیست 🙂</div>';
  } else {
    runner(body, item);
  }
  modal.classList.remove("hidden");
  modal.classList.add("active");
}

document.getElementById("game-close").addEventListener("click", () => {
  document.getElementById("game-modal").classList.remove("active");
  document.getElementById("game-modal").classList.add("hidden");
});

function gameWinBanner(body, message, onReplay) {
  const banner = document.createElement("div");
  banner.className = "game-win-banner";
  banner.innerHTML =
    '<div class="gwb-emoji">🎉</div><div class="gwb-text">' + message + '</div>' +
    '<button class="btn" id="game-replay-btn">دوباره بازی کن</button>';
  body.appendChild(banner);
  document.getElementById("game-replay-btn").addEventListener("click", onReplay);
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ========== ۱) رنگ‌یابی — color-hunt ========== */
function gameColorHunt(body) {
  const COLORS = [
    { name: "قرمز", hex: "#e74c3c" }, { name: "آبی", hex: "#3498db" },
    { name: "زرد", hex: "#f1c40f" }, { name: "سبز", hex: "#2ecc71" },
    { name: "بنفش", hex: "#9b59b6" }, { name: "نارنجی", hex: "#e67e22" },
  ];
  let round = 0, score = 0;
  const totalRounds = 6;

  function nextRound() {
    body.innerHTML = "";
    if (round >= totalRounds) {
      const wrap = document.createElement("div");
      body.appendChild(wrap);
      gameWinBanner(wrap, "امتیاز تو: " + score + " از " + totalRounds, () => { round = 0; score = 0; nextRound(); });
      return;
    }
    round++;
    const options = shuffle(COLORS).slice(0, 4);
    const target = options[Math.floor(Math.random() * options.length)];
    const info = document.createElement("div");
    info.className = "game-info";
    info.innerHTML = "دور " + round + " از " + totalRounds + " — امتیاز: " + score + '<h3 style="margin-top:.5rem;">رنگ «' + target.name + '» را پیدا کن!</h3>';
    body.appendChild(info);

    const grid = document.createElement("div");
    grid.className = "game-color-grid";
    shuffle(options).forEach(c => {
      const btn = document.createElement("button");
      btn.className = "color-swatch";
      btn.style.background = c.hex;
      btn.addEventListener("click", () => {
        if (c.name === target.name) { score++; btn.classList.add("correct"); }
        else btn.classList.add("wrong");
        setTimeout(nextRound, 500);
      });
      grid.appendChild(btn);
    });
    body.appendChild(grid);
  }
  nextRound();
}

/* ========== ۲) دسته‌بندی اشکال — shape-sorter ========== */
function gameShapeSorter(body) {
  const SHAPES = [
    { name: "دایره", emoji: "⚪" }, { name: "مربع", emoji: "🟪" },
    { name: "مثلث", emoji: "🔺" }, { name: "ستاره", emoji: "⭐" },
    { name: "قلب", emoji: "❤️" }, { name: "الماس", emoji: "🔷" },
  ];
  let round = 0, score = 0;
  const totalRounds = 6;

  function nextRound() {
    body.innerHTML = "";
    if (round >= totalRounds) {
      const wrap = document.createElement("div");
      body.appendChild(wrap);
      gameWinBanner(wrap, "امتیاز تو: " + score + " از " + totalRounds, () => { round = 0; score = 0; nextRound(); });
      return;
    }
    round++;
    const target = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    const options = shuffle([target, ...shuffle(SHAPES.filter(s => s !== target)).slice(0, 3)]);
    const info = document.createElement("div");
    info.className = "game-info";
    info.innerHTML = "دور " + round + " از " + totalRounds + " — امتیاز: " + score +
      '<h3 style="margin-top:.5rem;">شکلِ ' + target.emoji + ' چه اسمی داره؟</h3>';
    body.appendChild(info);
    const grid = document.createElement("div");
    grid.className = "game-shape-grid";
    options.forEach(s => {
      const btn = document.createElement("button");
      btn.className = "shape-option";
      btn.textContent = s.name;
      btn.addEventListener("click", () => {
        if (s.name === target.name) { score++; btn.classList.add("correct"); }
        else btn.classList.add("wrong");
        setTimeout(nextRound, 500);
      });
      grid.appendChild(btn);
    });
    body.appendChild(grid);
  }
  nextRound();
}

/* ========== ۳) پازل کشویی — puzzle (اسلایدر ۳×۳ عددی) ========== */
function gamePuzzle(body) {
  const SIZE = 3;
  let tiles = shuffle([...Array(SIZE * SIZE - 1).keys()].map(n => n + 1).concat([null]));

  function isSolved() {
    return tiles.every((v, i) => (i === tiles.length - 1 ? v === null : v === i + 1));
  }

  function render() {
    body.innerHTML = "";
    const info = document.createElement("div");
    info.className = "game-info";
    info.innerHTML = '<h3>عددها را به ترتیب ۱ تا ۸ بچین!</h3>';
    body.appendChild(info);
    const grid = document.createElement("div");
    grid.className = "puzzle-grid";
    tiles.forEach((v, i) => {
      const cell = document.createElement("div");
      cell.className = "puzzle-tile" + (v === null ? " empty" : "");
      cell.textContent = v || "";
      cell.addEventListener("click", () => trySwap(i));
      grid.appendChild(cell);
    });
    body.appendChild(grid);
    if (isSolved()) {
      const wrap = document.createElement("div");
      body.appendChild(wrap);
      gameWinBanner(wrap, "پازل رو حل کردی! آفرین 👏", () => { tiles = shuffle(tiles); render(); });
    }
  }

  function trySwap(i) {
    const emptyIdx = tiles.indexOf(null);
    const row = Math.floor(i / SIZE), col = i % SIZE;
    const eRow = Math.floor(emptyIdx / SIZE), eCol = emptyIdx % SIZE;
    const adjacent = (Math.abs(row - eRow) + Math.abs(col - eCol)) === 1;
    if (!adjacent) return;
    [tiles[i], tiles[emptyIdx]] = [tiles[emptyIdx], tiles[i]];
    render();
  }
  render();
}

/* ========== ۴) الگویابی — pattern ========== */
function gamePattern(body) {
  const ICONS = ["🔴", "🔵", "🟡", "🟢"];
  let round = 0, score = 0;
  const totalRounds = 6;

  function nextRound() {
    body.innerHTML = "";
    if (round >= totalRounds) {
      const wrap = document.createElement("div");
      body.appendChild(wrap);
      gameWinBanner(wrap, "امتیاز تو: " + score + " از " + totalRounds, () => { round = 0; score = 0; nextRound(); });
      return;
    }
    round++;
    const a = ICONS[Math.floor(Math.random() * ICONS.length)];
    const b = ICONS.filter(x => x !== a)[Math.floor(Math.random() * (ICONS.length - 1))];
    const sequence = [a, b, a, b, a];
    const correctNext = b;
    const options = shuffle([correctNext, ...shuffle(ICONS.filter(x => x !== correctNext)).slice(0, 2)]);

    const info = document.createElement("div");
    info.className = "game-info";
    info.innerHTML = "دور " + round + " از " + totalRounds + " — امتیاز: " + score +
      '<h3 style="margin-top:.5rem;">دنبالهٔ بعدی چیه؟</h3>' +
      "<div class=\"pattern-sequence\">" + sequence.join(" ") + ' <span class="ps-q">?</span></div>';
    body.appendChild(info);

    const grid = document.createElement("div");
    grid.className = "game-shape-grid";
    options.forEach(icon => {
      const btn = document.createElement("button");
      btn.className = "shape-option";
      btn.style.fontSize = "1.8rem";
      btn.textContent = icon;
      btn.addEventListener("click", () => {
        if (icon === correctNext) { score++; btn.classList.add("correct"); }
        else btn.classList.add("wrong");
        setTimeout(nextRound, 500);
      });
      grid.appendChild(btn);
    });
    body.appendChild(grid);
  }
  nextRound();
}

/* ========== ۵) حافظه — memory-match ========== */
function gameMemoryMatch(body) {
  const EMOJIS = ["🐶", "🐱", "🐰", "🐻", "🦁", "🐸"];
  const cards = shuffle([...EMOJIS, ...EMOJIS]).map((e, i) => ({ id: i, emoji: e, open: false, matched: false }));
  let firstPick = null, lock = false, moves = 0;

  function render() {
    body.innerHTML = "";
    const info = document.createElement("div");
    info.className = "game-info";
    info.innerHTML = "حرکت‌ها: " + moves;
    body.appendChild(info);
    const grid = document.createElement("div");
    grid.className = "memory-grid";
    cards.forEach(card => {
      const cell = document.createElement("div");
      cell.className = "memory-card" + (card.open || card.matched ? " open" : "") + (card.matched ? " matched" : "");
      cell.textContent = (card.open || card.matched) ? card.emoji : "❔";
      cell.addEventListener("click", () => pick(card));
      grid.appendChild(cell);
    });
    body.appendChild(grid);
    if (cards.every(c => c.matched)) {
      const wrap = document.createElement("div");
      body.appendChild(wrap);
      gameWinBanner(wrap, "با " + moves + " حرکت همه‌ی جفت‌ها رو پیدا کردی! 🧠", resetGame);
    }
  }

  function pick(card) {
    if (lock || card.open || card.matched) return;
    card.open = true;
    if (!firstPick) { firstPick = card; render(); return; }
    moves++;
    if (firstPick.emoji === card.emoji) {
      firstPick.matched = true; card.matched = true;
      firstPick = null; render();
    } else {
      lock = true; render();
      setTimeout(() => { firstPick.open = false; card.open = false; firstPick = null; lock = false; render(); }, 700);
    }
  }

  function resetGame() {
    cards.forEach(c => { c.open = false; c.matched = false; });
    const reshuffled = shuffle(cards.map(c => c.emoji));
    cards.forEach((c, i) => c.emoji = reshuffled[i]);
    moves = 0; firstPick = null; lock = false;
    render();
  }
  render();
}

/* ========== ۶) حدس صدا — sound-guess (بدون فایل صوتی، بر پایه‌ی توصیف متنی) ========== */
function gameSoundGuess(body) {
  const ITEMS = [
    { animal: "سگ", emoji: "🐶", sound: "«واق واق»" },
    { animal: "گربه", emoji: "🐱", sound: "«میومیو»" },
    { animal: "گاو", emoji: "🐮", sound: "«ماغ ماغ»" },
    { animal: "خروس", emoji: "🐓", sound: "«قوقولی‌قوقو»" },
    { animal: "گوسفند", emoji: "🐑", sound: "«بع بع»" },
    { animal: "اردک", emoji: "🦆", sound: "«کوآک کوآک»" },
  ];
  let round = 0, score = 0;
  const totalRounds = 6;

  function nextRound() {
    body.innerHTML = "";
    if (round >= totalRounds) {
      const wrap = document.createElement("div");
      body.appendChild(wrap);
      gameWinBanner(wrap, "امتیاز تو: " + score + " از " + totalRounds, () => { round = 0; score = 0; nextRound(); });
      return;
    }
    round++;
    const target = ITEMS[Math.floor(Math.random() * ITEMS.length)];
    const options = shuffle([target, ...shuffle(ITEMS.filter(x => x !== target)).slice(0, 3)]);

    const info = document.createElement("div");
    info.className = "game-info";
    info.innerHTML = "دور " + round + " از " + totalRounds + " — امتیاز: " + score +
      '<h3 style="margin-top:.5rem;">این صدا رو کدوم حیوون درمیاره؟</h3>' +
      '<div class="pattern-sequence" style="font-size:1.4rem;">' + target.sound + '</div>';
    body.appendChild(info);

    const grid = document.createElement("div");
    grid.className = "game-shape-grid";
    options.forEach(it => {
      const btn = document.createElement("button");
      btn.className = "shape-option";
      btn.innerHTML = it.emoji + "<br>" + it.animal;
      btn.addEventListener("click", () => {
        if (it.animal === target.animal) { score++; btn.classList.add("correct"); }
        else btn.classList.add("wrong");
        setTimeout(nextRound, 500);
      });
      grid.appendChild(btn);
    });
    body.appendChild(grid);
  }
  nextRound();
}

const GAMES = {
  "color-hunt": gameColorHunt,
  "shape-sorter": gameShapeSorter,
  "puzzle": gamePuzzle,
  "pattern": gamePattern,
  "memory-match": gameMemoryMatch,
  "sound-guess": gameSoundGuess,
};

// ادغام ۱۵ بازی اضافه از games2.js (در صورت لود شدن) در همون رجیستری مشترک GAMES
const GAME_LABELS = {
  "color-hunt": "🎨 رنگ‌یابی", "shape-sorter": "🔷 دسته‌بندی اشکال", "puzzle": "🧩 پازل کشویی",
  "pattern": "🔴 الگویابی", "memory-match": "🧠 حافظه", "sound-guess": "🐶 حدس صدا",
};
if (typeof Games2 !== "undefined") {
  Games2.list().forEach(id => {
    GAMES[id] = (body) => Games2.start(id, body);
  });
  const G2_LABELS = {
    "balloon-pop": "🎈 ترکاندن بادکنک", "drawing": "🖍️ نقاشی", "catch-fish": "🐟 گرفتن ماهی",
    "maze": "🌀 هزارتو", "quiz": "❓ مسابقه‌ی دانستنی", "sorting": "🔴 دسته‌بندی رنگ",
    "memory2": "🃏 حافظه‌ی بزرگ", "dot-connect": "🔢 نقطه به نقطه", "bingo": "🎱 بینگو",
    "rhythm": "🎵 ریتم و رنگ", "word-search": "🔤 کلمات مخفی", "pattern-match": "🍎 الگوی میوه",
    "story-builder": "📖 چیدن داستان", "magnet-fish": "🧲 ماهی‌گیری", "domino": "🁣 دومینو",
  };
  Object.assign(GAME_LABELS, G2_LABELS);
}

/* پیکر «بازی‌های بیشتر»: انتخابگر تمام بازی‌های موجود (اصلی + games2) */
function openGamePicker() {
  const modal = document.getElementById("game-modal");
  const header = document.getElementById("game-header");
  const body = document.getElementById("game-body");
  header.innerHTML = "🎮 همه‌ی بازی‌ها";
  body.innerHTML = '<div class="game-picker-grid"></div>';
  const grid = body.querySelector(".game-picker-grid");
  Object.keys(GAMES).forEach(id => {
    const btn = document.createElement("button");
    btn.className = "game-picker-item";
    btn.textContent = GAME_LABELS[id] || id;
    btn.addEventListener("click", () => {
      header.innerHTML = "🎮 " + (GAME_LABELS[id] || id);
      body.innerHTML = "";
      GAMES[id](body);
    });
    grid.appendChild(btn);
  });
  modal.classList.remove("hidden");
  modal.classList.add("active");
}
