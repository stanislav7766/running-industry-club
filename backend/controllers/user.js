'use strict';
const { isEmpty } = require('../validation/validator');
const { errorHandler } = require('../middlewares/errorHandler');

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
      user instanceof Error
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
