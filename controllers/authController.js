const models = require('../models/index');
const dbUser = models.User;
const dbRefreshToken = models.RefreshToken;
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const db = require("../models");
const jwt = require('jsonwebtoken');
const config = require('../config/config.json');

// Defining methods for the usersController
module.exports = {
  authenticate: async function (id = null) {
    if (id === null) {
      console.log('id is', id);
      return dbUser.findAll();
    } else {
      console.log('id in else is', id);
      const user = await getUser(id);
      return basicDetails(user);
    }
  },
  login: async function ({ email, password, ipAddress }) {
    const user = await dbUser.scope('withHash').findOne({
      where: { email },
    });

    if (
      !user ||
      // !account.isVerified ||
      !(await bcrypt.compare(password, user.passwordHash))
    ) {
      throw 'Email or password is incorrect';
    } else {
      console.log('After Comparison');
    }

    // authentication successful so generate jwt and refresh tokens
    const jwtToken = generateJwtToken(user);

    const refreshToken = generateRefreshToken(user, ipAddress);

    // save refresh token
    await refreshToken.save();

    // return basic details and tokens
    return {
      ...basicDetails(user),
      jwtToken,
      refreshToken: refreshToken.token,
    };
  },
  verifyEmail: async function ({ token }) {
    const user = await dbUser.findOne({ where: { verificationToken: token } });

    if (!user) throw 'Verification failed';

    user.verified = Date.now();
    user.verificationToken = null;
    await user.save();
  },
  forgotPassword: async function ({ email }, origin) {
    const user = await dbUser.findOne({ where: { email } });

    // always return ok response to prevent email enumeration
    if (!user) return;

    // create reset token that expires after 1 hours
    user.resetToken = randomTokenString();
    user.resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000);
    await account.save();

    // send email
    // await sendPasswordResetEmail(user, origin);
  },
  authenticate: async function (req, res) {
    db.User.findOne({
      where: {
        email: req.body.email
      }
    }).then(function(user) {
        if (!user) {
          console.log("user not found");
          return res.send({ success: false, token: null, message :'Authentication failed. User not found.' });
        } 
        else {
          // Check if password matches

          if(user.validPassword(req.body.password)){
            console.log("inside validate");

            // Create token if the password matched and no error was thrown
            var token = jwt.sign({data: user}, config.secret, {
              expiresIn: 10080 // in seconds
            });
            // window.localStorage.setItem('token', token);
            return res.status(200).json({ success: true, token: 'JWT ' + token, message: 'Authentication sucessful'});
          }
          else {
            return res.status(401).send({ success: false, token: null, message: 'Authentication failed. Passwords did not match.' });
          }
        } 
      })
      .catch(function(err) {
        if (err) return res.status(500).send('Error on the server.');
      })
  },
  register: async function (req, res) {
    db.User.findOne({
      where: {
        email: req.body.email
      }
    }).then(function(user) {
      if (user){
          return res.json({ success: false, message: req.flash('signupMessage','That email has already been taken')});
      } 
      else{
        db.User.create(req.body)
          .then(function(user) {
            if (!user) {
              return res.json({ success: false, message: req.flash('signupMessage','That email has already been taken')});
            }
            else{
              var token = jwt.sign({data: user}, config.secret, {
                expiresIn: 10080 // in seconds
              });
              return res.status(200).json({ success: true, token: 'JWT ' + token, message: 'Successfully created new user.'});
            }
          })
          .catch(function(error){
              console.log(err);
          });
      }
    }); 
  },
  verifyToken: async function (req, res, next) {
    var token =
      req.params.token ||
      req.body.token ||
      req.query.token ||
      req.headers['x-access-token'];

    console.log(
      req.params.token,
      req.body.token,
      req.query.token,
      req.headers['x-access-token'],
      req.headers['x-auth-token']
    );
    // decode token
    if (token) {
      //Passing in / Reformating the token before decoding
      jwt.verify(
        token.replace('JWT ', ''),
        config.secret,
        function (err, decoded) {
          if (err) {
            console.log('There is an error ' + err);
          } else {
            res.status(200).send({
              success: false,
              _id: decoded.data._id,
              message: 'No token provided.',
            });
          }
        }
      );
    } else {
      // if there is no token
      return res
        .status(403)
        .send({ success: false, _id: null, message: 'No token provided.' });
    }
  },
  revokeToken: async function ({ token, ipAddress }) {
    const refreshToken = await getRefreshToken(token);

    // revoke token and save
    refreshToken.revoked = Date.now();
    refreshToken.revokedByIp = ipAddress;
    await refreshToken.save();
  },
  verifyEmail: async function ({ token }) {
    const account = await db.Account.findOne({
      where: { verificationToken: token },
    });

    if (!account) throw 'Verification failed';

    account.verified = Date.now();
    account.verificationToken = null;
    await account.save();
  },
  refreshToken: async function ({ token, ipAddress }) {
    const refreshToken = await getRefreshToken(token);
    const user = await refreshToken.getUser();

    // replace old refresh token with a new one and save
    const newRefreshToken = generateRefreshToken(user, ipAddress);
    refreshToken.revoked = Date.now();
    refreshToken.revokedByIp = ipAddress;
    refreshToken.replacedByToken = newRefreshToken.token;
    await refreshToken.save();
    await newRefreshToken.save();

    // generate new jwt
    const jwtToken = generateJwtToken(user);

    // return basic details and tokens
    return {
      ...basicDetails(user),
      jwtToken,
      refreshToken: newRefreshToken.token,
    };
  },
  logout: function (req, res) {
    return res.status(200).send({ success: false, token: null, email: null });
  },
};

//Helper Function
function generateJwtToken(user) {
  // create a jwt token containing the account id that expires in 15 minutes
  //Return jsonWebtoken
  const payload = {
    user: {
      id: user.id,
    },
  };

  return jwt.sign(
    payload,
    config.keys.jwtToken,
    { expiresIn: 60 * 60 }
    // (err, token) => {
    //   if (err) throw err;
    //   res.json({ token });
    // }
  );
  // return jwt.sign({ sub: user.id, id: user.id }, config.keys.jwtToken, {
  //   expiresIn: '15m',
  // });
}

async function getUser(id) {
  const user = await dbUser.findByPk(id);
  if (!user) throw 'User not found';
  return user;
}

function randomTokenString() {
  return crypto.randomBytes(40).toString('hex');
}

function generateRefreshToken(user, ipAddress) {
  // create a refresh token that expires in 1 hour
  return new dbRefreshToken({
    userId: user.id,
    token: randomTokenString(),
    expires: new Date(Date.now() + 60 * 60 * 1000),
    createdByIp: ipAddress,
  });
}

function basicDetails(user) {
  const { id, name, email, isActive, createdDate, updatedDate } = user;
  return {
    id,
    name,
    email,
    isActive,
    createdDate,
    updatedDate,
  };
}
