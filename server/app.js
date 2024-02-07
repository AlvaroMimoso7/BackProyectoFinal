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
    // Configura CORS
    this.app.use(cors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    }));

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

