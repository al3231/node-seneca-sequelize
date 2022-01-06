const productEntity = require('../entitis/productEntity');

module.exports = function user() {

  this.add({ role: 'db', model: 'product', method: 'add' }, async (msg, done) => {
    try {
      const rst = await productEntity.add(msg.params);
      done(null, { data: rst });
    } catch (err) {
      done(err);
    }

  });

};
