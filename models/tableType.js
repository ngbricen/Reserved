const bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  const TableType = sequelize.define("TableType", {
    tableTypeName			: DataTypes.STRING,
    SortOrder         : DataTypes.TINYINT,
    isActive          : DataTypes.BOOLEAN
  });

  return TableType;
};

