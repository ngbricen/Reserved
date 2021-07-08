module.exports = function(sequelize, DataTypes) {
  const SalesPaymentMethod = sequelize.define("SalesPaymentMethod", {
    // Giving the Author model a name of type STRING
    paymentMethodName	: DataTypes.STRING,
    sortOrder         : DataTypes.INTEGER,
    isActive          : DataTypes.BOOLEAN
  });
  
  SalesPaymentMethod.associate = function(models) {
  	SalesPaymentMethod.hasMany(models.SalesOrder, {});

  };

  return SalesPaymentMethod;
};

