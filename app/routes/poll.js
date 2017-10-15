const router = require('express').Router();

// require controller modules
const poll_controller = require('../controllers/pollController');

// show all polls
router.get('/', poll_controller.polls);

// show user made polls
router.get('/mine', poll_controller.my_polls);

router.get('/new_poll', poll_controller.get_new_poll);

router.post('/new_poll', poll_controller.post_new_poll);

module.exports = router;
