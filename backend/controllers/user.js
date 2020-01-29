const {errorHandler, sendBadRequest} = require('../tools/errorHandler');
const {OK} = require('../constants/http-status-code');

function Controller(service) {
  this.service = service;
  this.loginUser = this.loginUser.bind(this);
  this.registerUser = this.registerUser.bind(this);
}
Controller.prototype.loginUser = async function(req, res) {
  try {
    const {email, password} = req.body;
    const user = await this.service.checkUserLogin({email, password});
    await this.service.comparePasswords(password, user.password);
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
    const {nickname, email, password, password2} = req.body;
    await this.service.checkUserRegister({
      nickname,
      email,
      password,
      password2,
    });

    await this.service.createUser({nickname, email, password});
    res.status(OK).end();
  } catch (error) {
    errorHandler(error, () => sendBadRequest(res, error.errors));
  }
};
module.exports = Controller;
