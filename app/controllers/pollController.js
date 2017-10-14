exports.polls = (req, res) => {
  res.render('polls', { title: 'Polls' });
};

exports.my_polls = (req, res) => {
  res.render('my_polls', { title: 'My Polls' });
};
