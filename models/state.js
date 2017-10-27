const bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  const State = sequelize.define("State", {
    // Giving the Author model a name of type STRING
    stateCode       	: DataTypes.STRING,
    stateName					: DataTypes.STRING,
    countryCode		  	: DataTypes.STRING,
    territoryCode		 	: DataTypes.STRING,
    isOnlyState				: DataTypes.BOOLEAN,
    SortOrder         : DataTypes.TINYINT,
    isActive          : DataTypes.BOOLEAN
  });

  return State;
};

