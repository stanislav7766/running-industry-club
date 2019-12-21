'use strict';

const bcrypt = require('bcryptjs');
require('dotenv').config();

const hashedPass = password =>
  new Promise((resolve, reject) =>
    bcrypt.genSalt(Number(process.env.SALT), (err, salt) =>
      err
        ? reject(err)
        : bcrypt.hash(password, salt, (err, hash) =>
            err ? reject(err) : resolve(hash)
          )
    )
  );

module.exports = {
  hashPassword: async password => await hashedPass(password)
};
