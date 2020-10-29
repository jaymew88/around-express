
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
  .then((card) => res.send({ data: card }))
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
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        res.status(404).send({ message: "Card not found" });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Invalid card id' });
      } else {
        res.status(500).send({ message: 'Internal Server Error' });
      }
    });
}

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate('likes')
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        res.status(404).send({ message: "Card not found" });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Invalid card id' });
      } else {
        res.status(500).send({ message: 'Internal Server Error' });
      }
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
  .populate('likes')
  .then((card) => {
    if (card) {
      res.send({ data: card });
    } else {
      res.status(404).send({ message: "Card not found" });
    }
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Invalid card id' });
    } else {
      res.status(500).send({ message: 'Internal Server Error' });
    }
  });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
