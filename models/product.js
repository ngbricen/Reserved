const bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  const Product = sequelize.define("Product", {
    productName  				 : DataTypes.STRING,
    ProductCategoryName	 : DataTypes.STRING,
    isActive             : DataTypes.BOOLEAN
  });

  return Product;
};

