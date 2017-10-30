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
    email             : DataTypes.STRING,
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
      classMethods: {
        generateHash : function(password) {
          return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
        },      
      },
        instanceMethods: {      
        validPassword : function(password) {
          return bcrypt.compareSync(password, this.localpassword);
        }
      }
    }
  );

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

