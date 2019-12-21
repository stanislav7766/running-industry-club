'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routing');
const error = require('./middlewares');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/users', userRouter);
app.use(error);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
