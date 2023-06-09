const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/User.js");
const Event = require("./models/Event.js");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");

require("dotenv").config();
const app = express();

const jwtSecret = "fasefraw4r5r3wq45wdfgw34twdfg";

app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static(__dirname + "/uploads"));

app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173",
  })
);
console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL);
// Nasłuchiwanie na zdarzenie "error" (błąd połączenia z bazą danych)
mongoose.connection.on("error", (error) => {
  console.error("Błąd połączenia z bazą danych:", error);
});

// Nasłuchiwanie na zdarzenie "connected" (udane połączenie z bazą danych)
mongoose.connection.on("connected", () => {
  console.log("Połączono z bazą danych MongoDB!");
});
app.get("/", (req, res) => {
  res.json("test ok");
});

app.post("/register", async (req, res) => {
  const { name, surname, email, password } = req.body;

  try {
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
});

app.post("/login", async (req, res) => {
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
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(422).json("pass not ok");
    }
  } else {
    res.json("not found");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(userData.id);
      res.json(name, email, _id);
    });
  } else {
    res.json(null);
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.json(newName);
});

const photosMiddleware = multer({ dest: "uploads/" });
app.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
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
});

app.post("/events", (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    description,
    experience,
    time,
    maxGuests,
    addedPhotos,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const eventDoc = await Event.create({
      owner: userData.id,
      title,
      address,
      description,
      experience,
      time,
      maxGuests,
      photos: addedPhotos,
    });
    res.json(eventDoc);
  });
});

app.get("/user-events", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const { id } = userData;
    res.json(await Event.find({ owner: id }));
  });
});

app.get("/events/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Event.findById(id));
});

app.put("/events", async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    description,
    experience,
    time,
    maxGuests,
    addedPhotos,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const eventDoc = await Event.findById(id);
    if (userData.id === eventDoc.owner.toString()) {
      eventDoc.set({
        title,
        address,
        description,
        experience,
        time,
        maxGuests,
        photos: addedPhotos,
      });
      await eventDoc.save();
      res.json("ok");
    }
  });
});

app.get("/events", async (req, res) => {
  res.json(await Event.find());
});

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.listen(4000);
