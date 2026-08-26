#!/usr/bin/env node
/*
  یاران — ابزار یکپارچه‌سازی رسانه‌ی تولیدشده
  ────────────────────────────────────────────
  ۱) فایل‌های تصویری/ویدیویی داخل assets/_inbox/ را می‌خواند
  ۲) با الگوی نام‌گذاری «<folder>-<view>.ext» مسیر مقصد را تشخیص می‌دهد
  ۳) کپی به مقصد + به‌روزرسانی assets/images/manifest.json
  ۴) فایل‌های پردازش‌شده را به _inbox/_done منتقل می‌کند

  استفاده:
    node tools/integrate-media.mjs            # پردازش صندوق ورودی
    node tools/integrate-media.mjs --scan     # فقط گزارش، بدون تغییر
*/
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const INBOX = path.join(ROOT, "assets", "_inbox");
const DONE = path.join(INBOX, "_done");
const IMG = path.join(ROOT, "assets", "images");
const MANIFEST = path.join(IMG, "manifest.json");

const ROOM_FOLDERS = [
  "amoozesh", "bazi", "honar", "motaleh", "salamat", "khab",
  "moraabi", "esterahat-moraabian", "jalase-owlia", "bayegani",
  "teria", "hayat", "tavanbakhshi"
];
// نگاری ویژه: maddakari → tavanbakhshi (پوشه واقعی)
const FOLDER_ALIAS = { maddakari: "tavanbakhshi" };
const VIEWS = ["hero-v", "herog_left", "herog_right", "herog", "media", "hero"]; // ترتیب مهم: طولانی‌تر اول
// کلیدها بعد از نرمال‌سازی نام فایل (زیرخط → خط‌تیره) مقایسه می‌شوند
const norm = (s) => s.toLowerCase().replace(/[_]+/g, "-");

const SPECIAL = {
  // id (بدون پسوند، نرمال‌شده) → مسیر نسبی از ریشه پروژه
  "plan-hero": "assets/images/plan/hero",
  "plan-hero-v": "assets/images/plan/hero-v",
  "plan-plan2": "assets/images/plan/plan2",
  "plan-plan2-v": "assets/images/plan/plan2-v",
  "intro-video": "assets/video/intro-video",
  "ui-mascot-bear": "assets/ui/mascot-bear",
  "ui-badge-star": "assets/ui/badge-star",
  "ui-prop-balloon": "assets/ui/prop-balloon",
  "ui-prop-blocks": "assets/ui/prop-blocks",
  "ui-frame-paper": "assets/ui/frame-paper",
  "bg-search": "assets/images/screens/bg-search",
  "bg-panel": "assets/images/screens/bg-panel",
  "bg-archive": "assets/images/screens/bg-archive"
};
["lobby"].concat(ROOM_FOLDERS.map(f => FOLDER_ALIAS[f] || f)).forEach(folder => {
  VIEWS.forEach(v => {
    const origFolder = Object.keys(FOLDER_ALIAS).find(k => FOLDER_ALIAS[k] === folder) || folder;
    SPECIAL[norm(`${origFolder}-${v}`)] = `assets/images/${folder}/${v}`;
  });
});

const scanMode = process.argv.includes("--scan");
if (!fs.existsSync(INBOX)) fs.mkdirSync(INBOX, { recursive: true });
if (!scanMode && !fs.existsSync(DONE)) fs.mkdirSync(DONE, { recursive: true });

function walk(dir) {
  let out = [];
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    if (f.name === "_done" || f.name === "_duplicates" || f.name.startsWith(".")) continue;
    const p = path.join(dir, f.name);
    if (f.isDirectory()) out = out.concat(walk(p));
    else out.push(p);
  }
  return out;
}

