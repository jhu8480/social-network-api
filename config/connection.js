const path = require('path');
const dotenv = require('dotenv');
dotenv.config({path: path.join(__dirname, '..', 'config.env')});
const mongoose = require('mongoose');

mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;