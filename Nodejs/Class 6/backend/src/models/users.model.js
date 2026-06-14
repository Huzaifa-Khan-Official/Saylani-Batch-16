import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"]
  },
  email: {
    type: String,
    unique: [true, "User already exits with this email"],
    required: [true, "Please enter your email!"]
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],    
  },
  otp: {
    type: String
  },
  role: {
    type: String,
    enum: ['Admin', 'Inventory Manager', "Sales Person"],
    default: "Sales Person",
  },
  status: {
    type: Boolean,
    default: false
  },
  avatar: {
    type: String
  }
})

const Users = model("Users", userSchema)

export default Users