import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const checkAuth = async () => {
  try {
    const response = await axios.get(`${API_URL}/auth/auth-check`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
