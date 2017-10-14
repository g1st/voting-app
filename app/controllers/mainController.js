exports.index = (req, res) => {
  res.render('index', { title: 'Voting App', message: 'Voting App', user: req.user });
};

exports.profile = (req, res) => {
  res.render('profile', {
    // get the user out of session and pass to template
    user: req.user,
  });
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};
