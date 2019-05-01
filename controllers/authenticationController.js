var User = require('../models/user')

exports.isUserLogged =  (req, res, next) => {
		if(req.session && req.session.userId) {
			User.findById(req.session.userId, (err, user) => {
				if(err) console.log(err)
				req.user = user;
				res.locals.user = user;
				console.log(user)
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



// user_logout: (req, res, next) => {
// 		req.session.destroy(function(err) {
// 			if(err) return next(err);
// 			res.redirect('/users/login')
// 		})
// 	}



