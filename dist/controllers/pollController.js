'use strict';

var Poll = require('../models/poll');

exports.polls = function (req, res) {
  res.render('polls', { title: 'Polls', user: req.user });
};

exports.poll = function (req, res) {
  Poll.find({ _id: req.params.id }).select('_id creator title data votedIPs').then(function (poll) {
    return res.render('poll', { title: poll.title, user: req.user, poll: poll[0] });
  });
};

exports.my_polls = function (req, res) {
  Poll.find({ creator: req.user.username }).select('_id creator title data votedIPs').then(function (polls) {
    if (polls.length > 0) {
      return res.render('my_polls', { title: 'My Polls', user: req.user, polls: polls });
    }
    return res.render('my_polls', { title: 'My Polls', user: req.user });
  });
};

exports.api_my_polls = function (req, res) {
  Poll.find({ creator: req.user.username }).select('_id creator title data votedIPs').then(function (poll) {
    res.status(200).send(poll);
  }).catch(function (err) {
    res.status(400).send(err);
  });
};

exports.api_all_polls = function (req, res) {
  Poll.find().select('_id title data votedIPs').then(function (poll) {
    res.status(200).send(poll);
  }).catch(function (err) {
    res.status(400).send(err);
  });
};

exports.get_new_poll = function (req, res) {
  res.render('new_poll', { title: 'Create new poll', user: req.user });
};

exports.post_new_poll = function (req, res) {
  var poll = new Poll();

  var IP = req.headers['x-forwarded-for'] || req.connection.remoteAddress.split(',')[0];
  var userChoices = req.body.choices.split(',');

  poll.title = req.body.title;
  poll.creator = req.user.username;
  poll.votedIPs.push(IP);

  userChoices.forEach(function (label) {
    poll.data.push({ label: label });
  });

  poll.save().then(function () {
    Poll.find({ creator: req.user.username }).select('_id creator title data votedIPs').then(function (polls) {
      res.render('my_polls', { title: 'My Polls', user: req.user, polls: polls });
      // res.render('my_polls', { title: 'My Polls', user: req.user });
    });
  });
};

exports.post_poll = function (req, res) {
  res.send('voting');
};

exports.post_add_option = function (req, res) {
  res.send('adding option');
};

exports.post_delete_poll = function (req, res) {
  res.send('deleting');
};