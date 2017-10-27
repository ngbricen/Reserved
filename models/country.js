const bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  const Country = sequelize.define("Country", {
    countryCode       : DataTypes.STRING,
    countryName       : DataTypes.STRING,
    SortOrder         : DataTypes.TINYINT,
    isActive          : DataTypes.BOOLEAN
  });

  return Country;
};

