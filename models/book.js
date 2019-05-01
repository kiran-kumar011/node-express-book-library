var mongoose = require('mongoose');

var BookSchema = new mongoose.Schema({
	title: String,
	author: {type: mongoose.Schema.Types.ObjectId, ref: 'Author'},
	description: String,
})

var Book = mongoose.model('Book', BookSchema);
module.exports = Book;

