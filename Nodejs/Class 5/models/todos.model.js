import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: {
    type: String
  },
  description: {
    type: String
  }
})

const Todos = mongoose.model("Todos", todoSchema)

export default Todos