const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        default: [],
        ref: "Message",
      },
    ],
  },
  ///created at, ipdated ad
  { timestamps: true }
);
const Conversation = mongoose.model("Conversation", ConversationSchema);
module.exports = Conversation;
