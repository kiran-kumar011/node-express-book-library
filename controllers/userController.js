var User = require('../models/user');
var Product = require('../models/product');
var Book = require('../models/book');

exports.user_signIn = (req, res, next) => {
	// console.log('users get request')
  res.render('signin');
}

exports.user_login = (req, res, next) => {
	var message = req.flash('error')[0];
	// console.log(message, 'jghfsdhfajdhgfajhsgd')
	res.render('login', {message})
}

exports.user_login_form = (req, res, next) => {
	var message = req.flash('error')[0];
	User.create(req.body, (err, user) => {
		if(err) return res.redirect('/users/login');
		res.render('login', {message})
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
				res.redirect('/users/profile'); // what needs to be done to store if the password and mail id matches with the server db.
				// how to add cookie and how to add sessions here.
			} else {
				req.flash('error', 'Invalid Password')
				res.redirect('users/login');
			}
		})
	})
}


exports.user_cart = (req, res) => {	
	Product.findOne({ bookID: req.params.id }).then(product => {
		if(product) {
			Product.findOneAndUpdate(product._id, {quantity: product.quantity + 1}, (err, updatedProduct) => {
				if(err) console.error(err);
  			res.redirect('/');
			})
		}
		else {
			Book.findOne({_id: req.params.id}).populate('author').exec((err, book) => {
				// console.log(book, '//..............found book...............');
				new Product({
					userID: req.user.id,
					bookID: req.params.id,
					bookTitle: book.title,
					bookAuthor: book.author.username,
					quantity: 1,
				}).save().then(newProduct => {
					User.findByIdAndUpdate(newProduct.userID, {$push: { cart: newProduct._id }}, { new: true }, (err, user) => {
					res.redirect('/');
					})
				})
			})
		}
	})
}

exports.user_logout = (req, res, next) => {
	req.session.destroy();
	res.redirect('/');
}



