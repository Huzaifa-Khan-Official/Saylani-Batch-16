import express from "express"
import { createCategory, deleteCategory, getAllCategory, updateCategory } from "../controllers/admin.controller.js"

const router = express.Router()

router.route("/categories")
  .get(getAllCategory)
  .post(createCategory)

router.route("/categories/:id")
  .delete(deleteCategory)
  .put(updateCategory)

export default router