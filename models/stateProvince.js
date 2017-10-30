module.exports = function(sequelize, DataTypes) {
  const StateProvince = sequelize.define("StateProvince", {
    stateProvinceCode : {type: DataTypes.STRING, primaryKey: true},
    stateProvinceName	: DataTypes.STRING,
    isOnlyState				: DataTypes.BOOLEAN,
    sortOrder         : DataTypes.INTEGER,
    isActive          : DataTypes.BOOLEAN
  });

  StateProvince.associate = function(models) {
    StateProvince.belongsTo(models.Country, {
      foreignKey: {
        name: 'countryCode',
        allowNull: false
      }
    });

    StateProvince.belongsTo(models.Territory, {
      foreignKey: {
        name: 'territoryId',
        allowNull: false
      }
    });

    StateProvince.hasMany(models.SalesTaxRate, {foreignKey: 'stateCode'});
  };

  return StateProvince;
};

