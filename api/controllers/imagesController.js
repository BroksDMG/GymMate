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

    return res.json(imageToReturn);
  } catch (error) {
    console.error("Błąd podczas pobierania:", error);
    return res.status(500).json({ error: "Błąd podczas pobierania." });
  }
};
const getImages = async (req, res) => {
  const { images } = req.query;
  const imagesArray = images.split(",");
  try {
    const imagesLiblary = await Images.findById("gloabl").exec();
    if (!imagesLiblary) {
      return res.status(400).json({ error: "can't finde image liblary" });
    }
    if (!imagesArray > 0) {
      return res.status(400).json({ error: "can't finde images" });
    }
    const imageToReturn = imagesArray.map((imageId) =>
      imagesLiblary.images.find((image) => image.imageId === imageId)
    );
    return res.json(imageToReturn);
  } catch (error) {
    console.error("Błąd podczas pobierania:", error);
    return res.status(500).json({ error: "Błąd podczas pobierania." });
  }

  res.json(imagesArray);
};
module.exports = {
  uploadImages,
  getImageById,
  getImages,
};
