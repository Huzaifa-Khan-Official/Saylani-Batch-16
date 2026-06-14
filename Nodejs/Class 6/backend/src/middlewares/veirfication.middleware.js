import configs from "../configs/configs.js";
import Users from "../models/users.model.js";
import jwt from "jsonwebtoken"
import { errorRes } from "../utils/responseHandler.js";

const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token.split("=")[0]
  
    if (!token) {
      throw new Error("No Token Provided!")
    }
    
    const decoded = jwt.verify(token, configs.JWT_SECRET)

    console.log("decoded ==>", decoded);

    const user = await Users.findById(decoded.id)

    if (!user) throw new Error("Not Authorized!");

    req.user = user

    next()
  } catch (error) {
    errorRes(res, 400, false, error.message || "Something went wrong, please try later!", null)
  }
}

export default verifyUser