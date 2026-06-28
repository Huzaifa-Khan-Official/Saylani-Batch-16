import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { generateOtp } from "../utils/generateOTP.js";
import Users from "../models/users.model.js";
import { errorRes, successRes } from "../utils/responseHandler.js";
import transporter from "../utils/mailTransporter.js";
import configs from "../configs/configs.js";
import { redis } from "../configs/redis.js";
import { emailQueue } from "../queues/emailQueue.js";


const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt(8)
    const OTP = generateOtp()

    await redis.set(
      `otp:${email}`,
      OTP,
      "EX",
      300
    )

    const hashedPassword = await bcrypt.hash(password, salt);

    await Users.create({
      name,
      email,
      password: hashedPassword,
    })

    await emailQueue.add("send-otp", {
      email,
      OTP
    })

    successRes(res, 200, true, "User created successfully! Please verify your email!", null)
  } catch (error) {
    errorRes(res, 400, false, error.message || "Something went wrong, please try later!", null)
  }
}

const verifyOTP = async (req, res) => {
  try {
    const { useremail } = req.params;
    const { OTP } = req.body

    // to get a selected field, we use select() in mongoose
    const existingUser = await Users.findOne({ email: useremail }).select("otp");

    console.log("existingUser ==>", existingUser);
    if (!existingUser) {
      throw new Error("User not exits!")
    }

    if (existingUser.otp === OTP) {
      await Users.findOneAndUpdate({ email: useremail }, { status: true });
      successRes(res, 200, true, "Your email has been verified successfully!", null)
    } else {
      throw new Error("Invalid OTP")
    }
  } catch (error) {
    errorRes(res, 400, false, error.message || "Something went wrong, please try later!", null)
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // get document from DB
    const user = await Users.findOne({ email }).select("password status email name role")
    if (!user) {
      throw new Error("User not found!")
    }

    // compare password with hashedPassword
    const isMatched = await bcrypt.compare(password, user.password)
    if (!isMatched) {
      throw new Error("Invalid Credentials")
    }


    if (!user.status) {
      throw new Error("Please verify your email first!")
    }

    // generating a secret token
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
        id: user._id,
        role: user.role
      },
      configs.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      secure: false,
      sameSite: "lax", // or "none" if frontend/backend are on different domains and using HTTPS
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    successRes(res, 200, true, "Logged In successfully!", {
      token
    })
  } catch (error) {
    errorRes(res, 400, false, error.message || "Something went wrong, please try later!", null)
  }
}

export { registerUser, verifyOTP, login }