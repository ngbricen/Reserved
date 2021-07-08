const bcrypt = require('bcryptjs');
//const bcrypt = require('bcryptjs');

module.exports = function (db) {
  const password = bcrypt.hashSync('1234', 10);
  const user = new db.User({
    name: 'Brice Nguoghia',
    email: 'bricen@gmail.com',
    passwordHash: password,
  });

  // user.passwordHash = hash(person.password);
  user.save();

  const password2 = bcrypt.hashSync('1234', 10);
  const user2 = new db.User({
    name: 'John Doe',
    email: 'bricen@doe.com',
    passwordHash: password2,
  });
  user2.save();

  const password3 = bcrypt.hashSync('1234', 10);
  const user3 = new db.User({
    name: 'Brice Long',
    email: 'bricen@long.com',
    passwordHash: password3,
  });
  user3.save();

  const post1 = new db.Post({
    email: 'bricen@gmail3.com',
    text: 'First Comment',
  });
  post1.save();

  const post2 = new db.Post({
    email: 'bricen@gmail.com',
    name: 'Brice Nguoghia',
    userId: 1,
    text: 'Second Comment',
  });
  post2.save();

  const post3 = new db.Post({
    email: 'bricen@gmail.com',
    name: 'Brice Nguoghia',
    userId: 1,
    text: 'Third Comment',
  });
  post3.save();

  const post4 = new db.Post({
    email: 'bricen@doe.com',
    name: 'John Doe',
    userId: 2,
    text: 'Fourth Comment',
  });
  post4.save();  
};
