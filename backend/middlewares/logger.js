const winston = require('winston');
require('dotenv').config();
const { combine, label, printf, colorize, timestamp } = winston.format;
const logLabel = process.env.LOG_LABEL;
const logTimestamp = () => new Date(Date.now()).toUTCString();
const logMessageFormat = printf(
  info => `[${info.label}]: ${info.message} | ${info.timestamp}`
);
winston.addColors({
  error: 'red',
  warn: 'yellow',
  info: 'cyan',
  verbose: 'blue',
  debug: 'white',
  silly: 'white'
});
const levels = {
  ...winston.config.syslog.levels
};

const logger = winston.createLogger({
  levels,
  transports: [
    new winston.transports.Console({
      level: 'info',
      timestamps: true,
      format: combine(
        label({ label: logLabel }),
        colorize({ all: true }),
        timestamp({ format: logTimestamp }),
        logMessageFormat
      )
    })
  ]
});
logger.useLogger = (level, { msg, name }) =>
  logger.log(level, `${name} : ${msg}`);
module.exports = logger;
