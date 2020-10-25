const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cards = require('./routes/cards');
const users = require('./routes/users');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '5f958d1baacbc36011404efe'
  };
  next();
});
app.use('/cards', cards);
app.use('/users', users);

app.get('*',(req,res)=>{
  return res.status(404).send({ "message": "Requested resource not found" });
 });

 app.listen(PORT, () => {
  console.log(`App is listening on PORT ${PORT}`);
});