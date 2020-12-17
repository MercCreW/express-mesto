const Card = require('../models/card');

module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.status(200).json({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(404).json({ message: `Карточка с id: ${req.params.cardId} отсутствует` });
      }
      return res.status(500).json({ messate: err.message });
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => res.status(200).json({ data: card }))
    .catch(() => res.status(500).json({ message: 'Произошла ошибка' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).json({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).json({ message: 'Переданы некорректные данные в методы создания карточки' });
      }
      return res.status(500).json({ message: err.name });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.unlikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
