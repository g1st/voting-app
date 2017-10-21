'use strict';

var passport = require('passport');

exports.login_get = function (req, res) {
  res.render('login', { title: 'Login', message: req.flash('loginMessage') });
};

exports.login_post = passport.authenticate('local-login', {
  successRedirect: '/', // redirect to the secure profile section
  failureRedirect: '/oauth/login', // redirect back to the signup page if there is an error
  failureFlash: true // allow flash messages
});

exports.signup_get = function (req, res) {
  res.render('signup', { title: 'Signup', message: req.flash('signupMessage') });
};

exports.signup_post = passport.authenticate('local-signup', {
  successRedirect: '/',
  failureRedirect: '/oauth/register',
  failureFlash: true
});