
const categoryEntity = require('../entitis/categoryEntity');

module.exports = function user() {

  this.add({ role: 'db', model: 'category', method: 'add' }, serviceCallback((msg) => {
    return categoryEntity.add(msg.params);
  }));

  this.add({ role: 'db', model: 'category', method: 'delete' }, serviceCallback((msg) => {
    return categoryEntity.delete(msg.params);
  }));

  this.add({ role: 'db', model: 'category', method: 'update' }, serviceCallback((msg) => {
    return categoryEntity.update(msg.params);
  }));

  this.add({ role: 'db', model: 'category', method: 'list' }, serviceCallback((msg) => {
    return categoryEntity.list(msg.params);
  }));

};

