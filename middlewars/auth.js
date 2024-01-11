const jwt = require("jsonwebtoken");

const auth = (role) => async (req, res, next) => {
  try {
    const token = req.header("auth")?.replace("Bearer ", "");

if (!token) {
  return res.status(400).json({mensaje:'El token no ha sido enviado'})
}

    const verify = jwt.verify(token, process.env.SECRET_KEY);

    if (verify && verify.role === role) {
      next();
    } else {
      res.status(401).json({mensaje: 'No estas autorizado'})
    }
  } catch (error) {
    res.status(500).json({ mensaje: "Server Error", error });
  }
};
module.exports = auth;
