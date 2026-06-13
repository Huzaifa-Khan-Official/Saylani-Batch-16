import mongoose from "mongoose";

const { Schema, model } = mongoose;

const productsSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter the name of the product!"]
  },
  description: {
    type: String,
    required: [true, "Please enter the description of the product!"]
  },
  sku: {
    type: String,
    required: [true, "Please enter the SKU of the product!"]
  },
  price: {
    type: Number,
    required: [true, "Please enter the price of the product!"]
  },
  stock: {
    type: Number,
    required: [true, "Please enter the stock of the product!"]
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Categories",    
  },
  supplier: {
    type: Schema.Types.ObjectId,
    ref: "Suppliers",
  },
  image: {
    type: String,
    required: [true, "Please insert the image of the product!"]
  },
  status: {
    type: String,
    enum: ['In Stock', 'Low Stock', "Out of Stock"],
    default: "In Stock"
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true
  }
})