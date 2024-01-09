require("dotenv").config();

module.exports = {
  jwtSecret: process.env.JWT_SECRET || "your_jwt_secret_key_here",
  // inne ustawienia konfiguracyjne, jeśli są
};
