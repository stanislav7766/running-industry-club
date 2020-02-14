const {validateProfile, validateRun, isPreviewRunExist} = require('../tools/validation/profile');
const {isEmpty, isInstanceError} = require('../tools/validation/validator');
const {PROFILE_NOT_EXIST, RUN_PREVIEW_ERROR, AVATAR_ERROR} = require('../constants/http-send-response');
const CustomError = require('../tools/customError');
const {calcPace, calculatedTotals} = require('../tools/totalsActivities');
const {
  uploadPreview,
  clearDirectory,
  isEmptyDirectory,
  removeImage,
  removeFolder,
  createFolder,
} = require('../tools/cloudinary');
//temp solution
const {userModel} = require('../models/');

const findProfileById = async (id, model) => {
  const profile = await model.findProfileById(id);
  if (isEmpty(profile))
    throw new CustomError('findProfileById', 'Profile Not Exist For This User', {noprofile: PROFILE_NOT_EXIST});

  return profile;
};

const checkUserProfile = fields => {
  const {errors, isValid} = validateProfile(fields);
  if (!isValid) throw new CustomError('checkUserProfile', 'Not Valid Profile Input', errors);
};
const checkUserRun = fields => {
  const {errors, isValid} = validateRun(fields);
  if (!isValid) throw new CustomError('checkUserRun', 'Not Valid Run Input', errors);
};
const checkUserBookedRun = fields => {
  const {errors, isValid} = validateRun(fields);
  if (!isValid) throw new CustomError('checkUserBookedRun', 'Not Valid Booked Run Input', errors);
};
const createProfileFields = async data => {
  const {fields, user, file} = data;
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

  if (!isEmpty(file)) {
    const opts = {folder_name: user.id, type: 'AVATAR'};
    !(await isEmptyDirectory(opts)) && (await clearDirectory(opts));
    const avatar = await uploadPreview({
      file,
      ...opts,
    });
    if (isInstanceError(avatar)) {
      throw new CustomError(err.name, 'cannot create profile fileds(avatar)', {
        avatar: AVATAR_ERROR,
      });
    } else obj.avatar = avatar;
  }
  return obj;
};
const createBookedRunFields = fields => {
  const obj = {};

  if (fields.locationRun) obj.locationRun = fields.locationRun;
  if (fields.distance) obj.distance = fields.distance;
  if (fields.status) obj.status = fields.status;
  if (fields.date) obj.date = fields.date;
  if (fields.nameRun) obj.nameRun = fields.nameRun;
  return obj;
};
const createRunFields = async data => {
  const {fields, file, id} = data;
  const obj = {};
  obj.nameRun = fields.nameRun;
  obj.date = fields.date;
  obj.locationRun = fields.locationRun;
  obj.distance = fields.distance;
  obj.time = fields.time;
  obj.pace = calcPace(fields.distance, fields.time);
  obj.feedback = '';

  if (!isEmpty(file)) {
    const runPreview = await uploadPreview({
      file,
      folder_name: id,
      type: 'PREVIEW',
    });
    if (isInstanceError(runPreview)) {
      throw new CustomError(err.name, 'cannot create run fileds(preview)', {
        run_preview: RUN_PREVIEW_ERROR,
      });
    } else obj.runPreview = runPreview;
  }
  return obj;
};

const createProfile = async (data, model) => {
  const profile = await model.updateProfile(data);
  if (isEmpty(profile)) {
    await model.createProfile(data);
    const res = await createFolder({
      folder_name: data.user.id,
      type: 'PREVIEW',
    });

    if (isInstanceError(res) || !res.success)
      throw new CustomError(err.name, `cannot create folder in cloudinary for user ${data.user.id}`, {});
  }
  return profile;
};

