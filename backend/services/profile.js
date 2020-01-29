const {
  validateProfile,
  validateRun,
  isPreviewRunExist,
} = require('../tools/validation/profile');
const {isEmpty, isInstanceError} = require('../tools/validation/validator');
const {
  PROFILE_NOT_EXIST,
  RUN_PREVIEW_ERROR,
} = require('../constants/http-send-response');
const CustomError = require('../tools/customError');
const {calcPace, calculatedTotals} = require('../tools/totalsActivities');
const {
  uploadPreview,
  removeImage,
  removeFolder,
  createFolder,
} = require('../tools/cloudinary');
//temp solution
const {userModel} = require('../models/');

function Service(model) {
  this.model = model;
  this.findProfileById = this.findProfileById.bind(this);
}
Service.prototype.checkUserProfile = function(fields) {
  const {errors, isValid} = validateProfile(fields);
  if (!isValid) {
    throw new CustomError(
      'checkUserProfile',
      'Not Valid Profile Input',
      errors,
    );
  }
};
Service.prototype.checkUserRun = function(fields) {
  const {errors, isValid} = validateRun(fields);
  if (!isValid)
    throw new CustomError('checkUserRun', 'Not Valid Run Input', errors);
};
Service.prototype.createProfileFields = function({fields, user}) {
  const obj = {};
  obj.user = {
    id: user.id,
    email: user.email,
    nickname: user.nickname,
  };
  obj.social = {};

  if (fields.location) obj.location = fields.location;
  if (fields.bio) obj.bio = fields.bio;
  if (fields.status) obj.status = fields.status;
  if (fields.age) obj.age = fields.age;
  if (fields.name) obj.name = fields.name;
  if (fields.website) obj.social.website = fields.website;
  if (fields.youtube) obj.social.youtube = fields.youtube;
  if (fields.twitter) obj.social.twitter = fields.twitter;
  if (fields.facebook) obj.social.facebook = fields.facebook;
  if (fields.linkedin) obj.social.linkedin = fields.linkedin;
  if (fields.instagram) obj.social.instagram = fields.instagram;
  return obj;
};
Service.prototype.createRunFields = async function({fields, file, id}) {
  const obj = {};
  obj.nameRun = fields.nameRun;
  obj.date = fields.date;
  obj.locationRun = fields.locationRun;
  obj.distance = fields.distance;
  obj.time = fields.time;
  obj.pace = calcPace(fields.distance, fields.time);
  obj.feedback = '';

  if (!isEmpty(file)) {
    const runPreview = await uploadPreview(file, id);
    if (isInstanceError(runPreview)) {
      throw new CustomError(err.name, 'cannot create run fileds(preview)', {
        run_preview: RUN_PREVIEW_ERROR,
      });
    } else obj.runPreview = runPreview;
  }
  return obj;
};
Service.prototype.createProfile = async function(data) {
  const profile = await this.model.updateProfile(data);
  if (isEmpty(profile)) {
    await this.model.createProfile(data);
    const res = await createFolder(data.user.id);

    if (isInstanceError(res) || !res.success) {
      throw new CustomError(
        err.name,
        `cannot create folder in cloudinary for user ${data.user.id}`,
        {},
      );
    }
  }
  return profile;
};

Service.prototype.addRun = async function(data, id) {
  const profile = await this.findProfileById(id);
  const {runs} = profile;
  runs.push(data);
  profile.totalsRun = calculatedTotals(runs);

  const updatedProfile = await this.model.updateProfile(profile);

  if (isEmpty(updatedProfile)) {
    throw new CustomError('addRun', 'Profile Not Updated For This User', {
      noprofile: 'Хм , обновить не вышло',
    });
  }
  return updatedProfile;
};
Service.prototype.findProfileById = async function(id) {
  const profile = await this.model.findProfileById(id);
  if (isEmpty(profile)) {
    throw new CustomError(
      'findProfileById',
      'Profile Not Exist For This User',
      {noprofile: PROFILE_NOT_EXIST},
    );
  }
  return profile;
};

Service.prototype.deleteRun = async function({user_id, run_id}) {
  const profile = await this.findProfileById(user_id);
  const {runs} = profile;
  const removeIndex = runs.map(run => run.id).indexOf(run_id);

  if (isPreviewRunExist(runs[removeIndex])) {
    const {
      runPreview: {public_id},
    } = runs[removeIndex];
    await removeImage(public_id);
  }
  runs.splice(removeIndex, 1);
  profile.totalsRun = calculatedTotals(runs);

  const updatedProfile = await this.model.updateProfile(profile);

  if (isEmpty(updatedProfile)) {
    throw new CustomError('deleteRun', 'Profile Not Updated For This User', {
      noprofile: 'Хм , обновить не вышло',
    });
  }
  return updatedProfile;
};
Service.prototype.deleteAccount = async function(user_id) {
  await this.model.deleteProfile(user_id);
  await userModel.deleteAccount(user_id);
  const res = await removeFolder(user_id);

  if (isInstanceError(res) || !isEmpty(res.error) || !res.success) {
    throw new CustomError(
      err.name,
      `cannot delete cloudinary folder for user_id: ${user_id}`,
      {},
    );
  }
};
module.exports = Service;
