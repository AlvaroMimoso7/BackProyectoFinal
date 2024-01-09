const express = require("express");
const {
  getUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controllers/UserControllers");
const { check } = require("express-validator");
const route = express.Router();
route.get("/", getUsers);
route.get("/:id", getOneUser);
route.post(
  "/",
  [
    check("nombreUsuario", "Campo Vacio").notEmpty(),
    check("nombreUsuario", "Campo Vacio").isLength({max: 30}),
    check('emailUsuario', 'No es un Email').isEmail(),
    check('contrasenia', 'Max:30 Min: 8').isLength({min:8,max:30}),
  ],
  createUser
);
route.post("/login", loginUser);
route.put("/:id", updateUser);
route.delete("/:id", deleteUser);
module.exports = route;
