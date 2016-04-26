var db = require('./db');
var books = require('./books');
const port = 3000;

db.init();

var express = require('express');
var app = express();
var router = express.Router();

app.set('view engine', 'ejs');

router.route('/books')

  .get(function (req, res) {
    books.list(req, res);
  });

router.route('/books/:book_id')

  .delete(function(req, res){
    books.delete(req.params.book_id, req, res);
  });

app.use('/', router);

app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});