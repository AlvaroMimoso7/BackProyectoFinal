const UserModel = require("../models/UserSchema");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const resultValidator = require("../helpers/validatorResult");
const { validationResult } = require("express-validator");
const CartModel = require("../models/cartSchema");
const FavModel = require("../models/favSchema");

const getUsers = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ msg: errors.array() });
    }
    const getAllUsers = await UserModel.find();
    res
      .status(200)
      .json({ mensaje: "Todos Usuarios Encontrados", getAllUsers });
  } catch (error) {
    res.status(500).json({ mensaje: "Server Error", error });
  }
};

const getOneUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ msg: errors.array() });
    }
    const getUser = await UserModel.findOne({ _id: req.params.id });
    res.status(200).json({ msg: "Usuario encontrado", getUser });
  } catch (error) {
    res.status(500).json({ mensaje: "Server Error", error });
  }
};

const createUser = async (req, res) => {
  try {
    const errors = resultValidator(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ msg: errors.array() });
    }
    const { nombreUsuario, contrasenia, emailUsuario } = req.body;
    const userExist = await UserModel.findOne({ nombreUsuario });
    if (userExist) {
      res.status(400).json({ msg: "Usuario ya existe en la base de datos" });
      return;
    }

    const newUser = new UserModel(req.body);

    let salt = bcryptjs.genSaltSync(10);
    newUser.contrasenia = bcryptjs.hashSync(contrasenia, salt);
    const newCart = new CartModel({ idUsuario: newUser._id });
    const newFav = new FavModel({ idUsuario: newUser._id });

    newUser.idCarrito = newCart._id;
    newUser.idFavoritos = newFav._id;

    await newUser.save();
    await newCart.save();
    await newFav.save();
    res.status(201).json({ msg: "Usuario creado con exito", newUser });
  } catch (error) {
    res.status(500).json({ mensaje: "Server error", error });
  }
};

const updateUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ msg: errors.array() });
    }

    const updateUser = await UserModel.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(200).json({ msg: "Usuario Actualizado", updateUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "Server error", error });
    
  }
};
const deleteUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ msg: errors.array() });
    }
    const userExist = await UserModel.findOne({ _id: req.params.id });
    if (!userExist) {
      res
        .status(400)
        .json({ msg: "ID incorrecto. Usuario no existe en la Base de Datos" });
      return;
    }
    await UserModel.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({ msg: "Usuario Elimando de la Base de Datos" });
  } catch (error) {
    res.status(500).json({ mensaje: "Server error", error });
  }
};

const loginUser = async (req, res) => {
  try {
    const { nombreUsuario, contrasenia } = req.body;

    const userExist = await UserModel.findOne({ nombreUsuario });
    console.log(userExist);
    if (!userExist) {
      res.status(400).json({ msg: "Usuario y/o contrasenia son incorrectas" });
      return;
    }

    const passCheck = await bcryptjs.compare(
      contrasenia,
      userExist.contrasenia
    );
    if (!passCheck) {
      res.status(400).json({ msg: "Usuario y/o contrasenia son incorrectas" });
      return;
    }

    const payLoad = {
      idUsuario: userExist._id,
      idCarrito: userExist.idCarrito,
      idFavorito: userExist.idFavoritos,
      role: userExist.role,
    };

    const token = jwt.sign(payLoad, process.env.SECRET_KEY);

    res.status(200).json({
      msg: "Usuario Logueado",
      token,
      role: userExist.role,
      idUsuario: userExist._id,
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Server error", error });
  }
};

module.exports = {
  getUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
};
