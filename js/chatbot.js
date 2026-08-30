/* ═══════════ چت‌بات رایان — دستیار هوشمند مهدکودک ═══════════ */
/* ponytail: remove setRayanState aliases once all callers use setRayanState */
var YaranBot = (function () {
  var GROQ_KEY = "";  // Used server-side only via /api/chat proxy
  var GROQ_URL = "/api/chat";
  var MODEL = "openai/gpt-oss-120b";

  var isOpen = false;
  var chatHistory = [];
  var lastBotText = "";

  /* آواتار چت + پت شناور همزمان — sad فقط برای خطا صدا زده میشود */
  var RAYAN_GIFS = {idle:"img/kebo/idle.gif",think:"img/kebo/think.gif",happy:"img/kebo/happy.gif",sad:"img/kebo/sad.gif",wave:"img/kebo/wave.gif"};
  function setRayanState(state) {
    var el = document.getElementById("yr-chat-avatar");
    if (el && RAYAN_GIFS[state]) el.src = RAYAN_GIFS[state];
    /* پت شناور هم هماهنگ — فقط حالتهای موجود پت */
    var petMap = { think: "think", happy: "happy", sad: "sad", idle: "idle", wave: "wave" };
    if (typeof RayanPet !== "undefined" && RayanPet.setState && petMap[state]) {
      try { RayanPet.setState(petMap[state]); } catch (_e) {}
    }
  }

  /* ═══════════ دکمههای عملیاتی — بدون LLM، نقشمحور ═══════════ */
  /* ═══ دکمههای هوشمند — نقشمحور ═══ */
  var INITIAL_ACTIONS = [
    { icon: "🏫", label: "اتاق\u200cها",   run: function () { showScreen("screen-lobby"); closePanel(); }},
    { icon: "📚", label: "درس‌ها",     run: function () { openDeckPicker(); closePanel(); }},
    { icon: "🎵", label: "موسیقی",    run: function () { if (typeof openRoom === "function") openRoom("honar"); closePanel(); }},
    { icon: "📖", label: "قصه",        run: function () { if (typeof openRoom === "function") openRoom("motaleh"); closePanel(); }},
  ];
  var CONVO_ACTIONS = [
    { icon: "📋", label: "کارها",      run: function () { sendDirect("کارهای امروز را نشان بده"); }},
    { icon: "📅", label: "برنامه",      run: function () { sendDirect("برنامه هفتگی این هفته را نشان بده"); }},
    { icon: "🎮", label: "بازی",       run: function () { if (typeof openRoom === "function") openRoom("bazi"); closePanel(); }},
    { icon: "📝", label: "گزارش",      run: function () { sendDirect("گزارش وضعیت کودکان را بده"); }},
  ];
  var MANAGER_ACTIONS = [
    { icon: "📊", label: "داشبورد", run: function () { sendDirect("خلاصه وضعیت مهدکودک را بده"); }},
    { icon: "📅", label: "برنامه هفتگی", run: function () { openPanelTab("planner"); }},
    { icon: "📋", label: "ذخیره برنامه", run: function () { sendDirect("برنامه هفتگی پیشنهادی را ذخیره کن"); }},
    { icon: "👩‍🏫", label: "مربیان", run: function () { sendDirect("فهرست مربیان را نشان بده"); }},
    { icon: "👶", label: "کودکان",  run: function () { sendDirect("فهرست کودکان را نشان بده"); }},
    { icon: "⚙️", label: "مدیریت", run: function () {
      sendDirect("امکانات مدیریتی را توضیح بده و میانبرهای پنل را نشان بده");
    }},
  ];
  /* مربی: پنل برنامهریزی مستقیم (برنامه هفتگی خودش را ببیند) */
  var TEACHER_ACTIONS = [
    { icon: "🗓", label: "پنل من",    run: function () { openPlannerTab(); }},
    { icon: "📅", label: "برنامه\u200cام", run: function () { sendDirect("برنامه هفتگی کلاس من را نشان بده"); }},
  ];

  function openPlannerTab() {
    try {
      if (typeof showScreen === "function") showScreen("screen-panel");
      if (typeof renderPanelTab === "function") renderPanelTab("planner");
      /* برنامه هفتگی داخل پنل برنامهریزی */
      setTimeout(function () {
        var tab = document.querySelector('.pl-t2[data-v="weekly"]');
        if (tab) tab.click();
      }, 350);
    } catch (e) { console.warn("openPlannerTab:", e); }
  }

  /* باز کردن مستقیم تب پنل */
  function openPanelTab(tab) {
    try {
      if (typeof showScreen === "function") showScreen("screen-panel");
      if (typeof renderPanelTab === "function") renderPanelTab(tab);
    } catch (e) { console.warn("openPanelTab:", e); }
  }

  function renderActionButtons(context) {
    var box = document.getElementById("yr-chat-suggestions");
    if (!box) return;
    var btns = INITIAL_ACTIONS.slice();
    if (context === "after_msg") btns = btns.concat(CONVO_ACTIONS);
    if (context === "after_msg" && typeof currentUserRole !== "undefined" && (currentUserRole === "manager" || currentUserRole === "admin")) {
      btns = btns.concat(MANAGER_ACTIONS);
      // Show shortcuts after management explanation
      var lastBot = "";
      for (var hi = chatHistory.length - 1; hi >= 0; hi--) {
        if (chatHistory[hi].role === "assistant") { lastBot = chatHistory[hi].content || ""; break; }
      }
      if (lastBot.indexOf("مدیریت") >= 0 || lastBot.indexOf("پنل") >= 0) {
        btns = btns.concat(MANAGER_SHORTCUTS);
      }
    }
    var html = "";
    btns.forEach(function (b, i) {
      html += '<button class="yr-chat-sug" data-action-idx="' + i + '">' + b.icon + " " + b.label + "</button>";
    });
    box.innerHTML = html;
    box.style.display = "flex";
  }

  function closePanel() {
    isOpen = false;
    var panel = document.getElementById("yr-chat-panel");
    if (panel) panel.classList.remove("open");
  }

  /* DIRECT_ACTIONS: label → text mapping (for data-msg buttons) */
  var DIRECT_ACTIONS = {};
  INITIAL_ACTIONS.concat(CONVO_ACTIONS, MANAGER_ACTIONS).forEach(function (a, i) {
    DIRECT_ACTIONS[a.label] = a.run;
  });

  /* میانبرهای مدیریتی (بعد از توضیح مدیریت نمایش داده میشوند) */
  var MANAGER_SHORTCUTS = [
    { icon: "📅", label: "برنامه هفتگی", run: function () { openPanelTab("planner"); }},
    { icon: "📋", label: "ذخیره برنامه", run: function () { sendDirect("برنامه هفتگی پیشنهادی را ذخیره کن"); }},
    { icon: "👩‍🏫", label: "مربیان", run: function () { sendDirect("فهرست مربیان را نشان بده"); }},
    { icon: "👶", label: "کودکان",  run: function () { sendDirect("فهرست کودکان را نشان بده"); }},
    { icon: "📋", label: "کارها", run: function () { sendDirect("کارهای امروز را نشان بده"); }},
    { icon: "📝", label: "گزارش", run: function () { sendDirect("گزارش وضعیت کودکان را بده"); }},
    { icon: "✉️", label: "پیام", run: function () { sendDirect("پیامهای والدین را نشان بده"); }},
    { icon: "📓", label: "یادداشت", run: function () { sendDirect("یادداشتهای من را نشان بده"); }},
    { icon: "🗓", label: "رویداد", run: function () { sendDirect("رویدادهای پیش رو را نشان بده"); }},
  ];

  var ALL_ACTIONS = INITIAL_ACTIONS.concat(CONVO_ACTIONS, MANAGER_ACTIONS, MANAGER_SHORTCUTS);

  // اجرای مستقیم — پیام را به agent میفرستد ولی فقط یک خط
  function sendDirect(text) {
    addUserMessage(text);
    _showTyping();
    callGroq(text);
  }

  // باز کردن picker درسها
  window.openDeckPicker = function() {
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
    "تو «رایان» هستی، دستیار هوشمند مهدکودک مجازی «یاران». یک شخصیت کارتونی مهربان و باانرژی هستی.",
    "فقط به فارسی پاسخ بده. هرگز انگلیسی، عربی، روسی یا هیچ زبان دیگری استفاده نکن.",
    "تو ChatGPT یا OpenAI نیستی. تو رایان هستی.",
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
    fab.className = "yr-chat-fab"; fab.style.cssText = "position:absolute;width:0;height:0;overflow:hidden;opacity:0;pointer-events:none;";
    fab.id = "yr-chat-fab";
    fab.innerHTML = '<img src="img/kebo/idle.gif" class="yr-chat-fab-emoji" style="width:50px;height:50px;border-radius:50%;image-rendering:pixelated;" alt="رایان" /><span class="yr-chat-fab-pulse"></span>';
    fab.title = "چت با رایان";
    document.body.appendChild(fab);

    // Panel
    var panel = document.createElement("div");
    panel.className = "yr-chat-panel";
    panel.id = "yr-chat-panel";
    panel.innerHTML = '' +
      '<div class="yr-chat-header">' +
        '<div class="yr-chat-avatar-wrap"><img id="yr-chat-avatar" src="img/kebo/idle.gif" alt="رایان" style="width:42px;height:42px;border-radius:50%;image-rendering:pixelated;" /></div>' +
        '<div class="yr-chat-header-info">' +
          '<div class="yr-chat-header-name">🤖 رایان — دستیار هوشمند</div>' +
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
      var idx = btn.getAttribute("data-action-idx");
      if (idx !== null && ALL_ACTIONS[parseInt(idx)]) {
        ALL_ACTIONS[parseInt(idx)].run();
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
        addBotMessage("سلام! 👋 من رایانم، دستیار هوشمند مهدکودک «یاران».\n\nمی‌تونم کمکت کنم:\n• راهنمایی محتواهای سایت\n• مشاوره تربیت کودک\n• پیشنهاد بازی و فعالیت آموزشی\n• برنامه‌ریزی روزانه مهدکودک\n\nهر سؤالی داری بپرس! 😊");
        renderActionButtons("after_msg"); setTimeout(function(){ setRayanState("idle"); }, 3000);
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
    setRayanState("think"); setRayanState("think"); }
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
    setRayanState("idle");
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
          addBotMessage("فعلاً همه مدلهای هوش مصنوعی در دسترس نیستند 📵 — چند دقیقه دیگر دوباره امتحان کن."); setRayanState("sad");
        } else if (res.status === 429 || err === "rate_limited") {
          var ra = parseInt(res.headers && res.headers.get ? res.headers.get("Retry-After") : "", 10);
          addBotMessage("سهمیه هوش مصنوعی موقتاً پر شده ⏳" + (ra > 0 ? " — " + ra + " ثانیه دیگر دوباره امتحان کن." : " — چند ثانیه صبر کن و دوباره بفرست."));
          setRayanState("sad");
        } else {
          addBotMessage("متأسفم، مشکلی پیش اومد. لطفاً دوباره امتحان کن. 🙏"); setRayanState("sad");
        }
        renderActionButtons("after_msg"); setTimeout(function(){ setRayanState("idle"); }, 3000);
        return;
      }

      var data = await res.json();
      hideTyping();

      // پاسخ Agent جدید: {reply, clientActions} — یا پاسخ قدیمی Groq
      if (data && typeof data.reply === "string") {
        if (data.reply.trim()) { addBotMessage(data.reply); setRayanState("happy"); }
        if (Array.isArray(data.clientActions)) {
          data.clientActions.forEach(runClientAction);
        }
      } else {
        var reply = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
        if (reply && reply.trim()) { addBotMessage(reply); setRayanState("happy"); }
        else addBotMessage("متأسفم نتونستم جواب بدم. دوباره بپرس! 🙏");
      }
      // پیشنهادهای مرتبط با آخرین گفتوگو
      var lastUser = "", lastBot = "";
      for (var hi = chatHistory.length - 1; hi >= 0 && (lastUser === "" || lastBot === ""); hi--) {
        if (chatHistory[hi].role === "assistant" && lastBot === "") lastBot = chatHistory[hi].content || "";
        if (chatHistory[hi].role === "user" && lastUser === "") lastUser = chatHistory[hi].content || "";
      }
      // پیشنهادهای سرور (از نتایج ابزار — بدون توکن اضافه)
      if (Array.isArray(data.suggestions) && data.suggestions.length) {
        renderServerSuggestions(data.suggestions);
      }
      renderActionButtons("after_msg");
    } catch (e) {
      console.error("Bot fetch error:", e);
      hideTyping();
      addBotMessage("مشکل اتصال پیش اومد. اینترنتت رو چک کن. 🌐"); setRayanState("sad");
      renderActionButtons("after_msg"); setTimeout(function(){ setRayanState("idle"); }, 3000);
    } finally {
      btn.disabled = false;
    }
  }

  /* ── پیشنهادهای سرور: دکمههای data-msg ── */
  function renderServerSuggestions(list) {
    var box = document.getElementById("yr-chat-suggestions");
    if (!box) return;
    var html = "";
    // Server suggestions (contextual)
    list.slice(0, 4).forEach(function (s) {
      if (!s || !s.msg) return;
      html += '<button class="yr-chat-sug" data-msg="' + String(s.msg).replace(/"/g, "&quot;") + '">' + (s.label || "→") + "</button>";
    });
    // Fixed buttons (always shown)
    INITIAL_ACTIONS.forEach(function (b, i) {
      html += '<button class="yr-chat-sug" data-action-idx="' + i + '">' + b.icon + " " + b.label + "</button>";
    });
    if (typeof currentUserRole !== "undefined" && (currentUserRole === "manager" || currentUserRole === "admin")) {
      var offset = INITIAL_ACTIONS.length;
      MANAGER_ACTIONS.forEach(function (b, i) {
        html += '<button class="yr-chat-sug" data-action-idx="' + (offset + i) + '">' + b.icon + " " + b.label + "</button>";
      });
    }
    if (!html) return;
    box.innerHTML = html;
    box.style.display = "flex";
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
