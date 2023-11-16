const express = require("express");
const morgan = require("morgan");
const app = express();
const register = require("./controllers/register");
const getUser = require("./controllers/getUser");
const login = require("./controllers/login");
const updateUser = require("./controllers/updateUser");
const getAllUsers = require("./controllers/getAllUsers");
const auth = require("./middlewares/auth");

app.use(morgan("dev"));
app.use(express.json());

app.get("/users", getAllUsers);
//register
app.post("/register", register);
//login
app.post("/login", login);
//update user
app.put("/user",auth, updateUser);
//get user
app.get("/user", auth, getUser);

module.exports = app;
