var db = require('./db');

module.exports.list = function(req, res) {
  db.query('SELECT * from books ORDER BY id', function(err, books) {
    if (err) throw err;

    res.render('books/list', {books: books});
  });
};

module.exports.delete = function(id, req, res) {
  db.query('DELETE from books where id = ' + id, function(err){
    if (err) throw err;

    res.json({ message: 'Book Deleted' });
    });
}