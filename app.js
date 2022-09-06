const express = require('express');
const app = express();

const { PORT=3000 } = process.env

const routesUser = require('./routes/user');
const routesMovies = require('./routes/movie');
const auth = require('./middlewares/auth');
const { createUser, login } = require('./controllers/user');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signup', createUser);
app.post('/signin', login);

app.use(auth);

app.use('/users', routesUser);
app.use('/movies', routesMovies);

app.listen(PORT);
