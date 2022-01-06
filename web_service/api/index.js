const debugConf = require('../config/debug');
const env = process.env.NODE_ENV || 'development';
const userApi = require('./userApi');
const productApi = require('./productApi');
const categoryApi = require('./categoryApi');
const { validataToken } = require('../libs/api');

module.exports = function api() {
  userApi(this);
  productApi(this);
  categoryApi(this);

  // 拦截api
  this.wrap(['role:api'], function (msg, done) {
    // 调用API且非登录验证头部sessionID
    if (msg.role === 'api' && msg.method !== 'login') {
      // 跳过Token验证
      let noToken = false;
      if (env === 'development' && !debugConf.token) {
        noToken = true;
      }
      if (!noToken) {
        // 验证用户token
        const valid = validataToken(msg, done);
        if (!valid) {
          return;
        }
      }
    }
    this.prior(msg, done);
  })
}