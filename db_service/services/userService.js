

const userEntity = require('../entitis/userEntity');

module.exports = function user() {

  this.add({ role: 'db', table: 'user', cmd: 'add' }, async (msg, done) => {
    try {
      const rst = await userEntity.add(msg.params);
      done(null, { data: rst });
    } catch (err) {
      done(err);
    }
  });

  this.add({ role: 'db', table: 'user', cmd: 'list' }, async (msg, done) => {
    try {
      const rst = await userEntity.getList();
      done(null, { data: rst });
    } catch (err) {
      done(err);
    }
  });

};

