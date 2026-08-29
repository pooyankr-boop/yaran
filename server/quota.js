/* ═══════════════════════════════════════════════════════
   Per-user hourly quota — stops runaway chat loops from
   burning provider tokens. In-memory only (resets on restart,
   which is fine: it is a safety valve, not accounting).
   Default: 40 chat turns / hour / user (agent loop can make
   up to 6 LLM calls per turn — worst case ~240 calls/h still
   far below Groq free-tier RPM with fallback chain).
   ═════════════════════════════ /api/agent + /api/chat ═══*/
'use strict';

const LIMIT_PER_HOUR = 40;

const hits = new Map(); // userId -> [timestamps]

function check(userId) {
  const now = Date.now();
  const oneHourAgo = now - 3600000;
  const list = (hits.get(userId) || []).filter(t => t > oneHourAgo);
  if (list.length >= LIMIT_PER_HOUR) {
    const retryAfter = Math.ceil((list[0] + 3600000 - now) / 1000);
    hits.set(userId, list);
    return { ok: false, retryAfter: Math.max(retryAfter, 5), limit: LIMIT_PER_HOUR };
  }
  list.push(now);
  hits.set(userId, list);
  // cheap GC
  if (hits.size > 500) {
    for (const [k, v] of hits) if (!v.length || v[v.length - 1] < oneHourAgo) hits.delete(k);
  }
  return { ok: true };
}

module.exports = { check, LIMIT_PER_HOUR };
