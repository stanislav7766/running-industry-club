const {isEmpty, isEquals, validateFields} = require('./validator');

const {NICKNAME_REGISTERED, EMAIL_REGISTERED, PASSWORDS_NOT_EQUAL} = require('../../constants/http-send-response');

const checkUser = (user, {nickname, email}) => {
  const errors = {};
  (isEquals(user.nickname, nickname) && (errors.nickname = NICKNAME_REGISTERED)) ||
    (isEquals(user.email, email) && (errors.email = EMAIL_REGISTERED));
  return errors;
};

const validateLogin = fields => {
  const errors = validateFields(fields);
  return {errors, isValid: isEmpty(errors)};
};

const validateRegister = fields => {
  const errors = validateFields(fields);
  !isEquals(fields.password, fields.password2) && (errors.password2 = PASSWORDS_NOT_EQUAL);
  return {errors, isValid: isEmpty(errors)};
};

module.exports = {checkUser, validateRegister, validateLogin};
