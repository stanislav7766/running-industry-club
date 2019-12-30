const {validateProfile} = require('../tools/validation/profile');
const {isEmpty} = require('../tools/validation/validator');
const {PROFILE_NOT_EXIST} = require('../constants/http-send-response');
const CustomError = require('../tools/customError');

function ProfileService(profileModel) {
  this.profileModel = profileModel;
}
ProfileService.prototype.checkUserProfile = function(body, id) {
  const {errors, isValid} = validateProfile(body);
  if (!isValid) {
    throw new CustomError(
      'checkUserProfile',
      'Not Valid Profile Input',
      errors,
    );
  }
};
ProfileService.prototype.createFields = function({body, user}) {
  const obj = {};
  obj.user = {
    id: user.id,
    email: user.email,
    nickname: user.nickname,
  };
  obj.social = {};

  if (body.location) obj.location = body.location;
  if (body.bio) obj.bio = body.bio;
  if (body.status) obj.status = body.status;
  if (body.age) obj.age = body.age;
  if (body.name) obj.name = body.name;
  if (body.website) obj.social.website = body.website;
  if (body.youtube) obj.social.youtube = body.youtube;
  if (body.twitter) obj.social.twitter = body.twitter;
  if (body.facebook) obj.social.facebook = body.facebook;
  if (body.linkedin) obj.social.linkedin = body.linkedin;
  if (body.instagram) obj.social.instagram = body.instagram;
  return obj;
};
ProfileService.prototype.createProfile = async function(obj) {
  const profile = await this.profileModel.updateProfile(obj);
  return isEmpty(profile)
    ? await this.profileModel.createProfile(obj)
    : profile;
};
ProfileService.prototype.findProfileById = async function(id) {
  const profile = await this.profileModel.findProfileById(id);
  if (isEmpty(profile)) {
    throw new CustomError(
      'findProfileById',
      'Profile Not Exist For This User',
      {noprofile: PROFILE_NOT_EXIST},
    );
  }
  return profile;
};

module.exports = ProfileService;
