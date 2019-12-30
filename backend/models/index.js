const mongoose = require('mongoose');
const userModel = require('./user');
const profileModel = require('./profile');
const logger = require('../tools/logger');

const opts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};
(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, opts);
    logger.useLogger('info', {
      msg: 'Database connected',
      name: 'MongoDB',
    });
  } catch (error) {
    logger.useLogger('error', {
      msg: (error.reason && error.reason) || error.message,
      name: error.name,
    });
  }
})();

module.exports = {userModel, profileModel};
