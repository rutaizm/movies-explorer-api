const express = require('express');
const app = express();

const { PORT=3000 } = process.env

const routesUser = require('./routes/user');
const routesMovies = require('./routes/movie');
const auth = require('./middlewares/auth');
const { createUser, login } = require('./controllers/user');
const {errorHandler} = require('./middlewares/errorHandler');
const { validateSignUp, validateSignIn } = require('./middlewares/validation');

const { errors } = require('celebrate');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signup', validateSignUp, createUser);
app.post('/signin', validateSignIn, login);

app.use(auth);

app.use('/users', routesUser);
app.use('/movies', routesMovies);

app.use(errors);
app.use(errorHandler);
app.listen(PORT);
