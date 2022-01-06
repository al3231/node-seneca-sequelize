const log = require('./log');

function serviceCallback(func) {
  return async (msg, done) => {
    try {
      const rst = await func(msg);
      done({ data: rst });
    } catch (err) {
      log.error(err);
      done(err);
    }
  }

}

module.exports = {
  serviceCallback
}