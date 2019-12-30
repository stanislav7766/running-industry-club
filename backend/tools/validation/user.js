const validator = require('./validator');

const {
  NICKNAME_REGISTERED,
  EMAIL_REGISTERED,
  EMAIL_INCORRECT,
  FIELD_REQUIRED,
  PASSWORD_LENGTH,
  PASSWORDS_NOT_EQUAL,
} = require('../../constants/http-send-response');

const checkUser = (user, {nickname, email}) => {
  const errors = {};
  if (user.nickname === nickname) errors.nickname = NICKNAME_REGISTERED;
  else if (user.email === email) errors.email = EMAIL_REGISTERED;
  return errors;
};

const validateLogin = ({email, password}) => {
  const errors = {};
  if (!validator.isEmail(email)) errors.email = EMAIL_INCORRECT;
  if (validator.isEmpty(password)) errors.password = FIELD_REQUIRED;
  return {
    errors,
    isValid: validator.isEmpty(errors),
  };
};

const validateRegister = ({email, password, password2, nickname}) => {
  const errors = {};
  if (validator.isEmpty(password)) errors.password = FIELD_REQUIRED;

  if (!validator.isLength(password, {min: 6, max: 30}))
    errors.password = PASSWORD_LENGTH;

  if (validator.isEmpty(password2)) errors.password2 = FIELD_REQUIRED;

  if (!validator.isEquals(password, password2))
    errors.password2 = PASSWORDS_NOT_EQUAL;

  if (validator.isEmpty(nickname)) errors.nickname = REQUIRED_FIELD;

  if (!validator.isEmail(email)) errors.email = EMAIL_INCORRECT;
  return {
    errors,
    isValid: validator.isEmpty(errors),
  };
};

module.exports = {
  checkUser,
  validateRegister,
  validateLogin,
};
