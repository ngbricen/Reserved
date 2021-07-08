module.exports = function(sequelize, DataTypes) {
  const Table = sequelize.define("Table", {
    tableName    			: DataTypes.STRING,
    tableCode		  		: DataTypes.STRING,
    tableTypeCode	 		: DataTypes.STRING,
    tableNumberSeats	: DataTypes.INTEGER,
    tableXPosition		: DataTypes.DECIMAL,
    tableYPosition		: DataTypes.DECIMAL,
    tableIsVisilble		: DataTypes.BOOLEAN,
    sortOrder         : DataTypes.INTEGER,
    isActive          : DataTypes.BOOLEAN
  });

  Table.associate = function(models) {
    Table.belongsTo(models.TableType, {
      foreignKey: {
        allowNull: false
      }
    });

    Table.belongsTo(models.Venue, {
      foreignKey: {
        allowNull: false
      }
    });

    Table.hasMany(models.SalesTable, {});
    Table.hasMany(models.UserPreference, {});

  };

  return Table;
};

