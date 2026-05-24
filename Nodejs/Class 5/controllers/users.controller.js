import { errorRes, successRes } from "../lib/responseHandler.js";
import Users from "../models/users.model.js";
import jwt from "jsonwebtoken"

import bcrypt from "bcryptjs";
import configs from "../configs/configs.js";

const registerUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    const salt = await bcrypt.genSalt(8)

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await Users.create({
      userName,
      email,
      password: hashedPassword
    })

    // res.status(200).json({  
    // })
    successRes(res, 200, true, "User created successfully!", null)
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

    successRes(res, 200, true, "Logged In successfully!", null)
  } catch (error) {
    errorRes(res, 400, false, error.message || "Something went wrong, please try later!", null)
  }
}

export { registerUser, login }