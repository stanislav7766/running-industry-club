const UserService = require('./user');
const userModel = require('../models');

const userService = new UserService(userModel);
module.exports = userService;
