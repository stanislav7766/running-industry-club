'use strict';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./routes/api/users');
const cors = require('cors');
const favicon = require('express-favicon');
const path = require('path');

const feedbacks = require('./routes/api/feedbacks');
const profiles = require('./routes/api/profiles');
const passport = require('passport');
const app = express();
require('dotenv').config();
app.use(cors());
app.use(favicon(__dirname + '/build/favicon.ico'));
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
const db = require('./config/keys').mongoURI;
const opt = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};
mongoose
  .connect(db, opt)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
require('./config/passport')(passport);

app.use('/api/users', users);
app.use('/api/profile', profiles);
app.use('/api/feedbacks', feedbacks);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
