import axios from "axios";

const API = `${process.env.REACT_APP_API_URL}/posts`;

export const createPost = (data, token) =>
  axios.post(API, data, { headers: { Authorization: `Bearer ${token}` } });

export const updatePost = (id, data, token) =>
  axios.put(`${API}/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deletePost = (id, token) =>
  axios.delete(`${API}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getPosts = () => axios.get(API);
