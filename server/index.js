/* ═══════════════════════════════════════════════════════
   Yaran Kindergarten — Backend API (Express)
   فاز ۴: بکاند واقعی
   ═══════════════════════════════════════════════════════ */

const express = require('express');
const compression = require('compression');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuid } = require('uuid');
const fs = require('fs');
const path = require('path');
const http = require('http');
const crypto = require('crypto');
const dns = require('dns');
const net = require('net');

// Simple .env loader (no dotenv dependency)
const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8').split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const [key, ...val] = trimmed.split('=');
      process.env[key.trim()] = val.join('=').trim();
    }
  });
}
const { WebSocketServer } = require('ws');
// Bot is run separately via telegram-bot/bot.js (start-all.js or standalone)
const { registerPlanner } = require('./planner');

const app = express();
app.use(compression());
const PORT = Number(process.env.PORT) || 4000;

// ── امنیت: هرگز مقدار پیش‌فرض ثابت برای رمزهای حساس استفاده نکن ──
// اگر JWT_SECRET در env تنظیم نشده باشد، یک مقدار تصادفی امن در هر اجرا ساخته می‌شود
// (توکن‌های قبلی بعد از ری‌استارت باطل می‌شوند — امن‌تر از یک secret ثابت و عمومی).
let JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  JWT_SECRET = crypto.randomBytes(48).toString('hex');
  console.warn('⚠️  JWT_SECRET در env تنظیم نشده — یک مقدار تصادفی موقت ساخته شد.');
  console.warn('⚠️  برای پایداری نشست کاربران بین ری‌استارت‌ها، JWT_SECRET را در Render/محیط تنظیم کنید.');
}
const TENANT = 'yaran';
const GROUP_ID_STR = process.env.GROUP_ID || '-1003717678648';

// ── WebSocket for real-time task sync ──
const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: '/ws' });
const wsClients = new Set();

wss.on('connection', (ws) => {
  wsClients.add(ws);
  console.log(`🔌 WebSocket client connected (total: ${wsClients.size})`);
  ws.on('close', () => {
    wsClients.delete(ws);
    console.log(`🔌 WebSocket client disconnected (total: ${wsClients.size})`);
  });
  ws.on('message', (msg) => {
    try {
      const data = JSON.parse(msg);
      if (data.type === 'task_update') {
        // Broadcast to all other clients
        wsClients.forEach(c => {
          if (c !== ws && c.readyState === 1) {
            c.send(JSON.stringify(data));
          }
        });
      }
    } catch {}
  });
});

function broadcast(type, payload) {
  const msg = JSON.stringify({ type, ...payload });
  wsClients.forEach(c => { if (c.readyState === 1) c.send(msg); });
}
function broadcastTaskUpdate(task) { broadcast('task_update', { task }); }
function broadcastNoteUpdate(note) { broadcast('note_update', { note }); }
function broadcastMessageUpdate(message) { broadcast('message_update', { message }); }

// ── In-memory DB (users persisted to data/users.json) ──
const DB = {
  users: [],
  children: [],
  reports: [],
  classes: [],    // برنامه کلاسی
};

const USERS_PATH = path.join(__dirname, '..', 'data', 'users.json');
function loadUsers() {
  try { DB.users = JSON.parse(fs.readFileSync(USERS_PATH, 'utf8')) || []; }
  catch { DB.users = []; }
}
function saveUsers() {
  try { fs.writeFileSync(USERS_PATH, JSON.stringify(DB.users, null, 2), 'utf8'); }
  catch { /* read-only fs (Render free) */ }
}
loadUsers();

/* کلاسها — persist (فیلتر مربی در برنامه هفتگی به teacherId نیاز دارد) */
const CLASSES_PATH = path.join(__dirname, '..', 'data', 'classes.json');
function loadClasses() {
  try { DB.classes = JSON.parse(fs.readFileSync(CLASSES_PATH, 'utf8')) || []; }
  catch { DB.classes = []; }
}
function saveClasses() {
  try { fs.writeFileSync(CLASSES_PATH, JSON.stringify(DB.classes, null, 2), 'utf8'); }
  catch { /* read-only fs (Render free) */ }
}
loadClasses();

// فهرست والدین برای انتخابگر مخاطب در برنامه‌ریز (بخش پنل)
function listParents() {
  return DB.users
    .filter(u => u.role === 'parent' && u.tenant === TENANT)
    .map(u => ({ name: u.name, email: u.email }));
}

// Seed admin account on first run (env overridable, bcrypt-hashed)
if (!DB.users.some(u => u.role === 'admin')) {
  let adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    // هرگز رمز پیش‌فرض ثابت نساز — یک رمز تصادفی امن بساز و در لاگ چاپ کن
    adminPassword = crypto.randomBytes(9).toString('base64url');
    console.warn('⚠️  ADMIN_PASSWORD در env تنظیم نشده — رمز موقت ادمین ساخته شد:');
    console.warn(`⚠️  ایمیل: ${(process.env.ADMIN_EMAIL || 'admin@yaran.ir').toLowerCase()}  |  رمز موقت: ${adminPassword}`);
    console.warn('⚠️  این رمز فقط در همین اجرا معتبر است. برای رمز ثابت، ADMIN_PASSWORD را در env تنظیم کنید.');
  }
  DB.users.push({
    id: uuid(),
    name: process.env.ADMIN_NAME || 'مدیر یاران',
    email: (process.env.ADMIN_EMAIL || 'admin@yaran.ir').toLowerCase(),
    password: bcrypt.hashSync(adminPassword, 10),
    role: 'admin',
    tenant: TENANT,
    createdAt: new Date().toISOString(),
  });
  saveUsers();
}

// Seed demo data
const demoId = uuid();
DB.children.push(
  { id: demoId, name: 'نیکان', parentEmail: 'parent@example.com', tenant: TENANT },
  { id: uuid(), name: 'آرش', parentEmail: 'parent@example.com', tenant: TENANT }
);

// ── Middleware ──
// CORS: فقط دامنه‌های شناخته‌شده مجازند (GitHub Pages + لوکال) — با ALLOWED_ORIGINS در env قابل افزودن
const defaultOrigins = [
  'https://pooyankr-boop.github.io',
  'https://yaran.onrender.com',
  'http://localhost:4000',
  'http://127.0.0.1:4000',
];
const extraOrigins = (process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
const allowedOrigins = [...defaultOrigins, ...extraOrigins];
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error('Not allowed by CORS'));
  },
}));
app.use(express.json());

// Health check (for Render + keep-alive)
app.get('/health', (_req, res) => res.json({ ok: true }));

