const ProductModel = require("../models/ProductSchema");
const { validationResult } = require("express-validator");

const resultValidator = (req) => {
  const errors = validationResult(req);
  return errors;
};

const getProducts = async (req, res) => {
  try {
    const errors = resultValidator(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ msg: errors.array() });
    }
    const getAllProducts = await ProductModel.find();
    res.status(200).json({ msg: "Todos Los Productos encontrados", getAllProducts });
  } catch (error) {
    res.status(500).json({ mensaje: "Server Error", error });
  }
};

const getOneProduct = async (req, res) => {
  try {
    const errors = resultValidator(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ msg: errors.array() });
    }

    const getProduct = await ProductModel.findOne({ _id: req.params.id });
    res.status(200).json({ msg: "Producto encontrado", getProduct });
  } catch (error) {
    res.status(500).json({ mensaje: "Server Error", error });
  }
};

const createProduct = async (req, res) => {
  try {
    const errors = resultValidator(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ msg: errors.array() });
    }

    const { titulo, precio, codigo } = req.body;
    if (!titulo || !precio || !codigo) {
      return res.status(500).json({ mensaje: "Algun campo está vacío" });
    }

    const newProduct = new ProductModel(req.body);
    await newProduct.save();
    res.status(201).json({ mensaje: "El producto se creó correctamente", newProduct });
  } catch (error) {
    res.status(500).json({ mensaje: "Server Error", error });
  }
};

const updateProduct = async (req, res) => {
  try {
    const errors = resultValidator(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ msg: errors.array() });
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({ msg: "Producto Actualizado", updatedProduct });
  } catch (error) {
    res.status(500).json({ mensaje: "Server Error", error });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const errors = resultValidator(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ msg: errors.array() });
    }

    await ProductModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Producto Eliminado Correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Server Error", error });
  }
};

module.exports = {
  getProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};

