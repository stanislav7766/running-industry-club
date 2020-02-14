module.exports = (body, arr) =>
  arr.reduce(
    (res, prop) => (Object.prototype.hasOwnProperty.call(body, prop) ? {...res, [prop]: body[prop]} : res),
    {},
  );
