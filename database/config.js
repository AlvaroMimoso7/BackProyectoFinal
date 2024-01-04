const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://alvarosgd97:ZjzGQRox1Nx8rzJ5@cluster0.keizozf.mongodb.net/"
  )
  .then(() => console.log("Base de datos conectada"))
  .catch((err) => console.log("Error en la Base de Datos", err));
