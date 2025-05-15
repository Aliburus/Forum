import axios from "axios";

// API base URL
const BASE = "http://localhost:5000/api";

// Axios instance oluştur
const api = axios.create({
  baseURL: BASE,
  withCredentials: true,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Login yanıtında token varsa sakla
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 403) {
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

// ----------------------------------------------------
// Auth işlemleri
// ----------------------------------------------------

// 1. Kayıt
export const registerUser = (userData) => api.post("/users/register", userData);

// 2. Giriş
export const loginUser = (credentials) => api.post("/users/login", credentials);

// 3. Çıkış
export const logoutUser = () => {
  localStorage.removeItem("token");
  return api.post("/users/logout");
};

// 4. Token yenileme
export const refreshToken = () => api.post("/refresh-token");

// ----------------------------------------------------
// Kullanıcı CRUD & Profil
// ----------------------------------------------------

export const getUsers = () => api.get("/users");

export const getUserById = (id) => api.get(`/users/${id}`);

export const getUserByEmail = (email) => api.get(`/users/email/${email}`);

export const updateUser = (id, userData) => api.put(`/users/${id}`, userData);

export const deleteUser = (id) => api.delete(`/users/${id}`);

// 5. Profil bilgisi
export const getProfile = () => api.get("/profile");

export const changePassword = (currentPassword, newPassword) =>
  api.put("/change-password", { currentPassword, newPassword });
