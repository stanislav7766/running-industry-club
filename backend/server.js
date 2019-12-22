'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routing');
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/api/users', userRouter);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${port}`),
);
