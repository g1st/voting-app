const router = require('express').Router();

// require controller modules
const poll_controller = require('../controllers/pollController');

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    return next();
  }

  // if not redirect to the home page
  return res.redirect('/');
}

// show all polls
router.get('/', poll_controller.polls);

// show user made polls
router.get('/mine', isLoggedIn, poll_controller.my_polls);

router.get('/new_poll', isLoggedIn, poll_controller.get_new_poll);

router.post('/mine', poll_controller.post_new_poll);

module.exports = router;
