const {jwtAuthenticate, parseImageUpload} = require('../middlewares');

module.exports = (router, profileController) => {
  router.post('/api/profile', jwtAuthenticate, parseImageUpload(), profileController.setProfile);
  router.get('/api/profile', jwtAuthenticate, profileController.getCurrentProfile);
  router.delete('/api/profile/runs/:run_id', jwtAuthenticate, profileController.deleteRun);
  router.delete('/api/profile', jwtAuthenticate, profileController.deleteAccount);
  router.post('/api/profile/runs', jwtAuthenticate, parseImageUpload(), profileController.setRun);
  router.post('/api/profile/run-booking', jwtAuthenticate, profileController.setBookedRun);
  router.delete('/api/profile/booked-runs/:run_id', jwtAuthenticate, profileController.deleteBookedRun);
  router.post('/api/profile/booked-runs/:run_id', jwtAuthenticate, profileController.paidBookedRun);
  return router;
};
