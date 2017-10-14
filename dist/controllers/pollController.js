'use strict';

exports.polls = function (req, res) {
  res.render('polls', { title: 'Polls' });
};

exports.my_polls = function (req, res) {
  res.render('my_polls', { title: 'My Polls' });
};