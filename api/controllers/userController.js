const User = require("../models/User");
const bcrypt = require("bcrypt");
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
module.exports = {
  updateSettings,
};
