const Message = require("../models/Message");

const getMessages = async (req, res) => {
  const { roomId } = req.params;
  const limit = parseInt(req.query.limit) || 50;
  const before = req.query.before; // for pagination

  const query = { room: roomId };
  if (before) query.createdAt = { $lt: new Date(before) };

  const messages = await Message.find(query)
    .populate("sender", "username")
    .sort({ createdAt: -1 })
    .limit(limit);

  res.json(messages.reverse());
};

module.exports = { getMessages };
