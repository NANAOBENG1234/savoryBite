const API_BASE = "/api";

const TOKEN_KEY = "sb_admin_token";
const USER_KEY = "sb_admin_user";

let authListeners = [];

function token() {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch (_) {
    return null;
  }
}

export function getToken() {
  return token();
}

export function setSession(data) {
  try {
    if (data && data.token) localStorage.setItem(TOKEN_KEY, data.token);
    if (data && data.user) localStorage.setItem(USER_KEY, JSON.stringify(data.user));
  } catch (_) {
    /* storage unavailable */
  }
  emitAuth();
}

export function getSessionUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (_) {
    return null;
  }
}

export function clearSession() {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  } catch (_) {
    /* storage unavailable */
  }
  emitAuth();
}

export function onAuthChange(fn) {
  authListeners.push(fn);
  return () => {
    authListeners = authListeners.filter((l) => l !== fn);
  };
}

function emitAuth() {
  authListeners.forEach((fn) => fn());
}

async function request(path, options = {}) {
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  const t = token();
  if (t) headers.Authorization = `Bearer ${t}`;
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  if (res.status === 401) {
    clearSession();
  }
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) {
    const err = new Error((data && data.error) || `Request failed (${res.status})`);
    err.status = res.status;
    throw err;
  }
  return data;
}

export const api = {
  get: (path) => request(path, { method: "GET" }),
  post: (path, body) => request(path, { method: "POST", body: JSON.stringify(body) }),
  put: (path, body) => request(path, { method: "PUT", body: JSON.stringify(body) }),
  patch: (path, body) => request(path, { method: "PATCH", body: JSON.stringify(body) }),
  del: (path) => request(path, { method: "DELETE" }),
};
