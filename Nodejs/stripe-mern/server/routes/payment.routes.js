const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const {
  createPaymentIntent,
  createCheckoutSession,
  verifySession,
} = require("../controllers/payment.controller");

router.post("/create-payment-intent", asyncHandler(createPaymentIntent));
router.post("/create-checkout-session", asyncHandler(createCheckoutSession));
router.get("/verify-session/:session_id", asyncHandler(verifySession));

module.exports = router;
