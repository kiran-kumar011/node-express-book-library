var express = require('express');
var router = express.Router();
var path = require('path');
var user_controller = require('../controllers/userController');
var authentication_controller = require('../controllers/authenticationController')


/* rendering users sign forum */
router.get('/signin', user_controller.user_signIn);


// redndering user login form.
router.get('/login' , user_controller.user_login);


// post request for routing the page to login form.
router.post('/login', user_controller.user_login_form);

// user logout request handling middleware.
router.get('/logout', user_controller.user_logout);


// post request from login to to verify the user credentials.
router.post('/', user_controller.user_verification);

module.exports = router;
