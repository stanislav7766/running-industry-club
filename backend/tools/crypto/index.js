const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const hashPassword = password =>
  new Promise((resolve, reject) =>
    bcrypt
      .genSalt(Number(process.env.SALT))
      .then(salt =>
        bcrypt
          .hash(password, salt)
          .then(hash => resolve(hash))
          .catch(err => {
            err.name = hashPassword.name;
            reject(err);
          }),
      )
      .catch(err => {
        err.name = hashPassword.name;
        reject(err);
      }),
  );

const comparePasswords = (password, hash) =>
  new Promise((resolve, reject) =>
    bcrypt
      .compare(password, hash)
      .then(isMatched => resolve(isMatched))
      .catch(err => {
        err.name = comparePasswords.name;
        reject(err);
      }),
  );
const setToken = ({id, nickname, email}) =>
  new Promise((resolve, reject) => {
    jwt.sign(
      {id, nickname, email},
      process.env.SECRET,
      {expiresIn: Number(process.env.EXPIRES_TOKEN)},
      (err, token) => {
        if (err) {
          err.name = setToken.name;
          reject(err);
        }
        resolve({success: true, token: `Bearer ${token}`});
      },
    );
  });

module.exports = {
  hashPassword: async password => await hashPassword(password),
  comparePasswords: async (password, hash) => await comparePasswords(password, hash),
  setToken: async ({id, nickname, email}) => await setToken({id, nickname, email}),
};
