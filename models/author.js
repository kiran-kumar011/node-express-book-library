var mongoose = require('mongoose');

var authorSchema = new mongoose.Schema({
	name: String,
	email: { type: String, unique: true },
	books : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
	googleID: String,
	date: String,
	avatar_url: String,
})

var Author = mongoose.model('Author', authorSchema);

module.exports = Author;