const errorHandler = require('../tools/errorHandler');
const {OK} = require('../constants/http-status-code');
const {REGISTER_FIELDS, LOGIN_FIELDS} = require('../constants/http-send-response');
const bodyFilter = require('../constants/body');

const loginUser = async (ctx, service) => {
  const {body, onResponse, onBadResponse} = ctx;
  try {
    const fields = bodyFilter(body, LOGIN_FIELDS);
    const user = await service.checkUserLogin(fields);
    await service.comparePasswords(fields.password, user.password);
    const token = await service.setToken(user);
    onResponse(OK, token);
  } catch (error) {
    const {errors} = error;
    errorHandler(error, () => onBadResponse(errors));
  }
};
const registerUser = async (ctx, service) => {
  const {body, onResponse, onBadResponse} = ctx;
  try {
    const fields = bodyFilter(body, REGISTER_FIELDS);
    await service.checkUserRegister(fields);
    await service.createUser(fields);
    onResponse(OK, {});
  } catch (error) {
    const {errors} = error;
    errorHandler(error, () => onBadResponse(errors));
  }
};

module.exports = service => ({
  loginUser: ctx => loginUser(ctx, service),
  registerUser: ctx => registerUser(ctx, service),
});
