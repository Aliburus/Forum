import axios from "axios";

const BASE = process.env.REACT_APP_API_URL;

export const loginUser = (credentials) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/login`, credentials, {
    withCredentials: true,
  });
};
export const refreshToken = () =>
  axios.post(`${BASE}/refresh-token`, {}, { withCredentials: true });
