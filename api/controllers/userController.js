const User = require("../models/User");
const bcrypt = require("bcrypt");
const updateSettings = async (req, res) => {
  const { userId, settings } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(408).json({ error: "can't finde user" });
    }

    const passOK = bcrypt.compareSync(settings.oldPassword, user.password);
    if (passOK) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(settings.newPassword, salt);
      const updateUser = {
        password: hashPassword,
        ...settings,
      };
      user.password = settings.newPassword;
      user.name = settings.name;
      user.surname = settings.surname;
      user.email = settings.email;
      await user.save();
      res.json({ message: "Settings updated" });
    } else {
      res.status(422).json("password isn't okey");
    }
  } catch (error) {
    console.error("Błąd podczas pobierania:", error);
    return res.status(500).json({ error: "Błąd podczas pobierania." });
  }
};
module.exports = {
  updateSettings,
};
