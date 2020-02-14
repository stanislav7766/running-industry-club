const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./tools/logger/');
const {errorHandler, sendBadRequest} = require('./tools/errorHandler');
const routes = require('./routing');
const {jwtStrategy, initializePassport} = require('./middlewares');

function Server() {
  this.app = express();
}

Server.prototype.applyMiddlewares = function() {
  this.app.use(bodyParser.urlencoded({extended: false}));
  this.app.use(bodyParser.json());
  this.app.use(initializePassport);
  this.app.use(routes);
  jwtStrategy();
};

Server.prototype.start = function() {
  this.applyMiddlewares();
  this.app.listen(process.env.PORT, () =>
    logger.useLogger('info', {
      msg: `Server running on port ${process.env.PORT}`,
      name: 'App',
    }),
  );
};

Server.prototype.monitorError = function() {
  logger.log('info', 'monitorError started');
  //need send res and refactoring
  process
    .on('unhandledRejection', err => {
      err.name = 'unhandledRejection';
      errorHandler(err, () => sendBadRequest(null, {}));
    })
    .on('uncaughtException', err => {
      err.name = 'uncaughtException';
      errorHandler(err, () => sendBadRequest(null, {}));
      // process.exit(1) or reload server;
    });
};
module.exports = new Server();
