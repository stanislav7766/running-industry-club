const logger = require('../tools/logger/');

const errorHandler = ({error, req, res, statusCode}) => {
  logger.useLogger('error', {
    msg: error.message,
    name: error.name,
  });
  res.status(statusCode).end();
};

module.exports = errorHandler;
