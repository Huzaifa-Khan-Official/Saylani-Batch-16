import express from "express"
import { login, registerUser, verifyOTP } from "../controllers/auth.controller.js"

const router = express.Router()

// Signup/Register Route
router.route("/register").post(registerUser)

// Login Route
router.route("/login").post(login)

// Verify OTP
router.route("/verify/:useremail").post(verifyOTP)


export default router