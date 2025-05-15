import axios from "axios";

const API = `${process.env.REACT_APP_API_URL}/posts`;

// Tüm postları getir (public)
export const getPosts = () => axios.get(API, { withCredentials: true });
export const getPostsForUser = () => {
  return axios.get(`${API}/user`, { withCredentials: true });
};
// Post oluşturma (auth gerekir)
export const createPost = (data) =>
  axios.post(API, data, { withCredentials: true });

export const updatePost = (id, content) => {
  if (!id || typeof id !== "string" || id.length !== 24) {
    return Promise.reject(new Error("Geçersiz post ID'si"));
  }

  return axios.put(`${API}/${id}`, { content }, { withCredentials: true });
};

// Post silme (auth gerekir)
export const deletePost = (id) =>
  axios.delete(`${API}/${id}`, { withCredentials: true });

// Like post (auth gerekir)
export const likePost = (id) =>
  axios.post(`${API}/${id}/like`, {}, { withCredentials: true });

// Dislike post (auth gerekir)
export const dislikePost = (id) =>
  axios.post(`${API}/${id}/dislike`, {}, { withCredentials: true });
