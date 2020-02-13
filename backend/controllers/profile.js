const {errorHandler, sendBadRequest} = require('../tools/errorHandler');
const {OK} = require('../constants/http-status-code');
const {
  bodyFilter,
  PROFILE_FIELDS,
  RUN_FIELDS,
  BOOKED_RUN_FIELDS,
} = require('../constants/body');

function Controller(service) {
  this.service = service;
  this.setProfile = this.setProfile.bind(this);
  this.getCurrentProfile = this.getCurrentProfile.bind(this);
  this.getCurrentBookedRuns = this.getCurrentBookedRuns.bind(this);
  this.setRun = this.setRun.bind(this);
  this.setBookedRun = this.setBookedRun.bind(this);
  this.deleteRun = this.deleteRun.bind(this);
  this.deleteBookedRun = this.deleteBookedRun.bind(this);
  this.paidBookedRun = this.paidBookedRun.bind(this);
  this.deleteAccount = this.deleteAccount.bind(this);
}
Controller.prototype.setProfile = async function(req, res) {
  try {
    const {body, user, file} = req;
    const fields = bodyFilter(body, PROFILE_FIELDS);
    await this.service.checkUserProfile(fields);
    const profileFields = await this.service.createProfileFields({
      fields,
      user,
      file,
    });

    const result = await this.service.createProfile(profileFields);
    res
      .status(OK)
      .json(result)
      .end();
  } catch (error) {
    errorHandler(error, () => sendBadRequest(res, error.errors));
  }
};

Controller.prototype.getCurrentProfile = async function(req, res) {
  try {
    const {
      user: {id},
    } = req;
    const profile = await this.service.findProfileById(id);
    res
      .status(OK)
      .json(profile)
      .end();
  } catch (error) {
    errorHandler(error, () => sendBadRequest(res, error.errors));
  }
};
Controller.prototype.getCurrentBookedRuns = async function(req, res) {
  try {
    const {
      user: {id},
    } = req;
    const profile = await this.service.findProfileById(id);
    const {bookedRuns} = profile;
    res
      .status(OK)
      .json(bookedRuns)
      .end();
  } catch (error) {
    errorHandler(error, () => sendBadRequest(res, error.errors));
  }
};

Controller.prototype.setRun = async function(req, res) {
  try {
    const {
      body,
      user: {id},
      file,
    } = req;
    const fields = bodyFilter(body, RUN_FIELDS);
    await this.service.checkUserRun(fields);
    const runFields = await this.service.createRunFields({
      fields,
      file,
      id,
    });

    const updatedProfile = await this.service.addRun(runFields, id);
    res
      .status(OK)
      .json(updatedProfile)
      .end();
  } catch (error) {
    errorHandler(error, () => sendBadRequest(res, error.errors));
  }
};

Controller.prototype.deleteRun = async function(req, res) {
  try {
    const {
      user: {id},
      params: {run_id},
    } = req;

    const updatedProfile = await this.service.deleteRun({
      user_id: id,
      run_id,
    });
    res
      .status(OK)
      .json(updatedProfile)
      .end();
  } catch (error) {
    errorHandler(error, () => sendBadRequest(res, error.errors));
  }
};
Controller.prototype.deleteBookedRun = async function(req, res) {
  try {
    const {
      user: {id},
      params: {run_id},
    } = req;

    const updatedProfile = await this.service.deleteBookedRun({
      user_id: id,
      run_id,
    });
    res
      .status(OK)
      .json(updatedProfile)
      .end();
  } catch (error) {
    errorHandler(error, () => sendBadRequest(res, error.errors));
  }
};
//disscuss logic
Controller.prototype.setBookedRun = async function(req, res) {
  try {
    const {
      body,
      user: {id},
    } = req;
    const fields = bodyFilter(body, BOOKED_RUN_FIELDS);
    await this.service.checkUserBookedRun(fields);
    const bookedRunFields = await this.service.createBookedRunFields({
      fields,
    });

    const updatedProfile = await this.service.addBookedRun(bookedRunFields, id);
    res
      .status(OK)
      .json(updatedProfile)
      .end();
  } catch (error) {
    errorHandler(error, () => sendBadRequest(res, error.errors));
  }
};

Controller.prototype.paidBookedRun = async function(req, res) {
  try {
    const {
      user: {id},
      params: {run_id},
    } = req;
    const updatedProfile = await this.service.paidBookedRun(id, run_id);
    res
      .status(OK)
      .json(updatedProfile)
      .end();
  } catch (error) {
    errorHandler(error, () => sendBadRequest(res, error.errors));
  }
};

Controller.prototype.deleteAccount = async function(req, res) {
  try {
    const {
      user: {id},
    } = req;
    await this.service.deleteAccount(id);
    res
      .status(OK)
      .json({success: true})
      .end();
  } catch (error) {
    errorHandler(error, () => sendBadRequest(res, error.errors));
  }
};
module.exports = Controller;
