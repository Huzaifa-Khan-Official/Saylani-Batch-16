const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true, minlength: 2, maxlength: 24 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    avatar: { type: String, default: "" }, // initials-based on client
    status: { type: String, enum: ["online", "offline", "away"], default: "offline" },
    lastSeen: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.matchPassword = function (plain) {
  return bcrypt.compare(plain, this.password);
};

userSchema.methods.toPublic = function () {
  return { _id: this._id, username: this.username, email: this.email, status: this.status, lastSeen: this.lastSeen };
};

module.exports = mongoose.model("User", userSchema);
