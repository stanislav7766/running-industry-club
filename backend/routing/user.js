'use strict';
const { Router } = require('express');
const userRouter = Router();

module.exports = userController => {
  userRouter.post('/login', userController.loginUser);
  userRouter.post('/register', userController.registerUser);
  return userRouter;
};