// Serve static frontend
app.use(express.static(path.join(__dirname, '..'), {
  setHeaders: (res, filePath) => {
    if (/\.(js|css|html)$/.test(filePath)) {
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
    }
    if (/\.yar$/i.test(filePath)) {
      res.setHeader('Content-Type', 'video/mp4');
    }
  }
}));

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'احراز هویت نشده' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'توکن نامعتبر' });
  }
}

function staffOnly(req, res, next) {
  if (!['teacher', 'admin'].includes(req.user.role)) {
    return res.status(403).json({ error: 'دسترسی غیرمجاز' });
  }
  next();
}

function adminOnly(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'دسترسی فقط برای مدیر' });
  }
  next();
}

// ── Rate limiting (simple in-memory) ──
const rateLimit = {};
function rateLimitCheck(key, maxPerMinute = 20) {
  const now = Date.now();
  const entry = rateLimit[key] || { count: 0, reset: now + 60000 };
  if (now > entry.reset) { entry.count = 0; entry.reset = now + 60000; }
  entry.count++;
  rateLimit[key] = entry;
  return entry.count <= maxPerMinute;
}

// ════════════════ Routes ════════════════

// ── Panel data (reports, notes, messages) — single JSON file ──
const PANEL_PATH = path.join(__dirname, '..', 'data', 'panel.json');
let panel = { reports: [], notes: [], messages: [] };
function loadPanel() {
  try {
    const raw = JSON.parse(fs.readFileSync(PANEL_PATH, 'utf8'));
    panel = { reports: raw.reports || [], notes: raw.notes || [], messages: raw.messages || [] };
  } catch { /* first run */ }
}
function savePanel() {
  fs.writeFileSync(PANEL_PATH, JSON.stringify(panel, null, 2), 'utf8');
}
loadPanel();

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, tenant: TENANT, time: new Date().toISOString() });
});

// ── Bot status (always reports external bot) ──
app.get('/api/bot/status', (_req, res) => {
  res.json({ running: false, note: "Bot runs externally via telegram-bot/bot.js" });
});

// ── Auth ──
app.post('/api/auth/register', (req, res) => {
  const ip = req.ip;
  if (!rateLimitCheck('register:' + ip, 5)) {
    return res.status(429).json({ error: 'تعداد درخواستها بیش از حد مجاز' });
  }

  const { name, email, password, role, tenant } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'نام، ایمیل و رمز عبور الزامی است' });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'رمز عبور حداقل ۶ کاراکتر باشد' });
  }
  if (DB.users.find(u => u.email === email && u.tenant === (tenant || TENANT))) {
    return res.status(409).json({ error: 'این ایمیل قبلاً ثبت شده' });
  }

  // Only allow teacher/parent from client — admin must be set server-side
  const allowedRoles = ['teacher', 'parent'];
  const userRole = allowedRoles.includes(role) ? role : 'teacher';

  const user = {
    id: uuid(),
    name,
    email,
    password: bcrypt.hashSync(password, 10),
    role: userRole,
    tenant: tenant || TENANT,
    createdAt: new Date().toISOString(),
  };
  DB.users.push(user);
  saveUsers();

  const token = jwt.sign({ id: user.id, email: user.email, role: user.role, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});

app.post('/api/auth/login', (req, res) => {
  const ip = req.ip;
  if (!rateLimitCheck('login:' + ip, 10)) {
    return res.status(429).json({ error: 'تعداد تلاشها بیش از حد مجاز' });
  }

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'ایمیل و رمز عبور الزامی است' });
  }

  const user = DB.users.find(u => u.email === email && u.tenant === TENANT);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: 'ایمیل یا رمز عبور اشتباه است' });
  }

  const token = jwt.sign({ id: user.id, email: user.email, role: user.role, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});

// ── Rooms (read-only) ──
app.get('/api/rooms', (_req, res) => {
  // Rooms are served from static JS on client — this endpoint is for future dynamic data
  res.json({ rooms: [], message: 'اتاقها از فایل استاتیک لود میشوند' });
});

// ── Archive ──
app.get('/api/archive/categories', (_req, res) => {
  // Will be populated from DB later
  res.json([]);
});

app.get('/api/archive', (req, res) => {
  const { q, category, pageSize = 60 } = req.query;
  // Placeholder — real implementation reads from DB
  res.json({ items: [], total: 0 });
});

// ── Tasks ──
// Single source of truth: data/tasks.json (written by bot sync + whiteboard)
const TASKS_PATH = path.join(__dirname, '..', 'data', 'tasks.json');
let memoryTasks = [];

function loadTasks() {
  try {
    if (fs.existsSync(TASKS_PATH)) {
      const raw = JSON.parse(fs.readFileSync(TASKS_PATH, 'utf8'));
      memoryTasks = Array.isArray(raw) ? raw : (raw.tasks || []);
    }
  } catch {}
}
function saveTasks() {
  try {
    fs.mkdirSync(path.dirname(TASKS_PATH), { recursive: true });
    fs.writeFileSync(TASKS_PATH, JSON.stringify({ tasks: memoryTasks, last_updated: new Date().toISOString() }, null, 2));
  } catch {}
}
loadTasks();

// POST /api/tasks — create task (from whiteboard or Telegram)
app.post('/api/tasks', (req, res) => {
  if (!rateLimitCheck('tasks:' + req.ip, 40)) {
    return res.status(429).json({ error: 'تعداد درخواستها بیش از حد مجاز' });
  }
  const { title, description, assigned_to, priority, due_date, room, source, groupId, id } = req.body;
  if (!title) return res.status(400).json({ error: 'title required' });
  const task = {
    id: id || uuid(),
    title,
    description: description || '',
    status: 'pending',
    priority: priority || 'medium',
    assigned_to: assigned_to || null,
    due_date: due_date || null,
    room: room || null,
    source: source || 'whiteboard',
    groupId: groupId || null,
    created_by: req.body.created_by || null,
    created_at: new Date().toISOString(),
    completed_at: null,
  };
  memoryTasks.push(task);
  saveTasks();
  broadcastTaskUpdate(task);
  res.json(task);
});

// PATCH /api/tasks/:id — update task status
app.patch('/api/tasks/:id', (req, res) => {
  const task = memoryTasks.find(t => String(t.id) === req.params.id);
  if (!task) return res.status(404).json({ error: 'not found' });
  Object.assign(task, req.body,
    { updated_at: new Date().toISOString() },
    req.body.status === 'completed' ? { completed_at: new Date().toISOString() } : {});
  saveTasks();
  broadcastTaskUpdate(task);
  res.json(task);
});

// DELETE /api/tasks/done — clear all completed (must precede /:id)
app.delete('/api/tasks/done', (req, res) => {
  const before = memoryTasks.length;
  memoryTasks = memoryTasks.filter(t => t.status !== 'completed');
  saveTasks();
  broadcastTaskUpdate({ _cleared: true, removed: before - memoryTasks.length });
  res.json({ ok: true, removed: before - memoryTasks.length });
});

