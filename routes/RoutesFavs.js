const express = require("express");
const {
  getAllFavoritos,
  deleteOneProdFav,
} = require("../controllers/FavoritosControllers");
const auth = require("../middlewars/auth");
const router = express.Router();

router.get("/", auth("users"), getAllFavoritos);
router.delete("/:idProd", auth("users"), deleteOneProdFav);
module.exports = router;
