const bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  const Territory = sequelize.define("Territory", {
    territoryName    	: DataTypes.STRING,
    countryCode		  	: DataTypes.STRING,
    territoryGroup		: DataTypes.STRING,
    SortOrder         	: DataTypes.TINYINT,
    isActive          	: DataTypes.BOOLEAN
  });

  return Territory;
};

