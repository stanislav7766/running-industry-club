const {userController, profileController} = require('../controllers');

const userRouting = require('./user');
const profileRouting = require('./profile');

const userRouter = userRouting(userController);
const profileRouter = profileRouting(profileController);

module.exports = {
  userRouter,
  profileRouter,
};
