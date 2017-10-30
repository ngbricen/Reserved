const bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  const SalesOrder = sequelize.define("SalesOrder", {
    orderDate         : DataTypes.DATE,
    BookDate   	      : DataTypes.DATE,
    fulfillDate		 		: DataTypes.DATE,
    isOnlineOrder		  : DataTypes.BOOLEAN,
    status            : DataTypes.STRING,
    comments          : DataTypes.STRING,
    terms             : DataTypes.STRING,
    sortOrder         : DataTypes.INTEGER,
    isActive          : DataTypes.BOOLEAN
  });

  SalesOrder.associate = function(models) {
    SalesOrder.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });

    SalesOrder.belongsTo(models.SalesTable, {
      foreignKey: {
        allowNull: false
      }
    });

    SalesOrder.belongsTo(models.SalesPaymentMethod, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return SalesOrder;
};

