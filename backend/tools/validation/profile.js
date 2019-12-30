const validator = require('./validator');
const {
  AGE_INCORRECT,
  URL_INVALID,
  FIELD_REQUIRED,
} = require('../../constants/http-send-response');

const validateProfile = data => {
  const errors = {};
  if (validator.isEmpty(data.status) || data.status === '0')
    errors.status = FIELD_REQUIRED;
  if (validator.isEmpty(data.name)) errors.name = FIELD_REQUIRED;

  if (validator.isEmpty(data.location)) errors.location = FIELD_REQUIRED;

  if (validator.isEmpty(data.bio)) errors.bio = FIELD_REQUIRED;
  if (!validator.isNumber(data.age)) errors.age = AGE_INCORRECT;

  if (!validator.isEmpty(data.website) && !isURL(data.website))
    errors.website = URL_INVALID;

  if (!validator.isEmpty(data.youtube) && !isURL(data.youtube))
    errors.youtube = URL_INVALID;

  if (!validator.isEmpty(data.twitter) && !isURL(data.twitter))
    errors.twitter = URL_INVALID;

  if (!validator.isEmpty(data.facebook) && !isURL(data.facebook))
    errors.facebook = URL_INVALID;

  if (!validator.isEmpty(data.instagram) && !isURL(data.instagram))
    errors.instagram = URL_INVALID;

  return {
    errors,
    isValid: validator.isEmpty(errors),
  };
};

module.exports = {
  validateProfile,
};
