var Book = require('../models/book');
var Author = require('../models/author');

exports.books_get = (req, res, next) => {
	console.log(req.flash('info'))
	Book.find({}).populate('author').exec((err, books) => {
		if(err) console.error(err);
		res.render('index', {books})
	})
}


exports.add_book = (req, res, next) => {
	Author.find({}, (err, authors) => {
  	res.render('add', { authors });
	})
}


exports.book_post = (req, res) => {
	Book.create(req.body, (err, book) => {
		if(err) console.error(err);
		Author.findByIdAndUpdate(book.author, {$push: {books: book._id}}, { new: true }, (err, author) => {
			res.redirect('/');
		})
	})
}


exports.book_open = (req, res) => {
	var index = req.params.id;
	console.log(index)
	Book.findOne({_id: index}, (err, book) => {
		if(err) console.error(err);
  	res.render('books', { book });
	})
}


exports.edit_book_update = (req, res, next) => {
	var index = req.params.id;
	var objectToSave = {
		title: req.body.title,
		description: req.body.description,
	}
	Book.findOneAndUpdate({_id : index}, objectToSave, (err, book) => {
		if(err) console.error(err);
  	res.redirect('/');
	})
}



exports.edit_book = (req, res, next) => {
	var index = req.params.id;
	// finding one by id and populating the author object by id and sending the updated object as a variable.
	Book.findOne({_id: index}).populate('author').exec((err, book) => {
		if(err) console.error(err);
		res.render('edit', { book: book });
	})
}



exports.delete_book = (req,res) => {
	var index = req.params.id;
	Book.findByIdAndDelete({_id: index}, (err, book) => {
		if(err) console.error(err);
		res.redirect('/')
	})
}

















