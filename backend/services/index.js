'use strict';
const UserService = require('./user');
const userModel = require('../models-new');

const userService = new UserService(userModel);
module.exports = userService;
