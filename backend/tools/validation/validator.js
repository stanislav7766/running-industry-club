const {
  AGE_INCORRECT,
  URL_INVALID,
  FIELD_REQUIRED,
  TIME_INVALID,
  DATE_INVALID,
  DISTANCE_INCORRECT,
  EMAIL_INCORRECT,
  PASSWORD_LENGTH,
} = require('../../constants/http-send-response');

const isEmail = email =>
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email,
  );

const isEmpty = value =>
  value === undefined ||
  value === null ||
  (Array.isArray(value) && value.length === 0) ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0) ||
  (typeof value === 'function' && value.length === 0) ||
  (value instanceof Error && value.message === '');

const isEquals = (x, y) => typeof x === typeof y && x === y;

const isLength = (text, {min, max}) => text.length >= min && text.length <= max;

const isNumber = text => !isNaN(text) && /^[-]?\d+$/.test(text);

const isTime = text =>
  /^[+]?([0-9].[:])?([0-9].[:])?[0-9]+$/.test(text) &&
  text.split(':').length === 3;
const isDate = text =>
  /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/.test(
    text,
  ) && text.split('.').length === 3;

const isURL = url =>
  /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/.test(
    url,
  );
const isInstanceError = obj => obj instanceof Error;

const validateProp = (prop, value) =>
  ({
    email: () => (!isEmail(value) && EMAIL_INCORRECT) || '',
    nickname: () => (isEmpty(value) && FIELD_REQUIRED) || '',
    status: () => ((isEmpty(value) || value === '0') && FIELD_REQUIRED) || '',
    name: () => (isEmpty(value) && FIELD_REQUIRED) || '',
    nameRun: () => (isEmpty(value) && FIELD_REQUIRED) || '',
    location: () => (isEmpty(value) && FIELD_REQUIRED) || '',
    locationRun: () => (isEmpty(value) && FIELD_REQUIRED) || '',
    bio: () => (isEmpty(value) && FIELD_REQUIRED) || '',
    age: () => (!isNumber(value) && AGE_INCORRECT) || '',
    website: () => (!isEmpty(value) && !isURL(value) && URL_INVALID) || '',
    youtube: () => (!isEmpty(value) && !isURL(value) && URL_INVALID) || '',
    twitter: () => (!isEmpty(value) && !isURL(value) && URL_INVALID) || '',
    facebook: () => (!isEmpty(value) && !isURL(value) && URL_INVALID) || '',
    instagram: () => (!isEmpty(value) && !isURL(value) && URL_INVALID) || '',
    password: () =>
      (isEmpty(value) && FIELD_REQUIRED) ||
      (!isLength(value, {min: 6, max: 30}) && PASSWORD_LENGTH) ||
      '',
    password2: () =>
      (isEmpty(value) && FIELD_REQUIRED) ||
      (!isLength(value, {min: 6, max: 30}) && PASSWORD_LENGTH) ||
      '',
    distance: () =>
      ((isEmpty(value) || value === '0') && FIELD_REQUIRED) ||
      (!Number(value) && DISTANCE_INCORRECT) ||
      '',
    date: () =>
      (isEmpty(value) && FIELD_REQUIRED) ||
      (!isDate(value) && DATE_INVALID) ||
      '',
    time: () =>
      (isEmpty(value) && FIELD_REQUIRED) ||
      (!isTime(value) && TIME_INVALID) ||
      '',
  }[prop]());

module.exports = {
  isEmail,
  isEmpty,
  isEquals,
  isLength,
  isNumber,
  isTime,
  isURL,
  isInstanceError,
  isDate,
  validateProp,
};
