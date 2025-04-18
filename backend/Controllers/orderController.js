const Order = require("../Models/Order");

// @desc    Get all orders for the authenticated user
exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error });
  }
};

// @desc    Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { items, total, shippingInfo, paymentMethod } = req.body;

    const order = new Order({
      user: req.user.id,
      items,
      total,
      shippingInfo,
      paymentMethod,
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: "Order creation failed", error });
  }
};

// @desc    Get a single order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "email name");

    if (!order) return res.status(404).json({ message: "Order not found" });

    // Optional: verify user matches
    if (order.user._id.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch order", error });
  }
};