const {errorHandler, sendBadRequest} = require('../tools/errorHandler');
const {OK} = require('../constants/http-status-code');
const {REGISTER_FIELDS, LOGIN_FIELDS} = require('../constants/http-send-response');
const bodyFilter = require('../constants/body');

const loginUser = async (ctx, service) => {
  const {
    req: {body},
    res,
  } = ctx;
  try {
    const fields = bodyFilter(body, LOGIN_FIELDS);
    const user = await service.checkUserLogin(fields);
    await service.comparePasswords(fields.password, user.password);
    const token = await service.setToken(user);
    res
      .status(OK)
      .json(token)
      .end();
  } catch (error) {
    errorHandler(error, () => sendBadRequest(res, error.errors));
  }
};
const registerUser = async (ctx, service) => {
  const {
    req: {body},
    res,
  } = ctx;
  try {
    const fields = bodyFilter(body, REGISTER_FIELDS);
    await service.checkUserRegister(fields);
    await service.createUser(fields);
    res.status(OK).end();
  } catch (error) {
    errorHandler(error, () => sendBadRequest(res, error.errors));
  }
};

module.exports = service => ({
  loginUser: (req, res) => loginUser({req, res}, service),
  registerUser: (req, res) => registerUser({req, res}, service),
});
