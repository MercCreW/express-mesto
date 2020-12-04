const getCards = require('express').Router();
const fs = require('fs').promises;
const path = require('path');

const filePath = path.resolve('data', 'cards.json');

getCards.get('/', (req, res) => {
  fs.readFile(filePath)
    .then((data) => {
      res.status(200).send(JSON.parse(data));
    })
    .catch(() => {
      res.status(404).json({ message: 'Запрашиваемый файл не найден' });
    });
});

module.exports = getCards;
