const express = require("express");
const router = express.Router();
const imagesController = require("../controllers/imagesController");
const upload = require("../middleware/upload");

router.post(
  "/upload-images",
  upload.array("avatar", 100),
  imagesController.uploadImages
);
router.get("/get-imageById/:imageId", imagesController.getImageById);
router.get("/get-images", imagesController.getImages);
module.exports = router;
