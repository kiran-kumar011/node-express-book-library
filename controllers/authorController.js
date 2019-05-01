var Author = require('../models/author');


// Display Author create form on GET.
exports.author_get = function(req, res, next) {
	console.log(req.session);
	Author.find({}, (err, authors) => {
		console.log(authors)
		res.render('addAuthor');
	})
}


// Handle Author create on POST.
exports.author_create_post = (req, res, next) => {
	Author.create(req.body, (err, author) => {
		res.redirect('/')
	})
}








