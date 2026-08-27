/* ═══════════════════════════════════════════════════════
   Yaran Planner & Parent Communication API
   برنامه‌ریز (تقویم شمسی سمت کلاینت) + جلسات با والدین
   + پیام‌های والدین با ضمیمه‌ی محتوای اتاق‌ها
   + برنامه هفتگی مهد (ذخیره در planner.json)
   ═══════════════════════════════════════════════════════ */
'use strict';
const fs = require('fs');
const path = require('path');

function registerPlanner(app, ctx) {
  const { authMiddleware, staffOnly, TENANT, uuid, broadcast } = ctx;

  const PLANNER_PATH = path.join(__dirname, '..', 'data', 'planner.json');
  let events = [];
  let pmsgs = [];
  let weeklyPlans = {};  // { "2026-W35": { days: { sat: [...], sun: [...], ... } } }

  function load() {
    try {
      const d = JSON.parse(fs.readFileSync(PLANNER_PATH, 'utf8'));
      events = Array.isArray(d.events) ? d.events : [];
      pmsgs = Array.isArray(d.messages) ? d.messages : [];
      weeklyPlans = d.weeklyPlans || {};
    } catch { events = []; pmsgs = []; weeklyPlans = {}; }
  }
  function save() {
    try { fs.writeFileSync(PLANNER_PATH, JSON.stringify({ events, messages: pmsgs, weeklyPlans }, null, 2), 'utf8'); }
    catch { /* read-only fs */ }
  }
  load();

  const KINDS = ['meeting', 'event', 'reminder'];
  const STATUSES = ['pending', 'confirmed', 'declined', 'cancelled', 'done'];

  /* ── رویدادها ── */
  app.get('/api/planner/events', authMiddleware, (req, res) => {
    let out = events.filter(e => e.tenant === TENANT);
    if (req.user.role === 'parent') {
      out = out.filter(e => (e.parentEmail || '').toLowerCase() === req.user.email.toLowerCase());
    }
    out.sort((a, b) => String(a.date).localeCompare(String(b.date)) || String(a.time || '').localeCompare(String(b.time || '')));
    res.json({ events: out });
  });

  app.post('/api/planner/events', authMiddleware, staffOnly, (req, res) => {
    const { kind, title, note, date, time, durationMin, parentEmail, parentName, childName, room, attachments } = req.body;
    if (!title || !title.trim()) return res.status(400).json({ error: 'عنوان الزامی است' });
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return res.status(400).json({ error: 'تاریخ باید به قالب YYYY-MM-DD میلادی باشد' });
    if (time && !/^\d{2}:\d{2}$/.test(time)) return res.status(400).json({ error: 'ساعت نامعتبر' });
    if (kind && !KINDS.includes(kind)) return res.status(400).json({ error: 'نوع رویداد نامعتبر' });
    const ev = {
      id: uuid(),
      kind: kind || 'event',
      title: String(title).trim().substring(0, 140),
      note: String(note || '').substring(0, 1000),
      date, time: time || '', durationMin: Number(durationMin) || 30,
      parentEmail: (kind === 'meeting' ? (parentEmail || '').toLowerCase() : '') || '',
      parentName: String(parentName || '').substring(0, 80),
      childName: String(childName || '').substring(0, 80),
      room: String(room || '').substring(0, 40),
      status: kind === 'meeting' ? 'pending' : 'confirmed',
      attachments: Array.isArray(attachments) ? attachments.slice(0, 10).map(a => ({
        title: String(a.title || '').substring(0, 160),
        type: String(a.type || 'pdf'),
        url: String(a.url || ''),
        image: String(a.image || ''),
        icon: String(a.icon || ''),
        audioUrl: String(a.audioUrl || '')
      })) : [],
      createdBy: { id: req.user.id, name: req.user.name },
      createdAt: new Date().toISOString(),
      tenant: TENANT,
    };
    events.push(ev);
    save();
    broadcast('planner_update', { event: ev });
    res.json(ev);
  });

  app.patch('/api/planner/events/:id', authMiddleware, (req, res) => {
    const ev = events.find(e => e.id === req.params.id && e.tenant === TENANT);
    if (!ev) return res.status(404).json({ error: 'رویداد یافت نشد' });
    const user = req.user;
    const isStaff = user.role === 'teacher' || user.role === 'admin';
    if (!isStaff) {
      // والد فقط وضعیت جلسه‌ی خودش را تغییر می‌دهد
      if ((ev.parentEmail || '').toLowerCase() !== user.email.toLowerCase()) {
        return res.status(403).json({ error: 'دسترسی ندارید' });
      }
      const st = req.body.status;
      if (!['confirmed', 'declined', 'cancelled'].includes(st)) {
        return res.status(400).json({ error: 'فقط تأیید یا رد جلسه مجاز است' });
      }
      ev.status = st;
      ev.updatedAt = new Date().toISOString();
      save();
      broadcast('planner_update', { event: ev });
      return res.json(ev);
    }
    ['title', 'note', 'date', 'time', 'durationMin', 'status', 'room'].forEach(k => {
      if (req.body[k] !== undefined) ev[k] = k === 'durationMin' ? Number(req.body[k]) || 30 : req.body[k];
    });
    if (req.body.status && !STATUSES.includes(req.body.status)) return res.status(400).json({ error: 'وضعیت نامعتبر' });
    ev.updatedAt = new Date().toISOString();
    save();
    broadcast('planner_update', { event: ev });
    res.json(ev);
  });

  app.delete('/api/planner/events/:id', authMiddleware, staffOnly, (req, res) => {
    const before = events.length;
    events = events.filter(e => !(e.id === req.params.id && e.tenant === TENANT));
    if (events.length === before) return res.status(404).json({ error: 'not found' });
    save();
    broadcast('planner_update', { deletedId: req.params.id });
    res.json({ ok: true });
  });

  /* ── فهرست والدین برای انتخاب مخاطب ── */
  app.get('/api/planner/parents', authMiddleware, staffOnly, (_req, res) => {
    // از users + از کودکان ثبت‌شده (ایمیل‌های یکتا)
    const map = {};
    (ctx.listParents ? ctx.listParents() : []).forEach(p => { map[p.email] = p; });
    const list = Object.values(map).sort((a, b) => a.name.localeCompare(b.name, 'fa'));
    res.json({ parents: list });
  });

  /* ── پیام‌های والدین (با ضمیمه‌ی محتوا) ── */
  app.get('/api/parent-messages', authMiddleware, (req, res) => {
    let out = pmsgs.filter(m => m.tenant === TENANT);
    if (req.user.role === 'parent') {
      const em = req.user.email.toLowerCase();
      out = out.filter(m => m.toEmail === '*' || m.toEmail === em);
      // علامت‌گذاری خوانده‌شدن
      let changed = false;
      out.forEach(m => {
        if (!m.readBy) m.readBy = [];
        if (m.readBy.indexOf(em) < 0) { m.readBy.push(em); changed = true; }
      });
      if (changed) save();
    }
    out.sort((a, b) => String(b.date).localeCompare(String(a.date)));
    res.json({ messages: out.slice(0, 200) });
  });

  app.post('/api/parent-messages', authMiddleware, staffOnly, (req, res) => {
    const { text, toEmail, toName, attachments } = req.body;
    if (!text || !String(text).trim()) return res.status(400).json({ error: 'متن پیام الزامی است' });
    const msg = {
      id: uuid(),
      fromEmail: req.user.email.toLowerCase(),
      fromName: req.user.name || 'کارکنان یاران',
      toEmail: toEmail === '*' ? '*' : String(toEmail || '').toLowerCase(),
      toName: String(toName || '').substring(0, 80),
      text: String(text).trim().substring(0, 3000),
      attachments: Array.isArray(attachments) ? attachments.slice(0, 10).map(a => ({
        title: String(a.title || '').substring(0, 160),
        type: String(a.type || 'pdf'),
        url: String(a.url || ''),
        image: String(a.image || ''),
        icon: String(a.icon || ''),
        audioUrl: String(a.audioUrl || '')
      })) : [],
      date: new Date().toISOString(),
      readBy: [],
      tenant: TENANT,
    };
    pmsgs.push(msg);
    if (pmsgs.length > 2000) pmsgs = pmsgs.slice(-1500);
    save();
    broadcast('message_update', { message: msg });
    res.json(msg);
  });

  /* ── برنامه هفتگی مهد ── */
  app.get('/api/planner/weekly', authMiddleware, (req, res) => {
    const week = req.query.week || '';
    const plan = weeklyPlans[week] || { days: {} };
    res.json({ week, days: plan.days });
  });

  app.post('/api/planner/weekly', authMiddleware, staffOnly, (req, res) => {
    const { week, day, items } = req.body;
    if (!week || !day) return res.status(400).json({ error: 'week و day الزامی است' });
    const DAYS = ['sat', 'sun', 'mon', 'tue', 'wed', 'thu', 'fri'];
    if (!DAYS.includes(day)) return res.status(400).json({ error: 'day نامعتبر' });
    if (!weeklyPlans[week]) weeklyPlans[week] = { days: {} };
    weeklyPlans[week].days[day] = Array.isArray(items) ? items.slice(0, 30).map(it => ({
      id: it.id || uuid(),
      title: String(it.title || '').substring(0, 200),
      type: String(it.type || 'activity'),
      time: String(it.time || ''),
      desc: String(it.desc || '').substring(0, 500),
      url: String(it.url || ''),
      image: String(it.image || ''),
      icon: String(it.icon || ''),
    })) : [];
    save();
    broadcast('planner_update', { weeklyPlan: { week, day, items: weeklyPlans[week].days[day] } });
    res.json({ ok: true, items: weeklyPlans[week].days[day] });
  });

  app.delete('/api/planner/weekly', authMiddleware, staffOnly, (req, res) => {
    const { week, day, itemId } = req.body;
    if (!week || !day || !itemId) return res.status(400).json({ error: 'week, day, itemId الزامی است' });
    if (weeklyPlans[week] && weeklyPlans[week].days[day]) {
      weeklyPlans[week].days[day] = weeklyPlans[week].days[day].filter(it => it.id !== itemId);
      save();
    }
    res.json({ ok: true });
  });

  return { reload: load };
}

module.exports = { registerPlanner };
