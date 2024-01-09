const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_CONNECT)
  .then(() => console.log("Base de datos conectada"))
  .catch((err) => console.log("Error en la Base de Datos", err));
