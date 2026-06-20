import Categories from "../models/categories.model.js"
import { errorRes, successRes } from "../utils/responseHandler.js"

const createCategory = async (req, res) => {
  try {
    console.log("req ==>", req.body);
    
    const { name, description } = req.body

    if (!name) {
      throw new Error("Please fill the name of the category!")
    }

    await Categories.create({
      name,
      description,
      userId: req.user._id
    })

    successRes(res, 200, true, "Category created successfully!", null)
  } catch (error) {
    errorRes(res, 400, false, error.message || "Something went wrong, please try later!", null)
  }
}

const getAllCategory = async (req, res) => {
  try {
    const categories = await Categories.find({ userId: req.user._id })

    if (categories.length == 0) {
      throw new Error("Your category list is empty!")
    }

    successRes(res, 200, true, "Category fetched successfully!", categories)
  } catch (error) {
    errorRes(res, 400, false, error.message || "Something went wrong, please try later!", null)
  }
}

const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id
    const category = await Categories.findByIdAndDelete(id)

    if (!category) {
      throw new Error("Category not found!")
    }
    successRes(res, 200, true, "Category deleted successfully!", null)
  } catch (error) {
    errorRes(res, 400, false, error.message || "Something went wrong, please try later!", null)
  }
}

const updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body
    const id = req.params.id

    if (!id) {
      throw new Error("Category Id is required!")
    }

    if (!name) {
      throw new Error("Please fill the name of the category!")
    }

    const updatedData = await Categories.findByIdAndUpdate(id,{
      name,
      description,
      userId: req.user._id
    }, {new: true})

    successRes(res, 200, true, "Category updated successfully!", updatedData)
  } catch (error) {
    errorRes(res, 400, false, error.message || "Something went wrong, please try later!", null)
  }
}

export { createCategory, getAllCategory, deleteCategory, updateCategory }