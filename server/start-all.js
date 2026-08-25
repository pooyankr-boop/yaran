/* ══════════════════════════════════════════════════════════════
   Render/هاست رایگان: یک پروسه → سرور API + ربات تلگرام
   هر دو را همزمان اجرا میکند (Render free = 1 instance)
   ══════════════════════════════════════════════════════════════ */
const { spawn, execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const botDir = path.join(__dirname, '..', 'telegram-bot');

// Render فقط server/ را npm install میکند — ربات را هم نصب کن
if (!fs.existsSync(path.join(botDir, 'node_modules'))) {
  console.log('[start-all] installing telegram-bot deps...');
  try {
    execSync('npm install --omit=dev', { cwd: botDir, stdio: 'inherit' });
  } catch (e) {
    console.error('[start-all] bot install failed:', e.message);
    process.exit(1);
  }
}

const server = spawn(process.execPath, [path.join(__dirname, 'index.js')], { stdio: 'inherit' });
const botEnv = {
  ...process.env,
  SERVER_URL: process.env.SERVER_URL || `http://localhost:${process.env.PORT || 4000}`,
  WS_URL: process.env.WS_URL || `ws://localhost:${process.env.PORT || 4000}/ws`,
};

let bot = null;
function startBot() {
  bot = spawn(process.execPath, [path.join(botDir, 'bot.js')], { stdio: 'inherit', cwd: botDir, env: botEnv });
  bot.on('exit', (code) => {
    console.log('[start-all] bot exited', code);
    // ربات standalone restart میشود — سرور نمیمیرد
    setTimeout(startBot, 5000);
  });
}
startBot();

function killAll() {
  server.kill();
  if (bot) bot.kill();
  process.exit(0);
}
process.on('SIGTERM', killAll);
process.on('SIGINT', killAll);

server.on('exit', (code) => { console.log('[start-all] server exited', code); process.exit(code || 1); });
