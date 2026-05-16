import express from "express"
import Todos from "../models/todos.model.js"

const router = express.Router()

router.get("/", async (req, res) => {
  try {
    const todos = await Todos.find()
    console.log("todos ==>", todos);
    res.status(200).json({
      status: true,
      message: "All Todos Fetched Successfully!",
      data: todos
    })
  } catch (error) {
    console.log("Error on getting all todos", error);    
  }
})

router.post("/post1", async (req, res) => {
  try {
    console.log("post route called ==>", req.body);
    const response = await Todos.create(req.body)

    res.status(200).json({
      status: true,
      message: "Todo created successfully!",
      data: null
    })
  } catch (error) {
    console.log("error on creating a todo ==>", error);
  }
})

export default router