var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
	userID:  {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	bookID: {type: mongoose.Schema.Types.ObjectId, ref: 'Book'},
	bookTitle: String,
	bookAuthor: String,
	quantity: Number,
})


var Product = mongoose.model('Product', productSchema);

module.exports = Product;