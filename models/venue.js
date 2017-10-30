const bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  const Venue = sequelize.define("Venue", {
    venueName    	  : DataTypes.STRING,
    venueAddress1     : DataTypes.STRING,
    venueAddress2     : DataTypes.STRING,
    venueCity		  : DataTypes.STRING,
    venueState		  : DataTypes.STRING,
    venuezipCode      : DataTypes.INTEGER,
    venueCountry      : DataTypes.STRING,
    venueURL          : DataTypes.STRING,
    venueLinkedIn     : DataTypes.STRING,
    venueTwitter      : DataTypes.STRING,
    venueInstagram    : DataTypes.STRING,
    venueSnapchat     : DataTypes.STRING,
    venueVerified     : DataTypes.STRING,
    venueVerifiedBy   : DataTypes.STRING,
    venueVerifiedDate : DataTypes.DATE,
    sortOrder         : DataTypes.INTEGER,
    isActive          : DataTypes.BOOLEAN
  });

  return Venue;
};

