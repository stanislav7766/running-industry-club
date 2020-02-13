const {errorHandler, sendBadRequest} = require('../tools/errorHandler');
const {OK} = require('../constants/http-status-code');
const {
  bodyFilter,
  REGISTER_FIELDS,
  LOGIN_FIELDS,
} = require('../constants/body');

function Controller(service) {
  this.service = service;
  this.loginUser = this.loginUser.bind(this);
  this.registerUser = this.registerUser.bind(this);
}
Controller.prototype.loginUser = async function(req, res) {
  try {
    const fields = bodyFilter(req.body, LOGIN_FIELDS);
    const user = await this.service.checkUserLogin(fields);
    await this.service.comparePasswords(fields.password, user.password);
    const token = await this.service.setToken(user);
    res
      .status(OK)
      .json(token)
      .end();
  } catch (error) {
    errorHandler(error, () => sendBadRequest(res, error.errors));
  }
};
Controller.prototype.registerUser = async function(req, res) {
  try {
    const fields = bodyFilter(req.body, REGISTER_FIELDS);
    await this.service.checkUserRegister(fields);
    await this.service.createUser(fields);
    res.status(OK).end();
  } catch (error) {
    errorHandler(error, () => sendBadRequest(res, error.errors));
  }
};
module.exports = Controller;
