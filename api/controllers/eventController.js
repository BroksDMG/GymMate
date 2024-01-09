const jwt = require("jsonwebtoken");
const Event = require("../models/Event");
const { jwtSecret } = require("../config/config.js");
//const multer = require("multer");
//const photosMiddleware = multer({ dest: "uploads/" });

const eventController = {};

// eventController.register = async (req, res) => {
//   const { name, surname, email, password } = req.body;

//   try {
//     const isUserExist = await User.findOne({ email });
//     if (isUserExist) {
//       res.status(409).json({ error: "usera adlready exist" });
//     }
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const userDoc = await User.create({
//       name,
//       surname,
//       email,
//       password: hashedPassword,
//     });

//     res.json({ userDoc });
//   } catch (error) {
//     console.error("Błąd podczas rejestracji użytkownika:", error);
//     res
//       .status(500)
//       .json({ error: "Wystąpił błąd podczas rejestracji użytkownika." });
//   }
// };

// eventController.login = async (req, res) => {
//   try {
//     await mongoose.connect(process.env.MONGO_URL);
//   } catch (error) {
//     console.error("Database connection error:", error);
//     return res.status(500).json("Database connection error");
//   }

//   const { email, password } = req.body;

//   const userDoc = await User.findOne({ email });
//   if (userDoc) {
//     const passOk = bcrypt.compareSync(password, userDoc.password);
//     if (passOk) {
//       jwt.sign(
//         {
//           email: userDoc.email,
//           id: userDoc._id,
//         },
//         jwtSecret,
//         { expiresIn: "2h" },
//         (err, token) => {
//           if (err) throw err;
//           res.cookie("token", token).json(userDoc);
//         }
//       );
//     } else {
//       res.status(422).json("pass not ok");
//     }
//   } else {
//     res.status(400).json("not found");
//   }
// };

// eventController.profile = async (req, res) => {
//   const { token } = req.cookies;
//   if (token) {
//     jwt.verify(token, jwtSecret, {}, async (err, userData) => {
//       if (err) {
//         if (err.name === "TokenExpiredError") {
//           return res.status(401).json({ error: "Token expired" });
//         } else {
//           throw err;
//         }
//       } else {
//         const { name, email, surname, avatar, _id } = await User.findById(
//           userData.id
//         );
//         res.json({ name, email, surname, avatar, _id });
//       }
//     });
//   } else {
//     res.json(null);
//   }
// };

// eventController.logout = async (req, res) => {
//   res.cookie("token", "").json(true);
// };

eventController.uploadByLink = async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.json(newName);
};

const fs = require("fs");
const multer = require("multer");

eventController.upload = async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    try {
      const photosMiddleware = multer({ dest: "uploads/" });

      photosMiddleware.array("photos", 100)(req, res, async (err) => {
        if (err) {
          console.error("Błąd podczas uploadu plików:", err);
          return res
            .status(500)
            .json({ error: "Wystąpił błąd podczas uploadu plików." });
        }

        const uploadedFiles = [];
        for (let i = 0; i < req.files.length; i++) {
          const { path, originalname } = req.files[i];
          const ext = path.split(".").pop(); // Pobranie rozszerzenia pliku
          const newPath = path + "." + ext;

          // Zmiana nazwy pliku zgodnie z jego rozszerzeniem
          fs.renameSync(path, newPath);

          // Dodanie ścieżki nowego pliku do tablicy uploadedFiles
          uploadedFiles.push(newPath.replace("uploads\\", ""));
        }

        res.json(uploadedFiles); // Zwrócenie nazw załadowanych plików
      });
    } catch (error) {
      console.error("Błąd podczas obsługi uploadu:", error);
      res.status(500).json({ error: "Wystąpił błąd podczas obsługi uploadu." });
    }
  } else {
    res.json(null);
  }
};

eventController.createEvent = async (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    description,
    experience,
    date,
    maxGuests,
    addedPhotos,
    avatar,
  } = req.body;
  console.log(req.body);
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const eventDoc = await Event.create({
      owner: userData.id,
      title,
      address,
      description,
      experience,
      time: date,
      maxGuests,
      photos: addedPhotos,
      avatar,
    });
    res.json(eventDoc);
  });
};

eventController.getUserEvents = async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const { id } = userData;
    res.json(await Event.find({ owner: id }));
  });
};

eventController.getEventById = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id);
    if (!event) {
      res.status(404).json({ error: "Event not found" });
      return;
    }
    res.json(event);
  } catch (error) {
    console.error("Error fetching event by ID:", error);
    res.status(500).json({ error: "Error fetching event by ID" });
  }
};

eventController.updateEvent = async (req, res) => {
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
    avatar,
  } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) {
      console.error("JWT Verification Error:", err);
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    try {
      const event = await Event.findById(id);
      if (!event) {
        res.status(404).json({ error: "Event not found" });
        return;
      }

      if (userData.id === event.owner.toString()) {
        event.set({
          title,
          address,
          description,
          experience,
          time,
          maxGuests,
          photos: addedPhotos,
          avatar,
        });

        await event.save();
        res.json("Event updated successfully");
      } else {
        res.status(403).json({ error: "Permission denied" });
      }
    } catch (error) {
      console.error("Error updating event:", error);
      res.status(500).json({ error: "Error updating event" });
    }
  });
};

module.exports = eventController;
