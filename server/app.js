const express = require("express");

class Server {
  constructor() {
    this.app = express();
    this.middlewars();
    this.routes();
  }
  middlewars() {
    this.app.use(express.json());
  }

  routes() {
    this.app.use("/api/products", require("../routes/RoutesProdructs"));
    this.app.use("/api/users", require("../routes/RoutesUser"));
  }
  listen() {
    this.app.listen(3001, () => {
      console.log("Servidor Corriendo en el puerto:" + 3001);
    });
  }
}
module.exports = Server;
