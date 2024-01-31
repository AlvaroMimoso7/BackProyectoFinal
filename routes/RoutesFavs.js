const express = require("express");
const {
  getAllFavoritos,
  deleteOneProdFav,
} = require("../controllers/FavoritosControllers");
const auth = require("../middlewars/auth");
const roles = require("../helpers/roles");
const router = express.Router();

router.get("/", auth("user"), getAllFavoritos);
router.delete("/:idProd", auth(roles.user), deleteOneProdFav);
module.exports = router;
