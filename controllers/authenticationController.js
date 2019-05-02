var User = require('../models/user')

exports.isUserLogged =  (req, res, next) => {
	console.log(req.session, 'authentication controller session')
		if(req.session && req.session.userId) {
			User.findById(req.session.userId, (err, user) => {
				if(err) console.log(err)
				req.user = user;
				res.locals.user = user;
				console.log(user, 'from isuserlooged in')
				next();
			})
		}
		else {
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


exports.isAuthorLoggedIn = (req, res, next) => {
	if(!req.author) {
		res.redirect('/users/login')
	}
}




