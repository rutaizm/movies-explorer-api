const User = require('../models/user');

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

module.exports = { getUser, updateUser };