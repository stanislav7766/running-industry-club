'use strict';
const mongoose = require('mongoose');
const userModel = require('./user');
require('dotenv').config();
const { mongoURI } = require('../config/keys');

const opts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
};
mongoose.connect(mongoURI, opts);

module.exports = userModel;
