const {errorHandler} = require('../middlewares');
const {OK} = require('../constants/http-status-code');

function UserController(userService) {
  this.userService = userService;
  this.loginUser = this.loginUser.bind(this);
  this.registerUser = this.registerUser.bind(this);
}
UserController.prototype.loginUser = async function(req, res, next) {
  try {
    const user = await this.userService.checkUserLogin(req.body);
    await this.userService.comparePasswords(req.body, user.password);
    const token = await this.userService.setToken(user);
    res
      .status(OK)
      .json(token)
      .end();
  } catch (error) {
    errorHandler({error, req, res});
  }
};
UserController.prototype.registerUser = async function(req, res, next) {
  try {
    await this.userService.checkUserRegister(req.body);
    await this.userService.createUser(req.body);
    res.status(OK).end();
  } catch (error) {
    errorHandler({error, req, res});
  }
};
module.exports = UserController;
