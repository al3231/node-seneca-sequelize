
const db = require('./db');
const User = db.user;
const { Op } = db.Sequelize;

const userEntity = {
  async login(params) {
    const { loginName, password } = params;
    const user = await User.findOne({ where: { userName: loginName } });
    if (user.userName === loginName && user.password === password) {
      return user;
    } else {
      return null;
    }
  },
  async add(params) {
    const { userName } = params;
    const user = await User.findOne({ where: { userName: userName } });
    if (user) {
      throw new Error('用户名存在');
    } else {
      return User.create(params);
    }

  },
  async getList(params) {
    const { pageSize = 10, currentPage = 1, keyword } = params;
    const where = {};
    if (keyword) {
      where[Op.or] = {
        userName: { [Op.substring]: keyword },
        realName: { [Op.substring]: keyword }
      };
    }
    return User.findAndCountAll({
      attributes: {
        exclude: ['password']
      },
      where,
      order: [
        ['createTime', 'DESC']
      ],
      limit: Number(pageSize),
      offset: Number((currentPage - 1) * pageSize)
    })
  }
}

module.exports = userEntity;