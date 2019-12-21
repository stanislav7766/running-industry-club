'use strict';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secretOrKey } = require('../config/keys');
require('dotenv').config();
//todo: replace bcryptjs to bcrypt
const hashedPass = password =>
  new Promise((resolve, reject) =>
    bcrypt.genSalt(Number(process.env.SALT), (err, salt) => {
      if (err) {
        err.name = hashedPass.name;
        reject(err);
      }
      bcrypt.hash(password, salt, (err, hash) =>
        err ? reject(err) : resolve(hash)
      );
    })
  );

const comparePass = (password, hash) =>
  new Promise((resolve, reject) =>
    bcrypt.compare(password, hash).then(isMatched =>
      resolve(isMatched).catch(err => {
        err.name = comparePass.name;
        reject(err);
      })
    )
  );
const jwtSign = ({ id, nickname, email }) =>
  new Promise((resolve, reject) => {
    jwt.sign(
      { id, nickname, email },
      secretOrKey,
      { expiresIn: process.env.EXPIRES_TOKEN },
      (err, token) => {
        if (err) {
          err.name = jwtSign.name;
          reject(err);
        }
        resolve({
          success: true,
          token: `Bearer ${token}`
        });
      }
    );
  });

module.exports = {
  hashPassword: async password => await hashedPass(password),
  comparePasswords: async (password, hash) => await comparePass(password, hash),
  setToken: async ({ id, nickname, email }) =>
    await jwtSign({ id, nickname, email })
};
