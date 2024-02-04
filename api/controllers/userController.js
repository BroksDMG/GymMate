const User = require("../models/User");

const updateSettings = async (req, res) => {
  const { userId, settings } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(408).json({ error: "can't finde user" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(settings.password, salt);
    uset.set({
      settings: {
        email: settings.email,
        password: hashPassword,
        ...settings,
      },
    });
    await user.save();
    res.json({ message: "Settings updated" });
  } catch (error) {
    console.error("Błąd podczas pobierania:", error);
    return res.status(500).json({ error: "Błąd podczas pobierania." });
  }
};
