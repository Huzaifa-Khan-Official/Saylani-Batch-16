const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Order = require("../models/Order");

// ─── Create Payment Intent (for custom card form) ───────────────────────────
const createPaymentIntent = async (req, res) => {
  const { items, customerEmail, customerName } = req.body;

  if (!items?.length || !customerEmail || !customerName) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Create order in DB with pending status
  const order = await Order.create({
    customerEmail,
    customerName,
    items,
    totalAmount,
    status: "pending",
  });

  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalAmount,
    currency: "usd",
    metadata: { orderId: order._id.toString() },
    receipt_email: customerEmail,
  });

  await Order.findByIdAndUpdate(order._id, {
    stripePaymentIntentId: paymentIntent.id,
  });

  res.json({
    clientSecret: paymentIntent.client_secret,
    orderId: order._id,
  });
};

// ─── Create Checkout Session (Stripe-hosted checkout) ────────────────────────
const createCheckoutSession = async (req, res) => {
  const { items, customerEmail, customerName } = req.body;

  if (!items?.length || !customerEmail || !customerName) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const order = await Order.create({
    customerEmail,
    customerName,
    items,
    totalAmount,
    status: "pending",
  });

  const lineItems = items.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.name,
        ...(item.image && { images: [item.image] }),
      },
      unit_amount: item.price,
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    customer_email: customerEmail,
    success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CLIENT_URL}/cancel`,
    metadata: { orderId: order._id.toString() },
  });

  await Order.findByIdAndUpdate(order._id, { stripeSessionId: session.id });

  res.json({ url: session.url, sessionId: session.id, orderId: order._id });
};

// ─── Stripe Webhook ──────────────────────────────────────────────────────────
const handleWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case "payment_intent.succeeded": {
      const intent = event.data.object;
      await Order.findOneAndUpdate(
        { stripePaymentIntentId: intent.id },
        { status: "paid" }
      );
      console.log("✅ PaymentIntent succeeded:", intent.id);
      break;
    }

    case "payment_intent.payment_failed": {
      const intent = event.data.object;
      await Order.findOneAndUpdate(
        { stripePaymentIntentId: intent.id },
        { status: "failed" }
      );
      console.log("❌ PaymentIntent failed:", intent.id);
      break;
    }

    case "checkout.session.completed": {
      const session = event.data.object;
      await Order.findOneAndUpdate(
        { stripeSessionId: session.id },
        { status: "paid" }
      );
      console.log("✅ Checkout session completed:", session.id);
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.json({ received: true });
};

// ─── Verify Session (after redirect from hosted checkout) ────────────────────
const verifySession = async (req, res) => {
  const { session_id } = req.params;
  const session = await stripe.checkout.sessions.retrieve(session_id);
  const order = await Order.findOne({ stripeSessionId: session_id });

  res.json({
    status: session.payment_status,
    customerEmail: session.customer_email,
    order,
  });
};

module.exports = {
  createPaymentIntent,
  createCheckoutSession,
  handleWebhook,
  verifySession,
};
