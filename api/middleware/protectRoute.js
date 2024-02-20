const User = require("../models/User");
const jwt = require("jsonwebtoken");
const protectRoute = async (req, res) => {
  try {
    const { token } = req.cookies;
    console.log(token, "token");
    console.log(req.cookies, "req.cookies");
    console.log(req.cookies.token, "req.cookies");
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - No token Provided" });
    }
    console.log(token, "token");
    const decoded = jwt.verify(token, "fasefraw4r5r3wq45wdfgw34twdfg");
    console.log("decoded", decoded);
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    }
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = protectRoute;
