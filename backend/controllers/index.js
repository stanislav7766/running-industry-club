const {userService, profileService} = require('../services');
const UserController = require('./user');
const ProfileController = require('./profile');

const userController = new UserController(userService);
const profileController = new ProfileController(profileService);

module.exports = {userController, profileController};
