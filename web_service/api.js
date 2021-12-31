const userApi = require('./api/userApi')
const { validataSession } = require('./api/util');

module.exports = function api() {
  userApi(this);
  // 拦截api
  this.wrap(['role:api'], function (msg, done) {
    if (msg.role === 'api') {
      const valid = validataSession(msg.request$, done);
      if (!valid) {
        return;
      }
      console.log('wrap', msg.role);
    } else {
      console.log('wrap', msg.role, msg);
    }
    this.prior(msg, done);
  })
}