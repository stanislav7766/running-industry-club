const {Router} = require('express');
const router = Router();
const wrapRest = require('../protocols');

const {userController, profileController} = require('../controllers');

require('./user')(router, wrapRest(userController));
require('./profile')(router, wrapRest(profileController));

module.exports = router;
