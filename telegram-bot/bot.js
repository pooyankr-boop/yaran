"use strict";
// ═══════════════════════════════════════════════════════
//  Yaran Bot v3 — Sync دوطرفه: وظایف، یادداشت، پیام
//  DM + گروه | همگام‌سازی زنده با سرور
// ═══════════════════════════════════════════════════════

require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');
const { HttpsProxyAgent } = require('https-proxy-agent');
const express = require('express');
const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');

// ── Config ──
const BOT_TOKEN = process.env.BOT_TOKEN;
const GROUP_ID = process.env.GROUP_ID || '-1003717678648';
const ADMIN_IDS = (process.env.ADMIN_ID || '').split(',').map(s => parseInt(s.trim())).filter(Boolean);
const PORT = Number(process.env.BOT_PORT) || 3000;
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:4000';
const WS_URL = process.env.WS_URL || 'ws://localhost:4000/ws';
const PROXY_URL = process.env.PROXY_URL || null;

const bot = PROXY_URL
  ? new Telegraf(BOT_TOKEN, { telegram: { agent: new HttpsProxyAgent(PROXY_URL) } })
  : new Telegraf(BOT_TOKEN);

if (!BOT_TOKEN) { console.error('❌ BOT_TOKEN required'); process.exit(1); }

// ── Session ──
const chatSessions = new Map();
bot.use((ctx, next) => {
  const key = String(ctx.chat?.id || ctx.from?.id || 'default');
  if (!chatSessions.has(key)) chatSessions.set(key, {});
  ctx.session = chatSessions.get(key);
  return next();
});

// ── Data ──
const DATA_DIR = path.join(__dirname, 'data');
const TASKS_PATH = path.join(DATA_DIR, 'tasks.json');
const NOTES_PATH = path.join(DATA_DIR, 'notes.json');
const MESSAGES_PATH = path.join(DATA_DIR, 'messages.json');

const loadData = (file, def = []) => { try { if (fs.existsSync(file)) return JSON.parse(fs.readFileSync(file, 'utf8')); } catch {} return def; };
const saveData = (file, data) => { try { fs.mkdirSync(DATA_DIR, { recursive: true }); fs.writeFileSync(file, JSON.stringify(data, null, 2)); } catch {} };

let tasks = loadData(TASKS_PATH, []);
let notes = loadData(NOTES_PATH, []);
let messages = loadData(MESSAGES_PATH, []);

// ── Server API helpers ──
async function api(method, path, body) {
  try {
    const opts = { method, headers: { 'Content-Type': 'application/json' } };
    if (body) opts.body = JSON.stringify(body);
    const res = await fetch(`${SERVER_URL}${path}`, opts);
    if (!res.ok) return null;
    return await res.json();
  } catch (e) { console.error(`❌ API ${method} ${path}:`, e.message); return null; }
}
async function serverGetTasks() { return (await api('GET', '/api/tasks'))?.tasks || null; }
async function serverGetNotes() { return (await api('GET', '/api/notes'))?.notes || null; }
async function serverGetMessages() { return (await api('GET', '/api/messages'))?.messages || null; }

// ── WebSocket: live sync ──
function connectWS() {
  try {
    const ws = new WebSocket(WS_URL);
    ws.on('open', () => console.log('✅ WS connected'));
    ws.on('error', (e) => console.error('❌ WS error:', e.message));
    ws.on('message', (msg) => {
      try {
        const data = JSON.parse(msg);
        if (data.type === 'task_update') {
          const t = data.task;
          if (t._deleted) tasks = tasks.filter(x => x.id !== t.id);
          else { const idx = tasks.findIndex(x => x.id === t.id); if (idx === -1) tasks.push(t); else tasks[idx] = t; }
          saveData(TASKS_PATH, tasks);
        }
        if (data.type === 'note_update') {
          const n = data.note;
          if (n._deleted) notes = notes.filter(x => x.id !== n.id);
          else { const idx = notes.findIndex(x => x.id === n.id); if (idx === -1) notes.push(n); else notes[idx] = n; }
          saveData(NOTES_PATH, notes);
        }
        if (data.type === 'message_update') {
          const m = data.message;
          if (m._deleted) messages = messages.filter(x => x.id !== m.id);
          else { const idx = messages.findIndex(x => x.id === m.id); if (idx === -1) messages.push(m); else messages[idx] = m; }
          saveData(MESSAGES_PATH, messages);
        }
      } catch {}
    });
  } catch (e) { console.error('❌ WS init:', e.message); }
}

