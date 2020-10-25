const routes = require('express').Router();

const {
  getUsers,
  getUserById,
  createUser
} = require('../controllers/users');

routes.get('/', getUsers);
routes.get('/userId', getUserById);
routes.post('/', createUser);

module.exports = routes;