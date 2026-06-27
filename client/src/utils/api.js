import axios from "axios";

const API = axios.create({
  baseURL: "https://YOUR-RENDER-URL.onrender.com/api/login",
});

// attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("crm_token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// LOGIN API
export const loginUser = (data) => API.post("/auth/login", data);

// GET CURRENT USER
export const getMe = () => API.get("/auth/me");