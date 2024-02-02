const ProductModel = require("../models/ProductSchema");
const CartModel = require("../models/cartSchema");

const getAllCarts = async (req, res) => {
  try {
   const getCarts = await CartModel.find();
    console.log("getCarts", getCarts);
    res.status(200).json({ msg: "Carritos", getCarts });

  } catch (error) {
    console.log('error');
    console.log(error);
  }
};
const deleteOneProdCart = async (req, res) => {
  try {
    
    const sectionCart = await CartModel.findOne({ _id: req.idCarrito });
    console.log(sectionCart);
    
    const product = await ProductModel.findOne({ _id: req.params.idProd });
    console.log(product);
    const productosABorrar = sectionCart.productos.filter(
      (prod) => prod._id.toString() === product._id.toString()
    );
    console.log(productosABorrar);
    if (!productosABorrar.length) {
      return res.status(400).json({ msg: "iD incorrecto" });
    }

    const productosNoBorrados = sectionCart.productos.filter(
      (prod) => prod._id.toString() !== product._id.toString()
    );

    sectionCart.productos = productosNoBorrados;

    await sectionCart.save();
    res.status(200).json({ msg: "Producto eliminado del carrito" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllCarts,
  deleteOneProdCart,
};
