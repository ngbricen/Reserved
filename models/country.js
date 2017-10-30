module.exports = function(sequelize, DataTypes) {
  const Country = sequelize.define("Country", {
    countryCode       : {type: DataTypes.STRING, primaryKey: true},
    countryName       : DataTypes.STRING,
    sortOrder         : DataTypes.INTEGER,
    isActive          : DataTypes.BOOLEAN
  });

  Country.associate = function(models) {
    Country.hasOne(models.Territory, {foreignKey: 'countryCode'});
    Country.hasOne(models.StateProvince, {foreignKey: 'countryCode'});
  };

  return Country;
};

