/* =========================================================
   DAES - API helper
   Wraps every backend call in one place. Change API_BASE
   when you deploy the Flask backend somewhere other than
   localhost.
   ========================================================= */
const API_BASE = window.DAES_API_BASE || "http://localhost:5000/api";

function authHeaders(){
  const token = localStorage.getItem("daes_token");
  return token ? { "Authorization": "Bearer " + token } : {};
}

async function apiRequest(path, { method = "GET", body = null, auth = false } = {}){
  const headers = { "Content-Type": "application/json" };
  if (auth) Object.assign(headers, authHeaders());
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  let data = null;
  try { data = await res.json(); } catch (e) { /* no body */ }
  if (!res.ok){
    const message = (data && data.error) || `Request failed (${res.status})`;
    throw new Error(message);
  }
  return data;
}

const DaesAPI = {
  register: (payload) => apiRequest("/auth/register", { method: "POST", body: payload }),
  login: (payload) => apiRequest("/auth/login", { method: "POST", body: payload }),
  me: () => apiRequest("/auth/me", { auth: true }),

  weatherNow: (district = "Ilemela") => apiRequest(`/weather/current?district=${encodeURIComponent(district)}`),
  weatherForecast: (district = "Ilemela") => apiRequest(`/weather/forecast?district=${encodeURIComponent(district)}`),

  marketPrices: () => apiRequest("/market/prices"),
  addMarketPrice: (payload) => apiRequest("/market/prices", { method: "POST", body: payload, auth: true }),

  askAI: (question) => apiRequest("/ai/ask", { method: "POST", body: { question }, auth: true }),
  aiHistory: () => apiRequest("/ai/history", { auth: true }),

  sendFeedback: (payload) => apiRequest("/feedback", { method: "POST", body: payload, auth: true }),
  listFeedback: () => apiRequest("/feedback", { auth: true }),

  contactOfficer: (payload) => apiRequest("/contact", { method: "POST", body: payload, auth: true }),
  listContacts: () => apiRequest("/contact", { auth: true }),
  officers: () => apiRequest("/officers"),
  notificationPreferences: () => apiRequest("/notifications/preferences", { auth: true }),
  saveNotificationPreferences: (payload) => apiRequest("/notifications/preferences", { method: "PUT", body: payload, auth: true }),
  testNotification: () => apiRequest("/notifications/test", { method: "POST", auth: true }),
  notificationHistory: () => apiRequest("/notifications/history", { auth: true }),

  adminUsers: () => apiRequest("/admin/users", { auth: true }),
  adminOfficers: () => apiRequest("/admin/officers", { auth: true }),
  updateAdminOfficers: (officers) => apiRequest("/admin/officers", { method: "PUT", body: { officers }, auth: true }),
  adminFeedback: () => apiRequest("/feedback", { auth: true }),
  adminStats: () => apiRequest("/admin/stats", { auth: true }),
};
