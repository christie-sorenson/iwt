var db = require('./db');

/**
 *
 * Selects all books and then renders the page with the list.ejs template
 */
var list = module.exports.list = function(req, res) {
  var limit = '';

  if (req.headers['x-book-limit']){
    limit = ' LIMIT ' + parseInt(req.headers['x-book-limit'], 10);
  }

  db.query('SELECT * from books ORDER BY id' + limit, function(err, books) {
    if (err) throw err;

    res.json(books);

  });
};

/**
 * Select a single book based on passed in ID
 */
module.exports.get = function(req, res){
  var id = req.params.book_id;

  db.query('SELECT * from books  WHERE id = ' + id, function(err, book){
    if (err) throw err;
    if (book.length) {
      res.json(book[0]);
    }
    else{
      res.json({});
    }
  });
};

/**
 *
 * Selects information about the passed in bood and then
 * renders the edit confirmation page with the edit.ejs template
 */
module.exports.edit = function(req, res) {
  var id = req.params.book_id;
  db.query('SELECT * from books WHERE id =  ' + id, function(err, book) {
    if (err) throw err;

    res.render('books/edit', {book: book[0]});
  });
};

/**
 * Deletes the passed in book from the database.
 * Does a redirect to the list page
 */
module.exports.delete = function(req, res) {
  var id = req.params.book_id;
  db.query('DELETE from books where id = ' + id, function(err){
    if (err) throw err;
    res.json({ message: 'Book Deleted' });
  });
};

/**
 * Adds a new book to the database
 * Does a redirect to the list page
 */
module.exports.insert = function(req, res){
  var title = db.escape(req.body.title);
  var author = db.escape(req.body.author);
  var price = db.escape(req.body.price);

  var queryString = 'INSERT INTO books (title, author, price) VALUES (' + title + ', ' + author + ', ' + price + ')';
  db.query(queryString, function(err, result){
    res.json({ id: result.insertId });
  });
};

/**
 * Updates a book in the database
 * Does a redirect to the list page
 */
module.exports.update = function(req, res){
  var id = req.params.book_id;
  var title = db.escape(req.body.title);
  var author = db.escape(req.body.author);
  var price = db.escape(req.body.price);

  var queryString = 'UPDATE books SET title = ' + title + ', author = ' + author + ', price = ' + price + ' WHERE id = ' + id;
  db.query(queryString, function(err){
    if (err) throw err;
    res.json({ message: 'Book Updated' });
  });
};