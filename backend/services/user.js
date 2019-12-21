'use strict';
const user = require('../validation/user');
const { createError } = require('../middlewares/errorHandler');
const { isEmpty } = require('../validation/validator');
const obj = require('../crypto');

function UserService(userModel) {
  this.userModel = userModel;
}
UserService.prototype.checkUser = async function({
  nickname,
  email,
  password,
  password2
}) {
  const { errors, isValid } = user.validateRegister({
    nickname,
    email,
    password,
    password2
  });
  if (!isValid) return errors;

  const foundUser = await this.userModel.findUser({
    nickname,
    email
  });
  return !isEmpty(foundUser)
    ? {}
    : user.checkUser(foundUser[0], {
        nickname,
        email
      });
};
UserService.prototype.createUser = async function({
  nickname,
  email,
  password
}) {
  const hashedPassword = await obj.hashPassword(password);
  try {
    const user = await this.userModel.createUser({
      nickname,
      email,
      password: hashedPassword
    });

    return user;
  } catch (error) {
    console.log(error);

    return createError(error);
  }
};
module.exports = UserService;
