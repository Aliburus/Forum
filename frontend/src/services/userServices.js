// services/userServices.js
import axios from "axios";

const BASE = process.env.REACT_APP_API_URL; // http://localhost:5000/api
const REGISTER = `${BASE}/register`; // http://localhost:5000/api/register
const USERS = `${BASE}/users`; // http://localhost:5000/api/users
console.log("REACT_APP_API_URL:", process.env.REACT_APP_API_URL);
export const createUser = (userData) => axios.post(REGISTER, userData);
export const getUsers = () => axios.get(USERS);
export const getUserById = (id) => axios.get(`${USERS}/${id}`);
export const getUserByEmail = (email) => axios.get(`${USERS}/email/${email}`);
export const updateUser = (id, userData) =>
  axios.put(`${USERS}/${id}`, userData);
export const deleteUser = (id) => axios.delete(`${USERS}/${id}`);
