var db = require('./db');
var books = require('./books');
//TODO : Move port
const port = 3000;

db.init();

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var router = express.Router();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

router.route('/books')

  .get(books.list)

  .post(books.add)

router.route('/books/:book_id')

  .delete(books.delete)

  .put(books.update)

app.use('/', router);

app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});