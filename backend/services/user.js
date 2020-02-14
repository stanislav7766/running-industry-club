const {validateLogin, validateRegister, checkUser} = require('../tools/validation/user');
const {isEmpty} = require('../tools/validation/validator');
const crypto = require('../tools/crypto');
const {NOT_EXIST, PASSWORD} = require('../constants/http-send-response');
const CustomError = require('../tools/customError');

const checkUserRegister = async (fields, model) => {
  const {errors, isValid} = validateRegister(fields);

  if (!isValid) throw new CustomError('checkUserRegister', 'Not Valid User Input', errors);

  const foundUser = await model.findUsers(fields);
  if (!isEmpty(foundUser))
    throw new CustomError('checkUserRegister', 'User Already Exist', checkUser(foundUser[0], fields));
};

const checkUserLogin = async (fields, model) => {
  const {errors, isValid} = validateLogin(fields);

  if (!isValid) throw new CustomError('checkUserLogin', 'Not Valid User Input', errors);

  const foundUser = await model.findOneUser(fields);
  if (isEmpty(foundUser)) {
    throw new CustomError('checkUserLogin', 'User Not Exist', {
      email: NOT_EXIST,
    });
  }
  return foundUser;
};

const createUser = async (fields, model) => {
  const {nickname, email, password} = fields;
  const hash = await crypto.hashPassword(password);
  return await model.createUser({
    nickname,
    email,
    password: hash,
  });
};
const comparePasswords = async (password, hash) => {
  const isMatched = await crypto.comparePasswords(password, hash);
  if (!isMatched) {
    throw new CustomError('comparePasswords', 'Incorrect Password', {
      password: PASSWORD,
    });
  }
  return isMatched;
};

const setToken = async fields => {
  const {id, email, nickname} = fields;
  return await crypto.setToken({id, email, nickname});
};
module.exports = model => ({
  checkUserRegister: fields => checkUserRegister(fields, model),
  checkUserLogin: fields => checkUserLogin(fields, model),
  createUser: fields => createUser(fields, model),
  comparePasswords: (pass, hash) => comparePasswords(pass, hash),
  setToken: fields => setToken(fields),
});
