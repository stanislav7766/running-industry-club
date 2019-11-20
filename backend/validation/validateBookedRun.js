'use strict';
const isEmpty = require('./isEmpty');
const REQUIRED_FIELD = 'Это поле обязательно';

module.exports = function validateRun(data) {
  let errors = {};

  if (isEmpty(data.distance) || data.distance === '0')
    errors.distance = REQUIRED_FIELD;
  if (isEmpty(data.nameRun) || data.distance === '0')
    errors.nameRun = REQUIRED_FIELD;
  if (isEmpty(data.date) || data.distance === '0') errors.date = REQUIRED_FIELD;
  if (isEmpty(data.status) || data.distance === '0')
    errors.status = REQUIRED_FIELD;
  if (isEmpty(data.locationRun) || data.distance === '0')
    errors.locationRun = REQUIRED_FIELD;

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
