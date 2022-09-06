const express = require('express');
const app = express();

const { PORT=3000 } = process.env

const routesUser = require('./routes/user');
const routesMovies = require('./routes/movie');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use('/users', routesUser);
app.use('/movies', routesMovies);

app.listen(3000);
