var koa = require('koa');
var app = koa();
var books = require('./books');
var render = require('koa-ejs');
var path = require('path');
var route = require('koa-route');

var db = require('./db');
db.init();

render(app, {
  root: path.join(__dirname, 'views'),
  layout: false,
  viewExt: 'ejs',
  cache: false,
  debug: true
});


app.use(route.get('/books', books.list));
app.use(route.delete('/books/:id', books.delete));

app.listen(3000);

