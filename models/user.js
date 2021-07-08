const { DataTypes } = require('sequelize');

<<<<<<< HEAD
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
=======
module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define("User", {
    // Giving the Author model a name of type STRING
    firstName         : DataTypes.STRING,
    lastName          : DataTypes.STRING,
    birthday          : DataTypes.DATEONLY,
    sex               : DataTypes.STRING,
    city              : DataTypes.STRING,
    state             : DataTypes.STRING,
    country           : DataTypes.STRING,
    zipCode           : DataTypes.INTEGER,
    email             : {type: DataTypes.STRING, unique: true},
    phone             : DataTypes.STRING,
    picturePath       : DataTypes.BLOB,
    password          : DataTypes.STRING,
    isActive          : DataTypes.BOOLEAN,
    facebookid        : DataTypes.STRING,
    facebooktoken     : DataTypes.STRING,
    facebookemail     : DataTypes.STRING,
    facebookname      : DataTypes.STRING,
    googleid          : DataTypes.STRING,
    googletoken       : DataTypes.STRING,
    googleemail       : DataTypes.STRING,
    googlename        : DataTypes.STRING,
    windowsliveid     : DataTypes.STRING,
    windowslivetoken  : DataTypes.STRING(1024),
    windowsliveemail  : DataTypes.STRING,
    windowslivename   : DataTypes.STRING  
  }, 
    {
      hooks: {
        beforeCreate: (user) => {
          const salt = bcrypt.genSaltSync();
          user.password = bcrypt.hashSync(user.password, salt);
        }
      }
>>>>>>> 299f28bb65e006f21ad04a98cd8b21cf1b76130b
    }
  );
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password,this.password)  
  }

  User.associate = function(models) {
    User.belongsTo(models.UserRole, {
      foreignKey: {
        allowNull: true
      }
    });

    User.hasMany(models.SalesUserCreditCard, {});
    User.hasMany(models.SalesOrder, {});
    User.hasMany(models.UserPreference, {});
  };

  return User;
};
