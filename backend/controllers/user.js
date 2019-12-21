'use strict';
const { isEmpty } = require('../validation/validator');
const { errorHandler } = require('../middlewares');

function UserController(userService) {
  this.userService = userService;
  this.loginUser = this.loginUser.bind(this);
  this.registerUser = this.registerUser.bind(this);
}
UserController.prototype.loginUser = async function(req, res, next) {
  const { errors, user } = await this.userService.checkUserLogin(req.body);
  if (isEmpty(errors)) {
    try {
      const token = await this.userService.setToken(user);
      res
        .status(200)
        .json(token)
        .end();
    } catch (error) {
      errorHandler(error, req, res);
    }
  } else
    res
      .status(400)
      .json(errors)
      .end();
};
UserController.prototype.registerUser = async function(req, res, next) {
  const { errors } = await this.userService.checkUserRegister(req.body);
  if (isEmpty(errors)) {
    try {
      await this.userService.createUser(req.body);
      res.status(200).end();
    } catch (error) {
      errorHandler(error, req, res);
    }
  } else
    res
      .status(400)
      .json(errors)
      .end();
};
module.exports = UserController;
