const bcrypt = require('bcrypt');

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

