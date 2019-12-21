'use strict';
const logger = require('./logger');

const errorHandler = (err, req, res) => {
  logger.useLogger('error', err);
  res.status(500).end();
};

const createError = err => {
  const myError = new Error();
  myError.msg = err.errmsg;
  myError.name = err.name;
  return myError;
};
module.exports = {
  errorHandler,
  createError
};
