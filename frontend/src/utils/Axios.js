// utils/Axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL:  'https://latestdoorstep-backend-6.onrender.com/',
  withCredentials: true,  // optional if using cookies
});

export default instance;
