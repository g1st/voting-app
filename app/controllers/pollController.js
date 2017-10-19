const Poll = require('../models/poll');

exports.polls = (req, res) => {
  res.render('polls', { title: 'Polls', user: req.user });
};

exports.poll = (req, res) => {
  Poll.find({ _id: req.params.id }).select('_id creator title data votedIPs').then((poll) => {
    return res.render('poll', { title: poll.title, user: req.user, poll: poll[0] });
  });
};

exports.my_polls = (req, res) => {
  Poll.find({ creator: req.user.username }).select('_id creator title data votedIPs').then((polls) => {
    if (polls.length > 0) {
      return res.render('my_polls', { title: 'My Polls', user: req.user, polls });
    }
    return res.render('my_polls', { title: 'My Polls', user: req.user });
  });
};

exports.api_my_polls = (req, res) => {
  Poll.find({ creator: req.user.username }).select('_id creator title data votedIPs')
    .then((poll) => {
      res.status(200).send(poll);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

exports.api_all_polls = (req, res) => {
  Poll.find().select('_id title data votedIPs')
    .then((poll) => {
      res.status(200).send(poll);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

exports.get_new_poll = (req, res) => {
  res.render('new_poll', { title: 'Create new poll', user: req.user });
};

exports.post_new_poll = (req, res) => {
  const poll = new Poll();

  const IP = req.headers['x-forwarded-for'] || req.connection.remoteAddress.split(',')[0];
  const userChoices = req.body.choices.split(',');

  poll.title = req.body.title;
  poll.creator = req.user.username;
  poll.votedIPs.push(IP);

  userChoices.forEach((label) => {
    poll.data.push({ label });
  });

  poll.save().then(() => {
    Poll.find({ creator: req.user.username }).select('_id creator title data votedIPs').then((polls) => {
      res.render('my_polls', { title: 'My Polls', user: req.user, polls });
    // res.render('my_polls', { title: 'My Polls', user: req.user });
    });
  });
};

exports.post_poll = (req, res) => {
  res.send('voting');
};

exports.post_add_option = (req, res) => {
  res.send('adding option');
};

exports.post_delete_poll = (req, res) => {
  res.send('deleting');
};