// ── Helpers ──
const rtl = (t) => `\u202B${t}\u202C`;
function isAdmin(ctx) {
  if (ADMIN_IDS.includes(ctx.from?.id)) return true;
  if (String(ctx.chat?.id) === GROUP_ID) return true;
  return false;
}
function isDM(ctx) { return ctx.chat?.type === 'private'; }

// ── Menus ──
const mainMenu = Markup.inlineKeyboard([
  [Markup.button.callback('📋 وظایف', 'task_list'), Markup.button.callback('➕ وظیفه', 'task_add')],
  [Markup.button.callback('✅ انجام', 'task_pick_done'), Markup.button.callback('🗑 حذف', 'task_pick_del')],
  [Markup.button.callback('🧹 پاک کردن انجام‌شده‌ها', 'clear_done')],
  [Markup.button.callback('📊 گزارش روزانه', 'daily_report'), Markup.button.callback('📈 آمار', 'stats')],
  [Markup.button.callback('👶 کودکان', 'children'), Markup.button.callback('📝 یادداشت‌ها', 'note_list')],
  [Markup.button.callback('💬 پیام‌ها', 'msg_list'), Markup.button.callback('🔄 همگامسازی', 'sync_now')],
], { columns: 2 });

const noteMenu = Markup.inlineKeyboard([
  [Markup.button.callback('📝 افزودن یادداشت', 'note_add'), Markup.button.callback('📋 فهرست', 'note_list')],
  [Markup.button.callback('🗑 حذف یادداشت', 'note_pick_del'), Markup.button.callback('↩️ بازگشت', 'cancel_flow')],
], { columns: 2 });

const msgMenu = Markup.inlineKeyboard([
  [Markup.button.callback('💬 افزودن پیام', 'msg_add'), Markup.button.callback('📋 فهرست', 'msg_list')],
  [Markup.button.callback('🗑 حذف پیام', 'msg_pick_del'), Markup.button.callback('↩️ بازگشت', 'cancel_flow')],
], { columns: 2 });

const moodPicker = Markup.inlineKeyboard([
  [Markup.button.callback('😊 عالی', 'mood_excellent'), Markup.button.callback('😐 معمولی', 'mood_normal')],
  [Markup.button.callback('😢 ناراحت', 'mood_sad'), Markup.button.callback('🤒 مریض', 'mood_sick')],
  [Markup.button.callback('⏹️ انصراف', 'cancel_flow')],
]);
const confirmCancel = Markup.inlineKeyboard([
  [Markup.button.callback('✅ تأیید', 'confirm_report'), Markup.button.callback('❌ لغو', 'cancel_flow')],
]);

// ════════════════ Task handlers ════════════════
bot.start(async (ctx) => {
  await ctx.reply(rtl(
    `🌟 سلام! ربات مدیریت یاران\n\n` +
    `📋 وظایف — افزودن، انجام، حذف\n` +
    `📝 یادداشت — فهرست، افزودن، حذف\n` +
    `💬 پیام — فهرست، افزودن، حذف\n` +
    `📊 گزارش روزانه — ثبت وضعیت کودک\n\n` +
    `🔄 تخته وظایف سایت به‌صورت زنده همگام می‌شود`
  ), mainMenu);
});
bot.command('menu', async (ctx) => ctx.reply(rtl('منوی اصلی:'), mainMenu));
bot.command('tasks', async (ctx) => showTasks(ctx));
bot.command('help', async (ctx) => ctx.reply(rtl(
  `راهنما:\n` +
  `/tasks — لیست وظایف\n` +
  `/add متن — وظیفه جدید\n` +
  `/notes — یادداشت‌ها\n` +
  `/messages — پیام‌ها\n` +
  `/report — گزارش روزانه\n` +
  `/menu — منوی اصلی\n\n` +
  `همه دستورات از منوی دکمه‌ای هم در دسترس‌اند`
), mainMenu));

