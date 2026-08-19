/* ══════════════════════════════════════════════════════════════
   Render/هاست رایگان: یک پروسه → سرور API + ربات تلگرام
   هر دو را همزمان اجرا میکند (Render free = 1 instance)
   ══════════════════════════════════════════════════════════════ */
const { spawn } = require('child_process');
const path = require('path');

const server = spawn(process.execPath, [path.join(__dirname, 'index.js')], { stdio: 'inherit' });
const botDir = path.join(__dirname, '..', 'telegram-bot');
const bot = spawn(process.execPath, [path.join(botDir, 'bot.js')], { stdio: 'inherit', cwd: botDir });

function killAll() {
  server.kill();
  bot.kill();
  process.exit(0);
}
process.on('SIGTERM', killAll);
process.on('SIGINT', killAll);

server.on('exit', (code) => { console.log('[start-all] server exited', code); if (code) process.exit(code); });
bot.on('exit', (code) => { console.log('[start-all] bot exited', code); if (code) process.exit(code); });
