'use strict';
const express = require('express');
const router = express.Router();
const queriesUser = require('../queries/queriesUser');

router.post('/register', queriesUser.register);
router.post('/login', queriesUser.login);

module.exports = router;
