/* ═══════════════════════════════════════════════════════
   Needle — اجراکندگان دستورات هوشمند (داخلی پروژه)
   Groq دستور ساختاریافته میدهد، Needle آن را روی
   APIهای واقعی سایت اجرا میکند و نتیجه برمیگرداند.
   ═══════════════════════════════════════════════════════ */
const fs = require('fs');
const path = require('path');

/* ── فهرست ابزارها برای Groq function-calling ── */
const NEEDLE_TOOLS = [
  {
    type: 'function',
    function: {
      name: 'needle_execute',
      description: 'اجرای یک عملیات مدیریتی روی سایت یاران. فقط یک action در هر فراخوانی.',
      parameters: {
        type: 'object',
        properties: {
          action: {
            type: 'string',
            enum: [
              'list_children', 'create_child', 'update_child', 'delete_child',
              'list_classes', 'create_class', 'update_class', 'delete_class',
              'list_teachers', 'list_users',
              'create_report', 'list_reports', 'delete_report',
              'create_event', 'list_events', 'update_event', 'delete_event',
              'set_weekly_plan', 'get_weekly_plan', 'edit_weekly_item', 'delete_weekly_item',
              'send_parent_message', 'list_parent_messages',
              'create_task', 'list_tasks', 'complete_task', 'delete_task',
              'create_note', 'list_notes', 'delete_note',
              'search_decks', 'search_podcasts',
              'ask_user',
              'client_navigate_room', 'client_open_deck', 'client_play_audio', 'client_open_panel'
            ],
            description: 'نام عملیات'
          },
          args: { type: 'object', description: 'پارامترهای عملیات' }
        },
        required: ['action']
      }
    }
  }
];

/* ── راهنمای فارسی هر عملیات (در پرامپت سیستم) ── */
const NEEDLE_GUIDE = `
راهنمای عملیات Needle (فقط این عملیاتها معتبرند):
— کودکان: list_children / create_child{name,age,classId,parentId,teacherId} / update_child{id,...} / delete_child{id}
— کلاسها: list_classes / create_class{name,teacherId,schedule} / update_class{id,...} / delete_class{id}
— کاربران: list_teachers / list_users
— گزارش: create_report{childId,childName,text} / list_reports / delete_report{id}
— رویداد: create_event{kind:event|meeting|reminder,title,date:YYYY-MM-DD,time:HH:MM,note,parentEmail,childName,room} / list_events / update_event{id,...} / delete_event{id}
— برنامه هفتگی: set_weekly_plan{week:YYYY-MM-DD(monday),day:sat..fri,items:[{title,time,desc,type,teacherId,classId,url}]} / get_weekly_plan{week} / edit_weekly_item{week,day,itemId,...} / delete_weekly_item{week,day,itemId}
— پیام والد: send_parent_message{text,toEmail,toName} / list_parent_messages
— کارها: create_task{title,desc,due,priority} / list_tasks / complete_task{id} / delete_task{id}
— یادداشت: create_note{text,title} / list_notes / delete_note{id}
— جستجو: search_decks{query} / search_podcasts{query} — اگر یکی نتیجه نداد، دومی را امتحان کن؛ نتیجهها را با نام و تعداد به کاربر بده
— پرسش گزینهای: ask_user{question, options:[...]} — برای کار مبهم/چندمرحلهای مثل ربات تلگرام بپرس؛ حداکثر ۶ گزینه. گزینهها فقط از داده واقعی: مربیها فقط از list_teachers، کلاسها فقط از list_classes، کودکان فقط از list_children، روزها sat..fri، ساعت 08:00..16:00. اگر فهرست را هنوز نگرفتی، اول list بگیر بعد ask_user — هرگز «مدرس ۱/گزینه ۲» ابداع نکن
— اقدام مرورگر (سمت کاربر اجرا میشود): client_navigate_room{roomId:amoozesh|bazi|honar|motaleh|salamat|khab|moraabi|esterahat-moraabian|jalase-owlia|bayegani|teria|hayat|maddakari} — نام اتاقها: amoozesh=آموزش, bazi=بازی, honar=هنر و موسیقی, motaleh=مطالعه و هوش, salamat=بهداشت و سلامت, khab=خواب, moraabi=مربی, esterahat-moraabian=استراحت مربیان, jalase-owlia=جلسه اولیا, bayegani=بایگانی, teria=تریا, hayat=حیاط, maddakari=مددکاری و کودکیاری / client_open_deck{deckId} / client_play_audio{title} — URL لازم نیست؛ سرور خودش از کتابخانه پادکست پیدا میکند؛ اگر عنوان دقیق را نمیدانی اول search_podcasts بزن؛ کاربر «پخش» خواست حتماً client_play_audio صدا بزن — ناوبری جایگزین پخش نیست / client_open_panel{tab:planner|children|teachers|classes|reports|tasks|notes}
هفته: شماره روز هفته که دوشنبه است، قالب YYYY-MM-DD میلادی. روزها: sat,sun,mon,tue,wed,thu,fri.
تاریخ امروز را در پیام سیستم میبینی — برای «امروز/فردا» از آن استفاده کن.`;

