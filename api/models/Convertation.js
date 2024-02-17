import mongoose from "mongoose";

const converstionSchema = new mongoose.Schema(
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
const Converstion = mongoose.model("Converstation", converstionSchema);

export default Converstion;
