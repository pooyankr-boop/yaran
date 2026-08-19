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
const { WebSocketServer } = require('ws');

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

function broadcastTaskUpdate(task) {
  const msg = JSON.stringify({ type: 'task_update', task });
  wsClients.forEach(c => { if (c.readyState === 1) c.send(msg); });
}

// ── In-memory DB (users persisted to data/users.json) ──
const DB = {
  users: [],
  children: [],
  reports: [],
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

// Serve static frontend
app.use(express.static(path.join(__dirname, '..')));

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
  res.json(note);
});
app.get('/api/notes', (_req, res) => res.json({ notes: panel.notes.slice().reverse() }));
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
  res.json(msg);
});
app.get('/api/messages', (_req, res) => res.json({ messages: panel.messages.slice().reverse() }));

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

// ── Fallback to index.html ──
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// ── Start (auto free port) ──
function findFreePort(start) {
  return new Promise((resolve) => {
    const s = net.createServer();
    s.listen(start, () => { const p = s.address().port; s.close(() => resolve(p)); });
    s.on('error', () => resolve(findFreePort(start + 1)));
  });
}

findFreePort(PORT).then(port => {
  server.listen(port, () => {
    console.log(`🍼 Yaran server running on http://localhost:${port}`);
    console.log(`   Tasks API: http://localhost:${port}/api/tasks`);
    console.log(`   WebSocket: ws://localhost:${port}/ws`);
  });
});