const errorHandler = require('./errorHandler');
const initializePassport = require('./passport');
const {jwtAuthenticate, jwtStrategy} = require('./jwtStrategy');
module.exports = {
  errorHandler,
  initializePassport,
  jwtStrategy,
  jwtAuthenticate,
};
