const config = require('./config.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {
  // create db if it doesn't already exist
  const { host, port, username, password, database } = config.production;

  const connection = await mysql.createConnection({
    host,
    port,
    user: username,
    password,
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

  // connect to db
  const sequelize = new Sequelize(database, username, password, {
    dialect: 'mysql', raw: true, force: true
  });

  // init models and add them to the exported db object
  db.User = require('../models/user.js')(sequelize);
  db.RefreshToken = require('../models/refreshToken.js')(sequelize);
  db.Post = require('../models/post.js')(sequelize);

  // define relationships
  // db.User.hasMany(db.RefreshToken, { onDelete: 'CASCADE' });
  // db.RefreshToken.belongsTo(db.User, { onDelete: 'CASCADE' });

  // sync all models with database
  await sequelize.sync().then(function() {
    require('../scripts/seeds')(db);
  });
  // await sequelize
  //   .query('SET FOREIGN_KEY_CHECKS = 0', { raw: true })
  //   .then(function () {
  //     return sequelize.sync({
  //       force: true,
  //     });
  //   })
  //   .then(function () {
  //     return sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
  //   })
  //   .then(
  //     function () {
  //       console.log('Database synchronised.');
  //     },
  //     function (err) {
  //       console.log(err);
  //     }
  //   );
}
