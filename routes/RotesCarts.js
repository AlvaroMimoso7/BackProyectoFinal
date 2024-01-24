const express = require("express");
const {
  getAllCarts,
  deleteOneProdCart,
} = require("../controllers/CartControllers");
const router = express.Router();

router.get("/", getAllCarts);
router.delete("/:idCart/:idProd", deleteOneProdCart);
module.exports = router;
