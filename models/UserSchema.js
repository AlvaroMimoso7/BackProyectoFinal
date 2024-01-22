const { Schema, model, Types } = require("mongoose");

const UserSchema = new Schema({
  nombreUsuario: {
    type: String,
    required: true,
  },
  emailUsuario: {
    type: String,
    required: true,
    unique: true,
  },
  contrasenia: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  idCarrito: {
    type: Types.ObjectId,
  },
  idFavoritos: {
    type:Types.ObjectId,
  },
});

UserSchema.methods.toJSON = function () {
  const { contrasenia, ...user } = this.toObject();
  return user;
};

const UserModel = model("users", UserSchema);
module.exports = UserModel;
