'use strict';
const userService = require('../services');
const UserController = require('./user');

const userController = new UserController(userService);

module.exports = userController;
