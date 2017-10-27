const bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  const ProductCategory = sequelize.define("ProductCategory", {
    productCategoryName  : DataTypes.STRING,
    isLiquor						 : DataTypes.BOOLEAN,
    isActive             : DataTypes.BOOLEAN
  });

  return ProductCategory;
};

