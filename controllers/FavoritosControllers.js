const ProductModel = require("../models/ProductSchema");
const FavModel = require("../models/favSchema");

const getAllFavoritos = async (req, res) => {
  try {
    const getFavs = await FavModel.find();
    res.status(200).json({ msg: "Favoritos", getFavs });
  } catch (error) {
    console.log(error);
  }
};
const deleteOneProdFav = async (req, res) => {
  try {
    const sectionFav = await FavModel.findOne({ _id: req.params.idFav });
    const product = await ProductModel.findOne({ _id: req.params.idProd });

    const productosABorrar = sectionFav.favoritos.filter(
      (fav) => fav._id.toString() === product._id.toString()
    );
     if (!productosABorrar.length) {
      return res.status(400).json({msg:'iD incorrecto'})
     }

    const productosNoBorrados = sectionFav.favoritos.filter(
      (fav) => fav._id.toString() !== product._id.toString()
    );

    sectionFav.favoritos = productosNoBorrados;

    await sectionFav.save();
    res.status(200).json({ msg: "Producto eliminado de favoritos" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllFavoritos,
  deleteOneProdFav,
};
