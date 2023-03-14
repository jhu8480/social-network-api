const { User, Thought } = require('./../models/index');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    .populate('thoughts')
    .populate('friends')
    .select('-__v');
    res.status(200).json(users);
  } catch(e) {
    res.status(500).json(e);
  }
};

const getOneUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId })
      .populate('friends')
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
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }

    res.status(200).json(updatedUser);
  } catch(e) {
    res.status(500).json(e);
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findOneAndRemove({_id: req.params.userId});
    if (!deleteUser) {
      res.status(404).json({ message: 'No user with that ID' });
      return;
    }
    await Thought.deleteMany({username: deletedUser.username});
    res.status(200).json({ message: 'User and associated thoughts deleted!' });
  } catch(e) {
    res.status(500).json(e);
  }
};

const addFriend = async (req, res) => {
  try {
    const {userId, friendId} = req.params;
    const user = await User.findOneAndUpdate({_id: userId}, {$addToSet: {friends: friendId}});
    if (!user) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    const friend = await User.findOneAndUpdate({_id: friendId}, {$addToSet: {friends: userId}});
    if (!friend) {
      res.status(404).json({ message: 'No user with this friend id!' });
      return;
    }
    
    const updatedUser = await User.findOne({_id: userId});
    const updatedFriend = await User.findOne({
      _id: friendId
    })

    res.status(200).json({
      updatedUser,
      updatedFriend
    });
  } catch (e) {
    res.status(500).json(e);
  }
};

const removeFriend = async (req, res) => {
  try {
    const {userId, friendId} = req.params;
    const user = await User.findOneAndUpdate({_id: userId}, {$pull: {friends: friendId}});
    if (!user) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    const friend = await User.findOneAndUpdate({_id: friendId}, {$pull: {friends: userId}});
    if (!friend) {
      res.status(404).json({ message: 'No user with this friend id!' });
      return;
    }
    
    const updatedUser = await User.findOne({_id: userId});
    const updatedFriend = await User.findOne({
      _id: friendId
    })

    res.status(200).json({
      updatedUser,
      updatedFriend
    });
  } catch (e) {
    res.status(500).json(e);
  }
};


module.exports = { getAllUsers, createUser, getOneUser, updateUser, deleteUser, addFriend, removeFriend };