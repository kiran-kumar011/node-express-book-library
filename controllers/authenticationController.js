var User = require('../models/user');
var Author = require('../models/author');

exports.isUserLogged =  (req, res, next) => {
		console.log(req.session, 'authentication controller session')
		if(req.session && req.session.userId) {
			User.findById(req.session.userId, (err, user) => {
				if(err) console.log(err)
				req.user = user;
				res.locals.user = user;
				console.log(res.locals.user, 'from isuserlooged in')
				next();
			})
		// } else if(req.session.passport || req.session.passport.user) {
		// 	Author.findById(req.session.passport.user, (err, author) => {
		// 		if(err) console.log(err);
		// 		req.author = author;
		// 		res.locals.author = author;
		// 		console.log(res.locals.author, 'from login else statement');

		// 		next();
		// 	})
		} else {
			// console.log('from login else statement');
			res.redirect('/users/login');
		}
	}


// request.session.destroy. for deleting the stored session.
exports.sessions = (req, res, next) => {
	if(req.session && req.session.userId) {
		User.findById(req.session.userId, (err, user) => {
			req.user = user;
			res.locals.user = user;
			next()
		})
	}
	else{
		req.user = null;
		res.locals.user = null;
		next()
	}
}


exports.isAuthorLogged = (req, res, next) => {
	if(req.session.passport && req.session.passport.user) {
		Author.findById(req.session.passport.user, (err, author) => {
			if(err) console.log(err);
			req.author = author;
			res.locals.author = author;
			next();
		})
	} else {
		res.redirect('/users/login');
	}
}

exports.author_session = (req, res, next) => {
	if(req.session.passport && req.session.passport.user) {
		Author.findById(req.session.passport.user, (err, author) => {
			// console.log(err, author);
			req.author = author;
			res.locals.author = author;			
			next();
		})
	} else {
		req.author = null;
		res.locals.author = null;
		next();
	}
	
} 





