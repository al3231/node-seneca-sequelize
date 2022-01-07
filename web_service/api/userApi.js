
const { validateParameters, invokeDbClient, handleError, codes } = require('./utils');
const md5 = require('blueimp-md5');
const env = process.env.NODE_ENV || 'development';
const debugConf = require('../config/debug');

module.exports = function userApi(seneca) {
  seneca.add('role:api,model:user,method:login', function (msg, done) {
    if (validateParameters(msg.args.query, ['loginName', 'password', 'verifyCode'], done)) {
      const { loginName, password, verifyCode } = msg.args.query;
      const req = msg.request$;
      const captchaText = req.session.captchaText;
      // 跳过验证码验证
      let noCaptch = false;
      if (env === 'development' && !debugConf.captch) {
        noCaptch = true;
      }
      if (!noCaptch && captchaText && verifyCode.toLowerCase() !== captchaText.toLowerCase()) {
        done(handleError('验证码不正确', msg, codes.LOGIN_ERROR));
        return;
      }
      const params = {
        loginName,
        password: md5(`${loginName}${password}`)
      }

      invokeDbClient(this, msg, done, params, (_data) => {
        const {
          id,
          userName,
          realName,
        } = _data;
        // 这里要获取用户Token
        const token = req.sessionID;
        req.session.token = token;
        const data = {
          id,
          userName,
          realName,
          token
        };
        return data;
      });
    };

  })

  seneca.add('role:api,model:user,method:list', function (msg, done) {
    if (validateParameters(msg.args.query, ['pageSize', 'currentPage'], done)) {
      const { pageSize, currentPage, keyword } = msg.args.query;
      const params = {
        pageSize,
        currentPage,
        keyword
      }
      invokeDbClient(this, msg, done, params);
    }

  })

  seneca.add('role:api,model:user,method:add', function (msg, done) {
    if (validateParameters(msg.args.query, ['userName', 'realName'], done)) {
      const { userName, realName, password } = msg.args.query;
      const params = {
        userName,
        realName,
        password: md5(`${userName}${password}`)
      };
      invokeDbClient(this, msg, done, params);
    }
  })

  seneca.add('role:api,model:user,method:update', function (msg, done) {
    if (validateParameters(msg.args.query, ['id'], done)) {
      const { id, realName, status } = msg.args.query;
      const params = {
        id,
        realName,
        status
      };
      invokeDbClient(this, msg, done, params);
    }
  })

  seneca.add('role:api,model:user,method:delete', function (msg, done) {
    if (validateParameters(msg.args.query, ['id'], done)) {
      const { id } = msg.args.query;
      const params = {
        id
      };
      invokeDbClient(this, msg, done, params);
    }
  })

}