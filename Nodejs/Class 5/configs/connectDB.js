import mongoose from "mongoose";
import configs from "./configs.js";

const connectDB = async () => {
  try {
    await mongoose.connect(configs.MONGODB_URI)

    console.log("MongoDB connected successfully!");    
  } catch (error) {
    console.log("Error connecting DB: ", error);    
  }
}

export default connectDB