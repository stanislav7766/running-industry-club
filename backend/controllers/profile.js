const {errorHandler} = require('../middlewares');
const {OK} = require('../constants/http-status-code');

function ProfileController(profileService) {
  this.profileService = profileService;
  this.setProfile = this.setProfile.bind(this);
  this.getCurrentProfile = this.getCurrentProfile.bind(this);
}
ProfileController.prototype.setProfile = async function(req, res, next) {
  try {
    await this.profileService.checkUserProfile(req.body, req.user.id);
    const profileFields = this.profileService.createFields({
      body: req.body,
      user: req.user,
    });
    const result = await this.profileService.createProfile(profileFields);
    res
      .status(OK)
      .json(result)
      .end();
  } catch (error) {
    errorHandler({error, req, res});
  }
};

ProfileController.prototype.getCurrentProfile = async function(req, res, next) {
  try {
    const profile = await this.profileService.findProfileById(req.user.id);
    res.json(profile).end();
  } catch (error) {
    errorHandler({error, req, res});
  }
};
module.exports = ProfileController;
