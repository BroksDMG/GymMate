const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/User.js");
const Event = require("./models/Event.js");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const fs = require("fs");
const { rejects } = require("assert");
const { fr } = require("date-fns/locale");
const multer = require("multer");

require("dotenv").config();
const app = express();

const jwtSecret = process.env.JWT_SECRET;

app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static(__dirname + "/uploads"));

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
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

app.use("/images", require("./routes/imagesRoute.js"));
app.use("/user", require("./routes/userRoute.js"));
app.use("/message", require("./routes/messageRoute.js"));

app.post("/register", async (req, res) => {
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
});

app.post("/login", async (req, res) => {
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
          res
            .cookie("token", token, {
              httpOnly: true,
              sameSite: "None",
              secure: true,
            })
            .json(userDoc);
        }
      );
    } else {
      res.status(422).json("pass not ok");
    }
  } else {
    res.status(400).json("not found");
  }
});

app.get("/profile", async (req, res) => {
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
});

let isLogoutInProgress = false;

app.post("/logout", (req, res) => {
  if (!isLogoutInProgress) {
    isLogoutInProgress = true;
    res
      .clearCookie("token", { httpOnly: true, sameSite: "None", secure: true })
      .json(true);
    isLogoutInProgress = false;
  } else {
    res.status(500).json({ error: "Logout in progress" });
  }
});

// app.post("/upload-by-link", async (req, res) => {
//   const { link } = req.body;
//   const newName = "photo" + Date.now() + ".jpg";
//   await imageDownloader.image({
//     url: link,
//     dest: __dirname + "/uploads/" + newName,
//   });
//   res.json(newName);
// });

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

app.post("/events", async (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    guests,
    description,
    experience,
    date,
    maxGuests,
    addedPhotos,
    avatar,
  } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const eventDoc = await Event.create({
      owner: userData.id,
      title,
      address,
      guests,
      description,
      experience,
      time: date,
      maxGuests,
      photos: addedPhotos,
      avatar,
    });
    res.json(eventDoc);
  });
});
app.get("/user-events", async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - Token not provided" });
    }

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ error: "Internal Server Error - Invalid token" });
      }

      const { id } = userData;
      const events = await Event.find({ owner: id });
      res.json(events);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/event-owner/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user);
});
app.get("/members-events/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Event.find({ owner: id }));
});
app.get("/events/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Event.findById(id));
});
app.post("/join-event", async (req, res) => {
  const { token } = req.cookies;
  const { guestId, eventId } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const eventDoc = await Event.findById(eventId);
    if (eventDoc.guests.includes(guestId)) {
      return res.status(401).json({ error: "You are already a guest" });
    }
    if (eventDoc.guests.length >= eventDoc.maxGuests) {
      return res.status(402).json({ error: "Event is full" });
    }
    eventDoc.guests.push(userData.id);
    await eventDoc.save();
    res.json("joined");
  });
});
app.get("/account/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await User.findById(id));
});
app.put("/events", async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    owner,
    title,
    address,
    description,
    experience,
    time,
    maxGuests,
    addedPhotos,
    avatar,
  } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const eventDoc = await Event.findById(id);
    if (userData.id === eventDoc.owner.toString()) {
      eventDoc.set({
        title,
        owner,
        address,
        description,
        experience,
        time,
        maxGuests,
        photos: addedPhotos,
        avatar,
      });
      await eventDoc.save();
      res.json("ok");
    }
  });
});

app.post("/user-avatar", async (req, res) => {
  const { token } = req.cookies;
  const { avatar, gallery, userDescription } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const userDoc = await User.findById(userData.id);
    userDoc.set({
      avatar,
      gallery,
      userDescription,
    });
    await userDoc.save();
    res.json("ok");
  });
});

app.get("/events", async (req, res) => {
  res.json(await Event.find());
});

app.post("/add-friend", async (req, res) => {
  const { currentUserId, friendId } = req.body;

  const friend = await User.findById(friendId);
  const currentUser = await User.findById(currentUserId);
  if (!friend) {
    return res.status(404).json({ error: "Firend not found" });
  }
  if (currentUser.friends.includes(friendId)) {
    return res.status(400).json({ error: "You are already friends" });
  }
  if (friend.friendRequests.includes(currentUserId)) {
    return res.status(400).json({ error: "Friend request already sent" });
  }

  friend.friendRequests.push(currentUserId);
  await friend.save();
  res.json({ message: "Friend request sent successfully" });
});

app.post("/accept-friend", async (req, res) => {
  const { currentUserId, friendId } = req.body;

  const friend = await User.findById(friendId);
  const currentUser = await User.findById(currentUserId);
  if (!currentUser || !friend) {
    return res.status(404).json({ error: "Firend not found" });
  }

  if (!currentUser.friendRequests.includes(friendId)) {
    return res.status(400).json({ error: "Friend request not found" });
  }

  if (currentUser.friends.includes(friendId)) {
    friend.friendRequests = friend.friendRequests.filter(
      (id) => id.toString() !== currentUserId
    );
    currentUser.friendRequests = currentUser.friendRequests.filter(
      (id) => id.toString() !== friendId
    );
    return res.status(400).json({ error: "Friend request already accepted" });
  }
  friend.friendRequests = friend.friendRequests.filter(
    (id) => id.toString() !== currentUserId
  );
  currentUser.friendRequests = currentUser.friendRequests.filter(
    (id) => id.toString() !== friendId
  );
  currentUser.friends.push(friendId);
  friend.friends.push(currentUserId);

  await friend.save();
  await currentUser.save();

  res.json({ message: "Friend requset accepted successfully" });
});
app.post("/reject-friend", async (req, res) => {
  const { currentUserId, friendId } = req.body;

  // Fetch the friend
  const friend = await User.findById(friendId);
  const currentUser = await User.findById(currentUserId);
  if (!friend) {
    return res.status(404).json({ error: "Friend not found" });
  }

  // Remove the friend request
  currentUser.friendRequests = currentUser.friendRequests.filter(
    (id) => id.toString() !== friendId
  );
  await currentUser.save();

  res.json({ message: "Friend request rejected successfully" });
});
app.get("/friend-request/:userId", async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId).populate("friendRequests");
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user.friendRequests);
});
app.get("/friends/:userId", async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId).populate("friends");
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user.friends);
});
app.get("/test", (req, res) => {
  res.json("test ok");
});
// app.use(function (req, res, next) {
//   res.status(404).sendFile(__dirname + "/path/to/your/404page.html");
// });
console.log(process.env.PORT);
app.listen(process.env.PORT || 4000);
