'use strict';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const validateRegister = require('../../validation/validateRegister');
const validatеLogin = require('../../validation/validateLogin');
const User = require('../../models/User');

const hashedPass = password =>
  new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) =>
      err
        ? reject(err)
        : bcrypt.hash(password, salt, (err, hash) =>
            err ? reject(err) : resolve(hash)
          )
    );
  });

const register = async (req, res) => {
  const { errors, isValid } = validateRegister(req.body);

  if (!isValid) return res.status(400).json(errors);
  const newUser = {
    nickname: req.body.nickname,
    email: req.body.email,
    password: await hashedPass(req.body.password)
  };

  User.findOne({ nickname: req.body.nickname }).then(user => {
    if (user) {
      errors.nickname = 'Пользователь уже зарегистрирован';
      return res.status(400).json(errors);
    } else {
      User.findOne({ email: req.body.email }).then(user => {
        if (user) {
          errors.email = 'Данная почта уже зарегистрирована';
          return res.status(400).json(errors);
        }

        new User(newUser).save().then(user => res.json(user));
      });
    }
  });
};

const login = (req, res) => {
  const { errors, isValid } = validatеLogin(req.body);
  if (!isValid) return res.status(400).json(errors);
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = 'Пользователь не найден';
      return res.status(404).json(errors);
    }
    bcrypt
      .compare(password, user.password)
      .then(isMatched => {
        if (!isMatched) {
          errors.password = 'Не правильный пароль';
          return res.status(400).json(errors);
        }
        jwt.sign(
          {
            id: user.id,
            nickname: user.nickname,
            email: user.email
          },
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );
      })
      .catch(err => console.log(err));
  });
};

module.exports = {
  register,
  login
};
