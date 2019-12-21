'use strict';
const { isEmpty } = require('../validation-new/validator');

function UserController(userService) {
  this.userService = userService;
  this.loginUser = this.loginUser.bind(this);
  this.registerUser = this.registerUser.bind(this);
}
UserController.prototype.loginUser = async function(req, res, next) {};
UserController.prototype.registerUser = async function(req, res, next) {
  try {
    const userExist = await this.userService.checkUser(req.body);

    if (isEmpty(userExist)) {
      const user = await this.userService.createUser(req.body);
      user ? res.status(200).end() : res.status(400).end();
    } else
      res
        .status(400)
        .json(userExist)
        .end();
  } catch (error) {
    next(error);
  }
};
module.exports = UserController;
