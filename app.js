const helmet = require('helmet');
const express = require('express');

const mongoose = require('mongoose');

const app = express();
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;

const { errors } = require('celebrate');
const { router } = require('./routes/index');
const limiter = require('./middlewares/rateLimiter');

const { errorHandler } = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(limiter);
app.use(requestLogger);

app.use(helmet());
app.use('/', router);

app.use(errorLogger);

app.use(errors);
app.use(errorHandler);

app.listen(PORT);
