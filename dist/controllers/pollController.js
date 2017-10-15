'use strict';

var Poll = require('../models/poll');

exports.polls = function (req, res) {
  res.render('polls', { title: 'Polls', user: req.user });
};

exports.my_polls = function (req, res) {
  res.render('my_polls', { title: 'My Polls', user: req.user });
};

exports.get_new_poll = function (req, res) {
  res.render('new_poll', { title: 'Create new poll', user: req.user });
};

exports.post_new_poll = function (req, res) {
  var poll = new Poll();

  var IP = req.headers["x-forwarded-for"] || req.connection.remoteAddress.split(',')[0];
  var userChoices = req.body.choices.split(',');

  poll.title = req.body.title;
  poll.creator = req.user.username;
  poll.votedIPs.push(IP);

  userChoices.forEach(function (label) {
    poll.data.push({ label: label });
  });

  poll.save().then(function () {
    res.render('my_polls', { title: 'My Polls', user: req.user });
  });
};