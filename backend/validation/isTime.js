const isTime = text =>
  /^[+]?([0-9].[:])?([0-9].[:])?[0-9]+$/.test(text) &&
  text.split(':').length === 3;
module.exports = isTime;
