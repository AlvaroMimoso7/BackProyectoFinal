const express = require("express");
const {
  getAllCarts,
  deleteOneProdCart,
} = require("../controllers/CartControllers");
const auth = require("../middlewars/auth");
const router = express.Router();

router.get("/", auth("user"), getAllCarts);
router.delete("/:idCart/:idProd", auth("user"), deleteOneProdCart);
module.exports = router;
