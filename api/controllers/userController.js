const User = require("../models/User");
const bcrypt = require("bcrypt");
const generateToken = require("../middleware/generateToken");
const mongoose = require("mongoose");
const jwtSecret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const updateSettings = async (req, res) => {
  const { userId, settings } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(408).json({ error: "user not found" });
    }

    const passOK = bcrypt.compareSync(settings.oldPassword, user.password);
    if (passOK) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(settings.newPassword, salt);
      user.password = hashPassword;
      user.name = settings.name;
      user.surname = settings.surname;
      user.email = settings.email;
      await user.save();
      res.json({ message: "settings changed correct" });
    } else {
      res.status(422).json("incorrect password");
    }
  } catch (error) {
    console.error("Error while processing:", error);
    return res.status(500).json({ error: "Error while processing." });
  }
};
const login = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
  } catch (error) {
    console.error("Error in Login controller with database:", error.message);
    return res.status(500).json("Database connection error");
  }
  try {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email });
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (!userDoc || !passOk) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    generateToken(userDoc, res);
    res.status(200).json(userDoc);
  } catch (error) {
    console.error("Error in Login controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    res.json(true);
  } catch (error) {
    console.error("Error in logout controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
const profile = async (req, res) => {
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
        const {
          name,
          email,
          surname,
          _id,
          avatar,
          userDescription,
          gallery,
          friends,
          friendRequests,
        } = await User.findById(userData.id);
        res.json({
          name,
          email,
          surname,
          _id,
          avatar,
          userDescription,
          gallery,
          friends,
          friendRequests,
        });
      }
    });
  } else {
    res.json(null);
  }
};
module.exports = {
  login,
  logout,
  profile,
  updateSettings,
};
