const productEntity = require('../entitis/productEntity');
const { serviceCallback } = require('../libs/util');
module.exports = function user() {

  this.add({ role: 'db', model: 'product', method: 'add' }, serviceCallback((msg) => {
    return productEntity.add(msg.params);
  }));

  this.add({ role: 'db', model: 'product', method: 'delete' }, serviceCallback((msg) => {
    return productEntity.delete(msg.params);
  }));

  this.add({ role: 'db', model: 'product', method: 'update' }, serviceCallback((msg) => {
    return productEntity.update(msg.params);
  }));

  this.add({ role: 'db', model: 'product', method: 'list' }, serviceCallback((msg) => {
    return productEntity.getList(msg.params);
  }));

  this.add({ role: 'db', model: 'product', method: 'getListByCategoryId' }, serviceCallback((msg) => {
    return productEntity.getListByCategoryId(msg.params);
  }));

};
