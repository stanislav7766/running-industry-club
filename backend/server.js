'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routing');
const logger = require('./tools/logger/');
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/api/users', userRouter);

app.listen(process.env.PORT, () =>
  logger.log('info', `Server running on port ${process.env.PORT}`),
);
