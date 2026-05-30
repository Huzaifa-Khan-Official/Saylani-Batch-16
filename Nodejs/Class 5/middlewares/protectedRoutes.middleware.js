import configs from "../configs/configs.js";
import { errorRes } from "../lib/responseHandler.js";
import Users from "../models/users.model.js";
import jwt from "jsonwebtoken"

const protectedRoute = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new Error("No Token Provided!")
    }

    const token = req.headers.authorization.split(" ")[1]
    // console.log("token ==>", token);

    const decoded = jwt.verify(token, configs.JWT_SECRET)

    // console.log("decoded ==>", decoded);

    const user = await Users.findById(decoded.id)

    if (!user) throw new Error("Not Authorized!");

    next()
  } catch (error) {
    errorRes(res, 400, false, error.message || "Something went wrong, please try later!", null)
  }
}

export default protectedRoute