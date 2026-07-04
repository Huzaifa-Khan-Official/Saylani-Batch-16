const User = require("../models/User");
const Message = require("../models/Message");
const Room = require("../models/Room");
const { verifySocketToken } = require("../middleware/auth.middleware");

// Track connected users: socketId -> { userId, username, rooms[] }
const connectedUsers = new Map();

module.exports = function registerSocketHandlers(io) {
  // ─── Auth Middleware ───────────────────────────────────────────────────────
  io.use(async (socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error("Authentication required"));

    const decoded = verifySocketToken(token);
    if (!decoded) return next(new Error("Invalid token"));

    const user = await User.findById(decoded.id).select("-password");
    if (!user) return next(new Error("User not found"));

    socket.user = user;
    next();
  });

  io.on("connection", async (socket) => {
    const { _id: userId, username } = socket.user;
    console.log(`🔌 ${username} connected [${socket.id}]`);

    // Mark user online
    connectedUsers.set(socket.id, { userId: userId.toString(), username, rooms: [] });
    await User.findByIdAndUpdate(userId, { status: "online" });
    io.emit("user:online", { userId, username });

    // ─── Send online user list to newly connected user ─────────────────────
    const onlineUserIds = [...new Set([...connectedUsers.values()].map((u) => u.userId))];
    socket.emit("users:online", onlineUserIds);

    // ─── Join Room ─────────────────────────────────────────────────────────
    socket.on("room:join", async (roomId, callback) => {
      try {
        const room = await Room.findById(roomId);
        if (!room) return callback?.({ error: "Room not found" });

        socket.join(roomId);

        const userData = connectedUsers.get(socket.id);
        if (userData && !userData.rooms.includes(roomId)) {
          userData.rooms.push(roomId);
        }

        // System message
        const sysMsg = await Message.create({
          room: roomId,
          sender: userId,
          content: `${username} joined the room`,
          type: "system",
        });
        await sysMsg.populate("sender", "username");

        io.to(roomId).emit("message:new", sysMsg);
        io.to(roomId).emit("room:userJoined", { userId, username });

        callback?.({ success: true });
      } catch (err) {
        callback?.({ error: err.message });
      }
    });

    // ─── Leave Room ────────────────────────────────────────────────────────
    socket.on("room:leave", async (roomId) => {
      socket.leave(roomId);
      const userData = connectedUsers.get(socket.id);
      if (userData) userData.rooms = userData.rooms.filter((r) => r !== roomId);

      const sysMsg = await Message.create({
        room: roomId,
        sender: userId,
        content: `${username} left the room`,
        type: "system",
      });
      await sysMsg.populate("sender", "username");

      io.to(roomId).emit("message:new", sysMsg);
      io.to(roomId).emit("room:userLeft", { userId, username });
    });

    // ─── Send Message ──────────────────────────────────────────────────────
    socket.on("message:send", async ({ roomId, content }, callback) => {
      if (!content?.trim()) return callback?.({ error: "Empty message" });
      if (content.length > 2000) return callback?.({ error: "Message too long" });

      try {
        const message = await Message.create({
          room: roomId,
          sender: userId,
          content: content.trim(),
        });
        await message.populate("sender", "username");

        io.to(roomId).emit("message:new", message);
        callback?.({ success: true, messageId: message._id });
      } catch (err) {
        callback?.({ error: err.message });
      }
    });

    // ─── Typing Indicators ─────────────────────────────────────────────────
    socket.on("typing:start", ({ roomId }) => {
      socket.to(roomId).emit("typing:start", { userId, username });
    });

    socket.on("typing:stop", ({ roomId }) => {
      socket.to(roomId).emit("typing:stop", { userId, username });
    });

    // ─── Private Message (DM) ──────────────────────────────────────────────
    socket.on("dm:send", async ({ toUserId, content }, callback) => {
      if (!content?.trim()) return callback?.({ error: "Empty message" });

      // Find the recipient's socket(s)
      const recipientSockets = [...connectedUsers.entries()]
        .filter(([, u]) => u.userId === toUserId)
        .map(([sid]) => sid);

      const payload = {
        from: { userId, username },
        content: content.trim(),
        timestamp: new Date(),
      };

      recipientSockets.forEach((sid) => io.to(sid).emit("dm:received", payload));
      callback?.({ success: true, delivered: recipientSockets.length > 0 });
    });

    // ─── Disconnect ────────────────────────────────────────────────────────
    socket.on("disconnect", async () => {
      console.log(`🔌 ${username} disconnected [${socket.id}]`);
      connectedUsers.delete(socket.id);

      // Only mark offline if no other sockets for this user
      const stillConnected = [...connectedUsers.values()].some(
        (u) => u.userId === userId.toString()
      );

      if (!stillConnected) {
        await User.findByIdAndUpdate(userId, { status: "offline", lastSeen: new Date() });
        io.emit("user:offline", { userId, username });
      }
    });
  });
};
