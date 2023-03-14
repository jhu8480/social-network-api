const router = require('express').Router();
const { getAllThoughts, createThought, getOneThought, updateThought, deleteThought, addReaction, removeReaction } = require('./../../controllers/thoughtController');

router.route('/')
  .get(getAllThoughts)
  .post(createThought);

router.route('/:thoughtId')
  .get(getOneThought)
  .put(updateThought)
  .delete(deleteThought);

router.route('/:thoughtId/reactions')
  .post(addReaction)
  .delete(removeReaction);

module.exports = router;