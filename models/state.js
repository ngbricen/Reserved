const bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  const State = sequelize.define("State", {
    // Giving the Author model a name of type STRING
    stateCode       	: DataTypes.STRING,
    stateName					: DataTypes.STRING,
    isOnlyState				: DataTypes.BOOLEAN,
    SortOrder         : DataTypes.INTEGER,
    isActive          : DataTypes.BOOLEAN
  });

  State.associate = function(models) {
    State.belongsTo(models.Country, {
      foreignKey: {
        allowNull: false
      }
    });

    State.belongsTo(models.Territory, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return State;
};

