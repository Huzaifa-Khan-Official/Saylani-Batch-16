import cloudinary from "../lib/cloudinary.js";
import Todos from "../models/todos.model.js";

const getAllTodos = async (req, res) => {
  try {
    const todos = await Todos.find()
    res.status(200).json({
      status: true,
      message: "All Todos Fetched Successfully!",
      data: todos
    })
  } catch (error) {
    console.log("Error on getting all todos", error);
    res.status(400).json({
      status: false,
      message: "Error getting all todos, Please try later!",
      data: null
    })
  }
}

const createTodo = async (req, res) => {
  try {
    const image = req.file
    // console.log("image ===>", image);

    const result = await cloudinary.uploader.upload(
      `data:${image.mimetype};base64,${image.buffer.toString("base64")}`
    );

    // console.log(result);

    const { title, description } = req.body;
    if (!title || !description) {
      res.status(400).json({
        status: false,
        message: "Fill all required fields!",
        data: null
      })
    }
    const response = await Todos.create({
      title,
      description,
      image: result.secure_url
    })
    res.status(200).json({
      status: true,
      message: "Todo created successfully!",
      data: null
    })
  } catch (error) {
    console.log("error on creating a todo ==>", error);
    res.status(400).json({
      status: false,
      message: "Error creating a todo, please try latter!",
      data: null
    })
  }
}

const getTodoByID = async (req, res) => {
  try {
    const { todoId } = req.params
    console.log("todoId ==>", todoId);
    const todoData = await Todos.findById(todoId)

    if (!todoData) {
      res.status(400).json({
        status: false,
        message: "Can not find your todo!",
        data: null
      })
    }

    res.status(200).json({
      status: true,
      message: "Todo fetched  successfully!",
      data: todoData
    })
  } catch (error) {
    console.log("error getting a todo (By ID) ==>", error);
    res.status(400).json({
      status: false,
      message: "Error getting a todo, please try latter!",
      data: null
    })
  }
}

const updateTodoByID = async (req, res) => {
  try {
    const { todoId } = req.params
    const { title, description } = req.body;
    if (!title && !description) {
      res.status(400).json({
        status: false,
        message: "Fill all required fields!",
        data: null
      })
    }

    const updatedTodo = await Todos.findByIdAndUpdate(todoId, {
      title,
      description
    }, { new: true })

    res.status(200).json({
      status: true,
      message: "Todo updated successfully!",
      data: updatedTodo
    })
  } catch (error) {
    console.log("error updating a todo (By ID) ==>", error);
    res.status(400).json({
      status: false,
      message: "Error updating a todo, please try latter!",
      data: null
    })
  }
}

const deleteTodoByID = async (req, res) => {
  try {
    const { todoId } = req.params
    const response = await Todos.findByIdAndDelete(todoId)

    console.log("response ==>", response);

    if (!response) {
      res.status(400).json({
        status: false,
        message: "Can not find your todo!",
        data: null
      })
    }

    res.status(200).json({
      status: true,
      message: "Todo deleted successfully!",
      data: null
    })
  } catch (error) {
    console.log("error deleting a todo (By ID) ==>", error);
    res.status(400).json({
      status: false,
      message: "Error deleting a todo, please try latter!",
      data: null
    })
  }
}

export { createTodo, getAllTodos, getTodoByID, updateTodoByID, deleteTodoByID }