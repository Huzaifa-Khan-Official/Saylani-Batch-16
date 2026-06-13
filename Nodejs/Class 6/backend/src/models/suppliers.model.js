import mongoose from "mongoose";

const { Schema, model } = mongoose;

const supplierSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter the name of your supplier!"],
  },
  email: {
    type: String,
    required: [true, "Please enter the email of your supplier!"],
  },
  contact: {
    type: String,
    required: [true, "Please enter the contact number of your supplier!"],
  },
  address: {
    type: String,
    required: [true, "Please enter the address of your supplier!"],
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true
  }
})

const Suppliers = model("Suppliers", supplierSchema)

export default Suppliers