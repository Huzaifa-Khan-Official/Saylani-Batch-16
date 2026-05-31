import { errorRes, successRes } from "../lib/responseHandler.js";
import Users from "../models/users.model.js";
import jwt from "jsonwebtoken"

import bcrypt from "bcryptjs";
import configs from "../configs/configs.js";
import { generateOtp } from "../lib/generateOTP.js";
import transporter from "../lib/mailTransporter.js";

const registerUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    const salt = await bcrypt.genSalt(8)
    const OTP = generateOtp()

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await Users.create({
      userName,
      email,
      password: hashedPassword,
      otp: OTP
    })


    console.log("OTP ==>", OTP);

    await transporter.sendMail({
      from: configs.SMTP_USER,
      to: email,
      subject: "Hello", // subject line
      // text: "Hello world?", // plain text body
      html: "<h1>Hello world? Testing</h1>", // HTML body
    })


    successRes(res, 200, true, "User created successfully! Please verify your email!", null)
  } catch (error) {
    errorRes(res, 400, false, error.message || "Something went wrong, please try later!", null)
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // get document from DB
    const user = await Users.findOne({ email })
    if (!user) {
      throw new Error("User not found!")
    }

    // compare password with hashedPassword
    const isMatched = await bcrypt.compare(password, user.password)
    if (!isMatched) {
      throw new Error("Invalid Credentials")
    }

    // generating a secret token
    console.log("user ==>", user);

    const token = jwt.sign({
      userName: user.userName,
      email: user.email,
      id: user._id
    }, configs.JWT_SECRET)

    console.log("token ==>", token);


    successRes(res, 200, true, "Logged In successfully!", {
      token
    })
  } catch (error) {
    errorRes(res, 400, false, error.message || "Something went wrong, please try later!", null)
  }
}

const getAllUsers = async (req, res) => {
  try {

    const allUsers = await Users.find()

    successRes(res, 200, true, "All users fetched successfully!", allUsers)
  } catch (error) {
    errorRes(res, 400, false, error.message || "Something went wrong, please try later!", null)
  }
}

const updateUserById = async (req, res) => {
  try {
    const id = req.params.id
    const { isActive } = req.body

    const user = await Users.findById(id)

    if (!user) throw new Error("No user found with this Id!");

    console.log("isActive", isActive)

    const updatedUser = await Users.findOneAndUpdate(
      { _id: id },
      { $set: { isActive } },
      { new: true, runValidators: true }
    );

    console.log(updatedUser);

    successRes(res, 200, true, "User updated successfully!", updatedUser)
  } catch (error) {
    errorRes(res, 400, false, error.message || "Something went wrong, please try later!", null)
  }
}

export { registerUser, login, getAllUsers, updateUserById }