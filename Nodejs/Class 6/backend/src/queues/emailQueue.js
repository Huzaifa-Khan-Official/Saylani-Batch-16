import { Queue } from "bullmq"
import { redis } from "../configs/redis.js"

export const emailQueue = new Queue("emailQueue", {
  connection: redis
})