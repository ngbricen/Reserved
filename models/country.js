const bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  const Country = sequelize.define("Country", {
    countryCode       : DataTypes.STRING,
    countryName       : DataTypes.STRING,
    SortOrder         : DataTypes.INTEGER,
    isActive          : DataTypes.BOOLEAN
  });

  Country.associate = function(models) {
    Country.hasOne(models.Territory, {});
    Country.hasOne(models.State, {});
  };

  return Country;
};

