const { Schema, model } = require("mongoose");

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
});

UserSchema.methods.toJSON = function () {
  const { contrasenia, ...user } = this.toObject();
  return user;
};

const UserModel = model("users", UserSchema);
module.exports = UserModel;
