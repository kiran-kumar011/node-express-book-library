var express = require('express');
var router = express.Router();
var book_controller = require('../controllers/bookController');
var authentication_controller = require('../controllers/authenticationController')


/* GET home page. */
router.get('/', book_controller.books_get)


// get request for opening the forum to add new book.
router.get('/add', authentication_controller.isUserLogged, book_controller.add_book);


// post request from book forum to add new book.
router.post('/', book_controller.book_post);


// opening book.
router.get('/book/:id', book_controller.book_open);


// opening the edit forum to edit data.
router.get('/edit/:id', authentication_controller.isUserLogged, book_controller.edit_book);


// edit and update book.
router.post('/edit/:id/update', book_controller.edit_book_update);


// delete the book.
router.get('/del/:id', authentication_controller.isUserLogged, book_controller.delete_book);





module.exports = router;
