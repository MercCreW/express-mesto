const router = require('express').Router();
const {
  getCards, createCard, deleteCardById, likeCard, unlikeCard,
} = require('../controllers/card');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:cardId', deleteCardById);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', unlikeCard);

module.exports = router;
