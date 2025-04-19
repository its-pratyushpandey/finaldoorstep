// utils/Axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://doorstep-backend1.onrender.com',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default instance;
