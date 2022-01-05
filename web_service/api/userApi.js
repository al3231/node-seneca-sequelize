const dayjs = require("dayjs");
const { validateParameters, apiCallBack, handleError, handleSuccess, codes } = require('../libs/api');
const md5 = require('blueimp-md5');
const env = process.env.NODE_ENV || 'development';
const debugConf = require('../config/debug');


module.exports = function userApi(seneca) {
  seneca.add('role:api,module:user,method:login', function (msg, done) {
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
        done(null, handleError('验证码不正确', msg, codes.LOGIN_ERROR));
        return;
      }
      const params = {
        loginName,
        password: md5(`${loginName}${password}`)
      }
      this.client({ type: 'tcp', pin: 'role:db' }).act('role:db,table:user,cmd:login', { params }, (err, rst) => {
        if (err) {
          console.log(err);
          done(null, handleError(err));
          return;
        }
        if (!err && rst.data === null) {
          done(null, handleError('用户名密码不正确', msg, codes.LOGIN_ERROR));
          return;
        }
        const {
          id,
          userName,
          realName,
        } = rst.data;
        // 这里要获取用户Token
        const token = req.sessionID;
        req.session.token = token;
        const data = {
          id,
          userName,
          realName,
          token
        };
        done(null, handleSuccess(data, msg));

      });
    }

  })


  seneca.add('role:api,module:user,method:list', function (msg, done) {
    if (validateParameters(msg.args.query, ['pageSize', 'currentPage'], done)) {
      const { pageSize, currentPage, keyword } = msg.args.query;
      const params = {
        pageSize,
        currentPage,
        keyword
      }
      this.client({ type: 'tcp', pin: 'role:db' }).act('role:db,table:user,cmd:list', { params }, (err, rst) => {
        const json = apiCallBack(err, rst, msg);
        done(null, json);
      });
    }

  })

  seneca.add('role:api,module:user,method:add', function (msg, done) {
    if (validateParameters(msg.args.query, ['userName', 'realName', 'password'], done)) {
      const { userName, realName, password } = msg.args.query;
      const params = {
        userName,
        realName,
        password: md5(`${userName}${password}`),
        createTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
      };
      this.client({ type: 'tcp', pin: 'role:db' }).act('role:db,table:user,cmd:add', { params }, (err, rst) => {
        done(null, apiCallBack(err, rst, msg));
      });
    }
  })

}