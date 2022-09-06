const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true,'Необходимо указать почту'],
    unique: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: 'Неверно указана почта',
    },
  },
  password: {
    type: String,
    required: [true, 'Необходимо указать пароль'],
    select: false
  },
  name: {
    type: String,
    minlength: [2, 'Поле {PATH} должно быть минимум 2 символа'],
    maxlength: [30, 'Поле {PATH} может быть максимум 30 символов'],
  }
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .then((user) => {
      if(!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcryptjs.hash(password, user.password)
        .then((matched) => {
          if(!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);