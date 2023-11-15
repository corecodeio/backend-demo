const { User } = require("../sequelize");

const getAllUsers = async (req, res) => {
  const users = await User.findAll({
    attributes: ["id", "firstName", "email"],
  });
  res.json({ users });
};

module.exports = getAllUsers;
