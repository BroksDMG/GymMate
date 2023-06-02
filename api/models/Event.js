const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  address: String,
  description: String,
  experience: [String],
  time: { type: Date, default: Date.now },
  maxGuests: Number,
  photos: [String],
});

const EventModel = mongoose.model("Event", eventSchema);

module.exports = EventModel;
