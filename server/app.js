const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
class Server {
  constructor() {
    this.app = express();
    this.middlewars();
    this.routes();
  }
  middlewars() {
    this.app.use(express.json());
    this.app.use(morgan("dev"));
    this.app.use(cors());
  }

  routes() {
    this.app.use("/api/products", require("../routes/RoutesProdructs"));
    this.app.use("/api/users", require("../routes/RoutesUser"));
    this.app.use("/api/favs", require("../routes/RoutesFavs"));
    this.app.use("/api/carts", require("../routes/RotesCarts"));
  }
  listen() {
    this.app.listen(3001, () => {
      console.log("Servidor Corriendo en el puerto:" + 3001);
    });
  }
}
module.exports = Server;
