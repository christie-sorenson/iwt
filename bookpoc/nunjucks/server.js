const http = require('http');
var db = require('./db'); 
var books = require('./books');
var nunjucks = require('nunjucks');
const port = 3000;

db.init();

var express = require('express');
var app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app
});
app.set('view engine', 'html');

app.get('/books', function (req, res) {
  books.list(req, res);
});

app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});