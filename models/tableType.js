module.exports = function(sequelize, DataTypes) {
  const TableType = sequelize.define("TableType", {
    tableTypeName			: DataTypes.STRING,
    sortOrder         : DataTypes.INTEGER,
    isActive          : DataTypes.BOOLEAN
  });

	TableType.associate = function(models) {
    TableType.hasOne(models.Table, {});
  };

  return TableType;
};

