'use strict';
const user = require('../validation/user');
const { isEmpty } = require('../validation/validator');
const crypto = require('../crypto');

function UserService(userModel) {
  this.userModel = userModel;
}
UserService.prototype.checkUserRegister = async function(body) {
  const { nickname, email, password, password2 } = body;
  const { errors, isValid } = user.validateRegister({
    nickname,
    email,
    password,
    password2
  });
  if (!isValid)
    return {
      errors
    };
  const foundUser = await this.userModel.findUsers({
    nickname,
    email
  });
  return isEmpty(foundUser)
    ? {}
    : {
        errors: user.checkUser(foundUser[0], {
          nickname,
          email
        })
      };
};
UserService.prototype.checkUserLogin = async function(body) {
  const { email, password } = body;
  const { errors, isValid } = user.validateLogin({
    email,
    password
  });
  if (!isValid)
    return {
      errors
    };
  const foundUser = await this.userModel.findOneUser({
    email
  });
  return isEmpty(foundUser)
    ? {
        errors: { notExist: 'Пользователь не найден' },
        user: {}
      }
    : {
        errors,
        user: foundUser
      };
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
UserService.prototype.comparePasswords = async function(body, hash) {
  const { password } = body;
  const isMatched = await crypto.comparePasswords(password, hash);
  return isMatched
    ? { errors: {}, isMatched }
    : { errors: { password: 'Неверный пароль' }, isMatched };
};

UserService.prototype.setToken = async function(user) {
  const { id, email, nickname } = user;
  return await crypto.setToken({ id, email, nickname });
};
module.exports = UserService;
