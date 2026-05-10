const dotenv = require("dotenv")

dotenv.config()

const configs = {
  PORT: process.env.PORT,
  dbURI: process.env.MONGODB_URI,
}


module.exports = configs