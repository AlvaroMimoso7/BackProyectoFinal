const jwt = require("jsonwebtoken");

const auth = (role) => async (req, res, next) => {
  try {
    console.log('auth');
    console.log(req.header("Authorization"));
    const authHeader = req.header("Authorization");
    const token = authHeader.split(" ")[1]
console.log(token);
    if (!token) {
      return res.status(401).json({ mensaje: "El token no ha sido enviado" });
    }
    const verify = jwt.verify(token , process.env.SECRET_KEY);
console.log(verify);
    if (verify && verify.role === role) {
      req.idUsuario = verify.idUsuario;
      req.idCarrito = verify.idCarrito;
      req.idFavorito = verify.idFavorito;
      next();
    } else {
      res.status(401).json({ mensaje: "No estas autorizado" });
    }
  } catch (error) {
    res.status(500).json({ mensaje: "Server Error", error });
  }
};
module.exports = auth;
