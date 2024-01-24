const path = require("path");
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),

  fileFilter: (req, file, callback) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      file.extension = path.extname(file.originalname);
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  limits: {
    fileSize: 3 * 1024 * 1024,
  },
});
module.exports = upload;
