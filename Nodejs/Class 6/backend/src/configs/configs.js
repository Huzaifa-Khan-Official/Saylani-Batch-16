import dotenv from "dotenv"

dotenv.config()

const configs = {
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
  JWT_SECRET: process.env.JWT_SECRET,
}

export default configs