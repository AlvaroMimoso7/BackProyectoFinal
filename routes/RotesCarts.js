const express = require("express");
const { getAllCarts } = require("../controllers/CartControllers");
const route = express.Router();

route.get("/", getAllCarts);

module.exports = route;
