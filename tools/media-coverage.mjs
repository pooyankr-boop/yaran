#!/usr/bin/env node
/* گزارش پوشش رسانه: کدام نماهای موردنیاز سایت هنوز روی دیسک نیستند؟ */
import fs from "node:fs";
import path from "node:path";
const ROOT = process.cwd();
const ROOMS = ["amoozesh","bazi","honar","motaleh","salamat","khab","moraabi","esterahat-moraabian","jalase-owlia","bayegani","teria","hayat","tavanbakhshi"];
const VIEWS = ["hero","hero-v","herog","herog_left","herog_right","media"];
function existsAny(base) {
  return ["webp","jpeg","jpg","png"].some(ext => fs.existsSync(path.join(ROOT, base + "." + ext)));
}
let missing = [], total = 0;
for (const r of ROOMS) for (const v of VIEWS) {
  total++;
  if (!existsAny(`assets/images/${r}/${v}`)) missing.push(`${r}-${v}`);
}
for (const v of VIEWS) {
  total++;
  if (!existsAny(`assets/images/lobby/${v}`)) missing.push(`lobby-${v}`);
}
[["plan/hero"],["plan/hero-v"],["plan/plan2"],["plan/plan2-v"]].forEach(([p]) => {
  total++;
  if (!existsAny("assets/images/" + p)) missing.push(p.replace("/", "-"));
});
[["screens/bg-search"],["screens/bg-panel"],["screens/bg-archive"]].forEach(([p]) => {
  total++;
  if (!existsAny("assets/images/" + p)) missing.push(p.split("/")[1]);
});
["ui/mascot-bear","ui/badge-star","ui/prop-balloon","ui/prop-blocks","ui/frame-paper"].forEach((p) => {
  total++;
  if (!existsAny("assets/" + p)) missing.push("ui-" + p.split("/")[1]);
});
total++;
if (!existsAny("assets/video/intro-video")) missing.push("intro-video");

console.log(`پوشش: ${total - missing.length} از ${total}`);
if (missing.length) {
  console.log("❌ غایب‌ها:");
  missing.forEach(m => console.log("   - " + m));
} else {
  console.log("✅ هیچ چیز کم نیست!");
}
