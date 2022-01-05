const DataTypes = require("sequelize").DataTypes;
const _category = require("./category");
const _product = require("./product");
const _user = require("./user");

function initModels(sequelize) {
  const category = _category(sequelize, DataTypes);
  const product = _product(sequelize, DataTypes);
  const user = _user(sequelize, DataTypes);


  return {
    category,
    product,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
