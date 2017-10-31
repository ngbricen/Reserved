const JwtStrategy = require('passport-jwt').Strategy;  
const ExtractJwt = require('passport-jwt').ExtractJwt;  
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy  = require('passport-twitter').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');  
const config = require('./index');
const configAuth = require('./auth');

// Setup work and export for the JWT passport strategy
module.exports = function(passport) {  
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = config.secret;
  
  // Transform Facebook profile because Facebook and Google profile objects look different
  // and we want to transform them into user objects that have the same set of attributes
  const transformFacebookProfile = (profile) => ({
    name: profile.name,
    avatar: profile.picture.data.url,
  });

  // Transform Google profile into user object
  const transformGoogleProfile = (profile) => ({
    name: profile.displayName,
    avatar: profile.image.url,
  });

  // Register Facebook Passport strategy
  // passport.use(new FacebookStrategy(configAuth.facebookAuth,
  //   // Gets called when user authorizes access to their profile
  //   async (accessToken, refreshToken, profile, done)
  //     // Return done callback and pass transformed user object
  //     => { done(null, transformFacebookProfile(profile._json))};
  // ));

  // // Register Google Passport strategy
  // passport.use(new GoogleStrategy(configAuth.googleAuth,
  //   async (accessToken, refreshToken, profile, done)
  //     => done(null, transformGoogleProfile(profile._json));
  // ));

  //Define a passport strategy
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.id}, function(err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        done(null, user);
      } else {
        done(null, false, req.flash('signupMessage','That email has already been taken'));
      }
    });
  }));

  // Serialize user into the sessions
  passport.serializeUser(function(user, done) {
    console.log("serializing " + user.id);
    done(null, user.id);
  });

  // Deserialize user from the sessions
  passport.deserializeUser(function(id, done) {
    console.log("deserializing " + obj);
    User.findById(id, function(err,user){
      done(err, user);  
    })
    
  });

};