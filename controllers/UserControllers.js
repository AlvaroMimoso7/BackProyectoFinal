const getUsers = (req, res) => {
  res.json("Metodo GET user");
};

const createUser = (req, res) => {
  res.json("Metodo POST user");
};

const updateUser = (req, res) => {
  res.json("Metodo PUT user");
};
const deleteUser = (req, res) => {
  res.json("Metodo DELETE user");
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
