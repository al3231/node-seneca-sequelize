

const userEntity = require('../entitis/userEntity');

module.exports = function user() {

  this.add({ role: 'db', model: 'user', method: 'login' }, async (msg, done) => {
    try {
      const rst = await userEntity.login(msg.params);
      done(null, { data: rst });
    } catch (err) {
      done(err);
    }
  });

  this.add({ role: 'db', model: 'user', method: 'add' }, async (msg, done) => {
    try {
      const rst = await userEntity.add(msg.params);
      done(null, { data: rst });
    } catch (err) {
      done(err);
    }
  });

  this.add({ role: 'db', model: 'user', method: 'list' }, async (msg, done) => {
    try {
      const rst = await userEntity.getList(msg.params);
      done(null, { data: rst });
    } catch (err) {
      done(err);
    }
  });

};

