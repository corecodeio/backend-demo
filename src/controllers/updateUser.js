const { User } = require("../sequelize");

const updateUser = async (req, res) => {
  try {
    const id = req.userId;
    const { firstName } = req.body;
    if (!firstName) {
      return res.json({ message: "Please enter first name" });
    }
    const user = await User.findOne({
      where: {
        id: id,
      },
    });
    if(!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.firstName = firstName;
    await user.save();
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = updateUser;
