const helmet = require('helmet');
const express = require('express');

const mongoose = require('mongoose');

const app = express();
const bodyParser = require('body-parser');

const cors = require('cors');

const allowedCors = [
  'http://rutaizmDiploma.nomoredomains.sbs',
  'https://rutaizmDiploma.nomoredomains.sbs',
  'http://localhost:3000',
  'https://localhost:3000',
];

const { errors } = require('celebrate');
const limiter = require('./middlewares/rateLimiter');

const { router } = require('./routes/index');
const { errorHandler } = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(limiter);
app.use(requestLogger);

app.use(cors(allowedCors));

app.use(helmet());
app.use('/', router);

app.use(errorLogger);

app.use(errors);
app.use(errorHandler);

app.listen(PORT);
