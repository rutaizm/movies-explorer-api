const movie = require('../models/movie');
const Movie = require('../models/movie');

const getMovies = (req, res, next) => {
  Movie.find({})
    .populate('user')
    .then(movie => res.send(movie))
    .catch(err => err.code)
    .catch(next)
};

const createMovie = (req, res, next) => {
  const owner = req.user._id;

  Movie.create({owner, ...req.body})
    .then((movie) => res.send(movie))
    .catch((err) => err.code)
    .catch(next)
};

const deleteMovie = (req, res, next) => {
  Movie.findByIdAndRemove(req.params.id)
    .then(movie => res.send(movie))
    .catch((err) => err.code)
    .catch(next)
};

module.exports = { getMovies, createMovie, deleteMovie };