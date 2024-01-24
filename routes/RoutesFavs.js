const express = require("express");
const {
  getAllFavoritos,
  deleteOneProdFav,
} = require("../controllers/FavoritosControllers");
const router = express.Router();

router.get("/", getAllFavoritos);
router.delete("/:idFav/:idProd", deleteOneProdFav);
module.exports = router;
