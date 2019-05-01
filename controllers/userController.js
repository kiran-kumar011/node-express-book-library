var User = require('../models/user');

exports.user_signIn = (req, res, next) => {
	console.log('users get request')
  res.render('signin');
}

exports.user_login = (req, res, next) => {
	var message = req.flash('error')[0];
	console.log(message)
	res.render('login', {message})
}

exports.user_login_form = (req, res, next) => {
	var error = req.flash('login', 'login page')
	console.log(error)
	User.create(req.body, (err, user) => {
		if(err) return res.redirect('/users/login');
		res.render('login')
	})
}


exports.user_verification = (req, res, next) => {
	const {email, password} = req.body;
	
	User.findOne({ email }, (err, user) => {
		if(err) return next(err);
		if(!user) {
			req.flash('error', 'Invalid Email')
			return res.status(400).redirect('users/login');
		}
		user.comparePassword(password, (err, isMatch) => {
			if(err) return res.send(err);  // what is this error for > will it be server side error or db side error.
			if(isMatch) {
				req.flash('info', 'Login successful')
				req.session.userId = user._id;
				res.redirect('/'); // what needs to be done to store if the password and mail id matches with the server db.
				// how to add cookie and how to add sessions here.
			} else {
				req.flash('error', 'Invalid Password')
				res.redirect('users/login');
			}
		})
	})
}


exports.user_logout = (req, res, next) => {
	req.session.destroy(function(err) {
			if(err) return next(err);
			res.redirect('/users/login')
		})
}



