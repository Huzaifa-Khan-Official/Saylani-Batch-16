import express from "express"

const router = express.Router()

router.route("/categories")
  .get((req, res) => {
    res.send("Connected")
  })

export default router