// DELETE /api/tasks/:id
app.delete('/api/tasks/:id', (req, res) => {
  const idx = memoryTasks.findIndex(t => String(t.id) === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'not found' });
  const [removed] = memoryTasks.splice(idx, 1);
  saveTasks();
  broadcastTaskUpdate({ ...removed, _deleted: true });
  res.json({ ok: true });
});

app.get('/api/tasks', (_req, res) => {
  res.json({ tasks: memoryTasks.reverse() });
});

// ── Chat Bot Proxy (Groq API) ──
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'messages required' });
    }
    const apiKey = process.env.GROQ_API_KEY || process.env.HF_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'GROQ_API_KEY / HF_API_KEY not configured' });
    }
    const data = await llm.chat({
      messages: [
        { role: 'system', content: 'مهمترین قانون: هرگز اطلاعات جعلی، آدرس وبسایت ابداعی، شماره تلفن ساختگی یا هیچ اطلاعاتی که مطمئن نیستی صحیح است ارائه نکن. اگر چیزی را نمیدانی بگو «اطلاعات دقیقی در این مورد ندارم». فقط به فارسی پاسخ بده. تو یاران هستی، نه ChatGPT.' },
        ...messages
      ],
      max_tokens: 500,
      temperature: 0.7
    });
    res.json(data);
  } catch (e) {
    console.error('Chat proxy error:', e.message);
    const exhausted = e.status === 402 || /402|Payment/i.test(e.message || '');
    res.status(exhausted ? 503 : 500).json({ error: exhausted ? 'providers_exhausted' : e.message });
  }
});

/* ═══════════ Needle Agent — چتبات اجراکنده ═══════════ */
const { createNeedle } = require('./needle');
const llm = require('./llm');

// کتابخانههای سمت سرور برای جستجو (پارس سبک از فایلهای داده)
const needleLibs = (function () {
  const libs = { DECK_LIBRARY: [], PODCAST_TITLES: [] };
  try {
    const deckSrc = fs.readFileSync(path.join(__dirname, '..', 'js', 'deck-data.js'), 'utf8');
    const deckRe = /id:\s*"([^"]+)"[^}]*?title:\s*"([^"]+)"[^}]*?desc:\s*"([^"]+)"[^}]*?audience:\s*\[([^\]]*)\]/g;
    let m;
    while ((m = deckRe.exec(deckSrc)) !== null) {
      libs.DECK_LIBRARY.push({
        id: m[1], title: m[2], desc: m[3],
        audience: (m[4].match(/"([^"]+)"/g) || []).map(s => s.replace(/"/g, ''))
      });
    }
  } catch (e) { console.warn('needle decks:', e.message); }
  try {
    const podSrc = fs.readFileSync(path.join(__dirname, '..', 'data', 'podcasts', 'castbox-channels.js'), 'utf8');
    // هر اپیزود: title/audioUrl — دسته از نزدیکترین category قبل از آن
    const podRe = /category:\s*"([^"]+)"|title:\s*"([^"]+)"/g;
    let p, lastCat = '';
    while ((p = podRe.exec(podSrc)) !== null) {
      if (p[1]) { lastCat = p[1]; continue; }
      const t = p[2];
      if (t && !libs.PODCAST_TITLES.some(x => x.title === t)) {
        libs.PODCAST_TITLES.push({ title: t, category: lastCat });
      }
    }
  } catch (e) { console.warn('needle podcasts:', e.message); }
  // castbox-data + playlist-data: {"title":"..","src":".."}
  for (const f of ['castbox-data.js', 'playlist-data.js', 'castbox-meditation-data.js']) {
    try {
      const s2 = fs.readFileSync(path.join(__dirname, '..', 'data', 'podcasts', f), 'utf8');
      const r2 = /"title"\s*:\s*"([^"]+)"/g;
      let p2;
      while ((p2 = r2.exec(s2)) !== null) {
        const t = p2[1];
        if (t && !libs.PODCAST_TITLES.some(x => x.title === t)) {
          libs.PODCAST_TITLES.push({ title: t, category: '' });
        }
      }
    } catch (e) { console.warn('needle podcasts extra:', f, e.message); }
  }
  // podcast-research.js: {"title":"..","category":".."}
  try {
    const s3 = fs.readFileSync(path.join(__dirname, '..', 'data', 'podcasts', 'podcast-research.js'), 'utf8');
    const r3 = /"title"\s*:\s*"([^"]+)"[\s\S]{0,900}?"category"\s*:\s*"([^"]*)"/g;
    let p3;
    while ((p3 = r3.exec(s3)) !== null) {
      const t = p3[1];
      if (t && !libs.PODCAST_TITLES.some(x => x.title === t)) {
        libs.PODCAST_TITLES.push({ title: t, category: p3[2] });
      }
    }
  } catch (e) { console.warn('needle podcasts research:', e.message); }
  return libs;
})();

const needle = createNeedle({
  PORT: PORT,
  signToken: (user) => jwt.sign({ id: user.id, email: user.email, role: user.role, name: user.name }, JWT_SECRET, { expiresIn: '1h' }),
  DECK_LIBRARY: needleLibs.DECK_LIBRARY,
  PODCAST_TITLES: needleLibs.PODCAST_TITLES
});

