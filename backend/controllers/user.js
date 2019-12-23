const {isEmpty} = require('../tools/validation/validator');
const {errorHandler} = require('../middlewares');
const {
  OK,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
} = require('../constants/http-status-code');

function UserController(userService) {
  this.userService = userService;
  this.loginUser = this.loginUser.bind(this);
  this.registerUser = this.registerUser.bind(this);
}
UserController.prototype.loginUser = async function(req, res, next) {
  const {errors, user} = await this.userService.checkUserLogin(req.body);
  if (isEmpty(errors)) {
    try {
      const result = await this.userService.comparePasswords(
        req.body,
        user.password,
      );
      if (isEmpty(result.errors)) {
        const token = await this.userService.setToken(user);
        res
          .status(OK)
          .json(token)
          .end();
      } else {
        res
          .status(BAD_REQUEST)
          .json(result.errors)
          .end();
      }
    } catch (error) {
      errorHandler({error, req, res, statusCode: INTERNAL_SERVER_ERROR});
    }
  } else {
    res
      .status(BAD_REQUEST)
      .json(errors)
      .end();
  }
};
UserController.prototype.registerUser = async function(req, res, next) {
  const {errors} = await this.userService.checkUserRegister(req.body);
  if (isEmpty(errors)) {
    try {
      await this.userService.createUser(req.body);
      res.status(OK).end();
    } catch (error) {
      errorHandler({error, req, res, statusCode: INTERNAL_SERVER_ERROR});
    }
  } else {
    res
      .status(BAD_REQUEST)
      .json(errors)
      .end();
  }
};
module.exports = UserController;
