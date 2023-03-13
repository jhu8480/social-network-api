const { User, Thought } = require('./../models/index');

const getAllUsers = async (req, res) => {
  try {
    const data = await User.find();
    res.status(200).json(data);
  } catch(e) {
    res.status(500).json(e);
  }
};

module.exports = { getAllUsers };