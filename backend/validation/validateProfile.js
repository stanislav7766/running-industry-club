'use strict';

const isEmpty = require('./isEmpty');
const isURL = require('./isURL');
const isNumber = require('./isNumber');
const REQUIRED_FIELD = 'Это поле обязательно';
const INVALID_URL = 'Укажите правильный URL';
const INVALID_FIELD = 'Укажите корректный возвраст';

const validateProfile = data => {
  let errors = {};
  if (isEmpty(data.status) || data.status === '0')
    errors.status = REQUIRED_FIELD;
  if (isEmpty(data.name)) errors.name = REQUIRED_FIELD;

  if (isEmpty(data.location)) errors.location = REQUIRED_FIELD;

  if (isEmpty(data.bio)) errors.bio = REQUIRED_FIELD;
  if (!isNumber(data.age)) errors.age = INVALID_FIELD;

  if (!isEmpty(data.website) && !isURL(data.website))
    errors.website = INVALID_URL;

  if (!isEmpty(data.youtube) && !isURL(data.youtube))
    errors.youtube = INVALID_URL;

  if (!isEmpty(data.twitter) && !isURL(data.twitter))
    errors.twitter = INVALID_URL;

  if (!isEmpty(data.facebook) && !isURL(data.facebook))
    errors.facebook = INVALID_URL;

  if (!isEmpty(data.instagram) && !isURL(data.instagram))
    errors.instagram = INVALID_URL;

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateProfile;
