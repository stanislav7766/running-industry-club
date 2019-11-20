'use strict';
const express = require('express');
const router = express.Router();
const queriesFeedback = require('../queries/queriesFeedback');
router.get('/', queriesFeedback.getFeedbacks);

module.exports = router;