// ── Tasks ──
async function showTasks(ctx, edit = false) {
  const gt = tasks.filter(t => String(t.groupId) === GROUP_ID);
  if (!gt.length) {
    const msg = rtl('📭 وظیفه‌ای ثبت نشده\n➕ وظیفه جدید');
    if (edit) return ctx.editMessageText(msg, Markup.inlineKeyboard([[Markup.button.callback('➕ وظیفه جدید', 'task_add')]]));
    return ctx.reply(msg, Markup.inlineKeyboard([[Markup.button.callback('➕ وظیفه جدید', 'task_add')]]));
  }
  const lines = gt.map(t => {
    const icon = t.status === 'completed' ? '✅' : (t.status === 'in_progress' ? '🔄' : '⬜');
    const owner = t.assigned_to ? ` 👤${t.assigned_to}` : '';
    const prio = t.priority === 'high' ? ' 🔴' : (t.priority === 'low' ? ' 🟢' : '');
    return `${icon} ${t.title}${owner}${prio}`;
  }).join('\n');
  const msg = rtl(`📋 وظایف:\n\n${lines}`);
  const kb = Markup.inlineKeyboard(
    [...gt.map(t => [Markup.button.callback(`✅ ${t.title.slice(0, 40)}`, `done_${t.id}`)]),
    [Markup.button.callback('↩️ منو', 'cancel_flow')]],
  );
  if (edit) return ctx.editMessageText(msg, kb);
  return ctx.reply(msg, kb);
}
bot.action('task_list', async (ctx) => { await ctx.answerCbQuery(); await showTasks(ctx, true); });

bot.action('task_add', async (ctx) => {
  if (!isAdmin(ctx)) return ctx.answerCbQuery(rtl('❌ فقط مدیران'));
  ctx.session.waitingTask = true;
  await ctx.answerCbQuery();
  await ctx.reply(rtl('✍️ متن وظیفه جدید:'), Markup.inlineKeyboard([[Markup.button.callback('⏹️ انصراف', 'cancel_flow')]]));
});

bot.action('clear_done', async (ctx) => {
  await ctx.answerCbQuery();
  const done = tasks.filter(t => String(t.groupId) === GROUP_ID && t.status === 'completed').length;
  if (!done) return ctx.reply(rtl('انجام‌شده‌ای نیست'), mainMenu);
  await ctx.reply(rtl(`${done} وظیفه انجام‌شده حذف شود؟`), Markup.inlineKeyboard([
    [Markup.button.callback('✅ بله', 'clear_done_yes'), Markup.button.callback('❌ نه', 'cancel_flow')],
  ]));
});
bot.action('clear_done_yes', async (ctx) => {
  await ctx.answerCbQuery();
  try {
    const r = await fetch(`${SERVER_URL}/api/tasks/done`, { method: 'DELETE' });
    const removed = (await r.json()).removed || 0;
    const fresh = await serverGetTasks();
    if (fresh) { tasks = fresh; saveData(TASKS_PATH, tasks); }
    await ctx.reply(rtl(`🧹 ${removed} حذف شد`), mainMenu);
  } catch { await ctx.reply(rtl('❌ خطا'), mainMenu); }
});

bot.action('task_pick_done', async (ctx) => {
  await ctx.answerCbQuery();
  const gt = tasks.filter(t => String(t.groupId) === GROUP_ID && t.status !== 'completed');
  if (!gt.length) return ctx.reply(rtl('باز نیست'));
  const kb = Markup.inlineKeyboard([
    ...gt.map(t => [Markup.button.callback(`✅ ${t.title.slice(0, 40)}`, `done_${t.id}`)]),
    [Markup.button.callback('↩️ منو', 'cancel_flow')],
  ]);
  await ctx.reply(rtl('کدام انجام شد؟'), kb);
});

bot.action('task_pick_del', async (ctx) => {
  await ctx.answerCbQuery();
  const gt = tasks.filter(t => String(t.groupId) === GROUP_ID);
  if (!gt.length) return ctx.reply(rtl('ندارد'));
  const kb = Markup.inlineKeyboard([
    ...gt.map(t => [Markup.button.callback(`🗑 ${t.title.slice(0, 40)}`, `del_${t.id}`)]),
    [Markup.button.callback('↩️ منو', 'cancel_flow')],
  ]);
  await ctx.reply(rtl('کدام حذف شود؟'), kb);
});

bot.action('stats', async (ctx) => {
  await ctx.answerCbQuery();
  const gt = tasks.filter(t => String(t.groupId) === GROUP_ID);
  const open = gt.filter(t => t.status !== 'completed').length;
  const today = new Date().toISOString().slice(0, 10);
  const doneToday = gt.filter(t => t.status === 'completed' && (t.completed_at || '').startsWith(today)).length;
  await ctx.reply(rtl(`📈 آمار:\n\n📋 کل: ${gt.length}\n⏳ باز: ${open}\n✅ انجام: ${gt.length - open}\n🆕 امروز: ${doneToday}\n📝 یادداشت: ${notes.length}\n💬 پیام: ${messages.length}`), mainMenu);
});

