const CartModel = require("../models/cartSchema");

const getAllCarts = async (req, res) => {
  try {
    const getCarts = await CartModel.find();
    res.status(200).json({ msg: "Carritos", getCarts });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getAllCarts,
};
