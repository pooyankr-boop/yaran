/* ═══════════════════════════════════════════════════════
   Bot memory — max 12 facts per user, each max 240 chars.
   File: data/bot-memory.json  shape: { userId: [ {k,t,ts} ] }
   needle actions: remember_fact / recall_memory / forget_memory
   Small on purpose: 12*240B ~= 3KB, no unbounded growth.
   ═══════════════════════════════════════════════════════ */
const fs = require('fs');
const path = require('path');

const MEM_PATH = path.join(__dirname, '..', 'data', 'bot-memory.json');
const MAX_PER_USER = 12;
const MAX_CHARS = 240;

let store = {};
try { store = JSON.parse(fs.readFileSync(MEM_PATH, 'utf8')) || {}; } catch (_e) { store = {}; }

function save() {
  try { fs.writeFileSync(MEM_PATH, JSON.stringify(store, null, 1)); }
  catch (e) { console.warn('[memory] write:', e.message); }
}

function clean(text) {
  return String(text || '').replace(/\s+/g, ' ').trim().slice(0, MAX_CHARS);
}

/* add — dedupe by first 80 chars (normalized); dup = refresh to top */
function add(userId, text) {
  const t = clean(text);
  if (!t) return { ok: false, error: 'متن نکته خالی است' };
  const list = store[userId] = store[userId] || [];
  const key = t.toLowerCase().slice(0, 80);
  const idx = list.findIndex(f => f.k === key);
  if (idx >= 0) list.splice(idx, 1);
  list.unshift({ k: key, t: t, ts: Date.now() });
  if (list.length > MAX_PER_USER) list.length = MAX_PER_USER;
  save();
  return { ok: true, message: 'یاد گرفتم: ' + t };
}

/* recall — newest first */
function recall(userId) {
  const list = store[userId] || [];
  return { count: list.length, facts: list.map(f => f.t) };
}

/* forget — by number (from recall) or by text match */
function forget(userId, nOrText) {
  const list = store[userId] || [];
  let idx = -1;
  if (/^\d+$/.test(String(nOrText || ''))) {
    idx = parseInt(nOrText, 10) - 1;
  } else {
    const s = String(nOrText || '');
    idx = list.findIndex(f => f.t.includes(s));
  }
  if (idx < 0 || idx >= list.length) return { ok: false, error: 'نکتهای با این شماره/متن پیدا نشد' };
  const removed = list.splice(idx, 1)[0];
  save();
  return { ok: true, message: 'فراموش شد: ' + removed.t };
}

/* system-prompt block for this user ('' when empty) */
function promptBlock(userId) {
  const list = store[userId] || [];
  if (!list.length) return '';
  const lines = list.map((f, i) => (i + 1) + '. ' + f.t).join('\n');
  return '\nحافظه این کاربر (به اینها عمل کن؛ اگر با درخواست تازه تناقض دارد، درخواست تازه حاکم است):\n' + lines;
}

module.exports = { add, recall, forget, promptBlock, MAX_PER_USER };
