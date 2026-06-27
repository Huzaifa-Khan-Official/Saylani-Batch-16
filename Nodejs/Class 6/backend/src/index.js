import express from "express"
import configs from "./configs/configs.js"
import connectDB from "./configs/connectDB.js"
import authRoutes from "./routes/auth.routes.js"
import {verifyUser, verifyAdmin} from "./middlewares/veirfication.middleware.js"
import adminRoutes from "./routes/admin.routes.js"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()


const corsOptions = {
  origin: configs.BASE_URL, // Only allow this domain
  optionsSuccessStatus: 200,          // For legacy browser compatibility (IE11)
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json())
app.use(cookieParser(configs.COOKIES_SECRET));

await connectDB()

// Auth APIs
app.use("/api/auth", authRoutes)

// Admin related APIs
app.use("/api/admin", verifyUser, verifyAdmin, adminRoutes)

app.listen(configs.PORT, () => {
  console.log("Your server is up and running on PORT: ", configs.PORT);
})

// Export the Express app for deployment
export default app;