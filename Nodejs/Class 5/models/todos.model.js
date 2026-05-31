import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  }
})

const Todos = mongoose.model("Todos", todoSchema)

export default Todos