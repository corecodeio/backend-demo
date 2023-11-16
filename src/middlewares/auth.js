const { jwtConfig } = require("./../config");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer")
    ) {
      return res.status(401).json({ message: "Token not found" });
    }
    const token = req.headers.authorization.split("Bearer ")[1];
    jwt.verify(token, jwtConfig.secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Token not valid" });
      }
      req.userId = decoded.id;
      next();
    });
  } catch (error) {
    return res.status(401).json({ message: "Token not valid" });
  }
};

module.exports = auth;
