const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/profile", userController.getUserProfile);
router.post("/logout", userController.logoutUser);
router.post("/user-avatar", userController.updateUserAvatar);
router.get("/user-events", userController.getUserEvents);

module.exports = router;
