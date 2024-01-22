const FavModel = require("../models/favSchema");

const getAllFavoritos = async (req, res) => {
  try {
    const getFavs = await FavModel.find();
    res.status(200).json({ msg: "Favoritos", getFavs });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getAllFavoritos,
};
