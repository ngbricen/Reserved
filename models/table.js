const bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  const Table = sequelize.define("Table", {
    tableName    			: DataTypes.STRING,
    tableCode		  		: DataTypes.STRING,
    tableTypeCode	 		: DataTypes.STRING,
    tableNumberSeats	: DataTypes.TINYINT,
    tableXPosition		: DataTypes.DECIMAL,
    tableYPosition		: DataTypes.DECIMAL,
    tableIsVisilble		: DataTypes.BOOLEAN,
    SortOrder         : DataTypes.TINYINT,
    isActive          : DataTypes.BOOLEAN
  });

  return Table;
};

