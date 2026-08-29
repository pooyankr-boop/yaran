/* ═══════════ چت‌بات یاران — دستیار هوشمند مهدکودک ═══════════ */
var YaranBot = (function () {
  var GROQ_KEY = "";  // Used server-side only via /api/chat proxy
  var GROQ_URL = "/api/chat";
  var MODEL = "openai/gpt-oss-120b";

  var isOpen = false;
  var chatHistory = [];
  var lastBotText = "";

  function setKeboState(state) {
    var el = document.getElementById("yr-chat-avatar");
    if (el) el.setAttribute("data-state", state);
  }

  /* ═══════════ دکمه‌های عملیاتی — بدون LLM ═══════════ */
  var DIRECT_ACTIONS = {
    rooms:   { icon: "🏫", label: "اتاق‌ها",   run: function () { showScreen("screen-lobby"); closeChat(); }},
    lessons: { icon: "📚", label: "درسها",     run: function () { showScreen("screen-lobby"); if (typeof Tour !== "undefined" && Tour.openPicker) Tour.openPicker(); else openDeckPicker(); }},
    music:   { icon: "🎵", label: "موسیقی",   run: function () { showScreen("screen-lobby"); if (typeof openRoom === "function") openRoom("honar"); closeChat(); }},
    story:   { icon: "📖", label: "قصه",       run: function () { showScreen("screen-lobby"); if (typeof openRoom === "function") openRoom("motaleh"); closeChat(); }},
    player:  { icon: "🎧", label: "پلیر",     run: function () { if (typeof Tour !== "undefined" && Tour.openPlayer) Tour.openPlayer(); }},
    tasks:   { icon: "📋", label: "کارها",     run: function () { sendDirect("کارهای امروز را نشان بده"); }},
    plan:    { icon: "📅", label: "برنامه",     run: function () { sendDirect("برنامه هفتگی را بچین"); }},
    kids:    { icon: "👶", label: "کودکان",     run: function () { sendDirect("فهرست کودکان را نشان بده"); }},
    teachers:{ icon: "👩\u200d🏫", label: "مربیان",  run: function () { sendDirect("فهرست مربیان را نشان بده"); }},
  };

  /* دکمههای اولیه — همیشه نشان داده شوند */
  var INITIAL_KEYS = ["rooms", "lessons", "music", "story", "player"];
  /* دکمههای مکالمه — بعد از پیام اول ظاهر شوند */
  var CONVO_KEYS    = ["tasks", "plan", "kids", "teachers"];

  function renderActionButtons(context) {
    var box = document.getElementById("yr-chat-suggestions");
    if (!box) return;
    var keys = INITIAL_KEYS.slice();
    if (context === "after_msg") keys = keys.concat(CONVO_KEYS);
    var html = "";
    keys.forEach(function (k) {
      var b = DIRECT_ACTIONS[k];
      if (b) html += '<button class="yr-chat-sug" data-action="' + k + '">' + b.icon + " " + b.label + "</button>";
    });
    box.innerHTML = html;
    box.style.display = "flex";
  }

  // اجرای مستقیم — پیام را به agent میفرستد ولی فقط یک خط
  function sendDirect(text) {
    addUserMessage(text);
    _showTyping();
    callGroq(text);
  }

  // باز کردن picker درسها
  function openDeckPicker() {
    try {
      var modal = document.getElementById("dk-picker-modal");
      if (!modal) {
        modal = document.createElement("div");
        modal.id = "dk-picker-modal";
        modal.className = "deck-overlay";
        modal.innerHTML = '<div class="dk-shell"><div class="dk-header"><span>🖥️</span> — درس‌های تعاملی</div><div class="dk-stage" id="dk-picker-body"></div><div class="dk-footer"><button class="dk-btn dk-btn-ghost" onclick="document.getElementById(\'dk-picker-modal\').classList.add(\'hidden\')">بستن</button></div></div>';
        document.body.appendChild(modal);
      }
      var body = document.getElementById("dk-picker-body");
      if (body && typeof Decks !== "undefined") body.innerHTML = Decks.picker(null);
      modal.classList.remove("hidden");
    } catch (e) { console.warn("deck picker failed:", e); }
  }
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
        '<div class="yr-chat-avatar-wrap"><div id="yr-chat-avatar" class="kebo-avatar" data-state="idle"></div></div>' +
        '<div class="yr-chat-header-info">' +
          '<div class="yr-chat-header-name">🤖 یاران — دستیار هوشمند</div>' +
          '<div class="yr-chat-header-status">آنلاین • متخصص مهدکودک</div>' +
        '</div>' +
        '<button class="yr-chat-close" id="yr-chat-close">✕</button>' +
      '</div>' +
      '<div class="yr-chat-messages" id="yr-chat-messages"></div>' +
      '<div class="yr-chat-suggestions" id="yr-chat-suggestions" style="display:none"></div>' +
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
      if (!btn) return;
      var actionIdx = btn.getAttribute("data-action-idx");
      if (actionIdx !== null) {
        // دکمه عملیاتی — اجرای مستقیم بدون LLM
        var fn = ACTION_BUTTONS[parseInt(actionIdx)] && ACTION_BUTTONS[parseInt(actionIdx)].action;
        if (fn) fn();
      } else {
        var msg = btn.getAttribute("data-msg");
        if (msg) { document.getElementById("yr-chat-input").value = msg; send(); }
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
        renderActionButtons(); setTimeout(function(){ setKeboState("idle"); }, 3000);
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
    setKeboState("think"); setKeboState("think"); }
  function _showTyping() {
    var container = document.getElementById("yr-chat-messages");
    var div = document.createElement("div");
    div.className = "yr-chat-typing";
    div.id = "yr-chat-typing";
    div.innerHTML = "<span></span><span></span><span></span>";
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
  }

  function hideTyping() {
    setKeboState("idle");
    var el = document.getElementById("yr-chat-typing");
    if (el) el.remove();
  }


  /* ── دکمه‌های عملیاتی جایگزین شد — به ACTION_BUTTONS بالا مراجعه کنید ── */

  function send() {
    var input = document.getElementById("yr-chat-input");
    var text = input.value.trim();
    if (!text) return;
    input.value = "";
    addUserMessage(text);
    _showTyping();
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
          localStorage.removeItem("yaran-token");
          localStorage.removeItem("yaran_user");
          addBotMessage("توکن نشست منقضی شد. لطفاً دوباره از در وارد شو و لاگین کن. 🔑");
        } else if (err === "providers_exhausted") {
          addBotMessage("فعلاً همه مدلهای هوش مصنوعی در دسترس نیستند 📵 — چند دقیقه دیگر دوباره امتحان کن."); setKeboState("sad");
        } else if (res.status === 429 || err === "rate_limited") {
          addBotMessage("سهمیه هوش مصنوعی موقتاً پر شده ⏳ — چند ثانیه صبر کن و دوباره بفرست."); setKeboState("sad");
        } else {
          addBotMessage("متأسفم، مشکلی پیش اومد. لطفاً دوباره امتحان کن. 🙏"); setKeboState("sad");
        }
        renderActionButtons(); setTimeout(function(){ setKeboState("idle"); }, 3000);
        return;
      }

      var data = await res.json();
      hideTyping();

      // پاسخ Agent جدید: {reply, clientActions} — یا پاسخ قدیمی Groq
      if (data && typeof data.reply === "string") {
        if (data.reply.trim()) { addBotMessage(data.reply); setKeboState("happy"); }
        if (Array.isArray(data.clientActions)) {
          data.clientActions.forEach(runClientAction);
        }
      } else {
        var reply = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
        if (reply && reply.trim()) { addBotMessage(reply); setKeboState("happy"); }
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
      addBotMessage("مشکل اتصال پیش اومد. اینترنتت رو چک کن. 🌐"); setKeboState("sad");
      renderActionButtons(); setTimeout(function(){ setKeboState("idle"); }, 3000);
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
