const dayjs = require("dayjs");
const { validataSession, succeedJson, errorJson, codes } = require('./util');

module.exports = function userApi(seneca) {
  seneca.add('role:api,module:user,method:list', function (msg, done) {
    this.client({ type: 'tcp', pin: 'role:db' }).act('role:db,table:user,cmd:list', (err, rst) => {
      if (err) {
        done(null, errorJson(err));
      }
      const { data } = rst;
      done(null, succeedJson(data))
    });
  })

  seneca.add('role:api,module:user,method:add', function (msg, done) {
    const { userName, realName, password } = msg.args.query;
    const params = {
      userName,
      realName,
      password,
      createTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
    };

    this.client({ type: 'tcp', pin: 'role:db' }).act('role:db,table:user,cmd:add', { params }, (err, rst) => {
      if (err) {
        done(null, errorJson(err));
      }
      const { data } = rst;
      done(null, succeedJson(data))
    });
  })

}