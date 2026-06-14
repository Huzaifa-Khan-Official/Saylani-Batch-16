import express from "express"
import configs from "./configs/configs.js"
import connectDB from "./configs/connectDB.js"
import authRoutes from "./routes/auth.routes.js"
import verifyUser from "./middlewares/veirfication.middleware.js"
import adminRoutes from "./routes/admin.routes.js"
import cookieParser from "cookie-parser"

const app = express()

app.use(express.json())
app.use(cookieParser('your-secret-key'));

await connectDB()

// Auth APIs
app.use("/api/auth", authRoutes)

// Admin related APIs
app.use("/api/admin", verifyUser, adminRoutes)

app.listen(configs.PORT, () => {
  console.log("Your server is up and running on PORT: ", configs.PORT);
})