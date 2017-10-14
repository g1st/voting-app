const router = require('express').Router();

// require controller modules
const oauth_controller = require('../controllers/oauthController');

// login form
router.get('/login', oauth_controller.login_get);

// process the login form
router.post('/login', oauth_controller.login_post);

// signup form
router.get('/register', oauth_controller.signup_get);

// process the signup form
router.post('/signup', oauth_controller.signup_post);

module.exports = router;
