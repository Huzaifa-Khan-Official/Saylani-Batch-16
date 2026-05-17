import express from "express"
import { createTodo, getAllTodos, getTodoByID, updateTodoByID, deleteTodoByID } from "../controllers/todos.controller.js"

const router = express.Router()

// router.get("/", async (req, res) => {
//   try {
//     const todos = await Todos.find()
//     console.log("todos ==>", todos);
//     res.status(200).json({
//       status: true,
//       message: "All Todos Fetched Successfully!",
//       data: todos
//     })
//   } catch (error) {
//     console.log("Error on getting all todos", error);    
//   }
// })

// router.post("/", async (req, res) => {
//   try {
//     console.log("post route called ==>", req.body);
//     const response = await Todos.create(req.body)

//     res.status(200).json({
//       status: true,
//       message: "Todo created successfully!",
//       data: null
//     })
//   } catch (error) {
//     console.log("error on creating a todo ==>", error);
//   }
// })

router
  .route("/")
  .get(getAllTodos)
  .post(createTodo)

router
  .route("/:todoId") // /2, /3, /35
  .get(getTodoByID)
  .put(updateTodoByID)
  .delete(deleteTodoByID)

export default router