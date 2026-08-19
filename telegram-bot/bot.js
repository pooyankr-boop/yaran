"use strict";

// ═══════════════════════════════════════════════════════
//  Yaran Kindergarten — Telegram Bot v2
//  منوی شیشهای: وظایف، گزارش روزانه، کودکان
//  همگامسازی با سرور + تخته پیگیری وظایف سایت
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
const PORT = process.env.PORT || 3000;
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:4000';
const WS_URL = process.env.WS_URL || 'ws://localhost:4000/ws';
const PROXY_URL = process.env.PROXY_URL || null;

const bot = PROXY_URL
  ? new Telegraf(BOT_TOKEN, { telegram: { agent: new HttpsProxyAgent(PROXY_URL) } })
  : new Telegraf(BOT_TOKEN);

if (!BOT_TOKEN) {
  console.error('❌ BOT_TOKEN is required');
  process.exit(1);
}

// ── Session (report wizard state) — simple Map, no telegraf session dep ──
const chatSessions = new Map();
bot.use((ctx, next) => {
  const key = String(ctx.chat?.id || ctx.from?.id || 'default');
  if (!chatSessions.has(key)) chatSessions.set(key, {});
  ctx.session = chatSessions.get(key);
  return next();
});

// ── Storage (single source: server API; local cache for offline) ──
const DATA_DIR = path.join(__dirname, 'data');
const TASKS_PATH = path.join(DATA_DIR, 'tasks.json');

const loadData = (file, defaultValue = []) => {
  try {
    if (fs.existsSync(file)) return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {}
  return defaultValue;
};
const saveData = (file, data) => {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
  } catch (e) {
    console.error(`❌ Failed to save ${file}:`, e.message);
  }
};

let tasks = loadData(TASKS_PATH, []);

// ── Server sync helpers ──
async function serverGetTasks() {
  try {
    const res = await fetch(`${SERVER_URL}/api/tasks`);
    const data = await res.json();
    if (data.tasks) return data.tasks;
  } catch (e) {
    console.error('❌ serverGetTasks:', e.message);
  }
  return null;
}

