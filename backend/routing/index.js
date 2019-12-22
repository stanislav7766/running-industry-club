const userController = require('../controllers');
const userRouting = require('./user');

const userRouter = userRouting(userController);
module.exports = userRouter;
