const bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  const UserPreference = sequelize.define("UserPreference", {
    // Giving the Author model a name of type STRING
    priorityId         : DataTypes.INTEGER,
    bundleId           : DataTypes.INTEGER, 
    day                : DataTypes.STRING 
  });

  UserPreference.associate = function(models) {
    UserPreference.belongsTo(models.User, {
      foreignKey: {
        allowNull: true
      }
    });

    UserPreference.belongsTo(models.UserPreferenceType, {
      foreignKey: {
        allowNull: true
      }
    });

    UserPreference.belongsTo(models.Venue, {
      foreignKey: {
        allowNull: true
      }
    });

    UserPreference.belongsTo(models.Table, {
      foreignKey: {
        allowNull: true
      }
    });
    
    UserPreference.belongsTo(models.Product, {
      foreignKey: {
        allowNull: true
      }
    });
  };

  return UserPreference;
};

