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

};