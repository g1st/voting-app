'use strict';

var router = require('express').Router();

// require controller modules
var poll_controller = require('../controllers/pollController');

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

// API user polls
router.get('/api/mine', poll_controller.api_my_polls);

router.get('/new_poll', isLoggedIn, poll_controller.get_new_poll);

router.post('/mine', isLoggedIn, poll_controller.post_new_poll);

router.get('/api/all', poll_controller.api_all_polls);

// get single poll
router.get('/:id', poll_controller.poll);

// vote, add option or delete poll
router.post('/:id', poll_controller.post_poll);

module.exports = router;