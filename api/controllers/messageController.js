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
    // await conversation.save();
    // await newMessage.save();

    await Promise.all([conversation.save(), newMessage.save()]);
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in senMessage controller:", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};
const getMessage = async (req, res) => {
  try {
    const usertoChatId = req.params.id;
    const senderId = req.user._id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, reciverId] },
    }).populate("messages");
    if (!conversation) {
      return res.status(200).json([]);
    }
    res.status(200).json(conversation.messages);
  } catch (error) {
    console.log("Error in getMessage controller:", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};
const getUsersForSidebar = async (req, res) => {
  try {
    const LoggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: LoggedInUserId },
    }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getUsersForSidebar controller:", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};
module.exports = {
  sendMessage,
  getMessage,
  getUsersForSidebar,
};
