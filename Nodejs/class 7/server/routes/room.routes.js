const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const { getRooms, createRoom, joinRoom, getRoomById } = require("../controllers/room.controller");
const { protect } = require("../middleware/auth.middleware");

router.use(protect);
router.get("/", asyncHandler(getRooms));
router.post("/", asyncHandler(createRoom));
router.get("/:id", asyncHandler(getRoomById));
router.post("/:id/join", asyncHandler(joinRoom));

module.exports = router;
