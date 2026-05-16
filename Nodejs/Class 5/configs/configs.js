import dotenv, { config } from "dotenv"

dotenv.config()

const configs = {
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI
}

export default configs