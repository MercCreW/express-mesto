const mongoose = require('mongoose');
const User = require('../models/user');

module.exports.getUserById = (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    User.findById(req.params.id)
      .then((user) => {
        if (!user) return res.status(404).send({ message: `Пользователь c id: ${req.params.id} не найден` });
        res.status(200).json({ data: user });
      })
      .catch((err) => res.status(500).json({ message: err.message }));
  } else {
    res.status(400).json({ message: 'Переданы некорректные данные' });
  }
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.status(200).json({ data: user }))
    .catch((err) => res.status(500).json({ message: err.message }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(200).json({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidatorError') {
        res.status(400).json({ message: 'Переданы некорректные данные в методы создания пользователя' });
      } else {
        res.status(500).json({ message: err.message });
      }
    });
};

module.exports.updateProfileUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about })
    .then((user) => {
      if (!user) return res.status(404).send({ message: `Пользователь c id: ${req.user._id} не найден` });
      res.status(200).json({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidatorError' || err.name === 'CastError') {
        res.status(400).json({ message: 'Переданы некорректные данные в методы обновления профиля' });
      } else {
        res.status(500).json({ message: err.message });
      }
    });
};

module.exports.updateAvatarUser = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((user) => {
      if (!user) return res.status(404).send({ message: `Пользователь c id: ${req.user._id} не найден` });
      res.status(200).json({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidatorError' || err.name === 'CastError') {
        res.status(400).json({ message: 'Переданы некорректные данные в методы обновления профиля' });
      } else {
        res.status(500).json({ message: err.message });
      }
    });
};
