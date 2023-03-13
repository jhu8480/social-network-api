const router = require('express').Router();
const { getAllUsers, createUser, getOneUser, updateUser } = require('./../../controllers/userController');

router.route('/')
  .get(getAllUsers)
  .post(createUser);

router.route('/:userId')
  .get(getOneUser)
  .put(updateUser);

module.exports = router;
