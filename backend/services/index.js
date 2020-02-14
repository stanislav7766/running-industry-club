const {userModel, profileModel} = require('../models');

const UserService = require('./user');
const ProfileService = require('./profile');

const userService = UserService(userModel);
const profileService = ProfileService(profileModel);

module.exports = {userService, profileService};
