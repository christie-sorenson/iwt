var db = require('./db');
var books = require('./books');
const port = 3000;

db.init();

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

/*  Must come after users.auth to ensure even static pages are authenticated */
app.use(express.static('public'));
//app.use(setDelay);

/*  Could have used router for cleaner code, but used app.method to make paths clear. */
/*  Routes for Ajax based API */
app.get('/api/books', books.list);
app.post('/api/books', books.insert);
app.get('/api/books/:book_id(\\d+)', setDelay, books.get);
app.put('/api/books/:book_id(\\d+)', books.update);
app.delete('/api/books/:book_id(\\d+)', books.delete);


app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});

function setDelay(req, res, next){
  var timeout = (Math.floor(Math.random() * 4)) * 1000;
  setTimeout(next, timeout);
}

