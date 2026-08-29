/* ═══════════════════════════════════════════════════════
   LLM Chain — زنجیرهی مدلها با fallback خودکار
   Groq 20b → Groq 120b → OpenRouter → HF (402 مرده)
   20b اول: TPM آزادتر، خطای توکن کمتر
   ═══════════════════════════════════════════════════════ */

const PROVIDERS = [
  { name: 'groq-20b', url: 'https://api.groq.com/openai/v1/chat/completions', key: () => process.env.GROQ_API_KEY, model: 'openai/gpt-oss-20b' },
  { name: 'groq-120b', url: 'https://api.groq.com/openai/v1/chat/completions', key: () => process.env.GROQ_API_KEY, model: 'openai/gpt-oss-120b' },
  { name: 'or-llama33', url: 'https://openrouter.ai/api/v1/chat/completions', key: () => process.env.OPENROUTER_API_KEY, model: 'meta-llama/llama-3.3-70b-instruct' },
  { name: 'or-qwen72', url: 'https://openrouter.ai/api/v1/chat/completions', key: () => process.env.OPENROUTER_API_KEY, model: 'qwen/qwen-2.5-72b-instruct' },
  { name: 'hf-llama33', url: 'https://router.huggingface.co/v1/chat/completions', key: () => process.env.HF_API_KEY, model: 'meta-llama/Llama-3.3-70B-Instruct' },
  { name: 'hf-qwen72', url: 'https://router.huggingface.co/v1/chat/completions', key: () => process.env.HF_API_KEY, model: 'Qwen/Qwen2.5-72B-Instruct' },
];

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

/* شبکهی قطع → پرش سریع (۱۰ دقیقه محرووم) تا هر درخواست timeout نخورد */
function isDead(p) { return p.deadUntil && Date.now() < p.deadUntil; }
function markDead(p) { p.deadUntil = Date.now() + 10 * 60 * 1000; }

async function attempt(provider, body, timeoutMs) {
  let r;
  try {
    r = await fetch(provider.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + provider.key()
      },
      body: JSON.stringify(Object.assign({}, body, { model: provider.model })),
      signal: AbortSignal.timeout(timeoutMs || 30000)
    });
  } catch (e) {
    const err = new Error('network: ' + provider.name + ' (' + (e.message || 'unreachable') + ')');
    err.network = true;
    err.provider = provider.name;
    throw err;
  }
  const d = await r.json().catch(() => ({}));
  if (!r.ok) {
    const err = new Error((d.error && d.error.message) || ('HTTP ' + r.status));
    err.status = r.status;
    err.provider = provider.name;
    throw err;
  }
  // پاسخ 200 ولی نامعتبر (مثلاً OpenRouter گاهی error با 200 میدهد) → گام بعدی
  const m = d.choices && d.choices[0] && d.choices[0].message;
  const hasTool = m && Array.isArray(m.tool_calls) && m.tool_calls.length > 0;
  const hasContent = m && typeof m.content === 'string' && m.content.trim().length > 0;
  if (!Array.isArray(d.choices) || !d.choices.length || (!hasTool && !hasContent)) {
    const err = new Error('bad response from ' + provider.name + ': ' + JSON.stringify(d).slice(0, 180));
    err.status = (d.error && d.error.code) || 502;
    err.provider = provider.name;
    throw err;
  }
  d._provider = provider.name;
  return d;
}

/**
 * chat(body) — body بدون model؛ شامل messages و در صورت نیاز tools/tool_choice.
 * fallback خودکار روی خطا/ریت لیمیت.
 */
async function chat(body) {
  let lastErr = null;
  for (const p of PROVIDERS) {
    if (!p.key() || isDead(p)) continue;
    try {
      return await attempt(p, body);
    } catch (e) {
      lastErr = e;
      if (e.network) { markDead(p); continue; }
      if (e.status === 402) {
        // اعتبار تمام شده — ۳۰ دقیقه دور بزن
        p.deadUntil = Date.now() + 30 * 60 * 1000;
        continue;
      }
      // 429 → یک تلاش دوباره با تأخیر، بعد گام بعدی
      if (e.status === 429) {
        await sleep(2200);
        try {
          return await attempt(p, body);
        } catch (e2) {
          lastErr = e2;
        }
      }
      // 500/503/timeout → مستقیم گام بعدی
    }
  }
  throw lastErr || new Error('هیچ مدل در دسترسی نیست');
}

module.exports = { chat };
