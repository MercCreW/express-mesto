const Card = require('../models/card');

module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => new Error(`Карточка с id: ${req.params.cardId} отсутствует`))
    .then((card) => {
      if (!card) return res.status(404).send({ message: `Карточка с id: ${req.params.cardId} отсутствует` });
      res.status(200).json({ data: card });
    })
    .catch(() => res.status(404).json({ message: `Карточка с id: ${req.params.cardId} отсутствует` }));
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).json({ data: cards }))
    .catch(() => res.status(500).json({ message: 'Произошла ошибка на сервере' }));
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
    .orFail(() => new Error(`Карточка с id: ${req.params.cardId} отсутствует`))
    .then((card) => {
      if (!card) return res.status(404).send({ message: `Карточка с id: ${req.params.cardId} отсутствует` });
      res.status(200).json({ data: card });
    })
    .catch(() => res.status(404).json({ message: `Карточка с id: ${req.params.cardId} отсутствует` }));
};

module.exports.unlikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(() => new Error(`Карточка с id: ${req.params.cardId} отсутствует`))
    .then((card) => {
      if (!card) return res.status(404).send({ message: `Карточка с id: ${req.params.cardId} отсутствует` });
      res.status(200).json({ data: card });
    })
    .catch(() => res.status(404).json({ message: `Карточка с id: ${req.params.cardId} отсутствует` }));
};
