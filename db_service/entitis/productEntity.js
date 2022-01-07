
const db = require('./db');
const Product = db.product;
const { Op } = db.Sequelize;

const userEntity = {
  add(params) {
    const { categoryId, productName } = params;
    if (!categoryId || !productName) {
      throw new Error('参数错误');
    }
    return Product.create(params);
  },
  async delete(params) {
    const { id } = params;
    if (!id) {
      throw new Error('参数错误');
    }
    const count = await Product.destroy({
      where: {
        id: id
      }
    })
  },
  async update(params) {
    const { id, ...update } = params;
    if (!id) {
      throw new Error('参数错误');
    }
    const [count] = await Product.update(update, {
      where: {
        id: id
      }
    })
    return count;
  },
  getList(params) {
    const { pageSize = 10, currentPage = 1 } = params;
    return Product.findAndCountAll({
      order: [
        ['createdAt', 'DESC']
      ],
      limit: Number(pageSize),
      offset: Number((currentPage - 1) * pageSize)
    });
  },
  getListByCategoryId(params) {
    const { categoryId } = params;
    return Product.findAll({
      where: {
        categoryId: categoryId
      }
    })
  }
}

module.exports = userEntity;