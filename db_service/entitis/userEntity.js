
const db = require('./db');
const User = db.user;
const { Op } = db.Sequelize;

const userEntity = {
  async add(params) {
    return User.create(params);
  }
}

module.exports = userEntity;