import nodemailer from "nodemailer";
import configs from "../configs/configs.js";

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: configs.SMTP_USER,
    pass: configs.SMTP_PASS,
  },
});

export default transporter