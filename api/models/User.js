const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: String,
  surname: String,
  email: { type: String, unique: true },
  password: String,
  avatar: [String],
  gallery: [{ photos: [String], imageDescription: String }],
  userDescription: String,
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
