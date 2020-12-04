const router = require('express').Router();

const getUsers = require('./users');
const getCards = require('./cards');

router.use('/users', getUsers);
router.use('/cards', getCards);

router.all('/*', (req, res) => {
  res.status(404).json({ message: 'Запрашиваемый ресурс не найден' });
});

module.exports = router;
