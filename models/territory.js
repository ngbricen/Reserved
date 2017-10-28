const bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  const Territory = sequelize.define("Territory", {
    territoryName    	: DataTypes.STRING,
    territoryGroup		: DataTypes.STRING,
    SortOrder         	: DataTypes.INTEGER,
    isActive          	: DataTypes.BOOLEAN
  });

  Territory.associate = function(models) {
    Territory.belongsTo(models.Country, {
      foreignKey: {
        allowNull: true
      }
    });
    Territory.hasOne(models.State, {});
  };

  return Territory;
};

