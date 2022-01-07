
const db = require('./db');
const User = db.user;
const { Op } = db.Sequelize;

const userEntity = {
  async login(params) {
    const { loginName, password } = params;
    if (!loginName || !password) {
      throw new Error('请输入用户名密码');
    }
    const user = await User.findOne({ where: { userName: loginName } });
    if (user.userName === loginName && user.password === password) {
      return user;
    } else {
      throw new Error('用户名密码不正确');
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
  async delete(params) {
    const { id } = params;
    if (!id) {
      throw new Error('参数错误');
    }
    const count = User.destroy({
      where: {
        id: id
      }
    })
    return count;
  },
  async update(params) {
    const { id, loginName, ...update } = params;
    if (!id) {
      throw new Error('参数错误');
    }
    const [count] = await User.update(update, {
      where: {
        id: id
      }
    })
    return count;
  },
  getList(params) {
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