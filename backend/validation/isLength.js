const isLength = (str, opts) =>
  str.length >= opts.min && str.length <= opts.max;
module.exports = isLength;
