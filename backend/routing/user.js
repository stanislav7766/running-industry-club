module.exports = ({router, userController}) => {
  router.post('/api/users/login', userController.loginUser);
  router.post('/api/users/register', userController.registerUser);
  return router;
};
