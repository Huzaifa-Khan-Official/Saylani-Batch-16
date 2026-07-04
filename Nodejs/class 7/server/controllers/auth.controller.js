const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

const register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ error: "All fields required" });

  const exists = await User.findOne({ $or: [{ email }, { username }] });
  if (exists)
    return res.status(409).json({ error: "Username or email already taken" });

  const user = await User.create({ username, email, password });
  res.status(201).json({ token: generateToken(user._id), user: user.toPublic() });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password)))
    return res.status(401).json({ error: "Invalid credentials" });

  res.json({ token: generateToken(user._id), user: user.toPublic() });
};

const getMe = async (req, res) => {
  res.json(req.user.toPublic());
};

module.exports = { register, login, getMe };
