module.exports = function(sequelize, DataTypes) {
  const SalesTaxRate = sequelize.define("SalesTaxRate", {
    taxType 			    : DataTypes.STRING,
    taxRate           : DataTypes.DECIMAL,
    taxName           : DataTypes.STRING
  });

  SalesTaxRate.associate = function(models) {
    SalesTaxRate.hasOne(models.SalesUserCreditCard, {});
    SalesTaxRate.belongsTo(models.StateProvince, {
      foreignKey: {
        name: 'stateProvinceCode',
        allowNull: true
      }
    });
  };

  return SalesTaxRate;
};

