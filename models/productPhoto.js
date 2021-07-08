module.exports = function(sequelize, DataTypes) {
  const ProductPhoto = sequelize.define("ProductPhoto", {
    thumbnailPhoto		 		: DataTypes.BLOB,
    thumbnailPhotoFileName : DataTypes.STRING,
    largePhoto		 				: DataTypes.BLOB,
    largePhotoFileName 	 	: DataTypes.STRING,    
    isActive             	: DataTypes.BOOLEAN
  });

  ProductPhoto.associate = function(models) {
    ProductPhoto.hasOne(models.Product, {});
  };

  return ProductPhoto;
};

