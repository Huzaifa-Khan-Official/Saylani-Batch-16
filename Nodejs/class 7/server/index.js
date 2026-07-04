const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const dns = require("dns");
require("dotenv").config();

const authRoutes = require("./routes/auth.routes");
const roomRoutes = require("./routes/room.routes");
const messageRoutes = require("./routes/message.routes");
const registerSocketHandlers = require("./socket/handlers");


dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();
const httpServer = http.createServer(app);

// ─── Socket.IO ───────────────────────────────────────────────────────────────
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Make io accessible from routes if needed
app.set("io", io);

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());

// ─── REST Routes ─────────────────────────────────────────────────────────────
app.use("/api/auth",  authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/messages", messageRoutes);
app.get("/api/health", (req, res) => res.json({ status: "OK", connectedUsers: io.engine.clientsCount }));

// ─── Socket.IO Handlers ───────────────────────────────────────────────────────
registerSocketHandlers(io);

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || "Server error" });
});

// ─── Connect & Start ──────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    httpServer.listen(PORT, () => console.log(`🚀 Server + Socket.IO on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB error:", err.message);
    process.exit(1);
  });
