const express = require("express");
const morgan = require("morgan");
const app = express();
const register = require("./controllers/register");
const getUser = require("./controllers/getUser");
const login = require("./controllers/login");
const updateUser = require("./controllers/updateUser");
const { getAllUsers } = require("./db");
app.use(morgan("dev"));
app.use(express.json());

app.get("/users", (req, res) => {
  res.json({ users: getAllUsers() });
});
//register
app.post("/register", register);
//login
app.post("/login", login);
//update user
app.put("/user/:id", updateUser);
//get user
app.get("/user/:id", getUser);

module.exports = app;