/* ── نقشه عنوان→URL پادکستها (از دادههای CastBox) ── */
function buildPodcastMap() {
  const map = [];
  try {
    const src = fs.readFileSync(path.join(__dirname, '..', 'data', 'podcasts', 'castbox-channels.js'), 'utf8');
    const re = /category:\s*"([^"]+)"|title:\s*"([^"]+)"[\s\S]{0,600}?audioUrl:\s*"([^"]+)"/g;
    let m, lastCat = '';
    while ((m = re.exec(src)) !== null) {
      if (m[1]) { lastCat = m[1]; continue; }
      if (m[3] && m[3].startsWith('http')) map.push({ title: m[2], url: m[3], category: lastCat });
    }
  } catch (e) { console.warn('needle podcast map:', e.message); }
  // castbox-data.js + playlist-data.js: {"title":"..", "src":"https://.."}
  const extraFiles = ['castbox-data.js', 'playlist-data.js', 'castbox-meditation-data.js'];
  for (const f of extraFiles) {
    try {
      const src2 = fs.readFileSync(path.join(__dirname, '..', 'data', 'podcasts', f), 'utf8');
      const re2 = /"title"\s*:\s*"([^"]+)"[\s\S]{0,900}?"src"\s*:\s*"(https:[^"]+)"/g;
      let m2;
      while ((m2 = re2.exec(src2)) !== null) {
        map.push({ title: m2[1], url: m2[2], category: '' });
      }
    } catch (e) { console.warn('needle podcast extra:', f, e.message); }
  }
  // podcast-research.js: {"title":"..","category":"..","src":"https://.."}
  try {
    const src3 = fs.readFileSync(path.join(__dirname, '..', 'data', 'podcasts', 'podcast-research.js'), 'utf8');
    const re3 = /"title"\s*:\s*"([^"]+)"[\s\S]{0,900}?"category"\s*:\s*"([^"]*)"[^}]*?"src"\s*:\s*"(https:[^"]+)"/g;
    let m3;
    while ((m3 = re3.exec(src3)) !== null) {
      map.push({ title: m3[1], url: m3[3], category: m3[2] });
    }
  } catch (e) { console.warn('needle podcast research:', e.message); }
  return map;
}
/* فاصله و نیمفاصله را نادیده بگیر (قصههای = قصه حیوانات) */
function norm(s) { return String(s || '').replace(/[\s\u200c\u200f\u200e]+/g, '').toLowerCase(); }
/* همه کلمات phrase داخل query باشند: قصه+حیوانات ∈ «قصههای حیوانات» */
function wordMatch(phrase, nq) {
  const words = String(phrase || '').split(/\s+/).map(norm).filter(Boolean);
  return words.length > 0 && words.every(w => nq.includes(w));
}

const PODCAST_MAP = buildPodcastMap();

function findPodcast(q) {
  q = String(q || '').trim();
  if (!q) return null;
  const nq = norm(q);
  return PODCAST_MAP.find(p => norm(p.title) === nq)
    || PODCAST_MAP.find(p => norm(p.title).includes(nq))
    || PODCAST_MAP.find(p => norm(p.category) && (norm(p.category).includes(nq) || nq.includes(norm(p.category))))
    || PODCAST_MAP.find(p => wordMatch(p.category, nq))
    || PODCAST_MAP.find(p => nq.includes(norm(p.title)))
    || null;
}

