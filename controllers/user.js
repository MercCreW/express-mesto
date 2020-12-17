const User = require('../models/user');

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.status(200).json({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).json({ message: `Пользователь c id: ${req.params.id} не найден` });
      }
      return res.status(500).json({ message: err.message });
    });
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
        res.status(404).json({ message: 'Переданы некорректные данные в методы создания пользователя' });
      } else {
        res.status(500).json({ message: err.message });
      }
    });
};

module.exports.updateProfileUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about })
    .then((user) => res.status(200).json({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidatorError') {
        res.status(404).json({ message: 'Переданы некорректные данные в методы обновления профиля' });
      } else {
        res.status(500).json({ message: err.message });
      }
    });
};

module.exports.updateAvatarUser = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((user) => res.status(200).json({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidatorError') {
        res.status(404).json({ message: 'Переданы некорректные данные в методы обновления аватара пользователя' });
      } else {
        res.status(500).json({ message: 'Произошла ошибка' });
      }
    });
};