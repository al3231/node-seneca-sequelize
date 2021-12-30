

const userEntity = require('../entitis/userEntity');

module.exports = function user() {

  this.add({ role: 'db', add: 'user' }, async (msg, done) => {
    try {
      const rst = await userEntity.add(msg.params);
      done(null, { data: rst });
    } catch (err) {
      done(err);
    }
  });

};

