
const db = require('./db');
const Product = db.product;
const { Op } = db.Sequelize;

const userEntity = {
  async add(params) {
    return Product.create(params);
  }
}

module.exports = userEntity;