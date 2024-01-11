const express = require("express");
const { check } = require("express-validator");
const route = express.Router();
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getOneProduct,
} = require("../controllers/ProductsControllers");
const multer = require("../middlewars/multer");

route.get("/", getProducts);
route.get(
  "/:id",
  [check("id", "Formato Incorrecto").isMongoId()],
  getOneProduct
);
route.post(
  "/",multer.single('imagen'),
  [
    check("titulo", "Campo Vacio").notEmpty(),
    check("precio", "Campo Vacio").notEmpty(),
    check("codigo", "Campo Vacio").notEmpty(),
  ],
  createProduct
);
route.put(
  "/:id",
  [check("id", "Formato Incorrecto").isMongoId()],
  updateProduct
);
route.delete(
  "/:id",
  [check("id", "Formato Incorrecto").isMongoId()],
  deleteProduct
);
module.exports = route;
