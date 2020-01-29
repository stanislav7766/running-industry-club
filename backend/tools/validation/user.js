const {isEmpty, isEquals, validateProp} = require('./validator');

const {
  NICKNAME_REGISTERED,
  EMAIL_REGISTERED,
  PASSWORDS_NOT_EQUAL,
} = require('../../constants/http-send-response');

const checkUser = (user, {nickname, email}) => {
  const errors = {};
  if (isEquals(user.nickname, nickname)) errors.nickname = NICKNAME_REGISTERED;
  else if (isEquals(user.email, email)) errors.email = EMAIL_REGISTERED;
  return errors;
};

const validateLogin = fields => {
  const errors = {};
  for (const key in fields) {
    const res = validateProp(key, fields[key]);
    if (res) errors[key] = res;
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

const validateRegister = fields => {
  const errors = {};
  for (const key in fields) {
    const res = validateProp(key, fields[key]);
    if (res) errors[key] = res;
  }

  if (!isEquals(fields.password, fields.password2))
    errors.password2 = PASSWORDS_NOT_EQUAL;

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = {
  checkUser,
  validateRegister,
  validateLogin,
};
