const express = require("express");
const router = express.Router();

const productRoutes = require("./RoutesProdructs");
const usersRoutes = require("./RoutesUser");
const favsRoutes = require("./RoutesFavs");
const cartsRoutes = require("./RotesCarts");

router.use("/products", productRoutes);
router.use("/users", usersRoutes);
router.use("/favs", favsRoutes);
router.use("/carts", cartsRoutes);

module.exports = router;
