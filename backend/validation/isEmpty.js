const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0) ||
  (typeof value === 'function' && value.length === 0) ||
  (Array.isArray(value) && value.length === 0) ||
  (value instanceof Error && value.message === '');
module.exports = isEmpty;
