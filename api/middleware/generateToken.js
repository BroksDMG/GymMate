const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

function generateToken(user, res) {
  const token = jwt.sign({ id: user._id, email: user.email }, jwtSecret, {
    expiresIn: "30d",
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 15 * 24 * 60 * 60 * 1000,
  });
}
module.exports = generateToken;
