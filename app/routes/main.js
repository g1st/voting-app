const router = require('express').Router();

// require controller modules
const main_controller = require('../controllers/mainController');

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    return next();
  }

  // if not redirect to the home page
  return res.redirect('/');
}

router.get('/', main_controller.index);

router.get('/logout', main_controller.logout);


module.exports = router;
