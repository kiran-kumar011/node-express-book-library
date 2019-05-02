const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const keys = require('./keys');
var Author = require('../models/author');

passport.serializeUser((author, done) => {
	// console.log('from serialize user')
	done(null, author.id)
})


passport.deserializeUser((id, done) => {
	// console.log('from deserialize user')
	Author.findById(id).then((author) => {
		done(null, author)
	})
})


passport.use(
	new GoogleStrategy({
	// options for strategy.
	callbackURL: "/auth/google/redirect",
	clientID: keys.google.clientID,
	clientSecret: keys.google.clientSecret
}, (accessToken, refreshToken, profile, done) => {
		// console.log(profile)
		// passport callback function.

		// check whether that user already exists.
		Author.findOne({googleID:profile.id}).then(currentUser => {
			if(currentUser) {
				// console.log('user is:', currentUser)
				done(null, currentUser)
			}
			else {
				new Author({
				username: profile.displayName,
				email: profile.emails[0].value,
				googleID: profile.id,
				date: new Date(),
				avatar_url: profile.photos[0].value,
				}).save().then((newAuthor) => {
					// console.log('new user created:', newAuthor);
					done(null, newAuthor);
				})
			}
		}) 
	})
)


