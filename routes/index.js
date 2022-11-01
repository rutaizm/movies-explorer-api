const router = require('express').Router();

const routesMovies = require('./movie');
const routesUser = require('./user');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/user');
const { validateSignUp, validateSignIn } = require('../middlewares/validation');
const NotFound = require('../errors/NotFound');

router.post('/signup', validateSignUp, createUser);
router.post('/signin', validateSignIn, login);

router.use(auth);

router.use('/users', routesUser);
router.use('/movies', routesMovies);

router.use((req, res, next) => {
  next(new NotFound('Страница не найдена'));
});

module.exports = { router };
