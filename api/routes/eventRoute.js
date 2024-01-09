const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");

// router.post("/register", eventController.register);
// router.post("/login", eventController.login);
// router.get("/profile", eventController.profile);
// router.post("/logout", eventController.logout);
router.post("/upload-by-link", eventController.uploadByLink);
router.post("/upload", eventController.upload);
router.post("/events", eventController.createEvent);
router.get("/user-events", eventController.getUserEvents);
router.get("/:id", eventController.getEventById);
router.put("/", eventController.updateEvent);

module.exports = router;
