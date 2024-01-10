const { v4: uuidv4 } = require("uuid");
const Images = require("../models/Images.js");

const uploadImages = async (req, res) => {
  const { files } = req;
  try {
    let ImagesLiblary = await Images.findById("gloabl").exec();
    if (!ImagesLiblary) {
      return res.status(400).json({ error: "can't finde image liblary" });
    }

    if (!files || files.length === 0) {
      new Images({ _id: "global" });
      return res.status(400).json({ error: "No files" });
    }

    const photosBinary = files.map((file) => ({
      imageBinary: file.buffer,
      imageId: uuidv4(),
    }));
    photosBinary.map((photo) => {
      ImagesLiblary.images.push(photo);
    });
    await ImagesLiblary.save();
    res.json(photosBinary);
  } catch (error) {
    console.error("Błąd podczas uploadu:", error);
    res.status(500).json({ error: "Błąd podczas uploadu." });
  }
};
const getImages = (req, res) => {
  res.json("test ok");
};
module.exports = {
  uploadImages,
  getImages,
};
