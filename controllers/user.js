const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFound');
const Conflict = require('../errors/Conflict');

const { JWT_SECRET = 'our-secret-precious' } = process.env;

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then(user => res.send(user))
    .catch(next);
}

const updateUser = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(req.user._id, {email:email, name:name}, {new:true, runValidators:true})
  .then((user) => {
    if (!user) {
      next(new NotFound('Пользователь не найден'));
      return;
    }
    res.send(user);
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {
      return next(new BadRequest('Неверно указаны данные пользователя'));
    }
    return next(err);
  });
}

const createUser = (req, res, next) => {

  const {email, password, name} = req.body;
  bcrypt.hash(password, 10)
  .then((hash) => User.create({
    email, password: hash, name,
  }))
  .then((user) => res.status(200).send({
    email:user.email, name:user.name, _id: user._id,
  }))
  .catch((err) => {
    if (err.name === 'ValidationError') {
      return next(new BadRequest('Неверно указаны данные пользователя'));
    }

    if (err.code === 11000) {
      return next(new Conflict('Такой пользователь уже существует!'));
    }

    return next(err);
  });
}

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {expiresIn: '7d'});
      res.send({token});
    })
    .catch(next);
}

module.exports = { getUser, updateUser, createUser, login};