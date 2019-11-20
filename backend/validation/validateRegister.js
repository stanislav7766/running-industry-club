'use strict';

const isEmpty = require('./isEmpty');
const isEmail = require('./isEmail');
const isLength = require('./isLength');
const isEquals = require('./isEquals');
const REQUIRED_FIELD = 'Это поле обязательно';
const validateRegister = data => {
  let errors = {};
  if (isEmpty(data.password)) errors.password = REQUIRED_FIELD;

  if (!isLength(data.password, { min: 6, max: 30 }))
    errors.password = 'Количество символов должно быть между 6 и 30';

  if (isEmpty(data.password2)) errors.password2 = REQUIRED_FIELD;

  if (!isEquals(data.password, data.password2))
    errors.password2 = 'Пароли Должны Совпадать';

  if (isEmpty(data.nickname)) errors.nickname = REQUIRED_FIELD;

  if (!isEmail(data.email)) errors.email = 'Неверно введена почта';
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
module.exports = validateRegister;
