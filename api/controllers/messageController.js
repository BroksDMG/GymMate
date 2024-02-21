const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const reciverId = req.params.id;
    const senderId = req.user._id;
    console.log(req.body);
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, reciverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, reciverId],
      });
    }
    const newMessage = new Message({
      senderId,
      receiverId: reciverId,
      message,
    });
    if (newMessage) {
      conversation.messages.push(newMessage);
    }
    await conversation.save();
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in senMessage controller:", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};
module.exports = {
  sendMessage,
};
