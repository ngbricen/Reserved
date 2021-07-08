module.exports = function(sequelize, DataTypes) {
  const SalesUserCreditCard = sequelize.define("SalesUserCreditCard", {
    sortOrder         : DataTypes.INTEGER,
    isActive          : DataTypes.BOOLEAN
  });

  SalesUserCreditCard.associate = function(models) {
    SalesUserCreditCard.belongsTo(models.User, {
      foreignKey: {
        allowNull: true
      }
    });

    SalesUserCreditCard.belongsTo(models.SalesCreditCard, {
      foreignKey: {
        allowNull: true
      }
    });
  };

  return SalesUserCreditCard;
};

