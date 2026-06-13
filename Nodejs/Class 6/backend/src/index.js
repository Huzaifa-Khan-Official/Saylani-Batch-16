import express from "express"
import configs from "./configs/configs.js"
import connectDB from "./configs/connectDB.js"

const app = express()

app.use(express.json())
await connectDB()

app.listen(configs.PORT, () => {
  console.log("Your server is up and running on PORT: ", configs.PORT);
})