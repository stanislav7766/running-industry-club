const Passport = require('passport');
const {Strategy, ExtractJwt} = require('passport-jwt');
const {userModel} = require('../models');
const logger = require('../tools/logger/');
require('dotenv').config();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
};
const jwtConfig = {
  session: false,
};

const jwtStrategy = passport =>
  passport.use(
    new Strategy(options, async (jwt_payload, done) => {
      try {
        const user = await userModel.findUserById(jwt_payload.id);
        return user ? done(null, user) : done(null, false);
      } catch (error) {
        logger.useLogger('error', {
          name: error.name,
          msg: error.message,
        });
      }
    }),
  );

module.exports = {
  jwtStrategy: () => jwtStrategy(Passport),
  jwtAuthenticate: Passport.authenticate('jwt', jwtConfig),
};
