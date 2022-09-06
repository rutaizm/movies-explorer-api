const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then(user => res.send(user))
    .catch(err => res.send(err))
    .catch(next);
}

const updateUser = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(req.user._id, {email:email, name:name}, {new:true, runValidators:true})
    .then(user => res.send(user))
    .catch(err => res.send(err))
    .catch(next);
}

const createUser = (req, res, next) => {
  bcryptjs.hash(req.body.password, 10)
  .then(hash => User.create({
    email: req.body.email,
    password: hash,
    name: req.body.name,
  }))
  .then(user => res.send(user))
  .catch(err)
  .catch(next);
}

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'our-secret-precious');
      res.send({token});
    })
    .catch(err);
}

module.exports = { getUser, updateUser, createUser, login};