module.exports = function(db) {

	db.UserRole.create({
    userRoleName: 'Admin',
    isActive: true
  });

	db.UserRole.create({
    userRoleName: 'User',
    isActive: true
  });

  db.User.create({
    firstName: 'Brice',
    lastName: 'Nguoghia',
    email: 'bricen@gmail.com',
    UserRoleId: 1
  });

  db.UserPreferenceType.create({
    userPreferenceName: 'Venue',
    isActive: true
  });

  db.UserPreferenceType.create({
    userPreferenceName: 'Table',
    isActive: true
  });

  db.UserPreferenceType.create({
    userPreferenceName: 'Product',
    isActive: true
  });

  db.UserPreferenceType.create({
    userPreferenceName: 'Bundle',
    isActive: true
  });    

};