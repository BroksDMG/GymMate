const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  address: String,
  descripton: String,
  experience: [String],
  time: Number,
  maxGuests: Number,
  photos: [String],
});

const EventModel = mongoose.model("Place", eventSchema);

module.exports = EventModel;
