const express = require("express");
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/UserControllers");
const route = express.Router();
route.get("/", getUsers);
route.post("/", createUser);
route.put("/", updateUser);

route.delete("/", deleteUser);
module.exports = route;
