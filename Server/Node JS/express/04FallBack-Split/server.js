var db = require('./db');
var books = require('./books');
var users = require('./users');
const port = 3000;

db.init();

var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var mySession = session({
  secret: 'N0deJS1sAw3some',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
});


var app = express();
app.use(mySession);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

/* Routes - consider putting in routes.js */
app.get('/login', users.loginForm);
app.post('/login/:success_route', users.login);
app.get('/logout', users.logout);

/*  This must go between the users routes and the books routes. */
app.use(users.auth);

/*  Must come after users.auth to ensure even static pages are authenticated */
app.use(express.static('public'));

/*  Could have used router for cleaner code, but used app.method to make paths clear. */
/*  Routes for Ajax based API */
app.use(books.setAPI);
app.get('/api/books', books.list);
app.post('/api/books', books.insert);
app.put('/api/books/:book_id(\\d+)', books.update);
app.delete('/api/books/:book_id(\\d+)', books.delete);

/* Routes for Postback Style Requests */
app.get('/books/postback', books.list);
app.get('/books/add', books.add);
app.get('/books/edit/:book_id(\\d+)', books.edit);
app.get('/books/confirmdelete/:book_id(\\d+)', books.confirmdelete);
app.get('/books/delete/:book_id(\\d+)', books.delete);
app.post('/books/update/:book_id(\\d+)', books.update);
app.post('/books/insert', books.insert);


app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});