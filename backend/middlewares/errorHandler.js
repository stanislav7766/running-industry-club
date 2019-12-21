'use strict';
const logger = require('../tools/logger');

const errorHandler = (err, req, res) => {
  logger.useLogger('error', {
    msg: err.message,
    name: err.name
  });
  res.status(500).end();
};

module.exports = errorHandler;
