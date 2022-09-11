require('dotenv').config();

const allowedCors = [
  'http://rutaizmDiploma.nomoredomains.sbs',
  'https://rutaizmDiploma.nomoredomains.sbs',
  'http://localhost:3000',
  'https://localhost:3000',
];

const {
  PORT = 3000,
  MONGODB = 'mongodb://localhost:27017/moviesdb',
  JWT_SECRET = 'dev-secret',
  NODE_ENV,
} = process.env;

module.exports = {
  allowedCors,
  PORT,
  MONGODB,
  JWT_SECRET,
  NODE_ENV,
};
