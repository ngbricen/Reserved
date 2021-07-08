module.exports = function(sequelize, DataTypes) {
  const SalesCurrency = sequelize.define("SalesCurrency", {
    currencyCode			: DataTypes.STRING,
    currencyName			: DataTypes.STRING,
    sortOrder         : DataTypes.INTEGER,
    isActive          : DataTypes.BOOLEAN
  });

  return SalesCurrency;
};

