import axios from "axios";

const API = `${process.env.REACT_APP_API_URL}/comments`;

export const createComment = (data, token) =>
  axios.post(API, data, { headers: { Authorization: `Bearer ${token}` } });

export const updateComment = (commentId, data, token) =>
  axios.put(`${API}/${commentId}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteComment = (commentId, token) =>
  axios.delete(`${API}/${commentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const likeComment = (commentId, token) =>
  axios.post(
    `${API}/${commentId}/like`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );

export const dislikeComment = (commentId, token) =>
  axios.post(
    `${API}/${commentId}/dislike`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );

export const getCommentsByPost = (postId) => axios.get(`${API}/${postId}`);
