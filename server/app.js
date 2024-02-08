const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
class Server {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*'); // Permite el acceso desde cualquier origen
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Métodos permitidos
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Encabezados permitidos
  next();
});
    

    this.app.use(express.json());
    this.app.use(morgan("dev"));
    this.app.use(express.urlencoded({ extended: true }));
  }

  routes() {
    this.app.use("/api", require("../routes"));
  }

  listen() {
    this.app.listen(3001, () => {
      console.log("Servidor Corriendo en el puerto:" + 3001);
    });
  }
}

module.exports = Server;

