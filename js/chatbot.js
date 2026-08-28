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

  function showSuggestions() {
    document.getElementById("yr-chat-suggestions").style.display = "flex";
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

      var res = await fetch(GROQ_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: messages })
      });

      if (!res.ok) {
        var err = await res.text();
        console.error("Groq error:", err);
        hideTyping();
        addBotMessage("متأسفم، مشکلی پیش اومد. لطفاً دوباره امتحان کن. 🙏");
        showSuggestions();
        return;
      }

      var data = await res.json();
      var reply = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
      hideTyping();
      if (reply) {
        addBotMessage(reply);
      } else {
        addBotMessage("متأسفم نتونستم جواب بدم. دوباره بپرس! 🙏");
      }
      showSuggestions();
    } catch (e) {
      console.error("Groq fetch error:", e);
      hideTyping();
      addBotMessage("مشکل اتصال پیش اومد. اینترنتت رو چک کن. 🌐");
      showSuggestions();
    } finally {
      btn.disabled = false;
    }
  }

  return { init: init, toggle: toggle };
})();

// Auto-init when DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", YaranBot.init);
} else {
  YaranBot.init();
}
