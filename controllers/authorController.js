var Author = require('../models/author');


// Display Author create form on GET.
exports.author_get = function(req, res, next) {
	console.log(req.session, 'from author controller');
	Author.find({}, (err, authors) => {
		// console.log(authors)
		res.render('addAuthor');
	})
}


// Handle Author create on POST.
exports.author_create_post = (req, res, next) => {
	Author.create(req.body, (err, author) => {
		res.redirect('/')
	})
}


// adding books.
exports.add_book = (req, res, next) => {
	console.log(res.locals.author, 'which is stored in locals');
	Author.find({}, (err, authors) => {
		console.log(authors, '///////////////inside find/////////////');
  	res.render('add', { authors });
	})
}




