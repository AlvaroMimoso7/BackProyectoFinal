const express = require("express");
const { getAllFavoritos } = require("../controllers/FavoritosControllers");
const route = express.Router();

route.get("/", getAllFavoritos);

module.exports = route;
