const UserModel = require("../models/UserSchema");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res) => {
  try {
    const getAllUsers = await UserModel.find();
    res.status(200).json({ mensaje: "Usuarios", getAllUsers });
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
    const { nombreUsuario, contrasenia, emailUsuario } = req.body;
    const userExist = await UserModel.findOne({ nombreUsuario });
    if (userExist) {
      res.status(400).json({ msg: "Usuario ya existe en la base de datos" });
      return;
    }

    const newUser = new UserModel(req.body);

    let salt = bcryptjs.genSaltSync(10);
    newUser.contrasenia = bcryptjs.hashSync(contrasenia, salt);
    await newUser.save();
    res.status(201).json({ msg: "Usuario creado con exito", newUser });
  } catch (error) {
    res.status(500).json({ mensaje: "Server error", error });
  }
};

const updateUser = async (req, res) => {
  try {
    const updateUser = await UserModel.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(200).json({ msg: "Usuario Actualizado", updateUser });
  } catch (error) {
    res.status(500).json({ mensaje: "Server error", error });
  }
};
const deleteUser = async (req, res) => {
  try {
    const userExist = await UserModel.findOne({ _id: req.params.id });
    if (!userExist) {
      res
        .status(400)
        .json({ msg: "ID incorrecto. Usuario no existe en la db" });
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
      id: userExist._id,
      role: userExist.role,
    };

    const token = jwt.sign(payLoad, process.env.SECRET_KEY);

    res.status(200).json({ msg: "Usuario Logueado", token });
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
