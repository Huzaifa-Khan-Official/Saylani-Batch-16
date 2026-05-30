import express from "express"
import { getAllUsers, updateUserById } from "../controllers/users.controller.js"
import protectedRoute from "../middlewares/protectedRoutes.middleware.js"

const router = express.Router()

router.get("/users", protectedRoute, getAllUsers)

router.put("/users/:id", protectedRoute, updateUserById)


export default router