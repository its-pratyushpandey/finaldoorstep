// src/api/products/index.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_PRODUCTS_API_URL || 'https://latestdoorstep-backend-6.onrender.com/api/v1/products';

export const fetchProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (err) {
    console.error('Error fetching products:', err);
    throw err;
  }
};

export const addProduct = async (productData) => {
  try {
    const response = await axios.post(API_URL, productData);
    return response.data;
  } catch (err) {
    console.error('Error adding product:', err);
    throw err;
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, productData);
    return response.data;
  } catch (err) {
    console.error('Error updating product:', err);
    throw err;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (err) {
    console.error('Error deleting product:', err);
    throw err;
  }
};
