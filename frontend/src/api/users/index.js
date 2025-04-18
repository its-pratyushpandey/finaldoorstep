// src/api/users/index.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_USERS_API_URL || 'https://latestdoorstep-backend-6.onrender.com/api/v1/users';

export const fetchUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (err) {
    console.error('Error fetching users:', err);
    throw err;
  }
};

export const fetchUserById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (err) {
    console.error('Error fetching user by ID:', err);
    throw err;
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, userData);
    return response.data;
  } catch (err) {
    console.error('Error updating user:', err);
    throw err;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (err) {
    console.error('Error deleting user:', err);
    throw err;
  }
};
