'use strict';

exports.index = function (req, res) {
  res.render('index', { title: 'Voting App', message: 'Voting App', user: req.user });
};

exports.profile = function (req, res) {
  res.render('profile', {
    // get the user out of session and pass to template
    user: req.user
  });
};

exports.logout = function (req, res) {
  req.logout();
  res.redirect('/');
};