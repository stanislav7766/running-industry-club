const logger = require('../logger');
const {isEmpty} = require('../validation/validator');
const {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
} = require('../../constants/http-status-code');

const sendBadRequest = (response, errors) =>
  (isEmpty(errors) && response.status(INTERNAL_SERVER_ERROR).end()) ||
  response
    .status(BAD_REQUEST)
    .json(errors)
    .end();

const errorHandler = (error, cb) => {
  logger.useLogger('error', {
    msg: error.message,
    name: error.name,
  });
  cb();
};

module.exports = {errorHandler, sendBadRequest};
