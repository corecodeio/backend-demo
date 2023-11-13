const express = require("express");
const config = require("./config");
const app = express();

const users = [];

app.get("/users", function (request, response) {
  response.status(200).json({ massage: "Get all users", users });
});

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
