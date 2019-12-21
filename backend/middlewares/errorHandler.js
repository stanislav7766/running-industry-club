'use strict';
const logger = require('../tools/logger');

const errorHandler = (err, req, res) => {
  const myErr = createError(err);
  logger.useLogger('error', myErr);
  res.status(500).end();
};

const createError = err =>
  Object.assign(new Error(), { msg: err.errmsg, name: err.name });

module.exports = errorHandler;
