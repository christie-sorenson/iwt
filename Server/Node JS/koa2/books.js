var db = require('./db');

module.exports.list = async function(ctx) {
  const books = await db.query('SELECT * from books ORDER BY id');
  await ctx.render('books/list', {books:books});
};

module.exports.delete = async function (ctx, id) {
 await db.query('DELETE from books where id = ' + id);
 this.body = { message: 'Book Deleted' };
};