app.post('/api/agent', authMiddleware, async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'messages required' });
    }
    const apiKey = process.env.GROQ_API_KEY || process.env.HF_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'GROQ_API_KEY / HF_API_KEY not configured' });
    }

    // پرامپت سیستم با هویت + دانش سایت + راهنمای Needle + تاریخ امروز
    const now = new Date();
    const todayISO = now.toISOString().slice(0, 10);
    // هفته: دوشنبه همان هفته
    const day = (now.getUTCDay() + 6) % 7; // mon=0
    const monday = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - day));
    const mondayISO = monday.toISOString().slice(0, 10);
    const tomorrowISO = new Date(now.getTime() + 86400000).toISOString().slice(0, 10);
    const dayAfterISO = new Date(now.getTime() + 2 * 86400000).toISOString().slice(0, 10);
    const DAY_FA = ['یکشنبه', 'دوشنبه', 'سهشنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه'];

    const sysPrompt = [
      'مهمترین قانون: هرگز اطلاعات جعلی یا ابداعی نده. فقط به فارسی پاسخ بده. تو یاران هستی، نه ChatGPT.',
      'روال پرسشگری (مثل ربات تلگرام): اگر کاربر خواست چیزی بسازد یا برنامه بگذاری و جزئیات کلیدی (روز/ساعت/موضوع/مربی/کودک/عنوان) را نگفته، هرگز حدس نزن و هرگز هیچ ابزار اجرایی (set_weekly_plan/create_*) را صدا نزن — فقط ask_user بزن. در هر نوبت فقط «یک» سوال با گزینههای واقعی بپرس؛ سوال بعدی را بعد از جواب کاربر بپرس. وقتی همه جزئیات را دادی، اجرا کن.',
      'تو دستیار اجرایی مدیر سایت مهدکودک یاران هستی. میتوانی با ابزار needle_execute عملیات واقعی روی سایت انجام دهی: مدیریت کودکان، مربیان، کلاسها، گزارشها، رویدادها، برنامه هفتگی، پیام والدین، کارها، یادداشتها، جستجوی محتوا و هدایت کاربر به اتاقها و درسها.',
      'تاریخ امروز میلادی: ' + todayISO + ' (' + DAY_FA[now.getUTCDay()] + '). دوشنبه این هفته: ' + mondayISO + '. فردا: ' + tomorrowISO + '. پس فردا: ' + dayAfterISO + '. برای برنامه هفتگی از این تاریخها استفاده کن و هرگز تاریخ شمسی را از خودت حساب نکن — فقط میلادی بگو.',
      'زبان: فقط و فقط فارسی پاسخ بده. هرگز به چینی، انگلیسی، عربی یا روسی جواب نده — حتی اگر سؤال به زبان دیگر بود.',
      needle.guide,
      'قوانین: ۱) هرگاه کاربر درخواست عملی کرد (ساختن/ویرایش/حذف/فهرست/جستجو/رفتن/وارد کردن)، حتماً ابزار needle_execute را صدا بزن — هرگز فقط توضیح نده یا جدول فرضی نشان نده. ۲) برای «برو به/باز کن/نمایش بده» از client_open_panel یا client_navigate_room یا client_open_deck استفاده کن. ۳) برای نوشتن برنامه هفتگی حتماً set_weekly_plan را اجرا کن. ۴) هرگز شناسهها (teacherId/classId/childId) را از خودت نساز — اول list_teachers/list_classes/list_children بگیر و شناسه واقعی را استفاده کن. ۵) قبل از حذف یا عملیات حساس، تأیید بگیر. ۶) نتیجه ابزار را به فارسی روان گزارش کن. ۷) هرگز پروتکل ابزار را از خودت نساز — فقط با action و args دقیق از راهنما؛ هرگز delete با «لیست خالی = حذف همه» وجود ندارد. ۸) نمایش کاربرگ/درس: اول search_decks{query} بعد client_open_deck{deckId}. ۹) «پلیر/پخشکننده/فهرست صوتی» → client_navigate_room به اتاق مربوط. ۱۰) اگر ابزار خطا داد، دوباره با args صحیح امتحان کن؛ اگر نشد، صادقانه بگو چه چیزی نشد. ۱۱) مهم — ساختن/برنامهگذاری: اگر جزئیات کلیدی (روز/ساعت/موضوع/مربی/کودک/عنوان) را کاربر نگفته، هرگز حدس نزن و اجرا نکن — اول با ask_user{question, options} بپرس؛ بعد از جواب کاربر مرحله بعد را بپرس یا اجرا کن. ۱۲) فقط وقتی همه اطلاعات لازم را داری بدون پرسیدن اجرا کن.'
    ].join('\n');

    async function callGroq(msgs, tools) {
      const body = {
        messages: [{ role: 'system', content: sysPrompt }, ...msgs],
        max_tokens: 1200,
        temperature: 0.4
      };
      if (tools) { body.tools = tools; body.tool_choice = 'auto'; }
      return await llm.chat(body);
    }

    // حلقه ابزار: حداکثر ۶ دور
    let convo = messages.slice(-12);
    let clientActions = [];
    let finalMsg = null;
    const toolResults = [];
    for (let i = 0; i < 6; i++) {
      const data = await callGroq(convo, needle.tools);
      const choice = data.choices && data.choices[0];
      if (!choice) throw new Error('پاسخ نامعتبر از ' + (data._provider || 'مدل'));
      const msg = choice.message;
      const toolCalls = msg.tool_calls;

      if (!toolCalls || !toolCalls.length) {
        finalMsg = (msg.content && msg.content.trim()) ? msg.content : null;
        break;
      }

      convo = convo.concat([{ role: 'assistant', content: msg.content || '', tool_calls: toolCalls }]);
      let asked = false;
      for (const tc of toolCalls) {
        let action = null, params = {};
        try {
          const fnName = (tc.function && tc.function.name) || '';
          let a = tc.function && tc.function.arguments;
          if (typeof a === 'string') a = JSON.parse(a || '{}');
          if (!a || typeof a !== 'object' || Array.isArray(a)) a = {};
          if (fnName === 'needle_execute') {
            // شکل اصلی: needle_execute{action, args}
            if (!a.action && a.needle_execute) a = a.needle_execute;
            if (a.action && a.args && typeof a.args === 'object') { action = a.action; params = a.args; }
            else if (a.action) { action = a.action; const { action: _ac, ...rest } = a; params = rest; }
          } else {
            // مدل هر عمل را تابع جدا صدا میزند: search_decks{query}
            action = fnName; params = a;
          }
        } catch (_e) {}
        let result;
        try {
          result = await needle.execute(req.user, action, params);
          // جمعآوری اقدامات سمت مرورگر
          if (result && result.client_action) {
            clientActions.push(result.client_action);
            // پرسش تلگرامی: تا جواب کاربر هیچ ابزار دیگری اجرا نشود
            if (result.client_action.type === 'ask') { asked = true; break; }
          }
        } catch (e) {
          result = { error: e.message };
        }
        if (!result || result.error || result.ok === false) {
          console.error('[needle fail]', action, JSON.stringify(params || {}).slice(0, 300), '=>', JSON.stringify(result).slice(0, 300));
        }
        toolResults.push(result);
        console.log('[needle]', action, JSON.stringify(params || {}).slice(0, 120), '=>', JSON.stringify(result).slice(0, 160));
        convo = convo.concat([{ role: 'tool', tool_call_id: tc.id, content: JSON.stringify(result).slice(0, 4000) }]);
      }
      if (asked) { finalMsg = ' '; break; } // متن خالی — سوال خودش رندر میشود
      finalMsg = null; // دور بعدی پاسخ نهایی میآید
    }

    if (finalMsg === null) {
      // حلقه تمام شد ولی پاسخ متنی نیامد → جمعبندی از نتایج ابزار
      const done = toolResults.filter(r => r && (r.ok === true || r.client_action));
      if (done.length) {
        finalMsg = done.map(r => '✅ ' + (r.message || r.action || 'انجام شد')).join('\n');
      } else if (toolResults.length) {
        finalMsg = 'انجام درخواست ممکن نشد: ' + (toolResults[0].error || 'خطای نامشخص');
      } else {
        finalMsg = 'درخواست واضح نبود. لطفاً دقیقتر بگو چه کاری انجام دهم؟';
      }
    }

    // مدل گاهی ابزار را متن خام میفرستد: search_decks{query:".."} → اجرا کن
    const rawTool = finalMsg.match(/^(?:needle_execute\s+)?([a-z_]{3,40})\s*\{([\s\S]*)\}\s*$/i);
    if (rawTool) {
      try {
        let rawArgs = rawTool[2].trim() || '{}';
        let parsed;
        try { parsed = JSON.parse(rawArgs); }
        catch (_e) {
          // کلیدهای بدون کوتیشن: {query: x}
          parsed = JSON.parse(rawArgs.replace(/([{,]\s*)([A-Za-z_]\w*)\s*:/g, '$1"$2":'));
        }
        let actionName = rawTool[1];
        let params = parsed;
        if (actionName === 'needle_execute') { actionName = parsed.action; params = parsed.args || {}; }
        const r = await needle.execute(req.user, actionName, params);
        if (r && r.client_action) clientActions.push(r.client_action);
        if (r && Array.isArray(r.results) && r.results.length) {
          const lines = r.results.map(x => '• ' + (x.title || x.id || '')).slice(0, 10).join('\n');
          finalMsg = (r.count || r.results.length) + ' نتیجه پیدا شد:\n' + lines;
        } else {
          finalMsg = (r && r.message) || (r && r.error) || 'انجام شد.';
        }
        console.log('[needle rawtext fallback]', actionName);
      } catch (_e) { /* نامربوط بود — متن اصلی میماند */ }
    }

    res.json({ reply: finalMsg, clientActions });
  } catch (e) {
    console.error('Agent error:', e.message);
    const rateLimited = e.status === 429 || /rate limit|quota/i.test(e.message || '');
    const exhausted = e.status === 402 || /402|Payment/i.test(e.message || '');
    if (exhausted) return res.status(503).json({ error: 'providers_exhausted' });
    res.status(rateLimited ? 429 : 500).json({ error: rateLimited ? 'rate_limited' : e.message });
  }
});

