const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  address: String,
  description: String,
  experience: [String],
  time: Date,
  maxGuests: Number,
  photos: [String],
  guests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  avatar: [String],
});

const EventModel = mongoose.model("Event", eventSchema);

module.exports = EventModel;
