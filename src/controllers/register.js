const { createUser } = require("../db");
const validator = require("validator");

const register = (req, res) => {
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
    const newUser = createUser(email, password);
    if (!newUser) {
      return res.json({ message: "User already exists" });
    }
    res.json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = register;
