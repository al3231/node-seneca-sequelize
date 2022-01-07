const db = require('./db');
const Category = db.category;
const { Op } = db.Sequelize;


const categoryEntity = {
  add(params) {
    return Category.create(params);
  },
  async delete(params) {
    const { id } = params;
    if (!id) {
      throw new Error('参数错误');
    }

    const product = await db.products.findOne({
      where: {
        categoryId: id
      }
    });

    if (product) {
      throw new Error('该分类存在项目');
    }

    const count = await Category.destroy({
      where: {
        id: id
      }
    })
    return count;
  },
  async update(params) {
    const { id, ...update } = params;
    if (!id) {
      throw new Error('参数错误');
    }
    const [count] = await Category.update(update, {
      where: {
        id: id
      }
    })

    return count;
  },
  list() {
    return Category.findAll();
  }
}

module.exports = categoryEntity;