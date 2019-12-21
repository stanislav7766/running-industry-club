'use strict';
const { isEmpty, isInstanceError } = require('../validation/validator');
const { errorHandler } = require('../middlewares');

function UserController(userService) {
  this.userService = userService;
  this.loginUser = this.loginUser.bind(this);
  this.registerUser = this.registerUser.bind(this);
}
UserController.prototype.loginUser = async function(req, res, next) {};
UserController.prototype.registerUser = async function(req, res, next) {
  const userExist = await this.userService.checkUser(req.body);

  if (isEmpty(userExist)) {
    try {
      const user = await this.userService.createUser(req.body);
      isInstanceError(user)
        ? errorHandler(user, req, res)
        : res.status(200).end();
    } catch (error) {
      errorHandler(error, req, res);
    }
  } else
    res
      .status(400)
      .json(userExist)
      .end();
};
module.exports = UserController;
