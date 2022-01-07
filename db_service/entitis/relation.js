module.exports = (models) => {
  models.category.hasMany(models.product, { foreignKey: 'categroyId' });
  models.product.belongsTo(models.category);
};