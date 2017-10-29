module.exports = function(sequelize, DataTypes) {
  const Territory = sequelize.define("Territory", {
    territoryName    	  : DataTypes.STRING,
    territoryGroup		  : DataTypes.STRING,
    sortOrder         	: DataTypes.INTEGER,
    isActive          	: DataTypes.BOOLEAN
  });

  Territory.associate = function(models) {
    Territory.belongsTo(models.Country, {
      foreignKey: {
        name: 'countryCode',
        allowNull: false
      }
    });
    Territory.hasOne(models.StateProvince, {foreignKey: 'territoryId'});
  };

  return Territory;
};

