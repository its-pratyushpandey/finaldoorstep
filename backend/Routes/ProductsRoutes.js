import express from 'express';
import {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct
} from '../Controllers/ProductsController.js';

const router = express.Router();

// Base route = /api/products
router.post('/', createProduct);       // POST /api/products
router.get('/', getProducts);         // GET /api/products
router.put('/:id', updateProduct);    // PUT /api/products/:id
router.delete('/:id', deleteProduct); // DELETE /api/products/:id

export default router;