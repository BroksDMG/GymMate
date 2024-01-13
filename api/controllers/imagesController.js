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
const getImageById = async (req, res) => {
  const { imageId } = req.params;
  try {
    const images = await Images.findById("gloabl").exec();
    if (!images) {
      return res.status(400).json({ error: "can't finde image liblary" });
    }
    if (!imageId) {
      return res.status(400).json({ error: "can't finde images id" });
    }
    const imageToReturn = images.images.filter(
      (image) => image.imageId !== imageId
    );

    res.json(imageToReturn);
  } catch (error) {
    console.error("Błąd podczas pobierania:", error);
    res.status(500).json({ error: "Błąd podczas pobierania." });
  }
};
const getImages = async (req, res) => {
  const { test } = req;
  console.log(test);

  res.json(test);
};
module.exports = {
  uploadImages,
  getImageById,
  getImages,
};
