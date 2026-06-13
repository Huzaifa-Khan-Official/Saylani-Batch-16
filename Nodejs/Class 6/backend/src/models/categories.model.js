import mongoose from "mongoose";

const { Schema, model } = mongoose;

const categoreisSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter the name of category!"]
  },
  description: {
    type: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true
  }
})

const Categories = model("Categories", categoreisSchema)

export default Categories