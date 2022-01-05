
const db = require('./db');
const Product = db.product;
const { Op } = db.Sequelize;

const userEntity = {
  async add(params) {
    return Product.create(params);
  },
  async getList() {
    return Product.findAll();
  }
}

module.exports = userEntity;