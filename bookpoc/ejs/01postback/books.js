var db = require('./db');

var list = module.exports.list = function(req, res) {
  db.query('SELECT * from books ORDER BY id', function(err, books) {
    if (err) throw err;

    res.render('books/list', {books: books});
  });
};

module.exports.delete = function(req, res) {
  var id = req.params.book_id;
  db.query('DELETE from books where id = ' + id, function(err){
    if (err) throw err;
    res.redirect('/books');
  });
};

module.exports.add = function(req, res) {
  res.render('books/add');
};

module.exports.insert = function(req, res){
  var title = db.escape(req.body.title);
  var author = db.escape(req.body.author);
  var price = db.escape(req.body.price);

  var queryString = 'INSERT INTO books (title, author, price) VALUES (' + title + ', ' + author + ', ' + price + ')';
  db.query(queryString, function(err){
    res.redirect('/books');
  });
};

module.exports.edit = function(req, res) {
  var id = req.params.book_id;
  db.query('SELECT * from books WHERE id =  ' + id, function(err, book) {
    if (err) throw err;

    res.render('books/edit', {book: book[0]});
  });
};

module.exports.update = function(req, res){
  var id = req.params.book_id;
  var title = db.escape(req.body.title);
  var author = db.escape(req.body.author);
  var price = db.escape(req.body.price);

  var queryString = 'UPDATE books SET title = ' + title + ', author = ' + author + ', price = ' + price + ' WHERE id = ' + id;
  db.query(queryString, function(err){
    if (err) throw err;
    res.redirect('/books');
  });
};