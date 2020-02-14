const NOT_EXIST = 'Пользователь не найден';
const PASSWORD = 'Неверный пароль';
const NICKNAME_REGISTERED = 'Пользователь уже зарегистрирован';
const EMAIL_REGISTERED = 'Данная почта уже зарегистрирована';
const EMAIL_INCORRECT = 'Введите правильную почту';
const FIELD_REQUIRED = 'Это поле обязательно';
const AGE_INCORRECT = 'Укажите корректный возвраст';
const PASSWORD_LENGTH = 'Количество символов должно быть между 6 и 30';
const PASSWORDS_NOT_EQUAL = 'Пароли Должны Совпадать';
const URL_INVALID = 'Укажите правильный URL';
const PROFILE_NOT_EXIST = 'Ваш Профиль еще не сформирован';
const TIME_INVALID = 'Укажите корректный формат времени hh:mm:ss';
const DATE_INVALID = 'Укажите корректный формат даты mm:dd:yyyy';
const DISTANCE_INCORRECT = 'Укажите корректные данные';
const RUN_PREVIEW_ERROR = 'Не удалось загрузить превью пробежки, повторите попытку позже';
const AVATAR_ERROR = 'Не удалось загрузить фото аватара, повторите попытку позже';
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
const BOOKED_RUN_FIELDS = ['distance', 'nameRun', 'date', 'locationRun', 'status'];
const REGISTER_FIELDS = ['nickname', 'email', 'password', 'password2'];
const LOGIN_FIELDS = ['email', 'password'];

module.exports = {
  NOT_EXIST,
  PASSWORD,
  NICKNAME_REGISTERED,
  EMAIL_REGISTERED,
  EMAIL_INCORRECT,
  FIELD_REQUIRED,
  PASSWORD_LENGTH,
  PASSWORDS_NOT_EQUAL,
  AGE_INCORRECT,
  URL_INVALID,
  PROFILE_NOT_EXIST,
  TIME_INVALID,
  DATE_INVALID,
  DISTANCE_INCORRECT,
  RUN_PREVIEW_ERROR,
  AVATAR_ERROR,
  PROFILE_FIELDS,
  REGISTER_FIELDS,
  LOGIN_FIELDS,
  RUN_FIELDS,
  BOOKED_RUN_FIELDS,
};
