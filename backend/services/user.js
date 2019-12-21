'use strict';
const user = require('../validation/user');
const { isEmpty } = require('../validation/validator');
const crypto = require('../crypto');

function UserService(userModel) {
  this.userModel = userModel;
}
UserService.prototype.checkUserRegister = async function(body) {
  const result = {};
  const { nickname, email, password, password2 } = body;
  const { errors, isValid } = user.validateRegister({
    nickname,
    email,
    password,
    password2
  });
  if (!isValid) {
    result.errors = errors;
    return result;
  }
  const foundUser = await this.userModel.findUsers({
    nickname,
    email
  });
  if (isEmpty(foundUser)) return result;
  else {
    result.errors = user.checkUser(foundUser[0], {
      nickname,
      email
    });
    return result;
  }
};
UserService.prototype.checkUserLogin = async function(body) {
  const result = {};
  const { email, password } = body;
  const { errors, isValid } = user.validateLogin({
    email,
    password
  });
  if (!isValid) {
    result.errors = errors;
    return result;
  }
  const foundUser = await this.userModel.findOneUser({
    email
  });
  if (isEmpty(foundUser)) {
    result.errors = { notExist: 'Пользователь не найден' };
    return result;
  } else {
    result.user = foundUser;
    return result;
  }
};

UserService.prototype.createUser = async function(body) {
  const { nickname, email, password } = body;
  const hashedPassword = await crypto.hashPassword(password);
  return await this.userModel.createUser({
    nickname,
    email,
    password: hashedPassword
  });
};

UserService.prototype.setToken = async function(user) {
  const { id, email, nickname } = user;
  return await crypto.setToken({ id, email, nickname });
};
module.exports = UserService;
