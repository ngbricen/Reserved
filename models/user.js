const bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define("User", {
    // Giving the Author model a name of type STRING
    localemail        : DataTypes.STRING,
    localpassword     : DataTypes.STRING,
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

  return User;
};