async function serverPostTask(task) {
  try {
    await fetch(`${SERVER_URL}/api/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
  } catch (e) {
    console.error('❌ serverPostTask:', e.message);
  }
}

// Generic POST to server API — returns true on ok
async function serverPost(path, body) {
  try {
    const res = await fetch(`${SERVER_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return res.ok;
  } catch (e) {
    console.error(`❌ serverPost ${path}:`, e.message);
    return false;
  }
}

async function serverPatchTask(id, patch) {
  try {
    await fetch(`${SERVER_URL}/api/tasks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch),
    });
  } catch (e) {
    console.error('❌ serverPatchTask:', e.message);
  }
}

async function serverDeleteTask(id) {
  try {
    await fetch(`${SERVER_URL}/api/tasks/${id}`, { method: 'DELETE' });
  } catch (e) {
    console.error('❌ serverDeleteTask:', e.message);
  }
}

// ── WebSocket: live task updates from server ──
function connectWS() {
  try {
    const ws = new WebSocket(WS_URL);
    ws.on('open', () => console.log('✅ WebSocket connected (live sync)'));
    ws.on('error', (e) => console.error('❌ WebSocket error:', e.message));
    ws.on('message', (msg) => {
      try {
        const data = JSON.parse(msg);
        if (data.type === 'task_update') {
          const t = data.task;
          if (t._deleted) {
            tasks = tasks.filter(x => x.id !== t.id);
          } else {
            const idx = tasks.findIndex(x => x.id === t.id);
            if (idx === -1) tasks.push(t);
            else tasks[idx] = t;
          }
          saveData(TASKS_PATH, tasks);
        }
      } catch {}
    });
  } catch (e) {
    console.error('❌ WS init:', e.message);
  }
}

// ── RTL helper ──
const rtl = (text) => `\u202B${text}\u202C`;

// ── Admin check: ADMIN_ID set OR group member ──
function isAdmin(ctx) {
  if (process.env.ADMIN_ID && ctx.from.id === parseInt(process.env.ADMIN_ID)) return true;
  // In the group: members are staff
  return String(ctx.chat?.id) === GROUP_ID;
}

// ════════════════ Menus (glass style) ════════════════

const mainMenu = Markup.inlineKeyboard([
  [Markup.button.callback('📋 لیست وظایف', 'task_list'), Markup.button.callback('➕ وظیفه جدید', 'task_add')],
  [Markup.button.callback('✅ انجام شد', 'task_pick_done'), Markup.button.callback('🗑 حذف وظیفه', 'task_pick_del')],
  [Markup.button.callback('📊 گزارش روزانه', 'daily_report'), Markup.button.callback('📈 آمار', 'stats')],
  [Markup.button.callback('👶 کودکان', 'children'), Markup.button.callback('📝 یادداشت', 'note_add')],
  [Markup.button.callback('💬 پیام به پنل', 'msg_add'), Markup.button.callback('🔄 همگامسازی', 'sync_now')],
], { columns: 2 });

const moodPicker = Markup.inlineKeyboard([
  [Markup.button.callback('😊 عالی', 'mood_excellent'), Markup.button.callback('😐 معمولی', 'mood_normal')],
  [Markup.button.callback('😢 ناراحت', 'mood_sad'), Markup.button.callback('🤒 مریض', 'mood_sick')],
  [Markup.button.callback('⏹️ انصراف', 'cancel_flow')],
]);

const confirmCancel = Markup.inlineKeyboard([
  [Markup.button.callback('✅ تأیید و ارسال', 'confirm_report'), Markup.button.callback('❌ لغو', 'cancel_flow')],
]);

// ════════════════ Handlers ════════════════

bot.start(async (ctx) => {
  await ctx.reply(
    rtl(
      `🌟 سلام! به ربات مدیریت مهدکودک یاران خوش آمدید.\n\n` +
      `از منوی شیشهای زیر استفاده کنید:\n` +
      `📋 وظایف — افزودن، انجام، حذف\n` +
      `📊 گزارش روزانه — ثبت وضعیت کودک\n\n` +
      `🔄 تخته پیگیری وظایف سایت به‌صورت زنده همگام می‌شود`
    ),
    mainMenu
  );
});

bot.command('menu', async (ctx) => ctx.reply(rtl('منوی اصلی:'), mainMenu));
bot.command('tasks', async (ctx) => showTasks(ctx));
bot.command('help', async (ctx) => ctx.reply(rtl(
  `راهنمای ربات یاران:\n` +
  `/tasks — لیست وظایف\n` +
  `/add متن وظیفه — افزودن وظیفه\n` +
  `/report — گزارش روزانه\n` +
  `/menu — منوی اصلی\n\n` +
  `همه دستورات با دکمههای منو هم در دسترساند`
), mainMenu));

// ── Task list ──
async function showTasks(ctx, edit = false) {
  const groupTasks = tasks.filter(t => String(t.groupId) === GROUP_ID);
  if (!groupTasks.length) {
    const msg = rtl('📭 وظیفهای ثبت نشده.\nبرای افزودن: ➕ وظیفه جدید');
    if (edit) return ctx.editMessageText(msg, Markup.inlineKeyboard([[Markup.button.callback('➕ وظیفه جدید', 'task_add')]]));
    return ctx.reply(msg, Markup.inlineKeyboard([[Markup.button.callback('➕ وظیفه جدید', 'task_add')]]));
  }
  const lines = groupTasks.map(t => {
    const icon = t.status === 'completed' ? '✅' : (t.status === 'in_progress' ? '🔄' : '⬜');
    const owner = t.assigned_to ? ` 👤${t.assigned_to}` : '';
    const prio = t.priority === 'high' ? ' 🔴' : (t.priority === 'low' ? ' 🟢' : '');
    return `${icon} ${t.title}${owner}${prio}`;
  }).join('\n');
  const msg = rtl(`📋 وظایف مهدکودک:\n\n${lines}`);
  const kb = Markup.inlineKeyboard(
    [...groupTasks.map(t => [Markup.button.callback(`✅ ${t.title.slice(0, 40)}`, `done_${t.id}`)]),
    [Markup.button.callback('↩️ بازگشت به منو', 'cancel_flow')]],
    { columns: 1 }
  );
  if (edit) return ctx.editMessageText(msg, kb);
  return ctx.reply(msg, kb);
}

bot.action('task_list', async (ctx) => {
  await ctx.answerCbQuery();
  await showTasks(ctx, true);
});

// ── Add task: ask for title ──
bot.action('task_add', async (ctx) => {
  if (!isAdmin(ctx)) return ctx.answerCbQuery(rtl('❌ فقط مدیران'));;
  ctx.session.waitingTask = true;
  await ctx.answerCbQuery();
  await ctx.reply(rtl('✍️ متن وظیفه جدید را بنویسید:'),
    Markup.inlineKeyboard([[Markup.button.callback('⏹️ انصراف', 'cancel_flow')]]));
});

// ── Pick task to mark done ──
bot.action('task_pick_done', async (ctx) => {
  await ctx.answerCbQuery();
  const groupTasks = tasks.filter(t => String(t.groupId) === GROUP_ID && t.status !== 'completed');
  if (!groupTasks.length) return ctx.reply(rtl('وظیفهٔ باز وجود ندارد'));
  const kb = Markup.inlineKeyboard(
    [...groupTasks.map(t => [Markup.button.callback(`✅ ${t.title.slice(0, 40)}`, `done_${t.id}`)]),
    [Markup.button.callback('↩️ بازگشت به منو', 'cancel_flow')]]
  );
  await ctx.reply(rtl('کدام وظیفه انجام شد؟'), kb);
});

// ── Pick task to delete ──
bot.action('task_pick_del', async (ctx) => {
  await ctx.answerCbQuery();
  const groupTasks = tasks.filter(t => String(t.groupId) === GROUP_ID);
  if (!groupTasks.length) return ctx.reply(rtl('وظیفهای وجود ندارد'));
  const kb = Markup.inlineKeyboard(
    [...groupTasks.map(t => [Markup.button.callback(`🗑 ${t.title.slice(0, 40)}`, `del_${t.id}`)]),
    [Markup.button.callback('↩️ بازگشت به منو', 'cancel_flow')]]
  );
  await ctx.reply(rtl('کدام وظیفه حذف شود؟'), kb);
});

// ── Stats ──
bot.action('stats', async (ctx) => {
  await ctx.answerCbQuery();
  const groupTasks = tasks.filter(t => String(t.groupId) === GROUP_ID);
  const open = groupTasks.filter(t => t.status !== 'completed').length;
  const done = groupTasks.length - open;
  const today = new Date().toISOString().slice(0, 10);
  const doneToday = groupTasks.filter(t => t.status === 'completed' && (t.completed_at || '').startsWith(today)).length;
  await ctx.reply(rtl(
    `📈 آمار وظایف:\n\n` +
    `📋 کل: ${groupTasks.length}\n` +
    `⏳ باز: ${open}\n` +
    `✅ انجامشده: ${done}\n` +
    `🆕 امروز: ${doneToday}`
  ), mainMenu);
});

bot.action(/^done_(.+)/, async (ctx) => {
  const taskId = ctx.match[1];
  const task = tasks.find(t => String(t.id) === taskId);
  if (!task) {
    await ctx.answerCbQuery(rtl('وظیفه یافت نشد'));
    // Pull fresh from server
    const fresh = await serverGetTasks();
    if (fresh) { tasks = fresh; saveData(TASKS_PATH, tasks); }
    return showTasks(ctx, true);
  }
  task.status = 'completed';
  task.completed_at = new Date().toISOString();
  saveData(TASKS_PATH, tasks);
  await serverPatchTask(task.id, { status: 'completed' });
  await ctx.answerCbQuery(rtl(`✅ انجام شد: ${task.title}`));
  await showTasks(ctx, true);
});

// ── Delete task (inline: long-press → منوی حذف) ──
bot.action(/^del_(.+)/, async (ctx) => {
  const taskId = ctx.match[1];
  const task = tasks.find(t => String(t.id) === taskId);
  tasks = tasks.filter(t => String(t.id) !== taskId);
  saveData(TASKS_PATH, tasks);
  await serverDeleteTask(taskId);
  await ctx.answerCbQuery(rtl(`🗑 حذف شد: ${task?.title || ''}`));
  await showTasks(ctx, true);
});

// ── Sync now ──
bot.action('sync_now', async (ctx) => {
  await ctx.answerCbQuery(rtl('🔄 در حال همگامسازی...'));
  const fresh = await serverGetTasks();
  if (fresh) {
    tasks = fresh;
    saveData(TASKS_PATH, tasks);
    await ctx.reply(rtl(`✅ همگام شد — ${fresh.length} وظیفه از سرور`), mainMenu);
  } else {
    await ctx.reply(rtl('❌ سرور در دسترس نیست'), mainMenu);
  }
});

// ── Daily report wizard ──
bot.action('daily_report', async (ctx) => {
  ctx.session.report = {};
  await ctx.answerCbQuery();
  await ctx.reply(rtl('😊 حال کودک امروز چطور بود؟'), moodPicker);
});

bot.action(/^mood_(.+)/, async (ctx) => {
  ctx.session.report = ctx.session.report || {};
  ctx.session.report.mood = ctx.match[1];
  await ctx.answerCbQuery();
  await ctx.reply(rtl('🍎 غذای کودک را بنویسید:'));
});

bot.action('cancel_flow', async (ctx) => {
  ctx.session.report = {};
  ctx.session.waitingTask = false;
  ctx.session.addingChild = false;
  ctx.session.waitingChildName = false;
  ctx.session.waitingTaskOwner = false;
  ctx.session.taskTitle = null;
  ctx.session.waitingNote = false;
  ctx.session.waitingMsg = false;
  await ctx.answerCbQuery(rtl('انصراف'));
  await ctx.reply(rtl('بازگشت به منو:'), mainMenu);
});

bot.action('confirm_report', async (ctx) => {
  const r = ctx.session.report || {};
  if (!r.mood || !r.food || !r.sleep) {
    return ctx.reply(rtl('❌ گزارش ناقص است — دوباره شروع کنید:'), moodPicker);
  }
  try {
    await fetch(`${SERVER_URL}/api/reports`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        childName: r.childName || 'ناشناس',
        mood: r.mood,
        food: r.food,
        sleep: r.sleep,
        note: r.note || '',
        groupId: GROUP_ID,
        date: new Date().toISOString(),
        fromBot: true,
      }),
    });
  } catch (e) {
    console.error('❌ report:', e.message);
  }
  ctx.session.report = {};
  await ctx.answerCbQuery(rtl('ثبت شد ✅'));
  await ctx.reply(rtl('📊 گزارش ثبت شد! متشکریم 🌟'), mainMenu);
});

// ── Text flow: add task / report wizard / children name ──
bot.on('text', async (ctx) => {
  const text = ctx.message.text.trim();

  // Add task flow
  if (ctx.session.waitingTask) {
    if (!isAdmin(ctx)) {
      ctx.session.waitingTask = false;
      return ctx.reply(rtl('❌ فقط مدیران میتوانند وظیفه اضافه کنند'));
    }
    ctx.session.waitingTask = false;
    ctx.session.taskTitle = text;
    ctx.session.waitingTaskOwner = true;
    await ctx.reply(
      rtl(`📋 وظیفه: «${text}»\n\n👤 مسئول پیگیری کیست؟ (اسم یا «ندارد»):`),
      Markup.inlineKeyboard([[Markup.button.callback('⏹️ انصراف', 'cancel_flow')]])
    );
    return;
  }

  // Task owner → create task
  if (ctx.session.waitingTaskOwner) {
    const title = ctx.session.taskTitle;
    const owner = text === 'ندارد' ? '' : text;
    ctx.session.waitingTaskOwner = false;
    ctx.session.taskTitle = null;
    const task = {
      id: Date.now().toString(),
      title,
      assigned_to: owner,
      status: 'pending',
      priority: 'medium',
      created_at: new Date().toISOString(),
      groupId: GROUP_ID,
      created_by: ctx.from.username || ctx.from.first_name,
    };
    tasks.push(task);
    saveData(TASKS_PATH, tasks);
    await serverPostTask(task);
    await ctx.reply(rtl(`✅ وظیفه اضافه شد:\n${title}${owner ? `\n👤 مسئول: ${owner}` : ''}`), mainMenu);
    return;
  }

  // Note text → POST /api/notes
  if (ctx.session.waitingNote) {
    ctx.session.waitingNote = false;
    const ok = await serverPost('/api/notes', { text, author: ctx.from.first_name || 'ربات' });
    await ctx.reply(ok ? rtl('✅ یادداشت به پنل ارسال شد') : rtl('❌ خطا در ارسال'), mainMenu);
    return;
  }

  // Message text → POST /api/messages
  if (ctx.session.waitingMsg) {
    ctx.session.waitingMsg = false;
    const ok = await serverPost('/api/messages', { text, from: ctx.from.first_name || 'ربات' });
    await ctx.reply(ok ? rtl('✅ پیام به پنل ارسال شد') : rtl('❌ خطا در ارسال'), mainMenu);
    return;
  }

  // Child name → start report for that child
  if (ctx.session.waitingChildName) {
    ctx.session.waitingChildName = false;
    ctx.session.report = { childName: text };
    return ctx.reply(
      rtl(`👶 کودک «${text}» ثبت شد.\n😊 حال کودک امروز چطور بود؟`),
      moodPicker
    );
  }

  // Report wizard steps
  if (ctx.session.report) {
    const r = ctx.session.report;
    if (!r.mood) return ctx.reply(rtl('ابتدا حالت کودک را انتخاب کنید:'), moodPicker);
    if (!r.food) { r.food = text; return ctx.reply(rtl('😴 خواب کودک را بنویسید:')); }
    if (!r.sleep) { r.sleep = text; return ctx.reply(rtl('📝 توضیحات اضافی (اختیاری — یا «ندارد»):')); }
    if (!r.note) {
      r.note = text === 'ندارد' ? '' : text;
      return ctx.reply(rtl(`گزارش شما:\n\n😊 حالت: ${r.mood}\n🍎 غذا: ${r.food}\n😴 خواب: ${r.sleep}\n📝 یادداشت: ${r.note || '-'}\n\nارسال شود؟`), confirmCancel);
    }
  }

  // fallback
  await ctx.reply(rtl('لطفاً از منوی اصلی استفاده کنید:'), mainMenu);
});

// ── Children: ask name first, then start daily report for that child ──
bot.action('children', async (ctx) => {
  ctx.session.waitingChildName = true;
  await ctx.answerCbQuery();
  await ctx.reply(
    rtl('👶 اسم کودک را بنویسید (مثلاً: نیکان):'),
    Markup.inlineKeyboard([[Markup.button.callback('↩️ بازگشت به منو', 'cancel_flow')]])
  );
});

// ── Notes: plain text → POST /api/notes ──
bot.action('note_add', async (ctx) => {
  if (!isAdmin(ctx)) return ctx.answerCbQuery(rtl('❌ فقط مدیران'));
  ctx.session.waitingNote = true;
  await ctx.answerCbQuery();
  await ctx.reply(
    rtl('📝 متن یادداشت را بنویسید (برای پنل سایت):'),
    Markup.inlineKeyboard([[Markup.button.callback('⏹️ انصراف', 'cancel_flow')]])
  );
});

// ── Messages: plain text → POST /api/messages ──
bot.action('msg_add', async (ctx) => {
  if (!isAdmin(ctx)) return ctx.answerCbQuery(rtl('❌ فقط مدیران'));
  ctx.session.waitingMsg = true;
  await ctx.answerCbQuery();
  await ctx.reply(
    rtl('💬 متن پیام را بنویسید (برای پنل سایت):'),
    Markup.inlineKeyboard([[Markup.button.callback('⏹️ انصراف', 'cancel_flow')]])
  );
});

// ── Initial sync from server ──
setTimeout(async () => {
  const fresh = await serverGetTasks();
  if (fresh) {
    tasks = fresh;
    saveData(TASKS_PATH, tasks);
    console.log(`🔄 Synced ${fresh.length} tasks from server`);
  }
  connectWS();
}, 3000);

// ── Start ──
const app = express();
app.use(express.json());
app.get('/health', (_req, res) => res.json({ ok: true, bot: 'YaranBot', tasks: tasks.length }));

// ── Global error guard: stale callback queries (from offline period) are expected ──
bot.catch((err) => {
  if (!/query is too old|Cannot set properties/.test(String(err?.message || err))) {
    console.error('⚠️ bot error:', err?.message || err);
  }
});

bot.launch().then(() => console.log('✅ Telegram bot started')).catch((e) => console.error('❌ launch failed:', e.message));
app.listen(PORT, () => console.log(`🤖 Bot server on http://localhost:${PORT}`));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));