const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController.js");
const protectRoute = require("../middleware/protectRoute.js");

router.post("/sendMessage/:id", protectRoute, messageController.sendMessage);
module.exports = router;
