const {isEmpty, validateProp} = require('./validator');

const validateProfile = fields => {
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

const isPreviewRunExist = ({runPreview: {url, public_id}}) => !!(url && public_id);

const validateRun = fields => {
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

module.exports = {
  isPreviewRunExist,
  validateProfile,
  validateRun,
};
