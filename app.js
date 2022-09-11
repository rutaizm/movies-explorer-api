require('dotenv').config();

const helmet = require('helmet');
const express = require('express');

const mongoose = require('mongoose');

const app = express();
const bodyParser = require('body-parser');

const cors = require('cors');

const { errors } = require('celebrate');
const limiter = require('./middlewares/rateLimiter');

const { router } = require('./routes/index');
const { errorHandler } = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const {
  allowedCors,
  PORT,
  MONGODB,
  NODE_ENV,
} = require('./utils/config');

mongoose.connect(NODE_ENV === 'production' ? MONGODB : 'mongodb://localhost:27017/moviesdb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(limiter);

app.use(cors(allowedCors));

app.use(helmet());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/', router);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT);
