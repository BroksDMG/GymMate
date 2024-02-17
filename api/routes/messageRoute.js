const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController.js");

router.post("/sendMessage/:id", messageController.sendMessage);
module.exports = router;
