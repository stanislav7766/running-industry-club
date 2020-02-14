const {userService, profileService} = require('../services');
const UserController = require('./user');
const ProfileController = require('./profile');

const userController = UserController(userService);
const profileController = ProfileController(profileService);

module.exports = {userController, profileController};
