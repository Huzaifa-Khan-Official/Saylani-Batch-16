const Order = require("../models/Order");

const getAllOrders = async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
};

const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ error: "Order not found" });
  res.json(order);
};

const getOrdersByEmail = async (req, res) => {
  const orders = await Order.find({
    customerEmail: req.params.email.toLowerCase(),
  }).sort({ createdAt: -1 });
  res.json(orders);
};

module.exports = { getAllOrders, getOrderById, getOrdersByEmail };