bot.action(/^done_(.+)/, async (ctx) => {
  const id = ctx.match[1];
  const task = tasks.find(t => String(t.id) === id);
  if (!task) { await ctx.answerCbQuery(rtl('یافت نشد')); const f = await serverGetTasks(); if (f) { tasks = f; saveData(TASKS_PATH, tasks); } return showTasks(ctx, true); }
  task.status = 'completed'; task.completed_at = new Date().toISOString();
  saveData(TASKS_PATH, tasks);
  await api('PATCH', `/api/tasks/${id}`, { status: 'completed' });
  await ctx.answerCbQuery(rtl(`✅ ${task.title}`));
  await showTasks(ctx, true);
});

bot.action(/^del_(.+)/, async (ctx) => {
  const id = ctx.match[1];
  const task = tasks.find(t => String(t.id) === id);
  tasks = tasks.filter(t => String(t.id) !== id);
  saveData(TASKS_PATH, tasks);
  await api('DELETE', `/api/tasks/${id}`);
  await ctx.answerCbQuery(rtl(`🗑 ${task?.title || ''}`));
  await showTasks(ctx, true);
});

bot.action('sync_now', async (ctx) => {
  await ctx.answerCbQuery(rtl('🔄 همگام‌سازی...'));
  const [fTasks, fNotes, fMsgs] = await Promise.all([serverGetTasks(), serverGetNotes(), serverGetMessages()]);
  if (fTasks) { tasks = fTasks; saveData(TASKS_PATH, tasks); }
  if (fNotes) { notes = fNotes; saveData(NOTES_PATH, notes); }
  if (fMsgs) { messages = fMsgs; saveData(MESSAGES_PATH, messages); }
  await ctx.reply(rtl(`✅ همگام شد:\n📋 ${tasks.length} وظیفه\n📝 ${notes.length} یادداشت\n💬 ${messages.length} پیام`), mainMenu);
});

// ════════════════ Notes handlers ════════════════
bot.action('note_list', async (ctx) => {
  await ctx.answerCbQuery();
  if (!notes.length) return ctx.reply(rtl('📝 یادداشتی نیست'), noteMenu);
  const lines = notes.slice(0, 15).map((n, i) => `${i + 1}. ${(n.text || '').slice(0, 60)}${(n.text || '').length > 60 ? '...' : ''}`).join('\n');
  await ctx.reply(rtl(`📝 یادداشت‌ها (${notes.length}):\n\n${lines}`), noteMenu);
});

bot.action('note_add', async (ctx) => {
  if (!isAdmin(ctx)) return ctx.answerCbQuery(rtl('❌ فقط مدیران'));
  ctx.session.waitingNote = true;
  await ctx.answerCbQuery();
  await ctx.reply(rtl('📝 متن یادداشت:'), Markup.inlineKeyboard([[Markup.button.callback('⏹️ انصراف', 'cancel_flow')]]));
});

bot.action('note_pick_del', async (ctx) => {
  if (!isAdmin(ctx)) return ctx.answerCbQuery(rtl('❌ فقط مدیران'));
  await ctx.answerCbQuery();
  if (!notes.length) return ctx.reply(rtl('ندارد'), noteMenu);
  const kb = Markup.inlineKeyboard([
    ...notes.slice(0, 10).map(n => [Markup.button.callback(`🗑 ${(n.text || '').slice(0, 40)}`, `ndel_${n.id}`)]),
    [Markup.button.callback('↩️ بازگشت', 'cancel_flow')],
  ]);
  await ctx.reply(rtl('کدام حذف شود؟'), kb);
});

bot.action(/^ndel_(.+)/, async (ctx) => {
  if (!isAdmin(ctx)) return ctx.answerCbQuery(rtl('❌ فقط مدیران'));
  const id = ctx.match[1];
  notes = notes.filter(n => n.id !== id);
  saveData(NOTES_PATH, notes);
  await api('DELETE', `/api/notes/${id}`);
  await ctx.answerCbQuery(rtl('🗑 حذف شد'));
  await ctx.reply(rtl(`📝 باقیمانده: ${notes.length}`), noteMenu);
});

