const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/config");

const authMiddleware = (req, res, next) => {
  // Middleware do autoryzacji JWT
};

module.exports = authMiddleware;
