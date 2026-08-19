/* ---------- API Client — فاز ۳: اتصال فرانت به بک‌اند واقعی (server/) ---------- */
const API_BASE = (window.YARAN_API_BASE || window.location.origin) + "/api";
const API_TENANT = "yaran";

function authToken() {
  return localStorage.getItem("yaran-token") || "";
}
function currentUser() {
  const raw = localStorage.getItem("yaran-user");
  return raw ? JSON.parse(raw) : null;
}
function setSession(token, user) {
  localStorage.setItem("yaran-token", token);
  localStorage.setItem("yaran-user", JSON.stringify(user));
}
function clearSession() {
  localStorage.removeItem("yaran-token");
  localStorage.removeItem("yaran-user");
}

async function apiFetch(path, options = {}) {
  const url = API_BASE + path + (path.includes("?") ? "&" : "?") + "tenant=" + API_TENANT;
  const headers = Object.assign({ "Content-Type": "application/json" }, options.headers || {});
  const token = authToken();
  if (token) headers["Authorization"] = "Bearer " + token;
  const res = await fetch(url, Object.assign({}, options, { headers }));
  let data = null;
  try { data = await res.json(); } catch (e) { /* بدون بدنه */ }
  if (!res.ok) {
    const msg = (data && data.error) || ("خطای سرور (" + res.status + ")");
    throw new Error(msg);
  }
  return data;
}

const Api = {
  health: () => apiFetch("/health"),
  rooms: () => apiFetch("/rooms"),
  archive: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return apiFetch("/archive" + (qs ? "?" + qs : ""));
  },
  categories: () => apiFetch("/archive/categories"),
  updateContentItem: (id, patch) =>
    apiFetch("/content/" + id, { method: "PUT", body: JSON.stringify(patch) }),
  children: () => apiFetch("/children"),
  childReports: (childId) => apiFetch("/children/" + childId + "/reports"),
  addReport: (childId, data) =>
    apiFetch("/children/" + childId + "/reports", { method: "POST", body: JSON.stringify(data) }),
  login: (email, password) =>
    apiFetch("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),
  register: (name, email, password, role) =>
    apiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password, role, tenant: API_TENANT }),
    }),
  panel: () => apiFetch("/panel"),
  tasks: () => apiFetch("/tasks"),
  deleteNote: (id) => apiFetch("/notes/" + id, { method: "DELETE" }),
  deleteMessage: (id) => apiFetch("/messages/" + id, { method: "DELETE" }),
  deleteReport: (id) => apiFetch("/reports/" + id, { method: "DELETE" }),
  adminUsers: () => apiFetch("/admin/users"),
  adminSetRole: (id, role) =>
    apiFetch("/admin/users/" + id + "/role", { method: "PATCH", body: JSON.stringify({ role }) }),
  adminDeleteUser: (id) => apiFetch("/admin/users/" + id, { method: "DELETE" }),
};

// اگر سرور بک‌اند بالا نباشد (مثلاً پایلوت روی سیستمی که هنوز server/ اجرا نشده)، APP_API_ONLINE
// روی false می‌ماند و بقیه‌ی فایل‌ها می‌توانند به‌جای کرش‌کردن، به داده‌ی استاتیک قدیمی برگردند.
let APP_API_ONLINE = false;
const API_READY = Api.health()
  .then(() => { APP_API_ONLINE = true; })
  .catch(() => { APP_API_ONLINE = false; });
