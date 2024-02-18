const Conversation = require("../models/Conversation");

const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: reciverId } = req.params;
    const senderId = req.user._id;
    console.log("send", senderId, id, message);

    let converstion = await Conversation.findOne({
      participants: { $all: [senderId, reciverId] },
    });

    if (!converstion) {
      converstion = await Conversation.create({
        participants: [senderId, reciverId],
      });
      await converstion.save();
    }
    const newMessage = {
      senderId,
      receiverId: reciverId,
      message,
    };
    if (newMessage) {
      converstion.messages.push(newMessage);
      await converstion.save();
    }
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in senMessage controller:", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};
module.exports = {
  sendMessage,
};
