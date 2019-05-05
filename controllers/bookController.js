var Book = require('../models/book');
var Author = require('../models/author');


exports.books_get = (req, res, next) => {
	console.log(req.session, '......................session..............')
	Book.find({}).populate('author').exec((err, books) => {
		if(err) console.error(err);
		// console.log(books, '..............books array/...............')
		res.render('index', { books });
	})
}



exports.book_post = (req, res) => {
	Book.create(req.body, (err, book) => {
		if(err) console.error(err);
		Author.findByIdAndUpdate(book.author, {$push: { books: book._id}}, { new: true }, (err, author) => {
			res.redirect('/');
		});
	})
}


exports.add_book = (req, res, next) => {
	console.log(res.locals.author, 'which is stored in locals');
	Author.find({}, (err, authors) => {
		console.log(authors);
  	res.render('add', { authors });
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



exports.delete_book = (req, res) => {
	console.log(req.author.id, '.............id...............')
	var index = req.params.id;
	req.author.books.forEach(bookID => {
		if(bookID == index) {
			Book.findByIdAndDelete({_id: index}, (err, book) => {
				if(err) console.error(err);
			})
		} 
	})
	
	Author.findByIdAndUpdate(req.author.id, {$pull: {books: index}}, {safe: true, upsert: true}, (err, author) => {
		if(err) console.log(err);
		console.log(author);
		res.redirect('/')
	})
	// for(let i=0; i < req.author.books.length; i++) {
	// 	if(index ==  req.author.books[i]) {
	// 		Book.findByIdAndDelete({_id: index}, (err, book) => {
	// 			if(err) console.error(err);
	// 			return;
	// 		})
	// 	}
	// }
}

















