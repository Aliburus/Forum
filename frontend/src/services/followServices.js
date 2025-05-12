import axios from "axios";

const API = `${process.env.REACT_APP_API_URL}`;

export const followUser = (data, token) =>
  axios.post(`${API}/follow`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const unfollowUser = (data, token) =>
  axios.post(`${API}/unfollow`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
