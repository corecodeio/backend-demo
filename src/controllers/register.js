const validator = require("validator");
const { User } = require("../sequelize");

const register = async(req, res) => {
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
    if (searchEmail) {
      return res.json({ message: "User already exists" });
    }
    const newUser = await User.create({
      email,
      password,
    });
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = register;
