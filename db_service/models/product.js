const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return product.init(sequelize, DataTypes);
}

class product extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    productName: {
      type: DataTypes.STRING(200),
      allowNull: true,
      field: 'product_name'
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'category_id'
    },
    description: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    remainAmount: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'remain_amount'
    },
    saleAmount: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'sale_amount'
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    createTime: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'create_time'
    },
    updateTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'update_time'
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'product',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
