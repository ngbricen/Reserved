const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
  const User = sequelize.define(
    'User',
    {
      // Giving the Author model a name of type STRING
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      avatar: { type: DataTypes.STRING},
      passwordHash: { type: DataTypes.STRING, allowNull: false },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 1,
      },
      verificationToken: { type: DataTypes.STRING },
      verified: { type: DataTypes.DATE },
      resetToken: { type: DataTypes.STRING },
      resetTokenExpires: { type: DataTypes.DATE },
      passwordReset: { type: DataTypes.DATE },
      createdDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      deletedDate: DataTypes.DATE,
    },
    {
      timestamps: false,
      defaultScope: {
        // exclude password hash by default
        attributes: { exclude: ['passwordHash'] },
      },
      scopes: {
        // include hash with this scope
        withHash: { attributes: {} },
      },
    }
  );

  return User;
};
