const db = require('./db');
const Category = db.category;
const { Op } = db.Sequelize;

const categoryEntity = {
  async add(params) {
    return Category.create(params);
  }
}

module.exports = categoryEntity;