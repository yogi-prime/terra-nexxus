import axios from "axios";

// Use your live URL directly
const API_BASE = import.meta.env.VITE_API_BASE || "https://app.terranexxus.com";

const API = axios.create({
  baseURL: `${API_BASE}/api`,
  headers: { "Accept": "application/json" },
  withCredentials: false,
});

// ✅ Attach token from localStorage on every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
