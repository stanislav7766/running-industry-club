'use strict';
const express = require('express');
const router = express.Router();
const passport = require('passport');

const queriesProfile = require('../queries/queriesProfile');

const jwtConfig = {
  session: false
};
router.get(
  '/',
  passport.authenticate('jwt', jwtConfig),
  queriesProfile.getCurrentProfile
);
router.post(
  '/',
  passport.authenticate('jwt', jwtConfig),
  queriesProfile.setProfile
);
router.get(
  '/run-booking',
  passport.authenticate('jwt', jwtConfig),
  queriesProfile.getCurrentBookedRuns
);

router.post(
  '/runs',
  passport.authenticate('jwt', jwtConfig),
  queriesProfile.parseImageUpload(),
  queriesProfile.setRun
);

router.post(
  '/run-booking',
  passport.authenticate('jwt', jwtConfig),
  queriesProfile.setBookedRun
);

router.delete(
  '/runs/:run_id',
  passport.authenticate('jwt', jwtConfig),
  queriesProfile.deleteRun
);

router.delete(
  '/booked-runs/:run_id',
  passport.authenticate('jwt', jwtConfig),
  queriesProfile.deleteBookedRun
);
router.post(
  '/booked-runs/:run_id',
  passport.authenticate('jwt', jwtConfig),
  queriesProfile.paidBookedRun
);

router.delete(
  '/',
  passport.authenticate('jwt', jwtConfig),
  queriesProfile.deleteAccount
);
module.exports = router;
