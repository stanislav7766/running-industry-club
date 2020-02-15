const {isEmpty} = require('../tools/validation/validator');
const {BAD_REQUEST, INTERNAL_SERVER_ERROR} = require('../constants/http-status-code');

const rest = controller => async (req, res) => {
  const onResponse = (status, body) =>
    res
      .status(status)
      .json(body)
      .end();

  const onBadResponse = errors =>
    (isEmpty(errors) && onResponse(INTERNAL_SERVER_ERROR, {})) || onResponse(BAD_REQUEST, errors);

  const ctx = {
    body: req.body,
    user: req.user,
    file: req.file,
    params: req.params,
    onResponse,
    onBadResponse,
  };
  await controller(ctx);
};

module.exports = controllers =>
  Object.keys(controllers).reduce(
    (wrapped, controller) => ({...wrapped, [controller]: rest(controllers[controller])}),
    {},
  );
