'use strict';

const isEmail = email =>
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
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

const isLength = (text, { min, max }) =>
  text.length >= min && text.length <= max;

const isNumber = text => !isNaN(text) && /^[-]?\d+$/.test(text);

const isTime = text =>
  /^[+]?([0-9].[:])?([0-9].[:])?[0-9]+$/.test(text) &&
  text.split(':').length === 3;

const isURL = url =>
  /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/.test(
    url
  );
module.exports = {
  isEmail,
  isEmpty,
  isEquals,
  isLength,
  isNumber,
  isTime,
  isURL
};
