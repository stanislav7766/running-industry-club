// eslint-disable-next-line strict
'use strict';
require('dotenv').config();
const server = require('./app');
(() => {
  server.start();
  server.monitorError();
})();
