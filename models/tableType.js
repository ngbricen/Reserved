const bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  const TableType = sequelize.define("TableType", {
    tableTypeName			: DataTypes.STRING,
    SortOrder         : DataTypes.INTEGER,
    isActive          : DataTypes.BOOLEAN
  });

	TableType.associate = function(models) {
    TableType.hasOne(models.Table, {});
  };

  return TableType;
};

