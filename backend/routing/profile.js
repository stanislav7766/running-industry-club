const {Router} = require('express');
const {jwtAuthenticate, parseImageUpload} = require('../middlewares');
const router = Router();

module.exports = ({
  setProfile,
  setRun,
  setBookedRun,
  getCurrentProfile,
  deleteRun,
  deleteBookedRun,
  paidBookedRun,
  deleteAccount,
}) => {
  router.post('/', jwtAuthenticate, setProfile);
  router.get('/', jwtAuthenticate, getCurrentProfile);
  router.delete('/runs/:run_id', jwtAuthenticate, deleteRun);
  router.delete('/', jwtAuthenticate, deleteAccount);
  router.post('/runs', jwtAuthenticate, parseImageUpload(), setRun);
  router.post('/run-booking', jwtAuthenticate, setBookedRun);
  router.delete('/booked-runs/:run_id', jwtAuthenticate, deleteBookedRun);
  router.post('/booked-runs/:run_id', jwtAuthenticate, paidBookedRun);
  return router;
};
