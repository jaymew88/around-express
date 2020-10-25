const routes = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard
} = require('../controllers/cards');

routes.get('/', getCards);
routes.post('/', createCard);
routes.delete('/:cardId', deleteCard);

module.exports = routes;