const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./tools/logger/');
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
    logger.useLogger('info', {msg: `Server running on port ${process.env.PORT}`, name: 'App'}),
  );
};

module.exports = new Server();
