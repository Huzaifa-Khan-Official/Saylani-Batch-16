import { Worker } from "bullmq";
import { redis } from "../configs/redis.js";
import { sendOtpEmail } from "../services/emailService.js";

new Worker(
  "emailQueue",
  async (job) => {
    const { email, otp } = job.data

    await sendOtpEmail(email, otp)
  },
  {
    connection: redis
  }
)