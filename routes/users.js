const router = require('express').Router();
const {
  getUsers, getUserById, createUser, updateProfileUser, updateAvatarUser,
} = require('../controllers/user.js');

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.patch('/me', updateProfileUser);
router.patch('/me/avatar', updateAvatarUser);

module.exports = router;
