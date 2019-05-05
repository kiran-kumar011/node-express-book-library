var express = require('express');
var router = express.Router();
var path = require('path');
var Product = require('../models/product');
var User = require('../models/user');

var user_controller = require('../controllers/userController');
var authentication_controller = require('../controllers/authenticationController')


/* rendering users signin forum */
router.get('/signin', user_controller.user_signIn);


// redndering user login form.
router.get('/login' , user_controller.user_login);


// post request for routing the page to login form.
router.post('/login', user_controller.user_login_form);

// user logout request handling middleware.
router.get('/logout', user_controller.user_logout);


// post request from login to to verify the user credentials.
router.post('/', user_controller.user_verification);


// buy books.
router.get('/buy/:id', user_controller.user_cart);


// user profile. 
router.get('/profile', (req, res) => {
	console.log('inside profile');
	res.render('profile');
})

router.get('/cart', (req, res) => {
	User.findOne({}).populate('cart').exec((err, user) => {
		console.log(user, '.................the entire populated users................')
		res.render('cart', {user});
	})
})

module.exports = router;
