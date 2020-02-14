module.exports = class CustomError extends Error {
  constructor(name, message, errors) {
    super(message);
    this.name = name;
    this.message = message;
    this.errors = errors;
    if (typeof Error.captureStackTrace === 'function') Error.captureStackTrace(this, this.constructor);
    else this.stack = new Error(message).stack;
  }
};
