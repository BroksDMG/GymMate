const User = require("../models/User");

const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id } = req.params;
    const senderId = req.userId;
  } catch (error) {
    console.log("Error in senMessage controller:", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};
module.exports = {
  sendMessage,
};
