// utils/Axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL:  'https://doorstep-backend1.onrender.com/',
  withCredentials: true,  // optional if using cookies
});

export default instance;
