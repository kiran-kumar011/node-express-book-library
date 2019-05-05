var express = require('express');
var router = express.Router();
var path = require('path');
// var Author = require('../models/author');
var author_controller = require('../controllers/authorController');
var authentication_controller = require('../controllers/authenticationController');

/* GET users listing. */
router.get('/',  authentication_controller.isUserLogged, author_controller.author_get)

router.post('/', author_controller.author_create_post);

//handling router for adding new book.
router.get('/add', author_controller.add_book)
router.get('/profile', (req, res) => {
	// console.log(req.passport.session, 'profile page request')
	res.render('profile');
})

module.exports = router;


// remaining work //

// create ejs to display author list.
// create function to delete the author details.
// create a page to display the related book which are stored in db.
