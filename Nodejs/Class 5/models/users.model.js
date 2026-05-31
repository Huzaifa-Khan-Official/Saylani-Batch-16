import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: [true, "User already exits with this userName"]
  },
  email: {
    type: String,
    required: true,
    unique: [true, "User already exits with this email!"]
  },
  password: {
    type: String,
    required: true,
    minLength: [6, "Password should not be less than 6 characters"]
  },
  isActive: {
    type: Boolean,
    default: false
  },
  otp: {
    type: Number
  }
}, {timestamps: true})

const Users = mongoose.model("Users", userSchema);

export default Users
