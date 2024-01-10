const mongoose = require("mongoose");
const imagesSchema = new mongoose.Schema(
  {
    _id: { type: String, default: "gloabl" },
    images: [{ imageBinary: Object, imageId: String }],
  },
  { _id: false }
);

module.exports = mongoose.model("Images", imagesSchema);
