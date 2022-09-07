const routesMovies = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movie');
const { validateCreateMovie, validateDeleteMovie } = require('../middlewares/validation');

routesMovies.get('/', getMovies);
routesMovies.post('/', validateCreateMovie, createMovie);
routesMovies.delete('/:id', validateDeleteMovie, deleteMovie);

module.exports = routesMovies;