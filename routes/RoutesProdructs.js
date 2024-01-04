const express = require("express");
const route = express.Router();
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getOneProducts,
  getOneProduct,
} = require("../controllers/ProductsControllers");

route.get("/", getProducts);
route.get("/:id", getOneProduct);
route.post("/", createProduct);
route.put("/:id", updateProduct);
route.delete("/:id", deleteProduct);
module.exports = route;
