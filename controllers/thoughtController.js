const { User, Thought } = require('./../models/index');

const getAllThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find().select('-__v');
    res.status(200).json(thoughts);
  } catch(e) {
    res.status(500).json(e);
  }
};

const createThought = async (req, res) => {
  try {
    const thought = await Thought.create(req.body);
    const user = await User.findOneAndUpdate({username: req.body.username}, {$addToSet: {thoughts: thought._id}}, {new: true});
    if (!user) {
      res.status(404).json('Thoughts created, but no user found with that user name');
      return;
    }
    res.status(200).json({
      thought,
      user
    });
  } catch(e) {
    res.status(500).json(e);
  }
};

const getOneThought = async (req, res) => {
  try {
    const thought = await Thought.findOne({
      _id: req.params.thoughtId
    }).select('-__v');
    res.status(200).json(thought);
  } catch(e) {
    res.status(500).json(e);
  }
}

const updateThought = async (req, res) => {
  try {
    const updatedThought = await Thought.findOneAndUpdate({_id: req.params.thoughtId}, {$set: req.body}, { runValidators: true, new: true });
    if (!updatedThought) {
      res.status(404).json({ message: 'No thought with this id!' });
      return;
    }

    res.status(200).json(updatedThought);
  } catch(e) {
    res.status(500).json(e);
  }
};

const deleteThought = async (req, res) => {
  try {
    const deleted = await Thought.findOneAndRemove({_id: req.params.thoughtId});
    if (!deleted) {
      res.status(404).json('No thought found with that id');
      return;
    }
    res.status(200).json({
      message: 'successfully deleted'
    })
  } catch(e) {
    res.status(500).json(e);
  }
};

module.exports = { getAllThoughts, createThought, getOneThought, updateThought, deleteThought };