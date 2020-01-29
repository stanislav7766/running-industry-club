const {errorHandler, sendBadRequest} = require('../tools/errorHandler');
const {OK} = require('../constants/http-status-code');

function Controller(service) {
  this.service = service;
  this.setProfile = this.setProfile.bind(this);
  this.getCurrentProfile = this.getCurrentProfile.bind(this);
  this.getCurrentBookedRuns = this.getCurrentBookedRuns.bind(this);
  this.setRun = this.setRun.bind(this);
  this.deleteRun = this.deleteRun.bind(this);
  this.deleteAccount = this.deleteAccount.bind(this);
}
Controller.prototype.setProfile = async function(req, res) {
  try {
    const {user} = req;

    const {
      status,
      name,
      location,
      bio,
      age,
      website,
      youtube,
      twitter,
      facebook,
      instagram,
    } = req.body;
    await this.service.checkUserProfile({
      status,
      name,
      location,
      bio,
      age,
      website,
      youtube,
      twitter,
      facebook,
      instagram,
    });
    const profileFields = this.service.createProfileFields({
      fields: {
        status,
        name,
        location,
        bio,
        age,
        website,
        youtube,
        twitter,
        facebook,
        instagram,
      },
      user,
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
    const {distance, nameRun, date, locationRun, time} = req.body;
    const {
      user: {id},
      file,
    } = req;
    await this.service.checkUserRun({
      distance,
      nameRun,
      date,
      locationRun,
      time,
    });
    const runFields = await this.service.createRunFields({
      fields: {distance, nameRun, date, locationRun, time},
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
