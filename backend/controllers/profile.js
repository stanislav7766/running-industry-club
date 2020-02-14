const {errorHandler, sendBadRequest} = require('../tools/errorHandler');
const {OK} = require('../constants/http-status-code');
const {PROFILE_FIELDS, RUN_FIELDS, BOOKED_RUN_FIELDS} = require('../constants/http-send-response');
const bodyFilter = require('../constants/body');

const setProfile = async (ctx, service) => {
  const {
    req: {body, user, file},
    res,
  } = ctx;
  try {
    const fields = bodyFilter(body, PROFILE_FIELDS);
    await service.checkUserProfile(fields);
    const profileFields = await service.createProfileFields({
      fields,
      user,
      file,
    });

    const result = await service.createProfile(profileFields);
    res
      .status(OK)
      .json(result)
      .end();
  } catch (error) {
    errorHandler(error, () => sendBadRequest(res, error.errors));
  }
};

const getCurrentProfile = async (ctx, service) => {
  const {
    req: {
      user: {id},
    },
    res,
  } = ctx;
  try {
    const profile = await service.findProfileById(id);
    res
      .status(OK)
      .json(profile)
      .end();
  } catch (error) {
    errorHandler(error, () => sendBadRequest(res, error.errors));
  }
};
const getCurrentBookedRuns = async (ctx, service) => {
  const {
    req: {
      user: {id},
    },
    res,
  } = ctx;
  try {
    const {bookedRuns} = await service.findProfileById(id);
    res
      .status(OK)
      .json(bookedRuns)
      .end();
  } catch (error) {
    errorHandler(error, () => sendBadRequest(res, error.errors));
  }
};
const setRun = async (ctx, service) => {
  const {
    req: {
      body,
      user: {id},
      file,
    },
    res,
  } = ctx;
  try {
    const fields = bodyFilter(body, RUN_FIELDS);
    await service.checkUserRun(fields);
    const runFields = await service.createRunFields({
      fields,
      file,
      id,
    });

    const updatedProfile = await service.addRun(runFields, id);
    res
      .status(OK)
      .json(updatedProfile)
      .end();
  } catch (error) {
    errorHandler(error, () => sendBadRequest(res, error.errors));
  }
};

const deleteRun = async (ctx, service) => {
  const {
    req: {
      user: {id},
      params: {run_id},
    },
    res,
  } = ctx;
  try {
    const updatedProfile = await service.deleteRun(id, run_id);
    res
      .status(OK)
      .json(updatedProfile)
      .end();
  } catch (error) {
    errorHandler(error, () => sendBadRequest(res, error.errors));
  }
};

const deleteBookedRun = async (ctx, service) => {
  const {
    req: {
      user: {id},
      params: {run_id},
    },
    res,
  } = ctx;
  try {
    const updatedProfile = await service.deleteBookedRun(id, run_id);
    res
      .status(OK)
      .json(updatedProfile)
      .end();
  } catch (error) {
    errorHandler(error, () => sendBadRequest(res, error.errors));
  }
};

const setBookedRun = async (ctx, service) => {
  const {
    req: {
      body,
      user: {id},
    },
    res,
  } = ctx;
  try {
    const fields = bodyFilter(body, BOOKED_RUN_FIELDS);
    await service.checkUserBookedRun(fields);
    const bookedRunFields = await service.createBookedRunFields(fields);

    const updatedProfile = await service.addBookedRun(bookedRunFields, id);
    res
      .status(OK)
      .json(updatedProfile)
      .end();
  } catch (error) {
    errorHandler(error, () => sendBadRequest(res, error.errors));
  }
};

const paidBookedRun = async (ctx, service) => {
  const {
    req: {
      user: {id},
      params: {run_id},
    },
    res,
  } = ctx;
  try {
    const updatedProfile = await service.paidBookedRun(id, run_id);
    res
      .status(OK)
      .json(updatedProfile)
      .end();
  } catch (error) {
    errorHandler(error, () => sendBadRequest(res, error.errors));
  }
};

const deleteAccount = async (ctx, service) => {
  const {
    req: {
      user: {id},
    },
    res,
  } = ctx;
  try {
    await service.deleteAccount(id);
    res
      .status(OK)
      .json({success: true})
      .end();
  } catch (error) {
    errorHandler(error, () => sendBadRequest(res, error.errors));
  }
};

module.exports = service => ({
  setProfile: (req, res) => setProfile({req, res}, service),
  getCurrentProfile: (req, res) => getCurrentProfile({req, res}, service),
  getCurrentBookedRuns: (req, res) => getCurrentBookedRuns({req, res}, service),
  setRun: (req, res) => setRun({req, res}, service),
  deleteRun: (req, res) => deleteRun({req, res}, service),
  deleteBookedRun: (req, res) => deleteBookedRun({req, res}, service),
  setBookedRun: (req, res) => setBookedRun({req, res}, service),
  paidBookedRun: (req, res) => paidBookedRun({req, res}, service),
  deleteAccount: (req, res) => deleteAccount({req, res}, service),
});
