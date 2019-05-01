var createError = require('http-errors');
var express = require('express');
var path = require('path');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash')

// install mongostore.
var MongoStore = require('connect-mongo')(session);
var authentication_controller = require('./controllers/authenticationController')
// read and understand the logger and morgan.
var logger = require('morgan');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/books', {useNewUrlParser: true}, (err) => {
	err ? console.log(err) : console.log('mongodb connected');
});

// importing the different routers 
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authorRouter = require('./routes/author');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(session({
	secret: 'secret',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

app.use(flash());

app.use(express.static(path.join(__dirname, 'public')));
app.use(authentication_controller.sessions);


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/author', authorRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development.
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
