const routes = require('express').Router();

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar
} = require('../controllers/users');

routes.get('/', getUsers);
routes.get('/:id', getUserById);
routes.post('/', createUser);
routes.patch('/me', updateUser);
routes.patch('/me/avatar', updateAvatar);

module.exports = routes;