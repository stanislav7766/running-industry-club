const {Router} = require('express');
const router = Router();

module.exports = ({loginUser, registerUser}) => {
  router.post('/login', loginUser);
  router.post('/register', registerUser);
  return router;
};
