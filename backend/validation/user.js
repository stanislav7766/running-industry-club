const validator = require('./validator');
const REQUIRED_FIELD = 'Это поле обязательно';

const checkUser = (user, {nickname, email}) => {
  const errors = {};
  if (user.nickname === nickname)
    errors.nickname = 'Пользователь уже зарегистрирован';
  else if (user.email === email)
    errors.email = 'Данная почта уже зарегистрирована';
  return errors;
};

const validateLogin = ({email, password}) => {
  const errors = {};
  if (!validator.isEmail(email)) errors.email = 'Введите правильную почту';
  if (validator.isEmpty(password)) errors.password = REQUIRED_FIELD;
  return {
    errors,
    isValid: validator.isEmpty(errors),
  };
};

const validateRegister = ({email, password, password2, nickname}) => {
  const errors = {};
  if (validator.isEmpty(password)) errors.password = REQUIRED_FIELD;

  if (!validator.isLength(password, {min: 6, max: 30}))
    errors.password = 'Количество символов должно быть между 6 и 30';

  if (validator.isEmpty(password2)) errors.password2 = REQUIRED_FIELD;

  if (!validator.isEquals(password, password2))
    errors.password2 = 'Пароли Должны Совпадать';

  if (validator.isEmpty(nickname)) errors.nickname = REQUIRED_FIELD;

  if (!validator.isEmail(email)) errors.email = 'Неверно введена почта';
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
