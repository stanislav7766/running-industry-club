const {Router} = require('express');
const {jwtAuthenticate, parseImageUpload} = require('../middlewares');
const router = Router();

module.exports = ({
  setProfile,
  setRun,
  getCurrentProfile,
  deleteRun,
  deleteAccount,
}) => {
  router.post('/', jwtAuthenticate, setProfile);
  router.get('/', jwtAuthenticate, getCurrentProfile);
  router.delete('/runs/:run_id', jwtAuthenticate, deleteRun);
  router.delete('/', jwtAuthenticate, deleteAccount);
  router.post('/runs', jwtAuthenticate, parseImageUpload(), setRun);
  return router;
};
