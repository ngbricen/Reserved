module.exports = function(sequelize, DataTypes) {
  const SalesCreditCard = sequelize.define("SalesCreditCard", {
    cardType			    : DataTypes.STRING,
    cardNumber        : DataTypes.INTEGER,
    expMonth          : DataTypes.INTEGER,
    expYear           : DataTypes.INTEGER,
    sortOrder         : DataTypes.INTEGER,
    isActive          : DataTypes.BOOLEAN
  });

  SalesCreditCard.associate = function(models) {
    SalesCreditCard.hasOne(models.SalesUserCreditCard, {});
  };

  return SalesCreditCard;
};

