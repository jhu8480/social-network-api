const { User, Thought } = require('./../models/index');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    .populate('thoughts')
    .select('-__v');
    res.status(200).json(users);
  } catch(e) {
    res.status(500).json(e);
  }
};

const getOneUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId })
      .populate('thoughts')
      .select('-__v');
    res.status(200).json(user);
  } catch(e) {
    res.status(500).json(e);
  }
};

const createUser = (req, res) => {
  User.create(req.body)
    .then(user => res.json(user))
    .catch(e => res.status(500).json(e));
}

const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate({_id: req.params.userId}, {$set: req.body}, { runValidators: true, new: true });

    if (!updatedUser) {
      res.status(404).json({ message: 'No application with this id!' });
      return;
    }

    res.status(200).json(updatedUser);
  } catch(e) {
    res.status(500).json(e);
  }
};


module.exports = { getAllUsers, createUser, getOneUser, updateUser };