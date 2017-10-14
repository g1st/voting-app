// oauth authentication handled with help at https://scotch.io/amp/tutorials/easy-node-authentication-setup-and-local

const LocalStrategy = require('passport-local').Strategy;

// load up the user model
const User = require('../models/user');

module.exports = (passport) => {
  // passport needs ability to serialize and unserialize users out of session
  // used to serialize the user for the session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy(
    {
      passReqToCallback: true, // allows to pass back the entire request to the callback
    }, (req, username, password, done) => {
      // asynchronous
      // User.findOne wont fire unless data is sent back
      process.nextTick(() => {
      // find a user whose username is the same as the forms username
      // we are checking to see if the user trying to login already exists
        User.findOne({ username }, (err, user) => {
          // if there are any errors, return the error
          if (err) return done(err);

          // check to see if theres already a user with that username
          if (user) {
            // req.flash is the way to set flashdata using connect-flash
            // create the loginMessage and save it to session as flashdata
            return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
          }

          // if there is no user with that username
          // create the user
          const newUser = new User();

          // set the user's local credentials
          newUser.username = username;
          // hash the password
          newUser.password = newUser.generateHash(password);

          // save the user
          newUser.save((err) => {
            if (err) throw err;
            return done(null, newUser);
          });
        });
      });
    }));

  passport.use('local-login', new LocalStrategy(
    {
      passReqToCallback: true,
    }, (req, username, password, done) => { // callback with username and password from our form
      User.findOne({ username }, (err, user) => {
        process.nextTick(() => {
        // if there are any errors, return the error before anything else
          if (err) return done(err);

          // if no user is found, return the message
          if (!user) {
            return done(null, false, req.flash('loginMessage', 'No user found.'));
          }

          // if the user is found but the password is wrong
          if (!user.validPassword(password)) {
            return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
          }
          // all is well, return successful user
          return done(null, user);
        });
      });
    }));
};
