const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const { getMessages } = require("../controllers/message.controller");
const { protect } = require("../middleware/auth.middleware");

router.use(protect);
router.get("/:roomId", asyncHandler(getMessages));

module.exports = router;
