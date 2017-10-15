const Poll = require('../models/poll');

exports.polls = (req, res) => {
  res.render('polls', { title: 'Polls', user: req.user });
};

exports.my_polls = (req, res) => {
  res.render('my_polls', { title: 'My Polls', user: req.user });
};

exports.get_new_poll = (req, res) => {
  res.render('new_poll', { title: 'Create new poll', user: req.user });
};

exports.post_new_poll = (req, res) => {
  const poll = new Poll();

  const IP = req.headers["x-forwarded-for"] || req.connection.remoteAddress.split(',')[0];
  const userChoices = req.body.choices.split(',');

  poll.title = req.body.title;
  poll.creator = req.user.username;
  poll.votedIPs.push(IP);

  userChoices.forEach((label) => {
    poll.data.push({ label });
  });

  poll.save().then(() => {
    res.render('my_polls', { title: 'My Polls', user: req.user });
  });
};
