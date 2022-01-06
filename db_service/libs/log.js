const log4js = require('log4js');

log4js.configure({
  appenders: {
    dateFileOut: {
      type: 'dateFile',
      filename: 'logs/db-service-log',
      alwaysIncludePattern: true,
      pattern: '.yyyy-MM-dd.log'
    }
  },
  categories: {
    default: {
      appenders: ['dateFileOut'],
      level: 'debug'
    }
  },
  disableClustering: true
});

const logger = log4js.getLogger();

module.exports = logger;
