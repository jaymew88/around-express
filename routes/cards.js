const routes = require('express').Router();
const fs = require('fs').promises;
const path = require('path');
const cardsPath = path.join(__dirname, '..', 'data', 'cards.json');

routes.get('/', (req, res) => {
  fs.readFile(cardsPath, { encoding: 'utf-8' }).then((cards) => {
    res.send(JSON.parse(cards));
  })
  .catch(() => {
    res.status(500);
    res.send({ message: 'Requested resource not found' });
  })
});

module.exports = routes;