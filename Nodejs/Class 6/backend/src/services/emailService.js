import nodemailer from "nodemailer"
import transporter from "../utils/mailTransporter.js"
import configs from "../configs/configs.js"

export const sendOtpEmail = async (email, otp) => {
  await transporter.sendMail({
    from: configs.SMTP_USER,
    to: email,
    subject: "Hello", // subject line
    // text: "Hello world?", // plain text body
    html: `<h1>Your OTP: ${OTP}</h1>`, // HTML body
  })
}