const router = require('express').Router();

const routesMovies = require('./movie');
const routesUser = require('./user');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/user');
const { validateSignUp, validateSignIn } = require('../middlewares/validation');

router.post('/signup', validateSignUp, createUser);
router.post('/signin', validateSignIn, login);

router.use(auth);

router.use('/users', routesUser);
router.use('/movies', routesMovies);

module.exports = { router };
