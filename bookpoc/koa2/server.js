const Koa = require('koa');
const app = new Koa();
var route = require('koa-route');
var books = require('./books');
var db = require('./db');
var render = require('koa-ejs');
var co = require('co');
var path = require('path');

db.init();

render(app, {
  root: path.join(__dirname, 'views'),
  layout: false,
  viewExt: 'ejs',
  cache: false,
  debug: true
});

app.context.render = co.wrap(app.context.render);


app.use(route.get('/books', books.list));
app.use(route.delete('/books/:id', books.delete));


app.listen(3000);