// ════════════════ Messages handlers ════════════════
bot.action('msg_list', async (ctx) => {
  await ctx.answerCbQuery();
  if (!messages.length) return ctx.reply(rtl('💬 پیامی نیست'), msgMenu);
  const lines = messages.slice(0, 15).map((m, i) => `${i + 1}. ${(m.text || '').slice(0, 60)}${(m.text || '').length > 60 ? '...' : ''}`).join('\n');
  await ctx.reply(rtl(`💬 پیام‌ها (${messages.length}):\n\n${lines}`), msgMenu);
});

bot.action('msg_add', async (ctx) => {
  if (!isAdmin(ctx)) return ctx.answerCbQuery(rtl('❌ فقط مدیران'));
  ctx.session.waitingMsg = true;
  await ctx.answerCbQuery();
  await ctx.reply(rtl('💬 متن پیام:'), Markup.inlineKeyboard([[Markup.button.callback('⏹️ انصراف', 'cancel_flow')]]));
});

bot.action('msg_pick_del', async (ctx) => {
  if (!isAdmin(ctx)) return ctx.answerCbQuery(rtl('❌ فقط مدیران'));
  await ctx.answerCbQuery();
  if (!messages.length) return ctx.reply(rtl('ندارد'), msgMenu);
  const kb = Markup.inlineKeyboard([
    ...messages.slice(0, 10).map(m => [Markup.button.callback(`🗑 ${(m.text || '').slice(0, 40)}`, `mdel_${m.id}`)]),
    [Markup.button.callback('↩️ بازگشت', 'cancel_flow')],
  ]);
  await ctx.reply(rtl('کدام حذف شود؟'), kb);
});

bot.action(/^mdel_(.+)/, async (ctx) => {
  if (!isAdmin(ctx)) return ctx.answerCbQuery(rtl('❌ فقط مدیران'));
  const id = ctx.match[1];
  messages = messages.filter(m => m.id !== id);
  saveData(MESSAGES_PATH, messages);
  await api('DELETE', `/api/messages/${id}`);
  await ctx.answerCbQuery(rtl('🗑 حذف شد'));
  await ctx.reply(rtl(`💬 باقیمانده: ${messages.length}`), msgMenu);
});

// ════════════════ Report + Cancel ════════════════
bot.action('daily_report', async (ctx) => {
  ctx.session.report = {};
  await ctx.answerCbQuery();
  await ctx.reply(rtl('😊 حال کودک؟'), moodPicker);
});
bot.action(/^mood_(.+)/, async (ctx) => {
  ctx.session.report = ctx.session.report || {};
  ctx.session.report.mood = ctx.match[1];
  await ctx.answerCbQuery();
  await ctx.reply(rtl('🍎 غذا:'));
});
bot.action('cancel_flow', async (ctx) => {
  Object.assign(ctx.session, { report: null, waitingTask: false, waitingNote: false, waitingMsg: false, taskTitle: null, waitingTaskOwner: false, waitingChildName: false });
  await ctx.answerCbQuery(rtl('انصراف'));
  await ctx.reply(rtl('بازگشت:'), mainMenu);
});
bot.action('confirm_report', async (ctx) => {
  const r = ctx.session.report || {};
  if (!r.mood || !r.food || !r.sleep) return ctx.reply(rtl('ناقص'), moodPicker);
  await api('POST', '/api/reports', { childName: r.childName || 'ناشناس', mood: r.mood, food: r.food, sleep: r.sleep, note: r.note || '', groupId: GROUP_ID, date: new Date().toISOString(), fromBot: true });
  ctx.session.report = null;
  await ctx.answerCbQuery(rtl('ثبت شد ✅'));
  await ctx.reply(rtl('📊 گزارش ثبت شد!'), mainMenu);
});

