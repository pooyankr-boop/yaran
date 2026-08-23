/* ═══════════════════════════════════════════════════════
   Yaran Kindergarten — Telegram Bot (API-backed)
   Full task sync, done/delete, notifications
   ═══════════════════════════════════════════════════════ */
const TelegramBot = require('node-telegram-bot-api');

const PORT = Number(process.env.PORT) || 4000;
const API = process.env.API_URL || `http://127.0.0.1:${PORT}`;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID || '';

let bot = null;
let botRunning = false;

// ── Helpers ──
async function api(method, endpoint, body) {
  const opts = { method, headers: { 'Content-Type': 'application/json' } };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(`${API}${endpoint}`, opts);
  if (!res.ok) throw new Error(`API ${res.status}: ${await res.text()}`);
  return res.json();
}

function notifyChat(text) {
  if (bot && CHAT_ID) bot.sendMessage(CHAT_ID, text).catch(() => {});
}

function isAdmin(chatId) {
  // Accept Telegram chat id or TELEGRAM_ADMIN_ID env
  const admins = (process.env.TELEGRAM_ADMIN_ID || '').split(',').map(s => s.trim()).filter(Boolean);
  return admins.length === 0 || admins.includes(String(chatId));
}

function reply(msg, text) {
  bot.sendMessage(msg.chat.id, text).catch(() => {});
}

// ── /tasks or /list — show open tasks ──
async function handleTasks(msg) {
  try {
    const data = await api('GET', '/api/tasks');
    const tasks = (data.tasks || []).filter(t => t.status !== 'completed');
    if (!tasks.length) return reply(msg, 'هیچ وظیفه بازی نیست');
    const list = tasks.map((t, i) =>
      `${i + 1}. ${t.title} [${(t.id || '').slice(0, 8)}] — ${t.priority || 'medium'}`
    ).join('\n');
    reply(msg, `📋 وظیفه‌های باز:\n${list}`);
  } catch (e) { reply(msg, `خطا: ${e.message}`); }
}

// ── /new <title> — create task ──
async function handleNew(msg) {
  if (!isAdmin(msg.chat.id)) return reply(msg, 'فقط ادمین');
  const title = msg.text.replace(/^\/(?:new|task)\s*/i, '').trim();
  if (!title) return reply(msg, 'استفاده: /new <عنوان وظیفه>');
  try {
    const task = await api('POST', '/api/tasks', {
      title, source: 'telegram', created_by: msg.from?.first_name || 'Telegram',
    });
    const id = (task.id || '').slice(0, 8);
    reply(msg, `✅ وظیفه ایجاد شد: ${title} [${id}]`);
    notifyChat(`📋 وظیفه جدید: ${title}\nشناسه: ${id}`);
  } catch (e) { reply(msg, `خطا: ${e.message}`); }
}

// ── /done <id> — mark complete ──
async function handleDone(msg) {
  if (!isAdmin(msg.chat.id)) return reply(msg, 'فقط ادمین');
  const idPart = msg.text.replace(/^\/done\s*/i, '').trim();
  if (!idPart) return reply(msg, 'استفاده: /done <id>');
  try {
    const data = await api('GET', '/api/tasks');
    const task = (data.tasks || []).find(t => (t.id || '').startsWith(idPart));
    if (!task) return reply(msg, `وظیفه‌ای با id "${idPart}" یافت نشد`);
    await api('PATCH', `/api/tasks/${task.id}`, { status: 'completed' });
    reply(msg, `✅ انجام شد: ${task.title}`);
    notifyChat(`✅ انجام شد: ${task.title}`);
  } catch (e) { reply(msg, `خطا: ${e.message}`); }
}

// ── /delete <id> — delete task ──
async function handleDelete(msg) {
  if (!isAdmin(msg.chat.id)) return reply(msg, 'فقط ادمین');
  const idPart = msg.text.replace(/^\/delete\s*/i, '').trim();
  if (!idPart) return reply(msg, 'استفاده: /delete <id>');
  try {
    const data = await api('GET', '/api/tasks');
    const task = (data.tasks || []).find(t => (t.id || '').startsWith(idPart));
    if (!task) return reply(msg, `وظیفه‌ای با id "${idPart}" یافت نشد`);
    await api('DELETE', `/api/tasks/${task.id}`);
    reply(msg, `🗑 حذف شد: ${task.title}`);
  } catch (e) { reply(msg, `خطا: ${e.message}`); }
}

