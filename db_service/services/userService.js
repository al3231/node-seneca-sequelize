

const userEntity = require('../entitis/userEntity');
const { serviceCallback } = require('../libs/util');

module.exports = function user() {

  this.add({ role: 'db', model: 'user', method: 'login' },
    serviceCallback((msg) => {
      return userEntity.login(msg.params);
    })
  );

  this.add({ role: 'db', model: 'user', method: 'add' },
    serviceCallback((msg) => {
      return userEntity.add(msg.params);
    })
  );

  this.add({ role: 'db', model: 'user', method: 'list' },
    serviceCallback((msg) => {
      return userEntity.getList(msg.params);
    })
  );

};

