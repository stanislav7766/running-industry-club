const {ExtractJwt} = require('passport-jwt');

const jwtConfig = {session: false};

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
};

module.exports = {jwtConfig, jwtOptions};
