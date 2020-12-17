const mongoose = require('mongoose');

const regExp = /^https?:\/\/(www\.)?[\wа-яё\-\\._~:\\/\\?#\\[\]@!$&'\\(\\)\\*\\+,;=]+#?$/gi;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) { regExp.test(v); },
    },
    message: 'Вы ввели неправильную ссылку на аватар',
  },
});

module.exports = mongoose.model('user', userSchema);
