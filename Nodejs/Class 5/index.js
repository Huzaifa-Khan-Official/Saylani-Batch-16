import express from "express"
import configs from "./configs/configs.js"
import connectDB from "./configs/connectDB.js"

import todosRoutes from "./routes/todos.routes.js"
import authRoutes from "./routes/auth.routes.js"
import adminRoutes from "./routes/admin.routes.js"

const app = express()

app.use(express.json())
connectDB()

// Todos APIs
app.use("/api/todos", todosRoutes)

// Auth APIs
app.use("/api/auth", authRoutes)

// Admin APIs
app.use("/api/admin", adminRoutes)

app.listen(configs.PORT, () => {
  console.log("Server is up and running on PORT: ", configs.PORT);
})