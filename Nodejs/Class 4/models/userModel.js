const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  fullName: String
})

const Users = mongoose.model("User", userSchema)

module.exports = Users