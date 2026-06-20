import configs from "../configs/configs.js";
import Users from "../models/users.model.js";
import jwt from "jsonwebtoken"
import { errorRes } from "../utils/responseHandler.js";

const verifyUser = async (req, res, next) => {
  try {
    console.log("token ==>", req.cookies.token);
    
    const token = req.cookies.token?.split("=")[0]    

    const decoded = jwt.verify(token, configs.JWT_SECRET)

    const user = await Users.findById(decoded.id)

    if (!user) throw new Error("Not Authorized!");

    req.user = user

    next()
  } catch (error) {
    errorRes(res, 400, false, error.message || "Something went wrong, please try later!", null)
  }
}

const verifyAdmin = async (req, res, next) => {
  try {
    const user = req.user
    if (user.role !== "Admin") {
      throw new Error("You are not authorized")
    }
    next()
  } catch (error) {
    errorRes(res, 400, false, error.message || "Something went wrong, please try later!", null)
  }
}

export { verifyUser, verifyAdmin }