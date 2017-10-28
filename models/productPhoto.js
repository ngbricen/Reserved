const bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  const ProductPhoto = sequelize.define("ProductPhoto", {
    thumbnailPhoto		 		: DataTypes.STRING,
    thumbnailPhotoFileName : DataTypes.STRING,
    largePhoto		 				: DataTypes.STRING,
    largePhotoFileName 	 	: DataTypes.STRING,    
    isActive             	: DataTypes.STRING
  });

  return ProductPhoto;
};

