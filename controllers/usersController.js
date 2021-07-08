const models = require('../models/index');
const dbUser = models.User;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config.json');

//Helper method
async function hash(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

// Defining methods for the usersController
module.exports = {
  findById: function (req, res) {
    dbUser
      .findById(req.params.id)
      .then((user) => res.json(user))
      .catch((err) => res.status(422).json(err));
  },
  findAll: async function (req, res) {
    dbUser
      .findAll({
        order: [['createdDate', 'DESC']],
      })
      // models.sequelize
      // .query('CALL GET_USERS();')
      .then((users) => {
        res.json(users);
      })
      .catch((err) => res.status(422).json(err));
  },
  update: function (req, res) {
    dbUser
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((user) => res.json(userS))
      .catch((err) => res.status(422).json(err));
  },
  register: async function (params, origin) {
    // validate
    if (await dbUser.findOne({ where: { email: params.email } })) {
      // send already registered error in email to prevent account enumeration
      //return await sendAlreadyRegisteredEmail(params.email, origin);
      console.log('Already Exists');
      throw 'Email Already Exists';
    }

    // create account object
    const user = new models.User(params);

    // first registered account is an admin
    // const isFirstAccount = (await db.Account.count()) === 0;
    // account.role = isFirstAccount ? Role.Admin : Role.User;
    account.verificationToken = randomTokenString();

    // hash password
    user.passwordHash = await hash(params.password);

    // save account
    await user.save();

    // send email
    // await sendVerificationEmail(account, origin);
  },
  create: async function (params) {
    // validate
    if (await dbUser.findOne({ where: { email: params.email } })) {
      throw 'Email "' + params.email + '" is already registered';
    }

    const user = new dbUser(params);
    user.verified = Date.now();

    // hash password
    user.passwordHash = await hash(params.password);

    // save user
    await user.save();

    return basicDetails(user);
  },
  update: async function (id, params) {
    const user = await getUser(id);

    // validate (if email was changed)
    if (
      params.email &&
      user.email !== params.email &&
      (await dbUser.findOne({ where: { email: params.email } }))
    ) {
      throw 'Email "' + params.email + '" is already taken';
    }

    // hash password if it was entered
    if (params.password) {
      params.passwordHash = await hash(params.password);
    }

    // copy params to user and save
    Object.assign(user, params);
    user.updated = Date.now();
    await user.save();

    return basicDetails(user);
  },
  deleteUser: async function (id) {
    const user = await getUser(id);
    await user.destroy();
  },
};
