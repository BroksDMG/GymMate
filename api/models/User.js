const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: String,
  surname: String,
  email: { type: String, unique: true },
  password: String,
  avatar: [{ type: Object }],
  gallery: [{ imageId: [String], imageDescription: String }],
  userDescription: String,
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
