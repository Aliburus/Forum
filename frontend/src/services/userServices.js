import axios from "axios";

// API base URL
const BASE = process.env.REACT_APP_API_URL; // e.g. http://localhost:5000/api

// ----------------------------------------------------
// Auth işlemleri
// ----------------------------------------------------

// 1. Kayıt
export const registerUser = (userData) =>
  axios.post(`${BASE}/register`, userData, { withCredentials: true });

// 2. Giriş
export const loginUser = (credentials) =>
  axios.post(`${BASE}/login`, credentials, { withCredentials: true });

// 3. Çıkış
export const logoutUser = () =>
  axios.post(`${BASE}/logout`, {}, { withCredentials: true });

// 4. Token yenileme (eğer implement ettiysen)
export const refreshToken = () =>
  axios.post(`${BASE}/refresh-token`, {}, { withCredentials: true });

// ----------------------------------------------------
// Kullanıcı CRUD & Profil
// ----------------------------------------------------

export const getUsers = () =>
  axios.get(`${BASE}/users`, { withCredentials: true });

export const getUserById = (id) =>
  axios.get(`${BASE}/users/${id}`, { withCredentials: true });

export const getUserByEmail = (email) =>
  axios.get(`${BASE}/users/email/${email}`, { withCredentials: true });

export const updateUser = (id, userData) =>
  axios.put(`${BASE}/users/${id}`, userData, { withCredentials: true });

export const deleteUser = (id) =>
  axios.delete(`${BASE}/users/${id}`, { withCredentials: true });

// 5. Profil bilgisi
export const getProfile = () =>
  axios.get(`${BASE}/profile`, { withCredentials: true });

export const changePassword = (currentPassword, newPassword) =>
  axios.put(
    `${BASE}/change-password`,
    { currentPassword, newPassword },
    { withCredentials: true }
  );
