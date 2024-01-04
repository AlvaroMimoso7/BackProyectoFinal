const ProductModel = require("../models/ProductSchema");

const getProducts = async (req, res) => {
  try {
    const getAllProducts = await ProductModel.find();
    res
      .status(200)
      .json({ msg: "Todos Los Productos encontrados", getAllProducts });
  } catch (error) {
    res.status(500).json({ mensaje: "Server Error", error });
  }
};

const getOneProduct = async (req, res) => {
  try {
    const getProduct = await ProductModel.findOne({ _id: req.params });
    res.status(200).json({ msg: "Productos encontrado", getProduct });
  } catch (error) {
    res.status(500).json({ mensaje: "Server Error", error });
  }
};

const createProduct = async (req, res) => {
  try {
    const { titulo, precio, codigo } = req.body;
    if (!titulo || !precio || !codigo) {
      res.status(500).json({ mensaje: "Algun campo esta vacio" });
      return;
    }
    const newProduct = new ProductModel(req.body);
    await newProduct.save();
    res
      .status(201)
      .json({ mensaje: "El producto se creo correctamente", newProduct });
  } catch (error) {
    res.status(500).json({ mensaje: "Server Error", error });
  }
};

const updateProduct = async (req, res) => {
  try {
    const ultimateProducts = await ProductModel.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(200).json({ msg: "Producto Actualizado", ultimateProducts });
  } catch (error) {
    res.status(500).json({ mensaje: "Server Error", error });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await ProductModel.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({ msg: "Producto Elminado Correctamente" });
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
