const express = require('express');
const app = express();

const { PORT=3000 } = process.env

const { router } = require('./routes/index');

const {errorHandler} = require('./middlewares/errorHandler');
const { errors } = require('celebrate');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);

app.use(errors);
app.use(errorHandler);
app.listen(PORT);
