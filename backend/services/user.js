const {
  validateLogin,
  validateRegister,
  checkUser,
} = require('../tools/validation/user');
const {isEmpty} = require('../tools/validation/validator');
const crypto = require('../tools/crypto');
const {NOT_EXIST, PASSWORD} = require('../constants/http-send-response');
const CustomError = require('../tools/customError');

function UserService(userModel) {
  this.userModel = userModel;
}
UserService.prototype.checkUserRegister = async function(body) {
  const {nickname, email, password, password2} = body;
  const {errors, isValid} = validateRegister({
    nickname,
    email,
    password,
    password2,
  });
  if (!isValid)
    throw new CustomError('checkUserRegister', 'Not Valid User Input', errors);

  const foundUser = await this.userModel.findUsers({
    nickname,
    email,
  });
  if (!isEmpty(foundUser)) {
    throw new CustomError(
      'checkUserRegister',
      'User Already Exist',
      checkUser(foundUser[0], {
        nickname,
        email,
      }),
    );
  }
};
UserService.prototype.checkUserLogin = async function(body) {
  const {email, password} = body;
  const {errors, isValid} = validateLogin({
    email,
    password,
  });

  if (!isValid)
    throw new CustomError('checkUserLogin', 'Not Valid User Input', errors);

  const foundUser = await this.userModel.findOneUser({
    email,
  });
  if (isEmpty(foundUser))
    throw new CustomError('checkUserLogin', 'User Not Exist', {NOT_EXIST});
  return foundUser;
};

UserService.prototype.createUser = async function(body) {
  const {nickname, email, password} = body;
  const hashedPassword = await crypto.hashPassword(password);
  return await this.userModel.createUser({
    nickname,
    email,
    password: hashedPassword,
  });
};
UserService.prototype.comparePasswords = async function(body, hash) {
  const {password} = body;
  const isMatched = await crypto.comparePasswords(password, hash);
  if (!isMatched) {
    throw new CustomError('comparePasswords', 'Incorrect Password', {
      password: PASSWORD,
    });
  }
  return isMatched;
};

UserService.prototype.setToken = async function(user) {
  const {id, email, nickname} = user;
  return await crypto.setToken({id, email, nickname});
};
module.exports = UserService;
