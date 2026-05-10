const configs = require("./configs.js")
const mongoose = require("mongoose")

const connectDB = async () => {
  try {
    await mongoose.connect(configs.dbURI)
  } catch (error) {
    console.error("Error ==>", error.message);
    process.exit(1);
  }
}

module.exports = connectDB