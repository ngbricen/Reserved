module.exports = function(sequelize, DataTypes) {
  const SalesTable = sequelize.define("SalesTable", {
    listDate          : DataTypes.DATEONLY,
    bottleQuantity   	: DataTypes.INTEGER,
    listPrice		  		: DataTypes.DECIMAL,
    retailPrice	 		  : DataTypes.DECIMAL,
    status            : DataTypes.STRING,
    comments          : DataTypes.STRING,
    terms             : DataTypes.STRING,
    sortOrder         : DataTypes.INTEGER,
    isActive          : DataTypes.BOOLEAN
  });

  SalesTable.associate = function(models) {
    SalesTable.belongsTo(models.Table, {
      foreignKey: {
        allowNull: false
      }
    });

    SalesTable.hasMany(models.SalesOrder, {});
  };

  return SalesTable;
};

