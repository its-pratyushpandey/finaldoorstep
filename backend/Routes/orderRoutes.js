const express = require("express");
const router = express.Router();
const orderController = require("../Controllers/orderController");

// GET all orders for a user
router.get("/", orderController.getUserOrders);

// POST create a new order
router.post("/", orderController.createOrder);

// GET a specific order by ID
router.get("/:id", orderController.getOrderById);

module.exports = router;