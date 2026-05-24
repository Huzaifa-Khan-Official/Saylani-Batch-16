import express from "express"
import { login, registerUser } from "../controllers/users.controller.js"

const router = express.Router()

// Signup/Register Route
router.route("/register").post(registerUser)

// Login Route
router.route("/login").post(login)


export default router