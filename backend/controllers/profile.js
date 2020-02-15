const errorHandler = require('../tools/errorHandler');
const {OK} = require('../constants/http-status-code');
const {PROFILE_FIELDS, RUN_FIELDS, BOOKED_RUN_FIELDS} = require('../constants/http-send-response');
const bodyFilter = require('../constants/body');

const setProfile = async (ctx, service) => {
  const {body, user, file, onResponse, onBadResponse} = ctx;
  try {
    const fields = bodyFilter(body, PROFILE_FIELDS);
    await service.checkUserProfile(fields);
    const profileFields = await service.createProfileFields({fields, user, file});

    const result = await service.createProfile(profileFields);
    onResponse(OK, result);
  } catch (error) {
    const {errors} = error;
    errorHandler(error, () => onBadResponse(errors));
  }
};

const getCurrentProfile = async (ctx, service) => {
  const {
    user: {id},
    onResponse,
    onBadResponse,
  } = ctx;
  try {
    const profile = await service.findProfileById(id);
    onResponse(OK, profile);
  } catch (error) {
    const {errors} = error;
    errorHandler(error, () => onBadResponse(errors));
  }
};
const getCurrentBookedRuns = async (ctx, service) => {
  const {
    user: {id},
    onResponse,
    onBadResponse,
  } = ctx;
  try {
    const {bookedRuns} = await service.findProfileById(id);
    onResponse(OK, bookedRuns);
  } catch (error) {
    const {errors} = error;
    errorHandler(error, () => onBadResponse(errors));
  }
};
const setRun = async (ctx, service) => {
  const {
    body,
    user: {id},
    file,
    onResponse,
    onBadResponse,
  } = ctx;
  try {
    const fields = bodyFilter(body, RUN_FIELDS);
    await service.checkUserRun(fields);
    const runFields = await service.createRunFields({fields, file, id});
    const updatedProfile = await service.addRun(runFields, id);
    onResponse(OK, updatedProfile);
  } catch (error) {
    const {errors} = error;
    errorHandler(error, () => onBadResponse(errors));
  }
};

const deleteRun = async (ctx, service) => {
  const {
    user: {id},
    params: {run_id},
    onResponse,
    onBadResponse,
  } = ctx;
  try {
    const updatedProfile = await service.deleteRun(id, run_id);
    onResponse(OK, updatedProfile);
  } catch (error) {
    const {errors} = error;
    errorHandler(error, () => onBadResponse(errors));
  }
};

const deleteBookedRun = async (ctx, service) => {
  const {
    user: {id},
    params: {run_id},
    onResponse,
    onBadResponse,
  } = ctx;
  try {
    const updatedProfile = await service.deleteBookedRun(id, run_id);
    onResponse(OK < updatedProfile);
  } catch (error) {
    const {errors} = error;
    errorHandler(error, () => onBadResponse(errors));
  }
};

const setBookedRun = async (ctx, service) => {
  const {
    body,
    user: {id},
    onResponse,
    onBadResponse,
  } = ctx;
  try {
    const fields = bodyFilter(body, BOOKED_RUN_FIELDS);
    await service.checkUserBookedRun(fields);
    const bookedRunFields = await service.createBookedRunFields(fields);
    const updatedProfile = await service.addBookedRun(bookedRunFields, id);
    onResponse(OK, updatedProfile);
  } catch (error) {
    const {errors} = error;
    errorHandler(error, () => onBadResponse(errors));
  }
};

const paidBookedRun = async (ctx, service) => {
  const {
    user: {id},
    params: {run_id},
    onResponse,
    onBadResponse,
  } = ctx;
  try {
    const updatedProfile = await service.paidBookedRun(id, run_id);
    onResponse(OK, updatedProfile);
  } catch (error) {
    const {errors} = error;
    errorHandler(error, () => onBadResponse(errors));
  }
};

const deleteAccount = async (ctx, service) => {
  const {
    user: {id},
    onResponse,
    onBadResponse,
  } = ctx;
  try {
    await service.deleteAccount(id);
    onResponse(OK, {success: true});
  } catch (error) {
    const {errors} = error;
    errorHandler(error, () => onBadResponse(errors));
  }
};

module.exports = service => ({
  setProfile: ctx => setProfile(ctx, service),
  getCurrentProfile: ctx => getCurrentProfile(ctx, service),
  getCurrentBookedRuns: ctx => getCurrentBookedRuns(ctx, service),
  setRun: ctx => setRun(ctx, service),
  deleteRun: ctx => deleteRun(ctx, service),
  deleteBookedRun: ctx => deleteBookedRun(ctx, service),
  setBookedRun: ctx => setBookedRun(ctx, service),
  paidBookedRun: ctx => paidBookedRun(ctx, service),
  deleteAccount: ctx => deleteAccount(ctx, service),
});
