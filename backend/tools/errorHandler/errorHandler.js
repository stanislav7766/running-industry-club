const logger = require('../logger');

module.exports = (error, cb) => {
  logger.useLogger('error', {msg: error.message, name: error.name});
  cb();
};
