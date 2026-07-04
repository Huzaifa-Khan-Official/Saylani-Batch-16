const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const { register, login, getMe } = require("../controllers/auth.controller");
const { protect } = require("../middleware/auth.middleware");

router.post("/register", (req, res, next) => { console.log("auth api called!"), next() }, asyncHandler(register));
router.post("/login", asyncHandler(login));
router.get("/me", protect, asyncHandler(getMe));

module.exports = router;