// ── Content update (staff only) ──
app.put('/api/content/:id', authMiddleware, staffOnly, (req, res) => {
  res.json({ ok: true, message: 'محتوا بروزرسانی شد' });
});

// ── PDF Proxy (for PDF.js canvas rendering) ──
const https = require('https');

// جلوگیری از SSRF: آی‌پی‌های خصوصی/لوکال/متادیتای ابری اجازه‌ی درخواست ندارند
function isPrivateOrLocalIp(ip) {
  if (net.isIPv4(ip)) {
    const [a, b] = ip.split('.').map(Number);
    if (a === 127 || a === 10 || a === 0) return true;
    if (a === 169 && b === 254) return true; // link-local + cloud metadata (169.254.169.254)
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 192 && b === 168) return true;
    return false;
  }
  if (net.isIPv6(ip)) {
    const lower = ip.toLowerCase();
    return lower === '::1' || lower.startsWith('fe80') || lower.startsWith('fc') || lower.startsWith('fd');
  }
  return false;
}

app.get('/api/pdf-proxy', (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'URL required' });
  let parsed;
  try { parsed = new URL(url); } catch { return res.status(400).json({ error: 'Invalid URL' }); }
  if (!['http:', 'https:'].includes(parsed.protocol)) {
    return res.status(400).json({ error: 'Invalid protocol' });
  }
  const hostname = parsed.hostname.toLowerCase();
  if (hostname === 'localhost' || isPrivateOrLocalIp(hostname)) {
    return res.status(400).json({ error: 'Host not allowed' });
  }
  dns.lookup(hostname, (dnsErr, resolvedIp) => {
    if (dnsErr) return res.status(400).json({ error: 'DNS resolve failed' });
    if (isPrivateOrLocalIp(resolvedIp)) {
      return res.status(400).json({ error: 'Host not allowed' });
    }
    fetchPdf(parsed, url, res);
  });
});

function fetchPdf(parsed, url, res) {
  const mod = parsed.protocol === 'https:' ? https : http;
  const proxyReq = mod.get(url, { headers: { 'User-Agent': 'Yaran-PDF-Proxy/1.0' }, timeout: 15000 }, (proxyRes) => {
    if (proxyRes.statusCode >= 300 && proxyRes.statusCode < 400 && proxyRes.headers.location) {
      // Follow redirect
      const redirectMod = proxyRes.headers.location.startsWith('https') ? https : http;
      redirectMod.get(proxyRes.headers.location, { timeout: 15000 }, (redirRes) => {
        res.setHeader('Content-Type', redirRes.headers['content-type'] || 'application/pdf');
        res.setHeader('Cache-Control', 'public, max-age=86400');
        redirRes.pipe(res);
      }).on('error', () => res.status(502).json({ error: 'Redirect failed' }));
      return;
    }
    res.setHeader('Content-Type', proxyRes.headers['content-type'] || 'application/pdf');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    proxyRes.pipe(res);
  });
  proxyReq.on('error', () => res.status(502).json({ error: 'Could not fetch PDF' }));
  proxyReq.on('timeout', () => { proxyReq.destroy(); res.status(504).json({ error: 'Timeout' }); });
}