/* ── مجری ── */
function createNeedle(ctx) {
  const { PORT } = ctx;

  async function callAPI(user, method, path, body) {
    const token = jwtSign(user);
    const res = await fetch('http://127.0.0.1:' + PORT + path, {
      method,
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
      body: body ? JSON.stringify(body) : undefined
    });
    let data = null;
    try { data = await res.json(); } catch (_e) { data = {}; }
    return { status: res.status, ok: res.ok, data };
  }

  function jwtSign(user) {
    return ctx.signToken(user);
  }

  /* اجرای عملیات */
  async function execute(user, action, args) {
    args = args || {};
    const adminOnly = user.role === 'admin' || user.role === 'manager';
    const staff = adminOnly || user.role === 'teacher';

    switch (action) {
      /* ── کودکان ── */
      case 'list_children': return (await callAPI(user, 'GET', '/api/children')).data;
      case 'create_child': {
        if (!staff) return { error: 'دسترسی ندارید' };
        return (await callAPI(user, 'POST', '/api/admin/children', args)).data;
      }
      case 'update_child': {
        if (!staff) return { error: 'دسترسی ندارید' };
        return (await callAPI(user, 'PUT', '/api/admin/children/' + args.id, args)).data;
      }
      case 'delete_child': {
        if (!adminOnly) return { error: 'فقط مدیر' };
        return (await callAPI(user, 'DELETE', '/api/admin/children/' + args.id)).data;
      }

      /* ── کلاسها ── */
      case 'list_classes': return (await callAPI(user, 'GET', '/api/admin/classes')).data;
      case 'create_class': {
        if (!adminOnly) return { error: 'فقط مدیر' };
        return (await callAPI(user, 'POST', '/api/admin/classes', args)).data;
      }
      case 'update_class': {
        if (!adminOnly) return { error: 'فقط مدیر' };
        return (await callAPI(user, 'PUT', '/api/admin/classes/' + args.id, args)).data;
      }
      case 'delete_class': {
        if (!adminOnly) return { error: 'فقط مدیر' };
        return (await callAPI(user, 'DELETE', '/api/admin/classes/' + args.id)).data;
      }

      /* ── کاربران ── */
      case 'list_teachers': {
        if (!staff) return { error: 'دسترسی ندارید' };
        const r = await callAPI(user, 'GET', '/api/admin/users');
        const users = (r.data && r.data.users) || [];
        return { users: users.filter(u => u.role === 'teacher').map(u => ({ id: u.id, name: u.name, email: u.email })) };
      }
      case 'list_users': {
        if (!adminOnly) return { error: 'فقط مدیر' };
        return (await callAPI(user, 'GET', '/api/admin/users')).data;
      }

      /* ── گزارشها ── */
      case 'create_report': {
        if (!staff) return { error: 'دسترسی ندارید' };
        return (await callAPI(user, 'POST', '/api/children/' + args.childId + '/reports', args)).data;
      }
      case 'list_reports': {
        if (adminOnly) return (await callAPI(user, 'GET', '/api/admin/reports')).data;
        return (await callAPI(user, 'GET', '/api/reports')).data;
      }
      case 'delete_report': {
        if (!staff) return { error: 'دسترسی ندارید' };
        return (await callAPI(user, 'DELETE', '/api/reports/' + args.id)).data;
      }

      /* ── رویدادها ── */
      case 'create_event': {
        if (!staff) return { error: 'دسترسی ندارید' };
        return (await callAPI(user, 'POST', '/api/planner/events', args)).data;
      }
      case 'list_events': return (await callAPI(user, 'GET', '/api/planner/events')).data;
      case 'update_event': return (await callAPI(user, 'PATCH', '/api/planner/events/' + args.id, args)).data;
      case 'delete_event': {
        if (!staff) return { error: 'دسترسی ندارید' };
        return (await callAPI(user, 'DELETE', '/api/planner/events/' + args.id)).data;
      }

      /* ── برنامه هفتگی ── */
      case 'get_weekly_plan':
        return (await callAPI(user, 'GET', '/api/planner/weekly?week=' + encodeURIComponent(args.week || ''))).data;
      case 'set_weekly_plan': {
        if (!staff) return { error: 'دسترسی ندارید' };
        return (await callAPI(user, 'POST', '/api/planner/weekly', args)).data;
      }
      case 'edit_weekly_item': {
        if (!staff) return { error: 'دسترسی ندارید' };
        return (await callAPI(user, 'PATCH', '/api/planner/weekly', args)).data;
      }
      case 'delete_weekly_item': {
        if (!staff) return { error: 'دسترسی ندارید' };
        return (await callAPI(user, 'DELETE', '/api/planner/weekly', args)).data;
      }

      /* ── پیامهای والدین ── */
      case 'list_parent_messages': return (await callAPI(user, 'GET', '/api/parent-messages')).data;
      case 'send_parent_message': {
        if (!staff) return { error: 'دسترسی ندارید' };
        return (await callAPI(user, 'POST', '/api/parent-messages', args)).data;
      }

      /* ── کارها ── */
      case 'list_tasks': return (await callAPI(user, 'GET', '/api/tasks')).data;
      case 'create_task': return (await callAPI(user, 'POST', '/api/tasks', args)).data;
      case 'complete_task': return (await callAPI(user, 'PATCH', '/api/tasks/' + args.id, { done: true })).data;
      case 'delete_task': return (await callAPI(user, 'DELETE', '/api/tasks/' + args.id)).data;

      /* ── یادداشتها ── */
      case 'list_notes': return (await callAPI(user, 'GET', '/api/notes')).data;
      case 'create_note': return (await callAPI(user, 'POST', '/api/notes', args)).data;
      case 'delete_note': return (await callAPI(user, 'DELETE', '/api/notes/' + args.id)).data;

      /* ── جستجو (سمت سرور، از کتابخانهها) ── */
      case 'search_decks': {
        const lib = ctx.DECK_LIBRARY || [];
        const q = String(args.query || '').trim();
        const hits = lib.filter(d =>
          (d.title || '').includes(q) || (d.desc || '').includes(q) || (d.id || '').includes(q)
        ).slice(0, 10).map(d => ({ id: d.id, title: d.title, desc: d.desc, audience: d.audience }));
        if (!hits.length) return { results: [], count: 0, hint: 'چیزی در درسها نیست — حتماً search_podcasts{query} را هم امتحان کن و نتیجه را گزارش کن.' };
        return { results: hits, count: hits.length };
      }
      case 'search_podcasts': {
        const pods = ctx.PODCAST_TITLES || [];
        const nq = norm(args.query);
        const hits = pods.filter(x => norm(x.title).includes(nq) || norm(x.category).includes(nq) || wordMatch(x.category, nq)).slice(0, 15);
        if (!hits.length) return { results: [], count: 0, hint: 'در پادکستها هم نبود — search_decks{query} را امتحان کن و صادقانه به کاربر بگو پیدا نشد.' };
        return { results: hits, count: hits.length };
      }

      /* ── اقدامات مرورگر: فقط برچسب میسازیم، مرورگر اجرا میکند ── */
      case 'client_navigate_room':
        return { client_action: { type: 'navigate_room', roomId: String(args.roomId || args.room || '') }, ok: true, message: 'در حال رفتن به اتاق…' };
      case 'client_open_deck':
        return { client_action: { type: 'open_deck', deckId: String(args.deckId || args.id || '') }, ok: true, message: 'در حال باز کردن درس…' };
      case 'client_play_audio': {
        let url = String(args.url || '');
        let title = String(args.title || '');
        // بدون URL واقعی → جستجو در کتابخانه پادکست
        if (!url && title) {
          const hit = findPodcast(title);
          if (hit) { url = hit.url; title = hit.title; }
        }
        if (!url) {
          return { error: 'صوتی با عنوان «' + title + '» در کتابخانه پیدا نشد. از search_podcasts استفاده کن و عنوان دقیق را بگیر.' };
        }
        return { client_action: { type: 'play_audio', title, url, category: String(args.category || '') }, ok: true, message: 'در حال پخش «' + title + '»…' };
      }
      case 'client_open_panel':
        return { client_action: { type: 'open_panel', tab: String(args.tab || 'planner') }, ok: true, message: 'در حال باز کردن پنل…' };

      /* ── پرسش گزینهای (شبیه دکمههای ربات تلگرام) ── */
      case 'ask_user': {
        const opts = Array.isArray(args.options) ? args.options.map(String).filter(Boolean).slice(0, 8) : [];
        if (!opts.length) return { error: 'ask_user بدون گزینه — حداقل یک گزینه بده.' };
        return {
          client_action: { type: 'ask', question: String(args.question || 'کدام را میخواهی؟'), options: opts },
          ok: true,
          message: 'پرسیدم: ' + String(args.question || '').slice(0, 80)
        };
      }

      default:
        return { error: 'عملیات ناشناخته: ' + action };
    }
  }

  return { tools: NEEDLE_TOOLS, guide: NEEDLE_GUIDE, execute };
}

module.exports = { createNeedle, NEEDLE_TOOLS, NEEDLE_GUIDE };
