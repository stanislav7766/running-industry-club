'use strict';

const isEmpty = require('./isEmpty');
const isEmail = require('./isEmail');

const validateLogin = data => {
  let errors = {};
  if (!isEmail(data.email)) errors.email = 'Введите правильную почту';
  if (isEmpty(data.password)) errors.password = 'Это поле обязательно';

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
module.exports = validateLogin;
