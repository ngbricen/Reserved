const bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  const Product = sequelize.define("Product", {
    productName  				 : DataTypes.STRING,
    isActive             : DataTypes.BOOLEAN
  });

  Product.associate = function(models) {
    Product.belongsTo(models.ProductPhoto, {
      foreignKey: {
        allowNull: true
      }
    });

    Product.belongsTo(models.ProductCategory, {
      foreignKey: {
        allowNull: true
      }
    });
  };


  return Product;
};

