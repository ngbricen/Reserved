module.exports = function(sequelize, DataTypes) {
  const ProductCategory = sequelize.define("ProductCategory", {
    productCategoryName  : DataTypes.STRING,
    isLiquor						 : DataTypes.BOOLEAN,
    isActive             : DataTypes.BOOLEAN
  });

	ProductCategory.associate = function(models) {
    ProductCategory.hasOne(models.Product, {});
  };

  return ProductCategory;
};

