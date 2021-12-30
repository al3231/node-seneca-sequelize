
const categoryEntity = require('../entitis/categoryEntity');

module.exports = function user() {

  this.add({ role: 'db', add: 'category' }, async (msg, done) => {
    try {
      const rst = await categoryEntity.add(msg.params);
      done(null, { data: rst });
    } catch (err) {
      done(err);
    }

  });

};

