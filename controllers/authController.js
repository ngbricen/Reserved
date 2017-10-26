const dbUser = require("../models/user");
const jwt = require('jsonwebtoken');
const config = require("../config/index");
const passport = require('passport');

// Defining methods for the usersController
module.exports = {
  authenticate: function(req, res) {
    dbUser.findOne({
      email: req.body.email
      }, 
      function(err, user) {
        if (err) return res.status(500).send('Error on the server.');
        
        if (!user) {
          console.log("user not found");
          return res.send({ success: false, token: null, message: 'Authentication failed. User not found.' });
        } 
        else {
          // Check if password matches
          user.comparePassword(req.body.password, function(err, isMatch) {
            if (isMatch && !err) {
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
          });
        }
      });    
  },
  register: function(req, res) {
    dbUser
      .create(req.body, function(err, user) {
        if (err) {
          return res.json({ success: false, message: 'That email address already exists.'});
        }
        else{
          console.log(user);
          var token = jwt.sign({data: user}, config.secret, {
            expiresIn: 10080 // in seconds
          });
          return res.status(200).json({ success: true, token: 'JWT ' + token, message: 'Successfully created new user.'});
        }
      }); 
  },
  verifyToken: function(req, res, next) {
    var token = req.params.token || req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {
      //Passing in / Reformating the token before decoding
      jwt.verify(token.replace("JWT ",""), config.secret, function(err, decoded) {
       if(err){
           console.log('There is an error ' + err)
       }else{
        console.log(decoded.data._id);
        res.status(200).send({ success: false, _id: decoded.data._id, message: 'No token provided.' });
       }
      })
    } else {
      // if there is no token
      return res.status(403).send({success: false, _id: null, message: 'No token provided.'});
    }
  },
  logout: function(req, res){
    return res.status(200).send({ success: false, token: null, email: null });
  }
};