const PROFILE_FIELDS = [
  'status',
  'name',
  'location',
  'bio',
  'age',
  'website',
  'youtube',
  'twitter',
  'facebook',
  'instagram',
];
const RUN_FIELDS = ['distance', 'nameRun', 'date', 'locationRun', 'time'];
const REGISTER_FIELDS = ['nickname', 'email', 'password', 'password2'];
const LOGIN_FIELDS = ['email', 'password'];

const bodyFilter = (body, arr) =>
  arr.reduce(
    (res, prop) => (body[prop] ? {...res, [prop]: body[prop]} : res),
    {},
  );

module.exports = {
  REGISTER_FIELDS,
  PROFILE_FIELDS,
  LOGIN_FIELDS,
  RUN_FIELDS,
  bodyFilter,
};