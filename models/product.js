module.exports = function(sequelize, DataTypes) {
  const Product = sequelize.define("Product", {
    productName  				 : DataTypes.STRING,
    quantityInStock      : DataTypes.INTEGER,
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

    Product.hasMany(models.SalesOrderDetails, {});
  };


  return Product;
};

