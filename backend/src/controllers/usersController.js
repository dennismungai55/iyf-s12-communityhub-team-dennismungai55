const store = require("../data/store");

const getAllUsers = (req, res) => {
  res.json(store.users);
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const user = store.users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
};

module.exports = {
  getAllUsers,
  getUserById,
};
