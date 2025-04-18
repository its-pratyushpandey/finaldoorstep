import express from 'express';
import Order from '../Models/Order.js';

const router = express.Router();

// Create Order
router.post('/orders', async (req, res) => {
  const { userId, items, totalAmount } = req.body;
  try {
    const newOrder = new Order({ userId, items, totalAmount });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Orders for specific user
router.get('/orders/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).populate('items.productId');
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;