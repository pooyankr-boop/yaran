/* ---------- احراز هویت واقعی — فاز ۳ (متصل به server/) ---------- */

function renderAuthStatus() {
  const el = document.getElementById("auth-status");
  if (!el) return;
  const user = currentUser();
  if (user) {
    const roleFa = { child: "کودک", parent: "والد", teacher: "مربی", admin: "مدیر" }[user.role] || user.role;
    el.innerHTML =
      '<span class="pill-btn">👋 ' + escHtml(user.name || "") + ' (' + roleFa + ')</span>' +
      '<button class="pill-btn" id="auth-logout-btn">خروج</button>';
    const logoutBtn = document.getElementById("auth-logout-btn");
    if (logoutBtn) logoutBtn.addEventListener("click", () => { clearSession(); renderAuthStatus(); if (typeof updateAdminTabVisibility === "function") updateAdminTabVisibility(); renderPanelTab("dashboard"); });
  } else {
    el.innerHTML = '<button class="pill-btn" id="auth-open-btn">ورود / ثبت‌نام</button>';
    const openBtn = document.getElementById("auth-open-btn");
    if (openBtn) openBtn.addEventListener("click", openAuthModal);
  }
}

function openAuthModal() {
  document.getElementById("auth-modal").classList.remove("hidden");
  document.getElementById("auth-modal").classList.add("active");
  renderLoginForm();
}

function closeAuthModal() {
  document.getElementById("auth-modal").classList.add("hidden");
  document.getElementById("auth-modal").classList.remove("active");
}

document.getElementById("auth-close").addEventListener("click", closeAuthModal);

function renderLoginForm() {
  document.getElementById("auth-header").textContent = "ورود به حساب کاربری";
  const body = document.getElementById("auth-body");
  body.innerHTML =
    '<div id="auth-error" style="color:#c0392b;margin-bottom:.6rem;"></div>' +
    '<input type="email" id="auth-email" placeholder="ایمیل" style="width:100%;padding:.6rem;margin-bottom:.5rem;border-radius:10px;border:1px solid #ddd;" />' +
    '<input type="password" id="auth-password" placeholder="رمز عبور" style="width:100%;padding:.6rem;margin-bottom:.8rem;border-radius:10px;border:1px solid #ddd;" />' +
    '<button class="btn" id="auth-submit-login" style="width:100%;margin-bottom:.6rem;">ورود</button>' +
    '<div style="text-align:center;font-size:.85rem;">حساب نداری؟ <a href="#" id="auth-goto-register">ثبت‌نام کن</a></div>' +
    '';

  document.getElementById("auth-goto-register").addEventListener("click", (e) => { e.preventDefault(); renderRegisterForm(); });
  document.getElementById("auth-submit-login").addEventListener("click", async () => {
    const email = document.getElementById("auth-email").value.trim();
    const password = document.getElementById("auth-password").value;
    const errEl = document.getElementById("auth-error");
    errEl.textContent = "";
    try {
      const res = await Api.login(email, password);
      setSession(res.token, res.user);
      closeAuthModal();
      renderAuthStatus();
      if (typeof updateAdminTabVisibility === "function") updateAdminTabVisibility();
      renderPanelTab("dashboard");
    } catch (e) {
      errEl.textContent = e.message || "خطا در ورود";
    }
  });
}

function renderRegisterForm() {
  document.getElementById("auth-header").textContent = "ساخت حساب کاربری جدید";
  const body = document.getElementById("auth-body");
  body.innerHTML =
    '<div id="auth-error" style="color:#c0392b;margin-bottom:.6rem;"></div>' +
    '<input type="text" id="auth-name" placeholder="نام" style="width:100%;padding:.6rem;margin-bottom:.5rem;border-radius:10px;border:1px solid #ddd;" />' +
    '<input type="email" id="auth-email" placeholder="ایمیل" style="width:100%;padding:.6rem;margin-bottom:.5rem;border-radius:10px;border:1px solid #ddd;" />' +
    '<input type="password" id="auth-password" placeholder="رمز عبور" style="width:100%;padding:.6rem;margin-bottom:.5rem;border-radius:10px;border:1px solid #ddd;" />' +
    '<select id="auth-role" style="width:100%;padding:.6rem;margin-bottom:.8rem;border-radius:10px;border:1px solid #ddd;">' +
    '<option value="teacher">مربی</option><option value="parent">والد</option>' +
    '</select>' +
    '<button class="btn" id="auth-submit-register" style="width:100%;margin-bottom:.6rem;">ثبت‌نام</button>' +
    '<div style="text-align:center;font-size:.85rem;">حساب داری؟ <a href="#" id="auth-goto-login">وارد شو</a></div>';

  document.getElementById("auth-goto-login").addEventListener("click", (e) => { e.preventDefault(); renderLoginForm(); });
  document.getElementById("auth-submit-register").addEventListener("click", async () => {
    const name = document.getElementById("auth-name").value.trim();
    const email = document.getElementById("auth-email").value.trim();
    const password = document.getElementById("auth-password").value;
    const role = document.getElementById("auth-role").value;
    const errEl = document.getElementById("auth-error");
    errEl.textContent = "";
    try {
      const res = await Api.register(name, email, password, role);
      setSession(res.token, res.user);
      closeAuthModal();
      renderAuthStatus();
      renderPanelTab("dashboard");
    } catch (e) {
      errEl.textContent = e.message || "خطا در ثبت‌نام";
    }
  });
}

document.addEventListener("DOMContentLoaded", renderAuthStatus);
