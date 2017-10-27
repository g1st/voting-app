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
  Poll.find({ creator: req.user.username }).sort({ '$natural': -1 }).select('_id creator title data votedIPs').then(function (poll) {
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

  var userChoices = req.body.choices.split(', ');

  poll.title = req.body.title;
  poll.creator = req.user.username;

  userChoices.forEach(function (label) {
    poll.data.push({ label: label });
  });

  poll.save().then(function () {
    Poll.find({ creator: req.user.username }).select('_id creator title data votedIPs').then(function (polls) {
      res.render('my_polls', { title: 'My Polls', user: req.user, polls: polls });
    });
  });
};

exports.post_poll = function (req, res) {
  var IP = req.headers['x-forwarded-for'] || req.connection.remoteAddress.split(',')[0];

  Poll.findOne({
    _id: req.params.id
  }).then(function (poll) {
    // user delets poll
    if (req.body.delete && req.user) {
      Poll.findOneAndRemove({
        _id: req.params.id
      }).then(function (poll) {
        return res.render('poll', {
          title: 'Poll ' + poll.title + ' deleted',
          user: req.user,
          deleted: true
        });
      }).catch(function (err) {
        return console.error(err);
      });
    } else {
      if (!req.user) {
        return res.render('poll', {
          title: 'Poll: ' + poll.title,
          user: req.user,
          poll: poll,
          message: 'You need to register or login first'
        });
      }
      // check if user has not yet voted
      if (poll.votedIPs.some(function (votedIP) {
        return votedIP === IP;
      })) {
        return res.render('poll', {
          title: 'Poll: ' + poll.title,
          user: req.user,
          poll: poll,
          message: 'You have already voted (' + IP + ')'
        });
      }

      // user voting
      if (req.body.vote) {
        Poll.findOneAndUpdate({
          _id: req.params.id,
          'data._id': req.body.vote
        }, { $inc: { 'data.$.count': 1 }, $push: { votedIPs: IP } }, { new: true }).then(function (poll) {
          return res.render('poll', {
            title: 'Poll: ' + poll.title,
            user: req.user,
            poll: poll
          });
        }).catch(function (err) {
          return res.status(400).send(err);
        });
      }

      // user adding extra label
      if (req.body.label) {
        Poll.findOneAndUpdate({
          _id: req.params.id
        }, { $push: { 'data': { label: req.body.label, count: 1 } }, votedIPs: IP }, { new: true }).then(function (poll) {
          return res.render('poll', {
            title: 'Poll: ' + poll.title,
            user: req.user,
            poll: poll
          });
        }).catch(function (err) {
          return res.status(400).send(err);
        });
      }
    }
  }).catch(function (err) {
    throw err;
  });
};