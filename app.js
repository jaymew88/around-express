const express = require('express');
const path = require('path');
const cards = require('./routes/cards');
const users = require('./routes/users');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/cards', cards);
app.use('/users', users);

app.get('*',(req,res)=>{
  return res.status(404).send({ "message": "Requested resource not found" });
 });

 app.listen(PORT, () => {
  console.log(`App is listening on PORT ${PORT}`);
});