const routes = require('express').Router();
const fs = require('fs').promises;
const path = require('path');
const usersPath = path.join(__dirname, '..', 'data', 'users.json');

const doesUserExist = (req, res) => {
  fs.readFile(usersPath, { encoding: 'utf-8' })
    .then((users) => {
      const usersData = JSON.parse(users);
      if (!usersData.some((user) => user._id === req.params.id)) {
        res.status(404).send({ message: 'User ID not found' });
      } else {
        res.status(200).send(usersData.filter((user) => user._id === req.params.id)[0]);
      }
    })
    .catch(() => res.status(404).send({ message: "Requested resource not found" }));
};

routes.get('/', (req, res) => {
  fs.readFile(usersPath, { encoding: 'utf-8' }).then((users) => {
    res.send(JSON.parse(users));
  })
  .catch(() => {
    res.status(500).res.send({ message: 'Requested resource not found' });
  })
});

routes.get('/:id' , doesUserExist);

module.exports = routes;