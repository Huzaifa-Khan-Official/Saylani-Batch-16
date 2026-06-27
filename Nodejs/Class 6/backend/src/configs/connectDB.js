import mongoose from "mongoose";
import configs from "./configs.js";
import dns from "dns";

dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const connectDB = async () => {
  try {
    await mongoose.connect(configs.MONGODB_URI)

    console.log("MongoDB connected successfully!");    
  } catch (error) {
    console.log("Error connecting DB: ", error);    
  }
}

export default connectDB