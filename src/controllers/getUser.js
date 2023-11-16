const { User } = require("../sequelize");

const getUser = async (req, res) => {
  try {
    const id = req.userId;
    const user = await User.findOne({
      where: {
        id: id,
      },
      attributes: {
        exclude: ["password"],
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = getUser;