// ── /report <text> — add report ──
async function handleReport(msg) {
  if (!isAdmin(msg.chat.id)) return reply(msg, 'فقط ادمین');
  const text = msg.text.replace(/^\/report\s*/i, '').trim();
  if (!text) return reply(msg, 'استفاده: /report <متن گزارش>');
  try {
    await api('POST', '/api/reports', {
      note: text.substring(0, 500), mood: '', food: '', sleep: '',
      childName: msg.from?.first_name || 'ناشناس', fromBot: true,
    });
    reply(msg, '📝 گزارش ثبت شد');
  } catch (e) { reply(msg, `خطا: ${e.message}`); }
}

// ── /note <text> — add note ──
async function handleNote(msg) {
  if (!isAdmin(msg.chat.id)) return reply(msg, 'فقط ادمین');
  const text = msg.text.replace(/^\/note\s*/i, '').trim();
  if (!text) return reply(msg, 'استفاده: /note <متن یادداشت>');
  try {
    await api('POST', '/api/messages', {
      text: text.substring(0, 1000), author: msg.from?.first_name || 'Telegram',
    });
    reply(msg, '📝 یادداشت ثبت شد');
  } catch (e) { reply(msg, `خطا: ${e.message}`); }
}

// ── /status — summary ──
async function handleStatus(msg) {
  if (!isAdmin(msg.chat.id)) return reply(msg, 'فقط ادمین');
  try {
    const [tasksData, reportsData] = await Promise.all([
      api('GET', '/api/tasks'),
      api('GET', '/api/reports'),
    ]);
    const tasks = tasksData.tasks || [];
    const open = tasks.filter(t => t.status !== 'completed').length;
    const doneToday = tasks.filter(t =>
      t.status === 'completed' &&
      t.completed_at && t.completed_at.startsWith(new Date().toISOString().slice(0, 10))
    ).length;
    const reports = (reportsData.reports || []).length;
    reply(msg,
      `📊 داشبورد یاران\n\n` +
      `وظیفه‌ها: ${open} باز / ${doneToday} انجام‌شده امروز\n` +
      `گزارش‌ها: ${reports}`
    );
  } catch (e) { reply(msg, `خطا: ${e.message}`); }
}

// ── /help ──
function handleHelp(msg) {
  reply(msg,
    `🤖 دستورات ربات یاران:\n\n` +
    `/new <عنوان> — ایجاد وظیفه جدید\n` +
    `/tasks — لیست وظیفه‌های باز\n` +
    `/done <id> — اتمام وظیفه\n` +
    `/delete <id> — حذف وظیفه\n` +
    `/report <متن> — ثبت گزارش\n` +
    `/note <متن> — ثبت یادداشت\n` +
    `/status — خلاصه وضعیت`
  );
}

// ── API integration hooks (called by server) ──
function onTaskCreated(task) {
  notifyChat(`📋 وظیفه جدید: ${task.title}\nشناسه: ${(task.id || '').slice(0, 8)}`);
}
function onTaskUpdated(task) {
  if (task.status === 'completed') notifyChat(`✅ انجام شد: ${task.title}`);
}

// ── Init ──
function initBot() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    console.log('⚠️  TELEGRAM_BOT_TOKEN تنظیم نشده — ربات غیرفعال');
    return null;
  }
  bot = new TelegramBot(token, { polling: true });

  bot.onText(/^\/(tasks|list)$/i, handleTasks);
  bot.onText(/^\/(new|task)\s+/i, handleNew);
  bot.onText(/^\/done\s+/i, handleDone);
  bot.onText(/^\/delete\s+/i, handleDelete);
  bot.onText(/^\/report\s+/i, handleReport);
  bot.onText(/^\/note\s+/i, handleNote);
  bot.onText(/^\/status$/i, handleStatus);
  bot.onText(/^\/help$/i, handleHelp);

  bot.on('polling_error', (err) => {
    console.error('⚠️  Telegram polling error:', err.message);
  });

  botRunning = true;
  console.log('🤖 ربات تلگرام فعال شد (polling)');
  if (!CHAT_ID) console.log('⚠️  TELEGRAM_CHAT_ID تنظیم نشده — اعلان‌ها غیرفعال');
  return bot;
}

function stopBot() {
  if (bot) {
    bot.stopPolling();
    botRunning = false;
    bot = null;
    console.log('🤖 ربات تلگرام متوقف شد');
  }
}

function getBotStatus() {
  return { running: botRunning, hasToken: !!bot, chatId: !!CHAT_ID };
}

module.exports = { initBot, stopBot, getBotStatus, onTaskCreated, onTaskUpdated };
