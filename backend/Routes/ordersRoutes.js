import express from 'express';
import {
    createOrders,
    getOrders,
    updateOrders,
    deleteOrders
} from '../Controllers/orderController.js';

const router = express.Router();

router.post('/orders', createOrders);
router.get('/orders', getOrders);
router.put('/orders/:id', updateOrders);
router.delete('/orders/:id', deleteOrders);

export default router;