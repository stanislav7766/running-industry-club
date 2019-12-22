const logger = require('../tools/logger');

const errorHandler = ({err, req, res, statusCode}) => {
  logger.useLogger('error', {
    msg: err.message,
    name: err.name,
  });
  res.status(statusCode).end();
};

module.exports = errorHandler;
