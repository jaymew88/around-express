const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).res.send({ message: 'Internal Server Error' }));
};

const getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if(user) {
        res.send({ data: user });
      } else {
        res.status(404).send({ message: 'User ID not found' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Invalid user id' });
      } else {
        res.status(500).send({ message: 'Internal Server Error' });
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if  (err.name === "ValidationError") {
        res.status(400).send({ message: 'User validation failed' });
      } else {
        res.status(500).send({ message: 'Internal Server Error' });
      }
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'User validation failed' })
      } else {
        res.status(500).send({ message: 'Internal Server Error' });
      }
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'User validation failed' })
      } else {
        res.status(500).send({ message: 'Internal Server Error' });
      }
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar
};