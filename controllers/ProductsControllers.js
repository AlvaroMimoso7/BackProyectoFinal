const ProductModel = require("../models/ProductSchema");
const { validationResult } = require("express-validator");
const cloudinary = require("../helpers/cloudinary");
const UserModel = require("../models/UserSchema");
const CartModel = require("../models/cartSchema");
const FavModel = require("../models/favSchema");

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
    res
      .status(200)
      .json({ msg: "Todos Los Productos encontrados", getAllProducts });
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
  console.log(req.file);
  try {
    const errors = resultValidator(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ msg: errors.array() });
    }

    const { titulo, precio, codigo } = req.body;
    if (!titulo || !precio || !codigo) {
      res.status(500).json({ mensaje: "Algun campo está vacío" });
      return;
    }

    const result = await cloudinary.uploader.upload(req.file.path);
    console.log(result);

    const newProduct = new ProductModel({
      ...req.body,
      imagen: result.secure_url,
    });
    await newProduct.save();
    res
      .status(201)
      .json({ mensaje: "El producto se creó correctamente", newProduct });
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

const addProdCart = async (req, res) => {
  try {
    console.log('llega');
    const user = await UserModel.findOne({ _id: req.idUsuario });
    const product = await ProductModel.findOne({ _id: req.params.idProd });
    const cart = await CartModel.findOne({ _id: req.idCarrito });

    if (user.idCarrito.toString() === cart._id.toString()) {
      const prodExistCart = cart.productos.filter(
        (prod) => prod._id.toString() === product._id.toString()
      );

      console.log(prodExistCart);
      if (prodExistCart.length) {
        return res
          .status(400)
          .json({ msg: "Producto ya existe en el carrito" });
      }

      cart.productos.push(product);
      await cart.save();
      res.status(200).json({ msg: "Producto cargado correctamente" });
      console.log(cart);
      res.send("ok");
    } else {
      console.log("ID Carrito y/o usuario incorrecto");
      res.send("no ok");
    }
  } catch (error) {
    console.log(error);
  }
};

const addProdFav = async (req, res) => {
  console.log(req.params, 'soy el req');
  try {
    const user = await UserModel.findOne({ _id: req.idUsuario });
    const product = await ProductModel.findOne({ _id: req.params.idProd });
    const fav = await FavModel.findOne({ _id: req.idFavorito });
console.log(user);
    if (user.idFavoritos.toString() === fav._id.toString()) {
      const prodExistFav = fav.favoritos.filter(
        (fav) => fav._id.toString() === product._id.toString()
      );

      if (prodExistFav.length) {
        return res.status(400).json({ msg: "Producto ya existe en Favoritos" });
      }

      fav.favoritos.push(product);
      await fav.save();
      res.status(200).json({ msg: "Producto cargado correctamente" });
      console.log(cart);
      res.send("ok");
    } else {
      console.log("ID Carrito y/o usuario incorrecto");
      res.send("no ok");
    }
  } catch (error) {
    console.log(error);
    res.send(error)
  }
};

module.exports = {
  getProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  addProdCart,
  addProdFav,
};
