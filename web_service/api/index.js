

const fs = require('fs');
const env = process.env.NODE_ENV || 'development';
const debugConf = require('../config/debug');


const { validataToken } = require('./utils');


module.exports = function api() {
  const files = fs.readdirSync(__dirname);
  files.forEach(apiFile => {
    if (apiFile !== 'index.js' && apiFile !== 'utils.js') {
      require(`./${apiFile}`)(this);
    }
  });

  // 拦截api
  this.wrap(['role:api'], function (msg, done) {
    // console.log(msg.role);
    // 调用API且非登录验证头部sessionID
    if (msg.method !== 'login') {
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