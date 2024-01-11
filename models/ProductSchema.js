const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  codigo: {
    type: String,
    required: true,
  },
  imagen: {
    type: String,
  }
});

const ProductModel = mongoose.model("products", ProductSchema);
module.exports = ProductModel;