function resolveTarget(file) {
  const ext = path.extname(file).toLowerCase();
  if (![".png", ".jpg", ".jpeg", ".webp", ".gif", ".mp4", ".webm", ".mov"].includes(ext)) return null;
  let base = path.basename(file, path.extname(file)).toLowerCase().trim();
  base = base.replace(/\s+/g, "-").replace(/[_]+/g, "-");
  // حذف پسوندهای رایج تولیدکننده‌ها (Gemini: _2K_202608261535 و مانند آن)
  base = base.replace(/-2k-\d{6,}/gi, "");
  base = base.replace(/-(copy|final|v\d+|gemini|\d{3,4}x\d{3,4}|\d{10,})$/i, "");
  const targetBase = SPECIAL[base];
  if (!targetBase) return null;
  return targetBase + ext;
}

function loadManifest() {
  try { return JSON.parse(fs.readFileSync(MANIFEST, "utf8")); }
  catch { return {}; }
}
function saveManifest(m) {
  fs.mkdirSync(IMG, { recursive: true });
  fs.writeFileSync(MANIFEST, JSON.stringify(m, null, 2), "utf8");
}

/* اسکن کل پوشه تصاویر برای مانیفست: هر نام کانونی که فقط با فرمت دیگری موجود است نگاشت می‌شود */
const STEMS_BY_DIR = {
  plan: ["hero", "hero-v", "plan2", "plan2-v"],
  screens: ["bg-search", "bg-panel", "bg-archive"]
};
function stemsFor(dirName) {
  return STEMS_BY_DIR[dirName] || VIEWS;
}
const EXT_PRIO = { ".webp": 4, ".avif": 3, ".jpeg": 2, ".jpg": 2, ".png": 1 };
function rebuildManifest() {
  const old = loadManifest();
  const manifest = {};
  function walkImg(dir) {
    if (!fs.existsSync(dir)) return;
    for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, f.name);
      if (f.isDirectory()) { walkImg(p); continue; }
      const ext = path.extname(f.name).toLowerCase();
      if (!EXT_PRIO[ext]) continue;
      const rel = path.relative(ROOT, p).split(path.sep).join("/");
      const dirName = path.basename(path.dirname(p));
      const stem = f.name.slice(0, -ext.length).toLowerCase();
      if (!stemsFor(dirName).includes(stem)) continue;
      const key = `assets/images/${dirName}/${stem}.webp`;
      if (rel === key) continue; // خودِ وب‌پی کانونی — نیازی به نگاشت نیست
      const prio = EXT_PRIO[ext];
      if (!manifest[key] || prio > manifest[key].__prio) manifest[key] = { rel, __prio: prio };
    }
  }
  walkImg(IMG);
  // حذف پرچم داخلی و خروجی نهایی
  const out = {};
  if (old && old.__v) out.__v = old.__v;
  for (const [k, v] of Object.entries(manifest)) out[k] = v.rel;
  saveManifest(out);
}

const files = walk(INBOX);
let moved = 0, skipped = [];
for (const file of files) {
  const target = resolveTarget(file);
  if (!target) { skipped.push(path.relative(INBOX, file)); continue; }
  const absTarget = path.join(ROOT, target);
  console.log(`✓ ${path.relative(INBOX, file)}  →  ${target}`);
  if (!scanMode) {
    fs.mkdirSync(path.dirname(absTarget), { recursive: true });
    fs.copyFileSync(file, absTarget);
    const donePath = path.join(DONE, path.basename(file));
    fs.renameSync(file, donePath);
    moved++;
  }
}
if (!scanMode) rebuildManifest();

console.log("");
console.log(scanMode ? `🔎 scan: ${files.length - skipped.length} قابل نگاشت، ${skipped.length} ناشناخته`
  : `📦 ${moved} فایل جایگذاری شد.`);
if (skipped.length) {
  console.log("⚠️  این فایل‌ها شناخته نشدند (نام‌شان را با الگوی «<اتاق>-<نما>» بسازید):");
  skipped.slice(0, 20).forEach(s => console.log("   - " + s));
}
if (!scanMode) console.log("\n✅ مانیفست به‌روز شد. صفحه را رفرش کنید؛ بدون تغییر کد اعمال می‌شود.");
