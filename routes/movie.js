const routesMovies = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movie');

routesMovies.get('/', getMovies);
routesMovies.post('/', createMovie);
routesMovies.delete('/:id', deleteMovie);

module.exports = routesMovies;