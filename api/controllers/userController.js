const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { jwtSecret } = require("../config/config");
const multer = require("multer");

const userController = {};

userController.registerUser = async (req, res) => {
  const { name, surname, email, password } = req.body;
  try {
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      res.status(409).json({ error: "usera adlready exist" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userDoc = await User.create({
      name,
      surname,
      email,
      password: hashedPassword,
    });

    res.json({ userDoc });
  } catch (error) {
    console.error("Błąd podczas rejestracji użytkownika:", error);
    res
      .status(500)
      .json({ error: "Wystąpił błąd podczas rejestracji użytkownika." });
  }
};

userController.loginUser = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
  } catch (error) {
    console.error("Database connection error:", error);
    return res.status(500).json("Database connection error");
  }

  const { email, password } = req.body;

  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        {
          email: userDoc.email,
          id: userDoc._id,
        },
        jwtSecret,
        { expiresIn: "2h" },
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(422).json("pass not ok");
    }
  } else {
    res.status(400).json("not found");
  }
};

userController.getUserProfile = async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({ error: "Token expired" });
        } else {
          throw err;
        }
      } else {
        const { name, email, surname, avatar, _id } = await User.findById(
          userData.id
        );
        res.json({ name, email, surname, avatar, _id });
      }
    });
  } else {
    res.json(null);
  }
};

userController.logoutUser = (req, res) => {
  res.cookie("token", "").json(true);
};

const photosMiddleware = multer({ dest: "uploads/" });
userController.updateUserAvatar = async (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads\\", ""));
  }

  res.json(uploadedFiles);
};

userController.getUserEvents = async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) {
      console.error("JWT Verification Error:", err);
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    try {
      const userEvents = await Event.find({ owner: userData.id });
      res.json(userEvents);
    } catch (error) {
      console.error("Error fetching user events:", error);
      res.status(500).json({ error: "Error fetching user events" });
    }
  });
};

module.exports = userController;