// ════════════════ Text flow ════════════════
bot.on('text', async (ctx) => {
  const text = ctx.message.text.trim();

  if (ctx.session.waitingTask) {
    if (!isAdmin(ctx)) { ctx.session.waitingTask = false; return ctx.reply(rtl('❌ فقط مدیران')); }
    ctx.session.waitingTask = false;
    ctx.session.taskTitle = text;
    ctx.session.waitingTaskOwner = true;
    return ctx.reply(rtl(`📋 «${text}»\n👤 مسئول: (اسم یا «ندارد»):`), Markup.inlineKeyboard([[Markup.button.callback('⏹️ انصراف', 'cancel_flow')]]));
  }

  if (ctx.session.waitingTaskOwner) {
    const title = ctx.session.taskTitle;
    const owner = text === 'ندارد' ? '' : text;
    ctx.session.waitingTaskOwner = false; ctx.session.taskTitle = null;
    const task = { id: Date.now().toString(), title, assigned_to: owner, status: 'pending', priority: 'medium', created_at: new Date().toISOString(), groupId: GROUP_ID, created_by: ctx.from.username || ctx.from.first_name };
    tasks.push(task); saveData(TASKS_PATH, tasks);
    await api('POST', '/api/tasks', task);
    return ctx.reply(rtl(`✅ اضافه شد:\n${title}${owner ? `\n👤 ${owner}` : ''}`), mainMenu);
  }

  if (ctx.session.waitingNote) {
    ctx.session.waitingNote = false;
    const note = { id: Date.now().toString(), text, author: ctx.from.first_name || 'ربات', date: new Date().toISOString(), groupId: GROUP_ID };
    notes.push(note); saveData(NOTES_PATH, notes);
    await api('POST', '/api/notes', note);
    return ctx.reply(rtl('✅ یادداشت ارسال شد'), mainMenu);
  }

  if (ctx.session.waitingMsg) {
    ctx.session.waitingMsg = false;
    const msg = { id: Date.now().toString(), text, author: ctx.from.first_name || 'ربات', date: new Date().toISOString(), groupId: GROUP_ID };
    messages.push(msg); saveData(MESSAGES_PATH, messages);
    await api('POST', '/api/messages', msg);
    return ctx.reply(rtl('✅ پیام ارسال شد'), mainMenu);
  }

  if (ctx.session.waitingChildName) {
    ctx.session.waitingChildName = false;
    ctx.session.report = { childName: text };
    return ctx.reply(rtl(`👶 «${text}»\n😊 حال کودک؟`), moodPicker);
  }

  if (ctx.session.report) {
    const r = ctx.session.report;
    if (!r.mood) return ctx.reply(rtl('حالت را انتخاب کنید:'), moodPicker);
    if (!r.food) { r.food = text; return ctx.reply(rtl('😴 خواب:')); }
    if (!r.sleep) { r.sleep = text; return ctx.reply(rtl('📝 توضیح (یا «ندارد»):')); }
    if (!r.note) { r.note = text === 'ندارد' ? '' : text; return ctx.reply(rtl(`گزارش:\n😊 ${r.mood}\n🍎 ${r.food}\n😴 ${r.sleep}\n📝 ${r.note || '-'}\n\nارسال؟`), confirmCancel); }
  }

  await ctx.reply(rtl('از منو استفاده کنید:'), mainMenu);
});

bot.action('children', async (ctx) => {
  ctx.session.waitingChildName = true;
  await ctx.answerCbQuery();
  await ctx.reply(rtl('👶 اسم کودک:'), Markup.inlineKeyboard([[Markup.button.callback('↩️ منو', 'cancel_flow')]]));
});

// ── Error guard ──
bot.catch((err) => { if (!/query is too old|Cannot set properties/.test(String(err?.message || err))) console.error('⚠️ bot:', err?.message); });

// ── Init sync + WS ──
setTimeout(async () => {
  const [fTasks, fNotes, fMsgs] = await Promise.all([serverGetTasks(), serverGetNotes(), serverGetMessages()]);
  if (fTasks) { tasks = fTasks; saveData(TASKS_PATH, tasks); }
  if (fNotes) { notes = fNotes; saveData(NOTES_PATH, notes); }
  if (fMsgs) { messages = fMsgs; saveData(MESSAGES_PATH, messages); }
  console.log(`🔄 Synced: ${tasks.length} tasks, ${notes.length} notes, ${messages.length} messages`);
  connectWS();
}, 3000);

// ── Start ──
const app = express();
app.use(express.json());
app.get('/health', (_req, res) => res.json({ ok: true, bot: 'YaranBot v3', tasks: tasks.length, notes: notes.length, messages: messages.length }));

bot.launch().then(() => console.log('✅ Bot v3 started')).catch((e) => {
  if (e.message?.includes('409')) {
    console.log('⚠️ Conflict — retry in 10s...');
    setTimeout(() => { bot.launch().catch(() => {}); }, 10000);
  } else console.error('❌ launch:', e.message);
});
app.listen(PORT, () => console.log(`🤖 Bot server: http://localhost:${PORT}`));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
