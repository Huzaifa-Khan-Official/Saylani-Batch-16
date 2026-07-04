const Room = require("../models/Room");
const Message = require("../models/Message");

const getRooms = async (req, res) => {
  const rooms = await Room.find({ type: "public" })
    .populate("createdBy", "username")
    .sort({ createdAt: -1 });
  res.json(rooms);
};

const createRoom = async (req, res) => {
  const { name, description, type } = req.body;
  if (!name) return res.status(400).json({ error: "Room name required" });

  const room = await Room.create({
    name,
    description,
    type: type || "public",
    createdBy: req.user._id,
    members: [req.user._id],
  });

  await room.populate("createdBy", "username");

  // Broadcast new room via Socket.IO
  req.app.get("io").emit("room:created", room);

  res.status(201).json(room);
};

const joinRoom = async (req, res) => {
  const room = await Room.findById(req.params.id);
  if (!room) return res.status(404).json({ error: "Room not found" });

  if (!room.members.includes(req.user._id)) {
    room.members.push(req.user._id);
    await room.save();
  }
  res.json(room);
};

const getRoomById = async (req, res) => {
  const room = await Room.findById(req.params.id).populate("createdBy", "username").populate("members", "username status");
  if (!room) return res.status(404).json({ error: "Room not found" });
  res.json(room);
};

module.exports = { getRooms, createRoom, joinRoom, getRoomById };
