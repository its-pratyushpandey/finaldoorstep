// src/api/auth/index.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_AUTH_API_URL || 'https://latestdoorstep-backend-6.onrender.com/api/v1/auth';

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (err) {
    console.error('Error registering user:', err);
    throw err;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  } catch (err) {
    console.error('Error logging in user:', err);
    throw err;
  }
};
