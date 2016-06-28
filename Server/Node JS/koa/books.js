var db = require('./db');

module.exports.list = function * () {
  const books = yield db.query('SELECT * from books ORDER BY id');
  yield this.render('books/list', {books:books});
};

module.exports.delete = function * (id) {
  yield db.query('DELETE from books where id = ' + id);
  this.body = { message: 'Book Deleted' };
};