#!/usr/local/bin/node

var mysql = require('mysql');
var read = require('fs').readFileSync;
var ejs = require('ejs');
var config = require('../config');

var connection = mysql.createConnection({
      host     : config.DATABASE_HOST,
      user     : config.DATABASE_USER,
      password : config.DATABASE_PASSWORD,
      database : config.DATABASE_NAME
    });
connection.connect();

var header ='Content-type: text/html\n\n';
var file = read('/Users/muellerfan/Sites/iwt/bookpoc/nodecgi/views/books/list.ejs', 'utf-8');
console.log(header);

output = connection.query('SELECT * from Books', function(err, books, fields) {
    if (err){console.log(err);}
    var output = ejs.render(file, {books: books});
    console.log(output);
});

connection.end();
