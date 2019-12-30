const logger = require('../tools/logger/');
const {isEmpty} = require('../tools/validation/validator');
const {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
} = require('../constants/http-status-code');

const errorHandler = ({error, req, res}) => {
  logger.useLogger('error', {
    msg: error.message,
    name: error.name,
  });
  (isEmpty(error.errors) && res.status(INTERNAL_SERVER_ERROR).end()) ||
    res
      .status(BAD_REQUEST)
      .json(error.errors)
      .end();
};

module.exports = errorHandler;
