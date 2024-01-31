const express = require("express");
const { check } = require("express-validator");
const route = express.Router();
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getOneProduct,
  addProdCart,
  addProdFav,
} = require("../controllers/ProductsControllers");
const multer = require("../middlewars/multer");
const auth = require("../middlewars/auth");

route.get("/", getProducts);
route.get(
  "/:id",
  [check("id", "Formato Incorrecto").isMongoId()],
  getOneProduct
);
route.post(
  "/",
  multer.single("imagen"),
  [
    check("titulo", "Campo Vacio").notEmpty(),
    check("precio", "Campo Vacio").notEmpty(),
    check("codigo", "Campo Vacio").notEmpty(),
  ],
  auth("admin"),
  createProduct
);
route.post("/cart/:idProd", auth("user"), addProdCart);
route.post("/fav/:idProd",auth("user"),addProdFav);
route.put(
  "/:id",
  [check("id", "Formato Incorrecto").isMongoId()],
  auth("admin"),
  updateProduct
);
route.delete(
  "/:id",
  [check("id", "Formato Incorrecto").isMongoId()],
  auth("admin"),
  deleteProduct
);
module.exports = route;
