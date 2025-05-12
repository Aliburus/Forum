import axios from "axios";

const API = `${process.env.REACT_APP_API_URL}/profil`;

export const getProfil = (id) => axios.get(`${API}/${id}`);
export const createProfil = (data) => axios.post(API, data);
export const updateProfil = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteProfil = (id) => axios.delete(`${API}/${id}`);