// ── Audio Proxy (CORS bypass for CastBox/S3 audio) ──
const ALLOWED_AUDIO_HOSTS = ['s3.castbox.fm', 'castbox.fm', 'upload.wikimedia.org', 'dl.istgahekoodak.ir'];
function _guessAudioMime(url) {
  if (/\.m4a(\?|#|$)/i.test(url)) return 'audio/mp4';
  if (/\.mp3(\?|#|$)/i.test(url)) return 'audio/mpeg';
  if (/\.ogg(\?|#|$)/i.test(url)) return 'audio/ogg';
  if (/\.wav(\?|#|$)/i.test(url)) return 'audio/wav';
  return 'audio/mpeg';
}
app.get('/api/audio-proxy', (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'URL required' });
  let parsed;
  try { parsed = new URL(url); } catch { return res.status(400).json({ error: 'Invalid URL' }); }
  if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
    return res.status(400).json({ error: 'Invalid protocol' });
  }
  const hostname = parsed.hostname.toLowerCase();
  if (!ALLOWED_AUDIO_HOSTS.some(h => hostname === h || hostname.endsWith('.' + h))) {
    return res.status(403).json({ error: 'Host not allowed' });
  }
  if (isPrivateOrLocalIp(hostname)) {
    return res.status(400).json({ error: 'Host not allowed' });
  }

  const cacheKey = url;
  const mod = parsed.protocol === 'https:' ? https : http;
  const extraHeaders = { 'User-Agent': 'Yaran-Audio-Proxy/1.0' };
  if (req.headers.range) extraHeaders['Range'] = req.headers.range;
  if (hostname.endsWith('istgahekoodak.ir')) extraHeaders['Referer'] = 'https://istgahekoodak.ir/';
  const proxyReq = mod.get(url, {
    headers: extraHeaders,
    timeout: 30000,
  }, (proxyRes) => {
    if (proxyRes.statusCode >= 300 && proxyRes.statusCode < 400 && proxyRes.headers.location) {
      const redirectMod = proxyRes.headers.location.startsWith('https') ? https : http;
      redirectMod.get(proxyRes.headers.location, { timeout: 15000 }, (redirRes) => {
        res.setHeader('Content-Type', _guessAudioMime(url));
        res.setHeader('Accept-Ranges', 'bytes');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Cache-Control', 'public, max-age=86400');
        redirRes.pipe(res);
      }).on('error', () => res.status(502).end());
      return;
    }
    res.setHeader('Content-Type', _guessAudioMime(url));
    res.setHeader('Content-Length', proxyRes.headers['content-length'] || '');
    res.setHeader('Accept-Ranges', 'bytes');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    if (proxyRes.statusCode === 206) res.statusCode = 206;
    proxyRes.pipe(res);
  });
  proxyReq.on('error', () => res.status(502).end());
  proxyReq.on('timeout', () => { proxyReq.destroy(); res.status(504).end(); });
});

app.options('/api/audio-proxy', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Range');
  res.end();
});

// ── Reports (from bot) ──
app.post('/api/reports', (req, res) => {
  if (!rateLimitCheck('reports:' + req.ip, 20)) {
    return res.status(429).json({ error: 'تعداد درخواستها بیش از حد مجاز' });
  }
  const { childName, mood, food, sleep, note, groupId, date, fromBot } = req.body;
  if (!mood || !food || !sleep) {
    return res.status(400).json({ error: 'mood, food, sleep required' });
  }
  const report = {
    id: uuid(),
    childName: childName || 'ناشناس',
    mood, food, sleep,
    note: (note || '').substring(0, 500),
    groupId: groupId || GROUP_ID_STR,
    date: date || new Date().toISOString(),
    fromBot: !!fromBot,
    tenant: TENANT,
  };
  panel.reports.push(report);
  savePanel();
  res.json(report);
});

// Panel reads — no auth (same origin, local tool)
app.get('/api/reports', (_req, res) => res.json({ reports: panel.reports.slice().reverse() }));
app.post('/api/notes', (req, res) => {
  if (!rateLimitCheck('notes:' + req.ip, 20)) {
    return res.status(429).json({ error: 'تعداد درخواستها بیش از حد مجاز' });
  }
  const { text, author, groupId, date } = req.body;
  if (!text) return res.status(400).json({ error: 'text required' });
  const note = {
    id: uuid(),
    text: String(text).substring(0, 1000),
    author: author || 'ربات',
    groupId: groupId || GROUP_ID_STR,
    date: date || new Date().toISOString(),
    tenant: TENANT,
  };
  panel.notes.push(note);
  savePanel();
  broadcastNoteUpdate(note);
  res.json(note);
});
app.get('/api/notes', (_req, res) => res.json({ notes: panel.notes.slice().reverse() }));
app.patch('/api/notes/:id', (req, res) => {
  const note = panel.notes.find(n => n.id === req.params.id);
  if (!note) return res.status(404).json({ error: 'not found' });
  if (req.body.text) note.text = String(req.body.text).substring(0, 1000);
  savePanel();
  broadcastNoteUpdate(note);
  res.json(note);
});
app.delete('/api/notes/:id', (req, res) => {
  const before = panel.notes.length;
  panel.notes = panel.notes.filter(n => n.id !== req.params.id);
  savePanel();
  broadcastNoteUpdate({ _deleted: true, id: req.params.id });
  res.json({ removed: before - panel.notes.length });
});
app.post('/api/messages', (req, res) => {
  if (!rateLimitCheck('messages:' + req.ip, 20)) {
    return res.status(429).json({ error: 'تعداد درخواستها بیش از حد مجاز' });
  }
  const { text, author, groupId, date } = req.body;
  if (!text) return res.status(400).json({ error: 'text required' });
  const msg = {
    id: uuid(),
    text: String(text).substring(0, 1000),
    author: author || 'ربات',
    groupId: groupId || GROUP_ID_STR,
    date: date || new Date().toISOString(),
    tenant: TENANT,
  };
  panel.messages.push(msg);
  savePanel();
  broadcastMessageUpdate(msg);
  res.json(msg);
});
app.get('/api/messages', (_req, res) => res.json({ messages: panel.messages.slice().reverse() }));
app.patch('/api/messages/:id', (req, res) => {
  const msg = panel.messages.find(m => m.id === req.params.id);
  if (!msg) return res.status(404).json({ error: 'not found' });
  if (req.body.text) msg.text = String(req.body.text).substring(0, 1000);
  savePanel();
  broadcastMessageUpdate(msg);
  res.json(msg);
});
app.delete('/api/messages/:id', (req, res) => {
  const before = panel.messages.length;
  panel.messages = panel.messages.filter(m => m.id !== req.params.id);
  savePanel();
  broadcastMessageUpdate({ _deleted: true, id: req.params.id });
  res.json({ removed: before - panel.messages.length });
});

// ── Panel: everything the site board needs, one call ──
app.get('/api/panel', (_req, res) => res.json({
  reports: [...panel.reports].reverse().slice(0, 30),
  notes: [...panel.notes].reverse().slice(0, 30),
  messages: [...panel.messages].reverse().slice(0, 30),
}));

// ── Panel moderation (admin/staff only) ──
app.delete('/api/notes/:id', authMiddleware, staffOnly, (req, res) => {
  const before = panel.notes.length;
  panel.notes = panel.notes.filter(n => n.id !== req.params.id);
  if (panel.notes.length === before) return res.status(404).json({ error: 'not found' });
  savePanel();
  res.json({ ok: true });
});
app.delete('/api/messages/:id', authMiddleware, staffOnly, (req, res) => {
  const before = panel.messages.length;
  panel.messages = panel.messages.filter(m => m.id !== req.params.id);
  if (panel.messages.length === before) return res.status(404).json({ error: 'not found' });
  savePanel();
  res.json({ ok: true });
});
app.delete('/api/reports/:id', authMiddleware, staffOnly, (req, res) => {
  const before = panel.reports.length;
  panel.reports = panel.reports.filter(r => r.id !== req.params.id);
  if (panel.reports.length === before) return res.status(404).json({ error: 'not found' });
  savePanel();
  res.json({ ok: true });
});

// ── Admin: user management ──
app.get('/api/admin/users', authMiddleware, adminOnly, (_req, res) => {
  const users = DB.users
    .filter(u => u.tenant === TENANT)
    .map(u => ({ id: u.id, name: u.name, email: u.email, role: u.role, createdAt: u.createdAt }));
  res.json({ users });
});
// تغییر نقش کاربر — فقط بین teacher/parent (ارتقا به admin از این مسیر ممنوع، برای جلوگیری از افزایش سطح دسترسی خودسرانه)
app.patch('/api/admin/users/:id/role', authMiddleware, adminOnly, (req, res) => {
  const { role } = req.body;
  if (!['teacher', 'parent'].includes(role)) {
    return res.status(400).json({ error: 'نقش نامعتبر' });
  }
  const user = DB.users.find(u => u.id === req.params.id && u.tenant === TENANT);
  if (!user) return res.status(404).json({ error: 'not found' });
  if (user.role === 'admin') return res.status(400).json({ error: 'نمی‌توان نقش ادمین را از این مسیر تغییر داد' });
  user.role = role;
  saveUsers();
  res.json({ ok: true, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});
app.delete('/api/admin/users/:id', authMiddleware, adminOnly, (req, res) => {
  const target = DB.users.find(u => u.id === req.params.id && u.tenant === TENANT);
  if (!target) return res.status(404).json({ error: 'not found' });
  if (target.role === 'admin') return res.status(400).json({ error: 'نمی‌توان حساب ادمین را حذف کرد' });
  DB.users = DB.users.filter(u => u.id !== req.params.id);
  saveUsers();
  res.json({ ok: true });
});

// ── Children ──
app.get('/api/children', authMiddleware, (req, res) => {
  const user = req.user;
  let kids;
  if (user.role === 'parent') {
    kids = DB.children.filter(c => c.parentEmail === user.email && c.tenant === TENANT);
  } else {
    kids = DB.children.filter(c => c.tenant === TENANT);
  }
  res.json(kids);
});

// ── Reports ──
app.get('/api/children/:childId/reports', authMiddleware, (req, res) => {
  const reports = DB.reports
    .filter(r => r.childId === req.params.childId && r.tenant === TENANT)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  res.json(reports);
});

app.post('/api/children/:childId/reports', authMiddleware, staffOnly, (req, res) => {
  const { mood, food, sleep, note } = req.body;
  if (!mood && !food && !sleep && !note) {
    return res.status(400).json({ error: 'حداقل یک فیلد الزامی است' });
  }
  const report = {
    id: uuid(),
    childId: req.params.childId,
    mood, food, sleep,
    note: (note || '').substring(0, 500), // limit note length
    teacher: { id: req.user.id, name: req.user.name },
    date: new Date().toISOString(),
    tenant: TENANT,
  };
  DB.reports.push(report);
  res.json(report);
});

// ── Admin: Children CRUD (تعریف کودک برای والدین و اختصاص به مربی) ──
app.get('/api/admin/children', authMiddleware, adminOnly, (_req, res) => {
  res.json(DB.children.filter(c => c.tenant === TENANT));
});
app.post('/api/admin/children', authMiddleware, adminOnly, (req, res) => {
  const { name, age, parentEmail, teacherId, classId } = req.body;
  if (!name) return res.status(400).json({ error: 'نام کودک الزامی است' });
  const child = {
    id: uuid(), name: String(name).substring(0, 60),
    age: String(age || '').substring(0, 20),
    parentEmail: String(parentEmail || '').toLowerCase(),
    teacherId: teacherId || null,
    classId: classId || null,
    tenant: TENANT, createdAt: new Date().toISOString(),
  };
  DB.children.push(child);
  res.json(child);
});
app.put('/api/admin/children/:id', authMiddleware, adminOnly, (req, res) => {
  const child = DB.children.find(c => c.id === req.params.id && c.tenant === TENANT);
  if (!child) return res.status(404).json({ error: 'not found' });
  const { name, age, parentEmail, teacherId, classId } = req.body;
  if (name !== undefined) child.name = String(name).substring(0, 60);
  if (age !== undefined) child.age = String(age).substring(0, 20);
  if (parentEmail !== undefined) child.parentEmail = String(parentEmail).toLowerCase();
  if (teacherId !== undefined) child.teacherId = teacherId || null;
  if (classId !== undefined) child.classId = classId || null;
  res.json(child);
});
app.delete('/api/admin/children/:id', authMiddleware, adminOnly, (req, res) => {
  const before = DB.children.length;
  DB.children = DB.children.filter(c => c.id !== req.params.id);
  if (DB.children.length === before) return res.status(404).json({ error: 'not found' });
  res.json({ ok: true });
});

// ── Admin: Classes CRUD (برنامه کلاسی) ──
app.get('/api/admin/classes', authMiddleware, adminOnly, (_req, res) => {
  res.json(DB.classes.filter(c => c.tenant === TENANT));
});
app.post('/api/admin/classes', authMiddleware, adminOnly, (req, res) => {
  const { name, teacherId, schedule, published } = req.body;
  if (!name) return res.status(400).json({ error: 'نام کلاس الزامی است' });
  const cls = {
    id: uuid(), name: String(name).substring(0, 60),
    teacherId: teacherId || null,
    schedule: schedule || [], // [{day, time, activity}]
    published: !!published,
    tenant: TENANT, createdAt: new Date().toISOString(),
  };
  DB.classes.push(cls);
  saveClasses();
  res.json(cls);
});
app.put('/api/admin/classes/:id', authMiddleware, adminOnly, (req, res) => {
  const cls = DB.classes.find(c => c.id === req.params.id && c.tenant === TENANT);
  if (!cls) return res.status(404).json({ error: 'not found' });
  const { name, teacherId, schedule, published } = req.body;
  if (name !== undefined) cls.name = String(name).substring(0, 60);
  if (teacherId !== undefined) cls.teacherId = teacherId || null;
  if (schedule !== undefined) cls.schedule = schedule;
  if (published !== undefined) cls.published = !!published;
  saveClasses();
  res.json(cls);
});
app.delete('/api/admin/classes/:id', authMiddleware, adminOnly, (req, res) => {
  const before = DB.classes.length;
  DB.classes = DB.classes.filter(c => c.id !== req.params.id);
  if (DB.classes.length === before) return res.status(404).json({ error: 'not found' });
  saveClasses();
  res.json({ ok: true });
});

// ── Admin: Reports CRUD (گزارش کودک توسط مدیر/مربی) ──
app.get('/api/admin/reports', authMiddleware, adminOnly, (_req, res) => {
  res.json(DB.reports.filter(r => r.tenant === TENANT).sort((a, b) => new Date(b.date) - new Date(a.date)));
});
app.put('/api/admin/reports/:id', authMiddleware, adminOnly, (req, res) => {
  const report = DB.reports.find(r => r.id === req.params.id && r.tenant === TENANT);
  if (!report) return res.status(404).json({ error: 'not found' });
  const { mood, food, sleep, note, published } = req.body;
  if (mood !== undefined) report.mood = mood;
  if (food !== undefined) report.food = food;
  if (sleep !== undefined) report.sleep = sleep;
  if (note !== undefined) report.note = String(note).substring(0, 500);
  if (published !== undefined) report.published = !!published;
  res.json(report);
});
app.delete('/api/admin/reports/:id', authMiddleware, adminOnly, (req, res) => {
  const before = DB.reports.length;
  DB.reports = DB.reports.filter(r => r.id !== req.params.id);
  if (DB.reports.length === before) return res.status(404).json({ error: 'not found' });
  res.json({ ok: true });
});

// ── Parent: view own children's reports ──
app.get('/api/parent/reports', authMiddleware, (req, res) => {
  if (req.user.role !== 'parent') return res.status(403).json({ error: 'فقط والد' });
  const kids = DB.children.filter(c => c.parentEmail === req.user.email && c.tenant === TENANT);
  const kidIds = new Set(kids.map(k => k.id));
  const reports = DB.reports.filter(r => kidIds.has(r.childId) && r.tenant === TENANT)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  res.json({ children: kids, reports });
});

// ── CMS: save rooms content ──
const ROOMS_PATH = path.join(__dirname, '..', 'js', 'rooms.js');
app.get('/api/cms/rooms', authMiddleware, adminOnly, (req, res) => {
  try {
    const raw = fs.readFileSync(ROOMS_PATH, 'utf8');
    // Extract JSON from "const ROOMS = [...]"
    const match = raw.match(/const\s+ROOMS\s*=\s*(\[[\s\S]*?\]);/);
    if (!match) return res.status(500).json({ error: 'Cannot parse rooms.js' });
    const rooms = JSON.parse(match[1]);
    res.json({ rooms });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
app.post('/api/cms/rooms', authMiddleware, adminOnly, (req, res) => {
  try {
    const { rooms } = req.body;
    if (!Array.isArray(rooms)) return res.status(400).json({ error: 'rooms must be array' });
    const js = '// Auto-generated by CMS — DO NOT EDIT MANUALLY\nconst ROOMS = ' + JSON.stringify(rooms, null, 2) + ';\n';
    fs.writeFileSync(ROOMS_PATH, js, 'utf8');
    res.json({ ok: true, count: rooms.length });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── CMS: file tree ──
const PROJECT_ROOT = path.join(__dirname, '..');
app.get('/api/cms/files', authMiddleware, adminOnly, (req, res) => {
  try {
    const reqPath = req.query.path || '';
    const target = path.join(PROJECT_ROOT, reqPath);
    // Security: stay within project root
    if (!target.startsWith(PROJECT_ROOT)) return res.status(403).json({ error: 'access denied' });
    if (!fs.existsSync(target)) return res.status(404).json({ error: 'path not found' });
    const stat = fs.statSync(target);
    if (stat.isDirectory()) {
      const entries = [];
      for (const f of fs.readdirSync(target)) {
        if (f === 'node_modules' || f === '.git' || f === '.DS_Store') continue;
        const full = path.join(target, f);
        const st = fs.statSync(full);
        entries.push({
          name: f,
          path: reqPath ? reqPath + '/' + f : f,
          isDir: st.isDirectory(),
          size: st.size,
          modified: st.mtime.toISOString()
        });
      }
      entries.sort((a, b) => { if (a.isDir !== b.isDir) return a.isDir ? -1 : 1; return a.name.localeCompare(b.name); });
      res.json({ entries });
    } else {
      // Single file read (for viewing content)
      const content = fs.readFileSync(target, 'utf8');
      res.json({ content, name: path.basename(target) });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


// ── Planner API (MUST be before SPA catch-all) ──
registerPlanner(app, { authMiddleware, staffOnly, TENANT, uuid, broadcast, listParents, DB });

// ── Fallback to index.html ──
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// ── Start (Render: bind 0.0.0.0 + exact PORT; local: auto-free-port) ──
function findFreePort(start) {
  return new Promise((resolve) => {
    const s = net.createServer();
    s.listen(start, () => { const p = s.address().port; s.close(() => resolve(p)); });
    s.on('error', () => resolve(findFreePort(start + 1)));
  });
}

server.keepAliveTimeout = 120000;
server.headersTimeout = 120000;

const PORT_RAW = process.env.PORT;
const logStart = (port) => {
  console.log(`🍼 Yaran server running on http://0.0.0.0:${port}`);
  console.log(`   Tasks API: http://localhost:${port}/api/tasks`);
  console.log(`   WebSocket: ws://localhost:${port}/ws`);
};

if (PORT_RAW) {
  server.listen(Number(PORT_RAW), '0.0.0.0', () => logStart(PORT_RAW));
} else {
  findFreePort(4000).then((port) => server.listen(port, '0.0.0.0', () => logStart(port)));
}

// Telegram bot runs externally via telegram-bot/bot.js

/* ══════════════════════════════════════════════════════════
   Keep-Alive: self-ping every 10 min to prevent Render sleep
   ══════════════════════════════════════════════════════════ */
const KEEPALIVE_MS = 10 * 60 * 1000; // 10 minutes
function selfPing() {
  const port = process.env.PORT || 4000;
  /* Render only counts EXTERNAL requests for sleep detection.
     RENDER_EXTERNAL_URL is auto-set by Render; fall back to localhost for dev. */
  const externalUrl = process.env.RENDER_EXTERNAL_URL || process.env.SELF_URL;
  const url = externalUrl ? `${externalUrl}/health` : `http://127.0.0.1:${port}/health`;
  const proto = url.startsWith('https') ? require('https') : require('http');
  const req = proto.get(url, (res) => {
    res.resume(); // drain response
    console.log(`[keepalive] ping OK — ${new Date().toISOString()} — ${url}`);
  });
  req.on('error', (e) => console.log(`[keepalive] ping error: ${e.message}`));
  req.setTimeout(10000, () => { req.destroy(); });
}
setInterval(selfPing, KEEPALIVE_MS);
console.log(`[keepalive] started — pinging every ${KEEPALIVE_MS / 60000} min`);