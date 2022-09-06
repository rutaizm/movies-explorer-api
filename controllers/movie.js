const Movie = require('../models/movie');

const getMovies = (req, res, next) => {
  Movie.find({})
    .populate('user')
    .then(movie => res.send(movie))
    .catch(err)
    .catch(next)
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId
  } = req.body;
  Movie.create({country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId })
  .then (movie => res.send(movie))
  .catch(err)
  .catch(next)
};

const deleteMovie = (req, res, next) => {
  Movie.findByIdAndRemove(req.params.id)
    .then (movie => res.send(movie))
    .catch(err)
    .catch(next)
};

module.exports = { getMovies, createMovie, deleteMovie };