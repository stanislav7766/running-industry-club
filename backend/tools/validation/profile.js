const {isEmpty, validateFields} = require('./validator');

const validateProfile = fields => {
  const errors = validateFields(fields);
  return {errors, isValid: isEmpty(errors)};
};

const isPreviewRunExist = ({runPreview: {url, public_id}}) => !!(url && public_id);

const validateRun = fields => {
  const errors = validateFields(fields);
  return {errors, isValid: isEmpty(errors)};
};

module.exports = {isPreviewRunExist, validateProfile, validateRun};
