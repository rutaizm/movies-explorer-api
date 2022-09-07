const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { JWT_SECRET = 'our-secret-precious' } = process.env;

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

  const {email, password, name} = req.body;
  console.log(email, password, name);

  bcrypt.hash(password, 10)
  .then((hash) => User.create({
    email, password: hash, name,
  }))
  .then((user) => res.status(200).send({
    email:user.email, name:user.name, _id: user._id,
  }))
  .catch((err) => err.code)
  .catch(next);
}

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {expiresIn: '7d'});
      res.send({token});
    })
    .catch((err) => err.code)
    .catch(next);
}

module.exports = { getUser, updateUser, createUser, login};