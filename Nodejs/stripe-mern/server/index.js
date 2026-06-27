const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const dns = require("dns");

const paymentRoutes = require("./routes/payment.routes");
const orderRoutes = require("./routes/order.routes");

dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();

// Stripe webhook needs raw body — mount BEFORE json parser
app.use(
  "/api/payments/webhook",
  express.raw({ type: "application/json" }),
  require("./controllers/payment.controller").handleWebhook
);

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());

// Routes
app.use("/api/payments", paymentRoutes);
app.use("/api/orders", orderRoutes);

// Health check
app.get("/api/health", (req, res) => res.json({ status: "OK" }));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || "Server error" });
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });
