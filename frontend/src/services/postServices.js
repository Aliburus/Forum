// src/services/postServices.js
import axios from "axios";

const API = `${process.env.REACT_APP_API_URL}/posts`;

// Post oluşturma
export const createPost = (data, token) =>
  axios.post(API, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Post güncelleme
export const updatePost = (id, data, token) =>
  axios.put(`${API}/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Post silme
export const deletePost = (id, token) =>
  axios.delete(`${API}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Tek bir postu getir
export const getPost = (id) => axios.get(`${API}/${id}`);

// Kullanıcıya ait postları getir
export const getPostsById = (userId) => axios.get(`${API}/user/${userId}`);

// Tüm postları getir
export const getPosts = () => axios.get(API);

// Like post
export const likePost = (id, token) =>
  axios.post(
    `${API}/${id}/like`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

// Dislike post
export const dislikePost = (id, token) =>
  axios.post(
    `${API}/${id}/dislike`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
