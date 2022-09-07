const Movie = require('../models/movie');
const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFound');

const getMovies = (req, res, next) => {
  Movie.find({})
    .populate('owner')
    .then((movie) => res.send(movie))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const owner = req.user._id;

  Movie.create({ owner, ...req.body })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Неверно указаны данные фильма!'));
      }
      return next(err);
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.id)
    .then((movie) => {
      if (!movie) {
        throw new NotFound('Такого фильма нет');
      }
      if (JSON.stringify(movie.owner) !== JSON.stringify(req.user._id)) {
        next(new BadRequest('Вы не можете удалить фильм, добавленный другим пользователем!'));
      } else {
        movie.remove()
          .then(() => res.send({ message: 'Фильм удален' }));
      }
    })
    .catch(next);
};

module.exports = { getMovies, createMovie, deleteMovie };
