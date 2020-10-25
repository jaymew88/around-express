
const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find()
    .populate('owner')
    .populate('likes')
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send({ message: 'Requested resource not found' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
  .then((card) => res.send({data: card }))
  .catch((err) => {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Card validation failed' })
    } else {
      res.status(500).send({ message: 'Requested resource not found' });
    }
  });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Requested resource not found' }));
};

module.exports = {
  getCards,
  createCard,
  deleteCard
};
