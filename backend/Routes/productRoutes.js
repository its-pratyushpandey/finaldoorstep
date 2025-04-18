// Routes/productRoutes.js
import express from 'express';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../Controllers/productController.js';

const router = express.Router();

// GET /api/v1/products
router.get('/', getProducts);

// POST /api/v1/products
router.post('/', createProduct);

// PUT /api/v1/products/:id
router.put('/:id', updateProduct);

// DELETE /api/v1/products/:id
router.delete('/:id', deleteProduct);

export default router;