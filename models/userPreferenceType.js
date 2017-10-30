const bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  const UserPreferenceType = sequelize.define("UserPreferenceType", {
    userPreferenceName   : DataTypes.STRING,
    isActive             : DataTypes.BOOLEAN
  });

  UserPreferenceType.associate = function(models) {
    UserPreferenceType.hasOne(models.UserPreference, {});
  };

  return UserPreferenceType;
};

