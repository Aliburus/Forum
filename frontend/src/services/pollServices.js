import axios from "axios";

const API = `${process.env.REACT_APP_API_URL}/polls`;

export const createPoll = (data, token) =>
  axios.post(API, data, { headers: { Authorization: `Bearer ${token}` } });

export const updatePoll = (id, data, token) =>
  axios.put(`${API}/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deletePoll = (id, token) =>
  axios.delete(`${API}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const votePoll = (data, token) =>
  axios.post(`${API}/vote`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getPolls = () => axios.get(API);
export const getPollById = (id) => axios.get(`${API}/${id}`);
