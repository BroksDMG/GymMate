const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/User.js");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();

const jwtSecret = 'fasefraw4r5r3wq45wdfgw34twdfg';

app.use(express.json());
app.use(cookieParser());
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

app.post("/loginPage/register", async (req, res) => {
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

app.post("/loginPage/login", async (req, res) => {
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
        }
      );
      res.cookie("token", token).json(userDoc);
    } else {
      res.status(422).json("pass not ok");
    }
  } else {
    res.json("not found");
  }
});

app.get("/profile", (req, res) => {
  console.log("profil");
  const { token } = res.cookie;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
      if (err) throw err;
      const {name, email, _id} = await User.findById(userData.id);
      res.json(name, email, _id);
    });
  } else {
    res.json({ token });
  }
});

app.listen(4000);