const paidBookedRun = async ({user_id, run_id}, model) => {
  const profile = await findProfileById(user_id, model);
  const {bookedRuns} = profile;
  const updateIndex = bookedRuns.map(run => run.id).indexOf(run_id);
  bookedRuns[updateIndex].status = 'paid';
  const updatedProfile = await model.updateProfile(profile);

  if (isEmpty(updatedProfile)) {
    throw new CustomError('paidBookedRun', 'Profile Not Updated For This User', {
      noprofile: 'Хм , обновить не вышло',
    });
  }
  return updatedProfile;
};

const addRun = async ({data, id}, model) => {
  const profile = await findProfileById(id, model);
  const {runs} = profile;
  runs.push(data);
  profile.totalsRun = calculatedTotals(runs);

  const updatedProfile = await model.updateProfile(profile);

  if (isEmpty(updatedProfile)) {
    throw new CustomError('addRun', 'Profile Not Updated For This User', {
      noprofile: 'Хм , обновить не вышло',
    });
  }
  return updatedProfile;
};
const addBookedRun = async ({data, id}, model) => {
  const profile = await findProfileById(id, model);
  const {bookedRuns} = profile;
  bookedRuns.push(data);
  const updatedProfile = await model.updateProfile(profile);

  if (isEmpty(updatedProfile)) {
    throw new CustomError('addBookedRun', 'Profile Not Updated For This User', {
      noprofile: 'Хм , обновить не вышло',
    });
  }
  return updatedProfile;
};

const deleteRun = async ({user_id, run_id}, model) => {
  const profile = await findProfileById(user_id, model);
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

  const updatedProfile = await model.updateProfile(profile);

  if (isEmpty(updatedProfile)) {
    throw new CustomError('deleteRun', 'Profile Not Updated For This User', {
      noprofile: 'Хм , обновить не вышло',
    });
  }
  return updatedProfile;
};
const deleteBookedRun = async ({user_id, run_id}, model) => {
  const profile = await findProfileById(user_id, model);
  const {bookedRuns} = profile;
  const removeIndex = bookedRuns.map(run => run.id).indexOf(run_id);
  bookedRuns.splice(removeIndex, 1);
  const updatedProfile = await model.updateProfile(profile);

  if (isEmpty(updatedProfile)) {
    throw new CustomError('deleteBookedRun', 'Profile Not Updated For This User', {
      noprofile: 'Хм , обновить не вышло',
    });
  }
  return updatedProfile;
};
const deleteAccount = async (user_id, model) => {
  const pDeleteProfile = model.deleteProfile(user_id);
  const pDeleteAccount = userModel.deleteAccount(user_id);
  Promise.all([pDeleteAccount, pDeleteProfile]);
  const res_previews = await removeFolder({
    folder_name: user_id,
    type: 'PREVIEW',
  });
  const res_avatar = await removeFolder({folder_name: user_id, type: 'AVATAR'});
  if (!res_previews.success)
    throw new CustomError(err.name, `cannot delete cloudinary folder for user_id: ${user_id}`, {});

  if (!res_avatar.success)
    throw new CustomError(err.name, `cannot delete cloudinary folder for user_id: ${user_id}`, {});
};
module.exports = model => ({
  checkUserProfile: fields => checkUserProfile(fields),
  checkUserRun: fields => checkUserRun(fields),
  checkUserBookedRun: fields => checkUserBookedRun(fields),
  createProfileFields: data => createProfileFields(data),
  createBookedRunFields: data => createBookedRunFields(data),
  createRunFields: data => createRunFields(data),
  createProfile: data => createProfile(data, model),
  paidBookedRun: (user_id, run_id) => paidBookedRun({user_id, run_id}, model),
  addRun: (data, id) => addRun({data, id}, model),
  addBookedRun: (data, id) => addBookedRun({data, id}, model),
  findProfileById: id => findProfileById(id, model),
  deleteRun: (user_id, run_id) => deleteRun({user_id, run_id}, model),
  deleteBookedRun: (user_id, run_id) => deleteBookedRun({user_id, run_id}, model),
  deleteAccount: user_id => deleteAccount(user_id, model),
});
