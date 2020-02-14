const {Router} = require('express');
const router = Router();

const {userController, profileController} = require('../controllers');

require('./user')({router, userController});
require('./profile')({router, profileController});

module.exports = router;
