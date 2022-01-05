const log4js = require('log4js');

log4js.configure({
  appenders: {
    dateFileOut: {
      type: 'dateFile',
      filename: 'logs/web-service-log.log',
      pattern: '.yyyy-MM-dd'
    }
  },
  categories: {
    default: {
      appenders: ['dateFileOut'],
      level: 'debug'
    }
  }
});

const logger = log4js.getLogger();

module.exports = logger;
