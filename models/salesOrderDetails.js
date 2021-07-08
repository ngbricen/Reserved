module.exports = function(sequelize, DataTypes) {
  const SalesOrderDetails = sequelize.define("SalesOrderDetails", {
    isIncludedInTable : DataTypes.BOOLEAN,
    quantityOrdered   : DataTypes.INTEGER,
    price     	 		  : DataTypes.DECIMAL,
    orderLineNumber   : DataTypes.INTEGER
  });

  SalesOrderDetails.associate = function(models) {
    SalesOrderDetails.belongsTo(models.SalesOrder, {
      foreignKey: {
        allowNull: false
      }
    });

    SalesOrderDetails.belongsTo(models.Product, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return SalesOrderDetails;
};

