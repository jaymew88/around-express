const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).res.send({ message: 'Requested resource not found' }));
};

const getUserById = (req, res) => {
  const userId = (req.params.id)
  User.findById(userId)
  .then((user) => {
    if(user) {
      res.send(user);
    } else {
      res.status(404).send({ message: 'User ID not found' });
    }
  })
  .catch(() => res.status(404).send({ message: "Requested resource not found" }));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
  .then((user) => res.send(user))
  .catch((err) => {
    if  (err.name === "ValidationError") {
      res.status(400).send({ message: 'User validation failed' });
    } else {
      res.status(500).send({ message: 'Requested resource not found' });
    }
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser
};