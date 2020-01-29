const {userModel, profileModel} = require('../models');

const UserService = require('./user');
const ProfileService = require('./profile');

const userService = new UserService(userModel);
const profileService = new ProfileService(profileModel);

module.exports = {userService, profileService};
