var router = require('express').Router();
const passport = require('passport')


// auth login.
router.get('/login', (req, res) => {
	res.render('login');
})


// auth logout.
router.get('/logout', (req, res) => {
	// handle loggin out.
	res.send('loging out')
})


// auth with google.
router.get('/google', passport.authenticate('google', {
	scope: ["profile", "email"]
}), (req, res) => {
	console.log(req.body, 'from auth route after midleware');
})


// callback route for google to redirect.
router.get('/google/redirect', passport.authenticate("google"), (req, res) => {
	console.log(req.user)
	res.redirect('/author/profile');
})

module.exports = router;