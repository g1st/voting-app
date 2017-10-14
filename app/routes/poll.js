const router = require('express').Router();

// require controller modules
const poll_controller = require('../controllers/pollController');

// show all polls
router.get('polls', poll_controller.polls);

// show user made polls
router.get('my_polls', poll_controller.my_polls);

module.exports = router;
