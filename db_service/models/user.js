const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return user.init(sequelize, DataTypes);
}

class user extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userName: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'user_name'
    },
    realName: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'real_name'
    },
    password: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    createTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'create_time'
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'user',
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
