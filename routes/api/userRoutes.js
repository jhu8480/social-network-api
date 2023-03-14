const router = require('express').Router();
const { getAllUsers, createUser, getOneUser, updateUser, deleteUser } = require('./../../controllers/userController');

router.route('/')
  .get(getAllUsers)
  .post(createUser);

router.route('/:userId')
  .get(getOneUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
