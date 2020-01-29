const {
  validateLogin,
  validateRegister,
  checkUser,
} = require('../tools/validation/user');
const {isEmpty} = require('../tools/validation/validator');
const crypto = require('../tools/crypto');
const {NOT_EXIST, PASSWORD} = require('../constants/http-send-response');
const CustomError = require('../tools/customError');

function Service(model) {
  this.model = model;
}
Service.prototype.checkUserRegister = async function(fields) {
  const {errors, isValid} = validateRegister(fields);

  if (!isValid)
    throw new CustomError('checkUserRegister', 'Not Valid User Input', errors);

  const foundUser = await this.model.findUsers(fields);
  if (!isEmpty(foundUser)) {
    throw new CustomError(
      'checkUserRegister',
      'User Already Exist',
      checkUser(foundUser[0], fields),
    );
  }
};
Service.prototype.checkUserLogin = async function(fields) {
  const {errors, isValid} = validateLogin(fields);

  if (!isValid)
    throw new CustomError('checkUserLogin', 'Not Valid User Input', errors);

  const foundUser = await this.model.findOneUser(fields);
  if (isEmpty(foundUser)) {
    throw new CustomError('checkUserLogin', 'User Not Exist', {
      email: NOT_EXIST,
    });
  }
  return foundUser;
};

Service.prototype.createUser = async function({nickname, email, password}) {
  const hash = await crypto.hashPassword(password);
  return await this.model.createUser({
    nickname,
    email,
    password: hash,
  });
};
Service.prototype.comparePasswords = async function(password, hash) {
  const isMatched = await crypto.comparePasswords(password, hash);
  if (!isMatched) {
    throw new CustomError('comparePasswords', 'Incorrect Password', {
      password: PASSWORD,
    });
  }
  return isMatched;
};

Service.prototype.setToken = async function({id, email, nickname}) {
  return await crypto.setToken({id, email, nickname});
};
module.exports = Service;
