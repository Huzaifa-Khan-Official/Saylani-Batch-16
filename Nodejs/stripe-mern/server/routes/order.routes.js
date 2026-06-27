const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const {
  getAllOrders,
  getOrderById,
  getOrdersByEmail,
} = require("../controllers/order.controller");

router.get("/", asyncHandler(getAllOrders));
router.get("/:id", asyncHandler(getOrderById));
router.get("/customer/:email", asyncHandler(getOrdersByEmail));

module.exports = router;
