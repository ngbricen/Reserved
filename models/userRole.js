const bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  const UserRole = sequelize.define("UserRole", {
    userRoleName         : DataTypes.STRING,
    isActive             : DataTypes.BOOLEAN
  });

  return UserRole;
};

