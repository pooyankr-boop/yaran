/* ═══════════ چت‌بات یاران — دستیار هوشمند مهدکودک ═══════════ */
var YaranBot = (function () {
  var GROQ_KEY = "";  // Used server-side only via /api/chat proxy
  var GROQ_URL = "/api/chat";
  var MODEL = "openai/gpt-oss-120b";

  var isOpen = false;
  var chatHistory = [];
  var systemPrompt = [
    "مهم‌ترین قانون مطلق: هرگز اطلاعات جعلی، آدرس وب‌سایت ابداعی، شماره تلفن ساختگی، یا هیچ اطلاعاتی که مطمئن نیستی صحیح است ارائه نکن. اگر چیزی را نمی‌دانی صریحاً بگو «اطلاعات دقیقی در این مورد ندارم».",
    "تو «یاران» هستی، دستیار هوشمند مهدکودک مجازی یاران. یک شخصیت کارتونی مهربان و باانرژی هستی.",
    "فقط به فارسی پاسخ بده. هرگز انگلیسی، عربی، روسی یا هیچ زبان دیگری استفاده نکن.",
    "تو ChatGPT یا OpenAI نیستی. تو یاران هستی.",
    "قوانین سختگیرانه:\n- فقط اطلاعاتی بده که در این system prompt آمده\n- هرگز آدرس وب‌سایت، شماره تلفن، لینک یا منبعی ابداع نکن\n- اگر سؤالی خارج از اطلاعات موجود پرسیده شد، بگو «اطلاعات دقیقی در این مورد ندارم»\n- مختصر و مفید باش\n- مهربان و صمیمی باش\n- از ایموجی مناسب استفاده کن",
    (typeof YARAN_KB !== "undefined" ? YARAN_KB : ""),
    "تخصص تو: مهدکودک، تربیت کودک، رشد کودک، بازی‌های آموزشی، مشاوره والدین، مدیریت کلاس، محتوای آموزشی پیش‌دبستانی."
  ].join("\n");

  function init() {
    // Don't show for children
    if (typeof currentUserRole !== "undefined" && currentUserRole === "child") return;
    createDOM();
    bindEvents();
  }

  function createDOM() {
    // FAB button
    var fab = document.createElement("button");
    fab.className = "yr-chat-fab";
    fab.id = "yr-chat-fab";
    fab.innerHTML = '<span class="yr-chat-fab-emoji">🤖</span><span class="yr-chat-fab-pulse"></span>';
    fab.title = "چت با یاران";
    document.body.appendChild(fab);

    // Panel
    var panel = document.createElement("div");
    panel.className = "yr-chat-panel";
    panel.id = "yr-chat-panel";
    panel.innerHTML = '' +
      '<div class="yr-chat-header">' +
        '<div class="yr-chat-avatar-wrap"><img id="yr-chat-avatar" src="assets/images/bot-avatar.svg" alt="یاران" onerror="this.src=\'assets/images/bot-avatar.svg\'" /></div>' +
        '<div class="yr-chat-header-info">' +
          '<div class="yr-chat-header-name">🤖 یاران — دستیار هوشمند</div>' +
          '<div class="yr-chat-header-status">آنلاین • متخصص مهدکودک</div>' +
        '</div>' +
        '<button class="yr-chat-close" id="yr-chat-close">✕</button>' +
      '</div>' +
      '<div class="yr-chat-messages" id="yr-chat-messages"></div>' +
      '<div class="yr-chat-suggestions" id="yr-chat-suggestions">' +
        '<button class="yr-chat-sug" data-msg="چه امکاناتی داری؟">🎯 امکانات سایت</button>' +
        '<button class="yr-chat-sug" data-msg="چطوری با بچه ارتباط برقرار کنم؟">💬 ارتباط با کودک</button>' +
        '<button class="yr-chat-sug" data-msg="بهترین بازی‌های آموزشی کدامند؟">🎮 بازی آموزشی</button>' +
        '<button class="yr-chat-sug" data-msg="برنامه روزانه مهد پیشنهاد بده">📅 برنامه روزانه</button>' +
      '</div>' +
      '<div class="yr-chat-input">' +
        '<input type="text" id="yr-chat-input" placeholder="پیامتون رو بنویسید..." autocomplete="off" />' +
        '<button class="yr-chat-send" id="yr-chat-send">⬆</button>' +
      '</div>';
    document.body.appendChild(panel);
  }

  function bindEvents() {
    document.getElementById("yr-chat-fab").addEventListener("click", toggle);
    document.getElementById("yr-chat-close").addEventListener("click", toggle);
    document.getElementById("yr-chat-send").addEventListener("click", send);
    document.getElementById("yr-chat-input").addEventListener("keydown", function (e) {
      if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
    });
    // Suggestions
    document.getElementById("yr-chat-suggestions").addEventListener("click", function (e) {
      var btn = e.target.closest(".yr-chat-sug");
      if (btn) {
        var msg = btn.getAttribute("data-msg");
        document.getElementById("yr-chat-input").value = msg;
        send();
      }
    });
  }

  function toggle() {
    isOpen = !isOpen;
    var panel = document.getElementById("yr-chat-panel");
    var fab = document.getElementById("yr-chat-fab");
    if (isOpen) {
      panel.classList.add("open");
      fab.querySelector(".yr-chat-fab-pulse").style.display = "none";
      // Welcome message on first open
      if (chatHistory.length === 0) {
        addBotMessage("سلام! 👋 من یارانم، دستیار هوشمند مهدکودک یاران.\n\nمی‌تونم کمکت کنم:\n• راهنمایی محتواهای سایت\n• مشاوره تربیت کودک\n• پیشنهاد بازی و فعالیت آموزشی\n• برنامه‌ریزی روزانه مهدکودک\n\nهر سؤالی داری بپرس! 😊");
        showSuggestions();
      }
      setTimeout(function () { document.getElementById("yr-chat-input").focus(); }, 300);
    } else {
      panel.classList.remove("open");
    }
  }

  function addBotMessage(text) {
    var container = document.getElementById("yr-chat-messages");
    var div = document.createElement("div");
    div.className = "yr-chat-msg bot";
    div.textContent = text;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
    chatHistory.push({ role: "assistant", content: text });
  }

  function addUserMessage(text) {
    var container = document.getElementById("yr-chat-messages");
    var div = document.createElement("div");
    div.className = "yr-chat-msg user";
    div.textContent = text;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
    chatHistory.push({ role: "user", content: text });
  }

  /* ── پرسش گزینهای — دکمهها مثل ربات تلگرام ── */
  function addAskMessage(question, options) {
    var container = document.getElementById("yr-chat-messages");
    var wrap = document.createElement("div");
    wrap.className = "yr-chat-msg bot yr-chat-ask";
    var q = document.createElement("div");
    q.className = "yr-chat-ask-q";
    q.textContent = question;
    wrap.appendChild(q);
    var btns = document.createElement("div");
    btns.className = "yr-chat-ask-btns";
    options.forEach(function (opt) {
      var b = document.createElement("button");
      b.className = "yr-chat-ask-btn";
      b.type = "button";
      b.textContent = opt;
      b.addEventListener("click", function () {
        // دکمهها بعد از انتخاب غیرفعال شوند — یک بار جواب
        btns.querySelectorAll("button").forEach(function (x) { x.disabled = true; });
        var input = document.getElementById("yr-chat-input");
        input.value = opt;
        send();
      });
      btns.appendChild(b);
    });
    wrap.appendChild(btns);
    container.appendChild(wrap);
    container.scrollTop = container.scrollHeight;
    chatHistory.push({ role: "assistant", content: question + "\n" + options.map(function (o) { return "• " + o; }).join("\n") });
  }

  function showTyping() {
    var container = document.getElementById("yr-chat-messages");
    var div = document.createElement("div");
    div.className = "yr-chat-typing";
    div.id = "yr-chat-typing";
    div.innerHTML = "<span></span><span></span><span></span>";
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
  }

  function hideTyping() {
    var el = document.getElementById("yr-chat-typing");
    if (el) el.remove();
  }

  /* ── پیشنهادهای پویا — بر اساس متن پیامها مرتبط انتخاب میشوند ── */
  var SUGGESTION_POOL = [
    { msg: "چه امکاناتی داری؟", label: "🎯 امکانات سایت", kw: ["امکان", "چیکار", "چه کاری", "کمک"] },
    { msg: "برنامه هفتگی این هفته را بچین", label: "📅 برنامه هفتگی", kw: ["برنامه", "هفته", "زمانبندی", "روز", "ساعت", "پس فردا", "فردا"] },
    { msg: "فهرست کودکان را نشان بده", label: "👶 کودکان", kw: ["کودک", "بچه", "گرسنه", "خواب", "نیاز", "دستپاچه"] },
    { msg: "فهرست مربیان را نشان بده", label: "👩🏫 مربیان", kw: ["مربی", "معلم", "آموزگار", "کارمند"] },
    { msg: "فهرست کلاسها را نشان بده", label: "🏫 کلاسها", kw: ["کلاس", "گروه"] },
    { msg: "کارها را نشان بده", label: "📋 وظایف", kw: ["کار", "وظیفه", "تسک", "پرونده"] },
    { msg: "یادداشت جدید بساز", label: "📝 یادداشت", kw: ["یادداشت", "یاداش"] },
    { msg: "گزارش امروز را بنویس", label: "😊 گزارش", kw: ["گزارش", "وضعیت"] },
    { msg: "برو به اتاق موسیقی", label: "🎵 اتاق موسیقی", kw: ["موسیقی", "اتاق", "برو", "ناوبری", "تور"] },
    { msg: "یک قصه صوتی پخش کن", label: "🔊 قصه صوتی", kw: ["قصه", "پخش", "صوت", "لالایی", "پادکست", "پلیر", "پخشکننده"] },
    { msg: "یک ترانه کودکانه پخش کن", label: "🎶 ترانه", kw: ["ترانه", "آواز", "آهنگ", "شاد"] },
    { msg: "درس والدین را نشان بده", label: "📚 درسها", kw: ["درس", "کاربرگ", "دک", "کوییز", "آموزش"] },
    { msg: "بازیهای آموزشی را نشان بده", label: "🎮 بازیها", kw: ["بازی", "سرگرمی"] },
    { msg: "پیامهای والدین را نشان بده", label: "💬 پیامها", kw: ["پیام", "والدین", "ارتباط"] },
    { msg: "مدیریت کودکان را باز کن", label: "🛠 مدیریت", kw: ["مدیریت", "پنل", "افزودن", "ویرایش", "حذف", "باز"] },
    { msg: "خداحافظیهای بیاشک چیست؟", label: "🌟 فرزندپروری", kw: ["تربیت", "رفتار", "پرورش", "مشاوره", "گریه", "خشم", "عصبانی", "خلاق", "والدپروری", "کمک"] }
  ];
  var sugOffset = 0;

  function showSuggestions(contextText) {
    var box = document.getElementById("yr-chat-suggestions");
    if (!box) return;
    var text = (contextText || "").toLowerCase();
    var scored = SUGGESTION_POOL.map(function (s, i) {
      var score = 0;
      for (var k = 0; k < s.kw.length; k++) {
        if (text.indexOf(s.kw[k]) >= 0) score += 2;
      }
      return { idx: i, score: score };
    });
    scored.sort(function (a, b) { return b.score - a.score; });
    var picked = scored.filter(function (s) { return s.score > 0; }).slice(0, 4);
    // تکمیل با پیشنهادهای عمومی (چرخشی تا هر بار تفاوت داشته باشد)
    var general = scored.filter(function (s) { return s.score === 0; });
    var g = sugOffset;
    while (picked.length < 4 && general.length) {
      var cand = general[g % general.length];
      if (picked.indexOf(cand) < 0) picked.push(cand);
      g++;
      if (g > general.length * 2) break;
    }
    sugOffset = (sugOffset + 1) % Math.max(1, general.length);
    var html = "";
    picked.forEach(function (s) {
      var item = SUGGESTION_POOL[s.idx];
      html += '<button class="yr-chat-sug" data-msg="' + item.msg.replace(/"/g, "&quot;") + '">' + item.label + "</button>";
    });
    box.innerHTML = html;
    box.style.display = "flex";
  }

  function hideSuggestions() {
    document.getElementById("yr-chat-suggestions").style.display = "none";
  }

  function send() {
    var input = document.getElementById("yr-chat-input");
    var text = input.value.trim();
    if (!text) return;
    input.value = "";
    hideSuggestions();
    addUserMessage(text);
    showTyping();
    callGroq(text);
  }

  async function callGroq(userMessage) {
    var btn = document.getElementById("yr-chat-send");
    btn.disabled = true;
    try {
      var messages = [
        { role: "system", content: systemPrompt }
      ].concat(chatHistory.slice(-10));

      var token = "";
      try { token = localStorage.getItem("yaran-token") || ""; } catch (_e) {}
      var endpoint = token ? "/api/agent" : "/api/chat";

      var res = await fetch(endpoint, {
        method: "POST",
        headers: token
          ? { "Content-Type": "application/json", "Authorization": "Bearer " + token }
          : { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: messages })
      });

      if (!res.ok) {
        var err = "";
        try { err = (await res.json()).error || ""; } catch (_e) {}
        console.error("Bot error:", err);
        hideTyping();
        if (res.status === 401) {
          // توکن نامعتبر — پاکسازی و راهنمای لاگین مجدد
          localStorage.removeItem("yaran_jwt");
          localStorage.removeItem("yaran_user");
          addBotMessage("توکن نشست منقضی شد. لطفاً دوباره از در وارد شو و لاگین کن. 🔑");
        } else if (err === "providers_exhausted") {
          addBotMessage("فعلاً همه مدلهای هوش مصنوعی در دسترس نیستند 📵 — چند دقیقه دیگر دوباره امتحان کن.");
        } else if (res.status === 429 || err === "rate_limited") {
          addBotMessage("سهمیه هوش مصنوعی موقتاً پر شده ⏳ — چند ثانیه صبر کن و دوباره بفرست.");
        } else {
          addBotMessage("متأسفم، مشکلی پیش اومد. لطفاً دوباره امتحان کن. 🙏");
        }
        showSuggestions();
        return;
      }

      var data = await res.json();
      hideTyping();

      // پاسخ Agent جدید: {reply, clientActions} — یا پاسخ قدیمی Groq
      if (data && typeof data.reply === "string") {
        if (data.reply.trim()) addBotMessage(data.reply);
        if (Array.isArray(data.clientActions)) {
          data.clientActions.forEach(runClientAction);
        }
      } else {
        var reply = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
        if (reply && reply.trim()) addBotMessage(reply);
        else addBotMessage("متأسفم نتونستم جواب بدم. دوباره بپرس! 🙏");
      }
      // پیشنهادهای مرتبط با آخرین گفتوگو
      var lastUser = "", lastBot = "";
      for (var hi = chatHistory.length - 1; hi >= 0 && (lastUser === "" || lastBot === ""); hi--) {
        if (chatHistory[hi].role === "assistant" && lastBot === "") lastBot = chatHistory[hi].content || "";
        if (chatHistory[hi].role === "user" && lastUser === "") lastUser = chatHistory[hi].content || "";
      }
      showSuggestions(lastUser + " " + lastBot);
    } catch (e) {
      console.error("Bot fetch error:", e);
      hideTyping();
      addBotMessage("مشکل اتصال پیش اومد. اینترنتت رو چک کن. 🌐");
      showSuggestions();
    } finally {
      btn.disabled = false;
    }
  }

  /* ── اجرای اقدامات Needle سمت مرورگر ── */
  function runClientAction(a) {
    if (!a || !a.type) return;
    try {
      switch (a.type) {
        case "navigate_room": {
          var roomId = a.roomId;
          if (typeof VirtualTour !== "undefined" && VirtualTour.goToRoom) {
            if (typeof currentUserRole !== "undefined" && currentUserRole) VirtualTour.setRole(currentUserRole);
            VirtualTour.goToRoom(roomId);
          } else if (typeof showScreen === "function") {
            showScreen("screen-tour");
          }
          break;
        }
        case "open_deck": {
          if (typeof Decks !== "undefined" && Decks.open) {
            Decks.open(a.deckId);
          }
          break;
        }
        case "play_audio": {
          if (a.url) {
            var au = new Audio(a.url);
            au.play().catch(function () {
              addBotMessage("مرورگر اجازه پخش خودکار نداد 🔇 — یک بار روی صفحه کلیک کن و دوباره بخواه.");
            });
          } else {
            addBotMessage("آدرس صوتی پیدا نشد. 🙏");
          }
          break;
        }
        case "ask": {
          addAskMessage(a.question || "کدام را میخواهی؟", Array.isArray(a.options) ? a.options : []);
          break;
        }
        case "open_panel": {
          if (typeof showScreen === "function") {
            showScreen("screen-panel");
            if (typeof renderPanelTab === "function") renderPanelTab(a.tab || "dashboard");
          }
          break;
        }
      }
    } catch (e) { console.warn("client action failed:", e); }
  }

  return { init: init, toggle: toggle };
})();

// Auto-init when DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", YaranBot.init);
} else {
  YaranBot.init();
}
