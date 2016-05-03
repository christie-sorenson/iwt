var db = require('./db');
var books = require('./books');
const port = 3000;

db.init();

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/books', books.list);
app.get('/books/add', books.add);
app.get('/books/edit/:book_id', books.edit);
app.get('/books/delete/:book_id', books.delete);
app.post('/books/update/:book_id', books.update);
app.post('/books/insert', books.insert);

app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});