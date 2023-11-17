const validator = require("validator");
const { User } = require("../sequelize");
const jwt = require("jsonwebtoken");
const { jwtConfig } = require("./../config");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "Please enter email and password" });
    }
    if (!validator.isEmail(email)) {
      return res.json({ message: "Please enter a valid email" });
    }
    const validPassword = validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    });
    if (!validPassword) {
      return res.json({
        message:
          "Please enter a valid password. Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one symbol.",
      });
    }
    const searchEmail = await User.findOne({ where: { email } });
    if (!searchEmail) {
      return res.json({ message: "User does not exist" });
    }
    if (password !== searchEmail.password) {
      return res.json({ message: "Incorrect password" });
    }
    const token = jwt.sign({ id: searchEmail.id }, jwtConfig.secretKey, {
      expiresIn: jwtConfig.expiresIn,
    });
    res
      .status(200)
      .json({ ok: true, message: "Logged in successfully", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = login;
