const {Router} = require('express');
const {jwtAuthenticate} = require('../middlewares');
const profileRouter = Router();

module.exports = profileController => {
  profileRouter.post('/', jwtAuthenticate, profileController.setProfile);
  profileRouter.get('/', jwtAuthenticate, profileController.getCurrentProfile);
  return profileRouter;
};
