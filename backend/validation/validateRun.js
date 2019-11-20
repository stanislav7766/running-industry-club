'use strict';
const isEmpty = require('./isEmpty');
const isTime = require('./isTime');
const isNumber = require('./isNumber');
const REQUIRED_FIELD = 'Это поле обязательно';
const INVALID_TIME_FIELD = 'Укажите корректный формат времени hh:mm:ss';
const INVALID_DISTANCE_FIELD = 'Укажите корректные данные';

const validateRun = data => {
  let errors = {};

  if (isEmpty(data.distance) || data.distance === '0')
    errors.distance = REQUIRED_FIELD;
  if (isEmpty(data.nameRun)) errors.nameRun = REQUIRED_FIELD;
  if (isEmpty(data.date)) errors.date = REQUIRED_FIELD;
  if (isEmpty(data.locationRun)) errors.locationRun = REQUIRED_FIELD;
  if (isEmpty(data.time)) errors.time = REQUIRED_FIELD;
  if (!isTime(data.time)) errors.time = INVALID_TIME_FIELD;
  if (!Number(data.distance)) errors.distance = INVALID_DISTANCE_FIELD;
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
module.exports = validateRun;
